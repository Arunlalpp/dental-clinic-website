/**
 * DOCTORS — real team, extracted from the live site (2026-08-14).
 * Qualifications and specialties are preserved verbatim; do not embellish.
 * `image` paths point at /public/doctors/* for real portraits, or
 * /public/images/dental/* for the one approved generic stock placeholder
 * (see `stockPlaceholder`). Until a doctor has either, the UI falls back to
 * an initials/monogram card.
 */

export interface Doctor {
  id: string;
  name: string;
  qualification: string;      // e.g. "BDS", "MDS"
  role: string;               // e.g. "Chief Dental Surgeon"
  specialty?: string;         // short specialty tag for hover/overlay
  affiliation?: string;       // external hospital affiliation, if any
  image?: string;             // real photo, or an approved stock placeholder
  /**
   * True if `image` is a generic AI-generated/stock photo standing in for
   * this person, not an actual photo of them. Confirmed acceptable by the
   * clinic (2026-08-14) as a temporary placeholder until real portraits are
   * supplied. Swap to a real photo and drop this flag when available.
   */
  stockPlaceholder?: boolean;
}

export const doctors: Doctor[] = [
  {
    id: "navas-pappali",
    name: "Dr. Navas Pappali",
    qualification: "BDS",
    role: "Chief Dental Surgeon",
    specialty: "General & Cosmetic Dentistry",
    image: "/images/dental/21-doctor-headshot-stock.webp",
    stockPlaceholder: true,
  },
  {
    id: "fahad-hamdan-kk",
    name: "Dr. Fahad Hamdan K.K",
    qualification: "BDS",
    role: "Dental Surgeon",
  },
  {
    id: "ejazi-p",
    name: "Dr. Ejazi P",
    qualification: "BDS",
    role: "Dental Surgeon",
  },
  {
    id: "syamily-kt",
    name: "Dr. Syamily K.T",
    qualification: "BDS",
    role: "Dental Surgeon",
  },
  {
    id: "aysha-remin-ap",
    name: "Dr. Aysha Remin A.P",
    qualification: "BDS",
    role: "Lady Dental Surgeon",
  },
  {
    id: "muhammad-yahya",
    name: "Dr. Muhammad Yahya",
    qualification: "MDS",
    role: "Oral & Maxillofacial Surgeon",
    specialty: "Oral & Maxillofacial Surgery",
    affiliation: "Al Shifa Hospital, Perinthalmanna",
  },
  {
    id: "shahna",
    name: "Dr. Shahna",
    qualification: "MDS",
    role: "Periodontist & Implantologist",
    specialty: "Periodontics & Implantology",
  },
  {
    id: "abdul-gafoor",
    name: "Dr. Abdul Gafoor",
    qualification: "MDS",
    role: "Orthodontist & Dentofacial Orthopaedics",
    specialty: "Orthodontics",
  },
  {
    id: "babu-pp",
    name: "Dr. Babu P.P",
    qualification: "MDS",
    role: "Endodontist — Root Canal Specialist",
    specialty: "Endodontics",
  },
  {
    id: "shahana-basheer",
    name: "Dr. Shahana Basheer",
    qualification: "BDS",
    role: "Lady Dental Surgeon",
  },
];
