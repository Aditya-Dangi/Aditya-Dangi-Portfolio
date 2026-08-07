/**
 * Theme constants and DOM plumbing shared by the provider and the inline
 * boot script in public/index.html. Keeping the storage key and the
 * resolution rule in one place means the pre-paint script and React can
 * never disagree about which theme is active.
 */

export const THEME_STORAGE_KEY = "ad-portfolio-theme";

/** @typedef {"light" | "dark" | "system"} ThemePreference */
/** @typedef {"light" | "dark"} ResolvedTheme */

/** @type {ThemePreference[]} */
export const THEME_OPTIONS = ["light", "dark", "system"];

/**
 * @param {unknown} value
 * @returns {value is ThemePreference}
 */
export function isThemePreference(value) {
  return THEME_OPTIONS.includes(/** @type {ThemePreference} */ (value));
}

/** @returns {ResolvedTheme} */
export function getSystemTheme() {
  if (typeof window === "undefined" || !window.matchMedia) return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

/** @returns {ThemePreference} */
export function readStoredPreference() {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(stored) ? stored : "system";
  } catch {
    // Private mode / storage disabled — fall back to following the OS.
    return "system";
  }
}

/** @param {ThemePreference} preference */
export function storePreference(preference) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    /* non-fatal: the session still themes correctly, it just won't persist */
  }
}

/**
 * @param {ThemePreference} preference
 * @returns {ResolvedTheme}
 */
export function resolveTheme(preference) {
  return preference === "system" ? getSystemTheme() : preference;
}

/**
 * Apply a resolved theme to the document. Also syncs the browser chrome
 * colour so mobile address bars match the surface behind them.
 * @param {ResolvedTheme} theme
 */
export function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#ffffff" : "#08090b");
}
