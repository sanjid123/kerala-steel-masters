// SEO helpers — single source of truth for canonical URLs and structured data.

import { SITE, FAQS, SERVICES, PROJECTS, SERVICE_AREAS, type Service } from "@/lib/site";
import type { City } from "@/lib/locations";

export const SITE_URL = "https://pssteels.in";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`; // place /public/og-image.jpg

export function canonical(path: string) {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return { rel: "canonical" as const, href: `${SITE_URL}${clean || "/"}` };
}

export function absUrl(path: string) {
  const clean = path === "/" ? "" : path.replace(/\/$/, "");
  return `${SITE_URL}${clean || "/"}`;
}

// ---------- JSON-LD builders ----------

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: SITE.name,
    image: OG_IMAGE,
    url: SITE_URL,
    telephone: SITE.phoneTel,
    email: SITE.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line1,
      addressLocality: "Mannarkkad",
      addressRegion: "Kerala",
      postalCode: SITE.address.postal,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.9939,
      longitude: 76.4631,
    },
    areaServed: SERVICE_AREAS.map((a) => ({ "@type": "City", name: a })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:30",
        closes: "19:30",
      },
    ],
    sameAs: [SITE.socials.instagram, SITE.socials.facebook, SITE.socials.google].filter(Boolean),
  };
}

export function faqLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function servicesLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.short,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: { "@type": "State", name: "Kerala" },
        url: `${SITE_URL}/services#${s.id}`,
      },
    })),
  };
}

export function projectsLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: PROJECTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `${SITE_URL}/projects#${p.id}`,
    })),
  };
}

export function breadcrumbLd(crumbs: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  };
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE_URL,
    logo: OG_IMAGE,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phoneTel,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "ml", "hi"],
      },
    ],
  };
}

// ---------- City + service builders ----------

export function cityBusinessLd(city: City) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/kerala/${city.slug}#business`,
    name: `${SITE.name} — ${city.name}`,
    image: OG_IMAGE,
    url: `${SITE_URL}/kerala/${city.slug}`,
    telephone: SITE.phoneTel,
    email: SITE.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line1,
      addressLocality: "Mannarkkad",
      addressRegion: "Kerala",
      postalCode: SITE.address.postal,
      addressCountry: "IN",
    },
    areaServed: { "@type": "City", name: city.name, containedInPlace: { "@type": "AdministrativeArea", name: `${city.district}, Kerala` } },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "08:30", closes: "19:30",
    }],
  };
}

export function serviceLd(service: Service, city?: City) {
  const where = city ? `${city.name}, Kerala` : "Kerala";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    name: city ? `${service.title} in ${city.name}` : service.title,
    description: service.short,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: city
      ? { "@type": "City", name: city.name }
      : { "@type": "State", name: "Kerala" },
    url: city
      ? `${SITE_URL}/kerala/${city.slug}/${service.id}`
      : `${SITE_URL}/services/${service.id}`,
    offers: { "@type": "Offer", priceSpecification: { "@type": "PriceSpecification", priceCurrency: "INR" }, areaServed: where },
  };
}

