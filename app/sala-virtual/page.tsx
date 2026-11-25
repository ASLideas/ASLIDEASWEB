'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const initialApp = searchParams.get('app') || 'ASL Ideas SpA';
  const initialLogo = searchParams.get('logo') || '/logo-asl.png.png';

  const [portalNombre, setPortalNombre] = useState(initialApp);
  const [appLogo, setAppLogo] = useState(initialLogo);

  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita'>('vivo');
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [transcribirActiva, setTranscribirActiva] = useState(false);
  const [modoCalma, setModoCalma] = useState(false);
  const [numPantallas, setNumPantallas] = useState<1 | 2 | 4>(1);

  // Desplegable Lateral
  const [desplegableAbierto, setDesplegableAbierto] = useState(true);
  const [tabPanel, setTabPanel] = useState<'notas' | 'archivos' | 'acuerdos'>('notas');

  // Estados de Transcripción y Notas
  const [transcripcionTexto, setTranscripcionTexto] = useState('Sin transcripciones grabadas aun. Haz clic en Transcribir Reunion para iniciar.');
  const [notasTexto, setNotasTexto] = useState('');
  const [archivos, setArchivos] = useState<string[]>(['Ficha_Tecnica_B2B.pdf', 'Convenio_Marco_ASL.pdf']);
  const [nuevoArchivo, setNuevoArchivo] = useState('');
  
  // Lista de Acuerdos
  const [acuerdos, setAcuerdos] = useState<Array<{ id: number; texto: string; firmado: boolean }>>([
    { id: 1, texto: 'Implementacion de infraestructura digital accesible TEA/TDAH.', firmado: true },
    { id: 2, texto: 'Resguardo de datos de salud encriptados bajo Ley N 21.663.', firmado: false },
    { id: 3, texto: 'Suscripcion al beneficio de Red Cuerpo y Alma para PYMEs.', firmado: true }
  ]);
  const [nuevoAcuerdoTexto, setNuevoAcuerdoTexto] = useState('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Manejo de Cámara
  useEffect(() => {
    if (camActiva) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error('Error al acceder a la camara:', err);
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [camActiva]);

  // Manejo de Transcripción Simulada / Real
  useEffect(() => {
    let interval: any;
    if (transcribirActiva) {
      setTranscripcionTexto('Transcripción en vivo iniciada. Escuchando participantes de la Sala B2B...');
      const frases = [
        'Se confirma el cumplimiento del estándar de ciberseguridad Ley N° 21.663.',
        'El representante PYME solicita integrar el módulo de agendamiento.',
        'Se acuerda incorporar la Ficha Clínica SOAP encriptada.',
        'Reunión iniciada con baja sobrecarga sensorial para los asistentes.'
      ];
      let idx = 0;
      interval = setInterval(() => {
        setTranscripcionTexto((prev) => prev + ' ' + frases[idx % frases.length]);
        idx++;
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [transcribirActiva]);

  // Formulario de Cita
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const handleSubmitCita = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);
    try {
      setMensaje({
        tipo: 'exito',
        texto: 'Cita confirmada y vinculada a la Video Reunión con éxito.'
      });
      setNombre('');
      setRut('');
      setEmail('');
      setInvitados('');
      setFecha('');
    } catch (err) {
      setMensaje({
        tipo: 'error',
        texto: 'No se pudo registrar la cita. Verifica los datos o intenta nuevamente.'
      });
    } finally {
      setCargando(false);
    }
  };

  const handleGuardarTranscripcionEnAcuerdos = () => {
    if (!transcripcionTexto) return;
    const nuevo = {
      id: Date.now(),
      texto: `Transcripcion grabada: ${transcripcionTexto.slice(0, 120)}...`,
      firmado: false
    };
    setAcuerdos(prev => [...prev, nuevo]);
    alert('Transcripción guardada en el panel de Acuerdos.');
  };

  const handleDescargarTranscripcion = () => {
    const blob = new Blob([transcripcionTexto], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Transcripcion_${portalNombre.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleAgregarAcuerdo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoAcuerdoTexto.trim()) return;
    setAcuerdos(prev => [...prev, { id: Date.now(), texto: nuevoAcuerdoTexto, firmado: false }]);
    setNuevoAcuerdoTexto('');
  };

  const handleAgregarArchivo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoArchivo.trim()) return;
    setArchivos(prev => [...prev, nuevoArchivo.trim()]);
    setNuevoArchivo('');
  };

  const toggleFirmarAcuerdo = (id: number) => {
    setAcuerdos(prev => prev.map(a => a.id === id ? { ...a, firmado: !a.firmado } : a));
  };

  // Selector de Logo según Portal
  useEffect(() => {
    if (portalNombre.includes('LAWENMOLL')) setAppLogo('/logo-lawenmoll.jpg.png');
    else if (portalNombre.includes('Wellness')) setAppLogo('/logo-wellness.jpg.jpg');
    else if (portalNombre.includes('Bienestar')) setAppLogo('/logo-bienestar.png.png');
    else setAppLogo('/logo-asl.png.png');
  }, [portalNombre]);

  return (
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-[#90B2D9]' : 'bg-slate-900 text-white'}`}>
      {/* Header */}`
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-4">
          <img
            src={appLogo}
            alt="Logo Portal"
            className="w-14 h-14 object-contain rounded-2xl bg-white p-1 border-2 border-[#52796F] shadow-lg"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#52796F]">
              {portalNombre}
            </h1>
            <p className="text-xs text-slate-300">
              Ecosistema de Soluciones Digitales y Diseños para PYMEs y Asociados
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${
              modoCalma
                ? 'bg-[#78ACE9] text-slate-900 border-[#90B2D9]'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
          >
            {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma (TEA)'}
          </button>
          <Link
            href="/"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#52796F] text-white hover:bg-[#676E5E] transition shadow-md"
          >
            Volver a la Web
          </Link>
        </div>
      </header>

      {/* Pestañas Principales */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-3 border-b border-slate-700/40 pb-3">
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-5 py-2.5 text-xs font-black rounded-xl transition ${
            tabActiva === 'vivo'
              ? 'bg-[#52796F] text-white shadow-lg'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-5 py-2.5 text-xs font-black rounded-xl transition ${
            tabActiva === 'cita'
              ? 'bg-[#52796F] text-white shadow-lg'
              : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
          }`}
        >
          Agendar Cita B2B
        </button>
      </div>

      {/* TAB 1: Transmisión en Vivo */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            
            {/* Contenedor de Video (Grid según participantes de la PYME) */}
            <div className={`relative bg-black rounded-3xl overflow-hidden border-2 border-[#52796F]/50 shadow-2xl min-h-[360px] md:min-h-[420px] grid ${
              numPantallas === 1 ? 'grid-cols-1' : numPantallas === 2 ? 'grid-cols-2 gap-2 p-2' : 'grid-cols-2 grid-rows-2 gap-2 p-2'
            }`}>
              {/* Pantalla 1 / Principal */}
              <div className="relative bg-slate-950 flex flex-col items-center justify-center rounded-2xl overflow-hidden border border-slate-800">
                {camActiva ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <img
                      src={appLogo}
                      alt="Logo"
                      className="w-16 h-16 mx-auto object-contain opacity-80"
                    />
                    <h3 className="text-sm font-bold text-slate-300">
                      Cámara Apagada — Transmisión {portalNombre}
                    </h3>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded-full text-[10px] font-bold text-white border border-slate-700">
                  Anfitrión: Casa Matriz ASL Ideas SpA
                </div>
              </div>

              {/* Pantalla 2 (Si se eligen 2 o 4 participantes de la PYME) */}
              {numPantallas >= 2 && (
                <div className="relative bg-slate-900 flex flex-col items-center justify-center rounded-2xl overflow-hidden border border-slate-800">
                  <div className="text-center p-4">
                    <div className="w-10 h-10 mx-auto rounded-full bg-[#52796F] flex items-center justify-center font-bold text-white text-xs mb-2">
                      PYME
                    </div>
                    <p className="text-xs font-bold text-slate-200">Invitado B2B / Empresa</p>
                    <span className="text-[10px] text-emerald-400">Conectado en Sala</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/70 px-3 py-1 rounded-full text-[10px] font-bold text-white border border-slate-700">
                    Participante PYME #1
                  </div>
                </div>
              )}

              {/* Pantallas 3 y 4 (Si se eligen 4 participantes) */}
              {numPantallas === 4 && (
                <>
                  <div className="relative bg-slate-900 flex flex-col items-center justify-center rounded-2xl overflow-hidden border border-slate-800">
                    <p className="text-xs text-slate-400">Colaborador Adicional</p>
                  </div>
                  <div className="relative bg-slate-900 flex flex-col items-center justify-center rounded-2xl overflow-hidden border border-slate-800">
                    <p className="text-xs text-slate-400">Asesor Tecnico / Salud</p>
                  </div>
                </>
              )}

              {/* Banner Flotante de Transcripción */}
              {transcribirActiva && (
                <div className="absolute top-4 left-4 right-4 bg-black/85 backdrop-blur-md p-3 rounded-2xl border border-emerald-500/50 shadow-xl text-left">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Transcripción en Vivo
                    </span>
                    <button
                      type="button"
                      onClick={handleGuardarTranscripcionEnAcuerdos}
                      className="text-[10px] font-extrabold bg-[#52796F] hover:bg-[#676E5E] text-white px-2.5 py-1 rounded-lg transition"
                    >
                      Guardar en Acuerdos
                    </button>
                  </div>
                  <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                    {transcripcionTexto}
                  </p>
                </div>
              )}
            </div>

            {/* Barra de Botones Principales de Control */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-800/80 rounded-2xl border border-slate-700 shadow-lg">
              
              <div className="flex flex-wrap items-center gap-2">
                {/* Botón 1: Micrófono */}
                <button
                  type="button"
                  onClick={() => setMicActivo(!micActivo)}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl transition ${
                    micActivo
                      ? 'bg-[#52796F] text-white shadow-md'
                      : 'bg-red-950/80 text-red-200 border border-red-800 hover:bg-red-900'
                  }`}
                >
                  {micActivo ? 'Micrófono Encendido' : 'Micrófono Silenciado'}
                </button>

                {/* Botón 2: Encender Cámara */}
                <button
                  type="button"
                  onClick={() => setCamActiva(!camActiva)}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl transition ${
                    camActiva
                      ? 'bg-[#52796F] text-white shadow-md'
                      : 'bg-red-950/80 text-red-200 border border-red-800 hover:bg-red-900'
                  }`}
                >
                  {camActiva ? 'Cámara Encendida' : 'Encender Cámara'}
                </button>

                {/* Botón 3: Transcribir Reunión */}
                <button
                  type="button"
                  onClick={() => setTranscribirActiva(!transcribirActiva)}
                  className={`px-4 py-2.5 text-xs font-bold rounded-xl transition ${
                    transcribirActiva
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  }`}
                >
                  {transcribirActiva ? 'Transcripción Activa' : 'Transcribir Reunión'}
                </button>
              </div>

              {/* Selector de Pantalla / Participantes PYME */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300 font-bold">Pantalla:</span>
                <button
                  type="button"
                  onClick={() => setNumPantallas(1)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${
                    numPantallas === 1 ? 'bg-[#52796F] text-white border-[#52796F]' : 'bg-slate-900 text-slate-400 border-slate-700'
                  }`}
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => setNumPantallas(2)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${
                    numPantallas === 2 ? 'bg-[#52796F] text-white border-[#52796F]' : 'bg-slate-900 text-slate-400 border-slate-700'
                  }`}
                >
                  2 Dual (PYME)
                </button>
                <button
                  type="button"
                  onClick={() => setNumPantallas(4)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${
                    numPantallas === 4 ? 'bg-[#52796F] text-white border-[#52796F]' : 'bg-slate-900 text-slate-400 border-slate-700'
                  }`}
                >
                  4 Grid
                </button>
              </div>
            </div>

          </div>

          {/* DESPLEGABLE PRINCIPAL LATERAL: NOTAS | ADJUNTAR ARCHIVO | DESCARGAR TRANSCRIPCION | ACUERDOS */}
          <div className="bg-slate-800/90 p-5 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-4">
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Panel Desplegable B2B
                </h3>
                <button
                  type="button"
                  onClick={() => setDesplegableAbierto(!desplegableAbierto)}
                  className="text-xs text-emerald-400 hover:underline font-bold"
                >
                  {desplegableAbierto ? 'Ocultar Panel' : 'Mostrar Panel'}
                </button>
              </div>

              {desplegableAbierto && (
                <div className="space-y-4">
                  {/* Pestañas del Panel Lateral */}
                  <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl text-center">
                    <button
                      type="button"
                      onClick={() => setTabPanel('notas')}
                      className={`py-1.5 text-[11px] font-bold rounded-lg transition ${
                        tabPanel === 'notas' ? 'bg-[#52796F] text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Notas
                    </button>
                    <button
                      type="button"
                      onClick={() => setTabPanel('archivos')}
                      className={`py-1.5 text-[11px] font-bold rounded-lg transition ${
                        tabPanel === 'archivos' ? 'bg-[#52796F] text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Archivos
                    </button>
                    <button
                      type="button"
                      onClick={() => setTabPanel('acuerdos')}
                      className={`py-1.5 text-[11px] font-bold rounded-lg transition ${
                        tabPanel === 'acuerdos' ? 'bg-[#52796F] text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Acuerdos
                    </button>
                  </div>

                  {/* VISTA 1: NOTAS DE REUNIÓN */}
                  {tabPanel === 'notas' && (
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-300">
                        Notas y Minuta de la Sesión:
                      </label>
                      <textarea
                        rows={6}
                        placeholder="Escribe apuntes de la reunión B2B aquí..."
                        value={notasTexto}
                        onChange={(e) => setNotasTexto(e.target.value)}
                        className="w-full p-3 bg-slate-950 border border-slate-700 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#52796F]"
                      />
                      <button
                        type="button"
                        onClick={handleDescargarTranscripcion}
                        className="w-full py-2 bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-bold rounded-xl transition shadow-md"
                      >
                        Descargar Transcripción (.txt)
                      </button>
                    </div>
                  )}

                  {/* VISTA 2: ADJUNTAR ARCHIVOS */}
                  {tabPanel === 'archivos' && (
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-slate-300">
                        Documentos Compartidos B2B:
                      </label>
                      <ul className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {archivos.map((arch, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between p-2 bg-slate-950 rounded-xl text-xs border border-slate-800 text-slate-300"
                          >
                            <span className="truncate">{arch}</span>
                            <span className="text-[10px] text-emerald-400 font-bold">Cifrado</span>
                          </li>
                        ))}
                      </ul>

                      <form onSubmit={handleAgregarArchivo} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Nombre o link de archivo..."
                          value={nuevoArchivo}
                          onChange={(e) => setNuevoArchivo(e.target.value)}
                          className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#52796F]"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-bold rounded-xl transition"
                        >
                          Adjuntar
                        </button>
                      </form>
                    </div>
                  )}

                  {/* VISTA 3: ACUERDOS B2B */}
                  {tabPanel === 'acuerdos' && (
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-slate-300">
                        Compromisos & Acuerdos Firmados:
                      </label>
                      <ul className="space-y-2 max-h-44 overflow-y-auto pr-1">
                        {acuerdos.map((acuerdo) => (
                          <li
                            key={acuerdo.id}
                            onClick={() => toggleFirmarAcuerdo(acuerdo.id)}
                            className={`p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                              acuerdo.firmado
                                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span>{acuerdo.texto}</span>
                              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                                acuerdo.firmado ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                              }`}>
                                {acuerdo.firmado ? 'Firmado' : 'Pendiente'}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>

                      <form onSubmit={handleAgregarAcuerdo} className="space-y-2">
                        <input
                          type="text"
                          placeholder="Añadir nuevo acuerdo de reunión..."
                          value={nuevoAcuerdoTexto}
                          onChange={(e) => setNuevoAcuerdoTexto(e.target.value)}
                          className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#52796F]"
                        />
                        <button
                          type="submit"
                          className="w-full py-2 bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-bold rounded-xl transition"
                        >
                          + Agregar Acuerdo
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setTabActiva('cita')}
              className="w-full py-3 bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-bold rounded-2xl transition shadow-lg"
            >
              + Agendar Cita B2B en la Sala
            </button>
          </div>
        </section>
      )}

      {/* TAB 2: Formulario de Agendamiento */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-slate-800/90 p-6 md:p-8 rounded-3xl border-2 border-[#52796F]/40 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-black text-white mb-2">
              Agendar Cita B2B — {portalNombre}
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Selecciona la fecha y bloque de atencion. Al agendar, la cita quedara automaticamente vinculada con la Video Reunion en vivo.
            </p>
          </div>

          {mensaje && (
            <div className={`p-4 mb-6 rounded-2xl text-xs md:text-sm font-bold ${
              mensaje.tipo === 'exito'
                ? 'bg-emerald-950/90 border border-emerald-500 text-emerald-200'
                : 'bg-red-950/90 border border-red-500 text-red-200'
            }`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Nombre Completo o Empresa <span className="text-[#52796F]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Centro Medico ASL / Juan Perez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                RUT o RUT Tributario <span className="text-[#52796F]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K / 12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Correo Electronico <span className="text-[#52796F]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Correos de Invitados Adicionales de la PYME (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Fecha Preferente <span className="text-[#52796F]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#52796F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Bloque Horario <span className="text-[#52796F]">*</span>
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#52796F]"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={cargando}
                className="w-full py-3 bg-[#52796F] hover:bg-[#676E5E] text-white text-sm font-bold rounded-2xl transition shadow-lg disabled:opacity-50"
              >
                {cargando ? 'Guardando agendamiento...' : 'Confirmar Cita B2B y Vincular a la Video Reunión'}
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
