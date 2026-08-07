import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./useMediaQuery";

/**
 * Attach a subtle magnetic pull to an element: it leans toward the cursor
 * within `radius` px and springs back on leave. Pure transform, no state, no
 * re-renders — the handler writes directly to `style.transform`.
 *
 * @param {object} [options]
 * @param {number} [options.strength] 0..1, how far it travels toward the cursor
 * @param {number} [options.radius] px from center before the pull maxes out
 * @returns {React.RefObject<HTMLElement>}
 */
export function useMagnetic({ strength = 0.35, radius = 80 } = {}) {
  const ref = useRef(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || !canHover) return undefined;

    let frame = 0;

    const reset = () => {
      node.style.transform = "";
    };

    const onPointerMove = (event) => {
      const bounds = node.getBoundingClientRect();
      const centerX = bounds.left + bounds.width / 2;
      const centerY = bounds.top + bounds.height / 2;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance > radius) {
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
        reset();
        return;
      }

      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const pull = 1 - distance / radius;
        node.style.transform = `translate(${dx * strength * pull}px, ${
          dy * strength * pull
        }px)`;
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    node.addEventListener("pointerleave", reset);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      node.removeEventListener("pointerleave", reset);
      if (frame) cancelAnimationFrame(frame);
      reset();
    };
  }, [strength, radius, reduceMotion]);

  return ref;
}

export default useMagnetic;
