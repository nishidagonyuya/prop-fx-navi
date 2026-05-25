// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nishidayuya.github.io',
  base: '/prop-fx-navi',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
