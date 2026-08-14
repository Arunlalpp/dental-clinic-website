"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { X, Phone, MessageCircle } from "lucide-react";
import { navLinks } from "@/lib/constants/nav";
import { clinic, telHref, waHref } from "@/data/clinic";

/**
 * Premium fullscreen mobile menu. Panel wipes in from the top; items stagger
 * up sequentially. Locks body scroll while open and traps focus lightly by
 * moving focus to the close button. Closes on Escape.
 */
export default function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-nav-item]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (open) {
      document.body.style.overflow = "hidden";
      closeBtn.current?.focus();
      if (reduce) {
        gsap.set(el, { clipPath: "inset(0 0 0% 0)", autoAlpha: 1 });
        gsap.set(items, { autoAlpha: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline();
      tl.set(el, { autoAlpha: 1 })
        .fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.6, ease: "power4.inOut" }
        )
        .fromTo(
          items,
          { yPercent: 120, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "power4.out", stagger: 0.07 },
          "-=0.2"
        );
    } else {
      document.body.style.overflow = "";
      gsap.to(el, { autoAlpha: 0, duration: 0.3 });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="invisible fixed inset-0 z-[80] flex flex-col bg-ink px-6 pb-10 pt-6 text-paper opacity-0 lg:hidden"
      style={{ paddingBottom: "calc(2.5rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center justify-between">
        <span className="font-display text-lg uppercase tracking-tight">
          {clinic.shortName}
        </span>
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid h-11 w-11 place-items-center rounded-full border border-paper/20"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="mt-auto">
        <ul className="space-y-1">
          {navLinks.map((l) => (
            <li key={l.href} className="reveal-line">
              <Link
                href={l.href}
                onClick={onClose}
                data-nav-item
                className="block py-2 font-display text-[13vw] uppercase leading-none text-paper"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 flex gap-3">
        <a
          href={telHref(clinic.phonePrimary)}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-paper/25 py-3 text-sm"
        >
          <Phone size={16} /> Call
        </a>
        <a
          href={waHref(clinic.whatsapp, "Hi, I'd like to book an appointment.")}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-pink to-accent py-3 text-sm text-white"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </div>
  );
}
