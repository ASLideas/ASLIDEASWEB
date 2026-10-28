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
  const [modalInitialMode, setModalInitialMode] = useState<'agendar' | 'cancelar'>('agendar');

  const portales: PortalItem[] = [
    {
      id: 'asl-ideas-b2b',
      nombre: 'ASL Ideas SpA',
      subtitulo: 'Casa Matriz • Desarrollo B2B & Vitrinas PYME',
      logo: '/LOGO_asl.png',
      oficinaNum: 'Oficina Virtual 01',
      leyes: ['Ley TEA N° 21.545', 'Accesibilidad UI/UX'],
      descripcionCorta: 'Gestión corporativa, licencias de software accesible, desarrollo de vitrinas virtuales para PYMEs y convenios institucionales.',
      enConstruccion: false,
    },
    {
      id: 'lawenmoll-salud',
      nombre: 'LAWENMOLL',
      subtitulo: 'Salud Integrativa & Fichas Protegidas',
      logo: '/lawenmoll_logo.jpg',
      oficinaNum: 'Oficina Virtual 02',
      leyes: ['Ley N° 21.663 - Datos Clínicos', 'Estándar SOAP'],
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
      {/* BANNER DE VITRINAS PYME Y ACCESIBILIDAD */}
      <div className="bg-[#FFF0F2] border-b border-[#FF8894] py-2.5 px-4 text-center shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#D85260] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8894] animate-pulse"></span>
            <span>Impulso a PYMEs y Municipios: Espacios y Vitrinas Virtuales Inclusivas</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'agendar')}
              className="bg-[#2D6A4F] text-white text-[11px] px-3.5 py-1 rounded-lg font-bold hover:bg-[#1E3A2F] transition shadow-xs cursor-pointer"
            >
              ���️ Agendar Vitrina PYME
            </button>
            <a
              href="/admin"
              className="bg-[#D85260] text-white text-[11px] px-3.5 py-1 rounded-lg font-bold hover:bg-[#A8323E] transition shadow-xs cursor-pointer"
            >
              ⚙️ Administración
            </a>
          </div>
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
                Estrategia de Salud Digital & Vitrinas Inclusivas
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'agendar')}
              className="bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold px-4 py-2.5 rounded-2xl transition shadow-md cursor-pointer"
            >
              ���️ Agendamiento B2B
            </button>
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'cancelar')}
              className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] hover:bg-[#FF8894] hover:text-white text-xs font-bold px-3.5 py-2.5 rounded-2xl transition shadow-xs cursor-pointer"
            >
              ❌ Cancelar Cita
            </button>
            <a
              href="/admin"
              className="bg-white text-[#2D6A4F] border-2 border-[#D4AF37] hover:bg-[#FAF8F5] text-xs font-bold px-3.5 py-2.5 rounded-2xl transition shadow-xs"
            >
              ⚙️ Admin
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION / VITRINAS VIRTUALES PARA PYMES */}
      <section className="bg-white border-b border-[#C8D8CE] py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#C8D8CE]">
              Vitrinas Virtuales para PYMEs
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Ley TEA N° 21.545 & Ciberseguridad
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#2D6A4F] leading-tight">
            Damos Espacio a las PYMEs mediante Vitrinas Virtuales Accesibles
          </h2>
          <p className="text-sm sm:text-base text-[#52796F] max-w-3xl mx-auto leading-relaxed">
            Impulsamos la visibilidad de pequeñas y medianas empresas, instituciones y profesionales a través de espacios tecnológicos diseñados bajo principios de amabilidad cognitiva, baja carga sensorial y protección de datos clínicos.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'agendar')}
              className="bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold px-6 py-3.5 rounded-2xl transition shadow-md cursor-pointer"
            >
              Solicitar Demostración de Vitrina PYME
            </button>
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'cancelar')}
              className="bg-white text-[#D85260] border border-[#FF8894] hover:bg-[#FFF0F2] text-xs font-bold px-5 py-3.5 rounded-2xl transition shadow-xs cursor-pointer"
            >
              Gestionar / Cancelar Reserva
            </button>
          </div>
        </div>
      </section>

      {/* PROPUESTA DE VALOR: VITRINAS VIRTUALES */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-bold text-[#D85260] uppercase tracking-wider bg-[#FFF0F2] px-3.5 py-1 rounded-full border border-[#FF8894]">
            Enfoque Inclusivo B2B
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D6A4F]">
            ¿Por qué crear tu Vitrina Virtual con ASL Ideas SpA?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8F0EC] text-[#2D6A4F] flex items-center justify-center font-bold text-lg">
              ���
            </div>
            <h4 className="text-base font-bold text-[#2D6A4F]">Vitrinas para PYMEs</h4>
            <p className="text-xs text-[#52796F] leading-relaxed">
              Exhibición limpia y ordenada para servicios de salud, bienestar y emprendimiento local sin saturación ni elementos distractores.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FFF0F2] text-[#D85260] flex items-center justify-center font-bold text-lg">
              ���
            </div>
            <h4 className="text-base font-bold text-[#2D6A4F]">Baja Carga Sensorial</h4>
            <p className="text-xs text-[#52796F] leading-relaxed">
              Diseño adaptado para personas neurodivergentes (TEA y TDAH) que garantiza una navegación ágil, accesible y sin barreras cognitivas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E8F0EC] text-[#2D6A4F] flex items-center justify-center font-bold text-lg">
              ���
            </div>
            <h4 className="text-base font-bold text-[#2D6A4F]">Ciberseguridad Ley 21.663</h4>
            <p className="text-xs text-[#52796F] leading-relaxed">
              Fichas clínicas y datos corporativos protegidos mediante encriptación de estándar médico Ley 21.663.
            </p>
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
                onClick={() => handleOpenPortal(portal.id ?? '', 'agendar')}
                className="w-full bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold py-3.5 rounded-2xl transition shadow-xs text-center mt-2 cursor-pointer"
              >
                {portal.enConstruccion ? 'Ver Avance / Portal Demo' : `Ingresar al Portal`}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN DE RESEÑAS Y TESTIMONIOS */}
      <section className="bg-white border-y border-[#C8D8CE] py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider bg-[#E8F0EC] px-3.5 py-1 rounded-full border border-[#C8D8CE]">
              Comunidad & Testimonios
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D6A4F]">
              Reseñas de Nuestras Aplicaciones y Vitrinas PYME
            </h3>
            <p className="text-xs text-[#52796F]">Experiencias reales de emprendedores, profesionales de salud y usuarios</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            {/* RESEÑA 1 */}
            <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#C8D8CE] space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-[#D4AF37] font-bold text-sm">★★★★★</div>
                <p className="text-[#52796F] italic leading-relaxed">
                  "Tener una vitrina en ASL Ideas nos dio la visibilidad que necesitábamos en el municipio sin la abrumadora complejidad de otras webs."
                </p>
              </div>
              <div>
                <span className="font-bold text-[#2D6A4F] block">Francisca M.</span>
                <span className="text-[10px] text-[#84A59D] font-semibold">Emprendedora PYME Salud Natural</span>
              </div>
            </div>

            {/* RESEÑA 2 */}
            <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#C8D8CE] space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-[#D4AF37] font-bold text-sm">★★★★★</div>
                <p className="text-[#52796F] italic leading-relaxed">
                  "La ficha clínica en LAWENMOLL cumple rigurosamente la Ley 21.663 y el diseño con baja carga sensorial ayuda a que mis pacientes no se estresen al agendar."
                </p>
              </div>
              <div>
                <span className="font-bold text-[#2D6A4F] block">Dr. Roberto S.</span>
                <span className="text-[10px] text-[#84A59D] font-semibold">Médico Integrativo (LAWENMOLL)</span>
              </div>
            </div>

            {/* RESEÑA 3 */}
            <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#C8D8CE] space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-[#D4AF37] font-bold text-sm">★★★★★</div>
                <p className="text-[#52796F] italic leading-relaxed">
                  "Los ejercicios sin impacto y las pausas activas en salas virtuales cambiaron mi rutina diaria. Todo es sumamente amable e intuitivo."
                </p>
              </div>
              <div>
                <span className="font-bold text-[#2D6A4F] block">Camila T.</span>
                <span className="text-[10px] text-[#84A59D] font-semibold">Usuario Wellness Web App</span>
              </div>
            </div>

            {/* RESEÑA 4 */}
            <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#C8D8CE] space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="text-[#D4AF37] font-bold text-sm">★★★★★</div>
                <p className="text-[#52796F] italic leading-relaxed">
                  "El recetario nativo en PDF y el diario mural de remedios populares nos reconecta con nuestras tradiciones de forma segura."
                </p>
              </div>
              <div>
                <span className="font-bold text-[#2D6A4F] block">Sra. Elena R.</span>
                <span className="text-[10px] text-[#84A59D] font-semibold">Comunidad Sabiduría Ancestral</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN ADMINISTRACIÓN Y CANALES B2B */}
      <section className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <div className="bg-white p-8 rounded-3xl border-2 border-[#D4AF37] shadow-md space-y-6 text-center">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-3 py-1 rounded-full inline-block">
              Consola Corporativa
            </span>
            <h3 className="text-xl font-bold text-[#2D6A4F] mt-2">Administración de Contenidos & Citas</h3>
            <p className="text-xs text-[#52796F] max-w-xl mx-auto mt-1">
              Acceso exclusivo para coordinadores de ASL Ideas SpA, administradores de vitrinas PYME y especialistas.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/admin"
              className="bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-md"
            >
              ⚙️ Ingresar al Panel de Administración (/admin)
            </a>
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'cancelar')}
              className="bg-white text-[#D85260] border border-[#FF8894] hover:bg-[#FFF0F2] text-xs font-bold px-5 py-3 rounded-xl transition shadow-xs cursor-pointer"
            >
              ❌ Formulario de Cancelación de Agenda
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#C8D8CE] py-8 text-center text-xs text-[#84A59D] space-y-2">
        <p>© {new Date().getFullYear()} ASL Ideas SpA | Estrategia de Salud Digital & Vitrinas Inclusivas para PYMEs.</p>
        <div className="flex justify-center gap-4 text-[11px]">
          <a href="/admin" className="hover:underline font-bold text-[#2D6A4F]">Acceso Administración (/admin)</a>
          <span>•</span>
          <span>Cumplimiento Ley N° 21.545 & Ley N° 21.663</span>
        </div>
      </footer>

      {/* MODAL SALA VIRTUAL B2B */}
      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        portalData={currentPortalData}
        initialMode={modalInitialMode}
      />
    </main>
  );
}
