// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/consts.js';

// https://astro.build/config
export default defineConfig({
  // SEO/AIO: 絶対URL・canonical・sitemap・OGP生成に使う本番ドメイン。
  // 公開URLに合わせて変更すること（例: https://field-log.arange.co.jp）
  site: SITE.domain,
  trailingSlash: 'always',
  integrations: [
    sitemap({ changefreq: 'weekly', priority: 0.7 }),
  ],
  build: { format: 'directory' },
});
