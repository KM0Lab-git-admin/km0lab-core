'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import BreakpointIndicator from '@/components/devtools/BreakpointIndicator';
import { ContentShell } from '@/components/ui/content-shell';
import { Logo } from '@/components/ui/logo';
import { cn } from '@/components/ui/primitives/utils';
import { getOnboardingSlides } from './slides';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

const SLOT = 240;

export default function Onboarding() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('Onboarding');
  const tSlides = useTranslations('OnboardingSlides');

  const slides = getOnboardingSlides({
    welcome: {
      titleLine1: tSlides('welcome.titleLine1'),
      titleLine2: tSlides('welcome.titleLine2'),
      subtitle: tSlides('welcome.subtitle'),
      xpBadge: tSlides('welcome.xpBadge'),
    },
    discover: {
      titleLine1: tSlides('discover.titleLine1'),
      titleLine2: tSlides('discover.titleLine2'),
      subtitle: tSlides('discover.subtitle'),
      xpBadge: tSlides('discover.xpBadge'),
    },
    connect: {
      titleLine1: tSlides('connect.titleLine1'),
      titleLine2: tSlides('connect.titleLine2'),
      subtitle: tSlides('connect.subtitle'),
      xpBadge: tSlides('connect.xpBadge'),
    },
    spaces: {
      titleLine1: tSlides('spaces.titleLine1'),
      titleLine2: tSlides('spaces.titleLine2'),
      subtitle: tSlides('spaces.subtitle'),
      xpBadge: tSlides('spaces.xpBadge'),
    },
    start: {
      titleLine1: tSlides('start.titleLine1'),
      titleLine2: tSlides('start.titleLine2'),
      subtitle: tSlides('start.subtitle'),
      xpBadge: tSlides('start.xpBadge'),
    },
  });

  const total = slides.length;
  const [current, setCurrent] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const measureCarousel = useCallback(() => {
    if (carouselRef.current) {
      setContainerWidth(carouselRef.current.offsetWidth);
    }
  }, []);

  useLayoutEffect(() => {
    measureCarousel();
    window.addEventListener('resize', measureCarousel);
    return () => window.removeEventListener('resize', measureCarousel);
  }, [measureCarousel]);

  const isFirst = current === 0;
  const isLast = current === total - 1;

  const prev = () => { if (!isFirst) setCurrent((c) => c - 1); };
  const next = () => { if (!isLast) setCurrent((c) => c + 1); };
  const goTo = (i: number) => setCurrent(i);

  const handlePointerDown = (e: React.PointerEvent) => {
    touchStartX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (touchStartX.current === null) return;
    setDragOffset(e.clientX - touchStartX.current);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.clientX;
    touchStartX.current = null;
    setDragOffset(0);
    if (Math.abs(delta) > 40) {
      if (delta > 0) next();
      else prev();
    }
  };

  const handleStartApp = () => {
    const localeParam = params?.locale;
    const locale = typeof localeParam === 'string' ? localeParam : localeParam?.[0];
    if (!locale) return;
    router.push(`/${locale}/postal-code`);
  };

  const handleBack = () => {
    router.push('/');
  };

  const trackX =
    containerWidth !== null ? containerWidth / 2 - current * SLOT - SLOT / 2 : 0;

  return (
    <ContentShell className="items-center justify-center bg-gradient-to-b from-km0-beige-50 to-km0-beige-100">
      <BreakpointIndicator />

      <div className="flex w-full max-w-[390px] flex-col gap-3 min-h-0 flex-1 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <button
              type="button"
              onClick={handleBack}
              className="flex size-11 items-center justify-center rounded-xl border-[2px] border-dashed border-km0-yellow-500 text-km0-yellow-600 transition-all duration-200 hover:scale-105 hover:bg-km0-yellow-50"
              aria-label="Back"
            >
              <ChevronLeft size={22} strokeWidth={2.5} />
            </button>
          </div>
          <Logo context="onboarding" alt="KM0 LAB" />
          <div className="flex-1" />
        </div>

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="relative h-[340px] cursor-grab select-none overflow-visible active:cursor-grabbing"
          style={{ touchAction: 'none' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {/* Sliding track: oculto hasta tener medida real para evitar salto en Mobile-P */}
          <div
            className="absolute top-0 flex items-start"
            style={{
              transform: `translateX(${trackX + dragOffset}px)`,
              opacity: containerWidth !== null ? 1 : 0,
              transition:
                containerWidth === null
                  ? 'none'
                  : dragOffset !== 0
                    ? 'none'
                    : 'transform 420ms cubic-bezier(0.4, 0, 0.2, 1)',
              width: `${total * SLOT}px`,
            }}
          >
            {slides.map((s, i) => {
              const dist = Math.abs(i - current);
              const isActive = i === current;
              const scale = isActive ? 1 : dist === 1 ? 0.82 : 0.68;
              const opacity = isActive ? 1 : dist === 1 ? 0.65 : 0.35;
              const topOffset = isActive ? 0 : dist === 1 ? 28 : 48;

              return (
                <div
                  key={s.id}
                  onClick={() => !isActive && goTo(i)}
                  style={{
                    width: `${SLOT}px`,
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    transform: `scale(${scale}) translateY(${topOffset}px)`,
                    opacity,
                    transition: 'transform 420ms cubic-bezier(0.4,0,0.2,1), opacity 420ms ease',
                    transformOrigin: 'top center',
                    cursor: isActive ? 'default' : 'pointer',
                    zIndex: isActive ? 10 : 1,
                    position: 'relative',
                  }}
                >
                  {/* Stack layers — only on active card */}
                  {isActive && (
                    <>
                      <div
                        className="absolute rounded-[20px]"
                        style={{
                          bottom: -10, left: 22, right: 22, height: 28,
                          background: 'rgba(255,255,255,0.55)',
                          zIndex: -1,
                          boxShadow: '0 8px 24px -4px rgba(0,0,0,0.10)',
                        }}
                      />
                      <div
                        className="absolute rounded-[20px]"
                        style={{
                          bottom: -18, left: 38, right: 38, height: 28,
                          background: 'rgba(255,255,255,0.30)',
                          zIndex: -2,
                          boxShadow: '0 8px 24px -4px rgba(0,0,0,0.06)',
                        }}
                      />
                    </>
                  )}

                  <div className={`overflow-hidden rounded-3xl bg-white ${isActive ? 'shadow-2xl' : 'shadow-none'}`}>
                    {/* Emoji area */}
                    <div
                      className="relative mx-3 mt-3 flex h-[160px] items-center justify-center overflow-hidden rounded-2xl"
                      style={{ background: s.color }}
                    >
                      <span className="select-none text-[70px]">{s.emoji}</span>
                      {isActive && (
                        <span className="absolute right-3 top-3 rounded-xl bg-km0-coral-400 px-3 py-1 font-ui text-sm font-bold text-white shadow-md">
                          +{s.xp} XP
                        </span>
                      )}
                    </div>

                    {/* Text */}
                    <div className="px-4 pb-4 pt-3 text-center">
                      <h2 className="mb-1 font-brand text-lg font-bold leading-tight text-km0-blue-700">
                        {s.titleLine1} {s.titleLine2}
                      </h2>
                      <p className="font-body text-sm leading-relaxed text-neutral-500">
                        {s.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrow left */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            onPointerDown={(e) => e.stopPropagation()}
            disabled={isFirst}
            className={cn(
              'absolute left-[6px] top-[90px] z-20 flex size-10 items-center justify-center rounded-full border-[2px] bg-white shadow-lg transition-all duration-200',
              isFirst
                ? 'cursor-not-allowed border-km0-beige-200 text-km0-beige-300 opacity-40'
                : 'cursor-pointer border-km0-yellow-400 text-km0-blue-700 hover:scale-110 hover:bg-km0-yellow-50',
            )}
            aria-label="Previous"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Arrow right */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            onPointerDown={(e) => e.stopPropagation()}
            disabled={isLast}
            className={cn(
              'absolute right-[6px] top-[90px] z-20 flex size-10 items-center justify-center rounded-full border-[2px] bg-white shadow-lg transition-all duration-200',
              isLast
                ? 'cursor-not-allowed border-km0-beige-200 text-km0-beige-300 opacity-40'
                : 'cursor-pointer border-km0-yellow-400 text-km0-blue-700 hover:scale-110 hover:bg-km0-yellow-50',
            )}
            aria-label="Next"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                'flex size-12 items-center justify-center rounded-xl border-[2px] text-xl transition-all duration-200',
                i === current
                  ? 'scale-110 border-km0-yellow-500 shadow-md'
                  : 'border-km0-beige-200 bg-white opacity-70 hover:scale-105 hover:opacity-100',
              )}
              style={{ background: i === current ? s.color : 'white' }}
              aria-label={`Slide ${i + 1}`}
            >
              {s.emoji}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-1">
          <span className="w-12 font-ui text-lg font-bold text-km0-blue-700">
            {current + 1}/{total}
          </span>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === current
                    ? 'size-4 bg-km0-yellow-500'
                    : 'size-2.5 bg-km0-blue-200',
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              if (isLast) handleStartApp();
              else setCurrent(total - 1);
            }}
            className="rounded-2xl bg-km0-blue-700 px-5 py-2.5 font-ui text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] hover:bg-km0-blue-600 active:scale-95"
            aria-label={isLast ? t('start_aria') : t('skip_aria')}
          >
            {isLast ? t('start') : t('skip')}
          </button>
        </div>
      </div>
    </ContentShell>
  );
}
