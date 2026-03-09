/* =========================================================
   CONTACT TOOLTIP
   - Toggle tooltip
   - Copy email
   - Open mailto
========================================================= */

function initContactTooltip() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const root = document.getElementById("contactTooltip");
  const btn = document.getElementById("contactTooltipButton");
  const panel = document.getElementById("contactTooltipBubble");
  const copyBtn = document.getElementById("copyEmailButton");
  const emailBtn = document.getElementById("emailActionButton");
  const toast = document.getElementById("copyToast");

  if (!root || !btn || !panel || !copyBtn || !emailBtn) return;

  function openTooltip() {
    root.classList.add("is-open");
    btn.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
  }

  function closeTooltip() {
    root.classList.remove("is-open");
    btn.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
  }

  function toggleTooltip() {
    const isOpen = root.classList.contains("is-open");
    if (isOpen) {
      closeTooltip();
    } else {
      openTooltip();
    }
  }

  async function copyEmailToClipboard(email) {
    if (!email) return false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        return true;
      }

      const textarea = document.createElement("textarea");
      textarea.value = email;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();

      const success = document.execCommand("copy");
      textarea.remove();

      return success;
    } catch {
      return false;
    }
  }

  function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.style.display = "block";

    clearTimeout(window.__contactToastTimer);
    window.__contactToastTimer = setTimeout(() => {
      toast.style.display = "none";
    }, 1200);
  }

  btn.onclick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleTooltip();
  };

  copyBtn.onclick = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const email = copyBtn.getAttribute("data-email") || emailBtn.getAttribute("data-email") || "";

    const copied = await copyEmailToClipboard(email);

    if (copied) {
      showToast("Copied ✓");
    } else {
      showToast("Copy failed");
    }
  };

  emailBtn.onclick = (event) => {
    event.preventDefault();
    const email = emailBtn.getAttribute("data-email") || "";
    if (!email) return;
    window.location.href = `mailto:${email}`;
  };

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      closeTooltip();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeTooltip();
    }
  });
}

/* =========================================================
   SAFE INIT
========================================================= */

if (!window.__contactTooltipInitialized__) {
  const init = () => {
    initContactTooltip();
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

  window.__contactTooltipInitialized__ = true;
}