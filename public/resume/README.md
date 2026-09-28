# Resume assets

`resume.pdf` is the real résumé — two pages, replaced in place whenever it is
updated. The "Download resume" and "View resume" buttons read their paths from
`src/data/site.ts`, so keeping the same filename means no code change at all:

```ts
resume: {
  downloadPath: "/resume/resume.pdf",
  viewPath: "/resume/resume.pdf",
  fileName: "resume.pdf",
},
```

If the filename changes, update that block only — no component edits are
needed.