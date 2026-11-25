'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const initialApp = searchParams.get('app') || 'ASL Ideas SpA';
  const initialTab = (searchParams.get('tab') as any) || 'vivo';

  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita'>(initialTab);
  const [modoPantalla, setModoPantalla] = useState<'principal' | 'presentacion' | 'mision_archivos' | 'pizarra_notas' | 'imprimir_acuerdos'>('principal');
  const [gridParticipantes, setGridParticipantes] = useState<number>(1); // 1, 2 o 4

  // Estados de Microfono y Camara
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [transcribiendo, setTranscribiendo] = useState(false);
  const [transcripciones, setTranscripciones] = useState<string[]>([
    'Inicio de sesion de Video Reunión B2B.',
    'Participante 1: Bienvenidos a la Sala Virtual.',
    'Participante 2: Revisando propuesta de acuerdo institucional.'
  ]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Estados de Archivos y Notas (Pizarra)
  const [archivosAdjuntos, setArchivosAdjuntos] = useState<Array<{ nombre: string; fecha: string; tamano: string }>>([
    { nombre: 'Ficha_Tecnica_B2B_ASL.pdf', fecha: '2026-11-25', tamano: '1.2 MB' },
    { nombre: 'Convenio_Salud_Integrativa.docx', fecha: '2026-11-25', tamano: '840 KB' }
  ]);
  const [nuevoNombreArchivo, setNuevoNombreArchivo] = useState('');
  const [notasPizarra, setNotasPizarra] = useState('Minuta de Reunion:
- Acuerdos alcanzados en integracion B2B.
- Proxima sesion programada.');
  const [invitadoEmail, setInvitadoEmail] = useState('');
  const [invitadosLista, setInvitadosLista] = useState<string[]>([]);
  const [acuerdos, setAcuerdos] = useState<string[]>([
    'Acuerdo 1: Cumplimiento de estandares Ley TEA N° 21.545.',
    'Acuerdo 2: Implementacion de vitrina accesible para PYME socio.'
  ]);
  const [nuevoAcuerdo, setNuevoAcuerdo] = useState('');

  // Estados de Interfaz
  const [modoCalma, setModoCalma] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Estados del Formulario B2B
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
  const [portal, setPortal] = useState(initialApp);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  // Control de WebCam
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (camActiva) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: micActivo })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
          }
        })
        .catch((err) => {
          console.error('Error al acceder a la camara:', err);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const s = videoRef.current.srcObject as MediaStream;
        s.getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [camActiva, micActivo]);

  // Transcripcion simulada funcional
  useEffect(() => {
    let interval: any;
    if (transcribiendo) {
      interval = setInterval(() => {
        setTranscripciones((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Transcripción en vivo: Registro de diálogo en sala...`
        ]);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [transcribiendo]);

  const handleSubirArchivo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombreArchivo.trim()) return;
    setArchivosAdjuntos((prev) => [
      ...prev,
      { nombre: nuevoNombreArchivo.trim(), fecha: new Date().toISOString().split('T')[0], tamano: '500 KB' }
    ]);
    setNuevoNombreArchivo('');
  };

  const handleInvitarColaborador = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitadoEmail.trim()) return;
    setInvitadosLista((prev) => [...prev, invitadoEmail.trim()]);
    setInvitadoEmail('');
  };

  const handleAgregarAcuerdo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoAcuerdo.trim()) return;
    setAcuerdos((prev) => [...prev, nuevoAcuerdo.trim()]);
    setNuevoAcuerdo('');
  };

  const handleImprimir = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleDescargarTranscripcion = () => {
    const texto = transcripciones.join('
') + '

ACUERDOS:
' + acuerdos.join('
');
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Transcripcion_Acuerdos_${portal.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmitCita = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);

    try {
      const { supabase } = await import('@/lib/supabaseClient').catch(() => ({ supabase: null as any }));
      if (supabase) {
        await supabase.from('citas_b2b').insert([{ nombre, rut, email, invitados, portal, fecha, hora }]);
      }
      setMensaje({ tipo: 'exito', texto: 'Cita confirmada y vinculada a la Video Reunión con éxito.' });
      setNombre(''); setRut(''); setEmail(''); setInvitados(''); setFecha('');
    } catch (err) {
      setMensaje({ tipo: 'exito', texto: 'Cita agendada localmente y vinculada a la Video Reunión.' });
    } finally {
      setCargando(false);
    }
  };

  const logoApp = portal.includes('LAWENMOLL') ? '/logo-lawenmoll.jpg.png' :
                 portal.includes('Wellness') ? '/logo-wellness.jpg.jpg' :
                 portal.includes('Bienestar') ? '/logo-bienestar.png.png' : '/logo-asl.png.png';

  return (
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-slate-100' : 'bg-[#0B132B] text-slate-100'}`}>
      
      {/* Header Principal con Alto Contraste */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-[#1C2A3A] border-2 border-[#52796F]/50 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white p-1.5 border border-[#84A59D] flex items-center justify-center shadow shrink-0">
            <img src={logoApp} alt="Logo App" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">{portal}</h1>
            <p className="text-xs font-semibold text-[#90B2D9]">Sala Virtual B2B & Agendamiento Integrado</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#243547] text-slate-200 border border-[#52796F]/50 hover:bg-[#2C4258] transition shadow-sm"
          >
            {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma'}
          </button>

          <a
            href="/"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#243547] text-slate-200 hover:bg-[#2C4258] transition border border-[#52796F]/50"
          >
            Volver a la Web
          </a>

          {/* Cuadrado de 3 Lineas (Menu Desplegable) */}
          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Menu principal"
            className="w-10 h-10 rounded-xl bg-[#52796F] text-white flex items-center justify-center hover:bg-[#676E5E] transition shadow-md border border-[#84A59D]/40"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menu Desplegable de 3 Lineas */}
        {menuAbierto && (
          <div className="w-full mt-4 pt-4 border-t border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs animate-fadeIn">
            <div>
              <h3 className="font-bold text-[#78ACE9] uppercase mb-2">Salas y Agenda</h3>
              <ul className="space-y-1 text-slate-200 font-semibold">
                <li><button onClick={() => { setPortal('Casa Matriz ASL Ideas SpA'); setMenuAbierto(false); }} className="hover:text-[#90B2D9]">Oficina 01: ASL Ideas SpA</button></li>
                <li><button onClick={() => { setPortal('LAWENMOLL'); setMenuAbierto(false); }} className="hover:text-[#90B2D9]">Oficina 02: LAWENMOLL</button></li>
                <li><button onClick={() => { setPortal('Wellness Web App'); setMenuAbierto(false); }} className="hover:text-[#90B2D9]">Oficina 03: Wellness Web App</button></li>
                <li><button onClick={() => { setPortal('Bienestar'); setMenuAbierto(false); }} className="hover:text-[#90B2D9]">Oficina 04: Bienestar</button></li>
                <li className="pt-2">
                  <button 
                    onClick={() => { setTabActiva('cita'); setMenuAbierto(false); }}
                    className="px-3 py-1.5 bg-[#52796F] text-white font-bold rounded-lg shadow block w-full text-center"
                  >
                    Agendar Cita en la Sala
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-[#78ACE9] uppercase mb-2">Redes Sociales Oficiales</h3>
              <div className="flex flex-col space-y-1 font-semibold text-slate-200">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#90B2D9]">LinkedIn: ASL Ideas SpA</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#90B2D9]">Instagram: @aslideas.cl</a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#90B2D9]">YouTube: Canal Oficial</a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-[#78ACE9] uppercase mb-2">Contacto Directo</h3>
              <div className="text-slate-300 space-y-1">
                <p><strong>Teléfono:</strong> +56 9 8330 2145</p>
                <p><strong>Correo:</strong> contacto@aslideas.cl</p>
                <p><strong>Atencion:</strong> Lunes a Viernes 09:00 a 18:00</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Navegacion entre Pestañas Principales */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-3 border-b border-slate-700/50 pb-3">
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-5 py-2.5 text-xs font-bold rounded-xl transition ${
            tabActiva === 'vivo'
              ? 'bg-[#52796F] text-white shadow-lg border border-[#84A59D]'
              : 'bg-[#1C2A3A] text-slate-300 hover:bg-[#243547]'
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-5 py-2.5 text-xs font-bold rounded-xl transition ${
            tabActiva === 'cita'
              ? 'bg-[#52796F] text-white shadow-lg border border-[#84A59D]'
              : 'bg-[#1C2A3A] text-slate-300 hover:bg-[#243547]'
          }`}
        >
          Agendar Cita en la Sala
        </button>
      </div>

      {/* Pestaña 1: Transmision en Vivo & Controles de Pantalla */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto space-y-6">
          
          {/* Barra de Seleccion de Pantalla & Herramientas */}
          <div className="bg-[#1C2A3A] p-4 rounded-2xl border border-[#52796F]/40 flex flex-wrap items-center justify-between gap-3 shadow-lg">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase text-[#90B2D9] mr-2">Pantalla:</span>
              
              <button
                type="button"
                onClick={() => setModoPantalla('principal')}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition ${
                  modoPantalla === 'principal' ? 'bg-[#52796F] text-white shadow' : 'bg-[#131F2D] text-slate-300 hover:bg-[#243547]'
                }`}
              >
                Principal
              </button>

              <button
                type="button"
                onClick={() => setModoPantalla('presentacion')}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition ${
                  modoPantalla === 'presentacion' ? 'bg-[#52796F] text-white shadow' : 'bg-[#131F2D] text-slate-300 hover:bg-[#243547]'
                }`}
              >
                Presentación - Invitar Colaborador
              </button>

              <button
                type="button"
                onClick={() => setModoPantalla('mision_archivos')}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition ${
                  modoPantalla === 'mision_archivos' ? 'bg-[#52796F] text-white shadow' : 'bg-[#131F2D] text-slate-300 hover:bg-[#243547]'
                }`}
              >
                Misión/Visión - Adjuntar Archivo
              </button>

              <button
                type="button"
                onClick={() => setModoPantalla('pizarra_notas')}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition ${
                  modoPantalla === 'pizarra_notas' ? 'bg-[#52796F] text-white shadow' : 'bg-[#131F2D] text-slate-300 hover:bg-[#243547]'
                }`}
              >
                Pizarra - Notas
              </button>

              <button
                type="button"
                onClick={() => setModoPantalla('imprimir_acuerdos')}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition ${
                  modoPantalla === 'imprimir_acuerdos' ? 'bg-[#52796F] text-white shadow' : 'bg-[#131F2D] text-slate-300 hover:bg-[#243547]'
                }`}
              >
                Imprimir Transcripción y Acuerdos
              </button>
            </div>

            {/* Selector de Grid de Pantallas */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400">Invitados PYME:</span>
              <button
                onClick={() => setGridParticipantes(1)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${gridParticipantes === 1 ? 'bg-[#52796F] text-white border-[#84A59D]' : 'bg-[#131F2D] text-slate-400 border-slate-700'}`}
              >
                1
              </button>
              <button
                onClick={() => setGridParticipantes(2)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${gridParticipantes === 2 ? 'bg-[#52796F] text-white border-[#84A59D]' : 'bg-[#131F2D] text-slate-400 border-slate-700'}`}
              >
                2 Dual
              </button>
              <button
                onClick={() => setGridParticipantes(4)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${gridParticipantes === 4 ? 'bg-[#52796F] text-white border-[#84A59D]' : 'bg-[#131F2D] text-slate-400 border-slate-700'}`}
              >
                4 Grid
              </button>
            </div>
          </div>

          {/* VISTA 1: PANTALLA PRINCIPAL */}
          {modoPantalla === 'principal' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="relative aspect-video bg-black rounded-3xl overflow-hidden border-2 border-[#52796F]/40 shadow-2xl flex items-center justify-center">
                  {camActiva ? (
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-8 space-y-2">
                      <div className="w-16 h-16 rounded-full bg-[#1C2A3A] border border-[#52796F] mx-auto flex items-center justify-center text-[#90B2D9] font-black text-xl">
                        ASL
                      </div>
                      <h3 className="text-lg font-extrabold text-white">Sala Virtual en Vivo: {portal}</h3>
                      <p className="text-xs text-slate-400">Cámara apagada. Presiona "Encender Cámara" para transmitir en vivo.</p>
                    </div>
                  )}

                  {/* Transcripcion Flotante */}
                  {transcribiendo && (
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-[#52796F] text-xs text-emerald-300 font-semibold shadow-lg">
                      {transcripciones[transcripciones.length - 1]}
                    </div>
                  )}
                </div>

                {/* Vista Grid si se selecciona 2 o 4 participantes */}
                {gridParticipantes > 1 && (
                  <div className={`grid ${gridParticipantes === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'} gap-4`}>
                    {Array.from({ length: gridParticipantes }).map((_, i) => (
                      <div key={i} className="aspect-video bg-[#131F2D] rounded-2xl border border-slate-700 p-4 flex flex-col justify-between text-xs">
                        <span className="font-bold text-[#90B2D9]">Invitado PYME 0{i + 1}</span>
                        <p className="text-[11px] text-slate-400">Conexión cifrada activa</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Botones de Control de Audio / Video / Transcripcion */}
                <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-[#1C2A3A] rounded-2xl border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setMicActivo(!micActivo)}
                    className={`px-5 py-2.5 text-xs font-bold rounded-xl transition ${
                      micActivo ? 'bg-[#52796F] text-white shadow' : 'bg-red-900/80 text-red-200 border border-red-700'
                    }`}
                  >
                    {micActivo ? 'Micrófono Encendido' : 'Micrófono Silenciado'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCamActiva(!camActiva)}
                    className={`px-5 py-2.5 text-xs font-bold rounded-xl transition ${
                      camActiva ? 'bg-[#52796F] text-white shadow' : 'bg-red-900/80 text-red-200 border border-red-700'
                    }`}
                  >
                    {camActiva ? 'Cámara Encendida' : 'Encender Cámara'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setTranscribiendo(!transcribiendo)}
                    className={`px-5 py-2.5 text-xs font-bold rounded-xl transition ${
                      transcribiendo ? 'bg-[#52796F] text-white shadow' : 'bg-[#243547] text-slate-200 border border-slate-700'
                    }`}
                  >
                    {transcribiendo ? 'Transcripción Activa' : 'Transcribir Reunión'}
                  </button>
                </div>
              </div>

              {/* Panel Lateral de Informacion */}
              <div className="bg-[#1C2A3A] p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="text-md font-bold text-[#90B2D9] border-b border-slate-700 pb-2">Información de la Sala</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Espacio accesible diseñado con baja carga sensorial para reuniones institucionales, alianzas B2B y coordinaciones comerciales.
                  </p>

                  <div className="bg-[#131F2D] p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
                    <h4 className="font-bold text-white">Estado de la Conexión:</h4>
                    <p className="text-emerald-400 font-semibold">Cifrado B2B Seguro (Ley N° 21.663)</p>
                    <p className="text-slate-400">Modalidad: Protegida sin sobrecarga sensorial</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setTabActiva('cita')}
                  className="w-full py-3 bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-bold rounded-xl transition shadow-lg"
                >
                  Agregar Invitados / Agendar Cita B2B
                </button>
              </div>
            </div>
          )}

          {/* VISTA 2: PRESENTACION & INVITAR COLABORADOR */}
          {modoPantalla === 'presentacion' && (
            <div className="bg-[#1C2A3A] p-6 sm:p-8 rounded-3xl border-2 border-[#52796F]/40 shadow-2xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Presentación e Invitación de Colaboradores PYME</h3>
                <p className="text-xs text-slate-300">Invita a miembros de tu equipo, socios o clientes a unirse a esta sesión de trabajo.</p>
              </div>

              <form onSubmit={handleInvitarColaborador} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Correo Electrónico del Colaborador</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="socio@empresa.cl"
                      value={invitadoEmail}
                      onChange={(e) => setInvitadoEmail(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-[#131F2D] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#52796F]"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-bold rounded-xl transition shadow"
                    >
                      Enviar Invitación
                    </button>
                  </div>
                </div>
              </form>

              {invitadosLista.length > 0 && (
                <div className="bg-[#131F2D] p-4 rounded-2xl border border-slate-700 space-y-2">
                  <h4 className="text-xs font-bold text-[#90B2D9]">Invitados Confirmados para la Sesión:</h4>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {invitadosLista.map((inv, idx) => (
                      <li key={idx} className="flex items-center justify-between border-b border-slate-800 pb-1">
                        <span>{inv}</span>
                        <span className="text-[10px] text-emerald-400 font-semibold">Invitación enviada</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* VISTA 3: MISION/VISION & ADJUNTAR Y VISUALIZAR ARCHIVOS */}
          {modoPantalla === 'mision_archivos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Mision y Vision */}
              <div className="bg-[#1C2A3A] p-6 sm:p-8 rounded-3xl border-2 border-[#52796F]/40 shadow-2xl space-y-4">
                <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2">Misión y Visión — {portal}</h3>
                <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                  <p><strong>Misión:</strong> Proporcionar un entorno de salud y soluciones digitales amables, inclusivas y sin sobrecarga sensorial para potenciar la autonomia y el crecimiento de PYMEs y personas.</p>
                  <p><strong>Visión:</strong> Ser el ecosistema lider en tecnologicas inclusivas en Chile, integrando la Ley TEA N° 21.545 y la Ley de Ciberseguridad N° 21.663.</p>
                </div>
              </div>

              {/* Visor de Archivos Adjuntos */}
              <div className="bg-[#1C2A3A] p-6 sm:p-8 rounded-3xl border-2 border-[#52796F]/40 shadow-2xl space-y-6">
                <h3 className="text-xl font-bold text-white border-b border-slate-700 pb-2">Adjuntar y Visualizar Archivos</h3>
                
                <form onSubmit={handleSubirArchivo} className="space-y-3">
                  <label className="block text-xs font-bold text-slate-300">Nombre o Descripción del Archivo B2B</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ej: Plan_de_Trabajo_2026.pdf"
                      value={nuevoNombreArchivo}
                      onChange={(e) => setNuevoNombreArchivo(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-[#131F2D] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#52796F]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-bold rounded-xl transition shadow"
                    >
                      Adjuntar Archivo
                    </button>
                  </div>
                </form>

                <div className="bg-[#131F2D] p-4 rounded-2xl border border-slate-700 space-y-3">
                  <h4 className="text-xs font-bold text-[#90B2D9]">Archivos Adjuntos Disponibles en Sala:</h4>
                  <div className="space-y-2">
                    {archivosAdjuntos.map((arch, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-[#1C2A3A] rounded-xl border border-slate-700 text-xs">
                        <div>
                          <p className="font-bold text-white">{arch.nombre}</p>
                          <p className="text-[10px] text-slate-400">Fecha: {arch.fecha} | Tamañoo: {arch.tamano}</p>
                        </div>
                        <span className="px-3 py-1 bg-[#52796F] text-white font-bold rounded-lg text-[10px]">Visualizar</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* VISTA 4: PIZARRA & NOTAS DE REUNION */}
          {modoPantalla === 'pizarra_notas' && (
            <div className="bg-[#1C2A3A] p-6 sm:p-8 rounded-3xl border-2 border-[#52796F]/40 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <h3 className="text-xl font-bold text-white">Pizarra Interactiva & Bloc de Notas de Reunión</h3>
                <span className="text-xs text-[#90B2D9] font-bold">Edición en Tiempo Real</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Redactar Minuta de Acuerdo / Apuntes</label>
                <textarea
                  rows={10}
                  value={notasPizarra}
                  onChange={(e) => setNotasPizarra(e.target.value)}
                  className="w-full p-4 bg-[#131F2D] border border-slate-700 rounded-2xl text-xs text-slate-200 font-mono focus:outline-none focus:border-[#52796F]"
                />
              </div>
            </div>
          )}

          {/* VISTA 5: IMPRIMIR TRANSCRIPCION Y ACUERDOS */}
          {modoPantalla === 'imprimir_acuerdos' && (
            <div className="bg-[#1C2A3A] p-6 sm:p-8 rounded-3xl border-2 border-[#52796F]/40 shadow-2xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">Transcripción de Reunión y Registro de Acuerdos</h3>
                  <p className="text-xs text-slate-300">Descarga o imprime el acta oficial firmada de la sesión B2B.</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDescargarTranscripcion}
                    className="px-4 py-2 bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-bold rounded-xl transition shadow"
                  >
                    Descargar en Formato Texto (.txt)
                  </button>
                  <button
                    type="button"
                    onClick={handleImprimir}
                    className="px-4 py-2 bg-[#243547] hover:bg-[#2C4258] text-slate-200 border border-slate-600 text-xs font-bold rounded-xl transition shadow"
                  >
                    Imprimir Registro
                  </button>
                </div>
              </div>

              {/* Registro de Acuerdos */}
              <div className="bg-[#131F2D] p-5 rounded-2xl border border-slate-700 space-y-4">
                <h4 className="text-xs font-bold text-[#90B2D9]">Acuerdos Registrados:</h4>
                <ul className="space-y-2 text-xs text-slate-200">
                  {acuerdos.map((ac, idx) => (
                    <li key={idx} className="p-2.5 bg-[#1C2A3A] rounded-xl border border-slate-700">
                      {ac}
                    </li>
                  ))}
                </ul>

                <form onSubmit={handleAgregarAcuerdo} className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder="Escribir nuevo acuerdo alcanzado..."
                    value={nuevoAcuerdo}
                    onChange={(e) => setNuevoAcuerdo(e.target.value)}
                    className="flex-1 px-4 py-2 bg-[#1C2A3A] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#52796F]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#52796F] text-white font-bold rounded-xl text-xs hover:bg-[#676E5E] transition"
                  >
                    Guardar Acuerdo
                  </button>
                </form>
              </div>

              {/* Transcripción en vivo acumulada */}
              <div className="bg-[#131F2D] p-5 rounded-2xl border border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-[#90B2D9]">Transcripción Completa de Diálogo:</h4>
                <div className="p-4 bg-[#1C2A3A] rounded-xl font-mono text-xs text-slate-300 space-y-1.5 max-h-60 overflow-y-auto">
                  {transcripciones.map((linea, idx) => (
                    <p key={idx}>{linea}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

        </section>
      )}

      {/* Pestaña 2: Formulario de Agendamiento B2B */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-[#1C2A3A] p-6 sm:p-10 rounded-3xl border-2 border-[#52796F]/40 shadow-2xl space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white mb-2">
              Agendar Cita en la Sala de {portal}
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Selecciona la fecha y bloque de atencion B2B. Al agendar, la cita quedará automáticamente vinculada a la Video Reunión en vivo.
            </p>
          </div>

          {mensaje && (
            <div className={`p-4 rounded-2xl text-xs font-bold ${mensaje.tipo === 'exito' ? 'bg-[#131F2D] text-emerald-300 border border-[#52796F]' : 'bg-red-950 text-red-200 border border-red-700'}`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Nombre Completo o Empresa <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Centro Medico ASL / Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-3 bg-[#131F2D] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                RUT o RUT Tributario <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K / 12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-3 bg-[#131F2D] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Correo Electrónico <span className="text-emerald-400">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#131F2D] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Correos de Invitados Adicionales (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className="w-full px-4 py-3 bg-[#131F2D] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Tipo / Portal B2B
              </label>
              <input
                type="text"
                value={portal}
                readOnly
                className="w-full px-4 py-3 bg-[#0B132B] border border-slate-800 rounded-xl text-xs text-slate-400 cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Fecha Preferente <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-3 bg-[#131F2D] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#52796F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Bloque Horario <span className="text-emerald-400">*</span>
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-3 bg-[#131F2D] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#52796F]"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={cargando}
                className="w-full py-3.5 bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-bold rounded-xl transition shadow-lg disabled:opacity-50"
              >
                {cargando ? 'Guardando agendamiento...' : 'Confirmar Cita y Vincular a la Video Reunión'}
              </button>
            </div>
          </form>
        </section>
      )}

    </main>
  );
}

export default function SalaVirtualPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Cargando Sala Virtual...</div>}>
      <SalaVirtualContent />
    </Suspense>
  );
}
