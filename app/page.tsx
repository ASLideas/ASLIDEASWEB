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

  const portalesData: Record<string, PortalInfo> = {
    asl: {
      id: 'asl',
      nombre: 'ASL Ideas SpA (Casa Matriz)',
      subtitulo: 'Generadora de Apps para PYMES, Comercios Asociados y Creadora de la Tríada',
      logo: '/logo-asl.png.png',
      oficinaNum: 'Oficina Virtual 01',
      leyes: ['Ley TEA N° 21.545 - Accesibilidad Cognitiva', 'Ley N° 21.663 - Datos Protegidos', 'Licencias B2B'],
      descripcionCorta: 'Casa Matriz y motor tecnológico que hace realidad las 3 aplicaciones del ecosistema integrativo (Lawenmoll, Wellness Web App y Bienestar App). Desarrolla software accesible a medida para PYMES, emprendedores y comercios asociados.',
      descripcionLarga: 'Centro de innovación y desarrollo corporativo. Diseña e implementa soluciones de software con accesibilidad cognitiva UI/UX, reducción de sobrecarga sensorial y cifrado de datos clínicos bajo norma legal.',
      serviciosClave: [
        'Desarrollo de Apps a Medida para PYMES y Comercios Asociados',
        'Licencias Tecnológicas B2B y Convenios Institucionales',
        'Consultoría en Accesibilidad Cognitiva UI/UX (Ley TEA N° 21.545)',
        'Soporte e Integración de Ecosistemas Digitales Inclusivos'
      ],
      beneficios: [
        'Motor creador del ecosistema de las 3 aplicaciones de salud digital.',
        'Software adaptado al ritmo de trabajo de PYMES y profesionales independiente.',
        'Cumplimiento de estándares de datos sensibles bajo Ley N° 21.663.'
      ],
      publicoObjetivo: 'Emprendedores, PYMES, Profesionales, Comercios Asociados e Instituciones'
    },
    lawenmoll: {
      id: 'lawenmoll',
      nombre: 'LAWENMOLL Salud Integrativa',
      subtitulo: 'Evaluación Metabólica Inteligente y Fichas Clínicas Protegidas',
      logo: '/logo-lawenmoll.jpg.png',
      oficinaNum: 'Oficina Virtual 02',
      leyes: ['Ley N° 21.663 - Datos de Salud Protegidos', 'Ley TEA N° 21.545', 'Estándar SOAP'],
      descripcionCorta: 'Plataforma clínica integrativa que realiza Test de Bienestar Inteligente, cálculo de composición corporal y gestión de Fichas Clínicas encriptadas.',
      descripcionLarga: 'Combina la medicina preventiva con herramientas digitales de alta ciberseguridad. Conecta a pacientes con especialistas y terapeutas resguardando el historial médico bajo estándares de la Ley N° 21.663.',
      serviciosClave: [
        'Test de Bienestar Inteligente y Evaluación Nutricional',
        'Cálculo de Composición Corporal y Riesgo Metabólico',
        'Fichas Clínicas Encriptadas (Estándar SOAP y Ley N° 21.663)',
        'Atención Virtual Remota con Especialistas'
      ],
      beneficios: [
        'Diagnóstico preventivo sin juicios sobre el peso.',
        'Privacidad total de fichas médicas mediante cifrado.',
        'Seguimiento personalizado continuo.'
      ],
      publicoObjetivo: 'Pacientes con condiciones crónicas, profesionales de la salud y adultos'
    },
    wellness: {
      id: 'wellness',
      nombre: 'Wellness Web App',
      subtitulo: 'Movimiento Adaptado Sin Impacto & Pausas Activas',
      logo: '/logo-wellness.jpg.jpg',
      oficinaNum: 'Oficina Virtual 03',
      leyes: ['Ejercicios Sin Impacto', 'Reducción de Cortisol', 'Salas Temáticas Virtuales'],
      descripcionCorta: 'Aplicación de activación física adaptada sin saltos ni impacto articular, ideal para pausas activas de profesionales y emprendedores.',
      descripcionLarga: 'Ofrece programas de movimiento guiado y reducción del cortisol mediante salas virtuales interactivas (Lotus, Cielo, Bosque, Raíz), ayudando a combatir el sedentarismo y la sobrecarga laboral.',
      serviciosClave: [
        'Salas Virtuales Temáticas de Entrenamiento Guiado',
        'Videoteca de Ejercicios Adaptados Sin Impacto Articular',
        'Pausas Activas Saludables para PYMES y Trabajo Remoto',
        'Cocina Demostrativa de Bajo Índice Glicémico'
      ],
      beneficios: [
        'Disminución efectiva de los niveles de ansiedad y sobrecarga de trabajo.',
        'Protección articular completa para personas con sobrepeso o dolores crónicos.',
        'Aumento de la energía diaria sin desgaste físico excesivo.'
      ],
      publicoObjetivo: 'Emprendedores, profesionales, equipos de trabajo remoto y adultos'
    },
    sabiduria: {
      id: 'sabiduria',
      nombre: 'Bienestar App & Sabiduría Ancestral',
      subtitulo: 'Comunidad Inclusiva & Fitoterapia Nativa',
      logo: '/logo-bienestar.png.png',
      oficinaNum: 'Oficina Virtual 04',
      leyes: ['Herbolaria Nativa Tradicional', 'Ley N° 21.663', 'Comunidad de Apoyo'],
      descripcionCorta: 'Portal comunitario interactivo con Diario Mural de "Secretos de la Abuela", recetario nativo descargable en PDF y fitoterapia tradicional.',
      descripcionLarga: 'Preserva y divulga el conocimiento ancestral de la medicina herbal nativa. Cuenta con un sistema automatizado de generación de fichas PDF coleccionables y un agente virtual de conversación empática.',
      serviciosClave: [
        'Diario Mural Interactivo "Secretos de la Abuela"',
        'Recetario Herbolario Nativo Descargable en Formato PDF',
        'Agente Virtual de Conversación Empática e IA Acompañante',
        'Encuentros Virtuales y Talleres Comunitarios'
      ],
      beneficios: [
        'Rescate de saberes tradicionales e infusiones herbales nativas.',
        'Espacio seguro de contención emocional y apoyo mutuo.',
        'Acceso rápido a guías educativas descargables en PDF.'
      ],
      publicoObjetivo: 'Comunidad general, emprendedores locales de productos naturales y familias',
      enConstruccion: true
    }
  };

  const handleOpenPortal = (key: string) => {
    setActivePortalKey(key);
    setIsModalOpen(true);
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPass === 'asl2026' || adminPass === 'admin') {
      window.location.href = '/admin';
      setShowAdminLogin(false);
      setAdminError(false);
      setAdminPass('');
    } else {
      setAdminError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D6A4F] font-sans flex flex-col justify-between selection:bg-[#E8F0EC]">
      
      {/* HEADER INSTITUCIONAL */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b-2 border-[#D4AF37] shadow-xs">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FFF0F2] p-1 border-2 border-[#F4ACB7] shadow-xs flex items-center justify-center overflow-hidden flex-shrink-0">
              <img 
                src="/logo-asl.png.png" 
                alt="ASL Ideas SpA" 
                className="w-full h-full object-contain rounded-full" 
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#2D6A4F]">ASL Ideas SpA</h1>
              <p className="text-xs text-[#52796F] font-medium">Casa Matriz • Generadora de Apps para PYMES y Comercios</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-3 py-1 rounded-full">
              Ley TEA N° 21.545 - Accesibilidad Cognitiva
            </span>
            <span className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-3 py-1 rounded-full">
              Ley N° 21.663 - Datos Protegidos
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
                onClick={() => window.location.href = '/admin'}
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

      {/* HERO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12 flex-1 w-full">
        
        <section className="bg-white p-8 md:p-12 rounded-3xl border-2 border-[#D4AF37] shadow-xs space-y-6">
          <div className="flex flex-wrap gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-3.5 py-1.5 rounded-full">
              Ley TEA N° 21.545 - Accesibilidad Cognitiva
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-3.5 py-1.5 rounded-full">
              Ley N° 21.663 - Datos de Salud Protegidos
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#2D6A4F] leading-tight">
              Desarrollamos Soluciones Accesibles para PYMES y Comercio Asociado
            </h2>
            <p className="text-sm md:text-base text-[#52796F] font-medium leading-relaxed max-w-4xl">
              Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencias y condiciones crónicas de salud, unificando la ciencia metabólica, el movimiento adaptado y la sabiduría preventiva.
            </p>
          </div>

          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#2D6A4F] font-bold">
              ASL Ideas SpA (Casa Matriz) es la creadora de las 3 aplicaciones del ecosistema y desarrolladora de soluciones a medida para emprendedores.
            </p>
            <button
              type="button"
              onClick={() => handleOpenPortal('asl')}
              className="bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow-xs flex-shrink-0"
            >
              Contactar Casa Matriz
            </button>
          </div>
        </section>

        {/* TARJETAS DE LAS APPS */}
        <section className="space-y-6">
          <div className="border-b border-[#C8D8CE] pb-3">
            <h3 className="text-xl font-bold text-[#2D6A4F]">Ecosistema de Aplicaciones B2B</h3>
            <p className="text-xs text-[#52796F]">
              Casa Matriz impulsa la tríada de portales interactivos y el desarrollo de apps para el comercio asociado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.values(portalesData).map((portal) => (
              <div
                key={portal.id}
                className="bg-white rounded-3xl border border-[#C8D8CE] hover:border-[#D4AF37] transition shadow-xs hover:shadow-md p-8 flex flex-col justify-between space-y-6 group relative overflow-hidden"
              >
                {/* MENSAJE DE APP EN CONSTRUCCIÓN SI APLICA */}
                {portal.enConstruccion && (
                  <div className="bg-[#FFF0F2] border-2 border-[#D85260] text-[#D85260] p-3 rounded-2xl text-center space-y-1">
                    <span className="text-xs font-extrabold uppercase tracking-wider block">
                      App en Construcción • Próximamente al Público
                    </span>
                    <p className="text-[10px] font-medium text-[#52796F]">
                      Esta aplicación se encuentra en fase final de desarrollo antes de su lanzamiento oficial.
                    </p>
                  </div>
                )}

                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-4 border-b border-[#FAF8F5] pb-3">
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-3 py-1 rounded-full">
                      {portal.oficinaNum}
                    </span>
                    
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

                  <div className="space-y-1.5 bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE]">
                    <span className="text-[11px] font-bold uppercase text-[#2D6A4F] block">
                      ¿Qué hace esta aplicación?
                    </span>
                    <p className="text-xs text-[#52796F] leading-relaxed">
                      {portal.descripcionCorta}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase text-[#D85260] block">
                      Beneficios que cumple:
                      </span>
                    <ul className="space-y-1.5 text-xs text-[#2D6A4F]">
                      {portal.beneficios?.map((ben: any, i: number) => (
                        <li key={i} className="flex items-start gap-2 bg-[#FFF0F2] p-2 rounded-xl border border-[#F4ACB7]">
                          <span className="text-[#D85260] font-bold">•</span>
                          <span className="text-[11px] font-medium text-[#2D6A4F]">{ben}</span>
                          <span className="text-[11px] font-medium text-[#2D6A4F]">{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {portal.leyes.map((ley: any, i: number) => (
                      <span key={i} className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] px-3 py-0.5 rounded-full border border-[#C8D8CE]">
                        {ley}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenPortal(portal.id || '')}

                  className="w-full bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3.5 rounded-2xl transition shadow-xs text-center mt-2"
                >
                  {portal.enConstruccion ? 'Ver Avance / Portal Demo' : `Ingresar al Portal ${portal.oficinaNum}`}
                
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACTOS CORPORATIVOS */}
        <section className="bg-white p-8 md:p-10 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-6">
          <div className="border-b border-[#E8F0EC] pb-4 space-y-1 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-3 py-0.5 rounded-full inline-block">
              Canales Oficiales & Promoción
            </span>
            <h3 className="text-xl font-bold text-[#2D6A4F]">Redes Sociales y Contactos Corporativos</h3>
            <p className="text-xs text-[#52796F]">
              Conecta con Casa Matriz para conocer novedades, solicitar demostraciones o agendar convenios B2B.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
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

      {/* FOOTER */}
      <footer className="bg-[#52796F] text-white py-8 px-6 border-t-2 border-[#D4AF37] text-center space-y-2 mt-12">
        <p className="font-bold text-sm">ASL Ideas SpA — Casa Matriz</p>
        <p className="text-xs text-[#E8F0EC]">
          Tecnología en salud humana, accesible e inclusiva para PYMES, emprendedores y profesionales.
        </p>
      </footer>

      {/* MODAL PORTAL */}
      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        portalData={portalesData[activePortalKey]}
        isAdmin={isAdminMode}
      />

    </div>
  );
}