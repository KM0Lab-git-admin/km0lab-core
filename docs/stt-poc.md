# POC: Voz → OK → Texto (STT)

POC de transcripción de voz: grabar en el navegador, enviar al backend y mostrar el texto. Sin transcripción en tiempo real.

## Cómo arrancar

```bash
npx turbo run dev
```

## Dónde ver la POC

- URL: `http://localhost:3000/{locale}/stt-poc` (por ejemplo `http://localhost:3000/es/stt-poc`).
- Flujo: **Grabar** → **Parar** → **OK** → se muestra la transcripción.

## Configuración

- Copia `.env.example` a `.env` y rellena:
  - `OPENAI_API_KEY`: clave de API de OpenAI (solo backend; no se expone al cliente).
  - `OPENAI_TRANSCRIBE_MODEL`: modelo de transcripción (por defecto `gpt-4o-mini-transcribe`).

## Límites

- Tamaño máximo del audio en el backend: **20 MB**.
- Se recomienda grabar **hasta ~60 segundos** para evitar blobs grandes y tiempos largos.

## Checklist manual (PR)

- [ ] Grabar 5–10 s → Parar → OK → aparece texto.
- [ ] Denegar permisos de micrófono → mensaje de error claro.
- [ ] OK sin audio → botón deshabilitado.
- [ ] Backend caído o sin `OPENAI_API_KEY` → error visible.
