'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function ComunidadPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppName, setCurrentAppName] = useState('Sabiduria Ancestral');
  const [currentAppLogo, setCurrentAppLogo] = useState('/logo-bienestar.png.png');

  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans pb-16">
      <header className="bg-white border-b border-[#97A884] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#E6C693] p-0.5 overflow-hidden flex items-center justify-center">
              <img src="/logo-bienestar.png.png" alt="Logo Bienestar" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-black text-[#676E5E]">Comunidad & Sabiduria Ancestral</h1>
              <p className="text-[9px] text-[#97A884] font-bold uppercase tracking-wider">
                Diario Mural Popular y Recetarios Nativo PDF
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition"
            >
              Volver al Inicio
            </Link>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-[#676E5E] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl hover:bg-[#52584b] transition cursor-pointer"
            >
              Agendar Cita
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pt-10 space-y-8">
        <div className="bg-white p-8 rounded-3xl border-2 border-[#97A884] shadow-md space-y-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-3.5 py-1 rounded-full border border-[#97A884]">
            Oficina Virtual 04 - Herbolaria Nativa
          </span>
          <h2 className="text-3xl font-extrabold text-[#676E5E]">
            Diario Mural de Secretos de la Abuela
          </h2>
          <p className="text-xs text-[#676E5E]/80 max-w-xl mx-auto leading-relaxed">
            Espacio colaborativo para la preservación de la fitoterapia nativa chilena y la medicina natural comunitaria.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-[#DC8D6C] text-white text-xs font-bold px-6 py-3 rounded-2xl hover:bg-[#c37858] transition shadow-xs cursor-pointer"
            >
              Solicitar Informacion o Video Reunion
            </button>
          </div>
        </div>
      </div>

      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialApp={currentAppName}
        appLogo={currentAppLogo}
      />
    </main>
  );
}
