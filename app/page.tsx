'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-[#90B2D9]' : 'bg-[#FAF8F5] text-[#2C3E35]'}`}>
      {/* Header Principal con Logo Oficial y Contraste */}
      <header className={`max-w-7xl mx-auto px-4 py-5 flex items-center justify-between gap-4 border-b ${modoCalma ? 'border-slate-800 bg-[#0B132B]' : 'border-[#52796F]/30 bg-[#1B4D3E] text-white'} rounded-b-2xl shadow-lg`}>
        <div className="flex items-center gap-3">
          <img 
            src="/LOGO_asl.png" 
            alt="Logo ASL Ideas SpA" 
            className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-[#84A59D]/40 shadow"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
              ASL Ideas SpA
            </h1>
            <p className="text-xs text-slate-200 opacity-90">
              Ecosistema de Salud Digital Inclusiva & Red Cuerpo y Alma
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Botón Cuadrado de 3 Líneas (Menú Desplegable) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="w-10 h-10 rounded-xl bg-[#52796F] text-white flex flex-col items-center justify-center gap-1 border border-[#84A59D]/40 hover:bg-[#676E5E] transition shadow-md"
              aria-label="Abrir Menú"
            >
              <span className="w-5 h-0.5 bg-white rounded-full"></span>
              <span className="w-5 h-0.5 bg-white rounded-full"></span>
              <span className="w-5 h-0.5 bg-white rounded-full"></span>
            </button>

            {menuAbierto && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 text-white rounded-2xl shadow-2xl p-4 z-50 space-y-3">
                <div className="border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block">Salas & Agendamiento</span>
                  <Link href="/sala-virtual?tab=cita" className="text-xs font-bold hover:text-emerald-400 block py-1">Agendar Cita B2B</Link>
                  <Link href="/sala-virtual" className="text-xs font-bold hover:text-emerald-400 block py-1">Ingresar a Sala Virtual</Link>
                </div>
                <div className="border-b border-slate-800 pb-2">
                  <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block">Redes Sociales Oficiales</span>
                  <div className="grid grid-cols-2 gap-1 text-[11px] pt-1 text-slate-300">
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
                    <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-white">TikTok</a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white">YouTube</a>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block">Contacto Directo</span>
                  <p className="text-[11px] text-slate-300 mt-1">Fono: +56 9 8330 2145</p>
                  <p className="text-[11px] text-slate-300">Email: contacto@aslideas.cl</p>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-800 text-slate-100 border border-slate-700 hover:bg-slate-700 transition"
          >
            {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>
          
          <Link
            href="/sala-virtual"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#52796F] text-white hover:bg-[#676E5E] transition shadow-md"
          >
            Sala Virtual B2B
          </Link>
        </div>
      </header>

      {/* Banner Propuesta de Valor */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-center space-y-4">
        <span className="bg-[#52796F]/20 text-[#1B4D3E] border border-[#52796F]/40 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Red Cuerpo y Alma B2B
        </span>
        <h2 className="text-2xl md:text-4xl font-black max-w-4xl mx-auto leading-tight text-[#1B4D3E]">
          Transformamos la Salud Digital con Tecnología Amable, Accesible e Inclusiva
        </h2>
        <p className="text-sm md:text-base max-w-3xl mx-auto leading-relaxed text-[#52796F]">
          Diseñado por y para neurodivergencias (TEA/TDAH) y condiciones crónicas. Al sumarte a nuestra red como empresa, profesional o colaborador B2B, te favoreces al multiplicar tu alcance y cambiar la calidad de vida de miles de personas.
        </p>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#1B4D3E] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 01
              </span>
              <span className="text-xs text-[#1B4D3E] font-bold">Casa Matriz & Alianzas B2B</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#1B4D3E]">
              ASL Ideas SpA — Quiénes Somos & Red Cuerpo y Alma
            </h3>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              <strong>Quiénes Somos:</strong> Fundados por una Diseñadora Gráfica con neurodivergencia (TEA 1 / TDAH) y condiciones crónicas, transformamos la vivencia del autocuidado eliminando la sobrecarga sensorial y la culpa.
            </p>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#A8B58A] text-xs space-y-2">
              <h4 className="font-bold text-[#1B4D3E]">Beneficios de Suscribirse y Ser Colaborador B2B:</h4>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li><strong>Beneficio de Red:</strong> Formarás parte de la red Cuerpo y Alma, siendo favorecido para llegar a muchas más personas.</li>
                <li><strong>Cumplimiento Normativo:</strong> Consultoría en Ley TEA N° 21.545 y Ley de Ciberseguridad N° 21.663.</li>
                <li><strong>Vitrinas Accesibles:</strong> Software e infraestructura amable adaptada para PYMEs.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA"
            className="w-full py-3 bg-[#1B4D3E] hover:bg-[#52796F] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Casa Matriz & Red B2B
          </Link>
        </div>

        {/* OFICINA 02: LAWENMOLL */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 02
              </span>
              <span className="text-xs text-[#52796F] font-bold">Diagnóstico & Telemedicina</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#1B4D3E]">
              LAWENMOLL — Salud Integrativa & Fichas Cifradas
            </h3>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              Plataforma inteligente de evaluación metabólica y seguimiento clínico integrativo, diseñada para conectar pacientes con terapeutas y médicos de forma segura.
            </p>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#A8B58A] text-xs space-y-2">
              <h4 className="font-bold text-[#1B4D3E]">Características Principales:</h4>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li>Test Metabólico y Composición Corporal Inteligente.</li>
                <li>Fichas Clínicas SOAP encriptadas bajo estándar Ley N° 21.663.</li>
                <li>Telemedicina integrativa con seguimiento continuo.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=LAWENMOLL"
            className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a LAWENMOLL
          </Link>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP (EN CONSTRUCCIÓN) */}
        <div className="bg-white p-6 rounded-3xl border-2 border-amber-500/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-amber-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 03
              </span>
              <span className="bg-amber-500/20 text-amber-700 border border-amber-500/40 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                En Construcción - Próximamente
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[#1B4D3E]">
              Wellness Web App — Movimiento Adaptado & Gastronomía
            </h3>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              Espacio visual e interactivo para conectar mente y cuerpo. Rutinas de ejercicio sin salto para proteger tus articulaciones y reducir el cortisol urbano, junto a recetas saludables sin dietas punitivas.
            </p>
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 text-xs space-y-2">
              <h4 className="font-bold text-amber-800">Experiencia en Desarrollo:</h4>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li><strong>Conexión con Profesores:</strong> Clases en vivo en salas temáticas y perfiles de instructores.</li>
                <li><strong>Gastronomía Saludable:</strong> Cocina demostrativa e ideas de alimentación nutritiva.</li>
                <li><strong>Pausas Activas:</strong> Módulos anti-estrés laborales.</li>
              </ul>
            </div>
          </div>
          <div className="w-full py-3 bg-amber-100 border border-amber-300 text-amber-800 font-bold text-xs rounded-xl text-center shadow block cursor-not-allowed">
            Wellness Web App — En Construcción (Próximamente)
          </div>
        </div>

        {/* OFICINA 04: BIENESTAR (EN CONSTRUCCIÓN) */}
        <div className="bg-white p-6 rounded-3xl border-2 border-amber-500/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-amber-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 04
              </span>
              <span className="bg-amber-500/20 text-amber-700 border border-amber-500/40 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                En Construcción - Próximamente
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[#1B4D3E]">
              Bienestar — Mensajería, Salud Holística & Shopping PYME
            </h3>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              App interactiva de comunicación y retroalimentación en salud. Permite gestionar tu vida diaria, cuidar tu salud emocional y conectar con las mejores PYMEs y emprendimientos.
            </p>
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200 text-xs space-y-2">
              <h4 className="font-bold text-amber-800">Módulos en Desarrollo:</h4>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li><strong>Salud & Hábitos:</strong> Recordatorio de horas médicas, hidratación y estado de ánimo.</li>
                <li><strong>Módulo Morfeo:</strong> Seguimiento para descanso reparador.</li>
                <li><strong>Chat & Shopping:</strong> Marketplace para conectar personas con PYMEs recomendadas.</li>
              </ul>
            </div>
          </div>
          <div className="w-full py-3 bg-amber-100 border border-amber-300 text-amber-800 font-bold text-xs rounded-xl text-center shadow block cursor-not-allowed">
            Bienestar — En Construcción (Próximamente)
          </div>
        </div>

      </section>
    </main>
  );
}
