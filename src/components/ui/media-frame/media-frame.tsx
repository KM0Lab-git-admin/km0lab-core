import type { VariantProps } from 'class-variance-authority';
import type React from 'react';

import { cn } from '@/components/ui/primitives/utils';

import {
  badgeVariants,
  imageVariants,
  mediaFrameInnerVariants,
  mediaFrameVariants,
} from './media-frame.styles';

export interface MediaFrameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof mediaFrameVariants> {
  /** Texto a mostrar en el badge (opcional). */
  badgeText?: string;
  /** Posición del badge dentro del marco. */
  badgePosition?: VariantProps<typeof badgeVariants>['position'];
  /** Fuente de la imagen (atajo para children <img>). */
  src?: string;
  /** Texto alternativo para la imagen. */
  alt?: string;
  /** Altura máxima de la imagen interna. */
  imageMaxHeight?: VariantProps<typeof imageVariants>['maxHeight'];
  /** Contenido personalizado (normalmente un <img> o <Image>). */
  children?: React.ReactNode;
}

/**
 * Primitive UI: Marco contenedor para imágenes con soporte de badges,
 * sombras y radios de borde personalizables.
 * Layout por defecto: 'stack' (ancho completo).
 */
const MediaFrame = ({
  layout = 'stack',
  badgeText,
  badgePosition = 'bottom-left',
  radius = 'lg',
  shadow = 'sm',
  tone = 'default',
  src,
  alt = '',
  imageMaxHeight = 'default',
  className,
  children,
  ...props
}: MediaFrameProps) => (
  <div
    className={cn(mediaFrameVariants({ layout, radius, shadow, tone }), className)}
    {...props}
  >
    <div className={cn(mediaFrameInnerVariants({ radius }))}>
      {children || (
        src && (
          <img
            src={src}
            alt={alt}
            className={cn(imageVariants({ maxHeight: imageMaxHeight }))}
            draggable={false}
          />
        )
      )}
    </div>

    {badgeText && (
      <div className={cn(badgeVariants({ position: badgePosition }))}>
        {badgeText}
      </div>
    )}
  </div>
);

MediaFrame.displayName = 'MediaFrame';

export { MediaFrame };
