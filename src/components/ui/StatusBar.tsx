export const StatusBar = () => {
  return (
    <div className="w-96 h-24 outline outline-2 outline-offset-[-1px] outline-neutral-300 inline-flex justify-start items-end gap-6 flex-wrap content-end overflow-hidden">
      {/* iOS Status Bar */}
      <div className="w-96 h-12 relative overflow-hidden">
        {/* Notch */}
        <div className="w-40 h-8 left-[113px] top-[-2px] absolute bg-black"></div>
        
        {/* Time */}
        <div className="w-14 h-5 left-[37px] top-[9px] absolute rounded-3xl">
          <div className="w-14 h-5 left-0 top-[1px] absolute text-center justify-start text-black text-base font-semibold leading-snug">
            9:41
          </div>
        </div>
        
        {/* Signal/Battery indicators */}
        <div className="w-6 h-3 left-[342px] top-[15px] absolute opacity-30 bg-black rounded"></div>
        <div className="w-[1.40px] h-1 left-[368px] top-[20px] absolute opacity-40 bg-black"></div>
        <div className="w-5 h-2 left-[344px] top-[17px] absolute bg-black rounded-sm"></div>
        <div className="w-4 h-3 left-[292px] top-[16px] absolute bg-black border border-black"></div>
      </div>
    </div>
  );
};
