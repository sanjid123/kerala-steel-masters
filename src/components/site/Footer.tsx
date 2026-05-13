import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Facebook, Globe, ShieldCheck } from "lucide-react";
import { SERVICES, SITE } from "@/lib/site";
import { CITIES, PRIORITY_CITIES } from "@/lib/locations";
import logo from "@/assets/ps-steels-logo-light.png";

// Top services with SEO-rich anchor text.
const TOP_SERVICE_LINKS = [
  { id: "ss-ms-fabrication", anchor: "SS Steel Fabrication Kerala" },
  { id: "ss-ms-fabrication", anchor: "MS Steel Fabrication" },
  { id: "gp-steel-pipe", anchor: "GP Pipe Works Kerala" },
  { id: "gp-steel-pipe", anchor: "Steel Pipe Fabrication" },
  { id: "handrail-staircase", anchor: "SS Handrail Works" },
  { id: "gate-sitout", anchor: "Steel Gate Fabrication" },
  { id: "hotel-bakery", anchor: "Hotel Kitchen Fabrication" },
  { id: "catering-counter", anchor: "Catering Counter Fabrication" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground mt-24 pb-24 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <img
            src={logo}
            alt="PS Steels & Engineering"
            width={240}
            height={72}
            className="h-12 w-auto mb-4"
            loading="lazy"
            decoding="async"
          />
          <p className="text-sm text-white/70 leading-relaxed">
            Complete SS and MS steel fabrication, GP pipe and steel pipe works across Kerala. Free consultation, site visit and quotation.
          </p>
          <div className="flex gap-3 mt-5">
            <a href={SITE.socials.instagram} aria-label="Instagram" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-md bg-white/10 hover:bg-orange hover:text-orange-foreground flex items-center justify-center transition">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={SITE.socials.facebook} aria-label="Facebook" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-md bg-white/10 hover:bg-orange hover:text-orange-foreground flex items-center justify-center transition">
              <Facebook className="h-4 w-4" />
            </a>
            <a href={SITE.socials.google} aria-label="Google Business Profile" target="_blank" rel="noreferrer" className="h-10 w-10 rounded-md bg-white/10 hover:bg-orange hover:text-orange-foreground flex items-center justify-center transition">
              <Globe className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display font-semibold text-sm mb-4 text-white">Top Services</h3>
          <ul className="space-y-2 text-sm text-white/70">
            {TOP_SERVICE_LINKS.map((s, i) => (
              <li key={i}>
                <Link to="/services" hash={s.id} className="hover:text-orange transition">
                  {s.anchor}
                </Link>
              </li>
            ))}
            {SERVICES.slice(8).map((s) => (
              <li key={s.id}>
                <Link to="/services" hash={s.id} className="hover:text-orange transition">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display font-semibold text-sm mb-4 text-white">Service Locations</h3>
          <ul className="space-y-2 text-sm text-white/70">
            {PRIORITY_CITIES.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  to="/kerala/$city"
                  params={{ city: c.slug }}
                  className="hover:text-orange transition inline-flex items-center gap-1.5"
                >
                  <MapPin className="h-3 w-3 text-orange/70" /> {c.name}
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                to="/"
                hash="service-areas"
                className="text-orange hover:text-orange/80 font-semibold inline-flex items-center gap-1"
              >
                + all Kerala towns →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display font-semibold text-sm mb-4 text-white">Contact</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-orange" />
              <span>{SITE.address.line1}<br />{SITE.address.region}</span>
            </li>
            <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-orange" />
              <a href={`tel:${SITE.phoneTel}`} className="hover:text-white">{SITE.phoneDisplay}</a>
            </li>
            <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-orange" />
              <a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a>
            </li>
            <li className="flex gap-3"><ShieldCheck className="h-4 w-4 mt-0.5 shrink-0 text-orange" />
              <span>GSTIN: <span className="text-white font-medium tracking-wide">{SITE.gstin}</span></span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-white/50">{SITE.hours}</p>
        </div>
      </div>

      {/* Coverage band — all city links remain crawlable via sr-only nav */}
      <div className="border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-3 items-center justify-between text-sm">
          <p className="text-white/70 inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-orange shrink-0" />
            Services all over Kerala — serving all 14 districts from Kasaragod to Thiruvananthapuram.
          </p>
          <Link
            to="/"
            hash="service-areas"
            className="text-orange hover:text-orange/80 font-semibold text-sm inline-flex items-center gap-1"
          >
            Find your area →
          </Link>
        </div>
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
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-2 items-center justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>GSTIN: {SITE.gstin} · Mannarkkad, Palakkad, Kerala</p>
        </div>
      </div>
    </footer>
  );
}
