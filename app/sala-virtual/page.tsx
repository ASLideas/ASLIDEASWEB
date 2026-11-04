'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SalaVirtualPage() {
  // Estado para determinar cuál pantalla está en enfoque principal (1 o 2)
  const [pantallaEnfocada, setPantallaEnfocada] = useState(1);
  // Estado para maximizar a pantalla completa de ancho
  const [expandida, setExpandida] = useState(false);
  // Estados de micrófono y cámara
  const [micActivo, setMicActivo] = useState(true);
  const [camActiva, setCamActiva] = useState(true);

  const pantalla1 = {
    id: 1,
    titulo: 'Transmisión Principal (Presentación / Instructor)',
    subtitulo: 'Sesión de Movimiento Adaptado & Pausa Activa',
    badge: 'PANTALLA 01',
  };

  const pantalla2 = {
    id: 2,
    titulo: 'Segunda Pantalla (Cámara Secundaria / Invitado B2B)',
    subtitulo: 'Vista en Vivo de Participante / Intérprete LSCh',
    badge: 'PANTALLA 02',
  };

  const principal = pantallaEnfocada === 1 ? pantalla1 : pantalla2;
  const secundaria = pantallaEnfocada === 1 ? pantalla2 : pantalla1;

  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans flex flex-col">
      {/* CABECERA DE LA SALA EN VIVO */}
      <header className="bg-[#FAF8F5] border-b border-[#97A884]/30 py-3 px-6 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/logo-asl.png.png"
              onError={(e) => { (e.target as HTMLImageElement).src = '/LOGO_asl.png'; }}
              alt="ASL Ideas SpA"
              className="h-9 w-auto object-contain rounded-full border border-[#97A884]/30"
            />
            <span className="font-black text-base text-[#676E5E]">ASL Ideas SpA</span>
          </Link>
          <span className="hidden sm:inline-block px-2.5 py-0.5 bg-[#52796F]/15 text-[#52796F] text-xs font-bold rounded-full uppercase">
            Sala Virtual en Vivo Multi-Pantalla
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setPantallaEnfocada(pantallaEnfocada === 1 ? 2 : 1)}
            className="bg-[#97A884] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-[#676E5E] transition shadow flex items-center gap-1.5"
          >
            ��� <span>Intercambiar Pantallas</span>
          </button>
          <Link
            href="/"
            className="bg-rose-100 border border-rose-300 text-rose-800 px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-200 transition"
          >
            Salir de la Sala
          </Link>
        </div>
      </header>

      {/* CINTILLO LEY TEA */}
      <div className="bg-[#97A884]/20 py-2 px-4 text-center border-b border-[#97A884]/30">
        <p className="text-[11px] font-bold text-[#52796F] tracking-wide uppercase">
          SALA INTERACTIVA MULTI-PANTALLA | BAJA CARGA SENSORIAL (LEY TEA N° 21.545)
        </p>
      </div>

      {/* CONTENEDOR DE PANTALLAS DUAL (UNA MÁS GRANDE QUE LA OTRA) */}
      <div className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* PANTALLA PRINCIPAL (75% AGRANDADA) */}
        <div className={`transition-all duration-300 flex flex-col ${expandida ? 'lg:w-full' : 'lg:w-3/4'} space-y-3`}>
          <div className="relative bg-[#FAF8F5] rounded-2xl border-2 border-[#52796F]/40 shadow-lg overflow-hidden flex-1 min-h-[380px] sm:min-h-[460px] flex flex-col justify-between p-4 sm:p-6">
            
            {/* TAG SUPERIOR */}
            <div className="flex justify-between items-center z-10">
              <span className="bg-[#52796F] text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
                {principal.badge} (ENFOQUE PRINCIPAL AGRANDADO)
              </span>
              <button
                onClick={() => setExpandida(!expandida)}
                className="bg-[#FAF8F5]/90 border border-[#97A884] text-[#676E5E] text-xs font-bold px-3 py-1 rounded-lg hover:bg-[#E6E7D5] transition shadow-sm"
              >
                {expandida ? '��� Reducir Vista' : '��� Maximizar Pantalla'}
              </button>
            </div>

            {/* TRANSMISIÓN PRINCIPAL */}
            <div className="my-auto text-center space-y-4 py-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-[#52796F]/20 border-4 border-[#52796F]/40 flex items-center justify-center text-3xl sm:text-4xl shadow-inner">
                {principal.id === 1 ? '���' : '���'}
              </div>
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-black text-[#676E5E]">
                  {principal.titulo}
                </h2>
                <p className="text-xs sm:text-sm text-[#52796F] font-semibold">
                  {principal.subtitulo}
                </p>
              </div>
            </div>

            {/* CONTROLES INFERIORES */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#97A884]/30 z-10">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setMicActivo(!micActivo)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    micActivo ? 'bg-[#97A884] text-white' : 'bg-rose-100 text-rose-700 border border-rose-300'
                  }`}
                >
                  {micActivo ? '���️ Micrófono Encendido' : '���️ Micrófono Silenciado'}
                </button>
                <button
                  onClick={() => setCamActiva(!camActiva)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    camActiva ? 'bg-[#97A884] text-white' : 'bg-rose-100 text-rose-700 border border-rose-300'
                  }`}
                >
                  {camActiva ? '��� Cámara Encendida' : '��� Cámara Apagada'}
                </button>
              </div>

              <button
                onClick={() => setPantallaEnfocada(pantallaEnfocada === 1 ? 2 : 1)}
                className="text-xs font-bold text-[#52796F] hover:underline"
              >
                Intercambiar con Pantalla Secundaria ⇄
              </button>
            </div>
          </div>
        </div>

        {/* PANTALLA SECUNDARIA (25% LATERAL / MINIANATURA) */}
        {!expandida && (
          <div className="lg:w-1/4 flex flex-col space-y-3">
            <div
              onClick={() => setPantallaEnfocada(pantallaEnfocada === 1 ? 2 : 1)}
              className="group cursor-pointer bg-[#FAF8F5] rounded-2xl border-2 border-[#97A884]/50 shadow-md p-4 flex flex-col justify-between hover:border-[#52796F] transition-all relative overflow-hidden h-full min-h-[220px]"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="bg-[#97A884]/20 text-[#52796F] text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                  PANTALLA 02 (SECUNDARIA)
                </span>
                <span className="text-[10px] font-bold text-[#52796F] group-hover:underline">
                  Clic para Agrandar ↗
                </span>
              </div>

              <div className="my-auto text-center space-y-2 py-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#97A884]/20 border-2 border-[#97A884]/40 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  {secundaria.id === 1 ? '���' : '���'}
                </div>
                <h3 className="text-sm font-bold text-[#676E5E] leading-snug">
                  {secundaria.titulo}
                </h3>
                <p className="text-[11px] text-[#52796F]">
                  {secundaria.subtitulo}
                </p>
              </div>

              <div className="pt-2 border-t border-[#97A884]/20 text-center">
                <span className="bg-[#52796F] text-white text-[10px] font-bold px-3 py-1 rounded-lg block shadow-sm group-hover:bg-[#676E5E] transition">
                  ��� Agrandar esta Pantalla
                </span>
              </div>
            </div>

            <div className="bg-[#FAF8F5]/80 p-4 rounded-xl border border-[#97A884]/30 space-y-2 text-xs">
              <h4 className="font-extrabold text-[#676E5E]">Control Multi-Pantalla</h4>
              <p className="text-[11px] text-[#676E5E]/80">
                • 2 Pantallas dinámicas en simultáneo.<br />
                • Haz clic en la miniatura para cambiar el tamaño.<br />
                • Diseño optimizado bajo Ley TEA N° 21.545.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* PIE DE PÁGINA */}
      <footer className="bg-[#FAF8F5] border-t border-[#97A884]/30 py-4 px-6 text-center text-xs text-[#676E5E]/80">
        <p>© 2026 ASL Ideas SpA — Sala Virtual en Vivo | Ley TEA N° 21.545 y Ley N° 21.663</p>
      </footer>
    </main>
  );
}
