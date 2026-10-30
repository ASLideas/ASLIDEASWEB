'use client';

import React, { useState } from 'react';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function ComunidadPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#676E5E] p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Encabezado */}
        <div className="bg-[#E6E7D5] p-6 rounded-3xl border border-[#97A884] shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] px-3 py-1 rounded-full border border-[#97A884]">
              Comunidad B2B & Proyectos
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-[#676E5E] mt-1">
              Catálogo de Aplicaciones y Vitrinas Virtuales
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-[#676E5E] hover:bg-[#52584b] text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            Probar Demostración
          </button>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#97A884] space-y-3 shadow-xs">
            <h3 className="font-bold text-sm text-[#676E5E]">Vitrina Virtual PYME</h3>
            <p className="text-xs text-gray-600">
              Solución interactiva para comercio local y catálogos digitales adaptados.
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-[#E6E7D5] hover:bg-[#CDD6A9] text-[#676E5E] text-xs font-bold py-2 rounded-xl border border-[#97A884] transition cursor-pointer"
            >
              Ver Sala Demo
            </button>
          </div>
        </div>

        {/* MODAL SALA VIRTUAL B2B */}
        <SalaVirtualB2B 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />

      </div>
    </div>
  );
}
