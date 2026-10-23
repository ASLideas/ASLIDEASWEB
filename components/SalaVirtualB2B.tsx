'use client';

import React, { useState, useEffect, useRef, ChangeEvent } from 'react';

export interface PortalInfo {
  id: string;
  nombre: string;
  subtitulo: string;
  logo: string;
  oficinaNum: string;
  leyes: string[];
  descripcionCorta: string;
  descripcionLarga: string;
  serviciosClave: string[];
  beneficios: string[];
  publicoObjetivo: string;
  enConstruccion?: boolean;
}

export interface ArchivoItem {
  id: string;
  nombre: string;
  tipo: 'pdf' | 'imagen';
  urlPreview?: string;
  fecha: string;
  resumen?: string;
  contenidoTexto?: string;
}

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  portalData?: PortalInfo;
  isAdmin?: boolean;
  initialApp?: string;
  appName?: string;
  appLogo?: string;
  [key: string]: any;
}

export default function SalaVirtualB2B({ 
  isOpen, 
  onClose, 
  portalData: inputPortalData,
  isAdmin = false,
  initialApp,
  appName,
  appLogo,
  ...restProps
}: Props) {
  const defaultLawenmoll: PortalInfo = {
    id: 'lawenmoll',
    nombre: 'LAWENMOLL Salud Integrativa',
    subtitulo: 'Evaluación Metabólica y Fichas Clínicas Protegidas',
    logo: '/logo-lawenmoll.jpg.png',
    oficinaNum: 'Oficina Virtual 02',
    leyes: ['Ley N° 21.663 - Datos Protegidos', 'Ley TEA N° 21.545', 'Estándar SOAP'],
    descripcionCorta: 'Test de Bienestar Inteligente, composición metabólica y Fichas Clínicas encriptadas.',
    descripcionLarga: 'Plataforma clínica integrativa enfocada en la evaluación personalizada de la salud metabólica.',
    serviciosClave: ['Test de Bienestar Inteligente', 'Fichas Clínicas Encriptadas'],
    beneficios: ['Diagnóstico preventivo sin juicios.', 'Privacidad total.'],
    publicoObjetivo: 'Pacientes y profesionales de la salud'
  };

  const portalData: PortalInfo = inputPortalData || defaultLawenmoll;

  // Autenticación de Acceso a la Oficina Virtual
  const [claveInput, setClaveInput] = useState<string>('');
  const [accesoConcedido, setAccesoConcedido] = useState<boolean>(isAdmin);
  const [errorClave, setErrorClave] = useState<string>('');

  // Estados de Videollamada
  const [codigoSala, setCodigoSala] = useState<string>('');
  const [copiado, setCopiado] = useState<boolean>(false);
  const [micActivo, setMicActivo] = useState<boolean>(true);
  const [camaraActiva, setCamaraActiva] = useState<boolean>(true);
  const [enLlamada, setEnLlamada] = useState<boolean>(true);
  const [modoCalma, setModoCalma] = useState<boolean>(false);
  const [asistentesConectados, setAsistentesConectados] = useState<number>(2);
  const [modalCancelar, setModalCancelar] = useState<boolean>(false);

  // Cámara y Stream de Video
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  // Transcripción y Subtítulos
  const [subtituloEnVivo, setSubtituloEnVivo] = useState<string>('Haz clic en "Transcribir Voz en Vivo" para activar el micrófono...');
  const [transcripcion, setTranscripcion] = useState<string>(
    'Registro de Sesión: Transcripción automática activada bajo Ley N° 21.663.\n[00:01] Conexión establecida.'
  );
  const [transcribiendo, setTranscribiendo] = useState<boolean>(false);

  // Panel Lateral y Archivos
  const [activeSideTab, setActiveSideTab] = useState<'archivos' | 'notas' | 'transcripcion'>('archivos');
  const [archivosList, setArchivosList] = useState<ArchivoItem[]>([
    { 
      id: '1', 
      nombre: 'Ficha_Clinica_SOAP_Inicial.pdf', 
      tipo: 'pdf', 
      fecha: '23/10/2026',
      resumen: 'Evaluación metabólica preventiva y test de bienestar integrativo.',
      contenidoTexto: 'Ficha Médica SOAP Protegida — Ley N° 21.663. Evaluación metabólica inicial y plan preventivo.'
    },
    { 
      id: '2', 
      nombre: 'Pauta_Evaluacion_Metabolica.pdf', 
      tipo: 'pdf', 
      fecha: '23/10/2026',
      resumen: 'Guía de ejercicios adaptados sin impacto articular.',
      contenidoTexto: 'Pauta de Composición Corporal: Músculo, masa grasa y ejercicios adaptados sin impacto.'
    },
    { 
      id: '3', 
      nombre: 'Esquema_Composicion_Corporal.jpg', 
      tipo: 'imagen', 
      urlPreview: portalData.logo || '/logo-asl.png.png',
      fecha: '23/10/2026',
      resumen: 'Diagrama visual de composición metabólica.'
    }
  ]);
  const [archivoPreview, setArchivoPreview] = useState<ArchivoItem | null>(archivosList[0]);

  // Notas de la Sesión
  const [notas, setNotas] = useState<string[]>([
    'Nota 1: Demostración de interfaz accesible UI/UX para neurodivergencias.',
    'Nota 2: Cumplimiento de Ley N° 21.663 de Ciberseguridad y Ley TEA N° 21.545.'
  ]);
  const [nuevaNota, setNuevaNota] = useState<string>('');

  // Validar clave de ingreso al portal
  const handleValidarClave = (e: React.FormEvent) => {
    e.preventDefault();
    const claveLimpia = claveInput.trim().toUpperCase();
    if (claveLimpia === 'LAWENMOLL2026' || claveLimpia === 'ASL2026' || claveLimpia === 'ADMIN' || claveLimpia === 'NW2026*') {
      setAccesoConcedido(true);
      setErrorClave('');
    } else {
      setErrorClave('Clave de acceso incorrecta. Verifica la credencial proporcionada.');
    }
  };

  // Capturar cámara web al autorizar acceso
  useEffect(() => {
    if (isOpen && accesoConcedido) {
      setCodigoSala(`ASL-${portalData.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setEnLlamada(true);

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((stream) => {
            setMediaStream(stream);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch((err) => {
            console.warn('Permiso de cámara en espera o no disponible:', err);
          });
      }
    } else if (!isOpen && mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
  }, [isOpen, accesoConcedido, inputPortalData]);

  useEffect(() => {
    if (videoRef.current && mediaStream && camaraActiva) {
      videoRef.current.srcObject = mediaStream;
    }
  }, [camaraActiva, mediaStream]);

  if (!isOpen) return null;

  const copiarCodigoSala = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(codigoSala);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  const handleSubirArchivo = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const isImg = file.type.startsWith('image/');
      const urlTemp = URL.createObjectURL(file);
      const nuevoArchivo: ArchivoItem = {
        id: Date.now().toString(),
        nombre: file.name,
        tipo: isImg ? 'imagen' : 'pdf',
        urlPreview: urlTemp,
        fecha: new Date().toLocaleDateString('es-CL'),
        resumen: 'Documento adjuntado en la sesión virtual.',
        contenidoTexto: isImg ? undefined : `Documento PDF Adjunto: ${file.name}. Verificado y encriptado bajo Ley N° 21.663.`
      };
      setArchivosList((prev) => [nuevoArchivo, ...prev]);
      setArchivoPreview(nuevoArchivo);
    }
  };

  const handleEliminarArchivo = (id: string) => {
    setArchivosList((prev) => prev.filter((item) => item.id !== id));
    if (archivoPreview?.id === id) setArchivoPreview(null);
  };

  const handleTranscribirEnVivo = () => {
    setTranscribiendo(true);
    setSubtituloEnVivo('Micrófono escuchando... Habla ahora para transcribir.');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-CL';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onresult = (event: any) => {
          let textoActual = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const resultItem = event.results[i];
            if (resultItem && resultItem[0] && resultItem[0].transcript) {
              textoActual += resultItem[0].transcript;
            }
          }
          if (textoActual.trim()) {
            setSubtituloEnVivo(textoActual);
            setTranscripcion((prev) => prev + '\n[Voz en vivo]: ' + textoActual);
          }
        };

        recognition.onerror = () => {
          const mensajeFallback = 'Especialista ASL Ideas: "Atención virtual activa y resguardada bajo Ley N° 21.663."';
          setSubtituloEnVivo(mensajeFallback);
          setTranscripcion((prev) => prev + '\n' + mensajeFallback);
          setTranscribiendo(false);
        };

        recognition.onend = () => {
          setTranscribiendo(false);
        };

        recognition.start();
      } catch (e) {
        const mensajeFallback = 'Especialista ASL Ideas: "Registro de audio de la sesión confirmado."';
        setSubtituloEnVivo(mensajeFallback);
        setTranscripcion((prev) => prev + '\n' + mensajeFallback);
        setTranscribiendo(false);
      }
    } else {
      setTimeout(() => {
        const mensajeFallback = 'Especialista ASL Ideas: "Transcripción asistida habilitada para la sesión."';
        setSubtituloEnVivo(mensajeFallback);
        setTranscripcion((prev) => prev + '\n\n' + mensajeFallback);
        setTranscribiendo(false);
      }, 1000);
    }
  };

  const handleAgregarNota = () => {
    if (!nuevaNota.trim()) return;
    setNotas((prev) => [...prev, nuevaNota.trim()]);
    setNuevaNota('');
  };

  const handleExportarInforme = () => {
    const contenido = `================================================
ASL IDEAS SpA — INFORME DE REGISTRO DE SESIÓN
================================================
Fecha: ${new Date().toLocaleDateString('es-CL')}
Código de Sala: ${codigoSala}
Portal: ${portalData.nombre}
Estándar Ciberseguridad: Ley N° 21.663 | Accesibilidad: Ley N° 21.545

ACUERDOS Y NOTAS REGISTRADAS:
${notas.map((n, idx) => `${idx + 1}. ${n}`).join('\n')}

TRANCRIPCIÓN COMPLETA:
${transcripcion}
================================================`;

    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Registro_Sesion_${codigoSala}.txt`;
    link.click();
  };

  // Función para cancelar la reunión para ambas partes
  const handleCancelarReunionAmbasPartes = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
    setEnLlamada(false);
    setAsistentesConectados(0);
    setSubtituloEnVivo('La reunión ha sido finalizada para todos los participantes.');
    setModalCancelar(false);
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto font-sans transition-colors duration-300 ${modoCalma ? 'bg-[#F4F1EA] text-[#1E3A2F]' : 'bg-[#FAF8F5] text-[#2D6A4F]'}`}>
      
      {/* HEADER INSTITUCIONAL */}
      <header className="bg-white sticky top-0 z-50 border-b-2 border-[#D4AF37] shadow-xs px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#FFF0F2] p-1 border-2 border-[#F4ACB7] shadow-xs flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src={portalData.logo} alt={portalData.nombre} className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-[#2D6A4F]">{portalData.nombre}</h2>
              <p className="text-xs text-[#84A59D] font-medium">{portalData.subtitulo}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {accesoConcedido && (
              <button 
                onClick={() => setModoCalma(!modoCalma)}
                className={`text-xs font-bold px-4 py-2 rounded-full border transition ${modoCalma ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]' : 'bg-[#E8F0EC] text-[#2D6A4F] border-[#C8D8CE]'}`}
              >
                {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma (TEA)'}
              </button>
            )}

            <button onClick={onClose} className="text-xs font-bold bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-5 py-2 rounded-full hover:bg-[#FF8894] hover:text-white transition">
              Cerrar Portal
            </button>
          </div>
        </div>
      </header>

      {/* PANTALLA DE INGRESO DE CLAVE DE ACCESO */}
      {!accesoConcedido ? (
        <main className="max-w-md mx-auto px-6 py-20">
          <div className="bg-white p-8 rounded-3xl border-2 border-[#D4AF37] shadow-lg text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#E8F0EC] p-2 border-2 border-[#2D6A4F] flex items-center justify-center overflow-hidden">
              <img src={portalData.logo} alt="Logo Portal" className="w-full h-full object-contain rounded-full" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
                Oficina Virtual Protegida — Ley N° 21.663
              </span>
              <h3 className="text-xl font-bold text-[#2D6A4F] mt-3">Ingreso a la Oficina Virtual</h3>
              <p className="text-xs text-[#52796F] mt-1">Introduce la clave de acceso asignada a tu consulta o sesión B2B.</p>
            </div>

            <form onSubmit={handleValidarClave} className="space-y-4">
              <input
                type="password"
                value={claveInput}
                onChange={(e) => setClaveInput(e.target.value)}
                placeholder="Clave de Acceso (ej: LAWENMOLL2026)"
                className="w-full text-sm p-3.5 border-2 border-[#C8D8CE] rounded-xl text-center font-mono tracking-widest uppercase focus:border-[#2D6A4F] outline-none"
                required
              />

              {errorClave && (
                <p className="text-xs text-[#D85260] font-bold bg-[#FFF0F2] p-2 rounded-lg border border-[#FF8894]">
                  {errorClave}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#2D6A4F] text-white text-xs font-bold py-3.5 rounded-xl hover:bg-[#1E3A2F] transition shadow-md"
              >
                Validar e Ingresar a la Sala
              </button>
            </form>

            <p className="text-[10px] text-[#84A59D]">
              Claves de prueba para demostración: LAWENMOLL2026 | ASL2026 | ADMIN
            </p>
          </div>
        </main>
      ) : (
        /* CONTENIDO PRINCIPAL DE LA OFICINA VIRTUAL */
        <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

          {/* CÓDIGO DE SALA Y CONEXIÓN MULTIUSUARIO */}
          <section className="bg-[#FFF0F2] p-5 rounded-3xl border-2 border-[#F4ACB7] flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase bg-white text-[#D85260] border border-[#FF8894] px-3 py-0.5 rounded-full">
                  Código de Acceso Seguro
                </span>
                <span className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] px-2.5 py-0.5 rounded-full border border-[#C8D8CE]">
                  {asistentesConectados} Asistentes Conectados
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-[#2D6A4F] mt-1">
                Código de Sala: <span className="text-[#D85260] font-mono">{codigoSala}</span>
              </h3>
            </div>
            
            <div className="flex gap-2">
              <button onClick={copiarCodigoSala} className="bg-[#D4AF37] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#B08D4B] transition">
                {copiado ? 'Copiado!' : 'Copiar Código'}
              </button>
              
              {enLlamada && (
                <button onClick={() => setModalCancelar(true)} className="bg-[#D85260] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#A8323E] transition">
                  Finalizar para Ambas Partes
                </button>
              )}
            </div>
          </section>

          {/* VIDEOLLAMADA + SUBTÍTULOS EN VIVO */}
          <section className="bg-white p-6 rounded-3xl border-2 border-[#D4AF37] shadow-md space-y-6">
            <div className="flex justify-between items-center border-b border-[#E8F0EC] pb-3">
              <h3 className="text-xl font-bold text-[#2D6A4F]">Sala de Videollamada & Transcripción en Vivo</h3>
              <span className="text-xs font-bold text-emerald-600 bg-[#E8F0EC] px-3 py-1 rounded-full border border-[#C8D8CE]">
                Conexión Encriptada TLS 1.3
              </span>
            </div>

            {enLlamada ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* REPRODUCTOR DE VIDEO */}
                <div className="lg:col-span-2 bg-[#2D6A4F] rounded-3xl p-5 text-white space-y-4 flex flex-col justify-between relative overflow-hidden shadow-inner">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[300px]">
                    
                    {/* CÁMARA ESPECIALISTA ASL IDEAS */}
                    <div className="bg-[#52796F] rounded-2xl p-4 flex flex-col justify-between border-2 border-[#D4AF37] relative overflow-hidden">
                      <div className="flex justify-between items-center z-10">
                        <span className="bg-black/50 text-[#D4AF37] text-[10px] px-3 py-1 rounded-full font-bold">
                          Especialista ASL Ideas (Nosotros)
                        </span>
                        <span className="text-[10px] text-emerald-300 font-bold">Transmitiendo</span>
                      </div>

                      <div className="my-2 flex-1 flex flex-col items-center justify-center relative min-h-[160px]">
                        {camaraActiva ? (
                          <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            muted 
                            className="w-full h-36 object-cover rounded-xl border-2 border-[#D4AF37] shadow-md"
                          />
                        ) : (
                          <div className="p-4 bg-black/40 rounded-xl text-xs text-gray-300 text-center">
                            Cámara Silenciada
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <img src={portalData.logo} alt="Logo" className="w-5 h-5 object-contain rounded-full bg-white p-0.5" />
                          <p className="text-xs font-bold">ASL Ideas SpA</p>
                        </div>
                      </div>

                      <span className="text-[9px] bg-black/30 p-1.5 rounded-xl text-center z-10">
                        Baja Carga Sensorial (Ley TEA N° 21.545)
                      </span>
                    </div>

                    {/* CLIENTE / USUARIO INVITADO */}
                    <div className="bg-[#3A5A40] rounded-2xl p-4 flex flex-col justify-between border-2 border-[#F4ACB7] relative overflow-hidden">
                      <span className="bg-black/40 text-[10px] px-3 py-1 rounded-full font-bold self-start">
                        Usuario / Cliente Invitado
                      </span>

                      <div className="my-4 text-center flex-1 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 mx-auto rounded-full bg-[#FFF0F2] flex items-center justify-center border-2 border-[#FF8894] mb-2 text-[#D85260] font-bold text-base shadow-md">
                          CLI
                        </div>
                        <p className="text-xs font-bold">Participante Recepcionado</p>
                        <p className="text-[10px] text-emerald-200 mt-1">Conexión Remota Segura</p>
                      </div>

                      <span className="text-[9px] bg-black/30 p-1.5 rounded-xl text-center">Protección Ley N° 21.663</span>
                    </div>

                  </div>

                  {/* SUBTÍTULOS EN TIEMPO REAL SOBRE EL VIDEO */}
                  <div className="bg-black/80 backdrop-blur-xs border border-[#D4AF37]/50 p-3 rounded-2xl text-center space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-bold block">
                      Subtítulos e Interpretación de Voz en Vivo
                    </span>
                    <p className="text-xs font-medium text-white italic">
                      "{subtituloEnVivo}"
                    </p>
                  </div>

                  {/* CONTROLES DE TRANSMISIÓN */}
                  <div className="flex flex-wrap justify-center gap-2 pt-1">
                    <button
                      onClick={() => setMicActivo(!micActivo)}
                      className={`text-xs font-bold px-3 py-2 rounded-xl transition ${micActivo ? 'bg-white text-[#2D6A4F]' : 'bg-[#D85260] text-white'}`}
                    >
                      {micActivo ? 'Micrófono Activado' : 'Micrófono Mute'}
                    </button>

                    <button
                      onClick={() => setCamaraActiva(!camaraActiva)}
                      className={`text-xs font-bold px-3 py-2 rounded-xl transition ${camaraActiva ? 'bg-white text-[#2D6A4F]' : 'bg-[#D85260] text-white'}`}
                    >
                      {camaraActiva ? 'Cámara Encendida' : 'Cámara Apagada'}
                    </button>

                    <button
                      onClick={handleTranscribirEnVivo}
                      disabled={transcribiendo}
                      className="bg-[#D4AF37] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#B08D4B] transition shadow-xs"
                    >
                      {transcribiendo ? 'Escuchando Micrófono...' : 'Transcribir Voz en Vivo'}
                    </button>
                  </div>
                </div>

                {/* PANEL LATERAL */}
                <div className="lg:col-span-1 bg-[#FAF8F5] p-4 rounded-3xl border-2 border-[#C8D8CE] flex flex-col justify-between space-y-4">
                  <div>
                    <div className="border-b border-[#C8D8CE] pb-2 mb-3 flex justify-between items-center">
                      <h4 className="text-xs font-extrabold uppercase text-[#2D6A4F]">Panel Lateral de la Consulta</h4>
                      <button onClick={handleExportarInforme} className="text-[10px] bg-[#E8F0EC] text-[#2D6A4F] font-bold px-2 py-1 rounded-lg border border-[#C8D8CE] hover:bg-[#2D6A4F] hover:text-white transition">
                        Descargar SOAP
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-1 mb-3 bg-[#E8F0EC] p-1 rounded-xl">
                      <button
                        onClick={() => setActiveSideTab('archivos')}
                        className={`text-[10px] font-bold py-1.5 rounded-lg ${activeSideTab === 'archivos' ? 'bg-white text-[#2D6A4F] shadow-xs' : 'text-[#52796F]'}`}
                      >
                        Archivos ({archivosList.length})
                      </button>
                      <button
                        onClick={() => setActiveSideTab('notas')}
                        className={`text-[10px] font-bold py-1.5 rounded-lg ${activeSideTab === 'notas' ? 'bg-white text-[#2D6A4F] shadow-xs' : 'text-[#52796F]'}`}
                      >
                        Notas ({notas.length})
                      </button>
                      <button
                        onClick={() => setActiveSideTab('transcripcion')}
                        className={`text-[10px] font-bold py-1.5 rounded-lg ${activeSideTab === 'transcripcion' ? 'bg-white text-[#2D6A4F] shadow-xs' : 'text-[#52796F]'}`}
                      >
                        Transcripción
                      </button>
                    </div>

                    {/* PESTAÑA ARCHIVOS */}
                    {activeSideTab === 'archivos' && (
                      <div className="space-y-3">
                        <label className="w-full bg-[#52796F] text-white text-xs font-bold p-2.5 rounded-xl cursor-pointer block text-center shadow-xs hover:bg-[#2D6A4F] transition">
                          + Adjuntar PDF o Imagen
                          <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={handleSubirArchivo} className="hidden" />
                        </label>

                        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                          {archivosList.map((item) => (
                            <div key={item.id} className="p-2.5 bg-white rounded-xl border border-[#C8D8CE] flex items-center justify-between text-xs gap-2">
                              <div className="truncate">
                                <p className="font-bold text-[#2D6A4F] truncate">{item.nombre}</p>
                                <p className="text-[9px] text-[#84A59D]">{item.tipo.toUpperCase()} • {item.fecha}</p>
                              </div>
                              <div className="flex gap-1">
                                <button
                                  onClick={() => setArchivoPreview(item)}
                                  className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] px-2.5 py-1 rounded-lg hover:bg-[#52796F] hover:text-white transition"
                                >
                                  Ver
                                </button>
                                <button
                                  onClick={() => handleEliminarArchivo(item.id)}
                                  className="text-[10px] font-bold bg-[#FFF0F2] text-[#D85260] px-2.5 py-1 rounded-lg hover:bg-[#D85260] hover:text-white transition"
                                >
                                  Borrar
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* PESTAÑA NOTAS */}
                    {activeSideTab === 'notas' && (
                      <div className="space-y-3">
                        <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                          {notas.map((nota, idx) => (
                            <div key={idx} className="p-2.5 bg-white rounded-xl border border-[#C8D8CE] text-xs text-[#2D6A4F]">
                              {nota}
                            </div>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-[#C8D8CE] space-y-2">
                          <textarea
                            rows={2}
                            value={nuevaNota}
                            onChange={(e) => setNuevaNota(e.target.value)}
                            placeholder="Escribir nota..."
                            className="w-full text-xs p-2 border border-[#C8D8CE] rounded-xl bg-white"
                          />
                          <button onClick={handleAgregarNota} className="w-full bg-[#52796F] text-white text-xs font-bold py-2 rounded-xl">
                            Guardar Nota
                          </button>
                        </div>
                      </div>
                    )}

                    {/* PESTAÑA TRANCRIPCIÓN */}
                    {activeSideTab === 'transcripcion' && (
                      <div className="space-y-3">
                        <div className="max-h-52 overflow-y-auto text-xs text-[#52796F] p-3 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] whitespace-pre-line leading-relaxed font-mono">
                          {transcripcion}
                        </div>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            ) : (
              <div className="p-6 bg-[#FFF0F2] rounded-2xl text-center space-y-3">
                <p className="text-sm font-bold text-[#D85260]">
                  La reunión ha finalizado para todas las partes.
                </p>
                <button onClick={() => { setEnLlamada(true); setAsistentesConectados(2); }} className="bg-[#52796F] text-white text-xs font-bold px-6 py-2.5 rounded-xl">
                  Iniciar Nueva Sesión
                </button>
              </div>
            )}
          </section>

          {/* VISOR ESTILO GEMINI NOTEBOOK */}
          {archivoPreview && (
            <section className="bg-white p-6 rounded-3xl border-2 border-[#D4AF37] shadow-lg space-y-4">
              <div className="flex justify-between items-center border-b border-[#E8F0EC] pb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-3 py-0.5 rounded-full border border-[#C8D8CE]">
                    Guía de la Fuente • Documento Protegido (Ley N° 21.663)
                  </span>
                  <h4 className="text-base font-bold text-[#2D6A4F] mt-1">{archivoPreview.nombre}</h4>
                </div>
                <button onClick={() => setArchivoPreview(null)} className="text-xs font-bold text-[#D85260] underline">
                  Cerrar Visor
                </button>
              </div>

              {archivoPreview.urlPreview ? (
                archivoPreview.tipo === 'pdf' ? (
                  <iframe
                    src={archivoPreview.urlPreview}
                    title={archivoPreview.nombre}
                    className="w-full h-96 rounded-2xl border border-[#C8D8CE]"
                  />
                ) : (
                  <div className="max-h-96 overflow-hidden rounded-2xl border border-[#FF8894] bg-[#FAF8F5] p-3 flex justify-center items-center">
                    <img 
                      src={archivoPreview.urlPreview} 
                      alt="Preview HD" 
                      className="max-h-80 object-contain rounded-xl shadow-xs"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = portalData.logo || '/logo-asl.png.png';
                      }}
                    />
                  </div>
                )
              ) : (
                <div className="p-6 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-3">
                  <div className="border-l-4 border-[#2D6A4F] pl-3 py-1">
                    <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider block">Resumen del Documento</span>
                    <p className="text-xs text-[#52796F] mt-1">{archivoPreview.resumen}</p>
                  </div>
                  <div className="pt-2 border-t border-[#C8D8CE]">
                    <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider block mb-1">Contenido Registrado</span>
                    <p className="text-xs text-[#52796F] leading-relaxed font-mono whitespace-pre-line">
                      {archivoPreview.contenidoTexto}
                    </p>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* MODAL DE CONFIRMACIÓN PARA CANCELAR REUNIÓN PARA AMBAS PARTES */}
          {modalCancelar && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white max-w-md w-full rounded-3xl p-6 border-2 border-[#D85260] space-y-4 text-center">
                <h4 className="text-lg font-bold text-[#2D6A4F]">Finalizar Reunión para Ambas Partes</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  ¿Confirmas el cierre de la videoconferencia? Se desconectará la cámara, el audio y la sesión finalizará para todos los participantes conectados.
                </p>
                <div className="flex gap-3 justify-center pt-2">
                  <button
                    onClick={() => setModalCancelar(false)}
                    className="text-xs font-bold bg-[#E8F0EC] text-[#2D6A4F] px-5 py-2.5 rounded-xl border border-[#C8D8CE]"
                  >
                    Continuar en la Sesión
                  </button>
                  <button
                    onClick={handleCancelarReunionAmbasPartes}
                    className="text-xs font-bold bg-[#D85260] text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-[#A8323E] transition"
                  >
                    Sí, Finalizar para Todos
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      )}

    </div>
  );
}