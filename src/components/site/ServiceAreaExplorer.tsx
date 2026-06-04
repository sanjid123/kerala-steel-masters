import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { searchPincodes, type PincodeRecord } from "@/lib/pincodes";

export function ServiceAreaExplorer() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const wrapRef = useRef<HTMLFormElement>(null);

  const [suggestions, setSuggestions] = useState<PincodeRecord[]>([]);
  useEffect(() => {
    const t = setTimeout(() => {
      setSuggestions(query.trim().length >= 2 ? searchPincodes(query, 8) : []);
      setHighlight(0);
    }, 150);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function go(q: string) {
    const trimmed = q.trim();
    if (!trimmed) return;
    setSubmitting(true);
    navigate({ to: "/service-areas", search: { q: trimmed } });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    const digits = query.replace(/\D/g, "");
    if (digits.length === 6) return go(digits);
    if (suggestions[0]) return go(suggestions[0].pincode);
    go(query);
  }

  function pickSuggestion(s: PincodeRecord) {
    setQuery(s.pincode);
    setOpen(false);
    go(s.pincode);
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

  return (
    <div className="rounded-3xl border border-border shadow-card bg-gradient-to-br from-navy to-navy/90 text-white px-6 sm:px-8 py-7">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange">
        <span className="h-px w-8 bg-orange" /> Service Area Explorer
      </div>
      <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold">
        Find steel fabrication services near you
      </h3>

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
            placeholder="Enter your Pincode"
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
          disabled={submitting}
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          Search
        </Button>

        {open && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 rounded-xl border border-border bg-popover text-popover-foreground shadow-lg overflow-hidden">
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
                      i === highlight ? "bg-muted text-navy" : "hover:bg-muted/60",
                    )}
                  >
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-steel" />
                    <span className="font-mono font-semibold text-navy">{s.pincode}</span>
                    <span className="truncate text-muted-foreground">{s.office}</span>
                    <span className="ml-auto text-xs text-steel">{s.district}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}
