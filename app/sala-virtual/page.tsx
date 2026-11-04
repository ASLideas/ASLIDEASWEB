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
  const [nivelAudio, setNivelAudio] = useState(52);

  const intercambiar = () => {
    setPantallaEnfocada(prev => (prev === 1 ? 2 : 1));
  };

  const pantalla1Data = {
    id: 1,
    titulo: '1. Casa Matriz ASL Ideas SpA',
    subtitulo: 'Transmisi√≥n Principal de Telemedicina & Ejercicio Adaptado',
    badge: 'PANTALLA 01 (PRINCIPAL)',
    icono: 'Ì≥π'
  };

  const pantalla2Data = {
    id: 2,
    titulo: 'C√°mara Secundaria / Int√©rprete LSCh',
    subtitulo: 'Vista en Vivo de Participante o Lengua de Se√±as Chilena',
    badge: 'PANTALLA 02 (SECUNDARIA)',
    icono: 'Ì±§'
  };

  const principal = pantallaEnfocada === 1 ? pantalla1Data : pantalla2Data;
  const secundaria = pantallaEnfocada === 1 ? pantalla2Data : pantalla1Data;

  return (
    <main className={`min-h-screen font-sans flex flex-col transition-colors duration-500 ${
      modoCalma ? 'bg-[#EAECE6] text-[#4E5447]' : 'bg-[#E6E7D5] text-[#676E5E]'
    }`}>
      {/* CABECERA DE LA SALA VIRTUAL */}
      <header className="bg-[#FAF8F5] border-b border-[#97A884]/30 py-3.5 px-6 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2.5">
            <img
              src="/logo-asl.png.png"
              onError={(e) => { (e.target as HTMLImageElement).src = '/LOGO_asl.png'; }}
              alt="ASL Ideas SpA"
              className="h-10 w-auto object-contain rounded-full border border-[#97A884]/40 p-0.5 bg-white shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-black text-base text-[#676E5E] leading-tight">ASL Ideas SpA</span>
              <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider">Sala Virtual en Vivo</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setModoCalma(!modoCalma)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition border flex items-center gap-1.5 ${
              modoCalma ? 'bg-[#52796F] text-white border-[#52796F]' : 'bg-[#FAF8F5] text-[#676E5E] border-[#97A884]'
            }`}
          >
            {modoCalma ? 'Ìºø Modo Calma Activado' : 'ÌΩÉ Activar Modo Calma (TEA)'}
          </button>
          
          <button
            onClick={intercambiar}
            className="bg-[#52796F] hover:bg-[#676E5E] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow flex items-center gap-1.5"
          >
            Ì¥Ñ <span>Intercambiar Pantallas</span>
          </button>

          <Link
            href="/"
            className="bg-rose-100 border border-rose-300 text-rose-800 px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-200 transition"
          >
            Volver a la Web
          </Link>
        </div>
      </header>

      {/* CINTILLO NORMATIVO Y ACCESIBILIDAD */}
      <div className="bg-[#97A884]/20 py-2 px-4 text-center border-b border-[#97A884]/30">
        <p className="text-[11px] font-extrabold text-[#52796F] tracking-wide uppercase">
          SALA DUAL INTERACTIVA | LEY TEA N¬∞ 21.545 & CIBERSEGURIDAD LEY N¬∞ 21.663
        </p>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-5">
        
        {/* NAVEGACI√ìN DE PESTA√ëAS */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] p-3 rounded-2xl border border-[#97A884]/30 shadow-sm">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setTabActiva('vivo')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition shadow-sm ${
                tabActiva === 'vivo'
                  ? 'bg-[#676E5E] text-white'
                  : 'bg-[#FAF8F5] text-[#676E5E] hover:bg-[#E6E7D5]'
              }`}
            >
              Ì≥π Transmisi√≥n en Vivo Dual
            </button>
            <button
              onClick={() => setTabActiva('cita')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                tabActiva === 'cita'
                  ? 'bg-[#676E5E] text-white'
                  : 'bg-[#FAF8F5]/80 text-[#676E5E] hover:bg-[#FAF8F5]'
              }`}
            >
              Ì≥Ö Agendar Cita
            </button>
            <button
              onClick={() => setTabActiva('reprogramar')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                tabActiva === 'reprogramar'
                  ? 'bg-[#676E5E] text-white'
                  : 'bg-[#FAF8F5]/80 text-[#676E5E] hover:bg-[#FAF8F5]'
              }`}
            >
              Ì¥Ñ Cancelar / Reprogramar
            </button>
          </div>

          <span className="text-xs font-bold text-[#52796F]">
            Haz clic en la miniatura para agrandar la pantalla secundaria
          </span>
        </div>

        {tabActiva === 'vivo' && (
          <div className="space-y-4">
            
            {/* VISTA DE 2 PANTALLAS SIMULT√ÅNEAS */}
            <div className="bg-[#1C221D] rounded-3xl border-2 border-[#52796F]/60 p-4 sm:p-6 shadow-2xl">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* PANTALLA PRINCIPAL (GRANDE - 2 COLUMNAS) */}
                <div className={`md:col-span-2 rounded-2xl p-5 border-2 transition-all flex flex-col justify-between min-h-[340px] sm:min-h-[420px] relative overflow-hidden shadow-xl ${
                  pantallaEnfocada === 1 ? 'bg-[#262D28] border-[#97A884]' : 'bg-[#222824] border-[#52796F]'
                }`}>
                  
                  {/* TAG SUPERIOR */}
                  <div className="flex justify-between items-center z-10">
                    <span className="bg-[#52796F] text-white text-[11px] font-black px-3.5 py-1 rounded-lg uppercase tracking-wider flex items-center gap-2 shadow">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      {principal.badge}
                    </span>
                    <span className="text-xs text-emerald-300 font-bold bg-[#1C221D]/80 px-3 py-1 rounded-lg border border-emerald-500/30">
                      Enfoque Principal (Agrandado)
                    </span>
                  </div>

                  {/* CONTENIDO VISTA PRINCIPAL */}
                  <div className="text-center py-8 space-y-4 z-10">
                    <div className="w-24 h-24 mx-auto rounded-full bg-[#97A884]/20 border-4 border-[#97A884]/40 flex items-center justify-center p-3 shadow-inner">
                      <img
                        src="/logo-asl.png.png"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/LOGO_asl.png'; }}
                        alt="ASL Logo"
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <div className="space-y-1 max-w-md mx-auto">
                      <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">
                        {principal.titulo}
                      </h2>
                      <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                        {principal.subtitulo}
                      </p>
                    </div>

                    <button
                      onClick={() => setCamActiva(!camActiva)}
                      className="bg-[#FAF8F5] hover:bg-white text-[#676E5E] text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-md transition border border-[#97A884] transform hover:scale-105"
                    >
                      {camActiva ? 'Ì≥∑ C√°mara Web y Micr√≥fono Activos' : 'Encender C√°mara Web y Micr√≥fono Real'}
                    </button>
                  </div>

                  {/* SUBT√çTULOS / TRANSCRIPCI√ìN EN VIVO */}
                  {transcriptorActivo && (
                    <div className="bg-[#1C221D]/90 border border-emerald-500/40 p-3 rounded-xl text-center z-10 mb-2">
                      <p className="text-xs font-bold text-emerald-300 animate-pulse">
                        Ì≤¨ [Subt√≠tulos LSCh en Vivo]: "Bienvenido a la sesi√≥n de salud integrativa de ASL Ideas SpA..."
                      </p>
                    </div>
                  )}

                  {/* PIE PANTALLA PRINCIPAL */}
                  <div className="flex justify-between items-center text-[11px] text-gray-400 z-10 pt-2 border-t border-gray-700/50">
                    <span>Transmisi√≥n HD Segura ‚Ä¢ TLS 1.3</span>
                    <span>Habilitado para Int√©rprete LSCh</span>
                  </div>
                </div>

                {/* PANTALLA SECUNDARIA (MINIATURA LATERAL - 1 COLUMNA) */}
                <div
                  onClick={intercambiar}
                  className="group cursor-pointer bg-[#222824] hover:bg-[#2C342F] rounded-2xl p-5 border-2 border-[#52796F] flex flex-col justify-between min-h-[340px] sm:min-h-[420px] relative overflow-hidden shadow-xl transition-all"
                >
                  <div className="flex justify-between items-center z-10">
                    <span className="bg-[#52796F]/80 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {secundaria.badge}
                    </span>
                    <span className="text-[11px] text-[#97A884] group-hover:underline font-bold">
                      Clic para Agrandar ‚Üó
                    </span>
                  </div>

                  <div className="text-center py-6 space-y-3 z-10">
                    <div className="w-20 h-20 mx-auto rounded-full bg-[#52796F]/30 border-2 border-[#52796F] flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform">
                      {secundaria.icono}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-extrabold text-gray-100">
                        {secundaria.titulo}
                      </h3>
                      <p className="text-[11px] text-emerald-300 font-semibold">
                        C√°mara Lateral en Vivo
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 z-10">
                    <div className="bg-[#52796F]/40 text-center py-2.5 rounded-xl border border-[#52796F] group-hover:bg-[#52796F] group-hover:text-white transition shadow-sm">
                      <span className="text-xs font-extrabold text-white flex items-center justify-center gap-1.5">
                        Ì¥Ñ <span>Agrandar esta Pantalla</span>
                      </span>
                    </div>
                    <p className="text-[10px] text-center text-gray-400">
                      Presiona para intercambiar de lugar con la pantalla principal
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* INDICADOR DE NIVEL DE AUDIO ENTRANTE */}
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#97A884]/40 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <span className="text-xs font-extrabold text-[#676E5E] min-w-[130px]">
                Nivel de Audio Entrante:
              </span>
              <div className="flex-1 bg-gray-200 h-3.5 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-rose-500 transition-all duration-300 rounded-full"
                  style={{ width: micActivo ? `${nivelAudio}%` : '0%' }}
                />
              </div>
              <span className="text-xs font-bold text-[#52796F] min-w-[60px] text-right">
                {micActivo ? `${nivelAudio}% dB` : '0% dB'}
              </span>
            </div>

            {/* BOTONES DE CONTROL INTERACTIVOS */}
            <div className="flex flex-wrap items-center justify-start gap-3 pt-2">
              <button
                onClick={() => setMicActivo(!micActivo)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold shadow transition flex items-center gap-2 ${
                  micActivo
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-rose-100 border border-rose-300 text-rose-800 hover:bg-rose-200'
                }`}
              >
                <span>{micActivo ? 'ÌæôÔ∏è Micr√≥fono Activado' : 'ÌæôÔ∏è Micr√≥fono Silenciado'}</span>
              </button>

              <button
                onClick={() => setCamActiva(!camActiva)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold shadow transition flex items-center gap-2 ${
                  camActiva
                    ? 'bg-[#676E5E] hover:bg-[#52796F] text-white'
                    : 'bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] hover:bg-[#E6E7D5]'
                }`}
              >
                <span>{camActiva ? 'Ì≥∑ C√°mara Activada' : 'Encender C√°mara'}</span>
              </button>

              <button
                onClick={() => setTranscriptorActivo(!transcriptorActivo)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold shadow transition flex items-center gap-2 ${
                  transcriptorActivo
                    ? 'bg-[#52796F] text-white'
                    : 'bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] hover:bg-[#E6E7D5]'
                }`}
              >
                <span>{transcriptorActivo ? 'Ì≤¨ Transcriptor Activado (LSCh)' : 'Activar Transcriptor LSCh'}</span>
              </button>

              <button
                onClick={intercambiar}
                className="bg-[#97A884] hover:bg-[#676E5E] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold shadow transition flex items-center gap-2"
              >
                <span>Ì¥Ñ Intercambiar Posici√≥n de Pantallas</span>
              </button>
            </div>

          </div>
        )}

        {tabActiva === 'cita' && (
          <div className="bg-[#FAF8F5] p-8 rounded-2xl border border-[#97A884]/40 text-center space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-[#676E5E]">Agendar Cita de Telemedicina / Consultor√≠a B2B</h3>
            <p className="text-xs sm:text-sm text-[#52796F] max-w-md mx-auto">
              Selecciona la fecha y hora disponible para conectar con un especialista o agendar una demostraci√≥n B2B.
            </p>
            <div className="pt-2">
              <button className="bg-[#52796F] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl hover:bg-[#676E5E] transition shadow">
                Ì≥Ö Abrir Calendario de Reserva
              </button>
            </div>
          </div>
        )}

        {tabActiva === 'reprogramar' && (
          <div className="bg-[#FAF8F5] p-8 rounded-2xl border border-[#97A884]/40 text-center space-y-4 shadow-sm">
            <h3 className="text-lg font-bold text-[#676E5E]">Gesti√≥n de Citas Existentes</h3>
            <p className="text-xs sm:text-sm text-[#52796F] max-w-md mx-auto">
              Ingresa tu c√≥digo de reserva para modificar o cancelar tu atenci√≥n.
            </p>
            <div className="flex justify-center gap-2 max-w-xs mx-auto pt-2">
              <input type="text" placeholder="C√≥digo de reserva" className="px-3.5 py-2 border border-[#97A884] rounded-xl text-xs w-full shadow-sm" />
              <button className="bg-[#676E5E] text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-[#52796F]">Buscar</button>
            </div>
          </div>
        )}

      </div>

      {/* PIE DE P√ÅGINA */}
      <footer className="bg-[#FAF8F5] border-t border-[#97A884]/30 py-4 px-6 text-center text-xs text-[#676E5E]/80 mt-auto">
        <p>¬© 2026 ASL Ideas SpA ‚Äî Sala Virtual en Vivo (/sala-virtual) | Cumplimiento Ley TEA N¬∞ 21.545</p>
      </footer>
    </main>
  );
}
