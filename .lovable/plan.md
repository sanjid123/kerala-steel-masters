## Goals

1. Update phone & WhatsApp number everywhere to **+91 97475 15022**.
2. Service Area Explorer placeholder → "Enter your Pincode".
3. Fix the SEO recommendations from the strategist (title length, meta length, keyword distribution, page speed, inline styles).
4. Fix the mobile "loads with no styling" report.
5. Wire in the new Google Business Profile link.

---

## 1. Contact details (single source: `src/lib/site.ts`)

- `phoneDisplay`: `+91 97475 15022`
- `phoneTel`: `+919747515022`
- `whatsappNumber`: `919747515022`
- Add `googleBusinessProfile`: `https://share.google/qYZqDvxhfdiLoBveA`
- Update `socials.google` to the same GBP link (currently a Maps search URL).
- LocalBusiness JSON-LD (`seo.ts` / `__root.tsx`) — update `telephone` and add `sameAs` entry for the GBP URL.

Because every component reads from `SITE.*` already (Header, Footer, MobileActionBar, WhatsAppFab, CtaBand, ServiceAreaResult, contact page), one file change cascades site-wide. I'll grep to confirm no hardcoded `97475 10220` strings remain.

## 2. Service Area Explorer

`src/components/site/ServiceAreaExplorer.tsx` — change Input `placeholder` to `Enter your Pincode`.

## 3. SEO strategist recommendations

### 3a. Title tag length (target 50–60 chars)
Audit `head()` in every route (`index`, `about`, `services`, `projects`, `service-areas`, `contact`, `kerala.$city`, `kerala.$city.$service`) and lengthen short titles to include primary keywords + location, e.g.:
- Home: `PS Steels & Engineering — SS & MS Steel Fabrication in Kerala` (~62 → trim to 60)
- Services: `Steel Fabrication Services in Kerala — SS, MS, GP Pipe Works`
- etc.

### 3b. Meta description length (target 140–160 chars)
Extend every page's `description` meta to ~150 chars with keywords (fabrication, SS, MS, GP pipe, Mannarkkad, Palakkad, Kerala) naturally placed.

### 3c. Keyword distribution across HTML tags
For each route, ensure the primary keyword appears in:
- `<title>`
- meta description
- a single `<h1>`
- at least one `<h2>`
- image `alt` attributes on hero/section images
Audit `index.tsx`, `services.tsx`, `projects.tsx`, `about.tsx`, `contact.tsx`, `service-areas.tsx` and add/adjust headings + alt text. No layout changes — text only.

### 3d. Page load speed
- Convert remaining `<img>` hero/section images to `loading="lazy"` + `decoding="async"` where not above the fold; keep above-fold hero eager with `fetchpriority="high"`.
- Add `<link rel="preload" as="image">` for the hero image in `__root.tsx` head OR via `index.tsx` `head().links`.
- Audit `src/assets/*.jpg` and confirm reasonable sizes (no script change — note any oversize files for the user).
- Verify Vite build output isn't shipping the giant unused `payments-strip.png` (already deleted) and that `routeTree.gen.ts` code-splits per route (default behavior).

### 3e. Inline styles
Grep the project for `style={{` and replace with Tailwind classes or move to `src/styles.css` utility classes. Known suspects to audit:
- `index.tsx` hero overlay
- any `style={{ animationDelay }}` in TestimonialMarquee
Keep dynamic-only styles (e.g. animation delay from index) but minimize.

## 4. Mobile "no styling" bug

Likely cause: the user uploaded the Vite build's hashed CSS file (`/assets/index-*.css`) without the `.htaccess` MIME-type fallback, so Hostinger serves it as `text/html` on some mobile networks/CDN POPs, or the CSS file is missing from the upload.

Plan:
- Add explicit MIME types in `public/.htaccess`:
  ```
  AddType text/css .css
  AddType application/javascript .js
  AddType image/svg+xml .svg
  AddType application/json .json
  ```
- Add long-cache headers for `/assets/*` and a `no-cache` for `index.html` so stale HTML never references a missing hashed CSS.
- Add a brief Hostinger upload checklist note in the chat reply (not a code change).

## 5. Google Business Profile

- Replace `SITE.socials.google` with the share link.
- Add a "View on Google" button in Footer + Contact page near the address card (linking to the GBP).
- Include the GBP URL in LocalBusiness JSON-LD `sameAs` array.

---

## Out of scope

- No new pages, no design overhaul, no backend.
- Image re-compression must be done by the user in their image tool — I'll only adjust loading attributes and flag any oversized files.

## Files to edit

- `src/lib/site.ts` (phone, WA, GBP)
- `src/lib/seo.ts` (JSON-LD telephone + sameAs)
- `src/routes/__root.tsx` (sitewide JSON-LD, hero preload)
- `src/routes/index.tsx`, `about.tsx`, `services.tsx`, `projects.tsx`, `service-areas.tsx`, `contact.tsx`, `kerala.$city.tsx`, `kerala.$city.$service.tsx` (titles, descriptions, H1/H2, alt text, lazy/eager image hints)
- `src/components/site/ServiceAreaExplorer.tsx` (placeholder)
- `src/components/site/Footer.tsx` + `src/routes/contact.tsx` (GBP link)
- `src/components/site/TestimonialMarquee.tsx` and any others with `style={{...}}` (de-inline where static)
- `public/.htaccess` (MIME + cache headers)

Approve and I'll implement in one pass.