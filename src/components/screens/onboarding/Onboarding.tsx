'use client';

import BreakpointIndicator from '@/components/devtools/BreakpointIndicator';
import {
  CarouselSlide,
  CarouselTrack,
  CarouselViewport,
  useCarousel,
} from '@/components/ui/carousel';
import { ContentCard } from '@/components/ui/content-card';
import { ContentShell } from '@/components/ui/content-shell';
import { HeroSlide } from '@/components/ui/hero-slide';
import { LogoHeader } from '@/components/ui/logo-header';
import { NavigationFooter } from '@/components/ui/navigation-footer';
import { Button } from '@/components/ui/primitives/button';
import { cn } from '@/components/ui/primitives/utils';
import { SimpleSliderNavigation } from '@/components/ui/slider';
import { getOnboardingSlides } from '@/features/onboarding/slides';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { onboardingCounter } from './onboarding.styles';

export default function Onboarding() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('Onboarding');
  const tSlides = useTranslations('OnboardingSlides');

  const onboardingSlides = getOnboardingSlides({
    welcome: {
      titleLine1: tSlides('welcome.titleLine1'),
      titleLine2: tSlides('welcome.titleLine2'),
      subtitle: tSlides('welcome.subtitle'),
      xpBadge: tSlides('welcome.xpBadge'),
    },
    discover: {
      titleLine1: tSlides('discover.titleLine1'),
      titleLine2: tSlides('discover.titleLine2'),
      subtitle: tSlides('discover.subtitle'),
      xpBadge: tSlides('discover.xpBadge'),
    },
    connect: {
      titleLine1: tSlides('connect.titleLine1'),
      titleLine2: tSlides('connect.titleLine2'),
      subtitle: tSlides('connect.subtitle'),
      xpBadge: tSlides('connect.xpBadge'),
    },
    spaces: {
      titleLine1: tSlides('spaces.titleLine1'),
      titleLine2: tSlides('spaces.titleLine2'),
      subtitle: tSlides('spaces.subtitle'),
      xpBadge: tSlides('spaces.xpBadge'),
    },
    start: {
      titleLine1: tSlides('start.titleLine1'),
      titleLine2: tSlides('start.titleLine2'),
      subtitle: tSlides('start.subtitle'),
      xpBadge: tSlides('start.xpBadge'),
    },
  });

  const {
    currentIndex,
    dragOffset,
    isDragging,
    next,
    prev,
    skipToEnd,
    isLast,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
  } = useCarousel({ totalSlides: onboardingSlides.length });

  const handleSkipOnboarding = () => {
    skipToEnd();
  };

  const handleStartApp = () => {
    const localeParam = params?.locale;
    const locale
      = typeof localeParam === 'string' ? localeParam : localeParam?.[0];
    if (!locale) {
      return;
    }
    router.push(`/${locale}/postal-code`);
  };

  const handleBack = () => {
    router.push('/language-selection');
  };

  return (
    <ContentShell>
      <BreakpointIndicator />
      <LogoHeader
        logoScale="md"
        leftAction={(
          <Button
            size="icon"
            variant="ghost"
            onClick={handleBack}
            aria-label="Volver a selección de idioma"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Button>
        )}
      />

      <ContentCard>
        <CarouselViewport
          className="flex-1 min-h-0 w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          ariaLabel="Onboarding slides"
        >
          <CarouselTrack
            currentIndex={currentIndex}
            dragOffset={dragOffset}
            isDragging={isDragging}
          >
            {onboardingSlides.map((slide, index) => (
              <CarouselSlide
                key={slide.id}
                slideId={slide.id}
                isActive={index === currentIndex}
                layout="stack"
              >
                <HeroSlide
                  title={(
                    <>
                      {slide.titleLine1}
                      {' '}
                      {slide.titleLine2}
                    </>
                  )}
                  subtitle={slide.subtitle}
                  imageSrc={slide.imageSrc}
                  badgeText={slide.xpBadge}
                  bgColor={slide.bgColor}
                  scale="md"
                />
              </CarouselSlide>
            ))}
          </CarouselTrack>
        </CarouselViewport>
      </ContentCard>

      <NavigationFooter
        left={(
          <div className={onboardingCounter()}>
            {currentIndex + 1}
            /
            {onboardingSlides.length}
          </div>
        )}
        center={(
          <SimpleSliderNavigation
            currentSlide={currentIndex}
            totalSlides={onboardingSlides.length}
            onPrev={prev}
            onNext={next}
            layout="compact"
          />
        )}
        right={(
          <Button
            type="button"
            onClick={isLast ? handleStartApp : handleSkipOnboarding}
            disabled={false}
            aria-label={isLast ? t('start_aria') : t('skip_aria')}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (isLast) {
                  handleStartApp();
                }
                if (!isLast) {
                  handleSkipOnboarding();
                }
              }
            }}
            variant="default"
            size="lg"
            className={cn(
              'rounded bg-km0-blue-700 text-white font-semibold whitespace-nowrap text-center',
              'shadow-sm hover:opacity-90 transition-opacity',
              'h-9 px-4 text-sm',
              'mobile-p:h-10 mobile-p:px-5 mobile-p:text-base',
              'tablet:h-11 tablet:px-6 tablet:text-lg tablet:shadow-md tablet:font-bold',
              'desktop:h-12 desktop:px-8 desktop:text-xl desktop:shadow-lg',
              'ultra-wide:h-14 ultra-wide:px-10 ultra-wide:text-2xl',
            )}
          >
            {isLast ? t('start') : t('skip')}
          </Button>
        )}
      />
    </ContentShell>
  );
}
