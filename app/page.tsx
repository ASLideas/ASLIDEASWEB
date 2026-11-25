'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-[#E2E8F0]' : 'bg-[#0B132B] text-slate-100'}`}>
      {/* Header Principal con alto contraste y diseno limpio */}
      <header className="sticky top-0 z-50 bg-[#1C2A3A] border-b border-[#52796F]/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo y Nombre Principal */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#52796F] flex items-center justify-center font-black text-white text-xl shadow-lg border border-[#84A59D]/50">
              ASL
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#90B2D9]">
                ASL Ideas SpA
              </h1>
              <p className="text-xs font-semibold text-slate-300">
                Ecosistema de Soluciones Digitales y Diseños para PYMEs y Asociados
              </p>
            </div>
          </div>

          {/* Acciones del Header */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setModoCalma(!modoCalma)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#243547] text-slate-200 border border-[#52796F]/50 hover:bg-[#2C4258] transition shadow-sm"
            >
              {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma'}
            </button>

            <Link
              href="/sala-virtual"
              className="px-4 py-2 text-xs font-bold rounded-xl bg-[#52796F] text-white hover:bg-[#676E5E] transition shadow-md flex items-center gap-2"
            >
              <span>Sala Virtual B2B</span>
            </Link>

            {/* Cuadrado de 3 Lineas (Boton de Menu Desplegable) */}
            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label="Menu principal"
              className="w-10 h-10 rounded-xl bg-[#52796F] text-white flex items-center justify-center hover:bg-[#676E5E] transition shadow-md border border-[#84A59D]/40"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Panel Desplegable del Boton de 3 Lineas */}
        {menuAbierto && (
          <div className="bg-[#162231] border-t border-[#52796F]/40 p-6 shadow-2xl animate-fadeIn">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Columna 1: Salas y Agenda */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#78ACE9] border-b border-slate-700 pb-1">
                  Salas Virtuales y Agendamiento
                </h3>
                <ul className="space-y-2 text-xs font-bold text-slate-200">
                  <li>
                    <Link 
                      href="/sala-virtual?app=ASL%20Ideas%20SpA" 
                      onClick={() => setMenuAbierto(false)}
                      className="hover:text-[#90B2D9] transition block py-1"
                    >
                      Oficina 01: Casa Matriz ASL Ideas SpA
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/sala-virtual?app=LAWENMOLL" 
                      onClick={() => setMenuAbierto(false)}
                      className="hover:text-[#90B2D9] transition block py-1"
                    >
                      Oficina 02: LAWENMOLL Salud Integrativa
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/sala-virtual?app=Wellness%20Web%20App" 
                      onClick={() => setMenuAbierto(false)}
                      className="hover:text-[#90B2D9] transition block py-1"
                    >
                      Oficina 03: Wellness Web App
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/sala-virtual?app=Bienestar" 
                      onClick={() => setMenuAbierto(false)}
                      className="hover:text-[#90B2D9] transition block py-1"
                    >
                      Oficina 04: Bienestar y Shopping PYME
                    </Link>
                  </li>
                  <li className="pt-2">
                    <Link
                      href="/sala-virtual?tab=cita"
                      onClick={() => setMenuAbierto(false)}
                      className="inline-block px-4 py-2 bg-[#52796F] text-white font-bold rounded-xl text-xs hover:bg-[#676E5E] transition shadow"
                    >
                      Agendar Cita B2B
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Columna 2: Redes Sociales Oficiales */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#78ACE9] border-b border-slate-700 pb-1">
                  Nuestras Redes Oficiales
                </h3>
                <div className="flex flex-col space-y-2 text-xs font-semibold text-slate-200">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#90B2D9] transition">
                    LinkedIn: ASL Ideas SpA
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#90B2D9] transition">
                    Instagram: @aslideas.cl
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#90B2D9] transition">
                    TikTok: @aslideas_oficial
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#90B2D9] transition">
                    YouTube: Canal ASL Ideas
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#90B2D9] transition">
                    Facebook: ASL Ideas SpA
                  </a>
                </div>
              </div>

              {/* Columna 3: Contacto Directo */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#78ACE9] border-b border-slate-700 pb-1">
                  Contacto Directo
                </h3>
                <div className="text-xs space-y-2 text-slate-300">
                  <p><strong>Telefono:</strong> +56 9 8330 2145</p>
                  <p><strong>Correo:</strong> contacto@aslideas.cl</p>
                  <p><strong>Ubicacion:</strong> Casa Matriz ASL Ideas SpA</p>
                  <a
                    href="#contacto"
                    onClick={() => setMenuAbierto(false)}
                    className="inline-block mt-2 text-[#90B2D9] underline hover:text-white transition font-bold"
                  >
                    Ver detalles completos de contacto
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}
      </header>

      {/* Banner Propuesta de Valor */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-center space-y-4">
        <span className="bg-[#52796F]/30 text-[#90B2D9] border border-[#52796F] text-xs font-extrabold px-4 py-2 rounded-full uppercase tracking-wider shadow-sm">
          Red Cuerpo y Alma B2B
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white max-w-4xl mx-auto leading-tight">
          Desarrollo y soluciones accesibles para PYME y comercio asociado
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Diseñado por y para neurodivergencias (TEA/TDAH) y condiciones crónicas. Al sumarte a nuestra red como empresa, profesional o colaborador B2B, te favoreces al multiplicar tu alcance y cambiar la calidad de vida de miles de personas.
        </p>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 pb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA (Quiénes Somos & Red B2B) */}
        <div className="bg-[#1C2A3A] p-6 sm:p-8 rounded-3xl border-2 border-[#52796F]/50 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Oficina 01
              </span>
              <span className="text-xs text-[#90B2D9] font-bold">Casa Matriz & Alianzas B2B</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-2 border border-[#84A59D] flex items-center justify-center shadow-md shrink-0">
                <img src="/logo-asl.png.png" alt="Logo ASL Ideas SpA" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-extrabold text-white">
                ASL Ideas SpA — Quiénes Somos & Red Cuerpo y Alma
              </h3>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              <strong>Quiénes Somos:</strong> Fundados por una Diseñadora Gráfica con neurodivergencia (TEA 1 / TDAH) y condiciones crónicas, transformamos la vivencia del autocuidado eliminando la sobrecarga sensorial y la culpa.
            </p>

            <div className="bg-[#131F2D] p-5 rounded-2xl border border-slate-700 text-xs space-y-3">
              <h4 className="font-bold text-[#90B2D9]">Beneficios de Suscribirse y Ser Colaborador B2B:</h4>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>Beneficio de Red:</strong> Formarás parte de la red Cuerpo y Alma, siendo favorecido para llegar a muchas más personas y potenciar tu impacto.</li>
                <li><strong>Cumplimiento Normativo:</strong> Consultoría en Ley TEA N° 21.545 y Ley de Ciberseguridad N° 21.663.</li>
                <li><strong>Vitrinas Accesibles:</strong> Software e infraestructura amable adaptada para PYMEs.</li>
              </ul>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA"
            className="w-full py-3.5 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Casa Matriz & Red B2B
          </Link>
        </div>

        {/* OFICINA 02: LAWENMOLL (Salud Integrativa) */}
        <div className="bg-[#1C2A3A] p-6 sm:p-8 rounded-3xl border-2 border-[#52796F]/50 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Oficina 02
              </span>
              <span className="text-xs text-[#90B2D9] font-bold">Diagnóstico & Telemedicina</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-2 border border-[#84A59D] flex items-center justify-center shadow-md shrink-0">
                <img src="/logo-lawenmoll.jpg.png" alt="Logo LAWENMOLL" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-extrabold text-white">
                LAWENMOLL — Salud Integrativa & Fichas Cifradas
              </h3>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              <strong>Misión & Visión:</strong> Plataforma inteligente de evaluación metabólica y seguimiento clínico integrativo. Acompañamos el bienestar del paciente conectándolo con profesionales en un espacio transparente y encriptado.
            </p>

            <div className="bg-[#131F2D] p-5 rounded-2xl border border-slate-700 text-xs space-y-3">
              <h4 className="font-bold text-[#90B2D9]">Características Principales:</h4>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li>Test Metabólico y Composición Corporal Inteligente.</li>
                <li>Fichas Clínicas SOAP encriptadas bajo estándar Ley N° 21.663.</li>
                <li>Telemedicina integrativa con seguimiento continuo.</li>
              </ul>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=LAWENMOLL"
            className="w-full py-3.5 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a LAWENMOLL
          </Link>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP (Movimiento Adaptado & Gastronomía) */}
        <div className="bg-[#1C2A3A] p-6 sm:p-8 rounded-3xl border-2 border-[#52796F]/50 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Oficina 03
              </span>
              <span className="text-xs text-[#90B2D9] font-bold">Mente, Cuerpo & Gastronomía</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-2 border border-[#84A59D] flex items-center justify-center shadow-md shrink-0">
                <img src="/logo-wellness.jpg.jpg" alt="Logo Wellness Web App" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Wellness Web App — Movimiento Adaptado & Gastronomía
              </h3>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              <strong>Misión & Visión:</strong> Dar visibilidad a instructores y profesionales de la salud física, acercando rutinas adaptadas sin salto para proteger articulaciones y reducir el cortisol urbano sin dietas punitivas.
            </p>

            <div className="bg-[#131F2D] p-5 rounded-2xl border border-slate-700 text-xs space-y-3">
              <h4 className="font-bold text-[#90B2D9]">Experiencia Interactiva & Conexión:</h4>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>Conexión con Profesores:</strong> Clases en vivo en salas virtuales o visita la cuenta/perfil del instructor.</li>
                <li><strong>Gastronomía Saludable:</strong> Cocina demostrativa e ideas de alimentación nutritiva.</li>
                <li><strong>Pausas Activas:</strong> Módulos anti-estrés para entorno laboral y personal.</li>
              </ul>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=Wellness%20Web%20App"
            className="w-full py-3.5 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Wellness Web App
          </Link>
        </div>

        {/* OFICINA 04: BIENESTAR (Mensajería, Salud Holística & Shopping PYME) */}
        <div className="bg-[#1C2A3A] p-6 sm:p-8 rounded-3xl border-2 border-[#52796F]/50 shadow-2xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Oficina 04
              </span>
              <span className="text-xs text-[#90B2D9] font-bold">Mensajería, Salud & Shopping PYME</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-2 border border-[#84A59D] flex items-center justify-center shadow-md shrink-0">
                <img src="/logo-bienestar.png.png" alt="Logo Bienestar" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Sabiduría Ancestral / Bienestar — Mensajería & Shopping PYME
              </h3>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              <strong>Misión & Visión:</strong> Fomentar una comunicación fluida y amena. Cuidar la salud emocional diaria, potenciar el descanso reparador (Módulo Morfeo) y generar ingresos extras conectando usuarios con PYMEs recomendadas.
            </p>

            <div className="bg-[#131F2D] p-5 rounded-2xl border border-slate-700 text-xs space-y-3">
              <h4 className="font-bold text-[#90B2D9]">Módulos de Bienestar & Marketplace:</h4>
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
                <li><strong>Salud & Hábitos:</strong> Horas médicas, hidratación, estado de ánimo y descanso REM.</li>
                <li><strong>Módulo Morfeo:</strong> Seguimiento para un sueño profundo y reparador.</li>
                <li><strong>Chat, Agenda & Shopping:</strong> Conexión con PYMEs y emprendimientos locales.</li>
              </ul>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=Bienestar"
            className="w-full py-3.5 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Bienestar
          </Link>
        </div>

      </section>

      {/* Pie de Pagina y Seccion de Contacto Directo */}
      <footer id="contacto" className="bg-[#162231] border-t border-[#52796F]/50 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-slate-300">
          <div>
            <h4 className="text-sm font-black text-white mb-2">ASL Ideas SpA</h4>
            <p>Ecosistema de Soluciones Digitales y Diseños para PYMEs y Asociados.</p>
            <p className="mt-2 text-slate-400">Cumplimiento Ley N° 21.545 (TEA) y Ley N° 21.663 (Ciberseguridad).</p>
          </div>
          <div>
            <h4 className="text-sm font-black text-white mb-2">Canales Oficiales de Atencion</h4>
            <p><strong>Telefono:</strong> +56 9 8330 2145</p>
            <p><strong>Correo Electrónico:</strong> contacto@aslideas.cl</p>
            <p><strong>Atencion:</strong> Lunes a Viernes de 09:00 a 18:00 hrs</p>
          </div>
          <div>
            <h4 className="text-sm font-black text-white mb-2">Redes Sociales</h4>
            <div className="flex flex-col space-y-1 font-semibold text-[#90B2D9]">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn ASL Ideas SpA</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram @aslideas.cl</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube Canal Oficial</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} ASL Ideas SpA. Todos los derechos reservados.
        </div>
      </footer>
    </main>
  );
}
