import Image from 'next/image';
import { cn } from '@/components/ui/primitives/utils';
import {
  languageCardVariants,
  languageCardFlag,
  languageCardArrow,
} from './language-card.styles';

interface LanguageCardProps {
  flag: string;
  flagIsImage?: boolean;
  name: string;
  description: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export function LanguageCard({
  flag,
  flagIsImage = true,
  name,
  description,
  selected = false,
  disabled = false,
  onClick,
  style,
  className,
}: LanguageCardProps) {
  const state = disabled ? 'disabled' : selected ? 'selected' : 'default';

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={style}
      className={cn(languageCardVariants({ state }), className)}
    >
      {/* Flag */}
      <span
        className={languageCardFlag({ state })}
        role="img"
        aria-label={name}
      >
        {flagIsImage ? (
          <Image
            src={flag}
            alt={`${name} flag`}
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />
        ) : (
          <span className="text-3xl">{flag}</span>
        )}
      </span>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'font-ui text-lg font-semibold leading-tight',
            disabled ? 'text-neutral-400' : 'text-km0-blue-700',
          )}
        >
          {name}
        </p>
        <p className="mt-0.5 font-body text-sm text-neutral-500">
          {description}
        </p>
      </div>

      {/* Arrow */}
      <span className={languageCardArrow({ state })}>→</span>
    </button>
  );
}
