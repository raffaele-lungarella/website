// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://raffaelelungarella.dev",
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-sans",
      weights: ["100 900"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },

    {
      provider: fontProviders.fontsource(),
      name: "Fira Code",
      cssVariable: "--font-mono",
      weights: ["300 700"],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "css-variables",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
