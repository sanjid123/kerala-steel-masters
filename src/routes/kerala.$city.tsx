import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SERVICES, SITE, waLink } from "@/lib/site";
import { getCity, neighboursOf } from "@/lib/locations";
import {
  canonical, absUrl, OG_IMAGE, breadcrumbLd, cityBusinessLd,
} from "@/lib/seo";

export const Route = createFileRoute("/kerala/$city")({
  loader: ({ params }) => {
    const city = getCity(params.city);
    if (!city) throw notFound();
    return { city };
  },
  head: ({ loaderData }) => {
    const city = loaderData?.city;
    if (!city) return {};
    const title = `Steel Fabrication in ${city.name}, Kerala — PS Steels`;
    const description = `SS, MS, GP pipe & steel pipe fabrication in ${city.name}, ${city.district}. Handrails, gates, hotel & bakery counters. Free site visit and quote.`;
    const path = `/kerala/${city.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 158) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 158) },
        { property: "og:url", content: absUrl(path) },
        { property: "og:image", content: OG_IMAGE },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description.slice(0, 158) },
      ],
      links: [canonical(path)],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(cityBusinessLd(city)) },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Kerala", path: "/" },
            { name: city.name, path },
          ])),
        },
      ],
    };
  },
  component: CityPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-navy">City not found</h1>
      <p className="mt-3 text-muted-foreground">We serve every district in Kerala. Please pick a town from the footer or contact us directly.</p>
      <Link to="/" className="mt-6 inline-block underline">Go home</Link>
    </div>
  ),
});

function CityPage() {
  const { city } = Route.useLoaderData();
  const neighbours = neighboursOf(city, 8);

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" /> {city.district} district, Kerala
          </div>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
            Steel Fabrication in {city.name}, Kerala
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/75 max-w-3xl leading-relaxed">
            PS Steels & Engineering offers complete SS (Grade 304/316), MS, GP pipe and steel pipe
            fabrication services in {city.name} and across {city.district} district. From custom
            handrails and gates to hotel kitchens, bakery counters, catering units and wedding stage
            steel — we deliver quality fabrication with free site visits and transparent quotations.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={waLink(`Hi PS Steels, I'd like a quote for steel fabrication in ${city.name}.`)} target="_blank" rel="noreferrer">
              <Button size="lg" className="h-12 px-6 gap-2 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground">
                <MessageCircle className="h-5 w-5" /> WhatsApp Quote
              </Button>
            </a>
            <a href={`tel:${SITE.phoneTel}`}>
              <Button size="lg" variant="outline" className="h-12 px-6 gap-2 bg-white/0 border-white/30 text-white hover:bg-white hover:text-navy">
                <Phone className="h-5 w-5" /> Call {SITE.phoneDisplay}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Services in this city */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeading
          eyebrow={`Services in ${city.name}`}
          title={`Steel fabrication services we deliver in ${city.name}`}
          description={`Tap any service to see specifics for ${city.name} — handrails, gates, hotel & bakery, catering, GP pipe and more.`}
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <Link
              key={s.id}
              to="/kerala/$city/$service"
              params={{ city: city.slug, service: s.id }}
              className="group block bg-card border border-border rounded-2xl p-6 hover:border-steel hover:shadow-card transition"
            >
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-steel shrink-0" />
                <h3 className="font-display font-bold text-lg text-navy">{s.title} in {city.name}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.short}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-steel group-hover:gap-2 transition-all">
                View details <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy">
              Trusted steel fabricator for {city.name}
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Whether you are a homeowner in {city.name} planning a new SS handrail or balcony railing,
              an architect designing a project in {city.district}, or a hotel/bakery owner needing
              commercial SS counters and exhaust hoods, PS Steels handles design, fabrication, finishing
              and on-site installation end-to-end.
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                `Free site visit and quotation in ${city.name}`,
                "Quality SS 304/316, MS, GP pipe and steel pipe materials",
                "Precision MIG/TIG welding, polishing & powder coating",
                `Local installation and after-service across ${city.district}`,
              ].map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-steel mt-0.5 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card rounded-3xl p-8 border border-border">
            <h3 className="font-display text-xl font-bold text-navy">Nearby areas we serve</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We also undertake fabrication projects in these {city.district} towns:
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {neighbours.map((n) => (
                <Link
                  key={n.slug}
                  to="/kerala/$city"
                  params={{ city: n.slug }}
                  className="rounded-full bg-muted hover:bg-navy hover:text-white border border-border px-3.5 py-1.5 text-xs sm:text-sm transition"
                >
                  Steel Fabrication in {n.name}
                </Link>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Looking for a different town?{" "}
              <Link to="/contact" className="underline">Contact us</Link> — we serve all 14 Kerala districts.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title={`Free site visit & quotation in ${city.name}`}
        subtitle={`Call or WhatsApp for SS, MS, GP pipe and steel pipe fabrication anywhere in ${city.district} district.`}
      />
    </>
  );
}
