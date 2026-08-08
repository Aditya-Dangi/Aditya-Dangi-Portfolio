import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/cn";
import { FallbackSkillIcon, skillIcons } from "../../config/skillIcons";
import { CATEGORIES, CATEGORY_INFO, TECHNOLOGIES } from "../../data/techStack";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import { Badge, Card, Dialog } from "../ui";
import { RatingDots } from "./RatingDots";
import { TechDetailContent } from "./TechDetailContent";
import { proficiencyTone } from "./proficiency";

/**
 * Every technology, grouped by its `category` — read entirely from
 * `TECHNOLOGIES`/`CATEGORIES` (`data/techStack.js`), so a technology added to
 * that registry (with an icon in `config/skillIcons.js`) shows up here with
 * no component changes.
 */
function groupByCategory() {
  return CATEGORIES.map((category) => ({
    category,
    info: CATEGORY_INFO[category],
    items: Object.keys(TECHNOLOGIES).filter((name) => TECHNOLOGIES[name].category === category),
  }));
}

const CARD_MOTION = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.92 },
};

const REDUCED_MOTION_TRANSITION = { duration: 0 };

function TechCard({ name, isHovered, isRelated, isDimmed, reduceMotion, onHover, onOpen }) {
  const entry = TECHNOLOGIES[name];
  const Icon = skillIcons[name] ?? FallbackSkillIcon;

  return (
    <motion.div
      layout={!reduceMotion}
      variants={CARD_MOTION}
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      exit="exit"
      transition={reduceMotion ? REDUCED_MOTION_TRANSITION : { duration: 0.2, ease: "easeOut" }}
      className="techgrid-card-slot"
    >
      <Card
        as="button"
        type="button"
        variant="glass"
        interactive
        spotlight
        padding="md"
        className={cn(
          "techgrid-card",
          isHovered && "is-hovered",
          isRelated && "is-related",
          isDimmed && "is-dimmed"
        )}
        onPointerEnter={() => onHover(name)}
        onPointerLeave={() => onHover(null)}
        onFocus={() => onHover(name)}
        onBlur={() => onHover(null)}
        onClick={() => onOpen(name)}
      >
        <span className="techgrid-card__icon" aria-hidden="true">
          <Icon />
        </span>
        <span className="techgrid-card__name">{name}</span>
        <span className="techgrid-card__badges">
          <Badge tone="outline" size="sm">
            {entry.category}
          </Badge>
          <Badge tone={proficiencyTone(entry.level)} size="sm" aria-label={`Rating ${entry.levelLabel}`}>
            <RatingDots rating={entry.level} />
          </Badge>
        </span>
        {entry.focus && <span className="techgrid-card__focus">{entry.focus}</span>}
      </Card>
    </motion.div>
  );
}

/**
 * Bento-style technology grid: category sections, search-filterable, with
 * hover-driven relationship highlighting (reads each entry's own `related`
 * list — nothing inferred) and a click-to-open detail dialog. Sits below
 * `TechOrbit` as the denser, more scannable, recruiter-friendly counterpart
 * — same registry, same icons, no data duplicated between the two.
 *
 * @param {object} props
 * @param {string} [props.query] search text, owned by the parent `Skills`
 *   section so the same search box can sit above the orbit.
 */
export function TechGrid({ query = "" }) {
  const reduceMotion = usePrefersReducedMotion();
  const debouncedQuery = useDebouncedValue(query, 150);
  const [hovered, setHovered] = useState(null);
  const [activeName, setActiveName] = useState(null);

  const groups = useMemo(groupByCategory, []);

  const filtered = useMemo(() => {
    const trimmed = debouncedQuery.trim().toLowerCase();
    if (!trimmed) return groups;
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((name) => name.toLowerCase().includes(trimmed)),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, debouncedQuery]);

  const relatedSet = useMemo(() => {
    if (!hovered) return null;
    return new Set(TECHNOLOGIES[hovered]?.related ?? []);
  }, [hovered]);

  return (
    <div className="techgrid">
      <div className="techgrid__categories">
        <AnimatePresence>
          {filtered.map(({ category, info, items }) => (
            <motion.section
              key={category}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduceMotion ? REDUCED_MOTION_TRANSITION : undefined}
              className="techgrid__category"
              aria-label={`${category} technologies`}
            >
              <div className="techgrid__category-heading">
                <h3>{category}</h3>
                <p>{info}</p>
              </div>

              <div className="techgrid__grid">
                <AnimatePresence>
                  {items.map((name) => (
                    <TechCard
                      key={name}
                      name={name}
                      isHovered={hovered === name}
                      isRelated={!!relatedSet?.has(name)}
                      isDimmed={!!relatedSet && hovered !== name && !relatedSet.has(name)}
                      reduceMotion={reduceMotion}
                      onHover={setHovered}
                      onOpen={setActiveName}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="techgrid__empty">No technologies match “{query}”.</p>
        )}
      </div>

      <Dialog open={!!activeName} onClose={() => setActiveName(null)} title={activeName} size="md">
        {activeName && <TechDetailContent name={activeName} onSelectRelated={setActiveName} />}
      </Dialog>
    </div>
  );
}

export default TechGrid;
