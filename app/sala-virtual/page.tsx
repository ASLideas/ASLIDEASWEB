'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function SalaVirtualPage() {
  const [modoCalma, setModoCalma] = useState(false);
  const [pantallaGrid, setPantallaGrid] = useState<'1' | '2' | '4'>('1');
  const [herramientaActiva, setHerramientaActiva] = useState<'principal' | 'invitar' | 'archivos' | 'notas' | 'imprimir'>('principal');

  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [transcribiendo, setTranscribiendo] = useState(false);
  const [transcripcionTexto, setTranscripcionTexto] = useState<string>(
    "Inicio de sesion grabada B2B. Acuerdos y minuta automatica activa.\n- Asistente 1: Bienvenidos a la Sala Virtual B2B para PYMEs.\n- Asistente 2: Revisando propuesta de Diseño y Vitrinas Virtuales."
  );

  const [archivosAdjuntos, setArchivosAdjuntos] = useState<Array<{ nombre: string; fecha: string; tamano: string; contenido: string }>>([
    {
      nombre: 'Propuesta_Vitrinas_Virtuales_PYME.pdf',
      fecha: '2026-11-25',
      tamano: '840 KB',
      contenido: 'Documento oficial de propuesta B2B para diseño y desarrollo de vitrinas virtuales e interfaces amables para comercios asociados.'
    },
    {
      nombre: 'Protocolo_Accesibilidad_Visual_TEA.pdf',
      fecha: '2026-11-24',
      tamano: '1.2 MB',
      contenido: 'Guia de implementacion de entornos amables, paleta sin sobrecarga sensorial y ajustes razonables en entornos digitales.'
    }
  ]);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<{ nombre: string; fecha: string; tamano: string; contenido: string } | null>(null);
  const [nuevoNombreArchivo, setNuevoNombreArchivo] = useState('');
  const [nuevoContenidoArchivo, setNuevoContenidoArchivo] = useState('');

  const [notasPizarra, setNotasPizarra] = useState<string>(
    "Minuta de Reunion:\n- Acuerdos alcanzados en integracion de Vitrinas Virtuales B2B.\n- Proxima sesion programada para revision tecnica."
  );
  const [nuevoMensajeNota, setNuevoMensajeNota] = useState('');

  const [invitadoEmail, setInvitadoEmail] = useState('');
  const [invitadosLista, setInvitadosLista] = useState<string[]>([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  // Toggle Camara WebCam Real
  const toggleCamara = async () => {
    if (camActiva) {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      setCamActiva(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCamActiva(true);
      } catch (err) {
        alert('No se pudo acceder a la camara web. Verifica los permisos de tu navegador.');
      }
    }
  };

  // Toggle Microfono Real y Transcripcion
  const toggleMicrofono = () => {
    if (micActivo) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setMicActivo(false);
      setTranscribiendo(false);
    } else {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert('Tu navegador no soporta transcripcion directa de voz. El microfono ha sido activado en modo simulacion.');
        setMicActivo(true);
        setTranscribiendo(true);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'es-CL';
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setMicActivo(true);
        setTranscribiendo(true);
      };

      recognition.onresult = (event: any) => {
        let textoTranscrito = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          textoTranscrito += event.results[i][0].transcript;
        }
        if (textoTranscrito.trim()) {
          setTranscripcionTexto((prev) => prev + '\n- ' + textoTranscrito);
        }
      };

      recognition.onerror = () => {
        setMicActivo(false);
        setTranscribiendo(false);
      };

      recognition.onend = () => {
        setMicActivo(false);
        setTranscribiendo(false);
      };

      recognitionRef.current = recognition;
      try {
        recognition.start();
      } catch (err) {
        setMicActivo(true);
        setTranscribiendo(true);
      }
    }
  };

  const handleSubirArchivo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombreArchivo.trim()) return;
    const nuevo = {
      nombre: nuevoNombreArchivo.endsWith('.pdf') || nuevoNombreArchivo.endsWith('.docx') ? nuevoNombreArchivo : nuevoNombreArchivo + '.pdf',
      fecha: new Date().toISOString().split('T')[0],
      tamano: '500 KB',
      contenido: nuevoContenidoArchivo || 'Archivo adjunto durante la reunion de Sala Virtual B2B.'
    };
    setArchivosAdjuntos([...archivosAdjuntos, nuevo]);
    setNuevoNombreArchivo('');
    setNuevoContenidoArchivo('');
    setArchivoSeleccionado(nuevo);
  };

  const handleEnviarNotaChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoMensajeNota.trim()) return;
    setNotasPizarra((prev) => prev + '\n- ' + nuevoMensajeNota);
    setNuevoMensajeNota('');
  };

  const handleEnviarInvitacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitadoEmail.trim()) return;
    setInvitadosLista([...invitadosLista, invitadoEmail]);
    setInvitadoEmail('');
    alert('Invitacion enviada correctamente al correo proporcionado.');
  };

  const handleImprimir = () => {
    window.print();
  };

  const handleDescargarTxt = () => {
    const elemento = document.createElement('a');
    const archivo = new Blob([transcripcionTexto + '\n\nMINUTA DE NOTAS:\n' + notasPizarra], { type: 'text/plain' });
    elemento.href = URL.createObjectURL(archivo);
    elemento.download = 'Acta_Sala_Virtual_ASL_Ideas.txt';
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);
  };

  return (
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#FAF8F5] text-[#2C3E35]' : 'bg-slate-900 text-slate-100'}`}>
      
      {/* Header Superior */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <img src="/LOGO_asl.png" alt="ASL Ideas Logo" className="w-10 h-10 object-contain" />
          <div>
            <h1 className="text-xl font-black text-emerald-400">ASL Ideas SpA — Sala Virtual B2B</h1>
            <p className="text-xs text-slate-300">Diseño y Vitrinas Virtuales para PYMEs & Plataformas Accesibles</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition"
          >
            {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>
          <Link
            href="/"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition border border-slate-700"
          >
            Volver a la Web
          </Link>
        </div>
      </header>

      {/* Barra de Herramientas Desplegable y Controles */}
      <section className="max-w-7xl mx-auto mb-6 flex flex-wrap items-center justify-between gap-4 bg-slate-800/90 p-4 rounded-2xl border border-slate-700 shadow-xl">
        
        {/* Selector Desplegable de Herramientas de Sala */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-300">Herramienta Activa:</label>
          <select
            value={herramientaActiva}
            onChange={(e) => setHerramientaActiva(e.target.value as any)}
            className="px-4 py-2 bg-slate-900 border border-slate-700 text-emerald-400 font-extrabold text-xs rounded-xl focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="principal">1. Principal (Videollamada en vivo)</option>
            <option value="invitar">2. Invitar colaborador</option>
            <option value="archivos">3. Adjuntar archivo (Visor estilo fuentes)</option>
            <option value="notas">4. Notas relevantes (Chat & Minutas)</option>
            <option value="imprimir">5. Imprimir Transcripcion y Acuerdos</option>
          </select>
        </div>

        {/* Controles de Videollamada y Selector de Cuadricula Grid */}
        <div className="flex flex-wrap items-center gap-2">
          {herramientaActiva === 'principal' && (
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700 mr-2">
              <span className="text-[10px] font-bold text-slate-400 px-2">Pantalla:</span>
              <button
                type="button"
                onClick={() => setPantallaGrid('1')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${pantallaGrid === '1' ? 'bg-[#52796F] text-white' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                1
              </button>
              <button
                type="button"
                onClick={() => setPantallaGrid('2')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${pantallaGrid === '2' ? 'bg-[#52796F] text-white' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                2 (PYME Dual)
              </button>
              <button
                type="button"
                onClick={() => setPantallaGrid('4')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${pantallaGrid === '4' ? 'bg-[#52796F] text-white' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                4 (Grid)
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={toggleCamara}
            className={`px-3 py-2 text-xs font-bold rounded-xl border transition ${camActiva ? 'bg-emerald-700 text-white border-emerald-500' : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'}`}
          >
            {camActiva ? 'Camara Encendida' : 'Encender Camara'}
          </button>

          <button
            type="button"
            onClick={toggleMicrofono}
            className={`px-3 py-2 text-xs font-bold rounded-xl border transition ${micActivo ? 'bg-emerald-700 text-white border-emerald-500' : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'}`}
          >
            {micActivo ? 'Microfono Activo' : 'Encender Microfono Real'}
          </button>
        </div>
      </section>

      {/* Area Central Principal de Trabajo */}
      <section className="max-w-7xl mx-auto min-h-[500px]">

        {/* VISTA 1: PRINCIPAL (Transmision Central y Cuadrícula) */}
        {herramientaActiva === 'principal' && (
          <div className="space-y-4">
            <div className={`grid gap-4 ${pantallaGrid === '1' ? 'grid-cols-1' : pantallaGrid === '2' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
              
              {/* Pantalla 1: Camara WebCam Real / Transmision */}
              <div className="relative bg-slate-950 rounded-3xl border-2 border-emerald-500/40 overflow-hidden shadow-2xl min-h-[350px] flex items-center justify-center">
                {camActiva ? (
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover rounded-3xl" />
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-emerald-400 font-black text-xl border border-slate-800">
                      ASL
                    </div>
                    <p className="text-xs font-bold text-slate-300">Camara Apagada</p>
                    <p className="text-[11px] text-slate-500">Haz clic en &quot;Encender Camara&quot; para transmitir en vivo.</p>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-700 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-400">
                  Participante 1 (Anfitrion ASL Ideas)
                </div>
                {transcribiendo && (
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 border border-emerald-500/50 p-3 rounded-2xl text-xs text-emerald-300 font-medium">
                    <span className="font-bold text-emerald-400 block mb-1">Subtitulos en Vivo (Microfono Activo):</span>
                    <p className="italic">&quot;{transcripcionTexto.split('\n').slice(-1)[0]}&quot;</p>
                  </div>
                )}
              </div>

              {/* Pantallas Adicionales segun Cuadrícula */}
              {(pantallaGrid === '2' || pantallaGrid === '4') && (
                <div className="relative bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl min-h-[350px] flex items-center justify-center">
                  <div className="text-center p-6 space-y-2">
                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-400 font-bold text-sm">
                      P2
                    </div>
                    <p className="text-xs font-bold text-slate-300">Socio / Cliente PYME</p>
                    <p className="text-[11px] text-slate-500">Esperando transmision del invitado...</p>
                  </div>
                  <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-full text-[10px] font-bold text-slate-400">
                    Participante 2 (Dual)
                  </div>
                </div>
              )}

              {pantallaGrid === '4' && (
                <>
                  <div className="relative bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl min-h-[350px] flex items-center justify-center">
                    <div className="text-center p-6 space-y-2">
                      <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-400 font-bold text-sm">P3</div>
                      <p className="text-xs font-bold text-slate-300">Colaborador 3</p>
                    </div>
                  </div>
                  <div className="relative bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl min-h-[350px] flex items-center justify-center">
                    <div className="text-center p-6 space-y-2">
                      <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-400 font-bold text-sm">P4</div>
                      <p className="text-xs font-bold text-slate-300">Colaborador 4</p>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        )}

        {/* VISTA 2: INVITAR COLABORADOR */}
        {herramientaActiva === 'invitar' && (
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-2xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-bold text-emerald-400">Invitar Socio o Colaborador a la Reunión</h3>
              <p className="text-xs text-slate-300">Ingresa el correo electronico de tu invitado para enviarle el acceso directo a esta sala virtual.</p>
            </div>

            <form onSubmit={handleEnviarInvitacion} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Correo Electronico del Invitado</label>
                <input
                  type="email"
                  required
                  value={invitadoEmail}
                  onChange={(e) => setInvitadoEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
                  placeholder="ejemplo@pyme.cl"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition shadow-lg"
              >
                Enviar Invitacion Directa
              </button>
            </form>

            {invitadosLista.length > 0 && (
              <div className="pt-4 border-t border-slate-700">
                <h4 className="text-xs font-bold text-emerald-400 mb-2">Invitaciones Enviadas:</h4>
                <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                  {invitadosLista.map((mail, idx) => (
                    <li key={idx}>{mail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* VISTA 3: ADJUNTAR ARCHIVO (Visor Estilo Fuentes) */}
        {herramientaActiva === 'archivos' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Lista de Fuentes/Archivos Adjuntos */}
            <div className="bg-slate-800/90 p-5 rounded-3xl border border-slate-700 space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 border-b border-slate-700 pb-2">Fuentes & Archivos Adjuntos</h3>
              
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {archivosAdjuntos.map((arch, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setArchivoSeleccionado(arch)}
                    className={`w-full text-left p-3 rounded-2xl border transition ${archivoSeleccionado?.nombre === arch.nombre ? 'bg-[#52796F]/30 border-emerald-500 text-emerald-200' : 'bg-slate-900/80 border-slate-700 hover:border-slate-500 text-slate-300'}`}
                  >
                    <p className="text-xs font-bold truncate">{arch.nombre}</p>
                    <p className="text-[10px] text-slate-400">{arch.fecha} — {arch.tamano}</p>
                  </button>
                ))}
              </div>

              {/* Formulario para Adjuntar Nuevo Archivo */}
              <form onSubmit={handleSubirArchivo} className="pt-4 border-t border-slate-700 space-y-3">
                <h4 className="text-xs font-bold text-slate-200">Subir Nueva Fuente / Documento:</h4>
                <input
                  type="text"
                  required
                  value={nuevoNombreArchivo}
                  onChange={(e) => setNuevoNombreArchivo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                  placeholder="Nombre del documento.pdf"
                />
                <textarea
                  value={nuevoContenidoArchivo}
                  onChange={(e) => setNuevoContenidoArchivo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white h-20 focus:outline-none focus:border-emerald-500"
                  placeholder="Resumen o contenido del archivo..."
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition"
                >
                  Adjuntar Documento a la Reunion
                </button>
              </form>
            </div>

            {/* Visor de Contenido del Archivo Seleccionado */}
            <div className="md:col-span-2 bg-slate-800/90 p-6 rounded-3xl border border-slate-700 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-700 pb-3 mb-4">
                  <h3 className="text-base font-bold text-white">
                    {archivoSeleccionado ? archivoSeleccionado.nombre : 'Selecciona un archivo para visualizar'}
                  </h3>
                  {archivoSeleccionado && (
                    <span className="text-xs text-emerald-400 font-mono">{archivoSeleccionado.tamano}</span>
                  )}
                </div>

                {archivoSeleccionado ? (
                  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-sm text-slate-300 leading-relaxed min-h-[250px]">
                    <p className="font-bold text-xs text-emerald-400 mb-2">Vista Previa del Documento:</p>
                    <p>{archivoSeleccionado.contenido}</p>
                  </div>
                ) : (
                  <div className="bg-slate-900/50 p-12 rounded-2xl border border-dashed border-slate-700 text-center text-slate-400 text-xs">
                    Haz clic en cualquiera de los archivos adjuntos de la izquierda para desplegar su contenido completo en pantalla.
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* VISTA 4: NOTAS RELEVANTES (Bloc & Chat en Tiempo Real) */}
        {herramientaActiva === 'notas' && (
          <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 shadow-2xl max-w-4xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-bold text-emerald-400">Notas Relevantes & Chat de Minutas</h3>
              <p className="text-xs text-slate-300">Escribe apuntes, acuerdos y mensajes en tiempo real para compartirlos con todos los participantes.</p>
            </div>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-300 min-h-[200px] whitespace-pre-wrap leading-relaxed overflow-y-auto">
              {notasPizarra}
            </div>

            <form onSubmit={handleEnviarNotaChat} className="flex gap-2">
              <input
                type="text"
                required
                value={nuevoMensajeNota}
                onChange={(e) => setNuevoMensajeNota(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                placeholder="Escribe una nueva nota o acuerdo para la minuta..."
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition shadow-lg"
              >
                Agregar Nota
              </button>
            </form>
          </div>
        )}

        {/* VISTA 5: IMPRIMIR TRANSCRIPCIÓN Y ACUERDOS */}
        {herramientaActiva === 'imprimir' && (
          <div className="bg-slate-800/90 p-6 md:p-8 rounded-3xl border border-slate-700 shadow-2xl max-w-4xl mx-auto space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-4">
              <div>
                <h3 className="text-xl font-bold text-emerald-400">Transcripción Oficial & Registro de Acuerdos</h3>
                <p className="text-xs text-slate-300">Resumen acumulado de la sesion grabado y listo para ser descargado o impreso.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDescargarTxt}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-xl transition"
                >
                  Descargar (.txt)
                </button>
                <button
                  type="button"
                  onClick={handleImprimir}
                  className="px-4 py-2 bg-[#52796F] hover:bg-[#1B4D3E] text-white text-xs font-bold rounded-xl transition shadow-lg"
                >
                  Imprimir Acta Oficial
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-xs text-slate-200 space-y-3">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">Transcripcion Automatica de Voz:</h4>
                <div className="whitespace-pre-wrap font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {transcripcionTexto}
                </div>
              </div>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-xs text-slate-200 space-y-3">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">Minuta y Acuerdos de Pizarra:</h4>
                <div className="whitespace-pre-wrap font-mono text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {notasPizarra}
                </div>
              </div>
            </div>
          </div>
        )}

      </section>

    </main>
  );
}
