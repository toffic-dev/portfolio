import { ArrowUpRight, Mail } from "lucide-react";
import { socialLinks } from "@/data/social";
import { GitHubMark, LinkedInMark } from "@/components/ui/BrandIcon";
import { cn, isPendingLink } from "@/lib/utils";
import type { SocialId, SocialLink } from "@/types";

function IconFor({ id, className }: { id: SocialId; className?: string }) {
  if (id === "github") return <GitHubMark className={className} />;
  if (id === "linkedin") return <LinkedInMark className={className} />;
  return <Mail className={className} aria-hidden="true" />;
}

function pendingTitle(link: SocialLink) {
  return `${link.label} — placeholder link, URL not supplied yet`;
}

/** Compact icon row: hero, navbar and footer. */
export function SocialIcons({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const box = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const glyph = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]";

  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socialLinks.map((link) => (
        <li key={link.id}>
          {isPendingLink(link.href) ? (
            <span
              role="link"
              aria-disabled="true"
              title={pendingTitle(link)}
              className={cn(
                "grid place-items-center rounded-lg border border-line text-muted",
                box
              )}
            >
              <IconFor id={link.id} className={glyph} />
              <span className="sr-only">{link.label} (placeholder link)</span>
            </span>
          ) : (
            <a
              href={link.href}
              target={link.id === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
              title={`${link.label} — ${link.handle}`}
              className={cn(
                "grid place-items-center rounded-lg border border-line text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent",
                box
              )}
            >
              <IconFor id={link.id} className={glyph} />
              <span className="sr-only">{link.label}</span>
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}

/** Full-width rows with the handle visible: contact section and footer. */
export function SocialList({ className }: { className?: string }) {
  return (
    <ul className={cn("divide-y divide-line border-y border-line", className)}>
      {socialLinks.map((link) => {
        const pending = isPendingLink(link.href);
        const content = (
          <>
            <span className="flex items-center gap-3">
              <IconFor id={link.id} className="h-4 w-4 text-muted" />
              <span className="meta text-ink-soft">{link.label}</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="meta-sm text-muted">{link.handle}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="h-3.5 w-3.5 text-muted transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
              />
            </span>
          </>
        );

        return (
          <li key={link.id}>
            {pending ? (
              <span
                role="link"
                aria-disabled="true"
                title={pendingTitle(link)}
                className="group/link flex items-center justify-between gap-4 py-4 opacity-80"
              >
                {content}
              </span>
            ) : (
              <a
                href={link.href}
                target={link.id === "email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group/link flex items-center justify-between gap-4 py-4 transition-colors duration-300 hover:text-accent"
              >
                {content}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}