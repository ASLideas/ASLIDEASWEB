'use client';

import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#2C4A3E] font-sans flex flex-col justify-between">
      {/* Header Institucional */}
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF8894] bg-white p-0.5 shadow-xs">
              <img src="/LOGO_asl.png" alt="Logo ASL Ideas SpA" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#2C4A3E]">ASL Ideas SpA</h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#FFF0F2] text-[#D85260] border border-[#FF8894]">
                  Muestra Tecnológica B2B
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#E8F0EC] text-[#52796F] border border-[#84A59D]">
                  App en Construcción
                </span>
              </div>
              <p className="text-xs text-[#52796F] font-medium">Estrategia de Salud Digital Inclusiva y Accesibilidad UI/UX</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <Link href="/lawenmoll" className="text-[#2C4A3E] hover:text-[#D85260] transition">LAWENMOLL</Link>
            <Link href="/wellness" className="text-[#2C4A3E] hover:text-[#D85260] transition">Wellness</Link>
            <Link href="/comunidad" className="text-[#2C4A3E] hover:text-[#D85260] transition">Bienestar</Link>
            <a
              href="mailto:contacto@aslideas.cl"
              className="bg-[#FF8894] text-white px-4 py-2.5 rounded-xl font-bold hover:bg-[#D85260] transition shadow-md"
            >
              Agendar Reunión B2B
            </a>
          </div>
        </div>
      </header>

      {/* Banner de Aviso */}
      <div className="bg-[#FFF0F2] border-b border-[#FF8894] py-2.5 px-6 text-center text-xs font-semibold text-[#2C4A3E]">
        Plataformas demostrativas. Haz clic en cada aplicación para desplegar su Sala Virtual interna y cargar peticiones en PDF.
      </div>

      {/* Hero Principal */}
      <section className="bg-white border-b border-[#C8D8CE] py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#52796F] border border-[#84A59D] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Soluciones Accesibles para PYMES
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Atención Remota Regional
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2C4A3E] leading-tight max-w-3xl mx-auto">
            Desarrollamos Soluciones Accesibles e Inclusivas para PYMES y Comercios Asociados
          </h2>

          <p className="text-xs md:text-sm text-gray-700 max-w-3xl mx-auto leading-relaxed bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE] shadow-xs">
            En <strong>ASL Ideas SpA</strong> creamos software, licencias tecnológicas y aplicaciones web diseñadas de forma amable, eliminando la sobrecarga sensorial y conectando la ciencia metabólica con la sabiduría integrativa.
          </p>

          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-2 text-xs shadow-xs">
            <h3 className="font-bold text-[#2C4A3E] uppercase tracking-wider">Atención Remota Regional Sin Traslados Físicos</h3>
            <p className="text-gray-700 leading-relaxed">
              Para evitar viajes presenciales costosos a regiones lejanas, cada una de nuestras aplicaciones aloja internamente una <strong>Sala Virtual Desplegable</strong>. Desde allí, los clientes cargan sus solicitudes en PDF y requerimientos para su Vitrina Virtual.
            </p>
          </div>
        </div>
      </section>

      {/* Tarjetas de Aplicaciones */}
      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-6">
        <h3 className="text-xs font-bold text-[#2C4A3E] text-center uppercase tracking-wider">
          Muestra de Aplicaciones — Espacios en Construcción y Salas Virtuales
        </h3>

        <div className="grid md:grid-cols-4 gap-5">
          {/* 1. Casa Matriz */}
          <div className="bg-white p-5 rounded-3xl border border-[#FF8894] space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#FF8894] p-0.5 overflow-hidden bg-white">
                  <img src="/LOGO_asl.png" alt="Logo ASL Ideas" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#D85260] uppercase tracking-wider block">Casa Matriz</span>
                  <h4 className="font-bold text-sm text-[#2C4A3E]">ASL Ideas SpA</h4>
                </div>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Software a medida, licencias B2B y consultoría en accesibilidad UI/UX para neurodivergencias.
              </p>
            </div>
            <a
              href="mailto:contacto@aslideas.cl"
              className="block text-center bg-[#FF8894] text-white text-[11px] py-2.5 rounded-xl font-bold hover:bg-[#D85260] transition"
            >
              Agendar Reunión B2B
            </a>
          </div>

          {/* 2. LAWENMOLL */}
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#C8D8CE] p-0.5 overflow-hidden bg-white">
                  <img src="/lawenmoll_logo.jpg" alt="Logo LAWENMOLL" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider block">App en Construcción</span>
                  <h4 className="font-bold text-sm text-[#2C4A3E]">LAWENMOLL</h4>
                </div>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Test de bienestar integrativo, fichas protegidas y sala virtual desplegable para peticiones PDF.
              </p>
            </div>
            <Link
              href="/lawenmoll"
              className="block text-center bg-[#52796F] text-white text-[11px] py-2.5 rounded-xl font-bold hover:bg-[#3A5A40] transition"
            >
              Ver Sala Virtual LAWENMOLL
            </Link>
          </div>

          {/* 3. Wellness */}
          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#C8D8CE] p-0.5 overflow-hidden bg-white">
                  <img src="/logo_wellness.jpg" alt="Logo Wellness" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider block">App en Construcción</span>
                  <h4 className="font-bold text-sm text-[#2C4A3E]">Wellness Web App</h4>
                </div>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Movimiento adaptado sin impacto, pausas activas y sala desplegable para clases en vivo.
              </p>
            </div>
            <Link
              href="/wellness"
              className="block text-center bg-[#52796F] text-white text-[11px] py-2.5 rounded-xl font-bold hover:bg-[#3A5A40] transition"
            >
              Ver Sala Virtual Wellness
            </Link>
          </div>

          {/* 4. Bienestar App */}
          <div className="bg-white p-5 rounded-3xl border border-[#FF8894] space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#FF8894] p-0.5 overflow-hidden bg-white">
                  <img src="/LOGO_BIENESTAR.png" alt="Logo Bienestar" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#D85260] uppercase tracking-wider block">App en Construcción</span>
                  <h4 className="font-bold text-sm text-[#2C4A3E]">Bienestar App</h4>
                </div>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Red de mensajería propia, Módulo Morfeo y sala virtual desplegable para PYMES.
              </p>
            </div>
            <Link
              href="/comunidad"
              className="block text-center bg-[#FF8894] text-white text-[11px] py-2.5 rounded-xl font-bold hover:bg-[#D85260] transition"
            >
              Ver Sala Virtual Bienestar
            </Link>
          </div>
        </div>

        {/* Canales Directos B2B */}
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4 text-center shadow-xs">
          <h3 className="text-sm font-bold text-[#2C4A3E]">Canales Directos para Agendar Reuniones B2B — ASL Ideas SpA</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2C4A3E] block mb-1">Coordinación Virtual</span>
              <p className="text-gray-600">+56 9 6543 2109</p>
            </div>
            <div className="p-4 bg-[#FFF0F2] rounded-2xl border border-[#FF8894]">
              <span className="font-bold text-[#D85260] block mb-1">Correo Institucional</span>
              <p className="text-gray-600">contacto@aslideas.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2C4A3E] block mb-1">Reuniones Corporativas</span>
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
