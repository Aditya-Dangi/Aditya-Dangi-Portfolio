import React, {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../../lib/cn";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useHotkeys } from "../../hooks/useHotkeys";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePersistentState } from "../../hooks/usePersistentState";
import { sectionIds } from "../../config/navigation";
import { TopBar } from "./TopBar";
import { SideRail } from "./SideRail";
import { BackToTop } from "./BackToTop";
import { CursorGlow } from "./CursorGlow";
import "./layout.css";

/* Overlays are not needed for first paint, so they ship in their own chunks
   and are fetched the first time a visitor opens one. */
const MobileDrawer = lazy(() =>
  import("./MobileDrawer").then((module) => ({ default: module.MobileDrawer }))
);
const CommandPalette = lazy(() =>
  import("./CommandPalette").then((module) => ({ default: module.CommandPalette }))
);
const ShortcutsDialog = lazy(() =>
  import("./ShortcutsDialog").then((module) => ({ default: module.ShortcutsDialog }))
);

/**
 * @typedef {object} AppShellContextValue
 * @property {string} activeId       currently visible section
 * @property {() => void} openPalette
 * @property {() => void} openShortcuts
 */

const AppShellContext = createContext(
  /** @type {AppShellContextValue | null} */ (null)
);

/**
 * Keep an overlay in the tree once it has been opened, so its exit animation
 * can play and its chunk isn't re-requested on the next open.
 */
function useLazyMount(open) {
  const opened = useRef(false);
  if (open) opened.current = true;
  return opened.current;
}

/**
 * Application chrome: top bar, desktop rail, mobile drawer, command palette,
 * shortcut reference and the ambient background. Owns navigation state so
 * every navigation surface stays in sync from one place.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children  page sections, rendered into <main>
 * @param {React.ReactNode} [props.footer]  rendered outside <main> so it keeps
 *   its contentinfo landmark
 */
export function AppShell({ children, footer }) {
  const activeId = useScrollSpy(sectionIds);
  const progress = useScrollProgress();
  const isDesktop = useMediaQuery("(min-width: 1180px)");

  const [railCollapsed, setRailCollapsed] = usePersistentState(
    "ad-portfolio-rail-collapsed",
    false
  );
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const openShortcuts = useCallback(() => setShortcutsOpen(true), []);
  const closeShortcuts = useCallback(() => setShortcutsOpen(false), []);

  useHotkeys({
    "mod+k": () => setPaletteOpen((open) => !open),
    // "/" is the other muscle memory for search; both land in the same place.
    "/": openPalette,
    "shift+?": openShortcuts,
    "?": openShortcuts,
  });

  // Resizing past the desktop breakpoint should not leave a hidden drawer
  // holding the focus trap and the scroll lock.
  useEffect(() => {
    if (isDesktop) setDrawerOpen(false);
  }, [isDesktop]);

  const renderDrawer = useLazyMount(drawerOpen);
  const renderPalette = useLazyMount(paletteOpen);
  const renderShortcuts = useLazyMount(shortcutsOpen);

  const context = useMemo(
    () => ({ activeId, openPalette, openShortcuts }),
    [activeId, openPalette, openShortcuts]
  );

  return (
    <AppShellContext.Provider value={context}>
      <div
        className={cn("shell", railCollapsed && "shell--rail-collapsed")}
        data-active-section={activeId}
      >
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>

        <CursorGlow />

        {/* Decorative background: a soft aurora wash plus a faint grid. */}
        <div className="backdrop" aria-hidden="true">
          <div className="backdrop__aurora backdrop__aurora--one" />
          <div className="backdrop__aurora backdrop__aurora--two" />
          <div className="backdrop__grid" />
          <div className="backdrop__noise" />
        </div>

        <TopBar
          activeId={activeId}
          progress={progress}
          onOpenPalette={openPalette}
          onOpenDrawer={() => setDrawerOpen(true)}
        />

        <SideRail
          activeId={activeId}
          collapsed={railCollapsed}
          onToggle={() => setRailCollapsed((value) => !value)}
        />

        <main id="main-content" className="shell__main" tabIndex={-1}>
          {children}
        </main>

        {footer}

        <Suspense fallback={null}>
          {renderDrawer && (
            <MobileDrawer
              open={drawerOpen}
              onClose={closeDrawer}
              activeId={activeId}
            />
          )}
          {renderPalette && (
            <CommandPalette open={paletteOpen} onClose={closePalette} />
          )}
          {renderShortcuts && (
            <ShortcutsDialog open={shortcutsOpen} onClose={closeShortcuts} />
          )}
        </Suspense>

        <BackToTop progress={progress} />
      </div>
    </AppShellContext.Provider>
  );
}

/** @returns {AppShellContextValue} */
export function useAppShell() {
  const context = useContext(AppShellContext);
  if (!context) throw new Error("useAppShell must be used inside <AppShell>");
  return context;
}

export default AppShell;
