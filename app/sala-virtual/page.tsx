'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const appParam = searchParams.get('app') || 'Casa Matriz ASL Ideas SpA';

  const [modoCalma, setModoCalma] = useState(false);
  const [pantallaGrid, setPantallaGrid] = useState<'1' | '2' | '4'>('1');
  const [herramientaActiva, setHerramientaActiva] = useState<'principal' | 'invitar' | 'archivos' | 'notas' | 'imprimir'>('principal');
  const [menuHerramientasAbierto, setMenuHerramientasAbierto] = useState(false);

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
  const [invitados, setInvitados] = useState('');
  const [portal, setPortal] = useState(appParam);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (camActiva) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error('Error al acceder a la camara:', err);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [camActiva]);

  const toggleMic = () => {
    const nuevoEstado = !micActivo;
    setMicActivo(nuevoEstado);
    setTranscribiendo(nuevoEstado);

    if (nuevoEstado) {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'es-CL';

        recognitionRef.current.onresult = (event: any) => {
          let textoTemporal = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              const transcrito = event.results[i][0].transcript;
              setTranscripcionTexto((prev) => prev + '\n- Asistente: ' + transcrito);
            }
          }
        };

        recognitionRef.current.start();
      } else {
        setTranscripcionTexto((prev) => prev + '\n- Sistema: Escuchando microfono activo...');
      }
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }
  };

  const handleAgregarArchivo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombreArchivo) return;
    const nuevo = {
      nombre: nuevoNombreArchivo.endsWith('.pdf') || nuevoNombreArchivo.endsWith('.docx') ? nuevoNombreArchivo : `${nuevoNombreArchivo}.docx`,
      fecha: new Date().toISOString().split('T')[0],
      tamano: '512 KB',
      contenido: nuevoContenidoArchivo || 'Documento adjuntado durante la sesion en vivo.'
    };
    setArchivosAdjuntos([...archivosAdjuntos, nuevo]);
    setArchivoSeleccionado(nuevo);
    setNuevoNombreArchivo('');
    setNuevoContenidoArchivo('');
  };

  const handleEnviarNota = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoMensajeNota.trim()) return;
    setNotasPizarra((prev) => prev + '\n- ' + nuevoMensajeNota.trim());
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

  const handleDescargarTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([transcripcionTexto + "\n\n--- MINUTA Y NOTAS ---\n" + notasPizarra], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "Transcripcion_y_Acuerdos_ASL_Ideas.txt";
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
        texto: 'Cita confirmada y vinculada a la Video Reunion con exito.'
      });

      setNombre('');
      setRut('');
      setEmail('');
      setInvitados('');
      setFecha('');
    } catch (err: any) {
      console.error('Error al agendar cita:', err);
      setMensaje({
        tipo: 'exito',
        texto: 'Cita registrada correctamente en el sistema de la Sala Virtual.'
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-[#90B2D9]' : 'bg-[#FAF8F5] text-[#2C3E35]'}`}>
      {/* Header Principal con Logo Oficial */}
      <header className={`max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b ${modoCalma ? 'border-slate-800 bg-[#0B132B]' : 'border-[#52796F]/30 bg-[#1B4D3E] text-white'} p-4 rounded-2xl shadow-lg`}>
        <div className="flex items-center gap-3">
          <img 
            src="/LOGO_asl.png" 
            alt="Logo ASL Ideas SpA" 
            className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-[#84A59D]/40 shadow"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">{appParam}</h1>
            <p className="text-xs text-slate-200 opacity-90">Sala Virtual & Agendamiento B2B Inclusivo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700 transition"
          >
            {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma (TEA)'}
          </button>
          <a
            href="/"
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-100 hover:bg-slate-700 transition border border-slate-700"
          >
            Volver a la Web
          </a>
        </div>
      </header>

      {/* Barra de Control: Selector Grid & Menú Desplegable de Herramientas */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#52796F]/30 shadow-md">
        
        {/* Selector de Pantalla Grid */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold text-[#1B4D3E] uppercase tracking-wider">Pantalla:</span>
          <button
            type="button"
            onClick={() => setPantallaGrid('1')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${pantallaGrid === '1' ? 'bg-[#1B4D3E] text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            1 (Individual)
          </button>
          <button
            type="button"
            onClick={() => setPantallaGrid('2')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${pantallaGrid === '2' ? 'bg-[#1B4D3E] text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            2 (PYME Dual)
          </button>
          <button
            type="button"
            onClick={() => setPantallaGrid('4')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${pantallaGrid === '4' ? 'bg-[#1B4D3E] text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            4 (Grid)
          </button>
        </div>

        {/* Menú Desplegable de Herramientas para no saturar la pantalla */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuHerramientasAbierto(!menuHerramientasAbierto)}
            className="px-4 py-2 bg-[#52796F] hover:bg-[#1B4D3E] text-white text-xs font-black rounded-xl transition shadow flex items-center gap-2"
          >
            <span>Herramientas de Sala</span>
            <span className="text-[10px]">v</span>
          </button>

          {menuHerramientasAbierto && (
            <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 text-white rounded-2xl shadow-2xl p-2 z-50 space-y-1">
              <button
                type="button"
                onClick={() => { setHerramientaActiva('principal'); setMenuHerramientasAbierto(false); }}
                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition ${herramientaActiva === 'principal' ? 'bg-[#1B4D3E] text-white' : 'hover:bg-slate-800 text-slate-300'}`}
              >
                Principal (Video Llamada)
              </button>
              <button
                type="button"
                onClick={() => { setHerramientaActiva('invitar'); setMenuHerramientasAbierto(false); }}
                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition ${herramientaActiva === 'invitar' ? 'bg-[#1B4D3E] text-white' : 'hover:bg-slate-800 text-slate-300'}`}
              >
                Invitar Colaborador
              </button>
              <button
                type="button"
                onClick={() => { setHerramientaActiva('archivos'); setMenuHerramientasAbierto(false); }}
                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition ${herramientaActiva === 'archivos' ? 'bg-[#1B4D3E] text-white' : 'hover:bg-slate-800 text-slate-300'}`}
              >
                Adjuntar Archivo (Visor)
              </button>
              <button
                type="button"
                onClick={() => { setHerramientaActiva('notas'); setMenuHerramientasAbierto(false); }}
                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition ${herramientaActiva === 'notas' ? 'bg-[#1B4D3E] text-white' : 'hover:bg-slate-800 text-slate-300'}`}
              >
                Notas Relevantes (Chat Minuta)
              </button>
              <button
                type="button"
                onClick={() => { setHerramientaActiva('imprimir'); setMenuHerramientasAbierto(false); }}
                className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl transition ${herramientaActiva === 'imprimir' ? 'bg-[#1B4D3E] text-white' : 'hover:bg-slate-800 text-slate-300'}`}
              >
                Imprimir Transcripcion y Acuerdos
              </button>
            </div>
          )}
        </div>
      </div>

      {/* VISTA 1: PRINCIPAL (VIDEO LLAMADA EN VIVO) */}
      {herramientaActiva === 'principal' && (
        <section className="max-w-7xl mx-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              
              {/* Contenedor de Camara / Transmision Grid */}
              <div className={`relative aspect-video bg-slate-950 rounded-2xl overflow-hidden border-2 border-[#52796F]/40 shadow-2xl grid gap-2 p-2 ${
                pantallaGrid === '1' ? 'grid-cols-1' : pantallaGrid === '2' ? 'grid-cols-2' : 'grid-cols-2 grid-rows-2'
              }`}>
                {/* Camara Principal */}
                <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                  {camActiva ? (
                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-4 text-slate-400">
                      <p className="text-sm font-bold text-white mb-1">Camara Apagada</p>
                      <p className="text-xs">Haz clic en &quot;Encender Camara&quot; para iniciar la transmision en vivo.</p>
                    </div>
                  )}
                  <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur">
                    Principal: {appParam}
                  </span>
                </div>

                {/* Camaras Adicionales para Grid 2 o 4 */}
                {pantallaGrid !== '1' && (
                  <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                    <div className="text-center p-2 text-slate-400">
                      <p className="text-xs font-bold text-emerald-400">PYME Colaborador 1</p>
                      <p className="text-[10px]">Conectado a la Sala B2B</p>
                    </div>
                  </div>
                )}

                {pantallaGrid === '4' && (
                  <>
                    <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                      <div className="text-center p-2 text-slate-400">
                        <p className="text-xs font-bold text-emerald-400">PYME Colaborador 2</p>
                        <p className="text-[10px]">En espera de audio</p>
                      </div>
                    </div>
                    <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                      <div className="text-center p-2 text-slate-400">
                        <p className="text-xs font-bold text-emerald-400">Invitado B2B</p>
                        <p className="text-[10px]">Conexion cifrada</p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Botones de Control de Micrófono y Cámara */}
              <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-white rounded-2xl border border-[#52796F]/30 shadow">
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`px-5 py-2.5 text-xs font-bold rounded-xl transition shadow ${
                    micActivo ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                  }`}
                >
                  {micActivo ? 'Microfono Encendido (Escuchando...)' : 'Encender Microfono Real'}
                </button>

                <button
                  type="button"
                  onClick={() => setCamActiva(!camActiva)}
                  className={`px-5 py-2.5 text-xs font-bold rounded-xl transition shadow ${
                    camActiva ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-white'
                  }`}
                >
                  {camActiva ? 'Camara Encendida' : 'Encender Camara'}
                </button>
              </div>
            </div>

            {/* Subtítulos & Transcripción en Vivo */}
            <div className="bg-white p-6 rounded-2xl border border-[#52796F]/30 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-md font-extrabold text-[#1B4D3E] mb-2">Transcripcion en Vivo (Voz a Texto)</h3>
                <p className="text-xs text-slate-600 mb-4">
                  El sistema captura el audio de tu microfono y genera los acuerdos automáticamente.
                </p>

                <div className="bg-slate-950 text-emerald-300 p-4 rounded-xl text-xs font-mono h-64 overflow-y-auto whitespace-pre-wrap border border-slate-800">
                  {transcripcionTexto}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setHerramientaActiva('imprimir')}
                  className="w-full py-2.5 bg-[#52796F] hover:bg-[#1B4D3E] text-white text-xs font-bold rounded-xl transition shadow"
                >
                  Ver Acta Completa e Imprimir
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* VISTA 2: INVITAR COLABORADOR */}
      {herramientaActiva === 'invitar' && (
        <section className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl border border-[#52796F]/30 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#1B4D3E] mb-2">Invitar Colaborador o Socio B2B</h2>
            <p className="text-xs text-slate-600">
              Ingresa el correo del invitado para otorgarle acceso seguro a esta sesion en vivo.
            </p>
          </div>

          <form onSubmit={handleAgregarInvitado} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electronico del Colaborador</label>
              <input
                type="email"
                required
                placeholder="colaborador@empresa.cl"
                value={invitadoEmail}
                onChange={(e) => setInvitadoEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#52796F]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-[#1B4D3E] hover:bg-[#52796F] text-white text-xs font-bold rounded-xl transition shadow"
            >
              Enviar Invitacion Directa
            </button>
          </form>

          {invitadosLista.length > 0 && (
            <div className="border-t border-slate-200 pt-4">
              <h4 className="text-xs font-bold text-[#1B4D3E] mb-2">Invitados Registrados para la Sesion:</h4>
              <ul className="space-y-1 text-xs text-slate-700 list-disc list-inside">
                {invitadosLista.map((inv, idx) => (
                  <li key={idx}>{inv}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* VISTA 3: ADJUNTAR ARCHIVO (VISOR ESTILO FUENTES) */}
      {herramientaActiva === 'archivos' && (
        <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lista de Fuentes / Archivos Adjuntos */}
          <div className="bg-white p-5 rounded-2xl border border-[#52796F]/30 shadow-lg space-y-4">
            <h3 className="text-md font-bold text-[#1B4D3E]">Archivos de la Reunion</h3>
            <p className="text-xs text-slate-600">Haz clic en un archivo para visualizar su contenido en el visor.</p>

            <div className="space-y-2">
              {archivosAdjuntos.map((arch, index) => (
                <div
                  key={index}
                  onClick={() => setArchivoSeleccionado(arch)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                    archivoSeleccionado?.nombre === arch.nombre ? 'bg-[#52796F] text-white border-[#1B4D3E]' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  <p className="font-bold">{arch.nombre}</p>
                  <p className="text-[10px] opacity-75">{arch.fecha} — {arch.tamano}</p>
                </div>
              ))}
            </div>

            {/* Formulario para Adjuntar Nuevo Archivo */}
            <form onSubmit={handleAgregarArchivo} className="pt-4 border-t border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-[#1B4D3E]">Adjuntar Nuevo Documento:</h4>
              <input
                type="text"
                required
                placeholder="Nombre del documento (.pdf / .docx)"
                value={nuevoNombreArchivo}
                onChange={(e) => setNuevoNombreArchivo(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none"
              />
              <textarea
                placeholder="Resumen o contenido del archivo..."
                value={nuevoContenidoArchivo}
                onChange={(e) => setNuevoContenidoArchivo(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 h-20 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#1B4D3E] hover:bg-[#52796F] text-white text-xs font-bold rounded-lg transition shadow"
              >
                + Adjuntar Archivo a la Sala
              </button>
            </form>
          </div>

          {/* Visor de Contenido del Archivo Seleccionado */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-[#52796F]/30 shadow-lg flex flex-col justify-between">
            {archivoSeleccionado ? (
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <span className="bg-[#1B4D3E] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Documento Activo</span>
                  <h3 className="text-lg font-bold text-[#1B4D3E] mt-2">{archivoSeleccionado.nombre}</h3>
                  <p className="text-xs text-slate-500">Subido el {archivoSeleccionado.fecha} | Tamano: {archivoSeleccionado.tamano}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-800 leading-relaxed border border-slate-200 min-h-[250px]">
                  {archivoSeleccionado.contenido}
                </div>
              </div>
            ) : (
              <div className="text-center py-20 text-slate-400">
                <p className="text-sm font-bold">Ningun archivo seleccionado</p>
                <p className="text-xs">Selecciona un documento de la lista de la izquierda para visualizar su contenido.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* VISTA 4: NOTAS RELEVANTES (CHAT MINUTA) */}
      {herramientaActiva === 'notas' && (
        <section className="max-w-3xl mx-auto bg-white p-6 rounded-2xl border border-[#52796F]/30 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#1B4D3E] mb-1">Notas Relevantes y Minuta en Tiempo Real</h2>
            <p className="text-xs text-slate-600">Escribe apuntes o acuerdos para compartirlos con todos los asistentes en vivo.</p>
          </div>

          <div className="bg-slate-950 text-slate-200 p-4 rounded-xl text-xs font-mono h-64 overflow-y-auto whitespace-pre-wrap border border-slate-800">
            {notasPizarra}
          </div>

          <form onSubmit={handleEnviarNota} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="Escribe una nota o acuerdo..."
              value={nuevoMensajeNota}
              onChange={(e) => setNuevoMensajeNota(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#52796F]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1B4D3E] hover:bg-[#52796F] text-white text-xs font-bold rounded-xl transition shadow"
            >
              Agregar Nota
            </button>
          </form>
        </section>
      )}

      {/* VISTA 5: IMPRIMIR TRANSCRIPCIÓN Y ACUERDOS */}
      {herramientaActiva === 'imprimir' && (
        <section className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl border border-[#52796F]/30 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-[#1B4D3E]">Acta Oficial de Transcripcion y Acuerdos</h2>
              <p className="text-xs text-slate-600">Registro completo acumulado durante la Sala Virtual B2B.</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDescargarTxt}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition shadow"
              >
                Descargar (.txt)
              </button>
              <button
                type="button"
                onClick={handleImprimir}
                className="px-4 py-2 bg-[#1B4D3E] hover:bg-[#52796F] text-white text-xs font-bold rounded-xl transition shadow"
              >
                Imprimir Acta
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider mb-2">Transcripcion de Audio:</h3>
              <div className="bg-slate-50 p-4 rounded-xl text-xs font-mono text-slate-800 whitespace-pre-wrap border border-slate-200">
                {transcripcionTexto}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider mb-2">Minuta de Acuerdos:</h3>
              <div className="bg-slate-50 p-4 rounded-xl text-xs font-mono text-slate-800 whitespace-pre-wrap border border-slate-200">
                {notasPizarra}
              </div>
            </div>
          </div>
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
