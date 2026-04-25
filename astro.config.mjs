import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://atlatlas.github.io/sniksnak/',
  base: '/sniksnak/',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
