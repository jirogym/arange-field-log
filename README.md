# 現場ログ / THE FIELD LOG — arange オウンドメディア (Astro)

AI時代の「実行」の検証記録メディア。静的生成（SSG）で、SEO/AIOに強い構成。

## なぜAstro / SSGか（SEO・AIOの理由）
- **完成HTMLを配信**するので、検索botにもAIクローラ（GPTBot / PerplexityBot / ClaudeBot 等）にも本文が確実に届く
- **JSON-LD構造化データ**（Article / Organization / BreadcrumbList / WebSite / FAQPage）を全ページに自動出力 → 検索リッチリザルト＆AIの引用・推薦に効く
- デフォルトでJSをほぼ吐かない → 高速 = Core Web Vitals / クロール効率が良い
- Markdownで記事管理 → 非エンジニアでも書ける

## セットアップ
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ に静的出力
npm run preview  # 本番ビルドの確認
```

## 公開前にやること
1. `src/consts.js` の `domain` を本番URLに変更（canonical / OGP / sitemap に反映）
2. `src/consts.js` の `contactUrl` を壁打ち予約URLに
3. `public/robots.txt` 末尾の Sitemap URL をドメインに合わせて変更
4. `public/og-default.png`（1200×630）を本物のOG画像に差し替え
5. 記事ごとの個別OG画像が必要なら frontmatter の `ogImage` を指定

## 記事の書き方
`src/content/articles/<slug>.md` を追加。`<slug>` がそのままURL（`/articles/<slug>/`）。

主なfrontmatter:
- `title` / `description`（descriptionはmeta＆AIO要約に使用）
- `category`（ai / creative / growth / business / body / failure）
- `tags` / `pubDate` / `updatedDate` / `readingTime`
- `featured`（トップのPick Up）/ `logNo`（例 "#018"）/ `series`
- `tldr`（要点の配列：AIに引用されやすい）/ `faq`（Q&A配列：FAQ構造化データ）
- `heroLog`（ヒーローのログ風表示行）

本文ではMarkdownに加え、`<div class="logblock">` `<div class="ba">`（Before/After KPI）`<div class="inline-cta">` などのリッチブロックがそのまま使えます（既存記事を参照）。

## 構成
```
src/
  consts.js              サイト設定・カテゴリ
  content.config.ts      記事スキーマ（型検証）
  content/articles/*.md  記事
  components/  Seo / Header / Footer / Ticker / ArticleCard
  layouts/BaseLayout.astro
  pages/  index / articles/[...slug] / category/[category] / rss.xml
public/robots.txt
```
