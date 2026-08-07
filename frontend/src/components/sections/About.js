import React from "react";
import { strengths } from "../../data/portfolio";
import { Card, Reveal } from "../ui";
import { Section } from "./Section";

/**
 * Three-up statement grid. The index numerals give the cards a rhythm and
 * make the list feel deliberate rather than like generic bullet points.
 */
export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="I build product surfaces and backend workflows that hold up in enterprise environments."
      description="The throughline is reliability: clean API contracts, readable UI architecture, secure access control, and steady delivery through testing and release cycles."
    >
      <div className="statement-grid">
        {strengths.map((item, index) => (
          <Reveal direction="up" delay={index * 90} key={item}>
            <Card as="article" interactive spotlight className="statement">
              <span className="statement__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="statement__text">{item}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default About;
