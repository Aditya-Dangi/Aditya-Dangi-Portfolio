import { cloneElement } from "react";
import { useMagnetic } from "../../hooks/useMagnetic";

/**
 * Wrap a single element (typically a Button) to give it a magnetic pull
 * toward the cursor. Kept separate from `useMagnetic` itself so plain DOM
 * elements can use the hook directly without going through a wrapper.
 *
 * @param {object} props
 * @param {React.ReactElement} props.children
 * @param {number} [props.strength]
 * @param {number} [props.radius]
 */
export function Magnetic({ children, strength, radius, ...options }) {
  const ref = useMagnetic({ strength, radius, ...options });
  return cloneElement(children, { ref });
}

export default Magnetic;
