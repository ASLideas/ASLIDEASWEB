'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function ComunidadPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState({
    nombre: 'Sabiduría Ancestral / Bienestar',
    logo: '/LOGO_BIENESTAR.png',
  });

  const abrirDemo = (nombre: string, logo: string) => {
    setSelectedApp({ nombre, logo });
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans pb-16">
      
      {/* HEADER CON LOGO PALPITANTE (ANIMATE-PULSE) */}
      <header className="bg-white border-b border-[#97A884] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center space-x-3">
            {/* LOGO CON ANIMACIÓN DE PALPITACIÓN */}
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#E6C693] p-0.5 overflow-hidden flex items-center justify-center animate-pulse shadow-xs">
              <img 
                src="/LOGO_BIENESTAR.png" 
                alt="Logo Bienestar" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-base font-black text-[#676E5E]">Comunidad & Sabiduría Ancestral</h1>
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
              onClick={() => abrirDemo('ASL Ideas SpA — Agendamiento B2B', '/LOGO_asl.png')}
              className="bg-[#676E5E] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition cursor-pointer hover:bg-[#52584b]"
            >
              Agendar Cita
            </button>
          </div>

        </div>
      </header>

      {/* CONTENIDO PRINCIPAL Y SECCIONES */}
      <div className="max-w-5xl mx-auto px-4 pt-10 space-y-8">
        
        {/* TARJETA PRINCIPAL DEL DIARIO MURAL */}
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
          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => abrirDemo('Sabiduría Ancestral — Solicitud B2B', '/LOGO_BIENESTAR.png')}
              className="bg-[#DC8D6C] text-white text-xs font-bold px-6 py-3 rounded-2xl hover:bg-[#c37858] transition shadow-xs cursor-pointer"
            >
              Solicitar Información o Video Reunión
            </button>
          </div>
        </div>

        {/* CUMPLIMIENTO LEYES Y ACCESIBILIDAD */}
        <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#97A884] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div>
            <p className="font-extrabold text-[#676E5E]">Garantía de Inclusión y Ciberseguridad</p>
            <p className="text-gray-600 text-[11px]">Diseño sin sobrecarga sensorial (Ley N° 21.545) y datos de salud encriptados (Ley N° 21.663).</p>
          </div>
          <button
            type="button"
            onClick={() => abrirDemo('Demostración Multicámara B2B', '/LOGO_asl.png')}
            className="bg-[#676E5E] text-white text-xs font-bold px-4 py-2 rounded-xl shrink-0 cursor-pointer"
          >
            🎥 Abrir Sala Multicámara
          </button>
        </div>

      </div>

      {/* MODAL DE LA SALA VIRTUAL CON PROPS CORRECTOS */}
      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialApp={selectedApp.nombre}
        appLogo={selectedApp.logo}
      />

    </main>
  );
}