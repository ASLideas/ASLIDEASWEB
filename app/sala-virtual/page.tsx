'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SalaVirtualPage() {
  // Estado para la Pantalla de Carga / Intro Splash
  const [cargando, setCargando] = useState(true);

  // Estados de la Sala Virtual y la Segunda Pantalla
  const [salaActual, setSalaActual] = useState<'Lotus' | 'Cielo' | 'Bosque' | 'Raiz'>('Lotus');
  const [modoPantalla, setModoPantalla] = useState<'flotante' | 'dividida'>('flotante'); // 'flotante' (chico) o 'dividida' (mismo tamaño)
  const [pantallaInvertida, setPantallaInvertida] = useState(false); // Intercambiar quién va en la principal

  // Estados de Control de Audio / Video
  const [camaraClienteActiva, setCamaraClienteActiva] = useState(true);
  const [micClienteActivo, setMicClienteActivo] = useState(true);
  const [clienteConectado, setClienteConectado] = useState(true);

  // Simulación de Carga Inicial con Logo de ASL Ideas
  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 2200); // 2.2 segundos de intro animada
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#676E5E] relative overflow-x-hidden font-sans">
      
      {/* 1. PANTALLA DE CARGA / INTRO CON LOGO DE ASLIDEAS */}
      {cargando && (
        <div className="fixed inset-0 z-50 bg-[#FAF8F5] flex flex-col items-center justify-center p-6 transition-opacity duration-700">
          <div className="relative flex flex-col items-center space-y-6 max-w-sm text-center">
            
            {/* Logo de ASL Ideas con Anillo Animado */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-3xl p-3 border-4 border-[#97A884] shadow-2xl flex items-center justify-center animate-pulse">
              <img 
                src="/logo-asl.png.png" 
                alt="ASL Ideas SpA" 
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest bg-[#CDD6A9] text-[#676E5E] px-3 py-1 rounded-full border border-[#97A884]">
                ASL Ideas SpA • Salud Digital Inclusiva
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#676E5E]">
                Cargando Sala Virtual...
              </h2>
              <p className="text-xs text-gray-500 italic">
                Ajustando accesibilidad cognitiva y canal encriptado Ley N° 21.663
              </p>
            </div>

            {/* Barra de Progreso */}
            <div className="w-full bg-[#E6E7D5] h-2 rounded-full overflow-hidden border border-[#97A884]">
              <div className="bg-[#676E5E] h-full animate-[progress_2s_ease-in-out_infinite] w-3/4 rounded-full" />
            </div>

          </div>
        </div>
      )}

      {/* 2. CONTENIDO PRINCIPAL DE LA SALA VIRTUAL */}
      <div className="p-3 sm:p-8 max-w-7xl mx-auto">
        <div className="bg-[#E6E7D5] rounded-3xl border-2 border-[#97A884] shadow-2xl overflow-hidden flex flex-col">
          
          {/* Cabecera de Navegación */}
          <div className="p-4 sm:p-6 bg-[#E6E7D5] border-b border-[#97A884]/40 flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-2xl border-2 border-[#E6C693] p-1.5 flex items-center justify-center shadow-xs">
                <img src="/logo-asl.png.png" alt="ASL Ideas" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-full border border-[#97A884]">
                  Sala Virtual Interactiva • Teleatención & Movimiento
                </span>
                <h1 className="text-lg sm:text-2xl font-black text-[#676E5E] mt-0.5">
                  Oficina {salaActual} — En Vivo
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/admin"
                className="bg-white hover:bg-[#CDD6A9] text-[#676E5E] text-xs font-bold px-3.5 py-2 rounded-xl border border-[#97A884] transition"
              >
                ⚙️ Consola Admin
              </Link>
              <Link
                href="/"
                className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition"
              >
                ← Salir de la Sala
              </Link>
            </div>
          </div>

          {/* Selector de Salas Temáticas */}
          <div className="p-3 bg-[#CDD6A9]/40 border-b border-[#97A884]/30">
            <div className="flex flex-wrap bg-white/80 p-1 rounded-2xl border border-[#97A884] text-xs font-bold gap-1">
              {(['Lotus', 'Cielo', 'Bosque', 'Raiz'] as const).map(sala => (
                <button
                  key={sala}
                  type="button"
                  onClick={() => setSalaActual(sala)}
                  className={`flex-1 py-2 rounded-xl transition font-black cursor-pointer ${
                    salaActual === sala ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white'
                  }`}
                >
                  🌿 Sala {sala}
                </button>
              ))}
            </div>
          </div>

          {/* BARRA DE CONTROLES DE PANTALLA Y CLIENTE */}
          <div className="p-3 bg-white border-b border-[#97A884]/30 flex flex-wrap justify-between items-center text-xs gap-2">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#676E5E] mr-1">Vista de Pantalla:</span>
              
              <button
                type="button"
                onClick={() => setModoPantalla('flotante')}
                className={`px-3 py-1.5 rounded-xl border font-bold cursor-pointer transition ${
                  modoPantalla === 'flotante' 
                    ? 'bg-[#676E5E] text-white border-[#676E5E]' 
                    : 'bg-[#FAF8F5] text-[#676E5E] border-[#97A884]'
                }`}
              >
                📐 Recuadro Chico (PiP)
              </button>

              <button
                type="button"
                onClick={() => setModoPantalla('dividida')}
                className={`px-3 py-1.5 rounded-xl border font-bold cursor-pointer transition ${
                  modoPantalla === 'dividida' 
                    ? 'bg-[#676E5E] text-white border-[#676E5E]' 
                    : 'bg-[#FAF8F5] text-[#676E5E] border-[#97A884]'
                }`}
              >
                🌓 Mismo Tamaño (50/50)
              </button>

              <button
                type="button"
                onClick={() => setPantallaInvertida(!pantallaInvertida)}
                className="px-3 py-1.5 bg-[#CDD6A9] hover:bg-[#97A884] text-[#676E5E] hover:text-white font-extrabold rounded-xl transition cursor-pointer border border-[#97A884]"
              >
                🔀 Intercambiar Cámaras
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCamaraClienteActiva(!camaraClienteActiva)}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer border ${
                  camaraClienteActiva 
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                    : 'bg-red-100 text-red-700 border-red-300'
                }`}
              >
                {camaraClienteActiva ? '📷 Cam Cliente: ON' : '🚫 Cam Cliente: OFF'}
              </button>

              <button
                type="button"
                onClick={() => setMicClienteActivo(!micClienteActivo)}
                className={`px-3 py-1.5 rounded-xl font-bold cursor-pointer border ${
                  micClienteActivo 
                    ? 'bg-blue-100 text-blue-800 border-blue-300' 
                    : 'bg-amber-100 text-amber-800 border-amber-300'
                }`}
              >
                {micClienteActivo ? '🎙️ Mic Cliente: ON' : '🔇 Mic Cliente: Mute'}
              </button>
            </div>
          </div>

          {/* ÁREA PRINCIPAL DE VIDEO (PANTALLA DOBLE O FLOTANTE) */}
          <div className="p-4 sm:p-6 bg-[#FAF8F5]">
            <div 
              className={`relative bg-slate-900 rounded-3xl border-2 border-[#97A884] overflow-hidden shadow-inner transition-all duration-300 ${
                modoPantalla === 'dividida' 
                  ? 'grid grid-cols-1 md:grid-cols-2 gap-3 p-3 min-h-[500px]' 
                  : 'min-h-[480px] sm:min-h-[560px] flex items-center justify-center'
              }`}
            >

              {/* PANTALLA A: ESPECIALISTA / TRANSMISIÓN PRINCIPAL */}
              <div 
                className={`relative rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 flex flex-col justify-between p-4 shadow-lg ${
                  modoPantalla === 'flotante' ? 'w-full h-full min-h-[460px]' : 'h-full min-h-[320px]'
                } ${pantallaInvertida && modoPantalla === 'flotante' ? 'order-2' : ''}`}
              >
                <div className="flex justify-between items-center z-10">
                  <span className="bg-red-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    Transmisión Especialista
                  </span>
                  <span className="bg-black/60 text-white font-mono text-[10px] px-2 py-0.5 rounded-md backdrop-blur-xs">
                    Sala {salaActual} • HD 1080p
                  </span>
                </div>

                {/* Video del Especialista o Fondo Simulado */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-slate-800 to-slate-900">
                  <div className="w-20 h-20 rounded-full bg-[#676E5E] border-4 border-[#CDD6A9] flex items-center justify-center text-3xl shadow-xl mb-3">
                    🧘‍♀️
                  </div>
                  <h3 className="text-white font-bold text-base">Especialista / Instructor ASL</h3>
                  <p className="text-slate-400 text-xs mt-1">Sesión de Movimiento Adaptado sin Impacto</p>
                </div>

                <div className="z-10 bg-black/60 backdrop-blur-xs p-2.5 rounded-xl border border-white/10 text-white text-xs flex justify-between items-center mt-auto">
                  <span>🔊 Audio de Alta Fidelidad</span>
                  <span className="text-[10px] text-emerald-400 font-bold">Conexión Cifrada</span>
                </div>
              </div>

              {/* PANTALLA B: CLIENTE / PACIENTE (FLOTANTE O DIVIDIDA) */}
              <div 
                className={`relative rounded-2xl overflow-hidden bg-slate-900 border-2 border-[#E6C693] flex flex-col justify-between p-3 shadow-2xl transition-all duration-300 ${
                  modoPantalla === 'flotante' 
                    ? 'absolute bottom-4 right-4 w-48 sm:w-64 h-36 sm:h-48 z-20 hover:scale-105 cursor-pointer' 
                    : 'h-full min-h-[320px]'
                }`}
              >
                <div className="flex justify-between items-center z-10">
                  <span className="bg-[#676E5E] text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                    👤 Cliente / Paciente
                  </span>
                  <span className="bg-black/70 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-md">
                    {camaraClienteActiva ? 'En Vivo' : 'Sin Video'}
                  </span>
                </div>

                {/* Contenido de la Pantalla del Cliente */}
                {camaraClienteActiva ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-slate-850">
                    <div className="w-12 h-12 rounded-full bg-slate-700 border-2 border-[#97A884] flex items-center justify-center text-xl mb-1 shadow-md">
                      😊
                    </div>
                    <p className="text-white font-bold text-xs">Paciente Conectado</p>
                    <span className="text-[9px] text-emerald-400">Cam: Activa • Mic: {micClienteActivo ? 'ON' : 'Mute'}</span>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 bg-slate-950 text-slate-500">
                    <span className="text-2xl mb-1">🚫</span>
                    <p className="text-xs font-bold text-slate-400">Cámara Apagada</p>
                  </div>
                )}

                <div className="z-10 bg-black/70 backdrop-blur-xs px-2 py-1 rounded-lg border border-white/10 text-white text-[10px] flex justify-between items-center mt-auto">
                  <span className="truncate max-w-[100px]">Usuario Activo</span>
                  <button
                    type="button"
                    onClick={() => setModoPantalla(modoPantalla === 'flotante' ? 'dividida' : 'flotante')}
                    className="text-[9px] font-bold text-[#E6C693] hover:underline"
                  >
                    {modoPantalla === 'flotante' ? '🔍 Agrandar' : '📉 Achicar'}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Pie de Página con Notas de Accesibilidad */}
          <div className="p-4 bg-[#E6E7D5] border-t border-[#97A884]/40 text-center text-xs text-[#676E5E] space-y-1">
            <p className="font-bold">
              ASL Ideas SpA • Plataforma Diseñada bajo Estándares de Accesibilidad Cognitiva (Ley N° 21.545)
            </p>
            <p className="text-[10px] text-gray-500">
              Ciberseguridad y Encriptación de Datos Sensibles de Salud según Ley N° 21.663
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}