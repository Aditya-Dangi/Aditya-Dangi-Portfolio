/**
 * Join class names, dropping anything falsy.
 * Keeps conditional styling readable at call sites:
 *   cn("btn", isActive && "btn--active", className)
 *
 * @param {...(string|false|null|undefined)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default cn;
