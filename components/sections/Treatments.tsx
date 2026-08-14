"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, ArrowUpRight } from "lucide-react";
import { treatments } from "@/data/treatments";
import RevealText from "@/components/ui/RevealText";
import AmbientVideo from "@/components/ui/AmbientVideo";

/**
 * The signature interaction. Desktop: a sticky left column ("Precision for
 * every smile.") beside an interactive list — hovering/focusing a row makes it
 * active, moving its number, revealing its description, and swapping the
 * preview panel. Mobile: the same data as a touch-friendly accordion (no
 * hover dependency, no forced horizontal scroll).
 */
export default function Treatments() {
  const [active, setActive] = useState(0);
  const current = treatments[active];

  return (
    <section
      id="treatments"
      aria-label="Treatments"
      className="bg-white"
    >
      <div className="mx-auto max-w-edge px-5 py-24 sm:px-8 lg:py-32">
        {/* ---------- Desktop / tablet ---------- */}
        <div className="hidden gap-12 lg:grid lg:grid-cols-12">
          {/* Sticky heading + preview */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <p className="mb-6 font-mono text-eyebrow uppercase text-pink">
                Our treatments
              </p>
              <RevealText
                as="h2"
                lines={["Precision", "for every", "smile."]}
                className="font-display text-display-md uppercase text-ink"
              />

              {/* Preview panel — swaps with the active treatment */}
              <div
                key={current.id}
                className="mt-10 aspect-[5/4] w-full overflow-hidden rounded-sm bg-ink-soft"
              >
                {current.video ? (
                  <AmbientVideo
                    src={current.video}
                    poster={current.videoPoster ?? current.image ?? ""}
                    alt={`${current.title} — Carewell Dental Experts`}
                    aspect="aspect-[5/4]"
                    className="!bg-transparent"
                  />
                ) : current.image ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={current.image}
                      alt={`${current.title} — Carewell Dental Experts`}
                      fill
                      sizes="(max-width:1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="grid h-full place-items-center px-6 text-center">
                    <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ash-light">
                      {current.title} image coming soon
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ash">
                {current.blurb}
              </p>
            </div>
          </div>

          {/* Interactive list */}
          <ul className="lg:col-span-7" role="list">
            {treatments.map((t, i) => {
              const isActive = i === active;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={isActive}
                    className="group flex w-full items-center gap-6 border-b border-ink/10 py-6 text-left transition-colors"
                  >
                    <span
                      className={`font-mono text-sm tabular-nums transition-colors ${
                        isActive ? "text-pink" : "text-ash-light"
                      }`}
                    >
                      {t.index}
                    </span>
                    <span
                      className={`font-display text-2xl uppercase tracking-tight transition-all duration-500 ease-premium xl:text-3xl ${
                        isActive ? "translate-x-2 text-ink" : "text-ink/60"
                      }`}
                    >
                      {t.title}
                    </span>
                    <ArrowUpRight
                      size={22}
                      className={`ml-auto shrink-0 transition-all duration-500 ease-premium ${
                        isActive
                          ? "translate-x-0 text-pink opacity-100"
                          : "-translate-x-2 opacity-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---------- Mobile: accordion ---------- */}
        <div className="lg:hidden">
          <p className="mb-5 font-mono text-eyebrow uppercase text-pink">
            Our treatments
          </p>
          <RevealText
            as="h2"
            lines={["Precision for", "every smile."]}
            className="mb-8 font-display text-display-md uppercase text-ink"
          />
          <ul role="list" className="border-t border-ink/10">
            {treatments.map((t, i) => {
              const open = i === active;
              return (
                <li key={t.id} className="border-b border-ink/10">
                  <button
                    type="button"
                    onClick={() => setActive(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span className="font-mono text-xs tabular-nums text-ash-light">
                      {t.index}
                    </span>
                    <span className="font-display text-xl uppercase tracking-tight text-ink">
                      {t.title}
                    </span>
                    <Plus
                      size={18}
                      className={`ml-auto shrink-0 text-ash transition-transform duration-300 ${
                        open ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-premium"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden pb-6">
                      {t.image && (
                        <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-sm bg-ink-soft">
                          <Image
                            src={t.image}
                            alt={`${t.title} — Carewell Dental Experts`}
                            fill
                            sizes="100vw"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <p className="text-sm leading-relaxed text-ash">{t.blurb}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
