import React from "react";
import { Dialog, Kbd } from "../ui";

const SHORTCUTS = [
  { keys: ["Ctrl", "K"], description: "Open the command palette" },
  { keys: ["/"], description: "Jump straight to search" },
  { keys: ["?"], description: "Show this shortcut list" },
  { keys: ["↑", "↓"], description: "Move through palette results" },
  { keys: ["↵"], description: "Run the highlighted command" },
  { keys: ["Esc"], description: "Close any overlay" },
  { keys: ["Tab"], description: "Move through the page by keyboard" },
];

/**
 * Keyboard reference. Discoverability matters more than the shortcuts
 * themselves — without this dialog most visitors would never find Ctrl+K.
 */
export function ShortcutsDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      size="sm"
      title="Keyboard shortcuts"
      description="Everything here also has a visible control."
    >
      <ul className="shortcut-list">
        {SHORTCUTS.map((shortcut) => (
          <li className="shortcut" key={shortcut.description}>
            <span className="shortcut__description">{shortcut.description}</span>
            <span className="shortcut__keys">
              {shortcut.keys.map((key) => (
                <Kbd key={key}>{key}</Kbd>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </Dialog>
  );
}

export default ShortcutsDialog;
