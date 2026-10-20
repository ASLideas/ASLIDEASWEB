'use client';

import React, { useState } from 'react';
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
      
      {/* Tri√°ngulos Decorativos Identidad ASL Ideas */}
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
            <img src="/LOGO_asl.png" alt="ASL" className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-base text-[#2C4A3E]">ASL Ideas SpA</h1>
            <p className="text-[11px] text-[#52796F] font-medium">Ecosistema de Salud Digital Inclusiva</p>
          </div>
        </div>

        {/* REDES SOCIALES Y BOTON B2B */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 mr-2 border-r border-[#C8D8CE] pr-4 text-xs font-bold text-[#52796F]">
            <a href="[suspicious link removed]" target="_blank" rel="noreferrer" title="LinkedIn B2B" className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center hover:bg-[#52796F] hover:text-white transition">in</a>
            <a href="[suspicious link removed]" target="_blank" rel="noreferrer" title="Instagram" className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center hover:bg-[#52796F] hover:text-white transition">ig</a>
            <a href="[suspicious link removed]" target="_blank" rel="noreferrer" title="YouTube" className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center hover:bg-[#52796F] hover:text-white transition">yt</a>
            <a href="[suspicious link removed]" target="_blank" rel="noreferrer" title="WhatsApp" className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center hover:bg-[#52796F] hover:text-white transition">wa</a>
          </div>

          <button onClick={() => handleOpenRoom('Casa Matriz B2B', '/LOGO_asl.png')} className="bg-[#52796F] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#2C4A3E] transition shadow-xs flex items-center gap-2">
            <span>Ì¥ù</span> Agendar Reuni√≥n B2B
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 space-y-10 w-full z-10">
        
        <section className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="bg-[#E8F0EC] border border-[#84A59D]/40 text-[#2C4A3E] text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
            ‚ñ≤ Dise√±ado para Neurodivergencias (TEA Grado 1 / TDAH)
          </span>
          <h2 className="text-3xl font-extrabold text-[#2C4A3E]">Ecosistema de Salud Digital & Accesibilidad UI/UX</h2>
          <p className="text-xs text-[#52796F] leading-relaxed">Baja sobrecarga sensorial, tonos amables (#52796F / #84A59D) y cumplimiento de Ley TEA (N¬∞ 21.545) y Ley N¬∞ 21.663.</p>
        </section>

        {/* GRILLA DE LAS 4 APPS CON LOGOS, OBJETIVOS Y BENEFICIOS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. CASA MATRIZ */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#E8F0EC] pb-3">
                <img src="/LOGO_asl.png" alt="ASL Ideas" className="w-12 h-12 object-contain" />
                <div>
                  <span className="text-[10px] font-bold text-[#52796F] uppercase bg-[#E8F0EC] px-2 py-0.5 rounded">Oficina 1</span>
                  <h3 className="text-base font-bold text-[#2C4A3E]">ASL Ideas SpA ‚Äî Casa Matriz</h3>
                </div>
              </div>
              <p className="text-xs text-[#52796F]"><strong>Ì≤° ¬øPor qu√© se cre√≥?</strong> Fundada por Dise√±adora Gr√°fica con TEA Grado 1 y TDAH para humanizar la salud digital.</p>
              <p className="text-xs text-[#52796F]"><strong>‚ú® Beneficios:</strong> Consultor√≠a UI/UX inclusiva, licencias corporativas B2B y convenios institucionales.</p>
            </div>
            <button onClick={() => handleOpenRoom('Casa Matriz B2B', '/LOGO_asl.png')} className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2C4A3E] transition">
              Ìæ• Abrir Sala Virtual / Calendario B2B
            </button>
          </div>

          {/* 2. LAWENMOLL */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#E8F0EC] pb-3">
                <img src="/lawenmoll_logo.jpg" alt="LAWENMOLL" className="w-12 h-12 object-contain" />
                <div>
                  <span className="text-[10px] font-bold text-[#52796F] uppercase bg-[#E8F0EC] px-2 py-0.5 rounded">Oficina 2</span>
                  <h3 className="text-base font-bold text-[#2C4A3E]">LAWENMOLL ‚Äî Salud Integrativa</h3>
                </div>
              </div>
              <p className="text-xs text-[#52796F]"><strong>Ì≤° ¬øPor qu√© se cre√≥?</strong> Diagn√≥stico preventivo amable sin juicios punitivos sobre el peso corporal ni estr√©s.</p>
              <p className="text-xs text-[#52796F]"><strong>‚ú® Beneficios:</strong> Test metab√≥lico inteligente, Fichas Cl√≠nicas encriptadas (Ley N¬∞ 21.663) y telemedicina.</p>
            </div>
            <button onClick={() => handleOpenRoom('LAWENMOLL ‚Äî Salud Integrativa', '/lawenmoll_logo.jpg')} className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2C4A3E] transition">
              Ìæ• Abrir Sala Telemedicina / Calendario Citas
            </button>
          </div>

          {/* 3. WELLNESS WEB APP */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#E8F0EC] pb-3">
                <img src="/logo_wellness.jpg" alt="Wellness" className="w-12 h-12 object-contain" />
                <div>
                  <span className="text-[10px] font-bold text-[#52796F] uppercase bg-[#E8F0EC] px-2 py-0.5 rounded">Oficina 3</span>
                  <h3 className="text-base font-bold text-[#2C4A3E]">Wellness Web App</h3>
                </div>
              </div>
              <p className="text-xs text-[#52796F]"><strong>Ì≤° ¬øPor qu√© se cre√≥?</strong> Ejercicio adaptado sin impacto para personas con dolor articular, sobrepeso o movilidad reducida.</p>
              <p className="text-xs text-[#52796F]"><strong>‚ú® Beneficios:</strong> Pausas activas, videoteca, salas tem√°ticas (Lotus, Cielo, Bosque) y cocina demostrativa.</p>
            </div>
            <button onClick={() => handleOpenRoom('Wellness Web App', '/logo_wellness.jpg')} className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2C4A3E] transition">
              Ìæ• Abrir Sala Taller Wellness / Calendario
            </button>
          </div>

          {/* 4. SABIDUR√çA ANCESTRAL */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#E8F0EC] pb-3">
                <img src="/LOGO_BIENESTAR.png" alt="Sabidur√≠a Ancestral" className="w-12 h-12 object-contain" />
                <div>
                  <span className="text-[10px] font-bold text-[#52796F] uppercase bg-[#E8F0EC] px-2 py-0.5 rounded">Oficina 4</span>
                  <h3 className="text-base font-bold text-[#2C4A3E]">Sabidur√≠a Ancestral</h3>
                </div>
              </div>
              <p className="text-xs text-[#52796F]"><strong>Ì≤° ¬øPor qu√© se cre√≥?</strong> Para preservar la herbolaria nativa y remedios populares en un entorno comunitario seguro.</p>
              <p className="text-xs text-[#52796F]"><strong>‚ú® Beneficios:</strong> Diario Mural de Secretos de la Abuela, recetarios PDF y agente de conversaci√≥n emp√°tica.</p>
            </div>
            <button onClick={() => handleOpenRoom('Sabidur√≠a Ancestral', '/LOGO_BIENESTAR.png')} className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2C4A3E] transition">
              Ìæ• Abrir Sala Herbolario / Calendario
            </button>
          </div>

        </section>

        {/* PR√ìXIMAMENTE / APPS EN CONSTRUCCI√ìN */}
        <section className="bg-white border-2 border-[#C8D8CE] rounded-3xl p-6 space-y-4 shadow-xs">
          <div className="flex justify-between items-center border-b border-[#E8F0EC] pb-3">
            <h3 className="text-base font-bold text-[#2C4A3E]">Pr√≥ximamente en ASL Ideas SpA Ì∫Ä</h3>
            <span className="text-xs font-bold text-[#52796F] bg-[#E8F0EC] px-3 py-1 rounded-full">En Desarrollo</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-1">
              <h4 className="text-xs font-bold text-[#2C4A3E]">Ìª°Ô∏è Vikingos Talleres</h4>
              <p className="text-[11px] text-[#52796F]">Formaci√≥n pr√°ctica en oficios, autonom√≠a y adaptabilidad personal.</p>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-1">
              <h4 className="text-xs font-bold text-[#2C4A3E]">‚öîÔ∏è Apoderados Aguerridos</h4>
              <p className="text-[11px] text-[#52796F]">Red de orientaci√≥n y contenci√≥n estrat√©gica para familias TEA/TDAH.</p>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-1">
              <h4 className="text-xs font-bold text-[#2C4A3E]">Ìµæ Patiperros Rutas</h4>
              <p className="text-[11px] text-[#52796F]">Senderismo adaptado y rutas sensoriales al aire libre sin barreras.</p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#C8D8CE] bg-[#FAF8F5] py-6 text-center text-xs text-[#84A59D]">
        ¬© 2026 ASL Ideas SpA ‚Äî Salud Digital Integrativa, Accesible y Humana.
      </footer>

      <SalaVirtualB2B isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} appName={currentAppName} appLogo={currentAppLogo} />
    </div>
  );
}
