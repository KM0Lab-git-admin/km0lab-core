import { cva } from 'class-variance-authority';

export const sliderArrowButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-km0-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'p-1.5 mobile-p:p-2',
        md: 'p-2 mobile-p:p-3',
      },
      variant: {
        ghost: 'text-neutral-400 hover:text-km0-blue-700',
        solid: 'bg-neutral-900 text-white hover:bg-neutral-800',
      },
      disabled: {
        true: 'opacity-30',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'ghost',
      disabled: false,
    },
  },
);

export const sliderArrowIconVariants = cva(
  'stroke-current',
  {
    variants: {
      size: {
        sm: 'h-4 w-4 mobile-p:h-5 mobile-p:w-5',
        md: 'h-6 w-6 mobile-p:h-8 mobile-p:w-8',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);
