type XPBadgeProps = {
  points: number;
  className?: string;
};

export const XPBadge = ({ points, className = '' }: XPBadgeProps) => {
  return (
    <div className={`inline-flex justify-start items-start ${className}`}>
      <div className="w-24 h-9 bg-km0-coral-400 rounded-lg outline outline-2 outline-offset-[-2px] outline-zinc-400 flex justify-center items-center overflow-hidden">
        <div className="px-2.5 rounded-lg flex justify-center items-center gap-[3px] overflow-hidden">
          <div className="w-6 h-6 relative overflow-hidden">
            <div className="w-4 h-4 left-[4px] top-[4px] absolute bg-zinc-300"></div>
          </div>
          <div className="text-center justify-center text-km0-success-200 text-base font-bold capitalize">
            {points}
            {' '}
            XP
          </div>
        </div>
      </div>
    </div>
  );
};
