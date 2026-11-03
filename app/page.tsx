'use client';

import React, { useState } from 'react';
import IntroLoading from '@/components/IntroLoading';

export default function HomePage() {
  const [cargando, setCargando] = useState(true);

  return (
    <>
      {cargando && <IntroLoading onComplete={() => setCargando(false)} duracionMs={3200} />}
      
      <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] flex flex-col">
        {/* CABECERA Y NAVEGACIÓN */}
        <header className="w-full bg-[#FAF8F5] border-b border-[#97A884]/30 py-4 px-6 shadow-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/isotipo.png" alt="ASL Ideas" className="h-9 w-auto object-contain" />
              <img src="/logo-asl.png.png" alt="ASL Ideas SpA" className="h-7 w-auto object-contain hidden sm:block" />
            </div>
            <nav className="flex items-center space-x-4 text-sm font-semibold text-[#676E5E]">
              <a href="#oficinas" className="hover:text-[#52796F] transition">Oficinas Virtuales</a>
              <a href="/sala-virtual" className="bg-[#97A884] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#676E5E] transition shadow">
                Sala Virtual
              </a>
            </nav>
          </div>
        </header>

        {/* SECCIÓN PRINCIPAL */}
        <section className="py-16 px-6 max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1.5 bg-[#FAF8F5] text-[#52796F] text-xs font-bold rounded-full border border-[#97A884]/40 uppercase tracking-widest shadow-sm">
            Ecosistema de Salud Digital Inclusiva
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#676E5E] leading-tight">
            Desarrollo y soluciones accesibles para PYME y comercio asociado
          </h1>
          <p className="text-base sm:text-lg text-[#676E5E]/90 max-w-3xl mx-auto leading-relaxed">
            Unificamos evaluación metabólica inteligente, medicina integrativa y tecnología con accesibilidad cognitiva para neurodivergencias.
          </p>
        </section>

        {/* ECOSISTEMA DE LAS 4 OFICINAS VIRTUALES */}
        <section id="oficinas" className="py-12 px-6 max-w-6xl mx-auto w-full space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#676E5E]">
              Nuestras 4 Oficinas Virtuales
            </h2>
            <p className="text-sm text-[#52796F]">
              Portales interactivos diseñados para el bienestar e inclusión
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border-2 border-[#97A884]/40 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#97A884]/20 flex items-center justify-center font-bold text-[#676E5E]">
                01
              </div>
              <h3 className="text-xl font-bold text-[#676E5E]">Oficina ASL Ideas SpA</h3>
              <p className="text-sm text-[#676E5E]/80">
                Casa Matriz & B2B. Licencias tecnológicas, desarrollo a medida y accesibilidad UI/UX para neurodivergencias.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border-2 border-[#97A884]/40 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#97A884]/20 flex items-center justify-center font-bold text-[#676E5E]">
                02
              </div>
              <h3 className="text-xl font-bold text-[#676E5E]">Oficina LAWENMOLL</h3>
              <p className="text-sm text-[#676E5E]/80">
                Salud Integrativa. Test metabólico inteligente, fichas clínicas encriptadas y conexión con especialistas.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border-2 border-[#97A884]/40 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#97A884]/20 flex items-center justify-center font-bold text-[#676E5E]">
                03
              </div>
              <h3 className="text-xl font-bold text-[#676E5E]">Oficina Wellness Web App</h3>
              <p className="text-sm text-[#676E5E]/80">
                Movimiento Adaptado. Ejercicios sin impacto, pausas activas y salas virtuales interactivas.
              </p>
              <a href="/sala-virtual" className="inline-block text-xs font-bold text-[#52796F] underline pt-2">
                Entrar a Sala Virtual →
              </a>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border-2 border-[#97A884]/40 shadow-md space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#97A884]/20 flex items-center justify-center font-bold text-[#676E5E]">
                04
              </div>
              <h3 className="text-xl font-bold text-[#676E5E]">Sabiduría Ancestral</h3>
              <p className="text-sm text-[#676E5E]/80">
                Comunidad & Herbolaria. Diario Mural de pautas nativas, recetario descargable y asistencia empática.
              </p>
            </div>
          </div>
        </section>

        {/* PIE DE PÁGINA */}
        <footer className="mt-auto bg-[#FAF8F5] border-t border-[#97A884]/30 py-6 text-center text-xs text-[#676E5E]/80">
          <p>© {new Date().getFullYear()} ASL Ideas SpA — Desarrollo y Soluciones Accesibles para PYME y Comercio Asociado</p>
        </footer>
      </main>
    </>
  );
}
