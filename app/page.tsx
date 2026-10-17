'use client';

import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      {/* Encabezado Principal */}
      <header className="bg-white sticky top-0 z-50 border-b border-[#C8D8CE] py-4 px-6 md:px-12 shadow-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-[#C8D8CE] p-0.5 flex items-center justify-center">
              <img src="/LOGO asl.png" alt="Logo ASL Ideas SpA" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-bold text-[#1B4D3E] tracking-tight">ASL Ideas SpA</h1>
              <p className="text-[11px] text-[#B08D4B] font-semibold uppercase tracking-wider">
                Salud Digital Inclusiva & Bienestar Integrativo
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#1B4D3E]">
            <a href="#mision-vision" className="hover:text-[#B08D4B] transition">Misión y Visión</a>
            <a href="#servicios-pymes" className="hover:text-[#B08D4B] transition">Servicios PYMES</a>
            <a href="#portales" className="hover:text-[#B08D4B] transition">Portales y Citas</a>
          </nav>

          <a
            href="#portales"
            className="bg-[#2D6A4F] text-white text-xs px-5 py-2.5 rounded-xl font-bold hover:bg-[#1B4D3E] transition shadow-xs"
          >
            Agendar Cita
          </a>
        </div>
      </header>

      {/* Hero Principal (Foto 1) */}
      <section className="max-w-5xl mx-auto text-center px-6 pt-12 pb-8 space-y-5">
        <div className="inline-flex items-center bg-[#FCEFEB] border border-[#E07A5F]/30 text-[#E07A5F] text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
          Accesibilidad Cognitiva & Baja Carga Sensorial (TEA & TDAH)
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4D3E] leading-tight">
          Desarrollamos Soluciones Accesibles e Inclusivas para PYMES y Comercios Asociados
        </h2>

        <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed">
          En ASL Ideas SpA creamos software, licencias tecnológicas y aplicaciones web diseñadas de forma amable, eliminando la sobrecarga sensorial y conectando la ciencia metabólica con la sabiduría integrativa.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <a
            href="#servicios-pymes"
            className="bg-[#2D6A4F] text-white text-xs px-6 py-3 rounded-xl font-bold hover:bg-[#1B4D3E] transition shadow-xs"
          >
            Soluciones B2B para PYMES
          </a>
          <a
            href="#portales"
            className="bg-white border border-[#C8D8CE] text-[#1B4D3E] text-xs px-6 py-3 rounded-xl font-bold hover:bg-[#E8F0EC] transition"
          >
            Agendar Reunión Virtual
          </a>
        </div>
      </section>

      {/* Misión y Visión (Foto 2) */}
      <section id="mision-vision" className="max-w-6xl mx-auto px-6 py-8 w-full">
        <div className="bg-white rounded-3xl p-8 border border-[#C8D8CE] shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="text-2xl font-bold text-[#1B4D3E]">Nuestra Misión y Visión</h3>
            <p className="text-xs text-gray-500">Fundamentos estratégicos de innovación tecnológica e inclusión humana</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#C8D8CE] space-y-3">
              <span className="text-xs font-bold text-[#E07A5F] uppercase tracking-wider block">VISIÓN</span>
              <h4 className="text-lg font-bold text-[#1B4D3E]">Nuestra Visión</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Liderar la transformación de la salud digital integrativa y la accesibilidad tecnológica en Latinoamérica, posicionando a ASL Ideas SpA como el referente en ecosistemas digitales diseñados por y para personas con neurodivergencias y condiciones crónicas de salud.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#C8D8CE] space-y-3">
              <span className="text-xs font-bold text-[#E07A5F] uppercase tracking-wider block">MISIÓN</span>
              <h4 className="text-lg font-bold text-[#1B4D3E]">Nuestra Misión</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Diseñar, desarrollar y escalar soluciones tecnológicas amables —como LAWENMOLL y Wellness Web App— que unifiquen la evaluación metabólica inteligente, la medicina integrativa, el movimiento adaptado sin impacto y la sabiduría ancestral. Buscamos eliminar la frustración y la sobrecarga sensorial, empoderando a los usuarios en la gestión autónoma de su bienestar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios B2B (Foto 3) */}
      <section id="servicios-pymes" className="max-w-6xl mx-auto px-6 py-8 w-full">
        <div className="bg-white rounded-3xl p-8 border border-[#C8D8CE] shadow-xs space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-[#E07A5F] uppercase tracking-wider block">LIDERAZGO & INNOVACIÓN B2B</span>
            <h3 className="text-2xl font-bold text-[#1B4D3E]">Servicios a PYMES y Comercios Asociados</h3>
            <p className="text-xs text-gray-600">
              Acompañamos a pequeñas y medianas empresas, comercios e instituciones de salud en la incorporación de estándares de accesibilidad digital y software a medida.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-2">
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#C8D8CE] space-y-3">
              <h4 className="text-base font-bold text-[#1B4D3E]">Desarrollo de Software A Medida</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Plataformas ligeras y amables adaptadas a los requerimientos operativos de comercios y pymes asociadas.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#C8D8CE] space-y-3">
              <h4 className="text-base font-bold text-[#1B4D3E]">Consultoría UI/UX Inclusiva</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Auditoría y diseño de interfaces optimizadas para baja sobrecarga cognitiva (cumplimiento Ley TEA y estándares WCAG).
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#C8D8CE] space-y-3">
              <h4 className="text-base font-bold text-[#1B4D3E]">Licencias y Convenios B2B</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Integración de módulos de salud, pausa activa y fichas clínicas encriptadas bajo la Ley N° 21.663 para colaboradores y clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portales Interactivos (Foto 4) */}
      <section id="portales" className="max-w-7xl mx-auto px-6 py-8 w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Casa Matriz B2B */}
          <div className="bg-white rounded-2xl p-6 border border-[#C8D8CE] shadow-xs flex flex-col justify-between space-y-4 text-center items-center">
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white border border-[#C8D8CE] p-1 flex items-center justify-center">
                <img src="/LOGO asl.png" alt="Casa Matriz B2B" className="w-full h-full object-contain" />
              </div>
              <h4 className="text-lg font-bold text-[#1B4D3E]">Casa Matriz B2B</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Gestión corporativa, convenios institucionales, licencias tecnológicas y consultoría UI/UX.
              </p>
            </div>
            <div className="w-full space-y-2 pt-2 border-t border-gray-100">
              <Link href="/admin" className="block w-full bg-[#2D6A4F] text-white text-xs py-2.5 rounded-xl font-bold hover:bg-[#1B4D3E] transition">
                Agendar Reunión B2B
              </Link>
              <Link href="/admin" className="block text-xs text-gray-500 hover:underline pt-1">
                Explorar Portal &rarr;
              </Link>
            </div>
          </div>

          {/* Card 2: LAWENMOLL */}
          <div className="bg-white rounded-2xl p-6 border border-[#C8D8CE] shadow-xs flex flex-col justify-between space-y-4 text-center items-center">
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white border border-[#C8D8CE] p-1 flex items-center justify-center">
                <img src="/lawenmoll_logo.png" alt="LAWENMOLL" className="w-full h-full object-contain" onError={(e)=>{e.currentTarget.src='/lawenmoll_logo.jpg'}} />
              </div>
              <h4 className="text-lg font-bold text-[#1B4D3E]">LAWENMOLL</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Salud Integrativa & Fichas Clínicas encriptadas (Ley N° 21.663). Test de Bienestar Inteligente.
              </p>
            </div>
            <div className="w-full space-y-2 pt-2 border-t border-gray-100">
              <Link href="/lawenmoll" className="block w-full bg-[#2D6A4F] text-white text-xs py-2.5 rounded-xl font-bold hover:bg-[#1B4D3E] transition">
                Reservar Cita Médica
              </Link>
              <Link href="/lawenmoll" className="block text-xs text-gray-500 hover:underline pt-1">
                Explorar Portal &rarr;
              </Link>
            </div>
          </div>

          {/* Card 3: Wellness Web App */}
          <div className="bg-white rounded-2xl p-6 border border-[#C8D8CE] shadow-xs flex flex-col justify-between space-y-4 text-center items-center">
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white border border-[#C8D8CE] p-1 flex items-center justify-center">
                <img src="/logo wellness.jpg" alt="Wellness Web App" className="w-full h-full object-contain" />
              </div>
              <h4 className="text-lg font-bold text-[#1B4D3E]">Wellness Web App</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Movimiento adaptado sin impacto, videoteca y Salas Virtuales (Lotus, Cielo, Bosque, Raíz).
              </p>
            </div>
            <div className="w-full space-y-2 pt-2 border-t border-gray-100">
              <Link href="/wellness" className="block w-full bg-[#2D6A4F] text-white text-xs py-2.5 rounded-xl font-bold hover:bg-[#1B4D3E] transition">
                Agendar Sala Virtual
              </Link>
              <Link href="/wellness" className="block text-xs text-gray-500 hover:underline pt-1">
                Explorar Portal &rarr;
              </Link>
            </div>
          </div>

          {/* Card 4: Bienestar */}
          <div className="bg-white rounded-2xl p-6 border border-[#C8D8CE] shadow-xs flex flex-col justify-between space-y-4 text-center items-center">
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white border border-[#C8D8CE] p-1 flex items-center justify-center">
                <img src="/LOGO BIENESTAR.png" alt="Bienestar" className="w-full h-full object-contain" />
              </div>
              <h4 className="text-lg font-bold text-[#1B4D3E]">Bienestar</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Fitoterapia nativa, comunidad activa, Diario Mural y recetarios herbolarios descargables en PDF.
              </p>
            </div>
            <div className="w-full space-y-2 pt-2 border-t border-gray-100">
              <Link href="/comunidad" className="block w-full bg-[#2D6A4F] text-white text-xs py-2.5 rounded-xl font-bold hover:bg-[#1B4D3E] transition">
                Agendar Taller Herbolario
              </Link>
              <Link href="/comunidad" className="block text-xs text-gray-500 hover:underline pt-1">
                Explorar Portal &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pie de Página */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} ASL Ideas SpA. Todos los derechos reservados. | Diseñado con Accesibilidad Sensorial.</p>
      </footer>
    </main>
  );
}
