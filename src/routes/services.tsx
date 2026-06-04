import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Phone, MapPin } from "lucide-react";
import { FAQS, SERVICES, SERVICE_AREAS, SITE, waLink } from "@/lib/site";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { CtaBand } from "@/components/site/CtaBand";
import { SectionHeading } from "@/components/site/SectionHeading";
import ssMs from "@/assets/service-ss-ms.jpg.asset.json";
import gpPipe from "@/assets/service-gp-pipe.jpg.asset.json";
import handrail from "@/assets/service-handrail.jpg.asset.json";
import gate from "@/assets/service-gate.jpg.asset.json";
import sitout from "@/assets/service-sitout.jpg.asset.json";
import hotel from "@/assets/service-hotel.jpg.asset.json";
import catering from "@/assets/service-catering.jpg.asset.json";
import events from "@/assets/service-events.jpg.asset.json";
import marriage from "@/assets/service-marriage.jpg.asset.json";
import bending from "@/assets/service-bending.jpg.asset.json";
import furniture from "@/assets/service-furniture.jpg.asset.json";
import custom from "@/assets/service-custom.jpg.asset.json";

const IMAGES: Record<string, string> = {
  "ss-ms-fabrication": ssMs.url,
  "gp-steel-pipe": gpPipe.url,
  "handrail-staircase": handrail.url,
  "gate-sitout": gate.url,
  "hotel-bakery": hotel.url,
  "catering-counter": catering.url,
  "events-decoration": events.url,
  "marriage-decoration": marriage.url,
  "sheet-pipe-bending": bending.url,
  "steel-furniture": furniture.url,
  "custom-fabrication": custom.url,
};
// Keep sitout import referenced for future split into a dedicated service.
void sitout;


// City pools per service for SEO depth
const CITY_POOL = [
  "Mannarkkad", "Palakkad", "Ottapalam", "Perinthalmanna", "Malappuram",
  "Kozhikode", "Thrissur", "Ernakulam", "Kollam", "Thiruvananthapuram",
  "Kottayam", "Kannur", "Wayanad", "Manjeri", "Tirur",
];
function citiesFor(i: number) {
  const start = (i * 3) % CITY_POOL.length;
  const out: string[] = [];
  for (let k = 0; k < 7; k++) out.push(CITY_POOL[(start + k) % CITY_POOL.length]);
  return out;
}

import { canonical, faqLd, servicesLd, breadcrumbLd, absUrl, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => {
    const title = "Steel Fabrication Services in Kerala — PS Steels";
    const description =
      "SS, MS, GP pipe & steel pipe works across Kerala — handrails, gates, hotel & bakery counters, catering counters, custom fabrication. Free quote.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: absUrl("/services") },
        { property: "og:image", content: OG_IMAGE },
      ],
      links: [canonical("/services")],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(faqLd()) },
        { type: "application/ld+json", children: JSON.stringify(servicesLd()) },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ]),
          ),
        },
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
            SS and MS steel fabrication, GP pipe and custom steel works in Kerala
          </h1>
          <p className="mt-4 text-white/70 max-w-3xl">
            Every service is handled in-house with quality materials and precision finishing. From GP pipe works and SS fabrication to MS steel works and custom pipe structures, we deliver across Mannarkkad, Palakkad, Malappuram, Kozhikode, Thrissur, Ernakulam, Kollam and Thiruvananthapuram.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy">
              Trusted steel fabrication partner across Kerala
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              PS Steels and Engineering, based in Vattambalam, Mannarkkad, is a complete steel fabrication workshop covering SS fabrication Kerala, MS steel works, GP pipe works and steel pipe fabrication for residential, commercial and industrial customers. Whether you need a single SS handrail, a heavy MS gate, a hotel kitchen counter or a fully custom GP pipe structure, we deliver the same standard of welding, finishing and on-site installation.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy">
              GP pipe and steel pipe specialists
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Our team specialises in GP pipe fabrication for handrails, gates, balcony railings, roofing structures and decorative pipe works. We also undertake heavy-duty steel pipe fabrication for staircases, industrial supports and custom architectural elements across Palakkad, Malappuram, Kozhikode, Thrissur and surrounding districts.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {SERVICES.map((s, i) => {
          const reverse = i % 2 === 1;
          const cities = citiesFor(i);
          return (
            <section
              key={s.id}
              id={s.id}
              className={`grid lg:grid-cols-2 gap-10 items-center scroll-mt-24 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="overflow-hidden rounded-3xl shadow-card aspect-[4/3]">
                <img src={IMAGES[s.id] ?? handrail.url} alt={`${s.title} in Kerala by PS Steels`} loading="lazy" decoding="async" width={1024} height={768} className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-steel">
                  <span className="h-1.5 w-1.5 rounded-full bg-steel" /> {s.title.split(" ")[0]} works
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
                <div className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 text-steel shrink-0" />
                  <span><span className="font-semibold text-navy/80">Where we serve:</span> {cities.join(", ")} and across Kerala.</span>
                </div>
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

      {/* DEDICATED SEO CONTENT */}
      <section className="bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 space-y-14">
          <SectionHeading
            eyebrow="Specialisations"
            title="Steel fabrication keywords we own across Kerala"
            description="A closer look at the materials and works we are best known for, with the cities we cover most often."
          />

          <article className="grid lg:grid-cols-2 gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy">GP Pipe Works in Kerala</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Galvanized (GP) pipe is the most cost effective material for handrails, gates, sitout structures, roofing supports and compound works. PS Steels fabricates GP pipe works in Mannarkkad, Palakkad, Ottapalam, Perinthalmanna, Malappuram, Manjeri, Kozhikode and across Kerala, with bend-precision and powder-coated finishing for long life.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We use industry-standard GI pipes in round and square sections, ensuring rust resistance and structural strength suited to Kerala's climate. Whether it is a balcony railing for a private home or large GP pipe structures for sheds and shops, we deliver clean welds and on-time installation.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy">SS Fabrication across Kerala</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Stainless steel (Grade 304 and 316) fabrication is at the heart of our work, from mirror-finish SS handrails and balcony railings to commercial SS kitchen counters, bakery display units, catering counters and decorative steel art.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Our SS fabrication services are trusted by homeowners, architects, hoteliers and bakery owners across Thrissur, Ernakulam, Kochi, Kollam and Thiruvananthapuram. Every SS job goes through quality MIG and TIG welding, surface polishing and final inspection before installation.
              </p>
            </div>
          </article>

          <article className="grid lg:grid-cols-2 gap-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy">MS Steel Works in Mannarkkad and Palakkad</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Mild steel (MS) is the workhorse for gates, grills, structural supports, frames and heavy duty fabrication. Our MS steel works in Mannarkkad and Palakkad cover main gates, sliding gates, compound grills, steel doors, staircases, sheds and industrial frames, all powder coated or painted for long life.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                We undertake both single home requirements and bulk MS fabrication contracts for builders, contractors and event teams across central and northern Kerala.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy">Steel Pipe Fabrication for Homes, Hotels and Industries</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                From decorative steel pipe handrails to industrial steel pipe structures, we offer end-to-end steel pipe fabrication including custom bending, cutting, welding and finishing. Hotels, bakeries, catering teams and wedding decorators across Kerala rely on us for steel pipe frames that are strong, safe and reusable.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Combined with our sheet bending and pipe bending facility, we can deliver complex custom shapes that other workshops cannot, all from a single point of contact.
              </p>
            </div>
          </article>

          {/* SERVICE CITY CHIPS */}
          <div>
            <h3 className="font-display text-xl font-bold text-navy mb-4">Cities we serve for SS, MS, GP pipe and steel pipe works</h3>
            <div className="flex flex-wrap gap-2">
              {SERVICE_AREAS.map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-3.5 py-1.5 text-xs sm:text-sm text-foreground/80">
                  <MapPin className="h-3 w-3 text-steel" /> {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="Frequently asked"
          title="Questions about our steel fabrication services"
          align="center"
        />
        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-display font-semibold text-navy hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <CtaBand title="Got a different requirement?" subtitle="We do custom fabrication on demand. Message us your idea and we will handle the rest." />
    </>
  );
}
