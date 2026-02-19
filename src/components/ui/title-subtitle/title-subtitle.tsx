import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { Subtitle } from '@/components/ui/primitives/subtitle';
import { Title } from '@/components/ui/primitives/title';
import { cn } from '@/components/ui/primitives/utils';

import { titleSubtitleVariants } from './title-subtitle.styles';

/** Mapeo de size del componente a size de Title */
const titleSizeMap = {
  sm: 'h3',
  md: 'h2',
  lg: 'h1',
} as const;

/** Mapeo de size del componente a size de Subtitle */
const subtitleSizeMap = {
  sm: 'xs',
  md: 'sm',
  lg: 'md',
} as const;

export interface TitleSubtitleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof titleSubtitleVariants> {
  /** Título principal (requerido). */
  title: React.ReactNode;
  /** Subtítulo opcional. Si no se proporciona, no se renderiza. */
  subtitle?: React.ReactNode;
  /** Escala de tipografía (afecta tamaño de Title y Subtitle). */
  size?: 'sm' | 'md' | 'lg';
  /** Clases adicionales para el Title. */
  titleClassName?: string;
  /** Clases adicionales para el Subtitle. */
  subtitleClassName?: string;
  /** Tono del subtítulo. */
  subtitleTone?: 'default' | 'muted';
}

/**
 * Componente de composición que agrupa Title y Subtitle.
 *
 * Útil para encabezados de sección, pantallas o tarjetas.
 * Soporta breakpoints responsive incluyendo `short-landscape`.
 */
const TitleSubtitle = ({
  title,
  subtitle,
  size = 'md',
  align = 'center',
  spacing = 'md',
  titleClassName,
  subtitleClassName,
  subtitleTone = 'muted',
  className,
  ...props
}: TitleSubtitleProps) => {
  const titleSize = titleSizeMap[size];
  const subtitleSize = subtitleSizeMap[size];

  return (
    <div
      className={cn(titleSubtitleVariants({ align, spacing }), className)}
      {...props}
    >
      <Title
        size={titleSize}
        align={align ?? 'center'}
        className={titleClassName}
      >
        {title}
      </Title>

      {subtitle && (
        <Subtitle
          size={subtitleSize}
          align={align ?? 'center'}
          tone={subtitleTone}
          className={subtitleClassName}
        >
          {subtitle}
        </Subtitle>
      )}
    </div>
  );
};

TitleSubtitle.displayName = 'TitleSubtitle';

export { TitleSubtitle };

