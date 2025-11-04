'use client';
import { AppHeader } from '@/components/ui/AppHeader';
import { MobileFrame } from '@/components/ui/MobileFrame';
import SliderNavigation from '@/components/ui/SliderNavigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function WelcomePage() {
  const t = useTranslations('Welcome');
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(2); // Empezamos en el slide 3 como en la imagen
  const totalSlides = 6;

  useEffect(() => {
    // Simular tiempo de carga para mostrar el loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos de loader

    return () => clearTimeout(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentSlide(prev => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const handleSlideSelect = (index: number) => {
    setCurrentSlide(index);
  };

  const slide = {
    title: t('slides.0.subtitle'),
    imageSrc: '/assets/images/welcome/slide1.PNG',
    description: t('slides.0.description'),
  };

  return (
    <div className="min-h-[100svh] flex items-start justify-center overflow-hidden px-2 xs:px-3 sm:px-4 pt-1 xs:pt-2 sm:pt-3" data-testid="hero-container">
      <MobileFrame>
        {/* Header with Status Bar and Logo */}
        <AppHeader />

        {/* Hero Content */}
        <div className="w-full flex flex-col items-center gap-1.5 xs:gap-2.5 sm:gap-3.5 flex-1 min-h-0">
          {isLoading ? (
            // Skeleton loader completo mientras carga
            <div className="w-full flex flex-col items-center gap-1.5 xs:gap-2.5 sm:gap-3.5">
              {/* Image skeleton */}
              <div className="w-full aspect-[4/3] max-h-[240px] rounded-[10px] border-[1px] xs:border-[2px] border-neutral-200 bg-neutral-100 animate-pulse" />

              {/* Title skeleton */}
              <div className="w-full h-7 xs:h-9 sm:h-11 bg-neutral-100 rounded animate-pulse" />

              {/* Description skeleton - 2 líneas */}
              <div className="w-full min-h-14 xs:min-h-16 sm:min-h-18 flex flex-col gap-1.5 justify-center">
                <div className="w-full h-3.5 bg-neutral-100 rounded animate-pulse" />
                <div className="w-3/4 h-3.5 bg-neutral-100 rounded animate-pulse mx-auto" />
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-1.5 xs:gap-2.5 sm:gap-3.5">
              {/* Hero Image */}
              <img
                className="w-full aspect-[4/3] max-h-[240px] rounded-[10px] shadow-[1px_1px_2px_1px_rgba(163,163,163,0.10)] border-[1px] xs:border-[2px] border-neutral-200 object-contain"
                src={slide.imageSrc}
                alt={slide.title}
              />

              {/* Title */}
              <h1
                className="w-full text-center font-brand text-neutral-900 leading-tight text-balance break-words overflow-wrap-anywhere hyphens-auto px-1"
                style={{ fontSize: 'clamp(14px, 4.8vw, 1.8rem)' }}
                data-testid="hero-title"
              >
                {slide.title}
              </h1>

              {/* Description */}
              <p
                className="w-full text-center text-neutral-500 font-normal leading-snug text-balance break-words overflow-wrap-anywhere hyphens-auto px-2"
                style={{ fontSize: 'clamp(13px, 3vw, 1.05rem)' }}
                data-testid="hero-description"
              >
                {slide.description}
              </p>
            </div>
          )}

          {/* Navegación del slider */}
          {!isLoading && (
            <div className="w-full flex justify-center mt-3">
              <SliderNavigation
                totalSlides={totalSlides}
                currentSlide={currentSlide}
                onPrevious={handlePrevious}
                onNext={handleNext}
                onSlideSelect={handleSlideSelect}
              />
            </div>
          )}
        </div>

      </MobileFrame>
    </div>
  );
}
