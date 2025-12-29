import { cva } from 'class-variance-authority';

export const mobileFrameVariants = cva(
  'w-full max-w-mobile-frame min-h-0 bg-gradient-mobile-frame rounded-mobile-frame sm:rounded-mobile-frame-lg flex flex-col justify-start items-center overflow-hidden',
  {
    variants: {
      gap: {
        sm: 'gap-1.5 sm:gap-2.5',
        md: 'gap-2 sm:gap-3',
        lg: 'gap-2.5 sm:gap-3.5',
      },
      padding: {
        sm: 'p-2.5 sm:p-3.5',
        md: 'p-3 sm:p-4',
        lg: 'p-3.5 sm:p-4.5',
      },
    },
    defaultVariants: {
      gap: 'sm',
      padding: 'sm',
    },
  },
);
