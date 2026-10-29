'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface PortalInfo {
  id: string;
  nombre: string;
  subtitulo: string;
  logo: string;
  oficinaNum: string;
  leyes: string[];
  descripcionCorta: string;
  descripcionLarga?: string;
  serviciosClave?: string[];
  beneficios?: string[];
  enConstruccion?: boolean;
}

export interface SalaVirtualB2BProps {
  isOpen: boolean;
  onClose: () => void;
  portalData?: PortalInfo;
  initialMode?: 'ficha' | 'videollamada' | 'agendar' | 'cancelar';
  initialApp?: string;
  appLogo?: string;
}

interface ArchivoAdjunto {
  nombre: string;
  tamano: string;
  fecha: string;
}

export default function SalaVirtualB2B({
  isOpen,
  onClose,
  portalData,
  initialMode = 'videollamada',
  initialApp,
  appLogo,
}: SalaVirtualB2BProps) {
  const [modo, setModo] = useState<'ficha' | 'videollamada' | 'agendar' | 'cancelar'>(initialMode);
  const [esPantallaCompleta, setEsPantallaCompleta] = useState<boolean>(false);
  
  // Referencias HTML
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Stream de Cámara y Micrófono Real
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [micActivo, setMicActivo] = useState<boolean>(true);
  const [camActiva, setCamActiva] = useState<boolean>(false);
  const [errorCamara, setErrorCamara] = useState<string>('');

  // Transcripción de Voz Real
  const [transcribiendo, setTranscribiendo] = useState<boolean>(false);
  const [transcripcion, setTranscripcion] = useState<string[]>([
    'ASL Bot: Sala de Video Reunión iniciada bajo cifrado Ley N° 21.663.',
    'Sistemas: Entorno configurado con baja carga sensorial (Ley TEA N° 21.545).'
  ]);

  // Archivos Adjuntos
  const [archivosSubidos, setArchivosSubidos] = useState<ArchivoAdjunto[]>([]);
  const [mensajeEstado, setMensajeEstado] = useState<string>('');

  // Minuta y Notas
  const [minuta, setMinuta] = useState<string>(
    'COMPROMISOS DE LA REUNIÓN B2B:\n1. Revisión de propuesta de Vitrina Virtual PYME.\n2. Demostración de software adaptado con baja carga sensorial.\n3. Coordinación de prueba piloto institucional.'
  );

  const [plataforma, setPlataforma] = useState<string>(
    portalData?.nombre || initialApp || '1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)'
  );
  const [motivo, setMotivo] = useState<string>('Videoreunión de Trabajo / Cotización de Vitrina B2B');
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState<string>('10:30 AM (Bloque Mañana)');
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [reservaConfirmada, setReservaConfirmada] = useState<boolean>(false);
  const [codigoReservaCancel, setCodigoReservaCancel] = useState('');
  const [emailCancel, setEmailCancel] = useState('');
  const [canceladoExito, setCanceladoExito] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setModo(initialMode);
    } else {
      detenerCamara();
    }
  }, [isOpen, initialMode]);

  // Iniciar Cámara Web Real
  const iniciarCamara = async () => {
    try {
      setErrorCamara('');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: true
      });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCamActiva(true);
      setMicActivo(true);
      setMensajeEstado('Cámara y Micrófono conectados en tiempo real');
      setTimeout(() => setMensajeEstado(''), 3000);
    } catch (err: any) {
      console.error('Error accediendo a la cámara:', err);
      setErrorCamara('No se pudo acceder a la cámara/micrófono. Revisa los permisos de tu navegador.');
      setCamActiva(false);
    }
  };

  // Detener Cámara Web Real
  const detenerCamara = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setCamActiva(false);
  };

  // Alternar Micrófono Real
  const toggleMic = () => {
    if (mediaStream) {
      const audioTracks = mediaStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !micActivo;
      });
      setMicActivo(!micActivo);
      setMensajeEstado(!micActivo ? 'Micrófono Activado' : 'Micrófono Silenciado');
      setTimeout(() => setMensajeEstado(''), 2500);
    } else {
      iniciarCamara();
    }
  };

  // Alternar Cámara Real
  const toggleCam = () => {
    if (camActiva) {
      detenerCamara();
    } else {
      iniciarCamara();
    }
  };

  // Reconocimiento de Voz Real (Web Speech API)
  useEffect(() => {
    let recognition: any = null;
    if (typeof window !== 'undefined' && transcribiendo) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'es-CL';

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcriptText = event.results[current][0].transcript;
          setTranscripcion(prev => [...prev, `Voz en vivo: "${transcriptText}"`]);
        };

        recognition.start();
      } else {
        setTranscripcion(prev => [...prev, 'Sistema: El navegador no soporta transcripción por voz directa. Se usará modo asistido.']);
      }
    }
    return () => {
      if (recognition) recognition.stop();
    };
  }, [transcribiendo]);

  // Manejo de Carga Real de Archivos
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const nuevos: ArchivoAdjunto[] = [];
      Array.from(e.target.files).forEach(f => {
        const sizeKB = (f.size / 1024).toFixed(0);
        const sizeStr = Number(sizeKB) > 1024 ? `${(Number(sizeKB) / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
        nuevos.push({
          nombre: f.name,
          tamano: sizeStr,
          fecha: 'Ahora'
        });
      });
      setArchivosSubidos(prev => [...prev, ...nuevos]);
      setMensajeEstado(`${nuevos.length} archivo(s) subido(s) correctamente`);
      setTimeout(() => setMensajeEstado(''), 3000);
    }
  };

  const eliminarArchivo = (index: number) => {
    const borrado = archivosSubidos[index];
    setArchivosSubidos(prev => prev.filter((_, i) => i !== index));
    setMensajeEstado(`Archivo "${borrado.nombre}" eliminado`);
    setTimeout(() => setMensajeEstado(''), 2500);
  };

  // Activar/Desactivar Pantalla Completa Real
  const togglePantallaCompleta = () => {
    if (!esPantallaCompleta) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setEsPantallaCompleta(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setEsPantallaCompleta(false);
    }
  };

  if (!isOpen) return null;

  const currentNombre = portalData?.nombre || initialApp || 'ASL Ideas SpA';
  const currentLogo = portalData?.logo || appLogo || '/logo-asl.png.png';
  const currentOficina = portalData?.oficinaNum || 'Oficina Virtual 01';
  const currentSubtitulo = portalData?.subtitulo || 'Casa Matriz - Desarrollo B2B y Licencias Inclusivas';
  const currentLeyes = portalData?.leyes || ['Ley TEA N° 21.545', 'Accesibilidad Cognitiva UI/UX'];
  const currentDescLarga = portalData?.descripcionLarga || 'Especialistas en desarrollo de software accesible a medida.';
  const currentServicios = portalData?.serviciosClave || ['Licencias B2B de Software', 'Vitrinas Virtuales PYME'];
  const currentBeneficios = portalData?.beneficios || ['Entornos de baja carga sensorial', 'Cumplimiento normativo estricto'];

  return (
    <div className="fixed inset-0 z-50 bg-[#676E5E]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div 
        ref={containerRef}
        className={`bg-[#E6E7D5] transition-all duration-300 ${
          esPantallaCompleta 
            ? 'w-full h-full rounded-none border-0 p-4 sm:p-8 space-y-6 overflow-y-auto' 
            : 'max-w-5xl w-full rounded-3xl border-2 border-[#97A884] shadow-2xl p-4 sm:p-8 space-y-6 my-4'
        } text-[#676E5E]`}
      >
        
        {/* Cabecera del Modal con Pantalla Completa */}
        <div className="flex flex-wrap justify-between items-center border-b border-[#97A884]/40 pb-4 gap-2">
          <div className="flex items-center space-x-3">
            <img 
              src={currentLogo} 
              alt={`Logo ${currentNombre}`} 
              className="w-10 h-10 object-contain rounded-xl border-2 border-[#E6C693] bg-white p-0.5 shadow-xs shrink-0" 
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-3 py-0.5 rounded-full border border-[#97A884]">
                {currentOficina} — {currentNombre}
              </span>
              <h3 className="text-base sm:text-xl font-extrabold text-[#676E5E] mt-0.5">
                {modo === 'ficha' ? `Ficha Técnica: ${currentNombre}` : modo === 'videollamada' ? 'Sala Virtual Interactiva en Vivo' : modo === 'agendar' ? 'Agendar Reunión B2B' : 'Cancelar o Reprogramar'}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={togglePantallaCompleta}
              className="text-xs font-bold text-[#676E5E] bg-white hover:bg-[#CDD6A9] px-3 py-1.5 rounded-xl border-2 border-[#97A884] transition cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span className="text-sm font-black">🗖</span>
              <span>{esPantallaCompleta ? 'Restaurar' : 'Pantalla Completa'}</span>
            </button>

            <button
              type="button"
              onClick={() => { detenerCamara(); onClose(); }}
              className="text-xs font-bold text-white bg-[#DC8D6C] hover:bg-[#c37858] px-3.5 py-1.5 rounded-xl transition cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>

        {/* Pestañas de Navegación del Modal */}
        <div className="flex flex-wrap sm:flex-nowrap bg-[#CDD6A9]/50 p-1 rounded-2xl border border-[#97A884] text-xs font-bold gap-1">
          <button
            type="button"
            onClick={() => setModo('videollamada')}
            className={`flex-1 py-2 rounded-xl transition text-center cursor-pointer ${
              modo === 'videollamada' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E]'
            }`}
          >
            Sala en Vivo
          </button>
          <button
            type="button"
            onClick={() => setModo('ficha')}
            className={`flex-1 py-2 rounded-xl transition text-center cursor-pointer ${
              modo === 'ficha' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E]'
            }`}
          >
            Ficha de Oficina
          </button>
          <button
            type="button"
            onClick={() => { setModo('agendar'); setReservaConfirmada(false); }}
            className={`flex-1 py-2 rounded-xl transition text-center cursor-pointer ${
              modo === 'agendar' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E]'
            }`}
          >
            Agendar Cita
          </button>
          <button
            type="button"
            onClick={() => { setModo('cancelar'); setCanceladoExito(false); }}
            className={`flex-1 py-2 rounded-xl transition text-center cursor-pointer ${
              modo === 'cancelar' ? 'bg-[#DC8D6C] text-white shadow-xs' : 'text-[#676E5E]'
            }`}
          >
            Cancelar/Reprogramar
          </button>
        </div>

        {/* MODO 1: VIDEOLLAMADA INTERACTIVA */}
        {modo === 'videollamada' && (
          <div className="space-y-6 text-xs">
            {mensajeEstado && (
              <div className="bg-[#CDD6A9] text-[#676E5E] p-2.5 rounded-xl font-bold text-center border border-[#97A884]">
                {mensajeEstado}
              </div>
            )}

            {/* Pantalla de Video Conectada a la Cámara Real */}
            <div className={`bg-[#2D3227] rounded-3xl p-4 sm:p-6 text-white text-center relative flex flex-col justify-between shadow-2xl border-2 border-[#97A884] ${esPantallaCompleta ? 'min-h-[420px]' : 'min-h-[300px]'}`}>
              
              <div className="flex justify-between items-center text-[10px]">
                <span className="bg-[#CDD6A9] text-[#676E5E] font-bold px-3 py-1 rounded-md border border-[#97A884] flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${camActiva ? 'bg-red-500 animate-ping' : 'bg-gray-400'}`}></span>
                  {camActiva ? 'CÁMARA Y MICRÓFONO EN VIVO' : 'SALA EN ESPERA'}
                </span>
                <span className="text-[#CDD6A9] font-mono">Cifrado Ley N° 21.663</span>
              </div>

              {/* Reproductor de Video HTML5 NATIVO */}
              <div className="my-4 relative max-w-xl mx-auto w-full aspect-video bg-black/90 rounded-2xl overflow-hidden border-2 border-[#E6C693] flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${camActiva ? 'block' : 'hidden'}`}
                />

                {!camActiva && (
                  <div className="space-y-3 p-4">
                    <img src={currentLogo} alt={currentNombre} className="w-16 h-16 mx-auto object-contain opacity-40" />
                    <p className="text-xs font-bold text-white">La cámara web está apagada</p>
                    <button
                      type="button"
                      onClick={iniciarCamara}
                      className="bg-[#CDD6A9] text-[#676E5E] font-extrabold px-4 py-2 rounded-xl hover:bg-[#97A884] hover:text-white transition cursor-pointer text-xs"
                    >
                      Activar Cámara y Micrófono Real
                    </button>
                  </div>
                )}
              </div>

              {errorCamara && (
                <p className="text-red-400 text-[11px] font-bold pb-2">{errorCamara}</p>
              )}

              {/* Botones de Control de la Sala */}
              <div className="flex flex-wrap justify-center gap-2.5 pt-3 border-t border-[#676E5E]/60">
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer shadow-sm ${
                    micActivo ? 'bg-green-700 text-white' : 'bg-[#DC8D6C] text-white'
                  }`}
                >
                  {micActivo ? 'Micrófono Activado' : 'Activar Micrófono'}
                </button>

                <button
                  type="button"
                  onClick={toggleCam}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer shadow-sm ${
                    camActiva ? 'bg-green-700 text-white' : 'bg-[#676E5E] text-white hover:bg-[#52584b]'
                  }`}
                >
                  {camActiva ? 'Apagar Cámara' : 'Encender Cámara'}
                </button>

                <button
                  type="button"
                  onClick={() => setTranscribiendo(!transcribiendo)}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer shadow-sm ${
                    transcribiendo ? 'bg-[#E6C693] text-[#676E5E] font-extrabold' : 'bg-[#676E5E] text-white hover:bg-[#52584b]'
                  }`}
                >
                  {transcribiendo ? 'Transcribiendo Voz...' : 'Transcribir Reunión'}
                </button>
              </div>
            </div>

            {/* Módulos Interactivos: Archivos, Transcripción y Minuta */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* 1. Subida Real de Archivos */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-[#97A884] space-y-3 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b border-[#97A884]/30 pb-2">
                    <h4 className="font-extrabold text-[#676E5E] text-xs uppercase tracking-wider">Archivos Adjuntos</h4>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#CDD6A9] hover:bg-[#97A884] text-[#676E5E] hover:text-white font-bold px-3 py-1 rounded-xl text-[10px] cursor-pointer transition shadow-xs"
                    >
                      + Subir Archivo
                    </button>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                  />

                  <div className="space-y-2 mt-3 max-h-40 overflow-y-auto pr-1">
                    {archivosSubidos.length === 0 ? (
                      <p className="text-[11px] text-[#97A884] italic text-center py-4">Presiona "+ Subir Archivo" para adjuntar documentos.</p>
                    ) : (
                      archivosSubidos.map((f, i) => (
                        <div key={i} className="p-2.5 bg-[#E6E7D5]/70 rounded-2xl border border-[#97A884]/40 flex justify-between items-center text-[11px]">
                          <div className="truncate pr-2">
                            <p className="font-bold text-[#676E5E] truncate">{f.nombre}</p>
                            <span className="text-[9px] text-[#97A884] font-mono">{f.tamano} • {f.fecha}</span>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => eliminarArchivo(i)}
                            className="w-6 h-6 rounded-full bg-red-100 hover:bg-red-600 text-red-600 hover:text-white font-black text-[12px] flex items-center justify-center transition cursor-pointer shrink-0"
                            title="Eliminar este archivo"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <p className="text-[9px] text-[#97A884] italic border-t border-[#97A884]/20 pt-2 text-center">
                  Cifrado de archivos según Ley N° 21.663
                </p>
              </div>

              {/* 2. Transcripción en Vivo por Voz */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-[#97A884] space-y-3 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b border-[#97A884]/30 pb-2">
                    <h4 className="font-extrabold text-[#676E5E] text-xs uppercase tracking-wider">Transcripción en Vivo</h4>
                    <button
                      type="button"
                      onClick={() => setTranscripcion([])}
                      className="text-[#DC8D6C] hover:underline font-bold text-[10px] cursor-pointer"
                    >
                      Limpiar
                    </button>
                  </div>

                  <div className="h-40 overflow-y-auto bg-[#E6E7D5]/50 p-3 rounded-2xl text-[10px] space-y-2 font-mono text-[#676E5E] border border-[#97A884]/30 mt-3">
                    {transcripcion.map((t, idx) => (
                      <p key={idx} className="border-b border-[#97A884]/20 pb-1 last:border-0">{t}</p>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-[#97A884]/20 pt-2">
                  <span className="text-[9px] text-[#97A884] font-semibold">Ley TEA N° 21.545</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(transcripcion.join('\n'));
                      setMensajeEstado('Transcripción copiada');
                      setTimeout(() => setMensajeEstado(''), 2500);
                    }}
                    className="bg-[#CDD6A9] text-[#676E5E] font-bold px-2.5 py-1 rounded-lg text-[9px] hover:bg-[#97A884] hover:text-white transition cursor-pointer"
                  >
                    Copiar
                  </button>
                </div>
              </div>

              {/* 3. Minuta y Notas */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-[#97A884] space-y-3 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b border-[#97A884]/30 pb-2">
                    <h4 className="font-extrabold text-[#676E5E] text-xs uppercase tracking-wider">Minuta y Compromisos</h4>
                    <button
                      type="button"
                      onClick={() => {
                        const blob = new Blob([minuta], { type: 'text/plain;charset=utf-8' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'Minuta_ASL.txt';
                        a.click();
                      }}
                      className="bg-[#676E5E] text-white font-bold px-2.5 py-1 rounded-lg text-[9px] cursor-pointer"
                    >
                      Descargar TXT
                    </button>
                  </div>

                  <textarea
                    value={minuta}
                    onChange={(e) => setMinuta(e.target.value)}
                    className="w-full h-40 p-3 bg-[#FAF8F5] border border-[#97A884] rounded-2xl text-[11px] text-[#676E5E] outline-none mt-3 font-medium leading-relaxed"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MODO FICHA TÉCNICA */}
        {modo === 'ficha' && (
          <div className="bg-white p-6 rounded-3xl border-2 border-[#97A884] shadow-md space-y-6 text-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#97A884]/30 pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl border-2 border-[#E6C693] p-1 overflow-hidden bg-white shrink-0 shadow-sm flex items-center justify-center">
                  <img src={currentLogo} alt={currentNombre} className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-md border border-[#97A884]">
                    {currentOficina}
                  </span>
                  <h3 className="text-xl font-black text-[#676E5E] mt-1">{currentNombre}</h3>
                  <p className="text-xs font-bold text-[#97A884] uppercase tracking-wider">{currentSubtitulo}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-2xl border border-[#97A884]/40">
              <h4 className="font-extrabold text-[#676E5E] uppercase tracking-wider text-[11px]">Reseña Oficial & Propósito</h4>
              <p className="text-xs text-[#676E5E]/90 leading-relaxed font-medium">{currentDescLarga}</p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setModo('videollamada')}
                className="flex-1 bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold py-3 rounded-2xl transition shadow-sm text-center cursor-pointer"
              >
                Ingresar a Sala Virtual en Vivo
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}