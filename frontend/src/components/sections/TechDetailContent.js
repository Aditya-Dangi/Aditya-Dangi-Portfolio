import React from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { FallbackSkillIcon, skillIcons } from "../../config/skillIcons";
import { TECHNOLOGIES } from "../../data/techStack";
import { Badge } from "../ui";
import { proficiencyTone } from "./proficiency";
import { RatingDots } from "./RatingDots";

const TAG_MOTION = {
  hidden: { opacity: 0, y: 6 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.04, duration: 0.2, ease: "easeOut" },
  }),
};

/**
 * Dialog body for a single technology — reads entirely from the
 * `TECHNOLOGIES` registry (`data/techStack.js`), so it never hardcodes a
 * technology name and automatically supports anything added there later.
 *
 * @param {object} props
 * @param {string} props.name
 * @param {(name: string) => void} [props.onSelectRelated] pivot the dialog to a related tech
 */
export function TechDetailContent({ name, onSelectRelated }) {
  const entry = TECHNOLOGIES[name];
  if (!entry) return null;

  const Icon = skillIcons[name] ?? FallbackSkillIcon;

  return (
    <div className="tech-detail">
      <header className="tech-detail__header">
        <span className="tech-detail__icon" aria-hidden="true">
          <Icon />
        </span>
        <div>
          <div className="tech-detail__badges">
            <Badge tone="outline" size="sm">
              {entry.category}
            </Badge>
            <Badge tone={proficiencyTone(entry.level)} size="sm" aria-label={`Rating ${entry.levelLabel}`}>
              <RatingDots rating={entry.level} />
            </Badge>
          </div>
          <p className="tech-detail__focus">{entry.focus}</p>
        </div>
      </header>

      {entry.experience?.length > 0 && (
        <section className="tech-detail__section">
          <h4>Experience</h4>
          <ul className="tech-detail__list">
            {entry.experience.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>
      )}

      {entry.expertise?.length > 0 && (
        <section className="tech-detail__section">
          <h4>Expertise</h4>
          <ul className="tech-detail__checklist">
            {entry.expertise.map((item) => (
              <li key={item}>
                <FiCheck aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {entry.usedIn?.length > 0 && (
        <section className="tech-detail__section">
          <h4>Used In</h4>
          <ul className="tech-detail__list tech-detail__list--dot">
            {entry.usedIn.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {entry.related?.length > 0 && (
        <section className="tech-detail__section">
          <h4>Related Technologies</h4>
          <div className="tech-detail__tags">
            {entry.related.map((related, index) => (
              <motion.button
                type="button"
                key={related}
                className="tech-detail__tag"
                custom={index}
                variants={TAG_MOTION}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onSelectRelated?.(related)}
              >
                {related}
              </motion.button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default TechDetailContent;
