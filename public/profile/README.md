# Portrait

One file: **`portrait.jpg`** (720×1280, 9:16). It is referenced from
`src/data/site.ts`:

```ts
about: {
  image: { src: "/profile/portrait.jpg", alt: "Portrait of Toffic Mohammed" },
}
```

## Why a 9:16 source works in a 4:5 frame

The About frame renders at `aspect-[4/5]` with `object-cover`, which scales to
fill and crops from the **centre**. A 720×1280 source therefore shows roughly
**y 190–1090 of 1280** — head, shoulders and a little headroom, nothing important
clipped. Any source at or above 4:5 (0.8 w/h) behaves the same way, so a taller
photo is always safe; a *wider* one would crop the sides instead.

Because `object-cover` centres the crop, keep the subject centred horizontally
when replacing this. Roughly **`(min-width: 1024px) 32vw, 100vw`** is the rendered
size, so ~900px wide is ample for a 2× display.

## Replacing it

Overwrite `portrait.jpg` and nothing else needs to change. If the filename
changes, update the `src` in `src/data/site.ts` — no component edits are needed.