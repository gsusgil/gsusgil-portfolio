function initThemeController() {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const THEME_STORAGE_KEY = "theme";

  function getCurrentTheme() {
    return document.documentElement.getAttribute("data-theme") || "dark";
  }

  function persistTheme(themeValue) {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeValue);
    } catch {}
  }

  function getPersistedTheme() {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      return null;
    }
  }

  const themeToggleButton = document.getElementById("themeToggleButton");
  const themeToggleLabel = document.getElementById("themeToggleLabel");

  function updateThemeLabel(themeValue) {
    if (!themeToggleLabel) return;
    themeToggleLabel.textContent = themeValue === "dark" ? "Dark" : "Light";
  }

  function setTheme(themeValue) {
    document.documentElement.setAttribute("data-theme", themeValue);
    persistTheme(themeValue);
    updateThemeLabel(themeValue);
  }

  updateThemeLabel(getCurrentTheme());

  if (themeToggleButton) {
    // Evitar duplicados
    if (themeToggleButton.dataset.themeBound !== "1") {
      themeToggleButton.dataset.themeBound = "1";
      themeToggleButton.addEventListener("click", () => {
        const nextTheme = getCurrentTheme() === "dark" ? "light" : "dark";
        setTheme(nextTheme);
      });
    }
  }

  const hasUserPreference = Boolean(getPersistedTheme());
  const systemThemeMediaQuery = window.matchMedia
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

  if (systemThemeMediaQuery && !hasUserPreference) {
    // Evitar duplicados del listener de change
    if (document.documentElement.dataset.systemThemeBound !== "1") {
      document.documentElement.dataset.systemThemeBound = "1";
      systemThemeMediaQuery.addEventListener("change", (event) => {
        const systemTheme = event.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", systemTheme);
        updateThemeLabel(systemTheme);
      });
    }
  }
}

function boot() {
  if (typeof document === "undefined") return;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeController, { once: true });
  } else {
    initThemeController();
  }

  document.addEventListener("astro:page-load", initThemeController);
  document.addEventListener("astro:after-swap", initThemeController);
}

boot();