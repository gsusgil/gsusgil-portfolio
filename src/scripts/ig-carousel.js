function initIgCarousel() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const canHover =
    window.matchMedia &&
    window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function getFirstSlide(track) {
    return (
      track.querySelector(".ig-scrollSlide") ||
      track.querySelector(".ig-gridSlide")
    );
  }

  function getMaxScroll(track) {
    return Math.max(0, track.scrollWidth - track.clientWidth);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function easeInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  }

  function cancelAnimation(track) {
    if (track._igAnimationFrame) {
      cancelAnimationFrame(track._igAnimationFrame);
      track._igAnimationFrame = null;
    }

    track.classList.remove("is-auto-previewing");
  }

  function animateScrollTo(track, targetLeft, duration = 1800, onDone) {
    const maxScroll = getMaxScroll(track);
    const safeTarget = clamp(targetLeft, 0, maxScroll);
    const startLeft = track.scrollLeft;
    const distance = safeTarget - startLeft;

    cancelAnimation(track);

    if (prefersReduced || Math.abs(distance) < 1) {
      track.scrollLeft = safeTarget;
      if (typeof onDone === "function") onDone();
      return;
    }

    track.classList.add("is-auto-previewing");

    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutSine(progress);

      track.scrollLeft = startLeft + distance * eased;

      if (progress < 1) {
        track._igAnimationFrame = requestAnimationFrame(tick);
      } else {
        track._igAnimationFrame = null;
        track.classList.remove("is-auto-previewing");
        if (typeof onDone === "function") onDone();
      }
    }

    track._igAnimationFrame = requestAnimationFrame(tick);
  }

  function updateButtons(wrap, track) {
    const prev = wrap.querySelector("[data-ig-prev]");
    const next = wrap.querySelector("[data-ig-next]");
    if (!prev || !next) return;

    const maxScroll = getMaxScroll(track);
    const left = track.scrollLeft;

    prev.disabled = left <= 2;
    next.disabled = left >= maxScroll - 2;
  }

  function scrollBySlide(wrap, track, dir) {
    const first = getFirstSlide(track);
    if (!first) return;

    const slideW = first.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap || "0");
    const amount = (slideW + gap) * dir;

    track.dataset.userInteracted = "1";
    track.dataset.autoPaused = "1";

    animateScrollTo(track, track.scrollLeft + amount, 850, () => {
      updateButtons(wrap, track);
    });
  }

  function startAutoPreview(wrap, track) {
    if (!canHover || prefersReduced) return;
    if (track.dataset.autoBound !== "1") return;
    if (track.dataset.userInteracted === "1") return;
    if (track.dataset.hoverPaused === "1") return;
    if (track.dataset.autoRunning === "1") return;

    const maxScroll = getMaxScroll(track);
    if (maxScroll <= 2) return;

    track.dataset.autoRunning = "1";

    const travelToEnd = () => {
      if (track.dataset.userInteracted === "1" || track.dataset.hoverPaused === "1") {
        track.dataset.autoRunning = "0";
        return;
      }

      animateScrollTo(track, maxScroll, 7500, () => {
        updateButtons(wrap, track);

        track._igAutoTimer = window.setTimeout(() => {
          travelToStart();
        }, 1400);
      });
    };

    const travelToStart = () => {
      if (track.dataset.userInteracted === "1" || track.dataset.hoverPaused === "1") {
        track.dataset.autoRunning = "0";
        return;
      }

      animateScrollTo(track, 0, 7500, () => {
        updateButtons(wrap, track);

        track._igAutoTimer = window.setTimeout(() => {
          track.dataset.autoRunning = "0";
          startAutoPreview(wrap, track);
        }, 1700);
      });
    };

    travelToEnd();
  }

  function pauseAutoPreview(track) {
    track.dataset.hoverPaused = "1";

    if (track._igAutoTimer) {
      clearTimeout(track._igAutoTimer);
      track._igAutoTimer = null;
    }

    cancelAnimation(track);
    track.dataset.autoRunning = "0";
  }

  function resumeAutoPreview(wrap, track) {
    if (track.dataset.userInteracted === "1") return;

    track.dataset.hoverPaused = "0";

    window.setTimeout(() => {
      startAutoPreview(wrap, track);
    }, 650);
  }

  function bindCarousel(wrap) {
    const track = wrap.querySelector("[data-ig-carousel]");
    const prev = wrap.querySelector("[data-ig-prev]");
    const next = wrap.querySelector("[data-ig-next]");

    if (!track || !prev || !next) return;
    if (wrap.dataset.igBound === "1") return;

    wrap.dataset.igBound = "1";

    track.dataset.autoBound = "1";
    track.dataset.userInteracted = "0";
    track.dataset.hoverPaused = "0";
    track.dataset.autoRunning = "0";

    updateButtons(wrap, track);

    prev.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      pauseAutoPreview(track);
      scrollBySlide(wrap, track, -1);
    });

    next.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      pauseAutoPreview(track);
      scrollBySlide(wrap, track, 1);
    });

    track.addEventListener("scroll", () => {
      updateButtons(wrap, track);
    });

    track.addEventListener("pointerdown", () => {
      track.dataset.userInteracted = "1";
      track.dataset.autoPaused = "1";
      pauseAutoPreview(track);
    });

    track.addEventListener(
      "wheel",
      () => {
        track.dataset.userInteracted = "1";
        track.dataset.autoPaused = "1";
        pauseAutoPreview(track);
      },
      { passive: true }
    );

    if (canHover) {
      wrap.addEventListener("mouseenter", () => {
        pauseAutoPreview(track);
      });

      wrap.addEventListener("mouseleave", () => {
        resumeAutoPreview(wrap, track);
      });
    }

    if (!prefersReduced && canHover && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            if (track.dataset.userInteracted === "1") return;

            startAutoPreview(wrap, track);
          });
        },
        {
          threshold: 0.35,
        }
      );

      observer.observe(wrap);
    }
  }

  document.querySelectorAll(".ig-scrollWrap").forEach(bindCarousel);
}

function boot() {
  if (typeof document === "undefined") return;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initIgCarousel, { once: true });
  } else {
    initIgCarousel();
  }

  document.addEventListener("astro:page-load", initIgCarousel);
  document.addEventListener("astro:after-swap", initIgCarousel);
}

boot();