'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export interface PortalItem {
  id: string;
  nombre: string;
  subtitulo: string;
  logo: string;
  oficinaNum: string;
  leyes: string[];
  descripcionCorta: string;
  descripcionLarga: string;
  serviciosClave: string[];
  beneficios: string[];
  enConstruccion?: boolean;
}

export default function HomePage() {
  const [selectedPortalId, setSelectedPortalId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInitialMode, setModalInitialMode] = useState<'ficha' | 'videollamada' | 'agendar' | 'cancelar'>('ficha');
  const [mostrarGuiaInstalacion, setMostrarGuiaInstalacion] = useState(false);
  const [cargandoDescarga, setCargandoDescarga] = useState(false);

  const [dropdownSalasOpen, setDropdownSalasOpen] = useState(false);
  const [dropdownCitasOpen, setDropdownCitasOpen] = useState(false);

  const portales: PortalItem[] = [
    {
      id: 'asl-ideas-b2b',
      nombre: 'ASL Ideas SpA',
      subtitulo: 'Casa Matriz - Desarrollo B2B y Licencias Inclusivas',
      logo: '/logo-asl.png.png',
      oficinaNum: 'Oficina Virtual 01',
      leyes: ['Ley TEA N° 21.545', 'Accesibilidad Cognitiva UI/UX'],
      descripcionCorta: 'Centro de innovación y gestión corporativa B2B en salud digital accesible.',
      descripcionLarga: 'Especialistas en desarrollo de software accesible a medida para municipalidades, empresas e instituciones de salud. Creamos vitrinas virtuales y entornos digitales amables con baja carga sensorial.',
      serviciosClave: ['Licencias B2B de Software', 'Vitrinas Virtuales PYME', 'Consultoría UI/UX en Ley TEA'],
      beneficios: ['Entornos de baja carga sensorial', 'Integración ágil con Supabase', 'Cumplimiento normativo estricto'],
      enConstruccion: false,
    },
    {
      id: 'lawenmoll-salud',
      nombre: 'LAWENMOLL',
      subtitulo: 'Salud Integrativa y Fichas Clínicas Protegidas',
      logo: '/logo-lawenmoll.jpg.png',
      oficinaNum: 'Oficina Virtual 02',
      leyes: ['Ley N° 21.663 - Ciberseguridad', 'Ficha Clínica SOAP'],
      descripcionCorta: 'Evaluación metabólica inteligente y gestión clínica encriptada de nivel médico.',
      descripcionLarga: 'Plataforma para el diagnóstico preventivo y acompañamiento en enfermedades crónicas no transmisibles. Permite realizar tests de composición metabólica, emisión de reportes y consultas con terapeutas.',
      serviciosClave: ['Test de Bienestar Inteligente', 'Fichas SOAP Encriptadas', 'Telemedicina Integrativa'],
      beneficios: ['Datos de salud protegidos (Ley N° 21.663)', 'Seguimiento metabólico personalizado', 'Atención personalizada sin estrés'],
      enConstruccion: false,
    },
    {
      id: 'wellness-web-app',
      nombre: 'Wellness Web App',
      subtitulo: 'Movimiento Adaptado y Pausas Activas',
      logo: '/logo-wellness.jpg.jpg',
      oficinaNum: 'Oficina Virtual 03',
      leyes: ['Movimiento Sin Impacto', 'Salas Interactivas Temáticas'],
      descripcionCorta: 'Salas virtuales en vivo y videoteca de entrenamiento adaptado sin impacto articular.',
      descripcionLarga: 'Espacio enfocado en la reducción del cortisol urbano y la activación física amable. Diseñado para personas con sobrepeso, dolor articular o movilidad reducida mediante salas interactivas.',
      serviciosClave: ['Salas Virtuales Temáticas', 'Ejercicios Adaptados Sin Salto', 'Cocina Demostrativa'],
      beneficios: ['Reducción efectiva del cortisol', 'Entrenamiento amable sin lesiones', 'Videoteca 24/7 disponible'],
      enConstruccion: true,
    },
    {
      id: 'sabiduria-ancestral',
      nombre: 'Sabiduría Ancestral / Bienestar',
      subtitulo: 'Comunidad Inclusiva y Fitoterapia Nativa',
      logo: '/logo-bienestar.png.png',
      oficinaNum: 'Oficina Virtual 04',
      leyes: ['Diario Mural Popular', 'Recetario Nativo PDF'],
      descripcionCorta: 'Comunidad para la divulgación de medicina herbolaria nativa y secretos familiares.',
      descripcionLarga: 'Portal interactivo dedicado a preservar y difundir los conocimientos tradicionales de fitoterapia chilena. Incluye diario mural colaborativo de la comunidad y descarga directa de recetarios en PDF.',
      serviciosClave: ['Diario Mural Secretos de la Abuela', 'Recetario Herbolario en PDF', 'Asistente Empático Virtual'],
      beneficios: ['Rescate de tradiciones nativas', 'Material descargable ilustrado', 'Comunidad de apoyo sin juicios'],
      enConstruccion: true,
    },
  ];

  const handleOpenPortal = (id?: string, mode: 'ficha' | 'videollamada' | 'agendar' | 'cancelar' = 'ficha') => {
    setSelectedPortalId(id ?? 'asl-ideas-b2b');
    setModalInitialMode(mode);
    setIsModalOpen(true);
    setDropdownSalasOpen(false);
    setDropdownCitasOpen(false);
  };

  const simularDescargaCarga = (id: string) => {
    setCargandoDescarga(true);
    setTimeout(() => {
      setCargandoDescarga(false);
      handleOpenPortal(id, 'ficha');
    }, 1200);
  };

  const currentPortalData = portales.find((p) => p.id === selectedPortalId);

  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans">
      
      {/* Encabezado Principal Ajustado para Móviles (Sin Banner Superior) */}
      <header className="bg-white/95 backdrop-blur-md border-b-2 border-[#E6C693] sticky top-0 z-40 shadow-xs py-2 px-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Identificación de la Marca */}
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border-2 border-[#E6C693] p-0.5 overflow-hidden shadow-xs flex items-center justify-center shrink-0">
              <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-tight text-[#676E5E] leading-none">ASL Ideas SpA</h1>
              <p className="text-[8px] sm:text-[9px] text-[#97A884] font-bold uppercase tracking-wider mt-0.5">
                Estrategia de Salud Digital Inclusiva
              </p>
            </div>
          </div>

          {/* Línea Única de Botones (Limpia y Responsive) */}
          <div className="flex items-center justify-center flex-wrap sm:flex-nowrap gap-1.5 sm:gap-2 w-full sm:w-auto relative">
            
            {/* Botón Desplegable 1: Ingresar a Sala */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setDropdownSalasOpen(!dropdownSalasOpen); setDropdownCitasOpen(false); }}
                className="bg-[#676E5E] hover:bg-[#52584b] text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <span>Ingresar a Sala</span>
                <span className="text-[9px]">v</span>
              </button>

              {dropdownSalasOpen && (
                <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-60 sm:w-64 bg-white rounded-2xl border-2 border-[#97A884] shadow-xl py-2 z-50 text-xs">
                  <p className="px-3 py-1 font-bold text-[10px] text-[#97A884] uppercase tracking-wider border-b border-[#E6E7D5]">
                    Selecciona una Sala Virtual:
                  </p>
                  {portales.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleOpenPortal(p.id, 'ficha')}
                      className="w-full text-left px-3 py-2 hover:bg-[#CDD6A9]/30 text-[#676E5E] font-medium flex items-center gap-2 border-b border-[#E6E7D5]/50 last:border-0 cursor-pointer"
                    >
                      <img src={p.logo} alt="" className="w-5 h-5 object-contain rounded-md border border-[#97A884]" />
                      <div className="truncate">
                        <p className="font-bold text-[11px]">{p.nombre}</p>
                        {p.enConstruccion && <span className="text-[8px] text-[#DC8D6C] font-semibold">(En Construcción)</span>}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botón Desplegable 2: Agenda de Reuniones */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setDropdownCitasOpen(!dropdownCitasOpen); setDropdownSalasOpen(false); }}
                className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <span>Agenda de Reuniones</span>
                <span className="text-[9px]">v</span>
              </button>

              {dropdownCitasOpen && (
                <div className="absolute right-0 mt-2 w-60 sm:w-64 bg-white rounded-2xl border-2 border-[#97A884] shadow-xl py-2 z-50 text-xs">
                  <p className="px-3 py-1 font-bold text-[10px] text-[#97A884] uppercase tracking-wider border-b border-[#E6E7D5]">
                    Agendar Cita en:
                  </p>
                  {portales.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleOpenPortal(p.id, 'agendar')}
                      className="w-full text-left px-3 py-2 hover:bg-[#CDD6A9]/30 text-[#676E5E] font-medium flex items-center gap-2 border-b border-[#E6E7D5]/50 last:border-0 cursor-pointer"
                    >
                      <img src={p.logo} alt="" className="w-5 h-5 object-contain rounded-md border border-[#97A884]" />
                      <div className="truncate">
                        <p className="font-bold text-[11px]">{p.nombre}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botón Administrador ASL */}
            <Link
              href="/admin"
              className="bg-[#DC8D6C] text-white border border-[#DC8D6C] hover:bg-[#c37858] text-[10px] sm:text-xs font-bold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl transition shadow-xs text-center"
            >
              Administración ASL
            </Link>

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b-2 border-[#E6C693] py-10 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-5">
          <span className="inline-block bg-[#CDD6A9] text-[#676E5E] text-[10px] sm:text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-[#97A884]">
            Tecnología con Alma & Empatía | Baja Carga Sensorial (Ley TEA N° 21.545)
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#676E5E] leading-tight">
            Desarrollo y soluciones accesibles para PYME y comercio asociado
          </h2>

          <p className="text-xs sm:text-base text-[#676E5E]/90 max-w-3xl mx-auto leading-relaxed font-medium bg-[#E6E7D5]/40 p-5 sm:p-6 rounded-3xl border border-[#97A884]/40 shadow-xs">
            Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencia y condiciones crónicas de salud, unificando el sistema metabólico, el movimiento adaptado y la sabiduría preventiva. ASL Ideas SpA Casa Matriz es la creadora de las tres aplicaciones del ecosistema, desarrolladora de soluciones a medida para el emprendedor.
          </p>
        </div>
      </section>

      {/* Sección Descarga / Carga Web App */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl border-2 border-[#97A884] p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#97A884]/30 pb-6">
            
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-2xl border-2 border-[#E6C693] p-1 overflow-hidden bg-white shrink-0 shadow-md flex items-center justify-center relative">
                <img
                  src="/logo-asl.png.png"
                  alt="Logo ASL Ideas Web App"
                  className={`w-full h-full object-contain ${cargandoDescarga ? 'animate-pulse' : ''}`}
                />
              </div>
              <div className="space-y-1 text-left">
                <span className="bg-[#E6C693]/40 text-[#676E5E] text-xs font-bold px-3 py-0.5 rounded-full border border-[#E6C693] uppercase tracking-wider inline-block">
                  Ecosistema de Salud Alternativa PWA
                </span>
                <h3 className="text-xl font-black text-[#676E5E]">
                  Lleva el Ecosistema ASL Ideas en tu Celular o Computador
                </h3>
                <p className="text-xs text-[#676E5E]/80 max-w-xl leading-relaxed">
                  Abre o descarga de forma independiente o conjunta LAWENMOLL, Wellness Web App y Sabiduría Ancestral directamente desde tu navegador web.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 shrink-0 justify-center">
              <button
                type="button"
                onClick={() => simularDescargaCarga('lawenmoll-salud')}
                className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-4 py-2.5 rounded-2xl transition shadow-xs cursor-pointer"
              >
                Abrir LAWENMOLL
              </button>
              <button
                type="button"
                onClick={() => simularDescargaCarga('wellness-web-app')}
                className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-4 py-2.5 rounded-2xl transition shadow-xs cursor-pointer"
              >
                Abrir Wellness Web App
              </button>
              <button
                type="button"
                onClick={() => setMostrarGuiaInstalacion(!mostrarGuiaInstalacion)}
                className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white text-xs font-bold px-4 py-2.5 rounded-2xl transition shadow-xs cursor-pointer"
              >
                {mostrarGuiaInstalacion ? 'Ocultar Guía' : '¿Cómo descargar e instalar?'}
              </button>
            </div>
          </div>

          {cargandoDescarga && (
            <div className="p-4 bg-[#E6E7D5] rounded-2xl border border-[#97A884] text-center space-y-2">
              <img src="/logo-asl.png.png" alt="Cargando..." className="w-10 h-10 mx-auto object-contain animate-spin" />
              <p className="text-xs font-bold text-[#676E5E]">Cargando Web App Accesible... Espere un momento.</p>
            </div>
          )}

          {mostrarGuiaInstalacion && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#E6E7D5]/60 p-6 rounded-2xl border border-[#97A884] text-xs">
              <div className="space-y-2">
                <h4 className="font-extrabold text-[#676E5E]">Celular Android / Google Chrome</h4>
                <ol className="list-decimal list-inside space-y-1 text-[#676E5E]/90">
                  <li>Abre esta web en Google Chrome.</li>
                  <li>Presiona los 3 puntos superiores del navegador.</li>
                  <li>Selecciona <strong>Agregar a la pantalla principal</strong> o <strong>Instalar aplicación</strong>. Podrás bajar cada una o las tres aplicaciones.</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-[#676E5E]">iPhone / iPad o Computador</h4>
                <ol className="list-decimal list-inside space-y-1 text-[#676E5E]/90">
                  <li>En iPhone (Safari): Toca el botón <strong>Compartir</strong> y elige <strong>Agregar a inicio</strong>.</li>
                  <li>En Computador (Chrome/Edge): Haz clic en el ícono de instalar en la barra de direcciones.</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#DC8D6C] uppercase tracking-wider bg-white px-3.5 py-1 rounded-full border border-[#DC8D6C]">
            Plataformas Oficiales
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#676E5E]">
            Nuestras 4 Oficinas Virtuales y Aplicaciones
          </h3>
          <p className="text-xs text-[#676E5E]/80 max-w-xl mx-auto">
            Explora la funcionalidad y servicios de cada una de nuestras unidades tecnológicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portales.map((portal) => (
            <div
              key={portal.id}
              className="bg-white rounded-3xl border-2 border-[#97A884] hover:border-[#E6C693] p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl border-2 border-[#E6C693] p-1 overflow-hidden bg-white shrink-0 shadow-sm flex items-center justify-center">
                      <img
                        src={portal.logo}
                        alt={`Logo ${portal.nombre}`}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-md border border-[#97A884]">
                        {portal.oficinaNum}
                      </span>
                      <h4 className="text-xl font-black text-[#676E5E] leading-snug mt-1">{portal.nombre}</h4>
                      <p className="text-xs font-bold text-[#97A884] uppercase tracking-wider">{portal.subtitulo}</p>
                    </div>
                  </div>

                  {portal.enConstruccion && (
                    <span className="text-[10px] font-bold bg-[#E6C693]/30 text-[#676E5E] px-2.5 py-1 rounded-lg border border-[#E6C693] shrink-0">
                      En Construcción
                    </span>
                  )}
                </div>

                <div className="space-y-2 border-t border-[#E6E7D5] pt-3">
                  <p className="text-xs font-semibold text-[#676E5E] leading-relaxed">
                    {portal.descripcionCorta}
                  </p>
                  <p className="text-xs text-[#676E5E]/80 leading-relaxed">
                    {portal.descripcionLarga}
                  </p>
                </div>

                <div className="bg-[#E6E7D5] p-4 rounded-2xl border border-[#97A884]/40 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#676E5E] block">
                    Servicios y Módulos Clave:
                  </span>
                  <ul className="text-xs text-[#676E5E] space-y-1 list-disc list-inside">
                    {portal.serviciosClave.map((serv, idx) => (
                      <li key={idx} className="font-medium">{serv}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {portal.leyes.map((ley, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold bg-[#CDD6A9] text-[#676E5E] border border-[#97A884] px-2.5 py-1 rounded-lg"
                    >
                      {ley}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#97A884]/30 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenPortal(portal.id, 'ficha')}
                  className="flex-1 bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold py-3 rounded-2xl transition shadow-sm text-center cursor-pointer"
                >
                  Ver Ficha / Ingresar
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenPortal(portal.id, 'agendar')}
                  className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white text-xs font-bold px-4 py-3 rounded-2xl transition shadow-xs cursor-pointer shrink-0 font-extrabold"
                >
                  Agenda de Reuniones
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pie de Página */}
      <footer className="bg-white border-t-2 border-[#E6C693] py-8 text-center text-xs text-[#676E5E] space-y-4">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <p className="font-extrabold text-sm text-[#676E5E]">ASL Ideas SpA — Casa Matriz y Desarrollo B2B</p>
          <p className="text-xs text-[#676E5E]/80 max-w-2xl mx-auto leading-relaxed">
            Estrategia de Salud Digital Inclusiva. Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencia y condiciones crónicas de salud.
          </p>

          <div className="bg-[#E6E7D5]/70 p-4 rounded-2xl border border-[#97A884]/50 max-w-xl mx-auto space-y-2 text-xs">
            <p className="font-bold uppercase text-[10px] text-[#97A884] tracking-wider">Contactos Oficiales:</p>
            <p className="font-medium">Teléfono / WhatsApp: <a href="[suspicious link removed]" target="_blank" rel="noopener noreferrer" className="font-bold underline text-[#676E5E]">+56 9 8330 2145</a></p>
            <p className="font-medium">Correos: <a href="mailto:contacto@aslideas.cl" className="underline font-bold">contacto@aslideas.cl</a> | <a href="mailto:contacto@lawenmoll.cl" className="underline font-bold">contacto@lawenmoll.cl</a></p>
            <p className="text-[10px] text-[#97A884] italic">(Próximamente se agregarán los correos de las demás aplicaciones a medida que estén listas)</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-[11px] pt-2 font-bold text-[#676E5E]">
            <Link href="/admin" className="hover:underline">Administración ASL (/admin)</Link>
            <span>•</span>
            <Link href="/sala-virtual" className="hover:underline">Sala Virtual (/sala-virtual)</Link>
            <span>•</span>
            <span className="text-[#97A884]">Natural Wellness & Bienestar: En Construcción</span>
          </div>

          <p className="text-[10px] text-[#97A884] pt-2">© 2026 ASL Ideas SpA. Todos los derechos reservados. Cumplimiento Ley TEA N° 21.545 y Ley N° 21.663.</p>
        </div>
      </footer>

      {/* Modal de Sala Virtual */}
      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        portalData={currentPortalData}
        initialMode={modalInitialMode}
      />
    </main>
  );
}