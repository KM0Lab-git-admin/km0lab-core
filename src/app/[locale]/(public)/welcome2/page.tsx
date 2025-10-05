import SafeHydration from "@/components/SafeHydration";
import { AppHeader } from "@/components/ui/AppHeader";
import Slider from "@/components/ui/Slider/Slider";

export default function Welcome2Page() {
  return (
    <SafeHydration>
      <div className="w-full min-h-screen flex flex-col md:justify-center md:items-center">
        {/* AppHeader */}
        <AppHeader />
        {/* Slider */}
        <div className="w-full md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
          <Slider />
        </div>
      </div>
    </SafeHydration>
  );
}
