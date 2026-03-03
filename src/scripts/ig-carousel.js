function initIgCarousel() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  function scrollBySlide(track, dir) {
    const first = track.querySelector(".ig-scrollSlide");
    if (!first) return;

    const slideW = first.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap || "0");
    const amount = (slideW + gap) * dir;

    track.scrollBy({ left: amount, behavior: "smooth" });
  }

  document.querySelectorAll(".ig-scrollWrap").forEach((wrap) => {
    const track = wrap.querySelector("[data-ig-carousel]");
    const prev = wrap.querySelector("[data-ig-prev]");
    const next = wrap.querySelector("[data-ig-next]");
    if (!track || !prev || !next) return;

    // Evitar duplicados en after-swap
    if (wrap.dataset.igBound === "1") return;
    wrap.dataset.igBound = "1";

    prev.addEventListener("click", () => scrollBySlide(track, -1));
    next.addEventListener("click", () => scrollBySlide(track, 1));
  });
}

function boot() {
  if (typeof document === "undefined") return;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initIgCarousel, { once: true });
  } else {
    initIgCarousel();
  }

  // Navegación Astro
  document.addEventListener("astro:page-load", initIgCarousel);
  document.addEventListener("astro:after-swap", initIgCarousel);
}

boot();