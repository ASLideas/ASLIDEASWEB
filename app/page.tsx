'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [openSalaMenu, setOpenSalaMenu] = useState(false);
  const [openAgendaMenu, setOpenAgendaMenu] = useState(false);
  const [openRedesMenu, setOpenRedesMenu] = useState(false);

  const oficinas = [
    {
      id: 'asl',
      numero: 'OFICINA VIRTUAL 01',
      nombre: 'ASL Ideas SpA',
      subtitulo: 'CASA MATRIZ - DESARROLLO B2B Y LICENCIAS INCLUSIVAS',
      subtitulo2: 'Centro de innovación y gestión corporativa B2B en salud digital accesible.',
      logo: '/logo-asl.png.png',
      desc: 'Especialistas en desarrollo de software accesible a medida para municipalidades, empresas e instituciones de salud. Creamos vitrinas virtuales y entornos digitales amables con baja carga sensorial.',
      servicios: [
        'Licencias B2B de Software',
        'Vitrinas Virtuales PYME',
        'Consultoría UI/UX en Ley TEA'
      ],
      pills: ['Ley TEA N° 21.545', 'Accesibilidad Cognitiva UI/UX'],
      estado: 'Oficina Oficial Activa',
      enConstruccion: false,
      whatsappGroup: 'https://chat.whatsapp.com/IKCKX6K1hnw1IitD9AP93P',
      telegramGroup: 'https://t.me/+67u2wG2cDM4yOTRh'
    },
    {
      id: 'lawenmoll',
      numero: 'OFICINA VIRTUAL 02',
      nombre: 'LAWENMOLL',
      subtitulo: 'SALUD INTEGRATIVA Y FICHAS CLÍNICAS PROTEGIDAS',
      subtitulo2: 'Evaluación metabólica inteligente y gestión clínica encriptada de nivel médico.',
      logo: '/logo-lawenmoll.jpg.png',
      desc: 'Plataforma para el diagnóstico preventivo y acompañamiento en enfermedades crónicas no transmisibles. Permite realizar tests de composición metabólica, emisión de reportes y consultas con terapeutas.',
      servicios: [
        'Test de Bienestar Inteligente',
        'Fichas SOAP Encriptadas',
        'Telemedicina Integrativa'
      ],
      pills: ['Ley N° 21.663 - Ciberseguridad', 'Ficha Clínica SOAP'],
      estado: 'Oficina Virtual Activa',
      enConstruccion: false,
      whatsappGroup: 'https://chat.whatsapp.com/HAKUT7sAlX85HYBeTLzJxm',
      telegramGroup: 'https://t.me/+HhPuj8YNd9kwYmJh'
    },
    {
      id: 'wellness',
      numero: 'OFICINA VIRTUAL 03',
      nombre: 'Wellness Web App',
      subtitulo: 'MOVIMIENTO ADAPTADO Y PAUSAS ACTIVAS',
      subtitulo2: 'Salas virtuales en vivo y videoteca de entrenamiento adaptado sin impacto articular.',
      logo: '/logo-wellness.jpg.jpg',
      desc: 'Espacio enfocado en la reducción del cortisol urbano y la activación física amable. Diseñado para personas con sobrepeso, dolor articular o movilidad reducida mediante salas interactivas.',
      servicios: [
        'Salas Virtuales Temáticas',
        'Ejercicios Adaptados Sin Salto',
        'Cocina Demostrativa'
      ],
      pills: ['Movimiento Sin Impacto', 'Salas Interactivas Temáticas'],
      estado: 'En Construcción',
      enConstruccion: true,
      whatsappGroup: 'https://chat.whatsapp.com/ECGCROQEupQ57vcRGYGgm',
      telegramGroup: 'https://t.me/+pUT4dOcKGoU4MzMx'
    },
    {
      id: 'bienestar',
      numero: 'OFICINA VIRTUAL 04',
      nombre: 'Sabiduría Ancestral / Bienestar',
      subtitulo: 'COMUNIDAD INCLUSIVA Y FITOTERAPIA NATIVA',
      subtitulo2: 'Comunidad para la divulgación de medicina herbolaria nativa y secretos familiares.',
      logo: '/logo-bienestar.png.png',
      desc: 'Portal interactivo dedicado a preservar y difundir los conocimientos tradicionales de fitoterapia chilena. Incluye diario mural colaborativo de la comunidad y descarga directa de recetarios en PDF.',
      servicios: [
        'Diario Mural Secretos de la Abuela',
        'Recetario Herbolario en PDF',
        'Asistente Empático Virtual'
      ],
      pills: ['Diario Mural Popular', 'Recetario Nativo PDF'],
      estado: 'En Construcción',
      enConstruccion: true,
      whatsappGroup: 'https://chat.whatsapp.com/CqwWcObsomN8yR5nHH67id',
      telegramGroup: 'https://t.me/+rDlYUfnP-JQwOWZh'
    }
  ];

  const redesSociales = [
    { 
      nombre: 'LinkedIn Corporativo', 
      url: '[suspicious link removed]',
      tipo: 'linkedin'
    },
    { 
      nombre: 'Instagram Oficial', 
      url: '[suspicious link removed]',
      tipo: 'instagram'
    },
    { 
      nombre: 'TikTok Salud Inclusiva', 
      url: '[suspicious link removed]',
      tipo: 'tiktok'
    },
    { 
      nombre: 'Canal de YouTube', 
      url: '[suspicious link removed]',
      tipo: 'youtube'
    },
    { 
      nombre: 'Comunidad en Facebook', 
      url: '[suspicious link removed]',
      tipo: 'facebook'
    }
  ];

  const renderIcono = (tipo) => {
    switch(tipo) {
      case 'linkedin':
        return (
          <svg className="w-4 h-4 fill-[#52796F] shrink-0" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.47 1.47 0 1 0 0 2.94 1.47 1.47 0 0 0 0-2.94Z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-4 h-4 fill-[#52796F] shrink-0" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'tiktok':
        return (
          <svg className="w-4 h-4 fill-[#52796F] shrink-0" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.31 1.56-1.3 2.56.02.82.4 1.61 1.07 2.09.83.62 1.96.77 2.94.46.99-.3 1.79-1.1 2.11-2.09.17-.5.23-1.04.22-1.57.02-4.71.01-9.42.01-14.13z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-4 h-4 fill-[#52796F] shrink-0" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-4 h-4 fill-[#52796F] shrink-0" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans flex flex-col relative">
      {/* HEADER PRINCIPAL */}
      <header className="bg-[#FAF8F5] border-b border-[#97A884]/30 py-4 px-6 flex flex-wrap items-center justify-between shadow-sm sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <img src="/logo-asl.png.png" alt="ASL Ideas Logo" className="h-14 w-auto object-contain rounded-full border-2 border-[#97A884]/40 bg-white p-1 shadow-sm" />
          <div className="flex flex-col">
            <span className="font-black text-lg text-[#676E5E] leading-tight">ASL Ideas SpA</span>
            <span className="text-xs font-bold text-[#52796F] uppercase tracking-wider">ESTRATEGIA DE SALUD DIGITAL INCLUSIVA</span>
          </div>
        </div>

        {/* NAVEGACIÓN Y MENÚS DESPLEGABLES */}
        <nav className="flex flex-wrap items-center space-x-3 my-2 sm:my-0">
          
          <div className="relative">
            <button 
              onClick={() => { setOpenSalaMenu(!openSalaMenu); setOpenAgendaMenu(false); setOpenRedesMenu(false); }}
              className="bg-[#676E5E] hover:bg-[#52796F] text-white px-4 py-2.5 rounded-xl text-xs font-extrabold shadow flex items-center gap-1.5 transition"
            >
              <span>Ingresar a Sala ▾</span>
            </button>

            {openSalaMenu && (
              <div className="absolute right-0 sm:left-0 mt-2 w-64 bg-[#FAF8F5] border-2 border-[#52796F] rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                <p className="text-[10px] font-black text-[#52796F] px-3 py-1 uppercase border-b border-[#97A884]/30">Selecciona una Sala Virtual:</p>
                {oficinas.map(of => (
                  <Link
                    key={of.id}
                    href={`/sala-virtual?app=${encodeURIComponent(of.nombre)}&logo=${encodeURIComponent(of.logo)}&tab=vivo`}
                    onClick={() => setOpenSalaMenu(false)}
                    className="flex items-center space-x-3 p-2 hover:bg-[#E6E7D5] rounded-xl transition text-xs font-bold text-[#676E5E]"
                  >
                    <img src={of.logo} alt="" className="w-8 h-8 rounded-full object-contain bg-white border border-[#97A884] p-0.5" />
                    <span className="truncate">{of.nombre}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => { setOpenAgendaMenu(!openAgendaMenu); setOpenSalaMenu(false); setOpenRedesMenu(false); }}
              className="bg-[#E6E7D5] hover:bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] px-4 py-2.5 rounded-xl text-xs font-extrabold shadow-xs flex items-center gap-1.5 transition"
            >
              <span>Agenda de Reuniones ▾</span>
            </button>

            {openAgendaMenu && (
              <div className="absolute right-0 sm:left-0 mt-2 w-64 bg-[#FAF8F5] border-2 border-[#52796F] rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                <p className="text-[10px] font-black text-[#52796F] px-3 py-1 uppercase border-b border-[#97A884]/30">Agendar Cita en:</p>
                {oficinas.map(of => (
                  <Link
                    key={of.id}
                    href={`/sala-virtual?app=${encodeURIComponent(of.nombre)}&logo=${encodeURIComponent(of.logo)}&tab=cita`}
                    onClick={() => setOpenAgendaMenu(false)}
                    className="flex items-center space-x-3 p-2 hover:bg-[#E6E7D5] rounded-xl transition text-xs font-bold text-[#676E5E]"
                  >
                    <img src={of.logo} alt="" className="w-8 h-8 rounded-full object-contain bg-white border border-[#97A884] p-0.5" />
                    <span className="truncate">{of.nombre}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* DESPLEGABLE DE REDES SOCIALES CON LOGOS SVG */}
          <div className="relative">
            <button 
              onClick={() => { setOpenRedesMenu(!openRedesMenu); setOpenSalaMenu(false); setOpenAgendaMenu(false); }}
              className="bg-[#52796F] hover:bg-[#676E5E] text-white px-4 py-2.5 rounded-xl text-xs font-extrabold shadow flex items-center gap-1.5 transition"
            >
              <span>Redes Sociales ▾</span>
            </button>

            {openRedesMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#FAF8F5] border-2 border-[#52796F] rounded-2xl shadow-2xl p-2 z-50 space-y-1">
                <p className="text-[10px] font-black text-[#52796F] px-3 py-1 uppercase border-b border-[#97A884]/30">Nuestras Redes:</p>
                {redesSociales.map((red, idx) => (
                  <a
                    key={idx}
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpenRedesMenu(false)}
                    className="flex items-center space-x-3 p-2 hover:bg-[#E6E7D5] rounded-xl transition text-xs font-bold text-[#676E5E]"
                  >
                    {renderIcono(red.tipo)}
                    <span>{red.nombre}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <Link href="/admin" className="bg-[#D97757] hover:bg-[#C86D51] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow transition">
            Administración ASL
          </Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="p-6 sm:p-10 max-w-7xl mx-auto w-full text-center space-y-4">
        <div className="inline-block">
          <span className="bg-[#FAF8F5] border border-[#97A884] text-[#52796F] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
            TECNOLOGÍA CON ALMA & EMPATÍA | BAJA CARGA SENSORIAL (LEY TEA N° 21.545)
          </span>
        </div>
        
        <h1 className="text-2xl sm:text-4xl font-black text-[#676E5E] leading-tight max-w-4xl mx-auto">
          Desarrollo y soluciones accesibles para PYME y comercio asociado
        </h1>

        <p className="text-xs sm:text-base text-[#52796F] max-w-3xl mx-auto font-medium leading-relaxed">
          Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencia y condiciones crónicas de salud, unificando el sistema metabólico, el movimiento adaptado y la sabiduría preventiva. ASL Ideas SpA Casa Matriz es la creadora de las tres aplicaciones del ecosistema, desarrolladora de soluciones a medida para el emprendedor.
        </p>
      </section>

      {/* TARJETAS DE LAS 4 OFICINAS VIRTUALES */}
      <section className="p-6 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {oficinas.map(of => (
          <div key={of.id} className="bg-[#FAF8F5] p-6 rounded-3xl border-2 border-[#97A884]/40 shadow-xl flex flex-col justify-between space-y-5 hover:border-[#52796F] transition">
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b border-[#97A884]/30 pb-4 gap-4">
                <div className="flex items-center space-x-4">
                  <img src={of.logo} alt={of.nombre} className="w-20 h-20 object-contain rounded-full border-2 border-[#52796F] bg-white p-1.5 shadow-md shrink-0" />
                  <div>
                    <span className="text-xs font-black text-[#52796F] uppercase tracking-wider">{of.numero}</span>
                    <h3 className="font-black text-xl text-[#676E5E] leading-tight">{of.nombre}</h3>
                    <p className="text-xs font-bold text-[#52796F] uppercase mt-0.5">{of.subtitulo}</p>
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

              <div className="space-y-2">
                <p className="text-xs font-extrabold text-[#52796F]">{of.subtitulo2}</p>
                <p className="text-xs text-[#676E5E] leading-relaxed">{of.desc}</p>
              </div>

              <div className="pt-1 space-y-1.5">
                <h4 className="text-[11px] font-black text-[#676E5E] uppercase tracking-wide">SERVICIOS Y MÓDULOS CLAVE:</h4>
                <ul className="text-xs text-[#676E5E] space-y-1 pl-1">
                  {of.servicios.map((srv, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 font-medium">
                      <span className="text-[#52796F] font-bold">•</span>
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {of.pills.map((pill, idx) => (
                  <span key={idx} className="bg-[#E6E7D5] text-[#52796F] border border-[#97A884]/60 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-2xs">
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 flex flex-col gap-2">
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/sala-virtual?app=${encodeURIComponent(of.nombre)}&logo=${encodeURIComponent(of.logo)}&tab=vivo`}
                  className="flex-1 bg-[#676E5E] hover:bg-[#52796F] text-white text-xs font-black py-3 px-4 rounded-2xl shadow text-center transition flex items-center justify-center"
                >
                  Ver Ficha / Ingresar
                </Link>
                <Link
                  href={`/sala-virtual?app=${encodeURIComponent(of.nombre)}&logo=${encodeURIComponent(of.logo)}&tab=cita`}
                  className="flex-1 bg-[#E6E7D5] hover:bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] text-xs font-black py-3 px-4 rounded-2xl shadow-xs text-center transition flex items-center justify-center"
                >
                  Agenda de Reuniones
                </Link>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href={of.whatsappGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#52796F] hover:bg-[#676E5E] text-white text-[11px] font-extrabold py-2 px-3 rounded-xl shadow-xs text-center transition flex items-center justify-center"
                >
                  Grupo WhatsApp
                </a>
                <a
                  href={of.telegramGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#FAF8F5] hover:bg-[#E6E7D5] border border-[#97A884] text-[#52796F] text-[11px] font-extrabold py-2 px-3 rounded-xl shadow-2xs text-center transition flex items-center justify-center"
                >
                  Canal Telegram
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER CON VÍNCULO AL GRUPO DE ASL IDEAS SPA */}
      <footer className="bg-[#FAF8F5] border-t border-[#97A884]/30 py-6 px-6 text-center text-xs text-[#676E5E] space-y-3">
        <p className="font-bold text-[#52796F]">ASL Ideas SpA — Casa Matriz y Desarrollo B2B</p>
        <p className="max-w-xl mx-auto text-[11px] text-[#676E5E]">
          Estrategia de Salud Digital Inclusiva. Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencia y condiciones crónicas de salud.
        </p>

        <div className="bg-[#E6E7D5]/40 border border-[#97A884]/30 rounded-2xl p-4 max-w-lg mx-auto space-y-2">
          <p className="text-[10px] font-black text-[#52796F] uppercase tracking-wider">CONTACTO DIRECTO WHATSAPP:</p>
          <p className="font-extrabold text-xs">
            WhatsApp Corporativo (Grupo Oficial):{' '}
            <a 
              href="https://chat.whatsapp.com/IKCKX6K1hnw1IitD9AP93P" 
              target="_blank" 
              rel="noreferrer" 
              className="underline text-[#52796F] hover:text-[#676E5E] font-black"
            >
              Unirse al Grupo ASL Ideas SpA
            </a>
          </p>
          <p className="text-[11px]">Correos: <span className="font-bold">contacto@aslideas.cl</span> | <span className="font-bold">contacto@lawenmoll.cl</span></p>
        </div>

        <div className="pt-2 text-[10px] text-[#52796F]">
          <Link href="/admin" className="hover:underline">Administración ASL (/admin)</Link> • <Link href="/sala-virtual" className="hover:underline">Sala Virtual (/sala-virtual)</Link>
        </div>
      </footer>
    </main>
  );
}
