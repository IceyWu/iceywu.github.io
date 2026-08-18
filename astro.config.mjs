// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    sitemap(),
    icon({
      include: {
        lucide: ["mail"],
        "simple-icons": ["bluesky", "wechat", "x"],
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      themes: {
        dark: "vitesse-dark",
        light: "vitesse-light",
      },
      wrap: true,
    },
  },
  site: "https://levwu.me",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
});
