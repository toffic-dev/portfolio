/**
 * ---------------------------------------------------------------------------
 * CONTACT FORM RULES
 * ---------------------------------------------------------------------------
 * Shared by the browser and the server on purpose. `Contact.tsx` runs
 * `validateContactMessage()` for instant inline feedback, and
 * `app/api/contact/route.ts` runs the *same* function, because anything
 * arriving over the wire is untrusted. One implementation means the two can
 * never disagree about what a valid message is — a message that passes in the
 * browser cannot be refused by the server for a different reason.
 *
 * Nothing here reads environment variables: this module is imported into the
 * client bundle, so it must stay free of server-only concerns. That lives in
 * `@/lib/contact-config`.
 */

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactField = keyof ContactMessage;
export type ContactErrors = Partial<Record<ContactField, string>>;

/** Shortest message accepted. Mirrored in the field's error copy. */
export const MESSAGE_MIN_LENGTH = 20;

/**
 * Hard cap per field, applied before validation and before anything is sent.
 *
 * The inputs deliberately do **not** carry a `maxlength`: silently truncating a
 * paste reads as data loss. These limits exist instead to stop an oversized or
 * hostile body from reaching the mail provider.
 */
export const CONTACT_MAX_LENGTH: Record<ContactField, number> = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Coerces unknown input into the four known string fields, trimmed and capped.
 *
 * Anything that is not a string becomes an empty string, so a crafted JSON body
 * carrying objects, arrays or numbers where text is expected cannot slip past
 * validation or reach an email header.
 */
export function normalizeContactMessage(input: unknown): ContactMessage {
  const source = (
    typeof input === "object" && input !== null ? input : {}
  ) as Record<string, unknown>;

  const read = (field: ContactField) => {
    const raw = source[field];
    const value = typeof raw === "string" ? raw : "";
    return value.trim().slice(0, CONTACT_MAX_LENGTH[field]);
  };

  return {
    name: read("name"),
    email: read("email"),
    subject: read("subject"),
    message: read("message"),
  };
}

/** Empty when the message is sendable; otherwise one message per bad field. */
export function validateContactMessage(value: ContactMessage): ContactErrors {
  const errors: ContactErrors = {};

  /* Trimmed here rather than relying on the caller: a field holding only
     whitespace is empty, and checking the raw value would let it through. */
  const name = value.name.trim();
  const email = value.email.trim();
  const subject = value.subject.trim();
  const message = value.message.trim();

  if (!name) errors.name = "Please enter your name.";
  if (!email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(email))
    errors.email = "That email address does not look valid.";
  if (!subject) errors.subject = "Please add a subject.";
  if (!message) errors.message = "Please write a message.";
  else if (message.length < MESSAGE_MIN_LENGTH)
    errors.message = `A little more detail helps — ${MESSAGE_MIN_LENGTH} characters minimum.`;

  return errors;
}

/**
 * A `mailto:` URL carrying the same content, used when the site has no email
 * service configured. It keeps the form useful instead of decorative, and the
 * message the visitor already typed is not thrown away.
 *
 * `encodeURIComponent` handles the newlines and any `&`/`?`/`#` in the text,
 * which would otherwise terminate the query string early.
 */
export function buildContactMailto(value: ContactMessage, to: string): string {
  const subject = value.subject || "Portfolio enquiry";
  const body = [
    value.message,
    "",
    `— ${value.name || "(name not given)"}${value.email ? ` <${value.email}>` : ""}`,
  ].join("\n");

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}