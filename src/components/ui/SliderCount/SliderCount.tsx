"use client";
import React from "react";

type SliderCountProps = {
  current?: number;
  total?: number;
  skipText?: string;
  onSkip?: () => void;
};

const SliderCount: React.FC<SliderCountProps> = ({
  current = 3,
  total = 5,
  skipText = "SALTAR",
  onSkip
}) => {
  return (
    <div className="w-80 sm:w-full sm:max-w-lg sm:mx-auto sm:mt-8 md-h:w-96 lg-h:w-[28rem] xl-h:w-[32rem] max-w-slide sm:max-w-lg md-h:max-w-96 lg-h:max-w-[28rem] xl-h:max-w-[32rem] mx-auto flex justify-between items-center mt-2">
      <div className="font-body text-lg sm:text-xl md-h:text-xl lg-h:text-2xl font-normal text-black">
        {current}/{total}
      </div>
      <button 
        onClick={onSkip}
        className="font-body text-lg sm:text-xl sm:hover:scale-105 sm:transition-transform md-h:text-xl lg-h:text-2xl font-normal text-neutral-900 hover:text-neutral-700 transition-colors"
      >
        {skipText}
      </button>
    </div>
  );
};

export default SliderCount;
