import type { FC } from 'react';

interface ProgressDotsProps {
  total: number;
  current: number;
}

const ProgressDots: FC<ProgressDotsProps> = ({ total, current }) => (
  <div className="flex items-center justify-center gap-2 mt-4" aria-label="Progreso del carrusel">
    {Array.from({ length: total }).map((_, idx) => (
      <span
        key={idx}
        className={
          `inline-block w-3 h-3 rounded-full transition-all duration-200 ` +
          (idx === current
            ? 'bg-km0-blue-700 scale-110 shadow-md'
            : 'bg-km0-blue-200 opacity-60')
        }
        aria-current={idx === current ? 'step' : undefined}
      />
    ))}
  </div>
);

export default ProgressDots; 