import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sniksnak.nl',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
