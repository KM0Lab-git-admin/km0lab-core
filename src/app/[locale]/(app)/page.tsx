"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Slide from "@/components/Slide";
import ProgressDots from "@/components/ui/ProgressDots";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlickSlider = dynamic(() => import("react-slick"), { ssr: false });

const slides = [
  {
    title: "COMPRA A <i>300 M</i> DE CASA SENSE MOURE'T DE CASA",
    subtitle: "Títol Intro 1",
    imageSrc: "/assets/images/about-hero.jpg",
    xp: 10,
    logoSrc: "/assets/images/arcjet-dark.svg",
    description:
      "Los inodoros de tanque bajo Roca se instalan de pie en el suelo y son fklasdjflasdjflajsdlfladsfladsfladsfljsadlfjladsflasdf",
  },
  {
    title: "Descubre productos locales exclusivos",
    subtitle: "Títol Intro 2",
    imageSrc: "/assets/images/better-stack-dark.png",
    xp: 15,
    logoSrc: "/assets/images/sevalla-dark.png",
    description:
      "Explora una selección única de productos cerca de ti y apoya a los comercios locales.",
  },
  {
    title: "Gana recompensas por cada compra",
    subtitle: "Títol Intro 3",
    imageSrc: "/assets/images/checkly-logo-dark.png",
    xp: 20,
    logoSrc: "/assets/images/clerk-logo-dark.png",
    description:
      "Acumula puntos y canjea recompensas exclusivas mientras compras en tu barrio.",
  },
  {
    title: "Comparte tu experiencia con la comunidad",
    subtitle: "Títol Intro 4",
    imageSrc: "/assets/images/crowdin-dark.png",
    xp: 5,
    logoSrc: "/assets/images/codecov-dark.svg",
    description:
      "Deja reseñas y ayuda a otros usuarios a descubrir los mejores productos locales.",
  },
  {
    title: "¡Empieza ahora y forma parte del cambio!",
    subtitle: "Títol Intro 5",
    imageSrc: "/assets/images/sentry-dark.png",
    xp: 30,
    logoSrc: "/assets/images/nextjs-boilerplate-saas.png",
    description:
      "Únete a KM0 LAB y transforma la forma en que compras y apoyas a tu comunidad.",
  },
];

export default function WelcomePage() {
  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    afterChange: (index: number) => setCurrent(index),
    arrows: false,
    adaptiveHeight: true,
    accessibility: true,
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center w-full max-w-md h-screen mx-auto bg-transparent px-4 pt-2 pb-[10px] sm:py-4 gap-y-4 sm:gap-y-6 md:gap-y-10 overflow-hidden">
      {/* Logo */}
      <div className="flex justify-center items-center w-full px-2">
        <Image
          src="/assets/images/logo1.svg"
          alt="KM0 LAB Logo"
          width={240}
          height={96}
          className="mx-auto w-full max-w-[200px] sm:max-w-[240px] h-auto"
          priority
          sizes="(max-width: 640px) 90vw, 240px"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full overflow-hidden">
        {/* Carrusel */}
        <div className="w-full max-w-md mx-auto flex-grow">
          {/* @ts-expect-error: dynamic import de react-slick no tipa ref correctamente */}
          <SlickSlider ref={sliderRef} {...settings}>
            {slides.map((slide, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center">
                <Slide
                  title={slide.title}
                  subtitle={slide.subtitle}
                  imageSrc={slide.imageSrc}
                  xp={slide.xp}
                  logoSrc={slide.logoSrc}
                />
                <div className="mt-2 text-base text-neutral-700 px-2 text-center">
                  {slide.description}
                </div>
              </div>
            ))}
          </SlickSlider>
        </div>
        <ProgressDots total={slides.length} current={current} />
        <div className="text-2xl font-brand font-bold tracking-wider">
          {current + 1}/{slides.length}
        </div>
      </div>
      {/* Footer: Botón Saltar y navegación */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 px-2">
        <Link
          href="/start"
          className="font-brand text-lg md:text-xl font-bold tracking-wider text-neutral-900 hover:text-km0-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-km0-blue-700"
          tabIndex={0}
          aria-label="Saltar tutorial"
        >
          SALTAR
        </Link>
        {/* Navegación manual opcional */}
        <div className="flex gap-2">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="rounded-full bg-km0-blue-200 text-km0-blue-700 px-3 py-1 font-bold disabled:opacity-40"
            disabled={current === 0}
            aria-label="Anterior"
          >
            &#60;
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="rounded-full bg-km0-blue-200 text-km0-blue-700 px-3 py-1 font-bold disabled:opacity-40"
            disabled={current === slides.length - 1}
            aria-label="Siguiente"
          >
            &#62;
          </button>
        </div>
      </div>
    </div>
  );
} 