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
    <div className="flex items-center justify-center">
      <MobileFrame>
        {/* Header with Status Bar and Logo */}
        <AppHeader />
        {/* Content */}
        <div className="w-full flex flex-col items-center gap-3.5">
          {isLoading ? (
            // Skeleton loader completo mientras carga
            <div className="inline-flex flex-col items-center gap-3.5">
              {/* Image skeleton */}
              <div className="w-80 h-96 rounded-[10px] border-[3px] border-neutral-200 bg-neutral-100 animate-pulse mx-auto" />


              {/* Title skeleton */}
              <div className="w-64 h-9 bg-neutral-100 rounded animate-pulse" />

              {/* Description skeleton - 3 líneas */}
              <div className="w-80 h-24 flex flex-col gap-2 justify-center mx-auto">
                <div className="w-full h-4 bg-neutral-100 rounded animate-pulse" />
                <div className="w-full h-4 bg-neutral-100 rounded animate-pulse" />
                <div className="w-3/4 h-4 bg-neutral-100 rounded animate-pulse mx-auto" />
              </div>
            </div>
          ) : (
            <div className="inline-flex flex-col items-center gap-3.5">
              {/* Slide Image */}
              <img
                className="w-80 h-96 rounded-[10px] shadow-[2px_2px_2px_2px_rgba(163,163,163,0.10)] border-[3px] border-neutral-200 mx-auto"
                src={slide.imageSrc}
                alt={slide.title}
              />


              {/* Title */}
              <div className="justify-center text-neutral-900 text-3xl text-center w-full font-brand">
                {slide.title}
              </div>

              {/* Description */}
              <div className="w-80 h-24 justify-start text-neutral-500 text-base font-normal leading-normal text-center mx-auto">
                {slide.description}
              </div>
            </div>
          )}
        </div>

      </MobileFrame>
    </div>
  );
}
