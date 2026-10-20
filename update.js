const fs = require('fs');

if (!fs.existsSync('components')) {
  fs.mkdirSync('components');
}

const salaVirtualCode = `'use client';

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
        
        {/* Encabezado Corporativo Verde Salvia con Tri√°ngulos e Isotipo */}
        <header className="bg-[#52796F] text-white p-5 flex justify-between items-center border-b border-[#84A59D] relative overflow-hidden">
          <div className="absolute right-10 top-0 opacity-20 pointer-events-none">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <polygon points="50,10 90,90 10,90" fill="#FAF8F5" />
              <polygon points="30,30 70,70 10,70" fill="#84A59D" />
            </svg>
          </div>

          <div className="flex items-center gap-3.5 z-10">
            <div className="w-12 h-12 rounded-2xl bg-white p-1 border border-[#84A59D] flex items-center justify-center shadow-sm overflow-hidden">
              <img
                src={appLogo}
                alt={appName}
                className="max-h-full max-w-full object-contain"
                onError={(e) => { ([enlace sospechoso eliminado] as HTMLElement).style.display = 'none'; }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider uppercase bg-[#FAF8F5]/20 px-2.5 py-0.5 rounded-full text-white">
                  ASL Ideas SpA ‚Äî {appName}
                </span>
              </div>
              <h2 className="text-lg font-bold mt-0.5 text-white">Sala Virtual Corporativa & Agendamiento</h2>
              <p className="text-xs text-[#E8F0EC]">
                Videollamada B2B, calendario interactivo de citas y gestor de acuerdos en Supabase.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/90 hover:text-white bg-black/20 hover:bg-black/30 text-xs px-3.5 py-2 rounded-full font-bold transition z-10"
          >
            ‚úï Cerrar
          </button>
        </header>

        {/* Pesta√±as de Navegaci√≥n */}
        <div className="flex border-b border-[#C8D8CE] bg-[#E8F0EC]">
          <button
            onClick={() => setTab('video')}
            className={\`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 \${
              tab === 'video'
                ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]'
                : 'text-[#52796F] hover:bg-[#FAF8F5]/50'
            }\`}
          >
            Ìæ• Videollamada en Vivo
          </button>
          <button
            onClick={() => setTab('agendar')}
            className={\`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 \${
              tab === 'agendar'
                ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]'
                : 'text-[#52796F] hover:bg-[#FAF8F5]/50'
            }\`}
          >
            Ì≥Ö Calendario & Horarios
          </button>
          <button
            onClick={() => setTab('archivos')}
            className={\`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 \${
              tab === 'archivos'
                ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]'
                : 'text-[#52796F] hover:bg-[#FAF8F5]/50'
            }\`}
          >
            Ì≥Å Subir Propuesta (PDF)
          </button>
          <button
            onClick={() => setTab('notas')}
            className={\`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 \${
              tab === 'notas'
                ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]'
                : 'text-[#52796F] hover:bg-[#FAF8F5]/50'
            }\`}
          >
            Ì≥ù Notas de Sesi√≥n
          </button>
        </div>

        {/* Contenido Din√°mico */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'video' && (
            <div className="space-y-4">
              <div className="bg-[#E8F0EC] p-3 rounded-2xl border border-[#84A59D]/40 flex items-center justify-between text-xs text-[#2C4A3E]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#84A59D] animate-pulse"></span>
                  <span className="font-bold">Estado:</span> Canal Encriptado Listo para {appName}
                </div>
                <span className="text-[11px] font-bold text-[#52796F]">Garant√≠a de Baja Sobrecarga Sensorial</span>
              </div>

              <div className="w-full h-[380px] bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE] overflow-hidden shadow-inner relative flex items-center justify-center">
                <iframe
                  src="[suspicious link removed]"
                  allow="camera; microphone; display-capture; autoplay; clipboard-write"
                  className="w-full h-full border-0"
                  title="Sala Virtual ASL Ideas SpA"
                />
              </div>
            </div>
          )}

          {tab === 'agendar' && (
            <div className="max-w-xl mx-auto space-y-5 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-sm">
              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-[#2C4A3E]">Agendar Videollamada B2B / Demostraci√≥n</h3>
                <p className="text-xs text-[#52796F]">
                  Selecciona la fecha y la hora que mejor se adapte a tu agenda para coordinar una reuni√≥n personalizada.
                </p>
              </div>

              {bookingSuccess ? (
                <div className="p-5 bg-[#E8F0EC] rounded-2xl border border-[#84A59D] text-center space-y-3">
                  <span className="text-3xl">Ìæâ</span>
                  <h4 className="text-sm font-bold text-[#2C4A3E]">¬°Reuni√≥n Agendada con √âxito!</h4>
                  <p className="text-xs text-[#52796F]">
                    Te hemos enviado la confirmaci√≥n a <strong className="text-[#2C4A3E]">{userEmail}</strong> para la fecha <strong className="text-[#2C4A3E]">{selectedDate}</strong> a las <strong className="text-[#2C4A3E]">{selectedTime} hrs</strong>.
                  </p>
                  <button
                    onClick={() => setBookingSuccess(false)}
                    className="text-xs font-bold text-[#52796F] underline hover:text-[#2C4A3E]"
                  >
                    Agendar otra reuni√≥n
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAgendar} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        placeholder="ejemplo@institucion.cl"
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
                      placeholder="Ej: Municipalidad, Cl√≠nica, Proyecto Personal"
                      className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]"
                    />
                  </div>

                  {/* Calendario y Selecci√≥n de Fecha */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2C4A3E] mb-1">Ì≥Ö Seleccionar Fecha *</label>
                      <input
                        type="date"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate([enlace sospechoso eliminado].value)}
                        className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F] bg-[#FAF8F5]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2C4A3E] mb-1">‚è∞ Seleccionar Hora *</label>
                      <div className="grid grid-cols-3 gap-1.5">
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
                    className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-3 rounded-xl transition shadow-sm mt-2 disabled:opacity-50"
                  >
                    {uploading ? 'Guardando en Citas Supabase...' : 'Confirmar y Reservar Horario'}
                  </button>
                </form>
              )}
            </div>
          )}

          {tab === 'archivos' && (
            <div className="max-w-xl mx-auto space-y-5 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-sm">
              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-[#2C4A3E]">Adjuntar Propuesta o Documento (Supabase)</h3>
                <p className="text-xs text-[#52796F]">
                  Sube archivos PDF o documentos requeridos al bucket seguro <code className="bg-[#E8F0EC] px-1.5 py-0.5 rounded text-[#2C4A3E]">documentos-peticiones</code>.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  onChange={(e) => setFile([enlace sospechoso eliminado].files?.[0] || null)}
                  className="block w-full text-xs text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#E8F0EC] file:text-[#52796F] hover:file:bg-[#52796F] hover:file:text-white transition"
                />
                <button
                  onClick={() => {
                    if (!file) return;
                    setUploading(true);
                    setTimeout(() => setUploading(false), 1200);
                  }}
                  disabled={!file || uploading}
                  className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition disabled:opacity-50"
                >
                  {uploading ? 'Cargando archivo a Supabase...' : 'Enviar PDF a la Sala Virtual'}
                </button>
              </div>
            </div>
          )}

          {tab === 'notas' && (
            <div className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-sm">
              <h3 className="text-sm font-bold text-[#2C4A3E]">Bloc de Notas y Acuerdos de la Sesi√≥n</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nuevaNota}
                  onChange={(e) => setNuevaNota([enlace sospechoso eliminado].value)}
                  placeholder="Escribir un compromiso o acuerdo B2B..."
                  className="flex-1 text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]"
                />
                <button
                  onClick={handleAgregarNota}
                  className="bg-[#52796F] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#2C4A3E] transition"
                >
                  Guardar
                </button>
              </div>
              <div className="space-y-2 pt-2">
                {[enlace sospechoso eliminado]((n, i) => (
                  <div key={i} className="p-3 bg-[#FAF8F5] border border-[#C8D8CE] rounded-xl text-xs text-[#2C4A3E] flex items-center justify-between">
                    <span>Ì≥å {n}</span>
                    <span className="text-[10px] text-[#84A59D]">Nota #{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`;

const pageCode = `'use client';

import React, { useState } from 'react';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppName, setCurrentAppName] = useState('Casa Matriz B2B');
  const [currentAppLogo, setCurrentAppLogo] = useState('/LOGO_asl.png');
  const [showSourcesPanel, setShowSourcesPanel] = useState(false);
  
  const [userNotes, setUserNotes] = useState<string[]>([
    'Revisi√≥n de accesibilidad UI/UX para ley TEA (Ley N¬∞ 21.545)',
    'Conexi√≥n activa a bucket Supabase "documentos-peticiones"',
    'Ajustes de paleta relajante sin sobrecarga sensorial (#52796F / #84A59D)'
  ]);
  const [newNote, setNewNote] = useState('');

  const handleOpenRoom = (appName: string, appLogo: string) => {
    setCurrentAppName(appName);
    setCurrentAppLogo(appLogo);
    setIsModalOpen(true);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setUserNotes([...userNotes, newNote.trim()]);
    setNewNote('');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C4A3E] flex flex-col font-sans relative">
      
      {/* Elementos Decorativos con Tri√°ngulos de Identidad Visual ASL Ideas */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10 pointer-events-none z-0">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <polygon points="100,20 180,180 20,180" fill="#52796F" />
          <polygon points="100,50 160,170 40,170" fill="#84A59D" />
        </svg>
      </div>

      {/* BARRA SUPERIOR ELEGANTE Y ACCESIBLE */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#C8D8CE] px-6 py-4 flex justify-between items-center shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl border border-[#84A59D] bg-white p-1 flex items-center justify-center shadow-sm overflow-hidden">
            <img src="/LOGO_asl.png" alt="ASL Ideas Logo" className="max-h-full max-w-full object-contain" onError={(e) => { ([enlace sospechoso eliminado] as HTMLElement).style.display = 'none'; }} />
            <span className="text-xs font-bold text-[#52796F]">ASL</span>
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-[#2C4A3E]">ASL Ideas SpA</h1>
            <p className="text-[11px] text-[#52796F] font-medium">Ecosistema de Salud Digital Inclusiva</p>
          </div>
        </div>

        {/* ACCIONES Y REDES SOCIALES CORPORATIVAS */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 mr-2 border-r border-[#C8D8CE] pr-4 text-xs font-bold text-[#52796F]">
            <a href="[suspicious link removed]" target="_blank" rel="noreferrer" title="LinkedIn B2B" className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center hover:bg-[#52796F] hover:text-white transition">in</a>
            <a href="[suspicious link removed]" target="_blank" rel="noreferrer" title="Instagram Comunidad" className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center hover:bg-[#52796F] hover:text-white transition">ig</a>
            <a href="[suspicious link removed]" target="_blank" rel="noreferrer" title="YouTube Canal" className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center hover:bg-[#52796F] hover:text-white transition">yt</a>
            <a href="[suspicious link removed]" target="_blank" rel="noreferrer" title="WhatsApp Directo" className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center hover:bg-[#52796F] hover:text-white transition">wa</a>
          </div>

          <button
            onClick={() => setShowSourcesPanel(!showSourcesPanel)}
            className="border border-[#84A59D] text-[#52796F] hover:bg-[#E8F0EC] text-xs font-bold px-3 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <span>Ì≥Å</span> Fuentes & Notas ({userNotes.length})
          </button>

          <button
            onClick={() => handleOpenRoom('Casa Matriz B2B', '/LOGO_asl.png')}
            className="border-2 border-[#52796F] bg-[#52796F] text-white hover:bg-[#2C4A3E] text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm flex items-center gap-2"
          >
            <span>Ì¥ù</span> Agendar Reuni√≥n B2B
          </button>
        </div>
      </header>

      {/* PANEL LATERAL INTERACTIVO DE FUENTES Y NOTAS DE TRABAJO */}
      {showSourcesPanel && (
        <div className="bg-[#E8F0EC] border-b border-[#C8D8CE] p-6 transition-all z-30">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white p-4.5 rounded-2xl border border-[#C8D8CE] space-y-3 shadow-xs">
              <h3 className="text-xs font-bold text-[#2C4A3E] uppercase tracking-wider flex items-center gap-2">
                <span>Ì≥Å</span> Documentos & Fichas Enviadas (Supabase Storage)
              </h3>
              <ul className="text-xs space-y-2 text-[#52796F]">
                <li className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] flex justify-between items-center">
                  <span>Ì≥Ñ Propuesta_Licencias_B2B_Municipal.pdf</span>
                  <span className="text-[10px] bg-[#E8F0EC] text-[#2C4A3E] px-2 py-0.5 rounded font-bold">documentos-peticiones</span>
                </li>
                <li className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] flex justify-between items-center">
                  <span>Ì≥Ñ Test_Composicion_Metabolica_LAWENMOLL.pdf</span>
                  <span className="text-[10px] bg-[#E8F0EC] text-[#2C4A3E] px-2 py-0.5 rounded font-bold">documentos-peticiones</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4.5 rounded-2xl border border-[#C8D8CE] space-y-3 shadow-xs">
              <h3 className="text-xs font-bold text-[#2C4A3E] uppercase tracking-wider flex items-center gap-2">
                <span>Ì≥ù</span> Bloc de Notas R√°pido de Plataforma
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote([enlace sospechoso eliminado].value)}
                  placeholder="A√±adir una nota de reuni√≥n..."
                  className="flex-1 text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]"
                />
                <button
                  onClick={handleAddNote}
                  className="bg-[#52796F] text-white text-xs font-bold px-3.5 py-2.5 rounded-xl hover:bg-[#2C4A3E] transition"
                >
                  Agregar
                </button>
              </div>
              <ul className="text-xs space-y-1.5 text-[#2C4A3E] max-h-32 overflow-y-auto">
                {[enlace sospechoso eliminado]((note, idx) => (
                  <li key={idx} className="p-2 bg-[#FAF8F5] rounded-lg border border-[#C8D8CE] flex items-center gap-2">
                    <span>Ì≥å</span> <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 space-y-12 w-full z-10">
        
        {/* HERO INTRODUCCI√ìN */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#E8F0EC] border border-[#84A59D]/40 text-[#2C4A3E] text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wide uppercase shadow-xs">
            <svg width="12" height="12" viewBox="0 0 100 100" fill="#52796F"><polygon points="50,10 90,90 10,90" /></svg>
            Dise√±ado por y para Neurodivergencias (TEA Grado 1 / TDAH)
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C4A3E] tracking-tight leading-tight">
            Ecosistema Digital de Salud Integrativa y Tecnolog√≠a Amable
          </h2>
          <p className="text-sm text-[#52796F] leading-relaxed">
            Sin sobrecarga sensorial, sin lenguaje punitivo y con accesibilidad cognitiva desde la primera l√≠nea de c√≥digo.
          </p>
        </section>

        {/* GRILLA DE LAS 4 OFICINAS VIRTUALES (CON LOGOS, BENEFICIOS Y POR QU√â SE CREARON) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 1. CASA MATRIZ ASL IDEAS SPA */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition-all rounded-3xl p-6 shadow-xs hover:shadow-md flex flex-col justify-between space-y-5 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl border border-[#84A59D] bg-white p-1 flex items-center justify-center overflow-hidden">
                    <img src="/LOGO_asl.png" alt="Logo ASL Ideas" className="max-h-full max-w-full object-contain" onError={(e) => { ([enlace sospechoso eliminado] as HTMLElement).style.display = 'none'; }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-2.5 py-0.5 rounded-full">
                      Oficina 1
                    </span>
                    <h3 className="text-lg font-bold text-[#2C4A3E] mt-0.5">ASL Ideas SpA ‚Äî Casa Matriz</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#52796F]">
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">LinkedIn</a> ‚Ä¢
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">WhatsApp</a>
                </div>
              </div>

              {/* ¬øPor qu√© se hizo? */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#C8D8CE] space-y-1">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  Ì≤° <span>¬øPor qu√© se cre√≥?</span>
                </p>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Fundada por una Dise√±adora Gr√°fica con TEA Grado 1 y TDAH para transformar la salud digital en un proceso humano, intuitivo y sin sobrecarga sensorial.
                </p>
              </div>

              {/* Beneficios */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  ‚ú® <span>Beneficios Clave:</span>
                </p>
                <ul className="text-xs text-[#52796F] space-y-1 list-disc list-inside">
                  <li>Desarrollo B2B a medida y consultor√≠a en UI/UX accesible.</li>
                  <li>Licencias institucionales adaptadas para municipalidades.</li>
                  <li>Cumplimiento riguroso Ley TEA (N¬∞ 21.545) y Ley N¬∞ 21.663.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E8F0EC]">
              <button
                onClick={() => handleOpenRoom('Casa Matriz B2B', '/LOGO_asl.png')}
                className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Ìæ•</span> Abrir Sala Virtual Casa Matriz
              </button>
              <button
                onClick={() => handleOpenRoom('Casa Matriz B2B', '/LOGO_asl.png')}
                className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#E8F0EC] text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>Ì≥Ö</span> Agendar Reuni√≥n B2B / Calendario
              </button>
            </div>
          </div>

          {/* 2. LAWENMOLL */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition-all rounded-3xl p-6 shadow-xs hover:shadow-md flex flex-col justify-between space-y-5 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl border border-[#84A59D] bg-white p-1 flex items-center justify-center overflow-hidden">
                    <img src="/lawenmoll_logo.jpg" alt="Logo Lawenmoll" className="max-h-full max-w-full object-contain" onError={(e) => { ([enlace sospechoso eliminado] as HTMLElement).style.display = 'none'; }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-2.5 py-0.5 rounded-full">
                      Oficina 2
                    </span>
                    <h3 className="text-lg font-bold text-[#2C4A3E] mt-0.5">LAWENMOLL</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#52796F]">
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">Instagram</a> ‚Ä¢
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">Telemedicina</a>
                </div>
              </div>

              {/* ¬øPor qu√© se hizo? */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#C8D8CE] space-y-1">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  Ì≤° <span>¬øPor qu√© se cre√≥?</span>
                </p>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Para resolver la alta deserci√≥n en salud digital mediante evaluaciones amables, eliminando la frustraci√≥n y pautas punitivas sobre el peso corporal.
                </p>
              </div>

              {/* Beneficios */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  ‚ú® <span>Beneficios Clave:</span>
                </p>
                <ul className="text-xs text-[#52796F] space-y-1 list-disc list-inside">
                  <li>Test de Bienestar Inteligente y c√°lculo metab√≥lico respetuoso.</li>
                  <li>Fichas Cl√≠nicas encriptadas bajo est√°ndares Ley N¬∞ 21.663.</li>
                  <li>Gesti√≥n de citas con Especialistas y Terapeutas Integrativos.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E8F0EC]">
              <button
                onClick={() => handleOpenRoom('LAWENMOLL ‚Äî Salud Integrativa', '/lawenmoll_logo.jpg')}
                className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Ìæ•</span> Abrir Sala Telemedicina LAWENMOLL
              </button>
              <button
                onClick={() => handleOpenRoom('LAWENMOLL ‚Äî Salud Integrativa', '/lawenmoll_logo.jpg')}
                className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#E8F0EC] text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>Ì≥Ö</span> Agendar Cita M√©dica / Calendario
              </button>
            </div>
          </div>

          {/* 3. WELLNESS WEB APP */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition-all rounded-3xl p-6 shadow-xs hover:shadow-md flex flex-col justify-between space-y-5 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl border border-[#84A59D] bg-white p-1 flex items-center justify-center overflow-hidden">
                    <img src="/logo_wellness.jpg" alt="Logo Wellness" className="max-h-full max-w-full object-contain" onError={(e) => { ([enlace sospechoso eliminado] as HTMLElement).style.display = 'none'; }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-2.5 py-0.5 rounded-full">
                      Oficina 3
                    </span>
                    <h3 className="text-lg font-bold text-[#2C4A3E] mt-0.5">Wellness Web App</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#52796F]">
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">YouTube</a> ‚Ä¢
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">Instagram</a>
                </div>
              </div>

              {/* ¬øPor qu√© se hizo? */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#C8D8CE] space-y-1">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  Ì≤° <span>¬øPor qu√© se cre√≥?</span>
                </p>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Para personas con dolor articular, sobrepeso o movilidad reducida que necesitan activar su cuerpo sin el estr√©s ni los impactos de un gimnasio tradicional.
                </p>
              </div>

              {/* Beneficios */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  ‚ú® <span>Beneficios Clave:</span>
                </p>
                <ul className="text-xs text-[#52796F] space-y-1 list-disc list-inside">
                  <li>Movimiento adaptado sin impacto y videoteca de pausas activas.</li>
                  <li>Salas virtuales tem√°ticas de entrenamiento (Lotus, Cielo, Bosque, Ra√≠z).</li>
                  <li>Cocina demostrativa y pautas de nutrici√≥n integrativa.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E8F0EC]">
              <button
                onClick={() => handleOpenRoom('Wellness Web App ‚Äî Movimiento Adaptado', '/logo_wellness.jpg')}
                className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Ìæ•</span> Abrir Sala Taller Wellness
              </button>
              <button
                onClick={() => handleOpenRoom('Wellness Web App ‚Äî Movimiento Adaptado', '/logo_wellness.jpg')}
                className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#E8F0EC] text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>Ì≥Ö</span> Agendar Clase Virtual / Calendario
              </button>
            </div>
          </div>

          {/* 4. SABIDUR√çA ANCESTRAL */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition-all rounded-3xl p-6 shadow-xs hover:shadow-md flex flex-col justify-between space-y-5 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl border border-[#84A59D] bg-white p-1 flex items-center justify-center overflow-hidden">
                    <img src="/LOGO_BIENESTAR.png" alt="Logo Sabidur√≠a Ancestral" className="max-h-full max-w-full object-contain" onError={(e) => { ([enlace sospechoso eliminado] as HTMLElement).style.display = 'none'; }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-2.5 py-0.5 rounded-full">
                      Oficina 4
                    </span>
                    <h3 className="text-lg font-bold text-[#2C4A3E] mt-0.5">Sabidur√≠a Ancestral</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#52796F]">
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">Facebook</a> ‚Ä¢
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">Comunidad</a>
                </div>
              </div>

              {/* ¬øPor qu√© se hizo? */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#C8D8CE] space-y-1">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  Ì≤° <span>¬øPor qu√© se cre√≥?</span>
                </p>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Para preservar los saberes populares de la herbolaria nativa y pautas familiares, conectando generaciones mediante un espacio comunitario seguro.
                </p>
              </div>

              {/* Beneficios */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  ‚ú® <span>Beneficios Clave:</span>
                </p>
                <ul className="text-xs text-[#52796F] space-y-1 list-disc list-inside">
                  <li>Diario Mural comunitario de "Secretos de la Abuela".</li>
                  <li>Recetario de fitoterapia nativa con generaci√≥n de PDF descargable.</li>
                  <li>Agente Conversacional Emp√°tico con respuesta respetuosa.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E8F0EC]">
              <button
                onClick={() => handleOpenRoom('Sabidur√≠a Ancestral ‚Äî Fitoterapia', '/LOGO_BIENESTAR.png')}
                className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Ìæ•</span> Abrir Sala Encuentro Herbolario
              </button>
              <button
                onClick={() => handleOpenRoom('Sabidur√≠a Ancestral ‚Äî Fitoterapia', '/LOGO_BIENESTAR.png')}
                className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#E8F0EC] text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>Ì≥Ö</span> Agendar Taller Comunidad / Calendario
              </button>
            </div>
          </div>

        </section>

        {/* NUEVA SECCI√ìN: APLICACIONES Y M√ìDULOS EN CONSTRUCCI√ìN / PR√ìXIMAMENTE */}
        <section className="bg-white border-2 border-[#C8D8CE] rounded-3xl p-8 space-y-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8F0EC] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#52796F] px-3 py-1 rounded-full">
                Pr√≥ximamente en ASL Ideas SpA
              </span>
              <h3 className="text-xl font-extrabold text-[#2C4A3E] mt-2">
                Nuevas Aplicaciones & M√≥dulos en Construcci√≥n Ì∫Ä
              </h3>
              <p className="text-xs text-[#52796F] mt-1">
                Ampliando el ecosistema de autonom√≠a, contenci√≥n familiar y rutas sensoriales.
              </p>
            </div>
            <div className="hidden md:block">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                <polygon points="50,10 90,90 10,90" fill="#52796F" opacity="0.3" />
                <polygon points="30,30 70,70 10,70" fill="#84A59D" opacity="0.5" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Vikingos Talleres */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE] space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl">Ìª°Ô∏è</span>
                  <span className="text-[10px] font-bold text-[#52796F] bg-[#E8F0EC] px-2 py-0.5 rounded">En Desarrollo</span>
                </div>
                <h4 className="text-sm font-bold text-[#2C4A3E]">Vikingos Talleres</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Espacio pr√°ctico de formaci√≥n en oficios, habilidades pr√°cticas y adaptabilidad para promover la independencia y autonom√≠a.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#84A59D] pt-2 border-t border-[#C8D8CE]/50">
                Lanzamiento Q1 2027
              </span>
            </div>

            {/* Apoderados Aguerridos */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE] space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl">‚öîÔ∏è</span>
                  <span className="text-[10px] font-bold text-[#52796F] bg-[#E8F0EC] px-2 py-0.5 rounded">En Desarrollo</span>
                </div>
                <h4 className="text-sm font-bold text-[#2C4A3E]">Apoderados Aguerridos</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Red de orientaci√≥n y contenci√≥n estrat√©gica para familias y cuidadores de personas neurodivergentes (TEA y TDAH).
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#84A59D] pt-2 border-t border-[#C8D8CE]/50">
                Lanzamiento Q2 2027
              </span>
            </div>

            {/* Patiperros Rutas */}
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE] space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl">Ìµæ</span>
                  <span className="text-[10px] font-bold text-[#52796F] bg-[#E8F0EC] px-2 py-0.5 rounded">En Desarrollo</span>
                </div>
                <h4 className="text-sm font-bold text-[#2C4A3E]">Patiperros Rutas</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Gu√≠a interactiva de rutas sensoriales, senderismo adaptado y turismo inclusivo al aire libre libre de barreras f√≠sicas.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#84A59D] pt-2 border-t border-[#C8D8CE]/50">
                Lanzamiento Q2 2027
              </span>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER CORPORATIVO */}
      <footer className="border-t border-[#C8D8CE] bg-[#FAF8F5] py-8 px-6 text-center space-y-4 z-10">
        <div className="flex justify-center items-center gap-4 flex-wrap text-xs text-[#52796F] font-bold">
          <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn B2B</a>
          <span className="text-[#C8D8CE]">‚Ä¢</span>
          <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
          <span className="text-[#C8D8CE]">‚Ä¢</span>
          <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline">YouTube</a>
          <span className="text-[#C8D8CE]">‚Ä¢</span>
          <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline">WhatsApp Business</a>
        </div>
        <p className="text-xs text-[#84A59D]">
          ¬© {new Date().getFullYear()} ASL Ideas SpA ‚Äî Salud Digital Integrativa, Accesible e Inclusiva.
        </p>
      </footer>

      {/* MODAL SALA VIRTUAL B2B */}
      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appName={currentAppName}
        appLogo={currentAppLogo}
      />

    </div>
  );
}
`;

fs.writeFileSync('components/SalaVirtualB2B.tsx', salaVirtualCode, 'utf8');
fs.writeFileSync('app/page.tsx', pageCode, 'utf8');

console.log('‚úÖ Archivos actualizados exitosamente con logos, calendarios, triangulos y proximamente.');
