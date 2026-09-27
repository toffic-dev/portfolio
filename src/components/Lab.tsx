import { ArrowUpRight, FlaskConical } from "lucide-react";
import { experimentStatusLabel, experiments } from "@/data/lab";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/Tag";
import { isPendingLink } from "@/lib/utils";

/**
 * Lab / experiments.
 *
 * The section that keeps the site looking like an active developer's site
 * instead of a finished CV: small spikes and prototypes, clearly labelled with
 * their state. Placeholder content in `src/data/lab.ts`.
 */
export function Lab() {
  return (
    <section
      id="lab"
      className="relative border-t border-line py-24 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="03.5"
            label="Lab / Experiments"
            title="Things being poked at."
            description="Small prototypes, infrastructure tests and technical rabbit holes. Placeholder entries for now."
            size="md"
          />
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {experiments.map((experiment, position) => (
            <li key={experiment.id}>
              <Reveal delay={position * 70} className="h-full">
                <article className="card card-lift group flex h-full flex-col p-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="meta flex items-center gap-2 text-muted">
                      <FlaskConical aria-hidden="true" className="h-3.5 w-3.5 text-accent" />
                      {experimentStatusLabel[experiment.status]}
                    </span>
                    <Badge tone="muted">Lab</Badge>
                  </div>

                  <h3 className="meta-sm mt-5 font-medium text-ink">
                    {experiment.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {experiment.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                    <TagList items={experiment.technologies} max={3} />
                    {experiment.links && isPendingLink(experiment.links.github) ? (
                      <span className="meta text-muted">Link pending</span>
                    ) : (
                      experiment.links?.github && (
                        <a
                          href={experiment.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="meta inline-flex items-center gap-1.5 text-muted transition-colors duration-300 hover:text-accent"
                        >
                          Repo
                          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                        </a>
                      )
                    )}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}