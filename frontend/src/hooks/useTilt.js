import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./useMediaQuery";

/**
 * 3D pointer-tilt for cards: rotates the element toward the cursor within
 * its own bounds and eases back to flat on leave. Transform-only (perspective
 * + rotateX/rotateY), rAF-throttled, and skipped entirely on touch or under
 * reduced motion so it never fights a scroll gesture.
 *
 * @param {object} [options]
 * @param {number} [options.max] maximum tilt in degrees
 * @returns {React.RefObject<HTMLElement>}
 */
export function useTilt({ max = 6 } = {}) {
  const ref = useRef(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduceMotion || !canHover) return undefined;

    let frame = 0;

    const onPointerMove = (event) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const bounds = node.getBoundingClientRect();
        const px = (event.clientX - bounds.left) / bounds.width - 0.5;
        const py = (event.clientY - bounds.top) / bounds.height - 0.5;
        node.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(
          2
        )}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`;
        node.style.setProperty("--tilt-px", `${(px + 0.5) * 100}%`);
        node.style.setProperty("--tilt-py", `${(py + 0.5) * 100}%`);
      });
    };

    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      node.style.transform = "";
    };

    node.addEventListener("pointermove", onPointerMove);
    node.addEventListener("pointerleave", reset);

    return () => {
      node.removeEventListener("pointermove", onPointerMove);
      node.removeEventListener("pointerleave", reset);
      if (frame) cancelAnimationFrame(frame);
      reset();
    };
  }, [max, reduceMotion]);

  return ref;
}

export default useTilt;
