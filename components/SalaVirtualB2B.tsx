'use client';

import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SalaVirtualB2B({ isOpen, onClose }: Props) {
  const [tab, setTab] = useState<'video' | 'agendar'>('video');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2C4A3E]/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-3xl border border-[#C8D8CE] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Encabezado Verde Suave #52796F */}
        <header className="bg-[#52796F] text-white p-6 flex justify-between items-center border-b border-[#84A59D]">
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase bg-[#FAF8F5]/20 px-3 py-1 rounded-full">
              ASL Ideas SpA — Casa Matriz
            </span>
            <h2 className="text-xl font-bold mt-1">Sala Virtual & Reunión B2B</h2>
            <p className="text-xs text-[#E8F0EC]">
              Consultoría en accesibilidad UI/UX, software a medida y licencias corporativas.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white bg-black/10 hover:bg-black/20 text-sm px-3 py-1.5 rounded-full font-bold transition"
          >
            ✕ Cerrar
          </button>
        </header>

        {/* Pestañas de Navegación */}
        <div className="flex border-b border-[#C8D8CE] bg-[#E8F0EC]">
          <button
            onClick={() => setTab('video')}
            className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 ${
              tab === 'video'
                ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]'
                : 'text-[#52796F] hover:bg-[#FAF8F5]/50'
            }`}
          >
            ��� Sala de Videollamada en Vivo
          </button>
          <button
            onClick={() => setTab('agendar')}
            className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 ${
              tab === 'agendar'
                ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]'
                : 'text-[#52796F] hover:bg-[#FAF8F5]/50'
            }`}
          >
            ��� Agendar / Adjuntar Propuesta
          </button>
        </div>

        {/* Contenido Principal */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'video' ? (
            <div className="space-y-4">
              <div className="bg-[#E8F0EC] p-4 rounded-2xl border border-[#84A59D]/40 flex items-center justify-between text-xs text-[#2C4A3E]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#84A59D] animate-pulse"></span>
                  <span className="font-bold">Estado:</span> Sala de Conferencia B2B Activa
                </div>
                <span className="text-[11px] text-[#52796F]">Entorno Seguro y Amable</span>
              </div>

              {/* Contenedor de Videollamada con Tonos Relajantes */}
              <div className="w-full h-[420px] bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE] overflow-hidden shadow-inner">
                <iframe
                  src="[suspicious link removed]"
                  allow="camera; microphone; display-capture; autoplay; clipboard-write"
                  className="w-full h-full border-0"
                  title="Sala Virtual B2B - ASL Ideas SpA"
                />
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto space-y-4">
              <p className="text-xs text-[#2C4A3E]">Formulario de Agendamiento B2B y Propuesta PDF.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
