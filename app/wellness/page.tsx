'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function WellnessExplorarPage() {
  const [activeCategory, setActiveCategory] = useState("ejercicios");

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C8D8CE] bg-white p-0.5">
              <img src="/logo_wellness.jpg" alt="Logo Wellness" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1B4D3E]">Wellness Web App</h1>
              <p className="text-xs text-emerald-800 font-medium">Apoyo Visual para el Equilibrio Cuerpo y Mente</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wellness-app-eight-kohl.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1B4D3E] text-white text-xs px-4 py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F] transition"
            >
              Abrir Wellness App
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
            Tríada de Salud Integrativa — Herramienta Virtual
          </span>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            ¿Por qué se creó Wellness Web App y qué función cumple?
          </h2>
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-3">
            <p className="text-xs text-gray-700 leading-relaxed">
              La aplicación <strong>Wellness</strong> surgió mediante la idea de <strong>LAWENMOLL</strong> para desarrollar de forma visual distintas formas para brindar una mejor calidad de vida tanto para el cuerpo, mente y salud, y complementar la medicina alternativa.
            </p>
            <p className="text-xs text-gray-700 leading-relaxed">
              La función que cumple es ayudar a los usuarios que no les gusta ir al gimnasio o les cuesta encontrar alternativas para el buen vivir. A su vez, permite a los profesionales visualizar y guiarse en rutinas de ejercicios, hacer <strong>clases en vivo</strong> y publicar sus contenidos a la comunidad fitness natural y bienestar. Ofrece un servicio de apoyo visual integral para el equilibrio cuerpo-mente.
            </p>
          </div>
        </div>
      </section>

      {/* Secciones Interactivas */}
      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8">
        <div className="flex justify-center gap-3 text-xs font-bold flex-wrap">
          <button
            onClick={() => setActiveCategory("ejercicios")}
            className={activeCategory === "ejercicios" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Rutinas Adaptadas Sin Impacto
          </button>
          <button
            onClick={() => setActiveCategory("profesionales")}
            className={activeCategory === "profesionales" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Portal Profesionales &amp; Clases en Vivo
          </button>
        </div>

        {activeCategory === "ejercicios" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Pausa Activa</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Movilidad Suave en Silla</h3>
              <p className="text-xs text-gray-600">Ejercicios visuales sin impacto ni sobreexigencia, ideales para quienes no asisten a gimnasios tradicionales.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Fuerza Adaptada</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Rutina Consciente de Tronco y Piernas</h3>
              <p className="text-xs text-gray-600">Fortalecimiento progresivo para mejorar la postura y cuidar las articulaciones.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Apoyo Mente-Cuerpo</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Descompresión Espinal &amp; Respiración</h3>
              <p className="text-xs text-gray-600">Soporte visual para reducir el estrés y promover el equilibrio integral.</p>
            </div>
          </div>
        )}

        {activeCategory === "profesionales" && (
          <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4">
            <h3 className="font-bold text-base text-[#1B4D3E]">Clases en Vivo y Publicación para la Comunidad Fitness Natural</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Plataforma diseñada para que profesionales, instructores y terapeutas transmitan sus clases en vivo, publiquen rutinas y se conecten directamente con personas enfocadas en mejorar su calidad de vida.
            </p>
            <a
              href="https://wellness-app-eight-kohl.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1B4D3E] text-white text-xs px-5 py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F]"
            >
              Abrir Wellness App
            </a>
          </div>
        )}

        {/* Tríada de Aplicaciones */}
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4">
          <h3 className="text-xs font-bold text-[#1B4D3E] text-center uppercase tracking-wider">Ecosistema de Salud Integrativa — Tríada de Aplicaciones</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center text-xs">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="font-bold text-[#1B4D3E] block">🏥 LAWENMOLL</span>
              <p className="text-gray-600 text-[11px]">Salud integrativa, evaluación y fichas clínicas.</p>
              <a href="https://lawenmoll.cl" target="_blank" rel="noopener noreferrer" className="inline-block text-emerald-800 font-bold hover:underline">
                https://lawenmoll.cl
              </a>
            </div>
            <div className="p-4 bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE] space-y-2">
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
          <h3 className="text-sm font-bold text-[#1B4D3E]">Canales de Contacto Directo — Wellness Web App</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">📞 Teléfono / WhatsApp Virtual</span>
              <p className="text-gray-600">+56 9 8765 4321</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">✉️ Correo Electrónico</span>
              <p className="text-gray-600">wellness@aslideas.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">🌐 Redes Sociales Oficiales</span>
              <p className="text-gray-600">@wellness.app.cl | ASL Ideas SpA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Wellness Web App - ASL Ideas SpA | Salud Integrativa y Apoyo Visual Mente-Cuerpo.</p>
      </footer>
    </main>
  );
}