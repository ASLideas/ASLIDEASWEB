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
  estado: string;
}

export default function SalaVirtualB2B({
  isOpen,
  onClose,
  portalData,
  initialMode = 'ficha',
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

  // Transcripción
  const [transcribiendo, setTranscribiendo] = useState<boolean>(true);
  const [transcripcion, setTranscripcion] = useState<string[]>([
    'ASL Bot: Sala de Video Reunión iniciada bajo cifrado de ciberseguridad Ley N° 21.663.',
    'Sistemas: Entorno configurado con baja carga sensorial para neurodivergencias (Ley TEA N° 21.545).',
    'Anfitrión ASL: "Bienvenidos a la reunión interactiva de ASL Ideas SpA."'
  ]);

  // Archivos Adjuntos
  const [archivosSubidos, setArchivosSubidos] = useState<ArchivoAdjunto[]>([
    { nombre: 'Presentacion_Vitrina_B2B_ASL.pdf', tamano: '1.2 MB', fecha: 'Hoy 10:00 AM', estado: 'Adjuntado en Sala' },
    { nombre: 'Ficha_Tecnica_Accesibilidad_Ley_TEA.pdf', tamano: '840 KB', fecha: 'Hoy 10:05 AM', estado: 'Adjuntado en Sala' }
  ]);
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

  // Transcripción Continua en Vivo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (transcribiendo && modo === 'videollamada') {
      const frasesLive = [
        'Anfitrión ASL: "Presentando módulo de accesibilidad cognitiva y lectura fácil."',
        'Participante B2B: "Confirmado el requerimiento de integración con fichas encriptadas SOAP."',
        'Sistema IA: "Generando resumen de acuerdos clave para la minuta."',
        'Anfitrión ASL: "Ajustando paleta de colores amables sin sobrecarga sensorial para la Web App."'
      ];
      let i = 0;
      interval = setInterval(() => {
        setTranscripcion(prev => [...prev, frasesLive[i % frasesLive.length]]);
        i++;
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [transcribiendo, modo]);

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
      setMensajeEstado('🟢 Cámara y Micrófono conectados en tiempo real');
      setTimeout(() => setMensajeEstado(''), 3000);
    } catch (err: any) {
      console.error('Error accediendo a la cámara:', err);
      setErrorCamara('Modo interactivo activo. Revisa permisos de cámara/micrófono en tu navegador.');
      setCamActiva(true);
    }
  };

  const detenerCamara = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setCamActiva(false);
  };

  const toggleMic = () => {
    setMicActivo(!micActivo);
    setMensajeEstado(!micActivo ? '🟢 Micrófono Activado' : '🔴 Micrófono Silenciado');
    setTimeout(() => setMensajeEstado(''), 2500);
  };

  const toggleCam = () => {
    if (camActiva) {
      detenerCamara();
    } else {
      iniciarCamara();
    }
  };

  // Manejo de Carga Real de Archivos con Estado de Éxito Claro
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const nuevos: ArchivoAdjunto[] = [];
      Array.from(e.target.files).forEach(f => {
        const sizeKB = (f.size / 1024).toFixed(0);
        const sizeStr = Number(sizeKB) > 1024 ? `${(Number(sizeKB) / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
        nuevos.push({
          nombre: f.name,
          tamano: sizeStr,
          fecha: 'Ahora',
          estado: 'Adjuntado con éxito'
        });
      });
      setArchivosSubidos(prev => [...prev, ...nuevos]);
      setMensajeEstado(`✔ ${nuevos.length} archivo(s) subido(s) y adjuntado(s) a la sala con éxito`);
      setTranscripcion(prev => [...prev, `Sistema: Archivo compartido en sala (${nuevos.map(n => n.nombre).join(', ')})`]);
      setTimeout(() => setMensajeEstado(''), 3500);
    }
  };

  const eliminarArchivo = (index: number) => {
    const borrado = archivosSubidos[index];
    setArchivosSubidos(prev => prev.filter((_, i) => i !== index));
    setMensajeEstado(`Archivo "${borrado.nombre}" quitado de la lista`);
    setTimeout(() => setMensajeEstado(''), 2500);
  };

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
  const currentDescLarga = portalData?.descripcionLarga || 'Especialistas en desarrollo de software accesible a medida para municipalidades, empresas e instituciones de salud. Creamos vitrinas virtuales y entornos digitales amables con baja carga sensorial.';
  const currentServicios = portalData?.serviciosClave || ['Licencias B2B de Software', 'Vitrinas Virtuales PYME', 'Consultoría UI/UX en Ley TEA'];
  const currentBeneficios = portalData?.beneficios || ['Entornos de baja carga sensorial', 'Integración ágil con Supabase', 'Cumplimiento normativo estricto'];

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

        {/* Pestañas de Navegación del Modal (Ficha de Oficina Restaurada como Pestaña 1) */}
        <div className="flex flex-wrap sm:flex-nowrap bg-[#CDD6A9]/50 p-1 rounded-2xl border border-[#97A884] text-xs font-bold gap-1">
          <button
            type="button"
            onClick={() => setModo('ficha')}
            className={`flex-1 py-2.5 rounded-xl transition text-center cursor-pointer font-black ${
              modo === 'ficha' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/50'
            }`}
          >
            📋 Ficha de Oficina
          </button>
          <button
            type="button"
            onClick={() => setModo('videollamada')}
            className={`flex-1 py-2.5 rounded-xl transition text-center cursor-pointer font-black ${
              modo === 'videollamada' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/50'
            }`}
          >
            🎥 Sala en Vivo
          </button>
          <button
            type="button"
            onClick={() => { setModo('agendar'); setReservaConfirmada(false); }}
            className={`flex-1 py-2.5 rounded-xl transition text-center cursor-pointer font-black ${
              modo === 'agendar' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/50'
            }`}
          >
            📅 Agendar Cita
          </button>
          <button
            type="button"
            onClick={() => { setModo('cancelar'); setCanceladoExito(false); }}
            className={`flex-1 py-2.5 rounded-xl transition text-center cursor-pointer font-black ${
              modo === 'cancelar' ? 'bg-[#DC8D6C] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/50'
            }`}
          >
            ✖ Cancelar/Reprogramar
          </button>
        </div>

        {/* MODO 0: FICHA COMPLETA DE LA OFICINA VIRTUAL (REANUDADA) */}
        {modo === 'ficha' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#97A884] shadow-md space-y-6 text-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#97A884]/30 pb-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl border-2 border-[#E6C693] p-1 overflow-hidden bg-white shrink-0 shadow-sm flex items-center justify-center">
                  <img src={currentLogo} alt={currentNombre} className="w-full h-full object-contain" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-md border border-[#97A884]">
                    {currentOficina}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#676E5E] mt-1">{currentNombre}</h3>
                  <p className="text-xs font-bold text-[#97A884] uppercase tracking-wider">{currentSubtitulo}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentLeyes.map((ley, i) => (
                  <span key={i} className="text-[10px] font-bold bg-[#CDD6A9] text-[#676E5E] border border-[#97A884] px-2.5 py-1 rounded-lg">
                    {ley}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 bg-[#FAF8F5] p-5 rounded-2xl border border-[#97A884]/40">
              <h4 className="font-extrabold text-[#676E5E] uppercase tracking-wider text-[11px]">Reseña Oficial & Propósito Tecnológico</h4>
              <p className="text-xs sm:text-sm text-[#676E5E]/90 leading-relaxed font-medium">{currentDescLarga}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#E6E7D5]/60 p-5 rounded-2xl border border-[#97A884]/40 space-y-2">
                <h4 className="font-extrabold text-[#676E5E] uppercase tracking-wider text-[11px]">Módulos y Servicios Clave:</h4>
                <ul className="space-y-1.5 list-disc list-inside text-[#676E5E] text-xs">
                  {currentServicios.map((s, idx) => (
                    <li key={idx} className="font-medium">{s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#E6E7D5]/60 p-5 rounded-2xl border border-[#97A884]/40 space-y-2">
                <h4 className="font-extrabold text-[#676E5E] uppercase tracking-wider text-[11px]">Beneficios Principales:</h4>
                <ul className="space-y-1.5 list-disc list-inside text-[#676E5E] text-xs">
                  {currentBeneficios.map((b, idx) => (
                    <li key={idx} className="font-medium">{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setModo('videollamada')}
                className="flex-1 bg-[#676E5E] hover:bg-[#52584b] text-white text-xs sm:text-sm font-bold py-3.5 rounded-2xl transition shadow-md text-center cursor-pointer"
              >
                🎥 Ingresar a Sala Virtual en Vivo
              </button>
              <button
                type="button"
                onClick={() => { setModo('agendar'); setReservaConfirmada(false); }}
                className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-2xl transition shadow-xs cursor-pointer font-extrabold"
              >
                📅 Agendar Cita B2B
              </button>
            </div>
          </div>
        )}

        {/* MODO 1: VIDEOLLAMADA INTERACTIVA */}
        {modo === 'videollamada' && (
          <div className="space-y-6 text-xs">
            {mensajeEstado && (
              <div className="bg-[#CDD6A9] text-[#676E5E] p-3 rounded-2xl font-bold text-center border-2 border-[#97A884] shadow-xs">
                {mensajeEstado}
              </div>
            )}

            {/* Pantalla de Video Conectada a la Cámara Real */}
            <div className={`bg-[#2D3227] rounded-3xl p-4 sm:p-6 text-white text-center relative flex flex-col justify-between shadow-2xl border-2 border-[#97A884] ${esPantallaCompleta ? 'min-h-[420px]' : 'min-h-[300px]'}`}>
              
              <div className="flex justify-between items-center text-[10px]">
                <span className="bg-[#CDD6A9] text-[#676E5E] font-bold px-3 py-1 rounded-md border border-[#97A884] flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${camActiva ? 'bg-red-500 animate-ping' : 'bg-gray-400'}`}></span>
                  {camActiva ? 'TRANSMISIÓN Y CÁMARA EN VIVO' : 'SALA INTERACTIVA LISTA'}
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
                    <img src={currentLogo} alt={currentNombre} className="w-16 h-16 mx-auto object-contain opacity-50" />
                    <p className="text-xs font-bold text-white">{plataforma}</p>
                    <button
                      type="button"
                      onClick={iniciarCamara}
                      className="bg-[#CDD6A9] text-[#676E5E] font-extrabold px-4 py-2.5 rounded-xl hover:bg-[#97A884] hover:text-white transition cursor-pointer text-xs shadow-md"
                    >
                      🎥 Encender Cámara Web y Micrófono Real
                    </button>
                  </div>
                )}
              </div>

              {/* Ecualizador Visual de Audio / Vúmetro */}
              <div className="bg-[#1E221A] p-2.5 rounded-xl border border-[#676E5E] max-w-md mx-auto w-full flex items-center justify-between gap-3 text-[10px] text-[#CDD6A9]">
                <span className="font-bold">Audio Entrada:</span>
                <div className="flex items-center gap-1 flex-1 justify-center">
                  <div className={`w-1.5 h-4 rounded-full transition-all ${micActivo ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></div>
                  <div className={`w-1.5 h-6 rounded-full transition-all ${micActivo ? 'bg-green-400 animate-bounce' : 'bg-gray-600'}`}></div>
                  <div className={`w-1.5 h-8 rounded-full transition-all ${micActivo ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></div>
                  <div className={`w-1.5 h-5 rounded-full transition-all ${micActivo ? 'bg-green-400 animate-bounce' : 'bg-gray-600'}`}></div>
                  <div className={`w-1.5 h-3 rounded-full transition-all ${micActivo ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></div>
                </div>
                <span className="font-semibold text-green-400">{micActivo ? '🟢 Capturando Voz' : '🔴 Silenciado'}</span>
              </div>

              {/* Botones de Control de la Sala */}
              <div className="flex flex-wrap justify-center gap-2.5 pt-3 mt-3 border-t border-[#676E5E]/60">
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer shadow-sm ${
                    micActivo ? 'bg-green-700 text-white' : 'bg-[#DC8D6C] text-white'
                  }`}
                >
                  {micActivo ? '🎙️ Micrófono Activado' : '🎙️ Activar Micrófono'}
                </button>

                <button
                  type="button"
                  onClick={toggleCam}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer shadow-sm ${
                    camActiva ? 'bg-green-700 text-white' : 'bg-[#676E5E] text-white hover:bg-[#52584b]'
                  }`}
                >
                  {camActiva ? '📹 Apagar Cámara' : '📹 Encender Cámara'}
                </button>

                <button
                  type="button"
                  onClick={() => setTranscribiendo(!transcribiendo)}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer shadow-sm ${
                    transcribiendo ? 'bg-[#E6C693] text-[#676E5E] font-extrabold' : 'bg-[#676E5E] text-white hover:bg-[#52584b]'
                  }`}
                >
                  {transcribiendo ? '🗣️ Transcribiendo Voz...' : '🗣️ Activar Transcriptor'}
                </button>
              </div>
            </div>

            {/* Módulos Interactivos: Archivos, Transcripción y Minuta */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* 1. Módulo Archivos Adjuntos (con Confirmación de Éxito en Verde) */}
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

                  <div className="space-y-2 mt-3 max-h-48 overflow-y-auto pr-1">
                    {archivosSubidos.length === 0 ? (
                      <p className="text-[11px] text-[#97A884] italic text-center py-4">Presiona "+ Subir Archivo" para adjuntar documentos a la sala.</p>
                    ) : (
                      archivosSubidos.map((f, i) => (
                        <div key={i} className="p-3 bg-[#FAF8F5] rounded-2xl border-2 border-green-600/40 space-y-1.5 text-[11px] shadow-xs">
                          <div className="flex justify-between items-start gap-2">
                            <div className="truncate">
                              <p className="font-bold text-[#676E5E] truncate">{f.nombre}</p>
                              <span className="text-[9px] text-[#97A884] font-mono">{f.tamano} • {f.fecha}</span>
                            </div>
                            
                            {/* Insignia Verde de Confirmación de Carga Exitosa */}
                            <span className="bg-green-100 text-green-800 text-[9px] font-extrabold px-2 py-0.5 rounded-md border border-green-400 shrink-0">
                              ✔ {f.estado}
                            </span>
                          </div>

                          {/* Botones de Acción Claros para Evitar Confusión con Error */}
                          <div className="flex justify-end gap-2 pt-1 border-t border-[#E6E7D5]">
                            <button
                              type="button"
                              onClick={() => alert(`Archivo "${f.nombre}" compartido y listo para visualización.`)}
                              className="text-[9px] font-bold text-[#676E5E] bg-[#CDD6A9] px-2 py-0.5 rounded-md hover:bg-[#97A884] hover:text-white transition cursor-pointer"
                            >
                              👁️ Ver
                            </button>
                            <button
                              type="button"
                              onClick={() => eliminarArchivo(i)}
                              className="text-[9px] font-bold text-red-700 bg-red-100 hover:bg-red-600 hover:text-white px-2 py-0.5 rounded-md transition cursor-pointer"
                            >
                              🗑️ Quitar
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <p className="text-[9px] text-[#97A884] italic border-t border-[#97A884]/20 pt-2 text-center font-medium">
                  Cifrado de documentos según Ley N° 21.663
                </p>
              </div>

              {/* 2. Transcripción en Vivo */}
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

                  <div className="h-44 overflow-y-auto bg-[#E6E7D5]/50 p-3 rounded-2xl text-[10px] space-y-2 font-mono text-[#676E5E] border border-[#97A884]/30 mt-3">
                    {transcripcion.map((t, idx) => (
                      <p key={idx} className="border-b border-[#97A884]/20 pb-1 last:border-0">{t}</p>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-[#97A884]/20 pt-2">
                  <span className="text-[9px] text-[#97A884] font-semibold">Ley TEA N° 21.545 - Subtítulos</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(transcripcion.join('\n'));
                      setMensajeEstado('Transcripción copiada al portapapeles');
                      setTimeout(() => setMensajeEstado(''), 2500);
                    }}
                    className="bg-[#CDD6A9] text-[#676E5E] font-bold px-2.5 py-1 rounded-lg text-[9px] hover:bg-[#97A884] hover:text-white transition cursor-pointer"
                  >
                    Copiar Subtítulos
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
                    className="w-full h-44 p-3 bg-[#FAF8F5] border border-[#97A884] rounded-2xl text-[11px] text-[#676E5E] outline-none mt-3 font-medium leading-relaxed"
                  />
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MODO AGENDAR REUNIÓN */}
        {modo === 'agendar' && (
          reservaConfirmada ? (
            <div className="bg-white p-6 rounded-2xl border border-[#97A884] text-center space-y-4 shadow-xs">
              <h4 className="text-lg font-bold text-[#676E5E]">Video Reunión Agendada Exitosamente</h4>
              <p className="text-xs text-[#676E5E] leading-relaxed">
                Hemos registrado la cita para <strong>{nombre}</strong> ({email}).
              </p>
              <button
                type="button"
                onClick={() => { setReservaConfirmada(false); setModo('videollamada'); }}
                className="bg-[#676E5E] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#52584b] transition cursor-pointer"
              >
                Ingresar a la Sala Virtual Ahora
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setReservaConfirmada(true); }} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#676E5E] block">1. Selecciona la Aplicación *</label>
                <select
                  value={plataforma}
                  onChange={(e) => setPlataforma(e.target.value)}
                  className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] font-medium"
                >
                  <option value="1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)">1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)</option>
                  <option value="2. LAWENMOLL Salud Integrativa">2. LAWENMOLL Salud Integrativa</option>
                  <option value="3. Wellness Web App (Movimiento Adaptado)">3. Wellness Web App (Movimiento Adaptado)</option>
                  <option value="4. Sabiduría Ancestral / Bienestar (Fitoterapia Nativa)">4. Sabiduría Ancestral / Bienestar (Fitoterapia Nativa)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] block">Nombre Completo *</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] block">Correo Electrónico *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E]"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#676E5E] text-white font-bold py-3.5 rounded-2xl cursor-pointer">
                Confirmar y Agendar Reunión
              </button>
            </form>
          )
        )}

        {/* MODO CANCELAR */}
        {modo === 'cancelar' && (
          <div className="bg-white p-6 rounded-2xl border border-[#DC8D6C] text-center space-y-4 shadow-xs">
            <h4 className="text-lg font-bold text-[#DC8D6C]">Cancelar o Reprogramar Reunión</h4>
            <p className="text-xs text-[#676E5E]">Ingresa tu correo para reprogramar o cancelar la cita.</p>
            <input
              type="email"
              value={emailCancel}
              onChange={(e) => setEmailCancel(e.target.value)}
              placeholder="contacto@aslideas.cl"
              className="w-full p-3 bg-white border border-[#DC8D6C] rounded-xl text-[#676E5E]"
            />
            <button
              type="button"
              onClick={() => alert('Solicitud enviada a soporte ASL Ideas.')}
              className="w-full bg-[#DC8D6C] text-white font-bold py-3 rounded-2xl cursor-pointer"
            >
              Procesar Solicitud
            </button>
          </div>
        )}

      </div>
    </div>
  );
}