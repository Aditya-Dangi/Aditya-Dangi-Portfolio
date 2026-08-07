import React, { cloneElement, useId, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { usePresence } from "../../hooks/usePresence";

/** Run every handler that wants the same event, in order, skipping gaps. */
function chain(...handlers) {
  return (event) => handlers.forEach((handler) => handler?.(event));
}

/**
 * Hover / focus tooltip.
 *
 * Wraps a single interactive child, wires `aria-describedby`, and opens on
 * both pointer hover and keyboard focus so it is not a mouse-only feature.
 *
 * Any extra props are forwarded to the child element, which lets Tooltip sit
 * between a component like `Menu` and its trigger button without swallowing
 * the props that make the trigger work.
 *
 * @param {object} props
 * @param {React.ReactElement} props.children the trigger
 * @param {React.ReactNode} props.label tooltip content
 * @param {"top" | "bottom" | "left" | "right"} [props.placement]
 * @param {number} [props.delay] ms before opening on hover
 */
export function Tooltip({
  children,
  label,
  placement = "top",
  delay = 220,
  ...forwarded
}) {
  const [open, setOpen] = useState(false);
  const { mounted, state } = usePresence(open, 150);
  const timer = useRef(/** @type {number | undefined} */ (undefined));
  const id = useId();

  const show = (immediate = false) => {
    window.clearTimeout(timer.current);
    if (immediate) setOpen(true);
    else timer.current = window.setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    window.clearTimeout(timer.current);
    setOpen(false);
  };

  const childProps = children.props;

  const trigger = cloneElement(children, {
    ...forwarded,
    "aria-describedby": mounted ? id : childProps["aria-describedby"],
    onPointerEnter: chain(forwarded.onPointerEnter, childProps.onPointerEnter, () =>
      show()
    ),
    onPointerLeave: chain(forwarded.onPointerLeave, childProps.onPointerLeave, hide),
    // Keyboard users get it instantly — a delay would feel like a bug.
    onFocus: chain(forwarded.onFocus, childProps.onFocus, () => show(true)),
    onBlur: chain(forwarded.onBlur, childProps.onBlur, hide),
    onClick: chain(forwarded.onClick, childProps.onClick, hide),
    onKeyDown: chain(forwarded.onKeyDown, childProps.onKeyDown, (event) => {
      if (event.key === "Escape") hide();
    }),
  });

  return (
    <span className="tooltip-anchor">
      {trigger}
      {mounted && (
        <span
          id={id}
          role="tooltip"
          data-state={state}
          className={cn("tooltip", `tooltip--${placement}`)}
        >
          {label}
        </span>
      )}
    </span>
  );
}

export default Tooltip;
