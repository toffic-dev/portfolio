import { site } from "@/data/site";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isPlaceholder } from "@/lib/utils";

/**
 * About — portrait frame on the left, written introduction and statistics on the
 * right.
 *
 * The statistics row states verified figures and keeps anything unconfirmed as
 * `[XX]`, so no number is ever guessed, and the footnote is driven by
 * `isPlaceholder()` rather than hardcoded — it cannot outlive the values it
 * describes.
 */
export function About() {
  const hasUnconfirmedStats = site.stats.some((stat) =>
    isPlaceholder(stat.value)
  );

  return (
    <section
      id="about"
      className="relative border-t border-line py-24 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="01"
            label="About"
            title="Building systems end to end."
            description={site.about.lead}
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Profile ------------------------------------------------------ */}
          <Reveal>
            <figure className="group">
              <MediaFrame
                src={site.about.image.src}
                alt={site.about.image.alt}
                aspect="portrait"
                sizes="(min-width: 1024px) 32vw, 100vw"
              />
              <figcaption className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-4">
                <span className="meta text-ink-soft">{site.name}</span>
                <span className="meta text-muted">{site.roleLine}</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Introduction + statistics ------------------------------------ */}
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-ink sm:text-xl">
                {site.about.body[0]}
              </p>
            </Reveal>

            {site.about.body.slice(1).map((paragraph, index) => (
              <Reveal key={paragraph} delay={80 + index * 60}>
                <p className="mt-6 leading-relaxed text-ink-soft">{paragraph}</p>
              </Reveal>
            ))}

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {site.stats.map((stat, position) => (
                <Reveal key={stat.label} delay={position * 70}>
                  <div className="border-t border-line pt-4">
                    <dd className="font-mono text-2xl text-ink">{stat.value}</dd>
                    <dt className="meta mt-2.5 block text-muted">{stat.label}</dt>
                  </div>
                </Reveal>
              ))}
            </dl>

            {hasUnconfirmedStats && (
              <p className="meta mt-8 text-muted">
                Values shown as [XX] are still being confirmed — no figure is
                claimed until it is verified.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}