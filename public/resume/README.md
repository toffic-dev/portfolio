# Resume assets

Replace `resume.pdf` with the real file, keeping the same name, and the
"Download resume" and "View resume" buttons keep working — they read their
paths from `src/data/site.ts`:

```ts
resume: {
  downloadPath: "/resume/resume.pdf",
  viewPath: "/resume/resume.pdf",
  fileName: "resume.pdf",
},
```

If the filename changes, update that block only — no component edits are
needed.