import React from "react";
import { cn } from "../../lib/cn";

const SEGMENTS = Array.from({ length: 10 });

/**
 * Static 10-segment rating indicator (see `data/techStack.js` for the 1-10
 * scale). Purely presentational — no animation, no JS-driven state.
 *
 * @param {object} props
 * @param {number} props.rating 1-10
 */
export function RatingDots({ rating }) {
  return (
    <span className="rating-dots" aria-hidden="true">
      {SEGMENTS.map((_, index) => (
        <span key={index} className={cn("rating-dots__pip", index < rating && "is-filled")} />
      ))}
    </span>
  );
}

export default RatingDots;
