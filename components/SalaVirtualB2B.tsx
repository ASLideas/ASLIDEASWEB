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
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setModo(initialMode);
    }
  }, [isOpen, initialMode]);

  const [plataforma, setPlataforma] = useState<string>(
    portalData?.nombre || initialApp || '1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)'
  );
  const [motivo, setMotivo] = useState<string>(
    'Videoreunión de Trabajo / Cotización de Vitrina B2B'
  );
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState<string>('10:30 AM (Bloque Mañana)');
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [reservaConfirmada, setReservaConfirmada] = useState<boolean>(false);

  // Estados de la Sala de Video
  const [micActivo, setMicActivo] = useState<boolean>(true);
  const [camActiva, setCamActiva] = useState<boolean>(true);
  const [transcribiendo, setTranscribiendo] = useState<boolean>(false);
  const [mensajeEstado, setMensajeEstado] = useState<string>('');

  // Archivos Adjuntos Interactivos
  const [archivosSubidos, setArchivosSubidos] = useState<ArchivoAdjunto[]>([
    { nombre: 'Presentacion_Vitrina_B2B_ASL.pdf', tamano: '1.2 MB', fecha: 'Hoy 10:00 AM' },
    { nombre: 'Ficha_Tecnica_Accesibilidad_Ley_TEA.pdf', tamano: '840 KB', fecha: 'Hoy 10:05 AM' }
  ]);

  // Transcripción en Vivo
  const [transcripcion, setTranscripcion] = useState<string[]>([
    'ASL Bot: Sala de Video Reunión iniciada bajo cifrado de ciberseguridad Ley N° 21.663.',
    'Sistemas: Entorno configurado con baja carga sensorial para neurodivergencias (Ley TEA N° 21.545).'
  ]);

  // Minuta y Notas
  const [minuta, setMinuta] = useState<string>(
    'COMPROMISOS DE LA REUNIÓN B2B:\n1. Revisión de propuesta de Vitrina Virtual PYME.\n2. Demostración de software adaptado con baja carga sensorial.\n3. Coordinación de prueba piloto institucional.'
  );

  const [codigoReservaCancel, setCodigoReservaCancel] = useState('');
  const [emailCancel, setEmailCancel] = useState('');
  const [canceladoExito, setCanceladoExito] = useState(false);

  // Bucle de Transcripción Simulado en Vivo
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (transcribiendo) {
      const frasesLive = [
        'Anfitrión ASL: "Presentando el módulo de accesibilidad cognitiva y lectura fácil."',
        'Participante B2B: "Confirmado el requerimiento de integración con fichas encriptadas."',
        'Sistema IA: "Generando resumen de compromisos clave para la minuta."',
        'Anfitrión ASL: "Ajustando paleta de colores amables sin sobrecarga sensorial."'
      ];
      let i = 0;
      interval = setInterval(() => {
        setTranscripcion(prev => [...prev, frasesLive[i % frasesLive.length]]);
        i++;
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [transcribiendo]);

  if (!isOpen) return null;

  const currentNombre = portalData?.nombre || initialApp || 'ASL Ideas SpA';
  const currentLogo = portalData?.logo || appLogo || '/logo-asl.png.png';
  const currentOficina = portalData?.oficinaNum || 'Oficina Virtual 01';
  const currentSubtitulo = portalData?.subtitulo || 'Casa Matriz - Desarrollo B2B y Licencias Inclusivas';
  const currentLeyes = portalData?.leyes || ['Ley TEA N° 21.545', 'Accesibilidad Cognitiva UI/UX'];
  const currentDescLarga = portalData?.descripcionLarga || 'Especialistas en desarrollo de software accesible a medida para municipalidades, empresas e instituciones de salud. Creamos vitrinas virtuales y entornos digitales amables con baja carga sensorial.';
  const currentServicios = portalData?.serviciosClave || ['Licencias B2B de Software', 'Vitrinas Virtuales PYME', 'Consultoría UI/UX en Ley TEA'];
  const currentBeneficios = portalData?.beneficios || ['Entornos de baja carga sensorial', 'Integración ágil con Supabase', 'Cumplimiento normativo estricto'];

  // Manejo de Carga de Archivos Reales
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const nuevos: ArchivoAdjunto[] = [];
      Array.from(e.target.files).forEach(f => {
        const sizeKB = (f.size / 1024).toFixed(0);
        const sizeStr = Number(sizeKB) > 1024 ? `${(Number(sizeKB) / 1024).toFixed(1)} MB` : `${sizeKB} KB`;
        nuevos.push({
          nombre: f.name,
          tamano: sizeStr,
          fecha: 'Recién subido'
        });
      });
      setArchivosSubidos([...archivosSubidos, ...nuevos]);
      setMensajeEstado(`${nuevos.length} archivo(s) adjuntado(s) exitosamente`);
      setTranscripcion(prev => [...prev, `Sistema: Archivo adjuntado por usuario (${nuevos.map(n => n.nombre).join(', ')})`]);
      setTimeout(() => setMensajeEstado(''), 3000);
    }
  };

  const eliminarArchivo = (index: number) => {
    const borrado = archivosSubidos[index];
    setArchivosSubidos(archivosSubidos.filter((_, i) => i !== index));
    setMensajeEstado(`Archivo "${borrado.nombre}" eliminado`);
    setTimeout(() => setMensajeEstado(''), 3000);
  };

  const handleConfirmarReserva = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !fecha) {
      alert('Por favor completa todos los campos requeridos para agendar la reunión.');
      return;
    }
    setReservaConfirmada(true);
  };

  const handleConfirmarCancelacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigoReservaCancel.trim() || !emailCancel.trim()) {
      alert('Por favor ingresa tu código de reserva y correo registrado.');
      return;
    }
    setCanceladoExito(true);
  };

  const toggleMic = () => {
    const nuevoEstado = !micActivo;
    setMicActivo(nuevoEstado);
    const msg = nuevoEstado ? 'Micrófono Activado' : 'Micrófono Silenciado';
    setMensajeEstado(msg);
    setTranscripcion(prev => [...prev, `Sistema: ${msg}`]);
    setTimeout(() => setMensajeEstado(''), 3000);
  };

  const toggleCam = () => {
    const nuevoEstado = !camActiva;
    setCamActiva(nuevoEstado);
    const msg = nuevoEstado ? 'Cámara Activada (Video HD)' : 'Cámara Apagada';
    setMensajeEstado(msg);
    setTranscripcion(prev => [...prev, `Sistema: ${msg}`]);
    setTimeout(() => setMensajeEstado(''), 3000);
  };

  const toggleTranscribir = () => {
    const nuevoEstado = !transcribiendo;
    setTranscribiendo(nuevoEstado);
    if (nuevoEstado) {
      setMensajeEstado('Transcripción automática activada en tiempo real');
      setTranscripcion(prev => [
        ...prev,
        'Transcripción IA: Capturando conversación y generando subtítulos...'
      ]);
    } else {
      setMensajeEstado('Transcripción pausada');
    }
    setTimeout(() => setMensajeEstado(''), 3000);
  };

  const copiarMinuta = () => {
    navigator.clipboard.writeText(minuta);
    setMensajeEstado('Minuta copiada al portapapeles');
    setTimeout(() => setMensajeEstado(''), 3000);
  };

  const descargarMinutaTxt = () => {
    const blob = new Blob([minuta], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Minuta_Reunion_ASL_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#676E5E]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div 
        className={`bg-[#E6E7D5] transition-all duration-300 ${
          esPantallaCompleta 
            ? 'w-full h-full rounded-none border-0 p-4 sm:p-8 space-y-6 overflow-y-auto' 
            : 'max-w-5xl w-full rounded-3xl border-2 border-[#97A884] shadow-2xl p-4 sm:p-8 space-y-6 my-4'
        } text-[#676E5E]`}
      >
        
        {/* Cabecera del Modal con Botón de Maximizar */}
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
                {modo === 'ficha' ? `Ficha Técnica: ${currentNombre}` : modo === 'videollamada' ? 'Sala Virtual Interactiva en Vivo' : modo === 'agendar' ? 'Agendar Reunión B2B' : 'Cancelar o Reprogramar Reunión'}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setEsPantallaCompleta(!esPantallaCompleta)}
              className="text-xs font-bold text-[#676E5E] bg-[#CDD6A9] hover:bg-[#97A884] hover:text-white px-3 py-1.5 rounded-xl border border-[#97A884] transition cursor-pointer"
            >
              {esPantallaCompleta ? 'Restaurar Ventana' : 'Pantalla Completa'}
            </button>
            <button
              type="button"
              onClick={onClose}
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
              modo === 'videollamada' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:text-[#676E5E]'
            }`}
          >
            Sala en Vivo
          </button>
          <button
            type="button"
            onClick={() => setModo('ficha')}
            className={`flex-1 py-2 rounded-xl transition text-center cursor-pointer ${
              modo === 'ficha' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:text-[#676E5E]'
            }`}
          >
            Ficha de Oficina
          </button>
          <button
            type="button"
            onClick={() => { setModo('agendar'); setReservaConfirmada(false); }}
            className={`flex-1 py-2 rounded-xl transition text-center cursor-pointer ${
              modo === 'agendar' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:text-[#676E5E]'
            }`}
          >
            Agendar Cita
          </button>
          <button
            type="button"
            onClick={() => { setModo('cancelar'); setCanceladoExito(false); }}
            className={`flex-1 py-2 rounded-xl transition text-center cursor-pointer ${
              modo === 'cancelar' ? 'bg-[#DC8D6C] text-white shadow-xs' : 'text-[#676E5E] hover:text-[#DC8D6C]'
            }`}
          >
            Cancelar/Reprogramar
          </button>
        </div>

        {/* MODO 1: VIDEOLLAMADA INTERACTIVA */}
        {modo === 'videollamada' && (
          <div className="space-y-6 text-xs">
            {mensajeEstado && (
              <div className="bg-[#CDD6A9] text-[#676E5E] p-2.5 rounded-xl font-bold text-center border border-[#97A884] animate-pulse">
                {mensajeEstado}
              </div>
            )}

            {/* Pantalla de Video Interactivamente Simulada */}
            <div className={`bg-[#2D3227] rounded-3xl p-6 text-white text-center relative flex flex-col justify-between shadow-2xl border-2 border-[#97A884] ${esPantallaCompleta ? 'min-h-[380px]' : 'min-h-[280px]'}`}>
              <div className="flex justify-between items-center text-[10px]">
                <span className="bg-[#CDD6A9] text-[#676E5E] font-bold px-2.5 py-1 rounded-md border border-[#97A884] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  EN VIVO - Cifrado Ley N° 21.663
                </span>
                <span className="text-[#CDD6A9] font-mono">Baja Carga Sensorial Ley TEA</span>
              </div>

              {/* Contenido Visual del Video */}
              <div className="my-6 space-y-3">
                <div className="w-28 h-28 mx-auto bg-white rounded-3xl border-4 border-[#E6C693] p-2 flex items-center justify-center shadow-xl relative overflow-hidden">
                  <img src={currentLogo} alt={currentNombre} className={`w-full h-full object-contain ${camActiva ? 'opacity-100' : 'opacity-30'}`} />
                  {!camActiva && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-wider">
                      Cámara Apagada
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-base font-extrabold text-white">{plataforma}</p>
                  <p className="text-[10px] text-[#CDD6A9] uppercase tracking-wider font-semibold">Sala Interactiva B2B Activa</p>
                </div>

                {/* Ecualizador / Indicadores de Audio y Cámara */}
                <div className="flex justify-center items-center gap-4 text-[11px] text-[#CDD6A9] font-medium pt-1">
                  <div className="flex items-center gap-1.5">
                    <span>Micrófono:</span>
                    <span className={`font-bold px-2 py-0.5 rounded-md ${micActivo ? 'bg-green-700 text-white' : 'bg-red-600 text-white'}`}>
                      {micActivo ? 'Encendido' : 'Silenciado'}
                    </span>
                  </div>
                  <span>|</span>
                  <div className="flex items-center gap-1.5">
                    <span>Cámara:</span>
                    <span className={`font-bold px-2 py-0.5 rounded-md ${camActiva ? 'bg-green-700 text-white' : 'bg-gray-600 text-white'}`}>
                      {camActiva ? 'HD Activa' : 'Apagada'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botones de Control de la Sala */}
              <div className="flex flex-wrap justify-center gap-2.5 pt-3 border-t border-[#676E5E]/60">
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer shadow-sm ${
                    micActivo ? 'bg-[#676E5E] hover:bg-[#52584b] text-white' : 'bg-[#DC8D6C] text-white font-extrabold'
                  }`}
                >
                  {micActivo ? 'Silenciar Micrófono' : 'Activar Micrófono'}
                </button>
                <button
                  type="button"
                  onClick={toggleCam}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer shadow-sm ${
                    camActiva ? 'bg-[#676E5E] hover:bg-[#52584b] text-white' : 'bg-[#DC8D6C] text-white font-extrabold'
                  }`}
                >
                  {camActiva ? 'Apagar Cámara' : 'Encender Cámara'}
                </button>
                <button
                  type="button"
                  onClick={toggleTranscribir}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs transition cursor-pointer shadow-sm ${
                    transcribiendo ? 'bg-[#E6C693] text-[#676E5E] font-extrabold animate-pulse' : 'bg-[#676E5E] text-white hover:bg-[#52584b]'
                  }`}
                >
                  {transcribiendo ? 'Transcripción en Vivo...' : 'Transcribir Reunión'}
                </button>
              </div>
            </div>

            {/* Módulos Interactivos: Archivos, Transcripción y Minuta */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* 1. Módulo Adjuntar y Ver Archivos */}
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
                      <p className="text-[11px] text-[#97A884] italic text-center py-4">No hay archivos adjuntos aún.</p>
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
                            className="text-red-600 hover:text-red-800 font-bold px-2 py-0.5 text-[10px] cursor-pointer"
                            title="Eliminar archivo"
                          >
                            X
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

              {/* 2. Módulo Transcripción en Vivo */}
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
                  <span className="text-[9px] text-[#97A884] font-semibold">Ley TEA N° 21.545 - Lectura Fácil</span>
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

              {/* 3. Módulo Minuta y Compromisos */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-[#97A884] space-y-3 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b border-[#97A884]/30 pb-2">
                    <h4 className="font-extrabold text-[#676E5E] text-xs uppercase tracking-wider">Minuta y Compromisos</h4>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={copiarMinuta}
                        className="bg-[#CDD6A9] text-[#676E5E] font-bold px-2 py-0.5 rounded-md text-[10px] cursor-pointer"
                      >
                        Copiar
                      </button>
                      <button
                        type="button"
                        onClick={descargarMinutaTxt}
                        className="bg-[#676E5E] text-white font-bold px-2 py-0.5 rounded-md text-[10px] cursor-pointer"
                      >
                        Descargar
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={minuta}
                    onChange={(e) => setMinuta(e.target.value)}
                    className="w-full h-40 p-3 bg-[#FAF8F5] border border-[#97A884] rounded-2xl text-[11px] text-[#676E5E] outline-none focus:border-[#676E5E] mt-3 font-medium leading-relaxed"
                    placeholder="Escribe aquí los acuerdos de la reunión..."
                  />
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setMinuta(prev => prev + '\n- Se acuerda envío de cotización B2B.')}
                    className="text-[9px] bg-[#E6E7D5] text-[#676E5E] font-bold px-2 py-1 rounded-lg border border-[#97A884]/40 hover:bg-[#CDD6A9] cursor-pointer"
                  >
                    + Cotización
                  </button>
                  <button
                    type="button"
                    onClick={() => setMinuta(prev => prev + '\n- Se coordina prueba de software Ley TEA.')}
                    className="text-[9px] bg-[#E6E7D5] text-[#676E5E] font-bold px-2 py-1 rounded-lg border border-[#97A884]/40 hover:bg-[#CDD6A9] cursor-pointer"
                  >
                    + Ley TEA
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* MODO 0: FICHA DE LA OFICINA VIRTUAL */}
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
              <div className="flex flex-wrap gap-1">
                {currentLeyes.map((ley, i) => (
                  <span key={i} className="text-[10px] font-bold bg-[#CDD6A9] text-[#676E5E] border border-[#97A884] px-2 py-0.5 rounded-md">
                    {ley}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-2xl border border-[#97A884]/40">
              <h4 className="font-extrabold text-[#676E5E] uppercase tracking-wider text-[11px]">Reseña Oficial & Propósito</h4>
              <p className="text-xs text-[#676E5E]/90 leading-relaxed font-medium">{currentDescLarga}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#E6E7D5]/60 p-4 rounded-2xl border border-[#97A884]/40 space-y-2">
                <h4 className="font-extrabold text-[#676E5E] uppercase tracking-wider text-[10px]">Módulos y Servicios Clave:</h4>
                <ul className="space-y-1 list-disc list-inside text-[#676E5E]">
                  {currentServicios.map((s, idx) => (
                    <li key={idx} className="font-medium">{s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#E6E7D5]/60 p-4 rounded-2xl border border-[#97A884]/40 space-y-2">
                <h4 className="font-extrabold text-[#676E5E] uppercase tracking-wider text-[10px]">Beneficios Principales:</h4>
                <ul className="space-y-1 list-disc list-inside text-[#676E5E]">
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
                className="flex-1 bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold py-3 rounded-2xl transition shadow-sm text-center cursor-pointer"
              >
                Ingresar a Sala Virtual en Vivo
              </button>
              <button
                type="button"
                onClick={() => { setModo('agendar'); setReservaConfirmada(false); }}
                className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white text-xs font-bold px-5 py-3 rounded-2xl transition shadow-xs cursor-pointer font-extrabold"
              >
                Agendar Cita B2B
              </button>
            </div>
          </div>
        )}

        {/* MODO 2: AGENDAR REUNIÓN */}
        {modo === 'agendar' && (
          reservaConfirmada ? (
            <div className="bg-white p-6 rounded-2xl border border-[#97A884] text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 mx-auto bg-[#CDD6A9] rounded-full flex items-center justify-center text-[#676E5E] font-extrabold text-sm border-2 border-[#97A884]">
                OK
              </div>
              <h4 className="text-lg font-bold text-[#676E5E]">Video Reunión Agendada Exitosamente</h4>
              <p className="text-xs text-[#676E5E] leading-relaxed">
                Hemos registrado la cita para <strong>{nombre}</strong> ({email}). El acceso a la sala virtual para el día <strong>{fecha}</strong> a las <strong>{hora}</strong> se enviará a tu correo.
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
            <form onSubmit={handleConfirmarReserva} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#676E5E] uppercase tracking-wider block">
                  1. Selecciona la Aplicación o Unidad *
                </label>
                <select
                  value={plataforma}
                  onChange={(e) => setPlataforma(e.target.value)}
                  className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none"
                >
                  <option value="1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)">1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)</option>
                  <option value="2. LAWENMOLL Salud Integrativa">2. LAWENMOLL Salud Integrativa</option>
                  <option value="3. Wellness Web App (Movimiento Adaptado)">3. Wellness Web App (Movimiento Adaptado)</option>
                  <option value="4. Sabiduría Ancestral / Bienestar (Fitoterapia Nativa)">4. Sabiduría Ancestral / Bienestar (Fitoterapia Nativa)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#676E5E] uppercase tracking-wider block">
                  2. Motivo de la Cita *
                </label>
                <select
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none"
                >
                  <option value="Videoreunión de Trabajo / Cotización de Vitrina B2B">Videoreunión de Trabajo / Cotización de Vitrina B2B</option>
                  <option value="Demostración de Software Accesibilidad Cognitiva Ley TEA">Demostración de Software Accesibilidad Cognitiva Ley TEA</option>
                  <option value="Consultoría Institucional B2B">Consultoría Institucional B2B</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider block">Fecha *</label>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider block">Bloque Horario *</label>
                  <select
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none"
                  >
                    <option value="09:30 AM (Bloque Mañana)">09:30 AM (Bloque Mañana)</option>
                    <option value="10:30 AM (Bloque Mañana)">10:30 AM (Bloque Mañana)</option>
                    <option value="12:00 PM (Bloque Mediodía)">12:00 PM (Bloque Mediodía)</option>
                    <option value="15:30 PM (Bloque Tarde)">15:30 PM (Bloque Tarde)</option>
                    <option value="17:00 PM (Bloque Tarde)">17:00 PM (Bloque Tarde)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider block">Nombre Completo / Empresa *</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre o Institución..."
                    className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider block">Correo Electrónico *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@aslideas.cl"
                    className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold py-3.5 rounded-2xl transition shadow-md mt-4 cursor-pointer"
              >
                Confirmar y Agendar Reunión
              </button>
            </form>
          )
        )}

        {/* MODO 3: CANCELAR O REPROGRAMAR */}
        {modo === 'cancelar' && (
          canceladoExito ? (
            <div className="bg-white p-6 rounded-2xl border border-[#DC8D6C] text-center space-y-4 shadow-xs">
              <h4 className="text-lg font-bold text-[#DC8D6C]">Solicitud de Cancelación Recibida</h4>
              <p className="text-xs text-[#676E5E] leading-relaxed">
                La reunión con código <strong>{codigoReservaCancel}</strong> para el correo <strong>{emailCancel}</strong> ha sido procesada.
              </p>
              <button
                type="button"
                onClick={() => { setCanceladoExito(false); onClose(); }}
                className="bg-[#676E5E] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#52584b] transition cursor-pointer"
              >
                Volver al Sitio
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirmarCancelacion} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#DC8D6C] uppercase tracking-wider block">Código de Reserva o RUT *</label>
                <input
                  type="text"
                  value={codigoReservaCancel}
                  onChange={(e) => setCodigoReservaCancel(e.target.value)}
                  placeholder="Ej: ASL-8921"
                  className="w-full p-3 bg-white border border-[#DC8D6C] rounded-xl text-[#676E5E] outline-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-[#DC8D6C] uppercase tracking-wider block">Correo Electrónico Registrado *</label>
                <input
                  type="email"
                  value={emailCancel}
                  onChange={(e) => setEmailCancel(e.target.value)}
                  placeholder="contacto@aslideas.cl"
                  className="w-full p-3 bg-white border border-[#DC8D6C] rounded-xl text-[#676E5E] outline-none"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-[#DC8D6C] hover:bg-[#c37858] text-white font-bold py-3.5 rounded-2xl transition cursor-pointer">
                Confirmar Cancelación o Reprogramación
              </button>
            </form>
          )
        )}

      </div>
    </div>
  );
}
