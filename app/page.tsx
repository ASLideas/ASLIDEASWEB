'use client';

import React, { useState, useEffect } from 'react';
import IntroLoading from '@/components/IntroLoading';

export default function HomePage() {
  const [cargando, setCargando] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [logoIndex, setLogoIndex] = useState(0);

  const POSIBLES_LOGOS = [
    '/LOGO_asl.png',
    '/logo.png',
    '/logoASLideas.jpeg',
    '/LOGO_BIENESTAR.png'
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImgError = () => {
    if (logoIndex < POSIBLES_LOGOS.length - 1) {
      setLogoIndex((prev) => prev + 1);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* INTRO DE ESPERA */}
      {cargando && <IntroLoading onComplete={() => setCargando(false)} duracionMs={3200} />}
      
      <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] flex flex-col font-sans">
        
        {/* CABECERA SUPERIOR LIMPIA */}
        <header className="w-full bg-[#FAF8F5] border-b border-[#97A884]/30 py-3 px-6 shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <img 
                src={POSIBLES_LOGOS[logoIndex]} 
                onError={handleImgError}
                alt="ASL Ideas SpA" 
                className="h-10 w-auto object-contain rounded-full border border-[#97A884]/30" 
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-[#676E5E] leading-none">ASL Ideas SpA</span>
                <span className="text-[11px] font-semibold text-[#52796F] tracking-wider">Soluciones Integrales e Inclusión</span>
              </div>
            </div>
            
            <nav className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm font-semibold">
              <a 
                href="/sala-virtual" 
                className="bg-[#97A884] text-white px-3.5 py-1.5 rounded-lg hover:bg-[#676E5E] transition shadow-sm"
              >
                Ingresar a Sala / Red
              </a>
              <a 
                href="#oficinas" 
                className="bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] px-3 py-1.5 rounded-lg hover:bg-[#E6E7D5] transition"
              >
                Agendamiento
              </a>
              <a 
                href="#oficinas" 
                className="bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] px-3 py-1.5 rounded-lg hover:bg-[#E6E7D5] transition"
              >
                Administración
              </a>
            </nav>
          </div>
        </header>

        {/* CINTILLO LEGAL */}
        <div className="bg-[#97A884]/20 py-2 px-4 text-center border-b border-[#97A884]/30">
          <p className="text-[11px] sm:text-xs font-bold text-[#52796F] tracking-wide uppercase">
            TECNOLOGÍA CON ALMA Y PROPÓSITO | LEY N° 21.663 Y LEY TEA N° 21.545
          </p>
        </div>

        {/* SECCIÓN PRINCIPAL */}
        <section className="pt-10 pb-6 px-6 max-w-5xl mx-auto text-center space-y-4">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#676E5E] leading-tight tracking-tight">
            Desarrollo y soluciones accesibles para PYME y comercio asociado
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#676E5E]/90 max-w-3xl mx-auto leading-relaxed">
            Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencias y condiciones crónicas de salud, unificando el sistema metabólico, el movimiento adaptado y la sabiduría ancestral.
          </p>
        </section>

        {/* BANNER ECOSISTEMA */}
        <section className="px-6 max-w-5xl mx-auto w-full mb-10">
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-2xl border-2 border-[#97A884]/50 shadow-md text-center space-y-4">
            <span className="inline-block px-3 py-1 bg-[#97A884]/20 text-[#52796F] text-[10px] sm:text-xs font-bold rounded-full uppercase tracking-wider">
              ECOSISTEMA DE SALUD DIGITAL INCLUSIVA
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#676E5E]">
              Lleva el Ecosistema ASL Ideas en tu Celular o Computador
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a 
                href="#oficinas" 
                className="bg-[#52796F] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#676E5E] transition shadow"
              >
                ABRIR LAWENMOLL
              </a>
              <a 
                href="/sala-virtual" 
                className="bg-[#97A884] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#676E5E] transition shadow"
              >
                Abrir Wellness Web App
              </a>
              <button 
                onClick={() => alert("Puedes agregar la Web App a tu pantalla de inicio en tu celular o navegador como PWA.")}
                className="bg-white border-2 border-[#97A884] text-[#676E5E] text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#E6E7D5] transition"
              >
                ¿Qué descargar o instalar?
              </button>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4 OFICINAS VIRTUALES */}
        <section id="oficinas" className="py-8 px-6 max-w-7xl mx-auto w-full space-y-8 mb-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#676E5E]">
              Nuestras 4 Oficinas Virtuales y Aplicaciones
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#52796F]">
              Diseño e innovación para el bienestar y la inclusión
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* OFICINA 1: ASL IDEAS SPA */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border-2 border-[#97A884]/40 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold bg-[#97A884]/20 text-[#52796F] px-2.5 py-1 rounded-md uppercase tracking-wider">
                    CASA MATRIZ Y B2B
                  </span>
                  <span className="text-xs font-bold text-[#97A884]">Oficina 01</span>
                </div>
                <h3 className="text-xl font-black text-[#676E5E]">ASL Ideas SpA</h3>
                <p className="text-xs font-bold text-[#52796F]">Gestión corporativa y desarrollo de software B2B a medida</p>
                <p className="text-xs text-[#676E5E]/90 leading-relaxed">
                  Centro administrativo y comercial. Desarrollo de software con accesibilidad cognitiva para personas con neurodivergencias, licencias tecnológicas y convenios institucionales.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-semibold bg-white border border-[#97A884]/50 px-2 py-0.5 rounded text-[#676E5E]">Licencias Software</span>
                  <span className="text-[10px] font-semibold bg-white border border-[#97A884]/50 px-2 py-0.5 rounded text-[#676E5E]">Soluciones a Medida</span>
                  <span className="text-[10px] font-semibold bg-white border border-[#97A884]/50 px-2 py-0.5 rounded text-[#676E5E]">Consultoría UI/UX TEA/TDAH</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-[#97A884]/20">
                <button className="flex-1 bg-[#676E5E] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#52796F] transition">
                  Ver Ficha / Ingresar
                </button>
                <button className="flex-1 bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] text-xs font-bold py-2 rounded-lg hover:bg-[#E6E7D5] transition">
                  Agenda de Reuniones
                </button>
              </div>
            </div>

            {/* OFICINA 2: LAWENMOLL */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border-2 border-[#97A884]/40 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold bg-[#97A884]/20 text-[#52796F] px-2.5 py-1 rounded-md uppercase tracking-wider">
                    SALUD INTEGRATIVA
                  </span>
                  <span className="text-xs font-bold text-[#97A884]">Oficina 02</span>
                </div>
                <h3 className="text-xl font-black text-[#676E5E]">LAWENMOLL</h3>
                <p className="text-xs font-bold text-[#52796F]">Evaluación metabólica inteligente y gestión de fichas clínicas</p>
                <p className="text-xs text-[#676E5E]/90 leading-relaxed">
                  Test de composición corporal y perfil integrativo, fichas clínicas encriptadas bajo Ley 21.663, derivación y agendamiento con especialistas y terapeutas.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-semibold bg-white border border-[#97A884]/50 px-2 py-0.5 rounded text-[#676E5E]">Test Bienestar Inteligente</span>
                  <span className="text-[10px] font-semibold bg-white border border-[#97A884]/50 px-2 py-0.5 rounded text-[#676E5E]">Fichas Clínicas Ley 21.663</span>
                  <span className="text-[10px] font-semibold bg-white border border-[#97A884]/50 px-2 py-0.5 rounded text-[#676E5E]">Atención Especialistas</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-[#97A884]/20">
                <button className="flex-1 bg-[#676E5E] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#52796F] transition">
                  Ver Ficha / Ingresar
                </button>
                <button className="flex-1 bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] text-xs font-bold py-2 rounded-lg hover:bg-[#E6E7D5] transition">
                  Agenda de Especialistas
                </button>
              </div>
            </div>

            {/* OFICINA 3: WELLNESS WEB APP */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border-2 border-[#97A884]/40 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold bg-[#97A884]/20 text-[#52796F] px-2.5 py-1 rounded-md uppercase tracking-wider">
                    MOVIMIENTO ADAPTADO
                  </span>
                  <span className="text-xs font-bold text-[#97A884]">Oficina 03</span>
                </div>
                <h3 className="text-xl font-black text-[#676E5E]">Wellness Web App</h3>
                <p className="text-xs font-bold text-[#52796F]">Salas virtuales interactivas y videoteca de pausa activa</p>
                <p className="text-xs text-[#676E5E]/90 leading-relaxed">
                  Transmisión en vivo y salas interactivas (Lotus, Cielo, Bosque, Raíz), ejercicios adaptados sin impacto para dolor articular o sobrepeso, y cocina demostrativa.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-semibold bg-white border border-[#97A884]/50 px-2 py-0.5 rounded text-[#676E5E]">Ejercicios Sin Impacto</span>
                  <span className="text-[10px] font-semibold bg-white border border-[#97A884]/50 px-2 py-0.5 rounded text-[#676E5E]">Salas Virtuales Interactivas</span>
                  <span className="text-[10px] font-semibold bg-white border border-[#97A884]/50 px-2 py-0.5 rounded text-[#676E5E]">Cocina Demostrativa</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-[#97A884]/20">
                <a href="/sala-virtual" className="flex-1 text-center bg-[#97A884] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#676E5E] transition">
                  Entrar a Sala Virtual
                </a>
                <button className="flex-1 bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] text-xs font-bold py-2 rounded-lg hover:bg-[#E6E7D5] transition">
                  Agenda de Clases
                </button>
              </div>
            </div>

            {/* OFICINA 4: SABIDURÍA ANCESTRAL */}
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border-2 border-[#97A884]/40 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold bg-[#97A884]/20 text-[#52796F] px-2.5 py-1 rounded-md uppercase tracking-wider">
                    COMUNIDAD Y HERBOLARIA
                  </span>
                  <span className="text-xs font-bold text-[#97A884]">Oficina 04</span>
                </div>
                <h3 className="text-xl font-black text-[#676E5E]">Sabiduría Ancestral / Bienestar</h3>
                <p className="text-xs font-bold text-[#52796F]">Herbolaria nativa, comunidad y asistente virtual empático</p>
                <p className="text-xs text-[#676E5E]/90 leading-relaxed">
                  Diario Mural comunitario de secretos de la abuela, recetarios herbolarios descargables en PDF y agente conversacional de contención y orientación natural.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-semibold bg-white border border-[#97A884]/50 px-2 py-0.5 rounded text-[#676E5E]">Diario Mural Comunitario</span>
                  <span className="text-[10px] font-semibold bg-white border border-[#97A884]/50 px-2 py-0.5 rounded text-[#676E5E]">Recetario PDF Descargable</span>
                  <span className="text-[10px] font-semibold bg-white border border-[#97A884]/50 px-2 py-0.5 rounded text-[#676E5E]">Asistente Virtual Empático</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-[#97A884]/20">
                <button className="flex-1 bg-[#676E5E] text-white text-xs font-bold py-2 rounded-lg hover:bg-[#52796F] transition">
                  Ver Ficha / Ingresar
                </button>
                <button className="flex-1 bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] text-xs font-bold py-2 rounded-lg hover:bg-[#E6E7D5] transition">
                  Agenda de Bienestar
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* PIE DE PÁGINA */}
        <footer className="mt-auto bg-[#FAF8F5] border-t border-[#97A884]/30 py-6 px-6 text-center text-xs text-[#676E5E]/80">
          <p>© 2026 ASL Ideas SpA — Soluciones Integrales e Inclusión | Ley N° 21.663 y Ley TEA N° 21.545</p>
        </footer>

      </main>
    </>
  );
}
