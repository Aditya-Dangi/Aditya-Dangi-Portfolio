import React, { memo } from "react";
import { usePointerGlow } from "../../hooks/usePointerGlow";

/**
 * Soft light that follows the cursor across the whole page. Reads the
 * `--cursor-x/--cursor-y` variables that `usePointerGlow` maintains on
 * <html>, so this component itself never touches state or re-renders.
 * Renders nothing (and the hook no-ops) on touch devices or under reduced
 * motion.
 */
export const CursorGlow = memo(function CursorGlow() {
  usePointerGlow();
  return <div className="cursor-glow" aria-hidden="true" />;
});

export default CursorGlow;
