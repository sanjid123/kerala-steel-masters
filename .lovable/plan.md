## Plan

### 1. Footer cleanup
- Remove the entire "We accept" payments strip block from `src/components/site/Footer.tsx` (the bordered div containing `paymentsStrip`).
- Drop the now-unused `paymentsStrip` import.

### 2. Regenerate service images (premium quality, photoreal)
Replace these existing assets with new AI-generated images:

- **`src/assets/project-handrail.jpg`** — used by the "SS & MS Steel Fabrication" card and the projects grid "Curved SS Handrail, Private Villa". New shot: a polished stainless steel curved handrail along a modern villa staircase, bright daylight, architectural photography, no people.
- **`src/assets/project-pipe-bending.jpg`** — used for both "Sheet Bending & Pipe Bending" and "GP Pipe & Steel Pipe Works". Since these need different visuals, split into two files:
  - Keep `project-pipe-bending.jpg` → regenerate as a workshop scene of precision pipe/sheet bending (CNC bender, bent metal pipes stack, sparks/industrial mood).
  - Add new **`src/assets/project-gp-pipe.jpg`** → GP pipe structure (galvanized steel pipe handrail/balcony railing or shed structure on a Kerala building exterior).
- Update `IMAGES["gp-steel-pipe"]` in `src/routes/services.tsx` to point to the new `project-gp-pipe.jpg` import.

All images generated at 1280×960, jpg, premium quality.

### Files touched
- `src/components/site/Footer.tsx` (remove payments strip)
- `src/assets/project-handrail.jpg` (regenerate)
- `src/assets/project-pipe-bending.jpg` (regenerate)
- `src/assets/project-gp-pipe.jpg` (new)
- `src/routes/services.tsx` (swap GP pipe image import)

Out of scope: any other layout/copy changes.