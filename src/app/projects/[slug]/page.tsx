import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, FolderGit2 } from "lucide-react";
import {
  getAdjacentProjects,
  getProjectBySlug,
  getProjectSlugs,
} from "@/lib/projects";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { Badge, StateBadge } from "@/components/ui/Badge";
import { LinkButton } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { TagList } from "@/components/ui/Tag";
import { screenshotFitClass, usableLink } from "@/lib/utils";

interface ProjectPageProps {
  /* Next 16 hands route params over as a promise. */
  params: Promise<{ slug: string }>;
}

/** Every project page is prerendered at build time. */
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      type: "article",
      title: project.name,
      description: project.summary,
    },
  };
}

/**
 * Case-study page.
 *
 * The header (title, metadata, links) is built here; the body is delegated to
 * the reusable `ProjectCaseStudy`. Projects without a written case study still
 * get a complete page instead of a dead link.
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(slug);
  const liveHref = usableLink(project.links.live);
  const repoHref = usableLink(project.links.github);

  return (
    <article className="pt-32 pb-24 sm:pt-36 lg:pb-28">
      <div className="shell">
        <Link
          href="/projects"
          className="meta inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-accent"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          All projects
        </Link>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            {project.featured && <Badge tone="accent">Featured project</Badge>}
            <Badge tone="muted">{project.year}</Badge>
            {project.state && <StateBadge state={project.state} />}
          </div>

          <h1 className="mt-6 max-w-4xl text-[clamp(2rem,6vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-ink uppercase">
            {project.name}
          </h1>

          <p className="mt-5 max-w-3xl text-lg text-ink-soft">{project.tagline}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
            {project.summary}
          </p>

          <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
            <div>
              <dt className="meta text-muted">Role</dt>
              <dd className="meta-sm mt-2 text-ink">{project.role}</dd>
            </div>
            <div>
              <dt className="meta text-muted">Year</dt>
              <dd className="meta-sm mt-2 text-ink">{project.year}</dd>
            </div>
            <div>
              <dt className="meta text-muted">Technologies</dt>
              <dd className="mt-2">
                <TagList items={project.technologies} />
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-3">
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
                Demo and repository links pending — add them in src/data/projects.ts
              </span>
            )}
          </div>
        </header>

        <div className="group mt-12">
          <MediaFrame
            src={project.cover?.src}
            alt={project.cover?.alt ?? `${project.name} screenshot placeholder`}
            label="[PROJECT SCREENSHOT]"
            hint="Add the image to public/projects/ and set `cover` in src/data/projects.ts"
            aspect="wide"
            priority
            sizes="100vw"
            imageClassName={screenshotFitClass(project.cover)}
          />
        </div>

        <div className="mt-16 sm:mt-20">
          {project.caseStudy ? (
            <ProjectCaseStudy project={project} />
          ) : (
            <div className="card p-6 sm:p-8">
              <span className="meta text-muted">Case study</span>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">
                This project does not have a written case study yet. When it does,
                it uses the same template as the other projects — overview, problem,
                solution, architecture, challenges, results and lessons — with no
                component changes required.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-lg border border-line bg-[color-mix(in_oklab,var(--canvas)_55%,transparent)] p-4"
                  >
                    <span className="meta-sm text-ink-soft">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <nav
          aria-label="Other projects"
          className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
        >
          {previous ? (
            <Link
              href={`/projects/${previous.slug}`}
              className="card card-lift p-5"
            >
              <span className="meta flex items-center gap-2 text-muted">
                <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
                Previous
              </span>
              <span className="meta-sm mt-3 block text-ink">{previous.name}</span>
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}

          {next && (
            <Link href={`/projects/${next.slug}`} className="card card-lift p-5 sm:text-right">
              <span className="meta flex items-center gap-2 text-muted sm:justify-end">
                Next
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
              <span className="meta-sm mt-3 block text-ink">{next.name}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}