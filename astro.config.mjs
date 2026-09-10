// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { DEFAULT_LOCALE, LOCALES } from "./src/i18n/locales.ts";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...LOCALES],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: {
        dark: "vitesse-dark",
        light: "vitesse-light",
      },
      wrap: true,
    },
  },
  redirects: {
    "/essays/en/buen-camino": "/en/essays/buen-camino/",
    "/essays/en/genie-mountain": "/en/essays/genie-mountain/",
    "/essays/en/kailash": "/en/essays/kailash/",
    "/essays/en/la-porte-etroite": "/en/essays/la-porte-etroite/",
    "/essays/en/lhasa": "/en/essays/lhasa/",
    "/essays/en/zhaogongmountian": "/en/essays/zhaogongmountian/",
    "/essays/Genie Mountain": "/essays/genie-mountain/",
    "/essays/Kailash": "/essays/kailash/",
    "/essays/La Porte étroite": "/essays/la-porte-etroite/",
    "/essays/Lhasa": "/essays/lhasa/",
    "/essays/ZhaogongMountian": "/essays/zhaogongmountian/",
    "/essays/zh-cn/buen-camino": "/essays/buen-camino/",
    "/essays/zh-cn/genie-mountain": "/essays/genie-mountain/",
    "/essays/zh-cn/kailash": "/essays/kailash/",
    "/essays/zh-cn/la-porte-etroite": "/essays/la-porte-etroite/",
    "/essays/zh-cn/lhasa": "/essays/lhasa/",
    "/essays/zh-cn/zhaogongmountian": "/essays/zhaogongmountian/",
  },
  site: "https://levwu.me",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
});
