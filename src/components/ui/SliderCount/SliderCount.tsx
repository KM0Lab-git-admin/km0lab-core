'use client';
import React from 'react';

type SliderCountProps = {
  current?: number;
  total?: number;
  skipText?: string;
  onSkip?: () => void;
};

const SliderCount: React.FC<SliderCountProps> = ({
  current = 3,
  total = 5,
  skipText = 'SALTAR',
  onSkip,
}) => {
  return (
    <div className="w-full max-w-slide md-h:max-w-96 lg-h:max-w-slider-count-lg xl-h:max-w-slider-count-xl mx-auto flex justify-between items-center mt-2 sm:mt-4 xs-h:mt-1">
      <div className="font-body text-lg sm:text-xl lg-h:text-2xl xs-h:text-base font-normal text-black">
        {current}
        /
        {total}
      </div>
      <button
        type="button"
        onClick={onSkip}
        aria-label={skipText}
        className="font-body text-lg sm:text-xl lg-h:text-2xl xs-h:text-base font-normal text-neutral-900 hover:text-neutral-700 transition-colors sm:hover:scale-105 sm:transition-transform"
      >
        {skipText}
      </button>
    </div>
  );
};

export default SliderCount;
