import React from "react";
import { FiMapPin } from "react-icons/fi";
import { experience } from "../../data/portfolio";
import { Badge, Card, Reveal } from "../ui";
import { Section } from "./Section";

/**
 * Role timeline. Each entry keeps its impact bullets, presented as a marked
 * list with a connecting rail so multiple roles will read as a sequence.
 */
export function Experience() {
  return (
    <Section
      id="experience"
      layout="split"
      eyebrow="Experience"
      title="What impact have I delivered?"
      description="My current work sits at the intersection of banking workflows, maintainable frontend architecture, API integration, and release ownership."
    >
      <ol className="timeline">
        {experience.map((job, index) => (
          <li key={job.company}>
            <Reveal direction="up" delay={index * 80}>
              <Card as="article" interactive spotlight className="job">
                <span className="job__marker" aria-hidden="true" />

                <header className="job__header">
                  <div>
                    <Badge tone="accent" size="sm">
                      {job.period}
                    </Badge>
                    <h3 className="job__role">{job.role}</h3>
                    <p className="job__company">
                      <span>{job.company}</span>
                      <span className="job__location">
                        <FiMapPin aria-hidden="true" />
                        {job.location}
                      </span>
                    </p>
                  </div>
                  <Badge tone="outline">Enterprise banking</Badge>
                </header>

                <p className="job__context">{job.context}</p>

                <ul className="impact">
                  {job.impact.map((item) => (
                    <li className="impact__item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default Experience;
