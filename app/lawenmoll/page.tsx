'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function LawenmollExplorarPage() {
  const [activeTab, setActiveTab] = useState("resena");

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF8894] bg-white p-0.5 shadow-xs">
              <img src="/lawenmoll_logo.jpg" alt="Logo LAWENMOLL" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#1B4D3E]">LAWENMOLL</h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#FFF0F2] text-[#D85260] border border-[#FF8894]">
                  Muestra de Software B2B
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE]">
                  App en Construcción
                </span>
              </div>
              <p className="text-xs text-emerald-800 font-medium">Demostración de Salud Integrativa y Fichas Protegidas (Ley N° 21.663)</p>
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
        LAWENMOLL es una muestra tecnológica desarrollada por ASL Ideas SpA para clientes e instituciones B2B.
      </div>

      <section className="bg-white border-b border-[#C8D8CE] py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Tríada de Salud Integrativa
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Reuniones &amp; Demos B2B
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            ¿Por qué se creó LAWENMOLL y cuáles son sus beneficios?
          </h2>
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-4 shadow-xs">
            <div className="border-l-4 border-[#FF8894] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">Reseña de Creación</h3>
              <p className="text-xs text-gray-700 leading-relaxed mt-1">
                LAWENMOLL fue concebida como una respuesta accesible para dar a conocer alternativas integrativas ante enfermedades crónicas y estrés. Su diseño amable y libre de barreras cognitivas permite mostrar a clientes e instituciones de salud cómo evaluar el bienestar de forma respetuosa.
              </p>
            </div>
            <div className="border-l-4 border-[#2D6A4F] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">Beneficios Principales</h3>
              <ul className="text-xs text-gray-700 space-y-2 mt-1 list-disc list-inside">
                <li><strong>Evaluación de Bienestar Inteligente:</strong> Herramienta preventiva sin juzgar el estado físico.</li>
                <li><strong>Demostración de Ciberseguridad:</strong> Estándares de encriptación de datos bajo la Ley N° 21.663.</li>
                <li><strong>Agendamiento de Reuniones B2B:</strong> Permite coordinar presentaciones con especialistas, municipios y empresas.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8">
        <div className="flex justify-center gap-3 text-xs font-bold flex-wrap">
          <button
            onClick={() => setActiveTab("resena")}
            className={activeTab === "resena" ? "px-5 py-2.5 rounded-xl bg-[#FF8894] text-white shadow-xs" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Agendar Reunión B2B / Demo
          </button>
          <button
            onClick={() => setActiveTab("fichas")}
            className={activeTab === "fichas" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Fichas Protegidas (Ley N° 21.663)
          </button>
        </div>

        {activeTab === "resena" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#FF8894] space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-[#D85260] uppercase tracking-wider block">Reunión B2B</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Coordinación de Proyectos</h3>
              <p className="text-xs text-gray-600">Agenda una sesión virtual para conocer el modelo de licenciamiento de LAWENMOLL.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Demostración en Vivo</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Videollamada Informativa</h3>
              <p className="text-xs text-gray-600">Presentación guiada del Test de Bienestar Inteligente para equipos institucionales.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Convenios</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Alianzas Estratégicas</h3>
              <p className="text-xs text-gray-600">Módulo B2B para integrar salud preventiva en organizaciones y municipios.</p>
            </div>
          </div>
        )}

        {activeTab === "fichas" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-[#D85260] uppercase tracking-wider block">Ciberseguridad</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Fichas Encriptadas</h3>
              <p className="text-xs text-gray-600">Demostración de registro protegido bajo la Ley N° 21.663.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Atención Profesional</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Red de Terapeutas</h3>
              <p className="text-xs text-gray-600">Modelo de vinculación con profesionales de medicina integrativa.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Seguimiento</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Historial de Hábitos</h3>
              <p className="text-xs text-gray-600">Evolución de marcadores de calidad de vida sin sobrecarga cognitiva.</p>
            </div>
          </div>
        )}

        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4 shadow-xs">
          <h3 className="text-xs font-bold text-[#1B4D3E] text-center uppercase tracking-wider">Tríada de Muestras Tecnológicas — ASL Ideas SpA</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center text-xs">
            <div className="p-4 bg-[#FFF0F2] rounded-2xl border border-[#FF8894] space-y-2">
              <span className="font-bold text-[#D85260] block">LAWENMOLL</span>
              <p className="text-gray-600 text-[11px]">Salud integrativa y fichas protegidas.</p>
              <a href="https://lawenmoll.cl" target="_blank" rel="noopener noreferrer" className="inline-block text-[#D85260] font-bold hover:underline">
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
          <h3 className="text-sm font-bold text-[#1B4D3E]">Canales para Agendar Reuniones B2B — LAWENMOLL</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Coordinación Virtual</span>
              <p className="text-gray-600">+56 9 6543 2109</p>
            </div>
            <div className="p-4 bg-[#FFF0F2] rounded-2xl border border-[#FF8894]">
              <span className="font-bold text-[#D85260] block mb-1">Correo Institucional</span>
              <p className="text-gray-600">contacto@lawenmoll.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Reuniones B2B</span>
              <p className="text-gray-600">ASL Ideas SpA &amp; Clientes B2B</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} LAWENMOLL - ASL Ideas SpA | Muestra Tecnológica B2B en Construcción.</p>
      </footer>
    </main>
  );
}
