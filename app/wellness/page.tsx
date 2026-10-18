'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function WellnessExplorarPage() {
  const [activeCategory, setActiveCategory] = useState("resena");

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF8894] bg-white p-0.5 shadow-xs">
              <img src="/logo_wellness.jpg" alt="Logo Wellness" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#1B4D3E]">Wellness Web App</h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#FFF0F2] text-[#D85260] border border-[#FF8894]">
                  Muestra de Software B2B
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE]">
                  App en Construcción
                </span>
              </div>
              <p className="text-xs text-emerald-800 font-medium">Apoyo Visual Mente-Cuerpo y Salas Virtuales</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:contacto@aslideas.cl"
              className="bg-[#FF8894] text-white text-xs px-4 py-2.5 rounded-xl font-bold hover:bg-[#D85260] transition shadow-xs"
            >
              Agendar Reunión B2B
            </a>
            <Link href="/" className="text-xs text-[#1B4D3E] hover:underline font-semibold">
              Volver a Portada
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-[#FFF0F2] border-b border-[#FF8894] py-2 px-6 text-center text-xs font-semibold text-[#1B4D3E]">
        Wellness Web App es un módulo de muestra tecnológica de ASL Ideas SpA para clientes corporativos e instituciones.
      </div>

      <section className="bg-white border-b border-[#C8D8CE] py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Tríada de Salud Integrativa
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Salas Virtuales &amp; Reuniones B2B
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            ¿Por qué se creó Wellness Web App y cuáles son sus beneficios?
          </h2>
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-4 shadow-xs">
            <div className="border-l-4 border-[#FF8894] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">Reseña de Creación</h3>
              <p className="text-xs text-gray-700 leading-relaxed mt-1">
                Surgió desde la perspectiva de LAWENMOLL para brindar una alternativa visual y amigable que fomente el equilibrio cuerpo-mente. Diseñada para personas que buscan pautas de movimiento adaptado sin sobreexigencia física ni entornos intimidantes.
              </p>
            </div>
            <div className="border-l-4 border-[#2D6A4F] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">Beneficios Principales</h3>
              <ul className="text-xs text-gray-700 space-y-2 mt-1 list-disc list-inside">
                <li><strong>Movimiento Adaptado Sin Impacto:</strong> Pautas de ejercicio consciente para pausas activas corporativas.</li>
                <li><strong>Salas Virtuales Interactivas:</strong> Espacios para reuniones en vivo y talleres en tiempo real.</li>
                <li><strong>Agendamiento B2B Facilitado:</strong> Permite coordinar demostraciones con empresas e instituciones interesadas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8">
        <div className="flex justify-center gap-3 text-xs font-bold flex-wrap">
          <button
            onClick={() => setActiveCategory("resena")}
            className={activeCategory === "resena" ? "px-5 py-2.5 rounded-xl bg-[#FF8894] text-white shadow-xs" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Agendar Reunión B2B / Demostración
          </button>
          <button
            onClick={() => setActiveCategory("ejercicios")}
            className={activeCategory === "ejercicios" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Ejercicios Adaptados Sin Impacto
          </button>
        </div>

        {activeCategory === "resena" && (
          <div className="bg-white p-8 rounded-3xl border border-[#FF8894] space-y-4 shadow-xs">
            <h3 className="font-bold text-base text-[#1B4D3E]">Agendamiento de Reuniones B2B y Salas Demostrativas</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Coordina una reunión virtual con el equipo de ASL Ideas SpA para explorar la integración de Wellness Web App en tu organización, municipalidad o programa de bienestar corporativo.
            </p>
            <a
              href="mailto:contacto@aslideas.cl"
              className="inline-block bg-[#FF8894] text-white text-xs px-5 py-2.5 rounded-xl font-bold hover:bg-[#D85260] transition"
            >
              Agendar Reunión B2B por Correo
            </a>
          </div>
        )}

        {activeCategory === "ejercicios" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-3 shadow-xs">
              <span className="text-[10px] font-bold text-[#D85260] uppercase tracking-wider block">Pausa Activa</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Movilidad Suave en Silla</h3>
              <p className="text-xs text-gray-600">Ejercicios visuales sin impacto ni sobreexigencia articular, ideales para ergonomía laboral.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-3 shadow-xs">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Fuerza Adaptada</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Rutina Consciente</h3>
              <p className="text-xs text-gray-600">Fortalecimiento progresivo para postura y bienestar general en el trabajo.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-3 shadow-xs">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Mente-Cuerpo</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Respiración y Calma</h3>
              <p className="text-xs text-gray-600">Soporte visual para reducir el estrés y la fatiga mental durante la jornada.</p>
            </div>
          </div>
        )}

        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4 shadow-xs">
          <h3 className="text-xs font-bold text-[#1B4D3E] text-center uppercase tracking-wider">Tríada de Muestras Tecnológicas — ASL Ideas SpA</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center text-xs">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="font-bold text-[#1B4D3E] block">LAWENMOLL</span>
              <p className="text-gray-600 text-[11px]">Salud integrativa y fichas protegidas.</p>
              <a href="https://lawenmoll.cl" target="_blank" rel="noopener noreferrer" className="inline-block text-emerald-800 font-bold hover:underline">
                https://lawenmoll.cl
              </a>
            </div>
            <div className="p-4 bg-[#FFF0F2] rounded-2xl border border-[#FF8894] space-y-2">
              <span className="font-bold text-[#D85260] block">Wellness Web App</span>
              <p className="text-gray-600 text-[11px]">Apoyo visual y clases en vivo.</p>
              <a href="https://wellness-app-eight-kohl.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block text-[#D85260] font-bold hover:underline">
                https://wellness-app-eight-kohl.vercel.app/
              </a>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="font-bold text-[#1B4D3E] block">Bienestar App</span>
              <p className="text-gray-600 text-[11px]">Mensajería, hábitos y descanso Morfeo.</p>
              <a href="https://aslideas-bienestar-2jpc.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block text-emerald-800 font-bold hover:underline">
                https://aslideas-bienestar-2jpc.vercel.app/
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4 text-center shadow-xs">
          <h3 className="text-sm font-bold text-[#1B4D3E]">Canales para Agendar Reuniones B2B — Wellness Web App</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Coordinación Virtual</span>
              <p className="text-gray-600">+56 9 8765 4321</p>
            </div>
            <div className="p-4 bg-[#FFF0F2] rounded-2xl border border-[#FF8894]">
              <span className="font-bold text-[#D85260] block mb-1">Correo Institucional</span>
              <p className="text-gray-600">wellness@aslideas.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Reuniones B2B</span>
              <p className="text-gray-600">ASL Ideas SpA &amp; Clientes B2B</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Wellness Web App - ASL Ideas SpA | Muestra Tecnológica B2B en Construcción.</p>
      </footer>
    </main>
  );
}
