/* =========================================================
   HOME CLIENT — Entry point bundleado (Vite)
   - Aquí puedes importar paquetes npm (lenis, gsap, etc.)
   - Este archivo se carga desde index.astro con ?url
========================================================= */

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Tus scripts locales (si los usas)
import "./intro-gsap.js";
import "./preview-follow.js";
import "./contact.js";

function initLenis() {
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

function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  // Si Lenis está activo, refresca ScrollTrigger cuando haga falta
  ScrollTrigger.refresh();
}

function initHomeClient() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  initLenis();
  initGSAP();

  console.log("[home.client] ready");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomeClient, { once: true });
} else {
  initHomeClient();
}