import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MapPin, MessageCircle, Phone } from "lucide-react";
import { CtaBand } from "@/components/site/CtaBand";
import { SERVICES, SITE, waLink } from "@/lib/site";
import { getCity, neighboursOf } from "@/lib/locations";
import {
  canonical, absUrl, OG_IMAGE, breadcrumbLd, cityBusinessLd, serviceLd,
} from "@/lib/seo";

export const Route = createFileRoute("/kerala/$city/$service")({
  loader: ({ params }) => {
    const city = getCity(params.city);
    const service = SERVICES.find((s) => s.id === params.service);
    if (!city || !service) throw notFound();
    return { city, service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { city, service } = loaderData;
    const shortTitle = service.title.replace(/ Fabrication$/, "").replace(/ Works$/, "");
    const title = `${shortTitle} in ${city.name} — PS Steels`;
    const description = `${service.title} in ${city.name}, Kerala. ${service.short} Free site visit and quotation.`;
    const path = `/kerala/${city.slug}/${service.id}`;
    return {
      meta: [
        { title: title.slice(0, 60) },
        { name: "description", content: description.slice(0, 158) },
        { property: "og:title", content: title.slice(0, 60) },
        { property: "og:description", content: description.slice(0, 158) },
        { property: "og:url", content: absUrl(path) },
        { property: "og:image", content: OG_IMAGE },
      ],
      links: [canonical(path)],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(serviceLd(service, city)) },
        { type: "application/ld+json", children: JSON.stringify(cityBusinessLd(city)) },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbLd([
            { name: "Home", path: "/" },
            { name: city.name, path: `/kerala/${city.slug}` },
            { name: service.title, path },
          ])),
        },
      ],
    };
  },
  component: CityServicePage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-navy">Page not found</h1>
      <Link to="/" className="mt-6 inline-block underline">Go home</Link>
    </div>
  ),
});

function CityServicePage() {
  const { city, service } = Route.useLoaderData();
  const neighbours = neighboursOf(city, 6);
  const otherServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 6);

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <nav className="text-xs text-white/60 mb-4 flex flex-wrap gap-1">
            <Link to="/" className="hover:text-orange">Home</Link>
            <span>›</span>
            <Link to="/kerala/$city" params={{ city: city.slug }} className="hover:text-orange">{city.name}</Link>
            <span>›</span>
            <span className="text-white/80">{service.title}</span>
          </nav>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" /> {city.name}, {city.district}
          </div>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-balance max-w-4xl">
            {service.title} in {city.name}, Kerala
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/75 max-w-3xl leading-relaxed">
            {service.short} Trusted by homes, hotels and businesses across {city.name} and{" "}
            {city.district} district. Free consultation, site visit and transparent quotation.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={waLink(`Hi PS Steels, I'd like a quote for ${service.title} in ${city.name}.`)} target="_blank" rel="noreferrer">
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

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-navy">
            Why choose PS Steels for {service.title.toLowerCase()} in {city.name}
          </h2>
          <ul className="mt-5 space-y-2.5">
            {service.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-steel mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
            <li className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-steel mt-0.5 shrink-0" />
              <span>Local installation across {city.name} and surrounding {city.district} towns</span>
            </li>
          </ul>
        </div>
        <div className="bg-muted/40 border border-border rounded-3xl p-8">
          <h3 className="font-display text-xl font-bold text-navy">Other services in {city.name}</h3>
          <ul className="mt-4 space-y-2">
            {otherServices.map((s) => (
              <li key={s.id}>
                <Link
                  to="/kerala/$city/$service"
                  params={{ city: city.slug, service: s.id }}
                  className="text-sm text-foreground/80 hover:text-navy hover:underline"
                >
                  {s.title} in {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h3 className="font-display text-lg font-bold text-navy">
            We also do {service.title.toLowerCase()} in nearby {city.district} areas
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {neighbours.map((n) => (
              <Link
                key={n.slug}
                to="/kerala/$city/$service"
                params={{ city: n.slug, service: service.id }}
                className="rounded-full bg-card border border-border px-3.5 py-1.5 text-xs sm:text-sm hover:border-steel hover:text-navy transition"
              >
                {service.title} in {n.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Get a free quote for ${service.title.toLowerCase()} in ${city.name}`}
        subtitle="Free consultation, site visit and quotation across Kerala."
      />
    </>
  );
}
