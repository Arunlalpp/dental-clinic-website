"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "@/components/ui/RevealText";
import AmbientVideo from "@/components/ui/AmbientVideo";
import { dentalAssets } from "@/data/dental-assets";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Dark capability section. The four items are capability categories the clinic
 * genuinely offers (digital RVG imaging is a listed service) — no invented
 * awards, stats, or brand names. Thin rules animate in on scroll.
 */
const capabilities = [
  { n: "01", t: "Digital Diagnostics", d: "Clear assessment before any treatment begins." },
  { n: "02", t: "Advanced Imaging", d: "Low-exposure digital RVG for precise views." },
  { n: "03", t: "Precision Treatment", d: "Specialist-led care across every discipline." },
  { n: "04", t: "Patient-Centric Care", d: "Plans built around comfort and clarity." },
];

export default function Technology() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rows = el.querySelectorAll<HTMLElement>("[data-tech-row]");
      rows.forEach((row) => {
        const line = row.querySelector("[data-tech-line]");
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          }
        );
        gsap.fromTo(
          row.querySelectorAll("[data-tech-fade]"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          }
        );
      });

      const visual = el.querySelector<HTMLElement>("[data-tech-visual]");
      if (visual) {
        gsap.fromTo(
          visual,
          { opacity: 0, x: 40, clipPath: "inset(0 0 0 100%)" },
          {
            opacity: 1,
            x: 0,
            clipPath: "inset(0 0 0 0%)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: { trigger: visual, start: "top 80%", once: true },
          }
        );
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Our approach" className="bg-ink text-paper">
      <div ref={ref} className="mx-auto max-w-edge px-5 py-24 sm:px-8 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <RevealText
              as="h2"
              lines={["Precision.", "Technology.", "Care."]}
              className="font-display text-display-lg uppercase leading-[0.9] text-paper"
            />

            <div className="mt-16">
              {capabilities.map((c) => (
                <div key={c.n} data-tech-row className="relative py-8">
                  <div
                    data-tech-line
                    className="absolute inset-x-0 top-0 h-px origin-left bg-paper/20"
                  />
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-baseline">
                    <span
                      data-tech-fade
                      className="font-mono text-sm text-pink md:col-span-1"
                    >
                      {c.n}
                    </span>
                    <h3
                      data-tech-fade
                      className="font-display text-2xl uppercase tracking-tight text-paper md:col-span-6 lg:text-3xl"
                    >
                      {c.t}
                    </h3>
                    <p
                      data-tech-fade
                      className="text-sm leading-relaxed text-paper/60 md:col-span-5"
                    >
                      {c.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual: equipment image + advanced-dentistry video, sticky on desktop */}
          <div data-tech-visual className="relative lg:sticky lg:top-28 lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-paper/5">
              <Image
                src={dentalAssets.technology.equipment}
                alt="Precision dental instruments at Carewell"
                fill
                sizes="(max-width:1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-6 w-32 shadow-2xl sm:w-44 lg:-left-10">
              <AmbientVideo
                src={dentalAssets.technology.video}
                poster={dentalAssets.technology.poster}
                alt="Advanced dentistry equipment in action"
                aspect="aspect-square"
                className="rounded-sm ring-4 ring-ink"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
