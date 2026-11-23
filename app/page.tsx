'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#FAF8F5] text-[#2C3E35]' : 'bg-[#121E19] text-white'}`}>
      {/* Header Principal */}
      <header className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#2D6A4F]/40">
        <div className="flex items-center gap-3">
          <img src="/logo-asl.png.png" alt="Logo ASL Ideas SpA" className="w-12 h-12 object-contain rounded-2xl bg-white p-1 shadow-lg border border-[#E8829C]/40" />
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#E8829C]">
              ASL Ideas SpA
            </h1>
            <p className="text-xs text-slate-300">
              Visualización, Diseño & Desarrollo de Aplicaciones a Medida
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#1A2822] text-slate-200 border border-[#2D6A4F] hover:bg-[#253A30] transition"
          >
            {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>
          <Link
            href="/sala-virtual"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#E8829C] text-slate-900 hover:bg-[#d8708c] transition shadow-md flex items-center gap-2 font-black"
          >
            Sala Virtual B2B
          </Link>
        </div>
      </header>

      {/* Banner Propuesta de Valor & Presentacion Corporativa */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-center space-y-4">
        <span className="bg-[#E8829C]/20 text-[#E8829C] border border-[#E8829C]/40 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
          TECNOLOGÍA CON ALMA & EMPATÍA | BAJA CARGA SENSORIAL (LEY TEA N° 21.545)
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white max-w-4xl mx-auto leading-tight">
          Diseñamos y desarrollamos soluciones tecnológicas amables y herramientas digitales a medida para emprendedores, PYMEs y comercios asociados.
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          ASL Ideas SpA Casa Matriz combina diseño gráfico de alta sensibilidad visual con ingeniería de software accesible. Aunque nacimos impulsando el ecosistema de la salud y el bienestar integrativo, creamos plataformas e interfaces visuales adaptadas para potenciar negocios en cualquier área del mercado.
        </p>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-[#2D6A4F] shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#2D6A4F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 01
              </span>
              <img src="/logo-asl.png.png" alt="Logo ASL" className="w-8 h-8 object-contain rounded-lg bg-white p-0.5" />
            </div>
            <h3 className="text-xl font-extrabold text-[#E8829C]">
              ASL Ideas SpA
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              <strong>Casa Matriz & Desarrollo de Apps:</strong> Empresa dedicada a la visualización, diseño gráfico y desarrollo de software a medida para PYMEs y comercios asociados en distintas industrias.
            </p>
            <div className="bg-[#121E19] p-4 rounded-2xl border border-[#2D6A4F]/60 text-xs space-y-2">
              <h4 className="font-bold text-[#E8829C]">Misión & Inclusión Laboral:</h4>
              <p className="text-slate-300">
                Diseñar aplicaciones web y móviles amables con baja carga sensorial, adaptadas a personas neurodivergentes y neurotípicas, otorgando mayor visibilidad e integrando a personas con discapacidad al mundo laboral bajo ciberseguridad Ley N° 21.663.
              </p>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA&logo=/logo-asl.png.png"
            className="w-full py-3 bg-[#E8829C] hover:bg-[#d8708c] text-slate-900 font-extrabold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Casa Matriz ASL Ideas SpA
          </Link>
        </div>

        {/* OFICINA 02: LAWENMOLL */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-[#2D6A4F] shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#2D6A4F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 02
              </span>
              <img src="/logo-lawenmoll.jpg.png" alt="Logo LAWENMOLL" className="w-8 h-8 object-contain rounded-lg bg-white p-0.5" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              LAWENMOLL — Vitrina Virtual Integrativa
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              LAWENMOLL es la plataforma pionera de una vitrina virtual integrativa para el diagnóstico preventivo y acompañamiento continuo en enfermedades. Permite realizar tests de composición metabólica, emitir reportes inteligentes y conectar de forma segura a pacientes y distintos tipos de servicios que ofrece nuestra plataforma.
            </p>
            <div className="bg-[#121E19] p-4 rounded-2xl border border-[#2D6A4F]/60 text-xs space-y-2">
              <h4 className="font-bold text-[#E8829C]">Herramientas Visuales & Conexión:</h4>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li>Tests visuales de composición metabólica y hábitos.</li>
                <li>Reportes inteligentes y fichas de apoyo visual.</li>
                <li>Conexión segura entre usuarios y distintos servicios integrativos.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=LAWENMOLL&logo=/logo-lawenmoll.jpg.png"
            className="w-full py-3 bg-[#2D6A4F] hover:bg-[#255740] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a LAWENMOLL
          </Link>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-[#E8829C]/50 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#E8829C] text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 03
              </span>
              <img src="/logo-wellness.jpg.jpg" alt="Logo Wellness" className="w-8 h-8 object-contain rounded-lg bg-white p-0.5" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Wellness Web App — Movimiento Adaptado & Gastronomía
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Herramienta visual e interactiva para conectar cuerpo y mente. Clases de movimiento adaptado sin impacto articular y espacio de gastronomía consciente.
            </p>
            <div className="bg-[#121E19] p-4 rounded-2xl border border-[#2D6A4F]/60 text-xs space-y-2">
              <h4 className="font-bold text-[#E8829C]">Conexión en Vivo y Perfiles:</h4>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li>Salas virtuales temáticas para clases interactivas.</li>
                <li>Perfiles públicos de profesores, instructores y emprendedores.</li>
                <li>Guías demostrativas visuales sin dietas restrictivas.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=Wellness%20Web%20App&logo=/logo-wellness.jpg.jpg"
            className="w-full py-3 bg-[#E8829C] hover:bg-[#d8708c] text-slate-900 font-extrabold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Wellness Web App
          </Link>
        </div>

        {/* OFICINA 04: BIENESTAR */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-[#2D6A4F] shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#2D6A4F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 04
              </span>
              <img src="/logo-bienestar.png.png" alt="Logo Bienestar" className="w-8 h-8 object-contain rounded-lg bg-white p-0.5" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Bienestar — Mensajería & Shopping PYME
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Aplicación de comunicación y retroalimentación en salud. Gestión de recordatorios, descanso (Módulo Morfeo) y vitrina de conexión comercial para PYMEs.
            </p>
            <div className="bg-[#121E19] p-4 rounded-2xl border border-[#2D6A4F]/60 text-xs space-y-2">
              <h4 className="font-bold text-[#E8829C]">Herramientas para Emprendedores:</h4>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li>Vitrina de compras y servicios recomendados.</li>
                <li>Visibilización y promoción de emprendimientos asociados.</li>
                <li>Chat interactivo y agenda de atención.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=Bienestar&logo=/logo-bienestar.png.png"
            className="w-full py-3 bg-[#2D6A4F] hover:bg-[#255740] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Bienestar
          </Link>
        </div>

      </section>
    </main>
  );
}
