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
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D6A4F] flex flex-col font-sans relative">
      
      {/* DECORACIÓN VECTORIAL CORPORATIVA EN DORADO */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <polygon points="100,20 180,180 20,180" fill="#D4AF37" />
          <polygon points="100,50 160,170 40,170" fill="#52796F" />
        </svg>
      </div>

      {/* CABECERA CON VERDE CLARO, ACCESORIOS ROSADOS Y BOTÓN VOLVER ATRÁS */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-[#D4AF37] px-6 py-4 flex flex-wrap justify-between items-center shadow-xs gap-4">
        
        {/* LOGO E IDENTIDAD CON LOGO CIRCULAR Y MÁS GRANDE */}
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#D4AF37] bg-white p-1 flex items-center justify-center overflow-hidden shadow-xs flex-shrink-0">
            <img src="/LOGO_asl.png" alt="ASL Ideas SpA" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-[#2D6A4F] tracking-tight">ASL Ideas SpA</h1>
            <p className="text-xs text-[#52796F] font-medium">Ecosistema de Salud Digital Inclusiva</p>
          </div>
        </div>

        {/* NAVEGACIÓN PRINCIPAL SIN EMOJIS */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-[#2D6A4F]">
          <Link href="/" className="hover:text-[#52796F] transition">Inicio</Link>
          <Link href="/aslideas" className="hover:text-[#52796F] transition">Casa Matriz</Link>
          <Link href="/lawenmoll" className="hover:text-[#52796F] transition">LAWENMOLL</Link>
          <Link href="/wellness" className="hover:text-[#52796F] transition">Wellness App</Link>
          <Link href="/bienestar" className="hover:text-[#52796F] transition">Sabiduría Ancestral</Link>
          <Link href="/comunidad" className="hover:text-[#52796F] transition">Comunidad</Link>
          <Link href="/admin" className="text-[#D85260] hover:underline bg-[#FFF0F2] px-2.5 py-1 rounded-full border border-[#FF8894]">Panel Admin</Link>
        </nav>

        {/* BOTÓN VOLVER ATRÁS Y AGENDAMIENTO B2B */}
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="text-xs font-bold text-[#D85260] bg-[#FFF0F2] hover:bg-[#FF8894] hover:text-white px-3.5 py-2 rounded-xl border border-[#FF8894] transition"
          >
            ← Volver Atrás
          </Link>

          <button 
            onClick={() => handleOpenRoom('Casa Matriz ASL Ideas SpA (Desarrollo B2B & Licencias)', '/LOGO_asl.png')} 
            className="bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs"
          >
            Agendar Cita B2B
          </button>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL Y PORTADA */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 space-y-12 w-full z-10">
        
        {/* HERO Y PROPÓSITO INSTITUCIONAL CON BANNER ROSADO */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Salud Digital Integrativa
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Cumplimiento Ley TEA & Ley N° 21.663
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2D6A4F] tracking-tight leading-tight">
            Tecnología Humana y Amable para el Bienestar Integrativo
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Navegación clara, baja sobrecarga sensorial para neurodivergencias (TEA / TDAH) y cumplimiento normativo.
          </p>
        </section>

        {/* TARJETAS DE LAS 4 OFICINAS VIRTUALES CON LOGOS CIRCULARES Y MÁS GRANDES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. CASA MATRIZ ASL IDEAS SPA */}
          <div className="bg-white border-2 border-[#D4AF37] hover:border-[#52796F] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-4">
                  {/* LOGO CIRCULAR GRANDE */}
                  <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] p-1 bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src="/LOGO_asl.png" alt="ASL Ideas" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#D85260] uppercase bg-[#FFF0F2] border border-[#FF8894] px-2 py-0.5 rounded">Oficina 1</span>
                    <h3 className="text-base font-bold text-[#2D6A4F]">ASL Ideas SpA — Casa Matriz</h3>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>Enfoque:</strong> Desarrollo de software a medida, licencias B2B y consultoría en accesibilidad UI/UX para neurodivergencias.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('Casa Matriz ASL Ideas SpA (Desarrollo B2B & Licencias)', '/LOGO_asl.png')} 
                className="bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition text-center shadow-xs"
              >
                Agendar Reunión
              </button>
              <Link 
                href="/aslideas" 
                className="bg-[#FFF0F2] hover:bg-[#FF8894] hover:text-white text-[#D85260] text-xs font-bold py-2.5 rounded-xl transition text-center border border-[#FF8894] flex items-center justify-center"
              >
                Explorar App
              </Link>
            </div>
          </div>

          {/* 2. LAWENMOLL */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-4">
                  {/* LOGO CIRCULAR GRANDE */}
                  <div className="w-16 h-16 rounded-full border-2 border-[#C8D8CE] p-1 bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src="/lawenmoll_logo.jpg" alt="LAWENMOLL" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#2D6A4F] uppercase bg-[#E8F0EC] border border-[#C8D8CE] px-2 py-0.5 rounded">Oficina 2</span>
                    <h3 className="text-base font-bold text-[#2D6A4F]">LAWENMOLL — Salud Integrativa</h3>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>Enfoque:</strong> Test de Bienestar Inteligente, composición metabólica y demostración de Fichas Clínicas bajo Ley N° 21.663.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('LAWENMOLL (Salud Integrativa & Fichas Clínicas)', '/lawenmoll_logo.jpg')} 
                className="bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition text-center shadow-xs"
              >
                Agendar Reunión
              </button>
              <Link 
                href="/lawenmoll" 
                className="bg-[#E8F0EC] hover:bg-[#C8D8CE] text-[#2D6A4F] text-xs font-bold py-2.5 rounded-xl transition text-center border border-[#C8D8CE] flex items-center justify-center"
              >
                Explorar App
              </Link>
            </div>
          </div>

          {/* 3. WELLNESS WEB APP */}
          <div className="bg-white border-2 border-[#C8D8CE] hover:border-[#52796F] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-4">
                  {/* LOGO CIRCULAR GRANDE */}
                  <div className="w-16 h-16 rounded-full border-2 border-[#C8D8CE] p-1 bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src="/logo_wellness.jpg" alt="Wellness" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#2D6A4F] uppercase bg-[#E8F0EC] border border-[#C8D8CE] px-2 py-0.5 rounded">Oficina 3</span>
                    <h3 className="text-base font-bold text-[#2D6A4F]">Wellness Web App</h3>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>Enfoque:</strong> Apoyo visual, salas virtuales interactivas y movimiento adaptado sin impacto para pausas activas.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('Wellness Web App (Movimiento Adaptado & Pausas Activas)', '/logo_wellness.jpg')} 
                className="bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition text-center shadow-xs"
              >
                Agendar Reunión
              </button>
              <Link 
                href="/wellness" 
                className="bg-[#E8F0EC] hover:bg-[#C8D8CE] text-[#2D6A4F] text-xs font-bold py-2.5 rounded-xl transition text-center border border-[#C8D8CE] flex items-center justify-center"
              >
                Explorar App
              </Link>
            </div>
          </div>

          {/* 4. SABIDURÍA ANCESTRAL */}
          <div className="bg-white border-2 border-[#D4AF37] hover:border-[#52796F] transition rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#E8F0EC] pb-3">
                <div className="flex items-center gap-4">
                  {/* LOGO CIRCULAR GRANDE */}
                  <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] p-1 bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img src="/LOGO_BIENESTAR.png" alt="Sabiduría Ancestral" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#D85260] uppercase bg-[#FFF0F2] border border-[#FF8894] px-2 py-0.5 rounded">Oficina 4</span>
                    <h3 className="text-base font-bold text-[#2D6A4F]">Sabiduría Ancestral</h3>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong>Enfoque:</strong> Red de mensajería propia, monitoreo de hábitos, descanso Morfeo y recetario herbolario descargable.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E8F0EC]">
              <button 
                onClick={() => handleOpenRoom('Sabiduría Ancestral (Comunidad & Herbolaria Nativa)', '/LOGO_BIENESTAR.png')} 
                className="bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition text-center shadow-xs"
              >
                Agendar Reunión
              </button>
              <Link 
                href="/bienestar" 
                className="bg-[#FFF0F2] hover:bg-[#FF8894] hover:text-white text-[#D85260] text-xs font-bold py-2.5 rounded-xl transition text-center border border-[#FF8894] flex items-center justify-center"
              >
                Explorar App
              </Link>
            </div>
          </div>

        </section>

      </main>

      {/* FOOTER CORPORATIVO */}
      <footer className="border-t border-[#C8D8CE] bg-white py-8 px-6 text-center space-y-4 text-xs text-gray-600">
        <div className="flex justify-center items-center gap-4">
          <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" className="font-bold text-[#2D6A4F] hover:underline">LinkedIn B2B</a>
          <span>•</span>
          <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" className="font-bold text-[#2D6A4F] hover:underline">Instagram</a>
          <span>•</span>
          <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" className="font-bold text-[#2D6A4F] hover:underline">YouTube</a>
          <span>•</span>
          <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" className="font-bold text-[#D85260] hover:underline bg-[#FFF0F2] px-2.5 py-1 rounded-full border border-[#FF8894]">WhatsApp Business</a>
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