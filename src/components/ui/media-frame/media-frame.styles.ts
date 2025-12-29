import { cva } from 'class-variance-authority';

export const mediaFrameContainerVariants = cva(
  'relative shrink-0 min-w-0 rounded-xl',
  {
    variants: {
      /**
       * Layout variant affects sizing:
       * - stack: Full width image container
       * - side: Constrained width for side-by-side layout
       */
      layout: {
        stack: [
          'p-2 mt-3',
          'mobile-p:p-3 mobile-p:mt-5 mobile-p:rounded-2xl mobile-p:w-full',
          'tablet:w-full tablet:mt-4',
          'desktop:w-full',
          'ultra-wide:w-full',
        ].join(' '),
        side: [
          'p-2 mt-3',
          'mobile-l:p-2 mobile-l:mt-0 mobile-l:w-2/5',
          'mobile-p:p-3 mobile-p:mt-5 mobile-p:rounded-2xl mobile-p:w-full',
          'tablet:w-full tablet:mt-4',
          'laptop-short:w-[45%] laptop-short:mt-0',
          'desktop:w-2/5',
          'ultra-wide:w-[35%]',
        ].join(' '),
      },
    },
    defaultVariants: {
      layout: 'side',
    },
  },
);

export const mediaFrameInnerVariants = cva(
  'relative bg-white border border-white shadow-sm',
  {
    variants: {
      rounded: {
        sm: 'rounded-lg',
        md: 'rounded-xl',
        lg: 'rounded-2xl',
      },
      padding: {
        sm: 'p-1',
        md: 'p-1 mobile-p:p-2',
        lg: 'p-2',
      },
    },
    defaultVariants: {
      rounded: 'sm',
      padding: 'md',
    },
  },
);

export const mediaFrameImageVariants = cva('w-full object-contain', {
  variants: {
    rounded: {
      sm: 'rounded-lg',
      md: 'rounded-xl mobile-l:rounded-xl',
      lg: 'rounded-2xl',
    },
    maxHeight: {
      default: [
        'max-h-[38dvh]',
        'mobile-l:max-h-[45dvh]',
        'mobile-p:max-h-[32dvh]',
        'laptop-short:max-h-[280px]',
        'desktop:max-h-[450px]',
        'ultra-wide:max-h-[600px]',
      ].join(' '),
      compact: [
        'max-h-[35dvh]',
        'laptop-short:max-h-[240px]',
        'desktop:max-h-[400px]',
      ].join(' '),
    },
  },
  defaultVariants: {
    rounded: 'sm',
    maxHeight: 'default',
  },
});

export const mediaFrameBadgeVariants = cva(
  'absolute bg-km0-coral-400 text-white font-bold rounded-full shadow-md',
  {
    variants: {
      size: {
        sm: 'left-1.5 bottom-1.5 text-[9px] px-2 py-0.5',
        md: 'left-1.5 bottom-1.5 text-[8px] px-1.5 py-0.5 mobile-l:left-1.5 mobile-l:bottom-1.5 mobile-p:left-3 mobile-p:bottom-3 mobile-p:text-xs mobile-p:px-3 mobile-p:py-1',
        lg: 'left-3 bottom-3 text-xs px-3 py-1',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

