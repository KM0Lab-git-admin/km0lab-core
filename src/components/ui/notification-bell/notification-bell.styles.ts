import { cva } from 'class-variance-authority';

export const notificationBellButtonVariants = cva(
  'relative inline-flex shrink-0 text-neutral-600',
  {
  variants: {
    size: {
      sm: 'size-6',
      md: 'size-8',
      lg: 'size-10',
    },
    dotColor: {
      coral: '[&_[data-dot]]:bg-km0-coral-400',
      orange: '[&_[data-dot]]:bg-gaming-orange-500',
      red: '[&_[data-dot]]:bg-gaming-fire-500',
      green: '[&_[data-dot]]:bg-km0-success-500',
      blue: '[&_[data-dot]]:bg-km0-blue-500',
    },
  },
  defaultVariants: {
    size: 'md',
    dotColor: 'coral',
  },
  }
);
