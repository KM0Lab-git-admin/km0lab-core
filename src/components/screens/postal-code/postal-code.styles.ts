import { cva } from 'class-variance-authority';

export const postalCodeForm = cva(
  'w-full flex flex-col items-center flex-1 min-h-0',
  {
    variants: {
      scale: {
        sm: 'gap-2',
        md: 'gap-2 xs:gap-3 sm:gap-4',
        lg: 'gap-3 xs:gap-4 sm:gap-5',
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);

export const postalCodeTitleContainer = cva(
  'w-full text-center flex flex-col',
  {
    variants: {
      scale: {
        sm: 'gap-1',
        md: 'gap-1 xs:gap-2',
        lg: 'gap-2 xs:gap-3',
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);

export const postalCodeInputContainer = cva('w-full flex flex-col', {
  variants: {
    scale: {
      sm: 'gap-1.5',
      md: 'gap-2',
      lg: 'gap-3',
    },
  },
  defaultVariants: {
    scale: 'md',
  },
});

export const postalCodeButtonContainer = cva('w-full flex flex-col', {
  variants: {
    scale: {
      sm: 'gap-1.5',
      md: 'gap-2',
      lg: 'gap-3',
    },
  },
  defaultVariants: {
    scale: 'md',
  },
});

export const postalCodeButton = cva(
  'w-full rounded bg-km0-blue-700 text-white font-semibold whitespace-nowrap text-center shadow-sm hover:opacity-90 transition-opacity',
  {
    variants: {
      scale: {
        sm: 'text-sm py-2',
        md: 'text-base py-2.5',
        lg: 'text-lg py-3',
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);

export const postalCodeNotifyButton = cva(
  'w-full text-center font-semibold text-km0-blue-700 underline underline-offset-2',
  {
    variants: {
      scale: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      scale: 'md',
    },
  },
);

