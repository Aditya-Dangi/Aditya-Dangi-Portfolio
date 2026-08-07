import { useEffect } from "react";
import { usePrefersReducedMotion } from "./useMediaQuery";

/**
 * Track the pointer and publish its position as CSS custom properties on
 * <html> (`--cursor-x` / `--cursor-y`, viewport px) plus a `has-fine-pointer`
 * class. Every cursor-reactive effect (hero glow, magnetic buttons, card
 * spotlights) reads these two variables instead of running its own listener,
 * so there is exactly one rAF-throttled pointermove handler for the whole
 * page regardless of how many components react to the cursor.
 *
 * No-ops on touch devices and under reduced motion — a cursor glow has
 * nothing to attach to on a touchscreen, and reduced motion means "don't add
 * effects that move on their own or track input for pure decoration."
 */
export function usePointerGlow() {
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || !canHover) return undefined;

    const root = document.documentElement;
    root.classList.add("has-fine-pointer");

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const apply = () => {
      frame = 0;
      root.style.setProperty("--cursor-x", `${x}px`);
      root.style.setProperty("--cursor-y", `${y}px`);
    };

    const onPointerMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      root.classList.remove("has-fine-pointer");
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);
}

export default usePointerGlow;
