"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { dentalAssets } from "@/data/dental-assets";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Awwwards-style transition: a contained panel scales/clips up to fill the
 * viewport as the user scrolls, revealing the statement. Under reduced-motion
 * the panel is simply shown full-size with the text visible. Background is
 * generic team photography — unattributed, so it carries no claim about any
 * specific named clinician.
 */
export default function FullWidthImage() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const panel = el.querySelector<HTMLElement>("[data-panel]");
    const text = el.querySelectorAll<HTMLElement>("[data-panel-text]");
    if (!panel) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(panel, { scale: 1, borderRadius: 0 });
        gsap.set(text, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        panel,
        { scale: 0.82, borderRadius: "8px" },
        {
          scale: 1,
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        text,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "center 70%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Statement" ref={wrap} className="px-0">
      <div
        data-panel
        className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink-soft"
      >
        <Image
          src={dentalAssets.statement.team}
          alt="The Carewell dental team in the clinic"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="relative z-10 px-6 text-center">
          <h2 className="font-display text-display-lg uppercase leading-[0.9] text-paper mix-blend-difference">
            <span data-panel-text className="block">Your smile</span>
            <span data-panel-text className="block">deserves</span>
            <span data-panel-text className="block">expert care.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
