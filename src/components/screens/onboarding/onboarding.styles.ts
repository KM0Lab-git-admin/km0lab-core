import { cva } from 'class-variance-authority';

export const onboardingPage = cva(
  'w-full h-dvh-fallback flex flex-col bg-gradient-white-beige font-ui overflow-hidden',
);

export const onboardingShell = cva(
  'flex-1 min-h-0 flex flex-col items-center justify-start w-full overflow-hidden',
  {
    variants: {
      scale: {
        sm: 'p-[clamp(10px,2vw,16px)] gap-[clamp(12px,2vh,16px)]',
        md: 'p-[clamp(12px,2.5vw,24px)] gap-[clamp(16px,2.5vh,24px)] tablet:p-[clamp(24px,3vw,32px)] tablet:gap-[clamp(24px,3vh,32px)] desktop:p-[clamp(32px,4vw,48px)] desktop:gap-[clamp(32px,4vh,40px)]',
        lg: 'p-[clamp(16px,3vw,32px)] gap-[clamp(20px,3vh,28px)] tablet:p-[clamp(32px,4vw,48px)] tablet:gap-[clamp(32px,4vh,40px)] desktop:p-[clamp(48px,5vw,64px)] desktop:gap-[clamp(40px,5vh,56px)]',
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);

export const onboardingHeader = cva('flex items-center justify-center shrink-0', {
  variants: {
    scale: {
      sm: 'pb-[clamp(8px,1.5vh,12px)]',
      md: 'pb-[clamp(12px,2vh,16px)] tablet:pb-[clamp(16px,2.5vh,24px)]',
      lg: 'pb-[clamp(16px,2.5vh,24px)] tablet:pb-[clamp(20px,3vh,32px)] desktop:pb-[clamp(24px,3.5vh,40px)]',
    },
  },
  defaultVariants: {
    scale: 'md',
  },
});
export const onboardingLogo = cva('logo-1', {
  variants: {
    scale: {
      sm: 'scale-[clamp(0.5,8vw,0.65)]',
      md: 'scale-[clamp(0.6,9vw,0.75)] tablet:scale-[clamp(0.7,10vw,0.85)]',
      lg: 'scale-[clamp(0.7,10vw,0.85)] tablet:scale-[clamp(0.8,11vw,0.95)] desktop:scale-[clamp(0.85,12vw,1)]',
    },
  },
  defaultVariants: {
    scale: 'md',
  },
});

export const onboardingFooter = cva(
  'shrink-0 w-full flex items-center justify-between',
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
