import { useEffect, useRef } from "react";

/**
 * Publish how far the viewport's reading line (a fixed point below the
 * header) has travelled through an element, as `--fill` (0..1) written
 * directly onto the element's own style. Built for timeline/roadmap
 * progress lines: the CSS just does
 * `height: calc(var(--fill, 0) * 100%)` on a pseudo-element or child.
 *
 * IntersectionObserver gates the scroll listener so it only runs while the
 * element is actually near the viewport.
 *
 * @param {object} [options]
 * @param {number} [options.line] 0..1, where in the viewport the reading
 *   line sits (0.5 = center)
 * @returns {React.RefObject<HTMLElement>}
 */
export function useScrollFill({ line = 0.42 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;

    let frame = 0;
    let active = false;

    const apply = () => {
      frame = 0;
      const bounds = node.getBoundingClientRect();
      const readingLine = window.innerHeight * line;
      const progress = (readingLine - bounds.top) / bounds.height;
      node.style.setProperty("--fill", Math.min(Math.max(progress, 0), 1).toFixed(3));
    };

    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(apply);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) onScroll();
      },
      { rootMargin: "10% 0px" }
    );

    observer.observe(node);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [line]);

  return ref;
}

export default useScrollFill;
