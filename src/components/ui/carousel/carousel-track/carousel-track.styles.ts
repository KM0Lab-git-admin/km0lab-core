import { cva } from 'class-variance-authority';

export const carouselTrackVariants = cva('flex h-full w-full', {
  variants: {
    animate: {
      true: 'transition-transform duration-300 ease-out',
      false: '',
    },
  },
  defaultVariants: {
    animate: true,
  },
});

