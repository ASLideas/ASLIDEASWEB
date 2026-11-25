'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-slate-100' : 'bg-[#FAF8F5] text-[#1B4D3E]'}`}>
      {/* Header Principal con Alto Contraste */}
      <header className={`max-w-7xl mx-auto px-4 py-4 m-2 rounded-2xl shadow-xl transition-colors ${modoCalma ? 'bg-[#1C2A3A] border border-[#78ACE9]/40' : 'bg-[#1B4D3E] text-white border border-[#52796F]'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo-asl.png.png"
              alt="ASL Ideas SpA"
              className="w-12 h-12 rounded-xl bg-white p-1 object-contain border border-[#97A884]"
            />
            <div>
              <h1 className="text-lg md:text-xl font-black tracking-tight text-white">
                ASL Ideas SpA
              </h1>
              <p className="text-xs text-slate-200">
                Ecosistema de Salud Digital Inclusiva & Red Cuerpo y Alma
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setModoCalma(!modoCalma)}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition shadow ${modoCalma ? 'bg-[#78ACE9] text-[#101D2B]' : 'bg-[#A8B58A] text-[#1B4D3E] hover:bg-white'}`}
            >
              {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
            </button>

            {/* Cuadrado de 3 lineas (Menu Desplegable) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="w-10 h-10 flex flex-col items-center justify-center gap-1 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition"
                aria-label="Menu"
              >
                <div className="w-5 h-0.5 bg-white rounded"></div>
                <div className="w-5 h-0.5 bg-white rounded"></div>
                <div className="w-5 h-0.5 bg-white rounded"></div>
              </button>

              {menuAbierto && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-[#97A884] p-4 text-[#1B4D3E] z-50 text-xs space-y-3">
                  <div className="font-black border-b border-slate-200 pb-2 text-sm text-[#1B4D3E]">
                    Navegacion & Accesos B2B
                  </div>

                  <div>
                    <span className="font-bold text-[#52796F] block mb-1">Salas Virtuales:</span>
                    <div className="space-y-1 pl-2">
                      <Link href="/sala-virtual?app=ASL%20Ideas%20SpA" className="block hover:text-[#52796F] font-medium">ASL Ideas SpA - Casa Matriz</Link>
                      <Link href="/sala-virtual?app=LAWENMOLL" className="block hover:text-[#52796F] font-medium">LAWENMOLL - Telemedicina</Link>
                      <Link href="/sala-virtual?app=Wellness%20Web%20App" className="block hover:text-[#52796F] font-medium">Wellness Web App - Gastronomia</Link>
                      <Link href="/sala-virtual?app=Bienestar" className="block hover:text-[#52796F] font-medium">Bienestar - Shopping PYME</Link>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-2">
                    <Link
                      href="/sala-virtual?tab=cita"
                      className="block w-full text-center py-2 bg-[#52796F] text-white font-bold rounded-xl hover:bg-[#1B4D3E] transition"
                    >
                      Agendar Cita B2B
                    </Link>
                  </div>

                  <div className="border-t border-slate-200 pt-2 space-y-1">
                    <span className="font-bold text-[#52796F] block">Redes Sociales Oficiales:</span>
                    <p className="text-[11px] text-slate-600">LinkedIn | Instagram | TikTok | YouTube | Facebook</p>
                  </div>

                  <div className="border-t border-slate-200 pt-2 space-y-1">
                    <span className="font-bold text-[#52796F] block">Contacto Directo:</span>
                    <p className="text-[11px] text-slate-700">Fono: +56 9 8330 2145</p>
                    <p className="text-[11px] text-slate-700">Email: contacto@aslideas.cl</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Banner Propuesta de Valor */}
      <section className="max-w-7xl mx-auto px-4 py-8 text-center space-y-4">
        <span className="bg-[#E8A5A5]/30 text-[#1B4D3E] border border-[#E8A5A5] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
          Red Cuerpo y Alma B2B
        </span>
        <h2 className={`text-2xl md:text-4xl font-black max-w-4xl mx-auto leading-tight ${modoCalma ? 'text-slate-100' : 'text-[#1B4D3E]'}`}>
          Transformamos la Salud Digital con Tecnologia Amable, Accesible e Inclusiva
        </h2>
        <p className={`text-sm md:text-base max-w-3xl mx-auto leading-relaxed ${modoCalma ? 'text-slate-300' : 'text-slate-700'}`}>
          Disenado para neurodivergencias (TEA/TDAH) y condiciones cronicas. Al sumarte a nuestra red como empresa o colaborador B2B, multiplicas tu alcance y mejoras la calidad de vida de miles de personas.
        </p>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01 */}
        <div className={`p-6 rounded-3xl border-2 shadow-xl flex flex-col justify-between space-y-5 ${modoCalma ? 'bg-[#1C2A3A] border-[#78ACE9]/40 text-slate-100' : 'bg-white border-[#A8B58A] text-[#1B4D3E]'}`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#1B4D3E] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 01
              </span>
              <img src="/logo-asl.png.png" alt="Logo ASL" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="text-xl font-extrabold">ASL Ideas SpA — Quienes Somos & Red Cuerpo y Alma</h3>
            <p className="text-xs md:text-sm leading-relaxed">
              <strong>Quienes Somos:</strong> Fundados por una Disenadora Grafica con neurodivergencia (TEA 1 / TDAH) y condiciones cronicas, transformamos el autocuidado eliminando sobrecarga sensorial.
            </p>
            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${modoCalma ? 'bg-[#101D2B] border-slate-700' : 'bg-[#FAF8F5] border-[#97A884]'}`}>
              <h4 className="font-bold text-[#52796F]">Beneficios de Suscribirse y Ser Colaborador B2B:</h4>
              <ul className="space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300">
                <li>Formar parte de la red Cuerpo y Alma para potenciar tu impacto.</li>
                <li>Consultoria en Ley TEA N° 21.545 y Ley de Ciberseguridad N° 21.663.</li>
                <li>Vitrinas accesibles adaptadas para PYMEs.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA"
            className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow block"
          >
            Ingresar a Casa Matriz & Red B2B
          </Link>
        </div>

        {/* OFICINA 02 */}
        <div className={`p-6 rounded-3xl border-2 shadow-xl flex flex-col justify-between space-y-5 ${modoCalma ? 'bg-[#1C2A3A] border-[#78ACE9]/40 text-slate-100' : 'bg-white border-[#A8B58A] text-[#1B4D3E]'}`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 02
              </span>
              <img src="/logo-lawenmoll.jpg.png" alt="Logo LAWENMOLL" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="text-xl font-extrabold">LAWENMOLL — Salud Integrativa & Fichas Cifradas</h3>
            <p className="text-xs md:text-sm leading-relaxed">
              Plataforma inteligente de evaluacion metabolica y seguimiento clinico integrativo para conectar pacientes con terapeutas y medicos.
            </p>
            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${modoCalma ? 'bg-[#101D2B] border-slate-700' : 'bg-[#FAF8F5] border-[#97A884]'}`}>
              <h4 className="font-bold text-[#52796F]">Caracteristicas Principales:</h4>
              <ul className="space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300">
                <li>Test Metabolico y Composicion Corporal Inteligente.</li>
                <li>Fichas Clinicas SOAP encriptadas bajo Ley N° 21.663.</li>
                <li>Telemedicina integrativa con seguimiento continuo.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=LAWENMOLL"
            className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow block"
          >
            Ingresar a LAWENMOLL
          </Link>
        </div>

        {/* OFICINA 03 */}
        <div className={`p-6 rounded-3xl border-2 shadow-xl flex flex-col justify-between space-y-5 ${modoCalma ? 'bg-[#1C2A3A] border-[#78ACE9]/40 text-slate-100' : 'bg-white border-[#A8B58A] text-[#1B4D3E]'}`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#676E5E] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 03
              </span>
              <img src="/logo-wellness.jpg.jpg" alt="Logo Wellness" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="text-xl font-extrabold">Wellness Web App — Movimiento Adaptado & Gastronomia</h3>
            <p className="text-xs md:text-sm leading-relaxed">
              Rutinas de ejercicio sin salto para proteger articulaciones y recetas saludables sin dietas punitivas.
            </p>
            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${modoCalma ? 'bg-[#101D2B] border-slate-700' : 'bg-[#FAF8F5] border-[#97A884]'}`}>
              <h4 className="font-bold text-[#52796F]">Experiencia Interactiva:</h4>
              <ul className="space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300">
                <li>Clases en vivo en salas virtuales tematicas.</li>
                <li>Cocina demostrativa y alimentacion consciente.</li>
                <li>Pausas activas y modulos anti-estres.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=Wellness%20Web%20App"
            className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow block"
          >
            Ingresar a Wellness Web App
          </Link>
        </div>

        {/* OFICINA 04 */}
        <div className={`p-6 rounded-3xl border-2 shadow-xl flex flex-col justify-between space-y-5 ${modoCalma ? 'bg-[#1C2A3A] border-[#78ACE9]/40 text-slate-100' : 'bg-white border-[#A8B58A] text-[#1B4D3E]'}`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#2D3A47] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 04
              </span>
              <img src="/logo-bienestar.png.png" alt="Logo Bienestar" className="w-8 h-8 object-contain" />
            </div>
            <h3 className="text-xl font-extrabold">Bienestar — Mensajeria, Salud Holistica & Shopping PYME</h3>
            <p className="text-xs md:text-sm leading-relaxed">
              App de comunicacion y salud emocional para conectar a personas naturales con PYMEs recomendadas.
            </p>
            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${modoCalma ? 'bg-[#101D2B] border-slate-700' : 'bg-[#FAF8F5] border-[#97A884]'}`}>
              <h4 className="font-bold text-[#52796F]">Modulos Integrados:</h4>
              <ul className="space-y-1 list-disc list-inside text-slate-700 dark:text-slate-300">
                <li>Horas medicas, hidratacion y seguimiento emocional.</li>
                <li>Modulo Morfeo para un descanso reparador.</li>
                <li>Chat, agenda y vitrina para emprender.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=Bienestar"
            className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow block"
          >
            Ingresar a Bienestar
          </Link>
        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-[#97A884]/40 py-8 text-center text-xs space-y-2">
        <p className="font-bold">ASL Ideas SpA — Salud Digital Inclusiva</p>
        <p className="text-slate-600 dark:text-slate-400">Contacto: contacto@aslideas.cl | +56 9 8330 2145</p>
      </footer>
    </main>
  );
}
