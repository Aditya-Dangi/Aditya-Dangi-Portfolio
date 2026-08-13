import React from "react";
import { FiMonitor } from "react-icons/fi";
import { FaPalette } from "react-icons/fa";
import { THEME_ACCENT_COLORS } from "../../lib/theme";
import { IconButton, Menu, Tooltip } from "../ui";
import { useTheme } from "../../theme/ThemeProvider";

const OPTIONS = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "beige", label: "Beige" },
  { id: "brown", label: "Brown" },
  { id: "nordic", label: "Nordic" },
  { id: "contrast", label: "Contrast" },
  { id: "system", label: "System", icon: <FiMonitor /> },
];

/** A small dot in the theme's own accent colour — five concrete palettes can't each get a bespoke icon, but a swatch shows what picking one actually looks like. */
function themeIcon(option) {
  if (option.icon) return option.icon;
  return <span className="theme-swatch" style={{ background: THEME_ACCENT_COLORS[option.id] }} />;
}

/**
 * Theme control. Six concrete palettes plus "follow system" — a single
 * trigger icon can't represent seven states (sun/moon stopped meaning
 * anything once themes stopped being binary), so it's a plain, static
 * "appearance" glyph and the click always opens the menu.
 */
export function ThemeToggle({ align = "end" }) {
  const { preference, theme, setPreference } = useTheme();

  const items = OPTIONS.map((option) => ({
    ...option,
    icon: themeIcon(option),
    selected: preference === option.id,
    onSelect: () => setPreference(option.id),
  }));

  return (
    <Menu
      align={align}
      label="Colour theme"
      items={items}
      trigger={
        <Tooltip label="Theme">
          <IconButton
            aria-label={`Change theme (currently ${
              preference === "system" ? `system, ${theme}` : preference
            })`}
            className="theme-toggle"
          >
            <FaPalette aria-hidden="true" />
          </IconButton>
        </Tooltip>
      }
    />
  );
}

export default ThemeToggle;
