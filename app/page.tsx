'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      {/* Encabezado Corporativo con Logo Oficial */}
      <header className="bg-white sticky top-0 z-50 border-b border-[#B08D4B]/20 py-4 px-6 md:px-12 shadow-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="ASL Ideas SpA Logo"
              className="h-10 w-auto object-contain"
            />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#1B4D3E]">
                ASL Ideas SpA
              </h1>
              <p className="text-xs text-[#B08D4B] font-semibold">
                Salud Digital Inclusiva & Bienestar Integrativo
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold text-[#52796F]">
            <a href="#mision-vision" className="hover:text-[#1B4D3E] transition">Misión y Visión</a>
            <a href="#pymes" className="hover:text-[#1B4D3E] transition">Servicios PYMES</a>
            <a href="#portales" className="hover:text-[#1B4D3E] transition">Portales</a>
            <a href="#videollamadas" className="hover:text-[#1B4D3E] transition">Salas Virtuales</a>
          </nav>

          <div className="flex items-center space-x-3">
            <a
              href="#contacto"
              className="bg-[#1B4D3E] text-white text-xs md:text-sm px-4 py-2 rounded-xl font-medium hover:bg-[#2D6A4F] transition shadow-xs"
            >
              Contacto B2B
            </a>
            <Link
              href="/admin"
              className="text-xs bg-[#FAF8F5] border border-[#84A59D]/40 px-3 py-2 rounded-xl hover:bg-[#84A59D]/10 text-[#1B4D3E] font-medium"
            >
              Acceso Privado
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Principal con Llamado de Atención para PYMEs y Comercios */}
      <section className="max-w-5xl mx-auto text-center px-6 pt-14 pb-10 space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#B08D4B]/10 border border-[#B08D4B]/30 text-[#B08D4B] text-xs font-semibold px-4 py-1.5 rounded-full">
          <span>Accesibilidad Cognitiva & Baja Carga Sensorial (TEA & TDAH)</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4D3E] leading-tight">
          Desarrollamos Soluciones Accesibles e Inclusivas para PYMES y Comercios Asociados
        </h2>

        <p className="text-base md:text-lg text-[#52796F] max-w-3xl mx-auto leading-relaxed">
          En ASL Ideas SpA creamos software, licencias tecnológicas y aplicaciones web diseñadas de forma amable, eliminando la sobrecarga sensorial y conectando la ciencia metabólica con la sabiduría integrativa.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pymes"
            className="w-full sm:w-auto bg-[#1B4D3E] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#2D6A4F] transition shadow-sm"
          >
            Soluciones B2B para PYMES
          </a>
          <a
            href="#videollamadas"
            className="w-full sm:w-auto bg-white border border-[#B08D4B]/40 text-[#1B4D3E] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#FAF8F5] transition shadow-sm"
          >
            Entrar a Sala Virtual
          </a>
        </div>
      </section>

      {/* Sección Misión y Visión */}
      <section id="mision-vision" className="max-w-6xl mx-auto px-6 py-12 border-t border-[#84A59D]/20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#1B4D3E]">Nuestra Misión y Visión</h2>
          <p className="text-xs text-[#52796F] mt-1">Fundamentos estratégicos de innovación tecnológica e inclusión humana</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-[#B08D4B]/20 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#1B4D3E]/10 flex items-center justify-center text-[#1B4D3E] font-bold text-sm mb-4">
              VISIÓN
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E] mb-3">Nuestra Visión</h3>
            <p className="text-sm text-[#52796F] leading-relaxed">
              Liderar la transformación de la salud digital integrativa y la accesibilidad tecnológica en Latinoamérica, posicionando a ASL Ideas SpA como el referente en ecosistemas digitales diseñados por y para personas con neurodivergencias y condiciones crónicas de salud.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#B08D4B]/20 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F] font-bold text-sm mb-4">
              MISIÓN
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E] mb-3">Nuestra Misión</h3>
            <p className="text-sm text-[#52796F] leading-relaxed">
              Diseñar, desarrollar y escalar soluciones tecnológicas amables —como LAWENMOLL y Wellness Web App— que unifiquen la evaluación metabólica inteligente, la medicina integrativa, el movimiento adaptado sin impacto y la sabiduría ancestral. Buscamos eliminar la frustración y la sobrecarga sensorial, empoderando a los usuarios en la gestión autónoma de su bienestar.
            </p>
          </div>
        </div>
      </section>

      {/* Sección Servicios para PYMEs y Comercios Asociados */}
      <section id="pymes" className="bg-white border-y border-[#84A59D]/20 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#B08D4B] uppercase tracking-wider">Liderazgo & Innovación B2B</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B4D3E] mt-2">Servicios a PYMES y Comercios Asociados</h2>
            <p className="text-sm text-[#52796F] max-w-2xl mx-auto mt-2">
              Acompañamos a pequeñas y medianas empresas, comercios e instituciones de salud en la incorporación de estándares de accesibilidad digital y software a medida.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#84A59D]/30">
              <h3 className="font-bold text-[#1B4D3E] mb-2">Desarrollo de Software A Medida</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Plataformas ligeras y amables adaptadas a los requerimientos operativos de comercios y pymes asociadas.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#84A59D]/30">
              <h3 className="font-bold text-[#1B4D3E] mb-2">Consultoría UI/UX Inclusiva</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Auditoría y diseño de interfaces optimizadas para baja sobrecarga cognitiva (cumplimiento Ley TEA y estándares WCAG).
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#84A59D]/30">
              <h3 className="font-bold text-[#1B4D3E] mb-2">Licencias y Convenios B2B</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Integración de módulos de salud, pausa activa y fichas clínicas encriptadas bajo la Ley N° 21.663 para colaboradores y clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosistema de los 4 Portales Interactivos con sus Logos Oficiales */}
      <section id="portales" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B4D3E]">Ecosistema de Portales Interactivos</h2>
          <p className="text-xs text-[#52796F] mt-2">Acceso directo a las áreas especializadas de nuestra plataforma</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Portal 1: Casa Matriz */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-[#FAF8F5] border border-[#84A59D]/30 flex items-center justify-center p-2">
                <img src="/logo.png" alt="Logo ASL Ideas" className="max-h-full max-w-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E]">Casa Matriz B2B</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Gestión corporativa, convenios institucionales, licencias tecnológicas y consultoría UI/UX adaptada para neurodivergencias.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <Link href="/aslideas" className="text-xs font-semibold text-[#B08D4B] hover:underline">
                Ver Soluciones B2B &rarr;
              </Link>
            </div>
          </div>

          {/* Portal 2: LAWENMOLL */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-[#FAF8F5] border border-[#84A59D]/30 flex items-center justify-center p-2">
                <img src="/lawenmoll_logo.jpg" alt="Logo LAWENMOLL" className="max-h-full max-w-full object-contain rounded-lg" />
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E]">LAWENMOLL</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Salud Integrativa & Fichas Clínicas encriptadas (Ley N° 21.663). Test de Bienestar Inteligente, evaluación metabólica y agenda.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <Link href="/lawenmoll" className="text-xs font-semibold text-[#B08D4B] hover:underline">
                Ingresar a Portal &rarr;
              </Link>
            </div>
          </div>

          {/* Portal 3: Wellness Web App */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-[#FAF8F5] border border-[#84A59D]/30 flex items-center justify-center p-2">
                <img src="/logo_wellness.jpg" alt="Logo Wellness" className="max-h-full max-w-full object-contain rounded-lg" />
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E]">Wellness Web App</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Movimiento adaptado sin impacto, videoteca interactiva y Salas Virtuales temáticas (Lotus, Cielo, Bosque, Raíz) para reducción de cortisol.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <Link href="/wellness" className="text-xs font-semibold text-[#B08D4B] hover:underline">
                Explorar Rutinas &rarr;
              </Link>
            </div>
          </div>

          {/* Portal 4: Sabiduría Ancestral */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-xl bg-[#FAF8F5] border border-[#84A59D]/30 flex items-center justify-center p-2">
                <img src="/LOGO_BIENESTAR.png" alt="Logo Bienestar Ancestral" className="max-h-full max-w-full object-contain rounded-lg" />
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E]">Sabiduría Ancestral</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Fitoterapia nativa, comunidad activa, Diario Mural "Secretos de la Abuela" y recetarios herbolarios descargables en PDF.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <Link href="/bienestar" className="text-xs font-semibold text-[#B08D4B] hover:underline">
                Ver Recetarios &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Control de Salas Virtuales */}
      <section id="videollamadas" className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white p-8 rounded-2xl border border-[#84A59D]/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-[#B08D4B] uppercase tracking-wider">Interacción & Pausa Activa</span>
            <h3 className="text-xl font-bold text-[#1B4D3E] mt-1">Salas Virtuales en Vivo</h3>
            <p className="text-xs text-[#52796F] mt-1">Acceso directo a las transmisiones de ejercicios suaves y talleres comunitarios sin enlaces complejos.</p>
          </div>
          <button className="w-full md:w-auto bg-[#1B4D3E] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#2D6A4F] transition whitespace-nowrap">
            Entrar a Sala Lotus
          </button>
        </div>
      </section>

      {/* Pie de Página */}
      <footer id="contacto" className="bg-[#1B4D3E] text-[#FAF8F5] py-12 px-6 mt-12 border-t border-[#84A59D]/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-base mb-2">ASL Ideas SpA</h4>
            <p className="text-xs text-[#84A59D] leading-relaxed">
              Plataforma de Salud Digital Inclusiva. Innovación tecnológica amable y accesible, diseñada para transformar el autocuidado y elevar la calidad de vida.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3">Redes Sociales & Canales B2B</h4>
            <ul className="space-y-2 text-xs text-[#FAF8F5]">
              <li><a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn (Enfoque Corporativo B2B)</a></li>
              <li><a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline">Instagram (Consejos & Autocuidado)</a></li>
              <li><a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline">YouTube (Videoteca & Ejercicios)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3">Soporte & Alianzas</h4>
            <p className="text-xs text-[#84A59D] leading-relaxed">
              Contacto habilitado para PYMES, instituciones públicas y comercios asociados vía WhatsApp y Telegram.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-[#52796F]/30 text-center text-xs text-[#84A59D]">
          &copy; {new Date().getFullYear()} ASL Ideas SpA. Todos los derechos reservados. | Diseñado con Accesibilidad Sensorial.
        </div>
      </footer>
    </main>
  );
}
