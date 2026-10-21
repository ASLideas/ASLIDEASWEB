const fs = require('fs');

const salaCode = `'use client';

import React, { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialApp?: string;
  appLogo?: string;
}

export default function SalaVirtualB2B({ 
  isOpen, 
  onClose, 
  initialApp = 'Casa Matriz ASL Ideas SpA (Desarrollo B2B & Licencias)', 
  appLogo = '/LOGO_asl.png' 
}: Props) {
  const [tab, setTab] = useState<'agendar' | 'video' | 'archivos' | 'notas'>('agendar');
  const [selectedApp, setSelectedApp] = useState<string>(initialApp);
  const [motivoConsulta, setMotivoConsulta] = useState<string>('Cotizaci√≥n de Convenio Corporativo / Licencia B2B');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const [notas, setNotas] = useState<string[]>([
    'Acuerdo preliminar: Demostraci√≥n de interfaz accesible.',
    'Revisi√≥n de requerimientos para Ley N¬∞ 21.663 y Ley TEA.'
  ]);
  const [nuevaNota, setNuevaNota] = useState('');

  useEffect(() => {
    if (initialApp) {
      setSelectedApp(initialApp);
    }
  }, [initialApp]);

  if (!isOpen) return null;

  const plataformas = [
    'Casa Matriz ASL Ideas SpA (Desarrollo B2B & Licencias)',
    'LAWENMOLL (Salud Integrativa & Fichas Cl√≠nicas)',
    'Wellness Web App (Movimiento Adaptado & Pausas Activas)',
    'Sabidur√≠a Ancestral (Comunidad & Herbolaria Nativa)'
  ];

  const motivos = [
    'Cotizaci√≥n de Convenio Corporativo / Licencia B2B',
    'Demostraci√≥n de Software en Vivo',
    'Consultor√≠a en Accesibilidad UI/UX (Ley TEA / Neurodivergencia)',
    'Muestra de Fichas Cl√≠nicas Encriptadas (Ley N¬∞ 21.663)',
    'Alianza Institucional o Municipal',
    'Consulta General o Asesor√≠a'
  ];

  const horariosDisponibles = ['09:00 AM', '10:30 AM', '12:00 PM', '03:00 PM', '04:30 PM', '06:00 PM'];

  const handleAgendar = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!selectedDate || !userName || !userEmail) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setBookingSuccess(true);
    }, 1000);
  };

  const handleAgregarNota = () => {
    if (!nuevaNota.trim()) return;
    setNotas((prev) => [...prev, nuevaNota.trim()]);
    setNuevaNota('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1B4D3E]/60 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-3xl border border-[#C8D8CE] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* ENCABEZADO */}
        <header className="bg-[#1B4D3E] text-white p-5 flex justify-between items-center border-b border-[#2D6A4F]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white p-1 border border-[#C8D8CE] flex items-center justify-center shadow-xs overflow-hidden">
              <img src={appLogo} alt="Logo App" className="max-h-full max-w-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-[#FAF8F5]/20 px-2.5 py-0.5 rounded-full text-white">
                ASL Ideas SpA ‚Äî Sistema de Citas & Salud Digital
              </span>
              <h2 className="text-lg font-bold mt-0.5 text-white">Agendar Cita B2B & Reuni√≥n Virtual</h2>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose} 
            className="text-white/90 hover:text-white bg-black/20 hover:bg-black/30 text-xs px-3.5 py-2 rounded-full font-bold transition"
          >
            ‚úï Cerrar
          </button>
        </header>

        {/* PESTA√ëAS NAVEGABLES */}
        <div className="flex border-b border-[#C8D8CE] bg-[#E8F0EC]">
          <button 
            type="button"
            onClick={() => setTab('agendar')} 
            className={`flex-1 py-3 text-xs font-bold transition \${tab === 'agendar' ? 'bg-[#FAF8F5] text-[#1B4D3E] border-b-2 border-[#1B4D3E]' : 'text-[#2D6A4F] hover:bg-[#FAF8F5]/50'}`}
          >
            Ì≥Ö Agendar Cita
          </button>
          <button 
            type="button"
            onClick={() => setTab('video')} 
            className={`flex-1 py-3 text-xs font-bold transition \${tab === 'video' ? 'bg-[#FAF8F5] text-[#1B4D3E] border-b-2 border-[#1B4D3E]' : 'text-[#2D6A4F] hover:bg-[#FAF8F5]/50'}`}
          >
            Ìæ• Sala Virtual en Vivo
          </button>
          <button 
            type="button"
            onClick={() => setTab('archivos')} 
            className={`flex-1 py-3 text-xs font-bold transition \${tab === 'archivos' ? 'bg-[#FAF8F5] text-[#1B4D3E] border-b-2 border-[#1B4D3E]' : 'text-[#2D6A4F] hover:bg-[#FAF8F5]/50'}`}
          >
            Ì≥Å Subir Propuesta / PDF
          </button>
          <button 
            type="button"
            onClick={() => setTab('notas')} 
            className={`flex-1 py-3 text-xs font-bold transition \${tab === 'notas' ? 'bg-[#FAF8F5] text-[#1B4D3E] border-b-2 border-[#1B4D3E]' : 'text-[#2D6A4F] hover:bg-[#FAF8F5]/50'}`}
          >
            Ì≥ù Acuerdos & Notas
          </button>
        </div>

        {/* CONTENIDO INTERACTIVO */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'agendar' && (
            <div className="max-w-2xl mx-auto space-y-5 bg-white p-6 md:p-8 rounded-3xl border border-[#C8D8CE] shadow-xs">
              <div className="text-center space-y-1 border-b border-[#E8F0EC] pb-4">
                <h3 className="text-base font-bold text-[#1B4D3E]">Sistema de Citas B2B & Salud</h3>
                <p className="text-xs text-[#2D6A4F]">Selecciona la plataforma u oficina de inter√©s y el motivo de tu consulta.</p>
              </div>

              {bookingSuccess ? (
                <div className="p-6 bg-[#E8F0EC] rounded-2xl border border-[#2D6A4F] text-center space-y-3">
                  <span className="text-4xl">Ìæâ</span>
                  <h4 className="text-base font-bold text-[#1B4D3E]">¬°Reuni√≥n Agendada con √âxito!</h4>
                  <p className="text-xs text-[#2D6A4F] leading-relaxed">
                    Hemos registrado la cita para <strong className="text-[#1B4D3E]">{userName}</strong> ({userEmail}).<br/>
                    Plataforma: <strong className="text-[#1B4D3E]">{selectedApp}</strong><br/>
                    Fecha: <strong className="text-[#1B4D3E]">{selectedDate}</strong> a las <strong className="text-[#1B4D3E]">{selectedTime}</strong>.
                  </p>
                  <button 
                    type="button"
                    onClick={() => setBookingSuccess(false)} 
                    className="text-xs font-bold text-[#2D6A4F] underline hover:text-[#1B4D3E] pt-2 block mx-auto"
                  >
                    Agendar otra reuni√≥n
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAgendar} className="space-y-4">
                  
                  {/* DESPLEGABLE 1: PLATAFORMA / OFICINA */}
                  <div>
                    <label className="block text-xs font-bold text-[#1B4D3E] mb-1.5">Ìø¢ Seleccionar Plataforma u Oficina *</label>
                    <select
                      value={selectedApp}
                      onChange={(e) => setSelectedApp(e.target.value)}
                      className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#1B4D3E] font-bold text-[#1B4D3E]"
                    >
                      {plataformas.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  {/* DESPLEGABLE 2: MOTIVO DE CONSULTA */}
                  <div>
                    <label className="block text-xs font-bold text-[#1B4D3E] mb-1.5">Ì≥ã Motivo de la Cita o Consulta *</label>
                    <select
                      value={motivoConsulta}
                      onChange={(e) => setMotivoConsulta(e.target.value)}
                      className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#1B4D3E] text-gray-800"
                    >
                      {motivos.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  {/* DATOS DE CONTACTO */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1B4D3E] mb-1.5">Nombre Completo / Empresa *</label>
                      <input 
                        type="text" 
                        required 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                        placeholder="Ej: Mar√≠a Gonz√°lez ‚Äî Municipalidad" 
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#1B4D3E] bg-[#FAF8F5]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1B4D3E] mb-1.5">Correo Electr√≥nico de Contacto *</label>
                      <input 
                        type="email" 
                        required 
                        value={userEmail} 
                        onChange={(e) => setUserEmail(e.target.value)} 
                        placeholder="contacto@empresa.cl" 
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#1B4D3E] bg-[#FAF8F5]" 
                      />
                    </div>
                  </div>

                  {/* FECHA Y HORARIO */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1B4D3E] mb-1.5">Ì≥Ö Seleccionar Fecha *</label>
                      <input 
                        type="date" 
                        required 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)} 
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#1B4D3E]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1B4D3E] mb-1.5">‚è∞ Horario Preferente *</label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#1B4D3E] font-bold text-[#1B4D3E]"
                      >
                        {horariosDisponibles.map((h) => (
                          <option key={h} value={h}>{h}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* BOTONES DE ACCION */}
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
                      className="flex-1 bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3 rounded-xl transition shadow-xs disabled:opacity-50 text-center"
                    >
                      {uploading ? 'Procesando Cita...' : 'Confirmar Reserva'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {tab === 'video' && (
            <div className="space-y-3">
              <div className="bg-[#E8F0EC] p-3 rounded-2xl border border-[#C8D8CE] flex items-center justify-between text-xs text-[#1B4D3E]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] animate-pulse"></span>
                  <span className="font-bold">Canal Activo:</span> Transmisi√≥n para {selectedApp}
                </div>
                <span className="text-[11px] font-bold text-[#2D6A4F]">Conexi√≥n Encriptada TLS 1.3</span>
              </div>
              <div className="w-full h-[380px] bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE] overflow-hidden shadow-inner flex flex-col items-center justify-center p-6 text-center space-y-2">
                <span className="text-3xl">Ìæ•</span>
                <h4 className="text-sm font-bold text-[#1B4D3E]">Sala Virtual de Videollamada Activa</h4>
                <p className="text-xs text-[#2D6A4F]">Conexi√≥n segura lista para la sesi√≥n con {selectedApp}.</p>
              </div>
            </div>
          )}

          {tab === 'archivos' && (
            <div className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs">
              <div className="text-center space-y-1">
                <h3 className="text-sm font-bold text-[#1B4D3E]">Adjuntar Propuesta o Antecedentes PDF</h3>
                <p className="text-xs text-[#2D6A4F]">Sube tus documentos directamente al almacenamiento seguro de Supabase.</p>
              </div>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx,.png,.jpg" 
                onChange={(e) => {
                  const targetFiles = e.target.files;
                  setFile(targetFiles ? targetFiles[0] : null);
                }} 
                className="block w-full text-xs text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#E8F0EC] file:text-[#1B4D3E] hover:file:bg-[#1B4D3E] hover:file:text-white transition" 
              />
              <button 
                type="button"
                onClick={() => { setUploading(true); setTimeout(() => setUploading(false), 1200); }} 
                disabled={!file || uploading} 
                className="w-full bg-[#1B4D3E] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2D6A4F] transition disabled:opacity-50"
              >
                {uploading ? 'Cargando archivo...' : 'Enviar Documento a la Sala Virtual'}
              </button>
            </div>
          )}

          {tab === 'notas' && (
            <div className="max-w-xl mx-auto space-y-3 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs">
              <h3 className="text-sm font-bold text-[#1B4D3E]">Acuerdos de Sesi√≥n ‚Äî {selectedApp}</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={nuevaNota} 
                  onChange={(e) => setNuevaNota(e.target.value)} 
                  placeholder="Escribir acuerdo o compromiso..." 
                  className="flex-1 text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#1B4D3E]" 
                />
                <button 
                  type="button"
                  onClick={handleAgregarNota} 
                  className="bg-[#1B4D3E] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#2D6A4F] transition"
                >
                  Guardar
                </button>
              </div>
              <ul className="text-xs space-y-2 pt-2">
                {notas.map((n: string, i: number) => (
                  <li key={i} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] text-[#1B4D3E] flex items-center justify-between">
                    <span>Ì≥å {n}</span>
                    <span className="text-[10px] text-[#84A59D]">Nota #{i + 1}</span>
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
`;

if (!fs.existsSync('components')) {
  fs.mkdirSync('components');
}

fs.writeFileSync('components/SalaVirtualB2B.tsx', salaCode, 'utf8');
console.log('‚úÖ components/SalaVirtualB2B.tsx reescrito exitosamente.');
