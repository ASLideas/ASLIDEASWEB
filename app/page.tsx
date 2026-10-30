'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Participante {
  id: string;
  nombre: string;
  rol: string;
  camara: boolean;
  mic: boolean;
}

export default function HomePage() {
  // Pantalla de espera / Intro de carga
  const [cargandoWeb, setCargandoWeb] = useState(true);

  // Navegación por Pestañas Principales
  const [pestañaActiva, setPestañaActiva] = useState<'ficha' | 'sala' | 'agendar' | 'cancelar'>('sala');
  const [modoVista, setModoVista] = useState<'dividida' | 'galeria'>('dividida');

  // Participantes de la Videollamada
  const [participantes, setParticipantes] = useState<Participante[]>([
    {
      id: '1',
      nombre: '1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)',
      rol: 'Anfitrión / Especialista',
      camara: true,
      mic: true,
    },
    {
      id: '2',
      nombre: 'Cliente / Paciente Conectado',
      rol: 'Cliente Principal',
      camara: true,
      mic: true,
    },
    {
      id: '3',
      nombre: 'Invitado Secundario (Familiar / Acompañante)',
      rol: 'Acompañante',
      camara: true,
      mic: false,
    },
  ]);

  // Simular la carga inicial de la web
  useEffect(() => {
    const timer = setTimeout(() => {
      setCargandoWeb(false);
    }, 2200);
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
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#676E5E] relative overflow-x-hidden font-sans">
      
      {/* 1. INTRO / PANTALLA DE CARGA DE LA WEB (SIN EMOJIS) */}
      {cargandoWeb && (
        <div className="fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col items-center justify-center p-6 text-center">
          <div className="relative flex flex-col items-center space-y-6 max-w-md bg-[#E6E7D5] p-8 sm:p-10 rounded-3xl border-2 border-[#97A884] shadow-2xl">
            
            {/* Logo oficial de ASL Ideas */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-3xl p-3 border-4 border-[#97A884] shadow-xl flex items-center justify-center">
              <img 
                src="/logo-asl.png.png" 
                alt="ASL Ideas SpA" 
                className="w-full h-full object-contain"
              />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-[#CDD6A9] text-[#676E5E] px-3 py-1 rounded-full border border-[#97A884]">
                ASL Ideas SpA • Salud Digital Inclusiva
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#676E5E] pt-1">
                Cargando Plataforma Web...
              </h2>
              <p className="text-xs text-gray-600">
                Iniciando ecosistema accesible y entorno cifrado Ley N° 21.663
              </p>
            </div>

            {/* Barra de Progreso */}
            <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-[#97A884]">
              <div className="bg-[#676E5E] h-full animate-[progress_2s_ease-in-out_infinite] w-4/5 rounded-full" />
            </div>

            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
              Conexión Cifrada • Accesibilidad Cognitiva Ley N° 21.545
            </span>

          </div>
        </div>
      )}

      {/* 2. CONTENIDO PRINCIPAL DE LA PLATAFORMA WEB */}
      <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
        
        {/* Cabecera Superior */}
        <div className="flex flex-wrap justify-between items-center bg-[#E6E7D5] p-4 sm:p-5 rounded-2xl border border-[#97A884] shadow-xs gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl border border-[#97A884] p-1 flex items-center justify-center">
              <img src="/logo-asl.png.png" alt="ASL Ideas Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] px-2.5 py-0.5 rounded-full border border-[#97A884]">
                OFICINA VIRTUAL 01 — ASL IDEAS SPA
              </span>
              <h1 className="text-lg sm:text-xl font-black text-[#676E5E] mt-0.5">
                Plataforma de Teleatención y Salud Integrativa
              </h1>
            </div>
          </div>

          <Link 
            href="/admin" 
            className="text-xs bg-white hover:bg-[#CDD6A9] font-bold text-[#676E5E] px-4 py-2 rounded-xl border border-[#97A884] transition"
          >
            Administrar
          </Link>
        </div>

        {/* Pestañas de Navegación Originales */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#E6E7D5] p-1.5 rounded-2xl border border-[#97A884] text-xs font-bold text-center">
          <button 
            type="button"
            onClick={() => setPestañaActiva('ficha')}
            className={`py-2.5 rounded-xl transition cursor-pointer ${
              pestañaActiva === 'ficha' ? 'bg-[#676E5E] text-white shadow-xs' : 'hover:bg-white text-[#676E5E]'
            }`}
          >
            Ficha de Oficina
          </button>
          <button 
            type="button"
            onClick={() => setPestañaActiva('sala')}
            className={`py-2.5 rounded-xl transition cursor-pointer ${
              pestañaActiva === 'sala' ? 'bg-[#676E5E] text-white shadow-xs' : 'hover:bg-white text-[#676E5E]'
            }`}
          >
            Sala en Vivo ({participantes.length} Cámaras)
          </button>
          <button 
            type="button"
            onClick={() => setPestañaActiva('agendar')}
            className={`py-2.5 rounded-xl transition cursor-pointer ${
              pestañaActiva === 'agendar' ? 'bg-[#676E5E] text-white shadow-xs' : 'hover:bg-white text-[#676E5E]'
            }`}
          >
            Agendar Cita
          </button>
          <button 
            type="button"
            onClick={() => setPestañaActiva('cancelar')}
            className={`py-2.5 rounded-xl transition cursor-pointer ${
              pestañaActiva === 'cancelar' ? 'bg-[#676E5E] text-white shadow-xs' : 'hover:bg-white text-[#676E5E]'
            }`}
          >
            Cancelar / Reprogramar
          </button>
        </div>

        {/* PESTAÑA 1: FICHA DE OFICINA */}
        {pestañaActiva === 'ficha' && (
          <div className="bg-white p-6 rounded-3xl border border-[#97A884] space-y-4">
            <h2 className="text-lg font-black text-[#676E5E]">Ficha Operativa de Casa Matriz</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Gestión corporativa, licencias tecnológicas B2B, convenios institucionales con municipalidades y consultoría en accesibilidad cognitiva UI/UX para neurodivergencias.
            </p>
          </div>
        )}

        {/* PESTAÑA 2: SALA EN VIVO MULTI-CLIENTE (SIN EMOJIS) */}
        {pestañaActiva === 'sala' && (
          <div className="bg-[#2D362D] text-white p-5 sm:p-6 rounded-3xl border-2 border-[#97A884] space-y-4 shadow-2xl">
            
            {/* Barra Superior de Control de la Sala */}
            <div className="flex flex-wrap justify-between items-center text-xs gap-2 border-b border-white/20 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="bg-[#CDD6A9] text-[#676E5E] font-extrabold px-3 py-1 rounded-full border border-[#97A884]">
                  SALA INTERACTIVA LISTA • {participantes.length} Cámaras Activas
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setModoVista('dividida')}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition cursor-pointer ${
                    modoVista === 'dividida' ? 'bg-white text-[#676E5E] border-white' : 'bg-black/40 text-white border-white/20'
                  }`}
                >
                  Mismo Tamaño (50/50)
                </button>
                <button
                  type="button"
                  onClick={() => setModoVista('galeria')}
                  className={`px-3 py-1.5 rounded-xl font-bold border transition cursor-pointer ${
                    modoVista === 'galeria' ? 'bg-white text-[#676E5E] border-white' : 'bg-black/40 text-white border-white/20'
                  }`}
                >
                  Mosaico Múltiple
                </button>
                <button
                  type="button"
                  onClick={agregarCliente}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold px-3.5 py-1.5 rounded-xl transition cursor-pointer"
                >
                  + Agregar Cliente
                </button>
              </div>
            </div>

            {/* GRILLA DE PANTALLAS DE VIDEO DE PARTICIPANTES */}
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
                  {/* Nombre del participante y botones de estado */}
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[10px] font-bold bg-black/70 px-2.5 py-1 rounded-full text-white border border-white/20 truncate max-w-[190px]">
                      {p.nombre}
                    </span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => toggleCamara(p.id)}
                        className={`text-[9px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                          p.camara ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                        }`}
                      >
                        {p.camara ? 'CAM ON' : 'CAM OFF'}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleMic(p.id)}
                        className={`text-[9px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                          p.mic ? 'bg-blue-600 text-white' : 'bg-amber-600 text-white'
                        }`}
                      >
                        {p.mic ? 'MIC ON' : 'MIC MUTE'}
                      </button>
                    </div>
                  </div>

                  {/* Silueta vectorial SVG del usuario en lugar de emojis */}
                  {p.camara ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-800 to-slate-900">
                      <div className="w-16 h-16 rounded-full bg-[#52584B] border-2 border-[#CDD6A9] flex items-center justify-center mb-2 shadow-md">
                        <svg className="w-8 h-8 text-[#CDD6A9]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                      <span className="text-white font-bold text-xs text-center">{p.nombre}</span>
                      <span className="text-[10px] text-emerald-400 mt-0.5">Transmisión Cifrada en Vivo</span>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-slate-950 text-slate-500">
                      <svg className="w-8 h-8 text-slate-600 mb-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 6.5l-4 4V7c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h13c.55 0 1-.45 1-1v-3.5l4 4v-11z" />
                      </svg>
                      <span className="text-xs font-bold text-slate-400">Cámara Inactiva</span>
                    </div>
                  )}

                  {/* Barra inferior del participante */}
                  <div className="z-10 mt-auto flex justify-between items-center bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-xl text-[10px]">
                    <span className="text-slate-300">{p.rol}</span>
                    <span className="text-emerald-400 font-bold">Conectado</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Barra de Controles e Indicador de Audio */}
            <div className="bg-black/40 p-3 rounded-2xl border border-white/10 flex flex-wrap justify-between items-center gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-300">Audio Entrante:</span>
                <div className="w-32 bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-amber-400 h-full w-3/4 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono text-emerald-400">0% dB</span>
              </div>

              <div className="flex flex-wrap gap-2 text-[11px]">
                <span className="bg-emerald-900 text-emerald-200 border border-emerald-500/50 px-3 py-1 rounded-xl font-bold">
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

            {/* Paneles Informativos Inferiores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
              <div className="bg-white text-[#676E5E] p-3 rounded-2xl border border-[#97A884]">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-extrabold uppercase text-[10px]">Archivos Adjuntos</span>
                  <button type="button" className="bg-[#CDD6A9] text-[#676E5E] font-bold px-2 py-0.5 rounded text-[10px]">+ Subir</button>
                </div>
                <p className="text-[11px] text-gray-500 italic">No hay archivos adjuntos en esta sesión.</p>
              </div>

              <div className="bg-white text-[#676E5E] p-3 rounded-2xl border border-[#97A884]">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-extrabold uppercase text-[10px]">Transcripción en Vivo</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Escuchando...</span>
                </div>
                <p className="text-[11px] text-gray-500 italic">Iniciando transcripción automática de audio...</p>
              </div>

              <div className="bg-white text-[#676E5E] p-3 rounded-2xl border border-[#97A884]">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-extrabold uppercase text-[10px]">Minuta y Compromisos</span>
                  <span className="text-[10px] text-gray-400">Autoguardado</span>
                </div>
                <p className="text-[11px] text-gray-500 italic">Registrando acuerdo de atención e indicaciones.</p>
              </div>
            </div>

          </div>
        )}

        {/* PESTAÑA 3: AGENDAR CITA */}
        {pestañaActiva === 'agendar' && (
          <div className="bg-white p-6 rounded-3xl border border-[#97A884] space-y-4">
            <h2 className="text-lg font-black text-[#676E5E]">Agendamiento de Citas en Línea</h2>
            <p className="text-xs text-gray-600">Selecciona el servicio y la fecha disponible para tu sesión virtual o presencial.</p>
          </div>
        )}

        {/* PESTAÑA 4: CANCELAR / REPROGRAMAR */}
        {pestañaActiva === 'cancelar' && (
          <div className="bg-white p-6 rounded-3xl border border-[#97A884] space-y-4">
            <h2 className="text-lg font-black text-[#676E5E]">Gestión de Citas Registradas</h2>
            <p className="text-xs text-gray-600">Ingresa tu RUT o código de reserva para modificar tu horario o cancelar la atención.</p>
          </div>
        )}

        {/* PIE DE PÁGINA (LOGO DESTACADO Y AMPLIO) */}
        <div className="bg-[#E6E7D5] p-6 rounded-2xl border border-[#97A884] flex flex-col items-center justify-center text-center space-y-3 shadow-xs">
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