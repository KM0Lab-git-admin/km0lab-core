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
    <div className="w-full px-5 pt-2 pb-5 inline-flex flex-col justify-start items-center gap-2">
      {/* Image */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-slide h-auto max-h-slide rounded bg-neutral-200 object-contain"
      />

      {/* Title */}
      <h2 className="w-full text-center font-brand text-neutral-900 text-3xl font-black">
        {title}
      </h2>

      {/* Description */}
      <p className="w-80 h-24 text-neutral-500 text-base font-normal leading-normal">
        {description}
      </p>

      {/* Navigation */}
      <div className="inline-flex justify-center items-center gap-2" aria-label="slider navigation">
        {/* Left chevron */}
        <button
          type="button"
          className="size-4 flex items-center justify-center"
          aria-label="Anterior"
        >
          <img 
            src="/assets/icons/Functional_Arrow.svg" 
            alt="Anterior"
            className="w-4 h-4 rotate-180"
          />
        </button>

        {/* Dots */}
        <div className="w-4 h-1 bg-neutral-400 rounded-sm" />
        <div className="w-4 h-1 bg-neutral-400 rounded-sm" />
        <div className="w-4 h-1 bg-neutral-900 rounded-sm" />
        <div className="w-4 h-1 bg-neutral-400 rounded-sm" />
        <div className="w-4 h-1 bg-neutral-400 rounded-sm" />

        {/* Right chevron */}
        <button
          type="button"
          className="size-4 flex items-center justify-center"
          aria-label="Siguiente"
        >
          <img 
            src="/assets/icons/Functional_Arrow.svg" 
            alt="Siguiente"
            className="w-4 h-4"
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


