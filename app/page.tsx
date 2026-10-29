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
  const [modalInitialMode, setModalInitialMode] = useState<'agendar' | 'cancelar' | 'videollamada'>('agendar');
  const [mostrarGuiaInstalacion, setMostrarGuiaInstalacion] = useState(false);

  const portales: PortalItem[] = [
    {
      id: 'asl-ideas-b2b',
      nombre: 'ASL Ideas SpA',
      subtitulo: 'Casa Matriz - Desarrollo B2B y Licencias Inclusivas',
      logo: '/logo-asl.png.png',
      oficinaNum: 'Oficina Virtual 01',
      leyes: ['Ley TEA N 21.545', 'Accesibilidad Cognitiva UI/UX'],
      descripcionCorta: 'Centro de innovacion y gestion corporativa B2B en salud digital accesible.',
      descripcionLarga: 'Especialistas en desarrollo de software accesible a medida para municipalidades, empresas e instituciones de salud. Creamos vitrinas virtuales y entornos digitales amables con baja carga sensorial.',
      serviciosClave: ['Licencias B2B de Software', 'Vitrinas Virtuales PYME', 'Consultoria UI/UX en Ley TEA'],
      beneficios: ['Entornos de baja carga sensorial', 'Integracion agil con Supabase', 'Cumplimiento normativo estricto'],
      enConstruccion: false,
    },
    {
      id: 'lawenmoll-salud',
      nombre: 'LAWENMOLL',
      subtitulo: 'Salud Integrativa y Fichas Clinicas Protegidas',
      logo: '/logo-lawenmoll.jpg.png',
      oficinaNum: 'Oficina Virtual 02',
      leyes: ['Ley N 21.663 - Ciberseguridad', 'Ficha Clinica SOAP'],
      descripcionCorta: 'Evaluacion metabolica inteligente y gestion clinica encriptada de nivel medico.',
      descripcionLarga: 'Plataforma para el diagnostico preventivo y acompanamiento en enfermedades cronicas no transmisibles. Permite realizar tests de composicion metabolica, emision de reportes y consultas con terapeutas.',
      serviciosClave: ['Test de Bienestar Inteligente', 'Fichas SOAP Encriptadas', 'Telemedicina Integrativa'],
      beneficios: ['Datos de salud protegidos (Ley N 21.663)', 'Seguimiento metabolico personalizado', 'Atencion personalizada sin estres'],
      enConstruccion: false,
    },
    {
      id: 'wellness-web-app',
      nombre: 'Wellness Web App',
      subtitulo: 'Movimiento Adaptado y Pausas Activas',
      logo: '/logo-wellness.jpg.jpg',
      oficinaNum: 'Oficina Virtual 03',
      leyes: ['Movimiento Sin Impacto', 'Salas Interactivas Tematicas'],
      descripcionCorta: 'Salas virtuales en vivo y videoteca de entrenamiento adaptado sin impacto articular.',
      descripcionLarga: 'Espacio enfocado en la reduccion del cortisol urbano y la activacion fisica amable. Disenado para personas con sobrepeso, dolor articular o movilidad reducida mediante salas interactivas.',
      serviciosClave: ['Salas Virtuales Tematicas', 'Ejercicios Adaptados Sin Salto', 'Cocina Demostrativa'],
      beneficios: ['Reduccion efectiva del cortisol', 'Entrenamiento amable sin lesiones', 'Videoteca 24/7 disponible'],
      enConstruccion: false,
    },
    {
      id: 'sabiduria-ancestral',
      nombre: 'Sabiduria Ancestral',
      subtitulo: 'Comunidad Inclusiva y Fitoterapia Nativa',
      logo: '/logo-bienestar.png.png',
      oficinaNum: 'Oficina Virtual 04',
      leyes: ['Diario Mural Popular', 'Recetario Nativo PDF'],
      descripcionCorta: 'Comunidad para la divulgacion de medicina herbolaria nativa y secretos familiares.',
      descripcionLarga: 'Portal interactivo dedicado a preservar y difundir los conocimientos tradicionales de fitoterapia chilena. Incluye diario mural colaborativo de la comunidad y descarga directa de recetarios en PDF.',
      serviciosClave: ['Diario Mural Secretos de la Abuela', 'Recetario Herbolario en PDF', 'Asistente Empatico Virtual'],
      beneficios: ['Rescate de tradiciones nativas', 'Material descargable ilustrado', 'Comunidad de apoyo sin juicios'],
      enConstruccion: true,
    },
  ];

  const handleOpenPortal = (id?: string, mode: 'agendar' | 'cancelar' | 'videollamada' = 'videollamada') => {
    setSelectedPortalId(id ?? 'asl-ideas-b2b');
    setModalInitialMode(mode);
    setIsModalOpen(true);
  };

  const currentPortalData = portales.find((p) => p.id === selectedPortalId);

  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans">
      <div className="bg-[#CDD6A9] border-b border-[#97A884] py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#676E5E] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC8D6C] animate-pulse"></span>
            <span>ASL Ideas SpA: Espacios y Vitrinas Virtuales Inclusivas (Ley TEA N 21.545)</span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/sala-virtual"
              className="bg-[#676E5E] text-white text-[11px] px-3.5 py-1 rounded-lg font-bold hover:bg-[#52584b] transition"
            >
              Sala de Video Reunion
            </Link>
            <Link
              href="/admin"
              className="bg-[#DC8D6C] text-white text-[11px] px-3.5 py-1 rounded-lg font-bold hover:bg-[#c37858] transition"
            >
              Admin ASL
            </Link>
          </div>
        </div>
      </div>

      <header className="bg-white/95 backdrop-blur-md border-b-2 border-[#E6C693] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#E6C693] p-0.5 overflow-hidden shadow-xs flex items-center justify-center">
              <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-[#676E5E]">ASL Ideas SpA</h1>
              <p className="text-[9px] text-[#97A884] font-bold uppercase tracking-wider">
                Estrategia de Salud Digital Inclusiva
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href="/sala-virtual"
              className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition"
            >
              Ingresar a Sala
            </Link>
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'agendar')}
              className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              Agenda Citas
            </button>
            <Link
              href="/admin"
              className="bg-[#DC8D6C] text-white border border-[#DC8D6C] hover:bg-[#c37858] text-xs font-bold px-3 py-1.5 rounded-xl transition"
            >
              Admin ASL
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section Humano y Empatico */}
      <section className="bg-white border-b-2 border-[#E6C693] py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-6">
          <span className="inline-block bg-[#CDD6A9] text-[#676E5E] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#97A884]">
            Tecnologia con Alma & Empatia | Baja Carga Sensorial (Ley TEA N 21.545)
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#676E5E] leading-tight">
            Desarrollo y soluciones accesibles para PYME y comercio asociado
          </h2>

          <p className="text-sm sm:text-base text-[#676E5E]/90 max-w-3xl mx-auto leading-relaxed font-medium bg-[#E6E7D5]/40 p-6 rounded-3xl border border-[#97A884]/40 shadow-xs">
            Desarrollamos soluciones tecnologicas amables disenadas por y para personas con neurodivergencia y condiciones cronicas de salud, unificando el sistema metabolico, el movimiento adaptado y la sabiduria preventiva. ASL Ideas SpA Casa Matriz es la creadora de las tres aplicaciones del ecosistema, desarrolladora de soluciones a medida para el emprendedor.
          </p>
        </div>
      </section>

      {/* Introduccion y Descarga de la Web App (PWA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl border-2 border-[#97A884] p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#97A884]/30 pb-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="bg-[#E6C693]/40 text-[#676E5E] text-xs font-bold px-3 py-1 rounded-full border border-[#E6C693] uppercase tracking-wider">
                Web App Accesible (PWA)
              </span>
              <h3 className="text-2xl font-black text-[#676E5E]">
                Lleva el Ecosistema ASL Ideas en tu Celular o Computador
              </h3>
              <p className="text-xs text-[#676E5E]/80 max-w-2xl leading-relaxed">
                Nuestra Web App esta optimizada para funcionar directamente desde cualquier navegador web (Chrome, Safari, Edge) sin ocupar espacio pesado en tu memoria y garantizando una experiencia fluida sin estres visual.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0 justify-center">
              <Link
                href="/sala-virtual"
                className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-5 py-3 rounded-2xl transition shadow-xs"
              >
                Abrir Web App Inclusiva
              </Link>
              <button
                type="button"
                onClick={() => setMostrarGuiaInstalacion(!mostrarGuiaInstalacion)}
                className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white text-xs font-bold px-4 py-3 rounded-2xl transition cursor-pointer"
              >
                {mostrarGuiaInstalacion ? 'Ocultar Guia' : 'Como instalar en tu Celular'}
              </button>
            </div>
          </div>

          {mostrarGuiaInstalacion && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#E6E7D5]/60 p-6 rounded-2xl border border-[#97A884] text-xs">
              <div className="space-y-2">
                <h4 className="font-extrabold text-[#676E5E] flex items-center gap-2">
                  <span>📱 Android (Google Chrome)</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-[#676E5E]/90">
                  <li>Abre esta pagina en Google Chrome.</li>
                  <li>Toca el menu de los 3 puntos (arriba a la derecha).</li>
                  <li>Selecciona <strong>Agregar a la pantalla principal</strong> o <strong>Instalar Aplicacion</strong>.</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-[#676E5E] flex items-center gap-2">
                  <span>🍎 iPhone / iPad (Safari)</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-[#676E5E]/90">
                  <li>Abre este enlace en Safari.</li>
                  <li>Toca el boton <strong>Compartir</strong> (cuadrado con flecha hacia arriba).</li>
                  <li>Desliza hacia abajo y elige <strong>Agregar a inicio</strong>.</li>
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
            Explora la funcionalidad y servicios de cada una de nuestras unidades tecnologicas.
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
                      En Avance
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
                    Servicios y Modulos Clave:
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
                  onClick={() => handleOpenPortal(portal.id, 'videollamada')}
                  className="flex-1 bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold py-3 rounded-2xl transition shadow-sm text-center cursor-pointer"
                >
                  Ingresar a Sala
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

      <footer className="bg-white border-t border-[#97A884]/30 py-6 text-center text-xs text-[#97A884] space-y-2">
        <p className="text-[#676E5E]">Copyright ASL Ideas SpA | Estrategia de Salud Digital y Vitrinas Inclusivas para PYMEs.</p>
        <div className="flex justify-center gap-4 text-[11px] px-4">
          <Link href="/admin" className="hover:underline font-bold text-[#676E5E]">Administracion (/admin)</Link>
          <span>-</span>
          <Link href="/sala-virtual" className="hover:underline font-bold text-[#676E5E]">Sala Virtual (/sala-virtual)</Link>
        </div>
      </footer>

      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        portalData={currentPortalData}
        initialMode={modalInitialMode}
      />
    </main>
  );
}
