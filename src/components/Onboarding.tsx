'use client';

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; // Asumiendo que existe, si no, lo ajustaremos

// Definición de slides
const slides = [
  {
    id: 1,
    title: "BIENVENIDO A KM0 LAB",
    subtitle: "Tu comercio local, más cerca que nunca.",
    image: "/images/glovo-style-welcome.png",
    color: "bg-km0-yellow"
  },
  {
    id: 2,
    title: "DESCUBRE TIENDAS",
    subtitle: "Explora los mejores productos de tu barrio.",
    image: "/images/glovo-style-discover.png",
    color: "bg-km0-blue-100"
  },
  {
    id: 3,
    title: "CONECTA CON VECINOS",
    subtitle: "Forma parte de una comunidad activa y solidaria.",
    image: "/images/glovo-style-connect.png",
    color: "bg-km0-coral-100"
  },
  {
    id: 4,
    title: "ESPACIOS PÚBLICOS",
    subtitle: "Disfruta y cuida los espacios de todos.",
    image: "/images/glovo-style-public.png",
    color: "bg-km0-success-100"
  },
  {
    id: 5,
    title: "EMPIEZA AHORA",
    subtitle: "Únete a la revolución del comercio local.",
    image: "/images/glovo-style-start.png",
    color: "bg-km0-yellow"
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const skipOnboarding = () => {
    // Lógica para saltar onboarding (ej. guardar en localStorage y redirigir)
    console.log("Skip Onboarding");
  };

  const activeSlide = slides[currentSlide];

  return (
    <div className="min-h-screen bg-white flex flex-col font-ui relative overflow-hidden">
      
      {/* Background Decorative Elements (Glovo Style - Organic Shapes) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-[20%] -right-[20%] w-[70%] h-[70%] rounded-full opacity-20 blur-3xl transition-colors duration-700 ${activeSlide.color}`}></div>
        <div className={`absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full opacity-20 blur-3xl transition-colors duration-700 ${activeSlide.color}`}></div>
      </div>

      {/* Fixed Header - Full Width Blue Background */}
      <header className="fixed top-0 left-0 w-full z-50 bg-km0-blue flex justify-center items-center py-4 shadow-md h-header">
        <div className="w-32 md:w-40">
          {/* Asegúrate de que logo.png exista en public/images/ o ajusta la ruta */}
          <img src="/images/Logo1.png" alt="KM0 Lab" className="w-full h-auto block" />
        </div>
      </header>

      {/* Main Content - Added padding-top to account for fixed header */}
      <main className="flex-1 flex flex-col items-center px-6 relative z-10 w-full max-w-md mx-auto pt-24">
        
        {/* Image Container - Card Style */}
        <div className="relative w-full aspect-square mb-6 md:mb-8 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-2xl p-2.5 shadow-sm border border-white/30 mt-4">
          <div className="relative w-full h-full">
             <img 
                src={activeSlide.image} 
                alt={activeSlide.title}
                className={cn(
                  "w-full h-full object-cover rounded-xl drop-shadow-xl transition-all duration-700 ease-out transform",
                  isAnimating ? "scale-95 opacity-80" : "scale-100 opacity-100"
                )}
              />
          </div>
          
          {/* XP Badge Example (from reference) */}
          <div className="absolute bottom-4 left-4 bg-km0-coral text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            + 10 XP
          </div>
        </div>

        {/* Text Content */}
        <div className={cn(
          "text-center space-y-3 transition-all duration-500 transform",
          isAnimating ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
        )}>
          <h1 className="text-2xl md:text-3xl font-brand font-bold text-gray-900 uppercase tracking-tight">
            {activeSlide.title}
          </h1>
          <p className="text-gray-500 text-base md:text-lg font-body leading-relaxed max-w-xs mx-auto">
            {activeSlide.subtitle}
          </p>
        </div>

      </main>

      {/* Footer Navigation (Fixed at bottom) */}
      <footer className="w-full px-6 py-8 relative z-10 mt-auto">
        <div className="max-w-md mx-auto flex items-center justify-between">
          
          {/* Left: Counter */}
          <div className="text-km0-blue font-bold text-lg w-16">
            {currentSlide + 1}/{slides.length}
          </div>

          {/* Center: Pagination Dots with Arrows */}
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide} 
              disabled={currentSlide === 0}
              className={cn(
                "text-gray-400 hover:text-km0-blue transition-colors",
                currentSlide === 0 && "opacity-30 cursor-not-allowed"
              )}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <div className="flex gap-2">
              {slides.map((_, index) => (
                <div 
                  key={index}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    currentSlide === index ? "w-8 bg-km0-blue" : "w-2 bg-gray-300"
                  )}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide} 
              disabled={currentSlide === slides.length - 1}
              className={cn(
                "text-gray-400 hover:text-km0-blue transition-colors",
                currentSlide === slides.length - 1 && "opacity-30 cursor-not-allowed"
              )}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

          {/* Right: Skip/Start Button */}
          <div className="w-16 flex justify-end">
            {currentSlide === slides.length - 1 ? (
              <button 
                onClick={() => console.log("Start App")}
                className="px-4 py-2 bg-[#174094] rounded inline-flex justify-center items-center gap-2 text-[#f6f6f6] text-sm font-normal font-['Oakes_Grotesk'] hover:opacity-90 transition-opacity"
              >
                EMPEZAR
              </button>
            ) : (
              <button 
                onClick={skipOnboarding}
                className="px-4 py-2 bg-[#174094] rounded inline-flex justify-center items-center gap-2 text-[#f6f6f6] text-sm font-normal font-['Oakes_Grotesk'] hover:opacity-90 transition-opacity"
              >
                SALTAR
              </button>
            )}
          </div>

        </div>
      </footer>
    </div>
  );
}
