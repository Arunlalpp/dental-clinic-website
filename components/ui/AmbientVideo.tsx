"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  aspect?: string;
  loop?: boolean;
}

/**
 * Decorative, muted accent/background video. Plays only while in view
 * (IntersectionObserver), pauses off-screen, and never autoplays under
 * prefers-reduced-motion — the poster frame stands in instead. No controls:
 * these are ambience, not a media player.
 *
 * Also gets a one-time clip-path wipe reveal on first scroll-in, plus a
 * continuous, slow Ken-Burns scale drift (scrubbed to scroll position) on
 * the inner frame — the outer box stays a fixed size so layout never shifts,
 * only the video inside it drifts. Both are skipped under reduced-motion.
 */
export default function AmbientVideo({
  src,
  poster,
  alt,
  className = "",
  aspect = "aspect-video",
  loop = true,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.pause();
    };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    const frame = frameRef.current;
    if (!wrap || !frame) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: wrap, start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        frame,
        { scale: 1.16 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden bg-ink-soft ${aspect} ${className}`}
    >
      <div ref={frameRef} className="h-full w-full">
        <video
          ref={ref}
          muted
          loop={loop}
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={alt}
          className="h-full w-full object-cover"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
