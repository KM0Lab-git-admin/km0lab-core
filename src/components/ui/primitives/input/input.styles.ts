import { cva } from 'class-variance-authority';

export const inputVariants = cva(
  'w-full h-12 px-4 py-[13px] rounded text-base font-normal font-ui transition-all inline-flex items-center gap-2 outline outline-1 outline-offset-[-1px] focus-visible:outline-[3px] disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: [
          'bg-white text-[#111113] outline-[#111112]/20',
          'placeholder:text-[#111112]/60',
          'focus-visible:outline-[#FFECD2]',
          'disabled:bg-transparent disabled:text-[#111112]/40 disabled:placeholder:text-[#111112]/40',
        ],
        filled: [
          'bg-[#8ed9d4]/90 text-[#111113] outline-[#111112]/20',
          'focus-visible:outline-[#111112]/20',
        ],
        success: [
          'bg-[#F0FDF4] text-[#111113] outline-[#00CC66]',
          'focus-visible:outline-[#00CC66]/40',
          'disabled:bg-[#F0FDF4] disabled:text-[#111113]/40 disabled:outline-[#00CC66]/40',
        ],
        error: [
          'bg-[#fff2f4] text-[#e30000] outline-[#e30000]',
          'placeholder:text-[#e30000]',
          'focus-visible:outline-[#ffe3e7] focus-visible:outline-[3px]',
          'disabled:bg-[#fff2f4] disabled:outline-[#e30000]/20 disabled:text-[#e30000]/40',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const messageVariants = cva(
  'mt-2 inline-flex items-start gap-[3px] text-xs font-normal font-ui',
  {
    variants: {
      variant: {
        default: 'text-[#111112]/60',
        error: 'text-[#e30000]',
        errorDisabled: 'text-[#e30000]/40',
        success: 'text-[#00CC66]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

