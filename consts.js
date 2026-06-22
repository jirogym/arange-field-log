---
/**
 * SEO / AIO の中核コンポーネント。
 * - meta description / canonical / OGP / Twitter Card
 * - JSON-LD 構造化データ（WebSite / Organization / Article / BreadcrumbList / FAQPage）
 *   → 検索だけでなく ChatGPT・Perplexity 等のAIに「引用・推薦」されやすくする。
 */
import { SITE, categoryLabel } from '../consts.js';

const {
  title,
  description = SITE.description,
  type = 'website',          // 'website' | 'article'
  article,                   // { category, tags, pubDate, updatedDate, author }
  breadcrumbs = [],          // [{ name, path }]
  faq = [],                  // [{ q, a }]
  ogImage,
} = Astro.props;

const canonical = new URL(Astro.url.pathname, SITE.domain).href;
const pageTitle = title ? `${title}｜${SITE.name}` : `${SITE.name}｜${SITE.nameEn}`;
const img = new URL(ogImage || SITE.ogImage, SITE.domain).href;

const org = {
  '@type': 'Organization',
  name: SITE.publisherEn,
  alternateName: SITE.publisherJa,
  url: SITE.corporate,
  logo: new URL('/og-default.png', SITE.domain).href,
};

const graph = [
  {
    '@type': 'WebSite',
    '@id': `${SITE.domain}/#website`,
    url: SITE.domain + '/',
    name: `${SITE.name} / ${SITE.nameEn}`,
    description: SITE.description,
    inLanguage: 'ja',
    publisher: { '@id': `${SITE.domain}/#org` },
  },
  { '@id': `${SITE.domain}/#org`, ...org },
];

if (type === 'article' && article) {
  graph.push({
    '@type': 'Article',
    '@id': `${canonical}#article`,
    headline: title,
    description,
    inLanguage: 'ja',
    image: [img],
    datePublished: new Date(article.pubDate).toISOString(),
    dateModified: new Date(article.updatedDate || article.pubDate).toISOString(),
    author: { '@type': 'Person', name: article.author },
    publisher: { '@id': `${SITE.domain}/#org` },
    mainEntityOfPage: canonical,
    articleSection: categoryLabel(article.category),
    keywords: (article.tags || []).join(', '),
    isPartOf: { '@id': `${SITE.domain}/#website` },
  });
}

if (breadcrumbs.length) {
  graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: new URL(b.path, SITE.domain).href,
    })),
  });
}

if (faq.length) {
  graph.push({
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  });
}

const jsonld = { '@context': 'https://schema.org', '@graph': graph };
---
<title>{pageTitle}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta name="robots" content="index, follow, max-image-preview:large" />

<!-- Open Graph -->
<meta property="og:type" content={type} />
<meta property="og:site_name" content={`${SITE.name} / ${SITE.nameEn}`} />
<meta property="og:title" content={pageTitle} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={img} />
<meta property="og:locale" content={SITE.locale} />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content={SITE.twitter} />
<meta name="twitter:title" content={pageTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={img} />

<link rel="alternate" type="application/rss+xml" title={`${SITE.name} RSS`} href={`${SITE.domain}/rss.xml`} />

<script type="application/ld+json" set:html={JSON.stringify(jsonld)} />
