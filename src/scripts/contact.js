// =========================================================
// CONTACT TOOLTIP
// - Toggle panel sin mover layout
// - Copy email
// =========================================================
function initContactTooltip() {
  if (typeof window === "undefined") return;
  if (typeof document === "undefined") return;

  const root = document.querySelector("[data-contact]");
  if (!root) return;

  const btn = root.querySelector("[data-contact-btn]");
  const panel = root.querySelector(".contactTip__panel");
  const copyBtn = root.querySelector("[data-copy-btn]");
  const emailEl = root.querySelector("[data-email]");

  if (!btn || !panel || !copyBtn || !emailEl) return;

  function close() {
    root.classList.remove("is-open");
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    root.classList.toggle("is-open");
  });

  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  copyBtn.addEventListener("click", async () => {
    const email = emailEl.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = "Copied";
      setTimeout(() => (copyBtn.textContent = "Copy"), 900);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      copyBtn.textContent = "Copied";
      setTimeout(() => (copyBtn.textContent = "Copy"), 900);
    }
  });
}

// DOM ready
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactTooltip, { once: true });
  } else {
    initContactTooltip();
  }
}