'use client';

import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  appName?: string;
  appLogo?: string;
}

export default function SalaVirtualB2B({ isOpen, onClose, appName = 'Casa Matriz B2B', appLogo = '/LOGO_asl.png' }: Props) {
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
    'Acuerdo preliminar: Demostraci√≥n de interfaz accesible para neurodivergencias.',
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
    <div className="fixed inset-0 z-50 bg-[#2C4A3E]/50 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
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
              <h2 className="text-lg font-bold mt-0.5 text-white">Sala Virtual Corporativa & Agendamiento</h2>
              <p className="text-xs text-[#E8F0EC]">
                Videollamada B2B, calendario interactivo de citas y gestor de acuerdos.
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-white/90 hover:text-white bg-black/20 hover:bg-black/30 text-xs px-3.5 py-2 rounded-full font-bold transition">
            ‚úï Cerrar
          </button>
        </header>

        {/* Pesta√±as */}
        <div className="flex border-b border-[#C8D8CE] bg-[#E8F0EC]">
          <button onClick={() => setTab('video')} className={`flex-1 py-3 text-xs font-bold transition ${tab === 'video' ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]' : 'text-[#52796F]'}`}>
            Ìæ• Videollamada
          </button>
          <button onClick={() => setTab('agendar')} className={`flex-1 py-3 text-xs font-bold transition ${tab === 'agendar' ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]' : 'text-[#52796F]'}`}>
            Ì≥Ö Calendario & Horarios
          </button>
          <button onClick={() => setTab('archivos')} className={`flex-1 py-3 text-xs font-bold transition ${tab === 'archivos' ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]' : 'text-[#52796F]'}`}>
            Ì≥Å Subir Propuesta (PDF)
          </button>
          <button onClick={() => setTab('notas')} className={`flex-1 py-3 text-xs font-bold transition ${tab === 'notas' ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]' : 'text-[#52796F]'}`}>
            Ì≥ù Notas de Sesi√≥n
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'video' && (
            <div className="w-full h-[380px] bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE] overflow-hidden">
              <iframe src="[suspicious link removed]" className="w-full h-full border-0" title="Sala Virtual" />
            </div>
          )}

          {tab === 'agendar' && (
            <div className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded-3xl border border-[#C8D8CE]">
              <h3 className="text-sm font-bold text-[#2C4A3E] text-center">Agendar Videollamada / Demostraci√≥n</h3>
              {bookingSuccess ? (
                <div className="p-4 bg-[#E8F0EC] rounded-2xl text-center text-xs font-bold text-[#52796F]">
                  Ìæâ ¬°Reuni√≥n agendada para el {selectedDate} a las {selectedTime} hrs!
                </div>
              ) : (
                <form onSubmit={handleAgendar} className="space-y-3">
                  <input type="text" required value={userName} onChange={(e) => setUserName([enlace sospechoso eliminado].value)} placeholder="Nombre Completo *" className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl" />
                  <input type="email" required value={userEmail} onChange={(e) => setUserEmail([enlace sospechoso eliminado].value)} placeholder="Correo Electr√≥nico *" className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl" />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold mb-1">Ì≥Ö Fecha</label>
                      <input type="date" required value={selectedDate} onChange={(e) => setSelectedDate([enlace sospechoso eliminado].value)} className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold mb-1">‚è∞ Hora</label>
                      <select value={selectedTime} onChange={(e) => setSelectedTime([enlace sospechoso eliminado].value)} className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl bg-white">
                        {[enlace sospechoso eliminado](h => <option key={h} value={h}>{h} hrs</option>)}
                      </select>
                    </div>
                  </div>
                  <button type="submit" disabled={uploading} className="w-full bg-[#52796F] text-white text-xs font-bold py-3 rounded-xl hover:bg-[#2C4A3E]">
                    {uploading ? 'Guardando...' : 'Confirmar Reserva'}
                  </button>
                </form>
              )}
            </div>
          )}

          {tab === 'archivos' && (
            <div className="max-w-xl mx-auto space-y-3 bg-white p-6 rounded-3xl border border-[#C8D8CE]">
              <h3 className="text-sm font-bold text-[#2C4A3E] text-center">Subir Propuesta PDF (Supabase)</h3>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile([enlace sospechoso eliminado].files?.[0] || null)} className="block w-full text-xs text-gray-600" />
              <button onClick={() => { setUploading(true); setTimeout(() => setUploading(false), 1000); }} disabled={!file || uploading} className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl">
                {uploading ? 'Enviando...' : 'Subir a bucket "documentos-peticiones"'}
              </button>
            </div>
          )}

          {tab === 'notas' && (
            <div className="max-w-xl mx-auto space-y-3 bg-white p-6 rounded-3xl border border-[#C8D8CE]">
              <h3 className="text-sm font-bold text-[#2C4A3E]">Acuerdos de Sesi√≥n</h3>
              <div className="flex gap-2">
                <input type="text" value={nuevaNota} onChange={(e) => setNuevaNota([enlace sospechoso eliminado].value)} placeholder="Escribir nota..." className="flex-1 text-xs p-2 border border-[#C8D8CE] rounded-xl" />
                <button onClick={handleAgregarNota} className="bg-[#52796F] text-white text-xs font-bold px-3 py-2 rounded-xl">Guardar</button>
              </div>
              <ul className="text-xs space-y-1 text-[#2C4A3E]">
                {[enlace sospechoso eliminado]((n, i) => <li key={i} className="p-2 bg-[#FAF8F5] rounded-lg border border-[#C8D8CE]">Ì≥å {n}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
