import React from "react";
import { cn } from "../../lib/cn";

/**
 * Animated loading placeholder. Marked aria-hidden because the region it
 * fills should carry its own aria-busy state — a screen reader gains nothing
 * from announcing a shimmer.
 *
 * @param {object} props
 * @param {"text" | "block" | "circle"} [props.shape]
 * @param {string} [props.width]
 * @param {string} [props.height]
 */
export function Skeleton({
  shape = "block",
  width,
  height,
  className,
  style,
  ...rest
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("skeleton", `skeleton--${shape}`, className)}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
}

export default Skeleton;
