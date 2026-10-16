'use client';

import React from 'react';
import Link from 'next/link';

export default function PublicHome() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans">
      <header className="bg-white border-b border-[#84A59D]/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#1B4D3E] text-[#FAF8F5] flex items-center justify-center font-bold text-sm tracking-wider">
              ASL
            </div>
            <div>
              <span className="text-lg font-bold text-[#1B4D3E] tracking-tight">ASL Ideas SpA</span>
              <p className="text-xs text-[#52796F]">Ecosistema de Salud Digital Inclusiva</p>
            </div>
          </div>

          <nav className="flex items-center space-x-6 text-sm font-medium text-[#52796F]">
            <a href="#portales" className="hover:text-[#1B4D3E] transition">Portales</a>
            <a href="#videollamadas" className="hover:text-[#1B4D3E] transition">Salas en Vivo</a>
            <a href="#comunidad" className="hover:text-[#1B4D3E] transition">Contacto</a>
            <Link href="/admin" className="text-xs bg-[#FAF8F5] border border-[#84A59D]/40 px-3.5 py-1.5 rounded-full hover:bg-[#84A59D]/10 text-[#1B4D3E]">
              Acceso Privado
            </Link>
          </nav>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <span className="inline-block bg-[#84A59D]/20 text-[#1B4D3E] text-xs px-4 py-1.5 rounded-full font-semibold mb-6">
          Tecnología Amable & Accesibilidad Cognitiva
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1B4D3E] leading-tight mb-6 max-w-3xl mx-auto">
          Salud Integrativa y Bienestar Diseñado para Todas las Personas
        </h1>
        <p className="text-base md:text-lg text-[#52796F] max-w-2xl mx-auto mb-10 leading-relaxed">
          Sin sobrecarga sensorial, con interfaces claras e intuitivas pensadas para acompañar de forma respetuosa el autocuidado y la prevención.
        </p>

        <div id="videollamadas" className="bg-white p-8 rounded-2xl border border-[#84A59D]/30 shadow-sm max-w-xl mx-auto mb-16 text-left">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#B08D4B] uppercase tracking-wider">Sesiones en Vivo</span>
            <span className="flex items-center text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              Salas Disponibles
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#1B4D3E] mb-2">Unirse a Reunión o Taller Virtual</h2>
          <p className="text-xs text-[#52796F] mb-6">Acceso directo a las salas de pausa activa, movimiento sin impacto e integración comunitaria.</p>
          
          <button className="w-full bg-[#1B4D3E] text-white py-3 px-6 rounded-xl font-semibold text-sm hover:bg-[#2D6A4F] transition shadow-sm flex items-center justify-center space-x-2">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>Entrar a la Sala Virtual de Hoy</span>
          </button>
        </div>
      </section>

      <section id="portales" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-[#1B4D3E] text-center mb-10">Portales de Experiencia y Salud</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-[#84A59D]/30 shadow-sm hover:border-[#52796F] transition">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#84A59D]/30 flex items-center justify-center text-[#1B4D3E] mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E] mb-2">ASL Ideas SpA (Casa Matriz)</h3>
            <p className="text-sm text-[#52796F] leading-relaxed mb-6">
              Desarrollo de software a medida, licencias tecnológicas y consultoría en accesibilidad UI/UX para instituciones y empresas.
            </p>
            <Link href="/aslideas" className="text-xs font-semibold text-[#1B4D3E] hover:underline">
              Explorar Soluciones B2B &rarr;
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#84A59D]/30 shadow-sm hover:border-[#52796F] transition">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#84A59D]/30 flex items-center justify-center text-[#1B4D3E] mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E] mb-2">LAWENMOLL (Salud Integrativa)</h3>
            <p className="text-sm text-[#52796F] leading-relaxed mb-6">
              Test de Bienestar Inteligente, cálculo metabólico y Fichas Clínicas encriptadas bajo la Ley N° 21.663.
            </p>
            <Link href="/lawenmoll" className="text-xs font-semibold text-[#1B4D3E] hover:underline">
              Ir a Evaluación LAWENMOLL &rarr;
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#84A59D]/30 shadow-sm hover:border-[#52796F] transition">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#84A59D]/30 flex items-center justify-center text-[#1B4D3E] mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E] mb-2">Wellness Web App</h3>
            <p className="text-sm text-[#52796F] leading-relaxed mb-6">
              Movimiento adaptado sin impacto, salas virtuales de relajación y rutinas de ejercicio amables para articulaciones.
            </p>
            <Link href="/wellness" className="text-xs font-semibold text-[#1B4D3E] hover:underline">
              Ver Videoteca y Rutinas &rarr;
            </Link>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#84A59D]/30 shadow-sm hover:border-[#52796F] transition">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#84A59D]/30 flex items-center justify-center text-[#1B4D3E] mb-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E] mb-2">Sabiduría Ancestral</h3>
            <p className="text-sm text-[#52796F] leading-relaxed mb-6">
              Diario Mural comunitario "Secretos de la Abuela", guía de herbolaria nativa y descarga directa de recetarios en PDF.
            </p>
            <Link href="/bienestar" className="text-xs font-semibold text-[#1B4D3E] hover:underline">
              Descubrir Recetas y Fichas &rarr;
            </Link>
          </div>
        </div>
      </section>

      <footer id="comunidad" className="bg-[#1B4D3E] text-[#FAF8F5] mt-20 py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-bold text-lg mb-2">ASL Ideas SpA</h4>
            <p className="text-xs text-[#84A59D] leading-relaxed">
              Tecnología e innovación inclusiva orientada a elevar la calidad de vida y humanizar la salud digital.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3">Redes Sociales Oficiales</h4>
            <ul className="space-y-2 text-xs text-[#FAF8F5]">
              <li><a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn (Enfoque Corporativo B2B)</a></li>
              <li><a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline">Instagram (Consejos & Autocuidado)</a></li>
              <li><a href="[suspicious link removed]" target="_blank" rel="noreferrer" className="hover:underline">YouTube (Ejercicios & Videoteca)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3">Contacto Directo</h4>
            <p className="text-xs text-[#84A59D]">
              Soporte habilitado por WhatsApp & Telegram.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-6 border-t border-[#52796F]/40 text-center text-xs text-[#84A59D]">
          &copy; {new Date().getFullYear()} ASL Ideas SpA. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
