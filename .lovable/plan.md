# Project audit — fixes for performance + SEO

Quick pass over the whole project. Most things are solid (per-route `head()`, JSON-LD, sitemap, semantic HTML, lazy `<img>` on cards). Below is everything worth changing.

## 1. Bugs / leftovers from earlier requests

- **`/services` page still embeds `ServiceAreaExplorer`** (`src/routes/services.tsx` lines 14, 113-117). You asked to remove it from the services page — it should only live in the hero. Remove the import + the whole "SERVICE AREA FINDER" section.
- **Home page still has a second Service Area section** (`src/routes/index.tsx` lines 250-298 — the `id="service-areas"` block). Per your earlier message it should only appear inside the hero box. Remove that bottom section, but keep the hidden `<nav class="sr-only">` of all-Kerala city links so SEO crawl depth stays.
- **Hero explorer subtitle still shows "Enter your 6-digit pincode…"** (`ServiceAreaExplorer.tsx` lines 82-85). You wanted that line removed. Drop the `<p>`.
- **`favicon.ico` is referenced but missing** from `public/`. Either add a real favicon or switch the link to an existing asset (e.g. `ps-steels-logo.png`) so it stops 404-ing on every page load.

## 2. Performance

- **Delete `src/assets/payments-strip.png` (1.1 MB)** — not imported anywhere. Pure dead weight in the repo.
- **Hero LCP image** (`src/routes/index.tsx` line 71): add `loading="eager"`, `fetchpriority="high"`, `decoding="async"`. It is the LCP element.
- **Google Fonts stylesheet is render-blocking** (`__root.tsx` line 89-92). Switch to the standard non-blocking pattern (`media="print"` + `onload="this.media='all'"`) with a `<noscript>` fallback. Keeps the `display=swap` benefit and shaves a chunk off FCP.
- **Project card images** already have `loading="lazy"` ✅ but are missing `decoding="async"` — small win, add it.
- **Logo PNGs**: `ps-steels-logo.png` is 119 KB and `ps-steels-logo-original.png` (106 KB) is unused. Delete the original; consider a smaller logo asset if size matters, but not required.

## 3. SEO polish

- **`organizationLd().logo`** currently points at `OG_IMAGE` (a 1200×630 share banner). Schema.org expects a square-ish logo. Point it at `/ps-steels-logo.png` or a dedicated square version.
- **Drop the `keywords` meta tag** in `src/routes/services.tsx` (line 69-72). Google has ignored it for ~15 years; it just adds noise.
- **Service-area page (`/service-areas`)** — verify it has its own `head()` with title/description/canonical. (Will check while implementing; add if missing.)
- Sitemap + robots already in place ✅. No changes needed beyond the `/service-areas` entry that's already there.

## 4. Out of scope (not changing)

- Won't touch routing structure, Lovable Cloud, or content copy beyond the four edits above.
- Won't migrate the static `public/sitemap.xml` to a server route — your `prebuild` script regenerates it and that's fine.

## Risk
Low. All changes are additive or removals of unused/duplicate code. No schema, routing, or business-logic changes.
