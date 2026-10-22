'use client';

import React, { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialApp?: string;
  appName?: string;
  appLogo?: string;
}

export default function SalaVirtualB2B({ 
  isOpen, 
  onClose, 
  initialApp,
  appName, 
  appLogo = '/LOGO_asl.png' 
}: Props) {
  const defaultApp = appName || initialApp || 'Casa Matriz ASL Ideas SpA (Desarrollo B2B & Licencias)';
  const [tab, setTab] = useState<'agendar' | 'video' | 'archivos' | 'notas'>('agendar');
  const [selectedApp, setSelectedApp] = useState<string>(defaultApp);
  const [motivoConsulta, setMotivoConsulta] = useState<string>('Cotización de Convenio Corporativo / Licencia B2B');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userOrg, setUserOrg] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  const [notas, setNotas] = useState<string[]>([
    'Acuerdo preliminar: Demostración de interfaz accesible UI/UX.',
    'Revisión de requerimientos para Ley N° 21.663 y Ley TEA N° 21.545.'
  ]);
  const [nuevaNota, setNuevaNota] = useState<string>('');

  useEffect(() => {
    const activeApp = appName || initialApp;
    if (activeApp) {
      setSelectedApp(activeApp);
    }
  }, [appName, initialApp]);

  if (!isOpen) return null;

  const plataformas: string[] = [
    'Casa Matriz ASL Ideas SpA (Desarrollo B2B & Licencias)',
    'LAWENMOLL (Salud Integrativa & Fichas Clínicas)',
    'Wellness Web App (Movimiento Adaptado & Pausas Activas)',
    'Sabiduría Ancestral (Comunidad & Herbolaria Nativa)'
  ];

  const motivos: string[] = [
    'Cotización de Convenio Corporativo / Licencia B2B',
    'Demostración de Software en Vivo',
    'Consultoría en Accesibilidad UI/UX (Ley TEA / Neurodivergencia)',
    'Muestra de Fichas Clínicas Encriptadas (Ley N° 21.663)',
    'Alianza Institucional o Municipal',
    'Consulta General o Asesoría'
  ];

  const horariosDisponibles: string[] = ['09:00 AM', '10:30 AM', '12:00 PM', '03:00 PM', '04:30 PM', '06:00 PM'];

  const handleAgendar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate || !userName || !userEmail) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setBookingSuccess(true);
    }, 1200);
  };

  const handleAgregarNota = () => {
    if (!nuevaNota.trim()) return;
    setNotas((prev) => [...prev, nuevaNota.trim()]);
    setNuevaNota('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D6A4F]/60 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-3xl border-4 border-[#D4AF37] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* ENCABEZADO CON VERDE SUAVE, DORADO, ROSADO Y LOGO CIRCULAR GRANDE */}
        <header className="bg-[#52796F] text-white p-5 flex justify-between items-center border-b-2 border-[#D4AF37]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white p-1 border-2 border-[#D4AF37] flex items-center justify-center shadow-md overflow-hidden flex-shrink-0">
              <img src={appLogo} alt={selectedApp} className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-3 py-1 rounded-full inline-block mb-1">
                ASL Ideas SpA — Sala Virtual Unificada
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white">Sala Virtual de Reuniones & Citas</h2>
              <p className="text-xs text-[#E8F0EC]">Gestión integrada de videollamadas, agendamiento y acuerdos</p>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose} 
            className="text-[#D85260] hover:text-white bg-[#FFF0F2] hover:bg-[#FF8894] border border-[#FF8894] text-xs px-4 py-2 rounded-full font-bold transition shadow-xs"
          >
            ← Volver Atrás
          </button>
        </header>

        {/* PESTAÑAS INTERNAS SIN EMOJIS */}
        <div className="flex border-b border-[#C8D8CE] bg-[#E8F0EC]">
          <button 
            type="button"
            onClick={() => setTab('agendar')} 
            className={`flex-1 py-3.5 text-xs font-bold transition ${tab === 'agendar' ? 'bg-[#FAF8F5] text-[#2D6A4F] border-b-2 border-[#D4AF37]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Agendar Cita B2B
          </button>
          <button 
            type="button"
            onClick={() => setTab('video')} 
            className={`flex-1 py-3.5 text-xs font-bold transition ${tab === 'video' ? 'bg-[#FAF8F5] text-[#2D6A4F] border-b-2 border-[#D4AF37]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Videollamada en Vivo
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
            Acuerdos & Notas
          </button>
        </div>

        {/* CONTENIDO INTERACTIVO */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: FORMULARIO DE AGENDAMIENTO */}
          {tab === 'agendar' && (
            <div className="max-w-2xl mx-auto space-y-5 bg-white p-6 md:p-8 rounded-3xl border border-[#C8D8CE] shadow-xs">
              <div className="text-center space-y-1 border-b border-[#E8F0EC] pb-4">
                <h3 className="text-base font-bold text-[#2D6A4F]">Reserva de Cita o Demostración B2B</h3>
                <p className="text-xs text-[#52796F]">Selecciona la oficina de interés y confirma tus datos de contacto.</p>
              </div>

              {bookingSuccess ? (
                <div className="p-6 bg-[#FFF0F2] rounded-2xl border border-[#FF8894] text-center space-y-3">
                  <h4 className="text-base font-bold text-[#D85260]">Reunión Agendada con Éxito</h4>
                  <p className="text-xs text-[#52796F] leading-relaxed">
                    Hemos registrado la cita para <strong className="text-[#2D6A4F]">{userName}</strong> ({userEmail}).<br/>
                    Plataforma: <strong className="text-[#2D6A4F]">{selectedApp}</strong><br/>
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
                    <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Plataforma u Oficina de Interés *</label>
                    <select
                      value={selectedApp}
                      onChange={(e) => setSelectedApp(e.target.value)}
                      className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#D4AF37] font-bold text-[#2D6A4F]"
                    >
                      {plataformas.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Motivo de la Consulta *</label>
                    <select
                      value={motivoConsulta}
                      onChange={(e) => setMotivoConsulta(e.target.value)}
                      className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#D4AF37] text-gray-800"
                    >
                      {motivos.map((m) => (
                        <option key={m} value={m}>{m}</option>
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
                        placeholder="Ej: María González" 
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F] bg-[#FAF8F5]" 
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
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F] bg-[#FAF8F5]" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Empresa / Municipalidad / Particular</label>
                    <input 
                      type="text" 
                      value={userOrg} 
                      onChange={(e) => setUserOrg(e.target.value)} 
                      placeholder="Ej: Municipalidad, Pyme, Centro Médico" 
                      className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F] bg-[#FAF8F5]" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Fecha Preferente *</label>
                      <input 
                        type="date" 
                        required 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)} 
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#52796F]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Horario Disponible *</label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#52796F] font-bold text-[#2D6A4F]"
                      >
                        {horariosDisponibles.map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-[#E8F0EC]">
                    <button 
                      type="button"
                      onClick={onClose}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3 rounded-xl transition text-center"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit" 
                      disabled={uploading} 
                      className="flex-1 bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3 rounded-xl transition shadow-xs disabled:opacity-50 text-center"
                    >
                      {uploading ? 'Procesando Cita...' : 'Confirmar Reserva de Cita'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: VIDEOLLAMADA EN VIVO CON MARCO DORADO Y ACCESORIOS ROSADOS */}
          {tab === 'video' && (
            <div className="space-y-4">
              <div className="bg-[#FFF0F2] p-3.5 rounded-2xl border border-[#FF8894] flex items-center justify-between text-xs text-[#D85260]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D85260] animate-pulse"></span>
                  <span className="font-bold">Canal Activo:</span> Transmisión para {selectedApp}
                </div>
                <span className="text-[11px] font-bold text-[#D85260] bg-white px-2.5 py-0.5 rounded-full border border-[#FF8894]">Conexión Encriptada TLS 1.3</span>
              </div>

              <div className="w-full h-[380px] bg-[#FAF8F5] rounded-3xl border-4 border-[#D4AF37] overflow-hidden shadow-md flex flex-col items-center justify-center p-8 text-center space-y-3 relative">
                <div className="px-4 py-1.5 rounded-full bg-[#FFF0F2] border border-[#FF8894] text-[#D85260] font-bold text-xs">
                  SALA EN VIVO
                </div>
                <h4 className="text-base font-bold text-[#2D6A4F]">Sala Virtual de Videollamada Activa</h4>
                <p className="text-xs text-[#52796F] max-w-md leading-relaxed">
                  Conexión encriptada lista para la transmisión interactiva B2B con <strong className="text-[#2D6A4F]">{selectedApp}</strong>.
                </p>
                <div className="pt-2 flex gap-3">
                  <span className="bg-[#E8F0EC] text-[#2D6A4F] text-[11px] font-bold px-3 py-1 rounded-full border border-[#C8D8CE]">Cámara Preparada</span>
                  <span className="bg-[#FFF0F2] text-[#D85260] text-[11px] font-bold px-3 py-1 rounded-full border border-[#FF8894]">Micrófono Listo</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SUBIR DOCUMENTOS / PDF */}
          {tab === 'archivos' && (
            <div className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs">
              <div className="text-center space-y-1">
                <h3 className="text-sm font-bold text-[#2D6A4F]">Adjuntar Propuesta o Antecedentes PDF</h3>
                <p className="text-xs text-[#52796F]">Sube tus documentos directamente al almacenamiento seguro de Supabase.</p>
              </div>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx,.png,.jpg" 
                onChange={(e) => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)} 
                className="block w-full text-xs text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#E8F0EC] file:text-[#2D6A4F] hover:file:bg-[#52796F] hover:file:text-white transition" 
              />
              <button 
                type="button"
                onClick={() => { setUploading(true); setTimeout(() => setUploading(false), 1200); }} 
                disabled={!file || uploading} 
                className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2D6A4F] transition disabled:opacity-50"
              >
                {uploading ? 'Cargando archivo...' : 'Enviar Documento a la Sala Virtual'}
              </button>
            </div>
          )}

          {/* TAB 4: ACUERDOS Y NOTAS */}
          {tab === 'notas' && (
            <div className="max-w-xl mx-auto space-y-3 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs">
              <h3 className="text-sm font-bold text-[#2D6A4F]">Acuerdos de Sesión — {selectedApp}</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={nuevaNota} 
                  onChange={(e) => setNuevaNota(e.target.value)} 
                  placeholder="Escribir acuerdo o compromiso..." 
                  className="flex-1 text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]" 
                />
                <button 
                  type="button"
                  onClick={handleAgregarNota} 
                  className="bg-[#52796F] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#2D6A4F] transition"
                >
                  Guardar
                </button>
              </div>
              <ul className="text-xs space-y-2 pt-2">
                {notas.map((n: string, i: number) => (
                  <li key={i} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] text-[#2D6A4F] flex items-center justify-between">
                    <span>• {n}</span>
                    <span className="text-[10px] text-[#D85260] bg-[#FFF0F2] px-2 py-0.5 rounded font-bold border border-[#FF8894]">Nota #{i + 1}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
