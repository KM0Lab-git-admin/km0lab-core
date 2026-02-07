import { VoiceInput } from '@/components/voice-input';

export default function SttPocPage() {
  return (
    <div className="flex min-h-full w-full flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <h1 className="mb-6 text-center text-xl font-brand font-bold text-km0-blue-700">
          POC: Voz → OK → Texto
        </h1>
        <VoiceInput />
      </div>
    </div>
  );
}
