import { useCallback, useState } from "react";

/**
 * useState backed by localStorage, degrading to plain state when storage is
 * unavailable (private browsing, blocked cookies).
 *
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @returns {[T, (value: T | ((current: T) => T)) => void]}
 */
export function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored === null ? initialValue : JSON.parse(stored);
    } catch {
      return initialValue;
    }
  });

  const setPersistentState = useCallback(
    (value) => {
      setState((current) => {
        const next = typeof value === "function" ? value(current) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* preference simply won't survive a reload */
        }
        return next;
      });
    },
    [key]
  );

  return [state, setPersistentState];
}

export default usePersistentState;
