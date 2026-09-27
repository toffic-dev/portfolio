"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { site } from "@/data/site";
import { getSocialLink } from "@/data/social";
import { Button, LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialList } from "@/components/ui/SocialLinks";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "sent";

const EMPTY: FormState = { name: "", email: "", subject: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Contact section: a large closing statement, the direct channels, and a form
 * that validates properly.
 *
 * The form is intentionally front-end only — validation, error messaging,
 * focus handling and the success state are all real; wiring an email service or
 * route handler later is a single `onSubmit` change.
 */
export function Contact() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(next: FormState): FormErrors {
    const found: FormErrors = {};

    if (!next.name.trim()) found.name = "Please enter your name.";
    if (!next.email.trim()) found.email = "Please enter your email address.";
    else if (!EMAIL_PATTERN.test(next.email.trim()))
      found.email = "That email address does not look valid.";
    if (!next.subject.trim()) found.subject = "Please add a subject.";
    if (!next.message.trim()) found.message = "Please write a message.";
    else if (next.message.trim().length < 20)
      found.message = "A little more detail helps — 20 characters minimum.";

    return found;
  }

  function update(field: keyof FormState, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      /* Focus the first field that failed. Resolving it by id keeps this
         synchronous — the DOM has not re-rendered with `aria-invalid` yet. */
      const firstInvalid = Object.keys(found)[0];
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    /* No backend yet: this resets the UI into its success state. */
    setStatus("sent");
    setValues(EMPTY);
  }

  const email = getSocialLink("email");

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
                <span className="meta text-muted">UI only — no email service</span>
              </div>

              {status === "sent" ? (
                <div
                  role="status"
                  className="mt-6 rounded-lg border border-ok/35 bg-ok/10 p-5"
                >
                  <p className="meta text-ok">Message captured in the interface</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    The form is not connected to an email service yet, so nothing was
                    actually sent. Connecting it later means handling these values in
                    this component&apos;s submit handler.
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
              ) : (
                <div className="mt-6 space-y-5">
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
                      leadingIcon={<Send aria-hidden="true" className="h-4 w-4" />}
                    >
                      Send message
                    </Button>
                    <span className="meta text-muted">
                      Validation runs in the browser
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
  id: keyof FormState;
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