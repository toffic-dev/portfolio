import { Star } from "lucide-react";
import { githubProfileUrl, githubTopics, repositories } from "@/data/github";
import { site } from "@/data/site";
import { GitHubMark } from "@/components/ui/BrandIcon";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagList } from "@/components/ui/Tag";

/**
 * GitHub / open-source section.
 *
 * A snapshot of the public profile in `src/data/github.ts` — no API call, no
 * call, no token, nothing to rate-limit. The repository cards are shaped so the
 * same component can render live API data later without a rewrite.
 */
export function GitHub() {
  return (
    <section
      id="github"
      className="relative border-t border-line py-24 sm:py-28 lg:py-32"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            index="04.5"
            label="GitHub / Open source"
            title={site.github.heading}
            description={site.github.blurb}
            actions={
              <LinkButton
                href={githubProfileUrl}
                variant="secondary"
                leadingIcon={<GitHubMark className="h-4 w-4" />}
              >
                GitHub profile
              </LinkButton>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Profile stats ----------------------------------------------- */}
          <Reveal>
            <div className="card p-6 sm:p-7">
              <span className="meta text-muted">Profile</span>

              <dl className="mt-6 grid grid-cols-2 gap-4">
                {site.github.stats.map((stat) => (
                  <div key={stat.label}>
                    <dd className="font-mono text-xl text-ink">{stat.value}</dd>
                    <dt className="meta mt-2 text-muted">{stat.label}</dt>
                  </div>
                ))}
              </dl>

              <div className="mt-7 border-t border-line pt-6">
                <span className="meta text-muted">GitHub languages</span>
                <TagList items={githubTopics} className="mt-3" />
              </div>

              <p className="meta mt-7 border-t border-line pt-5 text-muted">
                Snapshot of the public profile, kept as static data.
              </p>
            </div>
          </Reveal>

          {/* Repositories -------------------------------------------------- */}
          <Reveal delay={80}>
            <ul className="space-y-3">
              {repositories.map((repository) => (
                <li key={repository.name}>
                  <article className="card card-lift group p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="meta-sm font-medium text-ink">
                        <a
                          href={repository.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors duration-300 hover:text-accent"
                        >
                          {repository.name}
                        </a>
                      </h3>
                      {repository.stars && (
                        <span className="meta flex shrink-0 items-center gap-1.5 text-muted">
                          <Star aria-hidden="true" className="h-3.5 w-3.5" />
                          {repository.stars}
                        </span>
                      )}
                    </div>

                    {repository.description && (
                      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                        {repository.description}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="meta flex items-center gap-2 text-muted">
                        <span
                          aria-hidden="true"
                          className="h-2 w-2 rounded-full bg-accent"
                        />
                        {repository.language}
                      </span>
                      {repository.topics && repository.topics.length > 0 && (
                        <TagList items={repository.topics} />
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}