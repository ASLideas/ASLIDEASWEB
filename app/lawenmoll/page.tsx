'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function LawenmollExplorarPage() {
  const [activeTab, setActiveTab] = useState("sala");

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF8894] bg-white p-0.5 shadow-xs">
              <img src="/lawenmoll_logo.jpg" alt="Logo LAWENMOLL" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#1B4D3E]">LAWENMOLL</h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#FFF0F2] text-[#D85260] border border-[#FF8894]">
                  Muestra de Software B2B
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE]">
                  App en Construcción
                </span>
              </div>
              <p className="text-xs text-emerald-800 font-medium">Salud Integrativa, Test de Bienestar y Fichas Protegidas (Ley N° 21.663)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:contacto@aslideas.cl"
              className="bg-[#FF8894] text-white text-xs px-4 py-2.5 rounded-xl font-bold hover:bg-[#D85260] transition shadow-xs"
            >
              Agendar Reunión B2B
            </a>
            <Link href="/" className="text-xs text-[#1B4D3E] hover:underline font-semibold">
              Volver a Portada
            </Link>
          </div>
        </div>
      </header>

      <div className="bg-[#FFF0F2] border-b border-[#FF8894] py-2 px-6 text-center text-xs font-semibold text-[#1B4D3E]">
        Atención a Regiones: Ingresa a nuestra Sala Virtual LAWENMOLL y adjunta tus requerimientos en PDF para la Vitrina Virtual.
      </div>

      <section className="bg-white border-b border-[#C8D8CE] py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Tríada de Salud Integrativa
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Vitrina Virtual &amp; Peticiones PDF
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1B4D3E] leading-tight">
            ¿Por qué se creó LAWENMOLL y cuáles son sus beneficios?
          </h2>
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-4 shadow-xs">
            <div className="border-l-4 border-[#FF8894] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">Reseña de Creación</h3>
              <p className="text-xs text-gray-700 leading-relaxed mt-1">
                LAWENMOLL fue concebida como una respuesta accesible para dar a conocer alternativas integrativas ante enfermedades crónicas y estrés. Su diseño amable y libre de barreras cognitivas permite a clientes e instituciones evaluar el bienestar de forma respetuosa.
              </p>
            </div>
            <div className="border-l-4 border-[#2D6A4F] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">Beneficios Principales</h3>
              <ul className="text-xs text-gray-700 space-y-2 mt-1 list-disc list-inside">
                <li><strong>Ahorro en Traslados Regionales:</strong> Los clientes de regiones envían directamente sus archivos PDF con peticiones de productos o servicios para la Vitrina Virtual.</li>
                <li><strong>Evaluación de Bienestar Inteligente:</strong> Herramienta preventiva sin juicios corporales.</li>
                <li><strong>Demostración de Ciberseguridad:</strong> Fichas protegidas bajo estándares de la Ley N° 21.663.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-8 w-full space-y-6">
        <div className="flex justify-center gap-3 text-xs font-bold flex-wrap">
          <button
            onClick={() => setActiveTab("sala")}
            className={activeTab === "sala" ? "px-5 py-2.5 rounded-xl bg-[#FF8894] text-white shadow-xs" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Sala Virtual LAWENMOLL (Videollamada &amp; PDF)
          </button>
          <button
            onClick={() => setActiveTab("fichas")}
            className={activeTab === "fichas" ? "px-5 py-2.5 rounded-xl bg-[#1B4D3E] text-white" : "px-5 py-2.5 rounded-xl bg-white border border-[#C8D8CE] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Fichas Protegidas (Ley N° 21.663)
          </button>
        </div>

        {activeTab === "sala" && (
          <div className="bg-white rounded-3xl border border-[#FF8894] overflow-hidden shadow-sm grid md:grid-cols-3 min-h-[400px]">
            <div className="md:col-span-2 bg-[#1B4D3E] p-6 text-white flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-emerald-700 pb-3">
                <div>
                  <h4 className="font-bold text-sm text-white">Sala Virtual LAWENMOLL — Vitrina Virtual</h4>
                  <p className="text-[10px] text-emerald-200">Conexión Directa con Cliente Regional</p>
                </div>
                <span className="text-[10px] bg-[#FF8894] text-white px-2.5 py-1 rounded-full font-bold">En Vivo</span>
              </div>

              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="bg-[#2D6A4F] rounded-2xl p-4 border border-emerald-600 flex flex-col justify-between h-28 relative">
                  <span className="text-[10px] bg-black/40 text-white px-2 py-0.5 rounded-md self-start">Coordinador LAWENMOLL</span>
                  <p className="text-xs font-bold text-center text-emerald-100">Recepción de Requerimientos</p>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 absolute top-3 right-3"></div>
                </div>
                <div className="bg-[#2D6A4F] rounded-2xl p-4 border border-emerald-600 flex flex-col justify-between h-28 relative">
                  <span className="text-[10px] bg-black/40 text-white px-2 py-0.5 rounded-md self-start">Cliente Regional</span>
                  <p className="text-xs font-bold text-center text-emerald-100">Comercio de Salud Integrativa</p>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 absolute top-3 right-3"></div>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2 border-t border-emerald-700">
                <button className="bg-emerald-700 hover:bg-emerald-600 text-xs px-3 py-1.5 rounded-xl text-white font-semibold">Micrófono</button>
                <button className="bg-emerald-700 hover:bg-emerald-600 text-xs px-3 py-1.5 rounded-xl text-white font-semibold">Cámara</button>
                <button className="bg-[#FF8894] hover:bg-[#D85260] text-xs px-4 py-1.5 rounded-xl text-white font-bold">Presentar Productos</button>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-5 border-l border-[#C8D8CE] flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="border-b border-[#C8D8CE] pb-2">
                  <h5 className="font-bold text-xs text-[#1B4D3E]">Adjuntar Petición Vitrina LAWENMOLL</h5>
                  <p className="text-[10px] text-gray-500">Archivos PDF con productos o servicios</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-[#C8D8CE] flex justify-between items-center">
                    <div>
                      <p className="font-bold text-[11px] text-[#1B4D3E]">Peticion_Vitrina_LAWENMOLL.pdf</p>
                      <span className="text-[9px] text-gray-500">Recibido del cliente</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#D85260] cursor-pointer hover:underline">Revisar</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-[#FF8894] text-center space-y-1">
                <p className="text-[11px] font-bold text-[#1B4D3E]">Cliente: Subir PDF de Petición</p>
                <p className="text-[9px] text-gray-500">Sin viajes físicos desde tu región</p>
                <button className="bg-[#FAF8F5] text-[#D85260] text-[10px] font-bold px-3 py-1 rounded-lg border border-[#FF8894] hover:bg-[#FFF0F2] transition mt-1">
                  Cargar Archivo PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "fichas" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-[#D85260] uppercase tracking-wider block">Ciberseguridad</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Fichas Encriptadas</h3>
              <p className="text-xs text-gray-600">Registro protegido bajo estándares de la Ley N° 21.663.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Atención Profesional</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Red de Terapeutas</h3>
              <p className="text-xs text-gray-600">Modelo de vinculación con profesionales de medicina integrativa.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Seguimiento</span>
              <h3 className="font-bold text-sm text-[#1B4D3E]">Historial de Hábitos</h3>
              <p className="text-xs text-gray-600">Evolución de marcadores de calidad de vida sin sobrecarga cognitiva.</p>
            </div>
          </div>
        )}

        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4 text-center shadow-xs">
          <h3 className="text-sm font-bold text-[#1B4D3E]">Canales para Agendar Reuniones B2B — LAWENMOLL</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Coordinación Virtual</span>
              <p className="text-gray-600">+56 9 6543 2109</p>
            </div>
            <div className="p-4 bg-[#FFF0F2] rounded-2xl border border-[#FF8894]">
              <span className="font-bold text-[#D85260] block mb-1">Correo Institucional</span>
              <p className="text-gray-600">contacto@lawenmoll.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Reuniones B2B</span>
              <p className="text-gray-600">ASL Ideas SpA &amp; Clientes B2B</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} LAWENMOLL - ASL Ideas SpA | Muestra Tecnológica B2B en Construcción.</p>
      </footer>
    </main>
  );
}
