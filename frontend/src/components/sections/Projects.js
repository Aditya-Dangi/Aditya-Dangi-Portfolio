import React, { useMemo, useState } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { cn } from "../../lib/cn";
import { projects } from "../../data/portfolio";
import { useTilt } from "../../hooks/useTilt";
import { Badge, Button, Card, EmptyState, Reveal, Tabs, Thumbnail } from "../ui";
import { Section } from "./Section";
import { RepoStats } from "./RepoStats";
import fyleImage from "../../assets/fyle-project.jpg";
import gameImage from "../../assets/game.jpg";
import wordleImage from "../../assets/wordle-clone.jpg";
import fitnessImage from "../../assets/fitness-exercises-app.jpg";
import fraudImage from "../../assets/ai-fraud-detection.jpg";

/**
 * Bundled previews, keyed by the filename already stored in the data layer so
 * the data file stays free of build-tool concerns.
 */
const previews = {
  "fyle-project.jpg": fyleImage,
  "game.jpg": gameImage,
  "wordle-clone.jpg": wordleImage,
  "fitness-exercises-app.jpg": fitnessImage,
  "ai-fraud-detection.jpg": fraudImage,
};

const ALL = "All";

/** First letters of the project title, used by the no-image fallback tile. */
function monogramOf(title) {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/** The URL shown in the mockup's fake address bar. */
function displayUrl(project) {
  const live = project.links.find((link) => link.label === "Live Demo");
  if (live) return new URL(live.href).host + new URL(live.href).pathname.replace(/\/$/, "");
  return `localhost — ${project.title.toLowerCase().replace(/\s+/g, "-")}`;
}

export function Projects() {
  const [filter, setFilter] = useState(ALL);

  const filters = useMemo(
    () => [ALL, ...Array.from(new Set(projects.map((project) => project.type)))],
    []
  );

  const visible = useMemo(
    () =>
      filter === ALL
        ? projects
        : projects.filter((project) => project.type === filter),
    [filter]
  );

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Full-stack systems, Angular products, and shipped web interfaces."
      description="A combined view of resume-backed engineering projects and the original deployed portfolio work recovered from the repository."
    >
      <div
        className="filter-bar"
        role="group"
        aria-label="Filter projects by type"
      >
        {filters.map((option) => (
          <button
            key={option}
            type="button"
            className={cn("filter-chip", filter === option && "is-active")}
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
          >
            {option}
            <span className="filter-chip__count">
              {option === ALL
                ? projects.length
                : projects.filter((project) => project.type === option).length}
            </span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>

      {visible.length === 0 ? (
        <EmptyState
          title="No projects in this category"
          description="Clear the filter to see everything."
          action={
            <Button variant="secondary" size="sm" onClick={() => setFilter(ALL)}>
              Show all projects
            </Button>
          }
        />
      ) : (
        <div className="project-grid">
          {visible.map((project, index) => (
            <Reveal
              // Keyed by filter so cards re-animate when the list changes.
              key={`${filter}-${project.title}`}
              direction="up"
              delay={Math.min(index, 4) * 70}
              className={cn(
                "project-cell",
                index === 0 && filter === ALL && "project-cell--wide"
              )}
            >
              <ProjectCard
                project={project}
                featured={index === 0 && filter === ALL}
              />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

function ProjectCard({ project, featured }) {
  const preview = project.image ? previews[project.image] : undefined;
  const tiltRef = useTilt({ max: 4 });
  const githubLink = project.links.find((link) => link.label === "GitHub");

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      panel: (
        <>
          <p className="project__description">{project.description}</p>
          <ul className="impact impact--compact">
            {project.outcomes.map((item) => (
              <li className="impact__item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </>
      ),
    },
    {
      id: "stack",
      label: "Stack",
      panel: (
        <ul className="tag-row tag-row--flush" aria-label={`${project.title} tech stack`}>
          {project.stack.map((item) => (
            <li key={item}>
              <Badge>{item}</Badge>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "links",
      label: "Links",
      panel: (
        <div className="project__links-panel">
          {githubLink && <RepoStats repoUrl={githubLink.href} />}
          {project.links.length > 0 ? (
            <div className="project__actions">
              {project.links.map((link) => (
                <Button
                  as="a"
                  key={link.href}
                  variant={link.label === "Live Demo" ? "accent" : "secondary"}
                  size="sm"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${link.label} - ${project.title}`}
                >
                  {link.label === "Live Demo" ? (
                    <FiExternalLink aria-hidden="true" />
                  ) : (
                    <FiGithub aria-hidden="true" />
                  )}
                  {link.label}
                </Button>
              ))}
            </div>
          ) : (
            <p className="project__no-links">
              Not published publicly — built during a hackathon sprint.
            </p>
          )}
        </div>
      ),
    },
  ];

  return (
    <Card
      ref={tiltRef}
      as="article"
      interactive
      spotlight
      padding="none"
      className={cn("project", featured && "project--featured")}
    >
      <div className="project__mockup">
        <div className="browser-chrome">
          <span className="browser-chrome__dot" />
          <span className="browser-chrome__dot" />
          <span className="browser-chrome__dot" />
          <span className="browser-chrome__url">{displayUrl(project)}</span>
        </div>
        <Thumbnail
          className="project__media"
          src={preview}
          alt={`Preview of ${project.title}`}
          monogram={monogramOf(project.title)}
        />
      </div>

      <div className="project__body">
        <header className="project__header">
          <div className="project__heading">
            <Badge tone="accent" size="sm">
              {project.type}
            </Badge>
            <h3 className="project__title">{project.title}</h3>
          </div>
          <span className="project__year numeric">{project.year}</span>
        </header>

        <Tabs label={`${project.title} details`} tabs={tabs} />
      </div>
    </Card>
  );
}

export default Projects;
