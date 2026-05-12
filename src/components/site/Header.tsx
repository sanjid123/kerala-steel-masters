import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, waLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="leading-tight">
            <div className="font-display font-bold text-base sm:text-lg text-navy tracking-tight">
              PS Steels
            </div>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-steel -mt-0.5 font-semibold">
              & Engineering
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-md hover:bg-muted"
              activeProps={{ className: "text-navy font-semibold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a href={`tel:${SITE.phoneTel}`}>
            <Button variant="outline" size="sm" className="gap-2 border-navy/20 text-navy hover:bg-navy hover:text-navy-foreground">
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">{SITE.phoneDisplay}</span>
              <span className="lg:hidden">Call</span>
            </Button>
          </a>
          <a href={waLink(`Hi PS Steels, I'd like a free quote.`)} target="_blank" rel="noreferrer">
            <Button size="sm" className="gap-2 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground">
              <MessageCircle className="h-4 w-4" />
              Get Quote
            </Button>
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height] duration-300 border-b border-border",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <div className="px-4 py-3 flex flex-col gap-1 bg-background">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: n.to === "/" }}
              className="px-3 py-2.5 rounded-md text-sm font-medium hover:bg-muted"
              activeProps={{ className: "text-navy bg-muted font-semibold" }}
            >
              {n.label}
            </Link>
          ))}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <a href={`tel:${SITE.phoneTel}`}>
              <Button variant="outline" className="w-full gap-2 border-navy/20 text-navy">
                <Phone className="h-4 w-4" /> Call
              </Button>
            </a>
            <a href={waLink("Hi PS Steels, I'd like a free quote.")} target="_blank" rel="noreferrer">
              <Button className="w-full gap-2 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
