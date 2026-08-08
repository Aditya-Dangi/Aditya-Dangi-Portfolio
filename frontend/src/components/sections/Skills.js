import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Section } from "./Section";
import { TechGrid } from "./TechGrid";
import { TechOrbit } from "./TechOrbit";

/**
 * Technology stack — a search box, an orbital overview, and the
 * category-organized grid resting below it. All three read the same
 * registry (`data/techStack.js` / `config/skillIcons.js`), so nothing is
 * duplicated or hardcoded between the orbit and the grid; the grid is
 * filtered by the shared search above it.
 */
export function Skills() {
  const [query, setQuery] = useState("");

  return (
    <Section
      id="skills"
      layout="stacked"
      eyebrow="Skills"
      title="An interactive map of what I know"
      description="Every technology below links back to real production work — hover to see how it connects, click to see where and how I've used it."
    >
      <label className="techsearch">
        <FiSearch aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search technologies…"
          aria-label="Search technologies"
        />
      </label>
      <TechOrbit />
      <TechGrid query={query} />
    </Section>
  );
}

export default Skills;
