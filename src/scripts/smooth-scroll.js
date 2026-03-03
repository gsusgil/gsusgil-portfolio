/* =========================================================
   SMOOTH SCROLL — Lenis helper (opcional)
========================================================= */

import Lenis from "lenis";

export function createLenis() {
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return null;

  const lenis = new Lenis({
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenis;
}