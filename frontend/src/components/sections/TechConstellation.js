import React, { useMemo, useState } from "react";
import { cn } from "../../lib/cn";
import { FallbackSkillIcon, skillIcons } from "../../config/skillIcons";
import { skillGroupInfo } from "../../config/skillGroupInfo";
import { Tooltip } from "../ui";

/** Alternate spin direction per ring so adjacent rings read as independent. */
const DIRECTION = ["normal", "reverse"];

/**
 * Skills rendered as an orbiting constellation: one ring per skill group,
 * each item placed at an even angle around its ring. The ring itself spins
 * slowly via CSS animation; each item counter-rotates at the same duration
 * so the icon stays upright while its position still orbits — the standard
 * "orbiting satellite" transform trick, done entirely in CSS so the motion
 * costs nothing beyond a composited transform.
 *
 * Hovering an item pauses the whole system (easier to read a label mid
 * orbit) and updates the side panel with that group's tagline. Desktop only
 * — `Skills` renders this behind a `useMediaQuery` gate and falls back to
 * the flat pill grid everywhere else, since orbiting is a hover-driven
 * effect that doesn't have an equivalent on touch.
 *
 * @param {object} props
 * @param {{group: string, items: string[]}[]} props.skills
 */
export function TechConstellation({ skills }) {
  const [active, setActive] = useState(skills[0]);

  const rings = useMemo(
    () =>
      skills.map((skill, ringIndex) => ({
        ...skill,
        radius: 96 + ringIndex * 74,
        duration: 46 + ringIndex * 14,
        direction: DIRECTION[ringIndex % DIRECTION.length],
        // The node's counter-spin must run opposite the ring's own spin to
        // cancel it out, so it's the other entry in the same two-value list.
        counterDirection: DIRECTION[(ringIndex + 1) % DIRECTION.length],
      })),
    [skills]
  );

  return (
    <div className="constellation">
      <div className="constellation__stage">
        <div className="constellation__core">
          <span className="constellation__core-label">Stack</span>
        </div>

        {rings.map((ring) => (
          <div
            key={ring.group}
            className="constellation__ring"
            style={{
              "--ring-radius": `${ring.radius}px`,
              "--ring-duration": `${ring.duration}s`,
              "--ring-direction": ring.direction,
              "--node-direction": ring.counterDirection,
            }}
          >
            <span className="constellation__ring-track" aria-hidden="true" />

            {ring.items.map((item, itemIndex) => {
              const Icon = skillIcons[item] ?? FallbackSkillIcon;
              const angle = (360 / ring.items.length) * itemIndex;

              return (
                <div
                  key={item}
                  className="constellation__item"
                  style={{ "--item-angle": `${angle}deg` }}
                >
                  <Tooltip label={item} placement="top">
                    <button
                      type="button"
                      className={cn(
                        "constellation__node",
                        active.group === ring.group && "is-active-group"
                      )}
                      onPointerEnter={() => setActive(ring)}
                      onFocus={() => setActive(ring)}
                      aria-label={`${item} - ${ring.group}`}
                    >
                      <Icon aria-hidden="true" />
                    </button>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="constellation__panel" aria-live="polite">
        <p className="constellation__panel-eyebrow">{active.group}</p>
        <p className="constellation__panel-copy">{skillGroupInfo[active.group]}</p>
        <ul className="constellation__panel-list">
          {active.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TechConstellation;
