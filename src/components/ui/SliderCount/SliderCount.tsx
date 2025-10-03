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
    <div className="w-80 max-w-slide mx-auto flex justify-between items-center">
      <div className="font-body text-lg font-normal text-black">
        {current}/{total}
      </div>
      <button 
        onClick={onSkip}
        className="font-body text-lg font-normal text-neutral-900 hover:text-neutral-700 transition-colors"
      >
        {skipText}
      </button>
    </div>
  );
};

export default SliderCount;
