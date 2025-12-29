'use client';

import BreakpointIndicator from '@/components/devtools/BreakpointIndicator';
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
  onboardingHeader,
  onboardingLogo,
  onboardingPage,
  onboardingShell,
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

  // Scale semántico: puede venir de props o contexto en el futuro
  const scale = 'md';

  return (
    <div className={onboardingPage()}>
      <BreakpointIndicator />
      <div className={onboardingShell({ scale })}>
        <header className={onboardingHeader({ scale })}>
          <div
            className={onboardingLogo({ scale })}
            role="img"
            aria-label="KM0 Lab"
          />
        </header>

        <section className={onboardingCard({ scale })}>
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
                    scale={scale}
                  />
                </CarouselSlide>
              ))}
            </CarouselTrack>
          </CarouselViewport>
        </section>

        <footer className={onboardingFooter({ scale })}>
          <div className={onboardingCounter({ scale })}>
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
              size="xs"
              className={cn(
                'rounded bg-km0-blue-700 text-white font-semibold whitespace-nowrap text-center',
                'shadow-sm hover:opacity-90 transition-opacity',
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
