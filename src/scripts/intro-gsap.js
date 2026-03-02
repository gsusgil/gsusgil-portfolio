/* =========================================================
   INTRO (GSAP) — “Entrar por el logo” con máscara
   - Anima --mask-size en #introMaskLayer
   - Pin + scrub
   - Corta el intro AL FINAL (sin fade rosa)
   - Funciona igual en light y dark (la máscara se decide por CSS)
========================================================= */

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

(function initializeIntroMaskScroll() {
  const introSection = document.getElementById("introSection");
  const introMaskLayer = document.getElementById("introMaskLayer");

  if (!introSection || !introMaskLayer) return;

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    introSection.style.display = "none";
    return;
  }

  // =========================================================
  // AJUSTES (toca solo esto)
  // =========================================================
  const maskStart = "22vh";      // tamaño inicial del logo-máscara
  const maskEnd = "9000vh";      // tamaño final (sube a 8000vh si hace falta)
  const scrollLength = 520;      // menor = menos scroll “vacío” (350–750)
  const cutAt = 0.94;           // cuándo “cortamos” el intro (0.96–0.995)

  // =========================================================
  // Reset limpio (importante para volver arriba sin glitches)
  // =========================================================
  function resetIntroToStart() {
  introSection.style.display = "";
  introSection.style.opacity = "1";
  introSection.style.pointerEvents = "";
  introMaskLayer.style.setProperty("--mask-size", maskStart);
}

  resetIntroToStart();

  // Evita duplicados en HMR (si guardas muchas veces)
  ScrollTrigger.getAll().forEach((t) => {
    if (t?.vars?.id === "introMaskPin") t.kill(true);
  });

  // Refresca al cargar assets para que el pin calcule bien
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });

  const tl = gsap.timeline({
    scrollTrigger: {
      id: "introMaskPin",
      trigger: introSection,
      start: "top top",
      end: `+=${scrollLength}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,

      // Al salir por abajo, que no bloquee interacción
      onLeave: () => {
        introSection.style.pointerEvents = "none";
      },

      // Al volver desde abajo, vuelve a ser interactivo/visible
      onEnterBack: () => {
        introSection.style.pointerEvents = "";
        introSection.style.opacity = "1";
        introSection.style.display = "";
      },

      // CLAVE: al volver arriba del todo, reset perfecto
      onLeaveBack: () => {
        resetIntroToStart();
      }
    }
  });

  // =========================================================
  // Animación principal: crecer máscara (sin tocar opacity)
  // =========================================================
  tl.to(introMaskLayer, { "--mask-size": maskEnd, ease: "none" }, 0);

  // =========================================================
  // Corte FINAL (sin “rosa”):
  // - No hacemos fade gradual del rojo.
  // - Lo escondemos casi al final, cuando la máscara ya llenó.
  // =========================================================
  tl.set(introSection, { opacity: 0 }, cutAt);
  tl.set(introSection, { display: "none", pointerEvents: "none" }, cutAt + 0.001);
})();