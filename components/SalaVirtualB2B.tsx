'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

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
  publicoObjetivo: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  portalData?: PortalInfo;
  isAdmin?: boolean;
  initialApp?: string;
  appName?: string;
  appLogo?: string;
}

export default function SalaVirtualB2B({ 
  isOpen, 
  onClose, 
  portalData: inputPortalData,
  isAdmin = false,
  initialApp,
  appName,
  appLogo
}: Props) {
  // Soporte retrocompatible para llamadas desde otras páginas (ej: app/comunidad/page.tsx)
  const effectiveName = inputPortalData?.nombre || appName || initialApp || 'Portal ASL Ideas SpA';
  const effectiveLogo = inputPortalData?.logo || appLogo || '/logo-asl.png';

  const portalData: PortalInfo = inputPortalData || {
    id: 'default',
    nombre: effectiveName,
    subtitulo: 'Portal Interactivo de Atención y Coordinación B2B',
    logo: effectiveLogo,
    oficinaNum: 'Oficina Virtual',
    leyes: ['Ley TEA N° 21.545', 'Ley N° 21.663'],
    descripcionCorta: 'Atención virtual, cotización de servicios y coordinación de convenios B2B.',
    descripcionLarga: 'Espacio de reunión e interacción virtual para la coordinación corporativa, presentación de proyectos de salud digital inclusiva y accesibilidad cognitiva UI/UX.',
    serviciosClave: [
      'Atención y Consultoría Virtual',
      'Coordinación de Licencias B2B',
      'Revisión de Requerimientos de Accesibilidad',
      'Presentación de Proyectos Institucionales'
    ],
    publicoObjetivo: 'Comunidad, Instituciones y Convenios B2B'
  };

  const [tab, setTab] = useState<'descripcion' | 'agendar' | 'video' | 'archivos' | 'notas'>('descripcion');
  const [motivoConsulta, setMotivoConsulta] = useState<string>('Atención Virtual (Participantes de Lado a Lado)');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [userOrg, setUserOrg] = useState<string>('');
  const [file, setFile] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const [notas, setNotas] = useState<string[]>([
    'Acuerdo preliminar: Demostración de interfaz accesible UI/UX.',
    'Revisión de requerimientos para Ley N° 21.663 y Ley TEA N° 21.545.'
  ]);
  const [nuevaNota, setNuevaNota] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setTab('descripcion');
      setBookingSuccess(false);
    }
  }, [isOpen, inputPortalData]);

  if (!isOpen) return null;

  const motivos: string[] = [
    'Atención Virtual (Participantes de Lado a Lado)',
    'Cotización de Convenio Corporativo / Licencia B2B',
    'Demostración de Software en Vivo',
    'Consultoría en Accesibilidad UI/UX (Ley TEA / Neurodivergencia)',
    'Muestra de Fichas Clínicas Encriptadas (Ley N° 21.663)',
    'Alianza Institucional o Municipal'
  ];

  const horariosDisponibles: string[] = ['09:00 AM', '10:30 AM', '12:00 PM', '03:00 PM', '04:30 PM', '06:00 PM'];

  const handleAgendar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate || !userName || !userEmail) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setBookingSuccess(true);
    }, 1000);
  };

  const handleAgregarNota = () => {
    const notaLimpia = nuevaNota.trim();
    if (!notaLimpia) return;
    setNotas((prev) => [...prev, notaLimpia]);
    setNuevaNota('');
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList.length > 0) {
      setFile(fileList);
    } else {
      setFile(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D6A4F]/60 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-3xl border-4 border-[#D4AF37] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* ENCABEZADO CON LOGO DE LA APP */}
        <header className="bg-[#52796F] text-white p-5 flex justify-between items-center border-b-2 border-[#D4AF37]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white p-1 border-2 border-[#D4AF37] flex items-center justify-center shadow-md overflow-hidden flex-shrink-0">
              <img 
                src={portalData.logo} 
                alt={portalData.nombre} 
                className="w-full h-full object-cover rounded-full" 
              />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-3 py-1 rounded-full inline-block mb-1">
                {portalData.oficinaNum}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white">{portalData.nombre}</h2>
              <p className="text-xs text-[#E8F0EC]">{portalData.subtitulo}</p>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose} 
            className="text-[#D85260] hover:text-white bg-[#FFF0F2] hover:bg-[#FF8894] border border-[#FF8894] text-xs px-4 py-2 rounded-full font-bold transition shadow-xs"
          >
            Cerrar Portal
          </button>
        </header>

        {/* PESTAÑAS DE NAVEGACION DENTRO DEL PORTAL */}
        <div className="flex border-b border-[#C8D8CE] bg-[#E8F0EC]">
          <button 
            type="button"
            onClick={() => setTab('descripcion')} 
            className={`flex-1 py-3.5 text-xs font-bold transition ${tab === 'descripcion' ? 'bg-[#FAF8F5] text-[#2D6A4F] border-b-2 border-[#D4AF37]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Descripción del Portal
          </button>
          <button 
            type="button"
            onClick={() => setTab('agendar')} 
            className={`flex-1 py-3.5 text-xs font-bold transition ${tab === 'agendar' ? 'bg-[#FAF8F5] text-[#2D6A4F] border-b-2 border-[#D4AF37]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Agendar Cita B2B
          </button>
          <button 
            type="button"
            onClick={() => setTab('archivos')} 
            className={`flex-1 py-3.5 text-xs font-bold transition ${tab === 'archivos' ? 'bg-[#FAF8F5] text-[#2D6A4F] border-b-2 border-[#D4AF37]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Documentos / PDF
          </button>
          <button 
            type="button"
            onClick={() => setTab('notas')} 
            className={`flex-1 py-3.5 text-xs font-bold transition ${tab === 'notas' ? 'bg-[#FAF8F5] text-[#2D6A4F] border-b-2 border-[#D4AF37]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Acuerdos y Notas
          </button>
          
          {isAdmin && (
            <button 
              type="button"
              onClick={() => setTab('video')} 
              className={`flex-1 py-3.5 text-xs font-bold transition ${tab === 'video' ? 'bg-[#FFF0F2] text-[#D85260] border-b-2 border-[#D85260]' : 'text-[#D85260] hover:bg-[#FFF0F2]/50'}`}
            >
              Sala Virtual (Admin)
            </button>
          )}
        </div>

        {/* CONTENIDO INTERACTIVO */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: DESCRIPCION EXTENSA */}
          {tab === 'descripcion' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4">
                <div className="flex flex-wrap gap-2">
                  {portalData.leyes.map((ley, idx) => (
                    <span key={idx} className="text-[10px] font-bold uppercase tracking-wider bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-3 py-1 rounded-full">
                      {ley}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-bold text-[#2D6A4F] border-b border-[#E8F0EC] pb-2">
                  Propósito y Funcionalidades de {portalData.nombre}
                </h3>

                <p className="text-xs md:text-sm text-[#52796F] leading-relaxed">
                  {portalData.descripcionLarga}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider mb-2">Servicios y Módulos Principales:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {portalData.serviciosClave.map((servicio, idx) => (
                      <li key={idx} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] text-[#2D6A4F] font-semibold flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                        {servicio}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE] text-xs">
                  <span className="font-bold text-[#2D6A4F]">Público Objetivo:</span>{' '}
                  <span className="text-[#52796F]">{portalData.publicoObjetivo}</span>
                </div>
              </div>

              {/* BOTON DE AGENDAMIENTO DENTRO DE LA DESCRIPCION */}
              <div className="bg-[#52796F] p-6 rounded-3xl border-2 border-[#D4AF37] text-white text-center space-y-3 shadow-md">
                <h4 className="text-base font-bold">¿Deseas coordinar una reunión B2B en esta oficina?</h4>
                <p className="text-xs text-[#E8F0EC]">
                  Reserva directamente tu sesión virtual con nuestro equipo corporativo.
                </p>
                <button
                  type="button"
                  onClick={() => setTab('agendar')}
                  className="bg-[#D4AF37] hover:bg-[#B08D4B] text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-xs inline-block"
                >
                  Agendar Cita B2B en {portalData.nombre}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: AGENDAMIENTO */}
          {tab === 'agendar' && (
            <div className="max-w-2xl mx-auto space-y-5 bg-white p-6 md:p-8 rounded-3xl border border-[#C8D8CE] shadow-xs">
              <div className="text-center space-y-1 border-b border-[#E8F0EC] pb-4">
                <h3 className="text-base font-bold text-[#2D6A4F]">Agendamiento B2B — {portalData.nombre}</h3>
                <p className="text-xs text-[#52796F]">Completa los datos para reservar tu sesión en esta oficina virtual.</p>
              </div>

              {bookingSuccess ? (
                <div className="p-6 bg-[#FFF0F2] rounded-2xl border border-[#FF8894] text-center space-y-4">
                  <h4 className="text-base font-bold text-[#D85260]">Reunión Agendada con Éxito</h4>
                  <p className="text-xs text-[#52796F] leading-relaxed">
                    Hemos registrado la cita para <strong className="text-[#2D6A4F]">{userName}</strong> ({userEmail}).<br/>
                    Portal: <strong className="text-[#2D6A4F]">{portalData.nombre}</strong><br/>
                    Motivo: <strong className="text-[#2D6A4F]">{motivoConsulta}</strong><br/>
                    Fecha: <strong className="text-[#2D6A4F]">{selectedDate}</strong> a las <strong className="text-[#2D6A4F]">{selectedTime}</strong>.
                  </p>
                  <button 
                    type="button"
                    onClick={() => setBookingSuccess(false)} 
                    className="text-xs font-bold text-[#D85260] underline hover:text-[#2D6A4F] pt-2 block mx-auto"
                  >
                    Agendar otra reunión
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAgendar} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Motivo de la Cita *</label>
                    <select
                      value={motivoConsulta}
                      onChange={(e) => setMotivoConsulta(e.target.value)}
                      className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] focus:outline-none text-gray-800"
                    >
                      {motivos.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Nombre Completo *</label>
                      <input 
                        type="text" 
                        required 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                        placeholder="Ej: Maria Gonzalez" 
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl focus:outline-none bg-[#FAF8F5]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Correo Electrónico *</label>
                      <input 
                        type="email" 
                        required 
                        value={userEmail} 
                        onChange={(e) => setUserEmail(e.target.value)} 
                        placeholder="contacto@empresa.cl" 
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl focus:outline-none bg-[#FAF8F5]" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Fecha *</label>
                      <input 
                        type="date" 
                        required 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)} 
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Horario Preferente *</label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] font-bold text-[#2D6A4F]"
                      >
                        {horariosDisponibles.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-[#E8F0EC]">
                    <button 
                      type="button"
                      onClick={() => setTab('descripcion')}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3 rounded-xl transition text-center"
                    >
                      Volver a Descripción
                    </button>
                    <button 
                      type="submit" 
                      disabled={uploading} 
                      className="flex-1 bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3 rounded-xl transition text-center"
                    >
                      {uploading ? 'Procesando Cita...' : 'Confirmar Cita B2B'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: ARCHIVOS */}
          {tab === 'archivos' && (
            <div className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs">
              <h3 className="text-sm font-bold text-[#2D6A4F] text-center">Adjuntar Documentos / PDF</h3>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx,.png,.jpg" 
                onChange={handleFileChange} 
                className="block w-full text-xs text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#E8F0EC] file:text-[#2D6A4F]" 
              />
              <button 
                type="button"
                onClick={() => { setUploading(true); setTimeout(() => setUploading(false), 1200); }} 
                disabled={!file || uploading} 
                className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2D6A4F] transition disabled:opacity-50"
              >
                {uploading ? 'Cargando archivo...' : 'Enviar Documento'}
              </button>
            </div>
          )}

          {/* TAB 4: NOTAS */}
          {tab === 'notas' && (
            <div className="max-w-xl mx-auto space-y-3 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs">
              <h3 className="text-sm font-bold text-[#2D6A4F]">Acuerdos de Sesión</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={nuevaNota} 
                  onChange={(e) => setNuevaNota(e.target.value)} 
                  placeholder="Escribir acuerdo..." 
                  className="flex-1 text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none" 
                />
                <button 
                  type="button"
                  onClick={handleAgregarNota} 
                  className="bg-[#52796F] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#2D6A4F]"
                >
                  Guardar
                </button>
              </div>
              <ul className="text-xs space-y-2 pt-2">
                {notas.map((item, index) => (
                  <li key={index} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] text-[#2D6A4F] flex items-center justify-between">
                    <span>{item}</span>
                    <span className="text-[10px] text-[#D85260] bg-[#FFF0F2] px-2 py-0.5 rounded font-bold border border-[#FF8894]">Nota #{index + 1}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* TAB 5: VIDEO (ADMIN) */}
          {tab === 'video' && isAdmin && (
            <div className="p-8 text-center space-y-3 bg-white rounded-3xl border-2 border-[#D85260]">
              <span className="text-xs font-bold bg-[#FFF0F2] text-[#D85260] px-3 py-1 rounded-full border border-[#FF8894]">CONSOLA EN VIVO (ADMIN)</span>
              <h4 className="text-base font-bold text-[#2D6A4F]">Transmisión para {portalData.nombre}</h4>
              <p className="text-xs text-[#52796F]">Acceso privileged activo para la sesión virtual.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
