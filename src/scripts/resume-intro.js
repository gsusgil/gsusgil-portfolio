import gsap from "gsap";

function initResumeIntro() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const photo = document.querySelector("[data-resume-photo]");
  const nameEl = document.querySelector("[data-resume-name]");

  if (prefersReduced) return;

  if (nameEl && !nameEl.dataset.split) {
    nameEl.dataset.split = "1";
    const text = nameEl.textContent;
    nameEl.innerHTML = text
      .split(" ")
      .map(
        (word) =>
          `<span class="resumeHead__nameWord"><span class="resumeHead__nameWordInner">${word}</span></span>`
      )
      .join(" ");
  }

  const words = nameEl
    ? nameEl.querySelectorAll(".resumeHead__nameWordInner")
    : [];

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (photo) {
    tl.fromTo(
      photo,
      { clipPath: "inset(0 100% 0 0)", filter: "grayscale(100%)" },
      { clipPath: "inset(0 0% 0 0)", filter: "grayscale(0%)", duration: 0.9 },
      0
    );
  }

  if (words.length) {
    tl.fromTo(
      words,
      { yPercent: 110 },
      { yPercent: 0, duration: 0.7, stagger: 0.08 },
      0.15
    );
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initResumeIntro, { once: true });
} else {
  initResumeIntro();
}