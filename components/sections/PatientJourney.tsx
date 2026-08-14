"use client";

import Image from "next/image";
import { useSlideUp } from "@/lib/animations/hooks";
import RevealText from "@/components/ui/RevealText";
import AmbientVideo from "@/components/ui/AmbientVideo";
import { dentalAssets } from "@/data/dental-assets";

const steps = [
  { n: "01", t: "Consultation", d: "We listen, examine, and explain your options honestly." },
  { n: "02", t: "Personalized Plan", d: "A treatment plan shaped around your needs and comfort." },
  { n: "03", t: "Confident Smile", d: "Precise care that gets you smiling with confidence." },
];

export default function PatientJourney() {
  const ref = useSlideUp<HTMLOListElement>();
  return (
    <section aria-label="Your journey" className="bg-white">
      <div className="mx-auto max-w-edge px-5 py-24 sm:px-8 lg:py-32">
        <RevealText
          as="h2"
          lines={["A simple path", "to better care."]}
          className="max-w-2xl font-display text-display-md uppercase text-ink"
        />
        <ol ref={ref} className="mt-16 grid gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="border-t border-ink pt-6">
              <span className="font-mono text-sm text-pink">{s.n}</span>
              <h3 className="mt-4 font-display text-3xl uppercase tracking-tight text-ink">
                {s.t}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">{s.d}</p>
            </li>
          ))}
        </ol>

        {/* Supporting mood imagery — unattributed, no quote or name implied */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-20">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-ink-soft">
            <Image
              src={dentalAssets.patientJourney.patient}
              alt="Patients at ease during a visit to Carewell"
              fill
              sizes="(max-width:640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <AmbientVideo
            src={dentalAssets.patientJourney.video}
            poster={dentalAssets.patientJourney.poster}
            alt="Gentle, comfortable dental care at Carewell"
            aspect="aspect-[4/3]"
            className="rounded-sm"
          />
        </div>
      </div>
    </section>
  );
}
