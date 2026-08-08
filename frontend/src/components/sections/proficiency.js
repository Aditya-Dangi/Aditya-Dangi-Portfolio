/**
 * Maps a technology's numeric proficiency level (1-5, see `data/techStack.js`)
 * to a `Badge` tone. Presentation-only — the level scale itself lives in the
 * data layer, this just decides how it reads visually.
 */
export function proficiencyTone(level) {
  if (level >= 5) return "accent";
  if (level >= 4) return "emerald";
  if (level >= 3) return "amber";
  return "neutral";
}

export default proficiencyTone;
