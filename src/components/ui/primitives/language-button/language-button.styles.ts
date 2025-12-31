import { cva } from 'class-variance-authority';

export const languageButtonVariants = cva(
  'inline-flex items-center justify-between gap-3 rounded-full transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background text-foreground hover:bg-km0-yellow-500 hover:text-km0-blue-700 dark:bg-input/30 dark:border-input dark:hover:bg-km0-yellow-500 dark:hover:text-km0-blue-700',
        secondary:
          'bg-km0-yellow-500 text-km0-blue-700 hover:bg-km0-yellow-400',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        fold: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      size: {
        xs: 'h-8 px-4 py-2 text-xs',
        sm: 'h-10 px-5 py-2.5 text-sm',
        default: 'h-12 px-6 py-3 text-sm',
        lg: 'h-14 px-7 py-3.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export const languageButtonContentVariants = cva('flex items-center gap-3 flex-1 min-w-0');

export const languageButtonTextContainerVariants = cva('flex flex-col items-start min-w-0 flex-1 gap-1');

export const languageButtonTitleVariants = cva('font-semibold leading-tight truncate w-full mt-2', {
  variants: {
    variant: {
      default: '',
      destructive: 'text-white',
      outline: '',
      secondary: '',
      ghost: '',
      link: '',
      fold: 'text-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const languageButtonSubtitleVariants = cva('leading-tight truncate w-full mb-2', {
  variants: {
    variant: {
      default: 'text-white/90',
      destructive: 'text-white/90',
      outline: 'text-muted-foreground',
      secondary: 'text-km0-blue-700/80',
      ghost: 'text-muted-foreground',
      link: 'text-muted-foreground',
      fold: 'text-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const languageButtonFlagVariants = cva('relative shrink-0');

export const languageButtonIconVariants = cva('shrink-0 ml-2 flex items-center');

