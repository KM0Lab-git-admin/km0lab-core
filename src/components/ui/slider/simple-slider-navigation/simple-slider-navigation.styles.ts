import { cva } from 'class-variance-authority';

export const simpleSliderNavigationVariants = cva(
  'flex-1 min-w-0 flex items-center justify-center',
  {
    variants: {
      layout: {
        default: 'gap-2 mobile-p:gap-3 laptop-short:gap-2',
        compact: 'gap-0.5 mobile-p:gap-1 laptop-short:gap-0.5',
      },
    },
    defaultVariants: {
      layout: 'default',
    },
  },
);
