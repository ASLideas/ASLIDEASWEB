'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [openSalaMenu, setOpenSalaMenu] = useState(false);
  const [openAgendaMenu, setOpenAgendaMenu] = useState(false);

  const oficinas = [
    {
      id: 'asl',
      nombre: 'Casa Matriz ASL Ideas SpA',
      subtitulo: 'Innovación B2B & Licencias Tecnológicas Inclusivas',
      logo: '/LOGO_asl.png',
      desc: 'Gestión corporativa, convenios institucionales y consultoría en accesibilidad UI/UX para neurodivergencias (Ley TEA N° 21.545 & Ley N° 21.663).',
      estado: 'Oficina Oficial Active'
    },
    {
      id: 'lawenmoll',
      nombre: 'LAWENMOLL',
      subtitulo: 'Salud Integrativa & Fichas Clínicas',
      logo: '/lawenmoll_logo.jpg',
      desc: 'Test de bienestar inteligente, cálculo metabólico y fichas de salud integrativa cifradas bajo altos estándares de ciberseguridad.',
      estado: 'Oficina Virtual Activa'
    },
    {
      id: 'wellness',
      nombre: 'Wellness Web App',
      subtitulo: 'Movimiento Adaptado & Pausa Activa',
      logo: '/logo_wellness.jpg',
      desc: 'Salas interactivas (Lotus, Cielo, Bosque, Raíz), rutinas de ejercicio sin impacto para sobrepeso/dolor articular y cocina demostrativa.',
      estado: 'En Construcción (Vista Previa)'
    },
    {
      id: 'bienestar',
      nombre: 'Sabiduría Ancestral / Bienestar',
      subtitulo: 'Comunidad & Fitoterapia Nativa',
      logo: '/LOGO_BIENESTAR.png',
      desc: 'Diario mural interactivo "Secretos de la Abuela", recetario herbolario nativo en PDF y orientación empática.',
      estado: 'En Construcción (Vista Previa)'
    }
  ];

  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans flex flex-col">
      {/* HEADER CON DESPLEGABLES DE NAVEGACION */}
      <header className="bg-[#FAF8F5] border-b border-[#97A884]/30 py-3.5 px-6 flex flex-wrap items-center justify-between shadow-sm sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <img src="/LOGO_asl.png" alt="ASL Ideas Logo" className="h-10 w-auto object-contain rounded-full border border-[#97A884]/40 bg-white p-0.5 shadow-sm" />
          <div className="flex flex-col">
            <span className="font-black text-base text-[#676E5E] leading-tight">ASL Ideas SpA</span>
            <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider">Salud Digital Inclusiva</span>
          </div>
        </div>

        {/* MENUS DESPLEGABLES */}
        <nav className="flex flex-wrap items-center space-x-3 my-2 sm:my-0">
          
          {/* DESPLEGABLE 1: INGRESAR A SALA */}
          <div className="relative">
            <button 
              onClick={() => { setOpenSalaMenu(!openSalaMenu); setOpenAgendaMenu(false); }}
              className="bg-[#52796F] hover:bg-[#676E5E] text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow flex items-center gap-1.5 transition"
            >
              <span>��� Ingresar a Sala ▾</span>
            </button>

            {openSalaMenu && (
              <div className="absolute left-0 mt-2 w-64 bg-[#FAF8F5] border-2 border-[#52796F] rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                <p className="text-[10px] font-black text-[#52796F] px-3 py-1 uppercase border-b border-[#97A884]/30">Selecciona una Sala Virtual:</p>
                {oficinas.map(of => (
                  <Link
                    key={of.id}
                    href={`/sala-virtual?app=${encodeURIComponent(of.nombre)}&logo=${encodeURIComponent(of.logo)}&tab=vivo`}
                    onClick={() => setOpenSalaMenu(false)}
                    className="flex items-center space-x-2 p-2 hover:bg-[#E6E7D5] rounded-xl transition text-xs font-bold text-[#676E5E]"
                  >
                    <img src={of.logo} alt="" className="w-6 h-6 rounded-full object-contain bg-white border border-[#97A884]" />
                    <span className="truncate">{of.nombre}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* DESPLEGABLE 2: AGENDA DE REUNIONES */}
          <div className="relative">
            <button 
              onClick={() => { setOpenAgendaMenu(!openAgendaMenu); setOpenSalaMenu(false); }}
              className="bg-[#97A884] hover:bg-[#676E5E] text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow flex items-center gap-1.5 transition"
            >
              <span>��� Agenda de Reuniones ▾</span>
            </button>

            {openAgendaMenu && (
              <div className="absolute left-0 mt-2 w-64 bg-[#FAF8F5] border-2 border-[#52796F] rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                <p className="text-[10px] font-black text-[#52796F] px-3 py-1 uppercase border-b border-[#97A884]/30">Agendar Hora en:</p>
                {oficinas.map(of => (
                  <Link
                    key={of.id}
                    href={`/sala-virtual?app=${encodeURIComponent(of.nombre)}&logo=${encodeURIComponent(of.logo)}&tab=cita`}
                    onClick={() => setOpenAgendaMenu(false)}
                    className="flex items-center space-x-2 p-2 hover:bg-[#E6E7D5] rounded-xl transition text-xs font-bold text-[#676E5E]"
                  >
                    <img src={of.logo} alt="" className="w-6 h-6 rounded-full object-contain bg-white border border-[#97A884]" />
                    <span className="truncate">{of.nombre}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/admin" className="bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] px-3.5 py-2 rounded-xl text-xs font-bold hover:bg-[#E6E7D5] transition">
            Administración ASL
          </Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="p-6 sm:p-10 max-w-7xl mx-auto w-full text-center space-y-4">
        <span className="bg-[#52796F] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow">
          Plataforma de Salud Digital Accesible & Ley TEA N° 21.545
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-[#676E5E] leading-tight max-w-3xl mx-auto">
          Ecosistema Inclusivo de Telemedicina y Oficinas Virtuales B2B
        </h1>
        <p className="text-xs sm:text-base text-[#52796F] max-w-2xl mx-auto font-medium">
          Selecciona una de las 4 Oficinas Virtuales para ingresar directamente a la videollamada interactiva en vivo, revisar la Ficha Oficial o agendar tu cita.
        </p>
      </section>

      {/* TARJETAS DE LAS 4 OFICINAS VIRTUALES */}
      <section className="p-6 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {oficinas.map(of => (
          <div key={of.id} className="bg-[#FAF8F5] p-6 rounded-3xl border-2 border-[#97A884]/40 shadow-xl flex flex-col justify-between space-y-4 hover:border-[#52796F] transition">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#97A884]/30 pb-3">
                <div className="flex items-center space-x-3">
                  <img src={of.logo} alt={of.nombre} className="w-12 h-12 object-contain rounded-full border-2 border-[#52796F] bg-white p-1 shadow-sm" />
                  <div>
                    <h3 className="font-black text-lg text-[#676E5E] leading-tight">{of.nombre}</h3>
                    <p className="text-xs font-bold text-[#52796F]">{of.subtitulo}</p>
                  </div>
                </div>
                <span className="bg-[#97A884]/20 text-[#52796F] text-[10px] font-extrabold px-2.5 py-1 rounded-md border border-[#97A884]/40">
                  {of.estado}
                </span>
              </div>
              <p className="text-xs text-[#676E5E] leading-relaxed">{of.desc}</p>
            </div>

            {/* BOTONES VINCULADOS DE CADA TARJETA */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <Link
                href={`/sala-virtual?app=${encodeURIComponent(of.nombre)}&logo=${encodeURIComponent(of.logo)}&tab=vivo`}
                className="flex-1 bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-extrabold py-3 px-4 rounded-xl shadow text-center transition flex items-center justify-center gap-1.5"
              >
                <span>��� Ingresar / Video Reunión</span>
              </Link>
              <Link
                href={`/sala-virtual?app=${encodeURIComponent(of.nombre)}&logo=${encodeURIComponent(of.logo)}&tab=cita`}
                className="flex-1 bg-[#FAF8F5] hover:bg-[#E6E7D5] border-2 border-[#52796F] text-[#52796F] text-xs font-extrabold py-3 px-4 rounded-xl shadow-xs text-center transition flex items-center justify-center gap-1.5"
              >
                <span>��� Agendar Cita</span>
              </Link>
            </div>
          </div>
        ))}
      </section>

      <footer className="bg-[#FAF8F5] border-t border-[#97A884]/30 py-4 px-6 text-center text-xs text-[#676E5E]/80">
        <p>© 2026 ASL Ideas SpA — Plataforma Integrativa B2B | Ley TEA N° 21.545 & Ley N° 21.663</p>
      </footer>
    </main>
  );
}
