import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Factory, Hammer, Users } from "lucide-react";
import { SERVICE_AREAS, SITE } from "@/lib/site";
import { CtaBand } from "@/components/site/CtaBand";
import { SectionHeading } from "@/components/site/SectionHeading";
import { canonical, breadcrumbLd, absUrl, OG_IMAGE } from "@/lib/seo";
import hero from "@/assets/hero-workshop.jpg";

export const Route = createFileRoute("/about")({
  head: () => {
    const title = "About PS Steels — Steel Fabrication Workshop in Mannarkkad";
    const description =
      "PS Steels & Engineering is a Mannarkkad workshop serving all of Kerala — custom SS, MS, GP pipe and steel pipe fabrication for homes, hotels, bakeries and event teams.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: absUrl("/about") },
        { property: "og:image", content: OG_IMAGE },
      ],
      links: [canonical("/about")],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ),
        },
      ],
    };
  },
  component: AboutPage,
});

const STATS = [
  { icon: Factory, k: "15+", v: "Years experience" },
  { icon: Hammer, k: "1000+", v: "Projects delivered" },
  { icon: Users, k: "100%", v: "Custom-built" },
];

function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">About us</div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold">
              Built by craftsmen. Trusted across Kerala.
            </h1>
            <p className="mt-4 text-white/70 max-w-xl leading-relaxed">
              {SITE.name} is a steel fabrication workshop based in Vattambalam, Mannarkkad. We deliver custom SS & MS fabrication, GP pipe and steel pipe works to homes, hotels, bakeries, catering teams and event organisers across Kerala.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s.v} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <s.icon className="h-5 w-5 text-orange" />
                  <div className="mt-2 font-display text-2xl font-bold">{s.k}</div>
                  <div className="text-xs text-white/60">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl aspect-[4/3] shadow-elegant">
            <img src={hero} alt="PS Steels workshop" loading="lazy" decoding="async" width={1920} height={1080} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12">
        <div>
          <SectionHeading
            eyebrow="What we believe"
            title="Strong work. Honest pricing. On-time delivery."
          />
          <p className="mt-5 text-muted-foreground leading-relaxed">
            We treat every project, from a single SS handrail to a full hotel kitchen, with the same standard of craftsmanship. Materials are sourced from trusted suppliers. Welding is done by experienced technicians. Finishing is checked at every stage.
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              "Free consultation, site visit and quotation",
              "Custom fabrication based on your exact requirement",
              "Quality SS, MS, GP pipe and steel pipe materials",
              "Professional finishing, polishing, powder coating, painting",
              "Delivery and installation across Kerala",
            ].map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-steel mt-0.5 shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-muted/50 rounded-3xl p-8 border border-border">
          <h3 className="font-display text-xl font-bold text-navy">Service areas across Kerala</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Based in Mannarkkad, we travel across Palakkad, Malappuram, Kozhikode, Thrissur and beyond.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {SERVICE_AREAS.map((c) => (
              <span key={c} className="rounded-full bg-card border border-border px-3 py-1.5 text-xs">{c}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
