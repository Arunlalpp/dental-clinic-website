import type { Metadata } from "next";
import { clinic, telHref, waHref } from "@/data/clinic";
import AppointmentForm from "@/components/sections/AppointmentForm";
import Location from "@/components/sections/Location";
import RevealText from "@/components/ui/RevealText";
import { Phone, MessageCircle, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Request an appointment at Carewell — The Dental Experts, Block Road, Vengara. Call, WhatsApp, or send an appointment request online.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-28">
      <section className="mx-auto max-w-edge px-5 pb-20 sm:px-8">
        <p className="mb-6 font-mono text-eyebrow uppercase text-pink">Get in touch</p>
        <RevealText
          as="h1"
          lines={["Book your", "appointment."]}
          className="font-display text-display-lg uppercase leading-[0.92] text-ink"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <AppointmentForm />
          </div>
          <aside className="lg:col-span-5">
            <div className="rounded-sm border border-ink/10 bg-white p-6">
              <p className="font-mono text-eyebrow uppercase text-ash">Prefer to talk?</p>
              <div className="mt-5 space-y-3">
                <a
                  href={telHref(clinic.phonePrimary)}
                  className="flex items-center gap-3 rounded-sm border border-ink/10 px-4 py-3 text-ink hover:border-ink"
                >
                  <Phone size={18} className="text-pink" /> {clinic.phonePrimary}
                </a>
                <a
                  href={waHref(clinic.whatsapp, "Hi, I'd like to book an appointment.")}
                  className="flex items-center gap-3 rounded-sm border border-ink/10 px-4 py-3 text-ink hover:border-ink"
                >
                  <MessageCircle size={18} className="text-pink" /> WhatsApp
                </a>
                <a
                  href={`mailto:${clinic.email}`}
                  className="flex items-center gap-3 rounded-sm border border-ink/10 px-4 py-3 text-ink hover:border-ink"
                >
                  <Mail size={18} className="text-pink" /> {clinic.email}
                </a>
              </div>
              <p className="mt-6 text-sm text-ash">
                {clinic.hours.label} · Closed {clinic.hours.closedDay}
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Location />
    </div>
  );
}
