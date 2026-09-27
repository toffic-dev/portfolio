import type { Certificate, CertificateCategory } from "@/types";

/**
 * ---------------------------------------------------------------------------
 * CERTIFICATES
 * ---------------------------------------------------------------------------
 * Real credentials, in two tiers:
 *
 *   professional — 1   AWS Certified Cloud Practitioner (exam-based, expires)
 *   additional   — 3   AWS re/Start, AWS Educate Cloud 101 badge, IBM SkillsBuild
 *
 * **Earned total: 4.** Plus one certification in progress, which is deliberately
 * NOT counted as earned — see `inProgressCertificates` below.
 *
 * **Every field is now supplied on all four earned credentials** — scan, issuer
 * badge, credential ID, verification URL and the `skills` tags, which are taken
 * verbatim from the tag row each credential page publishes.
 *
 * The **scans are supplied**: `asset` points at `public/certificates/<id>.png`
 * for the four earned credentials — the achievement page issued for each one,
 * named after the credential's `id` so the mapping is obvious. Only the
 * in-progress credential has none, because there is nothing to scan yet, so its
 * card keeps the designed pending frame.
 *
 * The **official issuer badges are supplied too**: `issuerLogo` points at
 * `public/issuers/<credential-id>.png` for the four earned credentials. The
 * in-progress one deliberately has none — the badge arrives only when you pass.
 *
 * Worth noting what those two sets of files are: the `issuers/` ones are
 * **credential badges, not scans** — square 600×600 pieces of official artwork,
 * which belong in the square issuer-mark slot. `asset` carries the credential
 * page or document itself, which the card preview fits whole rather than
 * cropping (see `CertificatePreview`).
 */
export const certificateCategories: {
  id: CertificateCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "All" },
  { id: "development", label: "Development" },
  { id: "cloud", label: "Cloud" },
  { id: "devops", label: "DevOps" },
  { id: "ai", label: "AI" },
  { id: "other", label: "Other" },
];

/** Label lookup used by the cards (kept next to the categories themselves). */
export const certificateCategoryLabel: Record<CertificateCategory, string> = {
  development: "Development",
  cloud: "Cloud",
  devops: "DevOps",
  ai: "AI",
  other: "Other",
};

export const certificates: Certificate[] = [
  {
    id: "aws-certified-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    category: "cloud",
    tier: "professional",
    issued: "2026-08",
    expires: "2029-08",
    credentialId: "4c374807-a7fe-48de-b87c-81e12e8fd8b0",
    /* Same UUID in the shareable `/public` form the re/Start badge uses. */
    verifyUrl: "https://www.credly.com/badges/4c374807-a7fe-48de-b87c-81e12e8fd8b0/public",
    /* The issued achievement page: badge, issue/expiry dates and skill tags. */
    asset: {
      type: "image",
      src: "/certificates/aws-certified-cloud-practitioner.png",
      alt: "AWS Certified Cloud Practitioner achievement page — the dark navy Foundational badge, issued 12 August 2026 and expiring 12 August 2029",
    },
    /* Skill tags as issued on the achievement page. */
    skills: [
      "AWS",
      "AWS Certification",
      "AWS Cloud",
      "Amazon Web Services",
      "Cloud Certification",
      "Cloud Computing",
      "Cloud Platform",
      "Cloud Services",
    ],
    /* Dark navy artwork, so it takes the default white chip. */
    issuerLogo: {
      src: "/issuers/aws-certified-cloud-practitioner.png",
      alt: "AWS Certified Cloud Practitioner credential badge",
    },
  },
  {
    id: "aws-restart-graduate",
    title: "AWS re/Start Graduate",
    issuer: "Amazon Web Services Training and Certification",
    category: "cloud",
    tier: "additional",
    issued: "2026-08",
    /* The badge does not expire, so there is deliberately no `expires` field —
       the card shows "—" there. */
    credentialId: "8e229790-c3bb-4751-818e-d3f324403014",
    /* The `/badges/<id>/public` form is the shareable one: it is the URL that
       renders the badge for a signed-out visitor. The earner-session URL
       (`/earner/earned/badge/<id>`) is what the Credly dashboard shows, and it
       does not serve the badge publicly, so it is deliberately not used here. */
    verifyUrl: "https://www.credly.com/badges/8e229790-c3bb-4751-818e-d3f324403014/public",
    asset: {
      type: "image",
      src: "/certificates/aws-restart-graduate.png",
      alt: "AWS re/Start Graduate achievement page — the navy AWS re/Start Graduate badge, issued 8 August 2026",
    },
    /* Skill tags as issued on the achievement page. */
    skills: [
      "AWS Cloud",
      "AWS Cloud Computing",
      "Amazon Web Services",
      "Cloud Platform",
      "Cloud Services",
    ],
    /* Light/white shield artwork, so it needs the dark chip to stay legible. */
    issuerLogo: {
      src: "/issuers/aws-restart-graduate.png",
      alt: "AWS re/Start Graduate credential badge",
      tone: "on-dark",
    },
  },
  {
    id: "aws-educate-cloud-101",
    title: "AWS Educate Introduction to Cloud 101 – Training Badge",
    issuer: "Amazon Web Services Training and Certification",
    category: "cloud",
    tier: "additional",
    issued: "2026-04",
    /* This badge does not expire, so there is deliberately no `expires` field. */
    credentialId: "471ac4f1-3f15-4b07-996e-0bbc31538deb",
    /* Shareable `/public` form of the UUID, matching the other two badges. */
    verifyUrl: "https://www.credly.com/badges/471ac4f1-3f15-4b07-996e-0bbc31538deb/public",
    asset: {
      type: "image",
      src: "/certificates/aws-educate-cloud-101.png",
      alt: "AWS Educate Introduction to Cloud 101 Training Badge achievement page — the AWS Educate Cloud Computing 101 Trained badge, issued 30 April 2026",
    },
    /* Skill tags as issued on the achievement page. */
    skills: [
      "AWS Cloud",
      "AWS Cloud Computing",
      "Amazon Web Services (AWS)",
      "Cloud Foundations",
    ],
    /* Light/white shield artwork → dark chip. */
    issuerLogo: {
      src: "/issuers/aws-educate-cloud-101.png",
      alt: "AWS Educate Cloud Computing 101 Trained badge",
      tone: "on-dark",
    },
  },
  {
    id: "ibm-cloud-computing-fundamentals",
    title: "Cloud Computing Fundamentals",
    issuer: "IBM SkillsBuild",
    category: "cloud",
    tier: "additional",
    issued: "2026-03",
    /* Does not expire, so there is deliberately no `expires` field. The `skills`
       block below explains why `PWID-B0645400` is stored neither as the ID nor
       as a skill. */
    credentialId: "e1dd81aa-1cdc-4988-aa8e-c48f126d2472",
    /* Credly-hosted too, so it takes the same shareable `/public` form. */
    verifyUrl: "https://www.credly.com/badges/e1dd81aa-1cdc-4988-aa8e-c48f126d2472/public",
    asset: {
      type: "image",
      src: "/certificates/ibm-cloud-computing-fundamentals.png",
      alt: "Cloud Computing Fundamentals achievement page — the pink IBM SkillsBuild credential tile, issued 17 March 2026",
    },
    /* Skill tags as issued on the credential page, minus `PWID-B0645400`.
       That token sits in the same tag row but is an IBM identifier rather than
       a skill, so a chip reading "PWID-B0645400" would mean nothing to a
       visitor. The Credly UUID above stays the `credentialId` because it is the
       one the verification URL actually resolves. */
    skills: [
      "Cloud Computing",
      "Cloud Infrastructure",
      "Cloud Migration",
      "Cloud Security",
      "Computing Services",
      "Containers",
      "Docker",
      "Hybrid Cloud",
      "Infrastructure As A Service (IaaS)",
      "Platform As A Service (PaaS)",
      "Private Cloud",
      "Public Cloud",
      "Software As A Service (SaaS)",
      "Virtualization",
      "Visual Studio Code",
    ],
    /* A pale pink tile rather than a transparent mark → dark chip. */
    issuerLogo: {
      src: "/issuers/ibm-cloud-computing-fundamentals.png",
      alt: "IBM SkillsBuild Cloud Computing Fundamentals badge",
      tone: "on-dark",
    },
  },
  {
    /* In progress — not an earned credential, and never counted as one. It has
       no issue date, credential ID or verification URL, because none exist yet. */
    id: "aws-solutions-architect-associate",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services (AWS)",
    category: "cloud",
    tier: "professional",
    status: "in-progress",
  },
];

/* --------------------------------------------------------------------------
   Derived collections — components read these rather than filtering inline.
   -------------------------------------------------------------------------- */

/** Credentials actually earned. This is the number the site reports. */
export const earnedCertificates: Certificate[] = certificates.filter(
  (certificate) => certificate.status !== "in-progress"
);

/** Certifications being worked towards. Shown, but never counted as earned. */
export const inProgressCertificates: Certificate[] = certificates.filter(
  (certificate) => certificate.status === "in-progress"
);

export const earnedProfessionalCount = earnedCertificates.filter(
  (certificate) => certificate.tier === "professional"
).length;

export const earnedAdditionalCount = earnedCertificates.filter(
  (certificate) => certificate.tier === "additional"
).length;