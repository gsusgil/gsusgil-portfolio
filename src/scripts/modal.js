function initResumeModal() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const modalRoot = document.getElementById("resumeModal");
  const openButton = document.getElementById("openResumeButton");
  const closeButton = document.getElementById("closeResumeButton");
  const overlay = document.getElementById("resumeOverlay");

  if (!modalRoot || !openButton || !closeButton || !overlay) return;

  let lastFocusedElement = null;

  function lockBodyScroll(shouldLock) {
    document.body.style.overflow = shouldLock ? "hidden" : "";
  }

  function openModal() {
    lastFocusedElement = document.activeElement;
    modalRoot.classList.add("is-open");
    modalRoot.setAttribute("aria-hidden", "false");
    lockBodyScroll(true);
    closeButton.focus();
  }

  function closeModal() {
    modalRoot.classList.remove("is-open");
    modalRoot.setAttribute("aria-hidden", "true");
    lockBodyScroll(false);
    if (lastFocusedElement?.focus) lastFocusedElement.focus();
  }

  // Evitar duplicados (clicks)
  openButton.removeEventListener("click", openModal);
  closeButton.removeEventListener("click", closeModal);
  overlay.removeEventListener("click", closeModal);

  openButton.addEventListener("click", openModal);
  closeButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // Evitar duplicados (keydown)
  if (window.__resumeEscHandler) {
    window.removeEventListener("keydown", window.__resumeEscHandler);
  }
  window.__resumeEscHandler = (event) => {
    if (event.key === "Escape" && modalRoot.classList.contains("is-open")) {
      closeModal();
    }
  };
  window.addEventListener("keydown", window.__resumeEscHandler);
}

// Primera carga
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initResumeModal, { once: true });
} else {
  initResumeModal();
}

// Astro nav
document.addEventListener("astro:page-load", initResumeModal);
document.addEventListener("astro:after-swap", initResumeModal);