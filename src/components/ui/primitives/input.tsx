import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from './utils';

const inputVariants = cva(
  'w-full h-12 px-4 py-[13px] rounded text-base font-normal font-ui transition-all inline-flex items-center gap-2 outline outline-1 outline-offset-[-1px] focus-visible:outline-[3px] disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: [
          'bg-white text-[#111113] outline-[#111112]/20',
          'placeholder:text-[#111112]/60',
          'focus-visible:outline-[#111112]/20',
          'disabled:bg-transparent disabled:text-[#111112]/40 disabled:placeholder:text-[#111112]/40',
        ],
        filled: [
          'bg-[#8ed9d4]/90 text-[#111113] outline-[#111112]/20',
          'focus-visible:outline-[#111112]/20',
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

const messageVariants = cva(
  'mt-2 inline-flex items-start gap-[3px] text-xs font-normal font-ui',
  {
    variants: {
      variant: {
        default: 'text-[#111112]/60',
        error: 'text-[#e30000]',
        errorDisabled: 'text-[#e30000]/40',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {
  message?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      type = 'text',
      message,
      iconLeft,
      iconRight,
      error = false,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    // Determine the variant based on error state and value
    const computedVariant = error
      ? 'error'
      : props.value && props.value !== ''
        ? 'filled'
        : variant || 'default';

    const messageVariant = error
      ? disabled
        ? 'errorDisabled'
        : 'error'
      : 'default';

    return (
      <div className="relative w-full">
        <div className="relative">
          <input
            type={type}
            className={cn(
              inputVariants({ variant: computedVariant }),
              iconLeft ? 'pl-12' : '',
              iconRight ? 'pr-12' : '',
              className,
            )}
            ref={ref}
            disabled={disabled}
            aria-invalid={error}
            {...props}
          />
          {iconLeft && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              {iconLeft}
            </div>
          )}
          {iconRight && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              {iconRight}
            </div>
          )}
        </div>
        {message && (
          <div className={cn(messageVariants({ variant: messageVariant }))}>
            {error && (
              <svg
                width="13"
                height="13"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0 mt-0.5"
              >
                <path
                  d="M5.49998 2.74999C5.35411 2.74999 5.21422 2.80794 5.11107 2.91108C5.00793 3.01423 4.94998 3.15412 4.94998 3.29999V5.49998C4.94998 5.64585 5.00793 5.78574 5.11107 5.88889C5.21422 5.99203 5.35411 6.04998 5.49998 6.04998C5.64585 6.04998 5.78574 5.99203 5.88889 5.88889C5.99203 5.78574 6.04998 5.64585 6.04998 5.49998V3.29999C6.04998 3.15412 5.99203 3.01423 5.88889 2.91108C5.78574 2.80794 5.64585 2.74999 5.49998 2.74999ZM6.00598 7.49097C5.99394 7.45592 5.9773 7.42263 5.95648 7.39197L5.89048 7.30947C5.81314 7.23316 5.71492 7.18146 5.60823 7.1609C5.50154 7.14035 5.39114 7.15185 5.29098 7.19397C5.22433 7.22183 5.16294 7.26089 5.10948 7.30947C5.05851 7.36086 5.01818 7.42181 4.99081 7.48882C4.96344 7.55583 4.94957 7.62759 4.94998 7.69997C4.95085 7.77184 4.9658 7.84285 4.99398 7.90897C5.01869 7.97722 5.0581 8.03921 5.10942 8.09053C5.16075 8.14186 5.22273 8.18127 5.29098 8.20597C5.35682 8.23507 5.428 8.2501 5.49998 8.2501C5.57196 8.2501 5.64315 8.23507 5.70898 8.20597C5.77723 8.18127 5.83922 8.14186 5.89054 8.09053C5.94187 8.03921 5.98128 7.97722 6.00598 7.90897C6.03416 7.84285 6.04911 7.77184 6.04998 7.69997C6.05268 7.66335 6.05268 7.62659 6.04998 7.58997C6.04051 7.5549 6.02567 7.5215 6.00598 7.49097ZM5.49998 0C4.41219 0 3.34882 0.322568 2.44436 0.926914C1.53989 1.53126 0.834944 2.39024 0.418663 3.39523C0.00238305 4.40022 -0.106535 5.50608 0.105683 6.57297C0.317901 7.63986 0.841723 8.61987 1.61091 9.38905C2.3801 10.1582 3.3601 10.6821 4.42699 10.8943C5.49388 11.1065 6.59974 10.9976 7.60473 10.5813C8.60972 10.165 9.4687 9.46007 10.073 8.5556C10.6774 7.65114 11 6.58777 11 5.49998C11 4.77771 10.8577 4.06252 10.5813 3.39523C10.3049 2.72794 9.89977 2.12163 9.38905 1.61091C8.87833 1.10019 8.27202 0.695061 7.60473 0.418661C6.93745 0.142261 6.22225 0 5.49998 0ZM5.49998 9.89996C4.62975 9.89996 3.77906 9.64191 3.05548 9.15843C2.33191 8.67496 1.76795 7.98777 1.43493 7.18378C1.1019 6.37979 1.01477 5.4951 1.18454 4.64159C1.35432 3.78807 1.77337 3.00407 2.38872 2.38872C3.00407 1.77337 3.78807 1.35431 4.64159 1.18454C5.4951 1.01477 6.37979 1.1019 7.18378 1.43492C7.98777 1.76795 8.67496 2.33191 9.15843 3.05548C9.64191 3.77905 9.89997 4.62975 9.89997 5.49998C9.89997 6.66693 9.4364 7.78608 8.61124 8.61124C7.78608 9.43639 6.66693 9.89996 5.49998 9.89996Z"
                  fill="currentColor"
                />
              </svg>
            )}
            <span>{message}</span>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

// Icon components for convenience
export const EmailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 15 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[18px] h-[18px]"
  >
    <path
      d="M0 1.5C0 0.671574 0.671573 0 1.5 0H13.5C14.3284 0 15 0.671573 15 1.5V10.5C15 11.3284 14.3284 12 13.5 12H1.5C0.671574 12 0 11.3284 0 10.5V1.5ZM2.63894 1.5L7.5 5.75342L12.3611 1.5H2.63894ZM13.5 2.49658L7.99388 7.31443C7.71111 7.56186 7.28889 7.56186 7.00612 7.31443L1.5 2.49658V10.5H13.5V2.49658Z"
      fill="#111113"
      fillOpacity="0.6"
    />
  </svg>
);

export const ChevronDownIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 12 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-[18px] h-[18px]"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.234315 0.234315C0.546734 -0.0781049 1.05327 -0.0781049 1.36569 0.234315L6 4.86863L10.6343 0.234315C10.9467 -0.0781044 11.4533 -0.0781044 11.7657 0.234315C12.0781 0.546734 12.0781 1.05327 11.7657 1.36569L6.56569 6.56569C6.41566 6.71572 6.21217 6.8 6 6.8C5.78783 6.8 5.58434 6.71572 5.43431 6.56569L0.234315 1.36569C-0.0781049 1.05327 -0.0781049 0.546734 0.234315 0.234315Z"
      fill="#111113"
    />
  </svg>
);

export { Input, inputVariants };
