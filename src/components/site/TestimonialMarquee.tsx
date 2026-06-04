import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <article className="w-[320px] sm:w-[380px] shrink-0 bg-card border border-border rounded-2xl p-6 shadow-card mr-5">
      <div className="flex gap-1 text-orange mb-3">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-orange" />
        ))}
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed line-clamp-5">"{t.quote}"</p>
      <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border">
        <img src={t.avatar} alt={t.name} loading="lazy" decoding="async" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-sm text-navy">{t.name}</div>
          <div className="text-xs text-muted-foreground">{t.work} · {t.location}</div>
        </div>
      </div>
    </article>
  );
}

export function TestimonialMarquee() {
  const row1 = TESTIMONIALS.slice(0, 4);
  const row2 = TESTIMONIALS.slice(4);
  return (
    <div className="space-y-5 marquee-pause">
      <div className="marquee-mask overflow-hidden relative">
        <div className="marquee-track">
          {[...row1, ...row1].map((t, i) => <Card key={`a-${i}`} t={t} />)}
        </div>
      </div>
      <div className="marquee-mask overflow-hidden relative">
        <div className="marquee-track-reverse">
          {[...row2, ...row2].map((t, i) => <Card key={`b-${i}`} t={t} />)}
        </div>
      </div>
    </div>
  );
}
