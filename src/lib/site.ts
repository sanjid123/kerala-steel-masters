// Single source of truth for business info & content.

import handrail from "@/assets/project-handrail.jpg";
import gate from "@/assets/project-gate.jpg";
import mainGate from "@/assets/project-main-gate.jpg";
import balcony from "@/assets/project-balcony.jpg";
import hotel from "@/assets/project-hotel-kitchen.jpg";
import bakery from "@/assets/project-bakery.jpg";
import catering from "@/assets/project-catering.jpg";
import wedding from "@/assets/project-wedding.jpg";
import furniture from "@/assets/project-furniture.jpg";
import pipeBending from "@/assets/project-pipe-bending.jpg";
import sitout from "@/assets/project-sitout.jpg";

import a1 from "@/assets/avatar-1.jpg";
import a2 from "@/assets/avatar-2.jpg";
import a3 from "@/assets/avatar-3.jpg";
import a4 from "@/assets/avatar-4.jpg";
import a5 from "@/assets/avatar-5.jpg";
import a6 from "@/assets/avatar-6.jpg";
import a7 from "@/assets/avatar-7.jpg";
import a8 from "@/assets/avatar-8.jpg";

export const SITE = {
  name: "PS Steels & Engineering",
  short: "PS Steels",
  tagline: "Complete SS and MS Steel Fabrication Across Kerala",
  description:
    "PS Steels and Engineering, Mannarkkad. Custom SS and MS steel fabrication, GP pipe and steel pipe works, handrails, gates, hotel and bakery fabrication and catering counters across Kerala.",
  address: {
    line1: "Vattambalam, Mannarkkad",
    region: "Palakkad, Kerala, India",
    postal: "678582",
  },
  gstin: "32EGQPP3743B1ZF",
  // Note: brief listed +91 974751022 (only 9 digits). Assuming +91 97475 10220.
  phoneDisplay: "+91 97475 10220",
  phoneTel: "+919747510220",
  whatsappNumber: "919747510220",
  email: "info@pssteels.in",
  hours: "Mon to Sat, 8:30 AM to 7:30 PM",
  socials: {
    google: "https://www.google.com/maps?q=Vattambalam+Mannarkkad",
    instagram: "https://instagram.com/pssteels",
    facebook: "https://facebook.com/pssteels",
  },
};

export const FAQS = [
  {
    q: "Which areas in Kerala do you serve for steel fabrication?",
    a: "We are based in Vattambalam, Mannarkkad and undertake SS, MS, GP pipe and steel pipe fabrication projects across all of Kerala including Palakkad, Ottapalam, Perinthalmanna, Malappuram, Manjeri, Kozhikode, Thrissur, Ernakulam, Kollam and Thiruvananthapuram.",
  },
  {
    q: "What materials do you work with?",
    a: "We work with stainless steel (Grade 304 and 316), mild steel (MS), GP (galvanized) pipe and steel pipe in round and square sections. We choose the right material based on your project, budget and durability requirement.",
  },
  {
    q: "Is the site visit and quotation really free?",
    a: "Yes. Free consultation, free site visit and free quotation are part of our standard process. Just send a WhatsApp message or call us with your location and requirement.",
  },
  {
    q: "How long does it take to receive a quotation?",
    a: "After the site visit, we typically share a transparent quotation within 24 to 48 hours. Larger or fully custom projects may take a little longer for accurate pricing.",
  },
  {
    q: "Do you offer warranty and finishing on fabrication work?",
    a: "Yes. All works carry a workmanship guarantee. We use precision MIG and TIG welding, mirror or matte polishing for SS, and powder coating or painting for MS as per your requirement.",
  },
  {
    q: "What is the difference between GP pipe and SS pipe works?",
    a: "GP pipe (galvanized iron) is cost effective and great for handrails, gates and roofing structures. SS pipe is corrosion resistant, ideal for kitchens, hotels, bakeries, balconies and high finish railings. We will recommend the right option for your use case.",
  },
  {
    q: "Can you fabricate based on my own design or drawing?",
    a: "Absolutely. We do 100 percent custom fabrication based on your design, site measurement, size and requirement, whether it is residential, commercial or industrial.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major payment methods including UPI, Google Pay, PhonePe, Paytm, Amazon Pay, Net Banking, Visa, RuPay, Mastercard, American Express and Cash on Delivery.",
  },
];

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const SERVICE_AREAS = [
  "Mannarkkad", "Palakkad", "Ottapalam", "Shoranur", "Pattambi", "Cherpulassery",
  "Perinthalmanna", "Malappuram", "Manjeri", "Nilambur", "Tirur", "Ponnani", "Kondotty",
  "Kozhikode", "Wayanad", "Kannur", "Kasaragod",
  "Thrissur", "Guruvayur", "Ernakulam", "Kochi",
  "Kottayam", "Alappuzha", "Idukki", "Pathanamthitta",
  "Kollam", "Thiruvananthapuram",
];

export type Service = {
  id: string;
  title: string;
  short: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    id: "ss-ms-fabrication",
    title: "SS & MS Steel Fabrication",
    short:
      "Custom stainless steel and mild steel fabrication for residential, commercial and industrial use.",
    bullets: [
      "Custom design & engineering",
      "Quality MIG / TIG welding",
      "Powder coating & polishing",
      "Site installation across Kerala",
    ],
  },
  {
    id: "gp-steel-pipe",
    title: "GP Pipe & Steel Pipe Works",
    short:
      "Professional GP pipe and steel pipe fabrication for handrails, gates, roofing structures and more.",
    bullets: [
      "Handrails & balcony railings",
      "Gates & compound works",
      "Roofing & staircases",
      "Custom pipe structures",
    ],
  },
  {
    id: "handrail-staircase",
    title: "Handrail & Staircase Works",
    short:
      "Modern SS handrails, balcony railings, staircase fabrication and safety railings.",
    bullets: [
      "SS handrails (Grade 304/316)",
      "Glass + steel balcony railings",
      "Staircase fabrication",
      "Safety & industrial railings",
    ],
  },
  {
    id: "gate-sitout",
    title: "Gate & Sitout Works",
    short:
      "Main gates, sliding gates, decorative sitout structures and steel grill works.",
    bullets: [
      "Main & sliding gates",
      "Compound & grill works",
      "Sitout structures",
      "Decorative steel art",
    ],
  },
  {
    id: "hotel-bakery",
    title: "Hotel & Bakery Fabrication",
    short:
      "Specialized SS fabrication for hotels, restaurants, bakeries, catering units and commercial kitchens.",
    bullets: [
      "Commercial kitchen counters",
      "Bakery display & shelving",
      "Exhaust & chimney hoods",
      "Storage & prep tables",
    ],
  },
  {
    id: "catering-counter",
    title: "Catering Counter Fabrication",
    short:
      "Custom catering counters and serving units for functions, events, hotels and catering teams.",
    bullets: [
      "Buffet & chafing counters",
      "Mobile serving units",
      "Function-ready setups",
      "Branded counter finishes",
    ],
  },
  {
    id: "events-decoration",
    title: "Event & Decoration Steel Works",
    short:
      "Steel structure support for events, wedding functions, stage setup and decoration works.",
    bullets: [
      "Stage & truss frames",
      "Decoration support structures",
      "Event lighting frames",
      "Reusable modular setups",
    ],
  },
  {
    id: "marriage-decoration",
    title: "Marriage Decoration Works",
    short:
      "Customized fabrication for wedding stages, decorative arches, event frames and function setups.",
    bullets: [
      "Wedding stage frames",
      "Decorative arches",
      "Mandapam structures",
      "Custom function setups",
    ],
  },
  {
    id: "sheet-pipe-bending",
    title: "Sheet Bending & Pipe Bending",
    short:
      "Precision sheet and pipe bending works for industrial fabrication and structural applications.",
    bullets: [
      "Hydraulic pipe bending",
      "Sheet metal bending",
      "Custom radius & angles",
      "Bulk job-work orders",
    ],
  },
  {
    id: "steel-furniture",
    title: "Steel Furniture Works",
    short:
      "Customized steel furniture — tables, chairs, racks, storage units and commercial furniture.",
    bullets: [
      "Tables & chairs",
      "Racks & storage units",
      "Display & retail furniture",
      "Industrial workbenches",
    ],
  },
  {
    id: "custom-fabrication",
    title: "Custom Fabrication on Demand",
    short:
      "Made-to-order fabrication based on your design, size and site requirement — residential or commercial.",
    bullets: [
      "Free consultation & site visit",
      "Design & sample approval",
      "Manufacturing & finishing",
      "Delivery & installation",
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
};

export const PROJECTS: Project[] = [
  { id: "p1", title: "Curved SS Handrail – Private Villa", category: "Handrails", image: handrail,
    description: "Polished Grade 304 stainless steel handrail with seamless curves for a luxury residential staircase." },
  { id: "p2", title: "Designer MS Sliding Gate", category: "Gates", image: gate,
    description: "Powder-coated MS sliding gate with geometric pattern, fabricated and installed in Mannarkkad." },
  { id: "p3", title: "Heavy Duty Main Gate", category: "Gates", image: mainGate,
    description: "Robust MS swing gate with grill design for a residential compound." },
  { id: "p4", title: "Glass Balcony Railing", category: "Handrails", image: balcony,
    description: "SS posts with toughened glass infill — apartment project in Kozhikode." },
  { id: "p5", title: "Hotel Commercial Kitchen", category: "Hotel & Bakery", image: hotel,
    description: "End-to-end SS kitchen counters, shelving and exhaust hoods for a hotel in Palakkad." },
  { id: "p6", title: "Bakery Display Counter", category: "Hotel & Bakery", image: bakery,
    description: "Custom SS bakery display counter with glass shelving." },
  { id: "p7", title: "Wedding Catering Counters", category: "Catering Counters", image: catering,
    description: "Modular SS catering counters with chafing dishes for wedding functions." },
  { id: "p8", title: "Wedding Stage Truss Frame", category: "Wedding & Events", image: wedding,
    description: "Heavy duty steel truss frame supporting stage decoration and lighting." },
  { id: "p9", title: "SS Restaurant Furniture", category: "Furniture", image: furniture,
    description: "Custom SS dining tables and chairs designed for a fine-dining restaurant." },
  { id: "p10", title: "Industrial Pipe Bending", category: "Pipe Works", image: pipeBending,
    description: "Precision bending of GP and MS pipes for structural and decorative use." },
  { id: "p11", title: "Decorative Sitout Railing", category: "Handrails", image: sitout,
    description: "Decorative MS sitout railing matching the home's traditional aesthetic." },
];

export type Testimonial = {
  name: string;
  location: string;
  work: string;
  rating: number;
  quote: string;
  avatar: string;
};

export const TESTIMONIALS: Testimonial[] = [
  { name: "Ratheesh Kumar", location: "Mannarkkad", work: "Main Gate", rating: 5, avatar: a1,
    quote: "Excellent finish on our main gate. Team came on time, did the site visit, and delivered exactly what we discussed. Highly recommended for steel works in Palakkad." },
  { name: "Saritha Menon", location: "Palakkad", work: "Restaurant SS Counters", rating: 5, avatar: a2,
    quote: "PS Steels fabricated all the SS counters for our restaurant. Quality of welding and polish is top-notch. Will definitely use them again." },
  { name: "Mohanan Nair", location: "Ottapalam", work: "Hotel Kitchen", rating: 5, avatar: a3,
    quote: "From design to installation, fully professional. Our entire commercial kitchen is by PS Steels. Very durable work." },
  { name: "Anand Krishnan", location: "Perinthalmanna", work: "Bakery Display", rating: 5, avatar: a4,
    quote: "Bakery counter and shelving are perfect. Free consultation and quote — they understood exactly what we needed for our outlet." },
  { name: "Lakshmi Pillai", location: "Thrissur", work: "Balcony Railing", rating: 5, avatar: a5,
    quote: "Beautiful glass and SS balcony railing for our home. Clean job, no scratches, very neat installation." },
  { name: "Vipin Raj", location: "Kozhikode", work: "Architect", rating: 5, avatar: a6,
    quote: "We've used PS Steels for several client projects across Malappuram and Kozhikode. Great fabrication quality and they stick to timelines." },
  { name: "Nithin Mohan", location: "Malappuram", work: "Wedding Stage", rating: 5, avatar: a7,
    quote: "They handled the entire steel structure for our wedding stage and decoration support. Strong, safe and on time." },
  { name: "Geetha Devi", location: "Kollam", work: "Catering Counters", rating: 5, avatar: a8,
    quote: "Our catering team uses their counters for every function. Quality SS, easy to clean, very durable." },
];
