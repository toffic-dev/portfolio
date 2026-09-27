import { site } from "@/data/site";

/**
 * ---------------------------------------------------------------------------
 * CONTACT DELIVERY CONFIGURATION (server-only)
 * ---------------------------------------------------------------------------
 * Import this from server code only — a route handler or a server component.
 * `RESEND_API_KEY` is deliberately *not* a `NEXT_PUBLIC_` variable, so it is
 * unavailable in the browser bundle. That is why the form learns which
 * transport is in use from a prop (rendered on the server) rather than reading
 * the environment itself.
 */

/** Resend's send endpoint. Overridable so the integration can be tested end to end. */
export const RESEND_ENDPOINT =
  process.env.RESEND_API_URL?.trim() || "https://api.resend.com/emails";

/**
 * Fallback sender.
 *
 * Resend will only accept a `from` address on a **verified domain**, so this
 * cannot default to the owner's own address. `onboarding@resend.dev` is
 * Resend's shared test sender: it works immediately, but it only delivers to
 * the address that owns the Resend account. Point `CONTACT_FROM_EMAIL` at
 * something like `Portfolio <hello@your-domain.com>` once a domain is verified.
 */
const DEFAULT_SENDER = "Portfolio <onboarding@resend.dev>";

export interface ContactTransport {
  apiKey: string;
  from: string;
  to: string;
}

/**
 * The resolved delivery settings, or `null` when no API key is set — in which
 * case the form degrades to a `mailto:` handoff rather than pretending to have
 * sent anything.
 */
export function contactTransport(): ContactTransport | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;

  return {
    apiKey,
    from: process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_SENDER,
    to: process.env.CONTACT_TO_EMAIL?.trim() || site.email,
  };
}

/**
 * Whether messages can be delivered by email. Used by the page to choose the
 * form's wording, so the visitor is told the truth *before* they type.
 *
 * Read when the page renders. The home page is prerendered, so on Vercel this
 * resolves at build time from the project's environment variables: setting the
 * key is therefore followed by a redeploy, exactly as any other env change is.
 */
export function isContactConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}