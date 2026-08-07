import React, { memo } from "react";
import { FiArrowUpRight, FiSidebar } from "react-icons/fi";
import { cn } from "../../lib/cn";
import { scrollToSection } from "../../lib/scroll";
import { sections } from "../../config/navigation";
import { profile } from "../../data/portfolio";
import { IconButton, Tooltip } from "../ui";

/**
 * Desktop section rail.
 *
 * Collapses to icons, remembers the choice, and moves a single indicator pill
 * between items rather than fading a highlight in and out — the movement is
 * what makes the active state feel connected.
 *
 * @param {object} props
 * @param {string} props.activeId
 * @param {boolean} props.collapsed
 * @param {() => void} props.onToggle
 */
export const SideRail = memo(function SideRail({ activeId, collapsed, onToggle }) {
  const activeIndex = Math.max(
    sections.findIndex((section) => section.id === activeId),
    0
  );

  return (
    <aside className={cn("rail", collapsed && "rail--collapsed")}>
      <nav className="rail__nav" aria-label="Sections">
        <ul className="rail__list" style={{ "--active-index": activeIndex }}>
          {/* Single indicator, translated into place — one animated element
              instead of one transition per item. */}
          <li className="rail__indicator" aria-hidden="true" />

          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = section.id === activeId;

            const link = (
              <a
                href={`#${section.id}`}
                className={cn("rail__link", isActive && "is-active")}
                aria-current={isActive ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(section.id);
                }}
              >
                <span className="rail__icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="rail__label">{section.label}</span>
              </a>
            );

            return (
              <li className="rail__item" key={section.id}>
                {collapsed ? (
                  <Tooltip label={section.label} placement="right">
                    {link}
                  </Tooltip>
                ) : (
                  link
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="rail__footer">
        <a
          className={cn("rail__resume", collapsed && "rail__resume--compact")}
          href={profile.resume}
          target="_blank"
          rel="noreferrer"
        >
          <FiArrowUpRight aria-hidden="true" />
          <span className="rail__label">Resume</span>
        </a>

        <Tooltip
          label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          placement="right"
        >
          <IconButton
            size="sm"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={collapsed}
            onClick={onToggle}
            className="rail__collapse"
          >
            <FiSidebar />
          </IconButton>
        </Tooltip>
      </div>
    </aside>
  );
});

export default SideRail;
