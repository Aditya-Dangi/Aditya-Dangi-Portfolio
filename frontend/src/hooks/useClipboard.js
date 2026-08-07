import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Copy text to the clipboard with a short-lived "copied" flag for UI feedback.
 * Falls back to a hidden textarea + execCommand on browsers (or insecure
 * origins) where the async Clipboard API isn't available.
 *
 * @param {number} [resetAfter] ms before `copied` flips back to false
 * @returns {{copied: boolean, copy: (text: string) => Promise<boolean>}}
 */
export function useClipboard(resetAfter = 2000) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(/** @type {number | undefined} */ (undefined));

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text) => {
      let ok = false;

      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          ok = true;
        } else {
          const field = document.createElement("textarea");
          field.value = text;
          field.setAttribute("readonly", "");
          field.style.position = "fixed";
          field.style.opacity = "0";
          document.body.appendChild(field);
          field.select();
          ok = document.execCommand("copy");
          document.body.removeChild(field);
        }
      } catch {
        ok = false;
      }

      if (ok) {
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), resetAfter);
      }

      return ok;
    },
    [resetAfter]
  );

  return { copied, copy };
}

export default useClipboard;
