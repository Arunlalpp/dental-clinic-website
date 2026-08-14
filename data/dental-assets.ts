/**
 * DENTAL ASSETS — SINGLE SOURCE OF TRUTH
 * =======================================
 * Every generated image/video the clinic supplied, mapped to the exact
 * section it was produced for. Do not hardcode /images or /videos paths in
 * components — import from here so a re-shoot only touches one file.
 *
 * Naming mirrors /public/images/dental and /public/videos/dental exactly.
 * Each video has a same-named `*-poster.webp` (first-frame still) generated
 * alongside it in /public/images/dental for instant paint before the video
 * loads.
 *
 * Two assets from the original 30 are intentionally NOT wired into the
 * public site as if they were verified real-world content:
 *
 *  - 17-doctor-portraits.webp (generated headshot) is excluded from the
 *    Doctors section. That section lists real, named clinicians; placing a
 *    generated portrait next to a real name would misrepresent who the
 *    patient is booking with. The file still ships in /public if a generic,
 *    unattributed use is wanted later, but nothing here points a section at
 *    it as a doctor photo.
 *  - 19-smile-before-after.webp is a generated composite (not a real
 *    patient), so it is wired into BeforeAfter as a clearly labelled
 *    "illustrative example" placeholder — never merged into
 *    `beforeAfterCases` (data/testimonials.ts), which is reserved for real,
 *    consented cases only.
 *
 * Same logic applies to testimonials: 20-testimonial-patient.webp is used as
 * unattributed mood photography (PatientJourney), never paired with an
 * invented quote in the Testimonials section.
 */

const IMG = "/images/dental";
const VID = "/videos/dental";

export const dentalAssets = {
  hero: {
    image: `${IMG}/01-hero-clinic.webp`,
    // Both encodes are all-keyframe (-g 1 -keyint_min 1) — required for the
    // hero's scroll-scrubbed playback (see useScrollScrub) to seek instantly
    // on every frame instead of stuttering between GOPs. Only reduced-motion
    // visitors get `image` instead, no video request either way.
    video: `${VID}/video-01-hero.mp4`, // 1280w, desktop (lg+)
    poster: `${IMG}/video-01-hero-poster.webp`,
    videoMobile: `${VID}/video-01-hero-mobile.mp4`, // 800w — same all-keyframe treatment, smaller for cellular
    posterMobile: `${IMG}/video-01-hero-mobile-poster.webp`,
  },

  clinic: {
    exterior: `${IMG}/02-clinic-exterior.webp`,
    reception: `${IMG}/03-reception.webp`,
    dentistVideo: `${VID}/video-02-dentist.mp4`,
    dentistPoster: `${IMG}/video-02-dentist-poster.webp`,
  },

  whyCarewell: {
    consultation: `${IMG}/04-dentist-consultation.webp`,
    consultationVideo: `${VID}/video-03-consultation.mp4`,
    consultationPoster: `${IMG}/video-03-consultation-poster.webp`,
  },

  treatments: {
    rootCanal: `${IMG}/05-root-canal.webp`,
    implants: `${IMG}/06-dental-implants.webp`,
    orthodontics: `${IMG}/07-orthodontics.webp`,
    orthodonticsVideo: `${VID}/video-05-orthodontics.mp4`,
    aligners: `${IMG}/08-clear-aligners.webp`,
    alignersVideo: `${VID}/video-06-clear-aligners.mp4`,
    cosmetic: `${IMG}/09-cosmetic-dentistry.webp`,
    smileDesign: `${IMG}/10-smile-design.webp`,
    veneers: `${IMG}/11-veneers.webp`,
    pediatric: `${IMG}/12-pediatric-dentistry.webp`,
    pediatricVideo: `${VID}/video-07-pediatric.mp4`,
    periodontal: `${IMG}/13-periodontal-care.webp`,
    digital: `${IMG}/14-digital-dentistry.webp`,
  },

  beforeAfter: {
    illustrative: `${IMG}/19-smile-before-after.webp`,
    video: `${VID}/video-04-smile-transformation.mp4`,
    poster: `${IMG}/video-04-smile-transformation-poster.webp`,
  },

  technology: {
    equipment: `${IMG}/18-dental-technology.webp`,
    video: `${VID}/video-08-advanced-dentistry.mp4`,
    poster: `${IMG}/video-08-advanced-dentistry-poster.webp`,
  },

  statement: {
    team: `${IMG}/16-dental-team.webp`,
  },

  doctorsSection: {
    teamVideo: `${VID}/video-10-dental-team.mp4`,
    teamPoster: `${IMG}/video-10-dental-team-poster.webp`,
  },

  patientJourney: {
    patient: `${IMG}/20-testimonial-patient.webp`,
    video: `${VID}/video-09-happy-patient.mp4`,
    poster: `${IMG}/video-09-happy-patient-poster.webp`,
  },

  cta: {
    background: `${IMG}/15-happy-patient.webp`,
  },

  footer: {
    backgroundCrop: `${IMG}/02-clinic-exterior.webp`,
  },
} as const;
