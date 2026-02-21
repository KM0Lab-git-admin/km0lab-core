export type Locale = 'es' | 'ca' | 'en' | 'fr';

export type LanguageConfig = {
  flagSrc: string;
  flagAlt: string;
  title: string;
  subtitle: string;
};

const languageConfigMap: Record<Locale, LanguageConfig> = {
  es: {
    flagSrc: '/assets/images/spanish_flag.png',
    flagAlt: 'Bandera de España',
    title: 'Español',
    subtitle: 'Empieza en español',
  },
  ca: {
    flagSrc: '/assets/images/catalan_flag.png',
    flagAlt: 'Bandera de Cataluña',
    title: 'Català',
    subtitle: 'Comença en català',
  },
  en: {
    flagSrc: '/assets/images/spanish_flag.png', // TODO: Add English flag when available
    flagAlt: 'Flag of England',
    title: 'English',
    subtitle: 'Start in English',
  },
  fr: {
    flagSrc: '/assets/images/spanish_flag.png', // TODO: Add French flag when available
    flagAlt: 'Drapeau de la France',
    title: 'Français',
    subtitle: 'Commencez en français',
  },
};

export const getLanguageConfig = (locale: Locale): LanguageConfig => {
  return languageConfigMap[locale];
};

