import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Tus módulos
import "./intro-gsap.js";
import "./preview-follow.js";
import "./contact.js";

function initApp() {
  if (typeof window === "undefined") return;
  if (typeof document === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // 🔥 UNA sola instancia de Lenis
  const lenis = new Lenis({
    smoothWheel: true,
    smoothTouch: false,
  });

  window.__lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 🔥 Conectar Lenis con ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.addEventListener("refresh", () => lenis.resize());
  ScrollTrigger.refresh();
}

// DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp, { once: true });
} else {
  initApp();
}