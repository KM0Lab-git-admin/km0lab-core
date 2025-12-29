import { cva } from 'class-variance-authority';

export const carouselSlideVariants = cva(
  'w-full flex-shrink-0 h-full min-w-0 overflow-hidden',
  {
    variants: {
      /**
       * Layout variant:
       * - stack: Vertical layout (default). Cambia a horizontal SOLO en short-landscape (667x375, 1280x550).
       * - side: Siempre horizontal (imagen izquierda, texto derecha).
       */
      layout: {
        stack: [
          'flex flex-col items-center',
          'px-3 py-2',
          'mobile-p:px-4 mobile-p:py-4',
          'tablet:px-8 tablet:py-6',
          'desktop:px-12 desktop:py-10',
          'ultra-wide:px-16 ultra-wide:py-14',
          // En short-landscape cambia a horizontal
          'short-landscape:flex-row short-landscape:items-center short-landscape:px-4 short-landscape:py-2 short-landscape:gap-4',
        ].join(' '),
        side: [
          'flex flex-row items-center',
          'px-4 py-2 gap-4',
          'mobile-p:px-6 mobile-p:gap-6',
          'tablet:px-8 tablet:gap-8',
        ].join(' '),
      },
    },
    defaultVariants: {
      layout: 'stack',
    },
  },
);

