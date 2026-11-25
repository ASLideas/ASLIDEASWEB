'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#FAF8F5] text-[#2C3E35]' : 'bg-slate-900 text-white'}`}>
      {/* Header Principal */}
      <header className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/50 relative">
        <div className="flex items-center gap-3">
          <img src="/LOGO_asl.png" alt="ASL Ideas SpA Logo" className="w-12 h-12 object-contain" />
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-emerald-400">
              ASL Ideas SpA
            </h1>
            <p className="text-xs text-slate-300">
              Diseño y Vitrinas Virtuales para PYMEs & Desarrollo Accesible
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Menu Desplegable de 3 Lineas */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="px-3 py-2 text-xs font-bold rounded-xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition flex items-center gap-2"
              aria-label="Abrir Menu de Navegacion"
            >
              <div className="space-y-1">
                <span className="block w-4 h-0.5 bg-slate-200"></span>
                <span className="block w-4 h-0.5 bg-slate-200"></span>
                <span className="block w-4 h-0.5 bg-slate-200"></span>
              </div>
              <span>Menu</span>
            </button>

            {menuAbierto && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 text-xs space-y-3">
                <div className="font-bold text-emerald-400 pb-1 border-b border-slate-700">Navegacion & Oficinas</div>
                <ul className="space-y-2 text-slate-200">
                  <li><Link href="#oficinas" onClick={() => setMenuAbierto(false)} className="hover:text-emerald-400 block py-1">Salas & Vitrinas Virtuales</Link></li>
                  <li><Link href="/sala-virtual" onClick={() => setMenuAbierto(false)} className="hover:text-emerald-400 block py-1">Agendar Cita B2B</Link></li>
                </ul>
                <div className="font-bold text-emerald-400 pt-2 pb-1 border-b border-slate-700">Redes Sociales Oficiales</div>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400">LinkedIn</a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400">Instagram</a>
                  <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400">TikTok</a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400">YouTube</a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400">Facebook</a>
                </div>
                <div className="font-bold text-emerald-400 pt-2 pb-1 border-b border-slate-700">Contacto Directo</div>
                <div className="text-slate-300 space-y-1">
                  <p>Fono: +56 9 8330 2145</p>
                  <p>Correo: contacto@aslideas.cl</p>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition"
          >
            {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>
          <Link
            href="/sala-virtual"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#52796F] text-white hover:bg-[#1B4D3E] transition shadow-md block"
          >
            Sala Virtual B2B
          </Link>
        </div>
      </header>

      {/* Banner Propuesta de Valor */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-center space-y-4">
        <span className="bg-[#52796F]/20 text-emerald-400 border border-emerald-500/30 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
          Desarrollo de Apps & Vitrinas Virtuales
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white max-w-4xl mx-auto leading-tight">
          Diseño y Vitrinas Virtuales para PYMEs & Soluciones Tecnologicas Accesibles
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Diseñamos y desarrollamos soluciones tecnologicas amables e interfaces visuales a medida para potenciar emprendedores, PYMEs y comercios en cualquier area del mercado. ASL Ideas SpA Casa Matriz combina diseño grafico de alta sensibilidad visual con ingenieria de software accesible, adaptada para personas neurodivergentes y neurotipicas.
        </p>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section id="oficinas" className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA (Casa Matriz & Alianzas B2B) */}
        <div className="bg-slate-800/80 p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 01
              </span>
              <span className="text-xs text-emerald-400 font-bold">Casa Matriz & Alianzas B2B</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              ASL Ideas SpA — Desarrollo de Apps & Vitrinas Virtuales
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              <strong>Quienes Somos:</strong> Fundados por una Diseñadora Grafica con neurodivergencia (TEA 1 / TDAH), creamos interfaces amables que eliminan la sobrecarga sensorial y potencian las ventas y la presencia digital de comercios y emprendimientos.
            </p>
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400">Servicios Destacados:</h4>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li>Diseño de Vitrinas Virtuales a medida para comercio asociado.</li>
                <li>Desarrollo de Aplicaciones Web amables e intuitivas.</li>
                <li>Asesoria y prototipado visual adaptado para neurodivergencias.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA"
            className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Casa Matriz B2B
          </Link>
        </div>

        {/* OFICINA 02: LAWENMOLL */}
        <div className="bg-slate-800/80 p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 02
              </span>
              <span className="text-xs text-emerald-400 font-bold">Plataforma Visual B2B</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              LAWENMOLL — Gestion Visual de Servicios & Alianzas
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Plataforma visual e interfaz accesible diseñada para gestionar vitrinas de servicios, integracion comercial y catalogos digitales interactivos para PYMEs.
            </p>
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400">Modulos de Integracion:</h4>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li>Catalogos digitales accesibles y amables.</li>
                <li>Integracion de vitrinas de servicios B2B.</li>
                <li>Agendamiento y gestion de citas comerciales.</li>
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

        {/* OFICINA 03: WELLNESS WEB APP (En Construcción) */}
        <div className="bg-slate-800/50 p-6 rounded-3xl border-2 border-slate-700/50 shadow-xl flex flex-col justify-between space-y-5 opacity-90">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-amber-600/30 text-amber-300 border border-amber-500/40 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                En Construccion - Proximamente
              </span>
              <span className="text-xs text-amber-300 font-bold">Oficina 03</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-200">
              Wellness Web App — Vitrina Interactiva
            </h3>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              Espacio visual en desarrollo para la conexion de emprendimientos del area del movimiento adaptado, estilo de vida y contenidos interactivos.
            </p>
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-1">
              <p>Modulo proximo a ser liberado para la red de comercios asociados.</p>
            </div>
          </div>
          <button
            disabled
            className="w-full py-3 bg-slate-700 text-slate-400 font-bold text-xs rounded-xl cursor-not-allowed text-center block"
          >
            En Construccion
          </button>
        </div>

        {/* OFICINA 04: BIENESTAR (En Construcción) */}
        <div className="bg-slate-800/50 p-6 rounded-3xl border-2 border-slate-700/50 shadow-xl flex flex-col justify-between space-y-5 opacity-90">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-amber-600/30 text-amber-300 border border-amber-500/40 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                En Construccion - Proximamente
              </span>
              <span className="text-xs text-amber-300 font-bold">Oficina 04</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-200">
              Bienestar — Marketplace & Messaging App
            </h3>
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              App interactiva de comunicacion, recomendacion de PYMEs y vitrina comercial para visibilizar emprendimientos de la red.
            </p>
            <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400 space-y-1">
              <p>Modulo proximo a ser liberado para la comunidad de usuarios y negocios.</p>
            </div>
          </div>
          <button
            disabled
            className="w-full py-3 bg-slate-700 text-slate-400 font-bold text-xs rounded-xl cursor-not-allowed text-center block"
          >
            En Construccion
          </button>
        </div>

      </section>
    </main>
  );
}
