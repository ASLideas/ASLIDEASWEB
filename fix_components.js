const fs = require('fs');

const salaCode = `'use client';

import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  appName?: string;
  appLogo?: string;
}

export default function SalaVirtualB2B({ 
  isOpen, 
  onClose, 
  appName = 'Casa Matriz B2B', 
  appLogo = '/LOGO_asl.png' 
}: Props) {
  const [tab, setTab] = useState<'video' | 'agendar' | 'archivos' | 'notas'>('video');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('10:30');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userOrg, setUserOrg] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const [notas, setNotas] = useState<string[]>([
    'Acuerdo preliminar: Demostraci√≥n de interfaz accesible.',
    'Revisi√≥n de requerimientos para Ley N¬∞ 21.663 y Ley TEA.'
  ]);
  const [nuevaNota, setNuevaNota] = useState('');

  if (!isOpen) return null;

  const horariosDisponibles = ['09:00', '10:30', '12:00', '15:00', '16:30', '18:00'];

  const handleAgendar = (e: React.FormEvent) => {
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
    setNotas([...notas, nuevaNota.trim()]);
    setNuevaNota('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2C4A3E]/60 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-3xl border border-[#C8D8CE] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* Encabezado Corporativo Verde Salvia */}
        <header className="bg-[#52796F] text-white p-5 flex justify-between items-center border-b border-[#84A59D] relative overflow-hidden">
          <div className="flex items-center gap-3.5 z-10">
            <div className="w-12 h-12 rounded-2xl bg-white p-1 border border-[#84A59D] flex items-center justify-center shadow-sm overflow-hidden">
              <img src={appLogo} alt={appName} className="max-h-full max-w-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-[#FAF8F5]/20 px-2.5 py-0.5 rounded-full text-white">
                ASL Ideas SpA ‚Äî {appName}
              </span>
              <h2 className="text-lg font-bold mt-0.5 text-white">Sala Virtual & Agendamiento de Reuni√≥n</h2>
              <p className="text-xs text-[#E8F0EC]">
                Videollamada en vivo, calendario de citas y gestor de acuerdos.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="text-white/90 hover:text-white bg-black/20 hover:bg-black/30 text-xs px-3.5 py-2 rounded-full font-bold transition"
          >
            ‚úï Cerrar
          </button>
        </header>

        {/* Pesta√±as de la Sala Virtual */}
        <div className="flex border-b border-[#C8D8CE] bg-[#E8F0EC]">
          <button 
            onClick={() => setTab('video')} 
            className={\`flex-1 py-3 text-xs font-bold transition \${tab === 'video' ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}\`}
          >
            Ìæ• Videollamada
          </button>
          <button 
            onClick={() => setTab('agendar')} 
            className={\`flex-1 py-3 text-xs font-bold transition \${tab === 'agendar' ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}\`}
          >
            Ì≥Ö Calendario & Agendar Hora
          </button>
          <button 
            onClick={() => setTab('archivos')} 
            className={\`flex-1 py-3 text-xs font-bold transition \${tab === 'archivos' ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}\`}
          >
            Ì≥Å Subir Documento / PDF
          </button>
          <button 
            onClick={() => setTab('notas')} 
            className={\`flex-1 py-3 text-xs font-bold transition \${tab === 'notas' ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}\`}
          >
            Ì≥ù Notas de Sesi√≥n
          </button>
        </div>

        {/* Contenido de cada pesta√±a */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'video' && (
            <div className="space-y-3">
              <div className="bg-[#E8F0EC] p-3 rounded-2xl border border-[#84A59D]/40 flex items-center justify-between text-xs text-[#2C4A3E]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#84A59D] animate-pulse"></span>
                  <span className="font-bold">Canal Activo:</span> Sala Virtual para {appName}
                </div>
                <span className="text-[11px] font-bold text-[#52796F]">Conexi√≥n Encriptada</span>
              </div>
              <div className="w-full h-[380px] bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE] overflow-hidden shadow-inner">
                <iframe 
                  src="[suspicious link removed]" 
                  className="w-full h-full border-0" 
                  title="Sala Virtual ASL Ideas SpA" 
                  allow="camera; microphone; display-capture; autoplay"
                />
              </div>
            </div>
          )}

          {tab === 'agendar' && (
            <div className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-sm">
              <div className="text-center space-y-1">
                <h3 className="text-sm font-bold text-[#2C4A3E]">Agendar Hora de Reuni√≥n ‚Äî {appName}</h3>
                <p className="text-xs text-[#52796F]">Selecciona la fecha y la hora para coordinar la videollamada.</p>
              </div>

              {bookingSuccess ? (
                <div className="p-5 bg-[#E8F0EC] rounded-2xl border border-[#84A59D] text-center space-y-2">
                  <span className="text-3xl">Ìæâ</span>
                  <h4 className="text-sm font-bold text-[#2C4A3E]">¬°Reuni√≥n Agendada con √âxito!</h4>
                  <p className="text-xs text-[#52796F]">
                    Confirmaci√≥n enviada a <strong className="text-[#2C4A3E]">{userEmail}</strong> para la fecha <strong className="text-[#2C4A3E]">{selectedDate}</strong> a las <strong className="text-[#2C4A3E]">{selectedTime} hrs</strong>.
                  </p>
                  <button 
                    onClick={() => setBookingSuccess(false)} 
                    className="text-xs font-bold text-[#52796F] underline hover:text-[#2C4A3E] pt-2 block mx-auto"
                  >
                    Agendar otra cita
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAgendar} className="space-y-3.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2C4A3E] mb-1">Nombre Completo *</label>
                      <input 
                        type="text" 
                        required 
                        value={userName} 
                        onChange={(e) => setUserName([enlace sospechoso eliminado].value)} 
                        placeholder="Ej: Mar√≠a Gonz√°lez" 
                        className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2C4A3E] mb-1">Correo Electr√≥nico *</label>
                      <input 
                        type="email" 
                        required 
                        value={userEmail} 
                        onChange={(e) => setUserEmail([enlace sospechoso eliminado].value)} 
                        placeholder="ejemplo@correo.cl" 
                        className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2C4A3E] mb-1">Instituci√≥n / Empresa / Particular</label>
                    <input 
                      type="text" 
                      value={userOrg} 
                      onChange={(e) => setUserOrg([enlace sospechoso eliminado].value)} 
                      placeholder="Ej: Municipalidad, Empresa, Consulta Personal" 
                      className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2C4A3E] mb-1">Ì≥Ö Seleccionar Fecha *</label>
                      <input 
                        type="date" 
                        required 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate([enlace sospechoso eliminado].value)} 
                        className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#52796F]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2C4A3E] mb-1">‚è∞ Seleccionar Hora *</label>
                      <div className="grid grid-cols-3 gap-1">
                        {[enlace sospechoso eliminado]((hora) => (
                          <button
                            key={hora}
                            type="button"
                            onClick={() => setSelectedTime(hora)}
                            className={\`py-2 text-[11px] font-bold rounded-lg border transition \${
                              selectedTime === hora
                                ? 'bg-[#52796F] text-white border-[#52796F]'
                                : 'bg-[#FAF8F5] text-[#2C4A3E] border-[#C8D8CE] hover:bg-[#E8F0EC]'
                            }\`}
                          >
                            {hora}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={uploading} 
                    className="w-full bg-[#52796F] text-white text-xs font-bold py-3 rounded-xl hover:bg-[#2C4A3E] transition shadow-xs disabled:opacity-50 mt-2"
                  >
                    {uploading ? 'Confirmando Cita...' : 'Confirmar y Reservar Hora de Reuni√≥n'}
                  </button>
                </form>
              )}
            </div>
          )}

          {tab === 'archivos' && (
            <div className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-sm">
              <div className="text-center space-y-1">
                <h3 className="text-sm font-bold text-[#2C4A3E]">Adjuntar Propuesta o Antecedentes PDF</h3>
                <p className="text-xs text-[#52796F]">Sube tus documentos al almacenamiento seguro de Supabase.</p>
              </div>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx,.png,.jpg" 
                onChange={(e) => setFile([enlace sospechoso eliminado].files?.[0] || null)} 
                className="block w-full text-xs text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#E8F0EC] file:text-[#52796F] hover:file:bg-[#52796F] hover:file:text-white transition" 
              />
              <button 
                onClick={() => { setUploading(true); setTimeout(() => setUploading(false), 1200); }} 
                disabled={!file || uploading} 
                className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2C4A3E] transition disabled:opacity-50"
              >
                {uploading ? 'Cargando archivo...' : 'Enviar Documento a la Sala Virtual'}
              </button>
            </div>
          )}

          {tab === 'notas' && (
            <div className="max-w-xl mx-auto space-y-3 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-sm">
              <h3 className="text-sm font-bold text-[#2C4A3E]">Acuerdos de Sesi√≥n ‚Äî {appName}</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={nuevaNota} 
                  onChange={(e) => setNuevaNota([enlace sospechoso eliminado].value)} 
                  placeholder="Escribir acuerdo o compromiso..." 
                  className="flex-1 text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]" 
                />
                <button onClick={handleAgregarNota} className="bg-[#52796F] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#2C4A3E] transition">
                  Guardar
                </button>
              </div>
              <ul className="text-xs space-y-2 pt-2">
                {[enlace sospechoso eliminado]((n, i) => (
                  <li key={i} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] text-[#2C4A3E] flex items-center justify-between">
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
console.log('‚úÖ components/SalaVirtualB2B.tsx reescrito exitosamente con Node.js en UTF-8!');
