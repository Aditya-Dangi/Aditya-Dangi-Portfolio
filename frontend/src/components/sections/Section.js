import React from "react";
import { cn } from "../../lib/cn";
import { Reveal } from "../ui";

/**
 * Page section wrapper: consistent vertical rhythm, container width, and a
 * heading block wired for accessibility (every section is labelled by its own
 * h2, so screen-reader landmark lists read as a table of contents).
 *
 * @param {object} props
 * @param {string} props.id
 * @param {string} props.eyebrow
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {"stacked" | "split"} [props.layout] split keeps the heading sticky
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  layout = "stacked",
  className,
  children,
}) {
  const headingId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("section", `section--${layout}`, className)}
    >
      <Reveal className="section__intro" direction="up">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={headingId} className="section__title">
          {title}
        </h2>
        {description && <p className="section__description">{description}</p>}
      </Reveal>

      <div className="section__body">{children}</div>
    </section>
  );
}

export default Section;
