# Responsive global (Tailwind v4 + Next.js)

## Propósito
- Evitar cortes en viewports bajos (ej. portátiles con escalado ~555px).
- Garantizar CTA accesible: si no cabe, el contenido scrollea y el footer queda visible.
- 100% CSS/Tailwind, sin medir altura en JS.

## Breakpoints globales (altura + layout)
```css
@custom-variant h700 (@media (max-height: 700px));      /* compresión ligera */
@custom-variant wideShort (@media (min-width: 900px) and (max-height: 650px)); /* layout 2 col si hay ancho */
@custom-variant h520 (@media (max-height: 520px));      /* densidad/ocultar secundarios */
```
- Orden: de menos estricto a más estricto (h700 → wideShort → h520). El último gana.
- wideShort puede coexistir con h700/h520; prioriza h520 para densidad, wideShort para layout.

## Fallback dvh
```css
.min-h-dvh-fallback { min-height: 100vh; }
@supports (height: 100dvh) {
  .min-h-dvh-fallback { min-height: 100dvh; }
}
```

## Patrón “CTA siempre accesible”
```
Page:     min-h-dvh-fallback flex flex-col
Wrapper:  flex-1 min-h-0 flex items-center justify-center (padding adaptativo)
Card:     max-h-full flex flex-col overflow-hidden
Header:   shrink-0
Content:  flex-1 min-h-0 overflow-y-auto (aquí se desplaza si falta altura)
Footer:   shrink-0 (CTA visible/no scrollea)
```
- Evita alturas fijas; usa `max-h-full` + `min-h-0` + `overflow-y-auto`.
- Para densidad: h700 (ligero), h520 (compactar/ocultar secundarios).
- Para layout horizontal por falta de altura pero buen ancho: wideShort.

## Guía de uso
- `h700:` → bajar padding/textos ligeramente en ≤700px.
- `h520:` → compactar fuerte u ocultar secundarios (subtítulos, badges).
- `wideShort:` → pasar a 2 columnas (imagen/ilustración vs texto/CTA) en ≥900px con ≤650px alto.
- CTA crítico: footer `shrink-0`; contenido `flex-1 min-h-0 overflow-y-auto`.
- Imagen/hero: `max-h-[XXdvh] object-contain` con ajustes `h700:` / `h520:`.

## Solapes y estado dominante
- En 510px alto se activan h700 y h520 → gana h520 (más estricto).
- En 900×620 se activan h700 y wideShort → wideShort define layout, h700 puede seguir ajustando densidad.

## Checklist PR
- Usas `min-h-dvh-fallback` en la raíz de la página/layout.
- Wrapper con `flex-1 min-h-0`; card/panel con `max-h-full flex flex-col`.
- Footer/CTA `shrink-0`; contenido `flex-1 min-h-0 overflow-y-auto`.
- Sin alturas fijas críticas; usas dvh + `object-contain`.
- Variantes solo con `h700`, `h520`, `wideShort` (no screens raw en config).
- CTA visible en viewports bajos; si no cabe, hay scroll interno.

## Validación mínima (6 resoluciones)
1) 375×510 (h520 dominante)  
2) 375×800 (normal)  
3) 900×620 (wideShort + h700)  
4) 1366×555 (wideShort + h700, caso portátil bajo)  
5) 1366×768 (desktop medio)  
6) 1920×1080 (desktop amplio)

## Pantallas críticas ajustadas
- `Onboarding.tsx`: adopta patrón CTA fijo, dvh fallback, h700/h520.
- `Onboarding2.tsx`: ya con patrón, h700/h520/wideShort.
- `welcome/page.tsx` + `MobileFrame`: dvh fallback, flex-1/min-h-0, sin max-h fija.
- `welcome2/page.tsx`: dvh fallback, min-h-0 en contenedores.
- `(auth)/(center)/layout.tsx`: min-h-dvh-fallback centrado (login/signup).

