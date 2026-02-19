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
    subtitle: 'Anquim idioma vos cum ansa',
  },
  ca: {
    flagSrc: '/assets/images/catalan_flag.png',
    flagAlt: 'Bandera de Cataluña',
    title: 'Català',
    subtitle: 'Anquim idioma vos cum ansa',
  },
  en: {
    flagSrc: '/assets/images/spanish_flag.png', // TODO: Add English flag when available
    flagAlt: 'Flag of England',
    title: 'English',
    subtitle: 'Anquim idioma vos cum ansa',
  },
  fr: {
    flagSrc: '/assets/images/spanish_flag.png', // TODO: Add French flag when available
    flagAlt: 'Drapeau de la France',
    title: 'Français',
    subtitle: 'Anquim idioma vos cum ansa',
  },
};

export const getLanguageConfig = (locale: Locale): LanguageConfig => {
  return languageConfigMap[locale];
};

