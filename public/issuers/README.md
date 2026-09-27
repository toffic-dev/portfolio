# Issuer badges

The four earned credentials each have their **official badge** here, named after
the credential's `id` so the mapping is obvious:

| File | Credential | Artwork | `tone` |
| --- | --- | --- | --- |
| `aws-certified-cloud-practitioner.png` | AWS Certified Cloud Practitioner | dark navy hexagon | *(default — white chip)* |
| `aws-restart-graduate.png` | AWS re/Start Graduate | light/white shield | `"on-dark"` |
| `aws-educate-cloud-101.png` | AWS Educate Cloud Computing 101 | light/white shield | `"on-dark"` |
| `ibm-cloud-computing-fundamentals.png` | IBM SkillsBuild Cloud Computing Fundamentals | pale pink tile | `"on-dark"` |

The in-progress credential has **no badge on purpose** — the badge arrives only
once the exam is passed, and the site does not show artwork it has not earned.

## These are badges, not scans

Worth stating because the two get confused: these are **square 600×600 credential
badges**, not certificate scans. They belong in the square issuer-mark slot
(`issuerLogo`), and the scans live in `public/certificates/`. A square badge is
the wrong shape and content for `asset`: that slot shows the credential as it was
issued, and the preview fits the whole file rather than cropping it.

## Adding or replacing one

Drop the file here and reference it from the certificate in
`src/data/certificates.ts`:

```ts
issuerLogo: {
  src: "/issuers/aws.png",
  alt: "Amazon Web Services badge",
  // tone: "on-dark",   // only if the artwork is light-coloured
}
```

- **PNG or SVG**, square, **256×256 or larger** (SVG stays sharp at any size).
- Transparent or white background both work.

## The `tone` option

Brand badges are drawn for one specific background, so the chip behind the mark
**does not follow dark/light mode** — that keeps a coloured badge legible in
either theme.

| Badge artwork | Set | Chip behind it |
| --- | --- | --- |
| Dark / coloured (the usual case) | *(nothing — this is the default)* | white |
| White or light-coloured | `tone: "on-dark"` | near-black |

## Notes

- The mark is decorative in the UI (the issuer name is always shown beside it,
  so `alt` is not announced twice) — it still appears as a hover tooltip.
- A certificate with no `issuerLogo` simply shows its issuer text; nothing breaks.

`issuer-sample.png` is a generated generic seal. **No credential references it any
more** — it is kept only as a format reference, and is safe to delete along with
its entry in `scripts/generate-placeholder-assets.mjs`.