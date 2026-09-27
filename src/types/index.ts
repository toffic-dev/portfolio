/**
 * Shared shapes for every editable data file in `src/data`.
 *
 * Fields marked optional are rendered conditionally by the components, so a
 * certificate without an expiry date (or a project without screenshots) simply
 * shows less — nothing breaks and no empty row is drawn.
 */

/* -------------------------------------------------------------------------- */
/* Navigation + site                                                          */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  /** Matches the `id` of the section element it scrolls to. */
  id: string;
  label: string;
  /** Editorial section number ("01", "02", …) shown in nav and headings. */
  index: string;
}

export type SocialId = "github" | "linkedin" | "email";

export interface SocialLink {
  id: SocialId;
  label: string;
  /** Placeholder links are kept as "#" until the real URL is supplied. */
  href: string;
  handle: string;
}

export interface StatHighlight {
  label: string;
  /** Unconfirmed figures stay as "[XX]" so no number is ever invented. */
  value: string;
}

/* -------------------------------------------------------------------------- */
/* Skills                                                                     */
/* -------------------------------------------------------------------------- */

export interface Skill {
  name: string;
  /** Where the technology is actually used — shown on hover/focus. */
  context?: string[];
}

export interface SkillCategory {
  id: string;
  label: string;
  blurb: string;
  skills: Skill[];
}

/* -------------------------------------------------------------------------- */
/* Projects                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Project lifecycle.
 *
 * `completed` and `shipped` are deliberately distinct: a finished build that was
 * never released to users is *completed*, not *shipped*, and the badge should
 * never claim a release that did not happen.
 */
export type ProjectState = "placeholder" | "in-progress" | "completed" | "shipped";

export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  detail?: string;
  kind: "client" | "service" | "data" | "ai" | "external";
}

export interface ArchitectureLayer {
  label: string;
  nodes: ArchitectureNode[];
}

export interface CaseStudyChallenge {
  problem: string;
  solution: string;
}

/**
 * A screenshot-shaped asset: project covers and case-study gallery images.
 *
 * Frames are 16:9 on the grid cards and 16:10 on the featured panel and in the
 * case-study gallery, so an ordinary 16:9 capture is effectively uncropped.
 *
 * `fit` defaults to `cover`, which trims a wider capture equally from both
 * sides. Set it to `contain` when the capture is much wider than the frame:
 * cropping 11% per side off a 2.05:1 landing page slices through the site's own
 * logo and call-to-action button, which reads as a broken image, whereas
 * letterboxing keeps the whole page visible.
 */
export interface ProjectScreenshot {
  /** Absolute path inside `public/projects/…`. */
  src: string;
  alt: string;
  fit?: "cover" | "contain";
}

export interface CaseStudyScreenshot extends ProjectScreenshot {
  caption?: string;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  solution: string;
  role: string;
  architectureSummary: string;
  architecture: ArchitectureLayer[];
  stack: { label: string; items: string[] }[];
  keyFeatures: string[];
  challenges: CaseStudyChallenge[];
  results: string[];
  screenshots: CaseStudyScreenshot[];
  lessons: string[];
}

export interface Project {
  slug: string;
  name: string;
  /** One-line positioning statement. */
  tagline: string;
  summary: string;
  year: string;
  /**
   * Lifecycle state. Optional on purpose: a project with no confirmed status
   * renders no badge at all, rather than a guessed one.
   */
  state?: ProjectState;
  role: string;
  /** `null` renders the "screenshot pending" media frame instead of an image. */
  cover: ProjectScreenshot | null;
  technologies: string[];
  features: string[];
  links: ProjectLinks;
  caseStudy?: CaseStudy;
  featured?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Experience                                                                 */
/* -------------------------------------------------------------------------- */

export interface ExperienceEntry {
  id: string;
  /**
   * What kind of entry this is. Defaults to `"role"` (paid or voluntary work).
   * `"education"` and `"program"` cover degrees and training credentials, which
   * are grouped under "Education & credentials" so neither is ever read as a
   * job.
   */
  kind?: "role" | "education" | "program";
  role: string;
  organization: string;
  /** Human-readable period, e.g. "Mar 2025 – Present", or a bracketed pending marker. */
  period: string;
  /**
   * Year anchor shown beside the timeline dot. Optional: when the dates are not
   * confirmed there is no honest year to show, and a placeholder token would
   * read as a rendering fault rather than a missing fact.
   */
  marker?: string;
  location?: string;
  summary: string;
  technologies: string[];
  achievements: string[];
}

/* -------------------------------------------------------------------------- */
/* Certificates                                                               */
/* -------------------------------------------------------------------------- */

export type CertificateCategory =
  | "development"
  | "cloud"
  | "devops"
  | "ai"
  | "other";

export interface CertificateAsset {
  type: "image" | "pdf";
  src: string;
  alt: string;
}

/**
 * Issuing organisation's mark, shown beside the issuer name on the card and in
 * the viewer.
 *
 * `tone` describes the artwork itself, which decides the chip the mark sits on:
 * brand badges are drawn for one background, so the chip is deliberately
 * theme-independent rather than following dark/light mode.
 */
export interface IssuerLogo {
  src: string;
  /**
   * Describes the mark for maintenance. The rendered chip is marked decorative
   * because the issuer name is always shown next to it, so this text is not
   * announced twice.
   */
  alt: string;
  /** `on-light` (default) = dark artwork; `on-dark` = light artwork. */
  tone?: "on-light" | "on-dark";
}

/**
 * How a credential is classified.
 *
 * `professional` is a formal certification (exam-based, usually with an expiry
 * and a verification URL). `additional` covers training programmes and
 * completion badges — genuinely earned, but not certifications, and the site
 * does not blur the two.
 */
export type CertificateTier = "professional" | "additional";

export type CertificateStatus = "earned" | "in-progress";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  category: CertificateCategory;
  /** Required, so every credential is classified deliberately. */
  tier: CertificateTier;
  /** Defaults to `"earned"`. In-progress entries are never counted as earned. */
  status?: CertificateStatus;
  /** ISO-ish strings ("2026-03") so they can be formatted consistently. */
  issued?: string;
  expires?: string;
  credentialId?: string;
  verifyUrl?: string;
  skills?: string[];
  /** `null` or omitted renders the "credential scan pending" preview. */
  asset?: CertificateAsset | null;
  /** `null` or omitted simply hides the mark — the issuer name still shows. */
  issuerLogo?: IssuerLogo | null;
}

/* -------------------------------------------------------------------------- */
/* Lab / experiments                                                          */
/* -------------------------------------------------------------------------- */

export interface Experiment {
  id: string;
  name: string;
  summary: string;
  status: "exploring" | "prototyping" | "paused" | "placeholder";
  technologies: string[];
  links?: ProjectLinks;
}