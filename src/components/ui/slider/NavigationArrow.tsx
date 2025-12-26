'use client';

import { cn } from '@/components/ui/primitives/utils';

type NavigationArrowProps = {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
};

const NavigationArrow = ({ direction, onClick, disabled, ariaLabel }: NavigationArrowProps) => {
  const isPrev = direction === 'prev';
  const path = isPrev ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={cn(
        'rounded-full text-neutral-400 hover:text-km0-blue-700 transition-colors',
        'p-2',
        'mobile-p:p-2.5',
        disabled && 'opacity-30 cursor-not-allowed hover:text-neutral-400',
      )}
    >
      <svg
        className={cn('w-6 h-6', 'mobile-p:w-7 mobile-p:h-7')}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={path} />
      </svg>
    </button>
  );
};

export { NavigationArrow };

