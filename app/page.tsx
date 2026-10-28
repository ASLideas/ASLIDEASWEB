'use client';

import React, { useState } from 'react';
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
  const [modalInitialMode, setModalInitialMode] = useState<'agendar' | 'cancelar'>('agendar');

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
      beneficios: ['Datos de salud protegidos (Ley 21.663)', 'Seguimiento metabolico personalizado', 'Sin estres en la atencion'],
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
      descripcionLarga: 'Espacio enfocado en la reduccion del cortisol urbano y la activacion fisica amable. Disenado para personas con sobrepeso, dolor articular o movilidad reducida mediante salas interactivas (Lotus, Cielo, Bosque, Raiz).',
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
      descripcionLarga: 'Portal interactivo dedicado a preservar y difundir los conocimientos tradicionales de fitoterapia chilena. Incluye un diario mural colaborativo de la comunidad y descarga directa de recetarios en PDF.',
      serviciosClave: ['Diario Mural "Secretos de la Abuela"', 'Recetario Herbolario en PDF', 'Asistente Empatico Virtual'],
      beneficios: ['Rescate de tradiciones nativas', 'Material descargable ilustrado', 'Comunidad de apoyo sin juicios'],
      enConstruccion: true,
    },
  ];

  const handleOpenPortal = (id?: string, mode: 'agendar' | 'cancelar' = 'agendar') => {
    setSelectedPortalId(id ?? 'asl-ideas-b2b');
    setModalInitialMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPortalId(null);
  };

  const currentPortalData = portales.find((p) => p.id === selectedPortalId);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#2D6A4F] font-sans selection:bg-[#E8F0EC]">
      <div className="bg-[#FFF0F2] border-b border-[#FF8894] py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#D85260] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF8894] animate-pulse"></span>
            <span>Espacios y Vitrinas Virtuales Inclusivas para PYMEs y Municipios (Ley TEA N 21.545)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'agendar')}
              className="bg-[#2D6A4F] text-white text-[11px] px-3 py-1 rounded-lg font-bold hover:bg-[#1E3A2F] transition shadow-xs cursor-pointer"
            >
              Citas / Demo
            </button>
            <a
              href="/admin"
              className="bg-[#D85260] text-white text-[11px] px-3 py-1 rounded-lg font-bold hover:bg-[#A8323E] transition shadow-xs"
            >
              Admin
            </a>
          </div>
        </div>
      </div>

      <header className="bg-white/95 backdrop-blur-md border-b-2 border-[#D4AF37] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#D4AF37] p-0.5 overflow-hidden shadow-xs flex items-center justify-center">
              <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-[#2D6A4F]">ASL Ideas SpA</h1>
              <p className="text-[9px] text-[#52796F] font-bold uppercase tracking-wider">
                Estrategia de Salud Digital Inclusiva
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'agendar')}
              className="bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs cursor-pointer"
            >
              Agendar
            </button>
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'cancelar')}
              className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] hover:bg-[#FF8894] hover:text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs cursor-pointer"
            >
              Cancelar
            </button>
            <a
              href="/admin"
              className="bg-white text-[#2D6A4F] border border-[#D4AF37] hover:bg-[#FAF8F5] text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs"
            >
              Admin
            </a>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-[#C8D8CE] py-10 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider border border-[#C8D8CE]">
              Salud Digital Integrativa
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Baja Carga Sensorial (TEA / TDAH)
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D6A4F] leading-tight">
            Ecosistema de Soluciones Tecnologicas Amables
          </h2>
          <p className="text-sm text-[#52796F] max-w-2xl mx-auto leading-relaxed">
            Plataformas especializadas en salud integrativa, movimiento adaptado, vitrinas virtuales para PYMEs y preservacion del bienestar popular.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#D85260] uppercase tracking-wider bg-[#FFF0F2] px-3.5 py-1 rounded-full border border-[#FF8894]">
            Plataformas Oficiales
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#2D6A4F]">
            Nuestras 4 Oficinas Virtuales y Aplicaciones
          </h3>
          <p className="text-xs text-[#52796F] max-w-xl mx-auto">
            Explora las funcionalidades, servicios clave y beneficios de cada una de nuestras herramientas digitales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portales.map((portal) => (
            <div
              key={portal.id}
              className="bg-white rounded-3xl border-2 border-[#C8D8CE] hover:border-[#D4AF37] p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl border-2 border-[#D4AF37] p-1 overflow-hidden bg-white shrink-0 shadow-sm flex items-center justify-center">
                      <img
                        src={portal.logo}
                        alt={`Logo ${portal.nombre}`}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-[#E8F0EC] text-[#2D6A4F] px-2.5 py-0.5 rounded-md border border-[#C8D8CE]">
                        {portal.oficinaNum}
                      </span>
                      <h4 className="text-xl font-black text-[#2D6A4F] leading-snug mt-1">{portal.nombre}</h4>
                      <p className="text-xs font-bold text-[#84A59D] uppercase tracking-wider">{portal.subtitulo}</p>
                    </div>
                  </div>

                  {portal.enConstruccion && (
                    <span className="text-[10px] font-bold bg-[#FFF3D6] text-[#B8860B] px-2.5 py-1 rounded-lg border border-[#FFE08A] shrink-0">
                      En Avance
                    </span>
                  )}
                </div>

                <div className="space-y-2 border-t border-[#FAF8F5] pt-3">
                  <p className="text-xs font-semibold text-[#2D6A4F] leading-relaxed">
                    {portal.descripcionCorta}
                  </p>
                  <p className="text-xs text-[#52796F] leading-relaxed">
                    {portal.descripcionLarga}
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F] block">
                    Servicios y Modulos Clave:
                  </span>
                  <ul className="text-xs text-[#52796F] space-y-1 list-disc list-inside">
                    {portal.serviciosClave.map((serv, idx) => (
                      <li key={idx} className="font-medium">{serv}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {portal.leyes.map((ley, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-2.5 py-1 rounded-lg"
                    >
                      {ley}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#C8D8CE] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenPortal(portal.id ?? '', 'agendar')}
                  className="flex-1 bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold py-3 rounded-2xl transition shadow-sm text-center cursor-pointer"
                >
                  {portal.enConstruccion ? 'Ver Avance / Demo' : `Ingresar a ${portal.nombre}`}
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenPortal(portal.id ?? '', 'agendar')}
                  className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] hover:bg-[#FF8894] hover:text-white text-xs font-bold px-3 py-3 rounded-2xl transition shadow-xs cursor-pointer shrink-0"
                  title="Agendar Cita B2B"
                >
                  Cita
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-[#C8D8CE] py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#D85260] uppercase tracking-wider bg-[#FFF0F2] px-3.5 py-1 rounded-full border border-[#FF8894]">
              Vitrinas Virtuales B2B
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D6A4F]">
              Espacio y Difusion para PYMEs e Instituciones
            </h3>
            <p className="text-xs text-[#52796F] max-w-2xl mx-auto">
              Brindamos vitrinas digitales optimizadas para que emprendedores de la salud y el bienestar exhiban sus productos y servicios sin barreras tecnologicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <h4 className="font-bold text-[#2D6A4F]">Vitrinas Digitales PYME</h4>
              <p className="text-[#52796F] leading-relaxed">
                Catalogos web interactivos y limpios para dar visibilidad comercial directa en entornos municipales e institucionales.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <h4 className="font-bold text-[#2D6A4F]">Diseno Inclusivo Ley TEA</h4>
              <p className="text-[#52796F] leading-relaxed">
                Navegacion predecible y paletas relajantes que garantizan la inclusion de personas con TEA Grado 1 y TDAH.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <h4 className="font-bold text-[#2D6A4F]">Ciberseguridad Ley 21.663</h4>
              <p className="text-[#52796F] leading-relaxed">
                Infraestructura encriptada para el resguardo de informacion confidencial, usuarios y atenciones clinicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-[#C8D8CE] py-6 text-center text-xs text-[#84A59D] space-y-2">
        <p>© {new Date().getFullYear()} ASL Ideas SpA | Estrategia de Salud Digital y Vitrinas Inclusivas para PYMEs.</p>
        <div className="flex justify-center gap-4 text-[11px]">
          <a href="/admin" className="hover:underline font-bold text-[#2D6A4F]">Administracion (/admin)</a>
          <span>-</span>
          <span>Ley N 21.545 y Ley N 21.663</span>
        </div>
      </footer>

      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        portalData={currentPortalData}
        initialMode={modalInitialMode}
      />
    </main>
  );
}
