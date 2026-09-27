# Portfolio

A complete, production-ready **developer portfolio framework** built with
Next.js (App Router), TypeScript, Tailwind CSS v4 and React 19.

Every section, interaction and layout is finished. **Identity, contact details,
projects and their detail (with real screenshots), experience and dates,
credentials (with their official badges and scans), the portrait, skills and
GitHub figures are all real.** What remains is one asset file (the résumé PDF)
plus a few written passages, all still clearly marked with bracketed
placeholders.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerendered)
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
```

Deploy to Vercel: import the repository, then set **`NEXT_PUBLIC_SITE_URL`**
(e.g. `https://your-domain.com`) so metadata, `robots.txt` and `sitemap.xml`
use the real domain.

**Testing on a phone or another machine?** `next dev` also serves on this
machine's LAN address and prints it (`Network: http://192.168.100.4:3000`). Next
blocks cross-origin requests to its dev assets by default, so that hostname has to
be listed in `allowedDevOrigins` in `next.config.ts` — it is. If the dev-server
warning about a blocked cross-origin request comes back, the LAN address has
probably changed (DHCP): update that entry, or use a wildcard such as
`"192.168.100.*"`. This is development-only — `next build` ignores it, so
production is unaffected.

> **Populating the site?** `CONTENT_TODO.md` lists every piece of content still
> needed, field by field. Delete it once the site is filled in.

---

## Where the content lives

Nothing personal is hard-coded in a component. Every fact the site shows comes
from one of these files:

| File | Controls |
| --- | --- |
| `src/data/site.ts` | Name, roles, tagline, availability, location, email, resume paths, SEO copy, stats, "currently building" |
| `src/data/social.ts` | GitHub / LinkedIn / email links and handles |
| `src/data/nav.ts` | Navigation items and section numbers |
| `src/data/skills.ts` | Skill categories, technologies and where each is used |
| `src/data/focus.ts` | The three "What I build" cards |
| `src/data/projects.ts` | Featured project, other projects, full case studies |
| `src/data/experience.ts` | Timeline entries |
| `src/data/certificates.ts` | Credentials, categories, filters and issuer badges |
| `src/data/github.ts` | GitHub stats and repository cards (static, no API yet) |
| `src/data/lab.ts` | Experiments |
| `src/data/terminal.ts` | The hero terminal script |

### Placeholder convention

Anything wrapped in square brackets (`[YOUR NAME]`, `[ISSUED DATE]`, `[XX]`) is
a placeholder. `isPlaceholder()` in `src/lib/utils.ts` detects the pattern, and
links that still point at `"#"` render as clearly-marked placeholders rather
than broken links — so the site never looks finished while it is not.

---

## Adding real content

### Personal details

Edit `src/data/site.ts` — name, roles, tagline, email, location, stats, SEO
title/description. Hero, navbar, footer and metadata all update together.

### Social links

In `src/data/social.ts`, replace `href: "#"` with real URLs. Links flip from
"placeholder" styling to real links automatically.

### Resume

Drop the PDF into `public/resume/`, keeping the name `resume.pdf` (or update the
paths in `src/data/site.ts`).

### Projects

Append an object to `projects` in `src/data/projects.ts`:

```ts
{
  slug: "my-project",
  name: "My Project",
  tagline: "One-line positioning",
  summary: "What it does and who it is for.",
  year: "2026",
  state: "shipped", // or "in-progress" | "completed" | "placeholder"
  role: "Full-stack developer",
  cover: { src: "/projects/my-project.png", alt: "Dashboard screenshot" },
  technologies: ["Next.js", "FastAPI", "PostgreSQL"],
  features: ["Feature one", "Feature two"],
  links: { live: "https://…", github: "https://github.com/…" },
  // caseStudy is optional — omit it and the card loses its case-study link
}
```

The project then appears on the home page, on `/projects`, in the sitemap and —
if it has a `caseStudy` — at `/projects/<slug>`.

Screenshot assets are cropped to their frame by default. A capture much wider
than the **16:10** featured frame can opt out with `fit: "contain"` on the asset,
which letterboxes it instead of trimming through the interface — the rules and the
reasoning are in `public/projects/README.md`.

`completed` and `shipped` are deliberately separate states — a finished build
that was never released is *completed*, not *shipped*, so the badge never claims
a release that did not happen. Omitting `state` renders no badge at all.

### Certificates

Each entry carries two required fields that keep the section honest:

```ts
tier: "professional"   // an exam-based certification
tier: "additional"     // a training programme or completion badge
status: "in-progress"  // optional; NOT an earned credential
```

`tier` is required so every credential is classified deliberately, and the card
shows a `Certification` / `Credential` chip from it. Counts everywhere on the
site read from `earnedCertificates` (which excludes `status: "in-progress"`), so
a credential you are still working towards can be listed for transparency —
in its own "Working towards" block, never in the gallery grid — without ever
inflating the headline number.

The four earned credentials ship with their scan in `public/certificates/`, named
after each credential's `id` (same convention as the badges) and wired up through
the `asset` field:

```ts
asset: { type: "image", src: "/certificates/aws.png", alt: "AWS certificate" }
// type: "pdf" embeds the file in the viewer instead of zooming an image
```

Scans are **fitted whole** (`object-contain`) in both the 4:3 card preview and the
viewer, so a wide achievement page is never cropped. Optional fields (`expires`,
`credentialId`, `verifyUrl`, `skills`) render only when present.

**Issuer badges.** The four earned credentials ship with their official badges in
`public/issuers/`, named after each credential's `id`. To replace one:

```ts
issuerLogo: {
  src: "/issuers/aws.png",
  alt: "Amazon Web Services badge",
  // tone: "on-dark",  // only if the artwork is light-coloured
}
```

Two things to know: these are **credential badges (square), not certificate
scans** — they belong in the square mark slot, while `asset` carries the credential
page or document itself from `public/certificates/`. And the chip behind a badge
deliberately **does not follow dark/light mode** (see `--badge-on-light` /
`--badge-on-dark`): brand marks are drawn for one specific background, so a
constant chip keeps them legible in both themes. Three of the four shipped badges
are light artwork and therefore use `tone: "on-dark"`. A certificate without a
badge simply shows its issuer name.

### Placeholder artwork

No sample artwork ships in the repository. The three files the generator below can
produce — `public/projects/project-sample.png` and the two
`public/certificates/certificate-sample.*` — were **deleted** once the real scans
and screenshots arrived, so the pending frame now belongs to the one credential
that has nothing to scan yet. Regenerate them if you need them again:

```bash
node scripts/generate-placeholder-assets.mjs
```

### Social share card

`src/app/opengraph-image.tsx` renders the 1200×630 link-preview card with Next's
built-in `next/og`, at build time. It is a route rather than a static PNG because
the card needs real type — the placeholder generator above has no font support —
and because it reads from `src/data/site.ts`, so editing the name, role or
tagline updates the card with no regeneration step.

Because the file convention injects the tags itself, `layout.tsx` deliberately
declares **no** `openGraph.images` or `twitter.images`; doing both emits each tag
twice. To restyle the card, edit that file — no `ogImage` path to keep in sync.

---

## Structure

```text
src/
├── app/
│   ├── layout.tsx              root layout (fonts, metadata, theme bootstrap, navbar, footer)
│   ├── page.tsx                the single-page portfolio
│   ├── globals.css             the whole design system
│   ├── icon.svg                favicon
│   ├── robots.ts, sitemap.ts   SEO routes
│   ├── not-found.tsx           404
│   └── projects/
│       ├── page.tsx            all projects
│       └── [slug]/page.tsx     case-study route (static params + metadata)
├── components/
│   ├── Navbar.tsx, Hero.tsx, TerminalPanel.tsx, About.tsx, CurrentlyBuilding.tsx
│   ├── WhatIBuild.tsx, Skills.tsx, Projects.tsx, FeaturedProjectCard.tsx, ProjectCard.tsx
│   ├── ProjectCaseStudy.tsx, ArchitectureDiagram.tsx, Lab.tsx, Experience.tsx
│   ├── GitHub.tsx, Certificates.tsx, CertificateCard.tsx, CertificateViewer.tsx
│   ├── Resume.tsx, Contact.tsx, Footer.tsx
│   └── ui/                     Button, Badge, Tag, StatusDot, SectionHeading,
│                               MediaFrame, Reveal, SocialLinks, BrandIcon, ThemeToggle
├── data/                       all content (see table above)
├── hooks/                      useActiveSection, useOverlay
├── lib/                        utils, project lookups, SEO origin
├── providers/ThemeProvider.tsx theme state + persistence
└── types/index.ts              shared data types
```

---

## Design system

Defined once in `src/app/globals.css`:

- **Tokens** — semantic colours (`canvas`, `surface`, `elevated`, `line`, `ink`,
  `ink-soft`, `muted`, `accent`, `accent-2`, `ok`, `warn`), radii, shadows and
  easing, exposed to Tailwind through `@theme inline`.
- **Themes** — light is the default; `.dark` / `[data-theme="dark"]` on `<html>`
  swaps every raw value. The choice is stored in `localStorage` and applied by an
  inline script before first paint, so there is no flash.
- **Components** — `.card`, `.glass`, `.tag`, `.meta`, `.media-frame`,
  `.grid-lines`, `.diagram-node`, `.marquee`, `.reveal`, `.terminal-*` and
  friends.
- **Typography** — Geist Sans for reading, Geist Mono for every piece of
  technical metadata (labels, section numbers, statuses, technology chips,
  terminal output).
- **Motion** — a small set of purpose-built animations (scroll reveal, terminal
  typing, status pulse, architecture flow, hover lifts). All of them stop under
  `prefers-reduced-motion`.

## Mobile

The layout is single-column below `sm` (640px) and only splits into grids from
`lg` (1024px), so a phone gets the full-width reading order rather than a squeezed
desktop. Beyond the breakpoints, four things are mobile-specific and deliberate:

- **Form controls are 16px on phones** (`text-base sm:text-sm`). iOS Safari zooms
  the entire page in when a field smaller than 16px takes focus, and the page then
  stays zoomed and scrolling sideways after the keyboard closes.
- **Hover-only UI is gated with `pointer-coarse` / `pointer-fine`.** Tailwind v4
  wraps `hover:` and `group-hover:` in `@media (hover: hover)`, so on a touch
  device those styles never apply — the "View credential" chip on a certificate
  card would simply never appear, leaving the preview looking inert. It is shown
  outright for `pointer-coarse`, and the certificate viewer advertises a swipe
  (`Swipe to change credential`) where a keyboard hint would list keys the device
  does not have.
- **Overlays measure the visible viewport** (`h-[100dvh]` on the mobile menu and
  the certificate viewer). `inset-0` alone resolves against the *layout* viewport,
  which puts the bottom row of a full-screen panel behind the browser toolbar.
  `dvh` degrades safely: if it is unsupported the declaration is dropped and
  `inset-0` still sizes the element.
- **Touch targets clear 24px.** Text-only controls (the certificate card's "View
  credential" / "Verify", the category filters) carry a minimum height, since
  `.meta` is an 11px label with no padding of its own.

Two related behaviours worth knowing:

- The **certificate viewer supports horizontal swipe** to move between
  credentials, and only while the scan is at 100% — zoomed in, the same drag pans
  the enlarged image, which is what the gesture should mean. No `preventDefault`
  is called, so normal scrolling is untouched.
- The **long credential IDs break** (`break-all`) rather than being clipped: a
  UUID is one 36-character token with no space to wrap at, which is wider than a
  certificate card on a 320px screen.

Card previews use `object-contain`, not `object-cover` — see the certificates
section above for why a 16:9 achievement page must not be cropped into a 4:3 tile.

## Accessibility

Semantic landmarks, a skip link, visible focus rings, `aria-current` on the
active nav item, keyboard-trapped mobile menu and certificate viewer (Escape
closes, arrows change credential, `+`/`−` zoom), labelled form fields with
`aria-invalid` + `aria-describedby`, alt text on every image, and `aria-hidden`
on decorative layers.

**The skills tab set renders every panel and hides the inactive ones** rather
than mounting only the active category. That matters for two reasons: the whole
technology list is always in the document (a click only changes which panel is
visible), and each tab's `aria-controls` resolves to a real element. `hidden` is
`display: none`, so inactive panels are out of the accessibility tree and the tab
order. If you ever switch to stacking the categories instead, the panels are
already there — drop the `hidden` and the tablist together.

The mobile menu trigger uses `aria-haspopup="dialog"`, not
`aria-expanded`/`aria-controls`: the dialog is only rendered once opened, so
`aria-controls` could never resolve, and `aria-expanded` was never perceivable as
"true" because the dialog covers the button that owns it.

## Performance

Almost everything is a **server component**. The only client components are the
navbar, theme provider/toggle, skills tabs, certificates gallery, contact form
and the reveal observer. The hero terminal is pure CSS animation — no JS. Fonts
load through `next/font`, images through `next/image`, and every route is
statically prerendered.

## What is intentionally not finished

- No personal details, employers, dates, certificate issuers, project URLs or
  social URLs have been invented — placeholders are bracketed.
- The contact form validates and shows its success state, but is not wired to an
  email service.
- The GitHub section uses static data; the GitHub API is not connected.