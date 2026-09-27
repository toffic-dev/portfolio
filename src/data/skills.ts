import type { SkillCategory } from "@/types";

/**
 * ---------------------------------------------------------------------------
 * SKILLS
 * ---------------------------------------------------------------------------
 * The owner's own categorisation, supplied directly. Categories and entries are
 * reproduced as given — nothing added, nothing inferred.
 *
 * `context` is where a technology is actually used, taken from the same
 * submissions (project stacks, the Springer Capital internship, the AWS
 * credentials). It is **optional on purpose**: where no grounded use was stated
 * the list is omitted rather than padded with a plausible-sounding claim.
 *
 * Two deliberate duplications, both harmless because the headline figure
 * de-duplicates:
 *   - **Python** appears under Backend Development and Desktop Development.
 *   - Category count is 10; unique technologies is fewer than total entries.
 * See `skillCount` at the bottom of this file.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend Development",
    blurb: "Web interfaces across both platform frontends.",
    skills: [
      {
        name: "Next.js",
        context: ["PitchPlay GH (Next.js 14)", "Compliance review frontend"],
      },
      {
        name: "React",
        context: ["PitchPlay GH", "Compliance review frontend"],
      },
      {
        name: "TypeScript",
        context: ["Both web frontends", "Typed API layers"],
      },
      {
        name: "JavaScript",
        /* No specific use was stated for JavaScript, so no context is claimed. */
      },
      {
        name: "Tailwind CSS",
        context: ["Styling across both web applications"],
      },
    ],
  },
  {
    id: "backend",
    label: "Backend Development",
    blurb: "APIs and server-side work behind the applications.",
    skills: [
      {
        name: "Python",
        context: [
          "FastAPI backend (compliance platform)",
          "PharmaDesk desktop application",
          "Data pipeline scripts",
        ],
      },
      {
        name: "FastAPI",
        context: [
          "Compliance platform backend",
          "Document upload and metadata endpoints",
        ],
      },
      {
        name: "Flask",
        /* No specific use was stated for Flask, so no context is claimed. */
      },
      {
        name: "REST APIs",
        context: ["Service-to-service integration", "Cross-track API contracts"],
      },
    ],
  },
  {
    id: "cloud-aws",
    label: "Cloud & AWS",
    blurb:
      "Ten AWS services covered through AWS re/Start and the AWS Certified Cloud Practitioner curriculum (Aug 2026 – Aug 2029).",
    skills: [
      { name: "Amazon EC2" },
      { name: "Amazon S3" },
      { name: "Amazon RDS" },
      { name: "AWS IAM" },
      { name: "Amazon VPC" },
      { name: "Amazon CloudWatch" },
      { name: "AWS CloudTrail" },
      { name: "AWS KMS" },
      { name: "Amazon GuardDuty" },
      { name: "AWS Config" },
    ],
  },

  {
    id: "devops-infrastructure",
    label: "DevOps & Infrastructure",
    blurb: "Containerising, provisioning and shipping multi-service applications.",
    skills: [
      {
        name: "Docker",
        context: [
          "Containerised development environments (Springer Capital)",
          "Compliance multi-service stack",
        ],
      },
      {
        name: "Docker Compose",
        context: [
          "Bringing multi-service applications up together",
          "Springer Capital internship and the compliance platform",
        ],
      },
      {
        name: "GitHub Actions",
        context: [
          "CI pipeline that provisions the database and health-checks it on every push",
          "Deployment workflows",
        ],
      },
      {
        name: "Terraform",
        context: ["Infrastructure work, Springer Capital internship"],
      },
      {
        name: "HashiCorp Nomad",
        context: ["Workload orchestration, Springer Capital internship"],
      },
      {
        name: "Git",
        context: [
          "Version control across the platform, frontend, backend and data repositories",
        ],
      },
      {
        name: "GitHub",
        context: [
          "Repositories, pull requests and cross-track collaboration",
        ],
      },
      {
        name: "Bash / Linux",
        context: ["Linux/Bash environment, Springer Capital internship"],
      },
      {
        name: "CI/CD",
        context: [
          "Deployment workflows at Springer Capital",
          "GitHub Actions pipelines",
        ],
      },
    ],
  },
  {
    id: "monitoring-mlops",
    label: "Monitoring & MLOps",
    blurb: "Observability and experiment tracking on the internship stack.",
    skills: [
      {
        name: "Grafana",
        context: ["Monitoring dashboards, Springer Capital internship"],
      },
      {
        name: "Grafana Loki",
        context: ["Log aggregation, Springer Capital internship"],
      },
      {
        name: "MLflow",
        context: ["Experiment tracking, Springer Capital internship"],
      },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    blurb: "Relational storage, managed Postgres and vector search.",
    skills: [
      {
        name: "PostgreSQL",
        context: [
          "Compliance platform data",
          "Document chunks, rules and audit records",
        ],
      },
      {
        name: "Supabase",
        context: [
          "PitchPlay GH authentication and managed Postgres",
          "Compliance platform PostgreSQL/Supabase migration",
        ],
      },
      {
        name: "SQLite",
        context: ["PharmaDesk local storage and backup"],
      },
      {
        name: "SQL",
        context: ["Relational queries across the project data stores"],
      },
      {
        name: "pgvector",
        context: [
          "384-dimension embeddings",
          "Similarity search behind the retrieval jobs",
        ],
      },
    ],
  },

  {
    id: "apis-integrations",
    label: "APIs & Integrations",
    blurb: "Third-party services wired into the products.",
    skills: [
      {
        name: "Paystack",
        context: ["Booking payments in PitchPlay GH"],
      },
      {
        name: "Google Maps API",
        context: ["Pitch discovery in PitchPlay GH"],
      },
      {
        name: "n8n",
        /* No specific use was stated for n8n, so no context is claimed. */
      },
    ],
  },
  {
    id: "ai-data",
    label: "AI & Data",
    blurb: "Model-assisted analysis over extracted document data.",
    skills: [
      {
        name: "AI service integration",
        context: ["Connecting AI analysis into the compliance review flow"],
      },
      {
        name: "Document extraction workflows",
        context: ["PDF / DOCX / XLSX extraction and chunking"],
      },
      {
        name: "AI-assisted document analysis",
        context: ["Officer review in the compliance platform"],
      },
      {
        name: "Vector search",
        context: [
          "Rule lookup, disclosure-by-absence and precedent search",
        ],
      },
    ],
  },
  {
    id: "deployment-platforms",
    label: "Deployment Platforms",
    blurb: "Where the applications are hosted.",
    skills: [
      {
        name: "Vercel",
        context: [
          "PitchPlay GH deployment",
          "Compliance review frontend deployment",
        ],
      },
      {
        name: "Railway",
        context: ["Compliance backend deployment work"],
      },
    ],
  },
  {
    id: "desktop",
    label: "Desktop Development",
    blurb: "Native desktop tooling alongside the web work.",
    skills: [
      {
        /* Deliberately repeated from Backend Development — the owner lists
           Python under both. `skillCount` de-duplicates it. */
        name: "Python",
        context: ["PharmaDesk desktop application"],
      },
      {
        name: "CustomTkinter",
        context: ["PharmaDesk desktop interface"],
      },
    ],
  },
];

/**
 * Category shown first when the Skills section loads.
 *
 * Chosen rather than defaulting to array order: one category is visible at a
 * time, so this decides what a visitor sees before interacting. DevOps &
 * Infrastructure carries the richest entries and matches how the site positions
 * its owner.
 */
export const defaultSkillCategoryId = "devops-infrastructure";

/**
 * Total **unique** technologies across every category.
 *
 * De-duplicated deliberately: Python is listed under both Backend Development
 * and Desktop Development, and the owner asked for the headline figure to count
 * distinct technologies rather than repeated entries or categories. `src/data/
 * site.ts` renders this as the "Technologies" figure, so the number and the
 * section cannot drift apart.
 */
export const skillCount = new Set(
  skillCategories.flatMap((category) =>
    category.skills.map((skill) => skill.name)
  )
).size;

/** Total entries including repeats — useful for reconciliation, not displayed. */
export const skillEntryCount = skillCategories.reduce(
  (total, category) => total + category.skills.length,
  0
);

/**
 * Technology rail beneath the hero. Every name appears in the categories above,
 * so the marquee and the skills section cannot disagree.
 */
export const techRail: string[] = [
  "TypeScript",
  "Python",
  "React",
  "Next.js",
  "Tailwind CSS",
  "FastAPI",
  "PostgreSQL",
  "Supabase",
  "pgvector",
  "Docker",
  "Terraform",
  "GitHub Actions",
  "Grafana",
  "Amazon EC2",
  "Vercel",
  "Railway",
];