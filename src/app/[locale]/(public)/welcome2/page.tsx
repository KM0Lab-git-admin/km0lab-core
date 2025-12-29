import BreakpointIndicator from '@/components/devtools/BreakpointIndicator';
import SafeHydration from '@/components/screens/welcome/SafeHydration';
import { LogoHeader } from '@/components/ui/logo-header';
import Slider from '@/components/screens/welcome/Slider';

export default function Welcome2Page() {
  return (
    <SafeHydration>
      <div className="w-full h-svh min-h-0 overflow-hidden flex flex-col items-center">
        {/* AppHeader */}
        <LogoHeader className="mt-2 mb-2 sm:mt-3 sm:mb-3 xs-h:mt-1 xs-h:mb-1" />
        {/* Slider */}
        <div className="w-full flex-1 flex min-h-0">
          <Slider />
        </div>
      </div>
      {/* Indicador de breakpoint (solo en desarrollo) */}
      <BreakpointIndicator />
    </SafeHydration>
  );
}
