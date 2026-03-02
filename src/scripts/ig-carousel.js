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