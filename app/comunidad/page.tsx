'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function ComunidadPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState({
    nombre: 'ASL Ideas SpA — Demo B2B',
    logo: '/logo-asl.png.png',
  });

  const abrirDemo = (nombre: string, logo: string) => {
    setSelectedApp({ nombre, logo });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#676E5E] font-sans relative overflow-x-hidden">
      
      {/* 1. HERO Y CABECERA INSTITUCIONAL */}
      <header className="bg-[#E6E7D5] border-b-2 border-[#97A884] p-6 sm:p-10 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest bg-[#CDD6A9] text-[#676E5E] px-3 py-1 rounded-full border border-[#97A884]">
                Ecosistema B2B • Salud Digital Inclusiva
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white text-[#52796F] px-3 py-1 rounded-full border border-[#84A59D]">
                Ley N° 21.545 (TEA/TDAH) & Ley N° 21.663
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#676E5E] tracking-tight">
              Catálogo de Aplicaciones y Vitrinas Virtuales
            </h1>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              Plataformas tecnológicas diseñadas para la salud integrativa, teleatención accesible, desarrollo de software a medida y soluciones B2B sin sobrecarga sensorial.
            </p>
          </div>

          <button
            type="button"
            onClick={() => abrirDemo('ASL Ideas SpA — Casa Matriz B2B', '/logo-asl.png.png')}
            className="w-full md:w-auto bg-[#676E5E] hover:bg-[#52584b] text-white font-extrabold text-xs px-6 py-3.5 rounded-2xl border-2 border-[#52584b] shadow-md transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            🎥 Probar Demostración en Vivo
          </button>
        </div>
      </header>

      {/* 2. CATÁLOGO PRINCIPAL - LAS 4 OFICINAS VIRTUALES */}
      <main className="max-w-7xl mx-auto p-4 sm:p-8 space-y-8">
        
        <div className="flex justify-between items-center border-b border-[#97A884]/40 pb-3">
          <h2 className="text-lg sm:text-xl font-black text-[#676E5E] flex items-center gap-2">
            🏢 Portales y Soluciones Interactivas
          </h2>
          <span className="text-xs font-bold text-gray-500">4 Oficinas Activas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Tarjeta 1: Oficina ASL Ideas SpA */}
          <div className="bg-white rounded-3xl border-2 border-[#97A884] p-5 shadow-xs hover:shadow-lg transition flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-14 h-14 bg-[#E6E7D5] rounded-2xl border border-[#97A884] p-2 flex items-center justify-center">
                <img src="/logo-asl.png.png" alt="ASL Ideas SpA" className="w-full h-full object-contain" />
              </div>
              <span className="inline-block text-[9px] font-black uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-full border border-[#97A884]">
                Casa Matriz & B2B
              </span>
              <h3 className="font-extrabold text-base text-[#676E5E]">ASL Ideas SpA</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Desarrollo de software a medida, licencias tecnológicas, convenios institucionales y consultoría UI/UX inclusiva para neurodivergencias.
              </p>
            </div>
            <button
              type="button"
              onClick={() => abrirDemo('ASL Ideas SpA — Soluciones B2B', '/logo-asl.png.png')}
              className="w-full bg-[#E6E7D5] hover:bg-[#CDD6A9] text-[#676E5E] text-xs font-extrabold py-2.5 rounded-xl border border-[#97A884] transition cursor-pointer"
            >
              Ver Sala Demo B2B
            </button>
          </div>

          {/* Tarjeta 2: Oficina LAWENMOLL */}
          <div className="bg-white rounded-3xl border-2 border-[#97A884] p-5 shadow-xs hover:shadow-lg transition flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-14 h-14 bg-[#FAF8F5] rounded-2xl border border-[#97A884] p-2 flex items-center justify-center">
                <img src="/lawenmoll_logo.jpg" alt="LAWENMOLL" className="w-full h-full object-contain rounded-xl" />
              </div>
              <span className="inline-block text-[9px] font-black uppercase tracking-wider bg-[#84A59D]/20 text-[#52796F] px-2.5 py-0.5 rounded-full border border-[#84A59D]">
                Salud Integrativa
              </span>
              <h3 className="font-extrabold text-base text-[#676E5E]">LAWENMOLL</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Test de Bienestar Inteligente, cálculo metabólico, Fichas Clínicas SOAP encriptadas (Ley N° 21.663) y gestión de citas especializadas.
              </p>
            </div>
            <button
              type="button"
              onClick={() => abrirDemo('LAWENMOLL — Teleatención Integrativa', '/lawenmoll_logo.jpg')}
              className="w-full bg-[#E6E7D5] hover:bg-[#CDD6A9] text-[#676E5E] text-xs font-extrabold py-2.5 rounded-xl border border-[#97A884] transition cursor-pointer"
            >
              Ver Ficha & Demo
            </button>
          </div>

          {/* Tarjeta 3: Oficina Wellness Web App */}
          <div className="bg-white rounded-3xl border-2 border-[#97A884] p-5 shadow-xs hover:shadow-lg transition flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-14 h-14 bg-[#E6E7D5] rounded-2xl border border-[#97A884] p-2 flex items-center justify-center">
                <img src="/LOGO_BIENESTAR.png" alt="Wellness Web App" className="w-full h-full object-contain" />
              </div>
              <span className="inline-block text-[9px] font-black uppercase tracking-wider bg-[#E6C693]/40 text-[#676E5E] px-2.5 py-0.5 rounded-full border border-[#E6C693]">
                Movimiento Adaptado
              </span>
              <h3 className="font-extrabold text-base text-[#676E5E]">Wellness Web App</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Salas virtuales interactivas (Lotus, Cielo, Bosque, Raíz), pausa activa sensorial, ejercicios sin impacto y talleres en vivo.
              </p>
            </div>
            <Link
              href="/sala-virtual"
              className="w-full bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-extrabold py-2.5 rounded-xl transition text-center block"
            >
              Entrar a Sala Virtual
            </Link>
          </div>

          {/* Tarjeta 4: Oficina Sabiduría Ancestral */}
          <div className="bg-white rounded-3xl border-2 border-[#97A884] p-5 shadow-xs hover:shadow-lg transition flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-14 h-14 bg-[#CDD6A9]/30 rounded-2xl border border-[#97A884] p-2 flex items-center justify-center text-2xl">
                🌿
              </div>
              <span className="inline-block text-[9px] font-black uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-full border border-[#97A884]">
                Comunidad & Herbolaria
              </span>
              <h3 className="font-extrabold text-base text-[#676E5E]">Sabiduría Ancestral</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Diario Mural interactivo "Secretos de la Abuela", recetario nativo descargable en PDF y asistente virtual de conversación empática.
              </p>
            </div>
            <button
              type="button"
              onClick={() => abrirDemo('Sabiduría Ancestral — Comunidad', '/logo-asl.png.png')}
              className="w-full bg-[#E6E7D5] hover:bg-[#CDD6A9] text-[#676E5E] text-xs font-extrabold py-2.5 rounded-xl border border-[#97A884] transition cursor-pointer"
            >
              Explorar Comunidad
            </button>
          </div>

        </div>

        {/* 3. BANNER DE CUMPLIMIENTO DE ACCESIBILIDAD Y CIBERSEGURIDAD */}
        <div className="bg-[#E6E7D5] rounded-3xl border-2 border-[#97A884] p-6 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-black text-sm text-[#676E5E]">
              Seguridad y Estándares de Inclusión Garantizados
            </h4>
            <p className="text-xs text-gray-700">
              Cumplimiento riguroso de Ciberseguridad Ley N° 21.663 y Accesibilidad Cognitiva Ley N° 21.545 para TEA y TDAH.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <span className="text-[10px] font-bold bg-white text-[#676E5E] px-3 py-1.5 rounded-xl border border-[#97A884]">
              🔒 Cifrado TLS 1.3
            </span>
            <span className="text-[10px] font-bold bg-white text-[#676E5E] px-3 py-1.5 rounded-xl border border-[#97A884]">
              🧩 Accesibilidad TEA/TDAH
            </span>
          </div>
        </div>

      </main>

      {/* 4. MODAL INTERACTIVO DE SALA VIRTUAL B2B */}
      <SalaVirtualB2B 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        initialApp={selectedApp.nombre}
        appLogo={selectedApp.logo}
      />

    </div>
  );
}
