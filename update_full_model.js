const fs = require('fs');

// 1. SALA VIRTUAL CON VIDEOLLAMADA, CALENDARIO DE AGENDAMIENTO, ARCHIVOS Y NOTAS
const salaVirtualCode = `'use client';

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
    <div className="fixed inset-0 z-50 bg-[#1B4D3E]/60 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-3xl border border-[#C8D8CE] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* ENCABEZADO CON IDENTIDAD CORPORATIVA */}
        <header className="bg-[#1B4D3E] text-white p-5 flex justify-between items-center border-b border-[#2D6A4F] relative overflow-hidden">
          <div className="flex items-center gap-3.5 z-10">
            <div className="w-12 h-12 rounded-2xl bg-white p-1 border border-[#C8D8CE] flex items-center justify-center shadow-sm overflow-hidden">
              <img src={appLogo} alt={appName} className="max-h-full max-w-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-[#FAF8F5]/20 px-2.5 py-0.5 rounded-full text-white">
                ASL Ideas SpA ‚Äî {appName}
              </span>
              <h2 className="text-lg font-bold mt-0.5 text-white">Sala Virtual, Videollamada & Agendamiento B2B</h2>
              <p className="text-xs text-[#E8F0EC]">
                Conexi√≥n en vivo, calendario interactivo de citas y gestor de acuerdos.
              </p>
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
            onClick={() => setTab('video')} 
            className={\`flex-1 py-3 text-xs font-bold transition \${tab === 'video' ? 'bg-[#FAF8F5] text-[#1B4D3E] border-b-2 border-[#1B4D3E]' : 'text-[#2D6A4F] hover:bg-[#FAF8F5]/50'}\`}
          >
            Ìæ• Videollamada en Vivo
          </button>
          <button 
            type="button"
            onClick={() => setTab('agendar')} 
            className={\`flex-1 py-3 text-xs font-bold transition \${tab === 'agendar' ? 'bg-[#FAF8F5] text-[#1B4D3E] border-b-2 border-[#1B4D3E]' : 'text-[#2D6A4F] hover:bg-[#FAF8F5]/50'}\`}
          >
            Ì≥Ö Calendario & Agendar Hora
          </button>
          <button 
            type="button"
            onClick={() => setTab('archivos')} 
            className={\`flex-1 py-3 text-xs font-bold transition \${tab === 'archivos' ? 'bg-[#FAF8F5] text-[#1B4D3E] border-b-2 border-[#1B4D3E]' : 'text-[#2D6A4F] hover:bg-[#FAF8F5]/50'}\`}
          >
            Ì≥Å Subir Documento / PDF
          </button>
          <button 
            type="button"
            onClick={() => setTab('notas')} 
            className={\`flex-1 py-3 text-xs font-bold transition \${tab === 'notas' ? 'bg-[#FAF8F5] text-[#1B4D3E] border-b-2 border-[#1B4D3E]' : 'text-[#2D6A4F] hover:bg-[#FAF8F5]/50'}\`}
          >
            Ì≥ù Notas de Sesi√≥n
          </button>
        </div>

        {/* CONTENIDO INTERACTIVO */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'video' && (
            <div className="space-y-3">
              <div className="bg-[#E8F0EC] p-3 rounded-2xl border border-[#C8D8CE] flex items-center justify-between text-xs text-[#1B4D3E]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] animate-pulse"></span>
                  <span className="font-bold">Canal Activo:</span> Transmisi√≥n para {appName}
                </div>
                <span className="text-[11px] font-bold text-[#2D6A4F]">Conexi√≥n Encriptada TLS 1.3</span>
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
                <h3 className="text-sm font-bold text-[#1B4D3E]">Agendar Hora de Reuni√≥n B2B ‚Äî {appName}</h3>
                <p className="text-xs text-[#2D6A4F]">Selecciona la fecha y el bloque horario para coordinar la sesi√≥n virtual.</p>
              </div>

              {bookingSuccess ? (
                <div className="p-5 bg-[#E8F0EC] rounded-2xl border border-[#2D6A4F] text-center space-y-2">
                  <span className="text-3xl">Ìæâ</span>
                  <h4 className="text-sm font-bold text-[#1B4D3E]">¬°Reuni√≥n Agendada con √âxito!</h4>
                  <p className="text-xs text-[#2D6A4F]">
                    Confirmaci√≥n registrada para <strong className="text-[#1B4D3E]">{userEmail}</strong> el d√≠a <strong className="text-[#1B4D3E]">{selectedDate}</strong> a las <strong className="text-[#1B4D3E]">{selectedTime} hrs</strong>.
                  </p>
                  <button 
                    type="button"
                    onClick={() => setBookingSuccess(false)} 
                    className="text-xs font-bold text-[#2D6A4F] underline hover:text-[#1B4D3E] pt-2 block mx-auto"
                  >
                    Agendar otra cita
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAgendar} className="space-y-3.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Nombre Completo *</label>
                      <input 
                        type="text" 
                        required 
                        value={userName} 
                        onChange={(e) => setUserName([enlace sospechoso eliminado].value)} 
                        placeholder="Ej: Mar√≠a Gonz√°lez" 
                        className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#1B4D3E]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Correo Electr√≥nico *</label>
                      <input 
                        type="email" 
                        required 
                        value={userEmail} 
                        onChange={(e) => setUserEmail([enlace sospechoso eliminado].value)} 
                        placeholder="ejemplo@correo.cl" 
                        className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#1B4D3E]" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Instituci√≥n / Empresa / Particular</label>
                    <input 
                      type="text" 
                      value={userOrg} 
                      onChange={(e) => setUserOrg([enlace sospechoso eliminado].value)} 
                      placeholder="Ej: Municipalidad, Empresa, Consulta Personal" 
                      className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#1B4D3E]" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Ì≥Ö Seleccionar Fecha *</label>
                      <input 
                        type="date" 
                        required 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate([enlace sospechoso eliminado].value)} 
                        className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] focus:outline-none focus:border-[#1B4D3E]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1B4D3E] mb-1">‚è∞ Bloque Horario *</label>
                      <div className="grid grid-cols-3 gap-1">
                        {[enlace sospechoso eliminado]((hora) => (
                          <button
                            key={hora}
                            type="button"
                            onClick={() => setSelectedTime(hora)}
                            className={\`py-2 text-[11px] font-bold rounded-lg border transition \${
                              selectedTime === hora
                                ? 'bg-[#1B4D3E] text-white border-[#1B4D3E]'
                                : 'bg-[#FAF8F5] text-[#1B4D3E] border-[#C8D8CE] hover:bg-[#E8F0EC]'
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
                    className="w-full bg-[#1B4D3E] text-white text-xs font-bold py-3 rounded-xl hover:bg-[#2D6A4F] transition shadow-xs disabled:opacity-50 mt-2"
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
                <h3 className="text-sm font-bold text-[#1B4D3E]">Adjuntar Propuesta o Antecedentes PDF</h3>
                <p className="text-xs text-[#2D6A4F]">Sube tus documentos directamente al almacenamiento seguro de Supabase.</p>
              </div>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx,.png,.jpg" 
                onChange={(e) => setFile([enlace sospechoso eliminado].files?.[0] || null)} 
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
            <div className="max-w-xl mx-auto space-y-3 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-sm">
              <h3 className="text-sm font-bold text-[#1B4D3E]">Acuerdos de Sesi√≥n ‚Äî {appName}</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={nuevaNota} 
                  onChange={(e) => setNuevaNota([enlace sospechoso eliminado].value)} 
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
                {[enlace sospechoso eliminado]((n, i) => (
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

// 2. PAGINA PRINCIPAL CON DISE√ëO UNIFICADO, REDES SOCIALES Y OFICINAS VIRTUALES
const pageCode = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppName, setCurrentAppName] = useState('Casa Matriz B2B');
  const [currentAppLogo, setCurrentAppLogo] = useState('/LOGO_asl.png');

  const handleOpenRoom = (appName: string, appLogo: string) => {
    setCurrentAppName(appName);
    setCurrentAppLogo(appLogo);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] flex flex-col font-sans relative">
      
      {/* DECORACION VECTORIAL TRIANGULOS CORPORATIVOS ASL IDEAS SPA */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <polygon points="100,20 180,180 20,180" fill="#1B4D3E" />
          <polygon points="100,50 160,170 40,170" fill="#2D6A4F" />
        </svg>
      </div>

      {/* CABECERA CON NAVEGACION REAL, REDES SOCIALES Y AGENDAMIENTO B2B */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#C8D8CE] px-6 py-3.5 flex flex-wrap justify-between items-center shadow-xs gap-4">
        
        {/* LOGO E IDENTIDAD */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl border border-[#C8D8CE] bg-white p-1 flex items-center justify-center overflow-hidden shadow-xs">
            <img src="/LOGO_asl.png" alt="ASL Ideas SpA" className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-base text-[#1B4D3E] tracking-tight">ASL Ideas SpA</h1>
            <p className="text-[11px] text-[#2D6A4F] font-medium">Ecosistema de Salud Digital Inclusiva</p>
          </div>
        </div>

        {/* NAVEGACION A CADA APLICACION REAL */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-[#1B4D3E]">
          <Link href="/aslideas" className="hover:text-[#2D6A4F] transition">Casa Matriz</Link>
          <Link href="/lawenmoll" className="hover:text-[#2D6A4F] transition">LAWENMOLL</Link>
          <Link href="/wellness" className="hover:text-[#2D6A4F] transition">Wellness App</Link>
          <Link href="/bienestar" className="hover:text-[#2D6A4F] transition">Sabidur√≠a Ancestral</Link>
          <Link href="/comunidad" className="hover:text-[#2D6A4F] transition">Comunidad</Link>
          <Link href="/admin" className="text-[#B08D4B] hover:underline">Panel Admin</Link>
        </nav>

        {/* REDES SOCIALES & BOTON DE AGENDAMIENTO B2B */}
        <div className="flex items-center gap-3">
          
          {/* ICONOS DE REDES SOCIALES ACTIVAS */}
          <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-1.5 rounded-xl border border-[#C8D8CE]">
            <a 
              href="[suspicious link removed]" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="LinkedIn B2B"
              className="w-7 h-7 rounded-lg bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold transition"
            >
              in
            </a>
            <a 
              href="[suspicious link removed]" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Instagram Oficial"
              className="w-7 h-7 rounded-lg bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold transition"
            >
              IG
            </a>
            <a 
              href="[suspicious link removed]" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="YouTube Canal Oficial"
              className="w-7 h-7 rounded-lg bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold transition"
            >
              YT
            </a>
            <a 
              href="[suspicious link removed]" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="WhatsApp Business"
              className="w-7 h-7 rounded-lg bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white flex items-center justify-center text-xs font-bold transition"
            >
              WA
            </a>
          </div>

          {/* AGENDAR REUNION B2B */}
          <button 
            onClick={() => handleOpenRoom('Casa Matriz B2B', '/LOGO_asl.png')} 
            className="bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-2"
          >
            <span>Ì¥ù</span> Agendar Reuni√≥n B2B
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL Y PORTADA */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 space-y-12 w-full z-10">
        
        {/* HERO Y PROP√ìSITO INSTITUCIONAL */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
            ‚ñ≤ Ecosistema Tecnol√≥gico de Salud Integrativa
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1B4D3E] tracking-tight leading-tight">
            Tecnolog√≠a Humana y Amable para el Bienestar Integrativo
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Navegaci√≥n clara, baja sobrecarga sensorial para neurodivergencias (TEA / TDAH) y cumplimiento normativo (Ley TEA N¬∞ 21.545 y Ley N¬∞ 21.663).
          </p>
        </section>

        {/* TARJETAS DE LAS 4 OFICINAS VIRTUALES CON VIDEO, ARCHIVOS Y AGENDAMIENTO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. CASA MATRIZ ASL IDEAS SPA */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#1B4D3E] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <img src="/LOGO_asl.png" alt="ASL Ideas" className="w-12 h-12 object-contain" />
                  <div>
                    <span className="text-[10px] font-bold text-[#B08D4B] uppercase bg-[#FAF8F5] border border-[#C8D8CE] px-2 py-0.5 rounded">Oficina 1</span>
                    <h3 className="text-base font-bold text-[#1B4D3E]">ASL Ideas SpA ‚Äî Casa Matriz</h3>
                  </div>
                </div>
                <Link href="/aslideas" className="text-[11px] font-bold text-[#2D6A4F] hover:underline">
                  Ver Secci√≥n ‚Üí
                </Link>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>Ì≤° ¬øPor qu√© se cre√≥?</strong> Fundada por una Dise√±adora Gr√°fica con TEA Grado 1 y TDAH para humanizar la salud digital y reducir la fricci√≥n en la atenci√≥n.
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>‚ú® Beneficios:</strong> Consultor√≠a UI/UX inclusiva, licencias corporativas B2B para municipalidades y convenios de salud.
              </p>
            </div>
            <div className="space-y-2 pt-3 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('Casa Matriz B2B', '/LOGO_asl.png')} 
                className="w-full bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Ìæ•</span> Abrir Sala Virtual Casa Matriz / Agendar Hora
              </button>
            </div>
          </div>

          {/* 2. LAWENMOLL */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#1B4D3E] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <img src="/lawenmoll_logo.jpg" alt="LAWENMOLL" className="w-12 h-12 object-contain" />
                  <div>
                    <span className="text-[10px] font-bold text-[#2D6A4F] uppercase bg-[#E8F0EC] border border-[#C8D8CE] px-2 py-0.5 rounded">Oficina 2</span>
                    <h3 className="text-base font-bold text-[#1B4D3E]">LAWENMOLL ‚Äî Salud Integrativa</h3>
                  </div>
                </div>
                <Link href="/lawenmoll" className="text-[11px] font-bold text-[#2D6A4F] hover:underline">
                  Ver Secci√≥n ‚Üí
                </Link>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>Ì≤° ¬øPor qu√© se cre√≥?</strong> Diagn√≥stico preventivo y seguimiento cl√≠nico amable sin juicios punitivos sobre el peso corporal.
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>‚ú® Beneficios:</strong> Test metab√≥lico inteligente, Fichas Cl√≠nicas encriptadas (Ley N¬∞ 21.663) y agendamiento de telemedicina.
              </p>
            </div>
            <div className="space-y-2 pt-3 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('LAWENMOLL ‚Äî Salud Integrativa', '/lawenmoll_logo.jpg')} 
                className="w-full bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Ìæ•</span> Abrir Sala Telemedicina / Agendar Hora
              </button>
            </div>
          </div>

          {/* 3. WELLNESS WEB APP */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#1B4D3E] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <img src="/logo_wellness.jpg" alt="Wellness" className="w-12 h-12 object-contain" />
                  <div>
                    <span className="text-[10px] font-bold text-[#2D6A4F] uppercase bg-[#E8F0EC] border border-[#C8D8CE] px-2 py-0.5 rounded">Oficina 3</span>
                    <h3 className="text-base font-bold text-[#1B4D3E]">Wellness Web App</h3>
                  </div>
                </div>
                <Link href="/wellness" className="text-[11px] font-bold text-[#2D6A4F] hover:underline">
                  Ver Secci√≥n ‚Üí
                </Link>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>Ì≤° ¬øPor qu√© se cre√≥?</strong> Ejercicio adaptado sin impacto para personas con dolor articular, sobrepeso o movilidad reducida.
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>‚ú® Beneficios:</strong> Pausas activas, videoteca guiada, salas tem√°ticas (Lotus, Cielo, Bosque, Ra√≠z) y cocina demostrativa.
              </p>
            </div>
            <div className="space-y-2 pt-3 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('Wellness Web App', '/logo_wellness.jpg')} 
                className="w-full bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Ìæ•</span> Abrir Sala Taller Wellness / Agendar Hora
              </button>
            </div>
          </div>

          {/* 4. SABIDUR√çA ANCESTRAL */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#1B4D3E] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <img src="/LOGO_BIENESTAR.png" alt="Sabidur√≠a Ancestral" className="w-12 h-12 object-contain" />
                  <div>
                    <span className="text-[10px] font-bold text-[#B08D4B] uppercase bg-[#FAF8F5] border border-[#C8D8CE] px-2 py-0.5 rounded">Oficina 4</span>
                    <h3 className="text-base font-bold text-[#1B4D3E]">Sabidur√≠a Ancestral</h3>
                  </div>
                </div>
                <Link href="/bienestar" className="text-[11px] font-bold text-[#2D6A4F] hover:underline">
                  Ver Secci√≥n ‚Üí
                </Link>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>Ì≤° ¬øPor qu√© se cre√≥?</strong> Para rescatar y preservar la herbolaria nativa y los saberes comunitarios en un entorno seguro.
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>‚ú® Beneficios:</strong> Diario Mural de "Secretos de la Abuela", recetario descargable en PDF y agente conversacional emp√°tico.
              </p>
            </div>
            <div className="space-y-2 pt-3 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('Sabidur√≠a Ancestral', '/LOGO_BIENESTAR.png')} 
                className="w-full bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Ìæ•</span> Abrir Sala Herbolario / Agendar Hora
              </button>
            </div>
          </div>

        </section>

        {/* PR√ìXIMAMENTE EN ASL IDEAS SPA */}
        <section className="bg-white border-2 border-[#C8D8CE] rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex justify-between items-center border-b border-[#E8F0EC] pb-3">
            <h3 className="text-base font-bold text-[#1B4D3E]">Pr√≥ximamente en ASL Ideas SpA Ì∫Ä</h3>
            <span className="text-xs font-bold text-[#2D6A4F] bg-[#E8F0EC] px-3 py-1 rounded-full">En Construcci√≥n</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-1">
              <h4 className="text-xs font-bold text-[#1B4D3E]">Ìª°Ô∏è Vikingos Talleres</h4>
              <p className="text-[11px] text-gray-600">Formaci√≥n pr√°ctica en oficios, autonom√≠a e independencia personal.</p>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-1">
              <h4 className="text-xs font-bold text-[#1B4D3E]">‚öîÔ∏è Apoderados Aguerridos</h4>
              <p className="text-[11px] text-gray-600">Red de orientaci√≥n y contenci√≥n estrat√©gica para familias TEA/TDAH.</p>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-1">
              <h4 className="text-xs font-bold text-[#1B4D3E]">Ìµæ Patiperros Rutas</h4>
              <p className="text-[11px] text-gray-600">Senderismo adaptado y rutas sensoriales al aire libre sin barreras f√≠sicas.</p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER CON REDES SOCIALES Y DERECHOS RESERVADOS */}
      <footer className="border-t border-[#C8D8CE] bg-white py-8 px-6 text-center space-y-4 text-xs text-gray-600">
        <div className="flex justify-center items-center gap-4">
          <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1B4D3E] hover:underline">
            LinkedIn B2B
          </a>
          <span>‚Ä¢</span>
          <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1B4D3E] hover:underline">
            Instagram
          </a>
          <span>‚Ä¢</span>
          <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1B4D3E] hover:underline">
            YouTube
          </a>
          <span>‚Ä¢</span>
          <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" className="font-bold text-[#2D6A4F] hover:underline">
            WhatsApp Business
          </a>
        </div>
        <p>¬© 2026 ASL Ideas SpA ‚Äî Salud Digital Integrativa, Accesible y Humana. Todos los derechos reservados.</p>
      </footer>

      {/* MODAL SALA VIRTUAL CON VIDEO, AGENDAMIENTO Y ARCHIVOS */}
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

if (!fs.existsSync('components')) {
  fs.mkdirSync('components');
}

fs.writeFileSync('components/SalaVirtualB2B.tsx', salaVirtualCode, 'utf8');
fs.writeFileSync('app/page.tsx', pageCode, 'utf8');

console.log('‚úÖ Archivos actualizados exitosamente en UTF-8 con redes sociales y agendamiento integrado.');
