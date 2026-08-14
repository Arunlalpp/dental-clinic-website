"use client";

import { useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";

/**
 * Testimonials. Renders REAL testimonials only (data/testimonials.ts). While
 * that array is empty, the section renders nothing — no invented quotes.
 */
export default function Testimonials() {
  const [i, setI] = useState(0);
  if (testimonials.length === 0) return null;

  const t = testimonials[i];
  const move = (d: 1 | -1) =>
    setI((p) => (p + d + testimonials.length) % testimonials.length);

  return (
    <section aria-label="Patient words" className="bg-paper">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8 lg:py-36">
        <div className="flex justify-center gap-1 text-pink" aria-label={`${t.rating} out of 5`}>
          {Array.from({ length: t.rating }).map((_, k) => (
            <Star key={k} size={18} fill="currentColor" />
          ))}
        </div>
        <blockquote className="mt-8 font-display text-3xl uppercase leading-tight tracking-tight text-ink sm:text-4xl">
          “{t.quote}”
        </blockquote>
        <p className="mt-8 font-mono text-eyebrow uppercase text-ash">
          {t.name} · {t.location}
        </p>

        {testimonials.length > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={() => move(-1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 hover:bg-ink hover:text-white"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={() => move(1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 hover:bg-ink hover:text-white"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
