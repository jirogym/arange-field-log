// サイト全体の設定。公開前に domain / contactUrl / ogImage を実値へ。
export const SITE = {
  domain: 'https://field-log.arange.co.jp',         // ★公開ドメインに変更
  name: '現場ログ',
  nameEn: 'THE FIELD LOG',
  tagline: '動かない正解より、動く仮説を。',
  description:
    'AI・動画・広告・事業開発、そして継続と身体。アレンジが現場で実際に動かし、検証し、ときに失敗した記録を公開するメディアです。',
  publisherJa: '株式会社アレンジ',
  publisherEn: 'arange Inc.',
  corporate: 'https://arange.co.jp/',
  contactUrl: 'https://arange.co.jp/#contact', // ★壁打ち予約URLに変更可
  ogImage: '/og-default.png',
  locale: 'ja_JP',
  twitter: '@arange',
};

// カテゴリ（slug は URL とフィルタに使用）
export const CATEGORIES = [
  { slug: 'ai',          label: 'AI実装',        accent: 'gold'  },
  { slug: 'creative',    label: 'クリエイティブ', accent: 'gold'  },
  { slug: 'growth',      label: '広告・グロース', accent: 'gold'  },
  { slug: 'business',    label: '事業開発',      accent: 'gold'  },
  { slug: 'body',        label: '継続と身体',    accent: 'gold'  },
  { slug: 'failure',     label: '失敗ログ',      accent: 'red'   },
];

export const categoryLabel = (slug) =>
  (CATEGORIES.find((c) => c.slug === slug) || { label: slug }).label;
