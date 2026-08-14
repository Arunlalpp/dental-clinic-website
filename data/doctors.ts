/**
 * DOCTORS — real team, extracted from the live site (2026-08-14).
 * Qualifications and specialties are preserved verbatim; do not embellish.
 * `image` paths point at /public/doctors/* — drop real portraits there.
 * Until real portraits are supplied, `image` may be undefined and the UI
 * should fall back to an initials/monogram placeholder (never a stock face).
 */

export interface Doctor {
  id: string;
  name: string;
  qualification: string;      // e.g. "BDS", "MDS"
  role: string;               // e.g. "Chief Dental Surgeon"
  specialty?: string;         // short specialty tag for hover/overlay
  affiliation?: string;       // external hospital affiliation, if any
  image?: string;             // /doctors/xxx.jpg  — real photo only
}

export const doctors: Doctor[] = [
  {
    id: "navas-pappali",
    name: "Dr. Navas Pappali",
    qualification: "BDS",
    role: "Chief Dental Surgeon",
    specialty: "General & Cosmetic Dentistry",
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
