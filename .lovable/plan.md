## Goal

Refine `TestimonialArc` to match the uploaded reference more faithfully. The current build shows 5 items and prev/next controls; the reference shows only 3 (prev, active, next) on a clean vertical curved line, with a calmer right-hand quote.

## Changes to `src/components/site/TestimonialArc.tsx`

### Left column (arc list)
- Show only **3 visible items** at a time: previous, active, next (instead of 5).
- Replace the background dashed SVG with a **single vertical curved line** that actually threads through the three avatars:
  - SVG sits absolutely behind the list, full height of the column.
  - Path: gentle bezier that bulges right at the active row, e.g. `M 40 0 C 40 50%, 90 50%, 40 100%` so the curve passes through the indented active avatar.
  - `stroke-navy/20`, `stroke-width:1`, no dashes — solid hairline.
- Indent direction reversed to match reference: **active pushes right (toward the quote)**, neighbours sit further left.
  - active: `translateX(48px)`, neighbour: `translateX(0)`.
- Sizes: active avatar `72px`, neighbours `44px`.
- Active row: name `text-lg font-bold text-navy`, neighbours `text-sm font-medium text-navy/80`.
- Microcopy under name: green star + `4.9` + muted `· {work} · {location}` (single line, truncate). Drop the row of 5 stars — reference shows one star + score.

### Right column (quote)
- Remove prev/next buttons and the `1 / N` counter. Auto-rotate + click on left avatars is enough; reference has no controls.
- Keep large serif italic quote and the oversized `“` glyph.
- Tighten attribution to one muted line: `— {name}, {location}`.
- Keep `aria-live="polite"` and crossfade on change.

### Behaviour
- Auto-advance every 4.5s, pause on hover/focus (unchanged).
- Clicking a neighbour avatar makes it active (unchanged).
- Keyboard arrow nav stays for a11y, but no visible buttons.
- Honour `prefers-reduced-motion` (unchanged).

### Mobile (`< md`)
- Stack vertically: the 3-item arc on top (curve still visible), quote below.
- Reduce active avatar to `64px`, neighbour to `40px`, indent to `28px`.

## Out of scope
- No data changes (`TESTIMONIALS` stays as-is).
- No changes to surrounding section heading, theme tokens, or other components.
