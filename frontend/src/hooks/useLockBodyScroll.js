import { useLayoutEffect } from "react";

/**
 * Overlays can stack (drawer -> dialog), so the lock is reference counted;
 * the last one to unmount restores the page.
 */
let lockCount = 0;
let previousOverflow = "";
let previousPaddingRight = "";

/**
 * Freeze background scrolling while an overlay is open, compensating for the
 * scrollbar so the page doesn't shift sideways.
 *
 * @param {boolean} locked
 */
export function useLockBodyScroll(locked) {
  useLayoutEffect(() => {
    if (!locked) return undefined;

    const { body, documentElement } = document;

    if (lockCount === 0) {
      const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
      previousOverflow = body.style.overflow;
      previousPaddingRight = body.style.paddingRight;
      body.style.overflow = "hidden";
      if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    }

    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        body.style.overflow = previousOverflow;
        body.style.paddingRight = previousPaddingRight;
      }
    };
  }, [locked]);
}

export default useLockBodyScroll;
