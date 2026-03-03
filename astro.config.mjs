// astro.config.mjs
// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  output: "static",       // ✅ Sitio estático (cero serverless functions)
  adapter: vercel(),
});