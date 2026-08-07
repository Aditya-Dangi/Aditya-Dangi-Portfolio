import React from "react";
import { FiCommand, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "../../data/portfolio";
import { useAppShell } from "../layout/AppShell";
import { Kbd } from "../ui";

export function Footer() {
  const { openShortcuts } = useAppShell();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__identity">
          <p className="site-footer__name">
            Designed and built by {profile.name}
          </p>
          <p className="site-footer__role">
            Software Engineer - Java, Spring Boot, Angular
          </p>
        </div>

        <div className="site-footer__links">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FiGithub aria-hidden="true" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin aria-hidden="true" />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <FiMail aria-hidden="true" />
          </a>

          <button
            type="button"
            className="site-footer__shortcuts"
            onClick={openShortcuts}
          >
            <FiCommand aria-hidden="true" />
            Shortcuts
            <Kbd>?</Kbd>
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
