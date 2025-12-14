'use client';
import SliderCount from '@/components/ui/SliderCount/SliderCount';
import React from 'react';

type SliderProps = {
  title?: string;
  description?: string;
  imageAlt?: string;
  imageSrc?: string;
  current?: number;
  total?: number;
  skipText?: string;
  onSkip?: () => void;
};

const Slider: React.FC<SliderProps> = ({
  title = 'Títol Intro 1',
  description =
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa',
  imageAlt = 'Slide image',
  imageSrc = '/assets/images/welcome/slide1.PNG',
  current = 3,
  total = 5,
  skipText = 'SALTAR',
  onSkip,
}) => {
  return (
    <div className="w-full min-h-screen px-4 py-6 sm:px-8 sm:py-12 flex flex-col justify-center items-center gap-4 sm:gap-6 md-h:gap-8 bg-gradient-to-br from-[#f0f4fd] to-[#fff9f0]">
      {/* Image */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full max-w-sm h-auto rounded-lg bg-neutral-200 object-cover shadow-md"
      />

      {/* Title */}
      <h2 className="w-full max-w-sm text-center font-brand text-km0-yellow-500 text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
        {title}
      </h2>

      {/* Description */}
      <p className="w-full max-w-sm text-center text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
        {description}
      </p>

      {/* Navigation */}
      <div className="flex justify-center items-center gap-3 sm:gap-4" aria-label="slider navigation">
        {/* Left chevron */}
        <button
          type="button"
          className="p-2 hover:bg-neutral-200 rounded-full transition-colors"
          aria-label="Anterior"
        >
          <img
            src="/assets/icons/Functional_Arrow.svg"
            alt="Anterior"
            className="w-5 h-5 sm:w-6 sm:h-6 rotate-180"
          />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          <div className="w-3 h-1 sm:w-4 bg-neutral-400 rounded-sm" />
          <div className="w-3 h-1 sm:w-4 bg-neutral-400 rounded-sm" />
          <div className="w-3 h-1 sm:w-4 bg-neutral-900 rounded-sm" />
          <div className="w-3 h-1 sm:w-4 bg-neutral-400 rounded-sm" />
          <div className="w-3 h-1 sm:w-4 bg-neutral-400 rounded-sm" />
        </div>

        {/* Right chevron */}
        <button
          type="button"
          className="p-2 hover:bg-neutral-200 rounded-full transition-colors"
          aria-label="Siguiente"
        >
          <img
            src="/assets/icons/Functional_Arrow.svg"
            alt="Siguiente"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </button>
      </div>

      {/* Slider Count */}
      <SliderCount
        current={current}
        total={total}
        skipText={skipText}
        onSkip={onSkip}
      />
    </div>
  );
};

export default Slider;
