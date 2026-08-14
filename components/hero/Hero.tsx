"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, Phone } from "lucide-react";
import { gsap } from "gsap";
import { clinic, telHref } from "@/data/clinic";
import { dentalAssets } from "@/data/dental-assets";
import { useScrollScrub } from "@/lib/animations/hooks";
import MagneticButton from "@/components/ui/MagneticButton";

/**
 * Full-bleed, scroll-scrubbed cinematic hero — desktop AND mobile.
 *
 * Motion allowed (any viewport): the section is a tall (240vh) spacer with a
 * sticky 100svh video filling the viewport. Scrolling through that spacer
 * drives the video's `currentTime` directly (useScrollScrub) instead of just
 * autoplaying — the clinic reveals itself frame-by-frame as you scroll. The
 * headline/CTA overlay sits on top and fades out over the first ~18% of that
 * scroll so the footage takes over. Desktop and mobile each get their own
 * all-keyframe encode via <source media>, so a phone never downloads the
 * larger desktop file — the browser picks one source at load, not both.
 *
 * prefers-reduced-motion (any viewport): a plain 100svh section with the
 * static hero photo and the same overlay, permanently visible — no scroll
 * dependency, no video request at all.
 */
export default function Hero() {
    const root = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [usePin, setUsePin] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const desktop = window.matchMedia("(min-width: 1024px)");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => {
            setUsePin(!reduce.matches);
            setIsDesktop(desktop.matches);
        };
        update();
        desktop.addEventListener("change", update);
        reduce.addEventListener("change", update);
        return () => {
            desktop.removeEventListener("change", update);
            reduce.removeEventListener("change", update);
        };
    }, []);

    const onScrubProgress = useCallback((p: number) => {
        const fade = 1 - Math.max(0, Math.min(1, p / 0.18));
        const el = overlayRef.current;
        if (!el) return;
        el.style.opacity = String(fade);
        el.style.transform = `translateY(${-(1 - fade) * 24}px)`;
        el.style.pointerEvents = fade < 0.05 ? "none" : "auto";
    }, []);

    useScrollScrub({
        trigger: root,
        video: videoRef,
        enabled: usePin,
        onProgress: onScrubProgress,
    });

    // Headline entrance — plays once on mount, independent of the scrub.
    useEffect(() => {
        const el = root.current;
        if (!el) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const ctx = gsap.context(() => {
            const lines = el.querySelectorAll<HTMLElement>("[data-hero-line] > *");
            const fades = el.querySelectorAll<HTMLElement>("[data-hero-fade]");

            if (reduce) {
                gsap.set([lines, fades], { opacity: 1, yPercent: 0 });
                return;
            }

            gsap.set(lines, { yPercent: 115 });
            gsap.set(fades, { opacity: 0, y: 18 });

            gsap
                .timeline({ defaults: { ease: "power4.out" } })
                .to(lines, { yPercent: 0, duration: 1.1, stagger: 0.1 }, 0.2)
                .to(fades, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, "-=0.5");
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={root}
            aria-label="Introduction"
            className={usePin ? "relative h-[240vh] w-full" : "relative min-h-[100svh] w-full"}
        >
            <div
                className={
                    usePin
                        ? "sticky top-0 h-[100svh] w-full overflow-hidden"
                        : "relative h-[100svh] min-h-[560px] w-full overflow-hidden"
                }
            >
                {/* Media */}
                {usePin ? (
                    <video
                        ref={videoRef}
                        poster={isDesktop ? dentalAssets.hero.poster : dentalAssets.hero.posterMobile}
                        muted
                        playsInline
                        preload="auto"
                        disablePictureInPicture
                        aria-label="Carewell — The Dental Experts clinic"
                        className="absolute inset-0 h-full w-full object-cover"
                    >
                        <source src={dentalAssets.hero.video} media="(min-width: 1024px)" type="video/mp4" />
                        <source src={dentalAssets.hero.videoMobile} type="video/mp4" />
                    </video>
                ) : (
                    <Image
                        src={dentalAssets.hero.image}
                        alt="Carewell — The Dental Experts, Vengara"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30" />

                {/* Overlay content — fades out as the scrub takes over */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 z-10 mx-auto flex max-w-edge flex-col justify-end px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-24"
                >
                    <p
                        data-hero-fade
                        className="mb-6 font-mono text-eyebrow uppercase text-pink"
                    >
                        {clinic.tagline} — {clinic.locality}
                    </p>

                    <h1 className="font-display text-display-xl uppercase text-paper">
                        <span data-hero-line className="reveal-line">
                            <span>Confidence</span>
                        </span>
                        <span data-hero-line className="reveal-line">
                            <span>starts with</span>
                        </span>
                        <span data-hero-line className="reveal-line">
                            <span className="text-pink-bright">your smile.</span>
                        </span>
                    </h1>

                    <p
                        data-hero-fade
                        className="mt-8 max-w-md text-base leading-relaxed text-paper/75 sm:text-lg"
                    >
                        Advanced dental care delivered with expertise, precision and genuine
                        patient care.
                    </p>

                    <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
                        <MagneticButton
                            href="/contact"
                            variant="solid"
                            cursorLabel="BOOK"
                            className="!bg-paper !text-ink hover:!bg-gradient-to-br hover:!from-pink hover:!to-accent hover:!text-white"
                        >
                            Book your appointment
                            <ArrowUpRight size={18} />
                        </MagneticButton>
                        <Link
                            href="#treatments"
                            className="inline-flex items-center gap-2 text-sm font-medium text-paper underline-offset-8 hover:text-pink hover:underline"
                        >
                            Explore treatments
                        </Link>
                        <a
                            href={telHref(clinic.phonePrimary)}
                            className="inline-flex items-center gap-2 text-sm font-medium text-paper/70 hover:text-paper"
                        >
                            <Phone size={16} /> Call
                        </a>
                    </div>

                    {usePin && (
                        <div
                            aria-hidden
                            className="mt-14 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-paper/50"
                        >
                            <ChevronDown size={14} className="animate-bounce" />
                            Scroll to reveal
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
