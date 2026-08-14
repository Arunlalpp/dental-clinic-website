"use client";

import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";
import { clinic, telHref, waHref } from "@/data/clinic";
import { dentalAssets } from "@/data/dental-assets";
import MagneticButton from "@/components/ui/MagneticButton";
import RevealText from "@/components/ui/RevealText";
import { useScaleOnScroll } from "@/lib/animations/hooks";

export default function AppointmentCTA() {
  const imageRef = useScaleOnScroll<HTMLDivElement>(1, 1.12);

  return (
    <section aria-label="Book an appointment" className="relative overflow-hidden bg-ink text-paper">
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src={dentalAssets.cta.background}
          alt="A patient leaving Carewell with a confident smile"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/50" />
      </div>
      <div className="relative mx-auto max-w-edge px-5 py-28 text-center sm:px-8 lg:py-40">
        <RevealText
          as="h2"
          lines={["Ready to", "love your", "smile?"]}
          className="mx-auto font-display text-display-xl uppercase leading-[0.9] text-paper"
        />
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href="/contact"
            variant="solid"
            cursorLabel="BOOK"
            className="!bg-paper !text-ink hover:!bg-gradient-to-br hover:!from-pink hover:!to-accent hover:!text-white"
          >
            Book Appointment
          </MagneticButton>
          <MagneticButton
            href={telHref(clinic.phonePrimary)}
            variant="outline"
            className="!border-paper/30 !text-paper hover:!bg-paper hover:!text-ink"
          >
            <Phone size={16} /> Call Clinic
          </MagneticButton>
          <MagneticButton
            href={waHref(clinic.whatsapp, "Hi, I'd like to book an appointment.")}
            variant="outline"
            className="!border-paper/30 !text-paper hover:!bg-paper hover:!text-ink"
          >
            <MessageCircle size={16} /> WhatsApp Us
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
