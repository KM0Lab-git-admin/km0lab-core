"use client";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MobileFrame } from "@/components/ui/MobileFrame";
import { StatusBar } from "@/components/ui/StatusBar";
import { XPBadge } from "@/components/ui/XPBadge";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { AppHeader } from "@/components/ui/AppHeader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickSlider = dynamic(() => import("react-slick"), { 
  ssr: false,
});

export default function WelcomePage() {
  const t = useTranslations("Welcome");
  const [current, setCurrent] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const sliderRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const slides = [
    {
      title: t("slides.0.subtitle"),
      imageSrc: "/assets/images/welcome/slide1.png",
      xp: 10,
      description: t("slides.0.description"),
    },
    {
      title: t("slides.1.subtitle"),
      imageSrc: "/assets/images/better-stack-dark.png",
      xp: 15,
      description: t("slides.1.description"),
    },
    {
      title: t("slides.2.subtitle"),
      imageSrc: "/assets/images/checkly-logo-dark.png",
      xp: 20,
      description: t("slides.2.description"),
    },
    {
      title: t("slides.3.subtitle"),
      imageSrc: "/assets/images/crowdin-dark.png",
      xp: 5,
      description: t("slides.3.description"),
    },
    {
      title: t("slides.4.subtitle"),
      imageSrc: "/assets/images/sentry-dark.png",
      xp: 30,
      description: t("slides.4.description"),
    },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    afterChange: (index: number) => setCurrent(index),
    arrows: false,
    adaptiveHeight: false,
    accessibility: true,
  };

  const handlePrevious = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div className="flex items-center justify-center py-8">
      <MobileFrame>
        {/* Header with Status Bar and Logo */}
        <StatusBar />
        <AppHeader />

        {/* Slider Content */}
        <div className="w-full flex flex-col items-center gap-3.5">
          {!isMounted ? (
            // Placeholder mientras carga (evita el div hidden)
            <div className="w-80 h-96 flex items-center justify-center">
              <div className="w-80 h-96 rounded-[10px] border-[3px] border-neutral-200 bg-neutral-50 animate-pulse" />
            </div>
          ) : (
            // @ts-expect-error: dynamic import de react-slick no tipa ref correctamente
            <SlickSlider ref={sliderRef} {...settings}>
              {slides.map((slide, idx) => (
                <div key={idx} className="inline-flex flex-col items-center gap-3.5">
                  {/* Slide Image */}
                  <img
                    className="w-80 h-96 rounded-[10px] shadow-[2px_2px_2px_2px_rgba(163,163,163,0.10)] border-[3px] border-neutral-200 mx-auto"
                    src={slide.imageSrc}
                    alt={slide.title}
                  />

                  {/* XP Badge */}
                  <div className="flex justify-center w-full">
                    <XPBadge points={slide.xp} />
                  </div>

                  {/* Title */}
                  <div className="justify-center text-neutral-900 text-3xl text-center w-full font-brand">
                    {slide.title}
                  </div>

                  {/* Description */}
                  <div className="w-80 h-24 justify-start text-neutral-500 text-base font-normal leading-normal text-center mx-auto">
                    {slide.description}
                  </div>
                </div>
              ))}
            </SlickSlider>
          )}
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator
          total={slides.length}
          current={current}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        {/* Footer - Counter and Skip */}
        <div className="w-80 h-12 py-3.5 inline-flex justify-between items-center">
          <div className="justify-start text-black text-2xl font-medium">
            {current + 1}/{slides.length}
          </div>
          <Link
            href="/start"
            className="justify-end text-neutral-900 text-base font-medium hover:text-km0-blue-700 transition-colors"
            aria-label={t("skip")}
          >
            {t("skip").toUpperCase()}
          </Link>
        </div>
      </MobileFrame>
    </div>
  );
}
