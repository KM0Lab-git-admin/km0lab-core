'use client';
import { useEffect, useState } from 'react';

/**
 * Componente de desarrollo que muestra el breakpoint actual considerando
 * ancho y alto. La altura manda: si el alto < 700px siempre se muestra XS.
 * Visible solo en desarrollo.
 */
const BreakpointIndicator = () => {
  const [label, setLabel] = useState('XS');
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      return;
    }

    const computeLabel = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (height < 700) return 'XS';
      if (width >= 1280 && height >= 1000) return 'XL-H';
      if (width >= 1024 && height >= 900) return 'LG-H';
      if (width >= 768 && height >= 800) return 'MD-H';
      if (width >= 480 && height >= 700) return 'SM-H';
      if (width >= 1280) return 'XL';
      if (width >= 1024) return 'LG';
      if (width >= 768) return 'MD';
      if (width >= 480) return 'SM';
      return 'XS';
    };

    const update = () => {
      setLabel(computeLabel());
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
    <div className="pointer-events-none fixed top-2 left-2 z-[999999] flex gap-2 rounded-lg border border-white/70 bg-red-700 px-3 py-2 font-mono text-sm text-white shadow-xl">
      <span>{label}</span>
      <span className="text-white/80">{`${viewport.width}×${viewport.height}`}</span>
    </div>
  );
};

export default BreakpointIndicator;
