/* =========================================================
   PROJECT PREVIEW — Floating preview following cursor (desktop)
   - Only runs on fine pointer devices (desktop)
   - Smooth follow (lerp) + clamp
   - Fix: reset position when hiding to avoid "ghost" flashes
========================================================= */

function initProjectPreviewFollow() {
  if (typeof window === "undefined") return;
  if (typeof document === "undefined") return;

  const isFinePointer =
    window.matchMedia &&
    window.matchMedia("(hover:hover) and (pointer:fine)").matches;

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

  let targetMouseX = 0;
  let targetMouseY = 0;

  let currentPreviewX = -9999;
  let currentPreviewY = -9999;

  let previewWidth = 700;
  let previewHeight = 400;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function resetPreviewPosition() {
    currentPreviewX = -9999;
    currentPreviewY = -9999;
    previewContainer.style.transform = "translate3d(-9999px, -9999px, 0)";
  }

  function showPreview(imageSrc, titleText) {
    if (!imageSrc) return;

    previewImage.src = imageSrc;
    previewTitle.textContent = titleText || "Project";

    previewWidth = previewContainer.offsetWidth || previewWidth;
    previewHeight = previewContainer.offsetHeight || previewHeight;

    previewContainer.style.opacity = "1";
    isPreviewActive = true;
  }

  function hidePreview() {
    previewContainer.style.opacity = "0";
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
    requestAnimationFrame(animationLoop);
  }

  previewContainer.style.opacity = "0";
  resetPreviewPosition();
  animationLoop();

  projectsList.addEventListener(
    "pointermove",
    (event) => {
      targetMouseX = event.clientX;
      targetMouseY = event.clientY;
    },
    { passive: true }
  );

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

  window.addEventListener(
    "scroll",
    () => {
      if (isPreviewActive) hidePreview();
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    if (isPreviewActive) hidePreview();
  });
}

// Ejecutar cuando el DOM esté listo
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initProjectPreviewFollow, {
      once: true,
    });
  } else {
    initProjectPreviewFollow();
  }
}