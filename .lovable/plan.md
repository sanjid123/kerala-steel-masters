## 1. Hero explorer — show suggestions inside the box

In `src/components/site/ServiceAreaExplorer.tsx`:
- Suggestions dropdown is currently `position: absolute` and gets clipped because the wrapper has `overflow-hidden`. Remove `overflow-hidden` from the outer container.
- Also drop `sm:right-[7.5rem]` so the panel spans full width under the input/button row, matching the screenshot width.
- Result: typing "678583" shows the live suggestion list inside the same dark card.

## 2. Result page — remove "Post Office" column and "WhatsApp about <pin>"

In `src/components/site/ServiceAreaResult.tsx` (`FoundResult`):
- Remove the third `<Detail label="Post Office" …>` cell; change grid from `sm:grid-cols-3` to `sm:grid-cols-2`.
- Remove the secondary "WhatsApp about {pincode}" outline button entirely. Keep the primary "View Steel Fabrication in {city}" button and the "Call …" button. (One WhatsApp CTA is enough — the floating WhatsApp FAB and header still cover that intent.)

## 3. Hero image — make slightly more visible

In `src/routes/index.tsx` hero `<img>` and overlay:
- Bump image opacity from `opacity-40` → `opacity-60`.
- Soften overlay from `from-navy via-navy/85 to-navy/40` → `from-navy/85 via-navy/60 to-navy/20` so the workshop photo reads through on the right side while text on the left stays legible.

## 4. Footer — add "We accept" payments strip

Generate a single transparent PNG at `src/assets/payments-strip.png` (~1200×80) using imagegen (premium, transparent bg) containing white/light monochrome logos in this order: UPI · Google Pay · PhonePe · Paytm · Net Banking · Visa · RuPay · Mastercard · Razorpay. Monochrome keeps it footer-safe on navy and avoids brand-color clash.

In `src/components/site/Footer.tsx`, add a new row between the 4-col grid and the "Coverage band":

```text
┌──────────── max-w-7xl ────────────┐
│  We accept   [logos strip image]  │
└───────────────────────────────────┘
```

- Small uppercase label "We accept" on the left (text-white/60, tracking-wider).
- `<img>` of the strip, `h-6 sm:h-7 w-auto`, `loading="lazy"`, `decoding="async"`, alt "Accepted payment methods: UPI, Google Pay, PhonePe, Paytm, Net Banking, Visa, RuPay, Mastercard, Razorpay".
- Wrap in `border-t border-white/10` for visual separation.

## Technical notes
- No routing, schema, or business-logic changes.
- All four edits are small and isolated to 4 files + 1 new asset.
- Image generated as transparent PNG so it sits cleanly on the navy footer.
