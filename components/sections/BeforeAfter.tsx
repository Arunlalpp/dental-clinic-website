"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { beforeAfterCases } from "@/data/testimonials";
import RevealText from "@/components/ui/RevealText";
import AmbientVideo from "@/components/ui/AmbientVideo";
import { dentalAssets } from "@/data/dental-assets";

/**
 * Smile transformations. Renders REAL cases only (from data/testimonials.ts,
 * which is empty until the clinic supplies consented before/after images).
 * While empty, this shows one generated, clearly-labelled "illustrative
 * example" graphic instead of a real patient result — never merged into
 * `beforeAfterCases`, which is reserved for genuine, consented cases. The
 * draggable comparison component is ready for when real data exists.
 */
function Compare({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);

  const setFromClientX = (clientX: number) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-sm bg-ink-soft"
      onMouseMove={(e) => e.buttons === 1 && setFromClientX(e.clientX)}
      onPointerMove={(e) => setFromClientX(e.clientX)}
      role="slider"
      aria-label={`${label} before and after comparison`}
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
        if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
      }}
    >
      <Image src={after} alt={`${label} after`} fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={`${label} before`} fill className="object-cover" sizes="100vw" />
      </div>
      <div
        className="absolute inset-y-0 w-0.5 bg-white"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-white text-ink shadow">
          ⇄
        </span>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const hasCases = beforeAfterCases.length > 0;

  return (
    <section id="results" aria-label="Smile transformations" className="bg-paper">
      <div className="mx-auto max-w-edge px-5 py-24 sm:px-8 lg:py-32">
        <RevealText
          as="h2"
          lines={["Smiles that speak", "for themselves."]}
          className="max-w-3xl font-display text-display-md uppercase text-ink"
        />

        {hasCases ? (
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {beforeAfterCases.map((c) => (
              <div key={c.id}>
                <Compare before={c.before} after={c.after} label={c.label} />
                <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-widest text-ash">
                  {c.label}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="relative overflow-hidden rounded-sm bg-ink-soft">
              <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-ink">
                Illustrative example
              </span>
              <Image
                src={dentalAssets.beforeAfter.illustrative}
                alt="Illustrative example of a smile design transformation — not an actual patient"
                width={1200}
                height={800}
                sizes="(max-width:1024px) 100vw, 50vw"
                className="w-full object-cover"
              />
            </div>
            <div>
              <AmbientVideo
                src={dentalAssets.beforeAfter.video}
                poster={dentalAssets.beforeAfter.poster}
                alt="A patient reviewing a treatment plan at Carewell"
                aspect="aspect-[4/3]"
                className="rounded-sm"
              />
              <p className="mt-6 max-w-md text-ash">
                Real smile-transformation cases will appear here once available.
                We only publish before-and-after images with patient consent.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
