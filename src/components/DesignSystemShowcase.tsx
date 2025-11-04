import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Separator } from './ui/separator';

// Componente del header
function TypographyHeader() {
  return (
    <div className="w-full max-w-4xl">
      {/* Title con fondo KM0 blue principal */}
      <div className="bg-km0-blue-700 px-6 py-3 rounded-t-lg">
        <h1 className="font-brand text-white text-4xl leading-tight">Typography</h1>
      </div>

      {/* Subtitle con fondo neutral principal */}
      <div className="bg-neutral-800 px-6 py-2 rounded-b-lg">
        <p className="font-ui text-white">Sistema tipográfico KM0 LAB</p>
      </div>
    </div>
  );
}

// Componente para mostrar cada ejemplo tipográfico
type TypographyExampleProps = {
  text: string;
  description: string;
  fontInfo: string;
  className?: string;
  showUnderline?: boolean;
  showSemibold?: boolean;
};

function TypographyExample({
  text,
  description,
  fontInfo,
  className = '',
  showUnderline = false,
  showSemibold = false,
}: TypographyExampleProps) {
  return (
    <div className="space-y-4">
      {/* Ejemplo principal */}
      <div className="flex items-center justify-between">
        <div className={`text-neutral-900 ${className}`}>
          {text}
        </div>
      </div>

      {/* Variantes si las hay */}
      {(showUnderline || showSemibold) && (
        <div className="space-y-2 pl-4 border-l-2 border-neutral-200">
          {showUnderline && (
            <div className="flex items-center justify-between">
              <div className={`text-neutral-900 underline ${className}`}>
                {text}
              </div>
              <div className="detail text-neutral-500 text-right">
                {fontInfo}
                <br />
                + Underline
              </div>
            </div>
          )}

          {showSemibold && (
            <div className="flex items-center justify-between">
              <div className={`text-neutral-900 font-semibold ${className}`}>
                {text}
              </div>
              <div className="detail text-neutral-500 text-right">
                {fontInfo}
                <br />
                + Semibold
              </div>
            </div>
          )}
        </div>
      )}

      {/* Información de la fuente */}
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="text-xs border-neutral-300 text-neutral-600">
          {description}
        </Badge>
        <div className="detail text-neutral-500 text-right">
          {fontInfo}
        </div>
      </div>

      <Separator className="bg-neutral-200" />
    </div>
  );
}

// Showcase principal
export default function TypographyShowcase() {
  const typographyExamples = [
    {
      text: 'Heading 0',
      description: 'Display/Hero',
      fontInfo: 'Antique Olive Black 80px',
      className: 'display-text',
    },
    {
      text: 'Heading 1',
      description: 'Main Headlines',
      fontInfo: 'Antique Olive Bold 48px',
      className: 'font-brand text-6xl font-bold leading-tight tracking-tight',
    },
    {
      text: 'Heading 2',
      description: 'Section Headlines',
      fontInfo: 'Antique Olive Bold 40px',
      className: 'font-brand text-5xl font-bold leading-snug tracking-tight',
    },
    {
      text: 'Heading 3',
      description: 'Subsection Headlines',
      fontInfo: 'Antique Olive Bold 32px',
      className: 'font-brand text-4xl font-bold leading-snug',
    },
    {
      text: 'Heading 4',
      description: 'Component Headlines',
      fontInfo: 'Antique Olive Bold 28px',
      className: 'font-brand text-3xl font-bold leading-snug',
    },
    {
      text: 'Heading 5',
      description: 'Card Headlines',
      fontInfo: 'Antique Olive Semibold 24px',
      className: 'font-brand text-2xl font-semibold leading-snug',
    },
    {
      text: 'Heading 6',
      description: 'Small Headlines',
      fontInfo: 'Antique Olive Semibold 20px',
      className: 'font-brand text-xl font-semibold leading-snug',
    },
    {
      text: 'Paragraph 1',
      description: 'Large Body Text',
      fontInfo: 'Oakes Grotesk Regular 18px',
      className: 'paragraph-1',
    },
    {
      text: 'Paragraph 2',
      description: 'Standard Body Text',
      fontInfo: 'Inter Regular 16px',
      className: 'font-ui text-base font-normal leading-normal',
      showUnderline: true,
      showSemibold: true,
    },
    {
      text: 'Detail',
      description: 'Secondary Text',
      fontInfo: 'Oakes Grotesk Regular 14px',
      className: 'detail',
      showUnderline: true,
      showSemibold: true,
    },
    {
      text: 'Caption',
      description: 'Small Text',
      fontInfo: 'Oakes Grotesk Regular 12px',
      className: 'caption',
      showSemibold: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header del sistema */}
        <TypographyHeader />

        {/* Font Family Overview */}
        <Card className="p-6 border-neutral-200">
          <h3 className="font-brand text-2xl font-semibold mb-6 text-km0-blue-700">Familias de Fuentes Originales</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="p-4 border border-km0-blue-200 rounded-lg bg-km0-blue-50">
                <div className="font-brand text-2xl mb-2 text-km0-blue-700">Antique Olive</div>
                <div className="detail text-neutral-500">Original del diseño</div>
                <div className="caption text-neutral-600 mt-1">Brand • Headlines • Títulos</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50">
                <div className="font-ui text-2xl mb-2 text-neutral-700">Inter</div>
                <div className="detail text-neutral-500">Para UI/Interface</div>
                <div className="caption text-neutral-600 mt-1">UI • Interface • Navegación</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-4 border border-km0-beige-300 rounded-lg bg-km0-beige-50">
                <div className="font-body text-2xl mb-2 text-km0-blue-700">Oakes Grotesk</div>
                <div className="detail text-neutral-500">Original del diseño</div>
                <div className="caption text-neutral-600 mt-1">Body • Contenido • Lectura</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Typography Scale */}
        <Card className="p-6 border-neutral-200">
          <h3 className="font-brand text-2xl font-semibold mb-6 text-km0-blue-700">Escala Tipográfica</h3>
          <div className="space-y-6">
            {typographyExamples.map((example, index) => (
              <TypographyExample
                key={index}
                text={example.text}
                description={example.description}
                fontInfo={example.fontInfo}
                className={example.className}
                showUnderline={example.showUnderline}
                showSemibold={example.showSemibold}
              />
            ))}
          </div>
        </Card>

        {/* Text Effects */}
        <Card className="p-6 border-neutral-200">
          <h3 className="font-brand text-2xl font-semibold mb-6 text-km0-blue-700">Efectos de Texto</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-gradient-km0 font-brand text-3xl font-bold">
                KM0 LAB
              </div>
              <div className="caption text-neutral-500">Gradiente KM0</div>
              <div className="caption text-neutral-400">Blue → Coral</div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-gradient-gold font-brand text-3xl font-bold">
                +150 XP
              </div>
              <div className="caption text-neutral-500">Gradiente Gold</div>
              <div className="caption text-neutral-400">Para gaming</div>
            </div>

            <div className="text-center space-y-2">
              <div className="text-gradient-fire font-brand text-3xl font-bold">
                STREAK!
              </div>
              <div className="caption text-neutral-500">Gradiente Fire</div>
              <div className="caption text-neutral-400">Para logros</div>
            </div>
          </div>
        </Card>

        {/* Usage Guidelines */}
        <Card className="p-6 bg-km0-blue-50 border-km0-blue-200">
          <h3 className="font-brand text-2xl font-semibold mb-4 text-km0-blue-700">Guía de Uso</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-km0-blue-200">
                <h4 className="font-brand font-semibold text-km0-blue-700 mb-2">Antique Olive</h4>
                <div className="caption text-neutral-600 space-y-1">
                  <div>✓ Headlines principales</div>
                  <div>✓ Títulos de sección</div>
                  <div>✓ Elementos de marca</div>
                  <div>✓ CTAs importantes</div>
                  <div>✓ Display/Hero text</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-neutral-200">
                <h4 className="font-ui font-semibold text-neutral-700 mb-2">Inter</h4>
                <div className="caption text-neutral-600 space-y-1">
                  <div>✓ Navegación</div>
                  <div>✓ Botones</div>
                  <div>✓ Formularios</div>
                  <div>✓ UI elements</div>
                  <div>✓ Labels y inputs</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-neutral-200">
                <h4 className="font-body font-semibold text-neutral-700 mb-2">Oakes Grotesk</h4>
                <div className="caption text-neutral-600 space-y-1">
                  <div>✓ Párrafos largos</div>
                  <div>✓ Texto descriptivo</div>
                  <div>✓ Contenido principal</div>
                  <div>✓ Captions y details</div>
                  <div>✓ Body text general</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Fallback Notice - usando gaming-warning */}
        <Card className="p-6 bg-gaming-warning-50 border-gaming-warning-200">
          <h3 className="font-brand text-xl font-semibold mb-3 text-gaming-warning-800">⚠️ Nota sobre Fuentes</h3>
          <div className="space-y-3 text-gaming-warning-700">
            <p className="detail">
              Este sistema está configurado para usar las fuentes originales de tu diseño de Figma:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-white rounded border border-gaming-warning-200">
                <div className="font-semibold mb-1">Antique Olive Std</div>
                <div className="caption">Para brand y headlines</div>
              </div>
              <div className="p-3 bg-white rounded border border-gaming-warning-200">
                <div className="font-semibold mb-1">Oakes Grotesk</div>
                <div className="caption">Para body text</div>
              </div>
            </div>
            <p className="detail mt-3">
              Si estas fuentes no están disponibles en el sistema, se utilizarán las fuentes fallback (Georgia para Antique Olive, Helvetica/Arial para Oakes Grotesk).
            </p>
          </div>
        </Card>

        {/* Best Practices */}
        <Card className="p-6 bg-neutral-50 border-neutral-200">
          <h3 className="font-brand text-2xl font-semibold mb-4 text-neutral-800">Mejores Prácticas</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-km0-blue-700 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-semibold">Jerarquía con Antique Olive</p>
                <p className="detail text-neutral-600">Usa Antique Olive para crear una jerarquía visual distintiva en headlines y elementos de marca.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-km0-coral-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-semibold">Legibilidad con Oakes Grotesk</p>
                <p className="detail text-neutral-600">Oakes Grotesk ofrece excelente legibilidad para contenido largo y textos descriptivos.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-km0-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-semibold">UI Consistente con Inter</p>
                <p className="detail text-neutral-600">Inter mantiene la consistencia en elementos de interfaz, navegación y formularios.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Color Scale Reference */}
        <Card className="p-6 bg-gradient-to-r from-km0-blue-50 to-km0-beige-50 border-km0-blue-200">
          <h3 className="font-brand text-2xl font-semibold mb-4 text-[#174094]">Colores del Sistema</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="size-16 rounded-lg mx-auto border bg-km0-blue-700 border-km0-blue-300"></div>
              <div className="caption text-neutral-700">
                <div className="font-semibold text-blue-500">KM0 Blue 700</div>
                <div className="text-neutral-500">#174094</div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="size-16 rounded-lg mx-auto border bg-km0-beige-100 border-km0-beige-300"></div>
              <div className="caption text-neutral-700">
                <div className="font-semibold">KM0 Beige 100</div>
                <div className="text-neutral-500">#FFECD2</div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="size-16 rounded-lg mx-auto border bg-km0-coral-400 border-km0-coral-300"></div>
              <div className="caption text-neutral-700">
                <div className="font-semibold">KM0 Coral 400</div>
                <div className="text-neutral-500">#FF664D</div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="size-16 rounded-lg mx-auto border bg-km0-yellow-500 border-km0-yellow-300"></div>
              <div className="caption text-neutral-700">
                <div className="font-semibold">KM0 Yellow 500</div>
                <div className="text-neutral-500">#F5C542</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="detail text-neutral-600">
              Todos los colores siguen las escalas completas (50-900) definidas en el sistema KM0 LAB
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
