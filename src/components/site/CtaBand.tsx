import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

export function CtaBand({
  title = "Ready to start your fabrication project?",
  subtitle = "Free consultation • Free site visit • Free quotation across Kerala.",
}: { title?: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_45%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid lg:grid-cols-[1fr_auto] gap-8 items-center">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-balance">{title}</h2>
          <p className="mt-3 text-white/75 max-w-2xl">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={waLink("Hi PS Steels, I'd like a free consultation and quote.")} target="_blank" rel="noreferrer">
            <Button size="lg" className="gap-2 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground h-12 px-6">
              <MessageCircle className="h-5 w-5" /> WhatsApp Now
            </Button>
          </a>
          <a href={`tel:${SITE.phoneTel}`}>
            <Button size="lg" variant="outline" className="gap-2 h-12 px-6 bg-white/0 border-white/30 text-white hover:bg-white hover:text-navy">
              <Phone className="h-5 w-5" /> Call {SITE.phoneDisplay}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
