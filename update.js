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
}

export default function SalaVirtualB2B({ isOpen, onClose, appName = 'Casa Matriz B2B' }: Props) {
  const [tab, setTab] = useState<'video' | 'archivos' | 'notas'>('video');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [notas, setNotas] = useState<string[]>([]);
  const [nuevaNota, setNuevaNota] = useState('');

  if (!isOpen) return null;

  const handleSimularSubida = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(true);
    }, 1200);
  };

  const handleAgregarNota = () => {
    if (!nuevaNota.trim()) return;
    setNotas([...notas, nuevaNota.trim()]);
    setNuevaNota('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2C4A3E]/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-3xl border border-[#C8D8CE] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Encabezado Verde Salvia */}
        <header className="bg-[#52796F] text-white p-5 flex justify-between items-center border-b border-[#84A59D]">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase bg-[#FAF8F5]/20 px-3 py-1 rounded-full text-white">
              ASL Ideas SpA ‚Äî {appName}
            </span>
            <h2 className="text-lg font-bold mt-1">Sala Virtual Corporativa & Agendamiento</h2>
            <p className="text-xs text-[#E8F0EC]">
              Videollamada en vivo, gestor de fuentes/archivos PDF y bloc de notas de reuni√≥n.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white bg-black/10 hover:bg-black/20 text-xs px-3 py-1.5 rounded-full font-bold transition"
          >
            ‚úï Cerrar
          </button>
        </header>

        {/* Pesta√±as de Navegaci√≥n */}
        <div className="flex border-b border-[#C8D8CE] bg-[#E8F0EC]">
          <button
            onClick={() => setTab('video')}
            className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 \${
              tab === 'video'
                ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]'
                : 'text-[#52796F] hover:bg-[#FAF8F5]/50'
            }`}
          >
            Ìæ• Sala de Videollamada
          </button>
          <button
            onClick={() => setTab('archivos')}
            className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 \${
              tab === 'archivos'
                ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]'
                : 'text-[#52796F] hover:bg-[#FAF8F5]/50'
            }`}
          >
            Ì≥Å Fuentes y Archivos Enviados
          </button>
          <button
            onClick={() => setTab('notas')}
            className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 \${
              tab === 'notas'
                ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]'
                : 'text-[#52796F] hover:bg-[#FAF8F5]/50'
            }`}
          >
            Ì≥ù Notas & Acuerdos
          </button>
        </div>

        {/* Contenido Principal */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'video' && (
            <div className="space-y-4">
              <div className="bg-[#E8F0EC] p-3 rounded-2xl border border-[#84A59D]/40 flex items-center justify-between text-xs text-[#2C4A3E]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#84A59D] animate-pulse"></span>
                  <span className="font-bold">Estado:</span> Conexi√≥n de Videollamada Activa
                </div>
                <span className="text-[11px] text-[#52796F]">Entorno Seguro y Amable</span>
              </div>

              <div className="w-full h-[380px] bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE] overflow-hidden shadow-inner flex items-center justify-center">
                <iframe
                  src="[suspicious link removed]"
                  allow="camera; microphone; display-capture; autoplay; clipboard-write"
                  className="w-full h-full border-0"
                  title="Sala Virtual ASL Ideas SpA"
                />
              </div>
            </div>
          )}

          {tab === 'archivos' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] space-y-3 shadow-sm">
                <h3 className="text-sm font-bold text-[#2C4A3E]">Adjuntar Propuesta o Documento PDF (Supabase)</h3>
                <p className="text-xs text-[#52796F]">
                  Sube tus archivos de requisitos B2B para que el equipo t√©cnico y de dise√±o los revise en tiempo real.
                </p>
                <form onSubmit={handleSimularSubida} className="space-y-3 pt-2">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.png,.jpg"
                    onChange={(e) => setFile([enlace sospechoso eliminado].files?. || null)}
                    className="block w-full text-xs text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#E8F0EC] file:text-[#52796F] hover:file:bg-[#52796F] hover:file:text-white transition"
                  />
                  <button
                    type="submit"
                    disabled={!file || uploading}
                    className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition disabled:opacity-50"
                  >
                    {uploading ? 'Enviando a Supabase...' : 'Subir Documento a la Sala'}
                  </button>
                </form>
                {uploadSuccess && (
                  <div className="p-3 bg-[#E8F0EC] text-[#52796F] rounded-xl text-xs font-bold border border-[#84A59D]">
                    ‚úì Documento "{file?.name}" subido correctamente al bucket "documentos-peticiones".
                  </div>
                )}
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] space-y-3 shadow-sm">
                <h3 className="text-sm font-bold text-[#2C4A3E]">Registro de Fuentes y Documentos de la Sala</h3>
                <ul className="text-xs space-y-2 text-[#52796F]">
                  <li className="flex items-center justify-between p-2.5 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE]">
                    <span>Ì≥Ñ Propuesta_Licencia_B2B_Municipal.pdf</span>
                    <span className="text-[10px] bg-[#E8F0EC] px-2 py-0.5 rounded-md font-bold">Verificado</span>
                  </li>
                  <li className="flex items-center justify-between p-2.5 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE]">
                    <span>Ì≥Ñ Especificacion_Accesibilidad_UI_UX.pdf</span>
                    <span className="text-[10px] bg-[#E8F0EC] px-2 py-0.5 rounded-md font-bold">Verificado</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {tab === 'notas' && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] space-y-3 shadow-sm">
                <h3 className="text-sm font-bold text-[#2C4A3E]">Bloc de Notas R√°pidas de la Reuni√≥n</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nuevaNota}
                    onChange={(e) => setNuevaNota([enlace sospechoso eliminado].value)}
                    placeholder="Escribe un acuerdo o punto clave..."
                    className="flex-1 text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]"
                  />
                  <button
                    onClick={handleAgregarNota}
                    className="bg-[#52796F] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#2C4A3E] transition"
                  >
                    Guardar Nota
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {notas.length === 0 ? (
                  <p className="text-xs text-center text-[#84A59D] py-4">No hay notas registradas en esta sesi√≥n.</p>
                ) : (
                  [enlace sospechoso eliminado]((n, i) => (
                    <div key={i} className="p-3 bg-white border border-[#C8D8CE] rounded-xl text-xs text-[#2C4A3E] flex items-center justify-between">
                      <span>Ì≥å {n}</span>
                      <span className="text-[10px] text-[#84A59D]">Nota #{i + 1}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('components/SalaVirtualB2B.tsx', salaVirtualCode, 'utf8');

const pageCode = `'use client';

import React, { useState } from 'react';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppName, setCurrentAppName] = useState('Casa Matriz B2B');
  const [showSourcesPanel, setShowSourcesPanel] = useState(false);
  const [userNotes, setUserNotes] = useState<string[]>([
    'Revisi√≥n de accesibilidad UI/UX para ley TEA',
    'Conexi√≥n a bucket Supabase "documentos-peticiones" activa'
  ]);
  const [newNote, setNewNote] = useState('');

  const handleOpenRoom = (appName: string) => {
    setCurrentAppName(appName);
    setIsModalOpen(true);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setUserNotes([...userNotes, newNote.trim()]);
    setNewNote('');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C4A3E] flex flex-col font-sans">
      
      {/* BARRA SUPERIOR ELEGANTE CON REDES SOCIALES */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#C8D8CE] px-6 py-4 flex justify-between items-center shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl border border-[#84A59D] bg-[#E8F0EC] flex items-center justify-center font-bold text-[#52796F] text-sm shadow-sm">
            ASL
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-[#2C4A3E]">ASL Ideas SpA</h1>
            <p className="text-[11px] text-[#52796F] font-medium">Ecosistema de Salud Digital Inclusiva</p>
          </div>
        </div>

        {/* ACCIONES Y REDES SOCIALES */}
        <div className="flex items-center gap-3">
          {/* Iconos de Redes Sociales Corporativas */}
          <div className="hidden md:flex items-center gap-2 mr-2 border-r border-[#C8D8CE] pr-4">
            <a
              href="[suspicious link removed]"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn B2B"
              className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center text-[#52796F] hover:bg-[#52796F] hover:text-white transition-all text-xs font-bold"
            >
              in
            </a>
            <a
              href="[suspicious link removed]"
              target="_blank"
              rel="noreferrer"
              title="Instagram Comunidad"
              className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center text-[#52796F] hover:bg-[#52796F] hover:text-white transition-all text-xs font-bold"
            >
              ig
            </a>
            <a
              href="[suspicious link removed]"
              target="_blank"
              rel="noreferrer"
              title="Canal YouTube"
              className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center text-[#52796F] hover:bg-[#52796F] hover:text-white transition-all text-xs font-bold"
            >
              yt
            </a>
            <a
              href="[enlace sospechoso eliminado]"
              target="_blank"
              rel="noreferrer"
              title="WhatsApp Business"
              className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center text-[#52796F] hover:bg-[#52796F] hover:text-white transition-all text-xs font-bold"
            >
              wa
            </a>
          </div>

          <button
            onClick={() => setShowSourcesPanel(!showSourcesPanel)}
            className="border border-[#84A59D] text-[#52796F] hover:bg-[#E8F0EC] text-xs font-bold px-3 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <span>Ì≥Å</span> Fuentes & Notas ({userNotes.length})
          </button>

          <button
            onClick={() => handleOpenRoom('Casa Matriz B2B')}
            className="border-2 border-[#52796F] bg-[#52796F] text-white hover:bg-[#2C4A3E] text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm flex items-center gap-2"
          >
            <span>Ì¥ù</span> Agendar Reuni√≥n B2B
          </button>
        </div>
      </header>

      {/* PANEL LATERAL DE FUENTES Y NOTAS */}
      {showSourcesPanel && (
        <div className="bg-[#E8F0EC] border-b border-[#C8D8CE] p-6 transition-all">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Secci√≥n Fuentes / Documentos Subidos */}
            <div className="bg-white p-4 rounded-2xl border border-[#C8D8CE] space-y-3">
              <h3 className="text-xs font-bold text-[#2C4A3E] uppercase tracking-wider flex items-center gap-2">
                <span>Ì≥Å</span> Documentos Enviados (Supabase Storage)
              </h3>
              <ul className="text-xs space-y-2 text-[#52796F]">
                <li className="p-2 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] flex justify-between items-center">
                  <span>Ì≥Ñ Especificaciones_Casa_Matriz.pdf</span>
                  <span className="text-[10px] text-[#84A59D] font-bold">bucket: documentos-peticiones</span>
                </li>
                <li className="p-2 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] flex justify-between items-center">
                  <span>Ì≥Ñ Test_Salud_Integrativa_LAWENMOLL.pdf</span>
                  <span className="text-[10px] text-[#84A59D] font-bold">bucket: documentos-peticiones</span>
                </li>
              </ul>
            </div>

            {/* Secci√≥n Notas Personales / Trabajo */}
            <div className="bg-white p-4 rounded-2xl border border-[#C8D8CE] space-y-3">
              <h3 className="text-xs font-bold text-[#2C4A3E] uppercase tracking-wider flex items-center gap-2">
                <span>Ì≥ù</span> Crear Notas de la Plataforma
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote([enlace sospechoso eliminado].value)}
                  placeholder="Escribir una nota o recordatorio..."
                  className="flex-1 text-xs p-2 border border-[#C8D8CE] rounded-xl focus:outline-none"
                />
                <button
                  onClick={handleAddNote}
                  className="bg-[#52796F] text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-[#2C4A3E] transition"
                >
                  Agregar
                </button>
              </div>
              <ul className="text-xs space-y-1.5 text-[#2C4A3E] max-h-32 overflow-y-auto">
                {[enlace sospechoso eliminado]((note, idx) => (
                  <li key={idx} className="p-2 bg-[#FAF8F5] rounded-lg border border-[#C8D8CE]">
                    Ì≥å {note}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 space-y-12 w-full">
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block bg-[#E8F0EC] border border-[#84A59D]/40 text-[#2C4A3E] text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wide uppercase shadow-xs">
            Accesibilidad Cognitiva & Dise√±o Inclusivo (TEA / TDAH)
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C4A3E] tracking-tight leading-tight">
            Ecosistema de Salud Digital Amable y Muestra B2B
          </h2>
          <p className="text-sm text-[#52796F] leading-relaxed">
            Explora las 4 Oficinas Virtuales interactuando directamente con cada Sala Virtual corporativa para coordinar demostraciones, revisar propuestas y agendar reuniones.
          </p>
        </section>

        {/* GRILLA DE LAS 4 OFICINAS VIRTUALES CON BOTONES TOTALMENTE OPERATIVOS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. CASA MATRIZ B2B */}
          <div className="bg-white border border-[#C8D8CE] hover:border-[#52796F] transition-all rounded-3xl p-6 shadow-xs hover:shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-3 py-1 rounded-full border border-[#84A59D]/30">
                  Casa Matriz
                </span>
                <span className="text-2xl">ÌøõÔ∏è</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C4A3E]">ASL Ideas SpA ‚Äî B2B</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Desarrollo de software a medida, licencias corporativas para municipalidades y PYMES, y consultor√≠a en accesibilidad UI/UX.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleOpenRoom('Casa Matriz B2B')}
                className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Ìæ•</span> Abrir Sala Virtual Casa Matriz
              </button>
              <button
                onClick={() => handleOpenRoom('Casa Matriz B2B')}
                className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#E8F0EC] text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>Ì≥Ö</span> Agendar Reuni√≥n B2B
              </button>
            </div>
          </div>

          {/* 2. LAWENMOLL */}
          <div className="bg-white border border-[#C8D8CE] hover:border-[#52796F] transition-all rounded-3xl p-6 shadow-xs hover:shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-3 py-1 rounded-full border border-[#84A59D]/30">
                  Salud Integrativa
                </span>
                <span className="text-2xl">Ìπ∫</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C4A3E]">LAWENMOLL</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Test de Bienestar Inteligente, composici√≥n metab√≥lica, Fichas Cl√≠nicas protegidas bajo Ley N¬∞ 21.663 y conexi√≥n con especialistas.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleOpenRoom('LAWENMOLL ‚Äî Salud Integrativa')}
                className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Ìæ•</span> Abrir Sala Telemedicina LAWENMOLL
              </button>
              <button
                onClick={() => handleOpenRoom('LAWENMOLL ‚Äî Salud Integrativa')}
                className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#E8F0EC] text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>Ì≥Ö</span> Agendar Cita M√©dica
              </button>
            </div>
          </div>

          {/* 3. WELLNESS WEB APP */}
          <div className="bg-white border border-[#C8D8CE] hover:border-[#52796F] transition-all rounded-3xl p-6 shadow-xs hover:shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-3 py-1 rounded-full border border-[#84A59D]/30">
                  Movimiento Adaptado
                </span>
                <span className="text-2xl">Ìºø</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C4A3E]">Wellness Web App</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Pausas activas sin impacto, videoteca interactiva y salas virtuales de entrenamiento guiado (Lotus, Cielo, Bosque, Ra√≠z).
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleOpenRoom('Wellness Web App ‚Äî Movimiento Adaptado')}
                className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Ìæ•</span> Abrir Sala Taller Wellness
              </button>
              <button
                onClick={() => handleOpenRoom('Wellness Web App ‚Äî Movimiento Adaptado')}
                className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#E8F0EC] text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>Ì≥Ö</span> Agendar Clase Virtual
              </button>
            </div>
          </div>

          {/* 4. SABIDUR√çA ANCESTRAL */}
          <div className="bg-white border border-[#C8D8CE] hover:border-[#52796F] transition-all rounded-3xl p-6 shadow-xs hover:shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-3 py-1 rounded-full border border-[#84A59D]/30">
                  Comunidad & Herbolaria
                </span>
                <span className="text-2xl">Ì≥ú</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C4A3E]">Sabidur√≠a Ancestral</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Diario Mural comunitario de Secretos de la Abuela, recetarios herbolarios nativos en PDF y asistentes emp√°ticos de conversaci√≥n.
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleOpenRoom('Sabidur√≠a Ancestral ‚Äî Herbolaria & Comunidad')}
                className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Ìæ•</span> Abrir Sala Encuentro Herbolario
              </button>
              <button
                onClick={() => handleOpenRoom('Sabidur√≠a Ancestral ‚Äî Herbolaria & Comunidad')}
                className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#E8F0EC] text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>Ì≥Ö</span> Agendar Taller Comunidad
              </button>
            </div>
          </div>

        </section>
      </main>

      {/* FOOTER CORPORATIVO CON REDES SOCIALES */}
      <footer className="border-t border-[#C8D8CE] bg-[#FAF8F5] py-8 px-6 text-center space-y-4">
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="text-xs text-[#52796F] hover:underline font-bold flex items-center gap-1">
            <span>in</span> LinkedIn B2B
          </a>
          <span className="text-[#C8D8CE]">‚Ä¢</span>
          <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="text-xs text-[#52796F] hover:underline font-bold flex items-center gap-1">
            <span>ig</span> Instagram
          </a>
          <span className="text-[#C8D8CE]">‚Ä¢</span>
          <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="text-xs text-[#52796F] hover:underline font-bold flex items-center gap-1">
            <span>yt</span> YouTube Canal
          </a>
          <span className="text-[#C8D8CE]">‚Ä¢</span>
          <a href="[enlace sospechoso eliminado]" target="_blank" rel="noreferrer" className="text-xs text-[#52796F] hover:underline font-bold flex items-center gap-1">
            <span>wa</span> WhatsApp Business
          </a>
        </div>
        <p className="text-xs text-[#84A59D]">
          ¬© {new Date().getFullYear()} ASL Ideas SpA ‚Äî Salud Digital Integrativa, Accesible y Humana.
        </p>
      </footer>

      {/* MODAL SALA VIRTUAL B2B */}
      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appName={currentAppName}
      />

    </div>
  );
}
`;

fs.writeFileSync('app/page.tsx', pageCode, 'utf8');
console.log('‚úÖ app/page.tsx y componentes actualizados con exito.');
