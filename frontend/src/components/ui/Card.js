import React, { forwardRef } from "react";
import { cn } from "../../lib/cn";

/**
 * Elevated surface primitive.
 *
 * @param {object} props
 * @param {"default" | "subtle" | "inset" | "glass"} [props.variant]
 * @param {boolean} [props.interactive] adds lift, border glow and press feedback
 * @param {boolean} [props.spotlight] pointer-tracked highlight (desktop only)
 * @param {"none" | "sm" | "md" | "lg"} [props.padding]
 */
export const Card = forwardRef(function Card(
  {
    as: Component = "div",
    variant = "default",
    interactive = false,
    spotlight = false,
    padding = "md",
    className,
    children,
    onPointerMove,
    ...rest
  },
  ref
) {
  /**
   * Write the pointer position into CSS custom properties and let CSS paint
   * the highlight. No React state, so moving the mouse never re-renders.
   */
  const handlePointerMove = (event) => {
    if (spotlight) {
      const target = event.currentTarget;
      const bounds = target.getBoundingClientRect();
      target.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
      target.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
    }
    onPointerMove?.(event);
  };

  return (
    <Component
      ref={ref}
      className={cn(
        "card",
        `card--${variant}`,
        `card--pad-${padding}`,
        interactive && "card--interactive",
        spotlight && "card--spotlight",
        className
      )}
      onPointerMove={spotlight || onPointerMove ? handlePointerMove : undefined}
      {...rest}
    >
      {spotlight && <span className="card__glow" aria-hidden="true" />}
      {children}
    </Component>
  );
});

export default Card;
