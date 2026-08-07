import { useEffect, useState } from "react";

/**
 * Report which section is currently "active" for navigation highlighting.
 *
 * Uses IntersectionObserver against a band near the top of the viewport
 * instead of scroll-position maths, so it stays accurate with variable
 * section heights and costs nothing while the page is idle.
 *
 * @param {string[]} sectionIds ids in document order
 * @param {number} [offset] pixels from the top to treat as the reading line
 * @returns {string} the active section id
 */
export function useScrollSpy(sectionIds, offset = 96) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;

    const visible = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting);
        });

        // First section (in document order) intersecting the reading band wins.
        const next = sectionIds.find((id) => visible.get(id));
        if (next) setActiveId(next);
      },
      {
        // A thin band just under the header: a section is "active" the moment
        // its content reaches the reading line.
        rootMargin: `-${offset}px 0px -68% 0px`,
        threshold: 0,
      }
    );

    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    nodes.forEach((node) => observer.observe(node));

    // Landing at the very top should always highlight the first section, even
    // if its band hasn't been crossed yet.
    const onScroll = () => {
      if (window.scrollY < 8) setActiveId(sectionIds[0] ?? "");
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionIds, offset]);

  return activeId;
}

export default useScrollSpy;
