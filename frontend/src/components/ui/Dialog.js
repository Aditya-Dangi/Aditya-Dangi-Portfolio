import React, { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import { cn } from "../../lib/cn";
import { usePresence } from "../../hooks/usePresence";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { IconButton } from "./Button";

/**
 * Accessible modal dialog: blurred scrim, spring scale-in, focus trap,
 * Escape to close, scroll lock, and focus returned to the trigger on close.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {React.ReactNode} [props.title]
 * @param {React.ReactNode} [props.description]
 * @param {"sm" | "md" | "lg"} [props.size]
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  size = "md",
  className,
  children,
}) {
  const panelRef = useRef(null);
  const { mounted, state } = usePresence(open, 200);
  const titleId = useId();
  const descriptionId = useId();

  useFocusTrap(panelRef, mounted && open);
  useLockBodyScroll(mounted);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="overlay" data-state={state}>
      {/* Presentational: Escape and the close button are the accessible paths. */}
      <div
        className="overlay__scrim"
        data-state={state}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        data-state={state}
        tabIndex={-1}
        className={cn("dialog", `dialog--${size}`, className)}
      >
        {(title || description) && (
          <header className="dialog__header">
            <div className="dialog__heading">
              {title && (
                <h2 id={titleId} className="dialog__title">
                  {title}
                </h2>
              )}
              {description && (
                <p id={descriptionId} className="dialog__description">
                  {description}
                </p>
              )}
            </div>
            <IconButton aria-label="Close dialog" onClick={onClose} size="sm">
              <FiX />
            </IconButton>
          </header>
        )}
        <div className="dialog__body">{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Dialog;
