## Goals

1. Add a `README.md` so you can verify (and document) which GitHub repo + branch this project is synced to.
2. Restore the Lovable preview, which currently renders a blank/stuck page after the static-site (SSG) conversion.

---

## Part 1 — Preview not loading (root cause)

The previous edit set `cloudflare: false` and enabled `spa.prerender` + `maskPath: "/"` in `vite.config.ts`. That config is meant for a **production static export** to Hostinger — it is not compatible with Lovable's live preview, which expects the Cloudflare Worker SSR runtime. Result: dev server returns HTML, but the preview iframe never finishes hydrating.

**Fix:** make the static-export options apply only at build time, not in dev.

```ts
// vite.config.ts
const isBuild = process.env.NODE_ENV === "production";

export default defineConfig({
  cloudflare: !isBuild ? true : false,         // keep Worker runtime in dev
  tanstackStart: {
    pages: PAGES,
    prerender: isBuild ? { enabled: true, crawlLinks: true, autoSubfolderIndex: true, failOnError: false } : undefined,
    spa: isBuild ? { enabled: true, prerender: { enabled: true, outputPath: "/index.html", crawlLinks: true, retryCount: 1 }, maskPath: "/" } : undefined,
    sitemap: { enabled: false },
  },
});
```

This keeps Lovable preview working normally while `bun run build` still produces the fully prerendered static `dist/client` you upload to Hostinger.

## Part 2 — GitHub sync check via README

Lovable does not expose a programmatic "is this repo connected" API to the running app, but we can:

1. Create `README.md` at the project root containing:
   - **Repo & branch placeholders** you fill in once (e.g. `github.com/<you>/pssteels` on `main`)
   - A **manual verification checklist** (open repo → confirm latest commit hash matches Lovable's last edit timestamp)
   - A `git remote -v` / `git rev-parse --abbrev-ref HEAD` snippet for local verification
   - Hostinger deployment recap (build → upload `dist/client` contents)
2. Because Lovable auto-syncs every change to GitHub, the presence of the README appearing in your repo is itself the proof the connection works — if it does not show up on github.com within ~30 s of this change, the repo is not connected.

### README outline

```
# PS Steels & Engineering — Site

## GitHub Sync
- Repo:   github.com/<owner>/<repo>
- Branch: main
- Verify: `git remote -v` and check latest commit on github.com matches Lovable's last edit.

## Local dev
bun install && bun run dev

## Production build (Hostinger)
bun run build
# Upload contents of dist/client/ to public_html/
```

---

## Files to change

- `vite.config.ts` — gate SSG options behind `NODE_ENV === "production"`
- `README.md` — new file (sync verification + deploy recap)

## Out of scope

- No changes to routes, SEO, `.htaccess`, sitemap, or assets.
- No GitHub API integration (Lovable does not expose repo metadata to app code).
