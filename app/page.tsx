'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-[#E0E6ED]' : 'bg-[#FAF8F5] text-[#2C3E35]'}`}>
      
      {/* Header Principal con Alto Contraste */}
      <header className={`max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4 border-b ${modoCalma ? 'bg-[#182635] border-[#78ACE9]/30 text-white' : 'bg-[#1B4D3E] border-[#52796F] text-white shadow-md'}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#52796F] flex items-center justify-center font-black text-white text-xl shadow-lg border border-[#A8B58A]/40">
            ASL
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
              ASL Ideas SpA
            </h1>
            <p className="text-xs text-[#A8B58A]">
              Ecosistema de Salud Digital Inclusiva & Red Cuerpo y Alma
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Boton Cuadrado de 3 Lineas (Menu Desplegable) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="w-10 h-10 rounded-xl bg-[#52796F] hover:bg-[#676E5E] text-white flex flex-col items-center justify-center gap-1 transition shadow-md border border-[#A8B58A]/40"
              title="Menu de Opciones y Redes"
            >
              <span className="w-5 h-0.5 bg-white rounded-full"></span>
              <span className="w-5 h-0.5 bg-white rounded-full"></span>
              <span className="w-5 h-0.5 bg-white rounded-full"></span>
            </button>

            {/* Desplegable Vertical de Menu */}
            {menuAbierto && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-slate-800 rounded-2xl shadow-2xl border border-[#52796F]/30 p-4 z-50 space-y-3">
                <div className="border-b border-slate-200 pb-2">
                  <p className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">Salas & Agenda</p>
                  <ul className="mt-1 space-y-1 text-xs">
                    <li>
                      <Link href="/sala-virtual?app=ASL%20Ideas%20SpA" className="block py-1 px-2 rounded hover:bg-[#FAF8F5] text-slate-700 hover:text-[#1B4D3E]">
                        Casa Matriz ASL Ideas SpA
                      </Link>
                    </li>
                    <li>
                      <Link href="/sala-virtual?app=LAWENMOLL" className="block py-1 px-2 rounded hover:bg-[#FAF8F5] text-slate-700 hover:text-[#1B4D3E]">
                        LAWENMOLL Telemedicina
                      </Link>
                    </li>
                    <li>
                      <Link href="/sala-virtual?app=Wellness%20Web%20App" className="block py-1 px-2 rounded hover:bg-[#FAF8F5] text-slate-700 hover:text-[#1B4D3E]">
                        Wellness Web App
                      </Link>
                    </li>
                    <li>
                      <Link href="/sala-virtual?app=Bienestar" className="block py-1 px-2 rounded hover:bg-[#FAF8F5] text-slate-700 hover:text-[#1B4D3E]">
                        Bienestar & Shopping PYME
                      </Link>
                    </li>
                    <li>
                      <Link href="/sala-virtual?tab=cita" className="block py-1 px-2 rounded bg-[#52796F] text-white font-bold text-center mt-2 hover:bg-[#1B4D3E]">
                        Agendar Cita B2B
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="border-b border-slate-200 pb-2">
                  <p className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">Redes Sociales Oficiales</p>
                  <div className="grid grid-cols-2 gap-1 mt-1 text-xs text-slate-600">
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#1B4D3E] underline">LinkedIn</a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#1B4D3E] underline">Instagram</a>
                    <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-[#1B4D3E] underline">TikTok</a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#1B4D3E] underline">YouTube</a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#1B4D3E] underline">Facebook</a>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold text-[#1B4D3E] uppercase tracking-wider">Contacto Directo</p>
                  <p className="text-[11px] text-slate-600 mt-1">Fono: +56 9 8330 2145</p>
                  <p className="text-[11px] text-slate-600">Correo: contacto@aslideas.cl</p>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition border ${modoCalma ? 'bg-[#78ACE9] text-[#101D2B] border-white' : 'bg-[#52796F] text-white border-[#A8B58A] hover:bg-[#676E5E]'}`}
          >
            {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>
          <Link
            href="/sala-virtual"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-800 text-white hover:bg-slate-700 transition shadow-md border border-slate-600"
          >
            Sala Virtual B2B
          </Link>
        </div>
      </header>

      {/* Banner Principal */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-center space-y-4">
        <span className="bg-[#52796F]/20 text-[#1B4D3E] border border-[#52796F]/40 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
          Unete a la Red Cuerpo y Alma B2B
        </span>
        <h2 className="text-2xl md:text-4xl font-black max-w-4xl mx-auto leading-tight text-[#1B4D3E]">
          Transformamos la Salud Digital con Tecnologia Amable, Accesible e Inclusiva
        </h2>
        <p className="text-sm md:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Diseñado por y para neurodivergencias (TEA/TDAH) y condiciones cronicas. Al sumarte a nuestra red como empresa, profesional o colaborador B2B, te favoreces al multiplicar tu alcance y cambiar la calidad de vida de miles de personas.
        </p>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01 */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#1B4D3E] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 01
              </span>
              <span className="text-xs text-[#52796F] font-bold">Casa Matriz & Alianzas B2B</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#1B4D3E]">
              ASL Ideas SpA — Quienes Somos & Red Cuerpo y Alma
            </h3>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              <strong>Quienes Somos:</strong> Fundados por una Diseñadora Grafica con neurodivergencia (TEA 1 / TDAH) y condiciones cronicas, transformamos la vivencia del autocuidado eliminando la sobrecarga sensorial y la culpa.
            </p>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#52796F]/20 text-xs space-y-2">
              <h4 className="font-bold text-[#1B4D3E]">Beneficios de Suscribirse y Ser Colaborador B2B:</h4>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li><strong>Beneficio de Red:</strong> Formaras parte de la red Cuerpo y Alma para llegar a muchas mas personas.</li>
                <li><strong>Cumplimiento Normativo:</strong> Consultoria en Ley TEA N° 21.545 y Ley N° 21.663 (Ciberseguridad).</li>
                <li><strong>Vitrinas Accesibles:</strong> Software adaptado para PYMEs y profesionales.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA"
            className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Casa Matriz & Red B2B
          </Link>
        </div>

        {/* OFICINA 02 */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#1B4D3E] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 02
              </span>
              <span className="text-xs text-[#52796F] font-bold">Diagnostico & Telemedicina</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#1B4D3E]">
              LAWENMOLL — Salud Integrativa & Fichas Cifradas
            </h3>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              Plataforma inteligente de evaluacion metabolica y seguimiento clinico integrativo, diseñada para conectar pacientes con terapeutas y medicos de forma segura.
            </p>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#52796F]/20 text-xs space-y-2">
              <h4 className="font-bold text-[#1B4D3E]">Caracteristicas Principales:</h4>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li>Test Metabolico y Composicion Corporal Inteligente.</li>
                <li>Fichas Clinicas SOAP encriptadas bajo estandar Ley N° 21.663.</li>
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

        {/* OFICINA 03 */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#1B4D3E] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 03
              </span>
              <span className="text-xs text-[#52796F] font-bold">Mente, Cuerpo & Gastronomia</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#1B4D3E]">
              Wellness Web App — Movimiento Adaptado & Gastronomia Consciente
            </h3>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              Espacio visual e interactivo para conectar mente y cuerpo. Rutinas de ejercicio sin salto para proteger tus articulaciones y reducir el cortisol urbano, junto a recetas saludables sin dietas punitivas.
            </p>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#52796F]/20 text-xs space-y-2">
              <h4 className="font-bold text-[#1B4D3E]">Experiencia Interactiva & Conexion:</h4>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li><strong>Conexion con Profesores:</strong> Clases en vivo en salas virtuales o visita perfiles de instructores.</li>
                <li><strong>Gastronomia Saludable:</strong> Cocina demostrativa e ideas de alimentacion nutritiva.</li>
                <li><strong>Pausas Activas:</strong> Modulos anti-estres diseñados para el entorno laboral.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=Wellness%20Web%20App"
            className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Wellness Web App
          </Link>
        </div>

        {/* OFICINA 04 */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#1B4D3E] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 04
              </span>
              <span className="text-xs text-[#52796F] font-bold">Mensajeria, Salud & Shopping PYME</span>
            </div>
            <h3 className="text-xl font-extrabold text-[#1B4D3E]">
              Bienestar — App de Mensajeria, Salud Holistica & Conexion Comercial
            </h3>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
              App interactiva de comunicacion y retroalimentacion en salud. Permite gestionar tu vida diaria, cuidar tu salud emocional y conectar con las mejores PYMEs y emprendimientos.
            </p>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#52796F]/20 text-xs space-y-2">
              <h4 className="font-bold text-[#1B4D3E]">Modulos de Bienestar & Marketplace:</h4>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li><strong>Salud & Habitos:</strong> Horas medicas, hidratacion, animo y actividad fisica.</li>
                <li><strong>Modulo Morfeo:</strong> Seguimiento y recomendacion para un descanso reparador.</li>
                <li><strong>Chat, Agenda & Shopping:</strong> Conecta a personas naturales con PYMEs recomendadas.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=Bienestar"
            className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Bienestar
          </Link>
        </div>

      </section>
    </main>
  );
}
