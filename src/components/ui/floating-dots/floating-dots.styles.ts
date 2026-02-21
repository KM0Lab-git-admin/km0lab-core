import { cva } from 'class-variance-authority';

export const floatingDotsContainerVariants = cva(
  'pointer-events-none absolute inset-0 overflow-hidden',
);

export const dotVariants = cva(
  'absolute rounded-full bg-km0-blue-300 animate-float',
  {
    variants: {
      size: {
        sm: 'w-dot-sm h-[var(--width-dot-sm)]',
        md: 'w-dot-md h-[var(--width-dot-md)]',
        lg: 'w-dot-lg h-[var(--width-dot-lg)]',
        xl: 'w-dot-xl h-[var(--width-dot-xl)]',
      },
      position: {
        'top-left': 'top-[10%] left-[8%]',
        'top-right': 'top-[5%] left-[70%]',
        'mid-left': 'top-[60%] left-[5%]',
        'mid-right': 'top-[45%] left-[92%]',
        'bottom-left': 'top-[25%] left-[88%]',
        'bottom-right': 'top-[75%] left-[90%]',
      },
      delay: {
        none: '',
        '200': 'animate-delay-200',
        '400': 'animate-delay-400',
      },
    },
    defaultVariants: {
      size: 'md',
      position: 'top-left',
      delay: 'none',
    },
  },
);
