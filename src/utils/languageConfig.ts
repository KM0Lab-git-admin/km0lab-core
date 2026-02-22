export type Locale = 'es' | 'ca' | 'en' | 'fr';

export type LanguageConfig = {
  flagSrc: string;
  flagAlt: string;
  title: string;
  subtitle: string;
};

const languageConfigMap: Record<Locale, LanguageConfig> = {
  es: {
    flagSrc: '/assets/flags/flag-es.svg',
    flagAlt: 'Bandera de España',
    title: 'Español',
    subtitle: 'Empieza en español',
  },
  ca: {
    flagSrc: '/assets/flags/flag-ca.svg',
    flagAlt: 'Bandera de Cataluña',
    title: 'Català',
    subtitle: 'Comença en català',
  },
  en: {
    flagSrc: '/assets/flags/flag-en.svg',
    flagAlt: 'Flag of England',
    title: 'English',
    subtitle: 'Start in English',
  },
  fr: {
    flagSrc: '/assets/flags/flag-es.svg',
    flagAlt: 'Drapeau de la France',
    title: 'Français',
    subtitle: 'Commencez en français',
  },
};

export const getLanguageConfig = (locale: Locale): LanguageConfig => {
  return languageConfigMap[locale];
};

