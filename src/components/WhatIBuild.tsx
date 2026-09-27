import { ArrowUpRight, Code2, Container, Sparkles } from "lucide-react";
import { buildCards, type BuildCard } from "@/data/focus";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

const ICONS: Record<BuildCard["icon"], typeof Code2> = {
  code: Code2,
  cloud: Container,
  ai: Sparkles,
};

/**
 * Three capability cards. Border-only surfaces with a hairline that fills with
 * the accent on hover — the same "technical" language as the rest of the site,
 * without a wall of identical boxes.
 */
export function WhatIBuild() {
  return (
    <section
      id="what-i-build"
      className="relative border-t border-line py-24 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="01.5"
            label="What I build"
            title="Three areas, one system."
            description="Three areas this portfolio is built around. Each card maps to the projects and skills below."
            size="md"
          />
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {buildCards.map((card, position) => {
            const Icon = ICONS[card.icon];
            return (
              <li key={card.id}>
                <Reveal delay={position * 90}>
                  <article className="card card-lift group relative h-full overflow-hidden p-6">
                    {/* Hairline that fills on hover */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-soft group-hover:scale-x-100"
                    />

                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-[color-mix(in_oklab,var(--ink)_4%,transparent)] text-accent transition-colors duration-300 group-hover:border-accent/40">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <span className="meta text-muted">{card.index}</span>
                    </div>

                    <h3 className="mt-6 text-lg font-semibold text-ink">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {card.description}
                    </p>

                    <TagList
                      items={card.technologies}
                      className="mt-6 border-t border-line pt-5"
                    />

                    <ArrowUpRight
                      aria-hidden="true"
                      className="absolute right-6 bottom-6 h-4 w-4 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}