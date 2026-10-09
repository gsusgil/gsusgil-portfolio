import Lenis from "lenis";

// Both portfolio-home.js and project.js call this. With the View Transitions router,
// both modules can be loaded in the same session (it swaps DOM, it doesn't reload JS), so
// without a singleton guard each navigation that touches a "new" script would spin up a
// second Lenis instance smoothing the same native scroll — two instances fighting over one
// scroll position is what sent the page to a stale target instead of where it actually was.
let instance;

export function createLenis() {
  if (instance !== undefined) return instance;

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return (instance = null);

  const lenis = new Lenis({
    smoothWheel: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return (instance = lenis);
}

// Lenis tracks its own "virtual" scroll position and renders it via transform; it doesn't
// know the router (or our own code) just moved the native scroll — restoring home's
// position on close, resetting to the top on Previous/Next — until told. Call this AFTER
// any such adjustment, once per navigation: `resize()` re-reads the real native scroll and
// drops it in as Lenis's current position. Skipping this (or calling it too early, before
// the scroll adjustment) leaves Lenis smoothing toward a stale target and the page visually
// snaps back there.
export function resyncLenis() {
  instance?.resize();
}