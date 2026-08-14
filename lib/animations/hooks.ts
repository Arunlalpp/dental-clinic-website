"use client";

/**
 * GSAP ANIMATION SYSTEM
 * =====================
 * Reusable hooks used across the site. Every hook:
 *   • registers ScrollTrigger once, safely
 *   • runs inside a gsap.context() scoped to the ref, so all tweens and
 *     ScrollTriggers are reverted automatically on unmount / route change
 *     (no memory leaks, works after Next.js navigation)
 *   • respects prefers-reduced-motion: parallax and large transforms are
 *     disabled, content is shown immediately, only gentle fades remain.
 *
 * Usage:
 *   const ref = useSlideUp<HTMLDivElement>();
 *   return <div ref={ref}>…</div>;
 */

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------------------------

/** Fade + rise as the element scrolls into view. */
export function useSlideUp<T extends HTMLElement>(opts?: {
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
}): RefObject<T | null> {
  const ref = useRef<T>(null);
  const { y = 40, duration = 1, delay = 0, start = "top 85%" } = opts ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4 });
        return;
      }
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [y, duration, delay, start]);

  return ref;
}

/** Simple opacity fade-in on scroll. */
export function useFadeIn<T extends HTMLElement>(start = "top 88%"): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: prefersReducedMotion() ? 0.4 : 1.1,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [start]);
  return ref;
}

/**
 * Line-by-line text reveal. Wrap each line in an element with
 * [data-reveal-line]; the accessible full text stays in the DOM.
 */
export function useRevealText<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = el.querySelectorAll<HTMLElement>("[data-reveal-line] > *");
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(lines, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);
  return ref;
}

/** Subtle vertical parallax. Disabled under reduced-motion. */
export function useParallax<T extends HTMLElement>(strength = 80): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -strength / 10 },
        {
          yPercent: strength / 10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [strength]);
  return ref;
}

/** Editorial clip-path image reveal with a slight scale settle. */
export function useImageReveal<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(el, { clipPath: "inset(0 0% 0 0)", opacity: 1 });
        return;
      }
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)", scale: 1.08 },
        {
          clipPath: "inset(0 0% 0 0)",
          scale: 1,
          duration: 1.3,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);
  return ref;
}

/** Scale an element up as it moves through the viewport (scrubbed). */
export function useScaleOnScroll<T extends HTMLElement>(
  from = 0.85,
  to = 1
): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: from },
        {
          scale: to,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [from, to]);
  return ref;
}

/**
 * Vertical-scroll-driven horizontal scroll for a track element.
 * Desktop only — on touch / reduced-motion the track scrolls natively.
 * Pass the wrapper (pinned) ref; the first child is treated as the track.
 */
export function useHorizontalScroll<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null);
  useEffect(() => {
    const wrapper = ref.current;
    if (!wrapper) return;
    const track = wrapper.firstElementChild as HTMLElement | null;
    if (!track) return;

    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch || prefersReducedMotion()) return; // native swipe instead

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrapper);
    return () => ctx.revert();
  }, []);
  return ref;
}

// ---------------------------------------------------------------------------

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

interface ScrollScrubOptions {
  /** The tall pinned/spacer element that defines the scrub distance. */
  trigger: RefObject<HTMLElement | null>;
  /** The <video> element to scrub. */
  video: RefObject<HTMLVideoElement | null>;
  /** Easing factor for the currentTime lerp (0..1). Lower = smoother/laggier. */
  ease?: number;
  /** Disable scrubbing entirely (e.g. mobile / reduced motion) — caller handles the fallback UI. */
  enabled?: boolean;
  /** Called every frame with scrub progress 0..1 (for overlay fades, progress bars, etc.). */
  onProgress?: (progress: number) => void;
}

/**
 * Scroll-controlled video playback: a ScrollTrigger measures progress across
 * `trigger`, and a gsap.ticker loop eases the video's `currentTime` toward
 * `progress * duration` so seeking feels smooth rather than jumpy.
 *
 * Requires an all-keyframe encode for instant seeks
 * (`ffmpeg -g 1 -keyint_min 1 -sc_threshold 0 ...`) — a normal GOP structure
 * makes arbitrary seeks decode-heavy and the scrub stutters.
 */
export function useScrollScrub({
  trigger,
  video,
  ease = 0.12,
  enabled = true,
  onProgress,
}: ScrollScrubOptions): void {
  const progressRef = useRef(0);
  const currentRef = useRef(0);
  const seekingRef = useRef(false);
  const seekStartRef = useRef(0);
  const readyRef = useRef(false);

  useEffect(() => {
    const vid = video.current;
    const trg = trigger.current;
    if (!vid || !trg || !enabled) return;

    const onMeta = () => {
      readyRef.current = Number.isFinite(vid.duration) && vid.duration > 0;
      // Reset the eased accumulator too: if the element's resource was ever
      // reloaded mid-session, duration briefly reports NaN, and NaN entering
      // this lerp via `+=` poisons it permanently, silently freezing the seek.
      currentRef.current = 0;
      seekingRef.current = false;
      try {
        vid.pause();
        vid.currentTime = 0;
      } catch {
        /* noop */
      }
    };
    if (vid.readyState >= 1 && vid.duration) onMeta();
    vid.addEventListener("loadedmetadata", onMeta);
    vid.addEventListener("loadeddata", onMeta);

    const onSeeked = () => {
      seekingRef.current = false;
    };
    vid.addEventListener("seeked", onSeeked);

    const st = ScrollTrigger.create({
      trigger: trg,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = clamp01(self.progress);
      },
    });

    const tick = () => {
      const p = progressRef.current;
      onProgress?.(p);

      if (!readyRef.current || !Number.isFinite(vid.duration)) return;

      const target = p * vid.duration;
      currentRef.current += (target - currentRef.current) * ease;
      if (Math.abs(target - currentRef.current) < 0.004) currentRef.current = target;

      // release a stuck seek latch if a 'seeked' event was missed
      if (seekingRef.current && performance.now() - seekStartRef.current > 120) {
        seekingRef.current = false;
      }

      if (
        !seekingRef.current &&
        vid.readyState >= 2 &&
        Math.abs(vid.currentTime - currentRef.current) > 0.01
      ) {
        seekingRef.current = true;
        seekStartRef.current = performance.now();
        try {
          vid.currentTime = currentRef.current;
        } catch {
          seekingRef.current = false;
        }
      }
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      st.kill();
      vid.removeEventListener("loadedmetadata", onMeta);
      vid.removeEventListener("loadeddata", onMeta);
      vid.removeEventListener("seeked", onSeeked);
    };
  }, [trigger, video, ease, enabled, onProgress]);
}
