"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import { gsap } from "gsap";

type Variant = "solid" | "outline" | "ghost";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  cursorLabel?: string;
  ariaLabel?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium transition-colors duration-500 ease-premium will-change-transform";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-white hover:bg-gradient-to-br hover:from-pink hover:to-accent",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white",
  ghost: "text-ink hover:text-pink",
};

/**
 * Magnetic hover: the button eases toward the cursor within its bounds.
 * Disabled on touch and under reduced-motion (renders as a normal control).
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  cursorLabel,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const xTo = useRef<((v: number) => void) | null>(null);
  const yTo = useRef<((v: number) => void) | null>(null);

  const enable = () => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  };

  const onEnter = () => {
    if (!enable() || !ref.current) return;
    xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "power3.out" });
    yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "power3.out" });
  };

  const onMove = (e: React.MouseEvent) => {
    if (!enable() || !ref.current || !xTo.current || !yTo.current) return;
    const r = ref.current.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    xTo.current(relX * 0.3);
    yTo.current(relY * 0.4);
  };

  const onLeave = () => {
    if (!ref.current) return;
    xTo.current?.(0);
    yTo.current?.(0);
  };

  const cls = `${base} ${variants[variant]} ${className}`;
  const cursorAttr = cursorLabel ? { "data-cursor": cursorLabel } : {};

  if (href) {
    return (
      <Link
        ref={ref}
        href={href}
        aria-label={ariaLabel}
        className={cls}
        onMouseEnter={onEnter}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        {...cursorAttr}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={cls}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...cursorAttr}
    >
      {children}
    </button>
  );
}
