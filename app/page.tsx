'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#FAF8F5] text-[#2C3E35]' : 'bg-[#121E19] text-white'}`}>
      {/* Header Principal */}
      <header className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4 border-b border-emerald-900/50">
        <div className="flex items-center gap-3">
          <img src="/logo-asl.png.png" alt="ASL Ideas SpA" className="w-12 h-12 object-contain rounded-2xl bg-white p-1 shadow-lg border border-[#E8829C]/40" />
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#E8829C]">
              ASL Ideas SpA
            </h1>
            <p className="text-xs text-emerald-200/80">
              Diseño, Visualización & Desarrollo de Apps para PYMEs y Comercio Asociado
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-950/80 text-emerald-200 border border-emerald-700/60 hover:bg-emerald-900 transition"
          >
            {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>
          <Link
            href="/sala-virtual"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#E8829C] text-slate-950 hover:bg-[#d7718b] transition shadow-md flex items-center gap-2"
          >
            Sala Virtual B2B
          </Link>
        </div>
      </header>

      {/* Banner Propuesta de Valor Oficial */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-center space-y-4">
        <span className="bg-[#E8829C]/20 text-[#E8829C] border border-[#E8829C]/40 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
          TECNOLOGÍA CON ALMA & EMPATÍA | BAJA CARGA SENSORIAL (LEY TEA N° 21.545)
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white max-w-4xl mx-auto leading-tight">
          Diseñamos y desarrollamos soluciones tecnológicas amables y herramientas digitales a medida para emprendedores, PYMEs y comercios.
        </h2>
        <p className="text-sm md:text-base text-emerald-100/90 max-w-4xl mx-auto leading-relaxed">
          ASL Ideas SpA Casa Matriz combina diseño gráfico de alta sensibilidad visual con ingeniería de software accesible. Aunque nacimos impulsando el ecosistema de la salud y el bienestar integrativo, creamos plataformas e interfaces visuales adaptadas para potenciar negocios en cualquier área del mercado.
        </p>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-[#E8829C]/50 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#E8829C] text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 01
              </span>
              <img src="/logo-asl.png.png" alt="Logo ASL" className="w-8 h-8 object-contain bg-white rounded-lg p-0.5" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              ASL Ideas SpA
            </h3>
            <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
              Casa Matriz de innovación visual y tecnológica. Desarrollamos software a medida, licencias accesibles y consultoría en diseño inclusivo bajo la Ley TEA N° 21.545.
            </p>
            <div className="bg-[#121E19] p-4 rounded-2xl border border-emerald-900/60 text-xs space-y-2">
              <h4 className="font-bold text-[#E8829C]">Misión & Visión Corporativa:</h4>
              <p className="text-emerald-100/80"><strong>Misión:</strong> Diseñar aplicaciones web y móviles amables con baja carga sensorial, adaptadas a personas con neurodivergencias y neurotípicas, otorgando a distintas áreas mayor visibilidad e integrando personas con discapacidad al mundo laboral.</p>
              <p className="text-emerald-100/80"><strong>Visión:</strong> Liderar en tecnología accesible, conectando personas y PYMEs bajo la Ley N° 21.663.</p>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA"
            className="w-full py-3 bg-[#E8829C] hover:bg-[#d7718b] text-slate-950 font-black text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a ASL Ideas SpA
          </Link>
        </div>

        {/* OFICINA 02: LAWENMOLL */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-emerald-700/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-800 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 02
              </span>
              <img src="/logo-lawenmoll.jpg.png" alt="Logo LAWENMOLL" className="w-8 h-8 object-contain bg-white rounded-lg p-0.5" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              LAWENMOLL — Salud Integrativa & Fichas Cifradas
            </h3>
            <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
              Plataforma inteligente de evaluación metabólica y seguimiento clínico integrativo, diseñada para conectar pacientes con terapeutas y médicos de forma segura.
            </p>
            <div className="bg-[#121E19] p-4 rounded-2xl border border-emerald-900/60 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400">Características Principales:</h4>
              <ul className="space-y-1 text-emerald-100/80 list-disc list-inside">
                <li>Test Metabólico y Composición Corporal Inteligente.</li>
                <li>Fichas Clínicas SOAP encriptadas bajo estándar Ley N° 21.663.</li>
                <li>Telemedicina integrativa con seguimiento continuo.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=LAWENMOLL"
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a LAWENMOLL
          </Link>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-emerald-700/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-800 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 03
              </span>
              <img src="/logo-wellness.jpg.jpg" alt="Logo Wellness" className="w-8 h-8 object-contain bg-white rounded-lg p-0.5" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Wellness Web App — Movimiento Adaptado & Gastronomía Consciente
            </h3>
            <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
              Espacio visual e interactivo para conectar mente y cuerpo. Rutinas de ejercicio sin salto para reducir el cortisol junto a gastronomía saludable sin dietas restrictivas.
            </p>
            <div className="bg-[#121E19] p-4 rounded-2xl border border-emerald-900/60 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400">Experiencia Interactiva & Conexión:</h4>
              <ul className="space-y-1 text-emerald-100/80 list-disc list-inside">
                <li><strong>Conexión con Profesores:</strong> Asiste a clases en vivo en salas virtuales temáticas o visita la cuenta/perfil del instructor.</li>
                <li><strong>Gastronomía Saludable:</strong> Cocina demostrativa e ideas de alimentación nutritiva integrativa.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=Wellness%20Web%20App"
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Wellness Web App
          </Link>
        </div>

        {/* OFICINA 04: BIENESTAR */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-emerald-700/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-800 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 04
              </span>
              <img src="/logo-bienestar.png.png" alt="Logo Bienestar" className="w-8 h-8 object-contain bg-white rounded-lg p-0.5" />
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Bienestar — App de Mensajería, Salud Holística & Shopping PYME
            </h3>
            <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
              App de comunicación y retroalimentación de salud. Gestiona horas médicas, hidratación, ánimo, módulo Morfeo (descanso) y vitrina comercial PYME.
            </p>
            <div className="bg-[#121E19] p-4 rounded-2xl border border-emerald-900/60 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400">Módulos de Bienestar & Marketplace:</h4>
              <ul className="space-y-1 text-emerald-100/80 list-disc list-inside">
                <li><strong>Salud & Hábitos:</strong> Horas médicas, hidratación, ánimo y actividad física adaptada.</li>
                <li><strong>Chat & Shopping PYME:</strong> Conecta usuarios con las mejores PYMEs y potencia emprendimientos.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=Bienestar"
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Bienestar
          </Link>
        </div>

      </section>
    </main>
  );
}
