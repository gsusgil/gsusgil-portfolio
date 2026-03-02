/* =========================================================
   INTRO (GSAP) — Mask reveal
========================================================= */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function initIntroMaskScroll() {
  if (typeof window === "undefined") return;
  if (typeof document === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  const introSection = document.getElementById("introSection");
  const introMaskLayer = document.getElementById("introMaskLayer");

  if (!introSection || !introMaskLayer) return;

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    introSection.style.display = "none";
    return;
  }

  const maskStart = "22vh";
  const maskEnd = "9000vh";
  const scrollLength = 520;
  const cutAt = 0.94;

  function resetIntroToStart() {
    introSection.style.display = "";
    introSection.style.opacity = "1";
    introSection.style.pointerEvents = "";

    introMaskLayer.style.setProperty("--mask-size", maskStart);
    introMaskLayer.style.webkitMaskSize = maskStart;
    introMaskLayer.style.maskSize = maskStart;
  }

  resetIntroToStart();

  ScrollTrigger.getAll().forEach((t) => {
    if (t?.vars?.id === "introMaskPin") t.kill(true);
  });

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
  tl.set(
    introSection,
    { display: "none", pointerEvents: "none" },
    cutAt + 0.001
  );
}

// DOM ready
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initIntroMaskScroll, {
      once: true,
    });
  } else {
    initIntroMaskScroll();
  }
}