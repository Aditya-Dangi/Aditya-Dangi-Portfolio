import React from "react";
import { cn } from "../../lib/cn";

/**
 * Illustrated empty state. The illustration is inline SVG drawn from theme
 * tokens, so it costs no network request and recolours with the theme.
 *
 * @param {object} props
 * @param {React.ReactNode} props.title
 * @param {React.ReactNode} [props.description]
 * @param {React.ReactNode} [props.action] CTA rendered under the copy
 */
export function EmptyState({ title, description, action, className, ...rest }) {
  return (
    <div className={cn("empty-state", className)} {...rest}>
      <svg
        className="empty-state__art"
        viewBox="0 0 120 88"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="14"
          y="12"
          width="92"
          height="64"
          rx="10"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
        <path
          d="M14 30h92"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1.5"
        />
        <circle cx="26" cy="21" r="2.5" fill="currentColor" fillOpacity="0.3" />
        <circle cx="35" cy="21" r="2.5" fill="currentColor" fillOpacity="0.2" />
        <rect
          x="28"
          y="42"
          width="44"
          height="6"
          rx="3"
          fill="currentColor"
          fillOpacity="0.16"
        />
        <rect
          x="28"
          y="56"
          width="28"
          height="6"
          rx="3"
          fill="currentColor"
          fillOpacity="0.1"
        />
        <circle
          cx="84"
          cy="56"
          r="13"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <path
          d="m94 66 8 8"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <p className="empty-state__title">{title}</p>
      {description && <p className="empty-state__description">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}

export default EmptyState;
