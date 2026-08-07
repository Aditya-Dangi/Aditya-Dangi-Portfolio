import React, { memo } from "react";

/**
 * Split a heading into words, each independently animatable via the
 * `--word-index` custom property. Words (not letters) keep the reveal
 * readable and cheap — one animated node per word instead of per glyph.
 *
 * Renders as the given tag with `aria-label` carrying the full text, so
 * screen readers get one clean announcement instead of word-by-word noise.
 *
 * @param {object} props
 * @param {string} props.text
 * @param {keyof JSX.IntrinsicElements} [props.as]
 */
export const SplitText = memo(function SplitText({
  text,
  as: Component = "span",
  className,
}) {
  const words = text.split(" ");

  return (
    <Component className={className} aria-label={text}>
      <span className="split-text" aria-hidden="true">
        {words.map((word, index) => (
          <span className="split-text__word" key={`${word}-${index}`}>
            <span
              className="split-text__inner"
              style={{ "--word-index": index }}
            >
              {word}
              {index < words.length - 1 ? " " : ""}
            </span>
          </span>
        ))}
      </span>
    </Component>
  );
});

export default SplitText;
