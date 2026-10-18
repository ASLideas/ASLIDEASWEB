'use client';

import React from "react";
import Link from "next/link";

export default function HomePage() {
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
            <span>Atención Municipalidades, PYMES e Instituciones: Muestra de Software Inclusivo</span>
          </div>
          <a
            href="mailto:contacto@aslideas.cl"
            className="bg-[#1B4D3E] text-white text-[11px] px-3.5 py-1.5 rounded-lg font-bold hover:bg-[#2D6A4F] transition"
          >
            Solicitar Demostración Virtual
          </a>
        </div>
      </div>

      {/* Hero Section / Reseña Fundacional */}
      <section className="bg-white border-b border-[#C8D8CE] py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Salud Digital Integrativa
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Cumplimiento Ley TEA &amp; Ciberseguridad
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#1B4D3E] leading-tight">
            Tecnología Humana y Amable Diseñada para Reducir el Estrés Cognitivo
          </h2>
          <p className="text-sm text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Ecosistema de soluciones digitales desarrolladas bajo principios de baja carga sensorial, ideal para personas con neurodivergencias, condiciones crónicas y equipos de trabajo.
          </p>

          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-4 shadow-xs">
            <div className="border-l-4 border-[#FF8894] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">Reseña Fundacional</h3>
              <p className="text-xs text-gray-700 leading-relaxed mt-1">
                ASL Ideas SpA es fundada por una Diseñadora Gráfica con neurodivergencia (TEA Grado 1 y TDAH) y condiciones crónicas de salud. Su vivencia directa impulsa la creación de software amable que elimina la frustración, la sobrecarga sensorial y la fricción tecnológica.
              </p>
            </div>
            <div className="border-l-4 border-[#2D6A4F] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">Beneficios Estratégicos</h3>
              <ul className="text-xs text-gray-700 space-y-1.5 mt-1 list-disc list-inside">
                <li><strong>Accesibilidad Sensorial:</strong> Sin luces ni contrastes estridentes (#FAF8F5, #1B4D3E, #FF8894).</li>
                <li><strong>Muestra B2B de Software:</strong> Demostraciones listas para licencias institucionales.</li>
                <li><strong>Agendamiento B2B Directo:</strong> Coordinación fluida de reuniones de presentación.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Muestras de Aplicaciones */}
      <section className="max-w-6xl mx-auto px-6 py-10 w-full space-y-8">
        <h3 className="text-xs font-bold text-[#1B4D3E] text-center uppercase tracking-wider">
          Portales Demostrativos y Agendamiento de Reuniones B2B
        </h3>
        <div className="grid md:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-3xl border border-[#FF8894] space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#FF8894] p-0.5 overflow-hidden bg-white">
                  <img src="/LOGO_asl.png" alt="Logo ASL Ideas" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#D85260] uppercase tracking-wider block">Casa Matriz</span>
                  <h4 className="font-bold text-sm text-[#1B4D3E]">ASL Ideas SpA</h4>
                </div>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Desarrollo de software a medida, licencias B2B y consultoría en accesibilidad UI/UX.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="mailto:contacto@aslideas.cl"
                className="block text-center bg-[#FF8894] text-white text-[11px] py-2.5 rounded-xl font-bold hover:bg-[#D85260] transition"
              >
                Agendar Reunión B2B
              </a>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#C8D8CE] p-0.5 overflow-hidden bg-white">
                  <img src="/lawenmoll_logo.jpg" alt="Logo LAWENMOLL" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Muestra Clínica</span>
                  <h4 className="font-bold text-sm text-[#1B4D3E]">LAWENMOLL</h4>
                </div>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Test de Bienestar Inteligente y demostración de fichas protegidas bajo Ley N° 21.663.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/lawenmoll"
                className="block text-center bg-[#1B4D3E] text-white text-[11px] py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F] transition"
              >
                Agendar Demostración
              </Link>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#C8D8CE] p-0.5 overflow-hidden bg-white">
                  <img src="/logo_wellness.jpg" alt="Logo Wellness" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Apoyo Visual</span>
                  <h4 className="font-bold text-sm text-[#1B4D3E]">Wellness Web App</h4>
                </div>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Salas virtuales interactivas y movimiento adaptado sin impacto para pausas activas.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/wellness"
                className="block text-center bg-[#1B4D3E] text-white text-[11px] py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F] transition"
              >
                Agendar Sesión Virtual
              </Link>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#FF8894] space-y-4 flex flex-col justify-between shadow-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#FF8894] p-0.5 overflow-hidden bg-white">
                  <img src="/LOGO_BIENESTAR.png" alt="Logo Bienestar" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#D85260] uppercase tracking-wider block">Mensajería Red</span>
                  <h4 className="font-bold text-sm text-[#1B4D3E]">Bienestar App</h4>
                </div>
              </div>
              <p className="text-[11px] text-gray-600 leading-relaxed">
                Red de mensajería propia, videollamadas directas, monitoreo de hábitos y descanso Morfeo.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/comunidad"
                className="block text-center bg-[#FF8894] text-white text-[11px] py-2.5 rounded-xl font-bold hover:bg-[#D85260] transition"
              >
                Agendar Demo Videollamada
              </Link>
            </div>
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
              <p className="text-gray-600">ASL Ideas SpA &amp; Clientes B2B</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} ASL Ideas SpA | Estrategia de Salud Digital Inclusiva. Muestra Tecnológica B2B.</p>
      </footer>
    </main>
  );
}
