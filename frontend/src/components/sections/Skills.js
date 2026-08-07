import React from "react";
import { skills } from "../../data/portfolio";
import { FallbackSkillIcon, skillIcons } from "../../config/skillIcons";
import { useMediaQuery, usePrefersReducedMotion } from "../../hooks/useMediaQuery";
import { Card, Reveal } from "../ui";
import { Section } from "./Section";
import { TechConstellation } from "./TechConstellation";

/**
 * Technology stack. Desktop visitors (fine pointer, enough width, no motion
 * preference against it) get the orbiting constellation — it's a hover-driven
 * showpiece that has no honest touch equivalent. Everyone else gets the flat
 * pill grid: just as complete, none of the choreography.
 */
export function Skills() {
  const canOrbit = useMediaQuery("(min-width: 1100px)");
  const reduceMotion = usePrefersReducedMotion();

  return (
    <Section
      id="skills"
      layout={canOrbit && !reduceMotion ? "stacked" : "split"}
      eyebrow="Skills"
      title="What technologies do I know?"
      description="A focused stack for modern full-stack product engineering: Java services, Angular interfaces, secure APIs, SQL persistence, and delivery tooling."
    >
      {canOrbit && !reduceMotion ? (
        <Reveal direction="fade">
          <TechConstellation skills={skills} />
        </Reveal>
      ) : (
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <Reveal direction="up" delay={index * 70} key={skill.group}>
              <Card as="article" interactive spotlight className="skill-group">
                <h3 className="skill-group__title">{skill.group}</h3>

                <ul className="tag-row" aria-label={`${skill.group} skills`}>
                  {skill.items.map((item, itemIndex) => {
                    const Icon = skillIcons[item] ?? FallbackSkillIcon;

                    return (
                      <li key={item}>
                        <span
                          className="skill-pill"
                          style={{ "--pill-index": itemIndex }}
                        >
                          <Icon aria-hidden="true" />
                          {item}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

export default Skills;
