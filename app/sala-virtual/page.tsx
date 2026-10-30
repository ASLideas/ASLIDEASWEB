'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Invitado {
  id: string;
  nombre: string;
  rol: 'Paciente' | 'Especialista' | 'Familiar' | 'Acompañante';
  camaraActiva: boolean;
  micActivo: boolean;
  avatar: string;
  destacado: boolean;
}

export default function SalaVirtualPage() {
  // Estado para la Pantalla de Carga / Intro
  const [cargando, setCargando] = useState(true);

  // Estados de Configuración de Sala
  const [salaActual, setSalaActual] = useState<'Lotus' | 'Cielo' | 'Bosque' | 'Raiz'>('Lotus');
  const [modoDisposicion, setModoDisposicion] = useState<'galeria' | 'presentador' | 'enfoque'>('galeria');
  const [copiadoLink, setCopiadoLink] = useState(false);

  // Lista de Múltiples Invitados Conectados
  const [invitados, setInvitados] = useState<Invitado[]>([
    {
      id: '1',
      nombre: 'Especialista / Instructor ASL',
      rol: 'Especialista',
      camaraActiva: true,
      micActivo: true,
      avatar: '🧘‍♀️',
      destacado: true,
    },
    {
      id: '2',
      nombre: 'Paciente Principal (María G.)',
      rol: 'Paciente',
      camaraActiva: true,
      micActivo: true,
      avatar: '😊',
      destacado: false,
    },
    {
      id: '3',
      nombre: 'Invitado / Familiar (Carlos G.)',
      rol: 'Acompañante',
      camaraActiva: true,
      micActivo: false,
      avatar: '👴',
      destacado: false,
    },
    {
      id: '4',
      nombre: 'Terapeuta Integrativo (Dr. Silva)',
      rol: 'Especialista',
      camaraActiva: false,
      micActivo: false,
      avatar: '👨‍⚕️',
      destacado: false,
    },
  ]);

  // Simulación de Carga Inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Funciones de Control de Invitados
  const toggleCamara = (id: string) => {
    setInvitados(prev =>
      prev.map(inv => (inv.id === id ? { ...inv, camaraActiva: !inv.camaraActiva } : inv))
    );
  };

  const toggleMic = (id: string) => {
    setInvitados(prev =>
      prev.map(inv => (inv.id === id ? { ...inv, micActivo: !inv.micActivo } : inv))
    );
  };

  const destacarInvitado = (id: string) => {
    setInvitados(prev =>
      prev.map(inv => ({ ...inv, destacado: inv.id === id }))
    );
    setModoDisposicion('enfoque');
  };

  const agregarNuevoInvitado = () => {
    const num = invitados.length + 1;
    const nuevo: Invitado = {
      id: Date.now().toString(),
      nombre: `Invitado ${num} (Nuevo Paciente)`,
      rol: 'Paciente',
      camaraActiva: true,
      micActivo: true,
      avatar: ['🙋‍♂️', '👵', '👩‍🦰', '🧑'][Math.floor(Math.random() * 4)],
      destacado: false,
    };
    setInvitados([...invitados, nuevo]);
  };

  const copiarEnlace = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiadoLink(true);
    setTimeout(() => setCopiadoLink(false), 3000);
  };

  // Simular Descarga de la Guía de Bienvenida
  const descargarGuia = () => {
    const contenido = `====================================================\nASL IDEAS SpA - GUÍA DE SALA VIRTUAL Y ACCESIBILIDAD\n====================================================\nBienvenido/a a la Sala Virtual Interactiva de Salud Integrativa.\n\nInstrucciones:\n1. Mantén tu micrófono en silencio mientras el especialista expone.\n2. Si requieres pausas sensoriales o descanso visual, puedes apagar tu cámara.\n3. Cumplimiento estricto de Ciberseguridad Ley N° 21.663 y Accesibilidad Ley N° 21.545.\n\nASL Ideas SpA - Todos los derechos reservados.`;
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ASL_Guia_Bienvenida_Sala_Virtual.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#676E5E] relative overflow-x-hidden font-sans">
      
      {/* 1. PANTALLA DE CARGA / INTRO CON OPCIÓN DE DESCARGA */}
      {cargando && (
        <div className="fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center">
          <div className="relative flex flex-col items-center space-y-5 max-w-md bg-[#E6E7D5] p-8 rounded-3xl border-2 border-[#97A884] shadow-2xl">
            
            {/* Logo de ASL Ideas */}
            <div className="relative w-28 h-28 bg-white rounded-3xl p-3 border-4 border-[#97A884] shadow-xl flex items-center justify-center animate-pulse">
              <img 
                src="/logo-asl.png.png" 
                alt="ASL Ideas SpA" 
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#CDD6A9] text-[#676E5E] px-3 py-1 rounded-full border border-[#97A884]">
                ASL Ideas SpA • Teleatención Multi-Invitado
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#676E5E] mt-1">
                Conectando Sala Virtual...
              </h2>
              <p className="text-xs text-gray-600">
                Ajustando entorno multiusuario y cifrado en vivo Ley N° 21.663
              </p>
            </div>

            {/* Barra de Progreso */}
            <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-[#97A884]">
              <div className="bg-[#676E5E] h-full animate-[progress_2s_ease-in-out_infinite] w-4/5 rounded-full" />
            </div>

            {/* BOTÓN DE DESCARGA EN LA INTRO */}
            <div className="pt-2 border-t border-[#97A884]/40 w-full">
              <button
                type="button"
                onClick={descargarGuia}
                className="w-full bg-white hover:bg-[#CDD6A9] text-[#676E5E] font-extrabold text-xs py-2.5 px-4 rounded-xl border border-[#97A884] transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                📥 Descargar Guía de Bienvenida (Pauta PDF / TXT)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 2. CONTENIDO PRINCIPAL DE LA SALA VIRTUAL */}
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
                  Sala Multiusuario • {invitados.length} Participantes Conectados
                </span>
                <h1 className="text-lg sm:text-2xl font-black text-[#676E5E] mt-0.5">
                  Oficina {salaActual} — Videollamada Grupal
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={descargarGuia}
                className="bg-white hover:bg-[#CDD6A9] text-[#676E5E] text-xs font-bold px-3 py-2 rounded-xl border border-[#97A884] transition flex items-center gap-1 cursor-pointer"
              >
                📥 Guía de Sala
              </button>
              <Link
                href="/admin"
                className="bg-white hover:bg-[#CDD6A9] text-[#676E5E] text-xs font-bold px-3 py-2 rounded-xl border border-[#97A884] transition"
              >
                ⚙️ Admin
              </Link>
              <Link
                href="/"
                className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition"
              >
                ← Salir
              </Link>
            </div>
          </div>

          {/* Menú de Disposición de Pantallas y Gestión de Invitados */}
          <div className="p-3 bg-[#CDD6A9]/40 border-b border-[#97A884]/30 flex flex-wrap justify-between items-center text-xs gap-2">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[#676E5E]">Disposición:</span>
              
              <button
                type="button"
                onClick={() => setModoDisposicion('galeria')}
                className={`px-3 py-1.5 rounded-xl border font-bold cursor-pointer transition ${
                  modoDisposicion === 'galeria' ? 'bg-[#676E5E] text-white border-[#676E5E]' : 'bg-white text-[#676E5E] border-[#97A884]'
                }`}
              >
                🔲 Galería ({invitados.length})
              </button>

              <button
                type="button"
                onClick={() => setModoDisposicion('presentador')}
                className={`px-3 py-1.5 rounded-xl border font-bold cursor-pointer transition ${
                  modoDisposicion === 'presentador' ? 'bg-[#676E5E] text-white border-[#676E5E]' : 'bg-white text-[#676E5E] border-[#97A884]'
                }`}
              >
                🎙️ Presentador + Lista
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={agregarNuevoInvitado}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold px-3 py-1.5 rounded-xl transition cursor-pointer shadow-xs"
              >
                + Añadir Invitado
              </button>

              <button
                type="button"
                onClick={copiarEnlace}
                className="bg-white hover:bg-[#CDD6A9] text-[#676E5E] font-extrabold px-3 py-1.5 rounded-xl border border-[#97A884] transition cursor-pointer"
              >
                {copiadoLink ? '✅ ¡Enlace Copiado!' : '🔗 Copiar Enlace Invitación'}
              </button>
            </div>
          </div>

          {/* ÁREA DE VIDEO - MULTI-INVITADO DINÁMICO */}
          <div className="p-4 sm:p-6 bg-[#FAF8F5]">
            <div className="bg-slate-900 rounded-3xl border-2 border-[#97A884] p-4 min-h-[500px] shadow-inner">
              
              {/* MODO GALERÍA: MOSAICO MULTI-INVITADO (2x2 / 3x2) */}
              {modoDisposicion === 'galeria' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 h-full">
                  {invitados.map(inv => (
                    <div
                      key={inv.id}
                      className={`relative rounded-2xl overflow-hidden border-2 flex flex-col justify-between p-4 min-h-[230px] transition-all ${
                        inv.destacado ? 'border-[#E6C693] bg-slate-800' : 'border-slate-700 bg-slate-850'
                      }`}
                    >
                      <div className="flex justify-between items-center z-10">
                        <span className="bg-black/60 text-white font-bold text-[10px] px-2.5 py-1 rounded-full border border-white/10">
                          {inv.nombre} ({inv.rol})
                        </span>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => toggleCamara(inv.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              inv.camaraActiva ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                            }`}
                          >
                            {inv.camaraActiva ? '📷 ON' : '🚫 OFF'}
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleMic(inv.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              inv.micActivo ? 'bg-blue-600 text-white' : 'bg-amber-600 text-white'
                            }`}
                          >
                            {inv.micActivo ? '🎙️ ON' : '🔇 Mute'}
                          </button>
                        </div>
                      </div>

                      {/* Video / Avatar */}
                      {inv.camaraActiva ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-800 to-slate-900">
                          <div className="w-16 h-16 rounded-full bg-[#676E5E] border-2 border-[#CDD6A9] flex items-center justify-center text-3xl mb-2 shadow-lg">
                            {inv.avatar}
                          </div>
                          <span className="text-white font-bold text-xs">{inv.nombre}</span>
                          <span className="text-[10px] text-emerald-400">Transmisión Activa</span>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-950 text-slate-500">
                          <span className="text-3xl mb-1">🚫</span>
                          <span className="text-xs font-bold text-slate-400">Cámara Inactiva</span>
                        </div>
                      )}

                      <div className="z-10 mt-auto flex justify-between items-center bg-black/60 backdrop-blur-xs p-2 rounded-xl text-[10px] text-white">
                        <span>Estado: Conectado</span>
                        <button
                          type="button"
                          onClick={() => destacarInvitado(inv.id)}
                          className="text-[#E6C693] font-bold hover:underline"
                        >
                          ⭐ Enfocar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* MODO PRESENTADOR: PRINCIPAL + COLUMNA DE INVITADOS */}
              {modoDisposicion === 'presentador' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                  {/* Pantalla Principal Destacada */}
                  <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border-2 border-[#E6C693] bg-slate-800 p-4 min-h-[360px] flex flex-col justify-between">
                    <span className="z-10 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider self-start">
                      🔴 Transmisión Principal — {invitados.find(i => i.destacado)?.nombre || invitados[0].nombre}
                    </span>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-slate-850">
                      <div className="w-24 h-24 rounded-full bg-[#676E5E] border-4 border-[#CDD6A9] flex items-center justify-center text-4xl mb-3 shadow-2xl">
                        {invitados.find(i => i.destacado)?.avatar || '🧘‍♀️'}
                      </div>
                      <h3 className="text-white font-bold text-lg">
                        {invitados.find(i => i.destacado)?.nombre || invitados[0].nombre}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1">Exposición de Teleatención y Salud Integrativa</p>
                    </div>
                  </div>

                  {/* Columna Lateral de Invitados */}
                  <div className="space-y-3 overflow-y-auto max-h-[420px] pr-1">
                    <span className="text-xs font-bold text-slate-400 block mb-2">
                      Otros Invitados en Sala ({invitados.length - 1}):
                    </span>
                    {invitados.map(inv => (
                      <div
                        key={inv.id}
                        className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center justify-between text-xs text-white"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-xl">{inv.avatar}</span>
                          <div>
                            <p className="font-bold truncate max-w-[120px]">{inv.nombre}</p>
                            <span className="text-[9px] text-slate-400">{inv.rol}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => destacarInvitado(inv.id)}
                          className="bg-[#CDD6A9] text-[#676E5E] font-extrabold px-2 py-1 rounded-lg text-[10px]"
                        >
                          Enfocar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Pie de Página */}
          <div className="p-4 bg-[#E6E7D5] border-t border-[#97A884]/40 text-center text-xs text-[#676E5E] space-y-1">
            <p className="font-bold">
              ASL Ideas SpA • Teleatención Multi-Invitado con Accesibilidad Cognitiva (Ley N° 21.545)
            </p>
            <p className="text-[10px] text-gray-500">
              Canal de Transmisión Encriptado bajo la Ley N° 21.663 de Ciberseguridad
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}