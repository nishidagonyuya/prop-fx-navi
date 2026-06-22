// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://propfxnavi.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      // 薄い自動生成の総当たり比較ページ(X-vs-Y)はnoindex化済み → sitemapからも除外し
      // クロールバジェットを本命の記事・個社ページに集中させる
      filter: (page) => !/\/prop\/compare\/[^/]+-vs-[^/]+\//.test(page),
    }),
  ],
});
