import SafeHydration from '@/components/SafeHydration';
import { AppHeader } from '@/components/ui/AppHeader';
import Slider from '@/components/ui/Slider/Slider';

export default function Welcome2Page() {
  return (
    <SafeHydration>
      <div className="w-full min-h-dvh-fallback flex flex-col justify-between sm:justify-center sm:items-center md:justify-center md:items-center">
        {/* AppHeader */}
        <AppHeader />
        {/* Slider */}
        <div className="w-full flex-1 min-h-0 flex flex-col justify-center sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
          <Slider />
        </div>
      </div>
    </SafeHydration>
  );
}
