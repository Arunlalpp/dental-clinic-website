"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navLinks } from "@/lib/constants/nav";
import { clinic } from "@/data/clinic";
import MagneticButton from "@/components/ui/MagneticButton";
import MobileNav from "./MobileNav";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const header = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const overHero = pathname === "/"; // transparent start only where there's a hero

  useEffect(() => {
    const el = header.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        start: "top -80",
        onUpdate: (self) => {
          const solid = self.scroll() > 80;
          el.classList.toggle("is-solid", solid);
        },
      });
      // ensure correct state on route change
      el.classList.toggle("is-solid", window.scrollY > 80 || !overHero);
      return () => st.kill();
    }, el);
    return () => ctx.revert();
  }, [overHero, pathname]);

  return (
    <>
      <header
        ref={header}
        data-solid-default={!overHero}
        className={`fixed inset-x-0 top-0 z-[70] transition-[background-color,backdrop-filter,box-shadow,padding] duration-500 ease-premium ${
          overHero ? "py-6" : "py-4 is-solid"
        } [&.is-solid]:border-b [&.is-solid]:border-ink/10 [&.is-solid]:bg-paper/80 [&.is-solid]:py-4 [&.is-solid]:shadow-[0_1px_30px_-10px_rgba(13,27,36,0.25)] [&.is-solid]:backdrop-blur-md`}
      >
        <div className="mx-auto flex max-w-edge items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className={`flex items-center gap-2.5 font-display text-lg font-semibold uppercase leading-none tracking-tight transition-colors duration-500 ease-premium ${
              overHero ? "text-paper [.is-solid_&]:text-ink" : "text-ink"
            }`}
            aria-label={`${clinic.shortName} home`}
          >
            <Image
              src="/icons/icon-192.png"
              alt=""
              aria-hidden="true"
              width={28}
              height={28}
              className="rounded-md"
              priority
            />
            {clinic.shortName}
            <span
              className={`ml-1 hidden font-mono text-[0.6rem] font-normal uppercase tracking-widest sm:inline ${
                overHero ? "text-paper/60 [.is-solid_&]:text-ash" : "text-ash"
              }`}
            >
              The Dental Experts
            </span>
          </Link>

          <nav className="hidden lg:block" aria-label="Primary">
            <ul className="flex items-center gap-8">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`group relative text-sm transition-colors ${
                      overHero
                        ? "text-paper/80 hover:text-paper [.is-solid_&]:text-ink/80 [.is-solid_&:hover]:text-ink"
                        : "text-ink/80 hover:text-ink"
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-500 ease-premium group-hover:w-full ${
                        overHero ? "bg-paper [.is-solid_&]:bg-ink" : "bg-ink"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <MagneticButton href="/contact" variant="solid" cursorLabel="BOOK">
              Book Appointment
            </MagneticButton>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className={`grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${
              overHero
                ? "border-paper/25 text-paper [.is-solid_&]:border-ink/15 [.is-solid_&]:text-ink"
                : "border-ink/15 text-ink"
            }`}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
