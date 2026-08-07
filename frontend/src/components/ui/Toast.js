import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { FiAlertTriangle, FiCheck, FiInfo, FiX } from "react-icons/fi";
import { cn } from "../../lib/cn";
import { usePresence } from "../../hooks/usePresence";

/**
 * @typedef {object} Toast
 * @property {string} id
 * @property {string} title
 * @property {string} [description]
 * @property {"success" | "info" | "error"} [tone]
 * @property {number} [duration] ms, 0 keeps it until dismissed
 */

const ToastContext = createContext(
  /** @type {{toast: (t: Omit<Toast, "id">) => string, dismiss: (id: string) => void} | null} */ (null)
);

const ICONS = {
  success: FiCheck,
  info: FiInfo,
  error: FiAlertTriangle,
};

/** Newest toast sits on top; older ones stack and scale back behind it. */
const MAX_VISIBLE = 3;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState(/** @type {Toast[]} */ ([]));
  const counter = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((item) => item.id !== id));
  }, []);

  const toast = useCallback((options) => {
    counter.current += 1;
    const id = `toast-${counter.current}`;
    setToasts((current) => [
      ...current.slice(-(MAX_VISIBLE - 1)),
      { id, tone: "info", duration: 4000, ...options },
    ]);
    return id;
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div
          className="toast-viewport"
          role="region"
          aria-label="Notifications"
          // Toasts are announced politely; they never steal focus.
          aria-live="polite"
        >
          {toasts.map((item, index) => (
            <ToastItem
              key={item.id}
              toast={item}
              depth={toasts.length - 1 - index}
              onDismiss={dismiss}
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, depth, onDismiss }) {
  const [open, setOpen] = useState(true);
  const { mounted, state } = usePresence(open, 220);
  const Icon = ICONS[toast.tone] ?? FiInfo;

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;
    if (!toast.duration) return undefined;

    const timer = window.setTimeout(close, toast.duration);
    return () => window.clearTimeout(timer);
  }, [open, toast.duration, close]);

  // Remove from the list only after the exit animation has finished.
  useEffect(() => {
    if (!mounted) onDismiss(toast.id);
  }, [mounted, onDismiss, toast.id]);

  if (!mounted) return null;

  return (
    <div
      className={cn("toast", `toast--${toast.tone}`)}
      data-state={state}
      style={{ "--toast-depth": depth }}
    >
      <span className="toast__icon" aria-hidden="true">
        <Icon />
      </span>
      <div className="toast__content">
        <p className="toast__title">{toast.title}</p>
        {toast.description && (
          <p className="toast__description">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        className="toast__close"
        onClick={close}
        aria-label={`Dismiss: ${toast.title}`}
      >
        <FiX />
      </button>
      {Boolean(toast.duration) && (
        <span
          className="toast__timer"
          style={{ "--toast-duration": `${toast.duration}ms` }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/** @returns {{toast: (t: Omit<Toast, "id">) => string, dismiss: (id: string) => void}} */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used inside a <ToastProvider>");
  return context;
}

export default ToastProvider;
