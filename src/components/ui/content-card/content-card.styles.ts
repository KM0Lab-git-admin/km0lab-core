import { cva } from 'class-variance-authority';

export const contentCardVariants = cva(
  'w-full flex flex-col flex-1 min-h-0 overflow-hidden rounded-xl bg-white km0-card-shadow mx-auto',
  {
    variants: {
      scale: {
        sm: [
          'max-w-[clamp(280px,90vw,320px)]',
          'p-[clamp(12px,2vw,16px)]',
          'gap-[clamp(12px,2vh,16px)]',
        ].join(' '),
        md: [
          'max-w-[clamp(320px,85vw,565px)]',
          'p-[clamp(16px,2.5vw,24px)]',
          'gap-[clamp(16px,2.5vh,24px)]',
          'mobile-p:p-[clamp(12px,2vw,20px)]',
          'mobile-p:gap-[clamp(12px,2vh,20px)]',
          'mobile-p:max-h-[clamp(400px,70vh,500px)]',
          'tablet:max-w-[clamp(500px,80vw,700px)]',
          'tablet:p-[clamp(24px,3vw,32px)]',
          'desktop:max-w-[clamp(800px,75vw,1200px)]',
          'desktop:p-[clamp(32px,4vw,48px)]',
        ].join(' '),
        lg: [
          'max-w-[clamp(400px,80vw,700px)]',
          'p-[clamp(20px,3vw,28px)]',
          'gap-[clamp(20px,3vh,28px)]',
          'tablet:max-w-[clamp(600px,75vw,900px)]',
          'tablet:p-[clamp(32px,4vw,48px)]',
          'desktop:max-w-[clamp(1000px,70vw,1400px)]',
          'desktop:p-[clamp(48px,5vw,64px)]',
        ].join(' '),
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);
