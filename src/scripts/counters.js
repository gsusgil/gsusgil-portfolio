/* =========================================================
   COUNTERS — Animated numbers on scroll
   - Parses the original text (handles "K+", "%", commas, decimals)
   - Counts up from 0 to the real value when it enters the viewport
   - Falls back to the static number if JS/GSAP is unavailable
========================================================= */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function parseCounterValue(raw) {
  const match = raw.trim().match(/^([^\d]*)([\d,]+\.?\d*)(.*)$/);
  if (!match) return null;

  const [, prefix, numberPart, suffix] = match;
  const decimals = numberPart.includes(".")
    ? numberPart.split(".")[1].length
    : 0;
  const target = parseFloat(numberPart.replace(/,/g, ""));

  if (Number.isNaN(target)) return null;

  return { prefix, suffix, target, decimals };
}

function formatCounterValue(value, { prefix, suffix, decimals }) {
  const rounded = decimals > 0 ? value.toFixed(decimals) : Math.round(value);
  const withCommas = Number(rounded).toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${withCommas}${suffix}`;
}

function initCounters() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  gsap.registerPlugin(ScrollTrigger);

  const els = document.querySelectorAll("[data-counter]");
  if (!els.length) return;

  els.forEach((el, i) => {
    if (el.dataset.counterBound === "1") return;
    el.dataset.counterBound = "1";

    const parsed = parseCounterValue(el.textContent);
    if (!parsed) return;

    if (prefersReduced) return;

    const proxy = { value: 0 };
    el.textContent = formatCounterValue(0, parsed);

    gsap.to(proxy, {
      value: parsed.target,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: {
        id: `counter-${i}`,
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = formatCounterValue(proxy.value, parsed);
      },
    });
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCounters, { once: true });
  } else {
    initCounters();
  }
}