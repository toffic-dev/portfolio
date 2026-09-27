import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import { navItems } from "@/data/nav";
import { site } from "@/data/site";
import { GitHubMark, LinkedInMark } from "@/components/ui/BrandIcon";
import { getSocialLink } from "@/data/social";
import { isPendingLink } from "@/lib/utils";

/**
 * Footer: identity, navigation, the three direct channels and the build note.
 * Everything reads from `src/data`, so it stays in step with the rest of the
 * site automatically.
 */
export function Footer() {
  const email = getSocialLink("email");
  const github = getSocialLink("github");
  const linkedin = getSocialLink("linkedin");
  const year = new Date().getFullYear();

  const channels = [
    { link: email, icon: <Mail aria-hidden="true" className="h-4 w-4" /> },
    {
      link: github,
      icon: <GitHubMark className="h-4 w-4" />,
    },
    {
      link: linkedin,
      icon: <LinkedInMark className="h-4 w-4" />,
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0 opacity-40" />
      </div>

      <div className="shell relative py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          {/* Identity ---------------------------------------------------- */}
          <div>
            <p className="text-lg font-semibold tracking-[-0.02em] text-ink">
              {site.name}
            </p>
            <p className="meta mt-3 text-muted">
              {site.roleLine} • {site.disciplines.join(" • ")}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft">
              {site.footer.note}
            </p>

            <Link
              href="/#home"
              className="meta mt-8 inline-flex items-center gap-2 text-muted transition-colors duration-300 hover:text-accent"
            >
              <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
              Back to top
            </Link>
          </div>

          {/* Navigation -------------------------------------------------- */}
          <nav aria-label="Footer navigation">
            <p className="meta text-muted">Navigation</p>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    className="meta-sm text-ink-soft transition-colors duration-300 hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/projects"
                  className="meta-sm text-ink-soft transition-colors duration-300 hover:text-accent"
                >
                  All projects
                </Link>
              </li>
            </ul>
          </nav>

          {/* Channels ---------------------------------------------------- */}
          <div>
            <p className="meta text-muted">Elsewhere</p>
            <ul className="mt-5 space-y-3">
              {channels.map(({ link, icon }) => (
                <li key={link.id}>
                  {isPendingLink(link.href) ? (
                    <span
                      role="link"
                      aria-disabled="true"
                      title={`${link.label} — placeholder link`}
                      className="meta-sm flex items-center gap-2.5 text-muted"
                    >
                      {icon}
                      {link.label}
                    </span>
                  ) : (
                    <a
                      href={link.href}
                      target={link.id === "email" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="meta-sm flex items-center gap-2.5 text-ink-soft transition-colors duration-300 hover:text-accent"
                    >
                      {icon}
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Baseline ------------------------------------------------------ */}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="meta text-muted">
            © {year > Number(site.footer.copyrightFrom) ? year : site.footer.copyrightFrom}{" "}
            {site.name}
          </p>
          <p className="meta text-muted">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}