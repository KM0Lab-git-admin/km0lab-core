'use client';
import { useEffect, useState } from 'react';

/**
 * Componente de desarrollo que muestra el breakpoint actual según la tabla
 * de pruebas (ancho x alto) y la orientación. Visible solo en desarrollo.
 */
const BreakpointIndicator = () => {
  const [label, setLabel] = useState('XS');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const computeLabel = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (width >= 1920 && height >= 1080) {
        return 'ULTRA-WIDE';
      }
      if (width >= 1440 && height >= 900) {
        return 'DESKTOP';
      }
      if (width >= 1280 && height >= 550) {
        return 'LAPTOP-SHORT';
      }
      if (width >= 768 && height >= 1024) {
        return 'TABLET';
      }
      if (width >= 667 && height >= 375) {
        return 'MOBILE-L';
      }
      if (width >= 375 && height >= 667) {
        return 'MOBILE-P';
      }
      return 'XS';
    };

    const computeOrientation = (): 'portrait' | 'landscape' => {
      return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    };

    const update = () => {
      setLabel(computeLabel());
      setOrientation(computeOrientation());
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    update();

    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="pointer-events-none fixed top-2 left-2 z-[999999] flex flex-col gap-1 rounded-lg border border-white/70 bg-red-700/50 px-3 py-2 font-mono text-xs text-white shadow-xl opacity-50">
      <div className="flex gap-2">
        <span className="font-semibold">{label}</span>
        <span className="text-white/80">{`${viewport.width}×${viewport.height}`}</span>
      </div>
      <div className="flex gap-2 text-[10px]">
        <span className="text-white/70">Orientation:</span>
        <span className={orientation === 'portrait' ? 'text-blue-300' : 'text-yellow-300'}>
          {orientation.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default BreakpointIndicator;
