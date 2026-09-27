import { Check } from "lucide-react";
import { experience } from "@/data/experience";
import type { ExperienceEntry } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/Tag";
import { isPlaceholder } from "@/lib/utils";

/**
 * One timeline entry.
 *
 * Reusable across all three kinds: `role` is employment, while `education` and
 * `program` are degrees and training credentials. Three things are conditional
 * rather than assumed — the badge and dot style (so non-employment entries read
 * differently), the year marker (omitted when the dates are unconfirmed, since a
 * bracketed year reads as a rendering fault rather than a missing fact) and the
 * technology and achievement lists (omitted when empty instead of leaving an
 * empty heading).
 */
function ExperienceItem({
  entry,
  kind = "role",
}: {
  entry: ExperienceEntry;
  kind?: "role" | "education" | "program";
}) {
  const isNonRole = kind !== "role";
  const badgeLabel = kind === "education" ? "Degree" : "Program";

  return (
    <div className="relative border-t border-line pl-8 sm:pl-12">
      <span
        aria-hidden="true"
        className="absolute top-0 left-[9px] h-full w-px bg-line"
      />
      <span
        aria-hidden="true"
        className={
          isNonRole
            ? "absolute top-9 left-[4px] grid h-3.5 w-3.5 place-items-center rounded-full border border-accent/60 bg-canvas"
            : "absolute top-9 left-[4px] grid h-3.5 w-3.5 place-items-center rounded-full border border-line-strong bg-canvas"
        }
      >
        <span
          className={
            isNonRole
              ? "h-1.5 w-1.5 rounded-full border border-accent bg-transparent"
              : "h-1.5 w-1.5 rounded-full bg-accent"
          }
        />
      </span>

      <div className="py-8 sm:py-9">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <span className="font-mono text-sm text-ink">
            {entry.marker ?? "—"}
          </span>
          <span className="meta text-muted">{entry.period}</span>
          {entry.location && (
            <span className="meta text-muted">{entry.location}</span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <h3 className="text-lg font-semibold text-ink sm:text-xl">
            {entry.role}
          </h3>
          {isNonRole && <Badge tone="accent">{badgeLabel}</Badge>}
        </div>
        <p className="meta-sm mt-2 text-accent">{entry.organization}</p>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-soft">
          {entry.summary}
        </p>

        {(entry.technologies.length > 0 || entry.achievements.length > 0) && (
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {entry.technologies.length > 0 && (
              <div>
                <span className="meta text-muted">Technologies</span>
                <TagList items={entry.technologies} className="mt-3" />
              </div>
            )}

            {entry.achievements.length > 0 && (
              <div>
                <span className="meta text-muted">Achievements</span>
                <ul className="mt-3 space-y-2">
                  {entry.achievements.map((achievement) => (
                    <li key={achievement} className="flex items-start gap-2.5">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ok"
                      />
                      <span className="meta-sm text-ink-soft">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Vertical experience timeline.
 *
 * Employment renders in the main list; education and training render under a
 * separate "Education & credentials" heading, so a degree or a completed course
 * is never read as a job. Content comes from `src/data/experience.ts`.
 */
export function Experience() {
  const roles = experience.filter(
    (entry) => entry.kind === undefined || entry.kind === "role"
  );
  const credentials = experience.filter(
    (entry) => entry.kind === "education" || entry.kind === "program"
  );

  return (
    <section
      id="experience"
      className="relative border-t border-line py-24 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="04"
            label="Experience"
            title="Where the work happened."
            description="Roles, plus education and training credentials, kept separate from employment."
          />
        </Reveal>

        <ol className="mt-14">
          {roles.map((entry, position) => (
            <li key={entry.id}>
              <Reveal delay={position * 60}>
                <ExperienceItem entry={entry} />
              </Reveal>
            </li>
          ))}
        </ol>

        {credentials.length > 0 && (
          <div className="mt-14">
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="meta text-muted">
                  Education &amp; credentials
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-line" />
                <span className="meta text-muted">
                  {credentials.length}{" "}
                  {credentials.length === 1 ? "entry" : "entries"}
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
                Degrees and training programmes, listed separately from
                employment.
              </p>
            </Reveal>

            <ol className="mt-6">
              {credentials.map((entry, position) => (
                <li key={entry.id}>
                  <Reveal delay={position * 60}>
                    <ExperienceItem
                      entry={entry}
                      kind={entry.kind === "education" ? "education" : "program"}
                    />
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Self-removing: rendered only while some period is still a placeholder,
            so the note cannot outlive the values it describes. */}
        {experience.some((entry) => isPlaceholder(entry.period)) && (
          <p className="meta mt-10 pl-8 text-muted sm:pl-12">
            Some start dates are still being confirmed.
          </p>
        )}
      </div>
    </section>
  );
}