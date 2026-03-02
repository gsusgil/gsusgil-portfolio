/* =========================================================
   PROJECT REVEAL — GSAP + ScrollTrigger (Astro-safe)
   - Funciona con navegación sin reload (astro:after-swap)
   - Mata triggers viejos para evitar duplicados
   - Refresca cuando imágenes decodifican (layout estable)
========================================================= */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ---- init principal ----
function initProjectReveal() {
  console.log("[project-reveal] init ✅");

  // Marca para CSS/debug (sirve para ocultar elementos si el JS está activo)
  document.documentElement.dataset.reveal = "on";

  // 1) Limpieza (CLAVE en Astro con navegación sin recarga)
  // Si entras a otro /projects/slug, el DOM cambia pero tu JS no se “reinicia”
  // -> matamos triggers anteriores y tweens anteriores.
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.killTweensOf("[data-reveal]");

  // 2) Selecciona elementos a revelar
  const els = gsap.utils.toArray("[data-reveal]");
  console.log("[project-reveal] elements:", els.length);

  if (!els.length) {
    console.warn("[project-reveal] no [data-reveal] found");
    return;
  }

  // 3) Estado inicial (no depende de CSS)
  gsap.set(els, { y: 24, autoAlpha: 0 });

  // 4) Animación por elemento
  els.forEach((el) => {
    gsap.to(el, {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
        // markers: true, // ← descomenta para depurar visualmente
      },
    });
  });

  // 5) Refresh “inteligente”:
  // - refresh inmediato
  // - refresh cuando decodifican imágenes (evita triggers mal calculados)
  ScrollTrigger.refresh();

  const imgs = Array.from(document.images || []);

  // decode() no existe en todos los navegadores antiguos, por eso el fallback
  Promise.all(
    imgs.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve()))
  ).finally(() => {
    ScrollTrigger.refresh();
  });
}

// ---- hooks para Astro + carga normal ----

// Primera carga normal
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initProjectReveal, { once: true });
} else {
  initProjectReveal();
}

// Astro: si hay navegación sin reload (View Transitions / SPA-like)
// Estos eventos existen en Astro cuando hay swaps del DOM.
document.addEventListener("astro:page-load", initProjectReveal);
document.addEventListener("astro:after-swap", initProjectReveal);