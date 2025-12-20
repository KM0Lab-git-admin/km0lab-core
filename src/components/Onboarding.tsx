'use client';

import { useState } from 'react';
import { cn } from '@/components/ui/utils';

// Definición de slides
const slides = [
  {
    id: 1,
    title: 'BIENVENIDO A KM0 LAB',
    subtitle: 'Tu comercio local, más cerca que nunca.',
    image: '/images/glovo-style-welcome.png',
    color: 'bg-km0-yellow-100',
  },
  {
    id: 2,
    title: 'DESCUBRE TIENDAS',
    subtitle: 'Explora los mejores productos de tu barrio.',
    image: '/images/glovo-style-discover.png',
    color: 'bg-km0-blue-100',
  },
  {
    id: 3,
    title: 'CONECTA CON VECINOS',
    subtitle: 'Forma parte de una comunidad activa y solidaria.',
    image: '/images/glovo-style-connect.png',
    color: 'bg-km0-coral-100',
  },
  {
    id: 4,
    title: 'ESPACIOS PÚBLICOS',
    subtitle: 'Disfruta y cuida los espacios de todos.',
    image: '/images/glovo-style-public.png',
    color: 'bg-km0-success-100',
  },
  {
    id: 5,
    title: 'EMPIEZA AHORA',
    subtitle: 'Únete a la revolución del comercio local.',
    image: '/images/glovo-style-start.png',
    color: 'bg-km0-yellow-100',
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const skipOnboarding = () => {
    // Lógica para saltar onboarding (ej. guardar en localStorage y redirigir)
    // eslint-disable-next-line no-console
    console.log('Skip Onboarding');
  };

  const lastIndex = Math.max(slides.length - 1, 0);
  const safeIndex = Math.min(Math.max(currentSlide, 0), lastIndex);
  const activeSlide = slides[safeIndex] ?? slides[0];
  const isLastSlide = safeIndex === lastIndex;

  if (!activeSlide) return null;

  return (
    <div
      className={cn(
        'w-full min-h-dvh-fallback',
        'flex flex-col',
        'bg-gradient-app font-ui',
      )}
    >
      <div
        className={cn(
          'flex-1 min-h-0 flex items-center justify-center',
          'p-3',
          'h700:p-2',
          'h520:p-1',
        )}
      >
        <section
          className={cn(
            'w-full max-w-sm max-h-full overflow-hidden rounded-2xl bg-white km0-card-shadow',
            'flex flex-col',
            'h700:rounded-xl',
          )}
        >
          {/* Header dentro del frame */}
          <header
            className={cn(
              'bg-km0-blue-700 flex items-center justify-center shrink-0',
              'py-3',
              'h700:py-2',
              'h520:py-1',
            )}
          >
            <div
              className={cn(
                'logo-1',
                'h700:scale-90',
                'h520:scale-80',
              )}
              role="img"
              aria-label="KM0 Lab"
            />
          </header>

          {/* Content scrollable */}
          <div
            className={cn(
              'flex-1 min-h-0 overflow-y-auto',
              'flex flex-col gap-4',
              'px-6 pt-5 pb-6',
              'h700:px-5 h700:pb-4 h700:gap-3',
              'h520:px-4 h520:pb-3 h520:gap-3',
            )}
          >
            {/* Image block */}
            <div
              className={cn(
                'relative rounded-2xl p-4',
                'h700:p-3',
                'h520:p-2',
                activeSlide.color,
              )}
            >
              <div
                className={cn(
                  'relative rounded-2xl bg-white border border-white shadow-sm',
                  'p-3',
                  'h700:p-2',
                  'h520:p-1.5',
                )}
              >
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className={cn(
                    'w-full object-contain rounded-xl transition-transform duration-300',
                    'max-h-[34dvh]',
                    'h700:max-h-[28dvh]',
                    'h520:max-h-[22dvh]',
                    isAnimating ? 'scale-95' : 'scale-100',
                  )}
                />
              </div>

              {/* XP badge */}
              <div
                className={cn(
                  'absolute left-4 bottom-4 bg-km0-coral-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md',
                  'h700:left-3 h700:bottom-3',
                  'h520:hidden',
                )}
              >
                + 10 XP
              </div>
            </div>

            {/* Text */}
            <div
              className={cn(
                'text-center transition-all duration-300',
                'h700:mt-1',
                'h520:mt-0.5',
                isAnimating ? 'translate-y-1 opacity-90' : 'translate-y-0 opacity-100',
              )}
            >
              <h1
                className={cn(
                  'font-brand font-black text-neutral-900 uppercase tracking-tight text-balance leading-tight',
                  'text-3xl md:text-4xl',
                  'h700:text-2xl',
                  'h520:text-xl',
                )}
              >
                {activeSlide.title}
              </h1>
              <p
                className={cn(
                  'mt-3 font-ui text-neutral-500 leading-relaxed',
                  'text-base md:text-lg',
                  'h700:text-sm h700:mt-2',
                  'h520:text-sm h520:mt-1.5',
                )}
              >
                {activeSlide.subtitle}
              </p>
            </div>
          </div>

          {/* Footer controls */}
          <footer
            className={cn(
              'shrink-0 flex items-center justify-between gap-3',
              'px-6 py-4',
              'h700:px-5 h700:py-3',
              'h520:px-4 h520:py-2',
            )}
          >
            {/* Counter */}
            <div className="w-16 text-km0-blue-700 font-bold text-lg h700:text-base h520:text-sm">
              {safeIndex + 1}/{slides.length}
            </div>

            {/* Nav */}
            <div className="flex items-center gap-3 h700:gap-2 h520:gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                disabled={safeIndex === 0}
                aria-label="Anterior"
                className={cn(
                  'p-2 rounded-full text-neutral-400 hover:text-km0-blue-700 transition-colors',
                  'h700:p-1.5',
                  'h520:p-1',
                  safeIndex === 0 && 'opacity-30 cursor-not-allowed hover:text-neutral-400',
                )}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 h700:h-4 h700:w-4 h520:h-4 h520:w-4"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div className="flex items-center gap-2 h700:gap-1.5 h520:gap-1" aria-label="Progreso">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'h-2 rounded-full transition-all duration-200',
                      'h700:h-1.5',
                      'h520:h-1',
                      safeIndex === index
                        ? 'w-8 h700:w-6 h520:w-5 bg-neutral-900'
                        : 'w-2 h700:w-1.5 h520:w-1 bg-neutral-300',
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                disabled={isLastSlide}
                aria-label="Siguiente"
                className={cn(
                  'p-2 rounded-full text-neutral-400 hover:text-km0-blue-700 transition-colors',
                  'h700:p-1.5',
                  'h520:p-1',
                  isLastSlide && 'opacity-30 cursor-not-allowed hover:text-neutral-400',
                )}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 h700:h-4 h700:w-4 h520:h-4 h520:w-4"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Skip / Start */}
            <div className="w-16 flex justify-end">
              <button
                type="button"
                onClick={isLastSlide ? () => console.log('Start App') : skipOnboarding}
                aria-label={isLastSlide ? 'Empezar' : 'Saltar'}
                className={cn(
                  'rounded bg-km0-blue-700 text-white font-semibold whitespace-nowrap text-center',
                  'shadow-sm hover:opacity-90 transition-opacity',
                  'px-4 py-2 text-sm',
                  'h700:px-3.5 h700:py-1.5 h700:text-sm',
                  'h520:px-3 h520:py-1.5 h520:text-xs',
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
