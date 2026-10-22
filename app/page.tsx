'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppName, setCurrentAppName] = useState('Casa Matriz ASL Ideas SpA (Desarrollo B2B & Licencias)');
  const [currentAppLogo, setCurrentAppLogo] = useState('/LOGO_asl.png');

  const handleOpenRoom = (appName: string, appLogo: string) => {
    setCurrentAppName(appName);
    setCurrentAppLogo(appLogo);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] flex flex-col font-sans relative">
      
      {/* DECORACIÓN VECTORIAL CORPORATIVA */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <polygon points="100,20 180,180 20,180" fill="#1B4D3E" />
          <polygon points="100,50 160,170 40,170" fill="#2D6A4F" />
        </svg>
      </div>

      {/* CABECERA CON NAVEGACIÓN COMPLETA Y REDES SOCIALES */}
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

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-[#1B4D3E]">
          <Link href="/" className="hover:text-[#2D6A4F] transition">Inicio</Link>
          <Link href="/aslideas" className="hover:text-[#2D6A4F] transition">Casa Matriz</Link>
          <Link href="/lawenmoll" className="hover:text-[#2D6A4F] transition">LAWENMOLL</Link>
          <Link href="/wellness" className="hover:text-[#2D6A4F] transition">Wellness App</Link>
          <Link href="/bienestar" className="hover:text-[#2D6A4F] transition">Sabiduría Ancestral</Link>
          <Link href="/comunidad" className="hover:text-[#2D6A4F] transition">Comunidad</Link>
          <Link href="/admin" className="text-[#B08D4B] hover:underline">Panel Admin</Link>
        </nav>

        {/* REDES SOCIALES & BOTÓN DE AGENDAMIENTO B2B */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-1.5 rounded-xl border border-[#C8D8CE]">
            <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" title="LinkedIn B2B" className="w-7 h-7 rounded-lg bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold transition">in</a>
            <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" title="Instagram Oficial" className="w-7 h-7 rounded-lg bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold transition">IG</a>
            <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" title="YouTube Canal" className="w-7 h-7 rounded-lg bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold transition">YT</a>
            <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" title="WhatsApp Business" className="w-7 h-7 rounded-lg bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white flex items-center justify-center text-xs font-bold transition">WA</a>
          </div>

          <button 
            onClick={() => handleOpenRoom('Casa Matriz ASL Ideas SpA (Desarrollo B2B & Licencias)', '/LOGO_asl.png')} 
            className="bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-2"
          >
            <span>🤝</span> Agendar Cita B2B
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL Y PORTADA */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 space-y-12 w-full z-10">
        
        {/* HERO Y PROPÓSITO INSTITUCIONAL */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
            ▲ Ecosistema Tecnológico de Salud Integrativa
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1B4D3E] tracking-tight leading-tight">
            Tecnología Humana y Amable para el Bienestar Integrativo
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Navegación clara, baja sobrecarga sensorial para neurodivergencias (TEA / TDAH) y cumplimiento normativo (Ley TEA N° 21.545 y Ley N° 21.663).
          </p>
        </section>

        {/* TARJETAS DE LAS 4 OFICINAS VIRTUALES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. CASA MATRIZ ASL IDEAS SPA */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#1B4D3E] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <img src="/LOGO_asl.png" alt="ASL Ideas" className="w-12 h-12 object-contain" />
                  <div>
                    <span className="text-[10px] font-bold text-[#B08D4B] uppercase bg-[#FAF8F5] border border-[#C8D8CE] px-2 py-0.5 rounded">Oficina 1</span>
                    <h3 className="text-base font-bold text-[#1B4D3E]">ASL Ideas SpA — Casa Matriz</h3>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>💡 Enfoque:</strong> Desarrollo de software a medida, licencias B2B y consultoría en accesibilidad UI/UX para neurodivergencias.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('Casa Matriz ASL Ideas SpA (Desarrollo B2B & Licencias)', '/LOGO_asl.png')} 
                className="bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition text-center shadow-xs"
              >
                🤝 Agendar Reunión
              </button>
              <Link 
                href="/aslideas" 
                className="bg-[#E8F0EC] hover:bg-[#C8D8CE] text-[#1B4D3E] text-xs font-bold py-2.5 rounded-xl transition text-center border border-[#C8D8CE] flex items-center justify-center"
              >
                🌐 Explorar App
              </Link>
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
                    <h3 className="text-base font-bold text-[#1B4D3E]">LAWENMOLL — Salud Integrativa</h3>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>💡 Enfoque:</strong> Test de Bienestar Inteligente, composición metabólica y demostración de Fichas Clínicas bajo Ley N° 21.663.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('LAWENMOLL (Salud Integrativa & Fichas Clínicas)', '/lawenmoll_logo.jpg')} 
                className="bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition text-center shadow-xs"
              >
                🤝 Agendar Reunión
              </button>
              <Link 
                href="/lawenmoll" 
                className="bg-[#E8F0EC] hover:bg-[#C8D8CE] text-[#1B4D3E] text-xs font-bold py-2.5 rounded-xl transition text-center border border-[#C8D8CE] flex items-center justify-center"
              >
                🌐 Explorar App
              </Link>
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
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>💡 Enfoque:</strong> Apoyo visual, salas virtuales interactivas y movimiento adaptado sin impacto para pausas activas.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('Wellness Web App (Movimiento Adaptado & Pausas Activas)', '/logo_wellness.jpg')} 
                className="bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition text-center shadow-xs"
              >
                🤝 Agendar Reunión
              </button>
              <Link 
                href="/wellness" 
                className="bg-[#E8F0EC] hover:bg-[#C8D8CE] text-[#1B4D3E] text-xs font-bold py-2.5 rounded-xl transition text-center border border-[#C8D8CE] flex items-center justify-center"
              >
                🌐 Explorar App
              </Link>
            </div>
          </div>

          {/* 4. SABIDURÍA ANCESTRAL */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#1B4D3E] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-3">
                  <img src="/LOGO_BIENESTAR.png" alt="Sabiduría Ancestral" className="w-12 h-12 object-contain" />
                  <div>
                    <span className="text-[10px] font-bold text-[#B08D4B] uppercase bg-[#FAF8F5] border border-[#C8D8CE] px-2 py-0.5 rounded">Oficina 4</span>
                    <h3 className="text-base font-bold text-[#1B4D3E]">Sabiduría Ancestral</h3>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>💡 Enfoque:</strong> Red de mensajería propia, monitoreo de hábitos, descanso Morfeo y recetario herbolario descargable.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('Sabiduría Ancestral (Comunidad & Herbolaria Nativa)', '/LOGO_BIENESTAR.png')} 
                className="bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition text-center shadow-xs"
              >
                🤝 Agendar Reunión
              </button>
              <Link 
                href="/bienestar" 
                className="bg-[#E8F0EC] hover:bg-[#C8D8CE] text-[#1B4D3E] text-xs font-bold py-2.5 rounded-xl transition text-center border border-[#C8D8CE] flex items-center justify-center"
              >
                🌐 Explorar App
              </Link>
            </div>
          </div>

        </section>

      </main>

      {/* FOOTER CORPORATIVO */}
      <footer className="border-t border-[#C8D8CE] bg-white py-8 px-6 text-center space-y-4 text-xs text-gray-600">
        <div className="flex justify-center items-center gap-4">
          <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1B4D3E] hover:underline">LinkedIn B2B</a>
          <span>•</span>
          <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1B4D3E] hover:underline">Instagram</a>
          <span>•</span>
          <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1B4D3E] hover:underline">YouTube</a>
          <span>•</span>
          <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" className="font-bold text-[#2D6A4F] hover:underline">WhatsApp Business</a>
        </div>
        <p>© 2026 ASL Ideas SpA — Salud Digital Integrativa, Accesible y Humana. Todos los derechos reservados.</p>
      </footer>

      {/* MODAL SALA VIRTUAL E INTELIGENTE DE CITAS */}
      <SalaVirtualB2B 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialApp={currentAppName} 
        appLogo={currentAppLogo} 
      />
    </div>
  );
}