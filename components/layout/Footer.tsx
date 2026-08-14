"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, MapPin } from "lucide-react";
import { clinic, telHref, waHref } from "@/data/clinic";
import { navLinks } from "@/lib/constants/nav";
import { treatments } from "@/data/treatments";
import { dentalAssets } from "@/data/dental-assets";
import RevealText from "@/components/ui/RevealText";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      {/* Subtle brand texture — no video, kept light for footer performance */}
      <Image
        src={dentalAssets.footer.backgroundCrop}
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="object-cover opacity-[0.08]"
      />
      <div className="relative mx-auto max-w-edge px-5 py-20 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand + contact */}
          <div className="md:col-span-5">
            <p className="font-display text-2xl uppercase tracking-tight">
              {clinic.shortName}
            </p>
            <p className="mt-1 font-mono text-eyebrow uppercase text-paper/50">
              The Dental Experts
            </p>
            <address className="mt-8 space-y-2 not-italic text-sm text-paper/70">
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                {clinic.address.line1}, {clinic.address.area}, {clinic.address.region}
              </p>
              <p>
                <a href={telHref(clinic.phonePrimary)} className="hover:text-paper">
                  {clinic.phonePrimary}
                </a>{" "}
                ·{" "}
                <a href={waHref(clinic.whatsapp)} className="hover:text-paper">
                  WhatsApp
                </a>
              </p>
              <p>
                <a href={`mailto:${clinic.email}`} className="hover:text-paper">
                  {clinic.email}
                </a>
              </p>
              <p className="text-paper/50">
                {clinic.hours.label} · Closed {clinic.hours.closedDay}
              </p>
            </address>
            <div className="mt-6 flex gap-3">
              <a
                href={clinic.social.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 hover:bg-paper hover:text-ink"
              >
                <Instagram size={18} />
              </a>
              <a
                href={clinic.social.facebook}
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 hover:bg-paper hover:text-ink"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div className="md:col-span-3">
            <p className="font-mono text-eyebrow uppercase text-paper/40">Navigate</p>
            <ul className="mt-5 space-y-2 text-sm text-paper/70">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div className="md:col-span-4">
            <p className="font-mono text-eyebrow uppercase text-paper/40">Treatments</p>
            <ul className="mt-5 grid grid-cols-1 gap-y-2 text-sm text-paper/70 sm:grid-cols-2">
              {treatments.slice(0, 10).map((t) => (
                <li key={t.id}>
                  <Link href="/treatments" className="hover:text-paper">
                    {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-20 border-t border-paper/10 pt-12">
          <RevealText
            as="p"
            lines={["Keep", "smiling."]}
            className="font-display text-display-lg uppercase leading-[0.9] text-paper"
          />
        </div>

        <div className="mt-12 flex flex-col gap-2 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {clinic.name}. All rights reserved.
          </p>
          <a
            href={clinic.maps.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-paper/70"
          >
            Get directions ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
