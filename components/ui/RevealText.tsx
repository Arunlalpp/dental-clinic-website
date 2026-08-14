"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

interface Props {
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  stagger?: number;
  start?: string;
}

/**
 * Reveals each line by sliding it up out of a mask. The full text is present
 * in the DOM as real text (one line per element), so screen readers and
 * copy/paste get the complete, ordered content. Under reduced-motion the
 * lines are simply shown.
 */
export default function RevealText({
  lines,
  as,
  className = "",
  lineClassName = "",
  stagger = 0.1,
  start = "top 85%",
}: Props) {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const inner = el.querySelectorAll<HTMLElement>("[data-line] > span");
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(inner, { yPercent: 0 });
        return;
      }
      gsap.set(inner, { yPercent: 115 });
      gsap.to(inner, {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        stagger,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [stagger, start]);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} data-line className={`reveal-line ${lineClassName}`}>
          <span>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
