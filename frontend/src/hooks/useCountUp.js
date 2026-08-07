import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./useMediaQuery";

/** Decelerating curve — fast start, soft landing. */
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Animate a number from 0 to `target` once `active` becomes true.
 * Driven by requestAnimationFrame against a timestamp (not a fixed step
 * count) so it stays smooth regardless of frame rate, and it snaps straight
 * to the target when motion is reduced.
 *
 * @param {number} target
 * @param {object} [options]
 * @param {boolean} [options.active] start the animation
 * @param {number} [options.duration] ms
 * @returns {number} the current display value
 */
export function useCountUp(target, { active = true, duration = 1100 } = {}) {
  const [value, setValue] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const frame = useRef(/** @type {number | undefined} */ (undefined));

  useEffect(() => {
    if (!active) return undefined;

    if (reduceMotion || !Number.isFinite(target)) {
      setValue(target);
      return undefined;
    }

    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, active, duration, reduceMotion]);

  return value;
}

export default useCountUp;
