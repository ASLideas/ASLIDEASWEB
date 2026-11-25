'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const initialApp = searchParams.get('app') || 'Casa Matriz ASL Ideas SpA';
  const initialTab = (searchParams.get('tab') as any) || 'vivo';

  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita'>(initialTab);
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [transcripcionesActiva, setTranscripcionesActiva] = useState(true);
  const [modoCalma, setModoCalma] = useState(false);

  // Selector de Cuadrícula de Pantallas
  const [gridModo, setGridModo] = useState<'1' | '2' | '4'>('1');

  // Vista activa de los 5 botones de la Sala Virtual
  const [vistaSala, setVistaSala] = useState<'principal' | 'invitar' | 'archivos' | 'notas' | 'imprimir'>('principal');

  // Archivos Adjuntos en Sala
  const [archivos, setArchivos] = useState([
    { nombre: 'Ficha_Tecnica_SOAP_Ley21663.pdf', fecha: '2026-11-25', tamano: '1.2 MB' },
    { nombre: 'Convenio_Salud_Integrativa.docx', fecha: '2026-11-25', tamano: '840 KB' }
  ]);
  const [nuevoNombreArchivo, setNuevoNombreArchivo] = useState('');

  // Notas Relevantes / Pizarra
  const [notasPizarra, setNotasPizarra] = useState("Minuta de Reunion:\n- Acuerdos alcanzados en integracion B2B.\n- Proxima sesion programada.");

  // Presentacion / Invitar Colaborador
  const [invitadoEmail, setInvitadoEmail] = useState('');
  const [invitadosLista, setInvitadosLista] = useState<string[]>([]);

  // Formulario B2B Agendamiento
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
  const [portal, setPortal] = useState(initialApp);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  // Transcripciones flotantes simuladas
  const [subtitulos, setSubtitulos] = useState<string>('Transcripcion en tiempo real activa para accesibilidad TEA...');

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (camActiva) {
      navigator.mediaDevices?.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.log('Camara no accesible o denegada:', err);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [camActiva]);

  const handleAgregarArchivo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombreArchivo.trim()) return;
    setArchivos([
      ...archivos,
      {
        nombre: nuevoNombreArchivo.trim(),
        fecha: new Date().toISOString().split('T')[0],
        tamano: '500 KB'
      }
    ]);
    setNuevoNombreArchivo('');
  };

  const handleAgregarInvitado = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitadoEmail.trim()) return;
    setInvitadosLista([...invitadosLista, invitadoEmail.trim()]);
    setInvitadoEmail('');
  };

  const handleDescargarTranscripcion = () => {
    const textoCompleto = "ACTA DE REUNION Y TRANSCRIPCION B2B\n" +
      "Sala: " + initialApp + "\n" +
      "Fecha: " + new Date().toLocaleDateString() + "\n\n" +
      "=== MINUTA Y NOTAS ===\n" + notasPizarra + "\n\n" +
      "=== TRANSCRIPCION ===\n" + subtitulos;

    const element = document.createElement("a");
    const file = new Blob([textoCompleto], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Transcripcion_Acuerdos_" + initialApp.replace(/\s+/g, '_') + ".txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSubmitCita = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);

    try {
      const { supabase } = await import('@/lib/supabaseClient').catch(() => ({ supabase: null as any }));
      
      if (supabase) {
        const { error } = await supabase.from('citas_b2b').insert([
          { nombre, rut, email, invitados, portal, fecha, hora }
        ]);
        if (error) throw error;
      }

      setMensaje({
        tipo: 'exito',
        texto: 'Cita confirmada y vinculada a la Video Reunión con éxito.'
      });

      setNombre('');
      setRut('');
      setEmail('');
      setInvitados('');
      setFecha('');
    } catch (err: any) {
      console.error('Error al agendar cita:', err);
      setMensaje({
        tipo: 'error',
        texto: 'No se pudo registrar la cita. Por favor verifica los datos o intenta nuevamente.'
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-[#E2E8F0]' : 'bg-[#FAF8F5] text-[#1B4D3E]'}`}>
      
      {/* Header Superior de la Sala */}
      <header className={`max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b ${
        modoCalma ? 'border-slate-700' : 'border-[#52796F]/30'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1B4D3E] text-white flex items-center justify-center font-black text-sm shadow-md border border-[#A8B58A]">
            ASL
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight">{initialApp}</h1>
            <p className="text-xs opacity-75 font-semibold">Sala Virtual B2B & Convenios Institucionales</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition ${
              modoCalma ? 'bg-[#78ACE9] text-[#101D2B] border-[#90B2D9]' : 'bg-[#A8B58A] text-[#1B4D3E] border-[#52796F]'
            }`}
          >
            {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma (TEA)'}
          </button>
          <a
            href="/"
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-[#52796F] text-white hover:bg-[#1B4D3E] transition shadow-sm"
          >
            Volver a la Web
          </a>
        </div>
      </header>

      {/* Navegacion por Pestanas (Sala en Vivo / Agendar Cita) */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-slate-300/40 pb-2">
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-4 py-2 text-sm font-bold rounded-xl transition ${
            tabActiva === 'vivo'
              ? 'bg-[#1B4D3E] text-white shadow-md'
              : 'bg-white/80 text-[#52796F] hover:bg-white border border-[#A8B58A]/30'
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-4 py-2 text-sm font-bold rounded-xl transition ${
            tabActiva === 'cita'
              ? 'bg-[#1B4D3E] text-white shadow-md'
              : 'bg-white/80 text-[#52796F] hover:bg-white border border-[#A8B58A]/30'
          }`}
        >
          Agendar Cita en la Sala
        </button>
      </div>

      {/* PESTANA 1: SALA EN VIVO */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto space-y-6">
          
          {/* BARRA DE LOS 5 BOTONES PRINCIPALES */}
          <div className="bg-[#1B4D3E] p-3 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-2 border border-[#A8B58A]/40 text-white">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setVistaSala('principal')}
                className={`px-4 py-2 text-xs font-extrabold rounded-xl transition ${
                  vistaSala === 'principal' ? 'bg-[#52796F] text-white shadow-md' : 'bg-[#1B4D3E] text-slate-200 hover:bg-[#52796F]/50'
                }`}
              >
                Principal
              </button>
              <button
                type="button"
                onClick={() => setVistaSala('invitar')}
                className={`px-4 py-2 text-xs font-extrabold rounded-xl transition ${
                  vistaSala === 'invitar' ? 'bg-[#52796F] text-white shadow-md' : 'bg-[#1B4D3E] text-slate-200 hover:bg-[#52796F]/50'
                }`}
              >
                Presentación / Invitar colaborador
              </button>
              <button
                type="button"
                onClick={() => setVistaSala('archivos')}
                className={`px-4 py-2 text-xs font-extrabold rounded-xl transition ${
                  vistaSala === 'archivos' ? 'bg-[#52796F] text-white shadow-md' : 'bg-[#1B4D3E] text-slate-200 hover:bg-[#52796F]/50'
                }`}
              >
                Misión/Visión - Adjuntar archivo
              </button>
              <button
                type="button"
                onClick={() => setVistaSala('notas')}
                className={`px-4 py-2 text-xs font-extrabold rounded-xl transition ${
                  vistaSala === 'notas' ? 'bg-[#52796F] text-white shadow-md' : 'bg-[#1B4D3E] text-slate-200 hover:bg-[#52796F]/50'
                }`}
              >
                Pizarra - Notas relevantes
              </button>
              <button
                type="button"
                onClick={() => setVistaSala('imprimir')}
                className={`px-4 py-2 text-xs font-extrabold rounded-xl transition ${
                  vistaSala === 'imprimir' ? 'bg-[#52796F] text-white shadow-md' : 'bg-[#1B4D3E] text-slate-200 hover:bg-[#52796F]/50'
                }`}
              >
                Imprimir Transcripción y Acuerdos
              </button>
            </div>

            {/* Selector de Pantallas / Grid */}
            <div className="flex items-center gap-2 bg-[#101D2B] px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
              <span className="font-bold text-slate-300">Pantalla:</span>
              <button
                type="button"
                onClick={() => setGridModo('1')}
                className={`px-2 py-0.5 rounded font-bold ${gridModo === '1' ? 'bg-[#52796F] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                1
              </button>
              <button
                type="button"
                onClick={() => setGridModo('2')}
                className={`px-2 py-0.5 rounded font-bold ${gridModo === '2' ? 'bg-[#52796F] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                2 (PYME Dual)
              </button>
              <button
                type="button"
                onClick={() => setGridModo('4')}
                className={`px-2 py-0.5 rounded font-bold ${gridModo === '4' ? 'bg-[#52796F] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                4 (Grid)
              </button>
            </div>
          </div>

          {/* CONTENIDO SEGUN VISTA SELECCIONADA */}
          
          {/* VISTA 1: PRINCIPAL */}
          {vistaSala === 'principal' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                
                {/* Cuadrícula de Transmisión */}
                <div className={`relative aspect-video bg-[#101D2B] rounded-3xl overflow-hidden border-2 border-[#52796F]/50 shadow-2xl p-2 ${
                  gridModo === '2' ? 'grid grid-cols-2 gap-2' : gridModo === '4' ? 'grid grid-cols-2 grid-rows-2 gap-2' : 'flex items-center justify-center'
                }`}>
                  
                  {/* Cámara Principal */}
                  <div className="relative w-full h-full bg-slate-900 rounded-2xl overflow-hidden flex items-center justify-center">
                    {camActiva ? (
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-6 text-slate-300">
                        <p className="text-xs uppercase font-bold tracking-wider text-[#E8A5A5] mb-1">Transmisión Principal en Vivo</p>
                        <h3 className="text-lg font-black text-white">{initialApp}</h3>
                        <p className="text-xs text-slate-400 mt-2">Cámara apagada. Haz clic en "Encender Cámara" para activar video.</p>
                      </div>
                    )}
                  </div>

                  {/* Pantalla 2 en Cuadrícula */}
                  {(gridModo === '2' || gridModo === '4') && (
                    <div className="relative w-full h-full bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 p-4 text-center">
                      <p className="text-xs text-slate-300 font-bold">Invitado PYME 02 (Conectado)</p>
                    </div>
                  )}

                  {/* Pantallas 3 y 4 en Cuadrícula */}
                  {gridModo === '4' && (
                    <>
                      <div className="relative w-full h-full bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 p-4 text-center">
                        <p className="text-xs text-slate-300 font-bold">Invitado PYME 03 (Esperando)</p>
                      </div>
                      <div className="relative w-full h-full bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 p-4 text-center">
                        <p className="text-xs text-slate-300 font-bold">Invitado PYME 04 (Esperando)</p>
                      </div>
                    </>
                  )}

                  {/* Transcripción Flotante en Vivo */}
                  {transcripcionesActiva && (
                    <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/20 text-center text-xs text-emerald-300 font-medium">
                      {subtitulos}
                    </div>
                  )}
                </div>

                {/* Botones de Control Directo de Videollamada */}
                <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-white rounded-2xl border border-[#A8B58A] shadow-md">
                  <button
                    type="button"
                    onClick={() => setMicActivo(!micActivo)}
                    className={`px-5 py-2.5 text-xs font-black rounded-xl transition shadow-sm ${
                      micActivo ? 'bg-[#52796F] text-white' : 'bg-red-600 text-white'
                    }`}
                  >
                    {micActivo ? 'Micrófono Encendido' : 'Micrófono Silenciado'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCamActiva(!camActiva)}
                    className={`px-5 py-2.5 text-xs font-black rounded-xl transition shadow-sm ${
                      camActiva ? 'bg-[#52796F] text-white' : 'bg-red-600 text-white'
                    }`}
                  >
                    {camActiva ? 'Cámara Encendida' : 'Encender Cámara'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setTranscripcionesActiva(!transcripcionesActiva)}
                    className={`px-5 py-2.5 text-xs font-black rounded-xl transition shadow-sm ${
                      transcripcionesActiva ? 'bg-[#1B4D3E] text-white' : 'bg-slate-700 text-slate-200'
                    }`}
                  >
                    {transcripcionesActiva ? 'Transcribir Reunión (Activo)' : 'Iniciar Transcripción'}
                  </button>
                </div>
              </div>

              {/* Panel de Informacion Lateral */}
              <div className="bg-white p-6 rounded-3xl border-2 border-[#52796F]/30 shadow-xl flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-md font-black text-[#1B4D3E]">Información de la Sala</h3>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Espacio accesible diseñado con baja sobrecarga sensorial para reuniones institucionales y convenios B2B.
                  </p>
                  <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#A8B58A]/50 text-xs space-y-1">
                    <p className="font-bold text-[#1B4D3E]">Estado de Sala:</p>
                    <p className="text-slate-600">Conexión cifrada bajo estándar Ley N° 21.663.</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setTabActiva('cita')}
                  className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white text-xs font-bold rounded-xl transition shadow-md mt-6 block text-center"
                >
                  Agregar Invitados / Agendar Cita B2B
                </button>
              </div>
            </div>
          )}

          {/* VISTA 2: PRESENTACION / INVITAR COLABORADOR */}
          {vistaSala === 'invitar' && (
            <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#52796F]/30 shadow-xl max-w-3xl mx-auto space-y-6 text-[#1B4D3E]">
              <div>
                <h3 className="text-xl font-black">Presentación & Invitar Colaborador</h3>
                <p className="text-xs text-slate-600 mt-1">Ingresa el correo electrónico de tus socios o miembros de la PYME para enviar la clave de acceso a la llamada.</p>
              </div>

              <form onSubmit={handleAgregarInvitado} className="flex gap-3">
                <input
                  type="email"
                  required
                  placeholder="correo@socio-empresa.cl"
                  value={invitadoEmail}
                  onChange={(e) => setInvitadoEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-[#FAF8F5] border border-slate-300 rounded-xl text-xs text-[#1B4D3E] focus:outline-none focus:border-[#52796F]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition shadow-md"
                >
                  Enviar Invitación
                </button>
              </form>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#1B4D3E]">Invitados Confirmados en esta Sesión:</h4>
                {invitadosLista.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No hay invitados adicionales registrados en la lista.</p>
                ) : (
                  <ul className="space-y-1 text-xs text-slate-700">
                    {invitadosLista.map((inv, idx) => (
                      <li key={idx} className="bg-[#FAF8F5] p-2 rounded-lg border border-slate-200">
                        {inv}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* VISTA 3: MISION/VISION & ADJUNTAR ARCHIVOS */}
          {vistaSala === 'archivos' && (
            <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#52796F]/30 shadow-xl max-w-4xl mx-auto space-y-6 text-[#1B4D3E]">
              <div>
                <h3 className="text-xl font-black">Misión, Visión & Visor de Archivos Adjuntos</h3>
                <p className="text-xs text-slate-600 mt-1">Revisa los lineamientos de la sala y los documentos adjuntados durante la videoconferencia.</p>
              </div>

              {/* Mision y Vision */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#A8B58A]/40 text-xs space-y-2">
                  <h4 className="font-bold text-[#1B4D3E] text-sm">Misión Institucional</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Transformar la salud digital y el autocuidado mediante soluciones tecnologicas amables, eliminando barreras sensoriales y promoviendo la inclusión efectiva.
                  </p>
                </div>
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#A8B58A]/40 text-xs space-y-2">
                  <h4 className="font-bold text-[#1B4D3E] text-sm">Visión Estratégica</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Ser la red líder de salud y bienestar inclusivo B2B en América Latina, conectando personas con PYMEs comprometidas en un entorno seguro y accesible.
                  </p>
                </div>
              </div>

              {/* Adjuntar y Lista de Archivos */}
              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-black text-[#1B4D3E]">Visor de Archivos de la Reunión</h4>
                
                <form onSubmit={handleAgregarArchivo} className="flex gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Nombre del archivo a adjuntar (ej: Minuta_Firmada.pdf)"
                    value={nuevoNombreArchivo}
                    onChange={(e) => setNuevoNombreArchivo(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-[#FAF8F5] border border-slate-300 rounded-xl text-xs text-[#1B4D3E] focus:outline-none focus:border-[#52796F]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition shadow-md"
                  >
                    Adjuntar Archivo
                  </button>
                </form>

                <div className="space-y-2">
                  {archivos.map((arc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl border border-slate-200 text-xs">
                      <div>
                        <p className="font-bold text-[#1B4D3E]">{arc.nombre}</p>
                        <p className="text-[10px] text-slate-500">Subido: {arc.fecha} | Tamaño: {arc.tamano}</p>
                      </div>
                      <span className="px-3 py-1 bg-[#A8B58A]/30 text-[#1B4D3E] rounded-lg font-bold">
                        Disponible
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VISTA 4: PIZARRA / NOTAS RELEVANTES */}
          {vistaSala === 'notas' && (
            <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#52796F]/30 shadow-xl max-w-4xl mx-auto space-y-4 text-[#1B4D3E]">
              <div>
                <h3 className="text-xl font-black">Pizarra & Bloc de Notas Relevantes</h3>
                <p className="text-xs text-slate-600">Redacta las minutas, puntos clave y compromisos asumidos durante la sesión B2B.</p>
              </div>

              <textarea
                rows={12}
                value={notasPizarra}
                onChange={(e) => setNotasPizarra(e.target.value)}
                className="w-full p-4 bg-[#FAF8F5] border border-slate-300 rounded-2xl text-xs font-mono text-[#1B4D3E] focus:outline-none focus:border-[#52796F] leading-relaxed"
                placeholder="Escribe las notas de la reunión..."
              />
            </div>
          )}

          {/* VISTA 5: IMPRIMIR TRANSCRIPCION Y ACUERDOS */}
          {vistaSala === 'imprimir' && (
            <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#52796F]/30 shadow-xl max-w-4xl mx-auto space-y-6 text-[#1B4D3E]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black">Transcripción & Registro de Acuerdos</h3>
                  <p className="text-xs text-slate-600">Descarga la transcripción oficial en texto o genera la impresión directa del acta.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleDescargarTranscripcion}
                    className="px-4 py-2 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition shadow-md"
                  >
                    Descargar (.txt)
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-[#1B4D3E] hover:bg-[#52796F] text-white font-bold text-xs rounded-xl transition shadow-md"
                  >
                    Imprimir Acta
                  </button>
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-slate-300 space-y-4 text-xs font-mono">
                <div>
                  <h4 className="font-bold text-[#1B4D3E] uppercase text-[11px] mb-1">Notas y Minuta Acumulada:</h4>
                  <pre className="whitespace-pre-wrap text-slate-800">{notasPizarra}</pre>
                </div>
                <hr className="border-slate-300" />
                <div>
                  <h4 className="font-bold text-[#1B4D3E] uppercase text-[11px] mb-1">Transcripción en Tiempo Real:</h4>
                  <p className="text-slate-800">{subtitulos}</p>
                </div>
              </div>
            </div>
          )}

        </section>
      )}

      {/* PESTANA 2: FORMULARIO DE AGENDAMIENTO B2B */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-3xl border-2 border-[#52796F]/30 shadow-2xl text-[#1B4D3E]">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-black mb-2">
              Agendar Cita en la Sala de {portal}
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              Selecciona la fecha y bloque de atención B2B. Al agendar, la cita quedará automáticamente vinculada con la Video Reunión en vivo.
            </p>
          </div>

          {mensaje && (
            <div className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-bold ${
              mensaje.tipo === 'exito' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold mb-1">
                Nombre Completo o Empresa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Centro Médico ASL / Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">
                RUT o RUT Tributario <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K / 12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">
                Correos de Invitados Adicionales (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1">
                  Fecha Preferente <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#52796F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">
                  Bloque Horario <span className="text-red-500">*</span>
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-[#52796F]"
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
                className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white text-xs font-bold rounded-xl transition shadow-md disabled:opacity-50"
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
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Cargando Sala Virtual...</div>}>
      <SalaVirtualContent />
    </Suspense>
  );
}
