/* =========================================================
   PROJECT PREVIEW — Floating preview following cursor
   - Fine pointer only
   - Delegated events
   - Moved to body to avoid z-index / footer issues
   - Works while scrolling over the list
   - Instant first position
   - Safe init for Astro navigation
========================================================= */

function initProjectPreviewFollow() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const isFinePointer =
    window.matchMedia &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!isFinePointer) return;

  const projectsList = document.getElementById("projectsList");
  const previewContainer = document.getElementById("previewFloat");
  const previewImage = document.getElementById("previewImage");
  const previewTitle = document.getElementById("previewTitle");

  if (!projectsList || !previewContainer || !previewImage || !previewTitle) return;

  /*
    Important:
    Move preview to body so it is not trapped inside sections, Lenis wrappers,
    transformed parents, or below the footer stacking context.
  */
  if (previewContainer.parentElement !== document.body) {
    document.body.appendChild(previewContainer);
  }

  const cursorOffset = 18;
  const lerpFactor = 0.24;
  const safeMargin = 12;

  let activeRow = null;
  let isPreviewActive = false;
  let animationFrameId = null;
  let syncFrameId = null;
  let syncTimeoutId = null;

  let targetMouseX = 0;
  let targetMouseY = 0;

  let currentPreviewX = 0;
  let currentPreviewY = 0;

  let previewWidth = 700;
  let previewHeight = 400;

  const imageCache = new Map();

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function preloadImage(src) {
    if (!src || imageCache.has(src)) return;

    const img = new Image();
    img.decoding = "async";
    img.src = src;

    imageCache.set(src, img);
  }

  function preloadAllProjectImages() {
    projectsList.querySelectorAll("[data-preview]").forEach((row) => {
      preloadImage(row.getAttribute("data-preview"));
    });
  }

  function measurePreview() {
    previewWidth = previewContainer.offsetWidth || previewWidth;
    previewHeight = previewContainer.offsetHeight || previewHeight;
  }

  function getSafePosition(mouseX, mouseY) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let desiredX = mouseX + cursorOffset;
    let desiredY = mouseY + cursorOffset;

    if (desiredX + previewWidth + safeMargin > viewportWidth) {
      desiredX = mouseX - previewWidth - cursorOffset;
    }

    if (desiredY + previewHeight + safeMargin > viewportHeight) {
      desiredY = mouseY - previewHeight - cursorOffset;
    }

    desiredX = clamp(
      desiredX,
      safeMargin,
      viewportWidth - previewWidth - safeMargin
    );

    desiredY = clamp(
      desiredY,
      safeMargin,
      viewportHeight - previewHeight - safeMargin
    );

    return {
      x: desiredX,
      y: desiredY,
    };
  }

  function setPreviewPosition(x, y) {
    previewContainer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function getRowFromPoint(x, y) {
    const element = document.elementFromPoint(x, y);
    if (!element) return null;

    const row = element.closest("[data-preview]");
    if (!row || !projectsList.contains(row)) return null;

    return row;
  }

  function showPreview(row, instant = false) {
    const imageSrc = row.getAttribute("data-preview");
    const titleText = row.getAttribute("data-title");

    if (!imageSrc) return;

    activeRow = row;

    previewTitle.textContent = titleText || "Project";

    if (previewImage.getAttribute("src") !== imageSrc) {
      previewImage.src = imageSrc;
    }

    measurePreview();

    if (instant || !isPreviewActive) {
      const startPosition = getSafePosition(targetMouseX, targetMouseY);

      currentPreviewX = startPosition.x;
      currentPreviewY = startPosition.y;

      setPreviewPosition(currentPreviewX, currentPreviewY);
    }

    previewContainer.classList.add("is-visible");
    previewContainer.setAttribute("aria-hidden", "false");

    isPreviewActive = true;
  }

  function hidePreview() {
    activeRow = null;
    isPreviewActive = false;

    previewContainer.classList.remove("is-visible");
    previewContainer.setAttribute("aria-hidden", "true");

    setPreviewPosition(-9999, -9999);
  }

  function syncRowUnderCursor() {
    const row = getRowFromPoint(targetMouseX, targetMouseY);

    if (!row) {
      if (isPreviewActive) hidePreview();
      return;
    }

    if (row !== activeRow) {
      showPreview(row, true);
    }
  }

  function scheduleSyncAfterScroll() {
    if (syncFrameId) cancelAnimationFrame(syncFrameId);
    if (syncTimeoutId) clearTimeout(syncTimeoutId);

    /*
      Two RAFs + small timeout:
      - RAF handles normal scroll.
      - Timeout helps with Lenis/smooth scroll where layout keeps updating.
    */
    syncFrameId = requestAnimationFrame(() => {
      syncFrameId = requestAnimationFrame(() => {
        syncRowUnderCursor();
      });
    });

    syncTimeoutId = window.setTimeout(() => {
      syncRowUnderCursor();
    }, 90);
  }

  function updatePreviewPosition() {
    if (!isPreviewActive) return;

    const desired = getSafePosition(targetMouseX, targetMouseY);

    currentPreviewX += (desired.x - currentPreviewX) * lerpFactor;
    currentPreviewY += (desired.y - currentPreviewY) * lerpFactor;

    setPreviewPosition(currentPreviewX, currentPreviewY);
  }

  function animationLoop() {
    updatePreviewPosition();
    animationFrameId = window.requestAnimationFrame(animationLoop);
  }

  function handlePointerMove(event) {
    targetMouseX = event.clientX;
    targetMouseY = event.clientY;

    const row = event.target.closest("[data-preview]");

    if (!row || !projectsList.contains(row)) {
      if (isPreviewActive) hidePreview();
      return;
    }

    if (row !== activeRow) {
      showPreview(row, true);
    }
  }

  function handlePointerOver(event) {
    targetMouseX = event.clientX;
    targetMouseY = event.clientY;

    const row = event.target.closest("[data-preview]");
    if (!row || !projectsList.contains(row)) return;

    showPreview(row, true);
  }

  function handlePointerLeave() {
    hidePreview();
  }

  function bindEvents() {
    if (projectsList.dataset.previewBound === "1") return;
    projectsList.dataset.previewBound = "1";

    projectsList.addEventListener("pointerover", handlePointerOver, {
      passive: true,
    });

    projectsList.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    projectsList.addEventListener("pointerleave", handlePointerLeave);

    /*
      This is the key fix:
      while scrolling over the list, the element under the cursor changes
      even if the mouse does not move.
    */
    projectsList.addEventListener("wheel", scheduleSyncAfterScroll, {
      passive: true,
    });

    window.addEventListener("scroll", scheduleSyncAfterScroll, {
      passive: true,
    });

    window.addEventListener("resize", () => {
      measurePreview();
      if (isPreviewActive) hidePreview();
    });
  }

  function startLoop() {
    if (previewContainer.dataset.loopStarted === "1") return;
    previewContainer.dataset.loopStarted = "1";

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    animationLoop();
  }

  hidePreview();
  measurePreview();
  preloadAllProjectImages();
  bindEvents();
  startLoop();
}


/* =========================================================
   Safe init
========================================================= */

function bootProjectPreviewFollow() {
  if (typeof document === "undefined") return;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProjectPreviewFollow, {
      once: true,
    });
  } else {
    initProjectPreviewFollow();
  }

  document.addEventListener("astro:page-load", initProjectPreviewFollow);
  document.addEventListener("astro:after-swap", () => {
    requestAnimationFrame(initProjectPreviewFollow);
  });
}

bootProjectPreviewFollow();