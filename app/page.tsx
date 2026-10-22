'use client';

import React, { useState } from 'react';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activePortal, setActivePortal] = useState<string>('asl');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [showAdminLogin, setShowAdminLogin] = useState<boolean>(false);
  const [adminPass, setAdminPass] = useState<string>('');
  const [adminError, setAdminError] = useState<boolean>(false);

  // Información estructurada de los 4 Portales Interactivos
  const portalesData: Record<string, {
    id: string;
    nombre: string;
    subtitulo: string;
    logo: string;
    oficinaNum: string;
    leyes: string[];
    descripcionCorta: string;
    descripcionLarga: string;
    serviciosClave: string[];
    publicoObjetivo: string;
  }> = {
    asl: {
      id: 'asl',
      nombre: 'Casa Matriz ASL Ideas SpA',
      subtitulo: 'Desarrollo B2B, Licencias y Accesibilidad Cognitiva UI/UX',
      logo: '/LOGO_asl.png',
      oficinaNum: 'Oficina Virtual 01',
      leyes: ['Ley TEA N° 21.545', 'Convenios Marco B2B'],
      descripcionCorta: 'Gestión corporativa, desarrollo de software a medida, licencias B2B, convenios municipales y consultoría en accesibilidad cognitiva UI/UX.',
      descripcionLarga: 'Centro de mando corporativo e innovación tecnológica. Desarrollamos software a medida e interfaces amables para instituciones públicas, municipalidades y comercios asociados, garantizando accesibilidad sensorial y cognitiva para personas neurodivergentes.',
      serviciosClave: [
        'Licencias de Software Inclusivo B2B',
        'Consultoría UI/UX para Ley TEA N° 21.545',
        'Convenios Municipales y Comercio Asociado',
        'Plataformas Accesibles para PYMES'
      ],
      publicoObjetivo: 'Empresas, Municipalidades, Centros de Salud y PYMES'
    },
    lawenmoll: {
      id: 'lawenmoll',
      nombre: 'LAWENMOLL Salud Integrativa',
      subtitulo: 'Evaluación Metabólica y Fichas Clínicas Protegidas',
      logo: '/lawenmoll_logo.jpg',
      oficinaNum: 'Oficina Virtual 02',
      leyes: ['Ley N° 21.663 - Datos Protegidos', 'Estándar SOAP'],
      descripcionCorta: 'Test de Bienestar Inteligente, composición metabólica, Fichas Clínicas encriptadas bajo Ley N° 21.663 y consulta con especialistas.',
      descripcionLarga: 'Plataforma clínica integrativa enfocada en la evaluación personalizada de la salud metabólica. Unifica la medicina preventiva con herramientas digitales que encriptan el historial clínico y conectan al paciente con especialistas de la salud.',
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
      subtitulo: 'Movimiento Adaptado, Pausas Activas y Cocina Demostrativa',
      logo: '/logo_wellness.jpg',
      oficinaNum: 'Oficina Virtual 03',
      leyes: ['Pausas Activas Laborales', 'Ergonomía Digital'],
      descripcionCorta: 'Movimiento adaptado sin impacto, pausas activas para el trabajo remoto, salas virtuales interactivas y cocina demostrativa.',
      descripcionLarga: 'Portal dedicado a la activación física consciente y reducción del cortisol urbano. Ofrece rutinas de ejercicio adaptadas sin impacto articular, salas de transmisión temáticas (Lotus, Cielo, Bosque, Raíz) y módulos de nutrición demostrativa.',
      serviciosClave: [
        'Ejercicios de Bajo Impacto Articular',
        'Pausas Activas para Empresas y Trabajo Remoto',
        'Salas Virtuales Temáticas Interactivas',
        'Módulos de Nutrición y Cocina Saludable'
      ],
      publicoObjetivo: 'Trabajadores remotos, personas con movilidad reducida y adultos mayores'
    },
    bienestar: {
      id: 'bienestar',
      nombre: 'Bienestar App',
      subtitulo: 'Comunidad, Herbolaria Nativa y Descanso Consciente',
      logo: '/LOGO_BIENESTAR.png',
      oficinaNum: 'Oficina Virtual 04',
      leyes: ['Fitoterapia Nativa', 'Preservación Patrimonial'],
      descripcionCorta: 'Red de comunidad, recetario herbolario nativo en PDF, seguimiento de hábitos saludables, fitoterapia tradicional y descanso consciente.',
      descripcionLarga: 'Espacio comunitario para la revalorización de la sabiduría herbolaria ancestral y los hábitos de bienestar cotidianos. Incluye un mural interactivo de pautas familiares, recetarios descargables en PDF y el Módulo Morfeo para la higiene del sueño.',
      serviciosClave: [
        'Recetario Herbolario Nativo Descargable en PDF',
        'Módulo Morfeo (Higiene del Sueño y Descanso)',
        'Diario Mural Comunitario de Secretos de la Abuela',
        'Seguimiento Intuitivo de Hábitos Diarios'
      ],
      publicoObjetivo: 'Comunidad general, familias y buscadores de fitoterapia nativa'
    }
  };

  const handleOpenPortal = (portalKey: string) => {
    setActivePortal(portalKey);
    setIsModalOpen(true);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
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
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D6A4F] font-sans flex flex-col justify-between">
      
      {/* BARRA SUPERIOR DE NAVEGACION */}
      <header className="bg-[#52796F] text-white border-b-4 border-[#D4AF37] p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white p-1 border-2 border-[#D4AF37] overflow-hidden flex items-center justify-center shadow-xs">
              <img src="/LOGO_asl.png" alt="ASL Ideas SpA" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white">ASL Ideas SpA</h1>
              <p className="text-xs text-[#E8F0EC]">Estrategia de Salud Digital Inclusiva y Accesibilidad UI/UX</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleOpenPortal('asl')}
              className="bg-[#D4AF37] hover:bg-[#B08D4B] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs"
            >
              Agendar Cita B2B
            </button>

            {/* BOTON DE ACCESO ADMINISTRADOR */}
            {isAdminMode ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenPortal('lawenmoll')}
                  className="bg-[#D85260] hover:bg-[#FF8894] text-white text-xs font-bold px-3 py-2 rounded-xl transition shadow-xs"
                >
                  Sala Virtual Telemedicina (Admin)
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdminMode(false)}
                  className="bg-black/30 hover:bg-black/50 text-white text-[10px] font-bold px-2.5 py-2 rounded-xl"
                >
                  Cerrar Admin
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAdminLogin(true)}
                className="bg-[#52796F] hover:bg-[#2D6A4F] text-[#FAF8F5] text-[11px] font-bold px-3 py-2 rounded-xl border border-[#D4AF37]/50 transition shadow-xs"
              >
                Acceso Administrador
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MODAL LOGIN ADMINISTRADOR */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-3xl border-2 border-[#D4AF37] max-w-sm w-full space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-[#2D6A4F] text-center">Acceso Privado Administrador</h3>
            <p className="text-xs text-[#52796F] text-center">
              Ingresa la clave de administración para acceder a la Sala Virtual Telemedicina.
            </p>
            <form onSubmit={handleAdminLogin} className="space-y-3">
              <input
                type="password"
                placeholder="Contraseña (asl2026)"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]"
              />
              {adminError && (
                <p className="text-[11px] text-[#D85260] font-bold text-center">Contraseña incorrecta. Intenta nuevamente.</p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  className="flex-1 bg-gray-100 text-gray-700 text-xs font-bold py-2.5 rounded-xl hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2D6A4F]"
                >
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 flex-1 w-full">
        
        {/* BANNER INSTITUCIONAL CON TEXTO EXACTO */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#C8D8CE] shadow-sm text-center space-y-3">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-3 py-1 rounded-full">
              Ley TEA N° 21.545 - Accesibilidad Cognitiva
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-3 py-1 rounded-full">
              Ley N° 21.663 - Datos de Salud Protegidos
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-[#2D6A4F]">
            Desarrollamos Soluciones Accesibles para PYMES y Comercio Asociado
          </h2>

          <p className="text-xs md:text-sm text-[#52796F] max-w-3xl mx-auto leading-relaxed">
            Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencias y condiciones crónicas de salud, unificando la ciencia metabólica, el movimiento adaptado y la sabiduría preventiva.
          </p>
        </section>

        {/* SECCION EXTENSA: QUE ES ASL IDEAS SPA */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#D4AF37] shadow-md space-y-6">
          <div className="border-b border-[#E8F0EC] pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D85260] bg-[#FFF0F2] border border-[#FF8894] px-3 py-1 rounded-full inline-block mb-2">
              Historia Fundacional y Propósito Corporativo
            </span>
            <h3 className="text-lg md:text-xl font-bold text-[#2D6A4F]">
              ¿Qué es ASL Ideas SpA y cuál es su Propósito Integrativo?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-[#52796F]">
            <div className="space-y-3 bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE]">
              <h4 className="font-bold text-[#2D6A4F] text-sm">Historia Fundacional y Perspectiva Única</h4>
              <p>
                ASL Ideas SpA nace de una vivencia real: fue fundada por una Diseñadora Gráfica de 47 años con neurodivergencia —Condición del Espectro Autista (TEA Grado 1) y Trastorno por Déficit de Atención e Hiperactividad (TDAH)—, quien vive cotidianamente con enfermedades crónicas no transmisibles y sobrepeso.
              </p>
              <p>
                Esta perspectiva aporta un conocimiento empírico de las fricciones, el estrés urbano y la sobrecarga sensorial que generan las aplicaciones médicas convencionales.
              </p>
            </div>

            <div className="space-y-3 bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE]">
              <h4 className="font-bold text-[#2D6A4F] text-sm">El Propósito Central y Principios UI/UX</h4>
              <p>
                Demostrar que existen múltiples posibilidades integrativas para abordar afecciones crónicas y elevar la calidad de vida mediante interfaces amables e intuitivas.
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-[11px]">
                <li><strong>Reducción de Sobrecarga Sensorial:</strong> Paletas suaves (#FAF8F5, #52796F y #84A59D).</li>
                <li><strong>Claridad Cognitiva (TDAH/TEA):</strong> Navegación lineal y microinteracciones previsibles.</li>
                <li><strong>Empatía y Dignidad:</strong> Lenguaje libre de juicios punitivos.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* GRILLA DE LAS 4 OFICINAS VIRTUALES CON LOGOS VISIBLES */}
        <section className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F] bg-[#E8F0EC] px-3 py-1 rounded-full">
              Ecosistema de Portales Interactivos
            </span>
            <h3 className="text-lg font-bold text-[#2D6A4F]">Acceso a las 4 Oficinas Virtuales</h3>
            <p className="text-xs text-[#52796F]">Haz clic en cualquiera de las oficinas para ingresar a su portal descriptivo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* OFICINA 1: CASA MATRIZ B2B */}
            <div className="bg-white p-6 rounded-3xl border-2 border-[#C8D8CE] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-2.5 py-1 rounded-full">
                    Oficina Virtual 01
                  </span>
                  <div className="w-14 h-14 rounded-full bg-white p-1 border-2 border-[#D4AF37] overflow-hidden flex items-center justify-center shadow-xs">
                    <img src="/LOGO_asl.png" alt="Logo ASL Ideas" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-[#2D6A4F]">Casa Matriz ASL Ideas SpA</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Gestión corporativa, desarrollo de software a medida, licencias B2B, convenios municipales y consultoría en accesibilidad cognitiva UI/UX.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenPortal('asl')}
                className="w-full bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3 rounded-xl transition shadow-xs text-center"
              >
                Ingresar al Portal B2B
              </button>
            </div>

            {/* OFICINA 2: LAWENMOLL */}
            <div className="bg-white p-6 rounded-3xl border-2 border-[#C8D8CE] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-2.5 py-1 rounded-full">
                    Oficina Virtual 02
                  </span>
                  <div className="w-14 h-14 rounded-full bg-white p-1 border-2 border-[#D4AF37] overflow-hidden flex items-center justify-center shadow-xs">
                    <img src="/lawenmoll_logo.jpg" alt="Logo Lawenmoll" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-[#2D6A4F]">LAWENMOLL Salud Integrativa</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Test de Bienestar Inteligente, composición metabólica, Fichas Clínicas encriptadas bajo Ley N° 21.663 y consulta con especialistas.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenPortal('lawenmoll')}
                className="w-full bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3 rounded-xl transition shadow-xs text-center"
              >
                Ingresar a Portal LAWENMOLL
              </button>
            </div>

            {/* OFICINA 3: WELLNESS WEB APP */}
            <div className="bg-white p-6 rounded-3xl border-2 border-[#C8D8CE] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-2.5 py-1 rounded-full">
                    Oficina Virtual 03
                  </span>
                  <div className="w-14 h-14 rounded-full bg-white p-1 border-2 border-[#D4AF37] overflow-hidden flex items-center justify-center shadow-xs">
                    <img src="/logo_wellness.jpg" alt="Logo Wellness" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-[#2D6A4F]">Wellness Web App</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Movimiento adaptado sin impacto, pausas activas para el trabajo remoto, salas virtuales interactivas y cocina demostrativa.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenPortal('wellness')}
                className="w-full bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3 rounded-xl transition shadow-xs text-center"
              >
                Ingresar a Portal Wellness
              </button>
            </div>

            {/* OFICINA 4: BIENESTAR APP */}
            <div className="bg-white p-6 rounded-3xl border-2 border-[#C8D8CE] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D85260] bg-[#FFF0F2] px-2.5 py-1 rounded-full">
                    Oficina Virtual 04
                  </span>
                  <div className="w-14 h-14 rounded-full bg-white p-1 border-2 border-[#FF8894] overflow-hidden flex items-center justify-center shadow-xs">
                    <img src="/LOGO_BIENESTAR.png" alt="Logo Bienestar" className="w-full h-full object-cover rounded-full" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-[#2D6A4F]">Bienestar App</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Red de comunidad, recetario herbolario nativo en PDF, seguimiento de hábitos saludables, fitoterapia tradicional y descanso consciente.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenPortal('bienestar')}
                className="w-full bg-[#D85260] hover:bg-[#FF8894] text-white text-xs font-bold py-3 rounded-xl transition shadow-xs text-center"
              >
                Ingresar a Portal Bienestar
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* PIE DE PAGINA */}
      <footer className="bg-[#52796F] text-white border-t-2 border-[#D4AF37] p-6 text-center text-xs space-y-2">
        <p className="font-bold">ASL Ideas SpA — Todos los derechos reservados</p>
        <p className="text-[#E8F0EC] text-[11px]">
          Tecnología en salud humana, accesible e inclusiva para Latinoamérica.
        </p>
      </footer>

      {/* MODAL DEL PORTAL INTERACTIVO */}
      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        portalData={portalesData[activePortal]}
        isAdmin={isAdminMode}
      />

    </div>
  );
}