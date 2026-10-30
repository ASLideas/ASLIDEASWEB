'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Participante {
  id: string;
  nombre: string;
  rol: 'Especialista' | 'Paciente' | 'Invitado' | 'Familiar';
  camara: boolean;
  mic: boolean;
  avatar: string;
}

export default function SalaVirtualPage() {
  // Estado para la Pantalla de Carga / Intro con Logo
  const [cargandoWeb, setCargandoWeb] = useState(true);

  // Estados de la Sala y Múltiples Invitados
  const [salaNombre, setSalaNombre] = useState<'Lotus' | 'Cielo' | 'Bosque' | 'Raiz'>('Lotus');
  const [modoLayout, setModoLayout] = useState<'galeria' | 'destacado'>('galeria');

  // Múltiples Cajas de Video para Clientes e Invitados
  const [participantes, setParticipantes] = useState<Participante[]>([
    {
      id: '1',
      nombre: 'Especialista ASL',
      rol: 'Especialista',
      camara: true,
      mic: true,
      avatar: '🧘‍♀️',
    },
    {
      id: '2',
      nombre: 'Cliente Principal',
      rol: 'Paciente',
      camara: true,
      mic: true,
      avatar: '😊',
    },
    {
      id: '3',
      nombre: 'Invitado 2 (Familiar)',
      rol: 'Familiar',
      camara: true,
      mic: false,
      avatar: '👴',
    },
    {
      id: '4',
      nombre: 'Invitado 3 (Acompañante)',
      rol: 'Invitado',
      camara: false,
      mic: false,
      avatar: '👩‍🦰',
    },
  ]);

  // Simulación de pantalla de espera / intro de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setCargandoWeb(false);
    }, 2800); // 2.8 segundos de pantalla de espera
    return () => clearTimeout(timer);
  }, []);

  const toggleCamara = (id: string) => {
    setParticipantes(prev =>
      prev.map(p => (p.id === id ? { ...p, camara: !p.camara } : p))
    );
  };

  const toggleMic = (id: string) => {
    setParticipantes(prev =>
      prev.map(p => (p.id === id ? { ...p, mic: !p.mic } : p))
    );
  };

  const agregarInvitado = () => {
    const num = participantes.length + 1;
    const nuevo: Participante = {
      id: Date.now().toString(),
      nombre: `Invitado ${num}`,
      rol: 'Invitado',
      camara: true,
      mic: true,
      avatar: '🧑',
    };
    setParticipantes([...participantes, nuevo]);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#676E5E] relative overflow-x-hidden font-sans">
      
      {/* 1. INTRO Y PANTALLA DE ESPERA / CARGA CON LOGO DE ASL IDEAS */}
      {cargandoWeb && (
        <div className="fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center">
          <div className="relative flex flex-col items-center space-y-6 max-w-md bg-[#E6E7D5] p-8 sm:p-10 rounded-3xl border-2 border-[#97A884] shadow-2xl">
            
            {/* Logo de ASL Ideas con animación */}
            <div className="relative w-32 h-32 bg-white rounded-3xl p-3 border-4 border-[#97A884] shadow-2xl flex items-center justify-center animate-bounce">
              <img 
                src="/logo-asl.png.png" 
                alt="ASL Ideas SpA" 
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#CDD6A9] text-[#676E5E] px-3 py-1 rounded-full border border-[#97A884]">
                ASL Ideas SpA • Carga de Plataforma
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#676E5E]">
                Cargando Sala Virtual...
              </h2>
              <p className="text-xs text-gray-600">
                Iniciando entorno multiusuario e interfaces con accesibilidad cognitiva
              </p>
            </div>

            {/* Barra de Progreso de Carga */}
            <div className="w-full bg-white h-3 rounded-full overflow-hidden border border-[#97A884]">
              <div className="bg-[#676E5E] h-full animate-[progress_2.5s_ease-in-out_infinite] w-4/5 rounded-full" />
            </div>

            <span className="text-[10px] font-mono text-gray-500">
              Conexión encriptada bajo Ley N° 21.663
            </span>

          </div>
        </div>
      )}

      {/* 2. SALA VIRTUAL MULTI-INVITADO EN VIVO */}
      <div className="p-3 sm:p-8 max-w-7xl mx-auto">
        <div className="bg-[#E6E7D5] rounded-3xl border-2 border-[#97A884] shadow-2xl overflow-hidden flex flex-col">
          
          {/* Cabecera */}
          <div className="p-4 sm:p-6 bg-[#E6E7D5] border-b border-[#97A884]/40 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-2xl border-2 border-[#E6C693] p-1.5 flex items-center justify-center shadow-xs">
                <img src="/logo-asl.png.png" alt="ASL Ideas" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-full border border-[#97A884]">
                  Sala Multiusuario • {participantes.length} Cámaras Conectadas
                </span>
                <h1 className="text-lg sm:text-2xl font-black text-[#676E5E] mt-0.5">
                  Sala Virtual {salaNombre} — Transmisión Grupal
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={agregarInvitado}
                className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer"
              >
                + Sumar Invitado
              </button>
              <Link
                href="/admin"
                className="bg-white hover:bg-[#CDD6A9] text-[#676E5E] text-xs font-bold px-3 py-2 rounded-xl border border-[#97A884] transition"
              >
                ⚙️ Admin
              </Link>
            </div>
          </div>

          {/* Selector de Disposición de Video */}
          <div className="p-3 bg-[#CDD6A9]/40 border-b border-[#97A884]/30 flex flex-wrap justify-between items-center text-xs gap-2">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#676E5E]">Modo de Vista:</span>
              <button
                type="button"
                onClick={() => setModoLayout('galeria')}
                className={`px-3 py-1.5 rounded-xl border font-bold cursor-pointer ${
                  modoLayout === 'galeria' ? 'bg-[#676E5E] text-white' : 'bg-white text-[#676E5E] border-[#97A884]'
                }`}
              >
                🔲 Galería Mosaico ({participantes.length})
              </button>
              <button
                type="button"
                onClick={() => setModoLayout('destacado')}
                className={`px-3 py-1.5 rounded-xl border font-bold cursor-pointer ${
                  modoLayout === 'destacado' ? 'bg-[#676E5E] text-white' : 'bg-white text-[#676E5E] border-[#97A884]'
                }`}
              >
                🎙️ Enfoque Principal
              </button>
            </div>

            <span className="text-[11px] font-bold text-[#676E5E] bg-white px-3 py-1 rounded-xl border border-[#97A884]">
              🔒 Cifrado Ley N° 21.663
            </span>
          </div>

          {/* Malla de Videos Multi-Invitados */}
          <div className="p-4 sm:p-6 bg-[#FAF8F5]">
            <div className="bg-slate-900 rounded-3xl border-2 border-[#97A884] p-4 min-h-[520px]">
              
              <div className={`grid gap-4 h-full ${
                modoLayout === 'galeria' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2' 
                  : 'grid-cols-1 lg:grid-cols-3'
              }`}>
                
                {participantes.map((p, idx) => (
                  <div
                    key={p.id}
                    className={`relative rounded-2xl overflow-hidden border-2 flex flex-col justify-between p-4 min-h-[220px] bg-slate-800 ${
                      idx === 0 && modoLayout === 'destacado' ? 'lg:col-span-2 min-h-[340px] border-[#E6C693]' : 'border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center z-10">
                      <span className="bg-black/60 text-white font-bold text-[10px] px-2.5 py-1 rounded-full border border-white/10">
                        {p.nombre} ({p.rol})
                      </span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => toggleCamara(p.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.camara ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                          }`}
                        >
                          {p.camara ? '📷 ON' : '🚫 OFF'}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleMic(p.id)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.mic ? 'bg-blue-600 text-white' : 'bg-amber-600 text-white'
                          }`}
                        >
                          {p.mic ? '🎙️ ON' : '🔇 Mute'}
                        </button>
                      </div>
                    </div>

                    {/* Imagen de la Cámara del Participante */}
                    {p.camara ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-800 to-slate-900">
                        <div className="w-16 h-16 rounded-full bg-[#676E5E] border-2 border-[#CDD6A9] flex items-center justify-center text-3xl mb-2 shadow-lg">
                          {p.avatar}
                        </div>
                        <span className="text-white font-bold text-xs">{p.nombre}</span>
                        <span className="text-[10px] text-emerald-400">Video Transmitiendo</span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-950 text-slate-500">
                        <span className="text-3xl mb-1">🚫</span>
                        <span className="text-xs font-bold text-slate-400">Cámara Apagada</span>
                      </div>
                    )}

                    <div className="z-10 mt-auto flex justify-between items-center bg-black/60 backdrop-blur-xs p-2 rounded-xl text-[10px] text-white">
                      <span>Audio: {p.mic ? 'Activo' : 'Silenciado'}</span>
                      <span className="text-emerald-400 font-bold">Conectado</span>
                    </div>
                  </div>
                ))}

              </div>

            </div>
          </div>

          {/* Pie de Página */}
          <div className="p-4 bg-[#E6E7D5] border-t border-[#97A884]/40 text-center text-xs text-[#676E5E]">
            <p className="font-bold">
              ASL Ideas SpA • Sistema de Teleatención Multiusuario con Accesibilidad Cognitiva
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
