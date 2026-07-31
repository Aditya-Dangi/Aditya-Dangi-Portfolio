import React from "react";
import {
  FiArrowUpRight,
  FiExternalLink,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import {
  SiAngular,
  SiDocker,
  SiGit,
  SiGithub,
  SiHibernate,
  SiIntellijidea,
  SiJavascript,
  SiMysql,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPostman,
  SiSpringboot,
  SiSwagger,
  SiTypescript,
  SiVisualstudiocode,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";
import { TbApi, TbBrandOauth, TbBug, TbCodeDots } from "react-icons/tb";
import { LuBrainCircuit, LuWorkflow } from "react-icons/lu";
import {
  achievements,
  experience,
  highlights,
  profile,
  projects,
  skills,
  strengths,
} from "../data/portfolio";
import "./Portfolio.css";
const navItems = [
  ["About", "about"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Contact", "contact"],
];

const skillIcons = {
  Java: FaJava,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  SQL: DiMsqlServer,
  "Spring Boot": SiSpringboot,
  "Spring Security": SiSpringboot,
  Hibernate: SiHibernate,
  JPA: LuWorkflow,
  "REST APIs": TbApi,
  JWT: TbBrandOauth,
  "Swagger/OpenAPI": SiSwagger,
  Angular: SiAngular,
  RxJS: SiAngular,
  "Responsive UI": TbCodeDots,
  "Component Architecture": LuWorkflow,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Docker: SiDocker,
  Maven: SiOpenapiinitiative,
  Git: SiGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  "IntelliJ IDEA": SiIntellijidea,
  "VS Code": SiVisualstudiocode,
  OOP: LuBrainCircuit,
  "Data Structures": LuBrainCircuit,
  Algorithms: TbCodeDots,
  Debugging: TbBug,
  Agile: LuWorkflow,
  SDLC: LuWorkflow,
};

function Portfolio() {
  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Go to top">
        <span className="brand-mark">AD</span>
        <span>Aditya Dangi</span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map(([label, id]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>

      <a className="nav-action" href={profile.resume} target="_blank" rel="noreferrer">
        Resume
        <FiArrowUpRight aria-hidden="true" />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero-section" id="top">
      <div className="hero-copy reveal">
        <p className="eyebrow">Software Engineer @ Newgen Software</p>
        <h1>{profile.headline}</h1>
        <p className="hero-summary">{profile.summary}</p>

        <div className="hero-actions">
          <a className="button button-primary" href={`mailto:${profile.email}`}>
            <FiMail aria-hidden="true" />
            Contact me
          </a>
          <a className="button button-secondary" href={profile.resume} target="_blank" rel="noreferrer">
            <FiDownload aria-hidden="true" />
            View resume
          </a>
          <a
            className="button button-secondary"
            href={profile.resumeDownload}
            download={profile.resumeDownloadName}
            type="application/pdf"
          >
            <FiDownload aria-hidden="true" />
            Download PDF
          </a>
        </div>
      </div>

      <aside className="hero-panel reveal delay-1" aria-label="Professional snapshot">
        <div className="identity-card">
          <p className="card-label">Recruiter snapshot</p>
          <h2>Java + Spring Boot + Angular</h2>
          <p>
            Enterprise banking experience, secure API workflows, Angular
            modernization, and deployed frontend projects.
          </p>
        </div>
        <div className="metric-grid">
          {highlights.map((item) => (
            <div className="metric" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <SectionIntro
        eyebrow="About"
        title="I build product surfaces and backend workflows that hold up in enterprise environments."
        description="The throughline is reliability: clean API contracts, readable UI architecture, secure access control, and steady delivery through testing and release cycles."
      />
      <div className="content-stack">
        {strengths.map((item, index) => (
          <article className="statement-card reveal" style={{ "--delay": `${index * 80}ms` }} key={item}>
            <span>0{index + 1}</span>
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section section-grid compact-grid" id="experience">
      <SectionIntro
        eyebrow="Experience"
        title="What impact have I delivered?"
        description="My current work sits at the intersection of banking workflows, maintainable frontend architecture, API integration, and release ownership."
      />

      <div className="content-stack">
        {experience.map((job) => (
          <article className="experience-card reveal" key={job.company}>
            <div className="experience-head">
              <div>
                <p className="card-label">{job.period}</p>
                <h3>{job.role}</h3>
                <p>{job.company} - {job.location}</p>
              </div>
              <span>Enterprise banking</span>
            </div>
            <p className="experience-context">{job.context}</p>
            <ul className="impact-list">
              {job.impact.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section" id="projects">
      <SectionIntro
        eyebrow="Projects"
        title="Full-stack systems, Angular products, and shipped web interfaces."
        description="A combined view of resume-backed engineering projects and the original deployed portfolio work recovered from the repository."
      />

      <div className="project-list">
        {projects.map((project, index) => (
          <article
            className="project-card reveal"
            style={{ "--delay": `${index * 70}ms` }}
            key={project.title}
          >
            <div>
              <div className="project-head">
                <div>
                  <p className="card-label">{project.type}</p>
                  <h3>{project.title}</h3>
                </div>
                <span>{project.year}</span>
              </div>
              <p>{project.description}</p>
              <ul className="impact-list compact">
                {project.outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="tag-row">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              {project.links.length > 0 && (
                <div className="project-actions">
                  {project.links.map((link) => (
                    <a
                      className={link.label === "Live Demo" ? "button button-primary" : "button button-secondary"}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      key={link.href}
                    >
                      {link.label === "Live Demo" ? <FiExternalLink aria-hidden="true" /> : <FiGithub aria-hidden="true" />}
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section section-grid compact-grid" id="skills">
      <SectionIntro
        eyebrow="Skills"
        title="What technologies do I know?"
        description="A focused stack for modern full-stack product engineering: Java services, Angular interfaces, secure APIs, SQL persistence, and delivery tooling."
      />

      <div className="skills-grid">
        {skills.map((skill) => (
          <article className="skill-card reveal" key={skill.group}>
            <h3>{skill.group}</h3>
            <div className="tag-row">
              {skill.items.map((item) => {
                const Icon = skillIcons[item] || TbCodeDots;

                return (
                  <span className="skill-pill" key={item}>
                    <Icon aria-hidden="true" />
                    {item}
                  </span>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section className="section section-grid compact-grid achievements-section" aria-labelledby="achievements-title">
      <SectionIntro
        eyebrow="Achievements"
        title="Signals beyond work"
        description="Consistent practice, strong academic fundamentals, and hackathon experience support the production work."
      />

      <div className="content-stack" id="achievements-title">
        {achievements.map((item) => (
          <article className="achievement-card reveal" key={item}>
            {item}
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="contact-card reveal">
        <p className="eyebrow">Contact</p>
        <h2>How do you reach me?</h2>
        <p>
          I am open to software engineering opportunities where I can contribute
          to secure, scalable products and keep growing around strong engineering teams.
        </p>

        <div className="contact-actions">
          <a className="button button-primary" href={`mailto:${profile.email}`}>
            <FiMail aria-hidden="true" />
            {profile.email}
          </a>
          <a className="button button-secondary" href={`tel:${profile.phone.replace(/\s/g, "")}`}>
            <FiPhone aria-hidden="true" />
            {profile.phone}
          </a>
        </div>

        <div className="social-grid">
          <a href={profile.github} target="_blank" rel="noreferrer">
            <FiGithub aria-hidden="true" />
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <FiLinkedin aria-hidden="true" />
            LinkedIn
          </a>
          <a href="https://www.google.com/maps/place/Delhi,+India" target="_blank" rel="noreferrer">
            <FiMapPin aria-hidden="true" />
            Delhi, India
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, description }) {
  return (
    <div className="section-intro reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <span>Designed and built by {profile.name}</span>
      <span>Software Engineer - Java, Spring Boot, Angular</span>
    </footer>
  );
}

export default Portfolio;
