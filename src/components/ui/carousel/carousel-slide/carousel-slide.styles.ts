import { cva } from 'class-variance-authority';

export const carouselSlideVariants = cva(
  'w-full flex-shrink-0 h-full min-w-0 overflow-hidden',
  {
    variants: {
      /**
       * Layout variant:
       * - stack: Vertical layout (image top, text bottom) - default for most screens
       * - side: Horizontal layout (image left, text right) - for laptop-short
       */
      layout: {
        stack: [
          'flex flex-col',
          'px-3 pb-0.5',
          'mobile-p:flex-col mobile-p:px-4 mobile-p:pb-2 mobile-p:items-center mobile-p:pt-0',
          'tablet:flex-col tablet:px-8 tablet:pt-6 tablet:items-center',
          'desktop:px-12 desktop:pt-10',
          'ultra-wide:px-16 ultra-wide:pt-14',
        ].join(' '),
        side: [
          'flex flex-col',
          'px-3 pb-0.5',
          'mobile-l:flex-row mobile-l:px-4 mobile-l:pb-0 mobile-l:items-start mobile-l:gap-4 mobile-l:pt-6',
          'mobile-p:flex-col mobile-p:px-4 mobile-p:pb-2 mobile-p:items-center mobile-p:pt-0',
          'tablet:flex-col tablet:px-8 tablet:pt-6 tablet:items-center',
          'laptop-short:flex-row laptop-short:px-10 laptop-short:pt-6 laptop-short:items-start laptop-short:gap-8',
          'desktop:px-12 desktop:pt-10 desktop:gap-12',
          'ultra-wide:px-16 ultra-wide:pt-14 ultra-wide:gap-16',
        ].join(' '),
      },
    },
    defaultVariants: {
      layout: 'side',
    },
  },
);

