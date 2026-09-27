import type { Project } from "@/types";

/**
 * ---------------------------------------------------------------------------
 * PROJECTS
 * ---------------------------------------------------------------------------
 * All three projects are real. Detail comes from the owner's own description of
 * each build, plus the public READMEs of the compliance platform's repositories.
 *
 * Array order is the order shown on `/projects`. The featured entry is the one
 * with `featured: true` — it gets the large editorial panel on the home page and
 * its architecture is rendered inline.
 *
 * Covers for all three come from real captures (source files and how each ratio
 * behaves in the frames are documented in `public/projects/README.md`). Links are
 * still partial: Compliance and PharmaDesk have repositories, PitchPlay has none
 * yet, and no project has a live URL — nothing renders for a link that does not
 * exist rather than a broken one.
 */
export const projects: Project[] = [
  /* ---------------------------------------------------------------------- */
  /* 01 — Featured project                                                  */
  /* ---------------------------------------------------------------------- */
  {
    slug: "pitchplay-gh",
    name: "PitchPlay GH",
    tagline: "Ghanaian amateur football pitch-booking and team-matchmaking platform",
    summary:
      "A platform where amateur footballers in Ghana find and book pitch slots, pay online, and get matched into teams. Pitch managers and administrators manage listings and bookings from their own dashboards.",
    year: "2026",
    state: "in-progress",
    role: "Full-stack development",
    /**
     * Public landing page. The source is 1918×935 (2.05:1), far wider than the
     * 16:10 featured frame, so the default `cover` is the wrong fit here: it
     * trims ~211 px (11%) off each side, which would slice the "PP PitchPlay GH"
     * wordmark away on the left and cut the "Get Started" button in half on the
     * right. `contain` letterboxes the capture instead, so the whole page is
     * readable — re-capture at 16:10 and this can go back to `cover`.
     */
    cover: {
      src: "/projects/pitchplay-gh-landing.png",
      alt: "PitchPlay GH landing page: the booking hero over a photograph of amateur footballers, with the navigation bar and the platform's headline figures.",
      fit: "contain",
    },
    technologies: [
      "Next.js 14",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Paystack",
      "Google Maps API",
    ],
    features: [
      "Server-side authentication",
      "Football pitch and slot booking",
      "7-minute reservation lock",
      "Night surcharge pricing",
      "Team-Up matchmaking",
      "Automatic matchmaking expiry",
      "Admin dashboard",
      "Pitch-manager dashboard",
    ],
    links: {},
    featured: true,
    /**
     * Written from the feature list supplied by the owner. The overview,
     * solution, architecture and stack restate what the platform demonstrably
     * does; the problem statement and the two challenges are **reasoned from
     * those features** (a reservation lock and an expiry mechanism only exist
     * because concurrent booking and abandoned records are real problems) and
     * are flagged for confirmation rather than presented as history.
     */
    caseStudy: {
      overview:
        "A booking and matchmaking platform for amateur football in Ghana. Players discover pitches, reserve a slot and pay online; anyone short of players can post a Team-Up and be matched into one. Pitch managers and administrators each get a dashboard for the listings and bookings they are responsible for.",
      problem:
        "Pitch availability and team organisation are handled informally, through phone calls, messages and word of mouth. There is no shared view of which slots are free, no structured way to find players to complete a team, and no single place to settle payment for a booking.",
      solution:
        "One platform covering the whole loop. Discovery and booking sit on top of a time-boxed reservation lock, so a slot cannot be taken by a second player while the first is paying. Anything abandoned — an unpaid reservation, an unanswered Team-Up — expires automatically and returns to the pool instead of being cleaned up by hand. Night surcharge pricing handles the rate difference, and separate admin and pitch-manager dashboards keep each party to the bookings they own.",
      role: "Founder",
      architectureSummary:
        "A Next.js 14 application on Vercel handles both the interface and authentication, talking directly to Supabase for identity and data rather than through a separate backend service. Payments run through Paystack, and pitch discovery uses the Google Maps API. Booking integrity depends on the reservation lock and the scheduled expiry of abandoned reservations and open Team-Up posts.",
      architecture: [
        {
          label: "Client",
          nodes: [
            {
              id: "web",
              label: "Next.js 14 on Vercel",
              detail: "React, TypeScript, Tailwind CSS",
              kind: "client",
            },
          ],
        },
        {
          label: "Platform",
          nodes: [
            {
              id: "supabase",
              label: "Supabase",
              detail: "Authentication + managed Postgres",
              kind: "data",
            },
            {
              id: "paystack",
              label: "Paystack",
              detail: "Booking payments",
              kind: "external",
            },
            {
              id: "maps",
              label: "Google Maps API",
              detail: "Pitch discovery",
              kind: "external",
            },
          ],
        },
      ],
      stack: [
        {
          label: "Frontend",
          items: ["Next.js 14", "React", "TypeScript", "Tailwind CSS"],
        },
        {
          label: "Platform",
          items: ["Supabase", "Paystack", "Google Maps API"],
        },
        { label: "Deployment", items: ["Vercel"] },
      ],
      keyFeatures: [
        "Server-side authentication",
        "Football pitch and slot booking",
        "7-minute reservation lock",
        "Night surcharge pricing",
        "Team-Up matchmaking",
        "Automatic matchmaking expiry",
        "Admin dashboard",
        "Pitch-manager dashboard",
      ],
      challenges: [
        {
          problem:
            "A booking is only safe once payment clears, but holding a slot for the whole payment flow would block it indefinitely if the player walked away.",
          solution:
            "The slot is reserved for a bounded seven minutes while payment completes, so a second player cannot take it mid-transaction and the slot is automatically released if the first one never pays.",
        },
        {
          problem:
            "Open Team-Up posts and unpaid reservations would keep accumulating, permanently occupying slots and leaving half-formed matches open.",
          solution:
            "Both expire automatically once their window passes, returning the slot or the place in the team to the pool without any manual cleanup.",
        },
      ],
      results: ["Core development completed — production deployment pending."],
      screenshots: [
        {
          src: "/projects/pitchplay-gh-landing.png",
          alt: "PitchPlay GH landing page: the booking hero over a photograph of amateur footballers, with navigation for Features, Pitches and How it works.",
          fit: "contain",
          caption:
            "Public landing page — the entry point players arrive at, above the figures the platform advertises.",
        },
      ],
      lessons: [
        "Getting the features to work is only part of the job — the rest is designing the system around real user flows and edge cases from the beginning, which is harder to retrofit than to plan for.",
        "Booking state was the sharpest example: a slot can read as available when it is selected and be gone by the time the booking completes, so the reservation flow was built around a bounded temporary lock. That made concurrency, expiry, and the difference between selecting a slot and actually securing it explicit decisions rather than accidents.",
        "Pricing, matchmaking, authentication and payments do not behave as isolated features — a change in one reaches the others, so the data flow and the user experience around them are worth settling before implementation rather than after.",
        "Rebuilt from scratch, the production architecture and the deployment process would be defined before the later-stage features were built, and the booking and payment flows would be tested against real-world edge cases far more thoroughly before the product was treated as production-ready.",
      ],
    },
  },

  /* ---------------------------------------------------------------------- */
  /* 02 — Compliance Document Review (team-built)                           */
  /* ---------------------------------------------------------------------- */
  {
    slug: "compliance-document-review",
    name: "Compliance Document Review App",
    tagline: "Team-built document review platform with AI-assisted analysis",
    summary:
      "A platform where advisors submit documents for processing and officers review them with AI assistance, built across separate frontend, backend, AI and data-engineering tracks.",
    year: "2026",
    state: "in-progress",
    role: "Frontend + DevOps",
    cover: {
      src: "/projects/compliance-document-review-landing.png",
      alt: "Compliance Review landing page: the submission and sign-in calls to action beside a workflow preview showing a pending document, severity-ranked flags and the officer-review queue.",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Supabase",
      "pgvector",
      "Docker",
      "Railway",
      "Vercel",
      "Git/GitHub",
    ],
    features: [
      "Document upload",
      "PDF / DOCX / XLSX processing",
      "Extracted-text workflow",
      "AI-assisted document analysis",
      "Officer review",
      "Approve / reject / revise workflow",
      "Authentication",
      "Document download and preview",
      "PostgreSQL / Supabase migration",
      "Cloud deployment",
    ],
    links: {
      github: "https://github.com/toffic-dev/compliance-document-review-platform",
    },
    /**
     * Written from the project's public READMEs plus the owner's description of
     * the work. Everything is either documented in those repositories or stated
     * by the owner.
     *
     * `role` and the challenge wording are scoped to the frontend/DevOps track;
     * the cross-track item is labelled as such so it is not read as sole
     * authorship of the platform.
     */
    caseStudy: {
      overview:
        "A multi-service platform for reviewing compliance documents. Advisors upload PDF, DOCX and XLSX files; a data pipeline extracts the text, chunks it with overlap and embeds it into PostgreSQL with pgvector. Three retrieval jobs run against those vectors — rule lookup, disclosure-by-absence and precedent search — and the AI service uses the results to assist an officer's review. Officers move each document through an approve, reject or revise decision.",
      problem:
        "The work was split across separate frontend, backend, AI and data-engineering tracks, each with its own repository. Nothing described how the services fitted together: environment variables diverged between tracks, API contracts drifted, and a fresh clone could not be brought up reliably enough to demonstrate.",
      solution:
        "One repository owns the integration: a Docker Compose stack that builds and starts every service against a shared PostgreSQL/pgvector instance, a single .env.example listing every known environment variable, and an INTEGRATION.md kept as the documented source of truth for anything crossing a track boundary. Bring-up order is explicit — database first, then the seed script, then the remaining services — and the whole path is tested from a clean checkout.",
      role:
        "Frontend + DevOps: frontend implementation, service integration across the tracks, the containerised environment, environment configuration, CI, and cloud deployment.",
      architectureSummary:
        "The browser talks to a Next.js frontend, which calls a FastAPI backend. Users authenticate with JWT; trusted internal services use a shared internal token. The data-engineering pipeline pulls the original file back from the backend's internal endpoint, extracts text, chunks it with overlap, and stores 384-dimension embeddings in PostgreSQL/pgvector. The AI service consumes those vectors and returns its analysis for the officer to act on. The frontend is deployed on Vercel and backend deployment work has run on Railway; the AI service still runs locally in Docker for the current submission.",
      architecture: [
        {
          label: "Client",
          nodes: [
            {
              id: "web",
              label: "Next.js on Vercel",
              detail: "React, TypeScript, Tailwind CSS",
              kind: "client",
            },
          ],
        },
        {
          label: "Service",
          nodes: [
            {
              id: "api",
              label: "FastAPI backend",
              detail: "JWT auth, uploads, metadata · Railway",
              kind: "service",
            },
            {
              id: "pipeline",
              label: "Ingestion pipeline",
              detail: "Extraction → chunking → embeddings",
              kind: "service",
            },
          ],
        },
        {
          label: "Data & AI",
          nodes: [
            {
              id: "db",
              label: "PostgreSQL / Supabase",
              detail: "Chunks, rules, pgvector embeddings",
              kind: "data",
            },
            {
              id: "ai",
              label: "AI service",
              detail: "Retrieval + analysis (local Docker)",
              kind: "ai",
            },
          ],
        },
        {
          label: "Storage",
          nodes: [
            {
              id: "uploads",
              label: "Document storage",
              detail: "Original uploaded files",
              kind: "external",
            },
          ],
        },
      ],
      stack: [
        {
          label: "Frontend",
          items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        },
        {
          label: "Backend & data",
          items: ["FastAPI", "Python", "PostgreSQL", "Supabase", "pgvector"],
        },
        {
          label: "Platform",
          items: ["Docker", "Railway", "Vercel", "Git/GitHub", "GitHub Actions"],
        },
      ],
      keyFeatures: [
        "Document upload",
        "PDF / DOCX / XLSX processing",
        "Extracted-text workflow",
        "AI-assisted document analysis",
        "Officer review",
        "Approve / reject / revise workflow",
        "Authentication",
        "Document download and preview",
        "PostgreSQL / Supabase migration",
        "Cloud deployment",
        /* Platform capability documented in the data-engineering README; the
           owner's feature list covers the workflows, this covers the retrieval
           core behind them. */
        "Three retrieval jobs: rule lookup, disclosure-by-absence, precedent search",
      ],
      challenges: [
        {
          problem:
            "A clean checkout could not be brought up from the repositories alone: the database had to exist and be seeded before any service would start, and the order was not documented.",
          solution:
            "Made the bring-up order explicit and repeatable — database first, then the seed script, then the remaining services — and tested the whole path end to end from a fresh clone until it passed.",
        },
        {
          problem:
            "The tracks configured different environment variables and drifted apart at the boundaries, so one service would fail to reach another with no obvious cause.",
          solution:
            "Consolidated every known variable into a single .env.example and wrote INTEGRATION.md as the shared source of truth for cross-track contracts, so the interface between services is documented rather than assumed.",
        },
        {
          problem:
            "Across tracks: the AI service and the data-engineering pipeline were writing embeddings of different dimensions (128 vs 384), so similarity search could not compare vectors produced by one against the other.",
          solution:
            "Both services were standardised on the same sentence-transformer model (all-MiniLM-L6-v2, 384 dimensions) and the mismatch was confirmed fixed by inspecting container logs. Surfaced during integration work rather than owned outright.",
        },
      ],
      results: [
        "Bring-up from a clean checkout verified end to end: fresh clone → database → seed, all passing.",
        "CI starts the database and verifies its health on every push.",
        "Frontend deployed on Vercel; backend deployment work carried out on Railway.",
        "PostgreSQL / Supabase migration completed; the AI service still runs locally in Docker for the current submission.",
      ],
      screenshots: [
        {
          src: "/projects/compliance-document-review-landing.png",
          alt: "Compliance Review landing page: the upload and sign-in calls to action beside the review preview panel, which lists flags marked critical, high and medium.",
          caption:
            "Public landing page — submission on the left, the ranked flags and the officer's queue on the right.",
        },
      ],
      lessons: [
        "Contracts between services have to be defined before the services are integrated. With a frontend, backend, data-engineering pipeline and AI service in play, a small difference in the assumed endpoint, request body, authentication or ownership of a processing step was enough to break the flow even when every component worked correctly on its own.",
        "The document-analysis workflow was the clearest case: the AI endpoint required both the document ID and the extracted text, while the backend was initially calling it without the required payload. Resolving that made the requirement plain — an API contract has to be explicit, tested, and treated as a shared agreement between the teams on either side of it.",
        "Data-processing responsibilities need a named owner. Duplicating document extraction in the backend was the obvious shortcut; the agreed architecture keeps extraction in Data Engineering and has the backend pass the extracted content into the AI workflow instead, which removes the duplication and leaves the system easier to maintain.",
        "Starting again, the cross-service API contracts would be established and tested earlier, the complete request flow documented before implementation, and integration tests written for the critical frontend → backend → data-engineering → AI path from the beginning. Authentication failures, wrong API paths, missing request fields and deployment configuration problems are all cheaper to catch there than in the later stages of development.",
      ],
    },
  },

  /* ---------------------------------------------------------------------- */
  /* 03 — PharmaDesk                                                        */
  /* ---------------------------------------------------------------------- */
  {
    slug: "pharmadesk",
    name: "PharmaDesk",
    tagline: "Python desktop pharmacy management application",
    summary:
      "A desktop application for running a pharmacy's day-to-day operations, covering inventory, sales and reporting over a local SQLite database with built-in backup.",
    year: "2026",
    state: "completed",
    role: "Developer",
    cover: {
      src: "/projects/pharmadesk-dashboard.png",
      alt: "PharmaDesk dashboard: a dark sidebar beside four summary tiles for inventory value, low-stock items, expiring stock and sales today, an attention-needed list of low-stock medicines, and a recent-sales table.",
    },
    technologies: ["Python", "CustomTkinter", "SQLite"],
    features: [
      "Inventory management",
      "Sales management",
      "Reporting",
      "Database storage",
      "Backup functionality",
    ],
    links: {
      github: "https://github.com/toffic-dev/PharmaDesk",
    },
  },
];

/* --------------------------------------------------------------------------
   Derived collections — the components only ever read from these.
   -------------------------------------------------------------------------- */

export const featuredProject: Project | undefined = projects.find(
  (project) => project.featured
);

export const otherProjects: Project[] = projects.filter(
  (project) => !project.featured
);

/** Projects that actually have a case study written. */
export const projectsWithCaseStudy: Project[] = projects.filter(
  (project) => Boolean(project.caseStudy)
);