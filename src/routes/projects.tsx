import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PROJECTS } from "@/lib/site";
import { CtaBand } from "@/components/site/CtaBand";
import { cn } from "@/lib/utils";
import { canonical, projectsLd, breadcrumbLd, absUrl, OG_IMAGE } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  head: () => {
    const title = "Steel Fabrication Projects in Kerala — PS Steels";
    const description =
      "Recent SS handrails, MS gates, hotel kitchens, bakery counters, catering counters, wedding stage works and steel furniture across Kerala.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: absUrl("/projects") },
        { property: "og:image", content: OG_IMAGE },
      ],
      links: [canonical("/projects")],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(projectsLd()) },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
            ]),
          ),
        },
      ],
    };
  },
  component: ProjectsPage,
});

function ProjectsPage() {
  const categories = useMemo(() => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))], []);
  const [filter, setFilter] = useState<string>("All");
  const [active, setActive] = useState<typeof PROJECTS[number] | null>(null);

  const visible = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">Our work</div>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold">Projects across Kerala</h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            A selection of recently delivered fabrication work, from luxury home handrails to commercial hotel kitchens.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition",
                filter === c
                  ? "bg-navy text-navy-foreground border-navy"
                  : "bg-card text-foreground/70 border-border hover:border-steel hover:text-navy",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="group text-left overflow-hidden rounded-2xl bg-card border border-border shadow-card hover:shadow-elegant transition"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.title} loading="lazy" width={1024} height={768}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-steel">{p.category}</div>
                <h3 className="mt-1.5 font-display font-bold text-navy">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          {active && (
            <>
              <DialogTitle className="sr-only">{active.title}</DialogTitle>
              <img src={active.image} alt={active.title} className="w-full aspect-[4/3] object-cover" />
              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-steel">{active.category}</div>
                <h3 className="mt-1 font-display text-2xl font-bold text-navy">{active.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{active.description}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <CtaBand title="Like what you see? Let's build yours." />
    </>
  );
}
