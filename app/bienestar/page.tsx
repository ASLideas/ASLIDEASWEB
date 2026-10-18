'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function ComunidadBienestarPage() {
  const [isRoomOpen, setIsRoomOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#2C4A3E] font-sans flex flex-col justify-between">
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF8894] bg-white p-0.5 shadow-xs">
              <img src="/LOGO_BIENESTAR.png" alt="Logo Bienestar" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#2C4A3E]">Bienestar App</h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#FFF0F2] text-[#D85260] border border-[#FF8894]">
                  Muestra Tecnológica B2B
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#E8F0EC] text-[#52796F] border border-[#84A59D]">
                  App en Construcción
                </span>
              </div>
              <p className="text-xs text-[#52796F] font-medium">Mensajería Autónoma, Hábitos Saludables y Descanso Morfeo</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:contacto@aslideas.cl"
              className="bg-[#FF8894] text-white text-xs px-4 py-2.5 rounded-xl font-bold hover:bg-[#D85260] transition shadow-xs"
            >
              Agendar Reunión B2B
            </a>
            <Link href="/" className="text-xs text-[#2C4A3E] hover:underline font-semibold">
              Volver a Portada
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-[#C8D8CE] py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#52796F] border border-[#84A59D] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Tríada de Salud Integrativa
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Vitrina Comercial &amp; Recepción PDF
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#2C4A3E] leading-tight">
            ¿Por qué se creó Bienestar App y cuáles son sus beneficios?
          </h2>
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-4 shadow-xs">
            <div className="border-l-4 border-[#FF8894] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#2C4A3E] uppercase tracking-wider">Reseña de Creación</h3>
              <p className="text-xs text-gray-700 leading-relaxed mt-1">
                Se creó como una alternativa autónoma ante plataformas comerciales que imponen cobros masivos. Diseñada para comunidades y PYMES que requieren un canal propio sin spam ni cargos ocultos.
              </p>
            </div>
            <div className="border-l-4 border-[#52796F] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#2C4A3E] uppercase tracking-wider">Beneficios Principales</h3>
              <ul className="text-xs text-gray-700 space-y-1.5 mt-1 list-disc list-inside">
                <li><strong>Carga Directa de Catálogos PDF:</strong> Comercios de regiones suben sus requerimientos para la Vitrina Virtual sin viajar.</li>
                <li><strong>Comunicación Autónoma:</strong> Mensajes, llamadas y videollamadas directas en un canal propio.</li>
                <li><strong>Módulo Morfeo:</strong> Inducción al descanso y sueño REM con sonidos relajantes.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Botón Desplegable para la Sala Virtual */}
      <section className="max-w-6xl mx-auto px-6 py-8 w-full space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-left">
              <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider block">Modulo Desplegable</span>
              <h3 className="text-base font-bold text-[#2C4A3E]">Sala Virtual de Videollamada y Coordinación PYMES</h3>
              <p className="text-xs text-gray-600">Despliega el panel para reuniones en vivo y recepción de catálogos en PDF.</p>
            </div>
            <button
              onClick={() => setIsRoomOpen(!isRoomOpen)}
              className="bg-[#52796F] text-white text-xs px-5 py-2.5 rounded-xl font-bold hover:bg-[#3A5A40] transition shadow-xs flex items-center gap-2"
            >
              <span>{isRoomOpen ? "Ocultar Sala Virtual" : "Abrir Sala Virtual Desplegable"}</span>
              <span className="text-sm">{isRoomOpen ? "▲" : "▼"}</span>
            </button>
          </div>

          {isRoomOpen && (
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#84A59D] mt-4 grid md:grid-cols-3 gap-6 text-left animate-fadeIn">
              <div className="md:col-span-2 bg-[#52796F] p-5 rounded-2xl text-white flex flex-col justify-between min-h-[280px]">
                <div className="flex justify-between items-center border-b border-[#84A59D] pb-2">
                  <h4 className="font-bold text-xs text-white">Sala Virtual Bienestar — Coordinación PYMES</h4>
                  <span className="text-[9px] bg-[#FF8894] text-white px-2 py-0.5 rounded-full font-bold">En Línea</span>
                </div>
                <div className="grid grid-cols-2 gap-3 my-3">
                  <div className="bg-[#3A5A40] p-3 rounded-xl text-center border border-[#84A59D]">
                    <span className="text-[9px] text-emerald-200 block">Coordinador Bienestar</span>
                    <p className="text-xs font-bold text-white mt-1">Recepción de Catálogos</p>
                  </div>
                  <div className="bg-[#3A5A40] p-3 rounded-xl text-center border border-[#84A59D]">
                    <span className="text-[9px] text-emerald-200 block">PYME Regional</span>
                    <p className="text-xs font-bold text-white mt-1">Comercio Local</p>
                  </div>
                </div>
                <div className="flex justify-center gap-2 pt-2 border-t border-[#84A59D]">
                  <button className="bg-[#3A5A40] text-[10px] px-3 py-1 rounded-lg text-white font-semibold">Micrófono</button>
                  <button className="bg-[#3A5A40] text-[10px] px-3 py-1 rounded-lg text-white font-semibold">Cámara</button>
                  <button className="bg-[#FF8894] text-[10px] px-3 py-1 rounded-lg text-white font-bold">Compartir Catálogo</button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#C8D8CE] flex flex-col justify-between space-y-3">
                <div>
                  <h5 className="font-bold text-xs text-[#2C4A3E] border-b border-[#C8D8CE] pb-1.5">Adjuntar Catálogo PYME (PDF)</h5>
                  <p className="text-[10px] text-gray-500 mt-1">Sube tus requerimientos para la Vitrina Comercial de Bienestar.</p>
                  <div className="mt-3 p-2 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] text-[10px]">
                    <p className="font-bold text-[#2C4A3E]">Solicitud_Vitrina_PYME.pdf</p>
                    <span className="text-gray-500">Documento recibido</span>
                  </div>
                </div>
                <div className="p-3 bg-[#FFF0F2] rounded-xl border border-dashed border-[#FF8894] text-center">
                  <p className="text-[10px] font-bold text-[#D85260]">Cliente: Cargar PDF</p>
                  <button className="bg-[#FF8894] text-white text-[9px] font-bold px-3 py-1 rounded-lg hover:bg-[#D85260] transition mt-1">
                    Seleccionar Archivo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Espacio "App en Construcción" */}
        <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-3 text-center shadow-xs">
          <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider block">Espacio en Desarrollo</span>
          <h3 className="text-sm font-bold text-[#2C4A3E]">Móduo Morfeo y Red de Mensajería Autónoma — App en Construcción</h3>
          <p className="text-xs text-gray-600 max-w-xl mx-auto">
            Próximamente disponible la red social autónoma, paisajes sonoros para inducción al sueño y escáner nutricional.
          </p>
        </div>

        {/* Canales Directos */}
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4 text-center shadow-xs">
          <h3 className="text-sm font-bold text-[#2C4A3E]">Canales Directos para Agendar Reuniones B2B — Bienestar App</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2C4A3E] block mb-1">Coordinación Virtual</span>
              <p className="text-gray-600">+56 9 7654 3210</p>
            </div>
            <div className="p-4 bg-[#FFF0F2] rounded-2xl border border-[#FF8894]">
              <span className="font-bold text-[#D85260] block mb-1">Correo Institucional</span>
              <p className="text-gray-600">bienestar@aslideas.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2C4A3E] block mb-1">Reuniones B2B</span>
              <p className="text-gray-600">ASL Ideas SpA &amp; Clientes B2B</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Bienestar App - ASL Ideas SpA | Muestra Tecnológica B2B en Construcción.</p>
      </footer>
    </main>
  );
}
