import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { MediaFrame } from '@/components/ui/media-frame';
import { Subtitle } from '@/components/ui/primitives/subtitle';
import { Title } from '@/components/ui/primitives/title';
import { cn } from '@/components/ui/primitives/utils';

import {
  heroContentVariants,
  heroSlideVariants,
  heroTextWrapperVariants,
} from './hero-slide.styles';

export type HeroSlideProps = {
  /** Título principal (ReactNode para permitir énfasis). */
  title: React.ReactNode;
  /** Subtítulo o descripción (ReactNode). */
  subtitle?: React.ReactNode;
  /** Fuente de la imagen hero. */
  imageSrc: string;
  /** Texto alternativo de la imagen. */
  imageAlt?: string;
  /** Texto del badge sobre la imagen (ej: '+ 10 XP'). */
  badgeText?: string;
  /** Clase de color de fondo para el MediaFrame. */
  bgColor?: string;
  /** Alineación del texto en modo stack (default: center). */
  align?: VariantProps<typeof heroContentVariants>['align'];
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & VariantProps<typeof heroSlideVariants>;

/**
 * Componente de composición para slides o héroes.
 * - layout="stack": vertical en portrait, horizontal en landscape (default)
 * - layout="side": siempre horizontal (imagen izquierda, texto derecha)
 * - density="compact": reduce gaps, Title h2, Subtitle sm, imagen compacta
 * - scale="sm|md|lg": controla el escalado proporcional (gaps, padding, etc.)
 */
const HeroSlide = ({
  title,
  subtitle,
  imageSrc,
  imageAlt = '',
  badgeText,
  bgColor,
  layout = 'stack',
  density = 'default',
  scale = 'md',
  align = 'center',
  className,
  ...props
}: HeroSlideProps) => {
  const isSide = layout === 'side';
  const isCompact = density === 'compact';

  // Variantes internas basadas en props
  const resolvedAlign = isSide ? 'left' : (align ?? 'center');
  const titleSize = isCompact ? 'h2' : 'h1';
  const subtitleSize = isCompact ? 'sm' : 'md';
  const imageMaxHeight = isCompact ? 'compact' : 'default';

  return (
    <div
      className={cn(heroSlideVariants({ layout, density, scale }), className)}
      {...props}
    >
      <MediaFrame
        src={imageSrc}
        alt={imageAlt}
        badgeText={badgeText}
        tone={bgColor ? undefined : 'default'}
        className={cn(
          'shrink-0 transition-all',
          // En stack portrait: ancho completo, altura flexible
          'portrait:w-full portrait:max-w-none portrait:flex-shrink',
          // En stack landscape o side: ancho fijo para layout horizontal
          'landscape:w-[40%] landscape:min-w-[180px] landscape:max-w-[280px]',
          bgColor,
        )}
        layout={isSide ? 'side' : 'stack'}
        imageMaxHeight={imageMaxHeight}
      />

      <div className={cn(heroContentVariants({ align: resolvedAlign, layout }))}>
        <div className={cn(heroTextWrapperVariants({ density, scale }))}>
          <Title
            as="h1"
            size={titleSize}
            align={resolvedAlign}
          >
            {title}
          </Title>

          {subtitle && (
            <Subtitle
              size={subtitleSize}
              align={resolvedAlign}
              className="max-w-[45ch]"
            >
              {subtitle}
            </Subtitle>
          )}
        </div>
      </div>
    </div>
  );
};

HeroSlide.displayName = 'HeroSlide';

export { HeroSlide };
