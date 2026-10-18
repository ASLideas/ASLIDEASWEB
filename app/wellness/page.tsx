'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function WellnessExplorarPage() {
  const [activeCategory, setActiveCategory] = useState("recetas");

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-700 bg-white p-0.5">
              <img src="/logo_wellness.jpg" alt="Logo Wellness" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1B4D3E]">Wellness Web App</h1>
              <p className="text-xs text-emerald-800 font-semibold">Apoyo Visual para el Equilibrio Cuerpo y Mente</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wellness-app-eight-kohl.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2D6A4F] text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-[#1B4D3E] transition"
            >
              Abrir Wellness App ↗
            </a>
            <Link href="/" className="text-xs text-[#1B4D3E] hover:underline font-semibold">
              Volver a Portada
            </Link>
          </div>
        </div>
      </header>

      {/* Propósito & Grandes Interrogantes */}
      <section className="bg-white border-b border-[#C8D8CE] py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Tríada de Salud Integrativa — Herramienta Virtual
          </span>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            ¿Por qué se creó Wellness Web App y qué función cumple?
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Wellness surgió a partir de la visión de <strong>LAWENMOLL ([enlace sospechoso eliminado])</strong> para desarrollar de forma visual distintas alternativas que brinden una mejor calidad de vida en cuerpo, mente y salud, complementando la medicina alternativa.
            Su función es ayudar a usuarios que no disfrutan de los gimnasios tradicionales o les cuesta encontrar recetas nutritivas a mano para su buen vivir y afecciones específicas. A su vez, brinda a profesionales de la salud e instructores la posibilidad de hacer <strong>clases en vivo</strong> y publicar rutinas para la comunidad fitness natural.
          </p>
        </div>
      </section>

      {/* Secciones Interactivas */}
      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8">
        <div className="flex justify-center gap-3 text-xs font-bold flex-wrap">
          <button
            onClick={() => setActiveCategory("recetas")}
            className={activeCategory === "recetas" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Recetario Visual Saludable
          </button>
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

        {activeCategory === "recetas" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Receta Visual Digestiva</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Bowl Nutritivo de Quinoa y Vegetales</h3>
              <p className="text-xs text-gray-600">Paso a paso ilustrado con ingredientes naturales al alcance de la mano para el bienestar diario.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Nutrición Adaptada</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Crema Antiinflamatoria de Zapallo y Cúrcuma</h3>
              <p className="text-xs text-gray-600">Receta visual pensada para acompañar distintas afecciones de salud de forma natural.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Baja Carga Glicémica</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Infusión y Postre Saludable de Semillas</h3>
              <p className="text-xs text-gray-600">Guía gráfica fácil de preparar para mantener la energía y el equilibrio corporal.</p>
            </div>
          </div>
        )}

        {activeCategory === "ejercicios" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Pausa Activa</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Movilidad Suave en Silla</h3>
              <p className="text-xs text-gray-600">Sin impacto ni sobreexigencia, ideal para quienes no asisten a gimnasios.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Fuerza Adaptada</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Rutina Consciente de Tronco y Piernas</h3>
              <p className="text-xs text-gray-600">Ejercicios visuales para fortalecer el cuerpo sin dañar articulaciones.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Equilibrio Mente-Cuerpo</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Descompresión Espinal &amp; Respiración</h3>
              <p className="text-xs text-gray-600">Soporte visual para reducir el estrés e inducir la relajación física.</p>
            </div>
          </div>
        )}

        {activeCategory === "profesionales" && (
          <div className="bg-[#E8F0EC] p-8 rounded-3xl border border-[#C8D8CE] space-y-4">
            <h3 className="font-bold text-base text-[#1B4D3E]">Publicación de Clases en Vivo y Contenido Fitness Natural</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Profesionales, instructores y terapeutas pueden realizar clases en vivo y compartir sus contenidos para potenciar la salud integrativa de toda la comunidad.
            </p>
            <a
              href="https://wellness-app-eight-kohl.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1B4D3E] text-white text-xs px-5 py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F]"
            >
              Ir a la Plataforma Wellness Web App ↗
            </a>
          </div>
        )}

        {/* Canales de Contacto Directo y Redes Alternativas */}
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4 text-center">
          <h3 className="text-base font-bold text-[#1B4D3E]">Contacto Directo &amp; Redes Oficiales — Wellness Web App</h3>
          <p className="text-xs text-gray-600">Canales de atención para usuarios, instructores y profesionales de la salud integrativa.</p>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">📞 Teléfono / WhatsApp Virtual</span>
              <p className="text-gray-600">+56 9 8765 4321 (Atención Directa)</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">✉️ Correo Electrónico</span>
              <p className="text-gray-600">wellness@aslideas.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">🌐 Redes Sociales Oficiales</span>
              <p className="text-gray-600">@wellness.app.cl | LinkedIn ASL Ideas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Wellness Web App - ASL Ideas SpA | Parte de la Tríada de Salud Integrativa con LAWENMOLL y Bienestar App.</p>
      </footer>
    </main>
  );
}