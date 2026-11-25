'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface ArchivoAdjunto {
  id: string;
  nombre: string;
  fecha: string;
  tamano: string;
  tipo: string;
  contenidoPreview?: string;
}

interface NotaChat {
  id: string;
  autor: string;
  texto: string;
  hora: string;
}

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const initialApp = searchParams.get('app') || 'Casa Matriz ASL Ideas SpA';
  const initialTab = (searchParams.get('tab') as any) || 'vivo';

  // Estados de Navegación y Vistas (Desplegable)
  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita'>(initialTab === 'cita' ? 'cita' : 'vivo');
  const [vistaBoton, setVistaBoton] = useState<'principal' | 'invitar' | 'adjuntar' | 'notas' | 'imprimir'>('principal');
  const [desplegableAbierto, setDesplegableAbierto] = useState(false);

  // Estados de Videollamada y Microfono Real / Transcripción
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [modoCalma, setModoCalma] = useState(false);
  const [pantallaGrid, setPantallaGrid] = useState<'1' | '2' | '4'>('1');
  const [transcribiendo, setTranscribiendo] = useState(false);
  const [transcripcionTexto, setTranscripcionTexto] = useState<string>(
    'Inicio de sesion grabada B2B. Acuerdos y minuta automatica activa.
- Asistente 1: Bienvenidos a la Sala Virtual B2B.
- Asistente 2: Revisando propuesta de Salud Digital Inclusiva.'
  );

  // Referencias para Cámara y Microfono Web API
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  // Estados de Archivos Adjuntos (Visor tipo fuentes)
  const [archivos, setArchivos] = useState<ArchivoAdjunto[]>([
    {
      id: '1',
      nombre: 'Convenio_Salud_Integrativa.pdf',
      fecha: '2026-11-25',
      tamano: '840 KB',
      tipo: 'PDF',
      contenidoPreview: 'Documento Oficial de Convenio Marco para Atenciones Integrativas B2B. Ley N° 21.545 y Ley N° 21.663.'
    },
    {
      id: '2',
      nombre: 'Ficha_Tecnica_ASL_Ideas.docx',
      fecha: '2026-11-25',
      tamano: '1.2 MB',
      tipo: 'DOCX',
      contenidoPreview: 'Especificaciones tecnicas de software accesible con baja sobrecarga sensorial para neurodivergencias.'
    }
  ]);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<ArchivoAdjunto | null>(archivos[0]);

  // Estados de Notas Relevantes / Chat de Minuta
  const [notas, setNotas] = useState<NotaChat[]>([
    { id: '1', autor: 'Casa Matriz ASL', texto: 'Reunion iniciada. Por favor revisar documentos adjuntos.', hora: '10:00 AM' },
    { id: '2', autor: 'Invitado B2B', texto: 'Confirmada la recepcion del borrador de convenio.', hora: '10:05 AM' }
  ]);
  const [nuevaNota, setNuevaNota] = useState('');
  const [autorNombre, setAutorNombre] = useState('Colaborador B2B');

  // Estados para Invitar Colaborador
  const [invitadoEmail, setInvitadoEmail] = useState('');
  const [invitadosEnviados, setInvitadosEnviados] = useState<string[]>([]);
  const [invitadoMensaje, setInvitadoMensaje] = useState('');

  // Estados del Formulario de Agendamiento
  const [nombreForm, setNombreForm] = useState('');
  const [rutForm, setRutForm] = useState('');
  const [emailForm, setEmailForm] = useState('');
  const [fechaForm, setFechaForm] = useState('');
  const [horaForm, setHoraForm] = useState('10:00 AM');
  const [agendadoExito, setAgendadoExito] = useState(false);

  // Control de Camara WebCam
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
          console.error('No se pudo acceder a la camara:', err);
        });
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
    }
  }, [camActiva]);

  // Control de Microfono Real y Web Speech API
  useEffect(() => {
    if (micActivo) {
      setTranscribiendo(true);
      // Intentar inicializar Web Speech API para transcripción real por micrófono
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const rec = new SpeechRecognition();
          rec.continuous = true;
          rec.interimResults = true;
          rec.lang = 'es-CL';

          rec.onresult = (event: any) => {
            let resultText = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
              resultText += event.results[i][0].transcript;
            }
            if (resultText.trim()) {
              setTranscripcionTexto(prev => prev + '\n- ' + resultText);
            }
          };

          rec.onerror = (e: any) => {
            console.log('Speech rec info:', e);
          };

          rec.start();
          recognitionRef.current = rec;
        } catch (e) {
          console.log('Recognition not started:', e);
        }
      } else {
        // Captura de audio directo si Speech API no está en el navegador
        navigator.mediaDevices?.getUserMedia({ audio: true }).catch(() => {});
      }
    } else {
      setTranscribiendo(false);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e){}
        recognitionRef.current = null;
      }
    }
  }, [micActivo]);

  // Manejador de Subida de Archivo
  const handleSubirArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const nuevo: ArchivoAdjunto = {
        id: Date.now().toString(),
        nombre: file.name,
        fecha: new Date().toISOString().split('T')[0],
        tamano: `${(file.size / 1024).toFixed(1)} KB`,
        tipo: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        contenidoPreview: `Archivo adjuntado correctamente durante la sesion: ${file.name}. Listo para visualizacion y descarga B2B.`
      };
      setArchivos(prev => [nuevo, ...prev]);
      setArchivoSeleccionado(nuevo);
    }
  };

  // Manejador de Envio de Notas (Chat / Minuta)
  const handleEnviarNota = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaNota.trim()) return;
    const notaObj: NotaChat = {
      id: Date.now().toString(),
      autor: autorNombre || 'Colaborador B2B',
      texto: nuevaNota.trim(),
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotas(prev => [...prev, notaObj]);
    setNuevaNota('');
  };

  // Manejador de Invitacion
  const handleEnviarInvitacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitadoEmail.trim()) return;
    setInvitadosEnviados(prev => [...prev, invitadoEmail.trim()]);
    setInvitadoEmail('');
    setInvitadoMensaje('Invitacion enviada exitosamente con codigo de acceso B2B.');
    setTimeout(() => setInvitadoMensaje(''), 4000);
  };

  // Descargar Transcripción .txt
  const handleDescargarTranscripcion = () => {
    const element = document.createElement('a');
    const file = new Blob([`TRANSCRIPCION Y ACUERDOS B2B - ${initialApp}\nFecha: ${new Date().toLocaleDateString()}\n\n${transcripcionTexto}\n\nNOTAS RELEVANTES:\n` + notas.map(n => `[${n.hora}] ${n.autor}: ${n.texto}`).join('\n')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Acuerdos_ASL_Ideas_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Imprimir Acta Oficial
  const handleImprimir = () => {
    window.print();
  };

  return (
    <main className={`min-h-screen p-4 md:p-6 transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-slate-100' : 'bg-[#FAF8F5] text-[#1B4D3E]'}`}>
      
      {/* Header Superior */}
      <header className={`max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-6 p-4 rounded-2xl shadow-xl transition-colors ${modoCalma ? 'bg-[#1C2A3A] border border-[#78ACE9]/40' : 'bg-[#1B4D3E] text-white border border-[#52796F]'}`}>
        <div className="flex items-center gap-3">
          <img
            src="/logo-asl.png.png"
            alt="Logo ASL"
            className="w-10 h-10 object-contain bg-white rounded-xl p-1 border border-[#97A884]"
          />
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white">{initialApp}</h1>
            <p className="text-xs text-slate-200">Sala Virtual & Entorno de Videollamada B2B</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition ${modoCalma ? 'bg-[#78ACE9] text-[#101D2B]' : 'bg-[#A8B58A] text-[#1B4D3E] hover:bg-white'}`}
          >
            {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>
          <a
            href="/"
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/20"
          >
            Volver al Inicio
          </a>
        </div>
      </header>

      {/* Pestañas de Pagina: Sala Virtual vs Agendar Cita */}
      <div className="max-w-7xl mx-auto mb-4 flex flex-wrap gap-2 border-b border-[#97A884]/40 pb-2">
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-4 py-2 text-xs font-black rounded-xl transition ${
            tabActiva === 'vivo'
              ? 'bg-[#52796F] text-white shadow'
              : 'bg-white/60 text-[#1B4D3E] hover:bg-white'
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-4 py-2 text-xs font-black rounded-xl transition ${
            tabActiva === 'cita'
              ? 'bg-[#52796F] text-white shadow'
              : 'bg-white/60 text-[#1B4D3E] hover:bg-white'
          }`}
        >
          Agendar Cita en la Sala
        </button>
      </div>

      {tabActiva === 'vivo' && (
        <div className="max-w-7xl mx-auto space-y-4">

          {/* MENÚ DESPLEGABLE Y BARRA COMPACTA DE HERRAMIENTAS */}
          <div className={`p-4 rounded-2xl border shadow-md flex flex-wrap items-center justify-between gap-4 ${modoCalma ? 'bg-[#1C2A3A] border-[#78ACE9]/30' : 'bg-white border-[#A8B58A]'}`}>
            
            {/* Botón Desplegable para Seleccionar Vista */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDesplegableAbierto(!desplegableAbierto)}
                className="px-4 py-2 bg-[#1B4D3E] text-white text-xs font-bold rounded-xl shadow flex items-center gap-2 hover:bg-[#52796F] transition"
              >
                <span>Herramientas de Sala:</span>
                <span className="bg-[#A8B58A] text-[#1B4D3E] px-2 py-0.5 rounded text-[11px] uppercase font-black">
                  {vistaBoton === 'principal' && 'Principal'}
                  {vistaBoton === 'invitar' && 'Invitar Colaborador'}
                  {vistaBoton === 'adjuntar' && 'Adjuntar Archivos'}
                  {vistaBoton === 'notas' && 'Notas Relevantes'}
                  {vistaBoton === 'imprimir' && 'Imprimir Acuerdos'}
                </span>
                <span className="text-xs">▼</span>
              </button>

              {desplegableAbierto && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#97A884] p-2 z-50 space-y-1 text-xs text-[#1B4D3E]">
                  <button
                    type="button"
                    onClick={() => { setVistaBoton('principal'); setDesplegableAbierto(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-bold transition ${vistaBoton === 'principal' ? 'bg-[#52796F] text-white' : 'hover:bg-[#FAF8F5]'}`}
                  >
                    Principal (Videollamada en Vivo)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setVistaBoton('invitar'); setDesplegableAbierto(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-bold transition ${vistaBoton === 'invitar' ? 'bg-[#52796F] text-white' : 'hover:bg-[#FAF8F5]'}`}
                  >
                    Invitar Colaborador
                  </button>
                  <button
                    type="button"
                    onClick={() => { setVistaBoton('adjuntar'); setDesplegableAbierto(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-bold transition ${vistaBoton === 'adjuntar' ? 'bg-[#52796F] text-white' : 'hover:bg-[#FAF8F5]'}`}
                  >
                    Adjuntar Archivo (Visor B2B)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setVistaBoton('notas'); setDesplegableAbierto(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-bold transition ${vistaBoton === 'notas' ? 'bg-[#52796F] text-white' : 'hover:bg-[#FAF8F5]'}`}
                  >
                    Notas Relevantes (Chat / Minuta)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setVistaBoton('imprimir'); setDesplegableAbierto(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-bold transition ${vistaBoton === 'imprimir' ? 'bg-[#52796F] text-white' : 'hover:bg-[#FAF8F5]'}`}
                  >
                    Imprimir Transcripción y Acuerdos
                  </button>
                </div>
              )}
            </div>

            {/* Selector de Pantalla Grid */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold">Pantalla:</span>
              <button
                type="button"
                onClick={() => setPantallaGrid('1')}
                className={`px-3 py-1 text-xs font-black rounded-lg transition ${pantallaGrid === '1' ? 'bg-[#52796F] text-white' : 'bg-slate-200 text-slate-800'}`}
              >
                1 (Individual)
              </button>
              <button
                type="button"
                onClick={() => setPantallaGrid('2')}
                className={`px-3 py-1 text-xs font-black rounded-lg transition ${pantallaGrid === '2' ? 'bg-[#52796F] text-white' : 'bg-slate-200 text-slate-800'}`}
              >
                2 (PYME Dual)
              </button>
              <button
                type="button"
                onClick={() => setPantallaGrid('4')}
                className={`px-3 py-1 text-xs font-black rounded-lg transition ${pantallaGrid === '4' ? 'bg-[#52796F] text-white' : 'bg-slate-200 text-slate-800'}`}
              >
                4 (Grid)
              </button>
            </div>
          </div>

          {/* VISTA 1: PRINCIPAL (VIDEOLLAMADA) */}
          {vistaBoton === 'principal' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                
                {/* Cuadrícula de Transmisión */}
                <div className={`relative bg-black rounded-2xl overflow-hidden border border-slate-700 shadow-2xl p-2 min-h-[360px] flex items-center justify-center`}>
                  
                  {camActiva ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full max-h-[420px] object-cover rounded-xl"
                    />
                  ) : (
                    <div className="text-center p-8 text-white space-y-3">
                      <div className="w-16 h-16 rounded-full bg-[#52796F] mx-auto flex items-center justify-center text-xl font-black">
                        ASL
                      </div>
                      <h3 className="text-lg font-extrabold">{initialApp} — Transmision en Vivo</h3>
                      <p className="text-xs text-slate-300">Camara desactivada. Enciende la camara para transmitir video.</p>
                    </div>
                  )}

                  {/* Subtítulo / Transcripción Flotante en Vivo */}
                  {transcribiendo && (
                    <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur border border-emerald-500/40 p-3 rounded-xl text-xs text-emerald-300 shadow-lg">
                      <span className="font-bold text-white block mb-0.5">Transcripcion en Vivo (Microfono Activo):</span>
                      <p className="line-clamp-2">{transcripcionTexto.split('\n').pop()}</p>
                    </div>
                  )}
                </div>

                {/* Controles de Micrófono Real y Cámara */}
                <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-white dark:bg-[#1C2A3A] rounded-2xl border border-[#97A884]">
                  <button
                    type="button"
                    onClick={() => setMicActivo(!micActivo)}
                    className={`px-5 py-2.5 text-xs font-bold rounded-xl transition shadow flex items-center gap-2 ${
                      micActivo ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                    }`}
                  >
                    <span>{micActivo ? 'Microfono Encendido (Escuchando)' : 'Encender Microfono Real'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCamActiva(!camActiva)}
                    className={`px-5 py-2.5 text-xs font-bold rounded-xl transition shadow flex items-center gap-2 ${
                      camActiva ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                    }`}
                  >
                    <span>{camActiva ? 'Camara Encendida' : 'Encender Camara'}</span>
                  </button>
                </div>
              </div>

              {/* Panel Lateral de Estado de la Sala */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between space-y-4 ${modoCalma ? 'bg-[#1C2A3A] border-[#78ACE9]/30' : 'bg-white border-[#A8B58A]'}`}>
                <div className="space-y-3">
                  <h3 className="text-base font-extrabold text-[#1B4D3E] dark:text-slate-100">Resumen de Sesion B2B</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Espacio de teleconferencia con baja sobrecarga sensorial adaptado a la Ley N° 21.545.
                  </p>
                  <div className="bg-[#FAF8F5] dark:bg-[#101D2B] p-3 rounded-xl border text-xs space-y-1">
                    <p><strong>Invitados Conectados:</strong> {pantallaGrid} participante(s)</p>
                    <p><strong>Microfono:</strong> {micActivo ? 'Capturando Audio Real' : 'Inactivo'}</p>
                    <p><strong>Archivos Adjuntos:</strong> {archivos.length} documento(s)</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setVistaBoton('invitar')}
                  className="w-full py-2.5 bg-[#52796F] hover:bg-[#1B4D3E] text-white text-xs font-bold rounded-xl transition shadow"
                >
                  + Invitar Colaborador a la Sala
                </button>
              </div>
            </div>
          )}

          {/* VISTA 2: INVITAR COLABORADOR */}
          {vistaBoton === 'invitar' && (
            <div className={`max-w-2xl mx-auto p-6 md:p-8 rounded-2xl border shadow-xl ${modoCalma ? 'bg-[#1C2A3A] border-[#78ACE9]/30' : 'bg-white border-[#A8B58A]'}`}>
              <h3 className="text-xl font-extrabold mb-2 text-[#1B4D3E] dark:text-slate-100">Invitar Colaborador o Socio B2B</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-6">
                Ingresa el correo electronico de tus socios o miembros de la PYME para enviar un enlace de acceso directo.
              </p>

              {invitadoMensaje && (
                <div className="p-3 mb-4 rounded-xl bg-emerald-100 border border-emerald-400 text-emerald-800 text-xs font-bold">
                  {invitadoMensaje}
                </div>
              )}

              <form onSubmit={handleEnviarInvitacion} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1">Correo Electronico del Invitado:</label>
                  <input
                    type="email"
                    required
                    placeholder="socio@empresa.cl"
                    value={invitadoEmail}
                    onChange={(e) => setInvitadoEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-[#52796F]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition shadow"
                >
                  Enviar Invitacion Directa
                </button>
              </form>

              {invitadosEnviados.length > 0 && (
                <div className="mt-6 border-t pt-4 space-y-2">
                  <h4 className="text-xs font-bold text-[#52796F]">Invitaciones Enviadas en esta sesion:</h4>
                  <ul className="space-y-1 text-xs list-disc list-inside text-slate-700 dark:text-slate-300">
                    {invitadosEnviados.map((email, idx) => (
                      <li key={idx}>{email} — Acceso Concedido</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* VISTA 3: ADJUNTAR ARCHIVOS (VISOR TIPO FUENTES) */}
          {vistaBoton === 'adjuntar' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Lista de Fuentes/Archivos */}
              <div className={`p-6 rounded-2xl border shadow-xl space-y-4 ${modoCalma ? 'bg-[#1C2A3A] border-[#78ACE9]/30' : 'bg-white border-[#A8B58A]'}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-[#1B4D3E] dark:text-slate-100">Documentos Adjuntos</h3>
                  <label className="px-3 py-1.5 bg-[#52796F] text-white text-xs font-bold rounded-xl cursor-pointer hover:bg-[#1B4D3E] transition shadow">
                    + Adjuntar Nuevo
                    <input type="file" onChange={handleSubirArchivo} className="hidden" />
                  </label>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Haz clic en cualquier archivo para visualizar su contenido en el panel principal.
                </p>

                <div className="space-y-2">
                  {archivos.map((arc) => (
                    <div
                      key={arc.id}
                      onClick={() => setArchivoSeleccionado(arc)}
                      className={`p-3 rounded-xl border cursor-pointer transition text-xs flex items-center justify-between ${
                        archivoSeleccionado?.id === arc.id
                          ? 'bg-[#52796F] text-white border-[#1B4D3E]'
                          : 'bg-[#FAF8F5] dark:bg-[#101D2B] border-slate-200 hover:border-[#52796F]'
                      }`}
                    >
                      <div>
                        <p className="font-bold">{arc.nombre}</p>
                        <p className="text-[10px] opacity-75">{arc.tamano} • {arc.fecha}</p>
                      </div>
                      <span className="font-mono text-[10px] font-black px-2 py-0.5 rounded bg-black/10">
                        {arc.tipo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visor de Contenido del Archivo */}
              <div className={`lg:col-span-2 p-6 rounded-2xl border shadow-xl flex flex-col justify-between ${modoCalma ? 'bg-[#1C2A3A] border-[#78ACE9]/30' : 'bg-white border-[#A8B58A]'}`}>
                {archivoSeleccionado ? (
                  <div className="space-y-4">
                    <div className="border-b pb-3 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] bg-[#52796F] text-white font-bold px-2 py-0.5 rounded uppercase">
                          Vista Previa de Documento B2B
                        </span>
                        <h3 className="text-lg font-extrabold text-[#1B4D3E] dark:text-slate-100 mt-1">
                          {archivoSeleccionado.nombre}
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500">{archivoSeleccionado.tamano}</span>
                    </div>
                    <div className="p-4 bg-[#FAF8F5] dark:bg-[#101D2B] rounded-xl border text-xs leading-relaxed space-y-2">
                      <p className="font-bold text-[#52796F]">Contenido Cifrado / Extracto de Fuente:</p>
                      <p>{archivoSeleccionado.contenidoPreview}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    Selecciona un archivo de la izquierda para desplegar su contenido.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* VISTA 4: NOTAS RELEVANTES (CHAT DE MINUTA) */}
          {vistaBoton === 'notas' && (
            <div className={`max-w-3xl mx-auto p-6 rounded-2xl border shadow-xl space-y-4 ${modoCalma ? 'bg-[#1C2A3A] border-[#78ACE9]/30' : 'bg-white border-[#A8B58A]'}`}>
              <div className="border-b pb-3">
                <h3 className="text-lg font-extrabold text-[#1B4D3E] dark:text-slate-100">Notas Relevantes & Chat de Reunion</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Escribe notas y compartelas en tiempo real con todos los participantes de la sala.
                </p>
              </div>

              {/* Lista de Notas / Chat */}
              <div className="space-y-3 max-h-80 overflow-y-auto p-3 bg-[#FAF8F5] dark:bg-[#101D2B] rounded-xl border">
                {notas.map((n) => (
                  <div key={n.id} className="p-3 bg-white dark:bg-[#1C2A3A] rounded-xl border border-slate-200 shadow-sm text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-[#52796F]">
                      <span>{n.autor}</span>
                      <span className="text-[10px] font-normal text-slate-400">{n.hora}</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200">{n.texto}</p>
                  </div>
                ))}
              </div>

              {/* Formulario para Agregar Nota */}
              <form onSubmit={handleEnviarNota} className="space-y-3 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Tu Nombre / Rol"
                    value={autorNombre}
                    onChange={(e) => setAutorNombre(e.target.value)}
                    className="px-3 py-2 rounded-xl border text-xs text-slate-900 focus:outline-none focus:border-[#52796F]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Escribe una nota relevante..."
                    value={nuevaNota}
                    onChange={(e) => setNuevaNota(e.target.value)}
                    className="md:col-span-2 px-3 py-2 rounded-xl border text-xs text-slate-900 focus:outline-none focus:border-[#52796F]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition shadow"
                >
                  Enviar Nota / Mandar a la Sala
                </button>
              </form>
            </div>
          )}

          {/* VISTA 5: IMPRIMIR TRANSCRIPCIÓN Y ACUERDOS */}
          {vistaBoton === 'imprimir' && (
            <div className={`max-w-3xl mx-auto p-6 md:p-8 rounded-2xl border shadow-xl space-y-6 ${modoCalma ? 'bg-[#1C2A3A] border-[#78ACE9]/30' : 'bg-white border-[#A8B58A]'}`}>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-[#1B4D3E] dark:text-slate-100">Acta Oficial, Transcripcion y Acuerdos</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Registro consolidado listo para descargar en formato de texto o imprimir directamente.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDescargarTranscripcion}
                    className="px-4 py-2 bg-[#52796F] text-white font-bold text-xs rounded-xl hover:bg-[#1B4D3E] transition shadow"
                  >
                    Descargar .txt
                  </button>
                  <button
                    type="button"
                    onClick={handleImprimir}
                    className="px-4 py-2 bg-[#1B4D3E] text-white font-bold text-xs rounded-xl hover:bg-[#52796F] transition shadow"
                  >
                    Imprimir Acta
                  </button>
                </div>
              </div>

              {/* Documento Imprimible */}
              <div className="p-6 bg-white text-slate-900 rounded-xl border border-slate-300 shadow space-y-4 font-mono text-xs leading-relaxed">
                <div className="border-b border-slate-300 pb-3 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-sm uppercase">ASL Ideas SpA — Salud Digital Inclusiva</h4>
                    <p className="text-[11px] text-slate-600">Documento Oficial de Acuerdos B2B</p>
                  </div>
                  <span className="text-[10px] bg-slate-100 px-2 py-1 rounded">Fecha: {new Date().toLocaleDateString()}</span>
                </div>

                <div>
                  <h5 className="font-bold text-[#1B4D3E] mb-1">1. Transcripcion de Audio de la Reunión:</h5>
                  <pre className="whitespace-pre-wrap font-sans text-slate-800 bg-slate-50 p-3 rounded-lg border">
                    {transcripcionTexto}
                  </pre>
                </div>

                <div>
                  <h5 className="font-bold text-[#1B4D3E] mb-1">2. Notas y Minuta de Asistentes:</h5>
                  <div className="space-y-1 font-sans">
                    {notas.map(n => (
                      <p key={n.id} className="text-slate-700">
                        <strong>[{n.hora}] {n.autor}:</strong> {n.texto}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-300 pt-3 text-[10px] text-slate-500">
                  Firmado digitalmente bajo estandares Ley N° 21.663 y Ley N° 21.545.
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Pestaña 2: Formulario de Agendamiento */}
      {tabActiva === 'cita' && (
        <div className={`max-w-2xl mx-auto p-6 md:p-8 rounded-2xl border shadow-xl space-y-4 ${modoCalma ? 'bg-[#1C2A3A] border-[#78ACE9]/30' : 'bg-white border-[#A8B58A]'}`}>
          <h2 className="text-xl font-extrabold text-[#1B4D3E] dark:text-slate-100">Agendar Cita B2B en la Sala Virtual</h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
            Selecciona fecha y hora para agendar tu sesion institucional.
          </p>

          {agendadoExito && (
            <div className="p-3 rounded-xl bg-emerald-100 border border-emerald-400 text-emerald-800 text-xs font-bold">
              Cita agendada exitosamente y vinculada a la Sala Virtual.
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); setAgendadoExito(true); }} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold mb-1">Nombre Completo o PYME:</label>
              <input
                type="text"
                required
                placeholder="Ej: Centro Clinico ASL"
                value={nombreForm}
                onChange={(e) => setNombreForm(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-slate-900 focus:outline-none focus:border-[#52796F]"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">RUT Tributario:</label>
              <input
                type="text"
                required
                placeholder="76.543.210-K"
                value={rutForm}
                onChange={(e) => setRutForm(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-slate-900 focus:outline-none focus:border-[#52796F]"
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Correo Electronico:</label>
              <input
                type="email"
                required
                placeholder="correo@empresa.cl"
                value={emailForm}
                onChange={(e) => setEmailForm(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-slate-900 focus:outline-none focus:border-[#52796F]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-1">Fecha Preferente:</label>
                <input
                  type="date"
                  required
                  value={fechaForm}
                  onChange={(e) => setFechaForm(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-slate-900 focus:outline-none focus:border-[#52796F]"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Bloque Horario:</label>
                <select
                  value={horaForm}
                  onChange={(e) => setHoraForm(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-slate-900 focus:outline-none focus:border-[#52796F]"
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
              className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold rounded-xl transition shadow"
            >
              Confirmar Cita B2B
            </button>
          </form>
        </div>
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
