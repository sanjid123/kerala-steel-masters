import { useState } from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";

type T = (typeof TESTIMONIALS)[number];

function CardInner({ t }: { t: T }) {
  return (
    <div className="h-full bg-card border border-border rounded-2xl p-6 shadow-card flex flex-col">
      <div className="flex gap-1 text-orange mb-3">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-orange" />
        ))}
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed line-clamp-6 flex-1">"{t.quote}"</p>
      <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border">
        <img src={t.avatar} alt={t.name} loading="lazy" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-sm text-navy">{t.name}</div>
          <div className="text-xs text-muted-foreground">{t.work} · {t.location}</div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialStack() {
  const [active, setActive] = useState<number | null>(null);
  const items = TESTIMONIALS;

  // Compact stacked overlap on desktop. ~70% overlap.
  const cardW = 300;
  const overlap = 210; // px hidden between cards when idle

  const transformFor = (i: number) => {
    if (active === null) return { x: 0, y: 0, scale: 1, opacity: 1, z: items.length - i };
    const d = i - active;
    if (d === 0) return { x: 0, y: -12, scale: 1.06, opacity: 1, z: 50 };
    const sign = d > 0 ? 1 : -1;
    const mag = Math.abs(d);
    const x = sign * (mag === 1 ? 110 : 170);
    return { x, y: 0, scale: 0.96, opacity: mag >= 2 ? 0.75 : 0.9, z: 20 - mag };
  };

  return (
    <div>
      {/* Desktop: stacked hover-reveal */}
      <div
        className="hidden md:flex justify-center items-start py-10 px-4 min-h-[360px]"
        onPointerLeave={() => setActive(null)}
      >
        <div
          className="relative flex"
          style={{ width: cardW + (items.length - 1) * (cardW - overlap) }}
        >
          {items.map((t, i) => {
            const { x, y, scale, opacity, z } = transformFor(i);
            return (
              <div
                key={i}
                tabIndex={0}
                aria-label={`Testimonial from ${t.name}`}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="absolute top-0 outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-2xl transition-all duration-500 ease-out will-change-transform"
                style={{
                  width: cardW,
                  left: i * (cardW - overlap),
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                  opacity,
                  zIndex: z,
                  boxShadow: active === i ? "0 30px 60px -20px hsl(var(--navy) / 0.35)" : undefined,
                }}
              >
                <CardInner t={t} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: scroll-snap row */}
      <div className="md:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory">
        <div className="flex gap-4 pb-4">
          {items.map((t, i) => (
            <div key={i} className="snap-start shrink-0 w-[280px]">
              <CardInner t={t} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
