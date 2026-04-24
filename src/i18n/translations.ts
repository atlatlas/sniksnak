export const languages = {
  en: 'English',
  nl: 'Nederlands',
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'en';

const translations = {
  en: {
    nav: {
      home: 'Homepage',
      domestic: 'Domestic',
      world: 'World',
      tech: 'Tech',
      sports: 'Sports',
      column: 'Column',
    },
    ticker: {
      label: 'BREAKING',
      empty: 'No news yet. Add your first article via the admin panel.',
    },
    featured: {
      readTime: 'min read',
    },
    articles: {
      title: 'Fresh off the press',
      seeAll: 'See all',
      readTime: 'min',
      backToHome: 'Back to homepage',
    },
    sidebar: {
      trending: 'Trending',
      trendingEmpty: 'No articles yet.',
      newsletterTitle: 'Stay in the loop',
      newsletterDesc: "The best sarcasm in your inbox every Friday. No spam, promised.",
      newsletterPlaceholder: 'your@email.com',
      newsletterButton: 'Subscribe',
      newsletterNote: 'Unsubscribe anytime. You probably have nothing better to do anyway.',
      quote: '"I don\'t read because I enjoy it. I read because I\'m on the train and have no signal."',
      quoteAuthor: '— Real Person',
    },
    categories: {
      title: 'Categories',
      domestic: { label: 'Domestic', desc: "Where it really happens. Well, sort of." },
      world: { label: 'World', desc: "The rest of the world, but funny." },
      tech: { label: 'Tech', desc: 'Easy as pie, but with sarcasm.' },
      sports: { label: 'Sports', desc: 'Losing was never this entertaining.' },
    },
    categoryPage: {
      articles: 'articles',
      article: 'article',
      empty: 'No {category} articles yet.',
      addArticle: 'Add an article via the admin panel at',
    },
    empty: {
      title: 'No articles yet',
      desc: 'Add your first satirical news article via the admin panel at',
    },
    footer: {
      tagline: 'News you need, but don\'t deserve.',
      categories: 'Categories',
      aboutUs: 'About us',
      editorial: 'Editorial',
      contact: 'Contact',
      advertise: 'Advertise',
      legal: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies',
      copyright: 'All rights reserved. User rights prohibited.',
    },
    toast: {
      subscribed: "You're subscribed! Brace yourself for the truth.",
      copied: 'Link copied to clipboard!',
    },
  },
  nl: {
    nav: {
      home: 'Voorpagina',
      domestic: 'Binnenland',
      world: 'Buitenland',
      tech: 'Tech',
      sports: 'Sport',
      column: 'Column',
    },
    ticker: {
      label: 'SNELNIEUWS',
      empty: 'Nog geen nieuws. Voeg je eerste artikel toe via het beheerpaneel.',
    },
    featured: {
      readTime: 'min lezen',
    },
    articles: {
      title: 'Vers van de pers',
      seeAll: 'Alles bekijken',
      readTime: 'min',
      backToHome: 'Terug naar voorpagina',
    },
    sidebar: {
      trending: 'Trending',
      trendingEmpty: 'Nog geen artikelen.',
      newsletterTitle: 'Blijf op de hoogte',
      newsletterDesc: 'Elke vrijdag het beste sarcasme in je inbox. Geen spam, beloofd.',
      newsletterPlaceholder: 'jouw@email.nl',
      newsletterButton: 'Aanmelden',
      newsletterNote: 'Afmelden kan altijd. Je hebt waarschijnlijk toch niets beters te doen.',
      quote: '"Ik lees niet omdat ik het leuk vind. Ik lees omdat ik op de trein zit en geen bereik heb."',
      quoteAuthor: '— Echte Nederlander',
    },
    categories: {
      title: 'Rubrieken',
      domestic: { label: 'Binnenland', desc: 'Waar het echt gebeurt. Nou ja, min of meer.' },
      world: { label: 'Buitenland', desc: 'De rest van de wereld, maar dan grappig.' },
      tech: { label: 'Tech', desc: 'Appeltjes-eitjes, maar dan met sarcasme.' },
      sports: { label: 'Sport', desc: 'Verliezen was nog nooit zo vermakelijk.' },
    },
    categoryPage: {
      articles: 'artikelen',
      article: 'artikel',
      empty: 'Nog geen {category} artikelen.',
      addArticle: 'Voeg een artikel toe via het beheerpaneel op',
    },
    empty: {
      title: 'Nog geen artikelen',
      desc: 'Voeg je eerste sarcastische nieuwsbericht toe via het beheerpaneel op',
    },
    footer: {
      tagline: 'Nieuws dat je nodig hebt, maar niet verdiend hebt.',
      categories: 'Rubrieken',
      aboutUs: 'Over ons',
      editorial: 'Redactie',
      contact: 'Contact',
      advertise: 'Adverteren',
      legal: 'Legaal',
      privacy: 'Privacy',
      terms: 'Voorwaarden',
      cookies: 'Cookies',
      copyright: 'Alle rechten voorbehouden. Gebruikersrechten verboden.',
    },
    toast: {
      subscribed: 'Je bent aangemeld! Bereid je voor op de waarheid.',
      copied: 'Link gekopieerd naar klembord!',
    },
  },
} as const;

export type TranslationKeys = typeof translations.en;

export function t(locale: Locale): TranslationKeys {
  return translations[locale];
}

export function pathWithLocale(path: string, locale: Locale, currentLocale: Locale): string {
  if (locale === defaultLocale) {
    return path;
  }
  return `/${locale}${path}`;
}

export function switchLocalePath(currentPath: string, targetLocale: Locale, currentLocale: Locale): string {
  const prefix = currentLocale === defaultLocale ? '' : `/${currentLocale}`;
  const base = currentPath.startsWith(prefix) ? currentPath.slice(prefix.length) || '/' : currentPath;

  if (targetLocale === defaultLocale) {
    return base === '/' ? '/' : base;
  }
  return `/nl${base}`;
}
