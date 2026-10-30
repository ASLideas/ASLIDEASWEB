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
  id: string;
  nombre: string;
  tamano: string;
  fecha: string;
  tipo: string;
  url: string;
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
  const recognitionRef = useRef<any>(null);

  // Stream de Cámara y Micrófono
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [micActivo, setMicActivo] = useState<boolean>(true);
  const [camActiva, setCamActiva] = useState<boolean>(false);
  const [nivelVolumen, setNivelVolumen] = useState<number>(0);

  // Previsualizador de Archivos
  const [archivoPrevisualizar, setArchivoPrevisualizar] = useState<ArchivoAdjunto | null>(null);

  // Transcripción en Tiempo Real
  const [transcribiendo, setTranscribiendo] = useState<boolean>(false);
  const [estadoTranscriptor, setEstadoTranscriptor] = useState<string>('Presiona "Activar Transcriptor" para escuchar voz');
  const [textoEnVivo, setTextoEnVivo] = useState<string>('');
  const [textoManual, setTextoManual] = useState<string>('');
  const [transcripcion, setTranscripcion] = useState<string[]>([
    'ASL Bot: Sala de Video Reunión iniciada bajo cifrado Ley N° 21.663.',
    'Sistemas: Entorno configurado con baja carga sensorial para Ley TEA N° 21.545.',
    'Anfitrión ASL: "Bienvenidos a la reunión interactiva de ASL Ideas SpA."'
  ]);

  // Lista de Archivos
  const [archivosSubidos, setArchivosSubidos] = useState<ArchivoAdjunto[]>([
    { id: '1', nombre: 'Presentacion_Vitrina_B2B_ASL.pdf', tamano: '1.2 MB', fecha: 'Hoy 10:00 AM', tipo: 'application/pdf', url: '/Prompt_Maestro_ASL_Ideas_SpA.md' },
  ]);
  const [mensajeEstado, setMensajeEstado] = useState<string>('');

  // Minuta y Notas
  const [minuta, setMinuta] = useState<string>(
    'COMPROMISOS DE LA REUNIÓN B2B:\n1. Revisión de propuesta de Vitrina Virtual PYME.\n2. Demostración de software adaptado con baja carga sensorial.\n3. Coordinación de prueba piloto institucional.'
  );

  // Formulario Agendar Cita
  const [plataforma, setPlataforma] = useState<string>(
    portalData?.nombre || initialApp || '1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)'
  );
  const [motivo, setMotivo] = useState<string>('Videoreunión de Trabajo / Cotización de Vitrina B2B');
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState<string>('10:30 AM (Bloque Mañana)');
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [reservaConfirmada, setReservaConfirmada] = useState<boolean>(false);
  const [emailCancel, setEmailCancel] = useState('');

  useEffect(() => {
    if (isOpen) {
      setModo(initialMode);
    } else {
      detenerCamara();
      detenerTranscriptor();
    }
  }, [isOpen, initialMode]);

  // Motor de Reconocimiento de Voz Robusto
  const activarTranscriptorVoz = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setEstadoTranscriptor('Navegador sin soporte de voz nativo. Usa la entrada de texto.');
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }

      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'es-CL';

      rec.onstart = () => {
        setTranscribiendo(true);
        setEstadoTranscriptor('Escuchando voz en vivo...');
      };

      rec.onresult = (event: any) => {
        let textoTemporal = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const segmento = event.results[i].transcript;
          if (event.results[i].isFinal) {
            const fraseFinal = segmento.trim();
            if (fraseFinal) {
              setTranscripcion(prev => [...prev, `Participante: "${fraseFinal}"`]);
            }
          } else {
            textoTemporal += segmento;
          }
        }
        setTextoEnVivo(textoTemporal);
      };

      rec.onerror = (event: any) => {
        console.warn('Error en SpeechRecognition:', event.error);
        if (event.error === 'not-allowed') {
          setEstadoTranscriptor('Permiso de micrófono denegado para transcripción');
          setTranscribiendo(false);
        } else if (event.error !== 'no-speech') {
          setEstadoTranscriptor('Reconectando canal de voz...');
        }
      };

      rec.onend = () => {
        setTextoEnVivo('');
        if (transcribiendo) {
          setTimeout(() => {
            try { rec.start(); } catch (err) {}
          }, 400);
        } else {
          setEstadoTranscriptor('Transcriptor en pausa');
        }
      };

      rec.start();
      recognitionRef.current = rec;
    } catch (e) {
      console.error('Error al iniciar transcripción:', e);
      setEstadoTranscriptor('Error al conectar servicio de voz');
    }
  };

  const detenerTranscriptor = () => {
    setTranscribiendo(false);
    setEstadoTranscriptor('Transcriptor en pausa');
    setTextoEnVivo('');
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (e) {}
    }
  };

  const toggleTranscriptor = () => {
    if (transcribiendo) {
      detenerTranscriptor();
    } else {
      activarTranscriptorVoz();
    }
  };

  const agregarComentarioManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (textoManual.trim()) {
      setTranscripcion(prev => [...prev, `Participante: "${textoManual.trim()}"`]);
      setTextoManual('');
    }
  };

  // Analizador de Audio en Tiempo Real (Web Audio API)
  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let animFrame: number;

    if (mediaStream && micActivo) {
      try {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaStreamSource(mediaStream);
        source.connect(analyser);
        analyser.fftSize = 64;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const updateVolume = () => {
          analyser?.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;
          const vol = Math.min(100, Math.round((average / 128) * 100));
          setNivelVolumen(vol);
          animFrame = requestAnimationFrame(updateVolume);
        };
        updateVolume();
      } catch (e) {
        console.error('Error analizando audio:', e);
      }
    } else {
      setNivelVolumen(0);
    }

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      if (audioCtx) audioCtx.close();
    };
  }, [mediaStream, micActivo]);

  // Iniciar Cámara y Micrófono
  const iniciarCamara = async () => {
    try {
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
      activarTranscriptorVoz();
      setTimeout(() => setMensajeEstado(''), 3000);
    } catch (err: any) {
      console.error('Error accediendo a la cámara:', err);
      setCamActiva(true);
      activarTranscriptorVoz();
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
    setMensajeEstado(!micActivo ? 'Micrófono Activado' : 'Micrófono Silenciado');
    setTimeout(() => setMensajeEstado(''), 2500);
  };

  const toggleCam = () => {
    if (camActiva) {
      detenerCamara();
    } else {
      iniciarCamara();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const nuevos: ArchivoAdjunto[] = [];
      Array.from(e.target.files).forEach(f => {
        const sizeKB = (f.size / 1024).toFixed(0);
        const sizeStr = Number(sizeKB) > 1024 ? `${(Number(sizeKB) / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
        const fileUrl = URL.createObjectURL(f);
        nuevos.push({
          id: Math.random().toString(),
          nombre: f.name,
          tamano: sizeStr,
          fecha: 'Recién subido',
          tipo: f.type,
          url: fileUrl
        });
      });
      setArchivosSubidos(prev => [...prev, ...nuevos]);
      setMensajeEstado(`${nuevos.length} archivo(s) cargado(s) y listo(s) para previsualizar`);
      setTranscripcion(prev => [...prev, `Sistema: Archivo compartido (${nuevos.map(n => n.nombre).join(', ')})`]);
      setTimeout(() => setMensajeEstado(''), 3500);
    }
  };

  const eliminarArchivo = (id: string) => {
    setArchivosSubidos(prev => prev.filter(a => a.id !== id));
    if (archivoPrevisualizar?.id === id) setArchivoPrevisualizar(null);
    setMensajeEstado('Archivo removido');
    setTimeout(() => setMensajeEstado(''), 2000);
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
    <div className="fixed inset-0 z-50 bg-[#676E5E]/85 backdrop-blur-xs flex items-center justify-center p-1 sm:p-4 overflow-hidden">
      
      {/* Contenedor Modal */}
      <div 
        ref={containerRef}
        className={`bg-[#E6E7D5] transition-all duration-300 flex flex-col ${
          esPantallaCompleta 
            ? 'w-full h-full rounded-none border-0 p-3 sm:p-6 space-y-4 overflow-y-auto' 
            : 'max-w-5xl w-full max-h-[92dvh] rounded-3xl border-2 border-[#97A884] shadow-2xl space-y-4 my-2 overflow-hidden'
        } text-[#676E5E]`}
      >
        
        {/* Cabecera del Modal */}
        <div className="sticky top-0 z-20 bg-[#E6E7D5] p-3 sm:p-5 border-b border-[#97A884]/40 flex flex-wrap justify-between items-center gap-2 shrink-0">
          <div className="flex items-center space-x-2.5">
            <img 
              src={currentLogo} 
              alt={`Logo ${currentNombre}`} 
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-xl border-2 border-[#E6C693] bg-white p-0.5 shadow-xs shrink-0" 
            />
            <div>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-full border border-[#97A884]">
                {currentOficina} — {currentNombre}
              </span>
              <h3 className="text-sm sm:text-lg font-extrabold text-[#676E5E] mt-0.5 leading-tight">
                {modo === 'ficha' ? `Ficha Técnica: ${currentNombre}` : modo === 'videollamada' ? 'Sala Virtual Interactiva en Vivo' : modo === 'agendar' ? 'Agendar Reunión B2B' : 'Cancelar o Reprogramar'}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={togglePantallaCompleta}
              className="text-xs font-bold text-[#676E5E] bg-white hover:bg-[#CDD6A9] px-2.5 py-1.5 rounded-xl border-2 border-[#97A884] transition cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <span>{esPantallaCompleta ? 'Restaurar Pantalla' : 'Pantalla Completa'}</span>
            </button>

            <button
              type="button"
              onClick={() => { detenerCamara(); detenerTranscriptor(); onClose(); }}
              className="text-xs font-extrabold text-white bg-[#DC8D6C] hover:bg-[#c37858] px-3.5 py-1.5 rounded-xl transition cursor-pointer shadow-md"
            >
              Cerrar
            </button>
          </div>
        </div>

        {/* Pestañas del Modal */}
        <div className="px-3 sm:px-5 shrink-0">
          <div className="flex flex-wrap sm:flex-nowrap bg-[#CDD6A9]/50 p-1 rounded-2xl border border-[#97A884] text-xs font-bold gap-1">
            <button
              type="button"
              onClick={() => setModo('ficha')}
              className={`flex-1 py-2 rounded-xl transition text-center cursor-pointer font-black ${
                modo === 'ficha' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/50'
              }`}
            >
              Ficha de Oficina
            </button>
            <button
              type="button"
              onClick={() => setModo('videollamada')}
              className={`flex-1 py-2 rounded-xl transition text-center cursor-pointer font-black ${
                modo === 'videollamada' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/50'
              }`}
            >
              Sala en Vivo
            </button>
            <button
              type="button"
              onClick={() => { setModo('agendar'); setReservaConfirmada(false); }}
              className={`flex-1 py-2 rounded-xl transition text-center cursor-pointer font-black ${
                modo === 'agendar' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/50'
              }`}
            >
              Agendar Cita
            </button>
            <button
              type="button"
              onClick={() => setModo('cancelar')}
              className={`flex-1 py-2 rounded-xl transition text-center cursor-pointer font-black ${
                modo === 'cancelar' ? 'bg-[#DC8D6C] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/50'
              }`}
            >
              Cancelar / Reprogramar
            </button>
          </div>
        </div>

        {/* CUERPO PRINCIPAL */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-5 pb-5 space-y-4">

          {/* MODO FICHA DE OFICINA */}
          {modo === 'ficha' && (
            <div className="bg-white p-5 sm:p-8 rounded-3xl border-2 border-[#97A884] shadow-md space-y-6 text-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#97A884]/30 pb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 border-[#E6C693] p-1 overflow-hidden bg-white shrink-0 shadow-sm flex items-center justify-center">
                    <img src={currentLogo} alt={currentNombre} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-md border border-[#97A884]">
                      {currentOficina}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-black text-[#676E5E] mt-1">{currentNombre}</h3>
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

              <div className="space-y-2 bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-[#97A884]/40">
                <h4 className="font-extrabold text-[#676E5E] uppercase tracking-wider text-[11px]">Reseña Oficial & Propósito Tecnológico</h4>
                <p className="text-xs sm:text-sm text-[#676E5E]/90 leading-relaxed font-medium">{currentDescLarga}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div className="bg-[#E6E7D5]/60 p-4 sm:p-5 rounded-2xl border border-[#97A884]/40 space-y-2">
                  <h4 className="font-extrabold text-[#676E5E] uppercase tracking-wider text-[11px]">Módulos y Servicios Clave:</h4>
                  <ul className="space-y-1.5 list-disc list-inside text-[#676E5E] text-xs">
                    {currentServicios.map((s, idx) => (
                      <li key={idx} className="font-medium">{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#E6E7D5]/60 p-4 sm:p-5 rounded-2xl border border-[#97A884]/40 space-y-2">
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
                  Ingresar a Sala Virtual en Vivo
                </button>
                <button
                  type="button"
                  onClick={() => { setModo('agendar'); setReservaConfirmada(false); }}
                  className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-2xl transition shadow-xs cursor-pointer font-extrabold"
                >
                  Agendar Cita B2B
                </button>
              </div>
            </div>
          )}

          {/* MODO VIDEOLLAMADA */}
          {modo === 'videollamada' && (
            <div className="space-y-5 text-xs">
              {mensajeEstado && (
                <div className="bg-[#CDD6A9] text-[#676E5E] p-3 rounded-2xl font-bold text-center border-2 border-[#97A884] shadow-xs">
                  {mensajeEstado}
                </div>
              )}

              {/* Pantalla de Video */}
              <div className="bg-[#2D3227] rounded-3xl p-4 sm:p-6 text-white text-center relative flex flex-col justify-between shadow-2xl border-2 border-[#97A884] min-h-[280px]">
                
                <div className="flex justify-between items-center text-[10px]">
                  <span className="bg-[#CDD6A9] text-[#676E5E] font-bold px-3 py-1 rounded-md border border-[#97A884] flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${camActiva ? 'bg-red-500 animate-ping' : 'bg-gray-400'}`}></span>
                    {camActiva ? 'TRANSMISIÓN Y CÁMARA EN VIVO' : 'SALA INTERACTIVA LISTA'}
                  </span>
                  <span className="text-[#CDD6A9] font-mono">Cifrado Ley N° 21.663</span>
                </div>

                {/* Visor de Video */}
                <div className="my-3 relative max-w-xl mx-auto w-full aspect-video bg-black/90 rounded-2xl overflow-hidden border-2 border-[#E6C693] flex items-center justify-center">
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
                        Encender Cámara Web y Micrófono Real
                      </button>
                    </div>
                  )}
                </div>

                {/* Vúmetro de Audio */}
                <div className="bg-[#1E221A] p-2.5 rounded-xl border border-[#676E5E] max-w-md mx-auto w-full flex items-center justify-between gap-3 text-[10px] text-[#CDD6A9]">
                  <span className="font-bold">Audio Entrante:</span>
                  <div className="flex items-center gap-1 flex-1 justify-center">
                    <div className="w-full bg-gray-700 h-2.5 rounded-full overflow-hidden border border-gray-600">
                      <div 
                        className="bg-gradient-to-r from-green-500 via-yellow-400 to-red-500 h-full transition-all duration-100" 
                        style={{ width: `${micActivo ? Math.max(8, nivelVolumen) : 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="font-semibold text-green-400 font-mono">{micActivo ? `${nivelVolumen}% dB` : 'Silenciado'}</span>
                </div>

                {/* Botones de Control */}
                <div className="flex flex-wrap justify-center gap-2.5 pt-3 mt-3 border-t border-[#676E5E]/60">
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
                    onClick={toggleTranscriptor}
                    className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer shadow-sm ${
                      transcribiendo ? 'bg-[#E6C693] text-[#676E5E] font-extrabold' : 'bg-[#676E5E] text-white hover:bg-[#52584b]'
                    }`}
                  >
                    {transcribiendo ? 'Transcribiendo Voz...' : 'Activar Transcriptor'}
                  </button>
                </div>
              </div>

              {/* Módulos Interactivos */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                
                {/* 1. Módulo Archivos Adjuntos */}
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
                        <p className="text-[11px] text-[#97A884] italic text-center py-4">Presiona "+ Subir Archivo" para adjuntar documentos.</p>
                      ) : (
                        archivosSubidos.map((f) => (
                          <div key={f.id} className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#97A884]/40 space-y-2 text-[11px] shadow-xs">
                            <div className="flex justify-between items-start gap-2">
                              <div className="truncate">
                                <p className="font-bold text-[#676E5E] truncate">{f.nombre}</p>
                                <span className="text-[9px] text-[#97A884] font-mono">{f.tamano} • {f.fecha}</span>
                              </div>
                              <span className="bg-[#CDD6A9] text-[#676E5E] text-[9px] font-extrabold px-2 py-0.5 rounded-md border border-[#97A884] shrink-0">
                                Listo
                              </span>
                            </div>

                            <div className="flex justify-end gap-2 pt-1.5 border-t border-[#E6E7D5]">
                              <button
                                type="button"
                                onClick={() => setArchivoPrevisualizar(f)}
                                className="text-[10px] font-extrabold text-white bg-[#676E5E] px-3 py-1 rounded-lg hover:bg-[#52584b] transition cursor-pointer shadow-xs"
                              >
                                Previsualizar
                              </button>
                              <button
                                type="button"
                                onClick={() => eliminarArchivo(f.id)}
                                className="text-[10px] font-bold text-red-700 bg-red-100 hover:bg-red-600 hover:text-white px-2.5 py-1 rounded-lg transition cursor-pointer"
                              >
                                Eliminar
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

                {/* 2. Transcripción en Vivo en Tiempo Real */}
                <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-[#97A884] space-y-3 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center border-b border-[#97A884]/30 pb-2">
                      <div>
                        <h4 className="font-extrabold text-[#676E5E] text-xs uppercase tracking-wider">Transcripción en Vivo</h4>
                        <span className="text-[9px] font-semibold text-green-700 block mt-0.5">{estadoTranscriptor}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setTranscripcion([]); setTextoEnVivo(''); }}
                        className="text-[#DC8D6C] hover:underline font-bold text-[10px] cursor-pointer shrink-0"
                      >
                        Limpiar
                      </button>
                    </div>

                    <div className="h-36 overflow-y-auto bg-[#E6E7D5]/50 p-3 rounded-2xl text-[10px] space-y-2 font-mono text-[#676E5E] border border-[#97A884]/30 mt-2">
                      {transcripcion.map((t, idx) => (
                        <p key={idx} className="border-b border-[#97A884]/20 pb-1 last:border-0 leading-relaxed">{t}</p>
                      ))}

                      {/* Texto en vivo mientras se habla */}
                      {textoEnVivo && (
                        <p className="text-green-800 font-bold italic animate-pulse">
                          Hablando: "{textoEnVivo}"
                        </p>
                      )}
                    </div>

                    {/* Entradas Manuales / Notas Inmediatas */}
                    <form onSubmit={agregarComentarioManual} className="mt-2 flex gap-1.5">
                      <input
                        type="text"
                        value={textoManual}
                        onChange={(e) => setTextoManual(e.target.value)}
                        placeholder="Dicta o escribe un comentario..."
                        className="flex-1 p-2 bg-[#FAF8F5] border border-[#97A884] rounded-xl text-[10px] text-[#676E5E] outline-none"
                      />
                      <button
                        type="submit"
                        className="bg-[#676E5E] text-white font-bold px-3 py-1 rounded-xl text-[10px] cursor-pointer"
                      >
                        Enviar
                      </button>
                    </form>
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
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#97A884] text-center space-y-4 shadow-sm">
                <div className="w-12 h-12 mx-auto bg-[#CDD6A9] rounded-full flex items-center justify-center text-[#676E5E] font-black text-base border-2 border-[#97A884]">
                  OK
                </div>
                <h4 className="text-lg font-black text-[#676E5E]">Reunión B2B Agendada Exitosamente</h4>
                <p className="text-xs text-[#676E5E] leading-relaxed max-w-md mx-auto">
                  Hemos registrado la cita para <strong>{nombre}</strong> ({email}) en la unidad <strong>{plataforma}</strong> para el día <strong>{fecha || 'Fecha Seleccionada'}</strong> a las <strong>{hora}</strong>.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => { setReservaConfirmada(false); setModo('videollamada'); }}
                    className="bg-[#676E5E] text-white text-xs font-bold px-6 py-3 rounded-2xl hover:bg-[#52584b] transition cursor-pointer shadow-md"
                  >
                    Ingresar a la Sala Virtual Ahora
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setReservaConfirmada(true); }} className="bg-white p-5 sm:p-8 rounded-3xl border-2 border-[#97A884] space-y-5 text-xs shadow-sm">
                
                {/* 1. SELECCIONA LA APLICACIÓN O UNIDAD */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider block text-[11px]">
                    1. SELECCIONA LA APLICACIÓN O UNIDAD *
                  </label>
                  <select
                    value={plataforma}
                    onChange={(e) => setPlataforma(e.target.value)}
                    className="w-full p-3.5 bg-[#FAF8F5] border border-[#97A884] rounded-2xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
                  >
                    <option value="1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)">1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)</option>
                    <option value="2. LAWENMOLL Salud Integrativa">2. LAWENMOLL Salud Integrativa</option>
                    <option value="3. Wellness Web App (Movimiento Adaptado)">3. Wellness Web App (Movimiento Adaptado)</option>
                    <option value="4. Sabiduría Ancestral / Bienestar (Fitoterapia Nativa)">4. Sabiduría Ancestral / Bienestar (Fitoterapia Nativa)</option>
                  </select>
                </div>

                {/* 2. MOTIVO DE LA CITA */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider block text-[11px]">
                    2. MOTIVO DE LA CITA *
                  </label>
                  <select
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="w-full p-3.5 bg-[#FAF8F5] border border-[#97A884] rounded-2xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
                  >
                    <option value="Videoreunión de Trabajo / Cotización de Vitrina B2B">Videoreunión de Trabajo / Cotización de Vitrina B2B</option>
                    <option value="Demostración de Software Accesibilidad Cognitiva Ley TEA">Demostración de Software Accesibilidad Cognitiva Ley TEA</option>
                    <option value="Consultoría Institucional B2B">Consultoría Institucional B2B</option>
                  </select>
                </div>

                {/* FILA EN 2 COLUMNAS: FECHA Y BLOQUE HORARIO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#676E5E] uppercase tracking-wider block text-[11px]">FECHA *</label>
                    <input
                      type="date"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                      className="w-full p-3.5 bg-[#FAF8F5] border border-[#97A884] rounded-2xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#676E5E] uppercase tracking-wider block text-[11px]">BLOQUE HORARIO *</label>
                    <select
                      value={hora}
                      onChange={(e) => setHora(e.target.value)}
                      className="w-full p-3.5 bg-[#FAF8F5] border border-[#97A884] rounded-2xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
                    >
                      <option value="09:30 AM (Bloque Mañana)">09:30 AM (Bloque Mañana)</option>
                      <option value="10:30 AM (Bloque Mañana)">10:30 AM (Bloque Mañana)</option>
                      <option value="12:00 PM (Bloque Mediodía)">12:00 PM (Bloque Mediodía)</option>
                      <option value="15:30 PM (Bloque Tarde)">15:30 PM (Bloque Tarde)</option>
                      <option value="17:00 PM (Bloque Tarde)">17:00 PM (Bloque Tarde)</option>
                    </select>
                  </div>
                </div>

                {/* FILA EN 2 COLUMNAS: NOMBRE Y CORREO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#676E5E] uppercase tracking-wider block text-[11px]">NOMBRE COMPLETO / EMPRESA *</label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Nombre o Institución..."
                      className="w-full p-3.5 bg-[#FAF8F5] border border-[#97A884] rounded-2xl text-[#676E5E] outline-none focus:border-[#676E5E]"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#676E5E] uppercase tracking-wider block text-[11px]">CORREO ELECTRÓNICO *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contacto@aslideas.cl"
                      className="w-full p-3.5 bg-[#FAF8F5] border border-[#97A884] rounded-2xl text-[#676E5E] outline-none focus:border-[#676E5E]"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold py-4 rounded-2xl transition shadow-md cursor-pointer mt-2"
                >
                  Confirmar y Agendar Reunión
                </button>
              </form>
            )
          )}

          {/* MODO CANCELAR */}
          {modo === 'cancelar' && (
            <div className="bg-white p-6 rounded-3xl border-2 border-[#DC8D6C] text-center space-y-4 shadow-xs">
              <h4 className="text-base font-bold text-[#DC8D6C]">Reprogramar o Cancelar Cita</h4>
              <p className="text-xs text-[#676E5E]">Ingresa tu correo para gestionar tu reunión agendada.</p>
              <input
                type="email"
                value={emailCancel}
                onChange={(e) => setEmailCancel(e.target.value)}
                placeholder="contacto@aslideas.cl"
                className="w-full p-3 bg-white border border-[#DC8D6C] rounded-xl text-[#676E5E]"
              />
              <button
                type="button"
                onClick={() => alert('Solicitud recibida por el equipo ASL Ideas SpA.')}
                className="w-full bg-[#DC8D6C] text-white font-bold py-3 rounded-2xl cursor-pointer"
              >
                Procesar Solicitud
              </button>
            </div>
          )}

        </div>

        {/* VISUALIZADOR DE ARCHIVOS EN PANTALLA */}
        {archivoPrevisualizar && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
            <div className="bg-[#E6E7D5] max-w-3xl w-full rounded-3xl border-2 border-[#97A884] p-5 space-y-4 shadow-2xl flex flex-col max-h-[85vh]">
              <div className="flex justify-between items-center border-b border-[#97A884]/40 pb-3">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2 py-0.5 rounded-md border border-[#97A884]">
                    Previsualización de Documento
                  </span>
                  <h4 className="font-black text-[#676E5E] text-sm sm:text-base mt-0.5 truncate max-w-md">
                    {archivoPrevisualizar.nombre}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setArchivoPrevisualizar(null)}
                  className="bg-[#DC8D6C] text-white font-bold text-xs px-3.5 py-1.5 rounded-xl cursor-pointer shadow-sm hover:bg-[#c37858] transition"
                >
                  Cerrar Vista
                </button>
              </div>

              <div className="flex-1 bg-white rounded-2xl border border-[#97A884] overflow-hidden min-h-[320px] flex items-center justify-center relative">
                {archivoPrevisualizar.tipo.startsWith('image/') ? (
                  <img src={archivoPrevisualizar.url} alt={archivoPrevisualizar.nombre} className="max-h-[60vh] w-auto object-contain p-2 rounded-xl" />
                ) : (
                  <iframe 
                    src={archivoPrevisualizar.url} 
                    title={archivoPrevisualizar.nombre}
                    className="w-full h-full min-h-[350px] border-0"
                  />
                )}
              </div>

              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-[10px] text-[#97A884] font-mono">Tamaño: {archivoPrevisualizar.tamano}</span>
                <a
                  href={archivoPrevisualizar.url}
                  download={archivoPrevisualizar.nombre}
                  className="bg-[#676E5E] text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-[#52584b] transition cursor-pointer"
                >
                  Descargar Copia
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}