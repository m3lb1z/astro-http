// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import vue from "@astrojs/vue";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://astro-http-e1k.pages.dev",
  integrations: [mdx(), sitemap(), vue()],
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  },
  adapter: node({
    mode: "standalone",
  }),
});
