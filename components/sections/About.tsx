"use client";

import { useParallax, useSlideUp } from "@/lib/animations/hooks";
import ImageReveal from "@/components/ui/ImageReveal";
import RevealText from "@/components/ui/RevealText";
import AmbientVideo from "@/components/ui/AmbientVideo";
import { dentalAssets } from "@/data/dental-assets";

export default function About() {
  const parallax = useParallax<HTMLDivElement>(60);
  const videoReveal = useSlideUp<HTMLDivElement>({ y: 30 });

  return (
    <section
      id="about"
      aria-label="About Carewell"
      className="mx-auto max-w-edge px-5 py-24 sm:px-8 lg:py-36"
    >
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Images */}
        <div className="relative lg:col-span-6">
          <ImageReveal
            src={dentalAssets.clinic.exterior}
            alt="Carewell — The Dental Experts clinic exterior, Vengara"
            aspect="aspect-[4/5]"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
          <div
            ref={parallax}
            className="absolute -bottom-10 -right-4 w-40 sm:w-56 lg:-right-10"
          >
            <ImageReveal
              src={dentalAssets.clinic.reception}
              alt="Reception welcoming a patient at Carewell"
              aspect="aspect-square"
              sizes="220px"
            />
          </div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-6 lg:pl-6">
          <p className="mb-6 font-mono text-eyebrow uppercase text-pink">About us</p>
          <RevealText
            as="h2"
            lines={["Care that goes", "beyond the chair."]}
            className="font-display text-display-md uppercase text-ink"
          />
          <div className="mt-8 max-w-md space-y-5 text-ash">
            <p className="leading-relaxed">
              Carewell — The Dental Experts is a patient-focused dental clinic in
              Vengara, bringing together specialists across endodontics,
              orthodontics, periodontics, implantology and oral surgery.
            </p>
            <p className="leading-relaxed">
              From a routine check-up to advanced treatment, our aim is simple:
              honest guidance, precise care, and a comfortable experience from
              the first consultation onward.
            </p>
          </div>
        </div>
      </div>

      {/* Supporting video moment */}
      <div ref={videoReveal} className="mt-20 lg:mt-28">
        <AmbientVideo
          src={dentalAssets.clinic.dentistVideo}
          poster={dentalAssets.clinic.dentistPoster}
          alt="Inside Carewell — The Dental Experts"
          aspect="aspect-[21/9]"
          className="rounded-sm"
        />
      </div>
    </section>
  );
}
