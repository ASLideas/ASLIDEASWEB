'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      {/* Encabezado Corporativo con Logo Rosado Oficial ASL Ideas SpA */}
      <header className="bg-white sticky top-0 z-50 border-b border-[#B08D4B]/20 py-4 px-6 md:px-12 shadow-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#B08D4B]/40 shadow-xs bg-white flex items-center justify-center p-0.5">
              <img
                src="/LOGO_asl.png"
                alt="Logo Rosado Oficial ASL Ideas SpA"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
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
            <a href="#portales" className="hover:text-[#1B4D3E] transition">Portales y Citas</a>
          </nav>

          <div className="flex items-center space-x-3">
            <a
              href="#portales"
              className="bg-[#1B4D3E] text-white text-xs md:text-sm px-4 py-2 rounded-xl font-medium hover:bg-[#2D6A4F] transition shadow-xs"
            >
              Agendar Cita
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

      {/* Hero Principal con Enfoque B2B y PYMEs */}
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
            href="#portales"
            className="w-full sm:w-auto bg-white border border-[#B08D4B]/40 text-[#1B4D3E] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#FAF8F5] transition shadow-sm"
          >
            Agendar Reunión Virtual
          </a>
        </div>
      </section>

      {/* Misión y Visión */}
      <section id="mision-vision" className="max-w-6xl mx-auto px-6 py-12 border-t border-[#84A59D]/20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#1B4D3E]">Nuestra Misión y Visión</h2>
          <p className="text-xs text-[#52796F] mt-1">Fundamentos estratégicos de innovación tecnológica e inclusión humana</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-[#B08D4B]/20 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#1B4D3E]/10 flex items-center justify-center text-[#1B4D3E] font-bold text-xs mb-4">
              VISIÓN
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E] mb-3">Nuestra Visión</h3>
            <p className="text-sm text-[#52796F] leading-relaxed">
              Liderar la transformación de la salud digital integrativa y la accesibilidad tecnológica en Latinoamérica, posicionando a ASL Ideas SpA como el referente en ecosistemas digitales diseñados por y para personas con neurodivergencias y condiciones crónicas de salud.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#B08D4B]/20 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F] font-bold text-xs mb-4">
              MISIÓN
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E] mb-3">Nuestra Misión</h3>
            <p className="text-sm text-[#52796F] leading-relaxed">
              Diseñar, desarrollar y escalar soluciones tecnológicas amables —como LAWENMOLL y Wellness Web App— que unifiquen la evaluación metabólica inteligente, la medicina integrativa, el movimiento adaptado sin impacto y la sabiduría ancestral. Buscamos eliminar la frustración y la sobrecarga sensorial, empoderando a los usuarios en la gestión autónoma de su bienestar.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios PYMES */}
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

      {/* Portales Interactivos con Logos Circulares Oficiales */}
      <section id="portales" className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B4D3E]">Portales Interactivos y Agendamiento de Reuniones</h2>
          <p className="text-xs text-[#52796F] mt-2">Selecciona un portal para ingresar o coordinar una reunión virtual con previa cita y horario reservado</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Portal 1: Casa Matriz ASL Ideas (Logo Rosado Oficial) */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-center">
            <div>
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#B08D4B]/40 shadow-sm mx-auto mb-4 bg-white flex items-center justify-center p-0.5">
                <img src="/LOGO_asl.png" alt="Logo Rosado Oficial ASL Ideas SpA" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-lg font-bold text-[#1B4D3E] mb-2">Casa Matriz B2B</h3>
              <p className="text-xs text-[#52796F] leading-relaxed mb-4">
                Gestión corporativa, convenios institucionales, licencias tecnológicas y consultoría UI/UX.
              </p>
            </div>
            
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <button 
                onClick={() => setSelectedPortal('Casa Matriz ASL Ideas (Reunión Corporativa B2B)')}
                className="w-full bg-[#1B4D3E] text-white text-xs py-2.5 rounded-xl font-medium hover:bg-[#2D6A4F] transition"
              >
                Agendar Reunión B2B
              </button>
              <Link href="/aslideas" className="block text-xs font-semibold text-[#B08D4B] hover:underline pt-1">
                Explorar Portal &rarr;
              </Link>
            </div>
          </div>

          {/* Portal 2: LAWENMOLL */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-center">
            <div>
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#B08D4B]/40 shadow-sm mx-auto mb-4 bg-white flex items-center justify-center p-0.5">
                <img src="/lawenmoll_logo.jpg" alt="Logo LAWENMOLL" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-lg font-bold text-[#1B4D3E] mb-2">LAWENMOLL</h3>
              <p className="text-xs text-[#52796F] leading-relaxed mb-4">
                Salud Integrativa & Fichas Clínicas encriptadas (Ley N° 21.663). Test de Bienestar Inteligente.
              </p>
            </div>
            
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <button 
                onClick={() => setSelectedPortal('LAWENMOLL (Consulta de Salud Integrativa)')}
                className="w-full bg-[#1B4D3E] text-white text-xs py-2.5 rounded-xl font-medium hover:bg-[#2D6A4F] transition"
              >
                Reservar Cita Médica
              </button>
              <Link href="/lawenmoll" className="block text-xs font-semibold text-[#B08D4B] hover:underline pt-1">
                Explorar Portal &rarr;
              </Link>
            </div>
          </div>

          {/* Portal 3: Wellness Web App */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-center">
            <div>
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#B08D4B]/40 shadow-sm mx-auto mb-4 bg-white flex items-center justify-center p-0.5">
                <img src="/logo_wellness.jpg" alt="Logo Wellness" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-lg font-bold text-[#1B4D3E] mb-2">Wellness Web App</h3>
              <p className="text-xs text-[#52796F] leading-relaxed mb-4">
                Movimiento adaptado sin impacto, videoteca y Salas Virtuales (Lotus, Cielo, Bosque, Raíz).
              </p>
            </div>
            
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <button 
                onClick={() => setSelectedPortal('Wellness Web App (Sesión de Pausa Activa / Sala Virtual)')}
                className="w-full bg-[#1B4D3E] text-white text-xs py-2.5 rounded-xl font-medium hover:bg-[#2D6A4F] transition"
              >
                Agendar Sala Virtual
              </button>
              <Link href="/wellness" className="block text-xs font-semibold text-[#B08D4B] hover:underline pt-1">
                Explorar Portal &rarr;
              </Link>
            </div>
          </div>

          {/* Portal 4: Sabiduría Ancestral */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-center">
            <div>
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#B08D4B]/40 shadow-sm mx-auto mb-4 bg-white flex items-center justify-center p-0.5">
                <img src="/LOGO_BIENESTAR.png" alt="Logo Bienestar Ancestral" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-lg font-bold text-[#1B4D3E] mb-2">Sabiduría Ancestral</h3>
              <p className="text-xs text-[#52796F] leading-relaxed mb-4">
                Fitoterapia nativa, comunidad activa, Diario Mural y recetarios herbolarios descargables en PDF.
              </p>
            </div>
            
            <div className="space-y-2 pt-4 border-t border-gray-100">
              <button 
                onClick={() => setSelectedPortal('Sabiduría Ancestral (Taller Comunitario Herbolario)')}
                className="w-full bg-[#1B4D3E] text-white text-xs py-2.5 rounded-xl font-medium hover:bg-[#2D6A4F] transition"
              >
                Agendar Taller Herbolario
              </button>
              <Link href="/bienestar" className="block text-xs font-semibold text-[#B08D4B] hover:underline pt-1">
                Explorar Portal &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Interactivo de Cita y Horario */}
      {selectedPortal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full border border-[#84A59D]/30 shadow-xl space-y-6">
            <div className="flex justify-between items-start border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs font-bold text-[#B08D4B] uppercase tracking-wider">Previa Cita & Horario</span>
                <h3 className="text-lg font-bold text-[#1B4D3E] mt-1">{selectedPortal}</h3>
              </div>
              <button 
                onClick={() => setSelectedPortal(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Cita agendada con éxito. Recibirás la confirmación por correo y WhatsApp.'); setSelectedPortal(null); }}>
              <div>
                <label className="block text-xs font-semibold text-[#1B4D3E] mb-1">Nombre Completo</label>
                <input required type="text" placeholder="Ej: María González" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-[#1B4D3E]" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1B4D3E] mb-1">Correo Electrónico</label>
                  <input required type="email" placeholder="correo@ejemplo.cl" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-[#1B4D3E]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1B4D3E] mb-1">Teléfono / WhatsApp</label>
                  <input required type="tel" placeholder="+56 9 1234 5678" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-[#1B4D3E]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1B4D3E] mb-1">Fecha de Cita</label>
                  <input required type="date" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-[#1B4D3E]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#1B4D3E] mb-1">Horario Disponible</label>
                  <select required className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-[#1B4D3E]">
                    <option value="">Selecciona Horario</option>
                    <option value="10:00">10:00 - 10:45 AM</option>
                    <option value="12:00">12:00 - 12:45 PM</option>
                    <option value="15:30">15:30 - 16:15 PM</option>
                    <option value="18:00">18:00 - 18:45 PM</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setSelectedPortal(null)}
                  className="w-1/2 bg-gray-100 text-gray-700 py-2.5 rounded-xl text-xs font-semibold hover:bg-gray-200 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="w-1/2 bg-[#1B4D3E] text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-[#2D6A4F] transition"
                >
                  Confirmar Reserva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pie de Página */}
      <footer className="bg-[#1B4D3E] text-[#FAF8F5] py-12 px-6 mt-12 border-t border-[#84A59D]/20">
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
