// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/static"; // ✅ Static, NO serverless

export default defineConfig({
  output: "static", // ✅ sitio estático
  adapter: vercel(),
});