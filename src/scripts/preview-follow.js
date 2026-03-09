/* =========================================================
   PROJECT PREVIEW — Floating preview following cursor (desktop)
   - Fine pointer only
   - Smooth follow (lerp) + clamp
   - Preloads images to avoid delayed first hover
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

  const cursorOffset = 18;
  const lerpFactor = 0.18;
  const safeMargin = 12;

  let isPreviewActive = false;
  let animationFrameId = null;

  let targetMouseX = 0;
  let targetMouseY = 0;

  let currentPreviewX = -9999;
  let currentPreviewY = -9999;

  let previewWidth = 700;
  let previewHeight = 400;

  const imageCache = new Map();

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function preloadImage(src) {
    if (!src || imageCache.has(src)) return;

    const img = new Image();
    img.src = src;
    imageCache.set(src, img);
  }

  function preloadAllProjectImages() {
    projectsList.querySelectorAll("[data-preview]").forEach((rowElement) => {
      const src = rowElement.getAttribute("data-preview");
      preloadImage(src);
    });
  }

  function resetPreviewPosition() {
    currentPreviewX = -9999;
    currentPreviewY = -9999;
    previewContainer.style.transform = "translate3d(-9999px, -9999px, 0)";
  }

  function measurePreview() {
    previewWidth = previewContainer.offsetWidth || previewWidth;
    previewHeight = previewContainer.offsetHeight || previewHeight;
  }

  function showPreview(imageSrc, titleText) {
    if (!imageSrc) return;

    previewTitle.textContent = titleText || "Project";
    previewImage.src = imageSrc;

    measurePreview();

    previewContainer.classList.add("is-visible");
    previewContainer.setAttribute("aria-hidden", "false");
    isPreviewActive = true;
  }

  function hidePreview() {
    previewContainer.classList.remove("is-visible");
    previewContainer.setAttribute("aria-hidden", "true");
    isPreviewActive = false;
    resetPreviewPosition();
  }

  function updatePreviewPosition() {
    if (!isPreviewActive) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let desiredX = targetMouseX + cursorOffset;
    let desiredY = targetMouseY + cursorOffset;

    if (desiredX + previewWidth + safeMargin > viewportWidth) {
      desiredX = targetMouseX - previewWidth - cursorOffset;
    }

    if (desiredY + previewHeight + safeMargin > viewportHeight) {
      desiredY = targetMouseY - previewHeight - cursorOffset;
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

    currentPreviewX += (desiredX - currentPreviewX) * lerpFactor;
    currentPreviewY += (desiredY - currentPreviewY) * lerpFactor;

    previewContainer.style.transform = `translate3d(${currentPreviewX}px, ${currentPreviewY}px, 0)`;
  }

  function animationLoop() {
    updatePreviewPosition();
    animationFrameId = window.requestAnimationFrame(animationLoop);
  }

  function handlePointerMove(event) {
    targetMouseX = event.clientX;
    targetMouseY = event.clientY;
  }

  function bindProjectRows() {
    projectsList.querySelectorAll("[data-preview]").forEach((rowElement) => {
      rowElement.addEventListener("pointerenter", () => {
        const imageSrc = rowElement.getAttribute("data-preview");
        const titleText = rowElement.getAttribute("data-title");
        showPreview(imageSrc, titleText);
      });

      rowElement.addEventListener("pointerleave", () => {
        hidePreview();
      });
    });
  }

  previewContainer.classList.remove("is-visible");
  previewContainer.setAttribute("aria-hidden", "true");
  resetPreviewPosition();
  measurePreview();
  preloadAllProjectImages();
  bindProjectRows();

  projectsList.addEventListener("pointermove", handlePointerMove, {
    passive: true,
  });

  window.addEventListener(
    "scroll",
    () => {
      if (isPreviewActive) hidePreview();
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    measurePreview();
    if (isPreviewActive) hidePreview();
  });

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  animationLoop();
}

/* =========================================================
   Safe init
========================================================= */

if (!window.__projectPreviewInitialized__) {
  const init = () => {
    initProjectPreviewFollow();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  document.addEventListener("astro:page-load", init);
  document.addEventListener("astro:after-swap", () => {
    requestAnimationFrame(init);
  });

  window.__projectPreviewInitialized__ = true;
}