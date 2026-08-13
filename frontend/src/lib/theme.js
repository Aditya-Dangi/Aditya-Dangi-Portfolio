/**
 * Theme constants and DOM plumbing shared by the provider and the inline
 * boot script in public/index.html. Keeping the storage key and the
 * resolution rule in one place means the pre-paint script and React can
 * never disagree about which theme is active.
 */

export const THEME_STORAGE_KEY = "ad-portfolio-theme";

/** @typedef {"light" | "dark" | "beige" | "brown" | "nordic" | "contrast" | "system"} ThemePreference */
/** @typedef {"light" | "dark" | "beige" | "brown" | "nordic" | "contrast"} ResolvedTheme */

/** @type {ThemePreference[]} */
export const THEME_OPTIONS = ["light", "dark", "beige", "brown", "nordic", "contrast", "system"];

/**
 * One representative colour per concrete theme, so theme-picker UIs (the
 * toggle menu, the mobile drawer, the command palette) can render a swatch
 * without each duplicating the palette's hex values from tokens.css.
 * @type {Record<ResolvedTheme, string>}
 */
export const THEME_ACCENT_COLORS = {
  light: "#4f46e5",
  dark: "#7c86f5",
  beige: "#97652f",
  brown: "#d99a4e",
  nordic: "#5eb3d6",
  contrast: "#2f6bff",
};

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

/** The theme's own --bg-canvas value, for the mobile chrome meta tag below. */
const META_THEME_COLOR = {
  light: "#ffffff",
  dark: "#08090b",
  beige: "#f3ede2",
  brown: "#1a120b",
  nordic: "#0d1520",
  contrast: "#000000",
};

/**
 * Apply a resolved theme to the document. Also syncs the browser chrome
 * colour so mobile address bars match the surface behind them.
 * @param {ResolvedTheme} theme
 */
export function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", META_THEME_COLOR[theme] ?? META_THEME_COLOR.dark);
}
