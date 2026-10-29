'use client';

import React, { useState } from 'react';

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
  initialMode?: 'agendar' | 'cancelar' | 'videollamada';
  initialApp?: string;
  appLogo?: string;
}

export default function SalaVirtualB2B({
  isOpen,
  onClose,
  portalData,
  initialMode = 'videollamada',
  initialApp,
  appLogo,
}: SalaVirtualB2BProps) {
  const [modo, setModo] = useState<'agendar' | 'cancelar' | 'videollamada'>(initialMode);
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

  const [micActivo, setMicActivo] = useState(true);
  const [camActiva, setCamActiva] = useState(true);
  const [transcribiendo, setTranscribiendo] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState<string>('');
  const [archivosSubidos, setArchivosSubidos] = useState<string[]>([
    'Presentacion_Vitrina_B2B_ASL.pdf',
    'Ficha_Tecnica_Accesibilidad_Ley_TEA.pdf'
  ]);
  const [transcripcion, setTranscripcion] = useState<string[]>([
    'ASL Bot: Sala de Video Reunión iniciada bajo cifrado de ciberseguridad Ley N° 21.663.',
    'Sistemas: Entorno configurado con baja carga sensorial para neurodivergencias (Ley TEA N° 21.545).'
  ]);
  const [minuta, setMinuta] = useState<string>(
    'Compromisos de la reunión:\n1. Revisión de Vitrina Virtual PYME.\n2. Cotización de licencias de software inclusivo.\n3. Coordinación de prueba piloto.'
  );

  const [codigoReservaCancel, setCodigoReservaCancel] = useState('');
  const [emailCancel, setEmailCancel] = useState('');
  const [canceladoExito, setCanceladoExito] = useState(false);

  if (!isOpen) return null;

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
    const msg = nuevoEstado ? 'Micrófono activado' : 'Micrófono silenciado';
    setMensajeEstado(msg);
    setTranscripcion(prev => [...prev, `Sistema: ${msg}`]);
    setTimeout(() => setMensajeEstado(''), 3000);
  };

  const toggleCam = () => {
    const nuevoEstado = !camActiva;
    setCamActiva(nuevoEstado);
    const msg = nuevoEstado ? 'Cámara activada (Video HD)' : 'Cámara apagada';
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
        'Transcripción IA: Capturando audio de la sala y generando subtítulos...',
        'Participante ASL: "Bienvenidos a la sala virtual interactiva de ASL Ideas SpA."'
      ]);
    } else {
      setMensajeEstado('Transcripción pausada');
    }
    setTimeout(() => setMensajeEstado(''), 3000);
  };

  const handleSubirArchivo = () => {
    const nuevo = prompt('Nombre del documento o archivo a adjuntar a la reunión:');
    if (nuevo && nuevo.trim()) {
      setArchivosSubidos([...archivosSubidos, nuevo.trim()]);
      setMensajeEstado(`Archivo "${nuevo.trim()}" adjuntado con éxito`);
      setTranscripcion(prev => [...prev, `Sistema: Archivo adjuntado (${nuevo.trim()})`]);
      setTimeout(() => setMensajeEstado(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#676E5E]/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#E6E7D5] max-w-4xl w-full rounded-3xl border-2 border-[#97A884] shadow-2xl p-5 sm:p-8 space-y-6 my-6 text-[#676E5E]">
        
        {/* Cabecera del Modal */}
        <div className="flex justify-between items-center border-b border-[#97A884]/40 pb-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo-asl.png.png" 
              alt="Logo ASL Ideas" 
              className="w-10 h-10 object-contain rounded-xl border-2 border-[#E6C693] bg-white p-0.5 shadow-xs" 
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-3 py-0.5 rounded-full border border-[#97A884]">
                Sala Virtual B2B
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#676E5E] mt-0.5">
                {modo === 'videollamada' ? 'Sala Virtual Interactiva en Vivo' : modo === 'agendar' ? 'Agendar Reunión B2B' : 'Cancelar o Reprogramar Reunión'}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-white bg-[#DC8D6C] hover:bg-[#c37858] px-3.5 py-1.5 rounded-xl transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>

        {/* Pestañas de Navegación del Modal */}
        <div className="flex bg-[#CDD6A9]/50 p-1 rounded-2xl border border-[#97A884] text-xs font-bold gap-1">
          <button
            type="button"
            onClick={() => setModo('videollamada')}
            className={`flex-1 py-2.5 rounded-xl transition text-center cursor-pointer ${
              modo === 'videollamada' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:text-[#676E5E]'
            }`}
          >
            Sala en Vivo
          </button>
          <button
            type="button"
            onClick={() => { setModo('agendar'); setReservaConfirmada(false); }}
            className={`flex-1 py-2.5 rounded-xl transition text-center cursor-pointer ${
              modo === 'agendar' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:text-[#676E5E]'
            }`}
          >
            Agendar Reunión
          </button>
          <button
            type="button"
            onClick={() => { setModo('cancelar'); setCanceladoExito(false); }}
            className={`flex-1 py-2.5 rounded-xl transition text-center cursor-pointer ${
              modo === 'cancelar' ? 'bg-[#DC8D6C] text-white shadow-xs' : 'text-[#676E5E] hover:text-[#DC8D6C]'
            }`}
          >
            Cancelar o Reprogramar
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

            <div className="bg-[#3D4336] rounded-2xl p-6 text-white text-center relative min-h-[260px] flex flex-col justify-between shadow-inner border-2 border-[#97A884]">
              <div className="flex justify-between items-center text-[10px]">
                <span className="bg-[#CDD6A9] text-[#676E5E] font-bold px-2.5 py-1 rounded-md border border-[#97A884]">
                  EN VIVO - Cifrado Ley N° 21.663
                </span>
                <span className="text-[#CDD6A9] font-mono">Baja Carga Sensorial Ley TEA</span>
              </div>

              {/* Pantalla con Logo de Carga ASL */}
              <div className="my-4 space-y-3">
                <div className="w-24 h-24 mx-auto bg-white rounded-2xl border-2 border-[#E6C693] p-2 flex items-center justify-center shadow-md">
                  <img src="/logo-asl.png.png" alt="Logo ASL Ideas Web App" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{plataforma}</p>
                  <p className="text-[10px] text-[#CDD6A9] uppercase tracking-wider font-semibold">Carga Interactiva Web App B2B</p>
                </div>
                <div className="flex justify-center gap-3 text-[11px] text-[#CDD6A9] font-medium">
                  <span>Micrófono: <strong>{micActivo ? 'Encendido' : 'Silenciado'}</strong></span>
                  <span>|</span>
                  <span>Cámara: <strong>{camActiva ? 'HD Activa' : 'Desactivada'}</strong></span>
                </div>
              </div>

              {/* Botones de control */}
              <div className="flex flex-wrap justify-center gap-2 pt-2 border-t border-[#676E5E]/50">
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`px-4 py-2 rounded-xl font-bold text-[11px] transition cursor-pointer ${
                    micActivo ? 'bg-[#676E5E] hover:bg-[#52584b] text-white' : 'bg-[#DC8D6C] text-white font-extrabold'
                  }`}
                >
                  {micActivo ? 'Silenciar Micrófono' : 'Activar Micrófono'}
                </button>
                <button
                  type="button"
                  onClick={toggleCam}
                  className={`px-4 py-2 rounded-xl font-bold text-[11px] transition cursor-pointer ${
                    camActiva ? 'bg-[#676E5E] hover:bg-[#52584b] text-white' : 'bg-[#DC8D6C] text-white font-extrabold'
                  }`}
                >
                  {camActiva ? 'Apagar Cámara' : 'Encender Cámara'}
                </button>
                <button
                  type="button"
                  onClick={toggleTranscribir}
                  className={`px-4 py-2 rounded-xl font-bold text-[11px] transition cursor-pointer ${
                    transcribiendo ? 'bg-[#E6C693] text-[#676E5E] font-extrabold' : 'bg-[#676E5E] text-white hover:bg-[#52584b]'
                  }`}
                >
                  {transcribiendo ? 'Pausar Transcripción' : 'Transcribir Reunión'}
                </button>
              </div>
            </div>

            {/* Módulos de Archivos, Transcripción y Minuta */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-[#97A884] space-y-2 shadow-xs">
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-[#676E5E]">Adjuntar Archivos</h4>
                  <button
                    type="button"
                    onClick={handleSubirArchivo}
                    className="bg-[#CDD6A9] hover:bg-[#97A884] text-[#676E5E] hover:text-white font-bold px-2.5 py-1 rounded-lg text-[10px] cursor-pointer transition"
                  >
                    + Adjuntar
                  </button>
                </div>
                <ul className="space-y-1.5 text-[11px] max-h-28 overflow-y-auto">
                  {archivosSubidos.map((f, i) => (
                    <li key={i} className="p-2 bg-[#E6E7D5] rounded-xl border border-[#97A884]/40 font-mono truncate text-[#676E5E]">
                      Doc: {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#97A884] space-y-2 shadow-xs">
                <h4 className="font-extrabold text-[#676E5E]">Transcribir Reunión</h4>
                <div className="h-28 overflow-y-auto bg-[#E6E7D5]/50 p-2.5 rounded-xl text-[10px] space-y-1.5 font-mono text-[#676E5E] border border-[#97A884]/30">
                  {transcripcion.map((t, idx) => (
                    <p key={idx}>{t}</p>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#97A884] space-y-2 shadow-xs">
                <h4 className="font-extrabold text-[#676E5E]">Minuta y Compromisos</h4>
                <textarea
                  value={minuta}
                  onChange={(e) => setMinuta(e.target.value)}
                  className="w-full h-28 p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl text-[11px] text-[#676E5E] outline-none focus:border-[#676E5E]"
                  placeholder="Escribe aquí los acuerdos..."
                />
              </div>
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
              <div className="p-3 bg-[#E6E7D5] rounded-xl border border-[#97A884] text-[11px] font-mono text-[#676E5E]">
                Enlace de Sala Virtual B2B Generado
              </div>
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
                  className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
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
                  className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
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
                    className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider block">Bloque Horario *</label>
                  <select
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
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
                    className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] outline-none focus:border-[#676E5E]"
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
                    className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] outline-none focus:border-[#676E5E]"
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
                La reunión con código <strong>{codigoReservaCancel}</strong> para el correo <strong>{emailCancel}</strong> ha sido procesada para su cancelación o reprogramación.
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
