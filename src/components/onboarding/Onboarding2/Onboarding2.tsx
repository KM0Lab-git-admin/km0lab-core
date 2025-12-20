'use client';

import { useState } from 'react';
import { cn } from '@/components/ui/utils';

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

export default function Onboarding2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleSkipOnboarding = () => {
    // eslint-disable-next-line no-console
    console.log('Skip Onboarding 2');
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
      )}
    >
      {/* Wrapper: flex-1 min-h-0 para scroll interno */}
      <div
        className={cn(
          'flex-1 min-h-0 flex items-center justify-center',
          'p-3',
          'h700:p-2',
          'h520:px-2 h520:py-1',
          'h520:items-stretch',
        )}
      >
        {/* Card: max-h-full para no exceder wrapper */}
        <section
          className={cn(
            'w-full max-h-full overflow-hidden rounded-2xl bg-white km0-card-shadow',
            'flex flex-col',
            'max-w-sm',
            'h700:rounded-xl',
          'h520:flex-1 h520:min-h-0',
            // wideShort: layout horizontal
            'wideShort:max-w-4xl wideShort:flex-row',
          )}
        >
          {/* Header: shrink-0, oculto en wideShort */}
          <header
            className={cn(
              'bg-white flex items-center justify-center shrink-0',
              'py-3',
              'h700:py-2',
              'h520:py-1.5',
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

          {/* Content: flex-1 min-h-0 overflow-y-auto (scrollable) */}
          <div
            className={cn(
              'flex-1 min-h-0 overflow-y-auto',
              'flex flex-col',
              'px-5 pb-2',
              'h700:px-4 h700:pb-2',
              'h520:px-3 h520:pb-0.5',
              'h520:flex-1',
              // wideShort: horizontal layout
              'wideShort:flex-row wideShort:items-center wideShort:gap-8 wideShort:p-6',
            )}
          >
            {/* Imagen */}
            <div
              className={cn(
                'relative shrink-0',
                'rounded-2xl',
                'h700:rounded-xl',
                activeSlide.color,
                'p-3',
                'h700:p-2',
                'h520:p-2 h520:rounded-xl',
                'wideShort:w-1/2 wideShort:shrink-0',
              )}
            >
              <div
                className={cn(
                  'relative bg-white border border-white shadow-sm',
                  'rounded-2xl',
                  'h700:rounded-xl',
                  'p-2',
                  'h700:p-1',
                  'h520:p-1 h520:rounded-lg',
                )}
              >
                <img
                  src={activeSlide.image}
                  alt={`${activeSlide.titleLine1} ${activeSlide.titleLine2}`}
                  className={cn(
                    'w-full object-contain',
                    'rounded-xl',
                    'h700:rounded-lg',
                    // Altura máxima adaptativa con dvh
                    'max-h-[32dvh]',
                    'h700:max-h-[26dvh]',
                    'h520:max-h-[38dvh]',
                    'wideShort:max-h-[50dvh]',
                    'transition-transform duration-300',
                    isAnimating ? 'scale-95' : 'scale-100',
                  )}
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
            <div className="wideShort:flex-1 wideShort:flex wideShort:flex-col wideShort:justify-center">
              <div
                className={cn(
                  'text-center',
                  'wideShort:text-left',
                  'mt-4',
                  'h700:mt-2',
                  'h520:mt-2',
                  'wideShort:mt-0',
                  'transition-all duration-300',
                  isAnimating ? 'translate-y-1 opacity-90' : 'translate-y-0 opacity-100',
                )}
              >
                <h1
                  className={cn(
                    'font-brand font-black text-neutral-900 uppercase tracking-tight leading-tight',
                    'text-2xl md:text-3xl',
                    'h700:text-xl',
                    'h520:text-2xl',
                    'wideShort:text-2xl',
                  )}
                >
                  {activeSlide.titleLine1}
                  <br />
                  {activeSlide.titleLine2}
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
                    'wideShort:text-base wideShort:mt-2',
                  )}
                >
                  {activeSlide.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Footer: shrink-0, siempre visible */}
          <footer
            className={cn(
              'shrink-0 bg-white',
              'flex items-center justify-between gap-2',
              'px-5 py-3',
              'h700:px-4 h700:py-2',
              'h520:px-3 h520:py-2',
              'wideShort:px-6 wideShort:py-4',
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

            {/* Nav */}
            <div
              className={cn(
                'flex-1 min-w-0 flex items-center justify-center',
                'gap-1',
                'h520:gap-0.5',
              )}
            >
              <button
                type="button"
                onClick={handlePrevSlide}
                disabled={safeIndex === 0}
                aria-label="Anterior"
                tabIndex={0}
                className={cn(
                  'rounded-full text-neutral-400 hover:text-km0-blue-700 transition-colors',
                  'p-1.5',
                  'h700:p-1',
                  'h520:p-0.5',
                  safeIndex === 0 && 'opacity-30 cursor-not-allowed hover:text-neutral-400',
                )}
              >
                <svg
                  className={cn('w-5 h-5', 'h700:w-4 h700:h-4', 'h520:w-4 h520:h-4')}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div
                className={cn('flex items-center', 'gap-1.5', 'h700:gap-1', 'h520:gap-0.5')}
                aria-label="Progreso"
              >
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'rounded-full transition-all duration-200',
                      'h-2',
                      'h700:h-1.5',
                      'h520:h-1',
                      safeIndex === index
                        ? cn('bg-neutral-900', 'w-6', 'h700:w-5', 'h520:w-4')
                        : cn('bg-neutral-300', 'w-2', 'h700:w-1.5', 'h520:w-1'),
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNextSlide}
                disabled={isLastSlide}
                aria-label="Siguiente"
                tabIndex={0}
                className={cn(
                  'rounded-full text-neutral-400 hover:text-km0-blue-700 transition-colors',
                  'p-1.5',
                  'h700:p-1',
                  'h520:p-0.5',
                  isLastSlide && 'opacity-30 cursor-not-allowed hover:text-neutral-400',
                )}
              >
                <svg
                  className={cn('w-5 h-5', 'h700:w-4 h700:h-4', 'h520:w-4 h520:h-4')}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* CTA */}
            <div className="shrink-0">
              <button
                type="button"
                onClick={isLastSlide ? handleStartApp : handleSkipOnboarding}
                aria-label={isLastSlide ? 'Empezar' : 'Saltar'}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    isLastSlide ? handleStartApp() : handleSkipOnboarding();
                  }
                }}
                className={cn(
                  'rounded bg-km0-blue-700 text-white font-semibold whitespace-nowrap text-center',
                  'shadow-sm hover:opacity-90 transition-opacity',
                  'px-3 py-2 text-xs',
                  'h700:px-2.5 h700:py-1.5 h700:text-xs',
                  'h520:px-2 h520:py-1 h520:text-[10px]',
                )}
              >
                {isLastSlide ? 'EMPEZAR' : 'SALTAR'}
              </button>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
