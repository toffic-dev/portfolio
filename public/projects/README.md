# Project assets

Screenshots for all three projects live here. Each file is referenced at most
twice: as the project `cover` in `src/data/projects.ts`, and — where the project
has a case study — in that case study's `screenshots` array with a caption.

| File | Project | Source size | Ratio | Fit |
| --- | --- | --- | --- | --- |
| `pitchplay-gh-landing.png` | PitchPlay GH | 1918×935 | 2.05:1 | `contain` |
| `compliance-document-review-landing.png` | Compliance Document Review App | 1904×1069 | 1.78:1 | `cover` (default) |
| `pharmadesk-dashboard.png` | PharmaDesk | 1918×1075 | 1.78:1 | `cover` (default) |

```ts
cover: {
  src: "/projects/my-project-dashboard.png",
  alt: "Describe what the screenshot shows",
}
```

Rules of thumb:

- **Name by slug** — `<project-slug>-<view>.png`, lowercase, so the file is
  findable from the case-study URL (`/projects/<slug>`).
- **Alt text is required** for every screenshot (accessibility). Describe what is
  on screen, not that it is a screenshot.
- **Framing** — covers render in a **16:9** frame on the grid cards and a **16:10**
  frame on the featured panel and in the case-study gallery, with `object-cover`
  by default. A 16:9 source is effectively uncropped on a card; in the narrower
  16:10 frames it loses roughly 5% from each side.
- **`fit: "contain"`** — set it on the asset itself when the capture is much wider
  than the frame and a crop would cut through the UI rather than through empty
  page margin. PitchPlay's 2.05:1 landing page loses ~211 px (11%) per side under
  `cover`, which takes the wordmark off the left edge and halves the "Get Started"
  button on the right, so it letterboxes instead. Re-capture that page at 16:10
  and it can go back to `cover`.
- **Case-study screenshots** go in `caseStudy.screenshots`, each with a `caption`;
  the gallery renders them in a two-column grid on desktop.
- **One file can do both jobs.** Both landed pages are used as cover and as their
  case study's single gallery entry, with the caption describing what to look at.

Any project whose `cover` is `null` renders the designed "screenshot pending"
frame instead, so the layout stays complete while assets are missing.

`project-sample.png` was deleted once these three arrived. Regenerate the
placeholder artwork with `node scripts/generate-placeholder-assets.mjs` if you
ever need a blank file to exercise an image path.