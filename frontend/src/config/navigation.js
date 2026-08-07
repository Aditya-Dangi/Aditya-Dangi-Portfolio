import {
  FiAward,
  FiBriefcase,
  FiCpu,
  FiHome,
  FiLayers,
  FiMail,
  FiUser,
} from "react-icons/fi";

/**
 * Single source of truth for navigation.
 *
 * The side rail, top bar, mobile drawer, command palette and scroll spy all
 * read from this list, so a section can never appear in one navigation
 * surface and be missing from another.
 *
 * @typedef {object} NavSection
 * @property {string} id      matches the section element's DOM id
 * @property {string} label   short label used in navigation
 * @property {string} hint    supporting copy for the command palette
 * @property {import("react-icons").IconType} icon
 */

/** @type {NavSection[]} */
export const sections = [
  {
    id: "overview",
    label: "Overview",
    hint: "Introduction and quick stats",
    icon: FiHome,
  },
  {
    id: "about",
    label: "About",
    hint: "How I work and what I focus on",
    icon: FiUser,
  },
  {
    id: "experience",
    label: "Experience",
    hint: "Newgen Software - CoPad for CitiBank",
    icon: FiBriefcase,
  },
  {
    id: "projects",
    label: "Projects",
    hint: "Full-stack systems and shipped interfaces",
    icon: FiLayers,
  },
  {
    id: "skills",
    label: "Skills",
    hint: "Languages, backend, frontend and tooling",
    icon: FiCpu,
  },
  {
    id: "achievements",
    label: "Achievements",
    hint: "DSA practice, certifications and education",
    icon: FiAward,
  },
  {
    id: "contact",
    label: "Contact",
    hint: "Email, phone and social profiles",
    icon: FiMail,
  },
];

/** Section ids in document order — used by the scroll spy. */
export const sectionIds = sections.map((section) => section.id);
