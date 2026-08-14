"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { doctors } from "@/data/doctors";
import RevealText from "@/components/ui/RevealText";
import AmbientVideo from "@/components/ui/AmbientVideo";
import { dentalAssets } from "@/data/dental-assets";

/**
 * Doctor carousel. Native scroll-snap track (smooth on touch, no heavy carousel
 * lib) with pointer-drag on desktop, prev/next controls, and a progress
 * indicator. Portraits are monogram placeholders until real photos are supplied
 * — no stock faces. A generic, unattributed team clip runs above the carousel
 * for atmosphere; it is deliberately not paired with any single doctor's card,
 * since it doesn't depict any of the specific clinicians named below.
 */
function initials(name: string) {
  return name
    .replace(/^Dr\.?\s*/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function Doctors() {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  // drag-to-scroll (desktop)
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(hover: none)").matches) return; // touch uses native
    let down = false;
    let startX = 0;
    let startScroll = 0;
    const onDown = (e: PointerEvent) => {
      down = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startScroll - (e.clientX - startX);
    };
    const onUp = (e: PointerEvent) => {
      down = false;
      el.style.cursor = "";
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerleave", onUp);
    };
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const w = card ? card.offsetWidth + 16 : 320;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const w = card ? card.offsetWidth + 16 : 320;
    setIndex(Math.round(el.scrollLeft / w));
  };

  return (
    <section id="doctors" aria-label="Our doctors" className="bg-paper">
      <div className="mx-auto max-w-edge px-5 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-6 font-mono text-eyebrow uppercase text-pink">
              Our specialists
            </p>
            <RevealText
              as="h2"
              lines={["Meet the", "experts."]}
              className="font-display text-display-md uppercase text-ink"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous doctor"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next doctor"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <AmbientVideo
          src={dentalAssets.doctorsSection.teamVideo}
          poster={dentalAssets.doctorsSection.teamPoster}
          alt="The Carewell team at work"
          aspect="aspect-[21/7]"
          className="mt-10 rounded-sm"
        />

        <ul
          ref={track}
          onScroll={onScroll}
          role="list"
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {doctors.map((d) => (
            <li
              key={d.id}
              data-card
              className="group w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[30%] xl:w-[23%]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-ink-soft">
                <div className="absolute inset-0 grid place-items-center">
                  <span className="font-display text-6xl text-paper/25">
                    {initials(d.name)}
                  </span>
                </div>
                {/* hover overlay */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-5 opacity-0 transition-opacity duration-500 ease-premium group-hover:opacity-100">
                  <p className="text-sm text-paper/85">
                    {d.specialty ?? d.role}
                    {d.affiliation ? ` · ${d.affiliation}` : ""}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-display text-lg uppercase tracking-tight text-ink">
                  {d.name}
                </p>
                <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-widest text-ash">
                  {d.qualification} · {d.role}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* progress indicator */}
        <div className="mt-6 flex items-center gap-4">
          <span className="font-mono text-xs tabular-nums text-ink">
            {String(Math.min(index + 1, doctors.length)).padStart(2, "0")}
          </span>
          <span className="h-px flex-1 bg-ink/15">
            <span
              className="block h-px bg-ink transition-all duration-300"
              style={{ width: `${((index + 1) / doctors.length) * 100}%` }}
            />
          </span>
          <span className="font-mono text-xs tabular-nums text-ash">
            {String(doctors.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
