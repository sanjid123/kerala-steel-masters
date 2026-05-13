import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search, MapPin, Loader2, ArrowRight, MessageCircle, ChevronRight,
  CheckCircle2, AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SITE, waLink } from "@/lib/site";
import {
  cityForLookup, lookupPincode, nearbyTownsForDistrict,
  searchPincodes, type PincodeLookupResult, type PincodeRecord,
} from "@/lib/pincodes";

type Status = "idle" | "loading" | "found" | "outside" | "error";

export function ServiceAreaExplorer() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<PincodeLookupResult | null>(null);
  const wrapRef = useRef<HTMLFormElement>(null);

  // Debounced suggestions.
  const [suggestions, setSuggestions] = useState<PincodeRecord[]>([]);
  useEffect(() => {
    const t = setTimeout(() => {
      setSuggestions(query.trim().length >= 2 ? searchPincodes(query, 8) : []);
      setHighlight(0);
    }, 150);
    return () => clearTimeout(t);
  }, [query]);

  // Click-outside to close suggestions.
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  async function runLookup(pin: string) {
    setStatus("loading");
    setOpen(false);
    const r = await lookupPincode(pin);
    if (!r) {
      setStatus("error");
      setResult(null);
      return;
    }
    setResult(r);
    setStatus(r.inKerala ? "found" : "outside");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const digits = query.replace(/\D/g, "");
    if (digits.length === 6) {
      runLookup(digits);
      return;
    }
    // If query matches a single suggestion's office name, use its pincode.
    if (suggestions[0]) {
      setQuery(suggestions[0].pincode);
      runLookup(suggestions[0].pincode);
    }
  }

  function pickSuggestion(s: PincodeRecord) {
    setQuery(s.pincode);
    runLookup(s.pincode);
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      if (suggestions[highlight]) {
        e.preventDefault();
        pickSuggestion(suggestions[highlight]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const towns = useMemo(
    () => (result ? nearbyTownsForDistrict(result.district) : []),
    [result],
  );
  const primaryCity = useMemo(
    () => (result ? cityForLookup(result) : null),
    [result],
  );

  return (
    <div className="rounded-3xl border border-border bg-card shadow-card overflow-hidden">
      {/* Search header */}
      <div className="bg-gradient-to-br from-navy to-navy/90 text-white px-6 sm:px-8 py-7">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange">
          <span className="h-px w-8 bg-orange" /> Service Area Explorer
        </div>
        <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold">
          Find steel fabrication services near you
        </h3>
        <p className="mt-1.5 text-sm text-white/70">
          Enter your 6-digit pincode or your town name. We serve all 5,000+
          Kerala pincodes.
        </p>

        <form
          onSubmit={handleSubmit}
          ref={wrapRef}
          className="relative mt-5 flex flex-col sm:flex-row gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              inputMode="text"
              autoComplete="off"
              maxLength={60}
              placeholder="e.g. 678582 or Mannarkkad"
              value={query}
              onFocus={() => setOpen(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onKeyDown={handleKey}
              aria-label="Pincode or town"
              className="h-12 pl-10 pr-3 bg-white text-navy placeholder:text-muted-foreground border-0 focus-visible:ring-2 focus-visible:ring-orange"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-12 px-6 bg-orange hover:bg-orange/90 text-orange-foreground gap-2"
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            Search
          </Button>

          {/* Suggestions dropdown */}
          {open && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 sm:right-[7.5rem] top-[calc(100%+6px)] z-20 rounded-xl border border-border bg-popover text-popover-foreground shadow-lg overflow-hidden">
              <ul role="listbox" className="max-h-72 overflow-y-auto py-1">
                {suggestions.map((s, i) => (
                  <li key={`${s.pincode}-${s.office}`} role="option" aria-selected={i === highlight}>
                    <button
                      type="button"
                      onMouseEnter={() => setHighlight(i)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => pickSuggestion(s)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3.5 py-2.5 text-left text-sm transition",
                        i === highlight
                          ? "bg-muted text-navy"
                          : "hover:bg-muted/60",
                      )}
                    >
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-steel" />
                      <span className="font-mono font-semibold text-navy">{s.pincode}</span>
                      <span className="truncate text-muted-foreground">
                        {s.office}
                      </span>
                      <span className="ml-auto text-xs text-steel">{s.district}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>

      {/* Result panel */}
      <div className="px-6 sm:px-8 py-7">
        {status === "idle" && <IdleHint />}
        {status === "loading" && <LoadingState />}
        {status === "error" && <ErrorState />}
        {status === "outside" && result && <OutsideKerala result={result} />}
        {status === "found" && result && (
          <FoundResult
            result={result}
            towns={towns}
            primaryCity={primaryCity}
          />
        )}
      </div>
    </div>
  );
}

/* ---------- sub-states ---------- */

function IdleHint() {
  return (
    <div className="flex items-start gap-3 text-sm text-muted-foreground">
      <MapPin className="h-4 w-4 mt-0.5 text-steel shrink-0" />
      <p>
        Type your pincode (e.g. <span className="font-mono text-navy">678582</span>)
        or town name, then pick a suggestion or hit search to see your nearest
        service area.
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-3">
      <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
      <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
      <div className="h-3 w-2/3 rounded bg-muted animate-pulse" />
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex items-start gap-3 text-sm">
      <AlertCircle className="h-4 w-4 mt-0.5 text-amber-600 shrink-0" />
      <p className="text-foreground">
        Please enter a valid 6-digit pincode. You can also type your town name
        and pick from the suggestions.
      </p>
    </div>
  );
}

function OutsideKerala({ result }: { result: PincodeLookupResult }) {
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

function FoundResult({
  result,
  towns,
  primaryCity,
}: {
  result: PincodeLookupResult;
  towns: ReturnType<typeof nearbyTownsForDistrict>;
  primaryCity: ReturnType<typeof cityForLookup>;
}) {
  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-navy">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span>Service Areas</span>
        <ChevronRight className="h-3 w-3" />
        <span className="font-semibold text-navy">{result.district}</span>
      </nav>

      {/* Status pill */}
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-xs font-semibold">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Serving Area Found
      </div>

      {/* Detail grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-2xl bg-muted/40 border border-border p-4">
        <Detail label="District" value={result.district} />
        <Detail label="Pincode" value={result.pincode} mono />
        <Detail label="Post Office" value={result.office} />
      </div>

      {/* Nearby towns */}
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

      {/* CTAs */}
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

      {/* JSON-LD breadcrumb */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "/" },
              { "@type": "ListItem", position: 2, name: "Service Areas" },
              {
                "@type": "ListItem",
                position: 3,
                name: result.district,
                item: primaryCity ? `/kerala/${primaryCity.slug}` : undefined,
              },
            ],
          }),
        }}
      />
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
      <div
        className={cn(
          "mt-1 text-sm font-semibold text-navy",
          mono && "font-mono",
        )}
      >
        {value || "—"}
      </div>
    </div>
  );
}
