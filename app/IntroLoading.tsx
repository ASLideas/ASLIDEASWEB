'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface IntroLoadingProps {
  onComplete?: () => void;
  duracionMs?: number;
}

export default function IntroLoading({ onComplete, duracionMs = 2500 }: IntroLoadingProps) {
  const [visible, setVisible] = useState(true);
  const [desvanecer, setDesvanecer] = useState(false);

  useEffect(() => {
    // Inicia el efecto de desvanecimiento suave antes de desmontar
    const timerFade = setTimeout(() => {
      setDesvanecer(true);
    }, duracionMs - 500);

    // Oculta completamente la intro
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
        
        {/* LOGO PALPITANTE EN MARCO CIRCULAR CON FONDO BLANCO */}
        <div className="relative flex items-center justify-center">
          {/* Anillo de pulso suave exterior */}
          <div className="absolute w-36 h-36 rounded-full bg-white/60 animate-ping" />
          
          {/* Contenedor circular blanco */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-full p-4 border-4 border-[#97A884] shadow-xl flex items-center justify-center animate-pulse">
            <img
              src="/logoASLideas.jpeg"
              alt="Logo ASL Ideas SpA"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>

        {/* TEXTO INSTITUCIONAL SIN EMOJIS */}
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-black text-[#676E5E] tracking-tight leading-snug">
            Desarrollo y soluciones accesibles para PYME y comercio asociado
          </h2>
          <p className="text-xs font-semibold text-[#97A884] uppercase tracking-wider">
            ASL Ideas SpA — Plataforma de Salud Digital e Inclusión
          </p>
        </div>

        {/* INDICADOR DE CARGA SENCILLO */}
        <div className="w-24 h-1 bg-white/60 rounded-full overflow-hidden mt-4">
          <div className="w-full h-full bg-[#676E5E] animate-pulse" />
        </div>

      </div>
    </div>
  );
}