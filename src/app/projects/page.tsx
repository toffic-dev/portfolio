import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Every project in the portfolio, including the case studies that break down architecture, engineering challenges and results.",
};

/**
 * Projects index. Rendered from the same array as the home page, so a new
 * project appears in both places at once.
 */
export default function ProjectsIndexPage() {
  return (
    <div className="pt-32 pb-24 sm:pt-36 lg:pb-28">
      <div className="shell">
        <SectionHeading
          index="03"
          label="Projects"
          title="Everything, in one place."
          description="Selected work. Each project links to a case study where one is available."
          actions={
            <LinkButton
              href="/#projects"
              variant="secondary"
              leadingIcon={<ArrowLeft aria-hidden="true" className="h-4 w-4" />}
            >
              Back to home
            </LinkButton>
          }
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Reveal delay={(index % 3) * 70} className="h-full">
                <ProjectCard project={project} index={index} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}