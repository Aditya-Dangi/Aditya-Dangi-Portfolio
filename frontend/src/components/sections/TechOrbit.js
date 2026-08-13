import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import { FallbackSkillIcon, skillIcons } from "../../config/skillIcons";
import { RINGS, TECHNOLOGIES } from "../../data/techStack";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import { Dialog } from "../ui";
import { TechDetailContent } from "./TechDetailContent";

/**
 * Ring radius as a percentage of the stage's inline size (`cqi`), outer
 * rings larger. Gaps between consecutive rings must stay comfortably above
 * the node's max diameter (see `.techorbit__node` in sections.css, 6cqi) —
 * nothing prevents two different rings' nodes from landing at the same
 * angle, so a gap smaller than a node causes real overlap. The outermost
 * value also needs enough margin to 50 (the stage edge) to clear the node's
 * radius, or it gets clipped by the stage's `overflow: hidden`.
 */
const RADIUS_PERCENT = [14, 21, 28, 35, 42];

/** Slow, alternating per-ring rotation so the orbit visibly moves. */
const RING_DURATION_S = [46, 58, 70, 82, 94];

/** Golden angle stagger keeps each ring's first item from lining up in a spoke. */
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function ringNodes(ring, ringIndex) {
  const count = ring.items.length;
  const angleOffset = ringIndex * GOLDEN_ANGLE - Math.PI / 2;
  const radius = RADIUS_PERCENT[ringIndex] ?? RADIUS_PERCENT[RADIUS_PERCENT.length - 1];
  return ring.items.map((name, index) => {
    const angle = angleOffset + (2 * Math.PI * index) / count;
    return {
      name,
      left: 50 + radius * Math.cos(angle),
      top: 50 + radius * Math.sin(angle),
    };
  });
}

const NODE_MOTION = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (delay) => ({
    opacity: 1,
    scale: 1,
    transition: { delay, duration: 0.3, ease: "easeOut" },
  }),
};

/**
 * Concentric-ring "tech orbit" — a decorative, at-a-glance visualization of
 * the same registry `TechGrid` renders as a searchable grid. Reads `RINGS`/
 * `TECHNOLOGIES` (`data/techStack.js`) and `skillIcons`
 * (`config/skillIcons.js`) directly, so it stays in sync with the grid with
 * no duplicated data.
 *
 * Hovering (or focusing) a node pauses the whole orbit's rotation and draws
 * connector lines to its `related` nodes, using their actual rendered
 * positions — so the lines line up regardless of where rotation happened to
 * stop. Clicking/tapping a node opens its detail dialog (`activeName`) and,
 * while that's open, shows the same highlight/lines — `activeName` is the
 * single source of truth for "selected", so its existing open/close
 * lifecycle (Escape, the close button, clicking the scrim) is what clears
 * the highlight too. No separate "pinned" state, no extra listeners.
 */
export function TechOrbit() {
  const reduceMotion = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(null);
  const [activeName, setActiveName] = useState(null);
  const [links, setLinks] = useState([]);

  const stageRef = useRef(null);
  const nodeRefs = useRef({});

  // A live hover always wins; once the pointer leaves, whatever dialog is
  // open (if any) reappears underneath it.
  const displayedName = hovered ?? activeName;

  const rings = useMemo(
    () => RINGS.map((ring, index) => ({ ...ring, nodes: ringNodes(ring, index) })),
    []
  );

  const relatedSet = useMemo(() => {
    if (!displayedName) return null;
    return new Set(TECHNOLOGIES[displayedName]?.related ?? []);
  }, [displayedName]);

  useLayoutEffect(() => {
    if (!displayedName) {
      setLinks([]);
      return;
    }

    const stage = stageRef.current;
    const originEl = nodeRefs.current[displayedName];
    if (!stage || !originEl) return;

    const stageRect = stage.getBoundingClientRect();
    const point = (el) => {
      const rect = el.getBoundingClientRect();
      return {
        x: ((rect.left + rect.width / 2 - stageRect.left) / stageRect.width) * 100,
        y: ((rect.top + rect.height / 2 - stageRect.top) / stageRect.height) * 100,
      };
    };

    const origin = point(originEl);
    const related = TECHNOLOGIES[displayedName]?.related ?? [];
    const nextLinks = related
      .map((name) => nodeRefs.current[name])
      .filter(Boolean)
      .map((el) => ({ origin, target: point(el) }));

    setLinks(nextLinks);
  }, [displayedName]);

  let globalIndex = 0;

  return (
    <div className="techorbit">
      <div
        className="techorbit__stage"
        ref={stageRef}
        /* Safety net: per-node onPointerLeave can miss a clean handoff (a fast
           pointer exit past a node's small hit area, or the node shifting out
           from under a stationary cursor when rotation resumes) and leave
           `hovered` stuck. Clearing here too guarantees it resets whenever the
           pointer actually leaves the stage, regardless of what happened
           between nodes. */
        onPointerLeave={() => setHovered(null)}
      >
        <div className="techorbit__hub" aria-hidden="true">
          <span className="techorbit__hub-count">{Object.keys(TECHNOLOGIES).length}</span>
          <span className="techorbit__hub-label">Technologies</span>
        </div>

        {rings.map((ring, ringIndex) => (
          <div
            key={ring.id}
            className="techorbit__ring-track"
            style={{ "--techorbit-radius": `${RADIUS_PERCENT[ringIndex]}` }}
            aria-hidden="true"
          />
        ))}

        {links.length > 0 && (
          <svg className="techorbit__links" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {links.map((link, index) => (
              <line
                key={index}
                x1={link.origin.x}
                y1={link.origin.y}
                x2={link.target.x}
                y2={link.target.y}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        )}

        {rings.map((ring, ringIndex) => {
          const duration = RING_DURATION_S[ringIndex] ?? RING_DURATION_S[RING_DURATION_S.length - 1];
          const groupDirection = ringIndex % 2 === 0 ? "normal" : "reverse";
          const iconDirection = groupDirection === "normal" ? "reverse" : "normal";

          return (
            <div
              key={ring.id}
              className={cn("techorbit__ring-group", !reduceMotion && "is-spinning")}
              style={!reduceMotion ? { animationDuration: `${duration}s`, animationDirection: groupDirection } : undefined}
            >
              {ring.nodes.map((node) => {
                const delayIndex = globalIndex++;
                const entry = TECHNOLOGIES[node.name];
                const Icon = skillIcons[node.name] ?? FallbackSkillIcon;
                const isActive = displayedName === node.name;
                const isRelated = !!relatedSet?.has(node.name);
                const isDimmed = !!relatedSet && !isActive && !isRelated;

                return (
                  <motion.button
                    key={node.name}
                    ref={(el) => {
                      nodeRefs.current[node.name] = el;
                    }}
                    type="button"
                    custom={reduceMotion ? 0 : delayIndex * 0.015}
                    variants={NODE_MOTION}
                    initial={reduceMotion ? false : "hidden"}
                    animate="visible"
                    whileHover={reduceMotion ? undefined : { scale: 1.15 }}
                    whileFocus={reduceMotion ? undefined : { scale: 1.15 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                    className={cn(
                      "techorbit__node",
                      isActive && "is-hovered",
                      isRelated && "is-related",
                      isDimmed && "is-dimmed"
                    )}
                    /* x/y (not a CSS `transform` class) because framer-motion owns the whole
                       `transform` property once it animates `scale` — a stylesheet
                       `transform: translate(-50%, -50%)` gets silently overwritten
                       otherwise, leaving every node off-center by half its own size. */
                    style={{ left: `${node.left}cqi`, top: `${node.top}cqi`, x: "-50%", y: "-50%" }}
                    /* Touch's pointerenter/leave firing is unreliable (often no
                       leave event at all once the finger lifts), so touch skips
                       the live-hover preview entirely and relies only on
                       onClick opening the dialog below. Mouse keeps the normal
                       hover preview. */
                    onPointerEnter={(event) => {
                      if (event.pointerType !== "touch") setHovered(node.name);
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType !== "touch") setHovered(null);
                    }}
                    onFocus={() => setHovered(node.name)}
                    onBlur={() => setHovered(null)}
                    onClick={() => setActiveName(node.name)}
                    aria-label={`${node.name} — ${entry.levelLabel} · ${entry.category}`}
                  >
                    <span
                      className={cn("techorbit__node-icon", !reduceMotion && "is-spinning")}
                      style={!reduceMotion ? { animationDuration: `${duration}s`, animationDirection: iconDirection } : undefined}
                      aria-hidden="true"
                    >
                      <Icon />
                    </span>
                    <span className="techorbit__node-label sr-only">{node.name}</span>
                  </motion.button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/*
        Deliberately not `AnimatePresence` — an exit animation that stalls
        (rapid hovers across 27 nodes, a backgrounded tab) leaves the old
        caption mounted and blocks the new one, so the text goes stale while
        the rest of the orbit updates. A keyed plain node + CSS animation
        always settles on the current technology.
      */}
      <div className="techorbit__caption" aria-live="polite">
        {displayedName ? (
          <p key={displayedName} className="techorbit__caption-text">
            <strong>{displayedName}</strong> — {TECHNOLOGIES[displayedName].focus}
          </p>
        ) : (
          <p className="techorbit__caption-hint">
            Hover a technology to see how it connects.
          </p>
        )}
      </div>

      <Dialog open={!!activeName} onClose={() => setActiveName(null)} title={activeName} size="md">
        {activeName && <TechDetailContent name={activeName} onSelectRelated={setActiveName} />}
      </Dialog>
    </div>
  );
}

export default TechOrbit;
