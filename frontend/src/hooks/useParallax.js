import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "./useMediaQuery";

/**
 * Depth-of-field scroll effect: while an element is anywhere near the
 * viewport, translate it by a fraction of how far it has scrolled through
 * that range. Elements with a larger `speed` seem to drift slower than the
 * page (background layers); smaller/negative values drift faster
 * (foreground accents) — the classic parallax trick, done with a single
 * shared scroll listener per element, transform-only, rAF-throttled, and
 * gated by IntersectionObserver so offscreen elements cost nothing.
 *
 * @param {number} [speed] 0 = pins to the page (no effect), 0.15 is subtle
 * @returns {React.RefObject<HTMLElement>}
 */
export function useParallax(speed = 0.12) {
  const ref = useRef(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion || speed === 0) return undefined;
    if (typeof IntersectionObserver === "undefined") return undefined;

    let frame = 0;
    let active = false;

    const apply = () => {
      frame = 0;
      const bounds = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = bounds.top + bounds.height / 2;
      // Distance from viewport center, normalised so it stays a gentle
      // effect regardless of how tall the element is.
      const offset = (viewportCenter - elementCenter) * speed;
      node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(apply);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) onScroll();
      },
      { rootMargin: "20% 0px" }
    );

    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      node.style.transform = "";
    };
  }, [speed, reduceMotion]);

  return ref;
}

export default useParallax;
