# Plan — Hostinger deploy fix + Contact email + project scan

## 1. Why your `dist/` isn't working on Hostinger

This project is **TanStack Start (SSR)**, not a plain Vite SPA. `vite build` produces two folders:

```
dist/
├── client/   ← static HTML, JS, CSS, assets
└── server/   ← Cloudflare Worker bundle (Node-incompatible)
```

Hostinger shared hosting only runs Apache + static files — it cannot run the Worker. Your `package.json` already has a `flatten-dist.mjs` postbuild step that:
- deletes `dist/server`
- promotes `dist/client/*` up to `dist/*`

So after `npm run build`, the contents of `dist/` (not the folder itself) must be uploaded to `public_html/`. Common mistakes:

- Uploading the `dist` **folder** instead of its **contents** → site lives at `pssteels.in/dist/` and root is blank.
- Forgetting the **dotfile** `.htaccess` (FileZilla hides dotfiles by default → enable "Show hidden files"). Without it, `/services`, `/contact`, etc. give 404 on refresh.
- Old files left in `public_html/` → mix of stale + new hashed JS = blank screen. Delete everything in `public_html/` first (keep only `.well-known/` if present), then upload fresh.
- Running on Windows where `flatten-dist.mjs` may silently fail if `dist/server` is locked. Verify after build that `dist/index.html` exists at the top level.

### Quick checklist for every deploy

```
1. npm run build
2. Confirm dist/index.html exists (NOT dist/client/index.html)
3. In Hostinger File Manager → public_html → delete old files
4. Upload EVERYTHING inside dist/ (including .htaccess) to public_html/
5. Hard refresh (Ctrl+Shift+R) on pssteels.in
```

## 2. Add secondary email to Contact page

- `src/lib/site.ts` → add `emailSecondary: "pssteelsandengineering@gmail.com"` to the `SITE` object (keep existing `email` as primary).
- `src/routes/contact.tsx` → in the email card, render both addresses:
  - Primary: `info@pssteels.in` (existing styled card, unchanged)
  - Secondary line below: `pssteelsandengineering@gmail.com` as a smaller `mailto:` link
- `src/components/site/Footer.tsx` → add a second `<li>` under the email row with the Gmail address.
- Update the `ContactPage` JSON-LD `contactPoint` to use an `email` array including both addresses (Schema.org allows multiple).

## 3. Project-wide issues to fix while we're here

A. **Hydration warning in console** (`/#service-areas` vs `/service-areas`) — already fixed in the current `Footer.tsx` source. The preview just needs a hard refresh; nothing to change.

B. **Stale import in `Footer.tsx`** — line 4 still imports `PRIORITY_CITIES` from `@/lib/locations`. Verify it still exists in `locations.ts`; if it was removed earlier it will break the build. If missing, restore the named export or switch the footer to `CITIES.slice(0, 6)`.

C. **`og:image` in `__root.tsx`** — per the head-meta rules a root-level `og:image` overrides every leaf. I'll audit `__root.tsx` and remove any global `og:image` so per-page images win.

D. **Hostinger `.htaccess`** — current file is good, but I'll add one missing rule:
- `DirectoryIndex index.html` (some Hostinger configs default to `index.php` first → 404 at root).

E. **Sitemap & robots** sanity check — make sure `public/robots.txt` references `https://pssteels.in/sitemap.xml` and `build-sitemap.mjs` writes to `public/sitemap.xml` before each build (it already does via the `prebuild` script ✅).

F. **Build verification** — run `bun run build` after the edits and confirm:
- `dist/index.html` exists at top level
- `dist/.htaccess` is present (Vite copies `public/*` → `dist/`)
- Pretty-URL pages have their own `index.html` (e.g. `dist/contact/index.html`)

## Out of scope

- Migrating off SSR to a pure SPA (not needed — flatten script already handles it).
- Buying SSL or DNS changes on Hostinger (separate manual step).
- Changing branding, colors, or copy.

After approval I'll make all edits in one pass and run a build to verify.
