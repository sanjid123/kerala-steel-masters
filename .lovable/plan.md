## Goal

Rebuild the "What Clients Say" section to match the uploaded reference: a vertical arc of avatars on the left (active one enlarged in the center) + the active testimonial quote on the right. Auto-rotates, click/hover to focus.

## Reference layout (from video)

```
 ┌──────────────────────────────────────────────────────┐
 │  ── Section eyebrow                                   │
 │  Customer Reviews                                     │
 │                                                       │
 │    ◯  Name (small)                                    │
 │       ★ rating · location                             │
 │                          ❝                            │
 │   ◉◉  NAME (large, bold)     They have awesome        │
 │       ★ rating · location    customer service…        │
 │                              — quote in serif italic  │
 │    ◯  Name (small)                                    │
 │       ★ rating · location                             │
 └──────────────────────────────────────────────────────┘
```

Avatars sit on a faint curved guide line (subtle SVG arc). The middle/active avatar is ~1.6× larger. Above and below it, two neighbours are smaller and slightly indented along the arc. Switching active item slides the arc up/down so the new active is always centered.

## New component `src/components/site/TestimonialArc.tsx`

- Props: none (reads from `TESTIMONIALS` in `src/lib/site.ts`).
- State: `activeIndex` (number), `paused` (bool).
- Auto-advance every 4.5s (`setInterval`); pauses on hover/focus within the section.
- Two columns on `md+`:
  - Left (`md:col-span-5`): arc list. Renders 5 visible items — `[active-2, active-1, active, active+1, active+2]` (modular). Each item is an avatar + name + rating row.
    - Position offsets along arc using inline `transform: translateX(...)` based on distance from center: `|d|=0` → 0px, `|d|=1` → 24px, `|d|=2` → 60px (creates the curved indent).
    - Sizes: active `h-16 w-16` + `text-lg font-bold`; neighbours `h-10 w-10` + `text-sm`; outer `h-9 w-9 opacity-60`.
    - Subtle SVG arc behind avatars (`stroke-border`, dashed) connecting them visually.
    - Click / focus an item → set as active.
    - `transition-all duration-500 ease-out`.
  - Right (`md:col-span-7`): big serif italic quote with a large `❝` glyph, then attribution (work · location). Crossfade on change (`key={activeIndex}` + `animate-fade-in`).
- Mobile (`< md`): single column. Arc collapses to a horizontal centered row of 5 avatars on top; quote below. Same active/neighbour sizing logic.
- Accessibility:
  - Container has `aria-roledescription="carousel"` and `aria-live="polite"` on the quote region.
  - Each avatar button is a real `<button>` with `aria-label="Show testimonial from {name}"` and `aria-pressed={active}`.
  - Prev/Next buttons (small, bottom-right of quote) for keyboard users; `←/→` arrow keys also navigate when section is focused.
- Honour `prefers-reduced-motion`: skip auto-advance and use opacity-only transitions.

## Edit `src/routes/index.tsx`

- Swap `<TestimonialStack />` for `<TestimonialArc />`. Keep the existing `SectionHeading` and section wrapper.

## Cleanup

- Delete `src/components/site/TestimonialStack.tsx` (no longer used).

## Out of scope

- No changes to `TESTIMONIALS` data shape, names, avatars, or quotes.
- No changes to other sections, theme tokens, or routing.
