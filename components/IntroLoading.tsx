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
      <div className="flex flex-col items-center max-w-md w-full text-center space-y-6">
        
        {/* LOGO FLOR DE LOTO CIRCUITO EN CIRCUNFERENCIA UNIFORME */}
        <div className="relative flex items-center justify-center my-2">
          {/* Aura suave de pulso exterior */}
          <div className="absolute w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-[#97A884]/30 animate-ping" />
          
          {/* Circunferencia limpia con el logo loto dentro */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 border-[#97A884] bg-white shadow-2xl overflow-hidden p-3 flex items-center justify-center animate-pulse">
            <img
              src="/LOGO_asl.png"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logoASLideas.jpeg';
              }}
              alt="ASL Ideas SpA Logo"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>

        {/* MARCA INSTITUCIONAL CENTRADA */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-[#676E5E] tracking-tight">
            ASL IDEAS SPA
          </h1>
          <p className="text-xs font-bold text-[#52796F] uppercase tracking-widest">
            Salud Digital e Inclusión
          </p>
        </div>

        {/* LLAMADO DE ATENCIÓN */}
        <div className="space-y-2 px-2">
          <h2 className="text-sm sm:text-base font-bold text-[#676E5E] leading-snug">
            Desarrollo y soluciones accesibles para PYME y comercio asociado
          </h2>
        </div>

        {/* BARRA DE CARGA */}
        <div className="w-32 h-1.5 bg-[#97A884]/40 rounded-full overflow-hidden mt-1">
          <div className="w-full h-full bg-[#676E5E] animate-pulse" />
        </div>

      </div>
    </div>
  );
}
