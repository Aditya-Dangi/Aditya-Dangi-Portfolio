import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";

/**
 * The one button in the system.
 *
 * Renders as <button> by default, or as any element via `as` (typically "a"
 * for links that look like buttons) so visual style and semantics can differ
 * without duplicating CSS.
 *
 * @typedef {"primary" | "secondary" | "ghost" | "subtle" | "accent"} ButtonVariant
 * @typedef {"sm" | "md" | "lg"} ButtonSize
 */
export const Button = forwardRef(function Button(
  {
    as: Component = "button",
    variant = "secondary",
    size = "md",
    loading = false,
    iconOnly = false,
    fullWidth = false,
    className,
    children,
    disabled,
    type,
    ...rest
  },
  ref
) {
  const isNativeButton = Component === "button";

  return (
    <Component
      ref={ref}
      type={isNativeButton ? type ?? "button" : type}
      className={cn(
        "btn",
        `btn--${variant}`,
        `btn--${size}`,
        iconOnly && "btn--icon",
        fullWidth && "btn--block",
        loading && "btn--loading",
        className
      )}
      disabled={isNativeButton ? disabled || loading : undefined}
      aria-disabled={!isNativeButton && (disabled || loading) ? true : undefined}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      {...rest}
    >
      {/*
        The label keeps its space while loading so the button never resizes.
        Icon-only buttons carry their name in aria-label, so the glyph itself
        is marked decorative rather than announced as an unnamed image.
      */}
      <span className="btn__content" aria-hidden={iconOnly || undefined}>
        {children}
      </span>
      {loading && <span className="btn__spinner" aria-hidden="true" />}
    </Component>
  );
});

/**
 * Square, label-less button for toolbar actions. Requires an accessible name
 * via `aria-label` — enforced by every call site passing one.
 */
export const IconButton = forwardRef(function IconButton(
  { variant = "ghost", size = "md", className, ...rest },
  ref
) {
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      iconOnly
      className={className}
      {...rest}
    />
  );
});

export default Button;
