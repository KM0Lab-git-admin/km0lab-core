'use client';

import { useState } from 'react';
import { cn } from '@/components/ui/utils';

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
  },
];

export default function Onboarding2() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const skipOnboarding = () => {
    // eslint-disable-next-line no-console
    console.log('Skip Onboarding 2');
  };

  const lastIndex = Math.max(slides.length - 1, 0);
  const safeIndex = Math.min(Math.max(currentSlide, 0), lastIndex);
  const activeSlide = slides[safeIndex] ?? slides[0];
  const isLastSlide = safeIndex === lastIndex;

  if (!activeSlide) return null;

  return (
    <div className="w-full min-h-svh bg-gradient-app flex items-center justify-center px-3 py-4 font-ui">
      <section className="w-full max-w-sm overflow-hidden rounded-2xl bg-white km0-card-shadow">
        <header className="bg-km0-blue-700 flex items-center justify-center h-header">
          <div className="logo-1" role="img" aria-label="KM0 Lab" />
        </header>

        <div className="px-6 pt-5 pb-6">
          <div className={cn('relative rounded-2xl p-4', activeSlide.color)}>
            <div className="relative rounded-2xl bg-white border border-white shadow-sm p-3">
              <img
                src={activeSlide.image}
                alt={activeSlide.title}
                className={cn(
                  'w-full h-auto rounded-xl object-cover transition-transform duration-300',
                  isAnimating ? 'scale-95' : 'scale-100',
                )}
              />
            </div>

            <div className="absolute left-4 bottom-4 bg-km0-coral-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              + 10 XP
            </div>
          </div>

          <div
            className={cn(
              'mt-6 text-center transition-all duration-300',
              isAnimating ? 'translate-y-1 opacity-90' : 'translate-y-0 opacity-100',
            )}
          >
            <h1 className="font-brand text-3xl md:text-4xl font-black text-neutral-900 uppercase tracking-tight text-balance leading-tight">
              {activeSlide.title}
            </h1>
            <p className="mt-3 font-ui text-neutral-500 text-base md:text-lg leading-relaxed">
              {activeSlide.subtitle}
            </p>
          </div>

          <footer className="mt-6 flex items-center justify-between gap-3">
            <div className="w-16 text-km0-blue-700 font-bold text-lg">
              {safeIndex + 1}/{slides.length}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prevSlide}
                disabled={safeIndex === 0}
                aria-label="Anterior"
                className={cn(
                  'p-2 rounded-full text-neutral-400 hover:text-km0-blue-700 transition-colors',
                  safeIndex === 0 &&
                    'opacity-30 cursor-not-allowed hover:text-neutral-400',
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
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div className="flex items-center gap-2" aria-label="Progreso">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'h-2 rounded-full transition-all duration-200',
                      safeIndex === index
                        ? 'w-8 bg-neutral-900'
                        : 'w-2 bg-neutral-300',
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
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className="w-16 flex justify-end">
              <button
                type="button"
                onClick={isLastSlide ? () => console.log('Start App 2') : skipOnboarding}
                aria-label={isLastSlide ? 'Empezar' : 'Saltar'}
                className="px-4 py-2 rounded bg-km0-blue-700 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                {isLastSlide ? 'EMPEZAR' : 'SALTAR'}
              </button>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

