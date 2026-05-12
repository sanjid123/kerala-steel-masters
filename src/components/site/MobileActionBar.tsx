import { MessageCircle, Phone, FileText } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

export function MobileActionBar() {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur border-t border-border shadow-elegant">
      <div className="grid grid-cols-3">
        <a
          href={`tel:${SITE.phoneTel}`}
          className="flex flex-col items-center justify-center gap-1 py-3 text-navy active:bg-muted"
        >
          <Phone className="h-5 w-5" />
          <span className="text-[11px] font-semibold">Call</span>
        </a>
        <a
          href={waLink("Hi PS Steels, I'd like a free quote.")}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 bg-whatsapp text-whatsapp-foreground"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </a>
        <a
          href={waLink("Hi PS Steels, please share a quotation for my requirement.")}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-3 bg-orange text-orange-foreground"
        >
          <FileText className="h-5 w-5" />
          <span className="text-[11px] font-semibold">Quote</span>
        </a>
      </div>
    </div>
  );
}
