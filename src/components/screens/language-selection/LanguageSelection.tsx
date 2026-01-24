'use client';

import BreakpointIndicator from '@/components/devtools/BreakpointIndicator';
import { ContentCard } from '@/components/ui/content-card';
import { ContentShell } from '@/components/ui/content-shell';
import { LogoHeader } from '@/components/ui/logo-header';
import { LanguageButton } from '@/components/ui/primitives/language-button';
import { TitleSubtitle } from '@/components/ui/title-subtitle';
import { getLanguageConfig, type Locale } from '@/utils/languageConfig';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Textos en múltiples idiomas para título y subtítulo
const languageSelectionTexts: Record<string, { title: string; subtitle: string }> = {
  es: {
    title: 'Selecciona tu idioma',
    subtitle: '¿Con qué idioma te gustaría empezar?',
  },
  ca: {
    title: 'Selecciona el teu idioma',
    subtitle: 'Amb quin idioma t\'agradaria començar?',
  },
  en: {
    title: 'Select your language',
    subtitle: 'Which language would you like to start with?',
  },
  fr: {
    title: 'Sélectionnez votre langue',
    subtitle: 'Dans quelle langue souhaitez-vous commencer ?',
  },
};

export default function LanguageSelection() {
  const router = useRouter();
  const [texts, setTexts] = useState<{ title: string; subtitle: string }>(
    languageSelectionTexts.en || { title: 'Select your language', subtitle: 'Which language would you like to start with?' },
  );

  // Detectar idioma del navegador en el cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lang = navigator.language || navigator.languages?.[0] || 'en';
      const langCode = lang.split('-')[0]?.toLowerCase() || 'en';
      const detectedTexts = languageSelectionTexts[langCode] || languageSelectionTexts.en || { title: 'Select your language', subtitle: 'Which language would you like to start with?' };
      setTexts(detectedTexts);
    }
  }, []);

  const handleLanguageSelect = (locale: Locale) => {
    router.push(`/${locale}/onboarding`);
  };

  // Idiomas disponibles (configurable)
  const availableLocales: Locale[] = ['ca', 'es'];

  return (
    <ContentShell>
      <BreakpointIndicator />
      <LogoHeader scale="sm" logoScale="md" />

      <ContentCard>
        <div className="flex flex-col items-center gap-6 py-8 short-landscape:gap-3 short-landscape:py-3">
          <TitleSubtitle
            title={texts.title}
            subtitle={texts.subtitle}
            size="lg"
            titleClassName="text-km0-blue-700"
          />

          {/* Botones de idioma */}
          <div className="flex w-full flex-col items-center gap-3 short-landscape:gap-2">
            {availableLocales.map((locale) => {
              const config = getLanguageConfig(locale);
              return (
                <LanguageButton
                  key={locale}
                  variant="outline"
                  size="default"
                  flagSrc={config.flagSrc}
                  flagAlt={config.flagAlt}
                  title={config.title}
                  subtitle={config.subtitle}
                  onClick={() => handleLanguageSelect(locale)}
                  className="w-full max-w-language-button"
                />
              );
            })}
          </div>
        </div>
      </ContentCard>
    </ContentShell>
  );
}
