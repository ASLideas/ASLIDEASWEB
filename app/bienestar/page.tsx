'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function BienestarExplorarPage() {
  const [activeTab, setActiveTab] = useState("comunidad");

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      {/* Header idéntico a Lawenmoll */}
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C8D8CE] bg-white p-0.5">
              <img src="/LOGO BIENESTAR.png" alt="Logo Bienestar" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1B4D3E]">Bienestar App</h1>
              <p className="text-xs text-amber-800 font-medium">Mensajería, Hábitos y Descanso Morfeo</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://aslideas-bienestar-2jpc.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-800 text-white text-xs px-4 py-2.5 rounded-xl font-bold hover:bg-amber-900 transition"
            >
              Abrir Bienestar App
            </a>
            <Link href="/" className="text-xs text-[#1B4D3E] hover:underline font-semibold">
              Volver a Portada
            </Link>
          </div>
        </div>
      </header>

      {/* Propósito y Respuesta a las Interrogantes */}
      <section className="bg-white border-b border-[#C8D8CE] py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="bg-amber-100 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
            Tríada de Salud Integrativa — Ecosistema de Mensajería Autónoma
          </span>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            ¿Por qué se creó Bienestar App y qué función cumple?
          </h2>
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-3">
            <p className="text-xs text-gray-700 leading-relaxed">
              La app de mensajería de <strong>Bienestar</strong> se creó en función de que WhatsApp, WhatsApp Business o Telegram a la larga pueden cobrar por mensajes masivos. Por ese motivo se crea Bienestar, que es un ecosistema que junto con <strong>LAWENMOLL ([enlace sospechoso eliminado])</strong> y <strong>Wellness Web App (https://wellness-app-eight-kohl.vercel.app/)</strong> hacen una <strong>tríada</strong> para manejar y fortalecer la salud integrativa e impulsar una mejor calidad de vida.
            </p>
            <p className="text-xs text-gray-700 leading-relaxed">
              La función que cumple Bienestar como mensajería está para comunicarse e interactuar con amigos y personas. A su vez, tiene distintos enfoques dentro de esta aplicación: sirve para crear conciencia de los pasos que caminas, la cantidad de agua que tienes que tomar, las calorías que comes en el transcurso del día y sugerencias de ejercicios. Forma parte de un estado de salud física y psicológica por el buen dormir en su <strong>Módulo Morfeo</strong> (que da tips para descansar como música relajante, sonidos, voces y meditación para lograr sueño REM), y ayuda a microempresas, pymes o personas que vendan productos naturales u otros rubros dentro del ecosistema integrado.
            </p>
          </div>
        </div>
      </section>

      {/* Secciones Interactivas */}
      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8">
        <div className="flex justify-center gap-3 text-xs font-bold flex-wrap">
          <button
            onClick={() => setActiveTab("comunidad")}
            className={activeTab === "comunidad" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Mensajería &amp; Interacción
          </button>
          <button
            onClick={() => setActiveTab("habitos")}
            className={activeTab === "habitos" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Pasos, Agua, Calorías &amp; Ejercicios
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
            Shopping PYMES Naturales
          </button>
        </div>

        {activeTab === "comunidad" && (
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-3">
            <h3 className="font-bold text-base text-[#1B4D3E]">Comunicación Fluida e Interacción con Personas</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Plataforma fluida para compartir mensajes, imágenes y videos con amigos y personas cercanas, además de llamadas y videollamadas directas.
            </p>
          </div>
        )}

        {activeTab === "habitos" && (
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Podómetro</span>
              <h4 className="font-bold text-xs text-[#1B4D3E]">Pasos Caminados</h4>
              <p className="text-[11px] text-gray-600">Creación de conciencia sobre la caminata diaria.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider block">Hidratación</span>
              <h4 className="font-bold text-xs text-[#1B4D3E]">Vasos de Agua</h4>
              <p className="text-[11px] text-gray-600">Registro de consumo para el equilibrio hídrico.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Nutrición</span>
              <h4 className="font-bold text-xs text-[#1B4D3E]">Escáner de Calorías</h4>
              <p className="text-[11px] text-gray-600">Escáner gráfico para conocer el aporte calórico.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Movimiento</span>
              <h4 className="font-bold text-xs text-[#1B4D3E]">Sugerencias de Ejercicios</h4>
              <p className="text-[11px] text-gray-600">Horarios y pautas de rutinas adaptadas.</p>
            </div>
          </div>
        )}

        {activeTab === "morfeo" && (
          <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-widest block">Módulo Morfeo — Salud Física y Psicológica</span>
            <h3 className="text-lg font-bold text-[#1B4D3E]">Música Relajante, Historias, Meditación y Consejos para Sueño REM</h3>
            <p className="text-xs text-gray-700 leading-relaxed max-w-2xl">
              Diseñado para personas que tienen mal dormir. Ofrece paisajes sonoros, voces serenas, música de relajación y tips de meditación para un descanso reparador y saludable.
            </p>
          </div>
        )}

        {activeTab === "pymes" && (
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-3">
            <h3 className="font-bold text-base text-[#1B4D3E]">Shopping &amp; Vitrina para Microempresas y PYMES</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Espacio donde las pymes pueden mostrar sus emprendimientos de herbolaria, medicina natural u otros rubros para la comunidad.
            </p>
          </div>
        )}

        {/* Tríada de Aplicaciones */}
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4">
          <h3 className="text-xs font-bold text-[#1B4D3E] text-center uppercase tracking-wider">Ecosistema de Salud Integrativa — Tríada de Aplicaciones</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center text-xs">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="font-bold text-[#1B4D3E] block">🏥 LAWENMOLL</span>
              <p className="text-gray-600 text-[11px]">Salud integrativa, evaluación y fichas clínicas.</p>
              <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" className="inline-block text-emerald-800 font-bold hover:underline">
                [enlace sospechoso eliminado]
              </a>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="font-bold text-[#1B4D3E] block">🌿 Wellness Web App</span>
              <p className="text-gray-600 text-[11px]">Apoyo visual y clases en vivo.</p>
              <a href="https://wellness-app-eight-kohl.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block text-emerald-800 font-bold hover:underline">
                https://wellness-app-eight-kohl.vercel.app/
              </a>
            </div>
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
              <span className="font-bold text-amber-900 block">💚 Bienestar App</span>
              <p className="text-gray-600 text-[11px]">Mensajería, hábitos y descanso Morfeo.</p>
              <a href="https://aslideas-bienestar-2jpc.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block text-amber-900 font-bold hover:underline">
                https://aslideas-bienestar-2jpc.vercel.app/
              </a>
            </div>
          </div>
        </div>

        {/* Canales de Contacto Directo */}
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4 text-center">
          <h3 className="text-sm font-bold text-[#1B4D3E]">Canales de Contacto Directo — Bienestar App</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">📞 Teléfono / WhatsApp Virtual</span>
              <p className="text-gray-600">+56 9 7654 3210</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">✉️ Correo Electrónico</span>
              <p className="text-gray-600">bienestar@aslideas.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">🌐 Redes Sociales Oficiales</span>
              <p className="text-gray-600">@bienestar.app.cl | ASL Ideas SpA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Bienestar App - ASL Ideas SpA | Parte de la Tríada de Salud Integrativa con LAWENMOLL y Wellness Web App.</p>
      </footer>
    </main>
  );
}