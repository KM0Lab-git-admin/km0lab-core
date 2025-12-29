'use client';

import {
  CarouselSlide,
  CarouselTrack,
  CarouselViewport,
  useCarousel,
} from '@/components/ui/carousel';
import { HeroSlide } from '@/components/ui/hero-slide';
import { Button } from '@/components/ui/primitives/button';
import { cn } from '@/components/ui/primitives/utils';
import { SimpleSliderNavigation } from '@/components/ui/slider';
import { onboardingSlides } from '@/features/onboarding/slides';

export default function Onboarding() {
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
    // eslint-disable-next-line no-console
    console.log('Start App');
  };

  return (
    // Page: ocupa exactamente el viewport, nunca más
    <div
      className={cn(
        'w-full h-dvh-fallback',
        'flex flex-col',
        'bg-gradient-white-beige font-ui',
        'overflow-hidden',
      )}
    >
      {/* Wrapper: padding mínimo 10px, flex para distribuir contenido */}
      <div
        className={cn(
          'flex-1 min-h-0 flex flex-col items-center justify-start',
          'p-[10px] w-full overflow-hidden',
          'mobile-p:p-3 mobile-p:justify-center',
          'tablet:p-8',
          'short-landscape:p-2 short-landscape:justify-center',
        )}
      >
        {/* Logo fuera de la tarjeta - compacto en short-landscape */}
        <header
          className={cn(
            'flex items-center justify-center shrink-0',
            'pb-2',
            'mobile-p:pb-3',
            'tablet:pb-4',
            'short-landscape:pb-1',
          )}
        >
          <div
            className={cn(
              'logo-1',
              'scale-[0.65]',
              'mobile-p:scale-100',
              'mobile-l:scale-[0.8]',
              'short-landscape:scale-[0.5]',
            )}
            role="img"
            aria-label="KM0 Lab"
          />
        </header>

        {/* Card: crece en proporción a la resolución */}
        <section
          className={cn(
            'w-full overflow-hidden rounded-xl bg-white km0-card-shadow',
            'flex flex-col flex-1 min-h-0',
            'mx-auto',
            'max-w-full',
            'mobile-p:max-w-[355px] mobile-p:rounded-2xl',
            'tablet:max-w-[565px] tablet:flex-none tablet:max-h-[935px]',
            'desktop:max-w-6xl desktop:max-h-[650px]',
            'ultra-wide:max-w-[1400px] ultra-wide:max-h-[850px]',
            // Short landscape: horizontal layout, altura limitada
            'short-landscape:max-w-4xl short-landscape:max-h-[calc(100dvh-80px)]',
          )}
        >
          {/* Carousel Container */}
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
                  />
                </CarouselSlide>
              ))}
            </CarouselTrack>
          </CarouselViewport>
        </section>

        {/* Footer: fuera de la tarjeta */}
        <footer
          className={cn(
            'shrink-0 w-full max-w-sm',
            'flex items-center justify-between gap-2',
            'px-1 pt-2',
            'mobile-l:px-1 mobile-l:pt-2',
            'mobile-p:px-2 mobile-p:pt-3',
            'tablet:max-w-md',
            'short-landscape:pt-1 short-landscape:max-w-4xl',
          )}
        >
          {/* Contador */}
          <div
            className={cn(
              'text-km0-blue-700 font-bold shrink-0',
              'text-xs w-8',
              'mobile-l:text-sm mobile-l:w-10',
              'mobile-p:text-base mobile-p:w-12',
              'short-landscape:text-xs short-landscape:w-8',
            )}
          >
            {currentIndex + 1}
            /
            {onboardingSlides.length}
          </div>

          <SimpleSliderNavigation
            currentSlide={currentIndex}
            totalSlides={onboardingSlides.length}
            onPrev={prev}
            onNext={next}
            layout="compact"
          />

          {/* CTA */}
          <div className="shrink-0">
            <Button
              type="button"
              onClick={isLast ? handleStartApp : handleSkipOnboarding}
              disabled={isLast}
              aria-label={isLast ? 'Empezar' : 'Saltar'}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (!isLast) {
                    handleSkipOnboarding();
                  }
                }
              }}
              variant="default"
              size="sm"
              className={cn(
                '!rounded !bg-km0-blue-700 !text-white font-semibold whitespace-nowrap text-center',
                'shadow-sm hover:opacity-90 transition-opacity',
                '!px-2 !py-1 !text-[10px] !h-auto',
                'mobile-l:!px-2.5 mobile-l:!py-1.5 mobile-l:!text-xs',
                'mobile-p:!px-3 mobile-p:!py-2 mobile-p:!text-xs',
                isLast && 'opacity-50 cursor-not-allowed',
              )}
            >
              {isLast ? 'EMPEZAR' : 'SALTAR'}
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
