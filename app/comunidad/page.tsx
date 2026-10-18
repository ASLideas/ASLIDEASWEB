'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [activeFileTab, setActiveFileTab] = useState("contratos");

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      {/* Header Institucional Unificado */}
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF8894] bg-white p-0.5 shadow-xs">
              <img src="/LOGO_asl.png" alt="Logo ASL Ideas SpA" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#1B4D3E]">ASL Ideas SpA</h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#FFF0F2] text-[#D85260] border border-[#FF8894]">
                  Muestra Tecnológica B2B
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE]">
                  App en Construcción
                </span>
              </div>
              <p className="text-xs text-emerald-800 font-medium">Estrategia de Salud Digital Inclusiva y Accesibilidad UI/UX</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/lawenmoll" className="text-[#1B4D3E] hover:text-[#D85260] transition">LAWENMOLL</Link>
            <Link href="/wellness" className="text-[#1B4D3E] hover:text-[#D85260] transition">Wellness</Link>
            <Link href="/comunidad" className="text-[#1B4D3E] hover:text-[#D85260] transition">Bienestar</Link>
            <a
              href="mailto:contacto@aslideas.cl"
              className="bg-[#FF8894] text-white px-4 py-2.5 rounded-xl font-bold hover:bg-[#D85260] transition shadow-md"
            >
              Agendar Reunión B2B
            </a>
          </div>
        </div>
      </header>

      {/* Banner de Llamado de Atención B2B */}
      <div className="bg-[#FFF0F2] border-b border-[#FF8894] py-3 px-6 text-center shadow-xs">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#D85260] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF8894] animate-pulse"></span>
            <span>Módulo de Videollamadas Grupales e Intercambio de Contratos Activado para PYMES</span>
          </div>
          <a
            href="mailto:contacto@aslideas.cl"
            className="bg-[#1B4D3E] text-white text-[11px] px-3.5 py-1.5 rounded-lg font-bold hover:bg-[#2D6A4F] transition"
          >
            Solicitar Demostración Virtual
          </a>
        </div>
      </div>

      {/* Hero Principal con Texto Institucional Solicitado */}
      <section className="bg-white border-b border-[#C8D8CE] py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Soluciones para PYMES y Comercios
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Ciencia Metabólica &amp; Sabiduría Integrativa
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1B4D3E] leading-tight max-w-3xl mx-auto">
            Desarrollamos Soluciones Accesibles e Inclusivas para PYMES y Comercios Asociados
          </h2>

          <p className="text-xs md:text-sm text-gray-700 max-w-3xl mx-auto leading-relaxed bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE]">
            En <strong>ASL Ideas SpA</strong> creamos software, licencias tecnológicas y aplicaciones web diseñadas de forma amable, eliminando la sobrecarga sensorial y conectando la ciencia metabólica con la sabiduría integrativa.
          </p>
        </div>
      </section>

      {/* Módulo de Videollamada Multipersona y Panel Lateral de Archivos B2B */}
      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold text-[#D85260] uppercase tracking-wider block">Demostración de Interfaz B2B</span>
          <h3 className="text-xl font-bold text-[#1B4D3E]">
            Sala Virtual de Videollamada Multi-Usuario con Gestor de Documentos
          </h3>
          <p className="text-xs text-gray-600 max-w-2xl mx-auto">
            Plataforma para reuniones grupales entre PYMES, comercios asociados y clientes, con panel lateral interactivo para enviar y recibir contratos, fichas técnicas y especificaciones en tiempo real.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-[#FF8894] overflow-hidden shadow-sm grid md:grid-cols-3 min-h-[420px]">
          {/* Panel Principal: Videollamada Grupales (2 Col de 3) */}
          <div className="md:col-span-2 bg-[#1B4D3E] p-6 text-white flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-emerald-700 pb-3">
              <div>
                <h4 className="font-bold text-sm text-white">Sala de Reunión B2B — ASL Ideas SpA</h4>
                <p className="text-[10px] text-emerald-200">Participantes Activos: 4 Personas (Conexión Encriptada HD)</p>
              </div>
              <span className="text-[10px] bg-[#FF8894] text-white px-2.5 py-1 rounded-full font-bold">En Vivo</span>
            </div>

            {/* Mosaico de Participantes (Multi-Persona) */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="bg-[#2D6A4F] rounded-2xl p-4 border border-emerald-600 flex flex-col justify-between h-32 relative">
                <span className="text-[10px] bg-black/40 text-white px-2 py-0.5 rounded-md self-start">Coordinador ASL Ideas</span>
                <p className="text-xs font-bold text-center text-emerald-100">Cámara Principal HD</p>
                <div className="w-2 h-2 rounded-full bg-emerald-400 absolute top-3 right-3"></div>
              </div>
              <div className="bg-[#2D6A4F] rounded-2xl p-4 border border-emerald-600 flex flex-col justify-between h-32 relative">
                <span className="text-[10px] bg-black/40 text-white px-2 py-0.5 rounded-md self-start">Cliente PYME 1</span>
                <p className="text-xs font-bold text-center text-emerald-100">Representante Comercial</p>
                <div className="w-2 h-2 rounded-full bg-emerald-400 absolute top-3 right-3"></div>
              </div>
              <div className="bg-[#2D6A4F] rounded-2xl p-4 border border-emerald-600 flex flex-col justify-between h-32 relative">
                <span className="text-[10px] bg-black/40 text-white px-2 py-0.5 rounded-md self-start">Comercio Asociado 2</span>
                <p className="text-xs font-bold text-center text-emerald-100">Encargado de Licencias</p>
                <div className="w-2 h-2 rounded-full bg-emerald-400 absolute top-3 right-3"></div>
              </div>
              <div className="bg-[#2D6A4F] rounded-2xl p-4 border border-emerald-600 flex flex-col justify-between h-32 relative">
                <span className="text-[10px] bg-black/40 text-white px-2 py-0.5 rounded-md self-start">Asesor Técnico</span>
                <p className="text-xs font-bold text-center text-emerald-100">Especialista Accesibilidad</p>
                <div className="w-2 h-2 rounded-full bg-emerald-400 absolute top-3 right-3"></div>
              </div>
            </div>

            {/* Barra de Controles de Videollamada */}
            <div className="flex justify-center gap-3 pt-2 border-t border-emerald-700">
              <button className="bg-emerald-700 hover:bg-emerald-600 text-xs px-3 py-1.5 rounded-xl text-white font-semibold">Micrófono</button>
              <button className="bg-emerald-700 hover:bg-emerald-600 text-xs px-3 py-1.5 rounded-xl text-white font-semibold">Cámara</button>
              <button className="bg-[#FF8894] hover:bg-[#D85260] text-xs px-4 py-1.5 rounded-xl text-white font-bold">Compartir Pantalla</button>
            </div>
          </div>

          {/* Panel Lateral: Adjuntar y Recibir Archivos B2B (1 Col de 3) */}
          <div className="bg-[#FAF8F5] p-5 border-l border-[#C8D8CE] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="border-b border-[#C8D8CE] pb-2">
                <h5 className="font-bold text-xs text-[#1B4D3E]">Panel Adjunto de Documentos</h5>
                <p className="text-[10px] text-gray-500">Envío y recepción directa durante la reunión</p>
              </div>

              <div className="flex gap-1 text-[10px] font-bold">
                <button
                  onClick={() => setActiveFileTab("contratos")}
                  className={activeFileTab === "contratos" ? "px-3 py-1 rounded-md bg-[#FF8894] text-white" : "px-3 py-1 rounded-md bg-white border border-[#C8D8CE] text-gray-600"}
                >
                  Contratos
                </button>
                <button
                  onClick={() => setActiveFileTab("especificaciones")}
                  className={activeFileTab === "especificaciones" ? "px-3 py-1 rounded-md bg-[#1B4D3E] text-white" : "px-3 py-1 rounded-md bg-white border border-[#C8D8CE] text-gray-600"}
                >
                  Especificaciones
                </button>
              </div>

              {activeFileTab === "contratos" && (
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-[#C8D8CE] flex justify-between items-center">
                    <div>
                      <p className="font-bold text-[11px] text-[#1B4D3E]">Contrato_Licencia_PYME.pdf</p>
                      <span className="text-[9px] text-gray-500">Recibido hace 2 min • 1.2 MB</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#D85260] cursor-pointer hover:underline">Descargar</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-[#C8D8CE] flex justify-between items-center">
                    <div>
                      <p className="font-bold text-[11px] text-[#1B4D3E]">Convenio_Comercio_Asociado.pdf</p>
                      <span className="text-[9px] text-gray-500">Listo para firma digital</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#D85260] cursor-pointer hover:underline">Ver</span>
                  </div>
                </div>
              )}

              {activeFileTab === "especificaciones" && (
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-[#C8D8CE] flex justify-between items-center">
                    <div>
                      <p className="font-bold text-[11px] text-[#1B4D3E]">Especificaciones_UI_UX.pdf</p>
                      <span className="text-[9px] text-gray-500">Requerimientos de Accesibilidad</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#2D6A4F] cursor-pointer hover:underline">Descargar</span>
                  </div>
                </div>
              )}
            </div>

            {/* Área de Carga / Dropzone */}
            <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-[#FF8894] text-center space-y-1">
              <p className="text-[11px] font-bold text-[#1B4D3E]">Adjuntar Archivo o Contrato</p>
              <p className="text-[9px] text-gray-500">Arrastra aquí PDFs, cotizaciones o especificaciones</p>
              <button className="bg-[#FAF8F5] text-[#D85260] text-[10px] font-bold px-3 py-1 rounded-lg border border-[#FF8894] hover:bg-[#FFF0F2] transition mt-1">
                Seleccionar Archivo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Muestras de Aplicaciones */}
      <section className="max-w-6xl mx-auto px-6 py-8 w-full space-y-6">
        <h3 className="text-xs font-bold text-[#1B4D3E] text-center uppercase tracking-wider">
          Portales Demostrativos e Integración B2B
        </h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-[#FF8894] space-y-3 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <img src="/LOGO_asl.png" alt="Logo ASL Ideas" className="w-8 h-8 object-contain rounded-full border border-[#FF8894]" />
                <h4 className="font-bold text-xs text-[#1B4D3E]">ASL Ideas SpA</h4>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">Software a medida y licencias tecnológicas para PYMES.</p>
            </div>
            <a href="mailto:contacto@aslideas.cl" className="block text-center bg-[#FF8894] text-white text-[11px] py-2 rounded-xl font-bold hover:bg-[#D85260] transition">
              Agendar Reunión B2B
            </a>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-3 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <img src="/lawenmoll_logo.jpg" alt="Logo LAWENMOLL" className="w-8 h-8 object-contain rounded-full border border-[#C8D8CE]" />
                <h4 className="font-bold text-xs text-[#1B4D3E]">LAWENMOLL</h4>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">Test de bienestar y fichas protegidas bajo Ley N° 21.663.</p>
            </div>
            <Link href="/lawenmoll" className="block text-center bg-[#1B4D3E] text-white text-[11px] py-2 rounded-xl font-bold hover:bg-[#2D6A4F] transition">
              Explorar Muestra
            </Link>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-3 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <img src="/logo_wellness.jpg" alt="Logo Wellness" className="w-8 h-8 object-contain rounded-full border border-[#C8D8CE]" />
                <h4 className="font-bold text-xs text-[#1B4D3E]">Wellness Web App</h4>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">Salas virtuales y pausas activas adaptadas sin impacto.</p>
            </div>
            <Link href="/wellness" className="block text-center bg-[#1B4D3E] text-white text-[11px] py-2 rounded-xl font-bold hover:bg-[#2D6A4F] transition">
              Explorar Muestra
            </Link>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#FF8894] space-y-3 flex flex-col justify-between shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <img src="/LOGO_BIENESTAR.png" alt="Logo Bienestar" className="w-8 h-8 object-contain rounded-full border border-[#FF8894]" />
                <h4 className="font-bold text-xs text-[#1B4D3E]">Bienestar App</h4>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">Mensajería, videollamadas directas y Módulo Morfeo.</p>
            </div>
            <Link href="/comunidad" className="block text-center bg-[#FF8894] text-white text-[11px] py-2 rounded-xl font-bold hover:bg-[#D85260] transition">
              Explorar Muestra
            </Link>
          </div>
        </div>

        {/* Canales Directos B2B */}
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4 text-center shadow-xs">
          <h3 className="text-sm font-bold text-[#1B4D3E]">Canales Directos para Agendar Reuniones B2B — ASL Ideas SpA</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Coordinación Virtual</span>
              <p className="text-gray-600">+56 9 6543 2109</p>
            </div>
            <div className="p-4 bg-[#FFF0F2] rounded-2xl border border-[#FF8894]">
              <span className="font-bold text-[#D85260] block mb-1">Correo Institucional</span>
              <p className="text-gray-600">contacto@aslideas.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#1B4D3E] block mb-1">Reuniones Corporativas</span>
              <p className="text-gray-600">ASL Ideas SpA &amp; PYMES Asociadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} ASL Ideas SpA | Soluciones Accesibles e Inclusivas para PYMES y Comercios Asociados.</p>
      </footer>
    </main>
  );
}
