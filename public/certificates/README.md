# Certificate assets

Drop certificate scans here and reference them from
`src/data/certificates.ts`:

```ts
asset: {
  type: "image",                                  // or "pdf"
  src: "/certificates/my-certificate.jpg",
  alt: "Describe the credential",
}
```

The card and viewer handle both types automatically:

- `type: "image"` — rendered in the preview tile and inside the viewer, where
  zoom controls appear.
- `type: "pdf"` — embedded in the viewer with the browser's PDF viewer, plus an
  "open in new tab" link.

## The four earned credentials

Each file is named after the credential's `id` — the same convention as
`public/issuers/` — so the mapping is obvious:

| File | Credential | Issued |
| --- | --- | --- |
| `aws-certified-cloud-practitioner.png` | AWS Certified Cloud Practitioner | Aug 2026 |
| `aws-restart-graduate.png` | AWS re/Start Graduate | Aug 2026 |
| `aws-educate-cloud-101.png` | AWS Educate Introduction to Cloud 101 – Training Badge | Apr 2026 |
| `ibm-cloud-computing-fundamentals.png` | Cloud Computing Fundamentals (IBM SkillsBuild) | Mar 2026 |

These arrived as `image1.png`–`image4.png` and were renamed to the credential ids
above; nothing else about them changed. Each is the credential's full
**achievement page** as issued — badge, issue date and official skill tags —
landscape and around 1900 px wide. The in-progress Solutions Architect credential
deliberately has **no** file here, because there is nothing to scan until the exam
is passed, so its card keeps the designed pending frame.

## Credential IDs and verify links

All four earned credentials are wired up — the AWS re/Start Graduate, AWS
Certified Cloud Practitioner, AWS Educate Cloud 101 and IBM Cloud Computing
Fundamentals badges:

```ts
credentialId: "8e229790-c3bb-4751-818e-d3f324403014",
verifyUrl: "https://www.credly.com/badges/8e229790-c3bb-4751-818e-d3f324403014/public",
```

Note the **`/badges/<id>/public`** form. Credly also offers
`/earner/earned/badge/<id>`, which is the link the earner's own dashboard shows —
that is not the shareable URL, and the site uses the `/public` one so a
signed-out visitor lands on the badge. (`/public_url` also resolves to the same
page; `/public` is just the form used here.)

A certificate with a `verifyUrl` shows the green **Verifiable** badge on its card
plus a **Verify** link, and a **Verify credential** button in the viewer; one with
a `credentialId` shows the ID (with copy-to-clipboard in the viewer). Both are
optional — omitting them simply hides those elements.

## Fitting, not cropping

Both the card preview and the viewer **fit** the whole scan (`object-contain`).
That is deliberate: the preview tile is 4:3 and these scans are ~16:9, so covering
the tile would crop about a quarter of the width and slice the left edge off the
badge artwork. Landscape scans keep the letterboxing minimal.

A certificate with `asset: null` (or no `asset` at all) shows the designed
"scan pending" preview, which keeps the gallery grid intact while the real
files are being collected.

The two generated placeholders (`certificate-sample.png` and
`certificate-sample.pdf`, produced by `scripts/generate-placeholder-assets.mjs`)
have been **deleted**: all four earned credentials now carry their real scan and
the fifth has none by design, so both card states are exercised by real data. The
`type: "pdf"` branch therefore has no file pointing at it — regenerate the samples
if you want to try it locally:

```bash
node scripts/generate-placeholder-assets.mjs
```