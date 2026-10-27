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
  descripcionLarga?: string;
  serviciosClave?: string[];
  beneficios?: string[];
  publicoObjetivo?: string;
  enConstruccion?: boolean;
}

export default function HomePage() {
  const [selectedPortalId, setSelectedPortalId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const portales: PortalItem[] = [
    {
      id: 'asl-ideas-b2b',
      nombre: 'ASL Ideas SpA',
      subtitulo: 'Casa Matriz • Desarrollo B2B & Licencias',
      logo: '/LOGO_asl.png',
      oficinaNum: 'Oficina Virtual 01',
      leyes: ['Ley TEA N° 21.545', 'Accesibilidad UI/UX'],
      descripcionCorta: 'Gestión corporativa, desarrollo de software accesible a medida, convenios institucionales y consultoría en diseño cognitivo.',
      enConstruccion: false,
    },
    {
      id: 'lawenmoll-salud',
      nombre: 'LAWENMOLL',
      subtitulo: 'Salud Integrativa & Fichas Protegidas',
      logo: '/lawenmoll_logo.jpg',
      oficinaNum: 'Oficina Virtual 02',
      leyes: ['Ley N° 21.663 - Datos de Salud', 'Estándar SOAP'],
      descripcionCorta: 'Test de Bienestar Inteligente, cálculo de composición metabólica, fichas clínicas encriptadas y citas con especialistas.',
      enConstruccion: false,
    },
    {
      id: 'wellness-web-app',
      nombre: 'Wellness Web App',
      subtitulo: 'Movimiento Adaptado & Pausas Activas',
      logo: '/logo_wellness.jpg',
      oficinaNum: 'Oficina Virtual 03',
      leyes: ['Sin Impacto Articular', 'Salas Interactivas'],
      descripcionCorta: 'Salas virtuales en vivo (Lotus, Cielo, Bosque, Raíz), ejercicios adaptados sin saltos y cocina demostrativa.',
      enConstruccion: false,
    },
    {
      id: 'sabiduria-ancestral',
      nombre: 'Sabiduría Ancestral',
      subtitulo: 'Comunidad Inclusiva & Fitoterapia',
      logo: '/LOGO_BIENESTAR.png',
      oficinaNum: 'Oficina Virtual 04',
      leyes: ['Diario Mural Popular', 'Recetario Nativo PDF'],
      descripcionCorta: 'Diario mural interactivo de "Secretos de la Abuela", recetario herbal descargable en PDF y asistente empático.',
      enConstruccion: true,
    },
  ];

  const handleOpenPortal = (id?: string) => {
    if (!id) return;
    setSelectedPortalId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPortalId(null);
  };

  const currentPortalData = portales.find((p) => p.id === selectedPortalId);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#2D6A4F] font-sans selection:bg-[#E8F0EC]">
      {/* BANNER DE LLAMADO B2B */}
      <div className="bg-[#FFF0F2] border-b border-[#FF8894] py-2.5 px-4 text-center shadow-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#D85260] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF8894] animate-pulse"></span>
            <span>Atención Municipalidades, PYMES e Instituciones: Muestra de Software Inclusivo</span>
          </div>
          <button
            type="button"
            onClick={() => handleOpenPortal('asl-ideas-b2b')}
            className="bg-[#2D6A4F] text-white text-[11px] px-3.5 py-1 rounded-lg font-bold hover:bg-[#1E3A2F] transition shadow-xs cursor-pointer"
          >
            Solicitar Demostración Virtual
          </button>
        </div>
      </div>

      {/* HEADER PRINCIPAL */}
      <header className="bg-white/90 backdrop-blur-md border-b-2 border-[#D4AF37] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#D4AF37] p-1 overflow-hidden shadow-xs flex items-center justify-center">
              <img src="/LOGO_asl.png" alt="Logo ASL Ideas" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-[#2D6A4F]">ASL Ideas SpA</h1>
              <p className="text-[10px] text-[#52796F] font-bold uppercase tracking-wider">
                Estrategia de Salud Digital Inclusiva
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b')}
              className="bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold px-5 py-2.5 rounded-2xl transition shadow-md cursor-pointer"
            >
              Agendamiento B2B / Demo
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION / RESEÑA FUNDACIONAL */}
      <section className="bg-white border-b border-[#C8D8CE] py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#C8D8CE]">
              Salud Digital Integrativa
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Cumplimiento Ley TEA & Ciberseguridad
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D6A4F] leading-tight">
            Tecnología Humana y Amable Diseñada para Reducir el Estrés Cognitivo
          </h2>
          <p className="text-sm text-[#52796F] max-w-2xl mx-auto leading-relaxed">
            Ecosistema de soluciones digitales desarrolladas bajo principios de baja carga sensorial, ideal para personas con neurodivergencias (TEA / TDAH), condiciones crónicas de salud y equipos de trabajo.
          </p>

          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-4 shadow-xs">
            <div className="border-l-4 border-[#FF8894] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">Reseña Fundacional</h3>
              <p className="text-xs text-gray-700 leading-relaxed mt-1">
                ASL Ideas SpA es fundada por una Diseñadora Gráfica con neurodivergencia (TEA Grado 1 y TDAH) y condiciones crónicas de salud. Su vivencia directa impulsa la creación de software amable que elimina la frustración, la sobrecarga sensorial y la fricción tecnológica.
              </p>
            </div>
            <div className="border-l-4 border-[#2D6A4F] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">Beneficios Estratégicos</h3>
              <ul className="text-xs text-gray-700 space-y-1 mt-1 list-disc list-inside">
                <li><strong>Accesibilidad Sensorial:</strong> Sin luces ni contrastes estridentes (#FAF8F5, #2D6A4F, #FF8894).</li>
                <li><strong>Muestra B2B de Software:</strong> Demostraciones listas para licencias institucionales.</li>
                <li><strong>Agendamiento B2B Directo:</strong> Coordinación fluida de reuniones de presentación.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* REJILLA DE LAS 4 OFICINAS VIRTUALES CON LOGOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8 space-y-1">
          <span className="text-xs font-bold text-[#D85260] uppercase tracking-wider bg-[#FFF0F2] px-3 py-1 rounded-full border border-[#FF8894]">
            Portales Interactivos
          </span>
          <h3 className="text-2xl font-extrabold text-[#2D6A4F] pt-2">Ecosistema de Oficinas Virtuales</h3>
          <p className="text-xs text-[#52796F]">Haz clic en cualquiera de nuestras aplicaciones para ingresar o agendar una demostración</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portales.map((portal) => (
            <div
              key={portal.id}
              className="bg-white rounded-3xl border border-[#C8D8CE] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-[#E8F0EC] text-[#2D6A4F] px-2.5 py-1 rounded-lg border border-[#C8D8CE]">
                    {portal.oficinaNum}
                  </span>
                  {portal.enConstruccion && (
                    <span className="text-[10px] font-bold bg-[#FFF3D6] text-[#B8860B] px-2.5 py-1 rounded-lg border border-[#FFE08A]">
                      En Avance
                    </span>
                  )}
                </div>

                {/* HEADER CON LOGO OFICIAL DE LA APLICACIÓN */}
                <div className="flex items-center space-x-3 pt-1">
                  <div className="w-12 h-12 rounded-full border-2 border-[#C8D8CE] p-0.5 overflow-hidden bg-white shrink-0 shadow-xs">
                    <img
                      src={portal.logo}
                      alt={`Logo ${portal.nombre}`}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-[#2D6A4F] leading-snug">{portal.nombre}</h4>
                    <p className="text-[10px] font-bold text-[#84A59D] uppercase tracking-wider">{portal.subtitulo}</p>
                  </div>
                </div>

                <p className="text-xs text-[#52796F] leading-relaxed pt-1">{portal.descripcionCorta}</p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {portal.leyes.map((ley, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-semibold bg-[#FAF8F5] text-[#52796F] border border-[#C8D8CE] px-2 py-0.5 rounded-md"
                    >
                      {ley}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenPortal(portal.id ?? '')}
                className="w-full bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold py-3.5 rounded-2xl transition shadow-xs text-center mt-2 cursor-pointer"
              >
                {portal.enConstruccion ? 'Ver Avance / Portal Demo' : `Ingresar al Portal`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN DE CONTACTOS CORPORATIVOS */}
      <section className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] shadow-sm space-y-6 text-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-3 py-1 rounded-full inline-block">
              Canales Oficiales B2B
            </span>
            <h3 className="text-xl font-bold text-[#2D6A4F] mt-2">Contacto Directo — ASL Ideas SpA</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-1">
              <span className="font-bold text-[#2D6A4F] block">Coordinación Virtual</span>
              <p className="text-[#52796F] font-bold">+56 9 6543 2109</p>
            </div>

            <div className="p-4 bg-[#FFF0F2] rounded-2xl border border-[#FF8894] space-y-1">
              <span className="font-bold text-[#D85260] block">Correo Oficial</span>
              <a href="mailto:contacto@aslideas.cl" className="text-[#D85260] font-bold underline truncate block">
                contacto@aslideas.cl
              </a>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-1">
              <span className="font-bold text-[#2D6A4F] block">Instagram</span>
              <p className="text-[#52796F] font-bold">@aslideas_salud</p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-1">
              <span className="font-bold text-[#2D6A4F] block">Ubicación</span>
              <p className="text-[#52796F]">Chile • Cobertura Nacional</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 text-center text-xs text-[#84A59D]">
        <p>© {new Date().getFullYear()} ASL Ideas SpA | Estrategia de Salud Digital Inclusiva. Muestra Tecnológica B2B.</p>
      </footer>

      {/* MODAL SALA VIRTUAL B2B */}
      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        portalData={currentPortalData}
      />
    </main>
  );
}
