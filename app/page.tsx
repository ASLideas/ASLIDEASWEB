'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [openSalaMenu, setOpenSalaMenu] = useState(false);
  const [openAgendaMenu, setOpenAgendaMenu] = useState(false);
  const [showSocialWidget, setShowSocialWidget] = useState(false);

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

  const whatsappDirecto = "[suspicious link removed].";

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

        {/* NAVEGACIÓN Y ACCESO DIRECTO A WHATSAPP */}
        <nav className="flex flex-wrap items-center space-x-3 my-2 sm:my-0">
          <div className="relative">
            <button 
              onClick={() => { setOpenSalaMenu(!openSalaMenu); setOpenAgendaMenu(false); }}
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
              onClick={() => { setOpenAgendaMenu(!openAgendaMenu); setOpenSalaMenu(false); }}
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

          <a
            href={whatsappDirecto}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#52796F] hover:bg-[#676E5E] text-white px-3.5 py-2.5 rounded-xl text-xs font-bold shadow transition"
          >
            WhatsApp Directo (+56 9 8330 2145)
          </a>

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

      {/* WIDGET FLOTANTE */}
      <div className="fixed bottom-6 right-6 z-50">
        {showSocialWidget && (
          <div className="bg-[#FAF8F5] border-2 border-[#52796F] rounded-3xl p-4 shadow-2xl mb-3 w-80 space-y-3 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex justify-between items-center border-b border-[#97A884]/30 pb-2">
              <span className="text-xs font-black text-[#676E5E]">Comunidad & Soporte Directo</span>
              <button onClick={() => setShowSocialWidget(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xs px-1">✕</button>
            </div>
            
            <a
              href={whatsappDirecto}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-extrabold p-2.5 rounded-xl text-center shadow-sm transition"
            >
              Enviar WhatsApp a +56 9 8330 2145
            </a>

            <div className="space-y-1.5 border-t border-[#97A884]/30 pt-2 max-h-60 overflow-y-auto pr-1">
              <p className="text-[10px] font-black text-[#52796F] uppercase">GRUPOS Y COMUNIDADES:</p>
              {oficinas.map(o => (
                <div key={o.id} className="bg-[#E6E7D5]/60 border border-[#97A884]/40 p-2 rounded-xl space-y-1">
                  <p className="text-[11px] font-black text-[#676E5E]">{o.nombre}</p>
                  <div className="flex gap-1.5">
                    <a href={o.whatsappGroup} target="_blank" rel="noreferrer" className="flex-1 bg-[#52796F] text-white text-[9px] font-bold py-1 px-2 rounded-md text-center">
                      WhatsApp
                    </a>
                    <a href={o.telegramGroup} target="_blank" rel="noreferrer" className="flex-1 bg-white border border-[#97A884] text-[#52796F] text-[9px] font-bold py-1 px-2 rounded-md text-center">
                      Telegram
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowSocialWidget(!showSocialWidget)}
          className="bg-[#52796F] hover:bg-[#676E5E] text-white px-5 py-3 rounded-full shadow-2xl font-black text-xs border-2 border-white transition flex items-center gap-2 transform hover:scale-105"
        >
          <span>Contacto WhatsApp & Redes</span>
        </button>
      </div>

      {/* FOOTER CON NÚMERO CLICKEABLE */}
      <footer className="bg-[#FAF8F5] border-t border-[#97A884]/30 py-6 px-6 text-center text-xs text-[#676E5E] space-y-3">
        <p className="font-bold text-[#52796F]">ASL Ideas SpA — Casa Matriz y Desarrollo B2B</p>
        <p className="max-w-xl mx-auto text-[11px] text-[#676E5E]">
          Estrategia de Salud Digital Inclusiva. Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencia y condiciones crónicas de salud.
        </p>

        <div className="bg-[#E6E7D5]/40 border border-[#97A884]/30 rounded-2xl p-4 max-w-lg mx-auto space-y-2">
          <p className="text-[10px] font-black text-[#52796F] uppercase tracking-wider">CONTACTO DIRECTO WHATSAPP:</p>
          <p className="font-extrabold text-sm">
            WhatsApp Corporativo: {' '}
            <a href={whatsappDirecto} target="_blank" rel="noreferrer" className="underline text-[#52796F] hover:text-[#676E5E]">
              +56 9 8330 2145
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
