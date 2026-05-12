## Plan: Polish, SEO Boost & Trust Signals for PS Steels

### 1. Header — Remove "PS" logo box
In `src/components/site/Header.tsx`, remove the gradient "PS" square. Keep only the text wordmark "PS Steels / & Engineering" (with subtle navy color treatment) so it still reads as a logo. Same cleanup in `Footer.tsx` (replace PS box with text-only mark).

### 2. Process steps — match uploaded reference (no numbers)
Update the "How it works" section on `src/routes/index.tsx`:
- Remove the orange numbered badge (1–5).
- Card style: dark navy card, rounded-2xl, single icon shown in a soft outlined chip (chat / map-pin / file / hammer / truck), bold white title, muted description — matching the uploaded screenshot's vibe but without the numbers.
- Same five steps: Free Consultation, Site Visit, Quotation, Fabrication, Installation.

### 3. Em dash purge
Sweep all source files (`src/**/*.{ts,tsx}`, route metadata, `site.ts`, components) and replace em dashes (`—`) and en dashes (`–`) used as punctuation with commas, periods, or "to" / "and" depending on context. Hours line "Mon – Sat" becomes "Mon to Sat". Hyphens in compound words (e.g. "in-house", "powder-coated") stay.

### 4. Services page — heavy SEO sections + FAQs
Enhance `src/routes/services.tsx`:
- Add an **SEO intro block** above the service grid mentioning core keywords: "GP pipe works in Kerala", "SS fabrication Kerala", "MS steel works Mannarkkad", "steel pipe fabrication Palakkad", with city list (Mannarkkad, Palakkad, Ottapalam, Perinthalmanna, Malappuram, Kozhikode, Thrissur, Ernakulam, Kollam, Thiruvananthapuram).
- For each of the 11 services, add a **"Where we serve" line** listing 6–8 relevant Kerala cities (rotated).
- Add a **dedicated SEO content section** below the service blocks with H2s targeting:
  - "GP Pipe Works in Kerala"
  - "SS Steel Fabrication across Kerala"
  - "MS Steel Works in Mannarkkad and Palakkad"
  - "Steel Pipe Fabrication for Homes, Hotels and Industries"
  Each with 2–3 paragraphs of natural keyword-rich copy.
- Add an **FAQ accordion** (using existing `accordion.tsx`) with 8 questions: areas served, materials used, free site visit, quotation timeline, warranty/finishing, GP vs SS difference, custom design, payment options. Add `FAQPage` JSON-LD schema in `head()`.
- Update services page `head()` title/description to include "GP Pipe Works Kerala | SS MS Fabrication Mannarkkad Palakkad".

### 5. Google Analytics (G-5K1XY0PN8V)
Add the gtag snippet via root route `head().scripts` in `src/routes/__root.tsx`:
- One async script with `src="https://www.googletagmanager.com/gtag/js?id=G-5K1XY0PN8V"`.
- One inline script initializing `dataLayer` and `gtag('config', 'G-5K1XY0PN8V')`.

### 6. Payment methods strip in footer
Generate small SVG/PNG-style icons (or use AI-generated transparent PNGs) for: Paytm, Google Pay, UPI, COD, PhonePe, Amazon Pay, Net Banking, Visa, RuPay, Mastercard, AMEX (skip MobiKwik per request).
- Recommended: generate a single horizontal icons strip image OR individual transparent PNGs in `src/assets/payments/`.
- Add a new "We accept all major payment methods" section in `Footer.tsx` above the bottom copyright bar:
  - Heading: "We accept all major payments"
  - Responsive grid: 4 cols on mobile, 6 on sm, 11 on lg
  - White rounded chips containing each icon, subtle border
  - Mobile: wraps cleanly in 2–3 rows

### 7. GSTIN in footer
Add a small line in the footer's bottom bar: `GSTIN: 32EGQPP3743B1ZF` (alongside copyright). Subtle white/60 styling.

### 8. Misc cleanups
- Remove the numeric "01–11" badge on the home services grid cards (replace with a small steel-blue dot or icon to keep the design clean, matching the no-numbers aesthetic).
- Verify no stray em dashes in `og:description`, JSON-LD, etc.

### Files touched
- `src/components/site/Header.tsx` (logo)
- `src/components/site/Footer.tsx` (logo, payments strip, GSTIN)
- `src/routes/__root.tsx` (gtag scripts)
- `src/routes/index.tsx` (process redesign, services card numbers, em dashes)
- `src/routes/services.tsx` (SEO sections, FAQ, JSON-LD, head update)
- `src/lib/site.ts` (em dash sweep, hours line, GSTIN constant, FAQ data, city-per-service map)
- `src/routes/about.tsx`, `src/routes/contact.tsx`, `src/routes/projects.tsx` (em dash sweep)
- New: `src/assets/payments/*.png` (generated icons) — single sprite or individual

### Out of scope
No backend, no new pages, no design system color changes, no animation library additions.
