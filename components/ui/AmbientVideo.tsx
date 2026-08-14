"use client";

import { useEffect, useRef } from "react";

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

  return (
    <div className={`relative overflow-hidden bg-ink-soft ${aspect} ${className}`}>
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
  );
}
