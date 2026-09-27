import { earnedCertificates } from "@/data/certificates";
import { skillCount } from "@/data/skills";
import type { StatHighlight } from "@/types";

/**
 * ---------------------------------------------------------------------------
 * SITE CONTENT
 * ---------------------------------------------------------------------------
 * Identity and contact details below are real. Anything still wrapped in square
 * brackets is a placeholder: `isPlaceholder()` in `@/lib/utils` detects that
 * pattern, and components use it to add "awaiting content" affordances.
 *
 * All content in this file is confirmed. Anything added later that is not yet
 * verified should stay wrapped in square brackets rather than guessed:
 * `isPlaceholder()` in `@/lib/utils` detects that pattern, and components use it
 * to add "awaiting content" affordances.
 */
export const site = {
  /** Shown in the hero, navbar, footer and page metadata. */
  name: "Toffic Mohammed",

  /**
   * Primary positioning. `role` is the full statement used where there is room
   * (hero, terminal); `roleLine` is the compact form for the navbar, footer and
   * About caption, where horizontal space is tight.
   */
  role: "Cloud & DevOps Engineer / Full-Stack Developer",
  roleLine: "Cloud & DevOps · Full-Stack",
  /**
   * Specialisms shown beneath the role. Kept short because the hero renders
   * this in uppercase monospace with wide tracking, where long phrases overflow
   * the column.
   */
  disciplines: ["Cloud Infrastructure", "DevOps", "Full-Stack", "AI"],

  tagline: "Building scalable infrastructure and full-stack products",

  availability: {
    label: "Open to Work",
    detail: "Open to opportunities",
  },

  location: "Kumasi, Ghana",
  email: "mtoffic8@gmail.com",

  /** Resume files live in `public/resume/` and are replaced in place. */
  resume: {
    downloadPath: "/resume/resume.pdf",
    viewPath: "/resume/resume.pdf",
    fileName: "resume.pdf",
  },

  seo: {
    title: "Toffic Mohammed — Cloud & DevOps Engineer",
    titleTemplate: "%s — Toffic Mohammed",
    description:
      "Portfolio of Toffic Mohammed, a Cloud & DevOps Engineer and Full-Stack Developer based in Kumasi, Ghana, working across cloud infrastructure, DevOps, full-stack web development and AI integration.",
    keywords: [
      "cloud engineer",
      "devops engineer",
      "full-stack developer",
      "cloud infrastructure",
      "AI integration",
      "Ghana",
    ],
    /* The social card is generated from `src/app/opengraph-image.tsx`, so there
       is no static image path to configure here. */
  },

  /**
   * About-section highlights.
   *
   * Every figure here is confirmed. The rule stands for anything added later:
   * keep an unverified number as `[XX]` rather than guess — `isPlaceholder()`
   * detects that pattern and the footnote beneath this row reappears by itself.
   *
   * Consistency rule: "Credentials" must equal the number of **earned** entries
   * in `src/data/certificates.ts`, and "Technologies" must match the finalised
   * list in `src/data/skills.ts`. Both are derived, not typed by hand, so they
   * cannot drift.
   */
  stats: [
    { label: "Projects Built", value: "3" },
    /* Derived from the skills list so the headline figure and the Skills
       section cannot drift apart. */
    { label: "Technologies", value: String(skillCount) },
    /* "Credentials", not "Certifications": only one of these four is an
       exam-based certification, so the broader word is the accurate one.
       In-progress certifications are excluded by `earnedCertificates`. */
    { label: "Credentials", value: String(earnedCertificates.length) },
    { label: "Years Learning", value: "4" },
  ] satisfies StatHighlight[],

  /**
   * About-section introduction.
   *
   * `lead` is reused as the section heading description; `body` renders as
   * paragraphs beneath it, and any number of them works.
   */
  about: {
    /**
     * Portrait shown in the About frame.
     *
     * The component renders it in a **4:5** crop via `object-cover`, centred, so
     * a taller source still reads as head-and-shoulders. This one is 9:16
     * (720×1280) and crops to roughly y 190–1090 of 1280 — head, hoodie and a
     * little headroom, nothing clipped.
     */
    image: {
      src: "/profile/portrait.jpg",
      alt: "Portrait of Toffic Mohammed",
    },
    lead: "Computer Science student at KNUST and DevOps Intern at Springer Capital (Acumen track), with hands-on experience across cloud infrastructure, DevOps, full-stack development, and application deployment.",
    body: [
      "AWS re/Start graduate and AWS Certified Cloud Practitioner, currently building software products while developing practical experience with cloud technologies, automation, databases, APIs, and modern web development.",
    ],
  },

  /**
   * "Currently building" panel — an active-developer signal. Condensed from the
   * longer descriptions so each line fits the card.
   */
  currentlyBuilding: {
    title: "Currently building",
    status: "Active",
    items: [
      "PitchPlay GH — football pitch booking & team matchmaking",
      "Compliance Document Review — frontend & DevOps",
    ],
  },

  /** GitHub section copy + stats. Figures read from the public profile. */
  github: {
    heading: "Building software and learning in public.",
    blurb:
      "Four public repositories from a team-built compliance platform: the frontend, the backend, the data-engineering pipeline, and the environment that runs them together.",
    /* Read from the public profile. `Contributions` is hand-maintained — the REST
       API does not expose the contribution graph — so it needs revisiting if the
       profile moves on. */
    stats: [
      { label: "Repositories", value: "4" },
      { label: "Contributions", value: "8" },
    ] satisfies StatHighlight[],
  },

  footer: {
    note: "Built with Next.js, TypeScript and Tailwind CSS.",
    copyrightFrom: "2026",
  },
} as const;

export type Site = typeof site;