import React, { memo } from "react";
import { FiChevronRight, FiMenu, FiSearch } from "react-icons/fi";
import { cn } from "../../lib/cn";
import { scrollToSection } from "../../lib/scroll";
import { sections } from "../../config/navigation";
import { profile } from "../../data/portfolio";
import { Button, IconButton, Kbd, Tooltip } from "../ui";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Sticky application bar: brand, live breadcrumb, inline section nav on
 * medium screens, command palette trigger, theme control and the mobile menu.
 *
 * @param {object} props
 * @param {string} props.activeId
 * @param {number} props.progress 0..1 reading progress
 * @param {() => void} props.onOpenPalette
 * @param {() => void} props.onOpenDrawer
 */
export const TopBar = memo(function TopBar({
  activeId,
  progress,
  onOpenPalette,
  onOpenDrawer,
}) {
  const active = sections.find((section) => section.id === activeId) ?? sections[0];

  return (
    <header className="topbar">
      {/* Reading progress. Scale is cheap to animate and never triggers layout. */}
      <div
        className="topbar__progress"
        style={{ "--progress": progress }}
        role="progressbar"
        aria-label="Page reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      />

      <div className="topbar__inner">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <a
                className="brand"
                href="#overview"
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection("overview");
                }}
              >
                <span className="brand__mark" aria-hidden="true">
                  AD
                </span>
                <span className="brand__name">{profile.name}</span>
              </a>
            </li>
            <li className="breadcrumbs__sep" aria-hidden="true">
              <FiChevronRight />
            </li>
            <li>
              {/* Keyed so the label re-animates whenever the section changes. */}
              <span className="breadcrumbs__current" key={active.id}>
                {active.label}
              </span>
            </li>
          </ol>
        </nav>

        <nav className="topnav" aria-label="Primary">
          {sections.slice(1).map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn("topnav__link", section.id === activeId && "is-active")}
              aria-current={section.id === activeId ? "true" : undefined}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(section.id);
              }}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="topbar__actions">
          <button
            type="button"
            className="search-trigger"
            onClick={onOpenPalette}
            aria-label="Open command palette"
          >
            <FiSearch aria-hidden="true" />
            <span className="search-trigger__label">Search</span>
            <span className="search-trigger__keys" aria-hidden="true">
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </span>
          </button>

          <Tooltip label="Search & commands">
            <IconButton
              className="search-trigger-compact"
              aria-label="Open command palette"
              onClick={onOpenPalette}
            >
              <FiSearch />
            </IconButton>
          </Tooltip>

          <ThemeToggle />

          <Button
            as="a"
            variant="primary"
            size="sm"
            className="topbar__resume"
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </Button>

          <IconButton
            className="drawer-trigger"
            aria-label="Open navigation menu"
            onClick={onOpenDrawer}
          >
            <FiMenu />
          </IconButton>
        </div>
      </div>
    </header>
  );
});

export default TopBar;
