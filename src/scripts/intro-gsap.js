/* =========================================================
   INTRO (GSAP) — “Entrar por el logo” con máscara
   - Anima mask-size REAL (maskSize y webkitMaskSize)
   - Pin + scrub
   - Corta el intro AL FINAL
========================================================= */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function initializeIntroMaskScroll() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  console.log("[intro-gsap] init");

  const introSection = document.getElementById("introSection");
  const introMaskLayer = document.getElementById("introMaskLayer");

  console.log("[intro-gsap] elements", {
    introSection: !!introSection,
    introMaskLayer: !!introMaskLayer,
  });

  if (!introSection || !introMaskLayer) return;

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    introSection.style.display = "none";
    return;
  }

  // AJUSTES
  const maskStart = "22vh";
  const maskEnd = "9000vh";
  const scrollLength = 520;
  const cutAt = 0.94;

  function resetIntroToStart() {
    introSection.style.display = "";
    introSection.style.opacity = "1";
    introSection.style.pointerEvents = "";

    // 1) Tu variable (por si tu CSS la usa)
    introMaskLayer.style.setProperty("--mask-size", maskStart);

    // 2) Propiedades reales (por si tu CSS NO usa la variable)
    introMaskLayer.style.webkitMaskSize = maskStart;
    introMaskLayer.style.maskSize = maskStart;
  }

  resetIntroToStart();

  // Mata solo ESTE trigger
  ScrollTrigger.getAll().forEach((t) => {
    if (t?.vars?.id === "introMaskPin") t.kill(true);
  });

  // Refrescos extra (en prod ayuda cuando cambian fuentes/imagenes)
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  setTimeout(() => ScrollTrigger.refresh(), 250);
  setTimeout(() => ScrollTrigger.refresh(), 800);

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

      onLeave: () => {
        introSection.style.pointerEvents = "none";
      },
      onEnterBack: () => {
        introSection.style.pointerEvents = "";
        introSection.style.opacity = "1";
        introSection.style.display = "";
      },
      onLeaveBack: () => {
        resetIntroToStart();
      },
    },
  });

  // Anima TODO: variable + maskSize real
  tl.to(
    introMaskLayer,
    {
      "--mask-size": maskEnd,
      webkitMaskSize: maskEnd,
      maskSize: maskEnd,
      ease: "none",
    },
    0
  );

  tl.set(introSection, { opacity: 0 }, cutAt);
  tl.set(introSection, { display: "none", pointerEvents: "none" }, cutAt + 0.001);

  console.log("[intro-gsap] ready");
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeIntroMaskScroll, { once: true });
  } else {
    initializeIntroMaskScroll();
  }
}