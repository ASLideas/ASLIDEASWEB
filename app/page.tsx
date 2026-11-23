'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#FAF8F5] text-[#2C3E35]' : 'bg-slate-900 text-white'}`}>
      {/* Header Principal */}
      <header className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#52796F] flex items-center justify-center font-black text-white text-xl shadow-lg border border-[#84A59D]/40">
            ASL
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-emerald-400">
              ASL Ideas SpA
            </h1>
            <p className="text-xs text-slate-300">
              Ecosistema de Salud Digital Inclusiva & Red Cuerpo y Alma
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition"
          >
            {modoCalma ? '🌿 Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>
          <Link
            href="/sala-virtual"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#52796F] text-white hover:bg-[#676E5E] transition shadow-md flex items-center gap-2"
          >
            📹 Sala Virtual B2B
          </Link>
        </div>
      </header>

      {/* Banner Propuesta de Valor & Red Cuerpo y Alma */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-center space-y-4">
        <span className="bg-[#52796F]/20 text-emerald-400 border border-emerald-500/30 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
          Únete a la Red &quot;Cuerpo y Alma&quot; B2B
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white max-w-4xl mx-auto leading-tight">
          Transformamos la Salud Digital con Tecnología Amable, Accesible e Inclusiva
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Diseñado por y para neurodivergencias (TEA/TDAH) y condiciones crónicas. Al sumarte a nuestra red como empresa, profesional o colaborador B2B, te favoreces al multiplicar tu alcance y cambiar la calidad de vida de miles de personas.
        </p>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA (Quiénes Somos & Red B2B) */}
        <div className="bg-slate-800/80 p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 01
              </span>
              <span className="text-xs text-emerald-400 font-bold">Casa Matriz & Alianzas B2B</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              ASL Ideas SpA — Quiénes Somos & Red &quot;Cuerpo y Alma&quot;
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              <strong>Quiénes Somos:</strong> Fundados por una Diseñadora Gráfica con neurodivergencia (TEA 1 / TDAH) y condiciones crónicas, transformamos la vivencia del autocuidado eliminando la sobrecarga sensorial y la culpa.
            </p>
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400">🚀 Beneficios de Suscribirse y Ser Colaborador B2B:</h4>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li><strong>Beneficio de Red:</strong> Formarás parte de la red &quot;Cuerpo y Alma&quot;, siendo favorecido para llegar a muchas más personas y potenciar tu impacto.</li>
                <li><strong>Cumplimiento Normativo:</strong> Consultoría en Ley TEA N° 21.545 y Ley de Ciberseguridad N° 21.663.</li>
                <li><strong>Vitrinas Accesibles:</strong> Software e infraestructura amable adaptada para PYMEs.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA"
            className="w-full py-3 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Casa Matriz & Red B2B
          </Link>
        </div>

        {/* OFICINA 02: LAWENMOLL (Salud Integrativa) */}
        <div className="bg-slate-800/80 p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 02
              </span>
              <span className="text-xs text-emerald-400 font-bold">Diagnóstico & Telemedicina</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              LAWENMOLL — Salud Integrativa & Fichas Cifradas
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Plataforma inteligente de evaluación metabólica y seguimiento clínico integrativo, diseñada para conectar pacientes con terapeutas y médicos de forma segura.
            </p>
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400">🧪 Características Principales:</h4>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li>Test Metabólico y Composición Corporal Inteligente.</li>
                <li>Fichas Clínicas SOAP encriptadas bajo estándar Ley N° 21.663.</li>
                <li>Telemedicina integrativa con seguimiento continuo.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=LAWENMOLL"
            className="w-full py-3 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a LAWENMOLL
          </Link>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP (Movimiento Adaptado & Gastronomía) */}
        <div className="bg-slate-800/80 p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 03
              </span>
              <span className="text-xs text-emerald-400 font-bold">Mente, Cuerpo & Gastronomía</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Wellness Web App — Movimiento Adaptado & Gastronomía Consciente
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Espacio visual e interactivo para conectar mente y cuerpo. Rutinas de ejercicio sin salto para proteger tus articulaciones y reducir el cortisol urbano, junto a recetas saludables sin dietas punitivas.
            </p>
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400">🧘‍♀️ Experiencia Interactiva & Conexión:</h4>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li><strong>Conexión con Profesores:</strong> Asiste a clases en vivo en salas virtuales temáticas o visita la cuenta/perfil del instructor en cualquier momento.</li>
                <li><strong>Gastronomía Saludable:</strong> Cocina demostrativa e ideas de alimentación nutritiva e integrativa.</li>
                <li><strong>Pausas Activas:</strong> Módulos anti-estrés diseñados para el entorno laboral y personal.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=Wellness%20Web%20App"
            className="w-full py-3 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Wellness Web App
          </Link>
        </div>

        {/* OFICINA 04: BIENESTAR (Mensajería, Salud Holística & Shopping PYME) */}
        <div className="bg-slate-800/80 p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 04
              </span>
              <span className="text-xs text-emerald-400 font-bold">Mensajería, Salud & Shopping PYME</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Bienestar — App de Mensajería, Salud Holística & Conexión Comercial
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              App interactiva de comunicación y retroalimentación en salud. Permite gestionar tu vida diaria, cuidar tu salud emocional y conectar con las mejores PYMEs y emprendimientos.
            </p>
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400">📲 Módulos de Bienestar & Marketplace:</h4>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li><strong>Salud & Hábitos:</strong> Recordatorio de horas médicas, hidratación, registro de estado de ánimo y sugerencia de actividad física.</li>
                <li><strong>Módulo Morfeo:</strong> Seguimiento y recomendación para un descanso reparador.</li>
                <li><strong>Chat, Agenda & Shopping:</strong> Conecta a personas naturales con PYMEs recomendadas y visibiliza tus propios emprendimientos.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=Bienestar"
            className="w-full py-3 bg-[#52796F] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Bienestar
          </Link>
        </div>

      </section>
    </main>
  );
}
