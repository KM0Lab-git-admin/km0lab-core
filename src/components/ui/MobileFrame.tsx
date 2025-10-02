import type { ReactNode } from 'react';

interface MobileFrameProps {
  children: ReactNode;
  className?: string;
}

export const MobileFrame = ({ children, className = '' }: MobileFrameProps) => {
  return (
    <div className={`w-full max-w-md h-auto max-h-[92vh] bg-gradient-to-br from-km0-blue-300/20 to-km0-beige-100/20 rounded-[20px] sm:rounded-[30px] flex flex-col justify-start items-center gap-3 sm:gap-4 overflow-hidden p-4 sm:p-5 ${className}`}>
      {children}
    </div>
  );
};
