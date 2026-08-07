import React, { memo, useMemo } from "react";

/**
 * Floating geometric field behind the hero copy: a handful of outlined
 * shapes drifting on independent CSS keyframe loops. Generated once (stable
 * random seed via useMemo) rather than per-render, and purely decorative —
 * aria-hidden, no interaction, GPU-cheap transform/opacity only.
 */
const SHAPES = [
  { type: "ring", size: 86, top: "8%", left: "78%", duration: 22 },
  { type: "square", size: 46, top: "62%", left: "88%", duration: 26 },
  { type: "ring", size: 40, top: "78%", left: "68%", duration: 19 },
  { type: "triangle", size: 54, top: "22%", left: "92%", duration: 24 },
  { type: "square", size: 28, top: "40%", left: "84%", duration: 17 },
];

export const HeroField = memo(function HeroField() {
  const shapes = useMemo(() => SHAPES, []);

  return (
    <div className="hero-field" aria-hidden="true">
      {shapes.map((shape, index) => (
        <span
          key={index}
          className={`hero-shape hero-shape--${shape.type}`}
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            "--drift-duration": `${shape.duration}s`,
            "--drift-delay": `${index * -3.4}s`,
          }}
        />
      ))}
    </div>
  );
});

export default HeroField;
