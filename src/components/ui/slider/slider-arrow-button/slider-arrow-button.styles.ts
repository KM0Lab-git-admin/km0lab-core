import { cva } from 'class-variance-authority';

export const sliderArrowButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-km0-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: [
          'p-2 min-h-[44px] min-w-[44px]',
          'mobile-p:p-2.5',
          'tablet:p-3 tablet:min-h-[48px] tablet:min-w-[48px]',
          'desktop:p-3.5 desktop:min-h-[52px] desktop:min-w-[52px]',
        ].join(' '),
        md: [
          'p-2.5 min-h-[44px] min-w-[44px]',
          'mobile-p:p-3 mobile-p:min-h-[48px] mobile-p:min-w-[48px]',
          'tablet:p-3.5 tablet:min-h-[52px] tablet:min-w-[52px]',
          'desktop:p-4 desktop:min-h-[56px] desktop:min-w-[56px]',
          'desktop:hover:bg-km0-blue-100',
        ].join(' '),
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
        sm: [
          'h-5 w-5',
          'mobile-p:h-6 mobile-p:w-6',
          'tablet:h-7 tablet:w-7',
          'desktop:h-8 desktop:w-8',
        ].join(' '),
        md: [
          'h-6 w-6',
          'mobile-p:h-8 mobile-p:w-8',
          'tablet:h-9 tablet:w-9',
          'desktop:h-10 desktop:w-10',
        ].join(' '),
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);
