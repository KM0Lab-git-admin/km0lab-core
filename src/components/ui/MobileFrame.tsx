import type { ReactNode } from 'react';

interface MobileFrameProps {
  children: ReactNode;
  className?: string;
}

export const MobileFrame = ({ children, className = '' }: MobileFrameProps) => {
  return (
    <div className={`w-full max-w-sm h-auto max-h-[564px] bg-gradient-to-br from-km0-blue-300/20 to-km0-beige-100/20 rounded-[16px] sm:rounded-[20px] flex flex-col justify-start items-center gap-1.5 sm:gap-2.5 overflow-hidden p-2.5 sm:p-3.5 ${className}`}>
      {children}
    </div>
  );
};
