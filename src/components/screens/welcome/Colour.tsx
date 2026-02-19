import {
  AlertTriangle,
  CheckCircle,
  Crown,
  Eye,
  Lightbulb,
  Palette,
  Star,
  Trophy,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/primitives/badge';
import { Button } from '@/components/ui/primitives/button';
import { Card } from '@/components/ui/primitives/card';

function ColorScale({
  title,
  colors,
  primaryIndex,
  icon: Icon,
}: {
  title: string;
  colors: Array<{ shade: string; hex: string; name: string; nameCSS: string; hexCSS: string }>;
  primaryIndex: number;
  icon: any;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="size-6 text-km0-blue" />
        <h3 className="font-brand text-xl">{title}</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
        {colors.map((color, index) => (
          <div key={color.shade} className="relative group">
            <div
              className="h-16 w-full rounded-lg border shadow-sm cursor-pointer transform transition-all hover:scale-105 hover:shadow-md"
              style={{ backgroundColor: color.hexCSS }}
            />
            {index === primaryIndex && (
              <div className="absolute -top-1 -right-1">
                <Crown className="size-5 text-yellow-500 bg-white rounded-full p-1 border-2 border-yellow-400" />
              </div>
            )}
            <div className="mt-2 text-center">
              <div className="font-mono text-xs font-bold text-neutral-700">
                {color.shade}
              </div>
              <div className="text-xs text-neutral-600 mt-1 font-medium">
                {color.name}
              </div>
              <div className="text-xs text-neutral-600 mt-1 font-medium">
                {color.nameCSS}
              </div>
              <div className="text-xs text-neutral-600 mt-1 font-medium">
                {color.hexCSS}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
          <Crown className="size-3 mr-1" />
          Principal:
          {' '}
          {colors[primaryIndex]?.shade}
          {' '}
          (
          {colors[primaryIndex]?.hex}
          )
        </Badge>
      </div>
    </Card>
  );
}

function ComponentExample({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-sm text-neutral-700">
        {title}
      </h4>
      <div className="flex gap-3 flex-wrap">{children}</div>
    </div>
  );
}

export default function ColorPaletteGuide() {
  // === PALETA PRINCIPAL ===
  const km0BlueScale = [
    { shade: '50', hex: '#F0F4FD', name: 'Lightest', nameCSS: 'km0-blue-50', hexCSS: '#F0F4FD' },
    { shade: '100', hex: '#DADEF8', name: 'Very Light', nameCSS: 'km0-blue-100', hexCSS: '#DADEF8' },
    { shade: '200', hex: '#B5C3F0', name: 'Light', nameCSS: 'km0-blue-200', hexCSS: '#B5C3F0' },
    { shade: '300', hex: '#90A9E8', name: 'Medium Light', nameCSS: 'km0-blue-300', hexCSS: '#90A9E8' },
    { shade: '400', hex: '#6B8FD0', name: 'Medium', nameCSS: 'km0-blue-400', hexCSS: '#6B8FD0' },
    { shade: '500', hex: '#4674B8', name: 'Medium Dark', nameCSS: 'km0-blue-500', hexCSS: '#4674B8' },
    { shade: '600', hex: '#2B5AA0', name: 'Dark', nameCSS: 'km0-blue-600', hexCSS: '#2B5AA0' },
    { shade: '700', hex: '#174094', name: 'Principal', nameCSS: 'km0-blue-700', hexCSS: '#174094' },
    { shade: '800', hex: '#132A50', name: 'Very Dark', nameCSS: 'km0-blue-800', hexCSS: '#132A50' },
    { shade: '900', hex: '#0F2040', name: 'Darkest', nameCSS: 'km0-blue-900', hexCSS: '#0F2040' },
  ];

  const km0BeigeScale = [
    { shade: '50', hex: 'var(--km0-beige-50)', name: 'Lightest', nameCSS: 'km0-beige-50', hexCSS: '#FFF9F0' },
    { shade: '100', hex: 'var(--km0-beige-100)', name: 'Principal', nameCSS: 'km0-beige-100', hexCSS: '#FFECD2' },
    { shade: '200', hex: 'var(--km0-beige-200)', name: 'Light', nameCSS: 'km0-beige-200', hexCSS: '#FDEEA9' },
    { shade: '300', hex: 'var(--km0-beige-300)', name: 'Medium Light', nameCSS: 'km0-beige-300', hexCSS: '#FBDB7E' },
    { shade: '400', hex: 'var(--km0-beige-400)', name: 'Medium', nameCSS: 'km0-beige-400', hexCSS: '#F9C853' },
    { shade: '500', hex: 'var(--km0-beige-500)', name: 'Medium Dark', nameCSS: 'km0-beige-500', hexCSS: '#F7B528' },
    { shade: '600', hex: 'var(--km0-beige-600)', name: 'Dark', nameCSS: 'km0-beige-600', hexCSS: '#DCA223' },
    { shade: '700', hex: 'var(--km0-beige-700)', name: 'Very Dark', nameCSS: 'km0-beige-700', hexCSS: '#C18F1E' },
    { shade: '800', hex: 'var(--km0-beige-800)', name: 'Darker', nameCSS: 'km0-beige-800', hexCSS: '#A67C19' },
    { shade: '900', hex: 'var(--km0-beige-900)', name: 'Darkest', nameCSS: 'km0-beige-900', hexCSS: '#8B6914' },
  ];

  const km0YellowScale = [
    { shade: '50', hex: 'var(--km0-yellow-50)', name: 'Lightest', nameCSS: 'km0-yellow-50', hexCSS: '#FEFAF0' },
    { shade: '100', hex: 'var(--km0-yellow-100)', name: 'Very Light', nameCSS: 'km0-yellow-100', hexCSS: '#FDF5DA' },
    { shade: '200', hex: 'var(--km0-yellow-200)', name: 'Light', nameCSS: 'km0-yellow-200', hexCSS: '#FBE9B4' },
    { shade: '300', hex: 'var(--km0-yellow-300)', name: 'Medium Light', nameCSS: 'km0-yellow-300', hexCSS: '#F9DD8E' },
    { shade: '400', hex: 'var(--km0-yellow-400)', name: 'Medium', nameCSS: 'km0-yellow-400', hexCSS: '#F7D168' },
    { shade: '500', hex: 'var(--km0-yellow-500)', name: 'Principal', nameCSS: 'km0-yellow-500', hexCSS: '#F5C542' },
    { shade: '600', hex: 'var(--km0-yellow-600)', name: 'Medium Dark', nameCSS: 'km0-yellow-600', hexCSS: '#DCA223' },
    { shade: '700', hex: 'var(--km0-yellow-700)', name: 'Dark', nameCSS: 'km0-yellow-700', hexCSS: '#C18F1E' },
    { shade: '800', hex: 'var(--km0-yellow-800)', name: 'Very Dark', nameCSS: 'km0-yellow-800', hexCSS: '#A67C19' },
    { shade: '900', hex: 'var(--km0-yellow-900)', name: 'Darkest', nameCSS: 'km0-yellow-900', hexCSS: '#8B6914' },
  ];

  const km0CoralScale = [
    { shade: '50', hex: 'var(--km0-coral-50)', name: 'Lightest', nameCSS: 'km0-coral-50', hexCSS: '#FFE0DB' },
    { shade: '100', hex: 'var(--km0-coral-100)', name: 'Very Light', nameCSS: 'km0-coral-100', hexCSS: '#FFC2B7' },
    { shade: '200', hex: 'var(--km0-coral-200)', name: 'Light', nameCSS: 'km0-coral-200', hexCSS: '#FFA394' },
    { shade: '300', hex: 'var(--km0-coral-300)', name: 'Medium Light', nameCSS: 'km0-coral-300', hexCSS: '#FF8570' },
    { shade: '400', hex: 'var(--km0-coral-400)', name: 'Principal', nameCSS: 'km0-coral-400', hexCSS: '#FF664D' },
    { shade: '500', hex: 'var(--km0-coral-500)', name: 'Medium', nameCSS: 'km0-coral-500', hexCSS: '#F73200' },
    { shade: '600', hex: 'var(--km0-coral-600)', name: 'Medium Dark', nameCSS: 'km0-coral-600', hexCSS: '#DC2C00' },
    { shade: '700', hex: 'var(--km0-coral-700)', name: 'Dark', nameCSS: 'km0-coral-700', hexCSS: '#C12600' },
    { shade: '800', hex: 'var(--km0-coral-800)', name: 'Very Dark', nameCSS: 'km0-coral-800', hexCSS: '#A62000' },
    { shade: '900', hex: 'var(--km0-coral-900)', name: 'Darkest', nameCSS: 'km0-coral-900', hexCSS: '#8B1A00' },
  ];

  // === COMPLEMENTARIOS NARANJAS ===
  const orangeScale = [
    { shade: '50', hex: 'var(--gaming-orange-50)', name: 'Lightest', nameCSS: 'gaming-orange-50', hexCSS: '#FFF7ED' },
    { shade: '100', hex: 'var(--gaming-orange-100)', name: 'Very Light', nameCSS: 'gaming-orange-100', hexCSS: '#FFEDD5' },
    { shade: '200', hex: 'var(--gaming-orange-200)', name: 'Light', nameCSS: 'gaming-orange-200', hexCSS: '#FED7AA' },
    { shade: '300', hex: 'var(--gaming-orange-300)', name: 'Medium Light', nameCSS: 'gaming-orange-300', hexCSS: '#FDBA74' },
    { shade: '400', hex: 'var(--gaming-orange-400)', name: 'Medium', nameCSS: 'gaming-orange-400', hexCSS: '#FB923C' },
    { shade: '500', hex: 'var(--gaming-orange-500)', name: 'Principal', nameCSS: 'gaming-orange-500', hexCSS: '#FF8A00' },
    { shade: '600', hex: 'var(--gaming-orange-600)', name: 'Medium Dark', nameCSS: 'gaming-orange-600', hexCSS: '#EA580C' },
    { shade: '700', hex: 'var(--gaming-orange-700)', name: 'Dark', nameCSS: 'gaming-orange-700', hexCSS: '#C2410C' },
    { shade: '800', hex: 'var(--gaming-orange-800)', name: 'Very Dark', nameCSS: 'gaming-orange-800', hexCSS: '#9A3412' },
    { shade: '900', hex: 'var(--gaming-orange-900)', name: 'Darkest', nameCSS: 'gaming-orange-900', hexCSS: '#7C2D12' },
  ];

  const orangeLightScale = [
    { shade: '50', hex: 'var(--orange-light-50)', name: 'Lightest', nameCSS: 'orange-light-50', hexCSS: '#FFF8F1' },
    { shade: '100', hex: 'var(--orange-light-100)', name: 'Very Light', nameCSS: 'orange-light-100', hexCSS: '#FEECDC' },
    { shade: '200', hex: 'var(--orange-light-200)', name: 'Light', nameCSS: 'orange-light-200', hexCSS: '#FDD5B9' },
    { shade: '300', hex: 'var(--orange-light-300)', name: 'Medium Light', nameCSS: 'orange-light-300', hexCSS: '#FDBA8C' },
    { shade: '400', hex: 'var(--orange-light-400)', name: 'Principal', nameCSS: 'orange-light-400', hexCSS: '#FFB347' },
    { shade: '500', hex: 'var(--orange-light-500)', name: 'Medium', nameCSS: 'orange-light-500', hexCSS: '#FF9500' },
    { shade: '600', hex: 'var(--orange-light-600)', name: 'Medium Dark', nameCSS: 'orange-light-600', hexCSS: '#F97316' },
    { shade: '700', hex: 'var(--orange-light-700)', name: 'Dark', nameCSS: 'orange-light-700', hexCSS: '#C2410C' },
    { shade: '800', hex: 'var(--orange-light-800)', name: 'Very Dark', nameCSS: 'orange-light-800', hexCSS: '#9A3412' },
    { shade: '900', hex: 'var(--orange-light-900)', name: 'Darkest', nameCSS: 'orange-light-900', hexCSS: '#7C2D12' },
  ];

  const orangeDarkScale = [
    { shade: '50', hex: 'var(--orange-dark-50)', name: 'Lightest', nameCSS: 'orange-dark-50', hexCSS: '#FEF3F0' },
    { shade: '100', hex: 'var(--orange-dark-100)', name: 'Very Light', nameCSS: 'orange-dark-100', hexCSS: '#FDE4DF' },
    { shade: '200', hex: 'var(--orange-dark-200)', name: 'Light', nameCSS: 'orange-dark-200', hexCSS: '#FABFB7' },
    { shade: '300', hex: 'var(--orange-dark-300)', name: 'Medium Light', nameCSS: 'orange-dark-300', hexCSS: '#F69E91' },
    { shade: '400', hex: 'var(--orange-dark-400)', name: 'Medium', nameCSS: 'orange-dark-400', hexCSS: '#F1826F' },
    { shade: '500', hex: 'var(--orange-dark-500)', name: 'Medium Dark', nameCSS: 'orange-dark-500', hexCSS: '#E6704F' },
    { shade: '600', hex: 'var(--orange-dark-600)', name: 'Principal', nameCSS: 'orange-dark-600', hexCSS: '#CC6600' },
    { shade: '700', hex: 'var(--orange-dark-700)', name: 'Dark', nameCSS: 'orange-dark-700', hexCSS: '#B85C00' },
    { shade: '800', hex: 'var(--orange-dark-800)', name: 'Very Dark', nameCSS: 'orange-dark-800', hexCSS: '#9A4D00' },
    { shade: '900', hex: 'var(--orange-dark-900)', name: 'Darkest', nameCSS: 'orange-dark-900', hexCSS: '#7D3E00' },
  ];

  // === NEUTROS GRISES ===
  const neutralScale = [
    { shade: '50', hex: 'var(--neutral-50)', name: 'Lightest', nameCSS: 'neutral-50', hexCSS: '#FAFAFA' },
    { shade: '100', hex: 'var(--neutral-100)', name: 'Very Light', nameCSS: 'neutral-100', hexCSS: '#F5F5F5' },
    { shade: '200', hex: 'var(--neutral-200)', name: 'Light', nameCSS: 'neutral-200', hexCSS: '#E5E5E5' },
    { shade: '300', hex: 'var(--neutral-300)', name: 'Medium Light', nameCSS: 'neutral-300', hexCSS: '#D4D4D4' },
    { shade: '400', hex: 'var(--neutral-400)', name: 'Medium', nameCSS: 'neutral-400', hexCSS: '#A3A3A3' },
    { shade: '500', hex: 'var(--neutral-500)', name: 'Medium Dark', nameCSS: 'neutral-500', hexCSS: '#737373' },
    { shade: '600', hex: 'var(--neutral-600)', name: 'Principal', nameCSS: 'neutral-600', hexCSS: '#525252' },
    { shade: '700', hex: 'var(--neutral-700)', name: 'Dark', nameCSS: 'neutral-700', hexCSS: '#404040' },
    { shade: '800', hex: 'var(--neutral-800)', name: 'Very Dark', nameCSS: 'neutral-800', hexCSS: '#2D2D2D' },
    { shade: '900', hex: 'var(--neutral-900)', name: 'Darkest', nameCSS: 'neutral-900', hexCSS: '#1A1A1A' },
  ];

  // === COLORES DE FEEDBACK ===
  const successScale = [
    { shade: '50', hex: 'var(--gaming-success-50)', name: 'Lightest', nameCSS: 'gaming-success-50', hexCSS: '#F0FDF4' },
    { shade: '100', hex: 'var(--gaming-success-100)', name: 'Very Light', nameCSS: 'gaming-success-100', hexCSS: '#DCFCE7' },
    { shade: '200', hex: 'var(--gaming-success-200)', name: 'Light', nameCSS: 'gaming-success-200', hexCSS: '#BBF7D0' },
    { shade: '300', hex: 'var(--gaming-success-300)', name: 'Medium Light', nameCSS: 'gaming-success-300', hexCSS: '#86EFAC' },
    { shade: '400', hex: 'var(--gaming-success-400)', name: 'Medium', nameCSS: 'gaming-success-400', hexCSS: '#4ADE80' },
    { shade: '500', hex: 'var(--gaming-success-500)', name: 'Principal', nameCSS: 'gaming-success-500', hexCSS: '#00CC66' },
    { shade: '600', hex: 'var(--gaming-success-600)', name: 'Medium Dark', nameCSS: 'gaming-success-600', hexCSS: '#16A34A' },
    { shade: '700', hex: 'var(--gaming-success-700)', name: 'Dark', nameCSS: 'gaming-success-700', hexCSS: '#15803D' },
    { shade: '800', hex: 'var(--gaming-success-800)', name: 'Very Dark', nameCSS: 'gaming-success-800', hexCSS: '#166534' },
    { shade: '900', hex: 'var(--gaming-success-900)', name: 'Darkest', nameCSS: 'gaming-success-900', hexCSS: '#14532D' },
  ];

  const warningScale = [
    { shade: '50', hex: 'var(--gaming-warning-50)', name: 'Lightest', nameCSS: 'gaming-warning-50', hexCSS: '#FEFAF0' },
    { shade: '100', hex: 'var(--gaming-warning-100)', name: 'Very Light', nameCSS: 'gaming-warning-100', hexCSS: '#FDF5DA' },
    { shade: '200', hex: 'var(--gaming-warning-200)', name: 'Light', nameCSS: 'gaming-warning-200', hexCSS: '#FBE9B4' },
    { shade: '300', hex: 'var(--gaming-warning-300)', name: 'Medium Light', nameCSS: 'gaming-warning-300', hexCSS: '#F9DD8E' },
    { shade: '400', hex: 'var(--gaming-warning-400)', name: 'Medium', nameCSS: 'gaming-warning-400', hexCSS: '#F7D168' },
    { shade: '500', hex: 'var(--gaming-warning-500)', name: 'Principal', nameCSS: 'gaming-warning-500', hexCSS: '#F5C542' },
    { shade: '600', hex: 'var(--gaming-warning-600)', name: 'Medium Dark', nameCSS: 'gaming-warning-600', hexCSS: '#DCA223' },
    { shade: '700', hex: 'var(--gaming-warning-700)', name: 'Dark', nameCSS: 'gaming-warning-700', hexCSS: '#C18F1E' },
    { shade: '800', hex: 'var(--gaming-warning-800)', name: 'Very Dark', nameCSS: 'gaming-warning-800', hexCSS: '#A67C19' },
    { shade: '900', hex: 'var(--gaming-warning-900)', name: 'Darkest', nameCSS: 'gaming-warning-900', hexCSS: '#8B6914' },
  ];

  const errorScale = [
    { shade: '50', hex: 'var(--gaming-fire-50)', name: 'Lightest', nameCSS: 'gaming-fire-50', hexCSS: '#FEF2F2' },
    { shade: '100', hex: 'var(--gaming-fire-100)', name: 'Very Light', nameCSS: 'gaming-fire-100', hexCSS: '#FEE2E2' },
    { shade: '200', hex: 'var(--gaming-fire-200)', name: 'Light', nameCSS: 'gaming-fire-200', hexCSS: '#FECACA' },
    { shade: '300', hex: 'var(--gaming-fire-300)', name: 'Medium Light', nameCSS: 'gaming-fire-300', hexCSS: '#FCA5A5' },
    { shade: '400', hex: 'var(--gaming-fire-400)', name: 'Medium', nameCSS: 'gaming-fire-400', hexCSS: '#F87171' },
    { shade: '500', hex: 'var(--gaming-fire-500)', name: 'Principal', nameCSS: 'gaming-fire-500', hexCSS: '#FF4444' },
    { shade: '600', hex: 'var(--gaming-fire-600)', name: 'Medium Dark', nameCSS: 'gaming-fire-600', hexCSS: '#DC2626' },
    { shade: '700', hex: 'var(--gaming-fire-700)', name: 'Dark', nameCSS: 'gaming-fire-700', hexCSS: '#B91C1C' },
    { shade: '800', hex: 'var(--gaming-fire-800)', name: 'Very Dark', nameCSS: 'gaming-fire-800', hexCSS: '#991B1B' },
    { shade: '900', hex: 'var(--gaming-fire-900)', name: 'Darkest', nameCSS: 'gaming-fire-900', hexCSS: '#7F1D1D' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Palette className="size-8 text-km0-blue" />
          <h1 className="font-brand">
            KM0 LAB - Escalas de Colores Completas
          </h1>
        </div>
        <p className="text-neutral-600 max-w-3xl mx-auto">
          Sistema completo de escalas de color (50-950)
          organizadas por categorías. El color
          {' '}
          <Crown className="inline size-4 text-yellow-600" />
          {' '}
          <strong>principal</strong>
          {' '}
          de cada escala está marcado
          con corona.
        </p>
      </div>

      {/* PALETA PRINCIPAL */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-brand text-2xl mb-2">
            🎨 PALETA PRINCIPAL
          </h2>
          <p className="text-neutral-600">
            Los 4 colores fundamentales del sistema KM0 LAB
          </p>
        </div>

        <ColorScale
          title="KM0 Blue - Azul Corporativo"
          colors={km0BlueScale}
          primaryIndex={7}
          icon={Star}
        />

        <ColorScale
          title="KM0 Beige - Calidez Local"
          colors={km0BeigeScale}
          primaryIndex={1}
          icon={Star}
        />

        <ColorScale
          title="KM0 Yellow - Acento Brillante"
          colors={km0YellowScale}
          primaryIndex={5}
          icon={Star}
        />

        <ColorScale
          title="KM0 Coral - Acción Vibrante"
          colors={km0CoralScale}
          primaryIndex={4}
          icon={Star}
        />
      </div>

      {/* COMPLEMENTARIOS NARANJAS */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-brand text-2xl mb-2">
            🔥 COMPLEMENTARIOS NARANJAS
          </h2>
          <p className="text-neutral-600">
            Colores gaming y gamificación que complementan el
            azul principal
          </p>
        </div>

        <ColorScale
          title="Gaming Orange - Energía Gaming"
          colors={orangeScale}
          primaryIndex={5}
          icon={Trophy}
        />

        <ColorScale
          title="Orange Light - Suavidad Cálida"
          colors={orangeLightScale}
          primaryIndex={4}
          icon={Trophy}
        />

        <ColorScale
          title="Orange Dark - Contraste Intenso"
          colors={orangeDarkScale}
          primaryIndex={6}
          icon={Trophy}
        />
      </div>

      {/* NEUTROS GRISES */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-brand text-2xl mb-2">
            ⚫ NEUTROS GRISES
          </h2>
          <p className="text-neutral-600">
            Escala neutra para textos, bordes y elementos de
            apoyo
          </p>
        </div>

        <ColorScale
          title="Neutral Gray - Equilibrio Universal"
          colors={neutralScale}
          primaryIndex={6}
          icon={Eye}
        />
      </div>

      {/* COLORES DE FEEDBACK */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-brand text-2xl mb-2">
            🚦 COLORES DE FEEDBACK Y ESTADO
          </h2>
          <p className="text-neutral-600">
            Estados de interfaz: éxito, advertencia y error
          </p>
        </div>

        <ColorScale
          title="Success Green - Estados Positivos"
          colors={successScale}
          primaryIndex={5}
          icon={CheckCircle}
        />

        <ColorScale
          title="Warning Yellow - Atención Requerida"
          colors={warningScale}
          primaryIndex={5}
          icon={AlertTriangle}
        />

        <ColorScale
          title="Error Red - Estados Críticos"
          colors={errorScale}
          primaryIndex={5}
          icon={XCircle}
        />
      </div>

      {/* EJEMPLOS DE USO */}
      <Card className="p-6">
        <h2 className="font-brand mb-6 flex items-center gap-2">
          <Eye className="size-5 text-km0-coral" />
          Ejemplos de Uso en Componentes
        </h2>
        <div className="space-y-8">
          <ComponentExample title="Botones con Escalas Principales">
            <Button className="bg-blue-700 hover:bg-km0-blue-800 text-white">
              KM0 Blue Principal
            </Button>
            <Button className="bg-km0-coral-400 hover:bg-km0-coral-500 text-white">
              Coral Principal
            </Button>
            <Button className="bg-km0-yellow-500 hover:bg-km0-yellow-600 text-neutral-900">
              Yellow Principal
            </Button>
            <Button className="bg-neutral-600 hover:bg-neutral-700 text-white">
              Neutral Principal
            </Button>
          </ComponentExample>

          <ComponentExample title="Cards con Escalas Gaming">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-lg text-white max-w-48">
              <h4 className="font-semibold mb-2">
                Achievement
              </h4>
              <p className="text-sm opacity-90">
                Orange Gaming Principal
              </p>
              <Badge className="bg-orange-100 text-orange-800 mt-2">
                +150 XP
              </Badge>
            </div>
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 p-4 rounded-lg text-white max-w-48">
              <h4 className="font-semibold mb-2">Reward</h4>
              <p className="text-sm opacity-90">
                Orange Light Principal
              </p>
              <Badge className="bg-white text-orange-600 mt-2">
                Nuevo
              </Badge>
            </div>
          </ComponentExample>

          <ComponentExample title="Estados de Feedback">
            <div className="flex gap-3">
              <div className="bg-gaming-success text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <CheckCircle className="size-4" />
                <span>Éxito Principal</span>
              </div>
              <div className="bg-km0-yellow text-neutral-900 px-4 py-2 rounded-lg flex items-center gap-2">
                <AlertTriangle className="size-4" />
                <span>Warning Principal</span>
              </div>
              <div className="bg-gaming-fire text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <XCircle className="size-4" />
                <span>Error Principal</span>
              </div>
            </div>
          </ComponentExample>
        </div>
      </Card>

      {/* GUÍA RÁPIDA DE REFERENCIA */}
      <Card className="p-6 bg-gradient-to-r from-km0-blue-50 to-km0-beige-50">
        <h2 className="font-brand mb-6 flex items-center gap-2">
          <Lightbulb className="size-5 text-km0-yellow-500" />
          Guía Rápida de Colores Principales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="size-16 [background-color:var(--km0-blue-700)] rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Crown className="size-8 text-white" />
            </div>
            <h4 className="font-semibold text-km0-blue-700">Blue Principal</h4>
            <p className="text-sm text-neutral-600">#174094</p>
            <p className="text-xs text-neutral-500">
              Principal Brand
            </p>
          </div>
          <div className="text-center">
            <div className="size-16 [background-color:var(--km0-beige-100)] border-2 [border-color:var(--km0-beige-300)] rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Crown className="size-8 text-red-700" />
            </div>
            <h4 className="font-semibold">KM0 Beige 100</h4>
            <p className="text-sm text-neutral-600">#FFECD2</p>
            <p className="text-xs text-neutral-500">
              Principal Warmth
            </p>
          </div>
          <div className="text-center">
            <div className="size-16 [background-color:var(--km0-yellow-500)] rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Crown className="size-8 text-neutral-900" />
            </div>
            <h4 className="font-semibold">KM0 Yellow 500</h4>
            <p className="text-sm text-neutral-600">#F5C542</p>
            <p className="text-xs text-neutral-500">
              Principal Accent
            </p>
          </div>
          <div className="text-center">
            <div className="size-16 [background-color:var(--km0-coral-400)] rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Crown className="size-8 text-white" />
            </div>
            <h4 className="font-semibold">KM0 Coral 400</h4>
            <p className="text-sm text-neutral-600">#FF664D</p>
            <p className="text-xs text-neutral-500">
              Principal Action
            </p>
          </div>
        </div>
      </Card>

      {/* Footer con resumen */}
      <div className="text-center p-6 bg-white rounded-lg border">
        <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
          <div className="flex items-center gap-1">
            <div className="size-4 bg-km0-blue-700 rounded-full"></div>
            <span>
              <strong>4 Escalas</strong>
              {' '}
              Principales
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="size-4 bg-gaming-orange rounded-full"></div>
            <span>
              <strong>3 Escalas</strong>
              {' '}
              Naranjas
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="size-4 bg-neutral-600 rounded-full"></div>
            <span>
              <strong>1 Escala</strong>
              {' '}
              Neutra
            </span>
          </div>
          <div className="flex items-center gap-1">
            <div className="size-4 bg-gaming-success rounded-full"></div>
            <span>
              <strong>3 Escalas</strong>
              {' '}
              Feedback
            </span>
          </div>
        </div>
        <p className="text-xs text-neutral-500 mt-2">
          <strong>
            Total: 110 colores organizados en 11 escalas
            completas (50-900)
          </strong>
        </p>
      </div>
    </div>
  );
}
