import { cva } from 'class-variance-authority';

export const heroSlideContentVariants = cva(
  'flex-1 flex flex-col min-w-0',
  {
    variants: {
      /**
       * Layout variant:
       * - stack: Vertical, centered content
       * - side: Horizontal, left-aligned content in laptop-short
       */
      layout: {
        stack: [
          'justify-start pt-2',
          'mobile-p:pt-4 mobile-p:justify-start mobile-p:w-full mobile-p:pr-0',
          'tablet:w-full tablet:pt-6 tablet:justify-start',
          'desktop:pt-4',
          'ultra-wide:pt-6',
        ].join(' '),
        side: [
          'justify-start pt-2',
          'mobile-l:pt-2 mobile-l:justify-start mobile-l:w-3/5 mobile-l:pr-0',
          'mobile-p:pt-4 mobile-p:justify-start mobile-p:w-full mobile-p:pr-0',
          'tablet:w-full tablet:pt-6 tablet:justify-start',
          'laptop-short:pt-2 laptop-short:justify-start laptop-short:w-[55%]',
          'desktop:w-3/5 desktop:pt-4',
          'ultra-wide:w-[65%] ultra-wide:pt-6',
        ].join(' '),
      },
    },
    defaultVariants: {
      layout: 'side',
    },
  },
);

export const heroSlideTextContainerVariants = cva('', {
  variants: {
    layout: {
      stack: 'text-center',
      side: [
        'text-center',
        'mobile-l:text-center',
        'mobile-p:text-center',
        'tablet:text-center',
        'laptop-short:text-left',
      ].join(' '),
    },
  },
  defaultVariants: {
    layout: 'side',
  },
});

export const heroSlideTitleVariants = cva(
  'font-brand font-black text-neutral-900 uppercase tracking-tight leading-tight',
  {
    variants: {
      size: {
        default: [
          'text-lg',
          'mobile-l:text-lg',
          'mobile-p:text-xl',
          'tablet:text-2xl',
          'laptop-short:text-2xl',
          'desktop:text-4xl',
          'ultra-wide:text-6xl',
        ].join(' '),
        compact: [
          'text-base',
          'mobile-p:text-lg',
          'tablet:text-xl',
          'laptop-short:text-xl',
          'desktop:text-2xl',
        ].join(' '),
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

export const heroSlideSubtitleVariants = cva(
  'font-ui text-neutral-500 leading-relaxed',
  {
    variants: {
      size: {
        default: [
          'text-xs mt-0.5 pb-4',
          'mobile-l:text-xs mobile-l:mt-1 mobile-l:pb-2',
          'mobile-p:text-sm mobile-p:mt-2 mobile-p:pb-4',
          'tablet:pb-8',
          'laptop-short:text-sm laptop-short:mt-2 laptop-short:pb-0',
          'desktop:text-lg desktop:mt-4',
          'ultra-wide:text-2xl ultra-wide:mt-6',
        ].join(' '),
        compact: [
          'text-xs mt-1 pb-2',
          'mobile-p:text-sm mobile-p:mt-2 mobile-p:pb-3',
          'laptop-short:text-xs laptop-short:mt-1 laptop-short:pb-0',
          'desktop:text-base desktop:mt-2',
        ].join(' '),
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

