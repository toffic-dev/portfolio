# Content to supply

Fill in the blanks and send it back — chat is fine, bullets and rough notes
work. I'll put it straight into `src/data/` and re-run `lint`, `typecheck` and
`build` afterwards.

**Anything you leave blank stays visibly marked as pending** — it never gets
invented. Delete this file once the site is populated.

---

## 1. Identity — ✅ DONE

Applied to `src/data/site.ts`, `src/data/social.ts` and `src/data/terminal.ts`.
The hero, navbar, footer, contact section, résumé section, favicon and all page
metadata now use the real details. **Two normalizations were needed — tell me if
you'd rather have the originals.**

```text
name           Toffic Mohammed                          ✅
role           Cloud & DevOps Engineer / Full-Stack Developer
                 → used in the hero and terminal (there is room for the full line)
roleLine       Cloud & DevOps · Full-Stack
                 → used in the navbar, footer and About caption, where the
                   full string is too wide for the layout
disciplines    Cloud Infrastructure · DevOps · Full-Stack · AI
                 → trimmed from "Cloud Infrastructure, DevOps, Full-Stack Web
                   Development, AI Integration": the hero renders these in
                   uppercase monospace with wide letter-spacing, so the long
                   phrases wrapped onto extra lines
tagline        Building scalable infrastructure and full-stack products   ✅
availability   label "Open to Work" · detail "Open to opportunities"      ✅
location       Kumasi, Ghana                                             ✅
email          mtoffic8@gmail.com                                        ✅

github         https://github.com/toffic-dev
                 → trailing slash dropped; both forms work, this is tidier
linkedin       https://www.linkedin.com/in/toffic-mohammed-305985256
                 → https:// added (the bare "linkedin.com/…" would have been
                   treated as a relative path and broken)
email link     mailto:mtoffic8@gmail.com (opens in the current tab)
```

Also updated to match: the SEO title/description/keywords, the terminal chrome
(`toffic@dev — zsh`) and its `stack` line, and the favicon (now a **TM**
monogram instead of the generic `</>` mark).

**Inherited from the real data, no action needed:** the navbar avatar shows
**TM**, and the hero's "Focus" row now reads from `disciplines` instead of a
hardcoded string that would have contradicted it.

<details>
<summary>Original submission</summary>

```text
Name: Toffic Mohammed
Role: Cloud & DevOps Engineer / Full-Stack Developer
Disciplines: Cloud Infrastructure, DevOps, Full-Stack Web Development, AI Integration
Tagline: Building scalable infrastructure and full-stack products
Availability: "Open to Work", "Open to Opportunities"
Location: Kumasi, Ghana
Email: mtoffic8@gmail.com
LinkedIn: linkedin.com/in/toffic-mohammed-305985256
GitHub: https://github.com/toffic-dev/
```
</details>

## 2. Numbers — ✅ DONE

```text
# src/data/site.ts  →  stats[]
Projects Built        3     ✅ PitchPlay GH · Compliance Document Review App · PharmaDesk
Credentials           4     ✅ stat label renamed from "Certifications" — 1 real
                              certification + 3 additional credentials (§6).
                              Value is derived from earnedCertificates.length
Technologies          46    ✅ derived from §7 — de-duplicated unique count
Years Learning         4    ✅ supplied
                              (value + label derived, so both stay consistent)

# src/data/site.ts  →  github.stats[]
Repositories          4     ✅ read from the public profile
Contributions          8    ✅ supplied — hand-maintained, since the REST API does
                              not expose the contribution graph
```

**No `[XX]` remains anywhere in the built site**, so the About footnote ("Values
shown as `[XX]` are still being confirmed") removed itself automatically. That is
the designed behaviour: the note is driven by `isPlaceholder()`, not hardcoded.

### Your correction was right, and it mattered

The list held four credentials while the summary line said three. That is exactly
the `certifications`/certificate-count mismatch flagged earlier: the page would
have shown "Certifications 4" beside four cards while you described three. Both
now read **4**.

### Read from your GitHub profile

You said these needed the profile, so I read it rather than leaving them blank:

| | |
| --- | --- |
| Public repositories | **4** — all `compliance-document-review-*` |
| Account created | 2026-08-31 |
| Followers / following | 0 / 0 |
| Languages reported | TypeScript, Python, Shell |

That also replaced the three invented repo cards with the four real ones, each
linking to its actual repository, with descriptions taken from the repos' own
READMEs.

**Contributions: 8.** Supplied and in place. Worth knowing it is the one figure
here that will drift: the REST API does not expose the contribution graph, so
this number is hand-maintained and will need revisiting as your activity grows.

### ⚠️ One thing worth doing yourself

**Your GitHub profile itself is empty.** `name`, `bio`, `location` and `blog` are
all unset. The portfolio sends people there, so ten minutes filling them in is
worthwhile — the site cannot do it for you.

The compliance project's `role` used to sit here as `[YOUR ROLE]`; that is
resolved (PitchPlay = Founder, PharmaDesk = Developer) and the compliance track
is recorded as **Frontend + DevOps**, which matches the repositories.

## 3. Written copy — ✅ DONE

```text
about.lead    Computer Science student at KNUST and DevOps Intern at Springer
              Capital (Acumen track), with hands-on experience across cloud
              infrastructure, DevOps, full-stack development, and application
              deployment.
about.body[0] AWS re/Start graduate and AWS Certified Cloud Practitioner,
              currently building software products while developing practical
              experience with cloud technologies, automation, databases, APIs,
              and modern web development.
```

Your copy arrived as one paragraph, so it is split across the section heading
description (`lead`) and the introductory paragraph (`body[0]`) — otherwise the
same wording would have appeared twice. `body` is now a list, so **any number of
paragraphs** works and empty ones simply do not render.

**A note on KNUST:** education is still résumé-only, per your earlier decision —
your paragraph is the only place it appears on the page. Say the word if you now
want a dedicated Education block.

### Currently building

Condensed from your longer description so each line fits the panel:

```text
PitchPlay GH — football pitch booking & team matchmaking
Compliance Document Review — frontend & DevOps
```

The supporting detail (Next.js, Supabase, Paystack, Tailwind, Google Maps) lives
in the PitchPlay project entry instead, where there is room for it.

### 🎁 This copy filled three other sections

**Experience** — "DevOps Intern at Springer Capital (Acumen track)" is a real
role, so the three invented employers are gone. One real entry remains:

```text
role          DevOps Intern
organization  Springer Capital (Acumen track)
period        [START DATE] – Present
marker        2026
location      [LOCATION]
summary       [SUMMARY PENDING]
technologies  [TECHNOLOGIES PENDING]
achievements  [ACHIEVEMENTS PENDING]
```

Still needed: **start date, location, and what the role actually involves** —
then I can write the summary and achievements properly.

**PitchPlay GH** — now a real entry rather than a name:

```text
tagline       Ghanaian amateur football pitch-booking and team-matchmaking platform
technologies  Next.js · Supabase · Paystack · Tailwind CSS · Google Maps API
features      pitch booking · team matchmaking · Paystack payments
              · map-based discovery
year          2026   (assumed from "currently building" + today's date — correct me)
state         in-progress
role          [YOUR ROLE]  ← still needed
```

**Compliance project role** — answered. `role` is now
**"Frontend development & DevOps"**, taken from your own words ("contributing
frontend development and DevOps work"). That also unblocked the case study —
see §4.

### Still open in this section

```text
github.blurb    ✅ rewritten — now describes your four repositories accurately
footer.note     ← currently "Built with Next.js, TypeScript and Tailwind CSS."
                  Change only if you want it to say something else.
```
## 4. Projects — ✅ DONE (3 real projects, 2 case studies)

| Project | Slot | Detail |
| --- | --- | --- |
| **PitchPlay GH** | **Featured** — big panel + case study | 7 technologies, your 8 features, own case study |
| Compliance Document Review | Grid card + case study | 13 technologies, your 10 features, Vercel/Railway deployment |
| PharmaDesk | Grid card | Python · CustomTkinter · SQLite, your 5 features |

### The featured slot moved, and that has a trade-off

You marked PitchPlay as Featured, so the featured entry is now **PitchPlay** and
Compliance moved into the grid. Two consequences worth knowing:

- The featured panel renders the project's **architecture inline**, so PitchPlay
  needed its own case study — written from your feature list. It now has one.
- Compliance's case study is the more evidence-backed of the two (it came from
  public READMEs). It still has a full case-study page, but it is one click
  further away. **If you would rather lead with Compliance, say so and I will
  swap them back.**

### PitchPlay case study — please confirm

The **overview, solution, architecture and stack** restate what the platform
demonstrably does. The **problem statement and two challenges** are *reasoned
from your feature list*, not from history:

- *Problem* — pitch availability and team organisation handled informally.
- *Challenge 1* — a booking is only safe once payment clears, but holding a slot
  for the whole payment flow would block it. → the 7-minute lock.
- *Challenge 2* — open Team-Ups and unpaid reservations would accumulate. →
  automatic expiry.

Those two only exist because concurrent booking and abandoned records are real
problems, so the reasoning holds — but **tell me if it does not match what
actually happened** and I will rewrite it in your words.

Also inferred: **`role: "Full-stack development"`**. You specified "team-built"
for Compliance and did not for PitchPlay, so I read it as yours. Correct me if
that is wrong — it is the most visible field on the page.

### Compliance — now carrying your fuller detail

Technologies expanded to all 13 you listed (Supabase, Railway, Vercel and
Git/GitHub added), features replaced with your 10 workflows, `role` set to
**"Frontend + DevOps"**. The case study now reflects your deployment reality:

```text
Frontend deployed on Vercel; backend deployment work carried out on Railway.
PostgreSQL / Supabase migration completed; the AI service still runs locally
in Docker for the current submission.
```

I also **restored the three retrieval jobs** (rule lookup, disclosure-by-absence,
precedent search) after your feature list replaced them — they are documented
platform capability and too substantive to drop.

### PharmaDesk — filled

Python, CustomTkinter, SQLite with your five features, plus everything you
supplied: **year 2026**, **role Developer**, **state Completed**, and its
repository URL.

`Completed` required a small addition to the data model. The lifecycle union only
held `placeholder | in-progress | shipped`, and "Shipped" would have been a false
claim for a desktop app that was finished but never released to users — so
`completed` is now its own state with a "Completed" badge, and `shipped` still
means released.

I also dropped the `.git` suffix from the repository URL
(`…/PharmaDesk.git` → `…/PharmaDesk`), matching the other project link and every
link in the GitHub section. Both resolve; this is just tidier.

### ✅ Screenshots — done

All three covers now point at real captures. They were renamed to match their
slugs (the pattern is documented in `public/projects/README.md`):

| File | Project | Where it renders |
| --- | --- | --- |
| `pitchplay-gh-landing.png` | PitchPlay GH | featured cover + its case-study gallery |
| `compliance-document-review-landing.png` | Compliance Document Review App | grid cover + its case-study gallery |
| `pharmadesk-dashboard.png` | PharmaDesk | grid cover (no case study, so no gallery) |

Compliance (1904×1069) and PharmaDesk (1918×1075) are 16:9, so they sit in the
frames essentially uncropped. PitchPlay is 2.05:1, and the 16:10 featured frame
would trim about 211 px (11%) off each side — enough to remove the
"PP PitchPlay GH" wordmark and halve the "Get Started" button. So the data model
gained one optional field, `fit` on the screenshot asset: that capture sets
`fit: "contain"` and letterboxes, everything else keeps the default `cover` and
crops. `project-sample.png` was deleted, since nothing referenced it any more;
re-capture the PitchPlay page at 16:10 and it can drop the `fit` override.

Two things **inside** the captures are worth a look before this goes public, as
both are first impressions on the featured panel:

```text
PitchPlay   hero stat row     ← "50+ pitches · 2,000+ players · 5,000+ bookings
                                · 4.8★" are marketing copy on that page, not
                                measured figures. Fine if you stand behind them.
Compliance  product name      ← the page brands itself "Compliance Review";
                                the site lists the project as "Compliance
                                Document Review App". Match them, or accept the
                                short name as the product's own.
```

### Still open

```text
PitchPlay   live / repo URLs        ← nothing renders until one exists
Compliance  live URL                ← repo URL is already set
PitchPlay   16:10 re-capture        ← optional: drops the `fit: "contain"` override
```

**Lessons — ✅ done on both case studies.** `[LESSONS PENDING]` no longer appears
anywhere in the build. Four bullets each, in `src/data/projects.ts`:

- **PitchPlay** — feature delivery vs. designing around real user flows; the bounded
  reservation lock and what it exposed about concurrency and expiry;
  pricing/matchmaking/auth/payments not being isolated features; defining the
  production architecture and deployment path before the later-stage features.
- **Compliance** — defining service contracts before integration; the
  document-analysis call that omitted the document ID and extracted text the AI
  endpoint required; owning data-processing responsibilities (extraction stays with
  Data Engineering rather than being duplicated in the backend); and establishing and
  testing the cross-service contracts earlier, with integration tests across the
  frontend → backend → data-engineering → AI path.

Both were recast from first person into the file's impersonal voice, to match the
`challenges` entries directly above them. The Compliance lessons deliberately sit
alongside — not on top of — the `challenges` there, which cover bring-up order,
environment-variable drift and the 128-vs-384 embedding mismatch.

### Reference: the full project shape

```text
slug:                ← url segment, lowercase-with-dashes
name:                ← real project name
tagline:             ← one positioning line
summary:             ← 2–3 sentences
year:                ← "2026"
state:               ← shipped | completed | in-progress
role:                ← your actual role
technologies:        ← comma-separated
features:            ← 3–6 bullets
live url / github url
```

Case study fields, if you want the full template exercised:

```text
overview · problem · solution · role
architectureSummary + architecture layers
  layer label  ← e.g. "Client" / "Service" / "Data & AI"
  node label / node detail
  node kind    ← client | service | data | ai | external
stack groups · keyFeatures
challenges   ← {problem, solution} pairs; the most valuable block
results      ← real outcomes only; leave empty if you have none
lessons · screenshots
```

```text
PROJECT 1  (this one is `featured: true`)
slug:                ← URL segment, lowercase-with-dashes, e.g. compliance-document-review
name:                ← real project name
tagline:             ← one positioning line
summary:             ← 2–3 sentences: what it does, who it's for
year:                ← "2026"
state:               ← shipped | completed | in-progress
role:                ← your actual role, e.g. "Backend + deployment"
technologies:        ← comma-separated
features:            ← 3–6 bullets
live url:            ← or "none"
github url:          ← or "none"
```

Then the **case study** — optional per project, but it's the part that shows
engineering depth. Worth doing properly for at least one or two.

```text
overview:             ← what it does + the scope of the build
problem:              ← the manual process this replaces, and why it was painful
solution:             ← your approach, and why you chose it over alternatives
role:                 ← areas you owned, decisions you made

architecture summary: ← the request path in plain prose (browser → API → DB → AI)

architecture layers:  ← 2–4 layers, each with 1–3 nodes:
                         layer label:   e.g. "Client" / "Service" / "Data & AI"
                         node label:    e.g. "Next.js"
                         node detail:   e.g. "App Router, server components"
                         node kind:     client | service | data | ai | external

stack groups:         ← e.g. Frontend: Next.js, TypeScript, Tailwind
                            Backend:  FastAPI, PostgreSQL
                            Infra:    Docker, CI/CD

key features:         ← same as above or expanded
challenges:           ← the most valuable block. Per challenge:
                         problem:   what went wrong / was hard
                         solution:  what you did about it
                       (2–3 pairs minimum)

results:              ← real outcomes only. Leave empty if you have none —
                       I will not invent metrics.
lessons:              ← what you'd do differently
screenshots:          ← see §8; add a caption per shot
```

```text
PROJECT 2             ← same fields, `featured` omitted, case study optional
PROJECT 3
PROJECT 4
```

**Shortcut:** if writing the case studies is the blocker, send the projects with
just name/tagline/summary/tech/links/role plus a paragraph about what was hard.
I'll structure the case study from that and mark the parts we can't fill yet.

## 5. Experience — ✅ DONE (2 roles + 1 program)

```text
DevOps Intern — Springer Capital (Acumen Track)      [START DATE] – Present
  Docker · Docker Compose · GitHub Actions · Terraform · HashiCorp Nomad
  PostgreSQL · MLflow · Grafana · Grafana Loki · Linux

Campus Ambassador — Next Path Ghana (NPG), KNUST     [START DATE] – [END DATE]
  responsibilities pending

── Education & credentials ─────────────────────────────────────────────────
Bachelor's degree in Computer Science               In progress   [Degree]
  Kwame Nkrumah University of Science and Technology (KNUST) · Kumasi, Ghana

AWS re/Start Graduate                                   2026         [Program]
  AWS Training & Certification
```

### ⚠️ Education placement — this reverses an earlier decision

You told me earlier: **"Leave education as it is"**, which I took to mean
résumé-only, and I said so at the time. You have now sent the KNUST data, so it
is on the page — **but not as a new section**, because a dedicated Education
block would change the page structure and navigation, which is what you declined.

What I did instead: extended the timeline's `kind` field with `"education"`, so
the degree renders in the **"Education & credentials"** group (renamed from
"Programs & credentials") with a **Degree** badge and a hollow timeline dot. It
is visible, it groups with the other non-employment entry, and it needed no
navigation change.

**Three options — tell me which you want:**

1. **Keep it as it is** — inside Experience, grouped with credentials.
2. **Promote it to a dedicated Education section** — new numbered section + nav
   item. Fits if you want the degree to be a headline fact.
3. **Remove it from the page** — back to résumé-only, as originally decided.

### One judgement call on the degree

`period: "In progress"` — **you gave no dates or graduation year**, and in §3 you
described yourself as a *"Computer Science student at KNUST"*, so "in progress"
follows your own wording rather than assuming completion. No coursework, modules
or classification are claimed, since none were supplied.

Send the start year (and expected graduation, if known) and I will use real
dates. Also worth confirming: is "Bachelor's degree in Computer Science" the
exact award title, or should it be **BSc Computer Science**?

### The kind split is structural

| `kind` | Where it renders | Marker |
| --- | --- | --- |
| `"role"` | Main timeline | Filled dot |
| `"education"` | Education & credentials | **Degree** badge, hollow dot |
| `"program"` | Education & credentials | **Program** badge, hollow dot |

Nothing non-employment can be read as a job, and adding more education or
programmes needs no component changes.

### Dates — now confirmed

Both roles carry real dates and a year marker, and the section footnote removed
itself. It only renders while some `period` is still a placeholder, so it cannot
outlive the values it described — no stale "still being confirmed" line.

| Role | Period | Location |
| --- | --- | --- |
| DevOps Intern · Springer Capital (Acumen Track) | Aug 2026 – Present | Remote |
| Campus Ambassador · Next Path Ghana (NPG), KNUST | Aug 2026 – Dec 2026 | — |

I wrote **"Aug 2026"** rather than "August 2026" to match the certificate date
format (`formatMonth` renders credentials the same way), so the page reads
consistently. Say if you would rather see the full month spelled out.

Also omitted rather than invented:

- **No achievements for Springer** — you described the work, not outcomes, so the
  Technologies block renders alone.
- **No location on the Campus Ambassador entry** — you supplied none, and the
  organisation line already says KNUST, so an empty field is left out rather than
  filled with a guess.

The Campus Ambassador responsibilities are now your three real ones, replacing
the bracketed note. I used the spelled **"Organised"** to match the house style
already in the data (`containerised`, `organisation`) — say the word if you would
rather have "Organized".

### ⚠️ AWS re/Start now appears twice — decide which to keep

| Where | Why |
| --- | --- |
| **Certificates** section | One of your four credentials from §2 |
| **Experience → Education & credentials** | Where you asked for it to be presented |

Both are defensible — the Certificates gallery is a visual credential wall, the
Experience entry is chronological. But a careful reader will notice the repeat.
**Tell me if you want it removed from one of them**; I would keep it in
Certificates and drop the Experience entry, since that card carries the issuer,
date and eventually the scan.

### Still open

```text
degree       start year / expected graduation
Springer     achievements            ← optional; you described work, not outcomes
```

> **Labelling note:** you sent Education under the number **§6**, which in my
> list is *Certificates*. Education is handled in §5 above; the section below is
> the certificates work from §2.

## 6. Certificates — ✅ assets complete: badges ✅ and scans ✅

Four **earned** credentials, now split into two tiers so the site never implies
four certifications when there is one:

| Credential | Issuer | Tier | Issued | Expires |
| --- | --- | --- | --- | --- |
| AWS Certified Cloud Practitioner | Amazon Web Services (AWS) | **Certification** | Aug 2026 | Aug 2029 |
| AWS re/Start Graduate | AWS Training and Certification | Credential | Aug 2026 | — |
| AWS Educate Introduction to Cloud 101 – Training Badge | AWS Training and Certification | Credential | Apr 2026 | — |
| Cloud Computing Fundamentals | IBM SkillsBuild | Credential | Mar 2026 | — |

**Earned total: 1 certification + 3 additional = 4.**

### In progress — AWS Certified Solutions Architect – Associate

Presented in its own "Working towards" block directly beneath the gallery, with
an `In progress` badge and an explicit *"not yet earned — excluded from the
credential count"* note. It has no issue date, credential ID or verification URL
because none exist yet, and **it is never counted as earned** anywhere on the
site — the gallery grid, the category filter counts and the About figure all read
from `earnedCertificates`, which filters it out structurally rather than by
hand-typed numbers.

### Count wording — changed, tell me if you disagree

I renamed the About stat from **"Certifications 4"** to **"Credentials 4"**.
Calling four items "Certifications" when only one is an exam-based certification
is the kind of small overstatement a recruiter who knows AWS will spot. The
section is still titled *Certificates*, and each card now carries a
`Certification` / `Credential` chip so the distinction is visible at a glance.
If you would rather see **"1 certification + 3 credentials"** spelled out in
that stat cell instead of a single number, say so and I'll switch it.

Because you supplied 4, the About figure is now **derived** from
`earnedCertificates.length` — add or remove a credential and the number follows.

**Every one is category `cloud`** — accurate, but it means the Development,
DevOps, AI and Other filter chips read `00`. Tell me if any should move.

**Nothing is left to supply on any of the four earned credentials.** `skills` was
the last open field; each one now carries its own tag row, copied from the
credential page — 8 tags for Cloud Practitioner, 5 for re/Start, 4 for Cloud 101
and 15 for IBM Cloud Computing Fundamentals.

```text
credential ID:        ✅ 4 of 4 — printed on the credential
verification URL:     ✅ 4 of 4 — Credly / AWS Certification pages
skills:               ✅ 4 of 4 — the tag row each credential page publishes
```

They render as chips under **Skills covered** in the viewer
(`CertificateViewer.tsx`), which reads `certificate.skills`; the whole block is
guarded by a length check, so a credential without tags simply hides it. No
component or type change was needed to switch them on.

**scan file: ✅ supplied on all four earned credentials** — see "Scans" below.
The fifth card keeps the designed "scan pending" frame because there is nothing
to scan before the exam is passed, and "Verify" stays hidden until a verification
URL is present.

### Credential IDs + verification URLs — ✅ complete (4 of 4)

| Credential | ID | Verify link |
| --- | --- | --- |
| AWS re/Start Graduate | ✅ `8e229790-c3bb-4751-818e-d3f324403014` | ✅ |
| AWS Certified Cloud Practitioner | ✅ `4c374807-a7fe-48de-b87c-81e12e8fd8b0` | ✅ |
| AWS Educate Introduction to Cloud 101 | ✅ `471ac4f1-3f15-4b07-996e-0bbc31538deb` | ✅ |
| Cloud Computing Fundamentals (IBM) | ✅ `e1dd81aa-1cdc-4988-aa8e-c48f126d2472` | ✅ |

All four earned credentials are complete, so every card shows the green
**Verifiable** badge, a **Verify** link and its credential ID, and every viewer
offers **Verify credential** plus copy-to-clipboard on the ID. `PWID-B0645400`
from the IBM page is used **nowhere** on the site: it is neither the IBM credential
ID (the page's Credential ID field holds `e1dd81aa-…`) nor a skill — it is an IBM
identifier that happens to sit in the same tag row as the skills, so it was dropped
from that list rather than rendered as a chip.

Supplying a `verifyUrl` flips on the green **Verifiable** badge on the card and
the **Verify credential** button in the viewer; a `credentialId` adds the ID row
(nothing else on the page changes shape).

> **⚠️ Credly links: use `/badges/<id>/public`, not `/earner/earned/badge/<id>`.**
> You sent the second form for re/Start. It is the URL the Credly dashboard shows
> *you*, and it is not the shareable one: requesting both, the `/badges/<id>/public`
> form returns a page titled "AWS re/Start Graduate - Credly", while the
> `/earner/earned/badge/<id>` form returns a generic, unbadged Credly shell. A
> recruiter clicking the `/earner/` link would not reliably land on the badge, so
> the site stores the `/public` form of the same UUID. Worth applying the same
> pattern to the other two Credly badges.
>
> **`/public_url` is fine too.** For the Cloud Practitioner you sent
> `/badges/<id>/public_url`, and requesting both it and `/badges/<id>/public`
> returned the *same* 43 KB page titled "AWS Certified Cloud Practitioner - Credly",
> so Credly serves the badge either way. The site stores the canonical `/public`
> form for consistency with re/Start; say the word if you would rather have your
> exact string.

### ✅ Badges — done (4 of 4)

All four earned credentials now carry their **official badge**, named after the
credential's `id` so the mapping is obvious.

| File | Credential | Artwork | Chip |
| --- | --- | --- | --- |
| `aws-certified-cloud-practitioner.png` | AWS Cloud Practitioner | dark navy hexagon | white *(default)* |
| `aws-restart-graduate.png` | AWS re/Start Graduate | light shield | dark |
| `aws-educate-cloud-101.png` | AWS Educate Cloud Computing 101 | light shield | dark |
| `ibm-cloud-computing-fundamentals.png` | IBM SkillsBuild Cloud Computing Fundamentals | pale pink tile | dark |

Three of the four are **light artwork**, so they needed `tone: "on-dark"` — on the
default white chip they would have been white-on-white. The in-progress Solutions
Architect credential has **no badge on purpose**: you get that badge when you
pass, and the site should not display artwork it has not earned.

### ⚠️ Badges ≠ scans — these do not fill `asset`

The four files are **square 600×600 credential badges**, not certificate scans.
They belong in the square issuer-mark slot, which is where I put them: a square
badge is the wrong shape and content for the preview tile, whose job is to show
the credential as it was issued.

### ✅ Scans — done (4 of 4 earned)

Your four uploads are now wired up as `asset`, renamed from `image1.png`–`image4.png`
to their credential ids so the mapping matches the badges:

| Was | Now | Credential |
| --- | --- | --- |
| `image1.png` | `aws-certified-cloud-practitioner.png` | AWS Cloud Practitioner |
| `image2.png` | `aws-educate-cloud-101.png` | AWS Educate Cloud 101 badge |
| `image3.png` | `ibm-cloud-computing-fundamentals.png` | IBM Cloud Computing Fundamentals |
| `image4.png` | `aws-restart-graduate.png` | AWS re/Start Graduate |

Each is the full achievement page — badge, issue date and official skill tags —
landscape, ~16:9, ~1900 px wide. The dates on them match the ones already in
`certificates.ts` (Cloud Practitioner Aug 2026 / expires Aug 2029, re/Start
Aug 2026, Cloud 101 Apr 2026, IBM Mar 2026), so nothing else needed changing.

Because of that ratio the card preview now **fits** the scan (`object-contain`)
rather than covering the 4:3 tile: covering it cropped roughly a quarter of the
width and bit into the badge artwork. The viewer already fitted them, so the whole
credential shows at both sizes, and the viewer's "pending" note now names only
what is actually outstanding (credential IDs and verification links).

So `[SCAN PENDING]` survives on the in-progress Solutions Architect card alone,
with copy that says the scan follows once the exam is passed.

**If you would rather see the badges big**, that is still a real option — say so
and I will make the preview square for badges, which would let each card lead with
its official mark instead of the achievement page. It is a ~10-line change, and it
would be honest as long as the card says "Digital badge" rather than implying a
certificate document. Your call; I have not done it unasked, and it matters less
now that every earned card leads with real artwork.

## 7. Skills — ✅ DONE (10 categories, 46 unique technologies)

Your categorisation, reproduced exactly — nothing added, nothing inferred:

| Category | Entries |
| --- | --- |
| Frontend Development | Next.js, React, TypeScript, JavaScript, Tailwind CSS |
| Backend Development | Python, FastAPI, Flask, REST APIs |
| Cloud & AWS | EC2, S3, RDS, IAM, VPC, CloudWatch, CloudTrail, KMS, GuardDuty, Config |
| DevOps & Infrastructure | Docker, Docker Compose, GitHub Actions, Terraform, HashiCorp Nomad, Git, GitHub, Bash / Linux, CI/CD |
| Monitoring & MLOps | Grafana, Grafana Loki, MLflow |
| Databases | PostgreSQL, Supabase, SQLite, SQL, pgvector |
| APIs & Integrations | Paystack, Google Maps API, n8n |
| AI & Data | AI service integration, Document extraction workflows, AI-assisted document analysis, Vector search |
| Deployment Platforms | Vercel, Railway |
| Desktop Development | Python, CustomTkinter |

### The count: **46 unique technologies**

```
entries across the 10 categories     47
repeated entry                       −1   (Python: Backend + Desktop)
────────────────────────────────────  ───
UNIQUE technologies                  46   ← the §2 "Technologies" figure
```

**The de-duplication you asked for is now in the code, not in a comment:**

```ts
export const skillCount = new Set(
  skillCategories.flatMap((c) => c.skills.map((s) => s.name))
).size;
```

Previously it summed entries, which would have counted Python twice and
overstated the figure. Verified: the About stat renders **46**, and an audit
asserts `skillCount` is *not* a plain sum.

> ### ⚠️ One ambiguity to settle: "Bash / Linux"
>
> You listed it as a single line, so I kept it as **one entry**, giving **46**. But
> Bash (a shell) and Linux (an OS) are arguably two technologies — if you want
> them counted separately the figure becomes **47**. I chose the lower number
> deliberately: understating a skill count is safer than overstating it. Say the
> word and I'll split them.

### What was dropped from the old structure

Merged into yours, so nothing real was lost:

- **Programming** (my category) — Python → Backend & Desktop, TypeScript and
  JavaScript → Frontend, Bash/Linux → DevOps.
- **Automation** — n8n now sits under APIs & Integrations.
- **Tools** — Git and GitHub are now separate entries under DevOps &
  Infrastructure.
- **"Git/GitHub"** (one combined entry) → split into **Git** and **GitHub**.
- **"Monitoring & observability"** → replaced by the named tools (Grafana,
  Grafana Loki) plus MLflow under Monitoring & MLOps.

### Contexts are now optional, and used honestly

Every technology still carries a **"where it's used"** list — but only where you
stated a use. Four entries deliberately have **no context** rather than a padded
claim: **JavaScript**, **Flask**, **n8n**, and the ten **AWS services**
(whose grounding lives in the category blurb instead: *"covered through AWS
re/Start and the AWS Certified Cloud Practitioner curriculum"*).

The section description was softened to match: *"Each technology lists where it
is actually used, where that has been confirmed."*

> **Worth adding if you can:** the individual AWS services currently carry no
> per-service context. If you tell me where you used any of them (even "re/Start
> labs"), I'll add it — that is the difference between a list and evidence.

### ✅ Fixed: the whole list is in the page · ⚠️ one decision left

**What was wrong.** This section is a tab set, and only the *active* panel was
rendered — so **17 of the 46 technologies were absent from the built HTML
entirely**, reachable only by clicking, and **9 of the 10 tabs declared an
`aria-controls` pointing at an element that did not exist**. That dangling
reference is a genuine ARIA violation (`aria-valid-attr-value`), not a
preference, so I fixed it rather than leave it waiting on a design call.

**What changed.** Every category panel is now rendered; the inactive ones carry
the `hidden` attribute — `display: none`, from Tailwind preflight, with
`!important`, so the `.card` class cannot defeat it. Measured on the built page:

|                                          | before    | after        |
| ---------------------------------------- | --------- | ------------ |
| technologies present in the HTML         | 29 of 46  | **46 of 46** |
| `role="tabpanel"` elements               | 1         | **10**       |
| dangling `aria-controls`                 | 10        | **0**        |

**Nothing a visitor sees has changed** — still one category at a time, same
interaction, same layout. Inactive panels are `display: none`, so they stay out
of the accessibility tree and the tab order; nothing new became focusable.

Also fixed while I was in there: the mobile menu trigger used
`aria-expanded={isMenuOpen}` + `aria-controls="mobile-navigation"`, but that
dialog is only rendered *once opened* — so the reference could never resolve, and
`aria-expanded` was never perceivable as "true" (the dialog covers the button
that owns it). A modal trigger wants `aria-haspopup="dialog"`, which is what it
now uses.

### ⚠️ The one thing still yours to decide: skimmability

This is the half I deliberately did **not** decide for you. Every technology is
now in the page, but a human still sees **one category at a time** — the 9
DevOps & Infrastructure entries before clicking. **This is the biggest remaining
UX question on the site**, and it is a design call, not a data one:

1. **Stack all 10 categories** in one column — all 46 visible and skimmable at
   once, reads like technical documentation. Best for a recruiter who is
   skimming, and it is already the strongest option for search engines.
2. **Keep the tabs** exactly as they now are — on-brand and interactive, the full
   list crawlable, skimming still one category at a time.

I would still pick **1** for a portfolio whose goal is to impress a hiring
manager. It is a one-edit change — say the word.

### Also updated

- **Hero technology rail** — now 16 names, every one drawn from the list above so
  the marquee cannot advertise something the skills section does not claim
  (includes Terraform, GitHub Actions, Grafana, Amazon EC2).
- **Default tab** — DevOps & Infrastructure (9 entries) rather than array order.

## 8. GitHub section — ✅ DONE · Lab — ✅ DONE (placeholders kept, your call)

### GitHub ✅

The four real repositories are in place, each linking to its actual repo, with
descriptions taken from the repos' own READMEs. Stats read from the profile:
**4 repositories**. Still outstanding there: the **contributions** figure (§2).

`blurb` now describes what is actually on the profile: *"Four public
repositories from a team-built compliance platform: the frontend, the backend,
the data-engineering pipeline, and the environment that runs them together."*

### ✅ Lab — decision made: keep the placeholders

**You chose option 3 — leave the four scaffold experiments as clearly-marked
placeholders.** Done: `src/data/lab.ts` and `Lab.tsx` are unchanged. I verified
the marking rather than trusting it, and it holds up three ways in the built
page:

1. the section description ends *"**Placeholder entries for now.**"*
2. every experiment name is bracketed — `[EXPERIMENT — LOCAL AI PLAYGROUND]`
3. every summary opens with *"Placeholder — …"*

So the section cannot be read as real work, and a visitor who skims still sees
the intended design (status, `Lab` badge, technology chips) with honest content.
Nothing to do here until you have something real.

**Whenever you do**, send these and it's a data-only change:

```text
experiment:           ← what you actually poked at
status:               ← exploring | prototyping | paused
technologies:
url:                  ← optional
```

One leftover worth knowing about: `experimentStatusLabel` in `src/data/lab.ts`
defines a **`placeholder`** status that no entry currently uses, because all four
use the real states (`exploring`, `prototyping`, `paused`). It is dead but
harmless — it is the natural switch to flip if you ever want a card to read
"Placeholder" instead of a state.

## 9. Files to send

```text
public/profile/       portrait          ✅ DONE — portrait.jpg, 720×1280
public/issuers/       issuer badges     ✅ DONE — 4 of 4 credentials
public/projects/      screenshots       ✅ DONE — 3 of 3 (slug-named, ~16:9, one per
                                         project + one gallery entry per case study)
public/certificates/  credential scans  ✅ DONE — 4 of 4 earned (image1–4 renamed to
                                         the credential ids; ~1900 px, 16:9, fitted
                                         whole in the card and viewer)
public/resume/        resume.pdf        ✅ DONE — 69,893 bytes, PDF 1.7, 2 pages
```

The link-preview card is **done**: it is generated at build time by
`src/app/opengraph-image.tsx` (see "Social share card" in the README), so
`public/og/` no longer exists and there is no static file to send. It renders your
name, role, tagline, availability, disciplines and location in real type, and it
follows `site.ts` automatically.

### ✅ Portrait — done, and it did not need a 4:5 file

`public/profile/portrait.jpg` (720×1280, 9:16) is wired through
`site.about.image`, and the About frame is now the real image instead of the
placeholder.

I had specified 4:5 (~1200×1500), so this is worth explaining: **it did not need
re-cropping.** The frame renders at `aspect-[4/5]` with `object-cover`, which
scales to fill and crops from the **centre** — so a 9:16 source shows roughly
y 190–1090 of 1280, which is head, shoulders and a little headroom. Nothing is
clipped, and I verified the 4:5 `aspect-ratio` and `object-cover` rules are both
in the compiled CSS rather than assuming it.

Two small notes, in case you want to replace it later:

- The photo is **dim and taken from slightly below**, and your eyes are closed in
  it. It works, but a brighter, eye-level shot would suit the page better.
- `object-cover` centres the crop, so keep the subject centred horizontally in any
  replacement. A *wider* photo would crop the sides instead of the top/bottom.

### ✅ Résumé PDF — done

`public/resume/resume.pdf` is in place: 69,893 bytes, **PDF 1.7, 2 pages**,
produced by LibreOffice 24.2. Its SHA-256 matches the file supplied exactly, so
nothing was altered on the way in.

Both buttons are live: `/resume/resume.pdf` now serves `200` with
`content-type: application/pdf` where it previously returned a 404. No code
changed to achieve that — the path was always data.

The section **copy** was the only thing that had to move with it, and it mattered:
one scaffold note printed the file path and described the PDF as "expected", and
another said the contents "are not on the page yet". Both would have sat directly
above a working download button telling visitors the file was missing. They now
describe the document instead of its absence.

**Worth a decision, and it is not a small one.** The résumé ends with a
**References** section that lists three people alongside their **mobile numbers
and personal email addresses**. Acting as a referee is a favour to you, not
consent to be published — and a PDF on a public site is readable by anyone who
opens it and by address-harvesting bots. The usual practice is a single line,
"References available on request". A revised PDF drops in with no code change.

The five sections the page advertises (Experience, Education, Skills, Projects,
Certifications) were **read out of the document itself rather than assumed**, and
all five are present.

## 10. Still open

```text
domain:               ← for NEXT_PUBLIC_SITE_URL (metadata, sitemap, robots)
```

`copyrightFrom` is confirmed as 2026. Everything else that used to sit here is
done.

### One item I could not interpret

Your reply included this line:

> `15 (role name confirmed as Campus Ambassador, separate from responsibilities)`

I could not map **"15"** to anything on the site — no data field expects it, and
no figure in the build should read 15 (Projects 3, Technologies 46, Credentials 4,
Years Learning 4, Repositories 4, Contributions 8). The parenthetical is satisfied
either way: the role reads **Campus Ambassador**, and the three responsibilities
sit in the Achievements list, separate from the role name.

If 15 belongs somewhere, tell me where and it goes in. I have deliberately not
placed it anywhere rather than guess.

Decided already: education stays inside Experience (not its own section), issuer
logos are wired, Lab keeps its clearly-marked placeholders, Skills keeps its tabs,
and the favicon is the **TM** monogram.

Once this is filled in, delete `CONTENT_TODO.md` — it has no function in the
built site.