/**
 * TREATMENTS — real service list, extracted from the live site (2026-08-14).
 *
 * The service *names* are the clinic's own. The short `blurb` for each is
 * generic, factual dentistry description written for the redesign — it makes
 * no claim about outcomes, success rates, or anything specific to this clinic.
 * Review/replace blurbs with clinic-approved copy before launch.
 *
 * `image` / `video` point at the generated asset library in
 * data/dental-assets.ts (public/images|videos/dental). Four treatments
 * (fixed partial dentures, full dentures, extractions, removable RPD) have
 * no matching generated asset yet and intentionally fall back to the
 * component's placeholder rather than borrowing an unrelated photo.
 */

import { dentalAssets } from "@/data/dental-assets";

export interface Treatment {
  id: string;
  index: string;        // "01".."14" for the editorial numbering
  title: string;        // display title (may wrap across lines in UI)
  category: string;     // grouping tag
  blurb: string;        // neutral, non-promissory description
  image?: string;
  video?: string;        // short looping clip shown in the preview panel when active
  videoPoster?: string;
}

export const treatments: Treatment[] = [
  {
    id: "root-canal",
    index: "01",
    title: "Root Canal Treatment",
    category: "Endodontics",
    blurb:
      "Removal of infected pulp and sealing of the tooth to relieve pain and preserve the natural tooth.",
    image: dentalAssets.treatments.rootCanal,
  },
  {
    id: "implants",
    index: "02",
    title: "Implant Dentistry",
    category: "Restorative",
    blurb:
      "Titanium implants that replace missing tooth roots and support fixed, natural-looking replacements.",
    image: dentalAssets.treatments.implants,
  },
  {
    id: "orthodontics",
    index: "03",
    title: "Orthodontic Treatment",
    category: "Orthodontics",
    blurb:
      "Braces and appliances that gradually correct alignment and bite for healthier, straighter teeth.",
    image: dentalAssets.treatments.orthodontics,
    video: dentalAssets.treatments.orthodonticsVideo,
    videoPoster: dentalAssets.treatments.orthodontics,
  },
  {
    id: "cosmetic",
    index: "04",
    title: "Cosmetic Dentistry",
    category: "Aesthetic",
    blurb:
      "Treatments focused on the appearance of your teeth, gums and overall smile.",
    image: dentalAssets.treatments.cosmetic,
  },
  {
    id: "veneers",
    index: "05",
    title: "Dental Veneers",
    category: "Aesthetic",
    blurb:
      "Thin custom shells bonded to the front of teeth to reshape, brighten and refine a smile.",
    image: dentalAssets.treatments.veneers,
  },
  {
    id: "fpd",
    index: "06",
    title: "Fixed Partial Dentures",
    category: "Restorative",
    blurb:
      "Fixed bridges that replace one or more missing teeth using the neighbouring teeth for support.",
  },
  {
    id: "full-dentures",
    index: "07",
    title: "Full Dentures",
    category: "Restorative",
    blurb:
      "Complete removable sets that restore function and appearance when all teeth are missing.",
  },
  {
    id: "periodontics",
    index: "08",
    title: "Periodontic Treatments",
    category: "Gum Care",
    blurb:
      "Care for the gums and supporting structures, from deep cleaning to advanced gum therapy.",
    image: dentalAssets.treatments.periodontal,
  },
  {
    id: "extractions",
    index: "09",
    title: "Surgical Removal of Teeth",
    category: "Oral Surgery",
    blurb:
      "Surgical extraction of teeth that cannot be saved or that are impacted, done with careful aftercare.",
  },
  {
    id: "pediatric",
    index: "10",
    title: "Pediatric Dentistry",
    category: "Children",
    blurb:
      "Gentle, child-focused dental care to build healthy habits and comfortable early experiences.",
    image: dentalAssets.treatments.pediatric,
    video: dentalAssets.treatments.pediatricVideo,
    videoPoster: dentalAssets.treatments.pediatric,
  },
  {
    id: "xray-rvg",
    index: "11",
    title: "Dental X-ray / RVG",
    category: "Diagnostics",
    blurb:
      "Digital radiography (RVG) for precise, low-exposure imaging that guides accurate diagnosis.",
    image: dentalAssets.treatments.digital,
  },
  {
    id: "smile-designing",
    index: "12",
    title: "Smile Designing",
    category: "Aesthetic",
    blurb:
      "A planned approach that combines cosmetic treatments to shape a balanced, natural-looking smile.",
    image: dentalAssets.treatments.smileDesign,
  },
  {
    id: "removable-rpd",
    index: "13",
    title: "Removable RPD",
    category: "Restorative",
    blurb:
      "Removable partial dentures that fill gaps from missing teeth while remaining easy to clean.",
  },
  {
    id: "aligners",
    index: "14",
    title: "Dental Aligners",
    category: "Orthodontics",
    blurb:
      "Clear, removable aligners that straighten teeth discreetly as an alternative to fixed braces.",
    image: dentalAssets.treatments.aligners,
    video: dentalAssets.treatments.alignersVideo,
    videoPoster: dentalAssets.treatments.aligners,
  },
];
