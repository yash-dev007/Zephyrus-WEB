// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// TODO(launch): replace with the confirmed production domain before deploy.
const SITE = process.env.PUBLIC_SITE_URL ?? 'https://zephyrus.example';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'never',
  integrations: [react(), sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
