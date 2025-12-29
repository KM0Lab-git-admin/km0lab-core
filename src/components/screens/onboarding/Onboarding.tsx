'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/components/ui/primitives/utils';
import { Button } from '@/components/ui/primitives/button';
import { SimpleSliderNavigation } from '@/components/ui/slider';

const slides = [
  {
    id: 1,
    titleLine1: 'BIENVENIDO',
    titleLine2: 'A KM0 LAB',
    subtitle: 'Tu comercio local, más cerca que nunca. Descubre una nueva forma de interactuar con tus vecinos y apoyar el comercio de proximidad en tu barrio, todo desde una única plataforma diseñada para ti.',
    image: '/images/glovo-style-welcome.png',
    color: 'bg-km0-yellow-100',
  },
  {
    id: 2,
    titleLine1: 'DESCUBRE',
    titleLine2: 'TIENDAS',
    subtitle: 'Explora los mejores productos de tu barrio.',
    image: '/images/glovo-style-discover.png',
    color: 'bg-km0-blue-100',
  },
  {
    id: 3,
    titleLine1: 'CONECTA CON',
    titleLine2: 'VECINOS',
    subtitle: 'Forma parte de una comunidad activa y solidaria.',
    image: '/images/glovo-style-connect.png',
    color: 'bg-km0-coral-100',
  },
  {
    id: 4,
    titleLine1: 'ESPACIOS',
    titleLine2: 'PÚBLICOS',
    subtitle: 'Disfruta y cuida los espacios de todos.',
    image: '/images/glovo-style-public.png',
    color: 'bg-km0-success-100',
  },
  {
    id: 5,
    titleLine1: 'EMPIEZA',
    titleLine2: 'AHORA',
    subtitle: 'Únete a la revolución del comercio local.',
    image: '/images/glovo-style-start.png',
    color: 'bg-km0-yellow-100',
  },
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef<number>(0);
  const mouseStartX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentSlideRef = useRef(currentSlide);
  const dragOffsetRef = useRef(0);

  const handleNextSlide = () => {
    if (currentSlideRef.current < slides.length - 1) {
      setCurrentSlide((prev) => {
        const next = prev + 1;
        currentSlideRef.current = next;
        return next;
      });
    }
  };

  const handlePrevSlide = () => {
    if (currentSlideRef.current > 0) {
      setCurrentSlide((prev) => {
        const next = prev - 1;
        currentSlideRef.current = next;
        return next;
      });
    }
  };

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0]?.clientX ?? 0;
    const diff = currentX - touchStartX.current;
    // Limitar el drag para evitar overflow horizontal
    const maxDrag = 100;
    const clampedDiff = Math.max(-maxDrag, Math.min(maxDrag, diff));
    dragOffsetRef.current = clampedDiff;
    setDragOffset(clampedDiff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = 50;
    const finalOffset = dragOffsetRef.current;

    if (finalOffset < -threshold && currentSlideRef.current < slides.length - 1) {
      handleNextSlide();
    } else if (finalOffset > threshold && currentSlideRef.current > 0) {
      handlePrevSlide();
    }

    setDragOffset(0);
    dragOffsetRef.current = 0;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    mouseStartX.current = e.clientX;
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const diff = currentX - mouseStartX.current;
      // Limitar el drag para evitar overflow horizontal
      const maxDrag = 100;
      const clampedDiff = Math.max(-maxDrag, Math.min(maxDrag, diff));
      dragOffsetRef.current = clampedDiff;
      setDragOffset(clampedDiff);
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      const threshold = 50;
      const finalOffset = dragOffsetRef.current;

      if (finalOffset < -threshold && currentSlideRef.current < slides.length - 1) {
        handleNextSlide();
      } else if (finalOffset > threshold && currentSlideRef.current > 0) {
        handlePrevSlide();
      }

      setDragOffset(0);
      dragOffsetRef.current = 0;
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging]);

  const handleSkipOnboarding = () => {
    const lastSlideIndex = slides.length - 1;
    setCurrentSlide(lastSlideIndex);
    currentSlideRef.current = lastSlideIndex;
  };

  const handleStartApp = () => {
    // eslint-disable-next-line no-console
    console.log('Start App 2');
  };

  const lastIndex = Math.max(slides.length - 1, 0);
  const safeIndex = Math.min(Math.max(currentSlide, 0), lastIndex);
  const activeSlide = slides[safeIndex] ?? slides[0];
  const isLastSlide = safeIndex === lastIndex;

  if (!activeSlide) return null;

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
          'flex-1 min-h-0 flex flex-col items-center justify-start', // Always start from top to avoid clipping logo
          'p-[10px] w-full overflow-hidden',
          'mobile-p:p-3 mobile-p:justify-center', // Can center in portrait if space allows
          'tablet:p-8',
          'laptop-short:p-4 laptop-short:justify-center',
        )}
      >
        {/* Logo fuera de la tarjeta */}
        <header
          className={cn(
            'flex items-center justify-center shrink-0',
            'pb-2',
            'mobile-p:pb-3',
            'tablet:pb-4',
            'laptop-short:hidden',
          )}
        >
          <div
            className={cn(
              'logo-1',
              'scale-[0.65]',
              'mobile-p:scale-100',
              'mobile-l:scale-[0.8]',
            )}
            role="img"
            aria-label="KM0 Lab"
          />
        </header>

        {/* Card: crece en proporción a la resolución */}
        <section
          ref={containerRef}
          className={cn(
            'w-full overflow-hidden rounded-xl bg-white km0-card-shadow',
            'flex flex-col flex-1 min-h-0',
            'mx-auto',
            'max-w-full', 
            'mobile-l:flex-row mobile-l:max-w-[calc(100vw-40px)]', 
            'mobile-p:flex-col mobile-p:max-w-[355px] mobile-p:rounded-2xl', 
            'tablet:flex-col tablet:max-w-[565px] tablet:flex-none tablet:max-h-[935px]', 
            'laptop-short:max-w-4xl laptop-short:flex-row laptop-short:flex-none laptop-short:max-h-[420px]',
            'desktop:max-w-6xl desktop:max-h-[650px]',
            'ultra-wide:max-w-[1400px] ultra-wide:max-h-[850px]',
          )}
        >
          {/* Carousel Container */}
          <div
            className="flex-1 min-h-0 overflow-hidden cursor-grab active:cursor-grabbing select-none w-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
          >
            {/* Slides Track */}
            <div
              className={cn(
                'flex h-full w-full',
                !isDragging && 'transition-transform duration-300 ease-out',
              )}
              style={{
                transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
              }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className={cn(
                    'w-full flex-shrink-0 h-full min-w-0 overflow-hidden',
                    'flex flex-col',
                    'px-3 pb-0.5',
                    'mobile-l:flex-row mobile-l:px-4 mobile-l:pb-0 mobile-l:items-start mobile-l:gap-4 mobile-l:pt-6',
                    'mobile-p:flex-col mobile-p:px-4 mobile-p:pb-2 mobile-p:items-center mobile-p:pt-0',
                    'tablet:flex-col tablet:px-8 tablet:pt-6 tablet:items-center',
                    'laptop-short:flex-row laptop-short:px-10 laptop-short:pt-6 laptop-short:items-start laptop-short:gap-8',
                    'desktop:px-12 desktop:pt-10 desktop:gap-12',
                    'ultra-wide:px-16 ultra-wide:pt-14 ultra-wide:gap-16',
                  )}
                >
                  {/* Imagen */}
                  <div
                    className={cn(
                      'relative shrink-0 min-w-0',
                      'rounded-xl',
                      slide.color,
                      'p-2 mt-3',
                      'mobile-l:p-2 mobile-l:mt-0 mobile-l:w-[40%]',
                      'mobile-p:p-3 mobile-p:mt-5 mobile-p:rounded-2xl mobile-p:w-full',
                      'tablet:w-full tablet:mt-4', // Volver a vertical en Tablet
                      'laptop-short:w-[45%] laptop-short:mt-0',
                      'desktop:w-[40%]',
                      'ultra-wide:w-[35%]',
                    )}
                  >
                    <div
                      className={cn(
                        'relative bg-white border border-white shadow-sm',
                        'rounded-lg p-1',
                        'mobile-l:rounded-xl mobile-l:p-1',
                        'mobile-p:rounded-2xl mobile-p:p-2',
                      )}
                    >
                      <img
                        src={slide.image}
                        alt={`${slide.titleLine1} ${slide.titleLine2}`}
                        className={cn(
                          'w-full object-contain',
                          'rounded-lg',
                          'max-h-[38dvh]',
                          'mobile-l:rounded-xl mobile-l:max-h-[45dvh]',
                          'mobile-p:max-h-[32dvh]',
                          'laptop-short:max-h-[280px]',
                          'desktop:max-h-[450px]',
                          'ultra-wide:max-h-[600px]',
                        )}
                        draggable={false}
                      />
                    </div>

                    {/* XP Badge */}
                    <div
                      className={cn(
                        'absolute bg-km0-coral-400 text-white font-bold rounded-full shadow-md',
                        'left-1.5 bottom-1.5 text-[9px] px-2 py-0.5',
                        'mobile-l:left-1.5 mobile-l:bottom-1.5 mobile-l:text-[8px] mobile-l:px-1.5 mobile-l:py-0.5',
                        'mobile-p:left-3 mobile-p:bottom-3 mobile-p:text-xs mobile-p:px-3 mobile-p:py-1',
                      )}
                    >
                      + 10 XP
                    </div>
                  </div>

                  {/* Texto */}
                  <div
                    className={cn(
                      'flex-1 flex flex-col min-w-0',
                      'justify-start pt-2', // Reducido
                      'mobile-l:pt-2 mobile-l:justify-start mobile-l:w-[60%] mobile-l:pr-0', 
                      'mobile-p:pt-4 mobile-p:justify-start mobile-p:w-full mobile-p:pr-0', 
                      'tablet:w-full tablet:pt-6 tablet:justify-start', 
                      'laptop-short:pt-2 laptop-short:justify-start laptop-short:w-[55%]',
                      'desktop:w-[60%] desktop:pt-4',
                      'ultra-wide:w-[65%] ultra-wide:pt-6',
                    )}
                  >
                    <div
                      className={cn(
                        'text-center',
                        'mobile-l:text-center',
                        'mobile-p:text-center',
                        'tablet:text-center',
                        'laptop-short:text-left',
                      )}
                    >
                      <h1
                        className={cn(
                          'font-brand font-black text-neutral-900 uppercase tracking-tight leading-tight',
                          'text-lg', // Reducido
                          'mobile-l:text-lg',
                          'mobile-p:text-xl', // Reducido
                          'tablet:text-2xl',
                          'laptop-short:text-2xl',
                          'desktop:text-4xl',
                          'ultra-wide:text-6xl',
                        )}
                      >
                        {slide.titleLine1}
                        <br className="mobile-l:hidden laptop-short:hidden" />
                        <span className="hidden mobile-l:inline laptop-short:inline"> </span>
                        {slide.titleLine2}
                      </h1>

                      {/* Subtítulo */}
                      <p
                        className={cn(
                          'font-ui text-neutral-500 leading-relaxed',
                          'text-xs mt-0.5 pb-4',
                          'mobile-l:text-xs mobile-l:mt-1 mobile-l:pb-2',
                          'mobile-p:text-sm mobile-p:mt-2 mobile-p:pb-4',
                          'tablet:pb-8',
                          'laptop-short:text-sm laptop-short:mt-2 laptop-short:pb-0',
                          'desktop:text-lg desktop:mt-4',
                          'ultra-wide:text-2xl ultra-wide:mt-6',
                        )}
                      >
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            'laptop-short:flex laptop-short:max-w-4xl',
          )}
        >
          {/* Contador */}
          <div
            className={cn(
              'text-km0-blue-700 font-bold shrink-0',
              'text-xs w-8',
              'mobile-l:text-sm mobile-l:w-10',
              'mobile-p:text-base mobile-p:w-12',
            )}
          >
            {safeIndex + 1}/{slides.length}
          </div>

          <SimpleSliderNavigation
            currentSlide={safeIndex}
            totalSlides={slides.length}
            onPrev={handlePrevSlide}
            onNext={handleNextSlide}
            layout="compact"
          />

          {/* CTA */}
          <div className="shrink-0">
            <Button
              type="button"
              onClick={isLastSlide ? handleStartApp : handleSkipOnboarding}
              disabled={isLastSlide}
              aria-label={isLastSlide ? 'Empezar' : 'Saltar'}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (!isLastSlide) {
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
                isLastSlide && 'opacity-50 cursor-not-allowed',
              )}
            >
              {isLastSlide ? 'EMPEZAR' : 'SALTAR'}
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
