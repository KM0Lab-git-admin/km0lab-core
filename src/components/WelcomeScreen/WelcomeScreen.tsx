'use client';

import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- Data for the Intro Slides ---
const introSlides = [
  {
    id: 1,
    title: 'Bienvenido al viaje',
    text: 'Descubre nuevas experiencias y aprende mientras juegas. Cada paso te acerca a tus objetivos.',
    imageSrc: '/assets/figma/282-4480.webp',
    xp: '10 XP',
  },
  {
    id: 2,
    title: 'Desafíos emocionantes',
    text: 'Completa misiones diarias y gana recompensas. Compite con amigos y sube en el ranking.',
    imageSrc: '/assets/figma/282-4495.webp',
    xp: '10 XP',
  },
  {
    id: 3,
    title: 'Personaliza tu perfil',
    text: 'Elige tu avatar y personaliza tu experiencia. Muestra tu estilo único a la comunidad.',
    imageSrc: '/assets/figma/282-4509.webp',
    xp: '10 XP',
  },
  {
    id: 4,
    title: 'Conecta con otros',
    text: 'Únete a grupos de interés y colabora. Comparte logros y celebra juntos.',
    imageSrc: '/assets/figma/282-4522.webp',
    xp: '10 XP',
  },
  {
    id: 5,
    title: 'Comienza tu aventura',
    text: 'Estás listo para empezar. Haz clic en continuar y desbloquea todo el potencial.',
    imageSrc: '/assets/figma/282-4495.webp',
    xp: '10 XP',
  },
];

// --- Slide Component (Refactored from Figma Code) ---
interface SlideProps {
  slide: typeof introSlides[0];
  totalSlides: number;
  currentSlide: number;
  onSkip: () => void;
  onStart: () => void;
}

const IntroSlide: React.FC<SlideProps> = ({ slide, totalSlides, currentSlide, onSkip, onStart }) => {
  const isLastSlide = currentSlide === totalSlides - 1;

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gradient-to-br from-km0-blue-50 to-km0-beige-50">
      <div className="w-full max-w-[360px] h-auto bg-white rounded-[30px] outline outline-1 outline-offset-[-1px] outline-black inline-flex flex-col justify-between items-center overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="w-full h-auto pt-6 pb-6 px-6 inline-flex justify-center items-center border-b border-neutral-200">
          <div className="Logo inline-flex flex-col justify-start items-start">
            <img
              className="w-[147px] h-[34px] object-contain"
              src="/assets/figma/282-4477.webp"
              alt="Logo"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-start items-center gap-2 px-6 py-6 w-full">
          {/* Image Container */}
          <div className="w-full max-w-[320px] h-auto relative">
            <img
              className="w-full h-auto rounded-[10px] shadow-[2px_2px_2px_2px_rgba(163,163,163,0.10)] object-cover"
              src={slide.imageSrc}
              alt={slide.title}
            />
            {/* XP Button */}
            <div className="absolute bottom-4 left-4 inline-flex justify-start items-start">
              <div className="w-[90px] h-[35px] bg-km0-coral-400 rounded-lg outline outline-2 outline-offset-[-2px] outline-neutral-400 flex justify-center items-center overflow-hidden">
                <div className="px-2.5 rounded-lg flex justify-center items-center gap-[3px] overflow-hidden">
                  <div className="w-6 h-6 relative overflow-hidden">
                    <img
                      className="w-4 h-4"
                      src="/assets/figma/I282-4481;16-97;3-1020.svg"
                      alt="XP Icon"
                    />
                  </div>
                  <div className="text-center justify-center text-km0-success-500 text-base font-bold capitalize">
                    {slide.xp}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-km0-coral-400 text-[28px] md:text-[32px] font-brand text-center font-bold leading-tight mt-4 mb-2">
            {slide.title}
          </h2>

          {/* Description Text */}
          <p className="w-full text-neutral-600 text-sm md:text-base font-body text-center leading-relaxed mb-2">
            {slide.text}
          </p>
        </div>

        {/* Footer - Page Counter and Skip/Start Button */}
        <div className="w-full h-auto py-4 px-6 inline-flex justify-between items-center border-t border-neutral-200">
          {/* Numerator */}
          <div className="text-neutral-900 text-[24px] md:text-[26px] font-ui font-medium">
            {currentSlide + 1}/{totalSlides}
          </div>
          {/* Skip or Start Button */}
          {isLastSlide ? (
            <button
              onClick={onStart}
              className="px-4 py-2 bg-km0-blue-700 rounded flex justify-center items-center gap-2 hover:bg-km0-blue-800 transition-colors"
            >
              <span className="text-white text-base font-normal font-body">
                Comença
              </span>
              {/* Arrow Right Icon */}
              <div className="w-5 h-5 relative overflow-hidden flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          ) : (
            <button
              onClick={onSkip}
              className="text-neutral-900 text-base font-body font-medium hover:text-km0-blue-700 transition-colors"
            >
              SALTAR
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function WelcomeScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (current: number) => setCurrentSlide(current),
    customPaging: (i: number) => (
      <div
        className={`w-3 h-1 rounded-sm mx-1 transition-colors ${
          i === currentSlide ? 'bg-neutral-900' : 'bg-neutral-400'
        }`}
      />
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="flex justify-center items-center gap-2 mt-6">
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-neutral-900" />
        </button>
        <div className="flex gap-2">{dots}</div>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-neutral-900" />
        </button>
      </div>
    ),
  };

  const handleSkip = () => {
    // Logic to skip the intro
    console.log('Skipping intro...');
    // TODO: Navigate to home page
  };

  const handleStart = () => {
    // Logic to start the app
    console.log('Starting app...');
    // TODO: Navigate to home page
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-km0-blue-50 to-km0-beige-50 flex flex-col justify-center items-center py-8">
      <div className="w-full max-w-[360px] px-4">
        <Slider ref={sliderRef} {...settings}>
          {introSlides.map((slide, index) => (
            <div key={slide.id}>
              <IntroSlide
                slide={slide}
                totalSlides={introSlides.length}
                currentSlide={index}
                onSkip={handleSkip}
                onStart={handleStart}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
