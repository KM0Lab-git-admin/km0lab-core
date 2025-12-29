import { cva } from 'class-variance-authority';

export const subtitleVariants = cva(
  'font-ui leading-relaxed',
  {
    variants: {
      size: {
        hero: [
          'text-[clamp(1rem,2.6vw,1.5rem)]',
          'leading-[clamp(1.4rem,3vw,2.15rem)]',
          'short-landscape:text-[clamp(0.95rem,2vw,1.2rem)]',
          'short-landscape:leading-[clamp(1.2rem,2.4vw,1.6rem)]',
        ].join(' '),
        heroCompact: [
          'text-[clamp(0.95rem,2.2vw,1.3rem)]',
          'leading-[clamp(1.25rem,2.6vw,1.7rem)]',
          'short-landscape:text-[clamp(0.85rem,1.8vw,1.1rem)]',
          'short-landscape:leading-[clamp(1.05rem,2vw,1.4rem)]',
        ].join(' '),
        lg: 'text-sm mobile-p:text-base tablet:text-lg laptop-short:text-base desktop:text-xl ultra-wide:text-2xl',
        md: 'text-sm mobile-p:text-sm tablet:text-base laptop-short:text-sm desktop:text-lg ultra-wide:text-xl',
        sm: 'text-xs mobile-p:text-sm tablet:text-sm laptop-short:text-xs desktop:text-base ultra-wide:text-lg',
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
