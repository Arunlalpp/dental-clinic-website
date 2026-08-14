"use client";

import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";
import { clinic, telHref } from "@/data/clinic";
import RevealText from "@/components/ui/RevealText";

/**
 * Location. Uses a keyless Google Maps place-query embed so it works without an
 * API key; swap `embedQuery` for a signed Maps Embed API URL + place ID before
 * launch if you want a styled/pinned map. All facts come from data/clinic.ts.
 */
export default function Location() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    clinic.maps.embedQuery
  )}&output=embed`;

  return (
    <section id="location" aria-label="Find us" className="bg-white">
      <div className="mx-auto grid max-w-edge gap-10 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-32">
        <div>
          <p className="mb-6 font-mono text-eyebrow uppercase text-pink">Visit us</p>
          <RevealText
            as="h2"
            lines={["Find your way", "to a healthier", "smile."]}
            className="font-display text-display-md uppercase text-ink"
          />

          <dl className="mt-12 space-y-6">
            <div className="flex gap-4">
              <MapPin className="mt-1 shrink-0 text-pink" size={20} />
              <div>
                <dt className="font-mono text-eyebrow uppercase text-ash">Address</dt>
                <dd className="mt-1 text-ink">
                  {clinic.address.line1}, {clinic.address.area}, {clinic.address.region}
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-1 shrink-0 text-pink" size={20} />
              <div>
                <dt className="font-mono text-eyebrow uppercase text-ash">Phone</dt>
                <dd className="mt-1 text-ink">
                  <a href={telHref(clinic.phonePrimary)} className="hover:text-pink">
                    {clinic.phonePrimary}
                  </a>
                </dd>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-1 shrink-0 text-pink" size={20} />
              <div>
                <dt className="font-mono text-eyebrow uppercase text-ash">Hours</dt>
                <dd className="mt-1 text-ink">
                  {clinic.hours.label} · Closed {clinic.hours.closedDay}
                </dd>
              </div>
            </div>
          </dl>

          <a
            href={clinic.maps.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-pink"
          >
            Get directions
            <ArrowUpRight
              size={18}
              className="transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="min-h-[320px] overflow-hidden rounded-sm border border-ink/10 lg:min-h-full">
          <iframe
            title="Carewell Dental Experts location map"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[320px] w-full"
          />
        </div>
      </div>
    </section>
  );
}
