import os

page_code = """'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] flex flex-col font-sans">
      
      {/* BARRA SUPERIOR DE NAVEGACIÓN REAL */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#C8D8CE] px-6 py-4 flex justify-between items-center shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl border border-[#C8D8CE] bg-white p-1 flex items-center justify-center overflow-hidden">
            <img src="/LOGO_asl.png" alt="ASL Ideas SpA" className="max-h-full max-w-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-base text-[#1B4D3E] tracking-tight">ASL Ideas SpA</h1>
            <p className="text-[11px] text-[#2D6A4F] font-medium">Ecosistema de Salud Digital Inclusiva</p>
          </div>
        </div>

        {/* NAVEGACIÓN ACTIVA A CADA OFICINA VIRTUAL */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-[#1B4D3E]">
          <Link href="/aslideas" className="hover:text-[#2D6A4F] transition">Casa Matriz</Link>
          <Link href="/lawenmoll" className="hover:text-[#2D6A4F] transition">LAWENMOLL</Link>
          <Link href="/wellness" className="hover:text-[#2D6A4F] transition">Wellness App</Link>
          <Link href="/bienestar" className="hover:text-[#2D6A4F] transition">Sabiduría Ancestral</Link>
          <Link href="/comunidad" className="hover:text-[#2D6A4F] transition">Comunidad</Link>
          <Link href="/admin" className="text-[#B08D4B] hover:underline">Panel Admin</Link>
        </nav>

        {/* AGENDAR REUNIÓN B2B */}
        <a 
          href="mailto:contacto@aslideas.cl" 
          className="bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-2"
        >
          <span>���</span> Agendar Reunión B2B
        </a>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-6 py-10 flex-1 space-y-12 w-full">
        
        {/* HERO Y PROPÓSITO */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Salud Digital Integrativa & Accesibilidad UI/UX
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1B4D3E] tracking-tight leading-tight">
            Tecnología Humana y Amable para el Bienestar Integrativo
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            Plataformas web de alta claridad cognitiva, navegación lineal y diseño intuitivo para la gestión de salud, pausas activas y medicina integrativa.
          </p>
        </section>

        {/* TARJETAS CON ENLACES ACTIVOS Y NAVEGACIÓN REAL */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 1. CASA MATRIZ */}
          <div className="bg-white border border-[#C8D8CE] rounded-3xl p-6 space-y-4 shadow-xs hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#E8F0EC] pb-3">
                <img src="/LOGO_asl.png" alt="ASL Ideas" className="w-10 h-10 object-contain" />
                <div>
                  <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider block">Oficina B2B</span>
                  <h3 className="font-bold text-sm text-[#1B4D3E]">Casa Matriz ASL</h3>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Desarrollo de software a medida, licencias B2B para municipalidades y consultoría en accesibilidad digital.
              </p>
            </div>
            <Link 
              href="/aslideas" 
              className="block text-center bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition"
            >
              Ingresar a Casa Matriz →
            </Link>
          </div>

          {/* 2. LAWENMOLL */}
          <div className="bg-white border border-[#C8D8CE] rounded-3xl p-6 space-y-4 shadow-xs hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#E8F0EC] pb-3">
                <img src="/lawenmoll_logo.jpg" alt="LAWENMOLL" className="w-10 h-10 object-contain" />
                <div>
                  <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Salud Integrativa</span>
                  <h3 className="font-bold text-sm text-[#1B4D3E]">LAWENMOLL</h3>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Test de Bienestar Inteligente, composición metabólica y Fichas Clínicas protegidas (Ley N° 21.663).
              </p>
            </div>
            <Link 
              href="/lawenmoll" 
              className="block text-center bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition"
            >
              Ir a LAWENMOLL →
            </Link>
          </div>

          {/* 3. WELLNESS WEB APP */}
          <div className="bg-white border border-[#C8D8CE] rounded-3xl p-6 space-y-4 shadow-xs hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#E8F0EC] pb-3">
                <img src="/logo_wellness.jpg" alt="Wellness" className="w-10 h-10 object-contain" />
                <div>
                  <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Movimiento Adaptado</span>
                  <h3 className="font-bold text-sm text-[#1B4D3E]">Wellness Web App</h3>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Pausas activas sin impacto, videotecas de ejercicio guiado y salas virtuales interactivas.
              </p>
            </div>
            <Link 
              href="/wellness" 
              className="block text-center bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition"
            >
              Abrir Wellness App →
            </Link>
          </div>

          {/* 4. SABIDURÍA ANCESTRAL */}
          <div className="bg-white border border-[#C8D8CE] rounded-3xl p-6 space-y-4 shadow-xs hover:shadow-md transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3 border-b border-[#E8F0EC] pb-3">
                <img src="/LOGO_BIENESTAR.png" alt="Sabiduría Ancestral" className="w-10 h-10 object-contain" />
                <div>
                  <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider block">Comunidad & Herbolaria</span>
                  <h3 className="font-bold text-sm text-[#1B4D3E]">Sabiduría Ancestral</h3>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Diario Mural comunitario, recetarios herbolarios descargables en PDF y fitoterapia nativa.
              </p>
            </div>
            <Link 
              href="/bienestar" 
              className="block text-center bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl transition"
            >
              Entrar a Sabiduría Ancestral →
            </Link>
          </div>

        </section>

        {/* PRÓXIMAMENTE */}
        <section className="bg-white border border-[#C8D8CE] rounded-3xl p-8 space-y-6 shadow-xs">
          <div className="border-b border-[#E8F0EC] pb-4 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#1B4D3E] px-3 py-1 rounded-full">
                Próximamente
              </span>
              <h3 className="text-xl font-bold text-[#1B4D3E] mt-2">
                Nuevas Aplicaciones en Construcción ���
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="text-2xl">���️</span>
              <h4 className="text-sm font-bold text-[#1B4D3E]">Vikingos Talleres</h4>
              <p className="text-xs text-gray-600">Formación práctica en oficios, adaptabilidad e independencia personal.</p>
            </div>
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="text-2xl">⚔️</span>
              <h4 className="text-sm font-bold text-[#1B4D3E]">Apoderados Aguerridos</h4>
              <p className="text-xs text-gray-600">Red de orientación y contención estratégica para familias y cuidadores.</p>
            </div>
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="text-2xl">���</span>
              <h4 className="text-sm font-bold text-[#1B4D3E]">Patiperros Rutas</h4>
              <p className="text-xs text-gray-600">Senderismo adaptado, rutas sensoriales e inclusión al aire libre.</p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} ASL Ideas SpA — Salud Digital Inclusiva. Todos los derechos reservados.
      </footer>
    </div>
  );
}
"""

with open('app/page.tsx', 'wb') as f:
    f.write(page_code.encode('utf-8'))

print("✅ Arquitectura original y botones navegables restaurados en UTF-8!")
