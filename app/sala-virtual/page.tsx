'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SalaVirtualPage() {
  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita' | 'reprogramar'>('vivo');
  const [pantallaEnfocada, setPantallaEnfocada] = useState<1 | 2>(1);
  const [micActivo, setMicActivo] = useState(true);
  const [camActiva, setCamActiva] = useState(false);
  const [transcriptorActivo, setTranscriptorActivo] = useState(false);
  const [modoCalma, setModoCalma] = useState(false);

  const intercambiar = () => setPantallaEnfocada(prev => (prev === 1 ? 2 : 1));

  const p1 = { id: 1, titulo: '1. Casa Matriz ASL Ideas SpA', subtitulo: 'Transmision Principal Telemedicina', badge: 'PANTALLA 01' };
  const p2 = { id: 2, titulo: 'Camara Secundaria / Interprete LSCh', subtitulo: 'Vista Lateral o Lengua de Senas', badge: 'PANTALLA 02' };

  const principal = pantallaEnfocada === 1 ? p1 : p2;
  const secundaria = pantallaEnfocada === 1 ? p2 : p1;

  return (
    <main className={`min-h-screen font-sans flex flex-col ${modoCalma ? 'bg-[#EAECE6]' : 'bg-[#E6E7D5]'}`}>
      <header className="bg-[#FAF8F5] border-b border-[#97A884]/30 py-3 px-6 flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="font-black text-base text-[#676E5E]">ASL Ideas SpA - Sala Virtual</Link>
        <div className="flex gap-2">
          <button onClick={() => setModoCalma(!modoCalma)} className="bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] text-xs font-bold px-3 py-1.5 rounded-xl">
            {modoCalma ? 'Modo Calma Activado' : 'Modo Calma (TEA)'}
          </button>
          <button onClick={intercambiar} className="bg-[#52796F] text-white text-xs font-bold px-3 py-1.5 rounded-xl">
            Intercambiar Pantallas
          </button>
          <Link href="/" className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1.5 rounded-xl">
            Volver a la Web
          </Link>
        </div>
      </header>

      <div className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-4">
        <div className="bg-[#1C221D] rounded-3xl p-5 border-2 border-[#52796F] shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-[#262D28] rounded-2xl p-5 border-2 border-[#97A884] min-h-[350px] flex flex-col justify-between text-white">
            <span className="bg-[#52796F] text-xs font-black px-3 py-1 rounded-lg w-max">{principal.badge} (AGRANDADO)</span>
            <div className="text-center py-6">
              <h2 className="text-xl font-bold">{principal.titulo}</h2>
              <p className="text-xs text-emerald-200 mt-1">{principal.subtitulo}</p>
              <button onClick={() => setCamActiva(!camActiva)} className="mt-4 bg-[#FAF8F5] text-[#676E5E] text-xs font-bold px-4 py-2 rounded-xl">
                {camActiva ? 'Camara y Microfono Activos' : 'Encender Camara Real'}
              </button>
            </div>
            {transcriptorActivo && <p className="text-xs text-emerald-300 text-center animate-pulse">[Subtitulos LSCh en Vivo]...</p>}
          </div>

          <div onClick={intercambiar} className="cursor-pointer bg-[#222824] hover:bg-[#2C342F] rounded-2xl p-5 border-2 border-[#52796F] flex flex-col justify-between text-gray-100 min-h-[350px]">
            <span className="bg-[#52796F]/80 text-[10px] font-bold px-2 py-1 rounded w-max">{secundaria.badge} (MINIATURA)</span>
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#52796F]/30 flex items-center justify-center text-xl font-bold text-emerald-300 mb-2">
                {secundaria.id === 1 ? 'CAM 1' : 'LSCh'}
              </div>
              <h3 className="text-sm font-bold">{secundaria.titulo}</h3>
            </div>
            <div className="bg-[#52796F]/40 text-center py-2 rounded-xl text-xs font-bold text-white">
              Clic para Agrandar
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={() => setMicActivo(!micActivo)} className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl">
            {micActivo ? 'Microfono Activado' : 'Microfono Silenciado'}
          </button>
          <button onClick={() => setTranscriptorActivo(!transcriptorActivo)} className="bg-[#52796F] text-white text-xs font-bold px-4 py-2 rounded-xl">
            {transcriptorActivo ? 'Transcriptor Activado (LSCh)' : 'Activar Transcriptor LSCh'}
          </button>
          <button onClick={intercambiar} className="bg-[#97A884] text-white text-xs font-bold px-4 py-2 rounded-xl">
            Intercambiar Posicion de Pantallas
          </button>
        </div>
      </div>
    </main>
  );
}
