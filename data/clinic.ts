/**
 * CLINIC — SINGLE SOURCE OF TRUTH
 * ================================
 * All contact / hours / location data lives here. Nothing below should be
 * duplicated inline in components — import from this file.
 *
 * Content extracted from the live site on 2026-08-14:
 * https://carewelldentalclinicvengara.dialndial.com/
 *
 * ⚠️  UNRESOLVED CONFLICTS ON THE LIVE SITE — confirm with the clinic before launch:
 *
 *   PHONE: two numbers are published.
 *     • 9544313700  → used for the WhatsApp link (wa.me/919544313700)
 *     • 9562313700  → shown as the "Call Us" number in the footer
 *     Decision below: call button uses 9562313700, WhatsApp uses 9544313700.
 *     If both should ring the same line, update `phonePrimary`.
 *
 *   HOURS: two different closing times are published.
 *     • About block:       9:00 AM – 7:30 PM, Sunday closed
 *     • "How to find us":  9:00 AM – 8:00 PM (no closed-day stated)
 *     Decision below: 9:00 AM – 7:30 PM, closed Sunday (the block that states
 *     the closed day is treated as the fuller record). VERIFY.
 */

export interface ClinicInfo {
  name: string;
  shortName: string;
  tagline: string;
  locality: string;
  address: {
    line1: string;
    area: string;
    city: string;
    region: string;
    country: string;
  };
  phonePrimary: string;   // used by "Call Clinic" buttons
  phoneSecondary: string; // second published number
  whatsapp: string;       // WhatsApp business line
  email: string;
  hours: {
    label: string;        // human-readable, e.g. "9:00 AM – 7:30 PM"
    closedDay: string;    // e.g. "Sunday"
    verified: boolean;    // ← flip to true once the clinic confirms
  };
  maps: {
    directionsUrl: string;
    // embedUrl is optional; a place-name query embed is used until a signed
    // Google Maps Embed API key / place ID is provided.
    embedQuery: string;
  };
  social: {
    instagram: string;
    facebook: string;
  };
}

// Normalize a raw number into a tel: href (India, +91).
export const telHref = (raw: string) => `tel:+91${raw.replace(/\D/g, "")}`;
// Normalize into a wa.me link.
export const waHref = (raw: string, text?: string) =>
  `https://wa.me/91${raw.replace(/\D/g, "")}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;

export const clinic: ClinicInfo = {
  name: "Carewell — The Dental Experts",
  shortName: "Carewell",
  tagline: "The Dental Experts",
  locality: "Vengara",
  address: {
    line1: "Block Road",
    area: "Vengara",
    city: "Vengara",
    region: "Kerala",
    country: "IN",
  },
  phonePrimary: "9562313700",   // "Call Us" number on the live site
  phoneSecondary: "9544313700", // also published on the live site
  whatsapp: "9544313700",       // wa.me/919544313700
  email: "navaspappali@gmail.com",
  hours: {
    label: "9:00 AM – 7:30 PM",
    closedDay: "Sunday",
    verified: false, // ⚠️ conflicting closing times published — confirm
  },
  maps: {
    directionsUrl: "https://maps.app.goo.gl/rSWupBKNKnfuZek4A",
    embedQuery: "Carewell The Dental Experts, Block Road, Vengara, Kerala",
  },
  social: {
    instagram: "https://www.instagram.com/carewell_dentalexperts",
    facebook: "https://www.facebook.com/Drnavascarewell/",
  },
};
