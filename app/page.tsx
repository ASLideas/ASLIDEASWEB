'use client';

import React, { useState } from 'react';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppName, setCurrentAppName] = useState('Casa Matriz B2B');
  const [currentAppLogo, setCurrentAppLogo] = useState('/LOGO_asl.png');
  const [showSourcesPanel, setShowSourcesPanel] = useState(false);
  
  const [userNotes, setUserNotes] = useState<string[]>([
    'Revisión de accesibilidad UI/UX para ley TEA (Ley N° 21.545)',
    'Conexión activa a bucket Supabase "documentos-peticiones"',
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
      
      {/* Elementos Decorativos con Triángulos de Identidad Visual ASL Ideas */}
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
            <span>���</span> Fuentes & Notas ({userNotes.length})
          </button>

          <button
            onClick={() => handleOpenRoom('Casa Matriz B2B', '/LOGO_asl.png')}
            className="border-2 border-[#52796F] bg-[#52796F] text-white hover:bg-[#2C4A3E] text-xs font-bold px-4 py-2 rounded-xl transition shadow-sm flex items-center gap-2"
          >
            <span>���</span> Agendar Reunión B2B
          </button>
        </div>
      </header>

      {/* PANEL LATERAL INTERACTIVO DE FUENTES Y NOTAS DE TRABAJO */}
      {showSourcesPanel && (
        <div className="bg-[#E8F0EC] border-b border-[#C8D8CE] p-6 transition-all z-30">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white p-4.5 rounded-2xl border border-[#C8D8CE] space-y-3 shadow-xs">
              <h3 className="text-xs font-bold text-[#2C4A3E] uppercase tracking-wider flex items-center gap-2">
                <span>���</span> Documentos & Fichas Enviadas (Supabase Storage)
              </h3>
              <ul className="text-xs space-y-2 text-[#52796F]">
                <li className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] flex justify-between items-center">
                  <span>��� Propuesta_Licencias_B2B_Municipal.pdf</span>
                  <span className="text-[10px] bg-[#E8F0EC] text-[#2C4A3E] px-2 py-0.5 rounded font-bold">documentos-peticiones</span>
                </li>
                <li className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] flex justify-between items-center">
                  <span>��� Test_Composicion_Metabolica_LAWENMOLL.pdf</span>
                  <span className="text-[10px] bg-[#E8F0EC] text-[#2C4A3E] px-2 py-0.5 rounded font-bold">documentos-peticiones</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4.5 rounded-2xl border border-[#C8D8CE] space-y-3 shadow-xs">
              <h3 className="text-xs font-bold text-[#2C4A3E] uppercase tracking-wider flex items-center gap-2">
                <span>���</span> Bloc de Notas Rápido de Plataforma
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote([enlace sospechoso eliminado].value)}
                  placeholder="Añadir una nota de reunión..."
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
                    <span>���</span> <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 space-y-12 w-full z-10">
        
        {/* HERO INTRODUCCIÓN */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#E8F0EC] border border-[#84A59D]/40 text-[#2C4A3E] text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wide uppercase shadow-xs">
            <svg width="12" height="12" viewBox="0 0 100 100" fill="#52796F"><polygon points="50,10 90,90 10,90" /></svg>
            Diseñado por y para Neurodivergencias (TEA Grado 1 / TDAH)
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C4A3E] tracking-tight leading-tight">
            Ecosistema Digital de Salud Integrativa y Tecnología Amable
          </h2>
          <p className="text-sm text-[#52796F] leading-relaxed">
            Sin sobrecarga sensorial, sin lenguaje punitivo y con accesibilidad cognitiva desde la primera línea de código.
          </p>
        </section>

        {/* GRILLA DE LAS 4 OFICINAS VIRTUALES (CON LOGOS, BENEFICIOS Y POR QUÉ SE CREARON) */}
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
                    <h3 className="text-lg font-bold text-[#2C4A3E] mt-0.5">ASL Ideas SpA — Casa Matriz</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#52796F]">
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">LinkedIn</a> •
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">WhatsApp</a>
                </div>
              </div>

              {/* ¿Por qué se hizo? */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#C8D8CE] space-y-1">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  ��� <span>¿Por qué se creó?</span>
                </p>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Fundada por una Diseñadora Gráfica con TEA Grado 1 y TDAH para transformar la salud digital en un proceso humano, intuitivo y sin sobrecarga sensorial.
                </p>
              </div>

              {/* Beneficios */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  ✨ <span>Beneficios Clave:</span>
                </p>
                <ul className="text-xs text-[#52796F] space-y-1 list-disc list-inside">
                  <li>Desarrollo B2B a medida y consultoría en UI/UX accesible.</li>
                  <li>Licencias institucionales adaptadas para municipalidades.</li>
                  <li>Cumplimiento riguroso Ley TEA (N° 21.545) y Ley N° 21.663.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E8F0EC]">
              <button
                onClick={() => handleOpenRoom('Casa Matriz B2B', '/LOGO_asl.png')}
                className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>���</span> Abrir Sala Virtual Casa Matriz
              </button>
              <button
                onClick={() => handleOpenRoom('Casa Matriz B2B', '/LOGO_asl.png')}
                className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#E8F0EC] text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>���</span> Agendar Reunión B2B / Calendario
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
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">Instagram</a> •
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">Telemedicina</a>
                </div>
              </div>

              {/* ¿Por qué se hizo? */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#C8D8CE] space-y-1">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  ��� <span>¿Por qué se creó?</span>
                </p>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Para resolver la alta deserción en salud digital mediante evaluaciones amables, eliminando la frustración y pautas punitivas sobre el peso corporal.
                </p>
              </div>

              {/* Beneficios */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  ✨ <span>Beneficios Clave:</span>
                </p>
                <ul className="text-xs text-[#52796F] space-y-1 list-disc list-inside">
                  <li>Test de Bienestar Inteligente y cálculo metabólico respetuoso.</li>
                  <li>Fichas Clínicas encriptadas bajo estándares Ley N° 21.663.</li>
                  <li>Gestión de citas con Especialistas y Terapeutas Integrativos.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E8F0EC]">
              <button
                onClick={() => handleOpenRoom('LAWENMOLL — Salud Integrativa', '/lawenmoll_logo.jpg')}
                className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>���</span> Abrir Sala Telemedicina LAWENMOLL
              </button>
              <button
                onClick={() => handleOpenRoom('LAWENMOLL — Salud Integrativa', '/lawenmoll_logo.jpg')}
                className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#E8F0EC] text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>���</span> Agendar Cita Médica / Calendario
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
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">YouTube</a> •
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">Instagram</a>
                </div>
              </div>

              {/* ¿Por qué se hizo? */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#C8D8CE] space-y-1">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  ��� <span>¿Por qué se creó?</span>
                </p>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Para personas con dolor articular, sobrepeso o movilidad reducida que necesitan activar su cuerpo sin el estrés ni los impactos de un gimnasio tradicional.
                </p>
              </div>

              {/* Beneficios */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  ✨ <span>Beneficios Clave:</span>
                </p>
                <ul className="text-xs text-[#52796F] space-y-1 list-disc list-inside">
                  <li>Movimiento adaptado sin impacto y videoteca de pausas activas.</li>
                  <li>Salas virtuales temáticas de entrenamiento (Lotus, Cielo, Bosque, Raíz).</li>
                  <li>Cocina demostrativa y pautas de nutrición integrativa.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E8F0EC]">
              <button
                onClick={() => handleOpenRoom('Wellness Web App — Movimiento Adaptado', '/logo_wellness.jpg')}
                className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>���</span> Abrir Sala Taller Wellness
              </button>
              <button
                onClick={() => handleOpenRoom('Wellness Web App — Movimiento Adaptado', '/logo_wellness.jpg')}
                className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#E8F0EC] text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>���</span> Agendar Clase Virtual / Calendario
              </button>
            </div>
          </div>

          {/* 4. SABIDURÍA ANCESTRAL */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition-all rounded-3xl p-6 shadow-xs hover:shadow-md flex flex-col justify-between space-y-5 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl border border-[#84A59D] bg-white p-1 flex items-center justify-center overflow-hidden">
                    <img src="/LOGO_BIENESTAR.png" alt="Logo Sabiduría Ancestral" className="max-h-full max-w-full object-contain" onError={(e) => { ([enlace sospechoso eliminado] as HTMLElement).style.display = 'none'; }} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-2.5 py-0.5 rounded-full">
                      Oficina 4
                    </span>
                    <h3 className="text-lg font-bold text-[#2C4A3E] mt-0.5">Sabiduría Ancestral</h3>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#52796F]">
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">Facebook</a> •
                  <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline font-bold">Comunidad</a>
                </div>
              </div>

              {/* ¿Por qué se hizo? */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#C8D8CE] space-y-1">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  ��� <span>¿Por qué se creó?</span>
                </p>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Para preservar los saberes populares de la herbolaria nativa y pautas familiares, conectando generaciones mediante un espacio comunitario seguro.
                </p>
              </div>

              {/* Beneficios */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-[#2C4A3E] flex items-center gap-1">
                  ✨ <span>Beneficios Clave:</span>
                </p>
                <ul className="text-xs text-[#52796F] space-y-1 list-disc list-inside">
                  <li>Diario Mural comunitario de "Secretos de la Abuela".</li>
                  <li>Recetario de fitoterapia nativa con generación de PDF descargable.</li>
                  <li>Agente Conversacional Empático con respuesta respetuosa.</li>
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E8F0EC]">
              <button
                onClick={() => handleOpenRoom('Sabiduría Ancestral — Fitoterapia', '/LOGO_BIENESTAR.png')}
                className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>���</span> Abrir Sala Encuentro Herbolario
              </button>
              <button
                onClick={() => handleOpenRoom('Sabiduría Ancestral — Fitoterapia', '/LOGO_BIENESTAR.png')}
                className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#E8F0EC] text-xs font-bold py-2 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>���</span> Agendar Taller Comunidad / Calendario
              </button>
            </div>
          </div>

        </section>

        {/* NUEVA SECCIÓN: APLICACIONES Y MÓDULOS EN CONSTRUCCIÓN / PRÓXIMAMENTE */}
        <section className="bg-white border-2 border-[#C8D8CE] rounded-3xl p-8 space-y-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E8F0EC] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#52796F] px-3 py-1 rounded-full">
                Próximamente en ASL Ideas SpA
              </span>
              <h3 className="text-xl font-extrabold text-[#2C4A3E] mt-2">
                Nuevas Aplicaciones & Módulos en Construcción ���
              </h3>
              <p className="text-xs text-[#52796F] mt-1">
                Ampliando el ecosistema de autonomía, contención familiar y rutas sensoriales.
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
                  <span className="text-2xl">���️</span>
                  <span className="text-[10px] font-bold text-[#52796F] bg-[#E8F0EC] px-2 py-0.5 rounded">En Desarrollo</span>
                </div>
                <h4 className="text-sm font-bold text-[#2C4A3E]">Vikingos Talleres</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Espacio práctico de formación en oficios, habilidades prácticas y adaptabilidad para promover la independencia y autonomía.
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
                  <span className="text-2xl">⚔️</span>
                  <span className="text-[10px] font-bold text-[#52796F] bg-[#E8F0EC] px-2 py-0.5 rounded">En Desarrollo</span>
                </div>
                <h4 className="text-sm font-bold text-[#2C4A3E]">Apoderados Aguerridos</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Red de orientación y contención estratégica para familias y cuidadores de personas neurodivergentes (TEA y TDAH).
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
                  <span className="text-2xl">���</span>
                  <span className="text-[10px] font-bold text-[#52796F] bg-[#E8F0EC] px-2 py-0.5 rounded">En Desarrollo</span>
                </div>
                <h4 className="text-sm font-bold text-[#2C4A3E]">Patiperros Rutas</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Guía interactiva de rutas sensoriales, senderismo adaptado y turismo inclusivo al aire libre libre de barreras físicas.
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
          <span className="text-[#C8D8CE]">•</span>
          <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
          <span className="text-[#C8D8CE]">•</span>
          <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline">YouTube</a>
          <span className="text-[#C8D8CE]">•</span>
          <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline">WhatsApp Business</a>
        </div>
        <p className="text-xs text-[#84A59D]">
          © {new Date().getFullYear()} ASL Ideas SpA — Salud Digital Integrativa, Accesible e Inclusiva.
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
