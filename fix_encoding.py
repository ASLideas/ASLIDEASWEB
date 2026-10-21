import os

page_code = """'use client';

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
      
      {/* Triangulos Decorativos Identidad ASL Ideas */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <polygon points="100,20 180,180 20,180" fill="#52796F" />
          <polygon points="100,50 160,170 40,170" fill="#84A59D" />
        </svg>
      </div>

      {/* BARRA SUPERIOR */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#C8D8CE] px-6 py-4 flex justify-between items-center shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl border border-[#84A59D] bg-white p-1 flex items-center justify-center shadow-xs overflow-hidden">
            <img src="/LOGO_asl.png" alt="ASL Ideas" className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-base text-[#2C4A3E]">ASL Ideas SpA</h1>
            <p className="text-[11px] text-[#52796F] font-medium">Ecosistema de Salud Digital Inclusiva</p>
          </div>
        </div>

        {/* REDES SOCIALES Y BOTON REUNION B2B */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 mr-2 border-r border-[#C8D8CE] pr-4 text-xs font-bold text-[#52796F]">
            <a href="#" target="_blank" rel="noreferrer" title="LinkedIn B2B" className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center hover:bg-[#52796F] hover:text-white transition">in</a>
            <a href="#" target="_blank" rel="noreferrer" title="Instagram" className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center hover:bg-[#52796F] hover:text-white transition">ig</a>
            <a href="#" target="_blank" rel="noreferrer" title="YouTube" className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center hover:bg-[#52796F] hover:text-white transition">yt</a>
            <a href="#" target="_blank" rel="noreferrer" title="WhatsApp Business" className="w-8 h-8 rounded-full border border-[#84A59D]/60 flex items-center justify-center hover:bg-[#52796F] hover:text-white transition">wa</a>
          </div>

          <button 
            onClick={() => handleOpenRoom('Casa Matriz B2B', '/LOGO_asl.png')} 
            className="bg-[#52796F] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#2C4A3E] transition shadow-xs flex items-center gap-2"
          >
            <span>Ì¥ù</span> Agendar Reunion B2B
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 space-y-10 w-full z-10">
        
        {/* HERO INTRODUCCION */}
        <section className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="inline-block bg-[#E8F0EC] border border-[#84A59D]/40 text-[#2C4A3E] text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
            ‚ñ≤ Disenado para Neurodivergencias (TEA Grado 1 / TDAH)
          </span>
          <h2 className="text-3xl font-extrabold text-[#2C4A3E]">
            Ecosistema de Salud Digital & Accesibilidad UI/UX
          </h2>
          <p className="text-xs text-[#52796F] leading-relaxed">
            Baja sobrecarga sensorial, tonos amables (#52796F / #84A59D) y cumplimiento normativo de la Ley TEA (N¬∞ 21.545) y Ley N¬∞ 21.663.
          </p>
        </section>

        {/* GRILLA DE LAS 4 APLICACIONES CON LOGOS Y DESCRIPCIONES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. CASA MATRIZ B2B */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#E8F0EC] pb-3">
                <img src="/LOGO_asl.png" alt="ASL Ideas" className="w-12 h-12 object-contain" />
                <div>
                  <span className="text-[10px] font-bold text-[#52796F] uppercase bg-[#E8F0EC] px-2 py-0.5 rounded">Oficina 1</span>
                  <h3 className="text-base font-bold text-[#2C4A3E]">ASL Ideas SpA ‚Äî Casa Matriz</h3>
                </div>
              </div>
              <p className="text-xs text-[#52796F]">
                <strong>Ì≤° ¬øPor que se creo?</strong> Fundada por una Disenadora Grafica con TEA Grado 1 y TDAH para humanizar la salud digital y reducir la friccion en la atencion.
              </p>
              <p className="text-xs text-[#52796F]">
                <strong>‚ú® Beneficios:</strong> Consultoria UI/UX inclusiva, licencias corporativas B2B para municipalidades y empresas, y diseno amable.
              </p>
            </div>
            <button 
              onClick={() => handleOpenRoom('Casa Matriz B2B', '/LOGO_asl.png')} 
              className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2C4A3E] transition flex items-center justify-center gap-2"
            >
              <span>Ìæ•</span> Abrir Sala Virtual B2B / Calendario
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
              <p className="text-xs text-[#52796F]">
                <strong>Ì≤° ¬øPor que se creo?</strong> Para ofrecer evaluaciones clinicas y metabolicas preventivas sin juicios punitivos sobre el peso corporal ni estres.
              </p>
              <p className="text-xs text-[#52796F]">
                <strong>‚ú® Beneficios:</strong> Test de Bienestar Inteligente, Fichas Clinicas protegidas (Ley N¬∞ 21.663) y conexion directa con especialistas.
              </p>
            </div>
            <button 
              onClick={() => handleOpenRoom('LAWENMOLL ‚Äî Salud Integrativa', '/lawenmoll_logo.jpg')} 
              className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2C4A3E] transition flex items-center justify-center gap-2"
            >
              <span>Ìæ•</span> Abrir Sala Telemedicina / Calendario Citas
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
              <p className="text-xs text-[#52796F]">
                <strong>Ì≤° ¬øPor que se creo?</strong> Para personas con dolor articular, sobrepeso o movilidad reducida que necesitan activar su cuerpo sin el impacto de un gimnasio.
              </p>
              <p className="text-xs text-[#52796F]">
                <strong>‚ú® Beneficios:</strong> Pausas activas, videoteca guiada, salas tematicas (Lotus, Cielo, Bosque, Raiz) y modulos de cocina demostrativa.
              </p>
            </div>
            <button 
              onClick={() => handleOpenRoom('Wellness Web App', '/logo_wellness.jpg')} 
              className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2C4A3E] transition flex items-center justify-center gap-2"
            >
              <span>Ìæ•</span> Abrir Sala Taller Wellness / Calendario
            </button>
          </div>

          {/* 4. SABIDURIA ANCESTRAL */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#E8F0EC] pb-3">
                <img src="/LOGO_BIENESTAR.png" alt="Sabiduria Ancestral" className="w-12 h-12 object-contain" />
                <div>
                  <span className="text-[10px] font-bold text-[#52796F] uppercase bg-[#E8F0EC] px-2 py-0.5 rounded">Oficina 4</span>
                  <h3 className="text-base font-bold text-[#2C4A3E]">Sabiduria Ancestral</h3>
                </div>
              </div>
              <p className="text-xs text-[#52796F]">
                <strong>Ì≤° ¬øPor que se creo?</strong> Para rescatar y preservar la herbolaria nativa y los saberes comunitarios en un espacio seguro e intergeneracional.
              </p>
              <p className="text-xs text-[#52796F]">
                <strong>‚ú® Beneficios:</strong> Diario Mural de Secretos de la Abuela, recetarios descargables en PDF y asistente conversacional empatico.
              </p>
            </div>
            <button 
              onClick={() => handleOpenRoom('Sabiduria Ancestral', '/LOGO_BIENESTAR.png')} 
              className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2C4A3E] transition flex items-center justify-center gap-2"
            >
              <span>Ìæ•</span> Abrir Sala Herbolario / Calendario
            </button>
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

      {/* MODAL SALA VIRTUAL */}
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

with open('app/page.tsx', 'wb') as f:
    f.write(page_code.encode('utf-8'))

print("‚úÖ Archivo app/page.tsx escrito exitosamente en UTF-8 puro!")
