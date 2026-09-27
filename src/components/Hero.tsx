import { ArrowRight, Download, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { techRail } from "@/data/skills";
import { LinkButton } from "@/components/ui/Button";
import { SocialIcons } from "@/components/ui/SocialLinks";
import { StatusPill } from "@/components/ui/StatusDot";
import { TerminalPanel } from "@/components/TerminalPanel";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";

/**
 * Hero — the first five seconds of the site.
 *
 * Left: identity (who, what, stack) and the two actions that matter.
 * Right: the terminal panel, which proves the "developer" claim faster than any
 * sentence can, with the "currently building" card floating beneath it.
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-16 sm:pt-36 lg:pt-40 lg:pb-20"
    >
      {/* Background: technical grid, faded radially, over two soft light sources */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-lines grid-fade absolute inset-0 opacity-80" />
        <div className="animate-drift radial-glow absolute -top-56 -left-24 h-[560px] w-[560px] rounded-full" />
        <div className="radial-glow absolute top-1/3 -right-24 h-[440px] w-[440px] rounded-full opacity-70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
      </div>

      <div className="shell grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
        {/* Identity ------------------------------------------------------- */}
        <div>
          <StatusPill
            label={site.availability.label}
            tone="ok"
            pulse
            className="bg-surface/80"
          />

          <h1 className="mt-7 text-[clamp(2.6rem,8.5vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-ink uppercase">
            {site.name}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-lg font-medium text-ink-soft">
              {site.role}
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-line-strong" />
            <span className="meta text-muted">
              {site.disciplines.join(" · ")}
            </span>
          </div>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {site.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <LinkButton
              href="/#projects"
              size="lg"
              trailingIcon={
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                />
              }
            >
              View my work
            </LinkButton>
            <LinkButton href="/#contact" variant="secondary" size="lg">
              Let&apos;s connect
            </LinkButton>
            <LinkButton
              href={site.resume.downloadPath}
              variant="ghost"
              size="lg"
              download={site.resume.fileName}
              leadingIcon={<Download aria-hidden="true" className="h-4 w-4" />}
            >
              Download resume
            </LinkButton>
          </div>

          <SocialIcons className="mt-9" />

          <dl className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6">
            <div className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5 text-muted" />
              <dt className="sr-only">Location</dt>
              <dd className="meta text-ink-soft">{site.location}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="meta text-muted">Focus</dt>
              <dd className="meta text-ink-soft">
                {site.disciplines.join(" · ")}
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="meta text-muted">Status</dt>
              <dd className="meta text-ink-soft">{site.availability.detail}</dd>
            </div>
          </dl>
        </div>

        {/* Terminal + status -------------------------------------------- */}
        <div className="relative">
          <TerminalPanel />
          <CurrentlyBuilding className="mt-4 lg:-mt-6 lg:ml-12" />
        </div>
      </div>

      {/* Technology rail ------------------------------------------------- */}
      <div className="mt-16 border-y border-line py-4 sm:mt-20">
        <div className="shell flex items-center gap-6">
          <span className="meta shrink-0 text-muted">Stack</span>
          <div className="marquee-mask relative overflow-hidden">
            <ul className="marquee items-center gap-8">
              {[...techRail, ...techRail].map((tech, index) => (
                <li
                  key={`${tech}-${index}`}
                  aria-hidden={index >= techRail.length}
                  className="meta-sm shrink-0 text-ink-soft"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}