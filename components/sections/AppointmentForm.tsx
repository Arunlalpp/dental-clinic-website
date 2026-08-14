"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Check } from "lucide-react";
import { clinic, waHref } from "@/data/clinic";
import { treatments } from "@/data/treatments";

/**
 * Appointment REQUEST form. There is no backend wired in, so this does not
 * pretend an appointment is confirmed. On submit it validates, shows a success
 * state making clear the clinic will follow up, and hands the details to
 * WhatsApp with a prefilled message so the request actually reaches the clinic.
 *
 * To use email/DB instead: POST the payload to a real endpoint in `handleSubmit`
 * and keep the same success UI.
 */
type Fields = {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  treatment: string;
  message: string;
};

const empty: Fields = {
  name: "",
  phone: "",
  email: "",
  date: "",
  time: "",
  treatment: "",
  message: "",
};

export default function AppointmentForm() {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent && successRef.current) {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(
          successRef.current.children,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
        );
      }
    }
  }, [sent]);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((s) => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    const err: Partial<Record<keyof Fields, string>> = {};
    if (!f.name.trim()) err.name = "Please enter your name.";
    if (!/^[0-9+\-\s]{7,}$/.test(f.phone)) err.phone = "Please enter a valid phone number.";
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
      err.email = "Please enter a valid email.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const lines = [
      "New appointment request",
      `Name: ${f.name}`,
      `Phone: ${f.phone}`,
      f.email && `Email: ${f.email}`,
      f.treatment && `Treatment: ${f.treatment}`,
      (f.date || f.time) && `Preferred: ${f.date} ${f.time}`.trim(),
      f.message && `Message: ${f.message}`,
    ].filter(Boolean) as string[];

    // Hand off to WhatsApp so the request genuinely reaches the clinic.
    window.open(waHref(clinic.whatsapp, lines.join("\n")), "_blank", "noopener");
    setSent(true);
  };

  if (sent) {
    return (
      <div
        ref={successRef}
        className="rounded-sm border border-ink/10 bg-white px-6 py-16 text-center"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-pink/15 text-pink">
          <Check size={28} />
        </span>
        <h3 className="mt-6 font-display text-2xl uppercase tracking-tight text-ink">
          Request received
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ash">
          Thanks, {f.name || "there"}. This is a request, not a confirmed
          booking — the clinic will contact you to confirm your appointment. If
          your WhatsApp didn’t open, call {clinic.phonePrimary}.
        </p>
        <button
          type="button"
          onClick={() => {
            setF(empty);
            setSent(false);
          }}
          className="mt-8 text-sm text-pink underline underline-offset-4"
        >
          Send another request
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-sm border border-ink/15 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-ink";
  const labelCls = "mb-2 block font-mono text-eyebrow uppercase text-ash";

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label htmlFor="name" className={labelCls}>Patient name *</label>
        <input id="name" value={f.name} onChange={set("name")} className={field} autoComplete="name" />
        {errors.name && <p className="mt-1 text-xs text-pink">{errors.name}</p>}
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="phone" className={labelCls}>Phone number *</label>
        <input id="phone" value={f.phone} onChange={set("phone")} className={field} inputMode="tel" autoComplete="tel" />
        {errors.phone && <p className="mt-1 text-xs text-pink">{errors.phone}</p>}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="email" className={labelCls}>Email</label>
        <input id="email" value={f.email} onChange={set("email")} className={field} inputMode="email" autoComplete="email" />
        {errors.email && <p className="mt-1 text-xs text-pink">{errors.email}</p>}
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="date" className={labelCls}>Preferred date</label>
        <input id="date" type="date" value={f.date} onChange={set("date")} className={field} />
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="time" className={labelCls}>Preferred time</label>
        <input id="time" type="time" value={f.time} onChange={set("time")} className={field} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="treatment" className={labelCls}>Treatment</label>
        <select id="treatment" value={f.treatment} onChange={set("treatment")} className={field}>
          <option value="">Select a treatment (optional)</option>
          {treatments.map((t) => (
            <option key={t.id} value={t.title}>{t.title}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={labelCls}>Message</label>
        <textarea id="message" value={f.message} onChange={set("message")} rows={4} className={field} />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full rounded-full bg-ink px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-pink sm:w-auto"
        >
          Request Appointment
        </button>
        <p className="mt-3 text-xs text-ash">
          Submitting opens WhatsApp with your details so the clinic can confirm.
          No appointment is booked until the clinic responds.
        </p>
      </div>
    </form>
  );
}
