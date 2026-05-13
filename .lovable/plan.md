# Adopt Builto-style Hero (Scoped to Hero Only)

The reference hero on builto-demo/demo1 has a few distinctive moves we'll borrow, while keeping our navy/orange brand, our copy, and the rest of the homepage untouched.

## What we're keeping from the reference
- **Full-bleed photographic background** with a clean sky/site image (no heavy navy overlay washing it out).
- **Small eyebrow line** with a dot/dash bullet ("LET US HELP YOU CREATE.").
- **Oversized display word** as the visual anchor ("BUILDING"), with a **sliding white reveal mask** sweeping across the letters as a subtle hero animation.
- **Right-bottom slider arrows** (decorative carousel cue) — we'll keep them as static prev/next buttons that rotate the display word through 3 brand keywords.
- **Generous vertical breathing room** (~85vh) so the hero feels cinematic.

## What we're keeping from our current site
- All copy facts (Mannarkkad, Kerala, SS/MS/GP, free consultation chips).
- WhatsApp + Call CTAs exactly as today.
- Brand tokens: `navy`, `orange`, `whatsapp`, `gradient-hero`. **No new colors.**
- Header, MaterialsStrip, and every section below the hero are untouched.

## New hero structure

```text
┌──────────────────────────────────────────────────────────────┐
│  [photo bg + soft navy gradient on left 55%]                 │
│                                                              │
│  • LET US BUILD WITH YOU                                     │
│                                                              │
│  ╔══════════════════════════════════╗                        │
│  ║  FABRICATING                     ║  ← oversized display   │
│  ╚══════════════════════════════════╝     word w/ reveal mask│
│   Steel · Pipe · Structure  (rotates)                        │
│                                                              │
│  Short supporting paragraph (existing copy, trimmed)         │
│                                                              │
│  [WhatsApp for Quote]  [Call 9876…]                          │
│                                                              │
│  • Free Consultation  • Free Site Visit  • Custom Quote      │
│                                                              │
│                                       ◀  ▶   01 / 03         │
└──────────────────────────────────────────────────────────────┘
```

## Implementation details (technical)

- Edit only the `{/* HERO */}` block in `src/routes/index.tsx` (lines 70–115). No other files change.
- Replace the static `<h1>` with a two-line layout:
  - Line 1: small eyebrow with orange dot.
  - Line 2: `<span class="hero-bigword">{word}</span>` — `font-display`, `text-6xl sm:text-7xl lg:text-8xl`, tracking-tight.
- **Reveal-mask animation** via Tailwind + a tiny keyframe added inline to `src/styles.css`:
  - `@keyframes hero-sweep { 0% { background-position: -120% 0 } 100% { background-position: 220% 0 } }`
  - Applied to `.hero-bigword` as a `linear-gradient(100deg, transparent 40%, hsl(0 0% 100% / .85) 50%, transparent 60%)` background-clip:text overlay; runs every 5s, respects `prefers-reduced-motion`.
- **Word rotator**: local `useState` cycling through `["FABRICATING", "WELDING", "INSTALLING"]` every 4s; arrow buttons increment/decrement; counter shows `01 / 03`. Keyboard arrows + pause on hover.
- Reduce dark overlay so the image reads more like the reference: gradient becomes `from-navy/85 via-navy/55 to-transparent` (left-anchored) instead of covering the whole frame.
- Hero height: `min-h-[78vh] lg:min-h-[86vh]`, content vertically centered.
- Keep CTAs and trust chips exactly as today, only repositioned inside the new flex column.

## Out of scope
- No header/nav changes, no new fonts, no new color tokens.
- No changes to MaterialsStrip, Process, Values, Projects, Testimonials, CTA band, Footer.
- No new dependencies (animation is pure CSS).
- No swap of the hero image asset (still `hero-workshop.jpg`).

## Risk
Very low — change is confined to one JSX block plus ~6 lines of CSS keyframes. Fallback (no JS) still renders a static oversized word and all CTAs.
