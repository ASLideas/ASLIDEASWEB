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
      nombre: '1. Oficina ASL Ideas SpA',
      subtitulo: 'Casa Matriz, B2B e Innovación Inclusiva',
      logo: '/logo.png',
      oficinaNum: 'N° 1',
      leyes: ['Ley TEA (Ley 21.545)', 'Accesibilidad UI/UX'],
      descripcionCorta: 'Gestión corporativa, licencias de software accesible, convenios institucionales y consultoría en diseño cognitivo.',
      enConstruccion: false,
    },
    {
      id: 'lawenmoll-salud',
      nombre: '2. Oficina LAWENMOLL',
      subtitulo: 'Salud Integrativa & Fichas Clínicas SOAP',
      logo: '/lawenmoll_logo.jpg',
      oficinaNum: 'N° 2',
      leyes: ['Ley de Ciberseguridad (Ley 21.663)', 'Fichas Encriptadas'],
      descripcionCorta: 'Test de Bienestar Inteligente, composición metabólica, fichas clínicas protegidas y citas con terapeutas.',
      enConstruccion: false,
    },
    {
      id: 'wellness-web-app',
      nombre: '3. Oficina Wellness Web App',
      subtitulo: 'Movimiento Adaptado & Pausas Activas',
      logo: '/logo_wellness.jpg',
      oficinaNum: 'N° 3',
      leyes: ['Movimiento Sin Impacto', 'Salas Virtuales Interactivas'],
      descripcionCorta: 'Salas interactivas (Lotus, Cielo, Bosque, Raíz), ejercicios sin impacto y cocina demostrativa.',
      enConstruccion: false,
    },
    {
      id: 'sabiduria-ancestral',
      nombre: '4. Oficina Sabiduría Ancestral',
      subtitulo: 'Comunidad & Fitoterapia Nativa',
      logo: '/LOGO_BIENESTAR.png',
      oficinaNum: 'N° 4',
      leyes: ['Diario Mural Popular', 'Recetario Herbolario PDF'],
      descripcionCorta: 'Mural interactivo de consejos tradicionales, recetario nativo descargable en PDF y asistente empático.',
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
    <main className="min-h-screen bg-[#FAF8F5] text-[#2D6A4F] font-sans">
      {/* NAVEGACIÓN PRINCIPAL */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[#C8D8CE] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#52796F] flex items-center justify-center text-white font-extrabold text-lg shadow-md">
              ASL
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-[#2D6A4F]">ASL Ideas SpA</h1>
              <p className="text-[10px] text-[#52796F] font-semibold uppercase tracking-wider">
                Estrategia de Salud Digital Inclusiva
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleOpenPortal('asl-ideas-b2b')}
            className="bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold px-5 py-2.5 rounded-2xl transition shadow-md"
          >
            Agendamiento B2B / Demo
          </button>
        </div>
      </header>

      {/* HERO / BIENVENIDA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 text-center space-y-4">
        <span className="inline-block bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xs">
          Diseño Accesible • Neurodivergencia (TEA / TDAH) • Salud Integrativa
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-[#2D6A4F] leading-tight max-w-4xl mx-auto">
          Tecnología de Salud Humana, Amable e Inclusiva
        </h2>
        <p className="text-sm sm:text-base text-[#52796F] max-w-2xl mx-auto leading-relaxed">
          Plataforma de bienestar digital diseñada para reducir la sobrecarga sensorial, abordar enfermedades crónicas no transmisibles y promover el autocuidado consciente.
        </p>
      </section>

      {/* REJILLA DE LAS 4 OFICINAS VIRTUALES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h3 className="text-xl font-extrabold text-[#2D6A4F]">Ecosistema de Oficinas Virtuales</h3>
          <p className="text-xs text-[#52796F]">Haz clic en cualquiera de nuestros portales para ingresar o agendar una demostración</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portales.map((portal) => (
            <div
              key={portal.id}
              className="bg-white rounded-3xl border border-[#C8D8CE] p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-[#E8F0EC] text-[#2D6A4F] px-2.5 py-1 rounded-lg">
                    {portal.oficinaNum}
                  </span>
                  {portal.enConstruccion && (
                    <span className="text-[10px] font-bold bg-[#FFF3D6] text-[#B8860B] px-2.5 py-1 rounded-lg border border-[#FFE08A]">
                      En Avance
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-[#2D6A4F] leading-snug">{portal.nombre}</h4>
                <p className="text-xs font-semibold text-[#84A59D]">{portal.subtitulo}</p>
                <p className="text-xs text-[#52796F] leading-relaxed">{portal.descripcionCorta}</p>

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
                className="w-full bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3.5 rounded-2xl transition shadow-xs text-center mt-2 cursor-pointer"
              >
                {portal.enConstruccion ? 'Ver Avance / Portal Demo' : `Ingresar al Portal ${portal.oficinaNum}`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN DE CONTACTO Y CONVENIOS */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center space-y-6">
        <div className="bg-white rounded-3xl border-2 border-[#D4AF37] p-8 shadow-lg space-y-4">
          <h3 className="text-xl font-bold text-[#2D6A4F]">¿Eres una Empresa, Institución o Municipio?</h3>
          <p className="text-xs text-[#52796F] leading-relaxed max-w-xl mx-auto">
            Desarrollamos soluciones de software a medida con estándares de accesibilidad cognitiva (Ley TEA 21.545) y protección de datos clínicos (Ley 21.663).
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b')}
              className="bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-md"
            >
              Agendar Cita B2B / Demostración
            </button>
          </div>
        </div>
      </section>

      {/* PIE DE PÁGINA */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 text-center text-xs text-[#84A59D]">
        <p>© {new Date().getFullYear()} ASL Ideas SpA. Todos los derechos reservados. Tecnología de Salud Digital Inclusiva.</p>
      </footer>

      {/* MODAL DE AGENDAMIENTO / SALA VIRTUAL B2B */}
      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        portalData={currentPortalData}
      />
    </main>
  );
}