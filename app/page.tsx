'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#FAF8F5] text-[#2C3E35]' : 'bg-[#121E19] text-[#FAF8F5]'}`}>
      {/* Header Principal con Colores Corporativos y Rosado */}
      <header className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#2D6A4F]/40">
        <div className="flex items-center gap-3">
          <img src="/logo-asl.png.png" alt="ASL Ideas SpA Logo" className="w-12 h-12 object-contain rounded-2xl bg-white p-1 shadow-lg border-2 border-[#E8829C]" />
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#E8829C]">
              ASL Ideas SpA
            </h1>
            <p className="text-xs text-[#84A59D] font-semibold">
              Desarrollo de Software, Apps a Medida & Red para PYMEs
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#1A2822] text-[#FAF8F5] border border-[#E8829C]/50 hover:bg-[#2C3E35] transition shadow"
          >
            {modoCalma ? '🌿 Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>
          <Link
            href="/sala-virtual"
            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-[#E8829C] text-white hover:bg-[#D8708C] transition shadow-md flex items-center gap-2"
          >
            Sala Virtual B2B
          </Link>
        </div>
      </header>

      {/* Banner Propuesta de Valor Oficial */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-center space-y-5">
        <div className="inline-block bg-[#E8829C]/20 text-[#E8829C] border border-[#E8829C]/40 text-xs font-extrabold px-4 py-2 rounded-full uppercase tracking-wider">
          TECNOLOGÍA CON ALMA & EMPATÍA | BAJA CARGA SENSORIAL (LEY TEA N° 21.545)
        </div>
        
        <h2 className="text-2xl md:text-4xl font-black text-white max-w-4xl mx-auto leading-tight">
          Desarrollo y soluciones accesibles para PYME y comercio asociado
        </h2>

        <p className="text-sm md:text-base text-[#D4E0D9] max-w-4xl mx-auto leading-relaxed bg-[#1A2822]/90 p-6 rounded-2xl border border-[#2D6A4F]/50 shadow-xl">
          Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencia y condiciones crónicas de salud, unificando el sistema metabólico, el movimiento adaptado y la sabiduría preventiva. <strong>ASL Ideas SpA Casa Matriz</strong> es la creadora de las tres aplicaciones del ecosistema, desarrolladora de soluciones a medida para el emprendedor.
        </p>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA (Casa Matriz & Soluciones PYME) */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-[#E8829C]/60 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#E8829C] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide">
                Oficina 01
              </span>
              <span className="text-xs text-[#E8829C] font-bold">Casa Matriz & Soluciones PYME</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-[#E8829C]/40" />
              <h3 className="text-xl font-extrabold text-white">
                ASL Ideas SpA — Desarrollo & Convenios B2B
              </h3>
            </div>

            <p className="text-xs md:text-sm text-[#D4E0D9] leading-relaxed">
              Empresa dedicada al diseño y desarrollo de aplicaciones web y móvile accesibles para PYMEs, comercio asociado y emprendedores. Soluciones a medida con baja carga sensorial y cumplimiento Ley TEA N° 21.545.
            </p>

            <div className="bg-[#121E19] p-4 rounded-2xl border border-[#2D6A4F]/50 text-xs space-y-2">
              <h4 className="font-bold text-[#E8829C]">Beneficios de Suscribirse y Ser Colaborador B2B:</h4>
              <ul className="space-y-1 text-[#D4E0D9] list-disc list-inside">
                <li>Diseño y desarrollo de apps a medida para tu emprendimiento.</li>
                <li>Pertenencia a la Red &quot;Cuerpo y Alma&quot; para llegar a más personas.</li>
                <li>Asesoría en accesibilidad cognitiva y Ley N° 21.663.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA"
            className="w-full py-3 bg-[#E8829C] hover:bg-[#D8708C] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block uppercase tracking-wider"
          >
            Ingresar a Casa Matriz & Red B2B
          </Link>
        </div>

        {/* OFICINA 02: LAWENMOLL (Salud Integrativa & Fichas Cifradas) */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-[#2D6A4F] shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#2D6A4F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide">
                Oficina 02
              </span>
              <span className="text-xs text-[#84A59D] font-bold">Diagnóstico & Telemedicina</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-lawenmoll.jpg.png" alt="Logo Lawenmoll" className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-[#2D6A4F]" />
              <h3 className="text-xl font-extrabold text-white">
                LAWENMOLL — Salud Integrativa & Fichas Cifradas
              </h3>
            </div>

            <p className="text-xs md:text-sm text-[#D4E0D9] leading-relaxed">
              Plataforma inteligente de evaluación metabólica y seguimiento clínico integrativo, diseñada para conectar pacientes con terapeutas y profesionales de la salud.
            </p>

            <div className="bg-[#121E19] p-4 rounded-2xl border border-[#2D6A4F]/50 text-xs space-y-2">
              <h4 className="font-bold text-[#84A59D]">Características Principales:</h4>
              <ul className="space-y-1 text-[#D4E0D9] list-disc list-inside">
                <li>Test Metabólico y Composición Corporal Inteligente.</li>
                <li>Fichas Clínicas SOAP cifradas bajo Ley N° 21.663.</li>
                <li>Telemedicina integrativa con seguimiento continuo.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=LAWENMOLL"
            className="w-full py-3 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block uppercase tracking-wider"
          >
            Ingresar a LAWENMOLL
          </Link>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP (Movimiento Adaptado & Gastronomía) */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-[#E8829C]/60 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#E8829C] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide">
                Oficina 03
              </span>
              <span className="text-xs text-[#E8829C] font-bold">Mente, Cuerpo & Gastronomía</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-wellness.jpg.jpg" alt="Logo Wellness" className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-[#E8829C]/40" />
              <h3 className="text-xl font-extrabold text-white">
                Wellness Web App — Movimiento Adaptado & Nutrición
              </h3>
            </div>

            <p className="text-xs md:text-sm text-[#D4E0D9] leading-relaxed">
              Espacio visual e interactivo para reducir el cortisol con ejercicios sin salto y gastronomía saludable. Salas virtuales en vivo e interacción directa con profesores.
            </p>

            <div className="bg-[#121E19] p-4 rounded-2xl border border-[#2D6A4F]/50 text-xs space-y-2">
              <h4 className="font-bold text-[#E8829C]">Experiencia Interactiva & Conexión:</h4>
              <ul className="space-y-1 text-[#D4E0D9] list-disc list-inside">
                <li>Conexión en Vivo con Profesores e instructores de salud.</li>
                <li>Visita perfiles públicos para ver rutinas y recetas integrativas.</li>
                <li>Pausas activas y cocina demostrativa sin dietas restrictivas.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=Wellness%20Web%20App"
            className="w-full py-3 bg-[#E8829C] hover:bg-[#D8708C] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block uppercase tracking-wider"
          >
            Ingresar a Wellness Web App
          </Link>
        </div>

        {/* OFICINA 04: BIENESTAR (Mensajería, Salud Holística & Shopping PYME) */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-[#2D6A4F] shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#2D6A4F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wide">
                Oficina 04
              </span>
              <span className="text-xs text-[#84A59D] font-bold">Mensajería, Salud & Shopping PYME</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-bienestar.png.png" alt="Logo Bienestar" className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-[#2D6A4F]" />
              <h3 className="text-xl font-extrabold text-white">
                Bienestar — Mensajería, Salud & Shopping PYME
              </h3>
            </div>

            <p className="text-xs md:text-sm text-[#D4E0D9] leading-relaxed">
              App de comunicación y retroalimentación de salud. Guarda tus horas médicas, agua, estado de ánimo, descanso (Morfeo) y conecta personas naturales con PYMEs asociadas.
            </p>

            <div className="bg-[#121E19] p-4 rounded-2xl border border-[#2D6A4F]/50 text-xs space-y-2">
              <h4 className="font-bold text-[#84A59D]">Módulos de Bienestar & Comercial:</h4>
              <ul className="space-y-1 text-[#D4E0D9] list-disc list-inside">
                <li>Horas médicas, hidratación, ánimo y descanso Morfeo.</li>
                <li>Chat, Agenda y Shopping para conectar usuarios y PYMEs.</li>
                <li>Espacio para visibilizar y potenciar tus emprendimientos.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=Bienestar"
            className="w-full py-3 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block uppercase tracking-wider"
          >
            Ingresar a Bienestar
          </Link>
        </div>

      </section>
    </main>
  );
}
