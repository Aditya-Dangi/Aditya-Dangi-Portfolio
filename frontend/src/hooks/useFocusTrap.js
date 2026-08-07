import { useEffect } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Trap Tab focus inside a container while it is active, and hand focus back
 * to whatever opened it on close. Required for WCAG-conformant modals.
 *
 * @param {React.RefObject<HTMLElement>} containerRef
 * @param {boolean} active
 * @param {object} [options]
 * @param {boolean} [options.autoFocus] focus the first control on open
 */
export function useFocusTrap(containerRef, active, { autoFocus = true } = {}) {
  useEffect(() => {
    if (!active) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    const previouslyFocused = document.activeElement;

    const getFocusable = () =>
      Array.from(container.querySelectorAll(FOCUSABLE)).filter(
        (node) => node.offsetParent !== null || node === document.activeElement
      );

    if (autoFocus) {
      const [first] = getFocusable();
      (first ?? container).focus({ preventScroll: true });
    }

    const onKeyDown = (event) => {
      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", onKeyDown);

    return () => {
      container.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [containerRef, active, autoFocus]);
}

export default useFocusTrap;
