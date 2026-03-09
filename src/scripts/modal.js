/* =========================================================
   RESUME MODAL CONTROLLER
   Archivo: src/scripts/modal.js
========================================================= */

function getResumeModalElements() {
  return {
    modal: document.getElementById("resumeModal"),
    closeButton: document.getElementById("closeResumeButton"),
  };
}

function openResumeModal() {
  const { modal, closeButton } = getResumeModalElements();
  if (!modal) return;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  if (closeButton) {
    closeButton.focus();
  }
}

function closeResumeModal() {
  const { modal } = getResumeModalElements();
  if (!modal) return;

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function handleDocumentClick(event) {
  const openTrigger = event.target.closest("#openResumeButton");
  const closeTrigger = event.target.closest("#closeResumeButton");
  const overlayTrigger = event.target.closest("#resumeOverlay");

  if (openTrigger) {
    event.preventDefault();
    openResumeModal();
    return;
  }

  if (closeTrigger || overlayTrigger) {
    event.preventDefault();
    closeResumeModal();
  }
}

function handleDocumentKeydown(event) {
  if (event.key === "Escape") {
    closeResumeModal();
  }
}

/* =========================================================
   Evitar registrar listeners duplicados
========================================================= */
if (!window.__resumeModalDelegated__) {
  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleDocumentKeydown);
  window.__resumeModalDelegated__ = true;
}