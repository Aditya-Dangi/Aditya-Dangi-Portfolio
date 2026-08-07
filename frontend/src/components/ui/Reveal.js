import React, { memo } from "react";
import { cn } from "../../lib/cn";
import { useInView } from "../../hooks/useInView";

/**
 * Scroll-triggered entrance animation.
 *
 * The animation itself is pure CSS (transform + opacity only, so it stays on
 * the compositor); this component just decides when to add the class. Under
 * `prefers-reduced-motion` the CSS resolves to a no-op and content is visible
 * immediately.
 *
 * @param {object} props
 * @param {"up" | "down" | "left" | "right" | "fade" | "scale"} [props.direction]
 * @param {number} [props.delay] ms — use small increments to stagger a list
 */
export const Reveal = memo(function Reveal({
  as: Component = "div",
  direction = "up",
  delay = 0,
  className,
  style,
  children,
  ...rest
}) {
  const [ref, inView] = useInView();

  return (
    <Component
      ref={ref}
      className={cn("reveal", `reveal--${direction}`, inView && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Component>
  );
});

export default Reveal;
