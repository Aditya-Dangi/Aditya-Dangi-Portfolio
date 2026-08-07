import { useEffect, useState } from "react";

/**
 * Keep a component mounted while its exit animation plays.
 *
 * Returns `mounted` (should the node exist in the tree) and `state`
 * ("open" | "closed") which components map to enter/exit CSS. This is the
 * single mechanism behind every overlay in the app, so dialogs, menus,
 * drawers and toasts all close with the same timing.
 *
 * @param {boolean} open
 * @param {number} [exitDuration] ms — must match the CSS exit animation
 * @returns {{mounted: boolean, state: "open" | "closed"}}
 */
export function usePresence(open, exitDuration = 180) {
  const [mounted, setMounted] = useState(open);
  const [state, setState] = useState(open ? "open" : "closed");

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Mount closed, then flip on the next frame so the enter transition
      // actually has a starting state to animate from.
      const frame = requestAnimationFrame(() => setState("open"));
      return () => cancelAnimationFrame(frame);
    }

    setState("closed");
    const timer = window.setTimeout(() => setMounted(false), exitDuration);
    return () => window.clearTimeout(timer);
  }, [open, exitDuration]);

  return { mounted, state };
}

export default usePresence;
