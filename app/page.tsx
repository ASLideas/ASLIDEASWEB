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
      
      {/* BARRA DE NAVEGACION CABECERA */}
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

      {/* CONTENIDO PRINCIPAL: LAS 4 OFICINAS VIRTUALES */}
      <main className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 flex-1 w-full">
        
        {/* BANNER INSTITUCIONAL */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#C8D8CE] shadow-sm text-center space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-3 py-1 rounded-full inline-block">
            Ley N° 21.663 - Ley TEA N° 21.545 - Accesibilidad Cognitiva
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-[#2D6A4F]">
            Ecosistema de Salud Integrativa y Portales Interactivos
          </h2>
          <p className="text-xs md:text-sm text-[#52796F] max-w-3xl mx-auto leading-relaxed">
            Plataforma desarrollada con diseno sensorialmente respetuoso para usuarios neurodivergentes y condiciones cronicas de salud, combinando evaluacion metabolica, movimiento adaptado y sabiduria ancestral.
          </p>
        </section>

        {/* GRILLA DE OFICINAS VIRTUALES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* OFICINA 1: CASA MATRIZ B2B */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#C8D8CE] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-2.5 py-1 rounded-full">
                Oficina Virtual 01
              </span>
              <h3 className="text-lg font-bold text-[#2D6A4F]">Casa Matriz ASL Ideas SpA</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Gestion corporativa, desarrollo de software a medida, licencias B2B, convenios municipales y consultoria en accesibilidad cognitiva.
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
              <h3 className="text-lg font-bold text-[#2D6A4F]">LAWENMOLL Salud Integrativa</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Test de Bienestar Inteligente, composicion metabolica, Fichas Clinicas encriptadas bajo Ley N° 21.663 y consulta con especialistas.
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
              <h3 className="text-lg font-bold text-[#2D6A4F]">Wellness Web App</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Movimiento adaptado sin impacto, pausas activas para el trabajo remoto, salas virtuales interactivas y cocina saludable demostrativa.
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

          {/* OFICINA 4: SABIDURIA ANCESTRAL */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#C8D8CE] shadow-xs flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#52796F] bg-[#E8F0EC] px-2.5 py-1 rounded-full">
                Oficina Virtual 04
              </span>
              <h3 className="text-lg font-bold text-[#2D6A4F]">Sabiduria Ancestral</h3>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Diario mural de la comunidad, recetario herbolario nativo descargable en PDF, fitoterapia tradicional y asistencia con IA empatica.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenSala('Sabiduria Ancestral (Comunidad y Herbolaria Nativa)', '/LOGO_BIENESTAR.png')}
              className="w-full bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3 rounded-xl transition shadow-xs text-center"
            >
              Consultar Recetario y Comunidad
            </button>
          </div>

        </section>
      </main>

      {/* PIE DE PAGINA */}
      <footer className="bg-[#52796F] text-white border-t-2 border-[#D4AF37] p-6 text-center text-xs space-y-2">
        <p className="font-bold">ASL Ideas SpA - Todos los derechos reservados</p>
        <p className="text-[#E8F0EC] text-[11px]">
          Tecnologia en salud humana, accesible e inclusiva para Latinoamerica.
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