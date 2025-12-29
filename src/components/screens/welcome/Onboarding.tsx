'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/components/ui/primitives/utils';

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
  const router = useRouter();
  const params = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const localeParam = params?.locale;
  const locale = typeof localeParam === 'string' ? localeParam : localeParam?.[0];

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

  const handleStartApp = () => {
    if (!locale) return;
    router.push(`/${locale}/postal-code`);
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
          'p-1',
          'mobile-p:p-3',
          'mobile-l:items-stretch mobile-l:px-4 mobile-l:py-2',
        )}
      >
        <section
          className={cn(
            'w-full max-w-sm max-h-full overflow-hidden rounded-xl bg-white km0-card-shadow',
            'flex flex-col',
            'mobile-p:rounded-2xl',
            'mobile-l:h-full',
          )}
        >
          {/* Header dentro del frame */}
          <header
            className={cn(
              'bg-km0-blue-700 flex items-center justify-center shrink-0',
              'py-1',
              'mobile-l:py-2',
              'mobile-p:py-3',
            )}
          >
            <div
              className={cn(
                'logo-1',
                'scale-[0.8]',
                'mobile-l:scale-90',
                'mobile-p:scale-100',
              )}
              role="img"
              aria-label="KM0 Lab"
            />
          </header>

          {/* Content scrollable */}
          <div
            className={cn(
              'flex-1 min-h-0 overflow-y-auto',
              'flex flex-col gap-3',
              'px-4 pt-5 pb-3',
              'mobile-l:px-5 mobile-l:pb-4 mobile-l:gap-4',
              'mobile-p:px-6 mobile-p:pb-6 mobile-p:gap-4',
            )}
          >
            {/* Image block */}
            <div
              className={cn(
                'relative rounded-2xl p-2',
                'mobile-l:p-3',
                'mobile-p:p-4',
                activeSlide.color,
              )}
            >
              <div
                className={cn(
                  'relative rounded-2xl bg-white border border-white shadow-sm',
                  'p-1.5',
                  'mobile-l:p-2',
                  'mobile-p:p-3',
                )}
              >
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className={cn(
                    'w-full object-contain rounded-xl transition-transform duration-300',
                    'max-h-[22dvh]',
                    'mobile-l:max-h-[32dvh]',
                    'mobile-p:max-h-[34dvh]',
                    isAnimating ? 'scale-95' : 'scale-100',
                  )}
                />
              </div>

              {/* XP badge */}
              <div
                className={cn(
                  'absolute bg-km0-coral-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md',
                  'hidden',
                  'mobile-l:block mobile-l:left-3 mobile-l:bottom-3',
                  'mobile-p:left-4 mobile-p:bottom-4',
                )}
              >
                + 10 XP
              </div>
            </div>

            {/* Text */}
            <div
              className={cn(
                'text-center transition-all duration-300',
                'mt-0.5',
                'mobile-l:mt-1',
                isAnimating ? 'translate-y-1 opacity-90' : 'translate-y-0 opacity-100',
              )}
            >
              <h1
                className={cn(
                  'font-brand font-black text-neutral-900 uppercase tracking-tight text-balance leading-tight',
                  'text-xl',
                  'mobile-l:text-2xl',
                  'mobile-p:text-3xl',
                  'desktop:text-4xl',
                )}
              >
                {activeSlide.title}
              </h1>
              <p
                className={cn(
                  'font-ui text-neutral-500 leading-relaxed',
                  'text-sm mt-1.5',
                  'mobile-l:text-sm mobile-l:mt-2',
                  'mobile-p:text-base mobile-p:mt-3',
                  'desktop:text-lg',
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
              'px-4 py-2',
              'mobile-l:px-5 mobile-l:py-3',
              'mobile-p:px-6 mobile-p:py-4',
            )}
          >
            {/* Counter */}
            <div className="w-16 text-km0-blue-700 font-bold text-sm mobile-l:text-base mobile-p:text-lg">
              {safeIndex + 1}/{slides.length}
            </div>

            {/* Nav */}
            <div className="flex items-center gap-1.5 mobile-l:gap-2 mobile-p:gap-3">
              <button
                type="button"
                onClick={prevSlide}
                disabled={safeIndex === 0}
                aria-label="Anterior"
                className={cn(
                  'p-1 rounded-full text-neutral-400 hover:text-km0-blue-700 transition-colors',
                  'mobile-l:p-1.5',
                  'mobile-p:p-2',
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
                  className="h-4 w-4 mobile-p:h-5 mobile-p:w-5"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div className="flex items-center gap-1 mobile-l:gap-1.5 mobile-p:gap-2" aria-label="Progreso">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'h-1 rounded-full transition-all duration-200',
                      'mobile-l:h-1.5',
                      'mobile-p:h-2',
                      safeIndex === index
                        ? 'w-5 mobile-l:w-6 mobile-p:w-8 bg-neutral-900'
                        : 'w-1 mobile-l:w-1.5 mobile-p:w-2 bg-neutral-300',
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
                  'p-1 rounded-full text-neutral-400 hover:text-km0-blue-700 transition-colors',
                  'mobile-l:p-1.5',
                  'mobile-p:p-2',
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
                  className="h-4 w-4 mobile-p:h-5 mobile-p:w-5"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Skip / Start */}
            <div className="w-16 flex justify-end">
              <button
                type="button"
                onClick={isLastSlide ? handleStartApp : skipOnboarding}
                aria-label={isLastSlide ? 'Empezar' : 'Saltar'}
                className={cn(
                  'rounded bg-km0-blue-700 text-white font-semibold whitespace-nowrap text-center',
                  'shadow-sm hover:opacity-90 transition-opacity',
                  'px-3 py-1.5 text-xs',
                  'mobile-l:px-3.5 mobile-l:py-1.5 mobile-l:text-sm',
                  'mobile-p:px-4 mobile-p:py-2 mobile-p:text-sm',
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
