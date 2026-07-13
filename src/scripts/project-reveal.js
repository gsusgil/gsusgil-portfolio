/* =========================================================
   PROJECT REVEAL — GSAP + ScrollTrigger (Astro-safe)
   - Funciona con navegación sin reload (astro:after-swap)
   - Mata triggers viejos para evitar duplicados
   - Refresca cuando imágenes decodifican (layout estable)
========================================================= */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function initProjectReveal() {
  if (typeof window === "undefined") return;
  if (typeof document === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  document.documentElement.dataset.reveal = "on";

  ScrollTrigger.getAll().forEach((t) => {
    if (t?.vars?.id?.startsWith("reveal-")) t.kill();
  });
  gsap.killTweensOf("[data-reveal]");

  const els = gsap.utils.toArray("[data-reveal]");
  if (!els.length) return;

  gsap.set(els, { y: 24, autoAlpha: 0 });

  els.forEach((el, i) => {
    gsap.to(el, {
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        id: `reveal-${i}`,
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });

  ScrollTrigger.refresh();

  const imgs = Array.from(document.images || []);
  Promise.all(
    imgs.map((img) => (img.decode ? img.decode().catch(() => {}) : Promise.resolve()))
  ).finally(() => {
    ScrollTrigger.refresh();
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProjectReveal, { once: true });
  } else {
    initProjectReveal();
  }
}