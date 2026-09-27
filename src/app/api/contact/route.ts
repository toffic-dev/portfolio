import { NextResponse } from "next/server";
import {
  normalizeContactMessage,
  validateContactMessage,
  type ContactErrors,
} from "@/lib/contact";
import { RESEND_ENDPOINT, contactTransport } from "@/lib/contact-config";

/**
 * ---------------------------------------------------------------------------
 * POST /api/contact
 * ---------------------------------------------------------------------------
 * The only request-time route on the site; everything else is prerendered. A
 * submitted message is request-scoped and must never be cached, so this handler
 * is dynamic by virtue of accepting POST.
 *
 * Four outcomes, and the client tells them apart by status code:
 *
 *   200  accepted — or silently dropped as spam
 *   400  the body was not JSON at all
 *   422  the server disagreed with the payload (field-level errors included)
 *   502  a transport exists but the provider rejected it or could not be reached
 *   503  no transport configured — the client falls back to `mailto:`
 */

/** Bot trap. Hidden from people and assistive tech, so only automation fills it. */
const HONEYPOT_FIELD = "company";

function fail(
  error: string,
  message: string,
  status: number,
  errors?: ContactErrors
) {
  return NextResponse.json(
    { ok: false, error, message, ...(errors ? { errors } : {}) },
    { status }
  );
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return fail("invalid-json", "The request body was not valid JSON.", 400);
  }

  /* Dropped silently: answering 200 is indistinguishable from success, so a
     spam script gets no signal to tune its payload against. */
  const trap = (payload as Record<string, unknown> | null)?.[HONEYPOT_FIELD];
  if (typeof trap === "string" && trap.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  /* The browser already validated this, but the browser is not trustworthy —
     the same shared validator runs again on the server. */
  const message = normalizeContactMessage(payload);
  const errors = validateContactMessage(message);
  if (Object.keys(errors).length > 0) {
    return fail("invalid-input", "Some fields still need attention.", 422, errors);
  }

  const transport = contactTransport();
  if (!transport) {
    /* Not an error the visitor caused, and not a dead end either: the client
       turns this code into a prefilled `mailto:` handoff. */
    return fail(
      "not-configured",
      "No email service is configured for this site yet.",
      503
    );
  }

  const body = {
    from: transport.from,
    to: [transport.to],
    /* Replies go back to the visitor rather than to the sender address, which
       is a no-reply mailbox. The REST field is snake_case (`reply_to`) even
       though the SDK's option is `replyTo`. */
    reply_to: message.email,
    subject: `[Portfolio] ${message.subject}`,
    text: [
      `From:    ${message.name} <${message.email}>`,
      `Subject: ${message.subject}`,
      "",
      message.message,
    ].join("\n"),
  };

  let response: Response;
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${transport.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (cause) {
    console.error("[contact] delivery request failed", cause);
    return fail(
      "delivery-failed",
      "The email service could not be reached.",
      502
    );
  }

  if (!response.ok) {
    /* Logged, never returned: a provider error can name the account, the
       sending domain or the API key's scope, and none of that belongs in a
       response to an anonymous visitor. */
    const detail = await response.text().catch(() => "");
    console.error(
      `[contact] provider rejected the message (${response.status})`,
      detail
    );
    return fail("delivery-failed", "The email service rejected the message.", 502);
  }

  const data = (await response.json().catch(() => null)) as { id?: string } | null;
  return NextResponse.json({ ok: true, id: data?.id ?? null });
}