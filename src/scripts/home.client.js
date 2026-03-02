/* =========================================================
   HOME CLIENT ENTRY — (Vercel/Astro safe)
   - Aquí SÍ puedes importar libs (Lenis/GSAP) porque Vite bundlea esto.
   - NO referenciar esto como "/scripts/home.client.js"
     -> SIEMPRE cargar con "?url" desde Astro.
========================================================= */

import Lenis from "@studio-freight/lenis";

// Tus módulos (solo lógica DOM)
import "./intro-gsap.js";
import "./preview-follow.js";
import "./contact.js";

function initLenis() {
  const lenis = new Lenis({
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

// DOM listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLenis, { once: true });
} else {
  initLenis();
}