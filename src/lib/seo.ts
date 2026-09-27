/**
 * Canonical origin for metadata, robots and the sitemap.
 *
 * Set `NEXT_PUBLIC_SITE_URL` to the real domain before deploying (Vercel →
 * Project → Settings → Environment Variables). Until then the placeholder keeps
 * local builds working without pretending to be a real domain.
 */
export const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");