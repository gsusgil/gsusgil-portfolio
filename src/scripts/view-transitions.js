// Classifies each navigation as open (home→project), close (project→home) or
// switch (project→project), so components.css can play the right
// ::view-transition-*(root) animation (handoff: .case/.case.open in
// handoff/gsusgil-portfolio.html — curtain on open/close, crossfade on switch).
//
// Astro's router copies the new page's <html> attributes onto the current element during
// the swap, which wipes any class added beforehand — so the class is set twice: before
// preparation (present for the outgoing page's ::view-transition-old capture) and again
// right after the swap (present for the incoming page's ::view-transition-new capture).
// The browser's own automatic scroll restoration on back/forward can re-apply itself a
// beat after navigation settles, stomping the scroll position portfolio-home.js explicitly
// restores (handoff §4). We own that instead: manual mode, nobody else touches it.
try {
  history.scrollRestoration = "manual";
} catch (e) {}

let navClass = null;
function classify(e) {
  const fromProject = e.from?.pathname.startsWith("/projects/");
  const toProject = e.to?.pathname.startsWith("/projects/");
  navClass = !fromProject && toProject ? "vt-open" : fromProject && !toProject ? "vt-close" : fromProject && toProject ? "vt-switch" : null;
}
function apply() {
  const root = document.documentElement;
  root.classList.remove("vt-open", "vt-close", "vt-switch");
  if (navClass) root.classList.add(navClass);
}
document.addEventListener("astro:before-preparation", (e) => {
  classify(e);
  apply();
});
document.addEventListener("astro:after-swap", apply);
