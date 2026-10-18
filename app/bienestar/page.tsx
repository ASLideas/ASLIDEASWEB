'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function BienestarExplorarPage() {
  const [activeTab, setActiveTab] = useState("comunidad");

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-700 bg-white p-0.5">
              <img src="/LOGO BIENESTAR.png" alt="Logo Bienestar" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1B4D3E]">Bienestar App</h1>
              <p className="text-xs text-amber-800 font-semibold">Comunidad, Hábitos Saludables y Descanso Morfeo</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://aslideas-bienestar-2jpc.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-800 text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-amber-900 transition"
            >
              Abrir Bienestar App ↗
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
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Ecosistema de Mensajería Autónoma y Salud Integrativa
          </span>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            ¿Por qué se creó Bienestar App y qué función cumple?
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Bienestar App nació de una necesidad estratégica: evitar la dependencia de aplicaciones comerciales de mensajería (como WhatsApp Business o Telegram), las cuales con el tiempo aplican cobros por mensajes masivos.
            Al contar con una plataforma propia de mensajería y comunidad, se conforma una <strong>tríada perfecta junto con LAWENMOLL y Wellness Web App</strong> para fortalecer la salud integrativa, comunicarse fluidamente y crear conciencia sobre pasos caminados, agua consumida, balance calórico, descanso profundo con el <strong>Módulo Morfeo</strong> e impulso a PYMES de productos naturales.
          </p>
        </div>
      </section>

      {/* Secciones Interactivas */}
      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8">
        <div className="flex justify-center gap-3 text-xs font-bold flex-wrap">
          <button
            onClick={() => setActiveTab("comunidad")}
            className={activeTab === "comunidad" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Mensajería y Muro Social
          </button>
          <button
            onClick={() => setActiveTab("habitos")}
            className={activeTab === "habitos" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Pasos, Agua y Escáner
          </button>
          <button
            onClick={() => setActiveTab("morfeo")}
            className={activeTab === "morfeo" ? "px-5 py-2.5 rounded-xl bg-amber-900 text-white" : "px-5 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-50"}
          >
            Módulo Morfeo (Sueño REM)
          </button>
          <button
            onClick={() => setActiveTab("pymes")}
            className={activeTab === "pymes" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Shopping PYMES Naturales
          </button>
        </div>

        {activeTab === "comunidad" && (
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#1B4D3E]">Canal de Comunicación Fluido y Libre de Estrés</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Permite enviar mensajes, fotos y videos a seres queridos, ofreciendo también enlaces directos para llamadas telefónicas y videollamadas con coordinadores comunitarios.
            </p>
          </div>
        )}

        {activeTab === "habitos" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-2">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Podómetro Diario</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Conteo de Pasos Suaves</h4>
              <p className="text-xs text-gray-600">Registro amable de caminatas para evitar el sedentarismo sin sobreexigencia.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-2">
              <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider block">Hidratación</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Monitor de Agua Consumida</h4>
              <p className="text-xs text-gray-600">Recordatorio consciente para mantener un nivel óptimo de hidratación diario.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Escáner Nutricional</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Escáner de Alimentos y Calorías</h4>
              <p className="text-xs text-gray-600">Análisis gráfico del plato para evaluar el aporte e ingredientes.</p>
            </div>
          </div>
        )}

        {activeTab === "morfeo" && (
          <div className="bg-[#1C2541] text-white p-8 rounded-3xl space-y-4 shadow-lg">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">Módulo Morfeo</span>
            <h3 className="text-xl font-bold">Música de Relajación, Historias y Meditación para Sueño REM</h3>
            <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
              Especialmente diseñado para personas con insomnio o mal dormir. Ofrece paisajes sonoros, meditaciones guiadas e historias serenas para inducir un descanso reparador.
            </p>
          </div>
        )}

        {activeTab === "pymes" && (
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#1B4D3E]">Vitrina para Emprendimientos de Salud Natural</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Vitrina comercial para pymes de herbolaria nativa, cosmética limpia y alimentos orgánicos, conectando a productores locales con la comunidad.
            </p>
          </div>
        )}

        <div className="text-center pt-6">
          <a
            href="https://aslideas-bienestar-2jpc.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-800 text-white text-xs px-6 py-3 rounded-xl font-bold hover:bg-amber-900 transition shadow-xs"
          >
            Explorar Bienestar App ↗
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Bienestar App - ASL Ideas SpA | Red de Autocuidado, Comunidad y Descanso Morfeo.</p>
      </footer>
    </main>
  );
}