/* =========================================================
   PROJECT PREVIEW — Floating preview following cursor (desktop)
   - Only runs on fine pointer devices (desktop)
   - Smooth follow (lerp) + clamp
   - Fix: reset position when hiding to avoid "ghost" flashes
========================================================= */

(function initializeProjectPreviewFollow() {
  const isFinePointer =
    window.matchMedia && window.matchMedia("(hover:hover) and (pointer:fine)").matches;

  if (!isFinePointer) return;

  const projectsList = document.getElementById("projectsList");
  const previewContainer = document.getElementById("previewFloat");
  const previewImage = document.getElementById("previewImage");
  const previewTitle = document.getElementById("previewTitle");

  if (!projectsList || !previewContainer || !previewImage || !previewTitle) return;

  // =========================
  // Ajustes rápidos
  // =========================
  const cursorOffset = 18;  // distancia del cursor al preview
  const lerpFactor = 0.18;  // 0.12 más suave / 0.22 más "snappy"
  const safeMargin = 12;    // margen a bordes de viewport

  let isPreviewActive = false;

  let targetMouseX = 0;
  let targetMouseY = 0;

  let currentPreviewX = -9999;
  let currentPreviewY = -9999;

  // Cache de tamaño (se calcula al mostrar)
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

    // 🔧 Medimos tamaño solo cuando se usa (por si cambia en CSS)
    // Forzamos layout SOLO aquí.
    previewWidth = previewContainer.offsetWidth || previewWidth;
    previewHeight = previewContainer.offsetHeight || previewHeight;

    previewContainer.style.opacity = "1";
    isPreviewActive = true;
  }

  function hidePreview() {
    previewContainer.style.opacity = "0";
    isPreviewActive = false;

    // 🔧 CLAVE: evitar "fantasma" al volver a entrar
    resetPreviewPosition();
  }

  function updatePreviewPosition() {
    if (!isPreviewActive) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Coloca a bottom-right por defecto, y hace flip si se sale
    let desiredX = targetMouseX + cursorOffset;
    let desiredY = targetMouseY + cursorOffset;

    if (desiredX + previewWidth + safeMargin > viewportWidth) {
      desiredX = targetMouseX - previewWidth - cursorOffset;
    }

    if (desiredY + previewHeight + safeMargin > viewportHeight) {
      desiredY = targetMouseY - previewHeight - cursorOffset;
    }

    desiredX = clamp(desiredX, safeMargin, viewportWidth - previewWidth - safeMargin);
    desiredY = clamp(desiredY, safeMargin, viewportHeight - previewHeight - safeMargin);

    // Smooth follow
    currentPreviewX += (desiredX - currentPreviewX) * lerpFactor;
    currentPreviewY += (desiredY - currentPreviewY) * lerpFactor;

    previewContainer.style.transform = `translate3d(${currentPreviewX}px, ${currentPreviewY}px, 0)`;
  }

  function animationLoop() {
    updatePreviewPosition();
    requestAnimationFrame(animationLoop);
  }

  // Estado inicial limpio
  previewContainer.style.opacity = "0";
  resetPreviewPosition();

  // Loop
  animationLoop();

  // Seguimiento del mouse solo dentro del list
  projectsList.addEventListener(
    "pointermove",
    (event) => {
      targetMouseX = event.clientX;
      targetMouseY = event.clientY;
    },
    { passive: true }
  );

  // Listeners por fila (simple y claro)
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

  // Evita estados raros en scroll/resize
  window.addEventListener("scroll", () => {
    if (isPreviewActive) hidePreview();
  }, { passive: true });

  window.addEventListener("resize", () => {
    if (isPreviewActive) hidePreview();
  });
})();