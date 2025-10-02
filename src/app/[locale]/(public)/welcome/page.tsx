"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { MobileFrame } from "@/components/ui/MobileFrame";
import { AppHeader } from "@/components/ui/AppHeader";

export default function WelcomePage() {
  const t = useTranslations("Welcome");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga para mostrar el loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 segundos de loader

    return () => clearTimeout(timer);
  }, []);

  const slide = {
    title: t("slides.0.subtitle"),
    imageSrc: "/assets/images/welcome/slide1.png",
    description: t("slides.0.description"),
  };


  return (
    <div className="min-h-[100svh] flex items-center justify-center overflow-hidden px-3 xs:px-4 sm:px-6" data-testid="hero-container">
      <MobileFrame>
        {/* Header with Status Bar and Logo */}
        <AppHeader />
        
        {/* Hero Content */}
        <div className="w-full flex flex-col items-center gap-2 xs:gap-3 sm:gap-4 flex-1">
          {isLoading ? (
            // Skeleton loader completo mientras carga
            <div className="w-full flex flex-col items-center gap-2 xs:gap-3 sm:gap-4">
              {/* Image skeleton */}
              <div className="w-full aspect-[3/4] max-h-[50vh] rounded-[10px] border-[2px] xs:border-[3px] border-neutral-200 bg-neutral-100 animate-pulse" />

              {/* Title skeleton */}
              <div className="w-full h-8 xs:h-10 sm:h-12 bg-neutral-100 rounded animate-pulse" />

              {/* Description skeleton - 3 líneas */}
              <div className="w-full min-h-16 xs:min-h-18 sm:min-h-20 flex flex-col gap-2 justify-center">
                <div className="w-full h-4 bg-neutral-100 rounded animate-pulse" />
                <div className="w-full h-4 bg-neutral-100 rounded animate-pulse" />
                <div className="w-3/4 h-4 bg-neutral-100 rounded animate-pulse mx-auto" />
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-2 xs:gap-3 sm:gap-4">
              {/* Hero Image */}
              <img
                className="w-full aspect-[3/4] max-h-[50vh] rounded-[10px] shadow-[2px_2px_2px_2px_rgba(163,163,163,0.10)] border-[2px] xs:border-[3px] border-neutral-200 object-contain"
                src={slide.imageSrc}
                alt={slide.title}
              />

              {/* Title */}
              <h1 
                className="w-full text-center font-brand text-neutral-900 leading-tight sm:leading-snug text-balance break-words overflow-wrap-anywhere hyphens-auto px-1"
                style={{ fontSize: 'clamp(14px, 5vw, 2.5rem)' }}
                data-testid="hero-title"
              >
                {slide.title}
              </h1>

              {/* Description */}
              <p 
                className="w-full text-center text-neutral-500 font-normal leading-snug sm:leading-relaxed text-balance break-words overflow-wrap-anywhere hyphens-auto px-2"
                style={{ fontSize: 'clamp(14px, 3vw, 1.125rem)' }}
                data-testid="hero-description"
              >
                {slide.description}
              </p>
            </div>
          )}
        </div>

      </MobileFrame>
    </div>
  );
}
