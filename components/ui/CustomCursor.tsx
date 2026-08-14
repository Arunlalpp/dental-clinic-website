"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Subtle desktop custom cursor.
 *   • default: small dot
 *   • hovering [data-cursor="LABEL"]: ring expands and shows LABEL
 *     (e.g. VIEW on images, BOOK on the appointment CTA)
 *   • hovering links/buttons without a label: ring expands quietly
 * Fully disabled on touch devices and under reduced-motion — the native
 * cursor is untouched there.
 *
 * The dot and ring use the brand pink with a white halo (box-shadow) rather
 * than `mix-blend-difference` — difference-blending white washed out to a
 * barely-visible near-white smear over the site's light `paper`/`white`
 * sections. A solid pink + white outline stays legible on every background,
 * light or dark, without depending on blend-mode compositing.
 */
export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  // Decide once whether this device gets a custom cursor at all.
  useEffect(() => {
    const ok =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(ok);
  }, []);

  // Wire up the actual tracking only once `enabled` has caused the dot/ring
  // to mount. Doing this in the same effect as `setEnabled(true)` above would
  // bind gsap.quickTo to `dot.current`/`ring.current` while they're still
  // null — the component returns null until that state update lands, so
  // there's nothing in the DOM yet. quickTo silently resolves a null target
  // to zero elements, so the returned setters exist but never move anything:
  // the cursor renders (once visible) but never tracks the pointer.
  useEffect(() => {
    if (!enabled) return;
    const dotEl = dot.current;
    const ringEl = ring.current;
    if (!dotEl || !ringEl) return;

    document.documentElement.classList.add("cursor-none");

    const xDot = gsap.quickTo(dotEl, "x", { duration: 0.15, ease: "power3" });
    const yDot = gsap.quickTo(dotEl, "y", { duration: 0.15, ease: "power3" });
    const xRing = gsap.quickTo(ringEl, "x", { duration: 0.35, ease: "power3" });
    const yRing = gsap.quickTo(ringEl, "y", { duration: 0.35, ease: "power3" });

    const move = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button"
      );
      if (el) {
        setActive(true);
        setLabel(el.getAttribute("data-cursor") ?? "");
      } else {
        setActive(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <div
        ref={dot}
        className="fixed left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink shadow-[0_0_0_2px_rgba(255,255,255,0.9)]"
      />
      <div
        ref={ring}
        className={`fixed left-0 top-0 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-pink bg-white/10 font-mono text-[0.6rem] uppercase tracking-widest text-pink shadow-[0_0_0_1.5px_rgba(255,255,255,0.9)] backdrop-blur-[2px] transition-[width,height,background-color] duration-300 ease-premium ${
          active
            ? label
              ? "h-16 w-16 bg-pink text-white"
              : "h-10 w-10"
            : "h-8 w-8"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
