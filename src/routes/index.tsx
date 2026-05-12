import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, MessageCircle, Phone, ShieldCheck, Truck, Wrench, MapPin,
  Sparkles, FileText, Hammer, Factory,
} from "lucide-react";
import heroImg from "@/assets/hero-workshop.jpg";
import ogImage from "@/assets/og-image.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaBand } from "@/components/site/CtaBand";
import { TestimonialMarquee } from "@/components/site/TestimonialMarquee";
import { PROJECTS, SERVICE_AREAS, SERVICES, SITE, waLink } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => {
    const title = "PS Steels & Engineering | SS, MS, GP Pipe Fabrication in Kerala";
    const description =
      "Custom SS & MS steel fabrication, GP pipe & steel pipe works, handrails, gates, hotel & bakery fabrication and catering counters across Kerala. Free consultation, site visit & quotation.";
    const ld = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: SITE.name,
      image: ogImage,
      telephone: SITE.phoneTel,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.line1,
        addressLocality: "Mannarkkad",
        addressRegion: "Kerala",
        postalCode: SITE.address.postal,
        addressCountry: "IN",
      },
      areaServed: SERVICE_AREAS.map((a) => ({ "@type": "City", name: a })),
      url: "/",
      priceRange: "₹₹",
      openingHours: "Mo-Sa 08:30-19:30",
    };
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(ld) },
      ],
    };
  },
  component: Home,
});

const MATERIALS = [
  { name: "SS Steel", desc: "Grade 304 / 316 stainless steel" },
  { name: "MS Steel", desc: "Mild steel for heavy structures" },
  { name: "GP Pipe", desc: "Galvanized pipe, long-lasting" },
  { name: "Steel Pipe", desc: "Round & square steel pipes" },
];

const PROCESS = [
  { icon: MessageCircle, title: "Free Consultation", desc: "Share your idea via WhatsApp or call." },
  { icon: MapPin, title: "Site Visit", desc: "We visit and take measurements." },
  { icon: FileText, title: "Quotation", desc: "Transparent quote, no hidden costs." },
  { icon: Hammer, title: "Fabrication", desc: "Custom built in our workshop." },
  { icon: Truck, title: "Installation", desc: "Delivered & installed at your site." },
];

const VALUES = [
  { icon: Wrench, title: "Custom Fabrication", desc: "Built exactly to your design, size and site." },
  { icon: ShieldCheck, title: "Quality Finishing", desc: "Precision welding, polishing & powder coating." },
  { icon: Truck, title: "On-Time Delivery", desc: "Promised timelines, honored every time." },
  { icon: Factory, title: "Kerala-wide Service", desc: "Workshops in Mannarkkad, projects across Kerala." },
];

function Home() {
  const featured = PROJECTS.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-white">
        <img
          src={heroImg}
          alt="Stainless steel handrail being welded in PS Steels workshop, Kerala"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-navy via-navy/85 to-navy/40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-orange" />
              Mannarkkad · Palakkad · Serving all Kerala
            </div>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance">
              Complete <span className="text-orange">SS & MS</span> Steel
              <br className="hidden sm:block" /> Fabrication Across Kerala
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed">
              Custom fabrication and steel works in SS Steel, MS Steel, GP Pipe and Steel Pipe, designed and manufactured to your exact requirement with quality finishing and durable materials.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={waLink("Hi PS Steels, I'd like a free quotation.")} target="_blank" rel="noreferrer">
                <Button size="lg" className="h-12 px-6 gap-2 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground">
                  <MessageCircle className="h-5 w-5" /> WhatsApp for Quote
                </Button>
              </a>
              <a href={`tel:${SITE.phoneTel}`}>
                <Button size="lg" variant="outline" className="h-12 px-6 gap-2 bg-white/0 border-white/30 text-white hover:bg-white hover:text-navy">
                  <Phone className="h-5 w-5" /> Call {SITE.phoneDisplay}
                </Button>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              {["Free Consultation", "Free Site Visit", "Custom Quotation"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MATERIALS STRIP */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {MATERIALS.map((m) => (
            <div key={m.name} className="text-center md:text-left p-4 rounded-xl hover:bg-muted transition">
              <div className="font-display font-bold text-navy text-xl">{m.name}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="What we do"
          title="Steel fabrication services for every need"
          description="From SS handrails and gates to commercial kitchens, catering counters and wedding stage frames, we cover every major fabrication category."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <Link
              key={s.id}
              to="/services"
              hash={s.id}
              className="group block bg-card border border-border rounded-2xl p-6 hover:border-steel hover:shadow-card transition"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md bg-navy/5 text-navy flex items-center justify-center font-display font-bold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display font-bold text-lg text-navy">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.short}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-steel group-hover:gap-2 transition-all">
                View details <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Recent work"
              title="Projects across Kerala"
              description="A glimpse of recent fabrication works delivered to homes, hotels, bakeries and event teams."
            />
            <Link to="/projects" className="text-sm font-semibold text-steel hover:text-navy inline-flex items-center gap-1">
              View all projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p) => (
              <article key={p.id} className="group overflow-hidden rounded-2xl bg-card border border-border shadow-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" width={1024} height={768}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-steel">{p.category}</div>
                  <h3 className="mt-1.5 font-display font-bold text-navy">{p.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading
          eyebrow="Why PS Steels"
          title="Built right. Delivered on time."
          align="center"
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-card transition">
              <div className="mx-auto h-12 w-12 rounded-xl bg-navy/5 text-navy flex items-center justify-center">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display font-bold text-navy">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange mb-3">
              <span className="h-px w-8 bg-orange" /> How it works
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">From idea to installation, in 5 simple steps</h2>
          </div>
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PROCESS.map((step, i) => (
              <li key={step.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-orange text-orange-foreground flex items-center justify-center font-display font-bold">
                    {i + 1}
                  </div>
                  <step.icon className="h-5 w-5 text-white/70" />
                </div>
                <h3 className="mt-4 font-display font-bold">{step.title}</h3>
                <p className="mt-1.5 text-sm text-white/70">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What clients say"
            title="Trusted by homes, hotels and event teams"
            align="center"
          />
        </div>
        <div className="mt-12">
          <TestimonialMarquee />
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="bg-muted/40 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <SectionHeading
            eyebrow="Service areas"
            title="Steel fabrication across all of Kerala"
            description="Based in Vattambalam, Mannarkkad, we deliver and install across every major district in Kerala."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {SERVICE_AREAS.map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-3.5 py-1.5 text-xs sm:text-sm text-foreground/80">
                <MapPin className="h-3 w-3 text-steel" /> {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
