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
              <p className="text-xs text-amber-800 font-semibold">Mensajería, Hábitos y Descanso Morfeo</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
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
            Tríada de Salud Integrativa — Ecosistema de Mensajería Autónoma
          </span>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            ¿Por qué se creó Bienestar App y qué función cumple?
          </h2>
          <p className="text-xs text-gray-700 leading-relaxed max-w-3xl mx-auto">
            La app de mensajería de Bienestar se creó en función de que aplicaciones como WhatsApp, WhatsApp Business o Telegram a la larga pueden cobrar por mensajes masivos. Por ese motivo se creó Bienestar, conformando un ecosistema propio que junto con <strong>LAWENMOLL ([enlace sospechoso eliminado]) y Wellness Web App (https://wellness-app-eight-kohl.vercel.app/)</strong> hacen una <strong>tríada estratégica</strong> para manejar y fortalecer la salud integrativa e impulsar una mejor calidad de vida.
          </p>
          <p className="text-xs text-gray-700 leading-relaxed max-w-3xl mx-auto pt-2">
            La función que cumple Bienestar como mensajería es comunicarse e interactuar con amigos y personas cercanas, integrando distintos enfoques dentro de la misma aplicación: crear conciencia de los pasos que caminas, la cantidad de agua que tomas y las calorías que consumes en el día con sugerencias de ejercicios. Forma parte de un estado de salud física y psicológica a través del buen dormir en su <strong>Módulo Morfeo</strong> (con música relajante, sonidos, voces, tips de meditación) y apoya a microempresas y pymes que vendan productos naturales u otros rubros integradas en el ecosistema.
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
            Mensajería &amp; Muro Interactivo
          </button>
          <button
            onClick={() => setActiveTab("habitos")}
            className={activeTab === "habitos" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Pasos, Agua, Calorías y Ejercicios
          </button>
          <button
            onClick={() => setActiveTab("morfeo")}
            className={activeTab === "morfeo" ? "px-5 py-2.5 rounded-xl bg-amber-900 text-white" : "px-5 py-2.5 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-50"}
          >
            Módulo Morfeo (Salud Física &amp; Psicológica)
          </button>
          <button
            onClick={() => setActiveTab("pymes")}
            className={activeTab === "pymes" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Vitrina PYMES &amp; Microempresas
          </button>
        </div>

        {activeTab === "comunidad" && (
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#1B4D3E]">Mensajería Fluida e Interacción Social</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Comunícate con amigos y personas cercanas compartiendo mensajes, imágenes y videos, con acceso directo a llamadas y videollamadas.
            </p>
          </div>
        )}

        {activeTab === "habitos" && (
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-2">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Podómetro</span>
              <h4 className="font-bold text-xs text-[#1B4D3E]">Pasos Caminados</h4>
              <p className="text-[11px] text-gray-600">Creación de conciencia sobre la caminata diaria.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-2">
              <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider block">Hidratación</span>
              <h4 className="font-bold text-xs text-[#1B4D3E]">Vasos de Agua</h4>
              <p className="text-[11px] text-gray-600">Registro de consumo para hidratación corporal.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Nutrición</span>
              <h4 className="font-bold text-xs text-[#1B4D3E]">Escáner de Calorías</h4>
              <p className="text-[11px] text-gray-600">Control amigable de alimentos en el día.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Movimiento</span>
              <h4 className="font-bold text-xs text-[#1B4D3E]">Sugerencias de Ejercicios</h4>
              <p className="text-[11px] text-gray-600">Horarios y rutinas adaptadas a tu ritmo.</p>
            </div>
          </div>
        )}

        {activeTab === "morfeo" && (
          <div className="bg-[#1C2541] text-white p-8 rounded-3xl space-y-4 shadow-lg">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">Módulo Morfeo — Salud Física y Psicológica</span>
            <h3 className="text-xl font-bold">Música Relajante, Sonidos, Voces y Meditación para el Buen Dormir</h3>
            <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
              Diseñado para inducir un estado de descanso integral y sueño REM. Ofrece paisajes sonoros, voces serenas, música de relajación y tips de meditación.
            </p>
          </div>
        )}

        {activeTab === "pymes" && (
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4">
            <h3 className="font-bold text-base text-[#1B4D3E]">Impulso a Microempresas y PYMES de Productos Naturales</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Vitrina integrada para que emprendedores y pymes exhiban sus productos herbolarios, orgánicos y de bienestar a todos los usuarios del ecosistema.
            </p>
          </div>
        )}

        <div className="text-center pt-2">
          <a
            href="https://aslideas-bienestar-2jpc.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-800 text-white text-xs px-6 py-3 rounded-xl font-bold hover:bg-amber-900 transition shadow-xs"
          >
            Abrir Bienestar App en la Web ↗
          </a>
        </div>

        {/* Canales de Contacto Directo y Redes Alternativas */}
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4 text-center">
          <h3 className="text-base font-bold text-[#1B4D3E]">Contacto Directo &amp; Redes Oficiales — Bienestar App</h3>
          <p className="text-xs text-gray-600">Canales de soporte para usuarios, comunidades y pymes integradas.</p>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">📞 Teléfono / WhatsApp Virtual</span>
              <p className="text-gray-600">+56 9 7654 3210 (Atención Comunitaria)</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">✉️ Correo Electrónico</span>
              <p className="text-gray-600">bienestar@aslideas.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">🌐 Redes Sociales Oficiales</span>
              <p className="text-gray-600">@bienestar.app.cl | Instagram / Telegram</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Bienestar App - ASL Ideas SpA | Integrada en la Tríada con LAWENMOLL y Wellness Web App.</p>
      </footer>
    </main>
  );
}