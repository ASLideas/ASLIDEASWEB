'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // ← Agrega esta línea
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function Home() {
  const [showSalaB2B, setShowSalaB2B] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D6A4F] font-sans selection:bg-[#E8F0EC]">
      
      {/* CINTILLO INSTITUCIONAL LEYES */}
      <div className="bg-[#E8F0EC] border-b border-[#C8D8CE] py-2 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-[11px] font-bold text-[#52796F] gap-2">
          <span>Ecosistema Tecnologico Inclusivo — ASL Ideas SpA</span>
          <div className="flex gap-3">
            <span className="bg-white px-2.5 py-0.5 rounded-full border border-[#C8D8CE]">Ley TEA N° 21.545 - Accesibilidad Cognitiva</span>
            <span className="bg-white px-2.5 py-0.5 rounded-full border border-[#C8D8CE]">Ley N° 21.663 - Datos Protegidos</span>
          </div>
        </div>
      </div>

      {/* HEADER DE LA PORTADA */}
      <header className="bg-white border-b-2 border-[#D4AF37] shadow-xs px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#E8F0EC] border-2 border-[#2D6A4F] flex items-center justify-center font-bold text-[#2D6A4F]">
              ASL
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-[#2D6A4F]">ASL Ideas SpA</h1>
              <p className="text-xs text-[#84A59D] font-medium">Plataforma de Salud Digital & Soluciones B2B</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setShowSalaB2B(true)}
              className="bg-[#2D6A4F] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#1E3A2F] transition shadow-xs"
            >
              Agendar Cita B2B
            </button>

            {/* BOTÓN DE ADMINISTRACIÓN CORREGIDO */}
            <Link
              href="/admin"
              className="bg-[#D4AF37] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#B08D4B] transition shadow-xs flex items-center"
            >
              Acceso Admin
            </Link>
          </div>
        </div>
      </header>

      {/* HERO / PORTADA PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <section className="bg-white p-8 rounded-3xl border-2 border-[#D4AF37] shadow-md text-center space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider bg-[#E8F0EC] text-[#2D6A4F] px-4 py-1.5 rounded-full border border-[#C8D8CE]">
            Salud Digital Integrativa & Accesible
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D6A4F] max-w-3xl mx-auto leading-tight">
            Soluciones Tecnologicas Accesibles para PYMES y Comercio Asociado
          </h2>

          <p className="text-sm text-[#52796F] max-w-2xl mx-auto leading-relaxed">
            Plataformas desarrolladas por y para personas con neurodivergencias y condiciones de salud integrativa. Integrando la ciencia metabolica, el movimiento adaptado y la sabiduria preventiva.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => setShowSalaB2B(true)}
              className="bg-[#2D6A4F] text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-[#1E3A2F] transition shadow-md"
            >
              Ingresar a la Oficina Virtual B2B
            </button>

            <Link
              href="/admin"
              className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-6 py-3 rounded-xl border border-[#C8D8CE] hover:bg-[#2D6A4F] hover:text-white transition flex items-center"
            >
              Acceso Consola Administradora
            </Link>
          </div>
        </section>

        {/* MÓDULOS DE APLICACIONES EN PORTADA */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border-2 border-[#C8D8CE] space-y-3">
            <span className="text-[10px] font-bold uppercase text-[#84A59D]">Salud Integrativa</span>
            <h3 className="text-base font-bold text-[#2D6A4F]">LAWENMOLL</h3>
            <p className="text-xs text-[#52796F] leading-relaxed">
              Evaluacion metabolica, Test de Bienestar Inteligente y Fichas Medicas SOAP encriptadas bajo Ley N° 21.663.
            </p>
            <button onClick={() => setShowSalaB2B(true)} className="text-xs font-bold text-[#2D6A4F] underline">
              Ver Portal LAWENMOLL -&gt;
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-[#C8D8CE] space-y-3">
            <span className="text-[10px] font-bold uppercase text-[#84A59D]">Movimiento Adaptado</span>
            <h3 className="text-base font-bold text-[#2D6A4F]">Wellness Web App</h3>
            <p className="text-xs text-[#52796F] leading-relaxed">
              Ejercicios sin impacto articular, pausas activas y salas de transmision virtual (Lotus, Cielo, Bosque, Raiz).
            </p>
            <button onClick={() => setShowSalaB2B(true)} className="text-xs font-bold text-[#2D6A4F] underline">
              Ver Salas Virtuales -&gt;
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-[#C8D8CE] space-y-3">
            <span className="text-[10px] font-bold uppercase text-[#84A59D]">Sabiduria Ancestral</span>
            <h3 className="text-base font-bold text-[#2D6A4F]">Bienestar App</h3>
            <p className="text-xs text-[#52796F] leading-relaxed">
              Mural comunitario, recetarios herbolarios descargables en PDF y modulo de descanso de baja carga sensorial.
            </p>
            <button onClick={() => setShowSalaB2B(true)} className="text-xs font-bold text-[#2D6A4F] underline">
              Ver Recetarios PDF -&gt;
            </button>
          </div>
        </section>
      </main>

      {/* COMPONENTE SALA VIRTUAL B2B */}
      <SalaVirtualB2B
        isOpen={showSalaB2B}
        onClose={() => setShowSalaB2B(false)}
      />

    </div>
  );
}
