import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { SERVICES, SITE, waLink } from "@/lib/site";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaBand } from "@/components/site/CtaBand";
import handrail from "@/assets/project-handrail.jpg";
import gate from "@/assets/project-gate.jpg";
import hotel from "@/assets/project-hotel-kitchen.jpg";
import bakery from "@/assets/project-bakery.jpg";
import catering from "@/assets/project-catering.jpg";
import wedding from "@/assets/project-wedding.jpg";
import furniture from "@/assets/project-furniture.jpg";
import pipe from "@/assets/project-pipe-bending.jpg";
import balcony from "@/assets/project-balcony.jpg";
import sitout from "@/assets/project-sitout.jpg";
import mainGate from "@/assets/project-main-gate.jpg";

const IMAGES: Record<string, string> = {
  "ss-ms-fabrication": handrail,
  "gp-steel-pipe": pipe,
  "handrail-staircase": balcony,
  "gate-sitout": gate,
  "hotel-bakery": hotel,
  "catering-counter": catering,
  "events-decoration": wedding,
  "marriage-decoration": wedding,
  "sheet-pipe-bending": pipe,
  "steel-furniture": furniture,
  "custom-fabrication": mainGate,
};
// Fallback assignments for variety
IMAGES["hotel-bakery"] = hotel;
IMAGES["bakery"] = bakery;
IMAGES["sitout"] = sitout;

export const Route = createFileRoute("/services")({
  head: () => {
    const title = "Services | SS Fabrication, GP Pipe, Handrail, Gate Works — PS Steels Kerala";
    const description =
      "All steel fabrication services from PS Steels, Mannarkkad — SS & MS steel works, GP pipe & steel pipe fabrication, handrails, gates, hotel & bakery fabrication, catering counters, wedding stage works, sheet & pipe bending, steel furniture and custom fabrication across Kerala.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">Our services</div>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-balance max-w-4xl">
            SS & MS steel fabrication, GP pipe and custom steel works
          </h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            Every service is handled in-house with quality materials and precision finishing. Tap any service to see what's included or message us for a free quote.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {SERVICES.map((s, i) => {
          const reverse = i % 2 === 1;
          return (
            <section
              key={s.id}
              id={s.id}
              className={`grid lg:grid-cols-2 gap-10 items-center scroll-mt-24 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="overflow-hidden rounded-3xl shadow-card aspect-[4/3]">
                <img src={IMAGES[s.id] ?? handrail} alt={s.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-steel">
                  Service {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-navy">{s.title}</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.short}</p>
                <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-steel mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={waLink(`Hi PS Steels, I'd like a quote for ${s.title}.`)} target="_blank" rel="noreferrer">
                    <Button className="gap-2 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground">
                      <MessageCircle className="h-4 w-4" /> WhatsApp Quote
                    </Button>
                  </a>
                  <a href={`tel:${SITE.phoneTel}`}>
                    <Button variant="outline" className="gap-2 border-navy/20 text-navy hover:bg-navy hover:text-navy-foreground">
                      <Phone className="h-4 w-4" /> Call now
                    </Button>
                  </a>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <SectionHeading title="" eyebrow="" align="center" className="hidden" />
      <CtaBand title="Got a different requirement?" subtitle="We do custom fabrication on demand. Message us your idea — we'll handle the rest." />
    </>
  );
}
