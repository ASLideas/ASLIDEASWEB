'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Invitado {
  id: string;
  nombre: string;
  rol: string;
  camara: boolean;
  mic: boolean;
  avatar: string;
}

export default function HomePage() {
  const [pestañaActiva, setPestañaActiva] = useState<'ficha' | 'sala' | 'agendar' | 'cancelar'>('sala');
  const [modoVista, setModoVista] = useState<'dividida' | 'flotante' | 'galeria'>('dividida');

  // Participantes de la Videollamada (Especialista + Cliente + Invitados)
  const [participantes, setParticipantes] = useState<Invitado[]>([
    {
      id: '1',
      nombre: '1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)',
      rol: 'Anfitrión / Especialista',
      camara: true,
      mic: true,
      avatar: '🧘‍♀️',
    },
    {
      id: '2',
      nombre: 'Cliente / Paciente Conectado',
      rol: 'Cliente Principal',
      camara: true,
      mic: true,
      avatar: '😊',
    },
    {
      id: '3',
      nombre: 'Invitado Secundario (Familiar/Acompañante)',
      rol: 'Acompañante',
      camara: true,
      mic: false,
      avatar: '👴',
    },
  ]);

  const toggleCamara = (id: string) => {
    setParticipantes(prev => prev.map(p => p.id === id ? { ...p, camara: !p.camara } : p));
  };

  const toggleMic = (id: string) => {
    setParticipantes(prev => prev.map(p => p.id === id ? { ...p, mic: !p.mic } : p));
  };

  const agregarCliente = () => {
    const num = participantes.length + 1;
    setParticipantes([
      ...participantes,
      {
        id: Date.now().toString(),
        nombre: `Cliente / Invitado ${num}`,
        rol: 'Invitado',
        camara: true,
        mic: true,
        avatar: '🧑',
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#676E5E] p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Cabecera Superior */}
        <div className="flex flex-wrap justify-between items-center bg-[#E6E7D5] p-4 rounded-2xl border border-[#97A884]">
          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] px-3 py-1 rounded-full border border-[#97A884]">
              OFICINA VIRTUAL 01 — ASL IDEAS SPA
            </span>
            <h1 className="text-xl font-black">Sala Virtual Interactiva en Vivo</h1>
          </div>
          <Link href="/admin" className="text-xs bg-white hover:bg-[#CDD6A9] font-bold px-3 py-1.5 rounded-xl border border-[#97A884]">
            ⚙️ Administrar
          </Link>
        </div>

        {/* Navegación por Pestañas */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#E6E7D5] p-1.5 rounded-2xl border border-[#97A884] text-xs font-bold text-center">
          <button 
            onClick={() => setPestañaActiva('ficha')}
            className={`py-2 rounded-xl transition ${pestañaActiva === 'ficha' ? 'bg-[#676E5E] text-white' : 'hover:bg-white'}`}
          >
            Ficha de Oficina
          </button>
          <button 
            onClick={() => setPestañaActiva('sala')}
            className={`py-2 rounded-xl transition ${pestañaActiva === 'sala' ? 'bg-[#676E5E] text-white' : 'hover:bg-white'}`}
          >
            Sala en Vivo ({participantes.length} Cámaras)
          </button>
          <button 
            onClick={() => setPestañaActiva('agendar')}
            className={`py-2 rounded-xl transition ${pestañaActiva === 'agendar' ? 'bg-[#676E5E] text-white' : 'hover:bg-white'}`}
          >
            Agendar Cita
          </button>
          <button 
            onClick={() => setPestañaActiva('cancelar')}
            className={`py-2 rounded-xl transition ${pestañaActiva === 'cancelar' ? 'bg-[#676E5E] text-white' : 'hover:bg-white'}`}
          >
            Cancelar / Reprogramar
          </button>
        </div>

        {/* CONTENIDO DE PESTAÑA: SALA EN VIVO MULTI-CLIENTE */}
        {pestañaActiva === 'sala' && (
          <div className="bg-[#3D473D] text-white p-6 rounded-3xl border-2 border-[#97A884] space-y-4 shadow-2xl">
            
            {/* Barra de Estado y Controles de Vista */}
            <div className="flex flex-wrap justify-between items-center text-xs gap-2 border-b border-white/20 pb-3">
              <span className="bg-[#CDD6A9] text-[#676E5E] font-extrabold px-3 py-1 rounded-full border border-[#97A884]">
                🟢 SALA INTERACTIVA LISTA • {participantes.length} Cámaras Activas
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => setModoVista('dividida')}
                  className={`px-3 py-1 rounded-lg font-bold border transition ${
                    modoVista === 'dividida' ? 'bg-white text-[#676E5E]' : 'bg-black/40 text-white'
                  }`}
                >
                  🌓 Mismo Tamaño (50/50)
                </button>
                <button
                  onClick={() => setModoVista('galeria')}
                  className={`px-3 py-1 rounded-lg font-bold border transition ${
                    modoVista === 'galeria' ? 'bg-white text-[#676E5E]' : 'bg-black/40 text-white'
                  }`}
                >
                  🔲 Mosaico Múltiple
                </button>
                <button
                  onClick={agregarCliente}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded-lg"
                >
                  + Agregar Cliente
                </button>
              </div>
            </div>

            {/* GRILLA DE PANTALLAS: CLIENTE + ESPECIALISTA */}
            <div className={`grid gap-4 ${
              modoVista === 'dividida' 
                ? 'grid-cols-1 md:grid-cols-2' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {participantes.map((p) => (
                <div 
                  key={p.id}
                  className="relative bg-slate-900 border-2 border-[#97A884] rounded-2xl p-4 min-h-[260px] flex flex-col justify-between shadow-lg"
                >
                  {/* Encabezado de la pantalla */}
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[10px] font-bold bg-black/70 px-2.5 py-1 rounded-full text-white border border-white/20 truncate max-w-[200px]">
                      {p.nombre}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => toggleCamara(p.id)}
                        className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                          p.camara ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                        }`}
                      >
                        {p.camara ? '📷 ON' : '🚫 OFF'}
                      </button>
                      <button
                        onClick={() => toggleMic(p.id)}
                        className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                          p.mic ? 'bg-blue-600 text-white' : 'bg-amber-600 text-white'
                        }`}
                      >
                        {p.mic ? '🎙️ ON' : '🔇 Mute'}
                      </button>
                    </div>
                  </div>

                  {/* Video Simulado del Participante */}
                  {p.camara ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-800 to-slate-900">
                      <div className="w-16 h-16 rounded-full bg-[#676E5E] border-2 border-[#CDD6A9] flex items-center justify-center text-3xl mb-2 shadow-md">
                        {p.avatar}
                      </div>
                      <span className="text-white font-bold text-xs text-center">{p.nombre}</span>
                      <span className="text-[10px] text-emerald-400 mt-0.5">Transmisión Cifrada en Vivo</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-950 text-slate-500">
                      <span className="text-3xl mb-1">🚫</span>
                      <span className="text-xs font-bold text-slate-400">Cámara Inactiva</span>
                    </div>
                  )}

                  {/* Pie del recuadro */}
                  <div className="z-10 mt-auto flex justify-between items-center bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-xl text-[10px]">
                    <span className="text-slate-300">{p.rol}</span>
                    <span className="text-emerald-400 font-bold">Conectado</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicador de Audio Entrante y Controles Inferiores */}
            <div className="bg-black/40 p-3 rounded-2xl border border-white/10 flex flex-wrap justify-between items-center gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-300">Audio Entrante:</span>
                <div className="w-32 bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-amber-400 h-full w-3/4 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono text-emerald-400">0% dB</span>
              </div>

              <div className="flex gap-2">
                <span className="bg-emerald-900 text-emerald-200 border border-emerald-500 px-3 py-1 rounded-xl font-bold">
                  Micrófono Activado
                </span>
                <span className="bg-slate-800 text-slate-200 border border-slate-600 px-3 py-1 rounded-xl font-bold">
                  Cámara Encendida
                </span>
                <span className="bg-slate-800 text-slate-200 border border-slate-600 px-3 py-1 rounded-xl font-bold">
                  Transcriptor Activo
                </span>
              </div>
            </div>

            {/* Paneles Inferiores: Archivos, Transcripción y Minuta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
              <div className="bg-white text-[#676E5E] p-3 rounded-2xl border border-[#97A884]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-extrabold uppercase text-[10px]">Archivos Adjuntos</span>
                  <button className="bg-[#CDD6A9] text-[#676E5E] font-bold px-2 py-0.5 rounded text-[10px]">+ Subir</button>
                </div>
                <p className="text-[11px] text-gray-500 italic">No hay archivos adjuntos en esta sesión.</p>
              </div>

              <div className="bg-white text-[#676E5E] p-3 rounded-2xl border border-[#97A884]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-extrabold uppercase text-[10px]">Transcripción en Vivo</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Escuchando...</span>
                </div>
                <p className="text-[11px] text-gray-500 italic">Iniciando transcripción automática de audio...</p>
              </div>

              <div className="bg-white text-[#676E5E] p-3 rounded-2xl border border-[#97A884]">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-extrabold uppercase text-[10px]">Minuta y Compromisos</span>
                  <span className="text-[10px] text-gray-400">Autoguardado</span>
                </div>
                <p className="text-[11px] text-gray-500 italic">Registrando acuerdo de atención e indicaciones.</p>
              </div>
            </div>

          </div>
        )}

        {/* PIE DE PÁGINA CON LOGO AMPLIA D0 */}
        <div className="bg-[#E6E7D5] p-6 rounded-2xl border border-[#97A884] flex flex-col items-center justify-center text-center space-y-2">
          <img 
            src="/logo-asl.png.png" 
            alt="ASL Ideas SpA" 
            className="w-20 h-20 sm:w-28 sm:h-28 object-contain drop-shadow-md transition-transform hover:scale-105" 
          />
          <p className="font-bold text-xs text-[#676E5E]">
            ASL Ideas SpA • Sistema de Teleatención Multiusuario con Accesibilidad Cognitiva (Ley N° 21.545)
          </p>
        </div>

      </div>
    </div>
  );
}