import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createLenis } from "./smooth-scroll.js";

import "./intro-gsap.js";
import "./preview-follow.js";
import "./contact.js";

function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.refresh();
}

function initHomeClient() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  createLenis();
  initGSAP();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHomeClient, { once: true });
} else {
  initHomeClient();
}