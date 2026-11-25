'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-slate-100' : 'bg-[#0B132B] text-slate-100'}`}>
      
      {/* Header Principal con Alto Contraste */}
      <header className="bg-[#1C2A3A] border-b border-[#52796F]/60 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          
          {/* Logo Principal y Subtitulo */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo-asl.png.png" 
              alt="ASL Ideas SpA" 
              className="w-14 h-14 object-contain rounded-xl bg-white p-1 border-2 border-[#52796F] shadow-md"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
                ASL Ideas SpA
              </h1>
              <p className="text-xs font-semibold text-emerald-400">
                Ecosistema de Soluciones Digitales y Diseños para PYMEs y Asociados
              </p>
            </div>
          </div>

          {/* Acciones Header */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setModoCalma(!modoCalma)}
              className="hidden sm:inline-flex px-4 py-2 text-xs font-bold rounded-xl bg-[#52796F] text-white hover:bg-[#676E5E] transition shadow"
            >
              {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
            </button>

            <Link
              href="/sala-virtual"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition shadow-md"
            >
              Sala Virtual B2B
            </Link>

            {/* Cuadrado de 3 lineas horizontales (Menu Desplegable) */}
            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label="Abrir menu principal"
              className="w-10 h-10 rounded-xl bg-[#52796F] text-white flex flex-col items-center justify-center gap-1 hover:bg-[#676E5E] transition shadow-md border border-white/20"
            >
              <span className="w-5 h-0.5 bg-white rounded-full"></span>
              <span className="w-5 h-0.5 bg-white rounded-full"></span>
              <span className="w-5 h-0.5 bg-white rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Menu Desplegable Vertical */}
        {menuAbierto && (
          <div className="bg-[#101D2B] border-t border-[#52796F]/50 px-4 py-6 shadow-2xl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              
              {/* Columna 1: Salas y Agenda */}
              <div className="space-y-3 bg-[#1C2A3A] p-4 rounded-2xl border border-slate-700">
                <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">
                  Salas Virtuales & Agenda B2B
                </h4>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li>
                    <Link href="/sala-virtual?app=ASL%20Ideas%20SpA" onClick={() => setMenuAbierto(false)} className="hover:text-emerald-400 transition block">
                      Casa Matriz ASL Ideas SpA
                    </Link>
                  </li>
                  <li>
                    <Link href="/sala-virtual?app=LAWENMOLL" onClick={() => setMenuAbierto(false)} className="hover:text-emerald-400 transition block">
                      LAWENMOLL - Salud Integrativa
                    </Link>
                  </li>
                  <li>
                    <Link href="/sala-virtual?app=Wellness%20Web%20App" onClick={() => setMenuAbierto(false)} className="hover:text-emerald-400 transition block">
                      Wellness Web App - Movimiento & Gastronomia
                    </Link>
                  </li>
                  <li>
                    <Link href="/sala-virtual?app=Bienestar" onClick={() => setMenuAbierto(false)} className="hover:text-emerald-400 transition block">
                      Bienestar - Mensajeria & Marketplace
                    </Link>
                  </li>
                  <li className="pt-2 border-t border-slate-700">
                    <Link href="/sala-virtual?tab=cita" onClick={() => setMenuAbierto(false)} className="text-emerald-400 font-bold hover:underline block">
                      Agendar Cita B2B
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Columna 2: Redes Sociales Oficiales */}
              <div className="space-y-3 bg-[#1C2A3A] p-4 rounded-2xl border border-slate-700">
                <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">
                  Nuestras Redes Sociales
                </h4>
                <ul className="space-y-2 text-xs text-slate-200">
                  <li>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition block">
                      LinkedIn Oficial
                    </a>
                  </li>
                  <li>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition block">
                      Instagram Corporativo
                    </a>
                  </li>
                  <li>
                    <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition block">
                      TikTok Institucional
                    </a>
                  </li>
                  <li>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition block">
                      Canal de YouTube
                    </a>
                  </li>
                  <li>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition block">
                      Facebook ASL Ideas
                    </a>
                  </li>
                </ul>
              </div>

              {/* Columna 3: Contacto Directo */}
              <div className="space-y-3 bg-[#1C2A3A] p-4 rounded-2xl border border-slate-700">
                <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider">
                  Contacto Directo & Canales
                </h4>
                <div className="text-xs text-slate-200 space-y-2">
                  <p><strong>Telefono / WhatsApp:</strong> +56 9 8330 2145</p>
                  <p><strong>Correo Electronico:</strong> contacto@aslideas.cl</p>
                  <p><strong>Atencion B2B:</strong> Lunes a Viernes 09:00 - 18:00 hrs</p>
                  <div className="pt-2">
                    <a href="#contacto" onClick={() => setMenuAbierto(false)} className="inline-block px-3 py-1.5 bg-[#52796F] text-white rounded-lg text-xs font-bold hover:bg-[#676E5E] transition">
                      Ver Canales de Atencion
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </header>

      {/* Banner Principal de Propuesta de Valor */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-center space-y-4">
        <span className="bg-[#52796F]/30 text-emerald-400 border border-[#52796F] text-xs font-extrabold px-4 py-2 rounded-full uppercase tracking-wider inline-block shadow">
          Red Cuerpo y Alma B2B
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white max-w-4xl mx-auto leading-tight">
          Desarrollo y soluciones accesibles para PYME y comercio asociado
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Diseñado por y para neurodivergencias (TEA/TDAH) y condiciones cronicas. Al sumarte a nuestra red como empresa, profesional o colaborador B2B, te favoreces al multiplicar tu alcance y cambiar la calidad de vida de miles de personas.
        </p>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA */}
        <div className="bg-[#1C2A3A] p-6 rounded-3xl border-2 border-[#52796F] shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 01
              </span>
              <span className="text-xs text-emerald-400 font-bold">Casa Matriz & Alianzas B2B</span>
            </div>
            
            <div className="flex items-center gap-4">
              <img 
                src="/logo-asl.png.png" 
                alt="ASL Ideas SpA Logo" 
                className="w-16 h-16 object-contain rounded-2xl bg-white p-1 border border-slate-600 shadow"
              />
              <div>
                <h3 className="text-xl font-black text-white">ASL Ideas SpA</h3>
                <p className="text-xs text-emerald-400 font-semibold">Quienes Somos & Red Cuerpo y Alma</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              <strong>Quienes Somos:</strong> Fundados por una Disenadora Grafica con neurodivergencia (TEA 1 / TDAH) y condiciones cronicas, transformamos la vivencia del autocuidado eliminando la sobrecarga sensorial y la culpa.
            </p>

            <div className="bg-[#0B132B] p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                Mision & Vision Institucional:
              </h4>
              <p className="text-slate-300">
                <strong>Mision:</strong> Desarrollar tecnologia amable y accesible de baja carga sensorial que elimine barreras de comunicacion y garantice el cumplimiento normativo (Ley TEA N° 21.545 y Ley de Ciberseguridad N° 21.663).
              </p>
              <p className="text-slate-300">
                <strong>Vision:</strong> Liderar el ecosistema de salud digital e integracion laboral B2B para PYMEs y emprendedores neurodivergentes a nivel regional.
              </p>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA"
            className="w-full py-3 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block uppercase tracking-wider"
          >
            Ingresar a Casa Matriz & Red B2B
          </Link>
        </div>

        {/* OFICINA 02: LAWENMOLL */}
        <div className="bg-[#1C2A3A] p-6 rounded-3xl border-2 border-[#52796F] shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 02
              </span>
              <span className="text-xs text-emerald-400 font-bold">Diagnostico & Telemedicina</span>
            </div>

            <div className="flex items-center gap-4">
              <img 
                src="/logo-lawenmoll.jpg.png" 
                alt="LAWENMOLL Logo" 
                className="w-16 h-16 object-contain rounded-2xl bg-white p-1 border border-slate-600 shadow"
              />
              <div>
                <h3 className="text-xl font-black text-white">LAWENMOLL</h3>
                <p className="text-xs text-emerald-400 font-semibold">Salud Integrativa & Fichas Cifradas</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Plataforma inteligente de evaluacion metabolica y seguimiento clinico integrativo, disenada para conectar pacientes con terapeutas y medicos de forma segura.
            </p>

            <div className="bg-[#0B132B] p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                Mision & Vision Clinica:
              </h4>
              <p className="text-slate-300">
                <strong>Mision:</strong> Brindar acompanamiento integrativo continuo y transparente mediante evaluaciones metabolicas y fichas cifradas bajo ley.
              </p>
              <p className="text-slate-300">
                <strong>Vision:</strong> Consolidar la mayor red de telemedicina amable y trazabilidad metabolica para profesionales de la salud holistica.
              </p>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=LAWENMOLL"
            className="w-full py-3 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block uppercase tracking-wider"
          >
            Ingresar a LAWENMOLL
          </Link>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP */}
        <div className="bg-[#1C2A3A] p-6 rounded-3xl border-2 border-[#52796F] shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 03
              </span>
              <span className="text-xs text-emerald-400 font-bold">Mente, Cuerpo & Gastronomia</span>
            </div>

            <div className="flex items-center gap-4">
              <img 
                src="/logo-wellness.jpg.jpg" 
                alt="Wellness Web App Logo" 
                className="w-16 h-16 object-contain rounded-2xl bg-white p-1 border border-slate-600 shadow"
              />
              <div>
                <h3 className="text-xl font-black text-white">Wellness Web App</h3>
                <p className="text-xs text-emerald-400 font-semibold">Movimiento Adaptado & Gastronomia Consciente</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Espacio visual e interactivo para conectar mente y cuerpo. Rutinas de ejercicio sin salto para proteger tus articulaciones y reducir el cortisol urbano.
            </p>

            <div className="bg-[#0B132B] p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                Mision & Vision de Bienestar:
              </h4>
              <p className="text-slate-300">
                <strong>Mision:</strong> Visibilizar a instructores y profesionales del movimiento adaptado, facilitando pausas activas y recetas nutritivas sin culpabilidad.
              </p>
              <p className="text-slate-300">
                <strong>Vision:</strong> Convertirse en la plataforma referente de actividades laborales sin impacto articular y nutricion integrativa.
              </p>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=Wellness%20Web%20App"
            className="w-full py-3 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block uppercase tracking-wider"
          >
            Ingresar a Wellness Web App
          </Link>
        </div>

        {/* OFICINA 04: BIENESTAR */}
        <div className="bg-[#1C2A3A] p-6 rounded-3xl border-2 border-[#52796F] shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 04
              </span>
              <span className="text-xs text-emerald-400 font-bold">Mensajeria, Salud & Shopping PYME</span>
            </div>

            <div className="flex items-center gap-4">
              <img 
                src="/logo-bienestar.png.png" 
                alt="Bienestar Logo" 
                className="w-16 h-16 object-contain rounded-2xl bg-white p-1 border border-slate-600 shadow"
              />
              <div>
                <h3 className="text-xl font-black text-white">Sabiduria Ancestral / Bienestar</h3>
                <p className="text-xs text-emerald-400 font-semibold">Mensajeria, Salud Holistica & Conexion Comercial</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              App interactiva de comunicacion y retroalimentacion en salud. Permite gestionar tu vida diaria, cuidar tu salud emocional y conectar con las mejores PYMEs.
            </p>

            <div className="bg-[#0B132B] p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
                Mision & Vision de Comunidad:
              </h4>
              <p className="text-slate-300">
                <strong>Mision:</strong> Fomentar una comunicacion fluida y amena, integrando modulo Morfeo para descanso REM y dinamizar el comercio PYME.
              </p>
              <p className="text-slate-300">
                <strong>Vision:</strong> Construir una comunidad sostenible de apoyo mutuo, promocion comercial accesible y equilibrio emocional diario.
              </p>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=Bienestar"
            className="w-full py-3 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block uppercase tracking-wider"
          >
            Ingresar a Bienestar
          </Link>
        </div>

      </section>

      {/* Pie de Pagina Oficial y Contacto */}
      <footer id="contacto" className="bg-[#1C2A3A] border-t border-[#52796F]/50 py-10 px-4 text-slate-300 text-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-white text-sm mb-2">ASL Ideas SpA</h4>
            <p className="text-slate-400 leading-relaxed">
              Ecosistema de Soluciones Digitales y Disenos para PYMEs y Asociados. Compromiso con la accesibilidad, baja sobrecarga sensorial e inclusion social.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-2">Canales de Atencion Directa</h4>
            <p><strong>Telefono / WhatsApp:</strong> +56 9 8330 2145</p>
            <p><strong>Correo Electrónico:</strong> contacto@aslideas.cl</p>
            <p><strong>Santiago, Chile</strong></p>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-2">Cumplimiento Normativo</h4>
            <p className="text-slate-400 leading-relaxed">
              Ley N° 21.545 (Inclusion y Derechos TEA) & Ley N° 21.663 (Marco de Ciberseguridad e Infraestructura Critica).
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-4 border-t border-slate-700 text-center text-slate-400 text-[11px]">
          © 2026 ASL Ideas SpA. Todos los derechos reservados.
        </div>
      </footer>

    </main>
  );
}
