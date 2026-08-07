/**
 * Scroll a section into view, allowing for the sticky header, and move
 * keyboard focus with it so the jump is real for assistive tech rather than
 * just visual.
 *
 * @param {string} id target element id
 */
export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const headerOffset =
    parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
      10
    ) || 60;

  const top =
    target.getBoundingClientRect().top + window.scrollY - headerOffset - 16;

  window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });

  // Make the section programmatically focusable for one interaction so screen
  // readers and keyboard users land inside the new content.
  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), {
      once: true,
    });
  }
  target.focus({ preventScroll: true });

  if (window.history?.replaceState) {
    window.history.replaceState(null, "", `#${id}`);
  }
}

export default scrollToSection;
