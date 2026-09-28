/**
 * Canonical origin for metadata, robots and the sitemap.
 *
 * Set `NEXT_PUBLIC_SITE_URL` to the real domain (Vercel → Project → Settings →
 * Environment Variables). Until then the fallback keeps local builds working
 * without pretending to be a real domain.
 */

/** Used when `NEXT_PUBLIC_SITE_URL` is missing, blank or unparseable. */
const FALLBACK_ORIGIN = "http://localhost:3000";

/**
 * Resolves the canonical origin, and never throws.
 *
 * `??` alone is not enough: a variable that *exists* but is empty — which is
 * what a dashboard row with a blank value, or a copied `.env.example`,
 * produces — is `""`, not `null`, so `??` passes it straight through.
 * `layout.tsx` then handed that to `new URL()` and the whole build died with
 * `ERR_INVALID_URL: input: ''`.
 *
 * Two shapes are therefore tolerated:
 *
 *  - a blank value counts as unset, falling back instead of failing;
 *  - a value with no scheme gets `https://`, since a bare domain is the usual
 *    form of what gets pasted in.
 *
 * A wrong canonical URL is a far smaller problem than a site that cannot
 * build, so every doubtful case resolves to something usable.
 */
function resolveSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_ORIGIN;

  /* A bare domain is the usual shape of what gets pasted in, so add the scheme
     rather than rejecting it. */
  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const parsed = new URL(candidate);
    /* Only http(s) can serve as a canonical origin. Other schemes parse fine
       but report `origin` as the string "null" — `javascript:alert(1)` would
       become the canonical `nullalert(1)` — so they fall back instead. */
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("unsupported scheme");
    }

    /* Origin and path only: a stray `?query` or `#hash` in the variable would
       otherwise be carried into every canonical URL. Trailing slashes are
       dropped so `${siteOrigin}/projects` cannot double up. */
    return `${parsed.origin}${parsed.pathname}`.replace(/\/+$/, "");
  } catch {
    console.warn(
      `[seo] NEXT_PUBLIC_SITE_URL is not a usable http(s) URL: ` +
        `${JSON.stringify(raw)}. Falling back to ${FALLBACK_ORIGIN}.`
    );
    return FALLBACK_ORIGIN;
  }
}

export const siteOrigin = resolveSiteOrigin();