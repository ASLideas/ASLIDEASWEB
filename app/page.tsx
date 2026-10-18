'use client';

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C8D8CE] bg-white p-0.5">
              <img src="/logo.png" alt="Logo ASL Ideas SpA" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#1B4D3E]">ASL Ideas SpA</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#B08D4B] border border-[#C8D8CE]">
                  App en Construcción
                </span>
              </div>
              <p className="text-xs text-emerald-800 font-medium">Estrategia de Salud Digital Inclusiva</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/lawenmoll" className="text-[#1B4D3E] hover:underline">LAWENMOLL</Link>
            <Link href="/wellness" className="text-[#1B4D3E] hover:underline">Wellness</Link>
            <Link href="/comunidad" className="text-[#1B4D3E] hover:underline">Bienestar</Link>
          </div>
        </div>
      </header>

      <div className="bg-[#E8F0EC] border-b border-[#C8D8CE] py-2 px-6 text-center text-xs font-semibold text-[#1B4D3E]">
        Plataformas en fase de construcción. Módulo de agendamiento de citas y videollamadas virtuales integrado.
      </div>

      <section className="bg-white border-b border-[#C8D8CE] py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Ecosistema de Salud Digital
            </span>
            <span className="bg-[#FAF8F5] text-[#B08D4B] border border-[#C8D8CE] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Reuniones &amp; Citas Virtuales Activas
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            Tecnología Humana, Inclusiva y Agendamiento Virtual Integrado
          </h2>
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-3">
            <p className="text-xs text-gray-700 leading-relaxed">
              <strong>ASL Ideas SpA</strong> unifica la evaluación de salud, la medicina integrativa y las reuniones virtuales. Ahora puedes agendar citas corporativas, consultas médicas encriptadas, clases en vivo y videollamadas en tiempo real directamente desde nuestro ecosistema.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8">
        <h3 className="text-xs font-bold text-[#1B4D3E] text-center uppercase tracking-wider">Agendamiento Virtual en los 4 Portales del Ecosistema</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider block">Casa Matriz B2B</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">ASL Ideas SpA</h4>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Convenios institucionales, licencias de software accesible y reuniones B2B.
              </p>
            </div>
            <div className="pt-2 space-y-1.5">
              <a href="mailto:contacto@aslideas.cl" className="block text-center bg-[#1B4D3E] text-white text-[11px] py-2 rounded-xl font-bold hover:bg-[#2D6A4F]">
                Agendar Reunión B2B
              </a>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Salud Integrativa</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">LAWENMOLL</h4>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Test de bienestar y agendamiento de citas médicas con fichas protegidas.
              </p>
            </div>
            <div className="pt-2 space-y-1.5">
              <Link href="/lawenmoll" className="block text-center bg-[#1B4D3E] text-white text-[11px] py-2 rounded-xl font-bold hover:bg-[#2D6A4F]">
                Agendar Cita Médica
              </Link>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Salas Virtuales</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Wellness Web App</h4>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Reservas para salas interactivas, clases en vivo y reuniones grupales en HD.
              </p>
            </div>
            <div className="pt-2 space-y-1.5">
              <Link href="/wellness" className="block text-center bg-[#1B4D3E] text-white text-[11px] py-2 rounded-xl font-bold hover:bg-[#2D6A4F]">
                Reservar Sala Virtual
              </Link>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider block">Mensajería Autónoma</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Bienestar App</h4>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Videollamadas directas 1:1, horas médicas en consultorios y Módulo Morfeo.
              </p>
            </div>
            <div className="pt-2 space-y-1.5">
              <Link href="/comunidad" className="block text-center bg-[#1B4D3E] text-white text-[11px] py-2 rounded-xl font-bold hover:bg-[#2D6A4F]">
                Iniciar Videollamada
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4 text-center">
          <h3 className="text-sm font-bold text-[#1B4D3E]">Canales de Contacto Directo — ASL Ideas SpA</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Teléfono / WhatsApp Virtual</span>
              <p className="text-gray-600">+56 9 6543 2109</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Correo Electrónico</span>
              <p className="text-gray-600">contacto@aslideas.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Redes Sociales Oficiales</span>
              <p className="text-gray-600">@aslideas.cl | ASL Ideas SpA</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} ASL Ideas SpA | Estrategia de Salud Digital Inclusiva. Plataformas en Construcción.</p>
      </footer>
    </main>
  );
}
