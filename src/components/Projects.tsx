import { ArrowRight } from "lucide-react";
import { featuredProject, otherProjects } from "@/data/projects";
import { FeaturedProjectCard } from "@/components/FeaturedProjectCard";
import { ProjectCard } from "@/components/ProjectCard";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Projects section: one featured editorial panel, then the compact grid.
 * Both halves read from `src/data/projects.ts` — this component contains no
 * project content of its own.
 */
export function Projects() {
  return (
    <section
      id="projects"
      className="relative border-t border-line py-24 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="03"
            label="Projects"
            title="Work, and how it was built."
            description="Selected work across cloud infrastructure and full-stack product development, with written case studies for the featured platforms."
            actions={
              <LinkButton
                href="/projects"
                variant="secondary"
                trailingIcon={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
              >
                All projects
              </LinkButton>
            }
          />
        </Reveal>

        {featuredProject && (
          <Reveal className="mt-14">
            <FeaturedProjectCard project={featuredProject} />
          </Reveal>
        )}

        <div className="mt-16">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-5">
              <h3 className="text-lg font-semibold text-ink">Other projects</h3>
              <span className="meta text-muted">
                {otherProjects.length} more
              </span>
            </div>
          </Reveal>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {otherProjects.map((project, index) => (
              <li key={project.slug}>
                <Reveal delay={(index % 3) * 80} className="h-full">
                  <ProjectCard project={project} index={index} />
                </Reveal>
              </li>
            ))}
          </ul>

          <p className="meta mt-8 text-muted">
            Every project above uses a real screenshot. Per-project links are
            still being collected — PitchPlay has no repository yet, and no
            project has a live URL.
          </p>
        </div>
      </div>
    </section>
  );
}