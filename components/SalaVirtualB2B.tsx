'use client';

import React, { useState } from 'react';

interface SalaVirtualB2BProps {
  portalNombre?: string;
  onCerrar?: () => void;
}

export default function SalaVirtualB2B({ 
  portalNombre = '1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)', 
  onCerrar 
}: SalaVirtualB2BProps) {
  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita' | 'reprogramar'>('vivo');
  const [pantallaEnfocada, setPantallaEnfocada] = useState<1 | 2>(1);
  const [micActivo, setMicActivo] = useState(true);
  const [camActiva, setCamActiva] = useState(false);
  const [transcriptorActivo, setTranscriptorActivo] = useState(false);
  const [nivelAudio, setNivelAudio] = useState(45);

  const intercambiar = () => {
    setPantallaEnfocada(prev => (prev === 1 ? 2 : 1));
  };

  return (
    <div className="w-full bg-[#E6E7D5]/90 p-3 sm:p-5 rounded-2xl border border-[#97A884]/40 shadow-xl space-y-4">
      {/* BARRA DE PESTAÑAS Y RESTAURAR PANTALLA */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#97A884]/30 pb-3">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <button
            onClick={() => setTabActiva('vivo')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition shadow-sm ${
              tabActiva === 'vivo'
                ? 'bg-[#676E5E] text-white'
                : 'bg-[#FAF8F5] text-[#676E5E] hover:bg-[#E6E7D5]'
            }`}
          >
            Sala en Vivo
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
          onClick={onCerrar || (() => {})}
          className="bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#E6E7D5] transition shadow-sm"
        >
          Restaurar Pantalla
        </button>
      </div>

      {tabActiva === 'vivo' && (
        <div className="space-y-4">
          {/* BOTÓN SUPERIOR DE INTERCAMBIO */}
          <div className="flex justify-between items-center bg-[#FAF8F5] p-2.5 rounded-xl border border-[#97A884]/40">
            <span className="text-xs font-extrabold text-[#52796F] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              SALA MULTI-PANTALLA (2 TRANSMISIONES ACTIVAS)
            </span>
            <button
              onClick={intercambiar}
              className="bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-lg transition shadow flex items-center gap-1.5"
            >
              ��� <span>Intercambiar Pantallas</span>
            </button>
          </div>

          {/* MARCO CONTENEDOR DE 2 PANTALLAS SIMULTÁNEAS */}
          <div className="bg-[#1E231F] rounded-2xl border-2 border-[#52796F]/60 p-3 sm:p-4 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* PANTALLA 1: PRINCIPAL (AGRANDADA - 2 COLUMNAS) */}
              <div
                className={`md:col-span-2 rounded-xl p-4 border-2 transition-all flex flex-col justify-between min-h-[260px] relative overflow-hidden shadow-lg ${
                  pantallaEnfocada === 1
                    ? 'bg-[#2A322C] border-[#97A884]'
                    : 'bg-[#252B27] border-[#52796F]'
                }`}
              >
                <div className="flex justify-between items-center z-10">
                  <span className="bg-[#97A884] text-white text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    {pantallaEnfocada === 1 ? 'PANTALLA 1 (PRINCIPAL AGRANDADA)' : 'PANTALLA 2 (PRINCIPAL AGRANDADA)'}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold">Enfoque Principal</span>
                </div>

                <div className="text-center py-6 space-y-3 z-10">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#97A884]/20 border-2 border-[#97A884] flex items-center justify-center p-2 shadow-inner">
                    <img
                      src="/logo-asl.png.png"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/LOGO_asl.png'; }}
                      alt="ASL"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {pantallaEnfocada === 1 ? portalNombre : 'Cámara Secundaria / Invitado B2B'}
                  </h3>
                  <button
                    onClick={() => setCamActiva(!camActiva)}
                    className="bg-[#FAF8F5] hover:bg-white text-[#676E5E] text-xs font-extrabold px-4 py-2 rounded-xl shadow transition border border-[#97A884]"
                  >
                    {camActiva ? '��� Cámara Web Activa' : 'Encender Cámara Web y Micrófono Real'}
                  </button>
                </div>

                <div className="text-right z-10">
                  <span className="text-[10px] text-gray-400">Transmisión HD • Ley TEA N° 21.545</span>
                </div>
              </div>

              {/* PANTALLA 2: SECUNDARIA (MINIATURA LATERAL - 1 COLUMNA) */}
              <div
                onClick={intercambiar}
                className="cursor-pointer group bg-[#252B27] hover:bg-[#2F3731] rounded-xl p-4 border-2 border-[#52796F] flex flex-col justify-between min-h-[260px] relative overflow-hidden shadow-lg transition-all"
              >
                <div className="flex justify-between items-center z-10">
                  <span className="bg-[#52796F] text-white text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                    {pantallaEnfocada === 1 ? 'PANTALLA 2 (SECUNDARIA)' : 'PANTALLA 1 (SECUNDARIA)'}
                  </span>
                  <span className="text-[10px] text-[#97A884] group-hover:underline font-bold">
                    Clic para Agrandar ↗
                  </span>
                </div>

                <div className="text-center py-5 space-y-2 z-10">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#52796F]/30 border-2 border-[#52796F] flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {pantallaEnfocada === 1 ? '���' : '���'}
                  </div>
                  <h4 className="text-xs font-bold text-gray-100">
                    {pantallaEnfocada === 1 ? 'Cámara Secundaria / Intérprete LSCh' : portalNombre}
                  </h4>
                  <p className="text-[10px] text-emerald-300 font-semibold">Cámara lateral en vivo</p>
                </div>

                <div className="bg-[#52796F]/40 text-center py-2 rounded-lg border border-[#52796F] group-hover:bg-[#52796F] group-hover:text-white transition z-10">
                  <span className="text-[11px] font-extrabold text-white">
                    ��� Agrandar esta Pantalla
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* INDICADOR DE AUDIO ENTRANTE */}
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

          {/* BOTONES INFERIORES DE CONTROL */}
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
  );
}
