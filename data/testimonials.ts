/**
 * TESTIMONIALS & BEFORE/AFTER
 * ===========================
 * INTENTIONALLY EMPTY. Per the brief, testimonials and before/after cases
 * must be REAL clinic-provided content — nothing here is invented.
 *
 * The Testimonials and BeforeAfter sections read these arrays and render a
 * tasteful "coming soon" / hidden state while they are empty, so the site
 * ships honestly. Populate once the clinic supplies approved material and
 * (for patient images) documented consent.
 */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface BeforeAfterCase {
  id: string;
  label: string;       // e.g. "Smile Designing"
  before: string;      // /before-after/xxx-before.jpg
  after: string;       // /before-after/xxx-after.jpg
  consentOnFile: true; // required — the type won't allow a case without it
}

export const testimonials: Testimonial[] = [
  // Add real, clinic-approved testimonials here.
];

export const beforeAfterCases: BeforeAfterCase[] = [
  // Add real cases here — only with documented patient consent.
];
