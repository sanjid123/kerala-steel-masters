## Quick answer to your question

**No full redesign needed.** The site already has dynamic per-city pages at `/kerala/$city` (≈110 Kerala towns prerendered as static HTML — see `src/routes/kerala.$city.tsx` + `src/lib/locations.ts`). We reuse that infrastructure and bolt the new "Service Area Explorer" on top. Only the homepage Service Areas section, the footer, and one new component need to change. No route renames, no CSS rewrite, no design system change.

Optional polish: add `/service-area/$city` as an alias that 301s to `/kerala/$city` — but it's pure SEO sugar, not required.

---

## What we're building

An **Interactive Service Area Explorer** that replaces the current giant chip-cloud of every Kerala town. It lives in one card on the homepage (and is also linkable from the footer).

```
┌─────────────────────────────────────────────────────┐
│  Find Steel Fabrication Services Near You           │
│  ┌───────────────────────────────────┐ ┌─────────┐  │
│  │ 🔍  Enter pincode or town name…   │ │ Search  │  │
│  └───────────────────────────────────┘ └─────────┘  │
│   ↓ live suggestions as you type                    │
│   • 678001 — Palakkad                               │
│   • 678002 — Palakkad H.O                           │
│   • 678013 — Kanjikode                              │
└─────────────────────────────────────────────────────┘
        ↓ on select / submit
┌─────────────────────────────────────────────────────┐
│  Home › Service Areas › Palakkad                    │
│                                                     │
│  📍 Serving Area Found                              │
│  ─────────────────────────                          │
│  District:  Palakkad                                │
│  Pincode:   678001                                  │
│  Post Office: Palakkad H.O                          │
│                                                     │
│  Nearby Towns We Serve:                             │
│  [Palakkad] [Olavakkode] [Kanjikode] [Malampuzha]   │
│  [Chittur] [Ottapalam] [Mannarkkad] [Pattambi]      │
│                                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │  → View Steel Fabrication in Palakkad        │   │
│  │  → WhatsApp us about 678001                  │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

UX touches: breadcrumb header, status pill (green "✓ We serve this area" / amber "Outside Kerala — message us anyway"), skeleton loader during API call, debounced suggestions, keyboard arrow-key navigation, Enter to submit, Esc to clear.

---

## Data sources

1. **Live API** — `GET https://api.postalpincode.in/pincode/{6-digit}` for the authoritative district + post-office name on submit. Free, no key, CORS-enabled.
2. **Local autocomplete index** — small bundled JSON (~80 KB gzipped) of all Kerala pincodes with `{ pincode, officeName, district }`. Used for instant suggestions while typing — calling the live API on every keystroke is too slow and rate-risky.
   - Source: same `api.postalpincode.in` (mirror endpoint `/postoffice/{name}` or the public dataset on data.gov.in / GitHub `sanand0/pincode`). Generated **once at build time** by a script — not fetched at runtime.
3. **Existing town list** (`src/lib/locations.ts`) — used to map a resolved district → the 6–10 towns we already have landing pages for. That's how "Nearby Towns We Serve" gets its links.

---

## Pieces to build

### A. Build-time pincode index
- `scripts/build-pincode-index.mjs` — runs in `prebuild` (alongside the existing sitemap script). Fetches Kerala pincodes from `api.postalpincode.in` (looped per district name), de-dupes, writes `src/data/kerala-pincodes.json`.
- Falls back to a checked-in copy if the API is unreachable during build, so builds never fail offline.

### B. Helpers — `src/lib/pincodes.ts`
- `searchPincodes(query: string, limit = 8)` — fuzzy match on pincode prefix OR office/town name from the local index.
- `lookupPincode(pin: string)` — calls the live API, returns `{ pincode, district, officeName, state } | null`. Validates 6-digit numeric, Kerala-only check.
- `nearbyTownsForDistrict(district)` — reads from existing `CITIES` in `locations.ts`, returns the towns we have `/kerala/$city` pages for.

### C. Component — `src/components/site/ServiceAreaExplorer.tsx`
- Combobox input (Radix `cmdk` is already installed — `src/components/ui/command.tsx`). Reuse it; no new dependency.
- Debounced suggestions list (200 ms). Arrow-key + Enter selection.
- On submit: hit `lookupPincode`, render the result card with breadcrumb, status pill, district details, nearby-town chips that are real `<Link to="/kerala/$city" />`, and two CTA buttons (View city page / WhatsApp prefilled with the pincode).
- Loading skeleton, empty state, error state.
- All Tailwind / existing design tokens (`bg-card`, `text-navy`, `text-orange`, `border-border`). No new colors.

### D. Homepage — `src/routes/index.tsx`
- Keep the "Top cities we serve" 12-chip row as-is (you already approved it).
- **Remove** the "All Kerala towns we cover" chip cloud.
- Mount `<ServiceAreaExplorer />` in its place inside the same `#service-areas` section.
- Add an `sr-only <nav>` with one `<Link>` per town from `CITIES` so Google still crawls every `/kerala/$city` URL even though it's not painted for users. (Sitemap already lists them too — this is belt + suspenders.)

### E. Footer — `src/components/site/Footer.tsx`
- **Remove** the full-width chip-cloud band.
- Replace with a slim line: *"Serving all 14 districts across Kerala — from Kasaragod to Thiruvananthapuram"* and a `Link` to `/#service-areas` ("Find your area →").
- Keep the same `sr-only <nav>` block of all city links inside the footer for SEO.
- Restructure **Top Locations** column for friendliness: rename to "Service Locations", show 6 anchor priority cities (Mannarkkad, Palakkad, Ottapalam, Perinthalmanna, Kozhikode, Ernakulam) with clean labels (just the city name, not "Steel Fabrication in …"), plus a "+ all Kerala towns →" link to `/#service-areas`.

### F. (Optional) URL alias `/service-area/$city`
- Tiny passthrough route file that re-exports the same component as `/kerala/$city`, so both URL shapes work. Helps if you want the `/service-area/...` shape in marketing material. Skip if you prefer to keep one canonical URL.

---

## Files

- new: `scripts/build-pincode-index.mjs` (+ `prebuild` hook update in `package.json`)
- new: `src/data/kerala-pincodes.json` (build-time generated, fallback copy committed)
- new: `src/lib/pincodes.ts`
- new: `src/components/site/ServiceAreaExplorer.tsx`
- edit: `src/routes/index.tsx` (drop chip cloud, mount explorer, add `id="service-areas"` + sr-only nav)
- edit: `src/components/site/Footer.tsx` (drop chip cloud, restructure Top Locations, add sr-only nav)
- (optional) new: `src/routes/service-area.$city.tsx` (alias)

## SEO preserved

- Every `/kerala/$city` URL is still in `public/sitemap.xml` (already generated).
- Every city `<Link>` still exists in the DOM via `sr-only` navs in both the homepage and footer — Google reads them, users don't see them.
- Breadcrumb in the result card adds structured signal; we'll also emit JSON-LD `BreadcrumbList` from the explorer when a city is resolved.

## Out of scope

- No backend, no DB, no auth.
- No design system changes.
- No edits to `/kerala/$city` page content (already SEO-optimized).
- Live API is called only on submit, not on every keystroke — so no rate-limit risk and no key needed.
