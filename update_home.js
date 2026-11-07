const fs = require('fs');

const content = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [openSalaMenu, setOpenSalaMenu] = useState(false);
  const [openAgendaMenu, setOpenAgendaMenu] = useState(false);

  const oficinas = [
    {
      id: 'asl',
      numero: 'Oficina Virtual 01',
      nombre: 'Casa Matriz ASL Ideas SpA',
      subtitulo: 'Centro de innovación y gestión corporativa B2B en salud digital accesible.',
      tagDev: 'Desarrollador de App para PYMES',
      logo: '/LOGO_asl.png',
      bajada: 'Especialistas en desarrollo de software accesible a medida para municipalidades, empresas e instituciones de salud. Creamos vitrinas virtuales y entornos digitales amables con baja carga sensorial.',
      servicios: [
        'Licencias B2B de Software',
        'Vitrinas Virtuales PYME',
        'Consultoría UI/UX en Ley TEA',
        'Ley TEA N° 21.545',
        'Accesibilidad Cognitiva UI/UX'
      ],
      estado: 'Oficina Oficial Activa',
      enConstruccion: false
    },
    {
      id: 'lawenmoll',
      numero: 'Oficina Virtual 02',
      nombre: 'LAWENMOLL',
      subtitulo: 'Salud Integrativa y Fichas Clínicas Protegidas',
      bajada: 'Evaluación metabólica inteligente y gestión clínica encriptada de nivel médico.',
      logo: '/lawenmoll_logo.jpg',
      desc: 'Plataforma para el diagnóstico preventivo y acompañamiento en enfermedades crónicas no transmisibles. Permite realizar tests de composición metabólica, emisión de reportes y consultas con terapeutas.',
      servicios: [
        'Test de Bienestar Inteligente',
        'Fichas SOAP Encriptadas',
        'Telemedicina Integrativa'
      ],
      estado: 'Oficina Virtual Activa',
      enConstruccion: false
    },
    {
      id: 'wellness',
      numero: 'Oficina Virtual 03',
      nombre: 'Wellness Web App',
      subtitulo: 'Movimiento Adaptado y Pausas Activas',
      bajada: 'Salas virtuales en vivo y videoteca de entrenamiento adaptado sin impacto articular.',
      logo: '/logo_wellness.jpg',
      desc: 'Espacio enfocado en la reducción del cortisol urbano y la activación física amable. Diseñado para personas con sobrepeso, dolor articular o movilidad reducida mediante salas interactivas.',
      servicios: [
        'Salas Virtuales Temáticas',
        'Ejercicios Adaptados Sin Salto',
        'Cocina Demostrativa',
        'Movimiento Sin Impacto'
      ],
      estado: 'En Construcción',
      enConstruccion: true
    },
    {
      id: 'bienestar',
      numero: 'Oficina Virtual 04',
      nombre: 'Sabiduría Ancestral / Bienestar',
      subtitulo: 'Comunidad Inclusiva y Fitoterapia Nativa',
      bajada: 'Comunidad para la divulgación de medicina herbolaria nativa y secretos familiares.',
      logo: '/LOGO_BIENESTAR.png',
      desc: 'Portal interactivo dedicado a preservar y difundir los conocimientos tradicionales de fitoterapia chilena. Incluye diario mural colaborativo de la comunidad y descarga directa de recetarios en PDF.',
      servicios: [
        'Mensajería & Asistente Empático Virtual',
        'Diario Mural Popular',
        'Recetario Nativo PDF'
      ],
      estado: 'En Construcción',
      enConstruccion: true
    }
  ];

  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans flex flex-col">
      {/* HEADER DE NAVEGACION */}
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
                    href={\`/sala-virtual?app=\${encodeURIComponent(of.nombre)}&logo=\${encodeURIComponent(of.logo)}&tab=vivo\`}
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
                <p className="text-[10px] font-black text-[#52796F] px-3 py-1 uppercase border-b border-[#97A884]/30">Agendar Cita en:</p>
                {oficinas.map(of => (
                  <Link
                    key={of.id}
                    href={\`/sala-virtual?app=\${encodeURIComponent(of.nombre)}&logo=\${encodeURIComponent(of.logo)}&tab=cita\`}
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

      {/* HERO SECTION CON TEXTOS EXACTOS SOLICITADOS */}
      <section className="p-6 sm:p-10 max-w-7xl mx-auto w-full text-center space-y-4">
        <div className="inline-block">
          <span className="bg-[#52796F] text-white text-xs sm:text-sm font-black px-5 py-2 rounded-full uppercase tracking-wider shadow">
            Tecnología con Alma & Empatía | Baja Carga Sensorial (Ley TEA N° 21.545)
          </span>
        </div>
        
        <h1 className="text-2xl sm:text-4xl font-black text-[#676E5E] leading-tight max-w-4xl mx-auto">
          Desarrollo y soluciones accesibles para PYME y comercio asociado
        </h1>

        <p className="text-xs sm:text-base text-[#52796F] max-w-3xl mx-auto font-medium leading-relaxed">
          Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencia y condiciones crónicas de salud, unificando el sistema metabólico, el movimiento adaptado y la sabiduría preventiva. ASL Ideas SpA Casa Matriz es la creadora de las tres aplicaciones del ecosistema, desarrolladora de soluciones a medida para el emprendedor.
        </p>
      </section>

      {/* TARJETAS DE LAS 4 OFICINAS VIRTUALES CON CONTENIDOS Y BENEFICIOS CLAVE */}
      <section className="p-6 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {oficinas.map(of => (
          <div key={of.id} className="bg-[#FAF8F5] p-6 rounded-3xl border-2 border-[#97A884]/40 shadow-xl flex flex-col justify-between space-y-5 hover:border-[#52796F] transition">
            <div className="space-y-4">
              
              {/* CABECERA TARJETA */}
              <div className="flex items-start justify-between border-b border-[#97A884]/30 pb-3 gap-3">
                <div className="flex items-center space-x-3">
                  <img src={of.logo} alt={of.nombre} className="w-12 h-12 object-contain rounded-full border-2 border-[#52796F] bg-white p-1 shadow-sm shrink-0" />
                  <div>
                    <span className="text-[10px] font-black text-[#52796F] uppercase tracking-wider">{of.numero}</span>
                    <h3 className="font-black text-lg text-[#676E5E] leading-tight">{of.nombre}</h3>
                    <p className="text-xs font-bold text-[#52796F] mt-0.5">{of.subtitulo}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md border shrink-0 ${
                  of.enConstruccion 
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-[#97A884]/20 text-[#52796F] border-[#97A884]/40'
                }`}>
                  {of.estado}
                </span>
              </div>

              {/* TAG DESARROLLADOR PYMES (OFICINA 01) */}
              {of.tagDev && (
                <div className="bg-[#52796F]/10 border border-[#52796F]/30 p-2 rounded-xl text-center">
                  <span className="text-xs font-black text-[#52796F] uppercase">��� {of.tagDev}</span>
                </div>
              )}

              {/* BAJADA Y DESCRIPCION DETALLADA */}
              <div className="space-y-2">
                <p className="text-xs font-extrabold text-[#52796F]">{of.bajada}</p>
                {of.desc && <p className="text-xs text-[#676E5E] leading-relaxed">{of.desc}</p>}
              </div>

              {/* SERVICIOS Y MODULOS CLAVE / BENEFICIOS */}
              <div className="pt-1">
                <h4 className="text-xs font-black text-[#676E5E] mb-2 uppercase tracking-wide">Servicios y Módulos Clave:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {of.servicios.map((srv, idx) => (
                    <span key={idx} className="bg-white border border-[#97A884]/40 text-[#676E5E] text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-2xs">
                      • {srv}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* BOTONES VINCULADOS DE CADA TARJETA */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              <Link
                href={\`/sala-virtual?app=\${encodeURIComponent(of.nombre)}&logo=\${encodeURIComponent(of.logo)}&tab=vivo\`}
                className="flex-1 bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-extrabold py-3 px-4 rounded-xl shadow text-center transition flex items-center justify-center gap-1.5"
              >
                <span>��� Ingresar / Video Reunión</span>
              </Link>
              <Link
                href={\`/sala-virtual?app=\${encodeURIComponent(of.nombre)}&logo=\${encodeURIComponent(of.logo)}&tab=cita\`}
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
`;

fs.writeFileSync('app/page.tsx', content, 'utf8');
console.log('✅ app/page.tsx actualizado con encabezado y modulos exactos.');
