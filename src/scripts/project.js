// Project (case study) page behaviour, ported from the "openCase()"/"closeCase()" section of
// handoff/gsusgil-portfolio.html. The prototype rendered this inside a fixed overlay (`.case`)
// with its own scroll container; as a real routed page it's the normal document, so the
// scroll-position math below reads window scroll instead of `cs.scrollTop`. The curtain/
// crossfade between pages is a View Transition (components.css .vt-open/.vt-close/.vt-switch,
// src/scripts/view-transitions.js) — this file only drives what happens on THIS page.
//
// Same lifecycle note as portfolio-home.js: with the View Transitions router active, this
// module's top-level code runs once per session, not once per navigation — Previous/Next
// swaps in a fresh project page without re-executing it. So setup lives in initProjectPage(),
// re-run on every `astro:page-load`; `astro:before-swap` stops the rAF loop and reveal
// observer before the page is replaced.
import { createLenis, resyncLenis } from "./smooth-scroll.js";

const $ = (s, c) => (c || document).querySelector(s);
const $$ = (s, c) => (c || document).querySelectorAll(s);

createLenis(); // not page-specific — one instance for the whole session is enough

let currentGen = 0;
let revealObs = null;

document.addEventListener("astro:before-swap", () => {
  currentGen++; // invalidates the rAF loop guarded by alive() below
  if (revealObs) revealObs.disconnect();
  revealObs = null;
});

function initProjectPage() {
  // astro:page-load fires on every navigation in the session, not just ones that land on a
  // project page — bail out when the current page isn't one.
  if (!$(".stag")) return;

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const IO = "IntersectionObserver" in window;
  if (IO) document.documentElement.classList.add("js");

  const gen = ++currentGen;
  const alive = () => gen === currentGen;

  /* ---------- Stats count up from 0 once, on load ---------- */
  function count(el) {
    const m = el.textContent.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!m || reduce) return;
    const end = parseFloat(m[2]);
    const dec = (m[2].split(".")[1] || "").length;
    let t0 = 0;
    el.textContent = m[1] + (0).toFixed(dec) + m[3];
    requestAnimationFrame(function step(t) {
      if (!alive()) return;
      if (!t0) t0 = t;
      let k = Math.min(1, (t - t0) / 1600);
      k = 1 - (1 - k) ** 4;
      el.textContent = m[1] + (end * k).toFixed(dec) + m[3];
      if (k < 1) requestAnimationFrame(step);
    });
  }
  $$(".stats strong").forEach(count);

  /* ---------- Reveal shots on scroll ---------- */
  revealObs = IO
    ? new IntersectionObserver(
        (es) => es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          revealObs.unobserve(e.target);
        }),
        { rootMargin: "0px 0px -8% 0px" }
      )
    : null;
  $$(".shot").forEach((s) => (revealObs ? revealObs.observe(s) : s.classList.add("in")));

  /* ---------- Hero + description parallax, long emails scrolling within their window ---------- */
  const heroImg = $(".hero img, .hero video");
  const desc = $(".desc");
  const zone = $(".ctext");
  let dy = 0;
  const longs = [...$$(".sf.long")].map((f) => ({ f, c: f.firstElementChild, y: 0 }));

  function frame() {
    if (!alive()) return;
    const vh = innerHeight;
    if (heroImg) {
      const hr = $(".hero").getBoundingClientRect();
      heroImg.style.transform = `translateY(${-Math.min(Math.max(0, -hr.top) * 0.12, heroImg.clientHeight * 0.14).toFixed(1)}px)`;
    }
    for (const L of longs) {
      const lr = L.f.getBoundingClientRect();
      if (lr.bottom < 0 || lr.top > vh) continue;
      const pr = Math.min(1, Math.max(0, (vh - lr.top) / (vh + lr.height)));
      const mx = Math.max(0, L.c.offsetHeight - lr.height);
      L.y += (pr * mx - L.y) * 0.1;
      L.c.style.transform = `translate3d(0,${(-L.y).toFixed(1)}px,0)`;
    }
    if (desc && zone && innerWidth > 640) {
      const max = Math.max(0, zone.clientHeight - 32 - desc.offsetHeight);
      const tg = Math.min(max, Math.max(0, scrollY * 0.55));
      dy += (tg - dy) * 0.09;
      desc.style.transform = `translate3d(0,${dy.toFixed(1)}px,0)`;
    }
    requestAnimationFrame(frame);
  }
  if (!reduce) requestAnimationFrame(frame);

  /* ---------- Entrance: content rises at .45s (0s on Previous/Next — no curtain to wait
     for, handoff §3 "sin cortina"), dock rises at .5s. Previous/Next also resets scroll to
     the top of the new project. See .stag/.dock(.on)/.vt-switch in components.css. ---------- */
  // Project pages always start at the top — on first open and on Previous/Next alike.
  scrollTo(0, 0);
  resyncLenis();
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      if (!alive()) return;
      $(".stag")?.classList.add("in");
      $(".dock")?.classList.add("on");
    })
  );
}

document.addEventListener("astro:page-load", initProjectPage);

/* ---------- Copy email (end CTA) — delegated, needs binding only once ---------- */
function copyMail(b, m) {
  function sel() {
    const r = document.createRange();
    r.selectNodeContents(m);
    const x = getSelection();
    x.removeAllRanges();
    x.addRange(r);
    b.textContent = "Selected: copy it from here";
  }
  try {
    navigator.clipboard.writeText(m.textContent).then(() => (b.textContent = "Copied"), sel);
  } catch (e) {
    sel();
  }
  setTimeout(() => (b.textContent = "Copy email"), 2400);
}
document.addEventListener("click", (e) => {
  const b = e.target.closest && e.target.closest("[data-copy]");
  if (b) copyMail(b, $(".endcta .mail"));
});

/* ---------- Close (dock × / Escape): back to home where it was scrolled to, not the top.
   history.back() lets the browser/router restore that scroll position; falls back to a
   plain navigation to "/" when there's nowhere of ours to go back to. ---------- */
function closeProject() {
  if (document.referrer && new URL(document.referrer).origin === location.origin) history.back();
  else location.href = "/";
}
document.addEventListener("click", (e) => {
  const close = e.target.closest && e.target.closest("[data-close]");
  if (close) {
    e.preventDefault();
    closeProject();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeProject();
});

// No theme toggle here: the prototype's case view never shows one either (it lives in
// the home masthead, which the full-screen sheet covers) — the page still follows the
// system preference purely through CSS.
