'use client';

import React from "react";
import Link from "next/link";

export default function ComunidadBienestarPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      {/* Header estilo Lawenmoll con acento rosado sutil de ASL Ideas SpA */}
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E8B4B8] bg-white p-0.5 shadow-xs">
              <img src="/LOGO BIENESTAR.png" alt="Logo Bienestar" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#1B4D3E]">Bienestar App</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF0F2] text-[#9E4A59] border border-[#E8B4B8]">ASL Ideas</span>
              </div>
              <p className="text-xs text-emerald-800 font-medium">Mensajería Autónoma, Hábitos Saludables y Descanso Morfeo</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://aslideas-bienestar-2jpc.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1B4D3E] text-white text-xs px-4 py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F] transition"
            >
              Abrir Bienestar App
            </a>
            <Link href="/" className="text-xs text-[#1B4D3E] hover:underline font-semibold">
              Volver a Portada
            </Link>
          </div>
        </div>
      </header>

      {/* Propósito y Justificación Estratégica */}
      <section className="bg-white border-b border-[#C8D8CE] py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Tríada de Salud Integrativa
            </span>
            <span className="bg-[#FAF0F2] text-[#9E4A59] border border-[#E8B4B8] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Ecosistema de Mensajería Autónoma
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            ¿Por qué se creó Bienestar App y qué función cumple?
          </h2>
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-4">
            <p className="text-xs text-gray-700 leading-relaxed">
              La aplicación de mensajería <strong>Bienestar</strong> se creó como una respuesta estratégica frente a plataformas comerciales como WhatsApp, WhatsApp Business o Telegram, las cuales con el tiempo pueden aplicar cobros por envíos masivos. Por este motivo se diseñó un ecosistema propio que, junto a <strong>LAWENMOLL (https://lawenmoll.cl)</strong> y <strong>Wellness Web App (https://wellness-app-eight-kohl.vercel.app/)</strong>, conforma una <strong>tríada estratégica</strong> para fortalecer la salud integrativa y elevar la calidad de vida.
            </p>
            <p className="text-xs text-gray-700 leading-relaxed">
              Para diferenciarse de una aplicación convencional, <strong>Bienestar App</strong> incorpora herramientas integrales de salud física y psicológica: comunicación fluida con amigos y allegados (mensajes, imágenes, videos, llamadas y videollamadas), un muro de interacción para la comunidad, seguimiento de caminata diaria (podómetro), control de hidratación (toma de agua), alarmas y agendamiento de citas médicas (consultorios/CESFAM, hospitales o consultas privadas), escáner de alimentos e ingesta calórica, y sugerencias de rutinas de ejercicio (yoga, pilates, HIIT y cardio).
            </p>
            <p className="text-xs text-gray-700 leading-relaxed">
              Asimismo, incluye el <strong>Módulo Morfeo</strong>, un espacio de inducción al descanso profundo para personas con mal dormir o dificultad para conciliar el sueño, con música relajante, paisajes sonoros, voces serenas, meditación guiada y tips para lograr sueño REM. Además, integra un canal de <strong>Shopping para PYMES</strong> y microempresas locales de herbolaria y productos naturales.
            </p>
          </div>
        </div>
      </section>

      {/* Módulos de Bienestar App (4 Columnas estilo Lawenmoll) */}
      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8">
        <h3 className="text-xs font-bold text-[#1B4D3E] text-center uppercase tracking-wider">Ejes Fundamentales de Bienestar App</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-2">
            <span className="text-[10px] font-bold text-[#9E4A59] uppercase tracking-wider block">Mensajería &amp; Red</span>
            <h4 className="font-bold text-xs text-[#1B4D3E]">Comunicación Fluida</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">Interacción con amigos y personas cercanas mediante mensajes, imágenes, videos, llamadas y videollamadas.</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-2">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Conciencia Corporal</span>
            <h4 className="font-bold text-xs text-[#1B4D3E]">Pasos, Agua &amp; Calorías</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">Registro de caminata diaria, monitoreo de agua consumida y escáner nutricional con evaluación de calorías.</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-2">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Salud &amp; Movimiento</span>
            <h4 className="font-bold text-xs text-[#1B4D3E]">Citas Médicas &amp; Ejercicios</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">Alarmas para horas médicas (consultorio, hospital o consultas privadas) y pautas de yoga, pilates, HIIT y cardio.</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-2">
            <span className="text-[10px] font-bold text-[#9E4A59] uppercase tracking-wider block">Descanso &amp; Comercio</span>
            <h4 className="font-bold text-xs text-[#1B4D3E]">Módulo Morfeo &amp; PYMES</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">Tips y sonidos de meditación para un sueño REM reparador, junto a la vitrina comercial de productos naturales.</p>
          </div>
        </div>

        {/* Tríada de Aplicaciones */}
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4">
          <h3 className="text-xs font-bold text-[#1B4D3E] text-center uppercase tracking-wider">Ecosistema de Salud Integrativa — Tríada de Aplicaciones</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center text-xs">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="font-bold text-[#1B4D3E] block">LAWENMOLL</span>
              <p className="text-gray-600 text-[11px]">Salud integrativa, evaluación y fichas clínicas.</p>
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
            <div className="p-4 bg-[#FAF0F2] rounded-2xl border border-[#E8B4B8] space-y-2">
              <span className="font-bold text-[#9E4A59] block">Bienestar App</span>
              <p className="text-gray-600 text-[11px]">Mensajería, hábitos y descanso Morfeo.</p>
              <a href="https://aslideas-bienestar-2jpc.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block text-[#9E4A59] font-bold hover:underline">
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
              <span className="font-bold text-[#1B4D3E] block mb-1">Teléfono / WhatsApp Virtual</span>
              <p className="text-gray-600">+56 9 7654 3210</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Correo Electrónico</span>
              <p className="text-gray-600">bienestar@aslideas.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Redes Sociales Oficiales</span>
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