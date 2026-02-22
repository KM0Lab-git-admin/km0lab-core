'use client';

import BreakpointIndicator from '@/components/devtools/BreakpointIndicator';
import { ContentShell } from '@/components/ui/content-shell';
import { FloatingDots } from '@/components/ui/floating-dots';
import { Logo } from '@/components/ui/logo';
import { LanguageCard } from '@/components/ui/language-card';
import { getLanguageConfig, type Locale } from '@/utils/languageConfig';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const availableLocales: Locale[] = ['ca', 'es', 'en'];

export default function LanguageSelection() {
  const router = useRouter();
  const [selected, setSelected] = useState<Locale | null>(null);

  // Detect browser language on mount (kept from original)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Browser language detection is available for future use
    }
  }, []);

  const handleSelect = (locale: Locale) => {
    setSelected(locale);
    setTimeout(() => router.push(`/${locale}/onboarding`), 300);
  };

  return (
    <ContentShell className="relative items-center justify-center bg-gradient-to-b from-km0-beige-50 to-km0-beige-100">
      <BreakpointIndicator />

      <div className="flex w-full max-w-[390px] flex-col gap-8">
        {/* Header: Logo centrado (referencia: h-9, justify-between, espaciadores w-11) */}
        <div className="flex h-11 items-center justify-between">
          <div className="w-11" />
          <Logo context="entry" alt="KM0 LAB" />
          <div className="w-11" />
        </div>

        {/* Mascot + floating dots */}
        <div className="relative flex h-52 items-center justify-center">
          <FloatingDots />
          <Image
            src="/assets/images/km0_robot_icon_v2.png"
            alt="KM0 LAB mascot"
            width={224}
            height={224}
            className="h-56 w-auto animate-float object-contain drop-shadow-lg"
            priority
          />
        </div>

        {/* Language cards */}
        <div className="flex flex-col gap-3">
          {availableLocales.map((locale, i) => {
            const config = getLanguageConfig(locale);
            const isEnglish = locale === 'en';
            return (
              <LanguageCard
                key={locale}
                flag={config.flagSrc}
                flagIsImage
                name={config.title}
                description={config.subtitle}
                selected={selected === locale}
                disabled={isEnglish}
                onClick={() => handleSelect(locale)}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            );
          })}
        </div>
      </div>
    </ContentShell>
  );
}
