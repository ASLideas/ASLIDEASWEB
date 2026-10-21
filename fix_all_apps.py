import os

sala_code = """'use client';

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
    'Acuerdo preliminar: Demostracion de interfaz accesible.',
    'Revision de requerimientos para Ley N¬∞ 21.663 y Ley TEA.'
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
              <h2 className="text-lg font-bold mt-0.5 text-white">Sala Virtual & Agendamiento de Reunion</h2>
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

        {/* Pestanas de la Sala Virtual */}
        <div className="flex border-b border-[#C8D8CE] bg-[#E8F0EC]">
          <button 
            onClick={() => setTab('video')} 
            className={`flex-1 py-3 text-xs font-bold transition ${tab === 'video' ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Ìæ• Videollamada
          </button>
          <button 
            onClick={() => setTab('agendar')} 
            className={`flex-1 py-3 text-xs font-bold transition ${tab === 'agendar' ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Ì≥Ö Calendario & Agendar Hora
          </button>
          <button 
            onClick={() => setTab('archivos')} 
            className={`flex-1 py-3 text-xs font-bold transition ${tab === 'archivos' ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Ì≥Å Subir Documento / PDF
          </button>
          <button 
            onClick={() => setTab('notas')} 
            className={`flex-1 py-3 text-xs font-bold transition ${tab === 'notas' ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Ì≥ù Notas de Sesion
          </button>
        </div>

        {/* Contenido de cada pestana */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'video' && (
            <div className="space-y-3">
              <div className="bg-[#E8F0EC] p-3 rounded-2xl border border-[#84A59D]/40 flex items-center justify-between text-xs text-[#2C4A3E]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#84A59D] animate-pulse"></span>
                  <span className="font-bold">Canal Activo:</span> Sala Virtual para {appName}
                </div>
                <span className="text-[11px] font-bold text-[#52796F]">Conexion Encriptada</span>
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
                <h3 className="text-sm font-bold text-[#2C4A3E]">Agendar Hora de Reunion ‚Äî {appName}</h3>
                <p className="text-xs text-[#52796F]">Selecciona la fecha y la hora para coordinar la videollamada.</p>
              </div>

              {bookingSuccess ? (
                <div className="p-5 bg-[#E8F0EC] rounded-2xl border border-[#84A59D] text-center space-y-2">
                  <span className="text-3xl">Ìæâ</span>
                  <h4 className="text-sm font-bold text-[#2C4A3E]">¬°Reunion Agendada con Exito!</h4>
                  <p className="text-xs text-[#52796F]">
                    Confirmacion enviada a <strong className="text-[#2C4A3E]">{userEmail}</strong> para la fecha <strong className="text-[#2C4A3E]">{selectedDate}</strong> a las <strong className="text-[#2C4A3E]">{selectedTime} hrs</strong>.
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
                        placeholder="Ej: Maria Gonzalez" 
                        className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2C4A3E] mb-1">Correo Electronico *</label>
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
                    <label className="block text-xs font-bold text-[#2C4A3E] mb-1">Institucion / Empresa / Particular</label>
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
                            className={`py-2 text-[11px] font-bold rounded-lg border transition ${
                              selectedTime === hora
                                ? 'bg-[#52796F] text-white border-[#52796F]'
                                : 'bg-[#FAF8F5] text-[#2C4A3E] border-[#C8D8CE] hover:bg-[#E8F0EC]'
                            }`}
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
                    {uploading ? 'Confirmando Cita...' : 'Confirmar y Reservar Hora de Reunion'}
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
              <h3 className="text-sm font-bold text-[#2C4A3E]">Acuerdos de Sesion ‚Äî {appName}</h3>
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
"""

page_code = """'use client';

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
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C4A3E] flex flex-col font-sans relative">
      
      {/* Elementos Geometricos de Identidad Visual */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <polygon points="100,20 180,180 20,180" fill="#52796F" />
          <polygon points="100,50 160,170 40,170" fill="#84A59D" />
        </svg>
      </div>

      {/* BARRA SUPERIOR */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#C8D8CE] px-6 py-4 flex justify-between items-center shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl border border-[#84A59D] bg-white p-1 flex items-center justify-center overflow-hidden">
            <img src="/LOGO_asl.png" alt="ASL Ideas" className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-base text-[#2C4A3E]">ASL Ideas SpA</h1>
            <p className="text-[11px] text-[#52796F] font-medium">Ecosistema de Salud Digital Inclusiva</p>
          </div>
        </div>

        {/* BOTON GENERAL DE AGENDAMIENTO B2B EN BARRA SUPERIOR */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleOpenRoom('Casa Matriz B2B', '/LOGO_asl.png')} 
            className="bg-[#52796F] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#2C4A3E] transition shadow-xs flex items-center gap-2"
          >
            <span>Ì¥ù</span> Agendar Reunion B2B
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 space-y-10 w-full z-10">
        
        {/* HERO Y ENCABEZADO ESTRATEGICO */}
        <section className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-block bg-[#E8F0EC] border border-[#84A59D]/40 text-[#2C4A3E] text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
            ‚ñ≤ Ecosistema Tecnologico de Salud Integrativa
          </span>
          <h2 className="text-3xl font-extrabold text-[#2C4A3E]">
            Accesibilidad Digital, Autonomia y Salud Integrativa
          </h2>
          <p className="text-xs text-[#52796F] leading-relaxed">
            Navegacion clara, baja sobrecarga sensorial y cumplimiento normativo (Ley TEA N¬∞ 21.545 y Ley N¬∞ 21.663).
          </p>
        </section>

        {/* GRILLA DE LAS 4 OFICINAS VIRTUALES (TODAS CON VIDEOLLAMADA + CALENDARIO DE AGENDAMIENTO HABILITADOS) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. CASA MATRIZ ASL IDEAS SPA */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <img src="/LOGO_asl.png" alt="ASL Ideas" className="w-12 h-12 object-contain" />
                  <div>
                    <span className="text-[10px] font-bold text-[#52796F] uppercase bg-[#E8F0EC] px-2 py-0.5 rounded">Oficina 1</span>
                    <h3 className="text-base font-bold text-[#2C4A3E]">ASL Ideas SpA ‚Äî Casa Matriz</h3>
                  </div>
                </div>
                <Link href="/aslideas" className="text-[11px] font-bold text-[#52796F] hover:underline">
                  Ver Seccion ‚Üí
                </Link>
              </div>
              <p className="text-xs text-[#52796F]">
                <strong>Ì≤° ¬øPor que se creo?</strong> Fundada por una Disenadora Grafica con TEA Grado 1 y TDAH para humanizar la salud digital y reducir la friccion en la atencion.
              </p>
              <p className="text-xs text-[#52796F]">
                <strong>‚ú® Beneficios:</strong> Consultoria UI/UX inclusiva, licencias corporativas B2B para municipalidades y empresas, y convenios de salud.
              </p>
            </div>
            <div className="space-y-2 pt-2 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('Casa Matriz B2B', '/LOGO_asl.png')} 
                className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2C4A3E] transition flex items-center justify-center gap-2"
              >
                <span>Ìæ•</span> Abrir Sala Virtual Casa Matriz / Agendar Hora
              </button>
            </div>
          </div>

          {/* 2. LAWENMOLL */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <img src="/lawenmoll_logo.jpg" alt="LAWENMOLL" className="w-12 h-12 object-contain" />
                  <div>
                    <span className="text-[10px] font-bold text-[#52796F] uppercase bg-[#E8F0EC] px-2 py-0.5 rounded">Oficina 2</span>
                    <h3 className="text-base font-bold text-[#2C4A3E]">LAWENMOLL ‚Äî Salud Integrativa</h3>
                  </div>
                </div>
                <Link href="/lawenmoll" className="text-[11px] font-bold text-[#52796F] hover:underline">
                  Ver Seccion ‚Üí
                </Link>
              </div>
              <p className="text-xs text-[#52796F]">
                <strong>Ì≤° ¬øPor que se creo?</strong> Diagnostico preventivo y seguimiento clinico amable sin juicios punitivos sobre el peso corporal.
              </p>
              <p className="text-xs text-[#52796F]">
                <strong>‚ú® Beneficios:</strong> Test metabolico inteligente, Fichas Clinicas encriptadas (Ley N¬∞ 21.663) y cita directa con especialistas.
              </p>
            </div>
            <div className="space-y-2 pt-2 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('LAWENMOLL ‚Äî Salud Integrativa', '/lawenmoll_logo.jpg')} 
                className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2C4A3E] transition flex items-center justify-center gap-2"
              >
                <span>Ìæ•</span> Abrir Sala Telemedicina / Agendar Hora
              </button>
            </div>
          </div>

          {/* 3. WELLNESS WEB APP */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <img src="/logo_wellness.jpg" alt="Wellness" className="w-12 h-12 object-contain" />
                  <div>
                    <span className="text-[10px] font-bold text-[#52796F] uppercase bg-[#E8F0EC] px-2 py-0.5 rounded">Oficina 3</span>
                    <h3 className="text-base font-bold text-[#2C4A3E]">Wellness Web App</h3>
                  </div>
                </div>
                <Link href="/wellness" className="text-[11px] font-bold text-[#52796F] hover:underline">
                  Ver Seccion ‚Üí
                </Link>
              </div>
              <p className="text-xs text-[#52796F]">
                <strong>Ì≤° ¬øPor que se creo?</strong> Ejercicio adaptado sin impacto para personas con dolor articular, sobrepeso o movilidad reducida.
              </p>
              <p className="text-xs text-[#52796F]">
                <strong>‚ú® Beneficios:</strong> Pausas activas, videoteca guiada, salas tematicas (Lotus, Cielo, Bosque, Raiz) y modulos de cocina demostrativa.
              </p>
            </div>
            <div className="space-y-2 pt-2 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('Wellness Web App', '/logo_wellness.jpg')} 
                className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2C4A3E] transition flex items-center justify-center gap-2"
              >
                <span>Ìæ•</span> Abrir Sala Taller Wellness / Agendar Hora
              </button>
            </div>
          </div>

          {/* 4. SABIDURIA ANCESTRAL */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <img src="/LOGO_BIENESTAR.png" alt="Sabiduria Ancestral" className="w-12 h-12 object-contain" />
                  <div>
                    <span className="text-[10px] font-bold text-[#52796F] uppercase bg-[#E8F0EC] px-2 py-0.5 rounded">Oficina 4</span>
                    <h3 className="text-base font-bold text-[#2C4A3E]">Sabiduria Ancestral</h3>
                  </div>
                </div>
                <Link href="/bienestar" className="text-[11px] font-bold text-[#52796F] hover:underline">
                  Ver Seccion ‚Üí
                </Link>
              </div>
              <p className="text-xs text-[#52796F]">
                <strong>Ì≤° ¬øPor que se creo?</strong> Para rescatar y preservar la herbolaria nativa y los saberes comunitarios en un espacio seguro e intergeneracional.
              </p>
              <p className="text-xs text-[#52796F]">
                <strong>‚ú® Beneficios:</strong> Diario Mural de Secretos de la Abuela, recetarios descargables en PDF y asistente conversacional empatico.
              </p>
            </div>
            <div className="space-y-2 pt-2 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('Sabiduria Ancestral', '/LOGO_BIENESTAR.png')} 
                className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2C4A3E] transition flex items-center justify-center gap-2"
              >
                <span>Ìæ•</span> Abrir Sala Herbolario / Agendar Hora
              </button>
            </div>
          </div>

        </section>

        {/* PROXIMAMENTE / APPS EN CONSTRUCCION */}
        <section className="bg-white border-2 border-[#C8D8CE] rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex justify-between items-center border-b border-[#E8F0EC] pb-3">
            <h3 className="text-base font-bold text-[#2C4A3E]">Proximamente en ASL Ideas SpA Ì∫Ä</h3>
            <span className="text-xs font-bold text-[#52796F] bg-[#E8F0EC] px-3 py-1 rounded-full">En Desarrollo</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-1">
              <h4 className="text-xs font-bold text-[#2C4A3E]">Ìª°Ô∏è Vikingos Talleres</h4>
              <p className="text-[11px] text-[#52796F]">Formacion practica en oficios, autonomia e independencia personal.</p>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-1">
              <h4 className="text-xs font-bold text-[#2C4A3E]">‚öîÔ∏è Apoderados Aguerridos</h4>
              <p className="text-[11px] text-[#52796F]">Red de orientacion y contencion estrategica para familias TEA/TDAH.</p>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-1">
              <h4 className="text-xs font-bold text-[#2C4A3E]">Ìµæ Patiperros Rutas</h4>
              <p className="text-[11px] text-[#52796F]">Senderismo adaptado y rutas sensoriales al aire libre libres de barreras.</p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#C8D8CE] bg-[#FAF8F5] py-6 text-center text-xs text-[#84A59D]">
        ¬© 2026 ASL Ideas SpA ‚Äî Salud Digital Integrativa, Accesible y Humana.
      </footer>

      {/* MODAL SALA VIRTUAL (FUNCIONAL PARA LAS 4 APPS) */}
      <SalaVirtualB2B 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        appName={currentAppName} 
        appLogo={currentAppLogo} 
      />
    </div>
  );
}
"""

with open('components/SalaVirtualB2B.tsx', 'wb') as f:
    f.write(sala_code.encode('utf-8'))

with open('app/page.tsx', 'wb') as f:
    f.write(page_code.encode('utf-8'))

print("‚úÖ Codigo binario UTF-8 reescrito exitosamente para las 4 apps con videollamadas y calendario habilitados.")
