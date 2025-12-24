'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/components/ui/primitives/utils';
import { Button } from '@/components/ui/primitives/button';
import { SimpleSliderNavigation } from '@/components/ui/slider/SimpleSliderNavigation';

const slides = [
  {
    id: 1,
    titleLine1: 'BIENVENIDO',
    titleLine2: 'A KM0 LAB',
    subtitle: 'Tu comercio local, más cerca que nunca.',
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
    // Page: ocupa todo el viewport
    <div
      className={cn(
        'w-full min-h-dvh-fallback',
        'flex flex-col',
        'bg-gradient-white-beige font-ui',
        'overflow-x-hidden',
      )}
    >
      {/* Wrapper: flex-1 min-h-0 para scroll interno */}
      <div
        className={cn(
          'flex-1 min-h-0 flex flex-col items-center justify-center',
          'p-3 w-full overflow-x-hidden',
          'h700:justify-between h700:px-4 h700:py-2',
          'h520:px-2 h520:py-1',
        )}
      >
        {/* Logo fuera de la tarjeta */}
        <header
          className={cn(
            'flex items-center justify-center shrink-0',
            'pb-3',
            'h700:pb-2',
            'h520:pb-1.5',
            'wideShort:hidden',
          )}
        >
          <div
            className={cn(
              'logo-1',
              'h700:scale-90',
              'h520:scale-[0.7]',
            )}
            role="img"
            aria-label="KM0 Lab"
          />
        </header>

        {/* Card: max-h-full para no exceder wrapper */}
        <section
          ref={containerRef}
          className={cn(
            'w-full h-slide-container overflow-hidden rounded-2xl bg-white km0-card-shadow',
            'flex flex-col',
            'max-w-sm mx-auto min-w-0',
            'h700:rounded-xl h700:flex-1 h700:min-h-0',
            'h520:flex-1 h520:min-h-0',
            'wideShort:max-w-4xl wideShort:flex-row',
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
                    'w-full flex-shrink-0 h-full',
                    'flex flex-col',
                    'px-5 pb-2',
                    'h700:px-5 h700:pb-2',
                    'h520:px-3 h520:pb-0.5',
                  )}
                >
                  {/* Imagen */}
                  <div
                    className={cn(
                      'relative shrink-0',
                      'rounded-2xl',
                      'h700:rounded-xl',
                      slide.color,
                      'p-3 mt-5',
                      'h700:p-3 h700:mt-3',
                      'h520:p-2 h520:rounded-xl h520:mt-3',
                    )}
                  >
                    <div
                      className={cn(
                        'relative bg-white border border-white shadow-sm',
                        'rounded-2xl',
                        'h700:rounded-xl',
                        'p-2',
                        'h700:p-2',
                        'h520:p-1 h520:rounded-lg',
                      )}
                    >
                      <img
                        src={slide.image}
                        alt={`${slide.titleLine1} ${slide.titleLine2}`}
                        className={cn(
                          'w-full object-contain',
                          'rounded-xl',
                          'h700:rounded-lg',
                          'max-h-[32dvh]',
                          'h700:max-h-[34dvh]',
                          'h520:max-h-[38dvh]',
                        )}
                        draggable={false}
                      />
                    </div>

                    {/* XP Badge */}
                    <div
                      className={cn(
                        'absolute bg-km0-coral-400 text-white font-bold rounded-full shadow-md',
                        'left-3 bottom-3 text-xs px-3 py-1',
                        'h700:left-2 h700:bottom-2 h700:text-[10px] h700:px-2 h700:py-0.5',
                        'h520:left-1.5 h520:bottom-1.5 h520:text-[9px] h520:px-2 h520:py-0.5',
                      )}
                    >
                      + 10 XP
                    </div>
                  </div>

                  {/* Texto */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div
                      className={cn(
                        'text-center',
                        'mt-4',
                        'h700:mt-3',
                        'h520:mt-2',
                      )}
                    >
                      <h1
                        className={cn(
                          'font-brand font-black text-neutral-900 uppercase tracking-tight leading-tight',
                          'text-2xl md:text-3xl',
                          'h700:text-xl',
                          'h520:text-2xl',
                        )}
                      >
                        {slide.titleLine1}
                        <br />
                        {slide.titleLine2}
                      </h1>

                      {/* Subtítulo */}
                      <p
                        className={cn(
                          'font-ui text-neutral-500 leading-relaxed',
                          'mt-2',
                          'h700:mt-1',
                          'text-sm md:text-base',
                          'h700:text-sm',
                          'h520:text-xs h520:mt-0.5',
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
            'px-2 pt-3',
            'h700:px-1 h700:pt-2',
            'h520:px-1 h520:pt-2',
            'wideShort:hidden',
          )}
        >
          {/* Contador */}
          <div
            className={cn(
              'text-km0-blue-700 font-bold shrink-0',
              'text-base w-12',
              'h700:text-sm h700:w-10',
              'h520:text-xs h520:w-8',
            )}
          >
            {safeIndex + 1}/{slides.length}
          </div>

          <SimpleSliderNavigation
            currentSlide={safeIndex}
            totalSlides={slides.length}
            onPrev={handlePrevSlide}
            onNext={handleNextSlide}
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
                '!px-3 !py-2 !text-xs !h-auto',
                'h700:!px-2.5 h700:!py-1.5 h700:!text-xs',
                'h520:!px-2 h520:!py-1 h520:!text-[10px]',
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
