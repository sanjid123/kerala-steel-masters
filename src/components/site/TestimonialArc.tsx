import { useEffect, useRef, useState, useCallback } from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";

const AUTO_MS = 4500;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export function TestimonialArc() {
  const items = TESTIMONIALS;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => setActive((i) => mod(i + 1, items.length)), [items.length]);
  const prev = useCallback(() => setActive((i) => mod(i - 1, items.length)), [items.length]);

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(next, AUTO_MS);
    return () => clearInterval(id);
  }, [paused, reduced, next]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  // Three visible items: prev, active, next
  const visible = [-1, 0, 1].map((offset) => ({
    offset,
    index: mod(active + offset, items.length),
  }));

  const activeT = items[active];

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKey}
      tabIndex={-1}
      aria-roledescription="carousel"
    >
      <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-center">
        {/* Left: arc list */}
        <div className="md:col-span-5 relative">
          {/* Curved guide line */}
          <svg
            aria-hidden
            className="absolute inset-0 w-full h-full pointer-events-none text-navy"
            viewBox="0 0 200 300"
            preserveAspectRatio="none"
          >
            <path
              d="M 40 10 C 40 90, 130 110, 130 150 C 130 190, 40 210, 40 290"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.18"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ul className="relative flex flex-col gap-6 md:gap-8 py-2">
            {visible.map(({ offset, index }) => {
              const t = items[index];
              const isActive = offset === 0;
              const box = isActive ? 72 : 44;
              const indent = isActive ? 48 : 0;
              return (
                <li
                  key={`${index}-${offset}`}
                  className="transition-all duration-500 ease-out"
                  style={{ transform: `translateX(${indent}px)` }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-pressed={isActive}
                    aria-label={`Show testimonial from ${t.name}`}
                    className="group flex items-center gap-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-full pr-3"
                  >
                    <img
                      src={t.avatar}
                      alt={t.name}
                      width={box}
                      height={box}
                      loading="lazy"
                      className="rounded-full object-cover ring-2 ring-background shadow-card transition-all duration-500"
                      style={{ width: box, height: box }}
                    />
                    <div className="min-w-0">
                      <div
                        className={
                          isActive
                            ? "text-lg font-bold text-navy transition-colors"
                            : "text-sm font-medium text-navy/80 transition-colors"
                        }
                      >
                        {t.name}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1">
                        <Star className="h-3 w-3 fill-orange text-orange" />
                        <span className="font-semibold text-navy/80">{t.rating}.0</span>
                        <span className="mx-1">·</span>
                        <span className="truncate">{t.work} · {t.location}</span>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: quote */}
        <div className="md:col-span-7 relative" aria-live="polite">
          <span
            aria-hidden
            className="absolute -top-8 -left-2 md:-left-4 text-8xl leading-none font-serif text-orange/40 select-none"
          >
            “
          </span>
          <div key={active} className="animate-fade-in pl-8 md:pl-12">
            <p className="font-serif italic text-lg md:text-2xl leading-relaxed text-foreground/90">
              {activeT.quote}
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              — <span className="font-semibold text-navy">{activeT.name}</span>, {activeT.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
