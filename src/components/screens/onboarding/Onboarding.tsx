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

import {
  onboardingCard,
  onboardingCounter,
  onboardingFooter,
  onboardingLogoWrapper,
  onboardingPage,
  onboardingShell,
  onboardingViewportWrapper,
} from './onboarding.styles';

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
    <div className={cn(onboardingPage)}>
      <div className={cn(onboardingShell)}>
        <header className={cn(onboardingLogoWrapper)}>
          <div
            className={cn(
              'logo-1',
              'scale-[0.65]',
              'mobile-p:scale-100',
              'mobile-l:scale-[0.8]',
              'short-landscape:scale-[0.55]',
            )}
            role="img"
            aria-label="KM0 Lab"
          />
        </header>

        <section className={cn(onboardingCard)}>
          <div className={cn(onboardingViewportWrapper)}>
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
                      align="center"
                    />
                  </CarouselSlide>
                ))}
              </CarouselTrack>
            </CarouselViewport>
          </div>

          <footer className={cn(onboardingFooter)}>
            <div className={cn(onboardingCounter)}>
              {currentIndex + 1}
              /
              {onboardingSlides.length}
            </div>

            <div className="flex flex-1 items-center justify-center">
              <SimpleSliderNavigation
                currentSlide={currentIndex}
                totalSlides={onboardingSlides.length}
                onPrev={prev}
                onNext={next}
                layout="compact"
              />
            </div>

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
                  'font-semibold whitespace-nowrap text-center',
                  'px-[clamp(0.85rem,2.5vw,1.5rem)]',
                  'py-[clamp(0.35rem,1.5vw,0.75rem)]',
                  'text-[clamp(0.7rem,1.8vw,0.85rem)]',
                  'rounded-full',
                  'shadow-sm hover:opacity-90 transition-opacity',
                  '!bg-km0-blue-700 !text-white',
                  isLast && 'opacity-50 cursor-not-allowed',
                )}
              >
                {isLast ? 'EMPEZAR' : 'SALTAR'}
              </Button>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
