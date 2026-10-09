// Home page behaviour, ported from handoff/gsusgil-portfolio.html.
// Canvas-painted placeholder art is replaced by real <img> elements (set lazily,
// same "only on first open" timing as the prototype — handoff §10 weight note).
//
// With the View Transitions router active (BaseLayout's <ClientRouter/>), this script's
// top-level code only ever runs once per session — navigating back to "/" swaps in a
// fresh DOM but does NOT re-execute this module. So everything DOM-dependent lives in
// initHome(), re-run on every `astro:page-load` (which also fires on the very first load).
// `astro:before-swap` tears down the loops/timers/observers before leaving the page, since
// the JS keeps running in the background across client-side navigations (a left-running
// rAF loop or interval would write into elements that no longer exist, e.g. a project page's
// absent #clock — or just pile up a second footer loop on every return visit).
// Resize/matchMedia listeners set up per visit are not individually torn down — each is
// idempotent (re-queries the live DOM) so a few stacking up across repeat home-visits in one
// session is harmless, just not maximally tidy.
import gsap from "gsap";
import { createLenis, resyncLenis } from "./smooth-scroll.js";
import { burstImages } from "../data/projects/index.js";

const $ = (s, c) => (c || document).querySelector(s);
const $$ = (s, c) => (c || document).querySelectorAll(s);

createLenis(); // not page-specific — one instance for the whole session is enough

let currentGen = 0;
let clockTimer = null;
let proofTimer = null;
let footerWt = null;
let footerObs = null;
let savedScrollY = null;

document.addEventListener("astro:before-swap", () => {
  currentGen++; // invalidates every rAF loop guarded by alive() below
  if (clockTimer) clearInterval(clockTimer);
  if (proofTimer) clearInterval(proofTimer);
  if (footerWt) footerWt.kill();
  if (footerObs) footerObs.disconnect();
  clockTimer = proofTimer = footerWt = footerObs = null;

  // Save where the list was scrolled to before leaving, so closing a project (handoff §4:
  // "la home vuelve a la posición de scroll donde estaba") can put it back. Astro's router
  // does restore this on its own, but Chrome's scroll anchoring (see overflow-anchor:none
  // in global.css) was fighting it on a full-body swap, so this is a belt-and-braces backup.
  if ($("header .name")) savedScrollY = scrollY;
});

// Put the list back where it was as soon as the home is swapped in, so the closing curtain
// uncovers the list itself rather than the top of the page.
document.addEventListener("astro:after-swap", () => {
  if ($("header .name") && savedScrollY !== null) scrollTo(0, savedScrollY);
});

function initHome() {
  // astro:page-load fires on every navigation in the session, not just ones that land back
  // on "/" — bail out when the current page isn't the home page.
  if (!$("header .name")) return;

  if (savedScrollY !== null) {
    scrollTo(0, savedScrollY);
    savedScrollY = null;
  }
  resyncLenis();

  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = matchMedia("(hover: none)").matches;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches && !reduce;
  const IO = "IntersectionObserver" in window;
  if (IO) root.classList.add("js");

  const gen = ++currentGen;
  const alive = () => gen === currentGen;

  /* ---------- Full-width name: split into letters, size to fill the container ---------- */
  const NAME = "gsusgil.";
  $$(".name .fit").forEach((f) => {
    (f.dataset.t || NAME).split("").forEach((ch, i) => {
      const s = document.createElement("span");
      s.className = "ch";
      s.innerHTML = `<span class="gl${ch === "." ? " pt" : ""}">${ch}</span>`;
      s.style.transitionDelay = `${i * 45}ms`;
      f.appendChild(s);
    });
  });

  function fit() {
    const hf = $("header .fit");
    hf.style.fontSize = "100px";
    const hw = hf.getBoundingClientRect().width;
    const hc = hf.parentNode.clientWidth;
    if (hw > 0 && hc > 0) hf.style.fontSize = `${(100 * hc) / hw}px`;

    // footer: the word and the red full stop share the width; "designer" is fitted to the
    // same word area and sits on the same baseline, so the stop never moves.
    const n = $("footer .name");
    const A = $(".fit:not(.alt)", n);
    const B = $(".fit.alt", n);
    const D = $(".dot", n);
    const cw = n.clientWidth;
    A.style.fontSize = D.style.fontSize = B.style.fontSize = "100px";
    const wa = A.getBoundingClientRect().width;
    const wd = D.getBoundingClientRect().width;
    const wb = B.getBoundingClientRect().width;
    if (!(wa > 0 && cw > 0)) return;
    const fa = (100 * cw) / (wa + wd);
    const fb = Math.min(fa, (100 * (cw - (wd * fa) / 100)) / wb);
    A.style.fontSize = D.style.fontSize = `${fa}px`;
    B.style.fontSize = `${fb}px`;

    // "gsusgil"'s line box (line-height 1 + the .3em padding-bottom every .fit/.dot carries)
    // is taller than the visible ink — there's built-in leading below the "g" descenders.
    // Crop A/D's own padding-bottom (real glyph metrics, not the font's nominal line box) so
    // the footer box — and the document — ends 12px below the lowest ink pixel (scroll-end
    // fix), then re-derive "designer"'s `bottom` from the same metrics so it still lands on
    // gsusgil's baseline despite the new padding (replaces the old fixed-.3em `base` formula).
    try {
      const cx = document.createElement("canvas").getContext("2d");
      const metrics = (fs) => {
        cx.font = `italic 900 ${fs}px "Inter Tight"`;
        const m = cx.measureText("gsusgil");
        const halfLeadTop = (fs - (m.fontBoundingBoxAscent + m.fontBoundingBoxDescent)) / 2;
        return { baseline: halfLeadTop + m.fontBoundingBoxAscent, descent: m.actualBoundingBoxDescent };
      };
      const mA = metrics(fa);
      const padA = 12 + mA.baseline + mA.descent - fa;
      A.style.paddingBottom = D.style.paddingBottom = `${padA.toFixed(1)}px`;
      const nameHeight = fa + padA;

      const padB = 0.3 * fb; // "designer" keeps its original .3em padding-bottom
      const mB = metrics(fb);
      const heightB = fb + padB;
      B.style.bottom = `${(nameHeight - heightB + mB.baseline - mA.baseline).toFixed(1)}px`;
    } catch (e) {
      B.style.bottom = "0px";
    }
  }

  /* ---------- Footer: gsusgil. / designer. trade places, letters rolling through a mask ---------- */
  if (!reduce) {
    const wa = $$("footer .fit:not(.alt) .gl");
    const wb = $$("footer .fit.alt .gl");
    const roll = { duration: 0.85, ease: "expo.inOut", stagger: 0.04 };
    gsap.set(wb, { yPercent: 140 });
    gsap.set("footer .fit.alt", { visibility: "visible" });
    gsap.config({ force3D: false });

    // vertical motion blur, like After Effects: peaks mid-move, only while letters travel
    const nm = $("footer .name");
    const fe = $("#mbg");
    const mb = { v: 0 };
    const A0 = $("footer .fit:not(.alt)");
    function upd() {
      fe.setAttribute("stdDeviation", `0 ${(mb.v * parseFloat(A0.style.fontSize || 100) * 0.05).toFixed(2)}`);
    }
    function blur(t, lab) {
      t.call(() => nm.classList.add("mb"), null, lab)
        .to(mb, { v: 1, duration: 0.45, ease: "power2.in", onUpdate: upd }, `${lab}+=.1`)
        .to(mb, { v: 0, duration: 0.65, ease: "power2.out", onUpdate: upd }, `${lab}+=.55`)
        .call(() => nm.classList.remove("mb"), null, `${lab}+=1.25`);
    }
    const wt = gsap.timeline({ repeat: -1, paused: true });
    footerWt = wt;
    wt.addLabel("a", "+=2.6").to(wa, { ...roll, yPercent: -140 }, "a").to(wb, { ...roll, yPercent: 0 }, "a+=.1");
    blur(wt, "a");
    wt.addLabel("b", "a+=3.15").to(wb, { ...roll, yPercent: -140 }, "b")
      .fromTo(wa, { yPercent: 140 }, { ...roll, yPercent: 0, immediateRender: false }, "b+=.1");
    blur(wt, "b");
    wt.addLabel("end", "b+=1.3");
    if (IO) {
      footerObs = new IntersectionObserver((es) => (es[0].isIntersecting ? wt.play() : wt.pause()));
      footerObs.observe(nm);
    } else wt.play();
  }

  /* Process images used by the header photo burst (cards 0-4): the same project images used
     elsewhere on the site, sourced from burstImages (single source of truth, handoff §11).
     The portrait slot (card 5) has no real photo yet (handoff §0 step 4) — still a placeholder. */

  /* ---------- Desktop hero: inside the name only, the red full stop becomes the cursor ---------- */
  if (fine) {
    (function () {
      const nm = $("header .name");
      const pt = $("header .pt");
      const ch = pt.parentNode;
      const cur = document.createElement("div");
      const pile = document.createElement("div");
      const cards = [];
      const st = [];
      let painted = false;
      cur.className = "hcur";
      cur.innerHTML = '<span class="ring"></span><span class="dotc"></span>';
      pile.className = "hpile";
      const hl = document.createElement("div");
      hl.className = "hl";
      hl.setAttribute("aria-hidden", "true");
      function say(o) {
        hl.innerHTML = o ? "<b>close</b>" : "<b>hi, it’s me</b><small>click to see me</small>";
      }
      say(false);
      nm.appendChild(pile);
      nm.appendChild(cur);
      nm.appendChild(hl);
      nm.classList.add("live");
      const dotc = $(".dotc", cur);
      const ring = $(".ring", cur);
      let lx = 0, ly = 0;
      const OFF = [[-0.42, -0.12, -9], [0.36, -0.2, 7], [-0.24, 0.2, -4], [0.32, 0.16, 10], [0.02, -0.3, -3], [0, 0, 0]];
      for (let i = 0; i < 6; i++) {
        const d = document.createElement("div");
        d.className = "ph";
        if (i === 5) {
          const label = document.createElement("span");
          label.className = "pending";
          label.textContent = "Your portrait";
          d.appendChild(label);
        } else {
          const img = document.createElement("img");
          img.loading = "lazy";
          img.alt = "";
          d.appendChild(img);
        }
        pile.appendChild(d);
        cards.push(d);
        st.push({ x: 0, y: 0, s: 0, o: 0, r: 0, k: 0.07 + i * 0.012 });
      }
      function home() {
        const N = nm.getBoundingClientRect();
        const C = ch.getBoundingClientRect();
        const fs = parseFloat($("header .fit").style.fontSize || 100);
        const cx = document.createElement("canvas").getContext("2d");
        cx.font = `italic 900 ${fs}px "Inter Tight"`;
        const m = cx.measureText(".");
        const A = m.fontBoundingBoxAscent || fs * 0.97;
        const D = m.fontBoundingBoxDescent || fs * 0.24;
        const base = C.top - N.top + (fs - (A + D)) / 2 + A;
        const dia = m.actualBoundingBoxLeft + m.actualBoundingBoxRight || fs * 0.17;
        return {
          x: C.left - N.left + (m.actualBoundingBoxRight - m.actualBoundingBoxLeft) / 2,
          y: base - (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2,
          d: dia, W: N.width, H: N.height,
        };
      }
      let H0 = null, cx = 0, cy = 0, tx = 0, ty = 0, inside = false, open = false, returning = false, run = false, cw = 200;
      function size() {
        H0 = home();
        dotc.style.width = dotc.style.height = ring.style.width = ring.style.height = `${H0.d}px`;
        lx = H0.d * 0.5 + 12;
        ly = H0.d * 0.3;
        cw = Math.min(210, H0.H * 0.4);
        cards.forEach((el) => (el.style.width = `${cw}px`));
      }
      function loop() {
        if (!alive() || !run) return;
        cx += (tx - cx) * 0.2;
        cy += (ty - cy) * 0.2;
        cur.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
        hl.style.transform = `translate3d(${(cx + lx).toFixed(1)}px,${(cy + ly).toFixed(1)}px,0)`;
        const chh = cw * 1.25;
        const ax = Math.min(Math.max(cx - cw * 0.8, cw * 0.95), H0.W - cw * 0.95);
        const ay = Math.min(Math.max(cy - chh * 0.12, chh * 0.72), H0.H - chh * 0.72);
        let any = false;
        cards.forEach((el, k) => {
          const q = st[k], o = OFF[k];
          const gx = (open ? ax + o[0] * cw : cx) - cw / 2;
          const gy = (open ? ay + o[1] * chh : cy) - chh / 2;
          q.x += (gx - q.x) * q.k * 2.2;
          q.y += (gy - q.y) * q.k * 2.2;
          if (q.o > 0.01) any = true;
          el.style.opacity = q.o.toFixed(3);
          el.style.transform = `translate3d(${q.x.toFixed(1)}px,${q.y.toFixed(1)}px,0) rotate(${(q.r * q.s).toFixed(2)}deg) scale(${q.s.toFixed(3)})`;
        });
        if (returning && Math.abs(cx - tx) < 0.6 && Math.abs(cy - ty) < 0.6 && !any) {
          returning = false;
          run = false;
          gsap.set(pt, { opacity: 1 });
          cur.style.opacity = 0;
          return;
        }
        requestAnimationFrame(loop);
      }
      function start() {
        if (!run) {
          run = true;
          requestAnimationFrame(loop);
        }
      }
      function local(e) {
        const N = nm.getBoundingClientRect();
        return [e.clientX - N.left, e.clientY - N.top];
      }
      nm.addEventListener("mouseenter", (e) => {
        size();
        const p = local(e);
        inside = true;
        returning = false;
        if (!run) {
          cx = H0.x;
          cy = H0.y;
          cards.forEach((el, k) => {
            st[k].x = cx - cw / 2;
            st[k].y = cy - cw * 0.625;
          });
        }
        tx = p[0];
        ty = p[1];
        gsap.set(pt, { opacity: 0 });
        cur.style.opacity = 1;
        cur.classList.add("lab");
        hl.classList.add("on");
        start();
      });
      nm.addEventListener("mousemove", (e) => {
        if (!inside) return;
        const p = local(e);
        tx = p[0];
        ty = p[1];
      });
      nm.addEventListener("mouseleave", () => {
        inside = false;
        if (open) toggle(false);
        cur.classList.remove("lab");
        hl.classList.remove("on");
        size();
        tx = H0.x;
        ty = H0.y;
        returning = true;
        start();
      });
      function toggle(v) {
        open = v;
        say(v);
        cur.classList.toggle("op", v);
        if (v && !painted) {
          cards.forEach((el, k) => {
            const img = el.firstChild;
            if (k < 5) {
              img.src = burstImages[k].src;
              img.alt = burstImages[k].alt;
            } else el.classList.add("me");
          });
          painted = true;
        }
        cards.forEach((el, k) => {
          const q = st[k];
          if (v) {
            q.x = cx - cw / 2;
            q.y = cy - cw * 0.625;
          }
          gsap.to(q, {
            s: v ? (k === 5 ? 1.08 : 1) : 0,
            o: v ? 1 : 0,
            r: OFF[k][2],
            duration: v ? 0.5 : 0.3,
            ease: v ? "expo.out" : "power2.in",
            delay: v ? k * 0.07 : (5 - k) * 0.03,
            overwrite: true,
          });
        });
        start();
      }
      nm.addEventListener("click", () => toggle(!open));
      addEventListener("resize", () => {
        if (H0) size();
      });
      setTimeout(() => {
        if (!alive()) return;
        gsap.fromTo(pt, { scale: 1 }, { scale: 1.45, duration: 0.32, ease: "power2.out", yoyo: true, repeat: 1, transformOrigin: "50% 78%" });
      }, 1500);
    })();
  }

  /* ---------- Touch/tablet: tap the stop, a hint label + hand-drawn arrow, pile under the nav ---------- */
  if (!fine) {
    (function () {
      const hd = $("header");
      const nm = $("header .name");
      const pt = $("header .pt");
      const box = document.createElement("div");
      const cards = [];
      let bt = null, bk = "", open = false, over = 0;
      box.className = "burst";
      box.setAttribute("aria-hidden", "true");
      hd.appendChild(box);
      const lab = document.createElement("button");
      lab.innerHTML =
        '<span class="mt"></span><svg class="arw" viewBox="0 0 120 90" aria-hidden="true"><path d="M3 74 C 22 76 40 66 42 52 C 44 38 26 34 22 46 C 18 60 44 64 64 52 C 84 40 98 26 106 10 M106 10 L 93 13 M106 10 L 108 23"/></svg>';
      function setT(o) {
        lab.querySelector(".mt").textContent = o ? "close" : "hi, it’s me";
        place();
      }
      lab.className = "meet";
      lab.type = "button";
      lab.setAttribute("aria-expanded", "false");
      hd.appendChild(lab);
      setT(0);
      for (let i = 0; i < 6; i++) {
        const d = document.createElement("div");
        d.className = `ph${i === 5 ? " me" : ""}`;
        if (i === 5) {
          const label = document.createElement("span");
          label.className = "pending";
          label.textContent = "Your portrait";
          d.appendChild(label);
        } else {
          const img = document.createElement("img");
          img.loading = "lazy";
          img.alt = "";
          d.appendChild(img);
        }
        box.appendChild(d);
        cards.push(d);
      }
      let painted = false;
      const OFF = [[-0.38, -0.1, -9], [0.34, -0.22, 7], [-0.26, 0.18, -4], [0.3, 0.14, 10], [0.02, -0.32, -3], [0, 0, 0]];
      function geo() {
        const H = hd.getBoundingClientRect();
        const D = pt.parentNode.getBoundingClientRect();
        const N = nm.getBoundingClientRect();
        const fs = parseFloat($("header .fit").style.fontSize || 100);
        return { W: H.width, Hh: H.height, cx: D.left - H.left + D.width / 2, cy: D.top - H.top + fs * 0.78, nb: N.bottom - H.top, fs };
      }
      function place() {
        if (!pt) return;
        const g = geo();
        lab.style.left = "0px";
        lab.style.top = "0px";
        const L = lab.getBoundingClientRect();
        const A = lab.querySelector(".arw").getBoundingClientRect();
        const tx = A.left - L.left + A.width * 0.883;
        const ty = A.top - L.top + A.height * 0.111;
        lab.style.left = `${Math.max(0, g.cx - g.fs * 0.07 - tx)}px`;
        lab.style.top = `${g.cy + g.fs * 0.1 - ty}px`;
      }
      function build() {
        if (!painted) {
          cards.forEach((el, k) => {
            const img = el.firstChild;
            if (k < 5) {
              img.src = burstImages[k].src;
              img.alt = burstImages[k].alt;
            }
          });
          painted = true;
        }
        const g = geo();
        const cw = Math.max(120, Math.min(220, g.W * 0.15));
        const chh = cw * 1.25;
        const px = Math.min(Math.max(g.W * 0.5, cw), g.W - cw);
        const py = g.Hh + chh * 0.55;
        if (bt) bt.kill();
        bt = gsap.timeline({ paused: true, onReverseComplete: () => cards.forEach((el) => gsap.set(el, { opacity: 0 })) });
        cards.forEach((el, k) => {
          const o = OFF[k], me = k === 5;
          gsap.set(el, { left: px - cw / 2, top: py - chh / 2, width: cw, x: g.cx - px, y: g.cy - py, scale: 0, rotation: 0, opacity: 0 });
          bt.to(el, { x: o[0] * cw, y: o[1] * chh, scale: me ? 1.08 : 1, rotation: o[2], opacity: 1, duration: me ? 0.55 : 0.42, ease: "expo.out" }, k * 0.085);
        });
        bk = `${innerWidth}x${Math.round(g.fs)}`;
      }
      function show() {
        const key = `${innerWidth}x${Math.round(parseFloat($("header .fit").style.fontSize || 100))}`;
        if (key !== bk || !bt) build();
        open = true;
        setT(1);
        lab.setAttribute("aria-expanded", "true");
        if (reduce) {
          bt.progress(1);
          return;
        }
        bt.timeScale(1).play();
      }
      function hide() {
        open = false;
        setT(0);
        lab.setAttribute("aria-expanded", "false");
        if (!bt) return;
        if (reduce) {
          bt.progress(0);
          return;
        }
        bt.timeScale(1.9).reverse();
      }
      if (!touch) {
        [pt.parentNode, lab].forEach((el) => {
          el.addEventListener("mouseenter", () => {
            over++;
            if (!open) show();
          });
          el.addEventListener("mouseleave", () => {
            over--;
            setTimeout(() => {
              if (over <= 0 && open) hide();
            }, 90);
          });
        });
      }
      [pt.parentNode, lab].forEach((el) => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          open ? hide() : show();
        });
      });
      addEventListener("keydown", (e) => {
        if (e.key === "Escape" && open) hide();
      });
      place();
      addEventListener("resize", () => {
        place();
        if (bt) {
          bt.kill();
          bt = null;
          bk = "";
          open = false;
          setT(0);
          cards.forEach((el) => gsap.set(el, { opacity: 0 }));
        }
      });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
      setTimeout(() => {
        if (!alive()) return;
        place();
        lab.classList.add("on");
      }, reduce ? 0 : 1700);
      if (!reduce)
        setTimeout(() => {
          if (!alive()) return;
          place();
          gsap.fromTo(pt, { scale: 1 }, { scale: 1.45, duration: 0.32, ease: "power2.out", yoyo: true, repeat: 1, transformOrigin: "50% 78%" });
        }, 1500);
    })();
  }

  fit();
  addEventListener("resize", fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  setTimeout(() => {
    if (!alive()) return;
    fit();
    $("header .name").classList.add("in");
  }, 80);

  /* ---------- Clock (Barcelona) ---------- */
  const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" });
  function tick() {
    $("#clock").textContent = fmt.format(new Date());
  }
  tick();
  clockTimer = setInterval(tick, 10000);

  /* ---------- Theme: follows the system; the button overrides for the session only (not persisted) ---------- */
  function isDark() {
    const t = root.getAttribute("data-theme");
    return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function label() {
    $$("[data-theme-btn] span").forEach((s) => (s.textContent = isDark() ? "Dark" : "Light"));
  }
  label();
  try {
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", label);
  } catch (e) {}
  $$("[data-theme-btn]").forEach((b) =>
    b.addEventListener("click", () => {
      root.setAttribute("data-theme", isDark() ? "light" : "dark");
      label();
    })
  );

  /* ---------- Hide the mobile tabbar once the footer is in view (no blur smudge over the name) ---------- */
  if (IO) {
    new IntersectionObserver((es) => root.classList.toggle("tabbar-hide", es[0].isIntersecting), {
      rootMargin: "0px 0px -1px 0px",
    }).observe($("footer .name") || $("footer"));
  }

  /* ---------- Desktop: show the bottom tab bar once the header nav has scrolled away,
     and keep its active pill in step with the section on screen ---------- */
  if (IO) {
    const pills = $("header nav.pills");
    if (pills) new IntersectionObserver((es) => root.classList.toggle("tabbar-show", !es[0].isIntersecting)).observe(pills);
    const spy = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) $$("[data-go]").forEach((x) => x.classList.toggle("on", x.dataset.go === e.target.id));
      }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["work", "profile", "contact"].forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* ---------- Reveal on scroll ---------- */
  const obs = IO
    ? new IntersectionObserver(
        (es) => es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          obs.unobserve(e.target);
        }),
        { rootMargin: "0px 0px -6% 0px" }
      )
    : null;
  function watch(el) {
    if (obs) obs.observe(el);
    else el.classList.add("in");
  }
  $$(".cell, .rv").forEach(watch);
  $$("footer .name").forEach(watch);

  /* ---------- Grid/list switch ---------- */
  const grid = $("#grid");
  const list = $("#list");
  const bG = $("#bGrid");
  const bL = $("#bList");
  function view(v, anim) {
    const isG = v === "grid";
    bG.setAttribute("aria-pressed", isG);
    bL.setAttribute("aria-pressed", !isG);
    grid.hidden = !isG;
    list.hidden = isG;
    const t = isG ? grid : list;
    t.classList.remove("show");
    if (anim) {
      void t.offsetWidth;
      t.classList.add("show");
    }
    try {
      localStorage.setItem("jg-view", v);
    } catch (e) {}
  }
  bG.onclick = () => view("grid", true);
  bL.onclick = () => view("list", true);
  // the list is the first view; grid only if this visitor chose it before
  let sv = null;
  try {
    sv = localStorage.getItem("jg-view");
  } catch (e) {}
  view(sv === "grid" ? "grid" : "list", false);

  /* ---------- Bento: pointer-follow tag + scroll depth (single image layer — handoff §6.1) ---------- */
  const cells = [];
  $$(".cell", grid).forEach((a) => {
    const img = $(".frame img", a);
    const tag = $(".tag", a);
    const st = { el: a, img, tag, tx: 0, ty: 0, x: 0, y: 0, mx: 0, my: 0, gx: 0, gy: 0 };
    cells.push(st);
    if (!touch) {
      a.addEventListener("pointermove", (e) => {
        const r = a.getBoundingClientRect();
        st.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
        st.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
        st.mx = e.clientX - r.left + 14;
        st.my = e.clientY - r.top + 14;
      });
      a.addEventListener("pointerenter", (e) => {
        const r = a.getBoundingClientRect();
        st.gx = st.mx = e.clientX - r.left + 14;
        st.gy = st.my = e.clientY - r.top + 14;
        a.classList.add("hot");
      });
      a.addEventListener("pointerleave", () => {
        st.tx = st.ty = 0;
        a.classList.remove("hot");
      });
    }
  });

  /* ---------- Weightless motion: scroll depth + pointer inertia, one loop ---------- */
  let iy2 = 0;
  const introH = $(".intro h2");
  const introEl = $(".intro");
  function frame() {
    if (!alive()) return;
    const vh = innerHeight;
    let best = null, bestD = 1e9;
    if (!grid.hidden)
      for (let i = 0; i < cells.length; i++) {
        const s = cells[i];
        const r = s.el.getBoundingClientRect();
        if (r.bottom < -80 || r.top > vh + 80) continue;
        const sp = (r.top + r.height / 2 - vh / 2) / vh;
        s.x += (s.tx - s.x) * 0.05;
        s.y += (s.ty - s.y) * 0.05;
        s.img.style.transform = `translate3d(${(s.x * 10).toFixed(2)}px,${(-sp * 32 + s.y * 10).toFixed(2)}px,0) rotate(${(s.x * 0.6).toFixed(2)}deg)`;
        if (!touch) {
          s.gx += (s.mx - s.gx) * 0.16;
          s.gy += (s.my - s.gy) * 0.16;
          s.tag.style.transform = `translate(${s.gx.toFixed(1)}px,${s.gy.toFixed(1)}px)`;
        } else {
          const d = Math.abs(sp);
          if (d < bestD && d < 0.28) {
            bestD = d;
            best = s;
          }
        }
      }
    if (touch) for (let j = 0; j < cells.length; j++) cells[j].el.classList.toggle("hot", cells[j] === best);
    if (innerWidth > 900 && introH) {
      const imx = Math.max(0, introEl.clientHeight - 48 - introH.offsetHeight);
      const itg = Math.min(imx, Math.max(0, scrollY * 0.55));
      iy2 += (itg - iy2) * 0.24;
      introH.style.transform = `translate3d(0,${iy2.toFixed(1)}px,0)`;
    } else if (iy2) {
      iy2 = 0;
      introH.style.transform = "";
    }
    requestAnimationFrame(frame);
  }
  if (!reduce) requestAnimationFrame(frame);

  /* ---------- Section nav ---------- */
  $$("[data-go]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById(a.dataset.go).scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      $$("[data-go]").forEach((x) => x.classList.toggle("on", x.dataset.go === a.dataset.go));
    })
  );

  /* ---------- Proof ticker: one figure at a time, 3.6s crossfade; counts up once on load ---------- */
  function count(el) {
    const m = el.textContent.match(/^([^\d]*)([\d.]+)(.*)$/);
    if (!m || reduce) return;
    const end = parseFloat(m[2]);
    const dec = (m[2].split(".")[1] || "").length;
    let t0 = 0;
    el.textContent = m[1] + (0).toFixed(dec) + m[3];
    setTimeout(() => {
      requestAnimationFrame(function step(t) {
        if (!alive()) return;
        if (!t0) t0 = t;
        let k = Math.min(1, (t - t0) / 1600);
        k = 1 - (1 - k) ** 4;
        el.textContent = m[1] + (end * k).toFixed(dec) + m[3];
        if (k < 1) requestAnimationFrame(step);
      });
    }, 700);
  }
  const pf = [...$$(".proof div")];
  let pi = 0;
  count(pf[0].firstChild);
  if (!reduce)
    proofTimer = setInterval(() => {
      pf[pi].classList.remove("on");
      pi = (pi + 1) % pf.length;
      pf[pi].classList.add("on");
    }, 3600);
}

document.addEventListener("astro:page-load", initHome);

/* ---------- Copy email: delegated on document, needs binding only once ---------- */
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
  if (b) copyMail(b, $("#mail"));
});
