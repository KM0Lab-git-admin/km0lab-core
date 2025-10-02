import type { ReactNode } from 'react';

interface MobileFrameProps {
  children: ReactNode;
  className?: string;
}

export const MobileFrame = ({ children, className = '' }: MobileFrameProps) => {
  return (
    <div className={`w-96 h-[844px] bg-gradient-to-br from-km0-blue-300/20 to-km0-beige-100/20 rounded-[30px] inline-flex flex-col justify-start items-center gap-3.5 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};
