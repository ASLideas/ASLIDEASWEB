'use client';

import React, { useState } from 'react';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function Home() {
  const [isB2BOpen, setIsB2BOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C4A3E] flex flex-col font-sans">
      
      {/* BARRA SUPERIOR ELEGANTE CON BORDES SUTILES */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#C8D8CE] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl border border-[#84A59D] bg-[#E8F0EC] flex items-center justify-center font-bold text-[#52796F] text-sm shadow-sm">
            ASL
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-[#2C4A3E]">ASL Ideas SpA</h1>
            <p className="text-[11px] text-[#52796F] font-medium">Ecosistema de Salud Digital Inclusiva</p>
          </div>
        </div>

        {/* BOTÓN B2B Y REDES SOCIALES */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 mr-2 border-r border-[#C8D8CE] pr-4">
            <a href="[suspicious link removed]" target="_blank" rel="noreferrer" title="LinkedIn B2B" className="w-8 h-8 rounded-full border border-[#84A59D]/50 flex items-center justify-center text-[#52796F] hover:bg-[#52796F] hover:text-white transition-all text-xs font-bold">in</a>
            <a href="[suspicious link removed]" target="_blank" rel="noreferrer" title="Instagram Comunidad" className="w-8 h-8 rounded-full border border-[#84A59D]/50 flex items-center justify-center text-[#52796F] hover:bg-[#52796F] hover:text-white transition-all text-xs font-bold">ig</a>
            <a href="[suspicious link removed]" target="_blank" rel="noreferrer" title="WhatsApp Directo" className="w-8 h-8 rounded-full border border-[#84A59D]/50 flex items-center justify-center text-[#52796F] hover:bg-[#52796F] hover:text-white transition-all text-xs font-bold">wa</a>
          </div>

          <button
            onClick={() => setIsB2BOpen(true)}
            className="border-2 border-[#52796F] text-[#52796F] hover:bg-[#52796F] hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <span>���</span> Agendar Reunión B2B
          </button>
        </div>
      </header>

      {/* HERO SECTION / PRESENTACIÓN CORPORATIVA */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 space-y-12">
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="inline-block bg-[#E8F0EC] border border-[#84A59D]/40 text-[#2C4A3E] text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wide uppercase shadow-sm">
            Diseño Inclusivo para Neurodivergencias (TEA / TDAH)
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C4A3E] tracking-tight leading-tight">
            Tecnología amable, accesible e integrativa para la salud
          </h2>
          <p className="text-sm text-[#52796F] leading-relaxed">
            Desarrollamos aplicaciones web con baja sobrecarga sensorial, reducción de fricción cognitiva y cumplimiento normativo de ciberseguridad.
          </p>
        </section>

        {/* GRILLA DE LAS 4 OFICINAS VIRTUALES (DISEÑO SUTIL OUTLINE) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. CASA MATRIZ B2B */}
          <div className="bg-white/80 border border-[#C8D8CE] hover:border-[#52796F] transition-all rounded-3xl p-6 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-3 py-1 rounded-full border border-[#84A59D]/30">
                  Oficina 1
                </span>
                <span className="text-2xl">���️</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C4A3E]">Casa Matriz & B2B</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Gestión corporativa, convenios institucionales, desarrollo a medida y consultoría en accesibilidad UI/UX.
              </p>
            </div>
            <button
              onClick={() => setIsB2BOpen(true)}
              className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#52796F] hover:text-white text-xs font-bold py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-2"
            >
              <span>���</span> Ingresar a Sala Virtual Casa Matriz
            </button>
          </div>

          {/* 2. LAWENMOLL */}
          <div className="bg-white/80 border border-[#C8D8CE] hover:border-[#52796F] transition-all rounded-3xl p-6 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-3 py-1 rounded-full border border-[#84A59D]/30">
                  Oficina 2
                </span>
                <span className="text-2xl">���</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C4A3E]">LAWENMOLL</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Salud Integrativa, Test de Bienestar Inteligente, Fichas Clínicas encriptadas (Ley N° 21.663) y gestión de citas.
              </p>
            </div>
            <button
              onClick={() => setActiveRoom('lawenmoll')}
              className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#52796F] hover:text-white text-xs font-bold py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-2"
            >
              <span>���</span> Ver Módulo Lawenmoll
            </button>
          </div>

          {/* 3. WELLNESS WEB APP */}
          <div className="bg-white/80 border border-[#C8D8CE] hover:border-[#52796F] transition-all rounded-3xl p-6 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-3 py-1 rounded-full border border-[#84A59D]/30">
                  Oficina 3
                </span>
                <span className="text-2xl">���</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C4A3E]">Wellness Web App</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Movimiento adaptado sin impacto, videoteca de pausas activas, salas temáticas (Lotus, Cielo, Bosque, Raíz) y cocina demostrativa.
              </p>
            </div>
            <button
              onClick={() => setActiveRoom('wellness')}
              className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#52796F] hover:text-white text-xs font-bold py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-2"
            >
              <span>���</span> Explorar Wellness App
            </button>
          </div>

          {/* 4. SABIDURÍA ANCESTRAL */}
          <div className="bg-white/80 border border-[#C8D8CE] hover:border-[#52796F] transition-all rounded-3xl p-6 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-3 py-1 rounded-full border border-[#84A59D]/30">
                  Oficina 4
                </span>
                <span className="text-2xl">���</span>
              </div>
              <h3 className="text-lg font-bold text-[#2C4A3E]">Sabiduría Ancestral</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Diario Mural comunitario, recetario nativo de herbolaria, agentes conversacionales empáticos y generación de PDF.
              </p>
            </div>
            <button
              onClick={() => setActiveRoom('ancestral')}
              className="w-full border border-[#52796F] text-[#52796F] hover:bg-[#52796F] hover:text-white text-xs font-bold py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-2"
            >
              <span>���</span> Ver Comunidad & Fitoterapia
            </button>
          </div>

        </section>
      </main>

      {/* FOOTER CON REDES SOCIALES Y CRÉDITOS */}
      <footer className="border-t border-[#C8D8CE] bg-[#FAF8F5] py-8 px-6 text-center space-y-4">
        <div className="flex justify-center gap-4">
          <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="text-xs text-[#52796F] hover:underline font-bold">LinkedIn B2B</a>
          <span className="text-[#C8D8CE]">•</span>
          <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="text-xs text-[#52796F] hover:underline font-bold">Instagram</a>
          <span className="text-[#C8D8CE]">•</span>
          <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="text-xs text-[#52796F] hover:underline font-bold">YouTube Canal</a>
          <span className="text-[#C8D8CE]">•</span>
          <a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="text-xs text-[#52796F] hover:underline font-bold">WhatsApp Business</a>
        </div>
        <p className="text-xs text-[#84A59D]">
          © 2026 ASL Ideas SpA — Salud Digital Integrativa, Accesible y Humana.
        </p>
      </footer>

      {/* MODAL CASA MATRIZ B2B */}
      <SalaVirtualB2B isOpen={isB2BOpen} onClose={() => setIsB2BOpen(false)} />

    </div>
  );
}
