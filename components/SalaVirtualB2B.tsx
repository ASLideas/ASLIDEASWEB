'use client';

import React, { useState } from 'react';

interface SalaVirtualB2BProps {
  isOpen: boolean;
  onClose: () => void;
  initialApp?: string;
  appLogo?: string;
}

export default function SalaVirtualB2B({
  isOpen,
  onClose,
  initialApp = 'ASL Ideas SpA — Demo B2B',
  appLogo = '/logo.png',
}: SalaVirtualB2BProps) {
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [activeTab, setActiveTab] = useState<'video' | 'chat' | 'participantes'>('video');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] w-full max-w-5xl rounded-3xl border-2 border-[#97A884] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* CABECERA DE LA SALA VIRTUAL */}
        <div className="bg-[#E6E7D5] border-b border-[#97A884] px-5 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#97A884] p-1 flex items-center justify-center">
              <img src={appLogo} alt="Logo App" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="font-extrabold text-sm text-[#676E5E]">{initialApp}</h3>
              </div>
              <p className="text-[10px] text-[#52796F] font-bold">
                Sala Multiusuario B2B • Encriptación Ley N° 21.663
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 bg-white hover:bg-rose-50 text-[#676E5E] hover:text-rose-600 rounded-full font-black text-sm border border-[#97A884] transition flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* CUERPO PRINCIPAL - CUADRÍCULA MULTI-LLAMADA */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          
          {/* NAVEGACIÓN DE PESTAÑAS DENTRO DE LA SALA */}
          <div className="flex border-b border-[#97A884]/30 pb-2 space-x-2">
            <button
              type="button"
              onClick={() => setActiveTab('video')}
              className={`px-4 py-1.5 text-xs font-extrabold rounded-xl transition cursor-pointer ${
                activeTab === 'video'
                  ? 'bg-[#676E5E] text-white'
                  : 'bg-white text-[#676E5E] border border-[#97A884]'
              }`}
            >
              🎥 Cuadrícula Multi-Cámara (4)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('participantes')}
              className={`px-4 py-1.5 text-xs font-extrabold rounded-xl transition cursor-pointer ${
                activeTab === 'participantes'
                  ? 'bg-[#676E5E] text-white'
                  : 'bg-white text-[#676E5E] border border-[#97A884]'
              }`}
            >
              👥 Participantes Conectados (4)
            </button>
          </div>

          {activeTab === 'video' ? (
            /* CUADRÍCULA DE 4 CÁMARAS SIMULTÁNEAS */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              
              {/* Cámara 1: Moderador / Anfitrión */}
              <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border-2 border-[#97A884] flex flex-col justify-between p-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="bg-[#676E5E] text-white text-[9px] font-extrabold px-2.5 py-1 rounded-lg border border-white/20">
                    🎙️ Moderador (ASL Ideas)
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-[#E6E7D5] rounded-full mx-auto flex items-center justify-center font-black text-[#676E5E] text-lg border-2 border-white shadow-xs">
                    AI
                  </div>
                  <p className="text-white text-xs font-bold mt-2">Dra. Anfitriona</p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-300">
                  <span>Señal HD</span>
                  <span>Audio Activo</span>
                </div>
              </div>

              {/* Cámara 2: Participante B2B */}
              <div className="relative aspect-video bg-gray-800 rounded-2xl overflow-hidden border-2 border-[#84A59D] flex flex-col justify-between p-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="bg-[#84A59D] text-white text-[9px] font-extrabold px-2.5 py-1 rounded-lg">
                    👤 Participante Institucional
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-[#84A59D] rounded-full mx-auto flex items-center justify-center font-black text-white text-lg border-2 border-white shadow-xs">
                    B2B
                  </div>
                  <p className="text-white text-xs font-bold mt-2">Usuario Convenio</p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-300">
                  <span>Conectado</span>
                  <span>Micrófono listo</span>
                </div>
              </div>

              {/* Cámara 3: Transmisión de Contenido / Sala Temática */}
              <div className="relative aspect-video bg-[#52796F] rounded-2xl overflow-hidden border-2 border-[#E6C693] flex flex-col justify-between p-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="bg-[#E6C693] text-[#676E5E] text-[9px] font-black px-2.5 py-1 rounded-lg">
                    🌿 Sala Lotus (Movimiento Adaptado)
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <div className="text-center py-2 space-y-1">
                  <span className="text-3xl">🪷</span>
                  <p className="text-white text-xs font-extrabold">Pausa Activa de Cortisol</p>
                  <p className="text-[10px] text-emerald-100">Ejercicio sin impacto en vivo</p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-emerald-100">
                  <span>Canal Temático</span>
                  <span>Transmitiendo</span>
                </div>
              </div>

              {/* Cámara 4: Lengua de Señas / Accesibilidad Cognitiva */}
              <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden border-2 border-[#CDD6A9] flex flex-col justify-between p-3 shadow-sm">
                <div className="flex justify-between items-start">
                  <span className="bg-[#CDD6A9] text-[#676E5E] text-[9px] font-black px-2.5 py-1 rounded-lg">
                    🤟 Intérprete Lengua de Señas
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-[#CDD6A9] rounded-full mx-auto flex items-center justify-center font-black text-[#676E5E] text-lg border-2 border-white shadow-xs">
                    LS
                  </div>
                  <p className="text-white text-xs font-bold mt-2">Canal de Inclusión TEA/TDAH</p>
                </div>
                <div className="flex justify-between items-center text-[10px] text-gray-300">
                  <span>Ley N° 21.545</span>
                  <span>Activo</span>
                </div>
              </div>

            </div>
          ) : (
            /* VISTA DE PARTICIPANTES */
            <div className="bg-white rounded-2xl p-4 border border-[#97A884] space-y-3">
              <h4 className="font-black text-xs text-[#676E5E]">Integrantes en la Sesión (4)</h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center justify-between p-2 bg-[#FAF8F5] rounded-xl border border-[#97A884]/40">
                  <span className="font-bold text-[#676E5E]">🎙️ Anfitrión Técnico — ASL Ideas</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">Moderador</span>
                </li>
                <li className="flex items-center justify-between p-2 bg-[#FAF8F5] rounded-xl border border-[#97A884]/40">
                  <span className="font-bold text-[#676E5E]">👤 Especialista de Salud Integrativa</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-md">Expositor</span>
                </li>
                <li className="flex items-center justify-between p-2 bg-[#FAF8F5] rounded-xl border border-[#97A884]/40">
                  <span className="font-bold text-[#676E5E]">🤟 Intérprete de Lengua de Señas (LS)</span>
                  <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-md">Inclusión</span>
                </li>
                <li className="flex items-center justify-between p-2 bg-[#FAF8F5] rounded-xl border border-[#97A884]/40">
                  <span className="font-bold text-[#676E5E]">💻 Invitado B2B / Institucional</span>
                  <span className="text-[10px] bg-gray-100 text-gray-700 font-bold px-2 py-0.5 rounded-md">Oyente</span>
                </li>
              </ul>
            </div>
          )}

        </div>

        {/* BARRA DE CONTROLES INFERIOR */}
        <div className="bg-[#E6E7D5] border-t border-[#97A884] px-5 py-3 flex flex-wrap justify-between items-center gap-3 shrink-0">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setMicActive(!micActive)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                micActive
                  ? 'bg-[#676E5E] text-white'
                  : 'bg-rose-600 text-white'
              }`}
            >
              <span>{micActive ? '🎙️ Micrófono ON' : '🎙️ Micrófono OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setVideoActive(!videoActive)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
                videoActive
                  ? 'bg-[#676E5E] text-white'
                  : 'bg-rose-600 text-white'
              }`}
            >
              <span>{videoActive ? '📹 Cámara ON' : '📹 Cámara OFF'}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="bg-rose-700 hover:bg-rose-800 text-white font-extrabold text-xs px-5 py-2 rounded-xl border border-rose-900 transition cursor-pointer shadow-xs"
          >
            🚪 Salir de la Sala
          </button>
        </div>

      </div>
    </div>
  );
}