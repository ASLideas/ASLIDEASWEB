'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SalaVirtualPage() {
  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita' | 'reprogramar'>('vivo');
  const [pantallaEnfocada, setPantallaEnfocada] = useState<1 | 2>(1);
  const [micActivo, setMicActivo] = useState(true);
  const [camActiva, setCamActiva] = useState(false);
  const [transcriptorActivo, setTranscriptorActivo] = useState(false);
  const [nivelAudio, setNivelAudio] = useState(45);

  const intercambiar = () => {
    setPantallaEnfocada(prev => (prev === 1 ? 2 : 1));
  };

  const portalNombre = "1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)";

  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans flex flex-col">
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
            Sala Virtual / En Vivo
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={intercambiar}
            className="bg-[#97A884] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-[#676E5E] transition shadow flex items-center gap-1.5"
          >
            ��� <span>Intercambiar Pantallas</span>
          </button>
          <Link
            href="/"
            className="bg-rose-100 border border-rose-300 text-rose-800 px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-200 transition"
          >
            Volver a la Web
          </Link>
        </div>
      </header>

      <div className="bg-[#97A884]/20 py-2 px-4 text-center border-b border-[#97A884]/30">
        <p className="text-[11px] font-bold text-[#52796F] tracking-wide uppercase">
          SALA INTERACTIVA MULTI-PANTALLA | BAJA CARGA SENSORIAL (LEY TEA N° 21.545 Y LEY N° 21.663)
        </p>
      </div>

      <div className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[#FAF8F5] p-3 rounded-2xl border border-[#97A884]/30 shadow-sm">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setTabActiva('vivo')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition shadow-sm ${
                tabActiva === 'vivo'
                  ? 'bg-[#676E5E] text-white'
                  : 'bg-[#FAF8F5] text-[#676E5E] hover:bg-[#E6E7D5]'
              }`}
            >
              Transmisión en Vivo (2 Pantallas)
            </button>
            <button
              onClick={() => setTabActiva('cita')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                tabActiva === 'cita'
                  ? 'bg-[#676E5E] text-white'
                  : 'bg-[#FAF8F5]/80 text-[#676E5E] hover:bg-[#FAF8F5]'
              }`}
            >
              Agendar Cita
            </button>
            <button
              onClick={() => setTabActiva('reprogramar')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                tabActiva === 'reprogramar'
                  ? 'bg-[#676E5E] text-white'
                  : 'bg-[#FAF8F5]/80 text-[#676E5E] hover:bg-[#FAF8F5]'
              }`}
            >
              Cancelar / Reprogramar
            </button>
          </div>

          <button
            onClick={intercambiar}
            className="bg-[#52796F] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg hover:bg-[#676E5E] transition shadow"
          >
            ��� Intercambiar Tamaños
          </button>
        </div>

        {tabActiva === 'vivo' && (
          <div className="space-y-4">
            <div className="bg-[#1E231F] rounded-2xl border-2 border-[#52796F]/60 p-3 sm:p-5 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* PANTALLA PRINCIPAL AGRANDADA */}
                <div
                  className={`md:col-span-2 rounded-xl p-4 sm:p-5 border-2 transition-all flex flex-col justify-between min-h-[300px] relative overflow-hidden shadow-lg ${
                    pantallaEnfocada === 1
                      ? 'bg-[#2A322C] border-[#97A884]'
                      : 'bg-[#252B27] border-[#52796F]'
                  }`}
                >
                  <div className="flex justify-between items-center z-10">
                    <span className="bg-[#97A884] text-white text-[10px] sm:text-xs font-black px-3 py-1 rounded-md uppercase tracking-wider">
                      {pantallaEnfocada === 1 ? 'PANTALLA 1 (PRINCIPAL AGRANDADA)' : 'PANTALLA 2 (PRINCIPAL AGRANDADA)'}
                    </span>
                    <span className="text-[10px] sm:text-xs text-emerald-400 font-bold">Enfoque Principal</span>
                  </div>

                  <div className="text-center py-8 space-y-3 z-10">
                    <div className="w-20 h-20 mx-auto rounded-full bg-[#97A884]/20 border-2 border-[#97A884] flex items-center justify-center p-3 shadow-inner">
                      <img
                        src="/logo-asl.png.png"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/LOGO_asl.png'; }}
                        alt="ASL"
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-white leading-snug">
                      {pantallaEnfocada === 1 ? portalNombre : 'Cámara Secundaria / Invitado B2B'}
                    </h3>
                    <button
                      onClick={() => setCamActiva(!camActiva)}
                      className="bg-[#FAF8F5] hover:bg-white text-[#676E5E] text-xs font-extrabold px-5 py-2.5 rounded-xl shadow transition border border-[#97A884]"
                    >
                      {camActiva ? '��� Cámara Web Activa' : 'Encender Cámara Web y Micrófono Real'}
                    </button>
                  </div>

                  <div className="text-right z-10">
                    <span className="text-[11px] text-gray-400">Transmisión HD • Ley TEA N° 21.545</span>
                  </div>
                </div>

                {/* PANTALLA SECUNDARIA LATERAL */}
                <div
                  onClick={intercambiar}
                  className="cursor-pointer group bg-[#252B27] hover:bg-[#2F3731] rounded-xl p-4 border-2 border-[#52796F] flex flex-col justify-between min-h-[300px] relative overflow-hidden shadow-lg transition-all"
                >
                  <div className="flex justify-between items-center z-10">
                    <span className="bg-[#52796F] text-white text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      {pantallaEnfocada === 1 ? 'PANTALLA 2 (SECUNDARIA)' : 'PANTALLA 1 (SECUNDARIA)'}
                    </span>
                    <span className="text-[10px] text-[#97A884] group-hover:underline font-bold">
                      Clic para Agrandar ↗
                    </span>
                  </div>

                  <div className="text-center py-6 space-y-2 z-10">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#52796F]/30 border-2 border-[#52796F] flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                      {pantallaEnfocada === 1 ? '���' : '���'}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-100">
                      {pantallaEnfocada === 1 ? 'Cámara Secundaria / Intérprete LSCh' : portalNombre}
                    </h4>
                    <p className="text-[11px] text-emerald-300 font-semibold">Cámara lateral en vivo</p>
                  </div>

                  <div className="bg-[#52796F]/40 text-center py-2 rounded-lg border border-[#52796F] group-hover:bg-[#52796F] group-hover:text-white transition z-10">
                    <span className="text-[11px] font-extrabold text-white">
                      ��� Agrandar esta Pantalla
                    </span>
                  </div>
                </div>

              </div>
            </div>

            <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#97A884]/40 flex flex-wrap items-center justify-between gap-3 shadow-sm">
              <span className="text-xs font-extrabold text-[#676E5E] min-w-[110px]">
                Audio Entrante:
              </span>
              <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-rose-500 transition-all duration-300"
                  style={{ width: micActivo ? `${nivelAudio}%` : '0%' }}
                />
              </div>
              <span className="text-xs font-bold text-[#52796F] min-w-[50px] text-right">
                {micActivo ? `${nivelAudio}% dB` : '0% dB'}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-start gap-3 pt-1">
              <button
                onClick={() => setMicActivo(!micActivo)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold shadow transition flex items-center gap-2 ${
                  micActivo
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-rose-100 border border-rose-300 text-rose-800 hover:bg-rose-200'
                }`}
              >
                <span>{micActivo ? '���️ Micrófono Activado' : '���️ Micrófono Apagado'}</span>
              </button>

              <button
                onClick={() => setCamActiva(!camActiva)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold shadow transition flex items-center gap-2 ${
                  camActiva
                    ? 'bg-[#676E5E] hover:bg-[#52796F] text-white'
                    : 'bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] hover:bg-[#E6E7D5]'
                }`}
              >
                <span>{camActiva ? '��� Cámara Activada' : 'Encender Cámara'}</span>
              </button>

              <button
                onClick={() => setTranscriptorActivo(!transcriptorActivo)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold shadow transition flex items-center gap-2 ${
                  transcriptorActivo
                    ? 'bg-[#52796F] text-white'
                    : 'bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] hover:bg-[#E6E7D5]'
                }`}
              >
                <span>{transcriptorActivo ? '��� Transcriptor Activado (LSCh)' : 'Activar Transcriptor'}</span>
              </button>
            </div>
          </div>
        )}

        {tabActiva === 'cita' && (
          <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#97A884]/40 text-center space-y-3">
            <h3 className="text-base font-bold text-[#676E5E]">Agendar Cita de Telemedicina / Consultoría B2B</h3>
            <p className="text-xs text-[#52796F]">Selecciona la fecha y hora disponible para conectar con un especialista.</p>
            <div className="pt-2">
              <button className="bg-[#97A884] text-white font-bold text-xs px-5 py-2 rounded-xl hover:bg-[#676E5E] transition">
                ��� Abrir Calendario de Citas
              </button>
            </div>
          </div>
        )}

        {tabActiva === 'reprogramar' && (
          <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#97A884]/40 text-center space-y-3">
            <h3 className="text-base font-bold text-[#676E5E]">Gestión de Citas Existentes</h3>
            <p className="text-xs text-[#52796F]">Ingresa tu código de reserva para cancelar o cambiar de horario.</p>
            <div className="flex justify-center gap-2 max-w-xs mx-auto">
              <input type="text" placeholder="Código de cita" className="px-3 py-1.5 border border-[#97A884] rounded-lg text-xs w-full" />
              <button className="bg-[#676E5E] text-white font-bold text-xs px-4 py-1.5 rounded-lg">Buscar</button>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-[#FAF8F5] border-t border-[#97A884]/30 py-4 px-6 text-center text-xs text-[#676E5E]/80">
        <p>© 2026 ASL Ideas SpA — Sala Virtual en Vivo (/sala-virtual) | Ley TEA N° 21.545</p>
      </footer>
    </main>
  );
}
