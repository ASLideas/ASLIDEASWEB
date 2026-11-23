'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [submenulSalas, setSubmenuSalas] = useState(false);
  const [submenuRedes, setSubmenuRedes] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#FAF9F6] text-[#1B4D3E]' : 'bg-[#F5F7F4] text-[#1B4D3E]'}`}>
      
      {/* HEADER RESPONSIVO CON MENÚ DESPLEGABLE TIPO HAMBURGUESA (CUADRADO CON LÍNEAS) */}
      <header className="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#2D6A4F]/20 px-4 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo y Nombre */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo-asl.png.png" 
              alt="Logo ASL Ideas SpA" 
              className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-[#2D6A4F]/30 shadow-sm"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#1B4D3E]">
                ASL Ideas SpA
              </h1>
              <p className="text-xs text-[#2D6A4F] font-medium">
                Estrategia de Salud Digital Inclusiva
              </p>
            </div>
          </div>

          {/* Acciones de Escritorio y Botón Menú Hamburguesa */}
          <div className="flex items-center gap-3">
            
            {/* Botón Modo Calma en Escritorio */}
            <button
              type="button"
              onClick={() => setModoCalma(!modoCalma)}
              className="hidden md:inline-flex px-3 py-2 text-xs font-semibold rounded-lg bg-[#E6EBE4] text-[#1B4D3E] border border-[#2D6A4F]/30 hover:bg-[#D5DFD3] transition"
            >
              {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma'}
            </button>

            {/* BOTÓN CUADRADO CON LÍNEAS (MENÚ DESPLEGABLE DE MENÚ COMPLETO) */}
            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label="Abrir Menú de Navegación"
              className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#2D6A4F] text-white border border-[#1B4D3E] hover:bg-[#1B4D3E] transition shadow-md focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]"
            >
              {/* Tres líneas horizontales dentro del cuadrado */}
              <span className={`w-6 h-0.5 bg-white rounded-full transition-transform duration-200 ${menuAbierto ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-white rounded-full transition-opacity duration-200 ${menuAbierto ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`w-6 h-0.5 bg-white rounded-full transition-transform duration-200 ${menuAbierto ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        {/* MENÚ DESPLEGABLE DESDE EL CUADRADO CON LÍNEAS */}
        {menuAbierto && (
          <nav className="max-w-7xl mx-auto mt-4 pt-4 border-t border-[#2D6A4F]/20 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-[#2D6A4F]/20 shadow-xl text-left">
              
              {/* Sección 1: Salas & Agenda */}
              <div className="space-y-3">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1B4D3E] border-b border-[#2D6A4F]/20 pb-1">
                  Salas & Agenda
                </h2>
                <ul className="space-y-2 text-xs">
                  <li className="p-2 rounded-lg bg-[#FAF9F6] border border-[#2D6A4F]/10">
                    <p className="font-bold text-[#1B4D3E]">ASL Ideas SpA (Casa Matriz)</p>
                    <div className="flex gap-2 mt-1">
                      <Link href="/sala-virtual?app=ASL%20Ideas%20SpA" onClick={() => setMenuAbierto(false)} className="text-[#2D6A4F] font-semibold hover:underline">Ingresar a Sala</Link>
                      <span>|</span>
                      <Link href="/sala-virtual?app=ASL%20Ideas%20SpA&tab=cita" onClick={() => setMenuAbierto(false)} className="text-[#B08D4B] font-semibold hover:underline">Agendar Cita</Link>
                    </div>
                  </li>
                  <li className="p-2 rounded-lg bg-[#FAF9F6] border border-[#2D6A4F]/10">
                    <p className="font-bold text-[#1B4D3E]">LAWENMOLL (Vitrina Integrativa)</p>
                    <div className="flex gap-2 mt-1">
                      <Link href="/sala-virtual?app=LAWENMOLL" onClick={() => setMenuAbierto(false)} className="text-[#2D6A4F] font-semibold hover:underline">Ingresar a Sala</Link>
                      <span>|</span>
                      <Link href="/sala-virtual?app=LAWENMOLL&tab=cita" onClick={() => setMenuAbierto(false)} className="text-[#B08D4B] font-semibold hover:underline">Agendar Cita</Link>
                    </div>
                  </li>
                  <li className="p-2 rounded-lg bg-[#FAF9F6] border border-[#2D6A4F]/10">
                    <p className="font-bold text-[#1B4D3E]">Wellness Web App</p>
                    <div className="flex gap-2 mt-1">
                      <Link href="/sala-virtual?app=Wellness%20Web%20App" onClick={() => setMenuAbierto(false)} className="text-[#2D6A4F] font-semibold hover:underline">Ingresar a Sala</Link>
                      <span>|</span>
                      <Link href="/sala-virtual?app=Wellness%20Web%20App&tab=cita" onClick={() => setMenuAbierto(false)} className="text-[#B08D4B] font-semibold hover:underline">Agendar Cita</Link>
                    </div>
                  </li>
                  <li className="p-2 rounded-lg bg-[#FAF9F6] border border-[#2D6A4F]/10">
                    <p className="font-bold text-[#1B4D3E]">Sabiduría Ancestral / Bienestar</p>
                    <div className="flex gap-2 mt-1">
                      <Link href="/sala-virtual?app=Bienestar" onClick={() => setMenuAbierto(false)} className="text-[#2D6A4F] font-semibold hover:underline">Ingresar a Sala</Link>
                      <span>|</span>
                      <Link href="/sala-virtual?app=Bienestar&tab=cita" onClick={() => setMenuAbierto(false)} className="text-[#B08D4B] font-semibold hover:underline">Agendar Cita</Link>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Sección 2: Nuestras Redes */}
              <div className="space-y-3">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1B4D3E] border-b border-[#2D6A4F]/20 pb-1">
                  Nuestras Redes
                </h2>
                <ul className="space-y-1.5 text-xs text-[#2D6A4F]">
                  <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline font-medium">LinkedIn Corporativo</a></li>
                  <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline font-medium">Instagram Oficial</a></li>
                  <li><a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:underline font-medium">TikTok Salud Inclusiva</a></li>
                  <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:underline font-medium">Canal de YouTube</a></li>
                  <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline font-medium">Comunidad en Facebook</a></li>
                </ul>
              </div>

              {/* Sección 3: Contacto Directo & Accesos */}
              <div className="space-y-3">
                <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#1B4D3E] border-b border-[#2D6A4F]/20 pb-1">
                  Contacto Directo
                </h2>
                <div className="space-y-2 text-xs">
                  <a 
                    href="#contacto" 
                    onClick={() => setMenuAbierto(false)} 
                    className="block p-2.5 rounded-lg bg-[#2D6A4F] text-white font-bold text-center hover:bg-[#1B4D3E] transition"
                  >
                    Ver Ficha Oficial y Canales de Atención Directa
                  </a>
                  <button
                    type="button"
                    onClick={() => { setModoCalma(!modoCalma); setMenuAbierto(false); }}
                    className="w-full p-2.5 rounded-lg bg-[#E6EBE4] text-[#1B4D3E] font-semibold border border-[#2D6A4F]/30 hover:bg-[#D5DFD3] transition"
                  >
                    {modoCalma ? 'Desactivar Modo Calma' : 'Activar Modo Calma (Baja Carga Sensorial)'}
                  </button>
                </div>
              </div>

            </div>
          </nav>
        )}
      </header>

      {/* BANNER PRINCIPAL */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-center space-y-4">
        <span className="bg-[#2D6A4F]/10 text-[#1B4D3E] border border-[#2D6A4F]/30 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
          ASL IDEAS SPA — CASA MATRIZ
        </span>
        <h2 className="text-2xl md:text-4xl font-bold text-[#1B4D3E] max-w-4xl mx-auto leading-tight">
          Visualización, Diseño y Desarrollo de Apps para PYMEs y Comercio Asociado
        </h2>
        <p className="text-xs md:text-sm text-[#2C3E35] max-w-4xl mx-auto leading-relaxed">
          Diseñamos y desarrollamos soluciones tecnológicas amables y herramientas digitales a medida para emprendedores, PYMEs y comercios. ASL Ideas SpA Casa Matriz combina diseño gráfico de alta sensibilidad visual con ingeniería de software accesible.
        </p>

        {/* Misión y Visión Casa Matriz */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-left max-w-5xl mx-auto">
          <div className="bg-white p-5 rounded-2xl border border-[#2D6A4F]/20 shadow-sm space-y-2">
            <h3 className="text-sm font-bold text-[#1B4D3E]">Nuestra Misión</h3>
            <p className="text-xs text-[#2C3E35] leading-relaxed">
              Diseñar aplicaciones web y móviles amables con baja carga sensorial, adaptadas a personas con neurodivergencias y neurotípicas, otorgando a distintas áreas mayor visibilidad e integrando personas con discapacidad al mundo laboral.
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#2D6A4F]/20 shadow-sm space-y-2">
            <h3 className="text-sm font-bold text-[#1B4D3E]">Nuestra Visión</h3>
            <p className="text-xs text-[#2C3E35] leading-relaxed">
              Ser la empresa líder en soluciones tecnológicas accesibles para personas neurodivergentes y con discapacidad, dando trabajo y visibilidad a distintas empresas y entregando respuestas a diversas problemáticas bajo los estándares de ciberseguridad de la Ley N° 21.663.
            </p>
          </div>
        </div>
      </section>

      {/* LAS 4 OFICINAS VIRTUALES */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA */}
        <div className="bg-white p-6 rounded-3xl border border-[#2D6A4F]/30 shadow-md flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D6A4F]/10 pb-3">
              <span className="bg-[#1B4D3E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                Oficina 01
              </span>
              <span className="text-xs text-[#2D6A4F] font-bold">Casa Matriz & Desarrollo B2B</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-[#2D6A4F]/20" />
              <div>
                <h3 className="text-lg font-bold text-[#1B4D3E]">ASL Ideas SpA</h3>
                <p className="text-xs text-[#2D6A4F]">Diseño & Software Accesible</p>
              </div>
            </div>

            <p className="text-xs text-[#2C3E35] leading-relaxed">
              Diseñamos soluciones tecnológicas e interfaces amables a medida para PYMEs, emprendimientos y comercios en cualquier rubro del mercado.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/sala-virtual?app=ASL%20Ideas%20SpA"
              className="py-2.5 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-semibold text-xs rounded-xl text-center transition shadow-sm"
            >
              Ingresar a Sala
            </Link>
            <Link
              href="/sala-virtual?app=ASL%20Ideas%20SpA&tab=cita"
              className="py-2.5 bg-[#B08D4B] hover:bg-[#8F7038] text-white font-semibold text-xs rounded-xl text-center transition shadow-sm"
            >
              Agendar Cita
            </Link>
          </div>
        </div>

        {/* OFICINA 02: LAWENMOLL */}
        <div className="bg-white p-6 rounded-3xl border border-[#2D6A4F]/30 shadow-md flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D6A4F]/10 pb-3">
              <span className="bg-[#2D6A4F] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                Oficina 02
              </span>
              <span className="text-xs text-[#2D6A4F] font-bold">Vitrina Virtual Integrativa</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-lawenmoll.jpg.png" alt="Logo LAWENMOLL" className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-[#2D6A4F]/20" />
              <div>
                <h3 className="text-lg font-bold text-[#1B4D3E]">LAWENMOLL</h3>
                <p className="text-xs text-[#2D6A4F]">Salud Integrativa & Acompañamiento</p>
              </div>
            </div>

            <p className="text-xs text-[#2C3E35] leading-relaxed">
              Plataforma pionera de vitrina virtual integrativa para diagnóstico preventivo, tests metabólicos interactivos y acompañamiento en salud.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/sala-virtual?app=LAWENMOLL"
              className="py-2.5 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-semibold text-xs rounded-xl text-center transition shadow-sm"
            >
              Ingresar a Sala
            </Link>
            <Link
              href="/sala-virtual?app=LAWENMOLL&tab=cita"
              className="py-2.5 bg-[#B08D4B] hover:bg-[#8F7038] text-white font-semibold text-xs rounded-xl text-center transition shadow-sm"
            >
              Agendar Cita
            </Link>
          </div>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP */}
        <div className="bg-white p-6 rounded-3xl border border-[#2D6A4F]/30 shadow-md flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D6A4F]/10 pb-3">
              <span className="bg-[#1B4D3E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                Oficina 03
              </span>
              <span className="text-xs text-[#2D6A4F] font-bold">Movimiento Adaptado & Gastronomía</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-wellness.jpg.jpg" alt="Logo Wellness Web App" className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-[#2D6A4F]/20" />
              <div>
                <h3 className="text-lg font-bold text-[#1B4D3E]">Wellness Web App</h3>
                <p className="text-xs text-[#2D6A4F]">Salas Virtuales & Meditación</p>
              </div>
            </div>

            <p className="text-xs text-[#2C3E35] leading-relaxed">
              Espacio visual interactivo con rutinas de ejercicio adaptadas, meditación guiada, consejos de nutrición y salas virtuales para instructores.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/sala-virtual?app=Wellness%20Web%20App"
              className="py-2.5 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-semibold text-xs rounded-xl text-center transition shadow-sm"
            >
              Ingresar a Sala
            </Link>
            <Link
              href="/sala-virtual?app=Wellness%20Web%20App&tab=cita"
              className="py-2.5 bg-[#B08D4B] hover:bg-[#8F7038] text-white font-semibold text-xs rounded-xl text-center transition shadow-sm"
            >
              Agendar Cita
            </Link>
          </div>
        </div>

        {/* OFICINA 04: SABIDURÍA ANCESTRAL / BIENESTAR */}
        <div className="bg-white p-6 rounded-3xl border border-[#2D6A4F]/30 shadow-md flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D6A4F]/10 pb-3">
              <span className="bg-[#2D6A4F] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                Oficina 04
              </span>
              <span className="text-xs text-[#2D6A4F] font-bold">Sabiduría Ancestral & Hábitos</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-bienestar.png.png" alt="Logo Bienestar" className="w-14 h-14 object-contain rounded-xl bg-white p-1 border border-[#2D6A4F]/20" />
              <div>
                <h3 className="text-lg font-bold text-[#1B4D3E]">Sabiduría Ancestral / Bienestar</h3>
                <p className="text-xs text-[#2D6A4F]">Agenda & Sueño Morfeo</p>
              </div>
            </div>

            <p className="text-xs text-[#2C3E35] leading-relaxed">
              App de mensajería fluida, agenda de hábitos diarios (recordatorio de agua y horas médicas), conexión con PYMEs y relajación para el descanso REM.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              href="/sala-virtual?app=Bienestar"
              className="py-2.5 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-semibold text-xs rounded-xl text-center transition shadow-sm"
            >
              Ingresar a Sala
            </Link>
            <Link
              href="/sala-virtual?app=Bienestar&tab=cita"
              className="py-2.5 bg-[#B08D4B] hover:bg-[#8F7038] text-white font-semibold text-xs rounded-xl text-center transition shadow-sm"
            >
              Agendar Cita
            </Link>
          </div>
        </div>

      </section>

      {/* FOOTER Y CANALES OFICIALES DE CONTACTO Y ATENCIÓN DIRECTA */}
      <footer id="contacto" className="bg-[#1B4D3E] text-white border-t border-[#2D6A4F]/40 py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
              ASL Ideas SpA — Casa Matriz y Desarrollo B2B
            </h3>
            <p className="text-xs md:text-sm text-slate-200 max-w-4xl leading-relaxed">
              Estrategia de Salud Digital Inclusiva. Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencia y condiciones crónicas de salud.
            </p>
          </div>

          <div className="bg-[#2D6A4F]/40 p-6 rounded-2xl border border-white/10 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-200">
              CANALES OFICIALES DE CONTACTO Y ATENCIÓN DIRECTA:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-100">
              <div className="space-y-1">
                <p className="font-bold text-white">Contacto Telefónico y WhatsApp Directo:</p>
                <p className="text-emerald-100 font-semibold text-sm">Atención Directa: +56 9 8330 2145</p>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-white">Contacto por Correo Electrónico:</p>
                <p className="text-emerald-100">contacto@aslideas.cl</p>
                <p className="text-emerald-100">contacto@lawenmoll.cl</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="https://chat.whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-[#B08D4B] hover:bg-[#8F7038] text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                Unirse al Grupo ASL Ideas SpA
              </a>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
            <p>© {new Date().getFullYear()} ASL Ideas SpA. Todos los derechos reservados.</p>
            <div className="flex gap-4">
              <Link href="/admin" className="hover:underline">Administración ASL (/admin)</Link>
              <span>•</span>
              <Link href="/sala-virtual" className="hover:underline">Sala Virtual (/sala-virtual)</Link>
            </div>
          </div>

        </div>
      </footer>
    </main>
  );
}
