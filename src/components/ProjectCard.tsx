import Link from "next/link";
import { ArrowUpRight, FileText, FolderGit2 } from "lucide-react";
import type { Project } from "@/types";
import { LinkButton } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { StateBadge } from "@/components/ui/Badge";
import { TagList } from "@/components/ui/Tag";
import { isPendingLink, screenshotFitClass } from "@/lib/utils";

/**
 * Compact project card for everything that is not the featured project.
 * Conditional by design: no cover image, no case study or no GitHub link simply
 * renders fewer elements.
 */
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index?: number;
}) {
  const caseStudyHref = project.caseStudy ? `/projects/${project.slug}` : undefined;

  return (
    <article className="card card-lift group flex h-full flex-col overflow-hidden">
      <MediaFrame
        src={project.cover?.src}
        alt={project.cover?.alt ?? `${project.name} screenshot placeholder`}
        label="[SCREENSHOT PENDING]"
        hint="Add the image to public/projects/ and set `cover` in src/data/projects.ts"
        aspect="video"
        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
        imageClassName={screenshotFitClass(project.cover)}
        className="rounded-none border-x-0 border-t-0 border-b"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="meta text-muted">
              {index !== undefined && (
                <span>{String(index + 1).padStart(2, "0")} / </span>
              )}
              {project.year}
            </p>
            <h3 className="mt-2 text-base leading-snug font-semibold text-ink">
              {caseStudyHref ? (
                <Link
                  href={caseStudyHref}
                  className="transition-colors duration-300 hover:text-accent"
                >
                  {project.name}
                </Link>
              ) : (
                project.name
              )}
            </h3>
          </div>
          {project.state && <StateBadge state={project.state} />}
        </div>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
          {project.summary}
        </p>

        <TagList items={project.technologies} max={4} className="mt-4" />

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
          {caseStudyHref && (
            <Link
              href={caseStudyHref}
              className="group/link inline-flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors duration-300 hover:text-accent"
            >
              <FileText aria-hidden="true" className="h-3.5 w-3.5" />
              Case study
              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </Link>
          )}

          {!isPendingLink(project.links.github) && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-300 hover:text-accent"
            >
              <FolderGit2 aria-hidden="true" className="h-3.5 w-3.5" />
              Code
            </a>
          )}

          {!isPendingLink(project.links.live) && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors duration-300 hover:text-accent"
            >
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              Live
            </a>
          )}

          {isPendingLink(project.links.github) &&
            isPendingLink(project.links.live) && (
              <span className="meta text-muted">
                Links pending — add URLs in src/data/projects.ts
              </span>
            )}
        </div>
      </div>

      {/* Kept in the card so the CTA is available on mobile too */}
      {caseStudyHref && (
        <LinkButton
          href={caseStudyHref}
          variant="ghost"
          size="sm"
          className="mx-5 mb-5 justify-between border border-line text-muted group-hover:text-ink"
        >
          Read the case study
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </LinkButton>
      )}
    </article>
  );
}