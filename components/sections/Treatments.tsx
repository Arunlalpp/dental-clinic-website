"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { treatments } from "@/data/treatments";
import RevealText from "@/components/ui/RevealText";
import AmbientVideo from "@/components/ui/AmbientVideo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const listRef = useRef<HTMLUListElement>(null);
  const mobileListRef = useRef<HTMLUListElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Auto-scrolling gallery filmstrip: a duplicated track drifts left
  // continuously (marquee), pausing on hover/focus and disabled entirely
  // under reduced-motion (the strip just sits static, still scrollable).
  useEffect(() => {
    const track = marqueeRef.current;
    if (!track || reduce) return;
    const halfWidth = track.scrollWidth / 2;
    if (halfWidth <= 0) return;

    const tween = gsap.fromTo(
      track,
      { x: 0 },
      { x: -halfWidth, duration: halfWidth / 40, ease: "none", repeat: -1 }
    );
    const pause = () => tween.pause();
    const play = () => tween.play();
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", play);
    track.addEventListener("focusin", pause);
    track.addEventListener("focusout", play);
    return () => {
      tween.kill();
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", play);
      track.removeEventListener("focusin", pause);
      track.removeEventListener("focusout", play);
    };
  }, [reduce]);

  const galleryItems = treatments.filter((t) => t.image || t.videoPoster);

  // Rows fade/rise in with a stagger as the list scrolls into view.
  useEffect(() => {
    const lists = [listRef.current, mobileListRef.current].filter(
      (el): el is HTMLUListElement => !!el
    );
    const ctx = gsap.context(() => {
      lists.forEach((list) => {
        const rows = list.querySelectorAll<HTMLElement>("[data-row]");
        if (!rows.length) return;
        gsap.fromTo(
          rows,
          reduce ? { opacity: 0 } : { opacity: 0, x: 24 },
          {
            opacity: 1,
            x: 0,
            duration: reduce ? 0.4 : 0.7,
            ease: "power3.out",
            stagger: reduce ? 0 : 0.08,
            scrollTrigger: { trigger: list, start: "top 85%", once: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, [reduce]);

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

              {/* Preview panel — crossfades with the active treatment */}
              <div className="relative mt-10 aspect-[5/4] w-full overflow-hidden rounded-sm bg-ink-soft">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0.15 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
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
                  </motion.div>
                </AnimatePresence>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.id}
                  initial={{ opacity: 0, y: reduce ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-6 max-w-sm text-sm leading-relaxed text-ash"
                >
                  {current.blurb}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive list */}
          <ul ref={listRef} className="lg:col-span-7" role="list">
            {treatments.map((t, i) => {
              const isActive = i === active;
              return (
                <li key={t.id} data-row>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={isActive}
                    className="group relative flex w-full items-center gap-6 border-b border-ink/10 py-6 text-left transition-colors"
                  >
                    <span
                      className={`absolute inset-y-0 -left-4 w-0.5 origin-top scale-y-0 bg-pink transition-transform duration-500 ease-premium ${
                        isActive ? "scale-y-100" : ""
                      }`}
                      aria-hidden
                    />
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
          <ul ref={mobileListRef} role="list" className="border-t border-ink/10">
            {treatments.map((t, i) => {
              const open = i === active;
              return (
                <li key={t.id} data-row className="border-b border-ink/10">
                  <button
                    type="button"
                    onClick={() => setActive(open ? -1 : i)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-4 py-5 text-left transition-colors active:text-pink"
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

      {/* Auto-scrolling gallery filmstrip — full-bleed, continuously drifting */}
      {galleryItems.length > 0 && (
        <div className="mt-16 overflow-hidden border-y border-ink/10 py-6 lg:mt-24">
          <div
            ref={marqueeRef}
            tabIndex={0}
            className="flex w-max gap-4 outline-none"
          >
            {[...galleryItems, ...galleryItems].map((t, i) => (
              <button
                type="button"
                key={`${t.id}-${i}`}
                onClick={() => setActive(treatments.findIndex((x) => x.id === t.id))}
                data-cursor="VIEW"
                className="group relative h-40 w-56 shrink-0 overflow-hidden rounded-sm bg-ink-soft sm:h-48 sm:w-72"
                aria-hidden={i >= galleryItems.length}
                tabIndex={i >= galleryItems.length ? -1 : 0}
              >
                <Image
                  src={(t.videoPoster ?? t.image)!}
                  alt={`${t.title} — Carewell Dental Experts`}
                  fill
                  sizes="288px"
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 ease-premium group-hover:opacity-100">
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest text-white">
                    {t.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
