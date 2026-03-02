/* =========================================================
   SMOOTH SCROLL — Lenis + ScrollTrigger proxy
   (No metas reveal aquí)
========================================================= */

import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.1,
  smooth: true,
  smoothTouch: false,
});

window.__lenis = lenis;

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    if (arguments.length) lenis.scrollTo(value, { immediate: true });
    return lenis.scroll;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
});

ScrollTrigger.addEventListener("refresh", () => lenis.resize());
ScrollTrigger.refresh();