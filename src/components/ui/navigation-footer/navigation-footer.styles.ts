import { cva } from 'class-variance-authority';

export const navigationFooterVariants = cva(
  'shrink-0 w-full flex items-center justify-evenly',
  {
    variants: {
      scale: {
        sm: [
          'w-full max-w-[clamp(280px,95vw,360px)]',
          'py-[clamp(10px,1.5vh,16px)]',
        ].join(' '),
        md: [
          'w-full max-w-[clamp(320px,90vw,512px)]',
          'py-[clamp(10px,1.5vh,20px)]',
          'mobile-p:py-[clamp(12px,1.8vh,24px)]',
          'tablet:max-w-[clamp(480px,85vw,640px)]',
          'tablet:py-[clamp(16px,2.5vh,32px)]',
          'desktop:max-w-[clamp(768px,80vw,1024px)]',
          'desktop:py-[clamp(20px,3vh,40px)]',
        ].join(' '),
        lg: [
          'w-full max-w-[clamp(360px,85vw,560px)]',
          'py-[clamp(14px,2vh,28px)]',
          'tablet:max-w-[clamp(560px,80vw,768px)]',
          'tablet:py-[clamp(20px,3vh,36px)]',
          'desktop:max-w-[clamp(800px,75vw,1200px)]',
          'desktop:py-[clamp(24px,3.5vh,44px)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);

