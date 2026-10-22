'use client';

import React, { useState } from 'react';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function HomePage() {
  const [isSalaOpen, setIsSalaOpen] = useState<boolean>(false);
  const [selectedApp, setSelectedApp] = useState<string>('LAWENMOLL (Salud Integrativa y Fichas Clinicas)');
  const [selectedLogo, setSelectedLogo] = useState<string>('/LOGO_asl.png');

  const handleOpenSala = (appName: string, logoPath: string) => {
    setSelectedApp(appName);
    setSelectedLogo(logoPath);
    setIsSalaOpen(true);
  };

  const handleCloseSala = () => {
    setIsSalaOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D6A4F] font-sans flex flex-col justify-between">
      
      {/* BARRA SUPERIOR DE NAVEGACION */}
      <header className="bg-[#52796F] text-white border-b-4 border-[#D4AF37] p-4 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white p-1 border-2 border-[#D4AF37] overflow-hidden flex items-center justify-center">
              <img src="/LOGO_asl.png" alt="ASL Ideas SpA" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white">ASL Ideas SpA</h1>
              <p className="text-xs text-[#E8F0EC]">Estrategia de Salud Digital Inclusiva y Accesibilidad UI/UX</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleOpenSala('Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)', '/LOGO_asl.png')}
              className="bg-[#D4AF37] hover:bg-[#B08D4B] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs"
            >
              Agendar Cita B2B
            </button>
            <button
              type="button"
              onClick={() => handleOpenSala('Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)', '/LOGO_asl.png')}
              className="bg-[#D85260] hover:bg-[#FF8894] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs"
            >
              Sala Virtual Telemedicina
            </button>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL Y RESEÑA EXTENSA */}
      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 flex-1 w-full">
        
        {/* BANNER DE DECLARACION INSTITUCIONAL */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#C8D8CE] shadow-sm text-center space-y-3">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-3 py-1 rounded-full">
              Ley TEA N° 21.545 — Accesibilidad Cognitiva
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-3 py-1 rounded-full">
              Ley N° 21.663 — Datos de Salud Protegidos
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#2D6A4F]">
            Ecosistema de Salud Integrativa, Inclusión y Portales Interactivos
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
                Esta perspectiva aporta un conocimiento empírico de las fricciones, el estrés urbano y la sobrecarga sensorial que generan las aplicaciones médicas convencionales y el sistema de salud tradicional.
              </p>
            </div>

            <div className="space-y-3 bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE]">
              <h4 className="font-bold text-[#2D6A4F] text-sm">El Propósito Central y Principios UI/UX</h4>
              <p>
                El propósito fundamental es demostrar que existen múltiples posibilidades integrativas para abordar afecciones crónicas y elevar la calidad de vida mediante interfaces amables, intuitivas y sostenibles.
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-[11px]">
                <li><strong>Reducción de Sobrecarga Sensorial:</strong> Paletas suaves (#FAF8F5, #52796F y #84A59D) sin contrastes agresivos.</li>
                <li><strong>Claridad Cognitiva (TDAH/TEA):</strong> Navegación lineal, microinteracciones previsibles y tipografía clara.</li>
                <li><strong>Empatía y Dignidad:</strong> Lenguaje libre de juicios punitivos sobre el peso o la salud corporal.</li>
              </ul>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2D6A4F] block mb-1">Prevalencia Médica</span>
              <p className="text-gray-700 text-[11px]">
                El 74% de la población adulta vive con sobrepeso/obesidad y más del 68% padece al menos una condición crónica de salud.
              </p>
            </div>
            <div className="p-4 bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2D6A4F] block mb-1">Adherencia sin Estrés</span>
              <p className="text-gray-700 text-[11px]">
                Resolvemos la deserción del 55% en apps tradicionales eliminando la sobrecarga de información y pautas rígidas.
              </p>
            </div>
            <div className="p-4 bg-[#FFF0F2] rounded-2xl border border-[#FF8894]">
              <span className="font-bold text-[#D85260] block mb-1">Inclusión Neurodivergente</span>
              <p className="text-gray-700 text-[11px]">
                Pioneros en incorporar la accesibilidad cognitiva para TEA y TDAH como valor intrínseco de arquitectura de software.
              </p>
            </div>
          </div>
        </section>

        {/* GRILLA DE LAS 4 OFICINAS VIRTUALES (SABIDURIA ANCESTRAL CAMBIADO POR BIENESTAR) */}
        <section className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F] bg-[#E8F0EC] px-3 py-1 rounded-full">
              Ecosistema de Portales Interactivos
            </span>
            <h3 className="text-lg font-bold text-[#2D6A4F]">Acceso a las 4 Oficinas Virtuales</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* OFICINA 1: CASA MATRIZ B2B */}
            <div className="bg-white p-6 rounded-3xl border-2 border-[#C8D8CE] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-2.5 py-1 rounded-full">
                  Oficina Virtual 01
                </span>
                <h4 className="text-lg font-bold text-[#2D6A4F]">Casa Matriz ASL Ideas SpA</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Gestión corporativa, desarrollo de software a medida, licencias B2B, convenios municipales y consultoría en accesibilidad cognitiva UI/UX.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenSala('Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)', '/LOGO_asl.png')}
                className="w-full bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3 rounded-xl transition shadow-xs text-center"
              >
                Ingresar a Sala Virtual B2B
              </button>
            </div>

            {/* OFICINA 2: LAWENMOLL */}
            <div className="bg-white p-6 rounded-3xl border-2 border-[#C8D8CE] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-2.5 py-1 rounded-full">
                  Oficina Virtual 02
                </span>
                <h4 className="text-lg font-bold text-[#2D6A4F]">LAWENMOLL Salud Integrativa</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Test de Bienestar Inteligente, composición metabólica, Fichas Clínicas encriptadas bajo Ley N° 21.663 y consulta con especialistas.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenSala('LAWENMOLL (Salud Integrativa y Fichas Clinicas)', '/lawenmoll_logo.jpg')}
                className="w-full bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3 rounded-xl transition shadow-xs text-center"
              >
                Agendar Consulta LAWENMOLL
              </button>
            </div>

            {/* OFICINA 3: WELLNESS WEB APP */}
            <div className="bg-white p-6 rounded-3xl border-2 border-[#C8D8CE] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-2.5 py-1 rounded-full">
                  Oficina Virtual 03
                </span>
                <h4 className="text-lg font-bold text-[#2D6A4F]">Wellness Web App</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Movimiento adaptado sin impacto, pausas activas para el trabajo remoto, salas virtuales interactivas y cocina demostrativa.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenSala('Wellness Web App (Movimiento Adaptado y Pausas Activas)', '/logo_wellness.jpg')}
                className="w-full bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3 rounded-xl transition shadow-xs text-center"
              >
                Acceder a Salas de Movimiento
              </button>
            </div>

            {/* OFICINA 4: BIENESTAR (CAMBIADO POR SABIDURIA ANCESTRAL) */}
            <div className="bg-white p-6 rounded-3xl border-2 border-[#C8D8CE] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D85260] bg-[#FFF0F2] px-2.5 py-1 rounded-full">
                  Oficina Virtual 04
                </span>
                <h4 className="text-lg font-bold text-[#2D6A4F]">Bienestar App</h4>
                <p className="text-xs text-[#52796F] leading-relaxed">
                  Red de comunidad, recetario herbolario nativo en PDF, seguimiento de hábitos saludables, fitoterapia tradicional y módulo de descanso Morfeo.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenSala('Bienestar App (Comunidad y Herbolaria Nativa)', '/LOGO_BIENESTAR.png')}
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

      {/* COMPONENTE MODAL SALA VIRTUAL B2B */}
      <SalaVirtualB2B
        isOpen={isSalaOpen}
        onClose={handleCloseSala}
        initialApp={selectedApp}
        appName={selectedApp}
        appLogo={selectedLogo}
      />

    </div>
  );
}