"use client";

import Image from "next/image";
import { useImageReveal } from "@/lib/animations/hooks";

interface Props {
  src?: string;
  alt: string;
  aspect?: string;      // e.g. "aspect-[4/5]"
  className?: string;
  sizes?: string;
  priority?: boolean;
  placeholderLabel?: string; // shown when no src is supplied yet
}

/**
 * Editorial clip-path image reveal. If `src` is omitted, renders a marked
 * placeholder instead of a fabricated image — supply real/licensed art and
 * pass its /public path.
 */
export default function ImageReveal({
  src,
  alt,
  aspect = "aspect-[4/5]",
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  placeholderLabel,
}: Props) {
  const ref = useImageReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-ink-soft ${aspect} ${className}`}
      data-cursor="VIEW"
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-ash-light">
            {placeholderLabel ?? alt}
          </span>
        </div>
      )}
    </div>
  );
}
