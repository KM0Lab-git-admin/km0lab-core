import { useState, useRef, useEffect, useCallback } from "react";

const STATES = {
  IDLE: "idle",
  RECORDING: "recording",
  PROCESSING: "processing",
  DONE: "done",
};

// Simulated waveform bars
function WaveformVisualizer({ isActive }) {
  const [bars, setBars] = useState(Array(32).fill(0.1));

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setBars((prev) =>
        prev.map((_, i) => {
          const base = Math.sin(Date.now() / 200 + i * 0.5) * 0.3 + 0.4;
          const noise = Math.random() * 0.3;
          return Math.min(1, Math.max(0.05, base + noise));
        })
      );
    }, 60);
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2px", height: "32px" }}>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: "3px",
            borderRadius: "2px",
            backgroundColor: isActive ? "#1a1a2e" : "#9ca3af",
            height: `${Math.max(4, h * 32)}px`,
            transition: "height 80ms ease-out",
          }}
        />
      ))}
    </div>
  );
}

// Spinning loader
function Spinner() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 1s linear infinite" }}>
      <circle cx="12" cy="12" r="10" stroke="#d1d5db" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// Icons
function MicIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// Chat message bubble
function ChatMessage({ role, text }) {
  const isUser = role === "user";
  return (
    <div style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start", marginBottom: "16px" }}>
      {!isUser && (
        <div style={{
          width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#1a1a2e",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginRight: "10px", flexShrink: 0, marginTop: "2px",
          fontSize: "14px", color: "#fff", fontWeight: 600,
        }}>
          IA
        </div>
      )}
      <div style={{
        maxWidth: "75%",
        padding: "12px 16px",
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        backgroundColor: isUser ? "#1a1a2e" : "#f3f4f6",
        color: isUser ? "#fff" : "#1a1a2e",
        fontSize: "14.5px",
        lineHeight: "1.55",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {text}
      </div>
    </div>
  );
}

// Main chat app
export default function VoiceChatDemo() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "¡Hola! Soy tu asistente de voz. Puedes escribirme o usar el micrófono para hablar. ¿En qué puedo ayudarte?" },
  ]);
  const [inputText, setInputText] = useState("");
  const [voiceState, setVoiceState] = useState(STATES.IDLE);
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const startRecording = () => {
    setVoiceState(STATES.RECORDING);
    setInputText("");
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime((t) => t + 1);
    }, 1000);
  };

  const cancelRecording = () => {
    clearInterval(timerRef.current);
    setVoiceState(STATES.IDLE);
    setRecordingTime(0);
  };

  const confirmRecording = () => {
    clearInterval(timerRef.current);
    setVoiceState(STATES.PROCESSING);

    // Simulate transcription delay
    setTimeout(() => {
      setInputText("¿Cuáles son las ventajas de usar inteligencia artificial en la atención al cliente?");
      setVoiceState(STATES.DONE);
    }, 2000);
  };

  const sendMessage = () => {
    const text = inputText.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInputText("");
    setVoiceState(STATES.IDLE);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "La IA en atención al cliente ofrece disponibilidad 24/7, respuestas instantáneas, reducción de costes operativos y la capacidad de escalar sin perder calidad. Además, puede analizar el sentimiento del cliente en tiempo real para priorizar casos urgentes.",
        },
      ]);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes pulseRing { 0%, 100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.3) } 50% { box-shadow: 0 0 0 8px rgba(220, 38, 38, 0) } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        textarea:focus, button:focus-visible { outline: 2px solid #1a1a2e; outline-offset: 2px; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
      `}</style>

      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fafafa",
        color: "#1a1a2e",
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 24px",
          borderBottom: "1px solid #e5e7eb",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}>
          <div style={{
            width: "40px", height: "40px", borderRadius: "12px",
            backgroundColor: "#1a1a2e", display: "flex", alignItems: "center",
            justifyContent: "center", color: "#fff", fontSize: "16px", fontWeight: 600,
          }}>
            IA
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "15px" }}>Asistente de Voz</div>
            <div style={{ fontSize: "12.5px", color: "#6b7280" }}>Whisper · En línea</div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "24px",
          display: "flex", flexDirection: "column",
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ animation: "fadeIn 0.3s ease-out" }}>
              <ChatMessage role={msg.role} text={msg.text} />
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div style={{
          padding: "16px 24px 24px",
          backgroundColor: "#fff",
          borderTop: "1px solid #e5e7eb",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "1.5px solid #e5e7eb",
            borderRadius: "24px",
            padding: "8px 8px 8px 20px",
            backgroundColor: "#fff",
            transition: "border-color 0.2s",
            ...(voiceState === STATES.RECORDING ? { borderColor: "#dc2626" } : {}),
          }}>

            {/* IDLE state: text input + mic */}
            {voiceState === STATES.IDLE && (
              <>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe un mensaje o usa el micrófono..."
                  rows={1}
                  style={{
                    flex: 1, border: "none", outline: "none", resize: "none",
                    fontSize: "14.5px", fontFamily: "inherit", lineHeight: "1.5",
                    backgroundColor: "transparent", color: "#1a1a2e",
                    maxHeight: "120px",
                  }}
                />
                <button
                  onClick={startRecording}
                  title="Grabar voz"
                  style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    border: "none", backgroundColor: "transparent",
                    color: "#6b7280", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "color 0.15s, background-color 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f3f4f6"; e.currentTarget.style.color = "#1a1a2e"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#6b7280"; }}
                >
                  <MicIcon />
                </button>
                <button
                  onClick={sendMessage}
                  disabled={!inputText.trim()}
                  style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    border: "none",
                    backgroundColor: inputText.trim() ? "#1a1a2e" : "#e5e7eb",
                    color: inputText.trim() ? "#fff" : "#9ca3af",
                    cursor: inputText.trim() ? "pointer" : "default",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                  }}
                >
                  <SendIcon />
                </button>
              </>
            )}

            {/* RECORDING state: waveform + cancel/confirm */}
            {voiceState === STATES.RECORDING && (
              <>
                <div style={{
                  display: "flex", alignItems: "center", gap: "10px", flex: 1,
                }}>
                  <div style={{
                    width: "10px", height: "10px", borderRadius: "50%",
                    backgroundColor: "#dc2626",
                    animation: "pulseRing 1.5s ease-in-out infinite",
                  }} />
                  <span style={{ fontSize: "13px", color: "#dc2626", fontWeight: 500, minWidth: "36px" }}>
                    {formatTime(recordingTime)}
                  </span>
                  <WaveformVisualizer isActive={true} />
                </div>
                <button
                  onClick={cancelRecording}
                  title="Cancelar"
                  style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    border: "none", backgroundColor: "#f3f4f6",
                    color: "#6b7280", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fee2e2"; e.currentTarget.style.color = "#dc2626"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#f3f4f6"; e.currentTarget.style.color = "#6b7280"; }}
                >
                  <XIcon />
                </button>
                <button
                  onClick={confirmRecording}
                  title="Confirmar"
                  style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    border: "none", backgroundColor: "#1a1a2e",
                    color: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                  }}
                >
                  <CheckIcon />
                </button>
              </>
            )}

            {/* PROCESSING state: frozen waveform + spinner */}
            {voiceState === STATES.PROCESSING && (
              <>
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "12px" }}>
                  <WaveformVisualizer isActive={false} />
                  <span style={{ fontSize: "13px", color: "#9ca3af" }}>Transcribiendo…</span>
                </div>
                <button
                  onClick={cancelRecording}
                  title="Cancelar"
                  style={{
                    width: "36px", height: "36px", borderRadius: "50%",
                    border: "none", backgroundColor: "#f3f4f6",
                    color: "#6b7280", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <XIcon />
                </button>
                <div style={{ width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Spinner />
                </div>
              </>
            )}

            {/* DONE state: transcribed text ready to send */}
            {voiceState === STATES.DONE && (
              <>
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  style={{
                    flex: 1, border: "none", outline: "none", resize: "none",
                    fontSize: "14.5px", fontFamily: "inherit", lineHeight: "1.5",
                    backgroundColor: "transparent", color: "#1a1a2e",
                    maxHeight: "120px",
                  }}
                />
                <button
                  onClick={() => { setInputText(""); setVoiceState(STATES.IDLE); }}
                  style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    border: "none", backgroundColor: "transparent",
                    color: "#6b7280", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <MicIcon />
                </button>
                <button
                  onClick={sendMessage}
                  style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    border: "none", backgroundColor: "#1a1a2e",
                    color: "#fff", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <SendIcon />
                </button>
              </>
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: "10px", fontSize: "11.5px", color: "#9ca3af" }}>
            Pulsa el micrófono para grabar · Enter para enviar
          </div>
        </div>
      </div>
    </>
  );
}
