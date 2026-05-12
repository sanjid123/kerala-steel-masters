import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/site";

export function WhatsAppFab() {
  return (
    <a
      href={waLink("Hi PS Steels, I'm interested in your fabrication services.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="hidden md:flex fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-whatsapp text-whatsapp-foreground shadow-elegant items-center justify-center hover:scale-110 transition-transform"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-25" />
    </a>
  );
}
