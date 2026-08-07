import React from "react";
import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";
import { IconButton, Menu, Tooltip } from "../ui";
import { useTheme } from "../../theme/ThemeProvider";

const OPTIONS = [
  { id: "light", label: "Light", icon: <FiSun /> },
  { id: "dark", label: "Dark", icon: <FiMoon /> },
  { id: "system", label: "System", icon: <FiMonitor /> },
];

/**
 * Theme control.
 *
 * A click toggles light/dark immediately (the common case); the menu exposes
 * all three preferences including following the operating system.
 */
export function ThemeToggle({ align = "end" }) {
  const { preference, theme, setPreference } = useTheme();

  const items = OPTIONS.map((option) => ({
    ...option,
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
            {/* Both icons are mounted and cross-fade, so the swap animates. */}
            <span className="theme-toggle__icons" aria-hidden="true">
              <FiSun className="theme-toggle__icon theme-toggle__icon--sun" />
              <FiMoon className="theme-toggle__icon theme-toggle__icon--moon" />
            </span>
          </IconButton>
        </Tooltip>
      }
    />
  );
}

export default ThemeToggle;
