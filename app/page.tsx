'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-[#90B2D9]' : 'bg-slate-900 text-white'}`}>
      {/* Header Principal */}
      <header className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/50 relative">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#52796F] flex items-center justify-center font-black text-white text-xl shadow-lg border border-[#84A59D]/40 p-1">
            <img 
              src="/logo-asl.png.png" 
              alt="ASL Logo" 
              className="w-full h-full object-contain rounded-xl"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#B8D6B2]">
              ASL Ideas SpA
            </h1>
            <p className="text-xs text-[#98A4BA] font-medium">
              Ecosistema de Soluciones Digitales y Diseños para PYMEs y Asociados
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition ${modoCalma ? 'bg-[#78ACE9] text-slate-900 border-[#90B2D9]' : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'}`}
          >
            {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>
          
          <Link
            href="/sala-virtual"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#52796F] text-white hover:bg-[#676E5E] transition shadow-md flex items-center gap-2"
          >
            Sala Virtual B2B
          </Link>

          {/* Botón Cuadrado con 3 Líneas (Menú Desplegable) */}
          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Menú principal"
            className="w-11 h-11 bg-[#52796F] hover:bg-[#676E5E] text-white rounded-xl border border-[#84A59D]/50 flex flex-col items-center justify-center gap-1.5 shadow-lg transition"
          >
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
          </button>
        </div>

        {/* Desplegable Principal del Header */}
        {menuAbierto && (
          <div className="absolute top-full right-4 mt-2 w-80 sm:w-96 bg-slate-800 border-2 border-[#52796F] rounded-2xl shadow-2xl p-5 z-50 text-left space-y-4">
            <div className="border-b border-slate-700 pb-3">
              <h4 className="text-sm font-bold text-[#B8D6B2] uppercase tracking-wider mb-2">Salas Virtuales & Agenda</h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                <li>
                  <Link href="/sala-virtual?app=ASL%20Ideas%20SpA" className="hover:text-emerald-400 transition block py-1">
                    • Casa Matriz ASL Ideas SpA
                  </Link>
                </li>
                <li>
                  <Link href="/sala-virtual?app=LAWENMOLL" className="hover:text-emerald-400 transition block py-1">
                    • LAWENMOLL — Salud Integrativa
                  </Link>
                </li>
                <li>
                  <Link href="/sala-virtual?app=Wellness%20Web%20App" className="hover:text-emerald-400 transition block py-1">
                    • Wellness Web App
                  </Link>
                </li>
                <li>
                  <Link href="/sala-virtual?app=Bienestar" className="hover:text-emerald-400 transition block py-1">
                    • Bienestar & Shopping PYME
                  </Link>
                </li>
              </ul>
            </div>

            <div className="border-b border-slate-700 pb-3">
              <h4 className="text-sm font-bold text-[#FAA2AA] uppercase tracking-wider mb-2">Nuestras Redes</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition">LinkedIn</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition">Instagram</a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-white transition">TikTok</a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition">YouTube</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#B2942F] uppercase tracking-wider mb-2">Contacto Directo</h4>
              <p className="text-xs text-slate-300">WhatsApp: +56 9 8330 2145</p>
              <p className="text-xs text-slate-300">Correo: contacto@aslideas.cl</p>
              <a href="#contacto" className="inline-block mt-2 text-xs text-emerald-400 font-bold underline">
                Ir al Pie de Página
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Banner Propuesta de Valor */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-center space-y-4">
        <span className="bg-[#52796F]/20 text-[#B8D6B2] border border-[#52796F]/40 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
          Únete a la Red &quot;Cuerpo y Alma&quot; B2B
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white max-w-4xl mx-auto leading-tight">
          Desarrollo y soluciones accesibles para PYME y comercio asociado
        </h2>
        <p className="text-sm md:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Diseñado por y para neurodivergencias (TEA/TDAH) y condiciones crónicas. Al sumarte a nuestra red como empresa, profesional o colaborador B2B, te favoreces al multiplicar tu alcance y cambiar la calidad de vida de miles de personas.
        </p>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA */}
        <div className="bg-slate-800/80 p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/logo-asl.png.png" alt="Logo ASL" className="w-14 h-14 object-contain rounded-xl bg-white p-1 shadow border border-slate-700" />
                <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  Oficina 01
                </span>
              </div>
              <span className="text-xs text-[#B8D6B2] font-bold">Casa Matriz & Alianzas B2B</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              ASL Ideas SpA — Quiénes Somos & Red &quot;Cuerpo y Alma&quot;
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              <strong>Quiénes Somos:</strong> Fundados por una Diseñadora Gráfica con neurodivergencia (TEA 1 / TDAH) y condiciones crónicas, transformamos la vivencia del autocuidado eliminando la sobrecarga sensorial y la culpa.
            </p>
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-[#B8D6B2]">Beneficios de Suscribirse y Ser Colaborador B2B:</h4>
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

        {/* OFICINA 02: LAWENMOLL */}
        <div className="bg-slate-800/80 p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/logo-lawenmoll.jpg.png" alt="Logo LAWENMOLL" className="w-14 h-14 object-contain rounded-xl bg-white p-1 shadow border border-slate-700" />
                <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  Oficina 02
                </span>
              </div>
              <span className="text-xs text-[#B8D6B2] font-bold">Diagnóstico & Telemedicina</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              LAWENMOLL — Salud Integrativa & Fichas Cifradas
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Plataforma inteligente de evaluación metabólica y seguimiento clínico integrativo, diseñada para conectar pacientes con terapeutas y médicos de forma segura.
            </p>
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-[#B8D6B2]">Características Principales:</h4>
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

        {/* OFICINA 03: WELLNESS WEB APP */}
        <div className="bg-slate-800/80 p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/logo-wellness.jpg.jpg" alt="Logo Wellness" className="w-14 h-14 object-contain rounded-xl bg-white p-1 shadow border border-slate-700" />
                <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  Oficina 03
                </span>
              </div>
              <span className="text-xs text-[#B8D6B2] font-bold">Mente, Cuerpo & Gastronomía</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Wellness Web App — Movimiento Adaptado & Gastronomía Consciente
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Espacio visual e interactivo para conectar mente y cuerpo. Rutinas de ejercicio sin salto para proteger tus articulaciones y reducir el cortisol urbano, junto a recetas saludables sin dietas punitivas.
            </p>
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-[#B8D6B2]">Experiencia Interactiva & Conexión:</h4>
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

        {/* OFICINA 04: BIENESTAR */}
        <div className="bg-slate-800/80 p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/logo-bienestar.png.png" alt="Logo Bienestar" className="w-14 h-14 object-contain rounded-xl bg-white p-1 shadow border border-slate-700" />
                <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  Oficina 04
                </span>
              </div>
              <span className="text-xs text-[#B8D6B2] font-bold">Mensajería, Salud & Shopping PYME</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Bienestar — App de Mensajería, Salud Holística & Conexión Comercial
            </h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              App interactiva de comunicación y retroalimentación en salud. Permite gestionar tu vida diaria, cuidar tu salud emocional y conectar con las mejores PYMEs y emprendimientos.
            </p>
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700 text-xs space-y-2">
              <h4 className="font-bold text-[#B8D6B2]">Módulos de Bienestar & Marketplace:</h4>
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

      {/* Pie de Página / Contacto */}
      <footer id="contacto" className="max-w-7xl mx-auto px-4 py-8 border-t border-slate-700/50 text-center text-xs text-slate-400 space-y-2">
        <p className="font-bold text-[#B8D6B2]">ASL Ideas SpA — Tecnología Accesible, Amable e Inclusiva</p>
        <p>Contacto Directo: contacto@aslideas.cl | WhatsApp: +56 9 8330 2145</p>
        <p>© 2026 ASL Ideas SpA. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
