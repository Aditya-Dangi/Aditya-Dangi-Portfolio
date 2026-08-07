import { useEffect, useRef } from "react";

const EDITABLE = new Set(["INPUT", "TEXTAREA", "SELECT"]);

/** Don't hijack keys while the visitor is typing. */
function isTypingTarget(target) {
  if (!(target instanceof HTMLElement)) return false;
  return EDITABLE.has(target.tagName) || target.isContentEditable;
}

/**
 * Normalise a keyboard event into a comparable shortcut string,
 * e.g. "mod+k", "shift+?", "escape".
 */
function eventToCombo(event) {
  const parts = [];
  if (event.metaKey || event.ctrlKey) parts.push("mod");
  if (event.altKey) parts.push("alt");
  if (event.shiftKey) parts.push("shift");
  parts.push(event.key.toLowerCase());
  return parts.join("+");
}

/**
 * Bind global keyboard shortcuts.
 *
 * @param {Record<string, (event: KeyboardEvent) => void>} bindings
 *   map of combo -> handler, e.g. { "mod+k": open, escape: close }
 * @param {object} [options]
 * @param {boolean} [options.enabled]
 * @param {boolean} [options.allowInInputs] fire even while typing (default false)
 */
export function useHotkeys(bindings, { enabled = true, allowInInputs = false } = {}) {
  // Held in a ref so callers can pass inline objects without re-binding.
  const bindingsRef = useRef(bindings);
  bindingsRef.current = bindings;

  useEffect(() => {
    if (!enabled) return undefined;

    const onKeyDown = (event) => {
      if (!allowInInputs && isTypingTarget(event.target)) return;

      const handler =
        bindingsRef.current[eventToCombo(event)] ??
        bindingsRef.current[event.key.toLowerCase()];

      if (handler) {
        event.preventDefault();
        handler(event);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, allowInInputs]);
}

export default useHotkeys;
