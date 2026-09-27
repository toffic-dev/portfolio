import type { NavItem } from "@/types";

/**
 * In-page navigation. `id` must match the `<section id>` it scrolls to; the
 * `index` doubles as the editorial section number used in headings.
 */
export const navItems: NavItem[] = [
  { id: "home", label: "Home", index: "00" },
  { id: "about", label: "About", index: "01" },
  { id: "skills", label: "Skills", index: "02" },
  { id: "projects", label: "Projects", index: "03" },
  { id: "experience", label: "Experience", index: "04" },
  { id: "certificates", label: "Certificates", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
];

/** Sections observed for the navbar's active-item highlight. */
export const observedSections = navItems.map((item) => item.id);