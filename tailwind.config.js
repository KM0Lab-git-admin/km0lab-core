/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}', // si "Colour.tsx" vive aquí
    './app/**/*.{js,ts,jsx,tsx,mdx}', // si usas el nuevo router
  ],
  theme: {
    screens: {
      'xs': '360px',
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      // Breakpoints que consideran altura; la altura es la restricción principal
      'xs-h': { raw: '(max-height: 699px)' }, // altura <700 => siempre XS
      'sm-h': { raw: '(min-width: 480px) and (min-height: 700px) and (max-height: 799px)' },
      'md-h': { raw: '(min-width: 768px) and (min-height: 800px) and (max-height: 899px)' },
      'lg-h': { raw: '(min-width: 1024px) and (min-height: 900px) and (max-height: 999px)' },
      'xl-h': { raw: '(min-width: 1280px) and (min-height: 1000px)' },
      // NOTA: Los breakpoints h700, h520, wideShort para Onboarding2
      // están definidos en globals.css como @custom-variant
    },
    extend: {
      maxHeight: {
        'slider-container': '558px',
        'slider-img': '65vh',
        'slider-img-tall': '75vh',
      },
      minWidth: {
        slide: '20rem', // 320px - ancho mínimo del slide
      },
      minHeight: {
        slide: '17.125rem', // 274px - alto mínimo del slide
      },
      fontFamily: {
        brand: ['Antique Olive', 'Antique Olive Std', 'Georgia', 'serif'],
        ui: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['Oakes Grotesk', 'Oakes', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        'km0-blue': {
          DEFAULT: '#174094',
          50: '#F0F4FD',
          100: '#DADEF8',
          200: '#B5C3F0',
          300: '#90A9E8',
          400: '#6B8FD0',
          500: '#4674B8',
          600: '#2B5AA0',
          700: '#174094',
          800: '#132A50',
          900: '#0F2040',
        },
        'km0-beige': {
          DEFAULT: '#FFECD2',
          50: '#FFF9F0',
          100: '#FFECD2',
          200: '#FDEEA9',
          300: '#FBDB7E',
          400: '#F9C853',
          500: '#F7B528',
          600: '#DCA223',
          700: '#C18F1E',
          800: '#A67C19',
          900: '#8B6914',
        },
        'km0-yellow': {
          DEFAULT: '#F5C542',
          50: '#FEFAF0',
          100: '#FDF5DA',
          200: '#FBE9B4',
          300: '#F9DD8E',
          400: '#F7D168',
          500: '#F5C542',
          600: '#DCA223',
          700: '#C18F1E',
          800: '#A67C19',
          900: '#8B6914',
        },
        'km0-coral': {
          DEFAULT: '#FF664D',
          50: '#FFE0DB',
          100: '#FFC2B7',
          200: '#FFA394',
          300: '#FF8570',
          400: '#FF664D',
          500: '#F73200',
          600: '#DC2C00',
          700: '#C12600',
          800: '#A62000',
          900: '#8B1A00',
        },
        'gaming-orange': {
          DEFAULT: '#FF8A00',
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#FF8A00',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        'orange-light': {
          DEFAULT: '#FFB347',
          50: '#FFF8F1',
          100: '#FEECDC',
          200: '#FDD5B9',
          300: '#FDBA8C',
          400: '#FFB347',
          500: '#FF9500',
          600: '#F97316',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        'orange-dark': {
          DEFAULT: '#CC6600',
          50: '#FEF3F0',
          100: '#FDE4DF',
          200: '#FABFB7',
          300: '#F69E91',
          400: '#F1826F',
          500: '#E6704F',
          600: '#CC6600',
          700: '#B85C00',
          800: '#9A4D00',
          900: '#7D3E00',
        },
        'neutral': {
          DEFAULT: '#525252',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#2D2D2D',
          900: '#1A1A1A',
        },
        'km0-success': {
          DEFAULT: '#C5F2C7',
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#C5F2C7',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#00CC66',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        'gaming-success': {
          DEFAULT: '#00CC66',
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#00CC66',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },
        'gaming-warning': {
          DEFAULT: '#F5C542',
          50: '#FEFAF0',
          100: '#FDF5DA',
          200: '#FBE9B4',
          300: '#F9DD8E',
          400: '#F7D168',
          500: '#F5C542',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        'gaming-fire': {
          DEFAULT: '#FF4444',
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#FF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        'gaming-gold': {
          DEFAULT: '#FFD700',
        },
      },
      spacing: {
        'header': '3rem', // 48px - altura del header
        'header-gap': '3rem', // 48px - gap entre elementos
        'logo-padding': '0.875rem', // 14px - padding del contenedor del logo
      },
      maxWidth: {
        'header': '24rem', // 384px - ancho del header
        'slide': '20rem', // 320px - ancho máximo de la imagen del slide
        'slider-count-lg': '28rem', // 448px
        'slider-count-xl': '32rem', // 512px
      },
      width: {
        'logo': '9.1875rem', // 147px - ancho del logo
        'slide': '20rem', // 320px - ancho fijo del slide
        'slider-count-lg': '28rem', // 448px
        'slider-count-xl': '32rem', // 512px
      },
      height: {
        logo: '2.125rem', // 34px - altura del logo
        'slide-container': '475px', // 475px - altura del contenedor del slide
      },
      maxHeight: {
        slide: '14rem', // 224px - alto máximo de la imagen del slide (reducido para evitar scroll)
      },
      backgroundImage: {
        'gradient-app': 'linear-gradient(135deg, rgba(144, 169, 232, 0.4) 0%, rgba(255, 236, 210, 0.4) 100%)',
        'gradient-white-beige': 'linear-gradient(180deg, #ffffff 0%, #FFECD2 100%)',
      },
      animationDelay: {
        200: '0.2s',
        400: '0.4s',
      },
    },
  },
  plugins: [],
};
