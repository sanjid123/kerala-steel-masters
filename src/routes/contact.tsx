import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, MessageCircle, Phone, Clock } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => {
    const title = "Contact PS Steels & Engineering | Mannarkkad Kerala";
    const description =
      "Contact PS Steels & Engineering for steel fabrication in Kerala. Call +91 97475 10220, WhatsApp or email info@pssteels.in. Free consultation, site visit and quotation.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-orange">Get in touch</div>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-bold">Let's talk about your project</h1>
          <p className="mt-4 text-white/70 max-w-2xl">
            Free consultation, site visit and quotation across Kerala. Reach us by call, WhatsApp or email — usually we respond within an hour during working hours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <a href={`tel:${SITE.phoneTel}`} className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-steel transition shadow-card">
            <div className="h-12 w-12 rounded-xl bg-navy/5 text-navy flex items-center justify-center">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display font-bold text-navy">Call us</div>
              <div className="text-sm text-muted-foreground">{SITE.phoneDisplay}</div>
            </div>
          </a>

          <a href={waLink("Hi PS Steels, I'd like to discuss a fabrication project.")} target="_blank" rel="noreferrer" className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-whatsapp transition shadow-card">
            <div className="h-12 w-12 rounded-xl bg-whatsapp/10 text-whatsapp flex items-center justify-center">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display font-bold text-navy">WhatsApp</div>
              <div className="text-sm text-muted-foreground">Chat with us — fastest response</div>
            </div>
          </a>

          <a href={`mailto:${SITE.email}`} className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-steel transition shadow-card">
            <div className="h-12 w-12 rounded-xl bg-navy/5 text-navy flex items-center justify-center">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display font-bold text-navy">Email</div>
              <div className="text-sm text-muted-foreground">{SITE.email}</div>
            </div>
          </a>

          <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl shadow-card">
            <div className="h-12 w-12 rounded-xl bg-navy/5 text-navy flex items-center justify-center">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display font-bold text-navy">Workshop</div>
              <div className="text-sm text-muted-foreground">{SITE.address.line1}, {SITE.address.region}</div>
            </div>
          </div>

          <div className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl shadow-card">
            <div className="h-12 w-12 rounded-xl bg-navy/5 text-navy flex items-center justify-center">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display font-bold text-navy">Working hours</div>
              <div className="text-sm text-muted-foreground">{SITE.hours}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a href={waLink("Hi PS Steels, please share a quotation for my requirement.")} target="_blank" rel="noreferrer">
              <Button size="lg" className="gap-2 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground">
                <MessageCircle className="h-5 w-5" /> Get Free Quotation
              </Button>
            </a>
            <a href={`tel:${SITE.phoneTel}`}>
              <Button size="lg" variant="outline" className="gap-2 border-navy/20 text-navy hover:bg-navy hover:text-navy-foreground">
                <Phone className="h-5 w-5" /> Call Now
              </Button>
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border shadow-card min-h-[420px]">
          <iframe
            title="PS Steels location — Vattambalam, Mannarkkad"
            src="https://www.google.com/maps?q=Vattambalam,+Mannarkkad,+Kerala&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full min-h-[420px]"
          />
        </div>
      </section>
    </>
  );
}
