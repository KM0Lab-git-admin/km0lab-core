import { cva } from 'class-variance-authority';

export const carouselViewportVariants = cva(
  'overflow-hidden cursor-grab active:cursor-grabbing select-none',
  {
    variants: {
      fullHeight: {
        true: 'h-full',
        false: '',
      },
    },
    defaultVariants: {
      fullHeight: true,
    },
  },
);

