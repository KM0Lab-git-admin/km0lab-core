import { cva } from 'class-variance-authority';

export const sliderDotsContainerVariants = cva(
  'flex items-center',
  {
    variants: {
      size: {
        sm: 'gap-0.5',
        md: 'gap-1 mobile-p:gap-1.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const sliderDotVariants = cva(
  'rounded-full transition-all duration-200',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        md: 'h-2 mobile-p:h-2.5',
      },
      tone: {
        default: '',
        brand: '',
      },
      current: {
        true: '',
        false: '',
      },
      interactive: {
        true: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-km0-blue-500 focus-visible:ring-offset-2',
        false: '',
      },
    },
    compoundVariants: [
      { size: 'sm', current: true, className: 'w-4' },
      { size: 'sm', current: false, className: 'w-1.5' },
      { size: 'md', current: true, className: 'w-5 mobile-p:w-6' },
      { size: 'md', current: false, className: 'w-2 mobile-p:w-2.5' },
      { tone: 'default', current: true, className: 'bg-neutral-900' },
      { tone: 'default', current: false, className: 'bg-neutral-300' },
      { tone: 'brand', current: true, className: 'bg-km0-blue-700' },
      { tone: 'brand', current: false, className: 'bg-km0-blue-200' },
      { interactive: true, current: true, className: 'scale-105' },
      { interactive: true, tone: 'default', current: false, className: 'hover:bg-neutral-400' },
      { interactive: true, tone: 'brand', current: false, className: 'hover:bg-km0-blue-300' },
    ],
    defaultVariants: {
      size: 'md',
      tone: 'default',
      current: false,
      interactive: false,
    },
  },
);
