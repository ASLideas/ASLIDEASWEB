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
      <div className="flex flex-col items-center max-w-md w-full text-center space-y-5">
        
        {/* CIRCUNFERENCIA CON LOGO Y EFECTO PALPITANTE */}
        <div className="relative flex items-center justify-center my-2">
          {/* Halo exterior palpitante */}
          <div className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#97A884]/30 animate-ping" />
          
          {/* Círculo blanco limpio con borde */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-[#FAF8F5] rounded-full p-4 border-4 border-[#97A884] shadow-2xl flex items-center justify-center animate-pulse">
            <img
              src="/isotipo.png"
              alt="Logo ASL Ideas SpA"
              className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
            />
          </div>
        </div>

        {/* TITULO ASL IDEAS SPA CENTRADO */}
        <h1 className="text-2xl sm:text-3xl font-black text-[#676E5E] tracking-tight">
          ASL Ideas SpA
        </h1>

        {/* LLAMADO DE ATENCIÓN CENTRADO */}
        <div className="space-y-2 px-2">
          <h2 className="text-base sm:text-lg font-bold text-[#676E5E] leading-snug">
            Desarrollo y soluciones accesibles para PYME y comercio asociado
          </h2>
          <p className="text-xs font-semibold text-[#52796F] uppercase tracking-wider">
            Salud Digital e Inclusión
          </p>
        </div>

        {/* BARRA DE CARGA CENTRADA */}
        <div className="w-28 h-1.5 bg-[#97A884]/40 rounded-full overflow-hidden mt-1">
          <div className="w-full h-full bg-[#676E5E] animate-pulse" />
        </div>

      </div>
    </div>
  );
}
