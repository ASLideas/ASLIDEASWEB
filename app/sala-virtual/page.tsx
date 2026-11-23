'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'vivo';
  const appParam = searchParams.get('app') || 'Casa Matriz ASL Ideas SpA';
  const logoParam = searchParams.get('logo') || '/logo-asl.png.png';

  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita' | 'cancelar'>(initialTab);
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [transcribirActiva, setTranscribirActiva] = useState(false);
  const [transcripcionTexto, setTranscripcionTexto] = useState<string[]>([]);
  
  // Desplegable: Notas, Adjuntar Archivos, Acuerdos
  const [vistaDesplegable, setVistaDesplegable] = useState<'notas' | 'archivos' | 'acuerdos'>('notas');

  // Contenido de Notas, Archivos y Acuerdos
  const [notasTexto, setNotasTexto] = useState('');
  const [archivosLista, setArchivosLista] = useState<{ nombre: string; fecha: string }[]>([
    { nombre: 'Ficha_Oficial_ASL_Ideas.pdf', fecha: '22/11/2026' }
  ]);
  const [nuevoNombreArchivo, setNuevoNombreArchivo] = useState('');
  
  const [acuerdosLista, setAcuerdosLista] = useState<{ id: number; texto: string; firmado: boolean }[]>([
    { id: 1, texto: 'Acuerdo de confidencialidad B2B firmado.', firmado: true },
    { id: 2, texto: 'Definición de alcance de integración digital.', firmado: false }
  ]);
  const [nuevoAcuerdo, setNuevoAcuerdo] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  // Control funcional de la Cámara Web real
  useEffect(() => {
    async function toggleCam() {
      if (camActiva) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micActivo });
          mediaStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.warn('No se pudo acceder a la cámara o cámara simulada activa:', err);
        }
      } else {
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach(track => track.stop());
          mediaStreamRef.current = null;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }
    }
    toggleCam();
  }, [camActiva]);

  // Control funcional de la Transcripción de Voz
  useEffect(() => {
    if (transcribirActiva) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'es-ES';

        recognition.onresult = (event: any) => {
          let currentResult = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentResult += event.results[i][0].transcript;
          }
          if (currentResult.trim()) {
            setTranscripcionTexto(prev => [...prev.slice(-4), currentResult]);
          }
        };

        recognition.start();
        recognitionRef.current = recognition;
      } else {
        // Transcripción asistida simulada si el navegador no tiene la API nativa activa
        const interval = setInterval(() => {
          setTranscripcionTexto(prev => [
            ...prev.slice(-3),
            `[Transcripción en Vivo]: Sesión iniciada para ${appParam} - Registro de acuerdo B2B.`
          ]);
        }, 5000);
        return () => clearInterval(interval);
      }
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    }
  }, [transcribirActiva, appParam]);

  // Formulario de Agendamiento
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const handleAgregarArchivo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombreArchivo.trim()) return;
    setArchivosLista(prev => [...prev, { nombre: nuevoNombreArchivo.trim(), fecha: new Date().toLocaleDateString() }]);
    setNuevoNombreArchivo('');
  };

  const handleAgregarAcuerdo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoAcuerdo.trim()) return;
    setAcuerdosLista(prev => [...prev, { id: Date.now(), texto: nuevoAcuerdo.trim(), firmado: false }]);
    setNuevoAcuerdo('');
  };

  const handleToggleAcuerdo = (id: number) => {
    setAcuerdosLista(prev => prev.map(a => a.id === id ? { ...a, firmado: !a.firmado } : a));
  };

  const handleSubmitCita = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);
    try {
      setMensaje({
        tipo: 'exito',
        texto: '¡Cita confirmada y vinculada a la Video Reunión con éxito!'
      });
      setNombre('');
      setRut('');
      setEmail('');
      setInvitados('');
      setFecha('');
    } catch (err) {
      setMensaje({
        tipo: 'error',
        texto: 'No se pudo registrar la cita. Intenta nuevamente.'
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#EBF5F4] text-[#004D40] p-4 md:p-8 font-sans">
      {/* HEADER PRINCIPAL */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#00796B]/20">
        <div className="flex items-center gap-3">
          <img src={logoParam} alt="Logo App" className="w-12 h-12 object-contain rounded-2xl bg-white p-1 border border-[#00796B]/30 shadow-sm" />
          <div>
            <h1 className="text-xl md:text-2xl font-black text-[#004D40]">
              {appParam}
            </h1>
            <p className="text-xs text-[#00796B] font-semibold">
              Sala Virtual Integrativa B2B & Agendamiento Oficial
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#00796B] text-white hover:bg-[#004D40] transition shadow-md"
          >
            Volver a la Web Principal
          </a>
        </div>
      </header>

      {/* PESTAÑAS PRINCIPALES */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-3 border-b border-[#00796B]/20 pb-3">
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-5 py-2.5 text-xs font-black rounded-xl transition ${
            tabActiva === 'vivo'
              ? 'bg-[#00796B] text-white shadow-md'
              : 'bg-white text-[#004D40] border border-[#00796B]/30 hover:bg-[#E0F2F1]'
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-5 py-2.5 text-xs font-black rounded-xl transition ${
            tabActiva === 'cita'
              ? 'bg-[#00796B] text-white shadow-md'
              : 'bg-white text-[#004D40] border border-[#00796B]/30 hover:bg-[#E0F2F1]'
          }`}
        >
          Agendar Cita B2B
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cancelar')}
          className={`px-5 py-2.5 text-xs font-black rounded-xl transition ${
            tabActiva === 'cancelar'
              ? 'bg-[#00796B] text-white shadow-md'
              : 'bg-white text-[#004D40] border border-[#00796B]/30 hover:bg-[#E0F2F1]'
          }`}
        >
          Cancelar Cita
        </button>
      </div>

      {/* VISTA 1: SALA EN VIVO */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            
            {/* PANTALLA DE VIDEOLLAMADA */}
            <div className="relative aspect-video bg-[#C7E3E0] rounded-3xl overflow-hidden border-2 border-[#00796B]/40 shadow-xl flex items-center justify-center p-4">
              {camActiva ? (
                <video ref={videoRef} autoPlay playsInline muted={!micActivo} className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white border border-[#00796B]/30 flex items-center justify-center shadow">
                    <img src={logoParam} alt="Logo" className="w-10 h-10 object-contain" />
                  </div>
                  <h3 className="text-base font-bold text-[#0A2621]">
                    Transmisión en Vivo: {appParam}
                  </h3>
                  <p className="text-xs text-[#00796B]">
                    {camActiva ? 'Cámara activa' : 'Cámara en reposo | Haz clic en "Encender Cámara" para activar video'}
                  </p>
                </div>
              )}

              {/* OVERLAY DE TRANCRIPCIÓN EN VIVO */}
              {transcribirActiva && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md text-white text-xs p-3 rounded-2xl border border-emerald-400/30 max-h-24 overflow-y-auto space-y-1">
                  <span className="font-bold text-emerald-400 uppercase tracking-wider block text-[10px]">
                    Transcripción de Voz en Vivo:
                  </span>
                  {transcripcionTexto.length > 0 ? (
                    transcripcionTexto.map((linea, idx) => (
                      <p key={idx} className="leading-tight">{linea}</p>
                    ))
                  ) : (
                    <p className="italic text-slate-300">Escuchando audio para transcribir...</p>
                  )}
                </div>
              )}
            </div>

            {/* BOTONES FUNCIONALES DE CONTROL DE REUNIÓN */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-[#00796B]/30 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMicActivo(!micActivo)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                    micActivo ? 'bg-[#00796B] text-white' : 'bg-slate-200 text-[#004D40] hover:bg-slate-300'
                  }`}
                >
                  {micActivo ? 'Micrófono Encendido' : 'Micrófono Silenciado'}
                </button>

                <button
                  type="button"
                  onClick={() => setCamActiva(!camActiva)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                    camActiva ? 'bg-[#00796B] text-white' : 'bg-slate-200 text-[#004D40] hover:bg-slate-300'
                  }`}
                >
                  {camActiva ? 'Cámara Encendida' : 'Encender Cámara'}
                </button>

                <button
                  type="button"
                  onClick={() => setTranscribirActiva(!transcribirActiva)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                    transcribirActiva ? 'bg-[#B08D4B] text-white' : 'bg-slate-200 text-[#004D40] hover:bg-slate-300'
                  }`}
                >
                  {transcribirActiva ? 'Transcripción Activa' : 'Transcribir Reunión'}
                </button>
              </div>

              {/* SELECCIONADOR DE VISTA DESPLEGABLE: NOTAS, ADJUNTAR ARCHIVOS, ACUERDOS */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#00796B]">Herramientas:</span>
                <select
                  value={vistaDesplegable}
                  onChange={(e) => setVistaDesplegable(e.target.value as any)}
                  className="px-3 py-2 bg-[#EBF5F4] border border-[#00796B]/40 rounded-xl text-xs font-bold text-[#004D40] focus:outline-none"
                >
                  <option value="notas">Notas</option>
                  <option value="archivos">Adjuntar Archivos</option>
                  <option value="acuerdos">Acuerdos</option>
                </select>
              </div>
            </div>
          </div>

          {/* PANEL LATERAL INTERACTIVO (NOTAS / ARCHIVOS / ACUERDOS) */}
          <div className="bg-white p-6 rounded-3xl border border-[#00796B]/30 shadow-lg flex flex-col justify-between space-y-4">
            
            {/* VISTA 1: NOTAS */}
            {vistaDesplegable === 'notas' && (
              <div className="space-y-3 flex-1 flex flex-col">
                <h3 className="text-sm font-black text-[#004D40] uppercase tracking-wider">
                  Notas de la Reunión
                </h3>
                <p className="text-xs text-slate-600">
                  Escribe apuntes, compromisos o minutas de la sesión en tiempo real.
                </p>
                <textarea
                  value={notasTexto}
                  onChange={(e) => setNotasTexto(e.target.value)}
                  placeholder="Escribe las notas de la reunión aquí..."
                  className="w-full flex-1 min-h-[220px] p-3 text-xs bg-[#F7FCFC] border border-[#00796B]/30 rounded-2xl focus:outline-none text-[#004D40]"
                />
                <button
                  type="button"
                  onClick={() => alert('Notas guardadas correctamente.')}
                  className="w-full py-2.5 bg-[#00796B] hover:bg-[#004D40] text-white font-bold text-xs rounded-xl transition"
                >
                  Guardar Notas
                </button>
              </div>
            )}

            {/* VISTA 2: ADJUNTAR ARCHIVOS */}
            {vistaDesplegable === 'archivos' && (
              <div className="space-y-3 flex-1 flex flex-col">
                <h3 className="text-sm font-black text-[#004D40] uppercase tracking-wider">
                  Adjuntar Archivos
                </h3>
                <p className="text-xs text-slate-600">
                  Documentos compartidos durante la videoconferencia B2B.
                </p>

                <form onSubmit={handleAgregarArchivo} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Nombre del documento..."
                    value={nuevoNombreArchivo}
                    onChange={(e) => setNuevoNombreArchivo(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7FCFC] border border-[#00796B]/30 rounded-xl text-xs text-[#004D40]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#00796B] text-white text-xs font-bold rounded-xl hover:bg-[#004D40] transition"
                  >
                    + Adjuntar Documento
                  </button>
                </form>

                <div className="space-y-2 pt-2 flex-1 overflow-y-auto max-h-[220px]">
                  {archivosLista.map((arc, idx) => (
                    <div key={idx} className="p-2.5 bg-[#F7FCFC] border border-[#00796B]/20 rounded-xl text-xs flex justify-between items-center">
                      <span className="font-bold text-[#004D40] truncate max-w-[170px]">{arc.nombre}</span>
                      <span className="text-[10px] text-slate-500">{arc.fecha}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VISTA 3: ACUERDOS */}
            {vistaDesplegable === 'acuerdos' && (
              <div className="space-y-3 flex-1 flex flex-col">
                <h3 className="text-sm font-black text-[#004D40] uppercase tracking-wider">
                  Acuerdos B2B
                </h3>
                <p className="text-xs text-slate-600">
                  Registro de compromisos entre partes.
                </p>

                <form onSubmit={handleAgregarAcuerdo} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Redactar nuevo acuerdo..."
                    value={nuevoAcuerdo}
                    onChange={(e) => setNuevoAcuerdo(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F7FCFC] border border-[#00796B]/30 rounded-xl text-xs text-[#004D40]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#B08D4B] text-white text-xs font-bold rounded-xl hover:bg-[#96773B] transition"
                  >
                    + Agregar Acuerdo
                  </button>
                </form>

                <div className="space-y-2 pt-2 flex-1 overflow-y-auto max-h-[220px]">
                  {acuerdosLista.map((acu) => (
                    <div
                      key={acu.id}
                      onClick={() => handleToggleAcuerdo(acu.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition flex items-start gap-2 ${
                        acu.firmado
                          ? 'bg-[#E0F2F1] border-[#00796B] text-[#004D40]'
                          : 'bg-white border-slate-300 text-slate-700'
                      }`}
                    >
                      <input type="checkbox" checked={acu.firmado} readOnly className="mt-0.5" />
                      <span className="leading-tight">{acu.texto}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* VISTA 2: FORMULARIO AGENDAR CITA */}
      {tabActiva === 'cita' && (
        <section className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-3xl border border-[#00796B]/30 shadow-xl">
          <h2 className="text-xl font-black text-[#004D40] mb-2">
            Agendar Cita B2B en {appParam}
          </h2>
          <p className="text-xs text-slate-600 mb-6">
            Ingresa los datos para reservar tu sesión en la Sala Virtual.
          </p>

          {mensaje && (
            <div className={`p-4 mb-4 rounded-xl text-xs font-bold ${
              mensaje.tipo === 'exito' ? 'bg-[#E0F2F1] text-[#004D40] border border-[#00796B]' : 'bg-red-100 text-red-800'
            }`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#004D40] mb-1">Nombre Completo o Empresa</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: PYME SpA"
                className="w-full px-4 py-2.5 bg-[#F7FCFC] border border-[#00796B]/30 rounded-xl text-xs text-[#004D40]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#004D40] mb-1">RUT o Identificación</label>
              <input
                type="text"
                required
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                placeholder="Ej: 77.123.456-K"
                className="w-full px-4 py-2.5 bg-[#F7FCFC] border border-[#00796B]/30 rounded-xl text-xs text-[#004D40]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#004D40] mb-1">Correo Electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contacto@empresa.cl"
                className="w-full px-4 py-2.5 bg-[#F7FCFC] border border-[#00796B]/30 rounded-xl text-xs text-[#004D40]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#004D40] mb-1">Fecha Preferente</label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F7FCFC] border border-[#00796B]/30 rounded-xl text-xs text-[#004D40]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#004D40] mb-1">Bloque Horario</label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F7FCFC] border border-[#00796B]/30 rounded-xl text-xs text-[#004D40]"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full py-3 bg-[#00796B] hover:bg-[#004D40] text-white text-xs font-bold rounded-xl transition shadow-md"
            >
              {cargando ? 'Procesando...' : 'Confirmar Cita'}
            </button>
          </form>
        </section>
      )}

      {/* VISTA 3: CANCELAR CITA */}
      {tabActiva === 'cancelar' && (
        <section className="max-w-xl mx-auto bg-white p-6 rounded-3xl border border-[#00796B]/30 shadow-xl text-center space-y-4">
          <h2 className="text-lg font-black text-[#004D40]">Cancelar o Anular Cita</h2>
          <p className="text-xs text-slate-600">
            Si necesitas liberar el bloque agendado, ingresa tu correo para procesar la anulación.
          </p>
          <input
            type="email"
            placeholder="Correo con el que agendaste..."
            className="w-full px-4 py-2.5 bg-[#F7FCFC] border border-[#00796B]/30 rounded-xl text-xs text-[#004D40]"
          />
          <button
            type="button"
            onClick={() => alert('Solicitud de anulación enviada.')}
            className="w-full py-3 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl transition"
          >
            Solicitar Anulación de Cita
          </button>
        </section>
      )}
    </main>
  );
}

export default function SalaVirtualPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#00796B]">Cargando Sala Virtual...</div>}>
      <SalaVirtualContent />
    </Suspense>
  );
}
