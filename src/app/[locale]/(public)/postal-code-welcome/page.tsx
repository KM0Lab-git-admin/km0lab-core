'use client';

import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { AppHeader } from '@/components/ui/layout/AppHeader';
import { MobileFrame } from '@/components/ui/layout/MobileFrame';
import { Button } from '@/components/ui/primitives/button';
import { Subtitle } from '@/components/ui/primitives/subtitle';
import { Title } from '@/components/ui/primitives/title';
import { cn } from '@/components/ui/primitives/utils';

export default function PostalCodeWelcomePage() {
  const t = useTranslations('PostalCodeWelcome');
  const router = useRouter();
  const params = useParams();

  const localeParam = params?.locale;
  const locale = typeof localeParam === 'string' ? localeParam : localeParam?.[0];

  const handleGoToOnboarding = () => {
    if (!locale) return;
    router.push(`/${locale}/onboarding`);
  };

  return (
    <div className="min-h-dvh-fallback flex flex-col items-stretch justify-center overflow-hidden px-2 xs:px-3 sm:px-4 pt-1 xs:pt-2 sm:pt-3">
      <MobileFrame className="flex-1 min-h-0 w-full">
        <AppHeader />

        <div className="w-full flex flex-col items-center gap-2 xs:gap-3 sm:gap-4 flex-1 min-h-0 justify-center">
          <div className="w-full text-center flex flex-col gap-1 xs:gap-2">
            <Title as="h1" size="h2" align="center" uppercase>
              {t('title')}
            </Title>
            <Subtitle size="sm" align="center" tone="muted">
              {t('subtitle')}
            </Subtitle>
          </div>

          <Button
            type="button"
            onClick={handleGoToOnboarding}
            aria-label={t('cta_aria')}
            className={cn(
              'w-full rounded bg-km0-blue-700 text-white font-semibold whitespace-nowrap text-center',
              'shadow-sm hover:opacity-90 transition-opacity',
            )}
          >
            {t('cta')}
          </Button>
        </div>
      </MobileFrame>
    </div>
  );
}


