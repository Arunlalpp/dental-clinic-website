"use client";

import Link from "next/link";
import { Phone, MessageCircle, CalendarDays } from "lucide-react";
import { clinic, telHref, waHref } from "@/data/clinic";

/**
 * Mobile-only fixed action bar. Respects the iOS home-indicator safe area and
 * is hidden on lg+. Kept slim so it doesn't cover content; pages add matching
 * bottom padding where needed.
 */
export default function FloatingActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-ink/10 bg-paper/90 backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3">
        <a
          href={telHref(clinic.phonePrimary)}
          className="flex flex-col items-center justify-center gap-1 py-3 text-[0.7rem] font-medium text-ink"
        >
          <Phone size={18} />
          Call
        </a>
        <a
          href={waHref(clinic.whatsapp, "Hi, I'd like to book an appointment.")}
          className="flex flex-col items-center justify-center gap-1 border-x border-ink/10 py-3 text-[0.7rem] font-medium text-ink"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center gap-1 bg-ink py-3 text-[0.7rem] font-medium text-white"
        >
          <CalendarDays size={18} />
          Book
        </Link>
      </div>
    </div>
  );
}
