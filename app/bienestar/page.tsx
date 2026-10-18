'use client';

import React from "react";
import Link from "next/link";

export default function ComunidadBienestarPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF8894] bg-white p-0.5 shadow-xs">
              <img src="/LOGO_BIENESTAR.png" alt="Logo Bienestar" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#1B4D3E]">Bienestar App</h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#FFF0F2] text-[#D85260] border border-[#FF8894]">
                  Muestra de Software B2B
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE]">
                  App en Construcción
                </span>
              </div>
              <p className="text-xs text-emerald-800 font-medium">Mensajería Autónoma, Hábitos Saludables y Descanso Morfeo</p>
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
        Bienestar App es un ecosistema propio de mensajería desarrollado por ASL Ideas SpA para comunidades y clientes B2B.
      </div>

      <section className="bg-white border-b border-[#C8D8CE] py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Tríada de Salud Integrativa
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Mensajería Red &amp; Videollamadas B2B
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            ¿Por qué se creó Bienestar App y cuáles son sus beneficios?
          </h2>
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-4 shadow-xs">
            <div className="border-l-4 border-[#FF8894] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">Reseña de Creación</h3>
              <p className="text-xs text-gray-700 leading-relaxed mt-1">
                Se creó como una alternativa autónoma ante plataformas comerciales que imponen costos por envíos masivos. Diseñada para comunidades y empresas que requieren canales de comunicación sin spam ni cargos ocultos.
              </p>
            </div>
            <div className="border-l-4 border-[#2D6A4F] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">Beneficios Principales</h3>
              <ul className="text-xs text-gray-700 space-y-2 mt-1 list-disc list-inside">
                <li><strong>Comunicación Autónoma:</strong> Mensajes, imágenes, llamadas y videollamadas directas en un canal propio.</li>
                <li><strong>Monitoreo de Hábitos Saludables:</strong> Registro de caminata (pasos), toma de agua y escáner nutricional.</li>
                <li><strong>Módulo Morfeo:</strong> Inducción al descanso reparador mediante paisajes sonoros y hábitos de sueño.</li>
                <li><strong>Agendamiento B2B:</strong> Coordinación de videollamadas demostrativas para clientes institucionales.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8">
        <h3 className="text-xs font-bold text-[#1B4D3E] text-center uppercase tracking-wider">Módulos Funcionales de Bienestar App</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
            <span className="text-[10px] font-bold text-[#D85260] uppercase tracking-wider block">Mensajería Red</span>
            <h4 className="font-bold text-xs text-[#1B4D3E]">Videollamadas Directas</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">Comunicación fluida con soporte para videollamadas en tiempo real en salas privadas.</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
            <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Conciencia Corporal</span>
            <h4 className="font-bold text-xs text-[#1B4D3E]">Pasos, Agua &amp; Calorías</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">Registro de caminata diaria, hidratación y escáner nutricional sin sobrecarga cognitiva.</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
            <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Hábitos &amp; Alertas</span>
            <h4 className="font-bold text-xs text-[#1B4D3E]">Recordatorios de Salud</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">Alertas de hidratación, pausas activas y pautas de movilidad adaptada.</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
            <span className="text-[10px] font-bold text-[#D85260] uppercase tracking-wider block">Descanso &amp; Comercio</span>
            <h4 className="font-bold text-xs text-[#1B4D3E]">Módulo Morfeo &amp; PYMES</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">Tips y paisajes sonoros para inducción al sueño REM, junto a la vitrina de herbolaria local.</p>
          </div>
        </div>

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
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="font-bold text-[#1B4D3E] block">Wellness Web App</span>
              <p className="text-gray-600 text-[11px]">Apoyo visual y clases en vivo.</p>
              <a href="https://wellness-app-eight-kohl.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block text-emerald-800 font-bold hover:underline">
                https://wellness-app-eight-kohl.vercel.app/
              </a>
            </div>
            <div className="p-4 bg-[#FFF0F2] rounded-2xl border border-[#FF8894] space-y-2">
              <span className="font-bold text-[#D85260] block">Bienestar App</span>
              <p className="text-gray-600 text-[11px]">Mensajería, hábitos y descanso Morfeo.</p>
              <a href="https://aslideas-bienestar-2jpc.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block text-[#D85260] font-bold hover:underline">
                https://aslideas-bienestar-2jpc.vercel.app/
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4 text-center shadow-xs">
          <h3 className="text-sm font-bold text-[#1B4D3E]">Canales para Agendar Reuniones B2B — Bienestar App</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Coordinación Virtual</span>
              <p className="text-gray-600">+56 9 7654 3210</p>
            </div>
            <div className="p-4 bg-[#FFF0F2] rounded-2xl border border-[#FF8894]">
              <span className="font-bold text-[#D85260] block mb-1">Correo Institucional</span>
              <p className="text-gray-600">bienestar@aslideas.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Reuniones B2B</span>
              <p className="text-gray-600">ASL Ideas SpA &amp; Clientes B2B</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Bienestar App - ASL Ideas SpA | Muestra Tecnológica B2B en Construcción.</p>
      </footer>
    </main>
  );
}
