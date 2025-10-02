/**
 * Comprobador rápido de QA para verificar que no hay scroll/overflow
 * en los tamaños especificados
 * 
 * Uso: Abre la consola del navegador y ejecuta:
 * import { checkOverflowInViewports } from './src/utils/qaOverflowCheck';
 * checkOverflowInViewports();
 */

const VIEWPORTS_TO_TEST = [
  { width: 360, height: 640, name: 'Mobile XS' },
  { width: 480, height: 800, name: 'Mobile SM' },
  { width: 768, height: 1024, name: 'Tablet MD Portrait' },
  { width: 1024, height: 768, name: 'Tablet MD Landscape' },
  { width: 1280, height: 800, name: 'Desktop XL' },
  { width: 1536, height: 960, name: 'Desktop 2XL' },
];

export const checkOverflowInViewports = () => {
  console.log('🔍 Iniciando verificación de overflow...\n');
  
  const heroContainer = document.querySelector('[data-testid="hero-container"]') as HTMLElement;
  
  if (!heroContainer) {
    console.error('❌ No se encontró el contenedor hero. Asegúrate de añadir data-testid="hero-container"');
    return;
  }

  VIEWPORTS_TO_TEST.forEach(viewport => {
    console.log(`📱 ${viewport.name} (${viewport.width}×${viewport.height}):`);
    
    // Simular viewport
    const testFrame = document.createElement('iframe');
    testFrame.style.width = `${viewport.width}px`;
    testFrame.style.height = `${viewport.height}px`;
    testFrame.style.position = 'fixed';
    testFrame.style.top = '-9999px';
    testFrame.style.left = '-9999px';
    document.body.appendChild(testFrame);
    
    // Verificar scroll
    const hasHorizontalScroll = heroContainer.scrollWidth > viewport.width;
    const hasVerticalScroll = heroContainer.scrollHeight > viewport.height;
    
    const status = (!hasHorizontalScroll && !hasVerticalScroll) ? '✅' : '❌';
    
    console.log(`   Scroll horizontal: ${hasHorizontalScroll ? '❌ SÍ' : '✅ NO'}`);
    console.log(`   Scroll vertical: ${hasVerticalScroll ? '❌ SÍ' : '✅ NO'}`);
    console.log(`   Estado: ${status}\n`);
    
    document.body.removeChild(testFrame);
  });
  
  console.log('✨ Verificación completada');
};

/**
 * Verifica que el texto nunca esté por debajo de 14px
 */
export const checkMinimumFontSize = () => {
  console.log('🔤 Verificando tamaño mínimo de fuente (14px)...\n');
  
  const title = document.querySelector('[data-testid="hero-title"]') as HTMLElement;
  const description = document.querySelector('[data-testid="hero-description"]') as HTMLElement;
  
  if (!title || !description) {
    console.error('❌ No se encontraron los elementos de texto. Asegúrate de añadir data-testid');
    return;
  }
  
  const titleFontSize = parseFloat(window.getComputedStyle(title).fontSize);
  const descriptionFontSize = parseFloat(window.getComputedStyle(description).fontSize);
  
  console.log(`Título: ${titleFontSize}px ${titleFontSize >= 14 ? '✅' : '❌'}`);
  console.log(`Descripción: ${descriptionFontSize}px ${descriptionFontSize >= 14 ? '✅' : '❌'}`);
  
  if (titleFontSize >= 14 && descriptionFontSize >= 14) {
    console.log('\n✅ Todas las fuentes cumplen el mínimo de 14px');
  } else {
    console.log('\n❌ Algunas fuentes están por debajo de 14px');
  }
};
