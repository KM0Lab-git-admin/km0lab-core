'use client';

import BreakpointIndicator from '@/components/devtools/BreakpointIndicator';
import { ContentShell } from '@/components/ui/content-shell';
import { FloatingDots } from '@/components/ui/floating-dots';
import { LogoHeader } from '@/components/ui/logo-header';
import { LanguageButton } from '@/components/ui/primitives/language-button';
import { TitleSubtitle } from '@/components/ui/title-subtitle';
import { getLanguageConfig, type Locale } from '@/utils/languageConfig';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

const availableLocales: Locale[] = ['ca', 'es', 'en'];

export default function LanguageSelection() {
  const router = useRouter();
  const [selected, setSelected] = useState<Locale | null>(null);
  const [texts, setTexts] = useState<{ title: string; subtitle: string }>(
    languageSelectionTexts.en || { title: 'Select your language', subtitle: 'Which language would you like to start with?' },
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lang = navigator.language || navigator.languages?.[0] || 'en';
      const langCode = lang.split('-')[0]?.toLowerCase() || 'en';
      const detectedTexts = languageSelectionTexts[langCode] || languageSelectionTexts.en;
      if (detectedTexts) {
        setTexts(detectedTexts);
      }
    }
  }, []);

  const handleContinue = () => {
    if (selected) {
      router.push(`/${selected}/onboarding`);
    }
  };

  return (
    <ContentShell className="relative items-center justify-between gap-adaptive-sm">
      <BreakpointIndicator />

      <LogoHeader scale="sm" logoScale="md" />

      <div className="relative flex flex-1 flex-col items-center justify-center gap-3 px-6 mobile-p:gap-4 mobile-p:px-8 tablet:gap-5">
        <FloatingDots />

        <div className="relative z-10 flex w-28 items-center justify-center mobile-p:w-32 tablet:w-40">
          <Image
            src="/assets/images/km0-language-v1.jpg"
            alt="KM0 Lab mascota"
            width={160}
            height={160}
            className="animate-float rounded-full object-cover shadow-lg"
            priority
          />
        </div>

        <TitleSubtitle
          title={texts.title}
          subtitle={texts.subtitle}
          size="md"
          titleClassName="text-km0-blue-700"
          className="relative z-10"
        />

        <div className="relative z-10 flex w-full flex-col items-center gap-2 mobile-p:gap-3">
          {availableLocales.map((locale, i) => {
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
                selected={selected === locale}
                onClick={() => setSelected(locale)}
                className={`w-full max-w-language-button animate-fade-in-up ${
                  i === 1 ? 'animate-delay-100' : i === 2 ? 'animate-delay-200' : ''
                }`}
              />
            );
          })}
        </div>

        {selected && (
          <button
            type="button"
            onClick={handleContinue}
            className="mt-1 w-full max-w-language-button animate-fade-in-up rounded-full bg-km0-blue-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-km0-blue-600 mobile-p:mt-2 mobile-p:py-3.5"
          >
            {texts.title === 'Select your language' ? 'Continue' : texts.title === 'Selecciona tu idioma' ? 'Continuar' : texts.title === 'Selecciona el teu idioma' ? 'Continuar' : 'Continuer'}
            {' →'}
          </button>
        )}
      </div>

      <div className="h-4 shrink-0 mobile-p:h-6" />
    </ContentShell>
  );
}
