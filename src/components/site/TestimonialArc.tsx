import { useEffect, useRef, useState, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";

const VISIBLE = 5; // 2 above, active, 2 below
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

  const half = Math.floor(VISIBLE / 2);
  // Build visible window indices [-half..+half] relative to active
  const visible = Array.from({ length: VISIBLE }, (_, i) => {
    const offset = i - half;
    return { offset, index: mod(active + offset, items.length) };
  });

  const activeT = items[active];

  // Sizing per offset distance
  const sizeFor = (d: number) => {
    const a = Math.abs(d);
    if (a === 0) return { box: 64, indent: 0, opacity: 1, nameClass: "text-base font-bold text-navy", show: true };
    if (a === 1) return { box: 44, indent: 28, opacity: 0.85, nameClass: "text-sm font-semibold text-navy/90", show: true };
    return { box: 36, indent: 64, opacity: 0.55, nameClass: "text-xs font-medium text-muted-foreground", show: true };
  };

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
      <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left: arc list */}
        <div className="md:col-span-5 relative">
          <svg
            aria-hidden
            className="absolute inset-y-0 left-0 h-full w-24 pointer-events-none hidden md:block"
            viewBox="0 0 100 400"
            preserveAspectRatio="none"
          >
            <path
              d="M 80 0 Q 0 200 80 400"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.18"
              strokeWidth="1"
              strokeDasharray="3 5"
              className="text-navy"
            />
          </svg>

          <ul className="relative flex flex-col gap-4 md:gap-5 py-2">
            {visible.map(({ offset, index }) => {
              const t = items[index];
              const { box, indent, opacity, nameClass } = sizeFor(offset);
              const isActive = offset === 0;
              return (
                <li
                  key={`${index}-${offset}`}
                  className="transition-all duration-500 ease-out"
                  style={{ transform: `translateX(${indent}px)`, opacity }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    onFocus={() => setActive(index)}
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
                      <div className={`${nameClass} truncate transition-colors`}>{t.name}</div>
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                        <span className="flex text-orange">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-orange" />
                          ))}
                        </span>
                        <span className="ml-1 truncate">{t.work} · {t.location}</span>
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
            className="absolute -top-6 -left-2 md:-left-6 text-7xl md:text-8xl leading-none font-serif text-orange/40 select-none"
          >
            “
          </span>
          <div key={active} className="animate-fade-in pl-6 md:pl-12">
            <p className="font-serif italic text-lg md:text-2xl leading-relaxed text-foreground/90">
              {activeT.quote}
            </p>
            <div className="mt-6 text-sm text-muted-foreground">
              <span className="font-semibold text-navy">{activeT.name}</span>
              <span className="mx-2">·</span>
              <span>{activeT.work}, {activeT.location}</span>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="h-9 w-9 rounded-full border border-border bg-card hover:bg-muted text-navy flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="h-9 w-9 rounded-full border border-border bg-card hover:bg-muted text-navy flex items-center justify-center transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="ml-3 text-xs text-muted-foreground tabular-nums">
              {active + 1} / {items.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
