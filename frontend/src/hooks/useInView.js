import { useEffect, useRef, useState } from "react";

/**
 * One shared IntersectionObserver per configuration, rather than one per
 * element. Scroll reveals are used on dozens of nodes; pooling observers
 * keeps the main thread free during fast scrolling.
 * @type {Map<string, {observer: IntersectionObserver, callbacks: WeakMap<Element, (entry: IntersectionObserverEntry) => void>}>}
 */
const pool = new Map();

function getObserver(rootMargin, threshold) {
  const key = `${rootMargin}|${threshold}`;
  let entry = pool.get(key);
  if (entry) return entry;

  const callbacks = new WeakMap();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((item) => {
        const callback = callbacks.get(item.target);
        if (callback) callback(item);
      });
    },
    { rootMargin, threshold }
  );

  entry = { observer, callbacks };
  pool.set(key, entry);
  return entry;
}

/**
 * Track whether an element has entered the viewport.
 *
 * @param {object} [options]
 * @param {string} [options.rootMargin]
 * @param {number} [options.threshold]
 * @param {boolean} [options.once] stop observing after the first entry (default true)
 * @returns {[React.RefObject<any>, boolean]} ref to attach, and visibility
 */
export function useInView({
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.12,
  once = true,
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Without IntersectionObserver (or with motion reduced) show content
    // immediately — a reveal must never be the reason something is invisible.
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }

    const { observer, callbacks } = getObserver(rootMargin, threshold);

    callbacks.set(node, (entry) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) {
          observer.unobserve(node);
          callbacks.delete(node);
        }
      } else if (!once) {
        setInView(false);
      }
    });

    observer.observe(node);

    return () => {
      observer.unobserve(node);
      callbacks.delete(node);
    };
  }, [rootMargin, threshold, once]);

  return [ref, inView];
}

export default useInView;
