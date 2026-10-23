'use client';

import React, { useState } from 'react';
import SalaVirtualB2B, { PortalInfo } from '@/components/SalaVirtualB2B';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activePortalKey, setActivePortalKey] = useState<string>('asl');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);
  const [adminPass, setAdminPass] = useState<string>('');
  const [adminError, setAdminError] = useState<boolean>(false);

  // Datos de las 4 Oficinas Virtuales de ASL Ideas SpA
  const portalesData: Record<string, PortalInfo> = {
    asl: {
      id: 'asl',
      nombre: 'ASL Ideas SpA (Casa Matriz & B2B)',
      subtitulo: 'Innovación, Licencias y Accesibilidad UI/UX',
      logo: '/LOGO_asl.png',
      oficinaNum: 'Oficina Virtual 01',
      leyes: ['Ley TEA N° 21.545', 'Ley N° 21.663', 'Convenios B2B'],
      descripcionCorta: 'Gestión corporativa, licencias de software a medida y consultoría en accesibilidad cognitiva para instituciones.',
      descripcionLarga: 'Centro de mando corporativo donde se gestionan convenios B2B con municipalidades, empresas e instituciones de salud. Presenta métricas de impacto y comercializa soluciones de diseño inclusivo para personas neurodivergentes.',
      serviciosClave: [
        'Licencias de Software B2B & Convenios Institucionales',
        'Consultoría en Accesibilidad UI/UX (TEA / TDAH)',
        'Desarrollo de Software Médico y Preventivo',
        'Capacitación e Integración de Tecnologías Inclusivas'
      ],
      publicoObjetivo: 'Municipalidades, Empresas, Instituciones de Salud y Organizaciones'
    },
    lawenmoll: {
      id: 'lawenmoll',
      nombre: 'LAWENMOLL Salud Integrativa',
      subtitulo: 'Evaluación Metabólica y Fichas Clínicas Protegidas',
      logo: '/lawenmoll_logo.jpg',
      oficinaNum: 'Oficina Virtual 02',
      leyes: ['Ley N° 21.663 - Datos Protegidos', 'Ley TEA N° 21.545', 'Estándar SOAP'],
      descripcionCorta: 'Test de Bienestar Inteligente, composición metabólica y Fichas Clínicas encriptadas.',
      descripcionLarga: 'Plataforma clínica integrativa enfocada en la evaluación personalizada de la salud metabólica. Unifica la medicina preventiva con herramientas digitales que encriptan el historial clínico y conectan al paciente con especialistas.',
      serviciosClave: [
        'Test de Bienestar Inteligente',
        'Cálculo de Composición Corporal y Metabólica',
        'Fichas Clínicas Encriptadas (Ley N° 21.663)',
        'Atención con Especialistas y Terapeutas'
      ],
      publicoObjetivo: 'Pacientes con condiciones crónicas, adultos con sobrepeso y profesionales de la salud'
    },
    wellness: {
      id: 'wellness',
      nombre: 'Wellness Web App',
      subtitulo: 'Movimiento Adaptado & Salas Virtuales',
      logo: '/logo_wellness.jpg',
      oficinaNum: 'Oficina Virtual 03',
      leyes: ['Ejercicios Sin Impacto', 'Reducción de Cortisol', 'Salas Temáticas'],
      descripcionCorta: 'Salas virtuales interactivas, videoteca de ejercicios sin impacto y pausas activas.',
      descripcionLarga: 'Espacio enfocado en la activación física adaptada y la reducción del cortisol para personas con sobrepeso, dolor articular o sobrecarga urbana. Incluye salas temáticas (Lotus, Cielo, Bosque, Raíz) para entrenamiento guiado.',
      serviciosClave: [
        'Salas Virtuales Temáticas (Lotus, Cielo, Bosque, Raíz)',
        'Videoteca de Ejercicios Adaptados Sin Impacto',
        'Pausas Activas y Cocina Demostrativa',
        'Entrenamiento Guiado de Bajo Estrés'
      ],
      publicoObjetivo: 'Adultos con movilidad reducida, sobrepeso, dolor articular o estrés urbano'
    },
    sabiduria: {
      id: 'sabiduria',
      nombre: 'Bienestar & Sabiduría Ancestral',
      subtitulo: 'Comunidad & Fitoterapia Nativa',
      logo: '/LOGO_BIENESTAR.png',
      oficinaNum: 'Oficina Virtual 04',
      leyes: ['Herbolaria Nativa', 'Ley N° 21.663', 'Comunidad Inclusiva'],
      descripcionCorta: 'Diario Mural de "Secretos de la Abuela", recetario herbolario en PDF y Agente Virtual.',
      descripcionLarga: 'Portal dedicado a la preservación y divulgación de la herbolaria nativa y los remedios tradicionales de la cultura popular. Integra un mural de notas donde la comunidad comparte pautas familiares y fichas PDF descargables.',
      serviciosClave: [
        'Diario Mural Interactivo "Secretos de la Abuela"',
        'Recetario Herbolario Nativo Descargable (PDF)',
        'Agente Virtual de Conversación Empática',
        'Encuentros y Talleres Comunitarios'
      ],
      publicoObjetivo: 'Comunidad general, familias y personas interesadas en la medicina natural'
    }
  };

  const handleOpenPortal = (key: string) => {
    setActivePortalKey(key);
    setIsModalOpen(true);
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPass === 'asl2026' || adminPass === 'admin') {
      setIsAdminMode(true);
      setShowAdminLogin(false);
      setAdminError(false);
      setAdminPass('');
    } else {
      setAdminError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D6A4F] font-sans flex flex-col justify-between selection:bg-[#E8F0EC]">
      
      {/* HEADER SUPERIOR AMPLIO Y ELEGANTE */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-[#C8D8CE]/50 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white p-1.5 border border-[#C8D8CE] shadow-xs flex items-center justify-center overflow-hidden">
              <img 
                src="/LOGO_asl.png" 
                alt="ASL Ideas SpA Logo" 
                className="w-full h-full object-contain" 
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#2D6A4F]">ASL Ideas SpA</h1>
              <p className="text-xs text-[#52796F] font-medium">Ecosistema de Salud Digital Inclusiva & Accesibilidad</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdminMode ? (
              <span className="text-xs font-bold bg-[#D4AF37] text-white px-4 py-2 rounded-full shadow-xs">
                Modo Admin
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setShowAdminLogin(true)}
                className="text-xs font-bold text-[#2D6A4F] bg-[#E8F0EC] hover:bg-[#52796F] hover:text-white px-4 py-2 rounded-full border border-[#C8D8CE] transition shadow-xs"
              >
                Acceso Admin
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MODAL ADMIN */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 bg-[#2D6A4F]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl border border-[#D4AF37] shadow-2xl max-w-sm w-full space-y-5">
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-[#2D6A4F]">Autenticación Administrador</h3>
              <p className="text-xs text-[#52796F]">Ingresa la clave para activar la gestión B2B.</p>
            </div>
            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="Contraseña admin..."
                  className="w-full text-xs p-3.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#52796F] bg-[#FAF8F5]"
                  autoFocus
                />
                {adminError && (
                  <p className="text-[11px] text-[#D85260] font-bold mt-1.5 text-center">Contraseña incorrecta.</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3 rounded-xl transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3 rounded-xl transition shadow-xs"
                >
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL EN HOJA ARMÓNICA Y ESPACIOSA */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-16 flex-1 w-full">
        
        {/* HERO ESTRUCTURADO Y ARMÓNICO */}
        <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#C8D8CE]/60 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-3.5 py-1.5 rounded-full inline-block">
              Diseño Amable • Ley TEA N° 21.545 • Ley N° 21.663
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#2D6A4F] leading-tight">
              Ecosistema Integrativo de Salud Digital Inclusiva
            </h2>
            <p className="text-sm md:text-base text-[#52796F] leading-relaxed">
              Propuesta tecnológica concebida por <strong>ASL Ideas SpA</strong> para reducir la sobrecarga sensorial, unificar la evaluación metabólica y brindar una experiencia digital accesible, intuitiva y humana.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8F0EC]">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]/40">
              <h4 className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">01. Accesibilidad Cognitiva</h4>
              <p className="text-xs text-[#52796F] mt-1">Interfaces de baja carga sensorial pensadas para usuarios con TEA y TDAH.</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]/40">
              <h4 className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">02. Datos Encriptados</h4>
              <p className="text-xs text-[#52796F] mt-1">Fichas clínicas resguardadas bajo el estándar estricto de la Ley N° 21.663.</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]/40">
              <h4 className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">03. Salud Integrativa</h4>
              <p className="text-xs text-[#52796F] mt-1">Medicina preventiva, movimiento adaptado sin impacto y fitoterapia nativa.</p>
            </div>
          </div>
        </section>

        {/* SECCIÓN DE LAS 4 OFICINAS VIRTUALES CON ARQUITECTURA LIMPIA */}
        <section className="space-y-8">
          <div className="space-y-2 border-b border-[#C8D8CE]/60 pb-4">
            <h3 className="text-xl md:text-2xl font-bold text-[#2D6A4F]">Las 4 Oficinas Virtuales Interactivas</h3>
            <p className="text-xs md:text-sm text-[#52796F]">
              Haz clic en cualquier portal para acceder a la sala de trabajo en vivo, agendar reuniones o consultar documentos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.values(portalesData).map((portal) => (
              <div
                key={portal.id}
                className="bg-white rounded-3xl border border-[#C8D8CE]/70 hover:border-[#D4AF37] transition-all duration-200 shadow-xs hover:shadow-md p-8 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-5">
                  {/* LOGO EN CONTENEDOR AMPLIO CON OBJECT-CONTAIN */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-3.5 py-1 rounded-full">
                      {portal.oficinaNum}
                    </span>
                    <div className="w-16 h-16 rounded-2xl border border-[#C8D8CE]/80 p-2 bg-white shadow-xs flex items-center justify-center overflow-hidden">
                      <img 
                        src={portal.logo} 
                        alt={portal.nombre} 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-[#2D6A4F] group-hover:text-[#52796F] transition">
                      {portal.nombre}
                    </h4>
                    <p className="text-xs font-semibold text-[#84A59D] mt-0.5">{portal.subtitulo}</p>
                  </div>

                  <p className="text-xs md:text-sm text-[#52796F] leading-relaxed">{portal.descripcionCorta}</p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {portal.leyes.map((ley, i) => (
                      <span key={i} className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]/60">
                        {ley}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenPortal(portal.id)}
                  className="w-full bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3.5 rounded-2xl transition shadow-xs text-center"
                >
                  Ingresar a {portal.oficinaNum}
                </button>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* PIE DE PÁGINA LIMPIO Y ESPACIOSO */}
      <footer className="bg-[#52796F] text-white py-10 px-6 border-t-2 border-[#D4AF37] text-center space-y-3 mt-12">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="text-sm font-bold tracking-wide">ASL Ideas SpA — Salud Digital Inclusiva & Tecnología Amable</p>
          <p className="text-xs text-[#E8F0EC] max-w-2xl mx-auto leading-relaxed">
            Ecosistema desarrollado bajo el cumplimiento de la Ley N° 21.663 (Ciberseguridad y Protección de Datos Personales) y Ley N° 21.545 (Inclusión de Personas con Condición del Espectro Autista).
          </p>
        </div>
      </footer>

      {/* MODAL SALA VIRTUAL B2B */}
      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        portalData={portalesData[activePortalKey]}
        isAdmin={isAdminMode}
      />

    </div>
  );
}