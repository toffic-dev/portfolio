import { site } from "@/data/site";
import type { SocialLink } from "@/types";

/**
 * Contact destinations. GitHub and LinkedIn are real; the email entry is
 * derived from `site.email` so the address has a single source of truth.
 */
export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/toffic-dev",
    handle: "toffic-dev",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/toffic-mohammed-305985256",
    handle: "toffic-mohammed",
  },
  {
    id: "email",
    label: "Email",
    /* `mailto:` opens the visitor's mail client in the current tab. */
    href: `mailto:${site.email}`,
    handle: site.email,
  },
];

export function getSocialLink(id: SocialLink["id"]): SocialLink {
  const link = socialLinks.find((item) => item.id === id);
  if (!link) throw new Error(`Unknown social link: ${id}`);
  return link;
}