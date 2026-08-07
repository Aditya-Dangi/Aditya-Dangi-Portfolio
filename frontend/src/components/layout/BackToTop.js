import React from "react";
import { FiArrowUp } from "react-icons/fi";
import { cn } from "../../lib/cn";
import { scrollToSection } from "../../lib/scroll";
import { Tooltip } from "../ui";

/**
 * Appears once the visitor is past the first screen. The circular track is a
 * live readout of reading progress, so the control doubles as a position
 * indicator instead of being a bare arrow.
 *
 * @param {object} props
 * @param {number} props.progress 0..1
 */
export function BackToTop({ progress }) {
  const visible = progress > 0.08;
  const circumference = 2 * Math.PI * 15;

  return (
    <Tooltip label="Back to top" placement="left">
      <button
        type="button"
        className={cn("back-to-top", visible && "is-visible")}
        onClick={() => scrollToSection("overview")}
        aria-label="Back to top"
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
      >
        <svg viewBox="0 0 34 34" aria-hidden="true" className="back-to-top__ring">
          <circle className="back-to-top__track" cx="17" cy="17" r="15" />
          <circle
            className="back-to-top__value"
            cx="17"
            cy="17"
            r="15"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference * (1 - progress),
            }}
          />
        </svg>
        <FiArrowUp aria-hidden="true" />
      </button>
    </Tooltip>
  );
}

export default BackToTop;
