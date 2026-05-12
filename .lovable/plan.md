## Goal
Refine the service cards (homepage "What we do" grid) with a subtle, low-opacity background image relevant to each service so they feel modern and visually attractive — text stays primary.

Selected direction: **v1 — Light · Subtle Image** (white card, ~5% opacity grayscale background image, brightens to ~10% on hover, lift + shadow on hover, orange dot, navy title).

## Changes

### 1. `src/lib/site.ts`
- Add an optional `image?: string` field to each `Service` in `SERVICES`, mapped to existing assets in `src/assets/`:
  - `ss-ms-fabrication` → `hero-workshop.jpg`
  - `gp-steel-pipe` → `project-gp-pipe.jpg`
  - `handrail-staircase` → `project-handrail.jpg`
  - `gate-sitout` → `project-main-gate.jpg`
  - `hotel-bakery` → `project-hotel-kitchen.jpg`
  - `catering-counter` → `project-catering.jpg`
  - `events-decoration` → `project-wedding.jpg`
  - `marriage-decoration` → `project-wedding.jpg`
  - `sheet-pipe-bending` → `project-pipe-bending.jpg`
  - `steel-furniture` → `project-furniture.jpg`
  - `custom-fabrication` → `project-balcony.jpg`
- Reuses existing assets — no new image generation needed.

### 2. `src/routes/index.tsx` — service grid (lines ~148–166)
Update each `<Link>` card to:
- Add `relative overflow-hidden` to the card.
- Insert an absolutely-positioned `<img>` background: `absolute inset-0 h-full w-full object-cover opacity-[0.06] grayscale group-hover:opacity-[0.12] transition-opacity duration-300 pointer-events-none`.
- Add a soft white gradient overlay above the image for legibility: `absolute inset-0 bg-gradient-to-br from-card via-card/85 to-card/70 pointer-events-none`.
- Wrap existing content (dot+title, description, View details) in a `relative z-10` div so it sits above the image.
- Add hover lift: append `hover:-translate-y-1` to existing transition classes.
- Switch the orange-style accent: change the dot color from `bg-steel` to `bg-orange` to match the chosen direction (small visual upgrade, brand-consistent).

### 3. `src/routes/services.tsx` — leave the long detail sections alone
The deep service sections already use full hero images per service, so no change needed there. Out of scope.

### Out of scope
- Materials row (image 5: SS Steel / MS Steel / GP Pipe / Steel Pipe). Can be done in a follow-up if the user wants the same treatment there.
- Generating new bespoke images per service (existing project photos work well).
- Layout, copy length, or routing changes.

## Visual QA
After edits, view the home page in preview, scroll to the "Steel fabrication services for every need" section, and confirm:
- Each card shows a faint relevant image behind the text.
- Text contrast is fully legible on all cards.
- Hover lifts the card and slightly intensifies the image.
