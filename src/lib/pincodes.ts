// Kerala pincode lookup + autocomplete.
// Uses a bundled JSON index (~5,000 records) for instant suggestions and the
// public api.postalpincode.in API for authoritative on-submit lookup.

import raw from "@/data/kerala-pincodes.json";
import { CITIES, toSlug, type City } from "@/lib/locations";

export type PincodeRecord = {
  /** 6-digit pincode */
  pincode: string;
  /** Post office name */
  office: string;
  /** District (canonical capitalisation, matches CITIES district keys) */
  district: string;
};

type RawRecord = { p: string; o: string; d: string };

export const KERALA_PINCODES: PincodeRecord[] = (raw as RawRecord[]).map(
  (r) => ({ pincode: r.p, office: r.o, district: r.d }),
);

const NORM = (s: string) => s.toLowerCase();

/**
 * Suggest matches for a partial pincode or office name.
 * Returns up to `limit` records, prioritising exact pincode-prefix matches.
 */
export function searchPincodes(query: string, limit = 8): PincodeRecord[] {
  const q = NORM(query.trim());
  if (!q) return [];

  // All-digits → match by pincode prefix.
  if (/^\d+$/.test(q)) {
    const out: PincodeRecord[] = [];
    for (const r of KERALA_PINCODES) {
      if (r.pincode.startsWith(q)) {
        out.push(r);
        if (out.length >= limit) break;
      }
    }
    return out;
  }

  // Text → match office name (startsWith first, then contains).
  const starts: PincodeRecord[] = [];
  const contains: PincodeRecord[] = [];
  for (const r of KERALA_PINCODES) {
    const o = NORM(r.office);
    if (o.startsWith(q)) {
      starts.push(r);
    } else if (o.includes(q)) {
      contains.push(r);
    }
    if (starts.length >= limit) break;
  }
  return [...starts, ...contains].slice(0, limit);
}

export type PincodeLookupResult = {
  pincode: string;
  district: string;
  office: string;
  state: string;
  /** True when the pincode resolves inside Kerala. */
  inKerala: boolean;
};

/**
 * Authoritative lookup via api.postalpincode.in. Falls back to the local
 * index if the network call fails. Returns null only for malformed input.
 */
export async function lookupPincode(
  pin: string,
): Promise<PincodeLookupResult | null> {
  const clean = pin.replace(/\D/g, "");
  if (!/^\d{6}$/.test(clean)) return null;

  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${clean}`, {
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const json = (await res.json()) as Array<{
        Status: string;
        PostOffice?: Array<{
          Name: string;
          District: string;
          State: string;
          Pincode: string;
        }>;
      }>;
      const entry = json?.[0];
      const po = entry?.PostOffice?.[0];
      if (entry?.Status === "Success" && po) {
        return {
          pincode: po.Pincode,
          district: po.District,
          office: po.Name,
          state: po.State,
          inKerala: po.State.toLowerCase() === "kerala",
        };
      }
    }
  } catch {
    // fall through to local
  }

  // Local fallback (Kerala only).
  const local = KERALA_PINCODES.find((r) => r.pincode === clean);
  if (local) {
    return {
      pincode: local.pincode,
      district: local.district,
      office: local.office,
      state: "Kerala",
      inKerala: true,
    };
  }

  return {
    pincode: clean,
    district: "",
    office: "",
    state: "",
    inKerala: false,
  };
}

/**
 * Towns we have landing pages for in the given district. Match is
 * case-insensitive against `CITIES[].district`.
 */
export function nearbyTownsForDistrict(district: string): City[] {
  const key = district.trim().toLowerCase();
  return CITIES.filter((c) => c.district.toLowerCase() === key);
}

/**
 * Best-matching landing-page city for a resolved pincode. Falls back to the
 * first town in the district when the post-office name itself isn't a town.
 */
export function cityForLookup(result: PincodeLookupResult): City | null {
  const towns = nearbyTownsForDistrict(result.district);
  if (towns.length === 0) return null;
  const officeSlug = toSlug(result.office.replace(/\s*\(.*\)\s*$/, ""));
  return towns.find((t) => t.slug === officeSlug) ?? towns[0];
}
