## Why the logo looks like it has a white border

The current `src/assets/ps-steels-logo.png` is saved as **RGB (no alpha channel) with a solid white background** (corner pixels are `(255,255,255)`). So even though we call it "transparent," the browser is rendering an opaque white rectangle behind the artwork — that is the "white border" you see in the navbar (especially against the slightly translucent/blurred background while scrolling) and the white chip in the footer.

## Plan

1. **Regenerate `src/assets/ps-steels-logo.png` as a true transparent PNG (RGBA)**
   - Use `imagegen--edit_image` on `src/assets/ps-steels-logo-original.png` with a strict prompt: remove the white background completely, output transparent PNG, keep all original brand colors (navy "PS", blue shadow, orange/black welding torch, orange spark, navy "PS STEELS", blue "& ENGINEERING"), preserve clean anti-aliased edges, no white halo.
   - Verify in code with PIL that the output is mode `RGBA` and corner pixels have alpha `0`. If not, re-run once with a stronger prompt.

2. **Header (`src/components/site/Header.tsx`)** — no markup change needed; once the PNG is truly transparent the white box disappears against the `bg-background/80` navbar.

3. **Footer (`src/components/site/Footer.tsx`)** — remove the white `bg-white rounded-lg px-3 py-2 shadow-sm` chip wrapper that was added as a workaround, so the logo sits directly on the navy footer. Because the logo's "PS" letters and "PS STEELS" wordmark are dark navy (invisible on navy), use a light variant for the footer:
   - Option A (preferred, no extra asset): apply a CSS filter to lighten only the dark parts — e.g. wrap in `<img className="h-12 w-auto brightness-0 invert opacity-90" />`. This flattens the brand colors but the mark stays recognizable and clean on dark.
   - Option B: generate a second asset `src/assets/ps-steels-logo-light.png` where the navy text is recolored to white/light while keeping the orange torch + spark accents, and use it only in the footer.
   - Default to **Option B** so the orange accent is preserved in the footer too.

4. **Quick visual QA**: take a preview screenshot of the home page header (scrolled) and footer to confirm no white box and good legibility on both light and dark backgrounds.

## Out of scope
- Navbar layout, colors, or scroll behavior changes.
- Any other pages or assets.
