import { Check, Download, FileText } from "lucide-react";
import { site } from "@/data/site";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const RESUME_CONTENTS = [
  "Experience",
  "Education",
  "Skills",
  "Projects",
  "Certifications",
];

/**
 * Resume call-to-action.
 *
 * Both buttons read their targets from `site.resume`, so swapping the PDF in
 * `public/resume/` (or renaming it) is a data change — no component edit here.
 * The file is in place, so the note below describes it instead of apologising
 * for its absence.
 */
export function Resume() {
  return (
    <section
      id="resume"
      className="relative border-t border-line py-24 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
            <span
              aria-hidden="true"
              className="grid-lines absolute inset-0 opacity-60"
            />
            <span
              aria-hidden="true"
              className="radial-glow absolute -top-32 -right-20 h-80 w-80 rounded-full"
            />

            <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:p-12">
              <div>
                <span className="meta text-muted">Resume</span>
                <h2 className="mt-5 text-3xl leading-tight font-semibold text-ink sm:text-4xl">
                  Want the full picture?
                </h2>
                <p className="mt-5 max-w-xl leading-relaxed text-ink-soft">
                  Download the complete resume covering experience, education,
                  skills, projects and certifications.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <LinkButton
                    href={site.resume.downloadPath}
                    size="lg"
                    download={site.resume.fileName}
                    leadingIcon={<Download aria-hidden="true" className="h-4 w-4" />}
                  >
                    Download resume
                  </LinkButton>
                  <LinkButton
                    href={site.resume.viewPath}
                    variant="secondary"
                    size="lg"
                    target="_blank"
                    rel="noopener noreferrer"
                    leadingIcon={<FileText aria-hidden="true" className="h-4 w-4" />}
                  >
                    View resume
                  </LinkButton>
                </div>

                <p className="meta mt-6 text-muted">
                  Two-page PDF — download it, or read it in a new tab.
                </p>
              </div>

              <div className="lg:border-l lg:border-line lg:pl-12">
                <span className="meta text-muted">What&apos;s inside</span>
                <ul className="mt-5 space-y-3">
                  {RESUME_CONTENTS.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="grid h-6 w-6 place-items-center rounded-md border border-line text-accent"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="meta-sm text-ink-soft">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="meta mt-8 border-t border-line pt-6 text-muted">
                  The PDF is the single source of truth — these are its sections.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}