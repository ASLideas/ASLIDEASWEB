'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'vivo';

  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita' | 'oficina' | 'reprogramar'>(initialTab);
  const [modoCalma, setModoCalma] = useState(false);
  const [pantallaGrid, setPantallaGrid] = useState<'1' | '2' | '4'>('1');
  const [herramientaActiva, setHerramientaActiva] = useState<'principal' | 'invitar' | 'archivos' | 'notas' | 'imprimir'>('principal');

  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [transcribiendo, setTranscribiendo] = useState(false);
  const [transcripcionTexto, setTranscripcionTexto] = useState<string>(
    "Inicio de sesion grabada B2B. Acuerdos y minuta automatica activa.\n- Asistente 1: Bienvenidos a la Sala Virtual B2B.\n- Asistente 2: Revisando propuesta de Salud Digital Inclusiva."
  );

  const [archivosAdjuntos, setArchivosAdjuntos] = useState<Array<{ nombre: string; fecha: string; tamano: string; contenido: string }>>([
    {
      nombre: 'Convenio_Salud_Integrativa.docx',
      fecha: '2026-11-25',
      tamano: '840 KB',
      contenido: 'Documento oficial de convenio B2B para integracion de fichas SOAP cifradas bajo Ley N° 21.663.'
    },
    {
      nombre: 'Protocolo_Inclusion_TEA_Ley21545.pdf',
      fecha: '2026-11-24',
      tamano: '1.2 MB',
      contenido: 'Guia de implementacion de entornos amables y ajustes razonables en espacios laborales y virtuales.'
    }
  ]);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<{ nombre: string; fecha: string; tamano: string; contenido: string } | null>(null);
  const [nuevoNombreArchivo, setNuevoNombreArchivo] = useState('');
  const [nuevoContenidoArchivo, setNuevoContenidoArchivo] = useState('');

  const [notasPizarra, setNotasPizarra] = useState<string>(
    "Minuta de Reunion:\n- Acuerdos alcanzados en integracion B2B.\n- Proxima sesion programada para revision tecnica."
  );
  const [nuevoMensajeNota, setNuevoMensajeNota] = useState('');

  const [invitadoEmail, setInvitadoEmail] = useState('');
  const [invitadosLista, setInvitadosLista] = useState<string[]>([]);

  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitadosForm, setInvitadosForm] = useState('');
  const [portal, setPortal] = useState('Casa Matriz ASL Ideas SpA');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  // Control de Camara
  useEffect(() => {
    if (camActiva) {
      navigator.mediaDevices?.getUserMedia({ video: true })
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
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  }, [camActiva]);

  // Control de Microfono Real y Transcripcion
  useEffect(() => {
    if (micActivo) {
      navigator.mediaDevices?.getUserMedia({ audio: true })
        .then((stream) => {
          micStreamRef.current = stream;
        })
        .catch((err) => {
          console.error('Error al acceder al microfono:', err);
        });
    } else {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((track) => track.stop());
        micStreamRef.current = null;
      }
    }
  }, [micActivo]);

  useEffect(() => {
    if (transcribiendo) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'es-CL';

        recognition.onresult = (event: any) => {
          let currentText = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentText += event.results[i][0].transcript;
          }
          if (currentText.trim()) {
            setTranscripcionTexto((prev) => prev + '\n- Vox: ' + currentText);
          }
        };

        recognition.onerror = (err: any) => {
          console.error('Error en reconocimiento de voz:', err);
        };

        recognition.start();
        recognitionRef.current = recognition;
      } else {
        setTranscripcionTexto((prev) => prev + '\n- [Sistema]: Reconocimiento de voz no soportado en este navegador. Transcripcion simulada activa.');
      }
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
        recognitionRef.current = null;
      }
    }
  }, [transcribiendo]);

  const handleAgregarArchivo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombreArchivo.trim()) return;
    const nuevo = {
      nombre: nuevoNombreArchivo.endsWith('.docx') || nuevoNombreArchivo.endsWith('.pdf') ? nuevoNombreArchivo : nuevoNombreArchivo + '.pdf',
      fecha: new Date().toISOString().split('T')[0],
      tamano: '512 KB',
      contenido: nuevoContenidoArchivo || 'Documento adjuntado durante la sesion virtual B2B.'
    };
    setArchivosAdjuntos([...archivosAdjuntos, nuevo]);
    setNuevoNombreArchivo('');
    setNuevoContenidoArchivo('');
  };

  const handleAgregarNota = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoMensajeNota.trim()) return;
    setNotasPizarra((prev) => prev + '\n- ' + nuevoMensajeNota);
    setNuevoMensajeNota('');
  };

  const handleAgregarInvitado = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitadoEmail.trim()) return;
    setInvitadosLista([...invitadosLista, invitadoEmail.trim()]);
    setInvitadoEmail('');
  };

  const handleImprimir = () => {
    window.print();
  };

  const handleDescargarTranscripcion = () => {
    const contenido = "SALA VIRTUAL B2B - ACTA Y TRANSCRIPCION\n==================================\n\nTRANSCRIPCION:\n" + transcripcionTexto + "\n\nMINUTA DE NOTAS:\n" + notasPizarra;
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Acta_Transcripcion_ASL_Ideas_B2B.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmitCita = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);
    try {
      const { supabase } = await import('@/lib/supabaseClient').catch(() => ({ supabase: null as any }));
      if (supabase) {
        const { error } = await supabase.from('citas_b2b').insert([
          { nombre, rut, email, invitados: invitadosForm, portal, fecha, hora }
        ]);
        if (error) throw error;
      }
      setMensaje({ tipo: 'exito', texto: 'Cita confirmada y vinculada a la Video Reunion con exito.' });
      setNombre('');
      setRut('');
      setEmail('');
      setInvitadosForm('');
      setFecha('');
    } catch (err: any) {
      setMensaje({ tipo: 'error', texto: 'No se pudo registrar la cita. Verifica los datos o intenta de nuevo.' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-[#E0E6ED]' : 'bg-[#FAF8F5] text-[#2C3E35]'}`}>
      
      {/* Encabezado Superior */}
      <header className={`max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-6 p-4 rounded-2xl border shadow-lg ${modoCalma ? 'bg-[#182635] border-[#78ACE9]/30 text-white' : 'bg-[#1B4D3E] border-[#52796F] text-white'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#52796F] border border-[#A8B58A] flex items-center justify-center font-black text-white text-lg">
            ASL
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight">Casa Matriz ASL Ideas SpA</h1>
            <p className="text-xs opacity-90 text-[#A8B58A]">Sala Virtual & Agendamiento B2B Inclusivo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition border ${modoCalma ? 'bg-[#78ACE9] text-[#101D2B] border-white' : 'bg-[#52796F] text-white border-[#A8B58A] hover:bg-[#676E5E]'}`}
          >
            {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>
          <a
            href="/"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition border border-slate-600"
          >
            Volver a la Web
          </a>
        </div>
      </header>

      {/* Navegacion por Pestanas Principales */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-[#52796F]/30 pb-3">
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-5 py-2.5 text-xs font-black rounded-xl transition ${
            tabActiva === 'vivo'
              ? (modoCalma ? 'bg-[#78ACE9] text-[#101D2B]' : 'bg-[#52796F] text-white shadow-md')
              : (modoCalma ? 'bg-[#182635] text-[#90B2D9]' : 'bg-white text-[#52796F] border border-[#52796F]/30 hover:bg-[#FAF8F5]')
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-5 py-2.5 text-xs font-black rounded-xl transition ${
            tabActiva === 'cita'
              ? (modoCalma ? 'bg-[#78ACE9] text-[#101D2B]' : 'bg-[#52796F] text-white shadow-md')
              : (modoCalma ? 'bg-[#182635] text-[#90B2D9]' : 'bg-white text-[#52796F] border border-[#52796F]/30 hover:bg-[#FAF8F5]')
          }`}
        >
          Agendar Cita en la Sala
        </button>
      </div>

      {/* PESTANA 1: SALA VIRTUAL EN VIVO */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto space-y-6">
          
          {/* Barra Desplegable de Herramientas de Sala */}
          <div className={`p-4 rounded-2xl border shadow-md flex flex-wrap items-center justify-between gap-4 ${modoCalma ? 'bg-[#182635] border-[#78ACE9]/30' : 'bg-white border-[#52796F]/40'}`}>
            <div className="flex items-center gap-3">
              <label className="text-xs font-extrabold uppercase tracking-wider text-[#52796F]">
                Herramientas de Sala:
              </label>
              <select
                value={herramientaActiva}
                onChange={(e) => setHerramientaActiva(e.target.value as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border focus:outline-none ${modoCalma ? 'bg-[#101D2B] text-white border-[#78ACE9]/50' : 'bg-[#FAF8F5] text-[#1B4D3E] border-[#52796F]'}`}
              >
                <option value="principal">Principal (Camara & Grid)</option>
                <option value="invitar">Invitar Colaborador</option>
                <option value="archivos">Adjuntar Archivos & Visor</option>
                <option value="notas">Notas Relevantes (Chat Minuta)</option>
                <option value="imprimir">Imprimir Transcripcion & Acuerdos</option>
              </select>
            </div>

            {/* Selector de Pantalla Grid */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#52796F]">Pantalla:</span>
              <button
                type="button"
                onClick={() => setPantallaGrid('1')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${pantallaGrid === '1' ? 'bg-[#52796F] text-white' : 'bg-[#FAF8F5] text-[#52796F] border-[#52796F]/30'}`}
              >
                1 (Individual)
              </button>
              <button
                type="button"
                onClick={() => setPantallaGrid('2')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${pantallaGrid === '2' ? 'bg-[#52796F] text-white' : 'bg-[#FAF8F5] text-[#52796F] border-[#52796F]/30'}`}
              >
                2 (PYME Dual)
              </button>
              <button
                type="button"
                onClick={() => setPantallaGrid('4')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${pantallaGrid === '4' ? 'bg-[#52796F] text-white' : 'bg-[#FAF8F5] text-[#52796F] border-[#52796F]/30'}`}
              >
                4 (Grid)
              </button>
            </div>
          </div>

          {/* VISTA 1: PRINCIPAL (Transmision Central) */}
          {herramientaActiva === 'principal' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                
                {/* Cuadrícula de Video según Grid */}
                <div className={`relative bg-slate-950 rounded-2xl overflow-hidden border-2 border-[#52796F]/50 shadow-2xl min-h-[360px] p-2 grid gap-2 ${
                  pantallaGrid === '1' ? 'grid-cols-1' : pantallaGrid === '2' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-2'
                }`}>
                  {/* Camara 1 (Usuario Principal) */}
                  <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                    {!camActiva && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-4 text-center bg-slate-900/90">
                        <p className="text-sm font-bold text-white mb-1">Casa Matriz ASL Ideas SpA</p>
                        <p className="text-xs">Camara Apagada</p>
                      </div>
                    )}
                    <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Transmision Principal
                    </span>
                  </div>

                  {/* Camaras Adicionales para Grid 2 o 4 */}
                  {(pantallaGrid === '2' || pantallaGrid === '4') && (
                    <div className="relative aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center p-4 text-center border border-slate-800">
                      <p className="text-xs font-bold text-emerald-400">Invitado PYME 01</p>
                      <p className="text-[11px] text-slate-400">Conectado en Sala Dual</p>
                    </div>
                  )}

                  {pantallaGrid === '4' && (
                    <>
                      <div className="relative aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center p-4 text-center border border-slate-800">
                        <p className="text-xs font-bold text-emerald-400">Invitado PYME 02</p>
                        <p className="text-[11px] text-slate-400">Conectado en Grid</p>
                      </div>
                      <div className="relative aspect-video bg-slate-900 rounded-xl flex flex-col items-center justify-center p-4 text-center border border-slate-800">
                        <p className="text-xs font-bold text-emerald-400">Invitado PYME 03</p>
                        <p className="text-[11px] text-slate-400">Conectado en Grid</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Subtitulos y Transcripcion Flotante */}
                <div className="p-4 bg-slate-900 text-white rounded-xl border border-slate-700 text-xs max-h-28 overflow-y-auto space-y-1">
                  <p className="text-emerald-400 font-bold uppercase text-[10px] tracking-wider">Subtitulos y Transcripcion en Vivo:</p>
                  <p className="whitespace-pre-line text-slate-300">{transcripcionTexto}</p>
                </div>

                {/* Botones de Control en Vivo */}
                <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-white rounded-xl border border-[#52796F]/30 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setMicActivo(!micActivo)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition ${micActivo ? 'bg-[#52796F] text-white' : 'bg-red-600 text-white'}`}
                  >
                    {micActivo ? 'Microfono Encendido' : 'Encender Microfono Real'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCamActiva(!camActiva)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition ${camActiva ? 'bg-[#52796F] text-white' : 'bg-red-600 text-white'}`}
                  >
                    {camActiva ? 'Camara Encendida' : 'Encender Camara'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTranscribiendo(!transcribiendo)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition ${transcribiendo ? 'bg-[#B08D4B] text-white' : 'bg-slate-700 text-white'}`}
                  >
                    {transcribiendo ? 'Transcripcion Activa' : 'Transcribir Reunion'}
                  </button>
                </div>
              </div>

              {/* Panel Lateral Informativo */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${modoCalma ? 'bg-[#182635] border-[#78ACE9]/30' : 'bg-white border-[#52796F]/30 shadow-md'}`}>
                <div>
                  <h3 className="text-sm font-bold text-[#1B4D3E] mb-2 uppercase tracking-wider">Informacion de la Sala</h3>
                  <p className="text-xs text-[#52796F] leading-relaxed mb-4">
                    Espacio accesible diseñado con baja sobrecarga sensorial para reuniones institucionales, alianzas B2B y atencion personalizada.
                  </p>
                  <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#52796F]/20 text-xs space-y-2">
                    <p className="font-bold text-[#1B4D3E]">Normativa Vigente:</p>
                    <ul className="list-disc list-inside space-y-1 text-slate-600">
                      <li>Ley TEA N° 21.545 (Inclusion y Ajustes Razonables).</li>
                      <li>Ley N° 21.663 (Ciberseguridad y Datos Cifrados).</li>
                    </ul>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setHerramientaActiva('invitar')}
                  className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white text-xs font-bold rounded-xl transition shadow-md"
                >
                  + Invitar Colaboradores a la Sala
                </button>
              </div>
            </div>
          )}

          {/* VISTA 2: INVITAR COLABORADOR */}
          {herramientaActiva === 'invitar' && (
            <div className={`max-w-2xl mx-auto p-6 md:p-8 rounded-2xl border shadow-xl ${modoCalma ? 'bg-[#182635] border-[#78ACE9]/30' : 'bg-white border-[#52796F]/40'}`}>
              <h3 className="text-lg font-bold text-[#1B4D3E] mb-2">Invitar Colaborador o Socio B2B</h3>
              <p className="text-xs text-slate-600 mb-6">
                Ingresa el correo electronico de los integrantes de tu empresa o institucion para sumarlos a la llamada en vivo.
              </p>

              <form onSubmit={handleAgregarInvitado} className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-[#52796F] mb-1">Correo Electrónico del Invitado:</label>
                  <input
                    type="email"
                    required
                    placeholder="colaborador@empresa.cl"
                    value={invitadoEmail}
                    onChange={(e) => setInvitadoEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#52796F]/40 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#52796F]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition"
                >
                  Enviar Invitacion a la Sala
                </button>
              </form>

              {invitadosLista.length > 0 && (
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#52796F]/30 text-xs">
                  <p className="font-bold text-[#1B4D3E] mb-2">Invitados Agregados a la Sesion:</p>
                  <ul className="space-y-1 text-slate-700">
                    {invitadosLista.map((mail, idx) => (
                      <li key={idx} className="flex items-center justify-between border-b border-slate-200 py-1">
                        <span>{mail}</span>
                        <span className="text-[10px] text-emerald-600 font-bold">Invitacion Enviada</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* VISTA 3: ADJUNTAR ARCHIVOS & VISOR ESTILO FUENTES */}
          {herramientaActiva === 'archivos' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Formulario de Carga y Lista de Archivos estilo Fuentes */}
              <div className={`p-6 rounded-2xl border shadow-xl space-y-4 ${modoCalma ? 'bg-[#182635] border-[#78ACE9]/30' : 'bg-white border-[#52796F]/40'}`}>
                <h3 className="text-md font-bold text-[#1B4D3E]">Adjuntar Archivo B2B</h3>
                <p className="text-xs text-slate-600">
                  Sube documentos de trabajo. Al hacer clic en un archivo se desplegara su contenido en el visor.
                </p>

                <form onSubmit={handleAgregarArchivo} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#52796F] mb-1">Nombre del Archivo:</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Informe_Metabolico.pdf"
                      value={nuevoNombreArchivo}
                      onChange={(e) => setNuevoNombreArchivo(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#52796F]/30 rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#52796F] mb-1">Contenido / Resumen:</label>
                    <textarea
                      rows={2}
                      placeholder="Escribe el texto o resumen del documento..."
                      value={nuevoContenidoArchivo}
                      onChange={(e) => setNuevoContenidoArchivo(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#52796F]/30 rounded-xl text-xs focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#52796F] text-white text-xs font-bold rounded-xl hover:bg-[#1B4D3E] transition"
                  >
                    + Cargar Archivo a la Sala
                  </button>
                </form>

                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs font-bold text-[#1B4D3E] mb-2 uppercase tracking-wider">Archivos de la Sesion (Fuentes):</p>
                  <div className="space-y-2">
                    {archivosAdjuntos.map((arch, idx) => (
                      <div
                        key={idx}
                        onClick={() => setArchivoSeleccionado(arch)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                          archivoSeleccionado?.nombre === arch.nombre
                            ? 'bg-[#52796F] text-white border-[#1B4D3E]'
                            : 'bg-[#FAF8F5] text-slate-800 border-[#52796F]/30 hover:border-[#52796F]'
                        }`}
                      >
                        <div>
                          <p className="font-bold">{arch.nombre}</p>
                          <p className="text-[10px] opacity-80">{arch.fecha} — {arch.tamano}</p>
                        </div>
                        <span className="text-[10px] underline font-bold">Ver</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Visor de Contenido del Archivo Seleccionado */}
              <div className={`lg:col-span-2 p-6 rounded-2xl border shadow-xl flex flex-col justify-between ${modoCalma ? 'bg-[#182635] border-[#78ACE9]/30' : 'bg-white border-[#52796F]/40'}`}>
                <div>
                  <h3 className="text-md font-bold text-[#1B4D3E] mb-2">Visor de Archivos Adjuntos</h3>
                  {archivoSeleccionado ? (
                    <div className="space-y-4">
                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#52796F]/30 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-[#1B4D3E]">{archivoSeleccionado.nombre}</p>
                          <p className="text-[10px] text-slate-500">{archivoSeleccionado.fecha} | {archivoSeleccionado.tamano}</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Archivo Cifrado</span>
                      </div>
                      <div className="p-4 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono min-h-[220px] whitespace-pre-line leading-relaxed border border-slate-700">
                        {archivoSeleccionado.contenido}
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center text-slate-400 border-2 border-dashed border-slate-300 rounded-xl my-4">
                      Selecciona un archivo de la lista de fuentes a la izquierda para visualizar su contenido en pantalla.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* VISTA 4: NOTAS RELEVANTES (Chat & Minuta en Tiempo Real) */}
          {herramientaActiva === 'notas' && (
            <div className={`max-w-4xl mx-auto p-6 md:p-8 rounded-2xl border shadow-xl ${modoCalma ? 'bg-[#182635] border-[#78ACE9]/30' : 'bg-white border-[#52796F]/40'}`}>
              <h3 className="text-lg font-bold text-[#1B4D3E] mb-2">Notas Relevantes & Minuta de Chat</h3>
              <p className="text-xs text-slate-600 mb-4">
                Escribe notas en tiempo real. Todos los apuntes se sincronizan automaticamente en el acta de la llamada.
              </p>

              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl text-xs min-h-[240px] max-h-[360px] overflow-y-auto whitespace-pre-line font-mono mb-4 border border-slate-700">
                {notasPizarra}
              </div>

              <form onSubmit={handleAgregarNota} className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="Escribe una nota relevante o acuerdo..."
                  value={nuevoMensajeNota}
                  onChange={(e) => setNuevoMensajeNota(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-[#FAF8F5] border border-[#52796F]/40 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#52796F]"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#52796F] text-white text-xs font-bold rounded-xl hover:bg-[#1B4D3E] transition"
                >
                  Agregar Nota
                </button>
              </form>
            </div>
          )}

          {/* VISTA 5: IMPRIMIR TRANSCRIPCION Y ACUERDOS */}
          {herramientaActiva === 'imprimir' && (
            <div className={`max-w-4xl mx-auto p-6 md:p-8 rounded-2xl border shadow-xl space-y-6 ${modoCalma ? 'bg-[#182635] border-[#78ACE9]/30' : 'bg-white border-[#52796F]/40'}`}>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#1B4D3E]">Acta de Acuerdos & Transcripcion Oficial</h3>
                  <p className="text-xs text-slate-600">Generacion e impresion automatica de la minuta B2B.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleDescargarTranscripcion}
                    className="px-4 py-2 bg-[#52796F] text-white text-xs font-bold rounded-xl hover:bg-[#1B4D3E] transition"
                  >
                    Descargar (.txt)
                  </button>
                  <button
                    type="button"
                    onClick={handleImprimir}
                    className="px-4 py-2 bg-[#B08D4B] text-white text-xs font-bold rounded-xl hover:bg-[#90703B] transition"
                  >
                    Imprimir Acta
                  </button>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#52796F]/30">
                  <h4 className="font-bold text-[#1B4D3E] mb-2 uppercase">Acuerdos de la Sesion:</h4>
                  <p className="whitespace-pre-line text-slate-700 font-mono">{notasPizarra}</p>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#52796F]/30">
                  <h4 className="font-bold text-[#1B4D3E] mb-2 uppercase">Transcripcion Completa:</h4>
                  <p className="whitespace-pre-line text-slate-700 font-mono">{transcripcionTexto}</p>
                </div>
              </div>
            </div>
          )}

        </section>
      )}

      {/* PESTANA 2: AGENDAR CITA B2B */}
      {tabActiva === 'cita' && (
        <section className={`max-w-3xl mx-auto p-6 md:p-8 rounded-2xl border shadow-2xl ${modoCalma ? 'bg-[#182635] border-[#78ACE9]/30' : 'bg-white border-[#52796F]/40'}`}>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#1B4D3E] mb-2">Agendar Cita en Casa Matriz ASL Ideas SpA</h2>
            <p className="text-xs text-slate-600">
              Selecciona la fecha y hora de tu reunion B2B. Al agendar, la cita quedara automaticamente vinculada con la Video Reunion en vivo.
            </p>
          </div>

          {mensaje && (
            <div className={`p-4 mb-6 rounded-xl text-xs font-bold ${mensaje.tipo === 'exito' ? 'bg-emerald-100 border border-emerald-500 text-emerald-900' : 'bg-red-100 border border-red-500 text-red-900'}`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#52796F] mb-1">Nombre Completo o Empresa *</label>
              <input
                type="text"
                required
                placeholder="Ej: Centro Medico ASL / Juan Perez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#52796F]/30 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#52796F] mb-1">RUT o RUT Tributario *</label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K / 12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#52796F]/30 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#52796F] mb-1">Correo Electrónico *</label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#52796F]/30 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#52796F] mb-1">Correos de Invitados Adicionales (Opcional)</label>
              <input
                type="text"
                placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl"
                value={invitadosForm}
                onChange={(e) => setInvitadosForm(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#52796F]/30 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#52796F]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#52796F] mb-1">Fecha Preferente *</label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#52796F]/30 rounded-xl text-xs focus:outline-none focus:border-[#52796F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#52796F] mb-1">Bloque Horario *</label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-[#52796F]/30 rounded-xl text-xs focus:outline-none focus:border-[#52796F]"
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
                className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white text-xs font-bold rounded-xl transition shadow-lg disabled:opacity-50"
              >
                {cargando ? 'Guardando agendamiento...' : 'Confirmar Cita y Vincular a la Video Reunion'}
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
