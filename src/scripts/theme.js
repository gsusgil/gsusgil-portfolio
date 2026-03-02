/* =========================================================
   THEME — Control de modo nocturno (dark/light)
   - Sin frameworks
   - Guarda preferencia en localStorage
   - Respeta el sistema si el usuario no eligió nada
========================================================= */

(function initializeThemeController() {
  // =========================
  // Helpers: leer / escribir tema
  // =========================
  const THEME_STORAGE_KEY = "theme";

  function getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  }

  function persistTheme(themeValue) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeValue);
    } catch (err) {
      // Puede fallar en modo privado; no pasa nada.
    }
  }

  function getPersistedTheme() {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function setTheme(themeValue) {
    document.documentElement.setAttribute("data-theme", themeValue);
    persistTheme(themeValue);
    updateThemeLabel(themeValue);
  }

  // =========================
  // UI: actualizar label del botón
  // =========================
  const themeToggleButton = document.getElementById("themeToggleButton");
  const themeToggleLabel = document.getElementById("themeToggleLabel");

  function updateThemeLabel(themeValue) {
    if (!themeToggleLabel) return;
    themeToggleLabel.textContent = themeValue === "dark" ? "Dark" : "Light";
  }

  // =========================
  // Init: sincronizar label con tema actual
  // =========================
  updateThemeLabel(getCurrentTheme());

  // =========================
  // Evento: click toggle
  // =========================
  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", () => {
      const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    });
  }

  // =========================
  // Opcional: si NO hay preferencia guardada, seguir cambios del sistema
  // =========================
  const hasUserPreference = Boolean(getPersistedTheme());
  const systemThemeMediaQuery = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

  if (systemThemeMediaQuery && !hasUserPreference) {
    systemThemeMediaQuery.addEventListener("change", (event) => {
      const systemTheme = event.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", systemTheme);
      updateThemeLabel(systemTheme);
    });
  }
})();