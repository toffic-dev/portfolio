import { ArrowUpRight, FileText, FolderGit2, Layers } from "lucide-react";
import type { Project } from "@/types";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Badge, StateBadge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { TagList } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { screenshotFitClass, usableLink } from "@/lib/utils";

/**
 * Featured project — an editorial, product-style panel rather than another grid
 * cell: title block, media, key features and the system architecture, all
 * driven by one entry in `src/data/projects.ts`.
 */
export function FeaturedProjectCard({ project }: { project: Project }) {
  const caseStudyHref = project.caseStudy ? `/projects/${project.slug}` : undefined;
  const repoHref = usableLink(project.links.github);
  const liveHref = usableLink(project.links.live);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out-soft group-hover:scale-x-100"
      />

      <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
        {/* Copy -------------------------------------------------------- */}
        <div className="p-6 sm:p-9 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="accent">Featured project</Badge>
            <span className="meta text-muted">{project.year}</span>
            {project.state && <StateBadge state={project.state} />}
          </div>

          <h3 className="mt-6 text-[clamp(1.6rem,4vw,2.6rem)] leading-[1.04] font-semibold tracking-[-0.03em] text-ink uppercase">
            {project.name}
          </h3>

          <p className="mt-4 text-base text-ink-soft">{project.tagline}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
            {project.summary}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-3">
            <div>
              <dt className="meta text-muted">Role</dt>
              <dd className="meta-sm mt-2 text-ink">{project.role}</dd>
            </div>
            <div>
              <dt className="meta text-muted">Year</dt>
              <dd className="meta-sm mt-2 text-ink">{project.year}</dd>
            </div>
            <div>
              <dt className="meta text-muted">Stack</dt>
              <dd className="meta-sm mt-2 text-ink">
                {project.technologies.length} technologies
              </dd>
            </div>
          </dl>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <Layers
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                />
                <span className="meta-sm text-ink-soft">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {caseStudyHref && (
              <LinkButton
                href={caseStudyHref}
                trailingIcon={
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                  />
                }
              >
                Case study
              </LinkButton>
            )}

            {repoHref && (
              <LinkButton
                href={repoHref}
                variant="secondary"
                leadingIcon={<FolderGit2 aria-hidden="true" className="h-4 w-4" />}
              >
                GitHub
              </LinkButton>
            )}

            {liveHref && (
              <LinkButton href={liveHref} variant="outline">
                Live demo
              </LinkButton>
            )}

            {!repoHref && !liveHref && (
              <span className="meta text-muted">
                Demo and repository links pending
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-line p-6 sm:p-9 lg:border-t-0 lg:border-l lg:p-10">
          <MediaFrame
            src={project.cover?.src}
            alt={project.cover?.alt ?? `${project.name} screenshot placeholder`}
            label="[PROJECT SCREENSHOT]"
            hint="Add the image to public/projects/ and set `cover` in src/data/projects.ts"
            aspect="wide"
            sizes="(min-width: 1024px) 45vw, 100vw"
            imageClassName={screenshotFitClass(project.cover)}
          />

          <TagList items={project.technologies} className="mt-6" />

          {/* Only meaningful while a real screenshot is still missing. */}
          {!project.cover && (
            <p className="meta mt-6 flex items-center gap-2 text-muted">
              <FileText aria-hidden="true" className="h-3.5 w-3.5" />
              Screenshot pending
            </p>
          )}
        </div>
      </div>

      {project.caseStudy && (
        <div className="border-t border-line p-6 sm:p-9 lg:p-10">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="meta text-muted">System architecture</span>
              <span className="meta text-muted">
                {project.caseStudy.architecture.length} layers
              </span>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">
              {project.caseStudy.architectureSummary}
            </p>
            <ArchitectureDiagram
              layers={project.caseStudy.architecture}
              className="mt-6"
            />
          </Reveal>
        </div>
      )}
    </article>
  );
}