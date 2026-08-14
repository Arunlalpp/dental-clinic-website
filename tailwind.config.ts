import type { Config } from "tailwindcss";

/**
 * CAREWELL DESIGN TOKENS
 * ----------------------
 * Palette matches the companion Carewell patient app (dental-clinic-pwa) —
 * same manifest.webmanifest theme_color/background_color, same `brand`
 * scale, same `ink`/`accent` values — so the marketing site and the app read
 * as one product. (The live carewelldentalclinicvengara.dialndial.com site's
 * red/navy is unrelated: that's dialndial.com's generic shared "mini"
 * directory-builder theme, not Carewell's own branding.)
 *
 * `pink` is the one accent used for CTAs, links and interactive text.
 * `accent` is reserved for the brand's signature `from-pink to-accent`
 * gradient fills (buttons, badges, icon tiles) with white text on top —
 * never used as bare small text, matching how the app itself uses it.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",         // slate-900 — hero, primary text, dark sections
        "ink-soft": "#1E293B",  // slate-800 — secondary dark surface
        paper: "#F5F8FA",       // app's `canvas` — soft cool background
        white: "#FFFFFF",
        pink: {
          50: "#FCF2F8",
          100: "#F8DDEC",
          200: "#F1BBD8",
          400: "#E16FAD",
          DEFAULT: "#C6297E",   // app's brand-600 / manifest theme_color
          bright: "#D84192",    // brand-500 — interactive / hover
          deep: "#941F5E",      // brand-700 — pressed
          900: "#4C1030",
        },
        accent: "#8A1257",      // app's `accent` — gradient endpoint only
        ash: "#64748B",         // slate-500 — muted text, hairlines
        "ash-light": "#CBD5E1", // slate-300
      },
      fontFamily: {
        // wired via next/font in app/layout.tsx → CSS variables
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // fluid display scale — clamps prevent mobile horizontal overflow
        "display-xl": ["clamp(2.75rem, 10vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 7vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 4.5vw, 3.5rem)", { lineHeight: "1.0", letterSpacing: "-0.02em" }],
        eyebrow: ["0.75rem", { lineHeight: "1", letterSpacing: "0.22em" }],
      },
      maxWidth: {
        edge: "1600px",
      },
      transitionTimingFunction: {
        // shared premium easing (matches GSAP power curves below)
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
