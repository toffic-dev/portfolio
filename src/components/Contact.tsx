"use client";

import { useState, type FormEvent } from "react";
import { AlertCircle, Check, Loader2, Mail, Send } from "lucide-react";
import { site } from "@/data/site";
import { getSocialLink } from "@/data/social";
import {
  buildContactMailto,
  validateContactMessage,
  type ContactErrors,
  type ContactMessage,
} from "@/lib/contact";
import { Button, LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialList } from "@/components/ui/SocialLinks";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "fallback" | "error";

const EMPTY: ContactMessage = { name: "", email: "", subject: "", message: "" };

/**
 * Contact section: a large closing statement, the direct channels, and a form
 * that genuinely sends.
 *
 * Delivery goes through `POST /api/contact`, which forwards the message with
 * Resend once `RESEND_API_KEY` is configured. When it is not, that route answers
 * `503` and the form hands the visitor a prefilled `mailto:` link rather than
 * claiming a send that never happened — the same "never overstate" rule the
 * bracketed placeholders follow.
 *
 * `configured` is decided on the server (see `@/lib/contact-config`) so the
 * wording is honest before the visitor types, not only after they submit.
 */
export function Contact({ configured }: { configured: boolean }) {
  const [values, setValues] = useState<ContactMessage>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState<string | null>(null);
  /* Bot trap. Hidden from people and assistive tech, so only automation fills it. */
  const [trap, setTrap] = useState("");

  const email = getSocialLink("email");
  const mailtoHref = buildContactMailto(values, site.email);
  const busy = status === "sending";

  function update(field: keyof ContactMessage, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    /* The route runs this same validator, so anything accepted here cannot be
       refused there for an unrelated reason. */
    const found = validateContactMessage(values);
    setErrors(found);
    setFailure(null);

    if (Object.keys(found).length > 0) {
      /* Focus the first field that failed. Resolving it by id keeps this
         synchronous — the DOM has not re-rendered with `aria-invalid` yet. */
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: trap }),
      });
      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (response.ok && data?.ok) {
        setStatus("sent");
        setValues(EMPTY);
        return;
      }

      /* Two ways to reach the handoff. `values` is kept either way so the link
         can carry what was typed.
           - 503: the route is running but has no key configured
           - 404/405, or a body that is not our JSON: no contact route is
             mounted at all (a static deployment, for instance)
         Neither is an error the visitor can act on, so neither is dressed up as
         one — and delivery deliberately does not depend on the `configured`
         flag, which is only there to word the form before submission. */
      const noTransport =
        response.status === 503 ||
        response.status === 404 ||
        response.status === 405 ||
        data === null;

      if (noTransport) {
        setStatus("fallback");
        return;
      }

      setStatus("error");
      setFailure(data?.message ?? "The message could not be sent.");
    } catch {
      setStatus("error");
      setFailure(
        "The server could not be reached. Please try again, or use the email link above."
      );
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-line py-24 sm:py-28 lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines absolute inset-0 opacity-50" />
        <div className="radial-glow absolute -bottom-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full" />
      </div>

      <div className="shell">
        <Reveal>
          <SectionHeading index="06" label="Contact" />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Closing statement + direct channels --------------------------- */}
          <div>
            <Reveal>
              <h2 className="text-[clamp(2rem,6vw,3.5rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-ink uppercase">
                Let&apos;s build
                <br />
                something
                <br />
                great.
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
                Have a project, opportunity or collaboration in mind? The fastest way to
                reach me is email — the form below works too.
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <LinkButton
                  href={email.href}
                  size="lg"
                  leadingIcon={<Send aria-hidden="true" className="h-4 w-4" />}
                >
                  Start a conversation
                </LinkButton>
                <LinkButton
                  href={site.resume.viewPath}
                  variant="secondary"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View resume
                </LinkButton>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-10">
                <span className="meta text-muted">Direct channels</span>
                <SocialList className="mt-4" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-5">
                <span className="meta text-muted">Send a message</span>
                {/* Honest about the transport before the visitor types, not only
                    after they submit. */}
                <span className="meta text-muted">
                  {configured ? "Delivered by email" : "Opens your mail client"}
                </span>
              </div>

              {status === "sent" ? (
                <div
                  role="status"
                  className="mt-6 rounded-lg border border-ok/35 bg-ok/10 p-5"
                >
                  <p className="meta flex items-center gap-2 text-ok">
                    <Check aria-hidden="true" className="h-3.5 w-3.5" />
                    Message sent
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    Delivered to {site.email}. I read everything that arrives and will
                    reply to the address you gave.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-5"
                    onClick={() => setStatus("idle")}
                  >
                    Write another message
                  </Button>
                </div>
              ) : status === "fallback" ? (
                /* No transport configured. The message is handed to the visitor's
                   own mail client instead of being reported as sent. */
                <div
                  role="status"
                  className="mt-6 rounded-lg border border-line bg-elevated/60 p-5"
                >
                  <p className="meta flex items-center gap-2 text-ink">
                    <Mail aria-hidden="true" className="h-3.5 w-3.5" />
                    No email service is connected to this site
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    Your message has <span className="text-ink">not</span> been sent —
                    nothing was transmitted and nothing was stored. Open it in your own
                    mail client instead: the subject and body are already written out.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <LinkButton
                      href={mailtoHref}
                      size="sm"
                      leadingIcon={<Mail aria-hidden="true" className="h-4 w-4" />}
                    >
                      Open in mail client
                    </LinkButton>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setStatus("idle")}
                    >
                      Back to the form
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-5">
                  {failure && (
                    <p
                      role="alert"
                      className="flex items-start gap-3 rounded-lg border border-warn/40 bg-warn/10 p-4 text-sm leading-relaxed text-ink-soft"
                    >
                      <AlertCircle
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-warn"
                      />
                      {failure}
                    </p>
                  )}

                  {/* Bot trap: off-screen, out of the tab order and hidden from
                      assistive tech, so a value in it means automation filled it
                      in. Real visitors never encounter it. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
                  >
                    <label htmlFor="company">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={trap}
                      onChange={(event) => setTrap(event.target.value)}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      id="name"
                      label="Name"
                      value={values.name}
                      error={errors.name}
                      onChange={(value) => update("name", value)}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      value={values.email}
                      error={errors.email}
                      onChange={(value) => update("email", value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>

                  <Field
                    id="subject"
                    label="Subject"
                    value={values.subject}
                    error={errors.subject}
                    onChange={(value) => update("subject", value)}
                    placeholder="Project, role or collaboration"
                  />

                  <Field
                    id="message"
                    label="Message"
                    textarea
                    rows={6}
                    value={values.message}
                    error={errors.message}
                    onChange={(value) => update("message", value)}
                    placeholder="What would you like to build?"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                    <Button
                      type="submit"
                      disabled={busy}
                      leadingIcon={
                        busy ? (
                          <Loader2
                            aria-hidden="true"
                            className="h-4 w-4 animate-spin"
                          />
                        ) : (
                          <Send aria-hidden="true" className="h-4 w-4" />
                        )
                      }
                    >
                      {busy ? "Sending…" : "Send message"}
                    </Button>
                    <span className="meta text-muted">
                      Checked in the browser and on the server
                    </span>
                  </div>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  id: keyof ContactMessage;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: "text" | "email";
  textarea?: boolean;
  rows?: number;
  autoComplete?: string;
}

/**
 * One labelled field. The `<label>`, the control and the error message are wired
 * together with `htmlFor` / `aria-describedby` / `aria-invalid`, so screen
 * readers announce the problem instead of relying on a coloured border.
 */
function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  textarea = false,
  rows = 5,
  autoComplete,
}: FieldProps) {
  const describedBy = error ? `${id}-error` : undefined;
  /* 16px on phones, 14px from `sm` up. iOS Safari zooms the whole page in when a
     control smaller than 16px receives focus, which then leaves the layout
     sideways — the larger size on small screens is what prevents that, and it is
     also the more comfortable size to type into on a touch keyboard. */
  const controlClass = cn(
    "w-full rounded-lg border bg-[color-mix(in_oklab,var(--canvas)_55%,transparent)] px-3.5 py-2.5 text-base text-ink transition-colors duration-300 outline-none placeholder:text-muted/70 focus:border-accent sm:text-sm",
    error ? "border-warn" : "border-line"
  );

  return (
    <div>
      <label htmlFor={id} className="meta mb-3 block text-muted">
        {label}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={rows}
          value={value}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={cn(controlClass, "resize-y")}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          onChange={(event) => onChange(event.target.value)}
          className={controlClass}
        />
      )}

      {error && (
        <p id={`${id}-error`} className="meta-sm mt-2 text-warn">
          {error}
        </p>
      )}
    </div>
  );
}