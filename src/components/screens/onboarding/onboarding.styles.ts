import { cva } from 'class-variance-authority';

export const onboardingCounter = cva(
  'text-km0-blue-700 font-bold shrink-0',
  {
    variants: {
      scale: {
        sm: 'text-xs',
        md: 'text-sm tablet:text-base',
        lg: 'text-base tablet:text-lg',
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);
