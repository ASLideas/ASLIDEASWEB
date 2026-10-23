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

  // Mapeo con nombres exactos de archivos en public, fondo rosado pastel y bordes
  const portalesData: Record<string, PortalInfo> = {
    asl: {
      id: 'asl',
      nombre: 'ASL Ideas SpA (Casa Matriz & B2B)',
      subtitulo: 'Innovación, Licencias y Accesibilidad UI/UX',
      logo: '/logo-asl.png.png',
      oficinaNum: 'Oficina Virtual 01',
      leyes: ['Ley TEA N° 21.545', 'Ley N° 21.663', 'Convenios B2B'],
      descripcionCorta: 'Gestión corporativa, licencias de software a medida y consultoría en accesibilidad cognitiva UI/UX.',
      descripcionLarga: 'Centro de mando corporativo donde se gestionan convenios B2B con municipalidades, empresas e instituciones de salud. Comercializa soluciones de diseño inclusivo adaptadas para personas neurodivergentes.',
      serviciosClave: [
        'Licencias de Software B2B & Convenios Institucionales',
        'Consultoría en Accesibilidad UI/UX para Neurodivergencias (TEA / TDAH)',
        'Desarrollo de Software Médico y Preventivo a Medida',
        'Capacitación e Integración Institucional'
      ],
      beneficios: [
        'Cumplimiento de la Ley TEA N° 21.545 y Ley N° 21.663.',
        'Reducción del estrés cognitivo y sobrecarga sensorial.',
        'Interfaces amables diseñadas con sensibilidad humana.'
      ],
      publicoObjetivo: 'Municipalidades, Empresas, PYMES, Instituciones de Salud y Organizaciones'
    },
    lawenmoll: {
      id: 'lawenmoll',
      nombre: 'LAWENMOLL Salud Integrativa',
      subtitulo: 'Evaluación Metabólica y Fichas Clínicas Protegidas',
      logo: '/logo-lawenmoll.jpg.png',
      oficinaNum: 'Oficina Virtual 02',
      leyes: ['Ley N° 21.663 - Datos Protegidos', 'Ley TEA N° 21.545', 'Estándar SOAP'],
      descripcionCorta: 'Test de Bienestar Inteligente, composición metabólica y Fichas Clínicas encriptadas.',
      descripcionLarga: 'Plataforma clínica integrativa enfocada en la evaluación personalizada de la salud metabólica. Unifica la medicina preventiva con herramientas digitales que encriptan el historial clínico y conectan al paciente con especialistas.',
      serviciosClave: [
        'Test de Bienestar Inteligente y Evaluación Nutricional',
        'Cálculo de Composición Corporal y Riesgo Metabólico',
        'Fichas Clínicas Encriptadas (Ley N° 21.663)',
        'Atención Virtual con Especialistas y Terapeutas'
      ],
      beneficios: [
        'Diagnóstico preventivo sin juicios sobre el peso.',
        'Privacidad total de fichas médicas cifradas.',
        'Seguimiento personalizado continuo.'
      ],
      publicoObjetivo: 'Pacientes con condiciones crónicas, adultos con sobrepeso y profesionales de la salud'
    },
    wellness: {
      id: 'wellness',
      nombre: 'Wellness Web App',
      subtitulo: 'Movimiento Adaptado & Salas Virtuales',
      logo: '/logo-wellness.jpg.jpg',
      oficinaNum: 'Oficina Virtual 03',
      leyes: ['Ejercicios Sin Impacto', 'Reducción de Cortisol', 'Salas Temáticas'],
      descripcionCorta: 'Movimiento adaptado sin impacto, pausas activas y salas virtuales interactivas.',
      descripcionLarga: 'Espacio enfocado en la activación física adaptada y la reducción del cortisol para personas con sobrepeso, movilidad reducida o sobrecarga urbana. Incluye salas temáticas interactivas para entrenamiento guiado.',
      serviciosClave: [
        'Salas Virtuales Temáticas (Lotus, Cielo, Bosque, Raíz)',
        'Videoteca de Ejercicios Adaptados Sin Impacto',
        'Pausas Activas de Bajo Estrés para Empresas',
        'Cocina Demostrativa y Nutrición Antiinflamatoria'
      ],
      beneficios: [
        'Disminución efectiva de los niveles de ansiedad.',
        'Ejercicios seguros diseñados para cuidar articulaciones.',
        'Interacción comunitaria guiada.'
      ],
      publicoObjetivo: 'Adultos con movilidad reducida, sobrepeso, dolor articular o estrés laboral'
    },
    sabiduria: {
      id: 'sabiduria',
      nombre: 'Bienestar App & Sabiduría Ancestral',
      subtitulo: 'Comunidad & Fitoterapia Nativa',
      logo: '/logo-bienestar.png.png',
      oficinaNum: 'Oficina Virtual 04',
      leyes: ['Herbolaria Nativa', 'Ley N° 21.663', 'Comunidad Inclusiva'],
      descripcionCorta: 'Red comunitaria, recetario herbolario nativo en PDF y fitoterapia tradicional.',
      descripcionLarga: 'Portal dedicado a la preservación y divulgación de la herbolaria nativa y los remedios tradicionales. Integra el Diario Mural interactivo "Secretos de la Abuela", con pautas familiares y fichas PDF descargables.',
      serviciosClave: [
        'Diario Mural Interactivo "Secretos de la Abuela"',
        'Recetario Herbolario Nativo Descargable en PDF',
        'Agente Virtual de Conversación Empática',
        'Talleres y Encuentros Comunitarios'
      ],
      beneficios: [
        'Rescate de saberes ancestrales y medicina herbal nativa.',
        'Espacio seguro de apoyo mutuo.',
        'Generación de fichas educativas coleccionables.'
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
      
      {/* BARRA SUPERIOR INSTITUCIONAL */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b-2 border-[#D4AF37] shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            {/* LOGO CIRCULAR EN FONDO ROSADO PASTEL */}
            <div className="w-14 h-14 rounded-full bg-[#FFF0F2] p-1 border-2 border-[#F4ACB7] shadow-xs flex items-center justify-center overflow-hidden flex-shrink-0">
              <img 
                src="/logo-asl.png.png" 
                alt="ASL Ideas SpA" 
                className="w-full h-full object-contain rounded-full" 
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#2D6A4F]">ASL Ideas SpA</h1>
              <p className="text-xs text-[#52796F] font-medium">Inclusiva y Accesibilidad UI/UX</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-3 py-1 rounded-full">
              Ley TEA N° 21.545
            </span>
            <span className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-3 py-1 rounded-full">
              Ley N° 21.663
            </span>
            <button
              type="button"
              onClick={() => handleOpenPortal('asl')}
              className="text-xs font-bold bg-[#52796F] hover:bg-[#2D6A4F] text-white px-4 py-2 rounded-full transition shadow-xs"
            >
              Agendar Cita B2B
            </button>
            {isAdminMode ? (
              <span className="text-xs font-bold bg-[#D4AF37] text-white px-4 py-2 rounded-full shadow-xs">
                Modo Admin
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setShowAdminLogin(true)}
                className="text-xs font-bold text-[#2D6A4F] bg-[#FAF8F5] hover:bg-[#E8F0EC] px-4 py-2 rounded-full border border-[#C8D8CE] transition shadow-xs"
              >
                Acceso Admin
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MODAL ADMIN */}
      {showAdminLogin && (
        <div className="fixed inset-0 z-50 bg-[#2D6A4F]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl border-2 border-[#D4AF37] shadow-2xl max-w-sm w-full space-y-4">
            <h3 className="text-base font-bold text-[#2D6A4F] text-center border-b border-[#E8F0EC] pb-2">
              Autenticación Administrador
            </h3>
            <form onSubmit={handleAdminAuth} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="Contraseña admin..."
                  className="w-full text-xs p-3.5 border border-[#C8D8CE] rounded-xl focus:outline-none bg-[#FAF8F5]"
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

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12 flex-1 w-full">
        
        {/* BANNER PRINCIPAL */}
        <section className="bg-white p-8 md:p-12 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-wider bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-3.5 py-1.5 rounded-full inline-block">
            Desarrollamos Soluciones Accesibles para PYMES y Comercio Asociado
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2D6A4F] leading-tight">
            Tecnología Humana, Accesible y Amable
          </h2>
          <p className="text-sm md:text-base text-[#52796F] leading-relaxed max-w-4xl">
            Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencias y condiciones crónicas de salud, unificando la ciencia metabólica, el movimiento adaptado y la sabiduría preventiva.
          </p>
        </section>

        {/* HISTORIA FUNDACIONAL Y PROPÓSITO */}
        <section className="bg-white p-8 md:p-12 rounded-3xl border-2 border-[#D4AF37] shadow-sm space-y-8">
          <div className="border-b border-[#E8F0EC] pb-4">
            <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
              Historia Fundacional y Propósito Corporativo
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-[#2D6A4F] mt-2">
              ¿Qué es ASL Ideas SpA y cuál es su Propósito Integrativo?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#C8D8CE] space-y-3">
              <h4 className="text-base font-bold text-[#2D6A4F]">Historia Fundacional y Perspectiva Única</h4>
              <p className="text-xs md:text-sm text-[#52796F] leading-relaxed">
                ASL Ideas SpA nace de una vivencia real: fue fundada por una Diseñadora Gráfica de 47 años con neurodivergencia —Condición del Espectro Autista (TEA Grado 1) y Trastorno por Déficit de Atención e Hiperactividad (TDAH)—, quien vive cotidianamente con enfermedades crónicas no transmisibles y sobrepeso.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#C8D8CE] space-y-3">
              <h4 className="text-base font-bold text-[#2D6A4F]">El Propósito Central y Principios UI/UX</h4>
              <p className="text-xs md:text-sm text-[#52796F] leading-relaxed">
                Demostrar que existen múltiples posibilidades integrativas para abordar afecciones crónicas y elevar la calidad de vida mediante interfaces amables e intuitivas.
              </p>
              <ul className="space-y-2 text-xs text-[#2D6A4F] pt-1">
                <li className="p-2 bg-white rounded-lg border border-[#C8D8CE]">
                  <strong>Reducción de Sobrecarga Sensorial:</strong> Paletas suaves (#FAF8F5, #52796F y #84A59D).
                </li>
                <li className="p-2 bg-white rounded-lg border border-[#C8D8CE]">
                  <strong>Claridad Cognitiva:</strong> Navegación lineal y microinteracciones previsibles.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ECOSISTEMA DE PORTALES INTERACTIVOS CON LOGOS CIRCULARES EN ROSADO PASTEL */}
        <section className="space-y-6">
          <div className="border-b border-[#C8D8CE] pb-3">
            <h3 className="text-xl font-bold text-[#2D6A4F]">Ecosistema de Portales Interactivos</h3>
            <p className="text-xs text-[#52796F]">Acceso a las 4 Oficinas Virtuales. Haz clic en cualquiera para ingresar al portal interactivo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.values(portalesData).map((portal) => (
              <div
                key={portal.id}
                className="bg-white rounded-3xl border border-[#C8D8CE] hover:border-[#D4AF37] transition shadow-xs hover:shadow-md p-8 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-3 py-1 rounded-full">
                      {portal.oficinaNum}
                    </span>
                    
                    {/* CONTENEDOR CIRCULAR CON FONDO ROSADO PASTEL */}
                    <div className="w-16 h-16 rounded-full bg-[#FFF0F2] p-1.5 border-2 border-[#F4ACB7] shadow-xs flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img 
                        src={portal.logo} 
                        alt={portal.nombre} 
                        className="w-full h-full object-contain rounded-full" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/logo-asl.png.png';
                        }}
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

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {portal.leyes.map((ley, i) => (
                      <span key={i} className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
                        {ley}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenPortal(portal.id)}
                  className="w-full bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3.5 rounded-2xl transition shadow-xs text-center mt-2"
                >
                  Ingresar al Portal {portal.oficinaNum}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN DE REDES SOCIALES Y CONTACTOS CORPORATIVOS */}
        <section className="bg-white p-8 md:p-10 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-6">
          <div className="border-b border-[#E8F0EC] pb-4 space-y-1 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-3 py-0.5 rounded-full inline-block">
              Canales Oficiales & Promoción
            </span>
            <h3 className="text-xl font-bold text-[#2D6A4F]">Redes Sociales y Contactos Corporativos</h3>
            <p className="text-xs text-[#52796F]">
              Conecta con nosotros para conocer novedades, solicitar demostraciones o agendar convenios B2B.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            
            {/* WHATSAPP */}
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2 text-center shadow-xs hover:border-[#52796F] transition">
              <span className="text-xs font-extrabold text-[#2D6A4F] uppercase tracking-wider block">WhatsApp B2B</span>
              <p className="text-xs font-bold text-[#52796F]">+56 9 6543 2109</p>
              <a
                href="[suspicious link removed]"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] font-bold bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1.5 rounded-xl border border-[#C8D8CE] hover:bg-[#52796F] hover:text-white transition mt-1"
              >
                Enviar Mensaje
              </a>
            </div>

            {/* INSTAGRAM */}
            <div className="p-5 bg-[#FFF0F2] rounded-2xl border border-[#F4ACB7] space-y-2 text-center shadow-xs hover:border-[#D85260] transition">
              <span className="text-xs font-extrabold text-[#D85260] uppercase tracking-wider block">Instagram Oficial</span>
              <p className="text-xs font-bold text-[#D85260]">@aslideas_salud</p>
              <a
                href="[suspicious link removed]"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] font-bold bg-white text-[#D85260] px-3 py-1.5 rounded-xl border border-[#FF8894] hover:bg-[#D85260] hover:text-white transition mt-1"
              >
                Ver Perfil
              </a>
            </div>

            {/* LINKEDIN */}
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2 text-center shadow-xs hover:border-[#52796F] transition">
              <span className="text-xs font-extrabold text-[#2D6A4F] uppercase tracking-wider block">LinkedIn B2B</span>
              <p className="text-xs font-bold text-[#52796F]">ASL Ideas SpA</p>
              <a
                href="[suspicious link removed]"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[11px] font-bold bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1.5 rounded-xl border border-[#C8D8CE] hover:bg-[#52796F] hover:text-white transition mt-1"
              >
                Conectar
              </a>
            </div>

            {/* CORREO INSTITUCIONAL */}
            <div className="p-5 bg-[#FFF0F2] rounded-2xl border border-[#F4ACB7] space-y-2 text-center shadow-xs hover:border-[#D85260] transition">
              <span className="text-xs font-extrabold text-[#D85260] uppercase tracking-wider block">Correo Oficial</span>
              <p className="text-xs font-bold text-[#D85260] truncate">contacto@aslideas.cl</p>
              <a
                href="mailto:contacto@aslideas.cl"
                className="inline-block text-[11px] font-bold bg-white text-[#D85260] px-3 py-1.5 rounded-xl border border-[#FF8894] hover:bg-[#D85260] hover:text-white transition mt-1"
              >
                Escribir Correo
              </a>
            </div>

          </div>
        </section>

      </main>

      {/* PIE DE PÁGINA */}
      <footer className="bg-[#52796F] text-white py-8 px-6 border-t-2 border-[#D4AF37] text-center space-y-2 mt-12">
        <p className="font-bold text-sm">ASL Ideas SpA — Todos los derechos reservados</p>
        <p className="text-xs text-[#E8F0EC]">
          Tecnología en salud humana, accesible e inclusiva para Latinoamérica.
        </p>
      </footer>

      {/* PORTAL INTERACTIVO DE PANTALLA COMPLETA */}
      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        portalData={portalesData[activePortalKey]}
        isAdmin={isAdminMode}
      />

    </div>
  );
}