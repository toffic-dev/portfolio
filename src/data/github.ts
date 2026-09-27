/**
 * ---------------------------------------------------------------------------
 * GITHUB
 * ---------------------------------------------------------------------------
 * Snapshot of the public profile (github.com/toffic-dev), read from the GitHub
 * REST API rather than fetched at runtime: no token, no rate limits, nothing to
 * fail on a cold start.
 *
 * `description` is omitted where the repository has no description set on
 * GitHub, and `stars` is omitted rather than printing "0" on every card.
 * Re-read the API and update this file when the profile changes.
 */
export interface RepositoryCard {
  name: string;
  /** Omitted when the repository carries no description on GitHub. */
  description?: string;
  language: string;
  topics?: string[];
  /** Omitted when zero — an empty metric is not worth advertising. */
  stars?: string;
  url: string;
}

export const githubProfileUrl = "https://github.com/toffic-dev";

export const repositories: RepositoryCard[] = [
  {
    name: "compliance-document-review-backend",
    description:
      "FastAPI backend for the Compliance Document Review platform — authentication, document upload and storage, and an internal file-access endpoint for the data pipeline.",
    language: "Python",
    url: "https://github.com/toffic-dev/compliance-document-review-backend",
  },
  {
    name: "compliance-document-review-data-engineering",
    description:
      "Ingestion and retrieval pipeline: PDF, DOCX and XLSX extraction, overlapping chunking and 384-dimension embeddings stored in pgvector, exposed as rule lookup, disclosure check and precedent search.",
    language: "Python",
    url: "https://github.com/toffic-dev/compliance-document-review-data-engineering",
  },
  {
    name: "compliance-document-review-platform",
    description:
      "The Docker Compose environment that runs every service together, with CI that provisions the database and verifies it is healthy on each push.",
    language: "Shell",
    url: "https://github.com/toffic-dev/compliance-document-review-platform",
  },
  {
    name: "compliance-document-review-frontend",
    /* No description set on GitHub yet. */
    language: "TypeScript",
    url: "https://github.com/toffic-dev/compliance-document-review-frontend",
  },
];

/** Repository languages reported by GitHub, used as the profile's tech list. */
export const githubTopics = ["TypeScript", "Python", "Shell"];