function initIgCarousel() {
  if (typeof window === "undefined") return;
  if (typeof document === "undefined") return;

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

    prev.addEventListener("click", () => scrollBySlide(track, -1));
    next.addEventListener("click", () => scrollBySlide(track, 1));
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initIgCarousel, { once: true });
  } else {
    initIgCarousel();
  }
}