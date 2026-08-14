# Carewell Dental Experts — Redesign

Production rebuild of the Carewell (Vengara) dental site: Next.js 15 (App Router),
TypeScript, Tailwind, GSAP + ScrollTrigger, Lenis smooth scroll, Framer Motion,
lucide-react.

**Status: complete build.** `npx next build` passes — all routes prerender
static (home ~165 kB First Load JS). Full homepage, four sub-routes, layout
shell, animation system, SEO + schema, sitemap/robots and 404 are in place.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

## ⚠️ Verify before launch — real content conflicts found on the live site

Extracted from the live site on 2026-08-14. Two things genuinely conflict there;
I did **not** silently pick one. Confirm with the clinic, then update
`data/clinic.ts`:

| Field | Conflict on live site | Current decision |
|---|---|---|
| Phone | `9562313700` ("Call Us") **and** `9544313700` (WhatsApp link) | Call → `9562313700`, WhatsApp → `9544313700`. Set `phonePrimary` if they should match. |
| Hours | About says **9:00–7:30, Sun closed**; "How to find us" says **9:00–8:00** | Using 9:00–7:30, closed Sunday. `hours.verified` is `false` until confirmed — schema opening hours stay omitted until then. |

Verified and used as-is: address (Block Road, Vengara), email
`navaspappali@gmail.com`, Google Maps link, Instagram `@carewell_dentalexperts`,
Facebook `/Drnavascarewell`, the 10 doctors and 14 treatments.

## Content rules honoured

- **No invented content.** Testimonials and before/after arrays in
  `data/testimonials.ts` are empty by design — those sections render a hidden /
  "coming soon" state until the clinic supplies real, consented material.
- Treatment blurbs are neutral, factual descriptions with **no** outcome, success-rate,
  award, or experience claims. Doctor qualifications are verbatim from the site.
- Hero/portrait imagery uses marked placeholders (`/public/hero.jpg`, `/public/doctors/*`);
  no stock or fabricated faces ship.

## What's built

```
app/              home + /about /treatments /doctors /contact, sitemap, robots, 404
components/layout Header, MobileNav (fullscreen), Footer, FloatingActionBar, Loader, SiteChrome
components/hero    cinematic Hero (GSAP entrance timeline)
components/sections TrustStats, About, Treatments (signature), Doctors carousel,
                   BeforeAfter (draggable compare), Technology, FullWidthImage,
                   PatientJourney, Testimonials, Location (map), AppointmentCTA, AppointmentForm
components/ui      MagneticButton, RevealText, SectionHeading, ImageReveal, CustomCursor
lib/animations     SmoothScroll (Lenis+GSAP) + reusable hooks
data/              single source of truth (clinic, doctors, treatments, testimonials)
```

**Design tokens** — palette: `ink #0D1B24`, `paper #F3F2ED`, `blue #155E8C`
(+ bright/deep), whisper `teal #3FA796`, `ash #6B7580`. Type: Bricolage Grotesque
(display) / Inter (body) / IBM Plex Mono (labels), all via `next/font`.

**Animation hooks** (`lib/animations/hooks.ts`): `useSlideUp`, `useFadeIn`,
`useRevealText`, `useParallax`, `useImageReveal`, `useScaleOnScroll`,
`useHorizontalScroll`. Every hook uses `gsap.context()` for automatic cleanup on
route change, and every one respects `prefers-reduced-motion`.

## Before you ship — your list

1. **Confirm the phone + hours conflicts** (table above) in `data/clinic.ts`,
   then flip `hours.verified` to `true` and add `openingHoursSpecification` to
   the schema in `app/layout.tsx`.
2. **Drop in real images**: `/public/hero.jpg`, `/public/about-*.jpg`,
   `/public/treatments/<id>.jpg`, doctor portraits, `/public/statement.jpg`,
   `/public/og.jpg`. Swap the marked placeholder blocks for `next/image`.
3. **Set the real domain** (`SITE_URL` in `app/layout.tsx`, `BASE` in
   `sitemap.ts`/`robots.ts`).
4. **Populate real, consented** testimonials + before/after cases in
   `data/testimonials.ts` — both sections stay hidden/empty until then.
5. **(Optional)** wire the appointment form to a real endpoint; it currently
   hands off to WhatsApp with the details prefilled (no fake confirmation).

## Testing note

I can't run iPhone Safari / real devices / Lighthouse in this environment, so
those checks (spec §42) are yours to run locally. The code is written to the
constraints — safe-area insets, `svh` units, ScrollTrigger cleanup, reduced-motion —
but "production-ready" means you validate on real devices before launch.
# dental-clinic-website
