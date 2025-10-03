import SafeHydration from "@/components/SafeHydration";
import { AppHeader } from "@/components/ui/AppHeader";
import Slider from "@/components/ui/Slider/Slider";

export default function Welcome2Page() {
  return (
    <SafeHydration>
      <div>
        {/* AppHeader */}
        <AppHeader />
        {/* Slider */}
        <Slider />
      </div>
    </SafeHydration>
  );
}
