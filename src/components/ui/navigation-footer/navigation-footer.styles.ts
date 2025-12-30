import { cva } from 'class-variance-authority';

export const navigationFooterVariants = cva(
  'shrink-0 w-full flex items-center justify-evenly',
  {
    variants: {
      scale: {
        sm: [
          'w-full max-w-[clamp(280px,95vw,360px)]',
          'py-[clamp(12px,2vh,16px)]',
        ].join(' '),
        md: [
          'w-full max-w-[clamp(320px,90vw,512px)]',
          'py-[clamp(16px,2.5vh,20px)]',
          'tablet:max-w-[clamp(480px,85vw,640px)]',
          'tablet:py-[clamp(20px,3vh,28px)]',
          'desktop:max-w-[clamp(768px,80vw,1024px)]',
        ].join(' '),
        lg: [
          'w-full max-w-[clamp(360px,85vw,560px)]',
          'py-[clamp(20px,3vh,28px)]',
          'tablet:max-w-[clamp(560px,80vw,768px)]',
          'desktop:max-w-[clamp(800px,75vw,1200px)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);

