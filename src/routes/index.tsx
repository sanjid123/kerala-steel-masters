import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, MessageCircle, Phone, ShieldCheck, Truck, Wrench, MapPin,
  Sparkles, FileText, Hammer, Factory,
} from "lucide-react";
import heroImg from "@/assets/hero-workshop.jpg";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaBand } from "@/components/site/CtaBand";
import { TestimonialMarquee } from "@/components/site/TestimonialMarquee";
import { PROJECTS, SERVICES, SITE, waLink } from "@/lib/site";
import { CITIES } from "@/lib/locations";
import { ServiceAreaExplorer } from "@/components/site/ServiceAreaExplorer";
import { canonical, faqLd, localBusinessLd, OG_IMAGE, absUrl } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const title = "Steel Fabrication in Kerala — PS Steels";
    const description =
      "Custom SS, MS, GP pipe fabrication across Kerala. Handrails, gates, hotel & bakery counters. Free site visit and quote.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: absUrl("/") },
        { property: "og:image", content: OG_IMAGE },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [canonical("/")],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(localBusinessLd()) },
        { type: "application/ld+json", children: JSON.stringify(faqLd()) },
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
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-navy/85 via-navy/60 to-navy/20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] gap-10 lg:gap-12 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-orange" />
              Mannarkkad · Palakkad · Serving all Kerala
            </div>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-balance">
              Complete <span className="text-orange">SS &amp; MS</span> Steel
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

          {/* Right: pincode/service-area finder */}
          <div className="w-full lg:max-w-[460px] lg:justify-self-end">
            <ServiceAreaExplorer />
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
          {SERVICES.map((s) => (
            <Link
              key={s.id}
              to="/services"
              hash={s.id}
              className="group block bg-card border border-border rounded-2xl p-6 hover:border-steel hover:shadow-card transition"
            >
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-steel shrink-0" />
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
                  <img src={p.image} alt={p.title} loading="lazy" decoding="async" width={1024} height={768}
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
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PROCESS.map((step) => (
              <div key={step.title} className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition">
                <div className="h-11 w-11 rounded-xl border border-white/15 bg-white/5 flex items-center justify-center text-orange">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display font-bold text-lg text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-white/65 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
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

      {/* SEO-only — every Kerala town remains crawlable */}
      <nav aria-label="All Kerala service areas" className="sr-only">
        <ul>
          {CITIES.map((c) => (
            <li key={c.slug}>
              <Link to="/kerala/$city" params={{ city: c.slug }}>
                Steel Fabrication in {c.name}, {c.district}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <CtaBand />
    </>
  );
}
