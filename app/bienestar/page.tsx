'use client';

import React from "react";
import Link from "next/link";

export default function ComunidadBienestarPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C8D8CE] bg-white p-0.5">
              <img src="/LOGO BIENESTAR.png" alt="Logo Bienestar" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#1B4D3E]">Bienestar App</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#B08D4B] border border-[#C8D8CE]">
                  App en Construcción
                </span>
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

      <section className="bg-white border-b border-[#C8D8CE] py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Tríada de Salud Integrativa
            </span>
            <span className="bg-[#FAF8F5] text-[#B08D4B] border border-[#C8D8CE] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Videollamadas Directas &amp; Horas Médicas
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            Videollamadas en Vivo, Agendamiento Médico y Red de Mensajería
          </h2>
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-4">
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>Bienestar App</strong> integra llamadas y videollamadas directas para comunicarse con amigos y coordinadores. Además, incluye un sistema para agendar horas médicas en consultorios (CESFAM), hospitales o centros privados, alertas de salud (agua, pasos, calorías) y el <strong>Módulo Morfeo</strong> para el descanso y sueño REM.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8">
        <h3 className="text-xs font-bold text-[#1B4D3E] text-center uppercase tracking-wider">Funcionalidades Integradas en Bienestar App</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-2">
            <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider block">Mensajería &amp; Red</span>
            <h4 className="font-bold text-xs text-[#1B4D3E]">Videollamadas Directas</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">Comunicación fluida con amigos y comunidades con soporte para llamadas y videollamadas en tiempo real.</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-2">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Conciencia Corporal</span>
            <h4 className="font-bold text-xs text-[#1B4D3E]">Pasos, Agua &amp; Calorías</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">Registro de caminata diaria, monitoreo de hidratación y escáner nutricional con evaluación de calorías.</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-2">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Salud &amp; Agendamiento</span>
            <h4 className="font-bold text-xs text-[#1B4D3E]">Horas Médicas &amp; Ejercicios</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">Alarmas para agendar horas en CESFAM, hospitales o privadas, con pautas de yoga, pilates, HIIT y cardio.</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-2">
            <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider block">Descanso &amp; PYMES</span>
            <h4 className="font-bold text-xs text-[#1B4D3E]">Módulo Morfeo &amp; Shopping</h4>
            <p className="text-[11px] text-gray-600 leading-relaxed">Tips y paisajes sonoros para inducción al sueño REM, junto a la vitrina comercial de productos naturales.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4">
          <h3 className="text-xs font-bold text-[#1B4D3E] text-center uppercase tracking-wider">Ecosistema de Salud Integrativa — Tríada de Aplicaciones</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center text-xs">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="font-bold text-[#1B4D3E] block">LAWENMOLL</span>
              <p className="text-gray-600 text-[11px]">Salud integrativa, agendamiento y fichas clínicas.</p>
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
            <div className="p-4 bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="font-bold text-[#1B4D3E] block">Bienestar App</span>
              <p className="text-gray-600 text-[11px]">Mensajería, hábitos y descanso Morfeo.</p>
              <a href="https://aslideas-bienestar-2jpc.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block text-emerald-800 font-bold hover:underline">
                https://aslideas-bienestar-2jpc.vercel.app/
              </a>
            </div>
          </div>
        </div>

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

      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Bienestar App - ASL Ideas SpA | Plataforma en Construcción.</p>
      </footer>
    </main>
  );
}
