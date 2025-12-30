import { cva } from 'class-variance-authority';

export const onboardingFooter = cva(
  'shrink-0 w-full flex items-center justify-center',
  {
    variants: {
      scale: {
        sm: [
          'max-w-[clamp(240px,80vw,320px)]',
          'px-[clamp(8px,1.5vw,12px)]',
          'pt-[clamp(12px,2vh,16px)]',
          'gap-[clamp(8px,1.5vw,12px)]',
        ].join(' '),
        md: [
          'max-w-[clamp(280px,75vw,384px)]',
          'px-[clamp(12px,2vw,16px)]',
          'pt-[clamp(16px,2.5vh,20px)]',
          'gap-[clamp(12px,2vw,16px)]',
          'tablet:max-w-[clamp(400px,70vw,512px)]',
          'tablet:px-[clamp(16px,2.5vw,24px)]',
          'tablet:pt-[clamp(20px,3vh,28px)]',
          'desktop:max-w-[clamp(640px,60vw,768px)]',
        ].join(' '),
        lg: [
          'max-w-[clamp(320px,70vw,448px)]',
          'px-[clamp(16px,2.5vw,24px)]',
          'pt-[clamp(20px,3vh,28px)]',
          'gap-[clamp(16px,2.5vw,24px)]',
          'tablet:max-w-[clamp(480px,65vw,640px)]',
          'tablet:px-[clamp(24px,3vw,32px)]',
          'desktop:max-w-[clamp(640px,60vw,768px)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);

export const onboardingCounter = cva(
  'text-km0-blue-700 font-bold shrink-0',
  {
    variants: {
      scale: {
        sm: 'text-xs w-8',
        md: 'text-sm tablet:text-base w-10 tablet:w-12',
        lg: 'text-base tablet:text-lg w-12 tablet:w-14',
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);

export const onboardingCta = cva('font-semibold uppercase tracking-wide', {
  variants: {
    scale: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    scale: 'md',
  },
});
