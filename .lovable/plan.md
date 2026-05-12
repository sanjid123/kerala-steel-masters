
# PS Steels & Engineering — Website Plan

A clean, premium multi-page marketing site (light theme, navy + steel blue) optimized for local Kerala SEO, WhatsApp/call conversions, and showcasing fabrication work.

## Brand & Design System

- **Palette**: Off-white background, deep navy (`#0B1F3A`-ish in oklch), steel blue accent, warm safety-orange CTA accent for WhatsApp/Call buttons.
- **Typography**: Display — `Space Grotesk` (industrial-modern); Body — `Inter`. Loaded via Google Fonts.
- **Tokens** added to `src/styles.css`: brand navy, steel-blue, accent-orange (WhatsApp green for WA button), muted-steel, shadow-elegant, gradient-hero.
- **Components**: Custom button variants (`hero`, `whatsapp`, `call`, `outline-steel`), section headings, service card, project card, testimonial card.
- Subtle motion (fade-in on scroll, hover-scale on cards) using existing `tw-animate-css`.

## Pages (TanStack Start file routes)

```
src/routes/
  __root.tsx          (header + footer + sticky mobile WA/Call bar)
  index.tsx           Home
  services.tsx        All services in detail
  projects.tsx        Portfolio gallery (filterable)
  about.tsx           About + service areas
  contact.tsx         Contact + map + WA/Call CTAs
```

Every route gets unique `head()` with title, description, og:title/description, og:image (uses route hero image), and JSON-LD `LocalBusiness` schema on home.

## Global UI

- **Header**: Logo, nav links, prominent "Get Quote" + "Call" buttons. Mobile hamburger drawer.
- **Sticky mobile action bar** (bottom): WhatsApp + Call + Quote — always visible on small screens.
- **Floating WhatsApp FAB** on desktop.
- **Footer**: Contact info, services list, service-area cities, social links (Google Business, Instagram, Facebook), business hours.

## Home Page Sections

1. Hero — headline "Complete SS & MS Steel Fabrication Across Kerala", subheading, two CTAs (WhatsApp Quote / Call Now), trust strip (Free Consultation • Site Visit • Custom Quotation).
2. Materials strip — SS Steel, MS Steel, GP Pipe, Steel Pipe (icon cards).
3. Services grid — 11 services with icons, short copy, "View details" link to `/services#anchor`.
4. Featured projects — 6 cards linking to `/projects`.
5. Why choose us — 4 value props (Custom fabrication, Quality finishing, On-time delivery, Kerala-wide service).
6. Process — Free Consultation → Site Visit → Quotation → Fabrication → Installation.
7. Testimonials marquee (see below).
8. Service areas — chips/grid of Kerala cities/towns.
9. Final CTA band — WhatsApp + Call.

## Services Page

All 11 service categories from the brief, each with anchor id, hero image, bullet sub-services, and per-section WhatsApp CTA prefilled with that service name.

## Projects Page

- Filterable grid (All / Gates / Handrails / Hotel & Bakery / Catering Counters / Wedding & Events / Furniture / Pipe Works).
- Cards open lightbox dialog with larger image + description.
- Mobile: 1 col, Tablet: 2, Desktop: 3 — responsive masonry-ish grid.

## Testimonials

- Marquee component (CSS-animated horizontal scroll, pauses on hover).
- 8–10 testimonials, each with AI-generated realistic Kerala-resembling avatar, name, location, work-type tag, star rating, quote.
- Two rows scrolling opposite directions for visual interest.

## Contact Page

- Click-to-call, click-to-WhatsApp (prefilled message), email link.
- Embedded Google Maps iframe (Vattambalam, Mannarkkad).
- Service-area list and business hours.
- "Request Quote" button → opens WhatsApp with prefilled message (no DB per your choice).

## SEO Strategy

- Per-route `head()` with keyword-rich titles e.g. "SS & MS Steel Fabrication in Kerala | PS Steels Mannarkkad".
- Meta descriptions include core keywords: SS fabrication Kerala, MS steel works, GP pipe works, steel pipe fabrication, handrail works Kerala, gate fabrication, bakery steel work, hotel fabrication, pipe/sheet bending, catering counter fabrication, wedding decoration structure works.
- JSON-LD `LocalBusiness` on home: name, address (Vattambalam, Mannarkkad, Palakkad, Kerala), phone, email, geo, areaServed (list of Kerala cities), services catalog.
- Service-area cities for SEO content + footer + areas section: Mannarkkad, Palakkad, Ottapalam, Perinthalmanna, Malappuram, Kozhikode, Thrissur, Ernakulam/Kochi, Kottayam, Alappuzha, Kollam, Thiruvananthapuram, Kannur, Kasaragod, Wayanad, Pathanamthitta, Idukki, Guruvayur, Shoranur, Pattambi, Cherpulassery, Nilambur, Manjeri, Tirur, Ponnani, Kondotty.
- Semantic HTML, single H1 per page, descriptive alt text, lazy-loaded images, canonical via TanStack head, sitemap route `/sitemap.xml`, `robots.txt`.
- OG images per page for rich social previews (Instagram/Facebook share).
- Footer links to Google Business Profile, Instagram, Facebook (placeholders — you can fill URLs).

## CTAs / Lead Flow

All "Quote", "Consultation", "Site Visit" buttons → `https://wa.me/919747510220?text=<prefilled service-specific message>`. Call buttons → `tel:+919747510220`. *(Note: the phone in your brief was `+91 974751022` — only 9 digits. I'll assume `+91 97475 10220`; please confirm if different.)*

## AI-Generated Visuals (saved to `src/assets/`)

- 1 hero image (workshop / steel fabrication, premium photo style)
- 4 material icons/illustrations (SS, MS, GP Pipe, Steel Pipe) — or use lucide icons + photo backgrounds
- ~12 project photos covering: SS handrails, sliding gate, main gate, balcony railing, staircase, hotel kitchen counter, bakery shelving, catering counter, wedding stage frame, steel furniture, pipe bending sample, sitout structure
- ~10 testimonial avatars (realistic Kerala men/women, varied ages)
- 1 OG/share image (1200×630)

Generated with `fast` tier; hero/OG with `standard`.

## Technical Notes

- Pure frontend; no Cloud/DB.
- Stack: TanStack Start + React 19, Tailwind v4 tokens in `src/styles.css`, shadcn components.
- Constants file `src/lib/site.ts` for phone, WA number, email, address, social links, service-area list, services list, testimonials, projects — single source of truth.
- Reusable components: `Header`, `Footer`, `MobileActionBar`, `WhatsAppFab`, `SectionHeading`, `ServiceCard`, `ProjectCard`, `TestimonialMarquee`, `CtaBand`.

## Out of Scope

- Backend/DB lead storage, admin panel, blog, multi-language, payments. Can be added later.

Ready to build on approval.
