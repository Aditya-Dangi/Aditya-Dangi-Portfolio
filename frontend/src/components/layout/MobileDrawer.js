import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FiArrowUpRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMonitor,
  FiX,
} from "react-icons/fi";
import { cn } from "../../lib/cn";
import { scrollToSection } from "../../lib/scroll";
import { THEME_ACCENT_COLORS } from "../../lib/theme";
import { usePresence } from "../../hooks/usePresence";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { useTheme } from "../../theme/ThemeProvider";
import { sections } from "../../config/navigation";
import { profile } from "../../data/portfolio";
import { Button, IconButton } from "../ui";

/** The six concrete palettes — "System" isn't one of them (it follows the OS
 * instead of naming a look), so it renders as its own row below, not a 7th
 * grid cell that would leave the 3-column grid with an orphaned last row. */
const THEME_CHOICES = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "beige", label: "Beige" },
  { id: "brown", label: "Brown" },
  { id: "nordic", label: "Nordic" },
  { id: "contrast", label: "Contrast" },
];

/**
 * Full-height navigation drawer for small screens: sections, theme choice,
 * social links and the resume actions, i.e. everything the desktop rail and
 * top bar offer.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {string} props.activeId
 */
export function MobileDrawer({ open, onClose, activeId }) {
  const { mounted, state } = usePresence(open, 260);
  const panelRef = useRef(null);
  const { preference, setPreference } = useTheme();

  useFocusTrap(panelRef, mounted && open);
  useLockBodyScroll(mounted);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  const go = (id) => {
    onClose();
    window.setTimeout(() => scrollToSection(id), 80);
  };

  return createPortal(
    <div className="drawer-root" data-state={state}>
      <div
        className="overlay__scrim"
        data-state={state}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        data-state={state}
        className="drawer"
      >
        <header className="drawer__header">
          <span className="drawer__title">Navigate</span>
          <IconButton aria-label="Close navigation menu" onClick={onClose}>
            <FiX />
          </IconButton>
        </header>

        <nav className="drawer__nav" aria-label="Sections">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isActive = section.id === activeId;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={cn("drawer__link", isActive && "is-active")}
                aria-current={isActive ? "true" : undefined}
                style={{ "--item-index": index }}
                onClick={(event) => {
                  event.preventDefault();
                  go(section.id);
                }}
              >
                <span className="drawer__link-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="drawer__link-text">
                  <span className="drawer__link-label">{section.label}</span>
                  <span className="drawer__link-hint">{section.hint}</span>
                </span>
              </a>
            );
          })}
        </nav>

        <div className="drawer__section">
          <p className="drawer__section-title" id="drawer-theme-label">
            Theme
          </p>
          <div
            className="segmented"
            role="radiogroup"
            aria-labelledby="drawer-theme-label"
          >
            {THEME_CHOICES.map((choice) => (
              <button
                key={choice.id}
                type="button"
                role="radio"
                aria-checked={preference === choice.id}
                className={cn(
                  "segmented__option",
                  preference === choice.id && "is-selected"
                )}
                onClick={() => setPreference(choice.id)}
              >
                <span aria-hidden="true">
                  {choice.icon ?? (
                    <span
                      className="theme-swatch"
                      style={{ background: THEME_ACCENT_COLORS[choice.id] }}
                    />
                  )}
                </span>
                {choice.label}
              </button>
            ))}
          </div>

          <div
            className="segmented segmented--single"
            role="radiogroup"
            aria-labelledby="drawer-theme-label"
          >
            <button
              type="button"
              role="radio"
              aria-checked={preference === "system"}
              className={cn(
                "segmented__option",
                preference === "system" && "is-selected"
              )}
              onClick={() => setPreference("system")}
            >
              <FiMonitor aria-hidden="true" />
              System
            </button>
          </div>
        </div>

        <div className="drawer__footer">
          <Button as="a" variant="accent" fullWidth href={`mailto:${profile.email}`}>
            <FiMail aria-hidden="true" />
            Contact me
          </Button>

          <div className="drawer__actions">
            <Button
              as="a"
              variant="secondary"
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
            >
              <FiArrowUpRight aria-hidden="true" />
              Resume
            </Button>
            <Button
              as="a"
              variant="secondary"
              href={profile.resumeDownload}
              download={profile.resumeDownloadName}
            >
              <FiDownload aria-hidden="true" />
              PDF
            </Button>
          </div>

          <div className="drawer__social">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <FiGithub aria-hidden="true" />
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <FiLinkedin aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default MobileDrawer;
