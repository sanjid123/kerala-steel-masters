## 1. Diversify "What Clients Say" names

Edit `src/lib/site.ts` → `TESTIMONIALS`. Keep locations, work, quotes, ratings and avatar images unchanged — only swap a few names so the list reads as a natural Kerala mix:

1. Ratheesh Kumar — Mannarkkad
2. Mariya Joseph — Palakkad
3. Mohanan Nair — Ottapalam
4. Shibu Varghese — Perinthalmanna
5. Lakshmi Pillai — Thrissur
6. Ar. Faisal Rahman — Kozhikode
7. Anwar Sadath — Malappuram
8. Jiby Thomas — Kollam

## 2. Replace marquee with stacked-card hover reveal (Dribbble-inspired)

Reference: a row of overlapping testimonial cards. Idle state shows a tight stack with only edges peeking. On hover (desktop) or tap/focus, the active card lifts and scales, and the neighbours fan outward to reveal themselves.

### New component `src/components/site/TestimonialStack.tsx`
- One horizontal row of all 8 cards in a single container (no duplicate scroll loop).
- Cards `w-[300px]`, overlapping via negative left margin so the row is compact.
- Track `activeIndex` with `useState`; updated on `onPointerEnter` / `onFocus` per card, cleared on container `onPointerLeave`.
- Per-card transform driven by `distance = index - activeIndex`:
  - `distance === 0` → `scale-[1.06] -translate-y-3 z-30 shadow-elegant ring-1 ring-orange/30`
  - `|distance| === 1` → translate ±90px, slight scale down
  - `|distance| >= 2` → translate ±150px, `opacity-80`
  - no active card → return to compact stacked state
- `transition-all duration-500 ease-out`, `will-change-transform`.
- Reuse existing card markup (avatar + stars + quote + name/work/location) from `TestimonialMarquee`.
- Mobile (`< md`): disable stacking; render as horizontal scroll-snap row (`overflow-x-auto snap-x`) so it stays usable without hover.
- Accessibility: each card is `tabIndex={0}` with `aria-label`, and keyboard focus triggers the same reveal.

### Edit `src/routes/index.tsx`
- Replace `<TestimonialMarquee />` with `<TestimonialStack />` (same section heading and wrapper preserved).

### Cleanup
- Delete `src/components/site/TestimonialMarquee.tsx` (no longer used).

## Out of scope
- Avatar images, section heading copy, surrounding layout.
- No data-shape changes to `TESTIMONIALS`.
