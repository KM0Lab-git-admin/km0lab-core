import { Suspense } from 'react';
import { ChatScreen } from '@/components/screens/chat';

export default function ChatPage() {
  return (
    <Suspense>
      <ChatScreen />
    </Suspense>
  );
}
