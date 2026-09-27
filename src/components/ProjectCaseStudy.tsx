import type { ReactNode } from "react";
import { Check, FolderGit2, Lightbulb, Target } from "lucide-react";
import type { Project } from "@/types";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { LinkButton } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { TagList } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { screenshotFitClass, usableLink } from "@/lib/utils";

/**
 * Numbered case-study block.
 *
 * `index` + `label` render the same editorial eyebrows the home page uses, so a
 * case study reads as a continuation of the site rather than a separate page.
 */
function CaseBlock({
  index,
  label,
  title,
  children,
  className,
}: {
  index: string;
  label: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="flex items-center gap-3">
        <span className="meta text-accent">{index}</span>
        <span className="meta text-muted">{label}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>

      {title && (
        <h2 className="mt-4 text-xl font-semibold text-ink sm:text-2xl">
          {title}
        </h2>
      )}

      <div className="mt-5 text-sm leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}

/**
 * The whole case-study body for one project.
 *
 * Every block is optional in practice: fields are read from the project's
 * `caseStudy` object, and screenshots render a "pending" note when the array is
 * empty. Adding another case study means adding data, not components.
 */
export function ProjectCaseStudy({ project }: { project: Project }) {
  const study = project.caseStudy;
  const liveHref = usableLink(project.links.live);
  const repoHref = usableLink(project.links.github);
  if (!study) return null;

  return (
    <div className="space-y-16 sm:space-y-20">
      <Reveal>
        <CaseBlock index="01" label="Overview">
          <p className="max-w-3xl text-base leading-relaxed text-ink">
            {study.overview}
          </p>
        </CaseBlock>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <CaseBlock index="02" label="Problem" className="h-full">
            <p>{study.problem}</p>
          </CaseBlock>
        </Reveal>
        <Reveal delay={80}>
          <CaseBlock index="03" label="Solution" className="h-full">
            <p>{study.solution}</p>
          </CaseBlock>
        </Reveal>
      </div>

      <Reveal>
        <CaseBlock index="04" label="My role">
          <p>{study.role}</p>
        </CaseBlock>
      </Reveal>

      <Reveal>
        <CaseBlock index="05" label="Architecture">
          <p className="max-w-3xl">{study.architectureSummary}</p>
          <ArchitectureDiagram
            layers={study.architecture}
            className="mt-6"
          />
        </CaseBlock>
      </Reveal>

      <Reveal>
        <CaseBlock index="06" label="Technology stack">
          <dl className="grid gap-4 sm:grid-cols-3">
            {study.stack.map((group) => (
              <div key={group.label} className="card p-5">
                <dt className="meta text-muted">{group.label}</dt>
                <dd>
                  <TagList items={group.items} className="mt-4" />
                </dd>
              </div>
            ))}
          </dl>
        </CaseBlock>
      </Reveal>

      <Reveal>
        <CaseBlock index="07" label="Key features">
          <ul className="grid gap-3 sm:grid-cols-2">
            {study.keyFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 rounded-lg border border-line bg-surface p-4"
              >
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span className="meta-sm text-ink-soft">{feature}</span>
              </li>
            ))}
          </ul>
        </CaseBlock>
      </Reveal>

      <Reveal>
        <CaseBlock index="08" label="Engineering challenges">
          <ol className="space-y-4">
            {study.challenges.map((challenge, position) => (
              <li
                key={`${challenge.problem}-${position}`}
                className="card overflow-hidden"
              >
                <div className="grid sm:grid-cols-2">
                  <div className="border-b border-line p-5 sm:border-r sm:border-b-0">
                    <span className="meta text-warn">
                      Problem {String(position + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-3 text-sm text-ink-soft">{challenge.problem}</p>
                  </div>
                  <div className="p-5">
                    <span className="meta text-ok">Solution</span>
                    <p className="mt-3 text-sm text-ink-soft">{challenge.solution}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </CaseBlock>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <CaseBlock index="09" label="Results" className="h-full">
            <ul className="space-y-3">
              {study.results.map((result) => (
                <li key={result} className="flex items-start gap-2.5">
                  <Target aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </CaseBlock>
        </Reveal>

        <Reveal delay={80}>
          <CaseBlock index="11" label="Lessons learned" className="h-full">
            <ul className="space-y-3">
              {study.lessons.map((lesson) => (
                <li key={lesson} className="flex items-start gap-2.5">
                  <Lightbulb aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-warn" />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </CaseBlock>
        </Reveal>
      </div>

      <Reveal>
        <CaseBlock index="10" label="Screenshots">
          {study.screenshots.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2">
              {study.screenshots.map((shot) => (
                <li key={shot.src} className="group">
                  <MediaFrame
                    src={shot.src}
                    alt={shot.alt}
                    label="[SCREENSHOT PENDING]"
                    hint="Add the image to public/projects/ and list it in the case study"
                    aspect="wide"
                    imageClassName={screenshotFitClass(shot)}
                  />
                  {shot.caption && (
                    <p className="meta mt-3 text-muted">{shot.caption}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="meta text-muted">
              Screenshots pending — add files to public/projects/ and list them in
              the project&apos;s caseStudy.screenshots array.
            </p>
          )}
        </CaseBlock>
      </Reveal>

      <Reveal>
        <CaseBlock index="12" label="Links">
          <div className="flex flex-wrap items-center gap-3">
            {liveHref && <LinkButton href={liveHref}>Live demo</LinkButton>}
            {repoHref && (
              <LinkButton
                href={repoHref}
                variant="secondary"
                leadingIcon={<FolderGit2 aria-hidden="true" className="h-4 w-4" />}
              >
                GitHub
              </LinkButton>
            )}
            {!liveHref && !repoHref && (
              <span className="meta text-muted">
                Live demo and repository links are still pending.
              </span>
            )}
          </div>
        </CaseBlock>
      </Reveal>
    </div>
  );
}