/* =========================================================
   RESUME MODAL CONTROLLER
   Archivo: src/scripts/modal.js
========================================================= */

function initResumeModal() {
  const modal = document.getElementById("resumeModal");
  const openButton = document.getElementById("openResumeButton");
  const closeButton = document.getElementById("closeResumeButton");
  const overlay = document.getElementById("resumeOverlay");

  if (!modal) return;

  function openResumeModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("resume-modal-open");
    document.body.style.overflow = "hidden";
    if (closeButton) closeButton.focus();
  }

  function closeResumeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("resume-modal-open");
    document.body.style.overflow = "";
    if (openButton) openButton.focus();
  }

  if (openButton && openButton.dataset.modalBound !== "1") {
    openButton.dataset.modalBound = "1";
    openButton.addEventListener("click", (e) => {
      e.preventDefault();
      openResumeModal();
    });
  }

  if (closeButton && closeButton.dataset.modalBound !== "1") {
    closeButton.dataset.modalBound = "1";
    closeButton.addEventListener("click", (e) => {
      e.preventDefault();
      closeResumeModal();
    });
  }

  if (overlay && overlay.dataset.modalBound !== "1") {
    overlay.dataset.modalBound = "1";
    overlay.addEventListener("click", (e) => {
      e.preventDefault();
      closeResumeModal();
    });
  }

  if (!window.__resumeModalEscBound__) {
    window.__resumeModalEscBound__ = true;
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) {
        closeResumeModal();
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initResumeModal, { once: true });
} else {
  initResumeModal();
}