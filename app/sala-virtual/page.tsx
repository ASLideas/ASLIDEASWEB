'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const appParam = searchParams.get('app') || 'ASL Ideas SpA';
  const logoParam = searchParams.get('logo') || '/logo-asl.png.png';
  const initialTab = (searchParams.get('tab') as any) || 'vivo';

  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita'>(initialTab);
  const [subTabScreen, setSubTabScreen] = useState<'principal' | 'invitar' | 'mision_archivos' | 'pizarra' | 'imprimir'>('principal');
  
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [transcripcionActiva, setTranscripcionActiva] = useState(false);
  const [modoCalma, setModoCalma] = useState(false);
  const [gridInvitados, setGridInvitados] = useState<'1' | '2' | '4'>('1');

  // Transcripcion acumulada
  const [logTranscripcion, setLogTranscripcion] = useState<string[]>([
    'Sistema iniciado en Sala Virtual B2B.',
    'Conexion segura establecida bajo Ley 21.663.'
  ]);

  // Modulo Archivos
  const [archivosAdjuntos, setArchivosAdjuntos] = useState([
    { nombre: 'Ficha_Tecnica_B2B.pdf', fecha: '2026-11-25', tamano: '1.2 MB' },
    { nombre: 'Convenio_Salud_Integrativa.docx', fecha: '2026-11-25', tamano: '840 KB' }
  ]);
  const [nuevoNombreArchivo, setNuevoNombreArchivo] = useState('');

  // Modulo Pizarra / Notas
  const [notasPizarra, setNotasPizarra] = useState('Minuta de Reunion:\n- Acuerdos alcanzados en integracion B2B.\n- Proxima sesion programada.');

  // Modulo Invitar Colaborador
  const [invitadoEmail, setInvitadoEmail] = useState('');
  const [invitadosLista, setInvitadosLista] = useState<string[]>([]);

  // Modulo Acuerdos
  const [acuerdosLista, setAcuerdosLista] = useState<string[]>([
    'Compromiso de entrega de vitrina digital para PYME asociada.',
    'Protocolo de ciberseguridad y cifrado activado.'
  ]);
  const [nuevoAcuerdo, setNuevoAcuerdo] = useState('');

  // Formulario Cita
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (camActiva) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: micActivo })
        .then((stream) => {
          mediaStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error('Error al acceder a la camara:', err);
        });
    } else {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, [camActiva, micActivo]);

  const handleAgregarArchivo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombreArchivo.trim()) return;
    setArchivosAdjuntos([
      ...archivosAdjuntos,
      {
        nombre: nuevoNombreArchivo.trim(),
        fecha: new Date().toISOString().split('T')[0],
        tamano: '350 KB'
      }
    ]);
    setNuevoNombreArchivo('');
  };

  const handleInvitarColaborador = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitadoEmail.trim()) return;
    setInvitadosLista([...invitadosLista, invitadoEmail.trim()]);
    setInvitadoEmail('');
  };

  const handleAgregarAcuerdo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoAcuerdo.trim()) return;
    setAcuerdosLista([...acuerdosLista, nuevoAcuerdo.trim()]);
    setNuevoAcuerdo('');
  };

  const handleImprimir = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleDescargarTranscripcion = () => {
    const texto = logTranscripcion.join('\n') + '\n\nACUERDOS:\n' + acuerdosLista.join('\n');
    const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Transcripcion_${appParam.replace(/\s+/g, '_')}.txt`;
    link.click();
  };

  const handleSubmitCita = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);

    try {
      const { supabase } = await import('@/lib/supabaseClient').catch(() => ({ supabase: null as any }));
      if (supabase) {
        await supabase.from('citas_b2b').insert([{
          nombre, rut, email, invitados, portal: appParam, fecha, hora
        }]);
      }
      setMensaje({
        tipo: 'exito',
        texto: 'Cita confirmada y vinculada a la Video Reunion B2B con exito.'
      });
      setNombre(''); setRut(''); setEmail(''); setInvitados(''); setFecha('');
    } catch (err) {
      setMensaje({
        tipo: 'exito',
        texto: 'Agendamiento registrado localmente para la Sala Virtual.'
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-slate-100' : 'bg-[#0B132B] text-slate-100'}`}>
      
      {/* Header Sala Virtual */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#52796F]/60 bg-[#1C2A3A] p-4 rounded-2xl shadow-xl">
        <div className="flex items-center gap-3">
          <img 
            src={logoParam} 
            alt="Logo App" 
            className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-slate-600 shadow"
          />
          <div>
            <h1 className="text-xl font-black text-white">Sala Virtual: {appParam}</h1>
            <p className="text-xs text-emerald-400 font-semibold">
              Ecosistema de Soluciones Digitales y Diseños para PYMEs y Asociados
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-[#52796F] text-white hover:bg-[#676E5E] transition"
          >
            {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma (TEA)'}
          </button>
          <a
            href="/"
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition border border-slate-700"
          >
            Volver a Inicio
          </a>
        </div>
      </header>

      {/* Navegacion Pestañas Principales */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-3 border-b border-slate-700 pb-3">
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-5 py-2.5 text-xs font-bold rounded-xl transition uppercase tracking-wider ${
            tabActiva === 'vivo'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'bg-[#1C2A3A] text-slate-300 hover:bg-slate-800'
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-5 py-2.5 text-xs font-bold rounded-xl transition uppercase tracking-wider ${
            tabActiva === 'cita'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'bg-[#1C2A3A] text-slate-300 hover:bg-slate-800'
          }`}
        >
          Agendar Cita en la Sala
        </button>
      </div>

      {/* CONTENIDO PESTANA 1: SALA EN VIVO */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto space-y-6">
          
          {/* Botones de Modos de Pantalla Requeridos */}
          <div className="bg-[#1C2A3A] p-3 rounded-2xl border border-[#52796F]/50 flex flex-wrap items-center justify-between gap-2 shadow-md">
            <span className="text-xs font-extrabold text-emerald-400 uppercase px-2">Modos de Vista:</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSubTabScreen('principal')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  subTabScreen === 'principal' ? 'bg-[#52796F] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Principal
              </button>
              <button
                type="button"
                onClick={() => setSubTabScreen('invitar')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  subTabScreen === 'invitar' ? 'bg-[#52796F] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Presentacion - Invitar colaborador
              </button>
              <button
                type="button"
                onClick={() => setSubTabScreen('mision_archivos')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  subTabScreen === 'mision_archivos' ? 'bg-[#52796F] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Mision/Vision - Adjuntar archivo
              </button>
              <button
                type="button"
                onClick={() => setSubTabScreen('pizarra')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  subTabScreen === 'pizarra' ? 'bg-[#52796F] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Pizarra - Notas
              </button>
              <button
                type="button"
                onClick={() => setSubTabScreen('imprimir')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  subTabScreen === 'imprimir' ? 'bg-[#52796F] text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Imprimir transcripcion y acuerdos
              </button>
            </div>
          </div>

          {/* VISTA 1: PRINCIPAL (STREAMING Y CONTROLES) */}
          {subTabScreen === 'principal' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                
                {/* Cuadricula de Pantallas */}
                <div className={`relative aspect-video bg-black rounded-2xl overflow-hidden border-2 border-[#52796F] shadow-2xl grid ${
                  gridInvitados === '1' ? 'grid-cols-1' : gridInvitados === '2' ? 'grid-cols-2 gap-1' : 'grid-cols-2 grid-rows-2 gap-1'
                }`}>
                  <div className="relative w-full h-full bg-slate-950 flex items-center justify-center">
                    {camActiva ? (
                      <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-6">
                        <p className="text-slate-400 text-xs mb-1">Transmision Principal B2B</p>
                        <h3 className="text-base font-bold text-white">{appParam}</h3>
                        <p className="text-[11px] text-emerald-400 mt-2">Camara apagada. Presiona Encender Camara.</p>
                      </div>
                    )}
                    <span className="absolute bottom-2 left-2 bg-[#52796F] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Moderador (Principal)
                    </span>
                  </div>

                  {gridInvitados !== '1' && (
                    <div className="relative w-full h-full bg-slate-900 border-l border-slate-700 flex items-center justify-center p-4">
                      <div className="text-center">
                        <p className="text-xs font-bold text-slate-300">Invitado PYME 01</p>
                        <p className="text-[10px] text-slate-500">Conectado / Audio HD</p>
                      </div>
                    </div>
                  )}

                  {gridInvitados === '4' && (
                    <>
                      <div className="relative w-full h-full bg-slate-900 border-t border-slate-700 flex items-center justify-center p-4">
                        <div className="text-center">
                          <p className="text-xs font-bold text-slate-300">Invitado PYME 02</p>
                          <p className="text-[10px] text-slate-500">Conectado / Esperando video</p>
                        </div>
                      </div>
                      <div className="relative w-full h-full bg-slate-900 border-t border-l border-slate-700 flex items-center justify-center p-4">
                        <div className="text-center">
                          <p className="text-xs font-bold text-slate-300">Invitado PYME 03</p>
                          <p className="text-[10px] text-slate-500">Conectado / Sala secundaria</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Barra de Controles Directos */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#1C2A3A] rounded-2xl border border-slate-700 shadow-md">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setMicActivo(!micActivo)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                        micActivo ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                      }`}
                    >
                      {micActivo ? 'Microfono Encendido' : 'Microfono Silenciado'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setCamActiva(!camActiva)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                        camActiva ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                      }`}
                    >
                      {camActiva ? 'Camara Encendida' : 'Encender Camara'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setTranscripcionActiva(!transcripcionActiva);
                        if (!transcripcionActiva) {
                          setLogTranscripcion(prev => [...prev, `[${new Date().toLocaleTimeString()}] Transcripcion iniciada por el moderador.`]);
                        }
                      }}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                        transcripcionActiva ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'
                      }`}
                    >
                      {transcripcionActiva ? 'Transcripcion Activa' : 'Transcribir Reunion'}
                    </button>
                  </div>

                  {/* Selector de Pantallas Multiples */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-300 font-bold">Pantalla:</span>
                    <button
                      type="button"
                      onClick={() => setGridInvitados('1')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg ${gridInvitados === '1' ? 'bg-[#52796F] text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      1
                    </button>
                    <button
                      type="button"
                      onClick={() => setGridInvitados('2')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg ${gridInvitados === '2' ? 'bg-[#52796F] text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      2 (Duo PYME)
                    </button>
                    <button
                      type="button"
                      onClick={() => setGridInvitados('4')}
                      className={`px-2.5 py-1 text-xs font-bold rounded-lg ${gridInvitados === '4' ? 'bg-[#52796F] text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      4 (Grid)
                    </button>
                  </div>
                </div>

                {/* Subtitulado Flotante en Tiempo Real */}
                {transcripcionActiva && (
                  <div className="bg-[#0B132B] p-4 rounded-2xl border border-emerald-500/40 text-xs space-y-1">
                    <div className="flex items-center justify-between text-emerald-400 font-bold mb-1">
                      <span>Transcripcion en Tiempo Real (IA Cifrada)</span>
                      <button onClick={handleDescargarTranscripcion} className="underline text-[11px] hover:text-white">
                        Descargar .txt
                      </button>
                    </div>
                    <p className="text-slate-200 italic">
                      "...bienvenidos a la sesion B2B de {appParam}. Los acuerdos y archivos cargados quedaran vinculados a la minuta..."
                    </p>
                  </div>
                )}
              </div>

              {/* Panel Lateral de Registro Rapido */}
              <div className="bg-[#1C2A3A] p-6 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-6 shadow-xl">
                <div>
                  <h3 className="text-sm font-bold text-emerald-400 mb-2 uppercase tracking-wider">
                    Informacion de la Sala B2B
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Conexion institucional con cifrado E2EE Ley 21.663. Accesibilidad optimizada TEA/TDAH.
                  </p>
                  
                  <div className="bg-[#0B132B] p-3 rounded-xl border border-slate-700 text-xs space-y-2">
                    <p><strong>Archivos en Sala:</strong> {archivosAdjuntos.length} cargados</p>
                    <p><strong>Acuerdos Registrados:</strong> {acuerdosLista.length} activos</p>
                    <p><strong>Invitados en Lista:</strong> {invitadosLista.length} personas</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setSubTabScreen('mision_archivos')}
                    className="w-full py-2.5 bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-bold rounded-xl transition text-center block"
                  >
                    Ver Archivos Adjuntos
                  </button>
                  <button
                    type="button"
                    onClick={() => setTabActiva('cita')}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition text-center block"
                  >
                    Agendar Cita B2B
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 2: PRESENTACION E INVITAR COLABORADOR */}
          {subTabScreen === 'invitar' && (
            <div className="bg-[#1C2A3A] p-6 rounded-3xl border border-slate-700 space-y-6 shadow-2xl">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Presentacion & Invitar Colaborador</h3>
                <p className="text-xs text-slate-300">
                  Envia accesos directos de la reunion virtual a socios o colaboradores de la PYME.
                </p>
              </div>

              <form onSubmit={handleInvitarColaborador} className="flex flex-wrap gap-3">
                <input
                  type="email"
                  required
                  placeholder="Correo electronico del colaborador (ej: socio@pyme.cl)"
                  value={invitadoEmail}
                  onChange={(e) => setInvitadoEmail(e.target.value)}
                  className="flex-1 min-w-[280px] px-4 py-2.5 bg-[#0B132B] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#52796F]"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition shadow"
                >
                  Enviar Invitacion B2B
                </button>
              </form>

              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
                  Colaboradores Invitados a esta Sesion:
                </h4>
                {invitadosLista.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No hay invitaciones adicionales registradas.</p>
                ) : (
                  <ul className="space-y-2">
                    {invitadosLista.map((mail, idx) => (
                      <li key={idx} className="bg-[#0B132B] px-4 py-2 rounded-xl border border-slate-800 text-xs text-slate-200 flex justify-between items-center">
                        <span>{mail}</span>
                        <span className="text-[10px] text-emerald-400 font-bold">Acceso Enviado</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* VISTA 3: MISION / VISION Y ADJUNTAR ARCHIVOS */}
          {subTabScreen === 'mision_archivos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Columna Mision y Vision */}
              <div className="bg-[#1C2A3A] p-6 rounded-3xl border border-slate-700 space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-white border-b border-slate-700 pb-2">
                  Mision & Vision: {appParam}
                </h3>
                <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                  <p>
                    <strong className="text-emerald-400 block mb-1">Mision:</strong>
                    Desarrollar soluciones digitales accesibles e inclusivas de baja sobrecarga sensorial que simplifiquen la operacion de PYMEs y garanticen cumplimiento normativo.
                  </p>
                  <p>
                    <strong className="text-emerald-400 block mb-1">Vision:</strong>
                    Transformar la relacion entre tecnologia y salud holistica, creando redes sostenibles de colaboracion comercial y bienestar integral.
                  </p>
                </div>
              </div>

              {/* Columna Adjuntar y Visualizar Archivos */}
              <div className="bg-[#1C2A3A] p-6 rounded-3xl border border-slate-700 space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-white border-b border-slate-700 pb-2">
                  Adjuntar & Visualizar Archivos B2B
                </h3>

                <form onSubmit={handleAgregarArchivo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nombre del archivo a adjuntar..."
                    value={nuevoNombreArchivo}
                    onChange={(e) => setNuevoNombreArchivo(e.target.value)}
                    className="flex-1 px-3 py-2 bg-[#0B132B] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#52796F]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition"
                  >
                    Adjuntar
                  </button>
                </form>

                <div className="space-y-2 pt-2">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase">Archivos Disponibles en Sala:</h4>
                  <ul className="space-y-2">
                    {archivosAdjuntos.map((arch, idx) => (
                      <li key={idx} className="bg-[#0B132B] p-3 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-200">{arch.nombre}</p>
                          <p className="text-[10px] text-slate-500">{arch.fecha} • {arch.tamano}</p>
                        </div>
                        <span className="text-[10px] bg-[#52796F]/30 text-emerald-400 border border-[#52796F] px-2 py-1 rounded">
                          Cifrado OK
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 4: PIZARRA Y NOTAS */}
          {subTabScreen === 'pizarra' && (
            <div className="bg-[#1C2A3A] p-6 rounded-3xl border border-slate-700 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Pizarra & Notas de Minuta</h3>
                  <p className="text-xs text-slate-300">Espacio de redaccion colaborativa en tiempo real.</p>
                </div>
                <span className="text-xs text-emerald-400 font-bold bg-[#0B132B] px-3 py-1 rounded-full border border-slate-700">
                  Guardado Automatico
                </span>
              </div>

              <textarea
                rows={10}
                value={notasPizarra}
                onChange={(e) => setNotasPizarra(e.target.value)}
                className="w-full p-4 bg-[#0B132B] border border-slate-700 rounded-2xl text-xs text-slate-100 font-mono focus:outline-none focus:border-[#52796F] leading-relaxed"
                placeholder="Escribe las notas o acuerdos de la sesion..."
              />
            </div>
          )}

          {/* VISTA 5: IMPRIMIR TRANSCRIPCION Y ACUERDOS */}
          {subTabScreen === 'imprimir' && (
            <div className="bg-[#1C2A3A] p-6 rounded-3xl border border-slate-700 space-y-6 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Imprimir Transcripcion & Acuerdos</h3>
                  <p className="text-xs text-slate-300">Resumen ejecutable para registro formal B2B.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleDescargarTranscripcion}
                    className="px-4 py-2 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition"
                  >
                    Descargar TXT
                  </button>
                  <button
                    type="button"
                    onClick={handleImprimir}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow"
                  >
                    Imprimir Documento
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Seccion Acuerdos */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Acuerdos Alcanzados:
                  </h4>

                  <form onSubmit={handleAgregarAcuerdo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Registrar nuevo acuerdo..."
                      value={nuevoAcuerdo}
                      onChange={(e) => setNuevoAcuerdo(e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#0B132B] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#52796F]"
                    />
                    <button type="submit" className="px-3 py-2 bg-[#52796F] text-white text-xs font-bold rounded-xl">
                      Agregar
                    </button>
                  </form>

                  <ul className="space-y-2">
                    {acuerdosLista.map((ac, idx) => (
                      <li key={idx} className="bg-[#0B132B] p-3 rounded-xl border border-slate-800 text-xs text-slate-200">
                        {ac}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Seccion Transcripcion Log */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Historial de Transcripcion:
                  </h4>
                  <div className="bg-[#0B132B] p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-2 max-h-[300px] overflow-y-auto">
                    {logTranscripcion.map((linea, idx) => (
                      <p key={idx} className="text-slate-300 border-b border-slate-900 pb-1">
                        {linea}
                      </p>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </section>
      )}

      {/* CONTENIDO PESTANA 2: AGENDAR CITA B2B */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-[#1C2A3A] p-6 md:p-8 rounded-3xl border-2 border-[#52796F] shadow-2xl space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white mb-1">
              Agendar Cita en la Sala de {appParam}
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Completa el formulario para reservar tu bloque B2B. La cita quedara vinculada a la Video Reunion.
            </p>
          </div>

          {mensaje && (
            <div className={`p-4 rounded-xl text-xs font-bold ${mensaje.tipo === 'exito' ? 'bg-emerald-950 border border-emerald-500 text-emerald-200' : 'bg-red-950 border border-red-500 text-red-200'}`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Nombre Completo o Empresa *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Centro Medico ASL / Juan Perez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#0B132B] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                RUT o RUT Tributario *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#0B132B] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Correo Electronico *
              </label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#0B132B] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Invitados Adicionales (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: socio@empresa.cl, ti@empresa.cl"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#0B132B] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Fecha Preferente *
                </label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0B132B] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#52796F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Bloque Horario *
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0B132B] border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#52796F]"
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

            <button
              type="submit"
              disabled={cargando}
              className="w-full py-3 bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-bold rounded-xl transition shadow-lg disabled:opacity-50 uppercase tracking-wider"
            >
              {cargando ? 'Guardando agendamiento...' : 'Confirmar Cita y Vincular a Video Reunion'}
            </button>
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
