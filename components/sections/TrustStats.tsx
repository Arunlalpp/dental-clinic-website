"use client";

import { useSlideUp, useImageReveal } from "@/lib/animations/hooks";
import Image from "next/image";
import AmbientVideo from "@/components/ui/AmbientVideo";
import { dentalAssets } from "@/data/dental-assets";

/**
 * "Why Carewell." Uses qualitative, verifiable descriptors — NOT invented
 * numbers (no "20,000 patients" / "15 years"), per the content rules.
 */
const points = [
  { k: "Specialist", v: "Experienced dental specialists across every discipline" },
  { k: "Advanced", v: "Modern treatments from diagnostics to implants" },
  { k: "Patient-first", v: "Care planned around each patient, gently" },
  { k: "Complete", v: "Comprehensive dental services under one roof" },
];

export default function TrustStats() {
  const ref = useSlideUp<HTMLDivElement>();
  const imageRef = useImageReveal<HTMLDivElement>();

  return (
    <section
      aria-label="Why Carewell"
      className="border-y border-ink/10 bg-white"
    >
      <div className="mx-auto max-w-edge px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <p className="mb-10 font-mono text-eyebrow uppercase text-pink">
              Trusted dental care in Vengara
            </p>
            <div
              ref={ref}
              className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2"
            >
              {points.map((p) => (
                <div key={p.k} className="border-t border-ink pt-4">
                  <p className="font-display text-2xl uppercase tracking-tight text-ink">
                    {p.k}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ash">{p.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual: consultation image + floating video card */}
          <div className="relative lg:col-span-5">
            <div
              ref={imageRef}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-ink-soft"
            >
              <Image
                src={dentalAssets.whyCarewell.consultation}
                alt="Dental specialist consulting a patient at Carewell"
                fill
                sizes="(max-width:1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-6 w-36 shadow-xl sm:w-48 lg:-left-10">
              <AmbientVideo
                src={dentalAssets.whyCarewell.consultationVideo}
                poster={dentalAssets.whyCarewell.consultationPoster}
                alt="A consultation at Carewell"
                aspect="aspect-square"
                className="rounded-sm ring-4 ring-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
