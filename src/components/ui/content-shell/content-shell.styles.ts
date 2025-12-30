import { cva } from 'class-variance-authority';

export const contentShellVariants = cva(
  'flex-1 min-h-0 flex flex-col items-center justify-start w-full overflow-hidden',
  {
    variants: {
      scale: {
        sm: 'p-[clamp(10px,2vw,16px)] gap-[clamp(12px,2vh,16px)]',
        md: 'p-[clamp(12px,2.5vw,24px)] gap-[clamp(16px,2.5vh,24px)] mobile-p:gap-[clamp(12px,2vh,20px)] tablet:p-[clamp(24px,3vw,32px)] tablet:gap-[clamp(24px,3vh,32px)] desktop:p-[clamp(32px,4vw,48px)] desktop:gap-[clamp(32px,4vh,40px)]',
        lg: 'p-[clamp(16px,3vw,32px)] gap-[clamp(20px,3vh,28px)] tablet:p-[clamp(32px,4vw,48px)] tablet:gap-[clamp(32px,4vh,40px)] desktop:p-[clamp(48px,5vw,64px)] desktop:gap-[clamp(40px,5vh,56px)]',
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);

