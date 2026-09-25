// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gamenock.com',   // change if the production domain differs
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { inlineStylesheets: 'never', assets: 'assets' },
  image: { responsiveStyles: false },
});
