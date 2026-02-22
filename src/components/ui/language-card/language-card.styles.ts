import { cva } from 'class-variance-authority';

export const languageCardVariants = cva(
  [
    'w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-left group border-[2px] border-solid',
    'transition-all duration-300 ease-out animate-fade-in-up',
  ].join(' '),
  {
    variants: {
      state: {
        default: [
          'bg-white cursor-pointer border-km0-blue-700 shadow-xl',
          'hover:scale-[1.09] hover:-translate-y-3 hover:shadow-[0_24px_56px_-8px_rgba(23,64,148,0.4)] hover:border-km0-yellow-500 hover:bg-km0-yellow-50',
        ].join(' '),
        selected: [
          'bg-km0-yellow-50 cursor-pointer border-km0-yellow-500 scale-[1.04] -translate-y-1.5',
          'shadow-[0_16px_40px_-8px_rgba(23,64,148,0.25)]',
        ].join(' '),
        disabled: 'bg-km0-beige-50 border-km0-blue-200 opacity-50 cursor-not-allowed grayscale',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

export const languageCardFlag = cva(
  'flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full overflow-hidden transition-all duration-300',
  {
    variants: {
      state: {
        default: 'bg-km0-beige-50 group-hover:bg-km0-yellow-100 group-hover:scale-110',
        selected: 'bg-km0-yellow-100 scale-110',
        disabled: 'bg-km0-beige-100',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

export const languageCardArrow = cva(
  'text-xl flex-shrink-0 transition-all duration-300',
  {
    variants: {
      state: {
        default: 'text-km0-blue-300 group-hover:text-km0-yellow-500 group-hover:translate-x-2 group-hover:scale-125',
        selected: 'text-km0-yellow-500 translate-x-1',
        disabled: 'text-km0-blue-200',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);
