import React from "react";
import { FiAward, FiBookOpen, FiTrendingUp } from "react-icons/fi";
import { achievements } from "../../data/portfolio";
import { useScrollFill } from "../../hooks/useScrollFill";
import { Reveal } from "../ui";
import { Section } from "./Section";

/**
 * Icons are positional: the data is an ordered list of practice, learning and
 * education, so the glyph follows the index rather than parsing the copy.
 */
const icons = [FiTrendingUp, FiBookOpen, FiAward];

/**
 * Achievements as a vertical roadmap: a rail that fills as the reading line
 * passes each milestone, rather than a row of static cards. `useScrollFill`
 * drives the rail's `--fill` custom property directly, so the fill tracks
 * scroll position at 60fps without a single re-render.
 */
export function Achievements() {
  const railRef = useScrollFill({ line: 0.5 });

  return (
    <Section
      id="achievements"
      layout="split"
      eyebrow="Achievements"
      title="Signals beyond work"
      description="Consistent practice, strong academic fundamentals, and hackathon experience support the production work."
    >
      <ol ref={railRef} className="roadmap">
        <span className="roadmap__rail" aria-hidden="true">
          <span className="roadmap__rail-fill" />
        </span>

        {achievements.map((item, index) => {
          const Icon = icons[index % icons.length];

          return (
            <li className="roadmap__item" key={item}>
              <Reveal direction="left" delay={index * 90}>
                <span className="roadmap__marker" aria-hidden="true">
                  <Icon />
                </span>
                <p className="roadmap__text">{item}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

export default Achievements;
