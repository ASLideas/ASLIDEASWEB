'use client';

import React, { useState, useEffect } from 'react';

interface IntroLoadingProps {
  onComplete?: () => void;
  duracionMs?: number;
}

export default function IntroLoading({ onComplete, duracionMs = 3200 }: IntroLoadingProps) {
  const [visible, setVisible] = useState(true);
  const [desvanecer, setDesvanecer] = useState(false);

  useEffect(() => {
    const timerFade = setTimeout(() => {
      setDesvanecer(true);
    }, duracionMs - 500);

    const timerComplete = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, duracionMs);

    return () => {
      clearTimeout(timerFade);
      clearTimeout(timerComplete);
    };
  }, [duracionMs, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#E6E7D5] flex flex-col items-center justify-center p-6 transition-opacity duration-500 ${
        desvanecer ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-lg text-center space-y-6">
        
        {/* CONTENEDOR CIRCULAR CON PULSO Y PROPORCIONES PROPIAS */}
        <div className="relative flex items-center justify-center my-2">
          <div className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-[#97A884]/30 animate-ping" />
          
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 bg-[#FAF8F5] rounded-full p-6 border-4 border-[#97A884] shadow-2xl flex flex-col items-center justify-center space-y-2 animate-pulse">
            <img
              src="/isotipo.png"
              alt="Isotipo ASL Ideas"
              className="h-14 sm:h-16 w-auto object-contain"
            />
            <img
              src="/logo-asl.png.png"
              alt="Logo ASL Ideas SpA"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>
        </div>

        {/* TEXTO INSTITUCIONAL */}
        <div className="space-y-3 max-w-md">
          <h2 className="text-lg sm:text-xl font-bold text-[#676E5E] leading-snug">
            Desarrollo y soluciones accesibles para PYME y comercio asociado
          </h2>
          <p className="text-xs font-semibold text-[#52796F] uppercase tracking-widest">
            ASL Ideas SpA — Salud Digital e Inclusión
          </p>
        </div>

        {/* BARRA DE PROGRESO */}
        <div className="w-32 h-1.5 bg-[#97A884]/40 rounded-full overflow-hidden mt-2">
          <div className="w-full h-full bg-[#676E5E] animate-pulse" />
        </div>

      </div>
    </div>
  );
}
