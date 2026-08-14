"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import { clinic } from "@/data/clinic";
import toothAnimation from "@/lib/animations/splash-tooth.json";

const MIN_VISIBLE_MS = 950;
const STORAGE_KEY = "cw_loaded";

/**
 * Brand splash — matches the companion patient app's SplashScreen 1:1 (same
 * gradient, same Lottie tooth mark, same wordmark/tagline, same ~950ms
 * timing) so cold-loading either product feels like the same brand. Shows
 * once per browser session (sessionStorage) so client-side navigation never
 * re-triggers it.
 *
 * `shouldShow` is decided once via a lazy useState initializer rather than
 * inside the effect below. Deciding it inside the effect would break under
 * React Strict Mode's dev-only mount→cleanup→remount cycle: the first
 * invocation would mark the session as "shown" in sessionStorage, then the
 * second (kept) invocation would read that same flag back and bail out
 * before ever scheduling a new hide-timer — leaving the splash stuck visible
 * forever. Reading it once up front keeps the effect idempotent.
 *
 * Under prefers-reduced-motion the Lottie mark and motion transitions are
 * skipped — the mark and text just appear, held for the same duration.
 */
export default function Loader() {
  const [visible, setVisible] = useState(false);
  const [shouldShow] = useState(
    () => typeof window !== "undefined" && !sessionStorage.getItem(STORAGE_KEY)
  );
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!shouldShow) return;
    sessionStorage.setItem(STORAGE_KEY, "1");
    document.body.style.overflow = "hidden";
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, MIN_VISIBLE_MS);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [shouldShow]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-pink to-accent"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.15 : 0.3, ease: "easeInOut" }}
        >
          <motion.div
            initial={reduce ? false : { scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-36 w-36"
          >
            <Lottie animationData={toothAnimation} loop={false} autoplay={!reduce} />
          </motion.div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduce ? 0 : 0.25, duration: 0.4 }}
            className="-mt-2 text-lg font-semibold tracking-wide text-white"
          >
            {clinic.shortName}
          </motion.p>
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduce ? 0 : 0.4, duration: 0.4 }}
            className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-white/70"
          >
            {clinic.tagline}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
