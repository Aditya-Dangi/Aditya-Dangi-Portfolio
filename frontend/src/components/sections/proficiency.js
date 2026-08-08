/**
 * Maps a technology's numeric proficiency rating (1-10, see `data/techStack.js`)
 * to a `Badge` tone. Presentation-only — the rating scale itself lives in the
 * data layer, this just decides how it reads visually.
 */
export function proficiencyTone(level) {
  if (level >= 9) return "accent";
  if (level >= 7) return "emerald";
  if (level >= 5) return "amber";
  return "neutral";
}

export default proficiencyTone;
