import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  MapPin, ArrowRight, MessageCircle, ChevronRight,
  CheckCircle2, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE, waLink } from "@/lib/site";
import {
  cityForLookup, nearbyTownsForDistrict,
  type PincodeLookupResult,
} from "@/lib/pincodes";

export function LoadingState() {
  return (
    <div className="space-y-3">
      <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
      <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
      <div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
    </div>
  );
}

export function ErrorState({ query }: { query?: string }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <AlertCircle className="h-4 w-4 mt-0.5 text-amber-600 shrink-0" />
      <p className="text-foreground">
        We couldn't find a match{query ? ` for "${query}"` : ""}. Please enter a
        valid 6-digit Kerala pincode or a town name.
      </p>
    </div>
  );
}

export function OutsideKerala({ result }: { result: PincodeLookupResult }) {
  return (
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 text-xs font-semibold">
        <AlertCircle className="h-3.5 w-3.5" />
        {result.district || "Outside Kerala"} — message us anyway
      </div>
      <p className="text-sm text-muted-foreground">
        Pincode <span className="font-mono text-navy">{result.pincode}</span>{" "}
        appears to be outside our regular Kerala coverage. For large or
        commercial projects we still take enquiries — talk to us on WhatsApp.
      </p>
      <a
        href={waLink(`Hi PS Steels, I'd like a quote for pincode ${result.pincode}.`)}
        target="_blank"
        rel="noreferrer"
      >
        <Button className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground gap-2">
          <MessageCircle className="h-4 w-4" /> WhatsApp us
        </Button>
      </a>
    </div>
  );
}

export function FoundResult({ result }: { result: PincodeLookupResult }) {
  const towns = useMemo(() => nearbyTownsForDistrict(result.district), [result]);
  const primaryCity = useMemo(() => cityForLookup(result), [result]);

  return (
    <div className="space-y-5">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-navy">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span>Service Areas</span>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-navy">{result.district}</span>
      </nav>

      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-semibold">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Serving Area Found
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl bg-muted/40 border border-border p-4">
        <Detail label="District" value={result.district} />
        <Detail label="Pincode" value={result.pincode} mono />
        <Detail label="Post Office" value={result.office} />
      </div>

      {towns.length > 0 && (
        <div>
          <h4 className="font-display font-bold text-navy text-sm">
            Nearby towns we serve in {result.district}
          </h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {towns.map((t) => (
              <Link
                key={t.slug}
                to="/kerala/$city"
                params={{ city: t.slug }}
                className="inline-flex items-center gap-1.5 rounded-full bg-card border border-border px-3 py-1.5 text-sm font-medium hover:border-steel hover:text-navy transition"
              >
                <MapPin className="h-3 w-3 text-steel" /> {t.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        {primaryCity && (
          <Link to="/kerala/$city" params={{ city: primaryCity.slug }}>
            <Button className="bg-navy hover:bg-navy/90 text-navy-foreground gap-2">
              View Steel Fabrication in {primaryCity.name}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
        <a
          href={waLink(
            `Hi PS Steels, I'm in ${result.office} (${result.district}, pincode ${result.pincode}). I'd like a free quotation.`,
          )}
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline" className="gap-2">
            <MessageCircle className="h-4 w-4 text-whatsapp" />
            WhatsApp about {result.pincode}
          </Button>
        </a>
        <a href={`tel:${SITE.phoneTel}`} className="hidden sm:inline-flex">
          <Button variant="ghost" className="gap-2">
            Call {SITE.phoneDisplay}
          </Button>
        </a>
      </div>
    </div>
  );
}

function Detail({
  label, value, mono,
}: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className={cn("mt-1 text-sm font-semibold text-navy", mono && "font-mono")}>
        {value || "—"}
      </div>
    </div>
  );
}
