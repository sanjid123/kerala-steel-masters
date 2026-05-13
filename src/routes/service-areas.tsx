import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ServiceAreaExplorer } from "@/components/site/ServiceAreaExplorer";
import {
  ErrorState, FoundResult, LoadingState, OutsideKerala,
} from "@/components/site/ServiceAreaResult";
import { lookupPincode, searchPincodes, type PincodeLookupResult } from "@/lib/pincodes";
import { canonical } from "@/lib/seo";

export const Route = createFileRoute("/service-areas")({
  validateSearch: (input: Record<string, unknown>): { q: string } => ({
    q: typeof input.q === "string" ? input.q : "",
  }),
  head: () => ({
    meta: [
      { title: "Service Areas — PS Steels" },
      {
        name: "description",
        content:
          "Check if PS Steels covers your Kerala location. Search by 6-digit pincode or town name across 5,000+ Kerala pincodes.",
      },
      { property: "og:title", content: "Service Areas — PS Steels" },
      {
        property: "og:description",
        content: "Search by pincode or town across Kerala.",
      },
    ],
    links: [canonical("/service-areas")],
  }),
  component: ServiceAreasPage,
});

type Status = "idle" | "loading" | "found" | "outside" | "error";

function ServiceAreasPage() {
  const { q } = Route.useSearch();
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<PincodeLookupResult | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      const trimmed = (q || "").trim();
      if (!trimmed) {
        setStatus("idle");
        setResult(null);
        return;
      }
      setStatus("loading");
      const digits = trimmed.replace(/\D/g, "");
      let pin = digits.length === 6 ? digits : null;
      if (!pin) {
        const matches = searchPincodes(trimmed, 1);
        if (matches[0]) pin = matches[0].pincode;
      }
      if (!pin) {
        if (!cancelled) {
          setStatus("error");
          setResult(null);
        }
        return;
      }
      const r = await lookupPincode(pin);
      if (cancelled) return;
      if (!r) {
        setStatus("error");
        setResult(null);
        return;
      }
      setResult(r);
      setStatus(r.inKerala ? "found" : "outside");
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [q]);

  return (
    <main className="bg-background">
      <section className="bg-muted/40 border-b border-border">
        <div className="container mx-auto px-4 py-10 lg:py-14 max-w-4xl">
          <ServiceAreaExplorer />
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 lg:py-14 max-w-4xl">
        <div className="rounded-3xl border border-border bg-card shadow-card p-6 sm:p-8">
          {status === "idle" && (
            <p className="text-sm text-muted-foreground">
              Enter a pincode or town above to see your nearest service area.
            </p>
          )}
          {status === "loading" && <LoadingState />}
          {status === "error" && <ErrorState query={q} />}
          {status === "outside" && result && <OutsideKerala result={result} />}
          {status === "found" && result && <FoundResult result={result} />}
        </div>
      </section>
    </main>
  );
}
