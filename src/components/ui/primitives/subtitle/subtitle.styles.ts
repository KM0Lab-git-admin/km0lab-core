import { cva } from 'class-variance-authority';

export const subtitleVariants = cva(
  'font-ui leading-relaxed',
  {
    variants: {
      size: {
        lg: 'text-sm mobile-p:text-base short-landscape:text-xs tablet:text-lg laptop-short:text-base desktop:text-xl ultra-wide:text-2xl',
        md: 'text-sm mobile-p:text-sm short-landscape:text-xs tablet:text-base laptop-short:text-sm desktop:text-lg ultra-wide:text-xl',
        sm: 'text-xs mobile-p:text-sm short-landscape:text-[10px] tablet:text-sm laptop-short:text-xs desktop:text-base ultra-wide:text-lg',
        xs: 'text-xs mobile-p:text-xs tablet:text-sm laptop-short:text-xs desktop:text-sm ultra-wide:text-base',
      },
      align: {
        left: 'text-left',
        center: 'text-center',
      },
      tone: {
        default: 'text-neutral-600',
        muted: 'text-neutral-500',
      },
    },
    defaultVariants: {
      size: 'md',
      align: 'left',
      tone: 'default',
    },
  },
);
