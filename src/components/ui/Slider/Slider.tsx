"use client";
import React from "react";
import SliderCount from "@/components/ui/SliderCount/SliderCount";

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
  title = "Títol Intro 1",
  description =
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa",
  imageAlt = "Slide image",
  imageSrc = "/assets/images/welcome/slide1.png",
  current = 3,
  total = 5,
  skipText = "SALTAR",
  onSkip
}) => {
  return (
    <div className="w-full px-4 pt-2 pb-3 md-h:px-8 md-h:pt-4 md-h:pb-8 lg-h:px-12 lg-h:pt-6 lg-h:pb-10 md-h:flex md-h:flex-col md-h:justify-center md-h:items-center inline-flex flex-col justify-start items-center gap-1.5 md-h:gap-4 lg-h:gap-6">
      {/* Image */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-slide h-auto max-h-slide md-h:w-96 md-h:max-w-none lg-h:w-[28rem] xl-h:w-[32rem] rounded bg-neutral-200 object-contain"
      />

      {/* Title */}
      <h2 className="w-full text-center font-brand text-neutral-900 text-3xl md-h:text-4xl lg-h:text-5xl xl-h:text-6xl font-black">
        {title}
      </h2>

      {/* Description */}
      <p className="w-80 md-h:w-96 lg-h:w-[28rem] xl-h:w-[32rem] h-24 md-h:h-28 lg-h:h-32 text-neutral-500 text-base md-h:text-lg lg-h:text-xl font-normal leading-normal">
        {description}
      </p>

      {/* Navigation */}
      <div className="inline-flex justify-center items-center gap-2 md-h:gap-3 lg-h:gap-4" aria-label="slider navigation">
        {/* Left chevron */}
        <button
          type="button"
          className="size-4 md-h:size-6 lg-h:size-8 flex items-center justify-center"
          aria-label="Anterior"
        >
          <img 
            src="/assets/icons/Functional_Arrow.svg" 
            alt="Anterior"
            className="w-4 h-4 md-h:w-6 md-h:h-6 lg-h:w-8 lg-h:h-8 rotate-180"
          />
        </button>

        {/* Dots */}
        <div className="w-4 h-1 md-h:w-6 md-h:h-1.5 lg-h:w-8 lg-h:h-2 bg-neutral-400 rounded-sm" />
        <div className="w-4 h-1 md-h:w-6 md-h:h-1.5 lg-h:w-8 lg-h:h-2 bg-neutral-400 rounded-sm" />
        <div className="w-4 h-1 md-h:w-6 md-h:h-1.5 lg-h:w-8 lg-h:h-2 bg-neutral-900 rounded-sm" />
        <div className="w-4 h-1 md-h:w-6 md-h:h-1.5 lg-h:w-8 lg-h:h-2 bg-neutral-400 rounded-sm" />
        <div className="w-4 h-1 md-h:w-6 md-h:h-1.5 lg-h:w-8 lg-h:h-2 bg-neutral-400 rounded-sm" />

        {/* Right chevron */}
        <button
          type="button"
          className="size-4 md-h:size-6 lg-h:size-8 flex items-center justify-center"
          aria-label="Siguiente"
        >
          <img 
            src="/assets/icons/Functional_Arrow.svg" 
            alt="Siguiente"
            className="w-4 h-4 md-h:w-6 md-h:h-6 lg-h:w-8 lg-h:h-8"
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


