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
          <div className="flex items-center gap-4">
            <a
              href="https://wellness-app-eight-kohl.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2D6A4F] text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-[#1B4D3E] transition"
            >
              Abrir Web App Wellness ↗
            </a>
            <Link href="/" className="text-xs text-[#1B4D3E] hover:underline font-semibold">
              Volver a Portada
            </Link>
          </div>
        </div>
      </header>

      {/* Propósito y Respuesta a las Grandes Interrogantes */}
      <section className="bg-white border-b border-[#C8D8CE] py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Propósito & Herramienta Virtual Visual
          </span>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            ¿Por qué se creó Wellness Web App y qué función cumple?
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Wellness Web App surgió mediante la idea y visión de <strong>LAWENMOLL</strong> para desarrollar de forma 100% visual distintas alternativas que brinden una mejor calidad de vida en cuerpo, mente y salud, complementando la medicina alternativa.
            Su función principal es ser un apoyo intuitivo para usuarios a quienes no les gusta ir al gimnasio tradicional o les cuesta encontrar recetas nutritivas al alcance de la mano. Además, ofrece a los profesionales de la salud integrativa un espacio interactivo para transmitir <strong>clases en vivo</strong> y compartir pautas con la comunidad fitness natural.
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
            Ejercicios Adaptados Sin Impacto
          </button>
          <button
            onClick={() => setActiveCategory("profesionales")}
            className={activeCategory === "profesionales" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Portal Profesionales & Clases en Vivo
          </button>
        </div>

        {activeCategory === "recetas" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Nutrición Antiinflamatoria</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Bowl de Quinoa, Cúrcuma y Vegetales Asados</h3>
              <p className="text-xs text-gray-600">Guía visual ilustrada paso a paso para apoyar la digestión y reducir la inflamación corporal.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Control Metabólico</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Crema de Zapallo Camote con Semillas Nativa</h3>
              <p className="text-xs text-gray-600">Plato saciante alto en magnesio, ideal para pautas de salud integrativa.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Postre Consciente</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Mousse de Palta, Cacao Puro y Miel</h3>
              <p className="text-xs text-gray-600">Preparación antioxidante baja en glucosa para disfrutar de forma saludable.</p>
            </div>
          </div>
        )}

        {activeCategory === "ejercicios" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Pausa Activa</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Movilidad en Silla & Estiramiento Suave</h3>
              <p className="text-xs text-gray-600">Secuencia de 15 minutos pensada para personas con dolencias articulares o sobrepeso.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Fuerza Sin Impacto</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Rutina GAP Adaptada (Sin Saltos)</h3>
              <p className="text-xs text-gray-600">Fortalecimiento de piernas y torso respetando las articulaciones.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Reducción de Cortisol</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Descompresión Espinal & Respiración</h3>
              <p className="text-xs text-gray-600">Guía gráfica de relajación para liberar la tensión acumulada durante la jornada.</p>
            </div>
          </div>
        )}

        {activeCategory === "profesionales" && (
          <div className="bg-[#E8F0EC] p-8 rounded-3xl border border-[#C8D8CE] space-y-4">
            <h3 className="font-bold text-base text-[#1B4D3E]">Transmisiones en Vivo para la Comunidad Fitness Natural</h3>
            <p className="text-xs text-gray-700 leading-relaxed">
              Médicos, terapeutas e instructores pueden transmitir sus clases en vivo, dictar talleres y publicar contenido interactivo en Salas Virtuales temáticas (Lotus, Cielo, Bosque, Raíz).
            </p>
            <a
              href="https://wellness-app-eight-kohl.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#1B4D3E] text-white text-xs px-5 py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F]"
            >
              Probar Plataforma Wellness Web App ↗
            </a>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Wellness Web App - ASL Ideas SpA | Apoyo Visual Mente-Cuerpo y Salud Integrativa.</p>
      </footer>
    </main>
  );
}