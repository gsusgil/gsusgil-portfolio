// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  output: "static",
  adapter: vercel(),
  // Hide the dev-only Astro toolbar pill (it sat on top of the bottom tab bar in local dev).
  devToolbar: { enabled: false },
});