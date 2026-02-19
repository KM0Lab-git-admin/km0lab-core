import { VoiceChat } from '@/components/voice-chat';

export default function SttPocPage() {
  return (
    <div className="flex min-h-full w-full flex-col">
      <VoiceChat welcomeMessage="Graba un mensaje y envíalo para ver la transcripción." />
    </div>
  );
}
