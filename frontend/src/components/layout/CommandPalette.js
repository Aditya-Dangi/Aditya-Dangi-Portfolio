import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  FiArrowUpRight,
  FiCopy,
  FiCornerDownLeft,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMonitor,
  FiMoon,
  FiPhone,
  FiSearch,
  FiSun,
} from "react-icons/fi";
import { cn } from "../../lib/cn";
import { scrollToSection } from "../../lib/scroll";
import { THEME_ACCENT_COLORS } from "../../lib/theme";
import { usePresence } from "../../hooks/usePresence";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { useClipboard } from "../../hooks/useClipboard";
import { useTheme } from "../../theme/ThemeProvider";
import { sections } from "../../config/navigation";
import { profile, projects } from "../../data/portfolio";
import { EmptyState, Kbd, useToast } from "../ui";

const GROUP_ORDER = ["Navigation", "Projects", "Links", "Preferences"];

/**
 * Cmd/Ctrl+K command palette.
 *
 * Everything reachable by clicking around the page is reachable from here:
 * sections, project links, contact details and theme preferences. Filtering
 * is a simple case-insensitive match over a keyword string built per action,
 * which is more predictable than fuzzy matching on a list this size.
 */
export function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const { mounted, state } = usePresence(open, 180);
  const panelRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const { setPreference } = useTheme();
  const { copy } = useClipboard();
  const { toast } = useToast();

  useFocusTrap(panelRef, mounted && open, { autoFocus: false });
  useLockBodyScroll(mounted);

  const run = useCallback(
    (action) => {
      onClose();
      // Let the palette finish closing before scrolling or opening a tab, so
      // the transition isn't competing with a scroll animation.
      window.setTimeout(action, 60);
    },
    [onClose]
  );

  const commands = useMemo(() => {
    /** @type {{id: string, group: string, label: string, hint?: string, icon: React.ReactNode, keywords: string, perform: () => void}[]} */
    const list = [];

    sections.forEach((section) => {
      const Icon = section.icon;
      list.push({
        id: `section-${section.id}`,
        group: "Navigation",
        label: `Go to ${section.label}`,
        hint: section.hint,
        icon: <Icon />,
        keywords: `${section.label} ${section.hint} jump scroll`,
        perform: () => scrollToSection(section.id),
      });
    });

    projects.forEach((project) => {
      project.links.forEach((link) => {
        list.push({
          id: `project-${project.title}-${link.label}`,
          group: "Projects",
          label: `${project.title} - ${link.label}`,
          hint: project.stack.join(", "),
          icon: link.label === "Live Demo" ? <FiExternalLink /> : <FiGithub />,
          keywords: `${project.title} ${link.label} ${project.stack.join(" ")} ${project.type}`,
          perform: () => window.open(link.href, "_blank", "noopener,noreferrer"),
        });
      });
    });

    list.push(
      {
        id: "link-resume",
        group: "Links",
        label: "View resume",
        hint: "Opens in a new tab",
        icon: <FiArrowUpRight />,
        keywords: "resume cv pdf document",
        perform: () => window.open(profile.resume, "_blank", "noopener,noreferrer"),
      },
      {
        id: "link-resume-download",
        group: "Links",
        label: "Download resume (PDF)",
        icon: <FiDownload />,
        keywords: "resume cv download pdf save",
        perform: () => {
          window.location.href = profile.resumeDownload;
        },
      },
      {
        id: "link-email",
        group: "Links",
        label: "Send an email",
        hint: profile.email,
        icon: <FiMail />,
        keywords: `email mail contact ${profile.email}`,
        perform: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "link-copy-email",
        group: "Links",
        label: "Copy email address",
        hint: profile.email,
        icon: <FiCopy />,
        keywords: `copy email clipboard ${profile.email}`,
        perform: async () => {
          const ok = await copy(profile.email);
          toast(
            ok
              ? {
                  title: "Email copied",
                  description: profile.email,
                  tone: "success",
                }
              : {
                  title: "Could not copy",
                  description: "Your browser blocked clipboard access.",
                  tone: "error",
                }
          );
        },
      },
      {
        id: "link-phone",
        group: "Links",
        label: "Call",
        hint: profile.phone,
        icon: <FiPhone />,
        keywords: `phone call mobile ${profile.phone}`,
        perform: () => {
          window.location.href = `tel:${profile.phone.replace(/\s/g, "")}`;
        },
      },
      {
        id: "link-github",
        group: "Links",
        label: "Open GitHub profile",
        icon: <FiGithub />,
        keywords: "github code repositories source",
        perform: () => window.open(profile.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "link-linkedin",
        group: "Links",
        label: "Open LinkedIn profile",
        icon: <FiLinkedin />,
        keywords: "linkedin social network profile",
        perform: () =>
          window.open(profile.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "theme-light",
        group: "Preferences",
        label: "Switch to light theme",
        icon: <FiSun />,
        keywords: "theme light day bright appearance",
        perform: () => setPreference("light"),
      },
      {
        id: "theme-dark",
        group: "Preferences",
        label: "Switch to dark theme",
        icon: <FiMoon />,
        keywords: "theme dark night appearance",
        perform: () => setPreference("dark"),
      },
      {
        id: "theme-beige",
        group: "Preferences",
        label: "Switch to beige theme",
        icon: <span className="theme-swatch" style={{ background: THEME_ACCENT_COLORS.beige }} />,
        keywords: "theme beige tan warm light appearance",
        perform: () => setPreference("beige"),
      },
      {
        id: "theme-brown",
        group: "Preferences",
        label: "Switch to brown theme",
        icon: <span className="theme-swatch" style={{ background: THEME_ACCENT_COLORS.brown }} />,
        keywords: "theme brown espresso coffee dark appearance",
        perform: () => setPreference("brown"),
      },
      {
        id: "theme-nordic",
        group: "Preferences",
        label: "Switch to nordic theme",
        icon: <span className="theme-swatch" style={{ background: THEME_ACCENT_COLORS.nordic }} />,
        keywords: "theme nordic blue slate dark appearance",
        perform: () => setPreference("nordic"),
      },
      {
        id: "theme-contrast",
        group: "Preferences",
        label: "Switch to contrast theme",
        icon: <span className="theme-swatch" style={{ background: THEME_ACCENT_COLORS.contrast }} />,
        keywords: "theme contrast black high vivid accessibility appearance",
        perform: () => setPreference("contrast"),
      },
      {
        id: "theme-system",
        group: "Preferences",
        label: "Use system theme",
        icon: <FiMonitor />,
        keywords: "theme system auto os appearance",
        perform: () => setPreference("system"),
      }
    );

    return list;
  }, [setPreference, copy, toast]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.keywords}`.toLowerCase().includes(needle)
    );
  }, [commands, query]);

  const groups = useMemo(() => {
    const map = new Map();
    results.forEach((command) => {
      if (!map.has(command.group)) map.set(command.group, []);
      map.get(command.group).push(command);
    });
    return GROUP_ORDER.filter((group) => map.has(group)).map((group) => ({
      group,
      items: map.get(group),
    }));
  }, [results]);

  // Flat order matches what the arrow keys walk through.
  const flat = useMemo(() => groups.flatMap((entry) => entry.items), [groups]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      // Focus after the enter transition starts so iOS doesn't scroll the page.
      const frame = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, [open]);

  // Keep the highlighted row in view during keyboard navigation.
  useEffect(() => {
    const node = listRef.current?.querySelector('[data-active="true"]');
    node?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const onKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index) => (flat.length ? (index + 1) % flat.length : 0));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index) =>
          flat.length ? (index - 1 + flat.length) % flat.length : 0
        );
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(Math.max(flat.length - 1, 0));
        break;
      case "Enter": {
        event.preventDefault();
        const command = flat[activeIndex];
        if (command) run(command.perform);
        break;
      }
      case "Escape":
        event.preventDefault();
        onClose();
        break;
      default:
        break;
    }
  };

  if (!mounted) return null;

  let cursor = -1;

  return createPortal(
    <div className="overlay overlay--top" data-state={state}>
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
        aria-label="Command palette"
        data-state={state}
        className="palette"
        onKeyDown={onKeyDown}
      >
        <div className="palette__search">
          <FiSearch aria-hidden="true" className="palette__search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="palette__input"
            placeholder="Search sections, projects, links..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search commands"
            aria-controls="command-palette-list"
            aria-activedescendant={flat[activeIndex]?.id}
            autoComplete="off"
            spellCheck="false"
          />
          <Kbd>Esc</Kbd>
        </div>

        <div className="palette__list" id="command-palette-list" ref={listRef} role="listbox" aria-label="Commands">
          {groups.length === 0 && (
            <EmptyState
              title="No matches"
              description={`Nothing matched "${query.trim()}". Try a section name, a project, or "theme".`}
            />
          )}

          {groups.map(({ group, items }) => (
            <div className="palette__group" key={group}>
              <p className="palette__group-label" aria-hidden="true">
                {group}
              </p>
              {items.map((command) => {
                cursor += 1;
                const index = cursor;
                const isActive = index === activeIndex;

                return (
                  <button
                    key={command.id}
                    id={command.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    data-active={isActive}
                    tabIndex={-1}
                    className={cn("palette__item", isActive && "is-active")}
                    style={{ "--item-index": index }}
                    onPointerMove={() => setActiveIndex(index)}
                    onClick={() => run(command.perform)}
                  >
                    <span className="palette__item-icon" aria-hidden="true">
                      {command.icon}
                    </span>
                    <span className="palette__item-text">
                      <span className="palette__item-label">{command.label}</span>
                      {command.hint && (
                        <span className="palette__item-hint">{command.hint}</span>
                      )}
                    </span>
                    <FiCornerDownLeft
                      className="palette__item-enter"
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <footer className="palette__footer">
          <span>
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> navigate
          </span>
          <span>
            <Kbd>↵</Kbd> select
          </span>
          <span>
            <Kbd>Esc</Kbd> close
          </span>
        </footer>
      </div>
    </div>,
    document.body
  );
}

export default CommandPalette;
