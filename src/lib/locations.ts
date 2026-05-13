// All Kerala districts → towns with slugs. Single source for routes,
// sitemap, footer, JSON-LD, and SEO copy.

export type City = {
  slug: string;
  name: string;
  district: string;
};

// District → ordered list of major towns. First entry is the district
// "anchor" town used in copy.
const DISTRICTS: Record<string, string[]> = {
  Thiruvananthapuram: [
    "Thiruvananthapuram", "Neyyattinkara", "Nedumangad", "Attingal",
    "Varkala", "Kilimanoor", "Vizhinjam", "Kazhakkoottam",
  ],
  Kollam: [
    "Kollam", "Karunagappally", "Kottarakkara", "Punalur",
    "Paravur", "Chavara", "Sasthamcotta", "Kundara",
  ],
  Pathanamthitta: [
    "Pathanamthitta", "Thiruvalla", "Adoor", "Pandalam",
    "Ranni", "Konni", "Mallappally", "Kozhencherry",
  ],
  Alappuzha: [
    "Alappuzha", "Cherthala", "Kayamkulam", "Mavelikkara",
    "Chengannur", "Haripad", "Ambalappuzha", "Aroor",
  ],
  Kottayam: [
    "Kottayam", "Changanassery", "Pala", "Vaikom",
    "Ettumanoor", "Kanjirappally", "Mundakayam", "Pambady",
  ],
  Idukki: [
    "Thodupuzha", "Kattappana", "Adimali", "Munnar",
    "Kumily", "Nedumkandam", "Painavu", "Vagamon",
  ],
  Ernakulam: [
    "Kochi", "Ernakulam", "Aluva", "Muvattupuzha", "Perumbavoor",
    "Kothamangalam", "North Paravur", "Angamaly", "Kalamassery", "Thrippunithura",
  ],
  Thrissur: [
    "Thrissur", "Guruvayur", "Kunnamkulam", "Irinjalakuda",
    "Kodungallur", "Chavakkad", "Chalakudy", "Wadakkanchery",
  ],
  Palakkad: [
    "Palakkad", "Ottapalam", "Shoranur", "Chittur",
    "Mannarkkad", "Pattambi", "Cherpulassery", "Alathur",
  ],
  Malappuram: [
    "Malappuram", "Manjeri", "Tirur", "Ponnani", "Perinthalmanna",
    "Kottakkal", "Nilambur", "Kondotty", "Valanchery", "Tanur",
  ],
  Kozhikode: [
    "Kozhikode", "Vatakara", "Koyilandy", "Ramanattukara",
    "Feroke", "Mukkom", "Thamarassery", "Balussery",
  ],
  Wayanad: [
    "Kalpetta", "Sulthan Bathery", "Mananthavady",
    "Meenangadi", "Panamaram", "Vythiri",
  ],
  Kannur: [
    "Kannur", "Thalassery", "Payyanur", "Taliparamba",
    "Iritty", "Mattannur", "Anthoor", "Kuthuparamba",
  ],
  Kasaragod: [
    "Kasaragod", "Kanhangad", "Nileshwaram", "Uppala",
    "Kumbla", "Cheruvathur", "Manjeshwaram",
  ],
};

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const CITIES: City[] = Object.entries(DISTRICTS).flatMap(
  ([district, towns]) =>
    towns.map((name) => ({ slug: toSlug(name), name, district })),
);

export const CITY_BY_SLUG: Record<string, City> = Object.fromEntries(
  CITIES.map((c) => [c.slug, c]),
);

export function getCity(slug: string | undefined): City | null {
  if (!slug) return null;
  return CITY_BY_SLUG[slug.toLowerCase()] ?? null;
}

// Neighbouring towns within the same district (excluding self).
export function neighboursOf(city: City, count = 6): City[] {
  return CITIES.filter(
    (c) => c.district === city.district && c.slug !== city.slug,
  ).slice(0, count);
}

// Priority cities — these get full city × service prerendered combos
// (highest search volume / business value).
export const PRIORITY_CITY_SLUGS = [
  "mannarkkad", "palakkad", "ottapalam", "perinthalmanna",
  "malappuram", "manjeri", "kozhikode", "thrissur",
  "ernakulam", "kochi", "kollam", "thiruvananthapuram",
];

export const PRIORITY_CITIES: City[] = PRIORITY_CITY_SLUGS
  .map((s) => CITY_BY_SLUG[s])
  .filter(Boolean);
