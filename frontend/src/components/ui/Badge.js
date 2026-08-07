import React from "react";
import { cn } from "../../lib/cn";

/**
 * Compact status / metadata label.
 *
 * @param {object} props
 * @param {"neutral" | "accent" | "amber" | "emerald" | "outline"} [props.tone]
 * @param {"sm" | "md"} [props.size]
 * @param {boolean} [props.dot] show a leading status dot
 */
export function Badge({
  as: Component = "span",
  tone = "neutral",
  size = "md",
  dot = false,
  className,
  children,
  ...rest
}) {
  return (
    <Component
      className={cn("badge", `badge--${tone}`, `badge--${size}`, className)}
      {...rest}
    >
      {dot && <span className="badge__dot" aria-hidden="true" />}
      {children}
    </Component>
  );
}

/** Keyboard key hint, e.g. inside the command palette or shortcut lists. */
export function Kbd({ children, className, ...rest }) {
  return (
    <kbd className={cn("kbd", className)} {...rest}>
      {children}
    </kbd>
  );
}

export default Badge;
