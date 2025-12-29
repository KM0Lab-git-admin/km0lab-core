import { cva } from 'class-variance-authority';

export const sliderCountVariants = cva(
  'flex items-center justify-between',
  {
    variants: {
      layout: {
        default: 'w-full gap-3',
        compact: 'w-full gap-2',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  },
);

export const sliderCountValueVariants = cva(
  'font-body font-normal text-neutral-900',
  {
    variants: {
      size: {
        sm: 'text-xs mobile-p:text-sm',
        md: 'text-sm mobile-p:text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const sliderCountActionVariants = cva(
  'font-body font-semibold text-neutral-900 transition-colors hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-km0-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'text-xs mobile-p:text-sm',
        md: 'text-sm mobile-p:text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);
