'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function LawenmollExplorarPage() {
  const [activeTab, setActiveTab] = useState("agendamiento");

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C8D8CE] bg-white p-0.5">
              <img src="/lawenmoll_logo.jpg" alt="Logo LAWENMOLL" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#1B4D3E]">LAWENMOLL</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF8F5] text-[#B08D4B] border border-[#C8D8CE]">
                  App en Construcción
                </span>
              </div>
              <p className="text-xs text-emerald-800 font-medium">Salud Integrativa y Fichas Clínicas Protegidas (Ley N° 21.663)</p>
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

      <section className="bg-white border-b border-[#C8D8CE] py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Tríada de Salud Integrativa
            </span>
            <span className="bg-[#FAF8F5] text-[#B08D4B] border border-[#C8D8CE] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Agendamiento &amp; Telemedicina Encriptada
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            Agendamiento de Citas Médicas y Consultas por Videollamada
          </h2>
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-3">
            <p className="text-xs text-gray-700 leading-relaxed">
              En <strong>LAWENMOLL</strong> los usuarios y pacientes pueden coordinar y agendar citas virtuales directamente con médicos, terapeutas e instituciones de salud integrativa. Las consultas se realizan en salas de videollamada protegidas bajo cifrado de datos y estándares de la Ley N° 21.663.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8">
        <div className="flex justify-center gap-3 text-xs font-bold flex-wrap">
          <button
            onClick={() => setActiveTab("agendamiento")}
            className={activeTab === "agendamiento" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Agendar Cita Virtual
          </button>
          <button
            onClick={() => setActiveTab("fichas")}
            className={activeTab === "fichas" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Fichas Clínicas (Ley N° 21.663)
          </button>
        </div>

        {activeTab === "agendamiento" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider block">Reserva en Línea</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Agendamiento Directo</h3>
              <p className="text-xs text-gray-600">Selecciona especialista, fecha y hora disponible para tu consulta virtual.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Conexión HD</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Videollamada Médica</h3>
              <p className="text-xs text-gray-600">Salas virtuales privadas para atención 1:1 con transmisión estable y segura.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Seguimiento</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Recordatorios de Cita</h3>
              <p className="text-xs text-gray-600">Notificaciones automáticas antes de tu consulta virtual programada.</p>
            </div>
          </div>
        )}

        {activeTab === "fichas" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider block">Ciberseguridad</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Fichas Encriptadas</h3>
              <p className="text-xs text-gray-600">Registro protegido bajo estándares de la Ley N° 21.663 para datos de salud.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Atención Profesional</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Red de Especialistas</h3>
              <p className="text-xs text-gray-600">Conexión con médicos y terapeutas acreditados en medicina integrativa.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Historial</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Evolución Clínica</h3>
              <p className="text-xs text-gray-600">Monitoreo continuo de tratamientos, exámenes y hábitos de bienestar.</p>
            </div>
          </div>
        )}

        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4">
          <h3 className="text-xs font-bold text-[#1B4D3E] text-center uppercase tracking-wider">Ecosistema de Salud Integrativa — Tríada de Aplicaciones</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center text-xs">
            <div className="p-4 bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE] space-y-2">
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
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="font-bold text-[#1B4D3E] block">Bienestar App</span>
              <p className="text-gray-600 text-[11px]">Mensajería, hábitos y descanso Morfeo.</p>
              <a href="https://aslideas-bienestar-2jpc.vercel.app/" target="_blank" rel="noopener noreferrer" className="inline-block text-emerald-800 font-bold hover:underline">
                https://aslideas-bienestar-2jpc.vercel.app/
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4 text-center">
          <h3 className="text-sm font-bold text-[#1B4D3E]">Canales de Contacto Directo — LAWENMOLL</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Teléfono / WhatsApp Virtual</span>
              <p className="text-gray-600">+56 9 6543 2109</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Correo Electrónico</span>
              <p className="text-gray-600">contacto@lawenmoll.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Redes Sociales Oficiales</span>
              <p className="text-gray-600">@lawenmoll.cl | ASL Ideas SpA</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} LAWENMOLL - ASL Ideas SpA | Plataforma en Construcción.</p>
      </footer>
    </main>
  );
}
