import SafeHydration from '@/components/SafeHydration';
import { AppHeader } from '@/components/ui/AppHeader';
import ChatKitComponent from '@/components/chat/ChatKit/ChatKit';

export default function ChatPage() {
  return (
    <SafeHydration>
      <div className="w-full h-screen flex flex-col">
        {/* AppHeader */}
        <AppHeader />
        
        {/* ChatKit Container */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
          <div className="w-full max-w-4xl h-full max-h-[calc(100vh-8rem)] min-h-[600px] flex flex-col relative">
            <ChatKitComponent className="w-full h-full min-h-[600px] flex-1" />
          </div>
        </div>
      </div>
    </SafeHydration>
  );
}

