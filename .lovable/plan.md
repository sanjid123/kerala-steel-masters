## Goal

Bring the Services page in this project visually in line with the live site `pssteels.in/services` by replacing each service card's image with the corresponding image used on production.

## What lives on the live site (12 service images)

| Service (live) | Image filename on live |
|---|---|
| SS & MS Steel Fabrication | `ss-ms-fabrication-800` |
| GP Pipe & Steel Pipe Works | `gp-pipe-branded-800` |
| Handrail & Staircase Works | `staircase-handrail-800` |
| Gate Works | `main-gate-800` |
| Sitout Works | `kerala-sitout-800` |
| Hotel & Bakery Fabrication | `proj-hotel-branded-800` |
| Catering Counter Fabrication | `catering-counter-new-800` |
| Event & Decoration Steel Works | `events-decoration-branded-800` |
| Marriage Decoration Works | `wedding-decoration-800` |
| Sheet & Pipe Bending | `sheet-pipe-bending-branded-800` |
| Steel Furniture Works | `steel-furniture-800` |
| Custom Fabrication on Demand | `custom-fabrication-800` |

The current project has 11 services — Gate Works and Sitout Works are combined as a single `gate-sitout` service. Out of scope of this plan: I'll keep the existing 11-service structure and use the Gate Works image for the combined card. (If you want, in a follow-up I can split it into two separate services to fully match live.)

## Steps

1. **Download** all 12 production images from `https://pssteels.in/assets/…` into `src/assets/` with clean names:
   - `service-ss-ms.jpg`, `service-gp-pipe.jpg`, `service-handrail.jpg`, `service-gate.jpg`, `service-sitout.jpg`, `service-hotel.jpg`, `service-catering.jpg`, `service-events.jpg`, `service-marriage.jpg`, `service-bending.jpg`, `service-furniture.jpg`, `service-custom.jpg`.
2. **Upload** each image via `lovable-assets` so they're served from CDN (keeps repo light), then delete the local source files. Component imports the generated `.asset.json` pointers.
3. **Update `src/routes/services.tsx`** — replace the existing `IMAGES` map and asset imports so each service id maps to its new live-matching image:
   - `ss-ms-fabrication` → service-ss-ms
   - `gp-steel-pipe` → service-gp-pipe
   - `handrail-staircase` → service-handrail
   - `gate-sitout` → service-gate (sitout image kept available for future split)
   - `hotel-bakery` → service-hotel
   - `catering-counter` → service-catering
   - `events-decoration` → service-events
   - `marriage-decoration` → service-marriage
   - `sheet-pipe-bending` → service-bending
   - `steel-furniture` → service-furniture
   - `custom-fabrication` → service-custom
4. **Keep alt text + dimensions** as they are. No copy, layout, SEO, or routing changes.
5. **Projects page** is untouched.

## Out of scope

- Splitting `gate-sitout` into two service entries (ask if you want this).
- Updating Projects gallery images.
- Any copy / SEO / structural changes.

## Files to edit

- `src/routes/services.tsx` (imports + IMAGES map)
- New: `src/assets/service-*.jpg.asset.json` (×12)
