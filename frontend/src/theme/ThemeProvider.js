import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  applyTheme,
  getSystemTheme,
  readStoredPreference,
  storePreference,
} from "../lib/theme";

/**
 * @typedef {object} ThemeContextValue
 * @property {import("../lib/theme").ThemePreference} preference  what the user chose
 * @property {import("../lib/theme").ResolvedTheme} theme         what is actually rendered
 * @property {(next: import("../lib/theme").ThemePreference) => void} setPreference
 */

const ThemeContext = createContext(/** @type {ThemeContextValue | null} */ (null));

/**
 * Owns theme preference, system detection, persistence and the cross-fade.
 * The initial value is read synchronously so the first paint already matches
 * the pre-paint boot script and nothing flashes.
 */
export function ThemeProvider({ children }) {
  const [preference, setPreferenceState] = useState(readStoredPreference);
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);
  const transitionTimer = useRef(/** @type {number | undefined} */ (undefined));
  const isFirstRun = useRef(true);

  const theme = preference === "system" ? systemTheme : preference;

  // Follow the OS while the preference is "system".
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (event) => setSystemTheme(event.matches ? "light" : "dark");

    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Paint the theme. The universal cross-fade class is attached only for the
  // duration of a swap so it never taxes ordinary interactions.
  useEffect(() => {
    const root = document.documentElement;

    if (isFirstRun.current) {
      isFirstRun.current = false;
      applyTheme(theme);
      return undefined;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      applyTheme(theme);
      return undefined;
    }

    root.classList.add("theme-transition");
    applyTheme(theme);

    window.clearTimeout(transitionTimer.current);
    // Matches --duration-base (220ms) plus a small margin, not the old 400ms
    // --duration-slow — the shorter the forced-transition window, the less
    // time the browser spends compositing every themed node at once.
    transitionTimer.current = window.setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 260);

    return () => window.clearTimeout(transitionTimer.current);
  }, [theme]);

  const setPreference = useCallback((next) => {
    setPreferenceState(next);
    storePreference(next);
  }, []);

  const value = useMemo(
    () => ({ preference, theme, setPreference }),
    [preference, theme, setPreference]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** @returns {ThemeContextValue} */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return context;
}

export default ThemeProvider;
