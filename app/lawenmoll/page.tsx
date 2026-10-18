'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function LawenmollExplorarPage() {
  const [activeTab, setActiveTab] = useState("fichas");

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C8D8CE] bg-white p-0.5">
              <img src="/lawenmoll_logo.jpg" alt="Logo LAWENMOLL" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1B4D3E]">LAWENMOLL</h1>
              <p className="text-xs text-emerald-800 font-medium">Salud Integrativa &amp; Fichas Clínicas Protegidas (Ley N° 21.663)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://lawenmoll.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1B4D3E] text-white text-xs px-4 py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F] transition"
            >
              Abrir LAWENMOLL
            </a>
            <Link href="/" className="text-xs text-[#1B4D3E] hover:underline font-semibold">
              Volver a Portada
            </Link>
          </div>
        </div>
      </header>

      {/* Propósito */}
      <section className="bg-white border-b border-[#C8D8CE] py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Tríada de Salud Integrativa — Eje Clínico
          </span>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            ¿Por qué se creó LAWENMOLL y qué función cumple?
          </h2>
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-3">
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>LAWENMOLL</strong> es una vitrina virtual creada para dar a conocer a los usuarios y pacientes que existe otra forma para tratar enfermedades crónicas, autoinmunes y de salud mental, en la cual diversas disciplinas se complementan armónicamente con la medicina actual.
            </p>
            <p className="text-xs text-gray-700 leading-relaxed">
              A su vez, busca otorgar mayor visibilidad a los profesionales que cumplen con esta labor, respondiendo al alto porcentaje de desafíos actuales en el área de la salud. La función de LAWENMOLL es dar a conocer a los <strong>especialistas, terapeutas, instituciones y locales alimenticios de bienestar y nutrición</strong> para brindar una mejor atención a través de los profesionales presentes en nuestra plataforma virtual.
            </p>
          </div>
        </div>
      </section>

      {/* Pestañas e Interacción */}
      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8">
        <div className="flex justify-center gap-3 text-xs font-bold flex-wrap">
          <button
            onClick={() => setActiveTab("fichas")}
            className={activeTab === "fichas" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Fichas Clínicas &amp; Ley N° 21.663
          </button>
          <button
            onClick={() => setActiveTab("test")}
            className={activeTab === "test" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Test de Bienestar &amp; Evaluación
          </button>
        </div>

        {activeTab === "fichas" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Ciberseguridad</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Fichas Encriptadas</h3>
              <p className="text-xs text-gray-600">Registro protegido bajo estándares de la Ley N° 21.663 para datos de salud.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Atención Profesional</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Red de Especialistas</h3>
              <p className="text-xs text-gray-600">Conexión con médicos y terapeutas en medicina integrativa.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Seguimiento</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Evolución Clínica</h3>
              <p className="text-xs text-gray-600">Monitoreo continuo de hábitos, tratamientos y calidad de vida.</p>
            </div>
          </div>
        )}

        {activeTab === "test" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Metabolismo</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Evaluación Metabólica</h3>
              <p className="text-xs text-gray-600">Acompañamiento amable para abordar condiciones metabólicas y de peso.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Salud Mental</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Reducción del Estrés</h3>
              <p className="text-xs text-gray-600">Espacios adaptados para acoger la neurodivergencia y brindar contención.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Holístico</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Locales &amp; Nutrición</h3>
              <p className="text-xs text-gray-600">Vinculación con tiendas de alimentación consciente y herbolaria.</p>
            </div>
          </div>
        )}

        {/* Tríada de Aplicaciones */}
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4">
          <h3 className="text-xs font-bold text-[#1B4D3E] text-center uppercase tracking-wider">Ecosistema de Salud Integrativa — Tríada de Aplicaciones</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center text-xs">
            <div className="p-4 bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="font-bold text-[#1B4D3E] block">🏥 LAWENMOLL</span>
              <p className="text-gray-600 text-[11px]">Salud integrativa, evaluación y fichas clínicas.</p>
              <a href="https://lawenmoll.cl" target="_blank" rel="noopener noreferrer" className="inline-block text-emerald-800 font-bold hover:underline">
                https://lawenmoll.cl
              </a>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="font-bold text-[#1B4D3E] block">🌿 Wellness Web App</span>
              <p className="text-gray-600 text-[11px]">Apoyo visual y clases en vivo.</p>
              <a href="https://wellness-app-eight-kohl.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block text-emerald-800 font-bold hover:underline">
                https://wellness-app-eight-kohl.vercel.app/
              </a>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="font-bold text-[#1B4D3E] block">💚 Bienestar App</span>
              <p className="text-gray-600 text-[11px]">Mensajería, hábitos y descanso Morfeo.</p>
              <a href="https://aslideas-bienestar-2jpc.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block text-emerald-800 font-bold hover:underline">
                https://aslideas-bienestar-2jpc.vercel.app/
              </a>
            </div>
          </div>
        </div>

        {/* Canales de Contacto Directo */}
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4 text-center">
          <h3 className="text-sm font-bold text-[#1B4D3E]">Canales de Contacto Directo — LAWENMOLL</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">📞 Teléfono / WhatsApp Virtual</span>
              <p className="text-gray-600">+56 9 6543 2109</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">✉️ Correo Electrónico</span>
              <p className="text-gray-600">contacto@lawenmoll.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">🌐 Redes Sociales Oficiales</span>
              <p className="text-gray-600">@lawenmoll.cl | ASL Ideas SpA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} LAWENMOLL - ASL Ideas SpA | Salud Integrativa y Fichas Clínicas Protegidas.</p>
      </footer>
    </main>
  );
}