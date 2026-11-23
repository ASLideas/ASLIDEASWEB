'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-[#98A4BA]' : 'bg-[#FAF9F6] text-[#1B4D3E]'}`}>
      
      {/* HEADER RESPONSIVO */}
      <header className={`max-w-7xl mx-auto px-4 py-6 border-b transition-colors ${modoCalma ? 'border-[#90B2D9]/30 bg-[#101D2B]' : 'border-[#B8D6B2]/40 bg-[#FAF9F6]'}`}>
        <div className="flex items-center justify-between gap-4">
          
          {/* LOGO Y SUBTÍTULO */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-1 shadow-md border border-[#B8D6B2] flex items-center justify-center">
              <img 
                src="/logo-asl.png.png" 
                alt="Logo ASL Ideas SpA" 
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${modoCalma ? 'text-[#78ACE9]' : 'text-[#1B4D3E]'}`}>
                ASL Ideas SpA
              </h1>
              <p className={`text-xs sm:text-sm font-semibold ${modoCalma ? 'text-[#90B2D9]' : 'text-[#B2942F]'}`}>
                Ecosistema de Soluciones Digitales y Diseños para PYMEs y Asociados
              </p>
            </div>
          </div>

          {/* ACCIONES DEL HEADER: MODO CALMA + MENÚ DE 3 LÍNEAS */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setModoCalma(!modoCalma)}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition ${
                modoCalma 
                  ? 'bg-[#78ACE9] text-[#101D2B] border-[#78ACE9]' 
                  : 'bg-[#B8D6B2] text-[#1B4D3E] border-[#B8D6B2] hover:bg-[#a5ca9e]'
              }`}
            >
              {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma'}
            </button>

            {/* BOTÓN CUADRADO CON 3 LÍNEAS HORIZONTALES */}
            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label="Abrir Menú de Navegación"
              className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1.5 transition border ${
                modoCalma 
                  ? 'bg-[#90B2D9] border-[#78ACE9]' 
                  : 'bg-[#1B4D3E] border-[#1B4D3E] hover:bg-[#2A6653]'
              }`}
            >
              <span className="w-6 h-0.5 bg-white rounded-full"></span>
              <span className="w-6 h-0.5 bg-white rounded-full"></span>
              <span className="w-6 h-0.5 bg-white rounded-full"></span>
            </button>
          </div>

        </div>

        {/* MENÚ DESPLEGABLE VERTICAL DE 3 SECCIONES */}
        {menuAbierto && (
          <div className={`mt-6 p-6 rounded-2xl border shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn ${
            modoCalma ? 'bg-[#16273B] border-[#78ACE9]/40 text-white' : 'bg-white border-[#B8D6B2] text-[#1B4D3E]'
          }`}>
            
            {/* SECCIÓN 1: SALAS & AGENDA */}
            <div className="space-y-3">
              <h3 className={`text-xs font-black uppercase tracking-wider pb-1 border-b ${modoCalma ? 'text-[#78ACE9] border-[#78ACE9]/30' : 'text-[#B2942F] border-[#B8D6B2]'}`}>
                Salas & Agenda
              </h3>
              <ul className="space-y-2 text-xs font-bold">
                <li>
                  <Link href="/sala-virtual?app=ASL%20Ideas%20SpA" className="hover:underline block py-1">
                    ASL Ideas SpA — Ingresar / Agendar Cita
                  </Link>
                </li>
                <li>
                  <Link href="/sala-virtual?app=LAWENMOLL" className="hover:underline block py-1">
                    LAWENMOLL — Ingresar / Agendar Cita
                  </Link>
                </li>
                <li>
                  <Link href="/sala-virtual?app=Wellness%20Web%20App" className="hover:underline block py-1">
                    Wellness Web App — Ingresar / Agendar Cita
                  </Link>
                </li>
                <li>
                  <Link href="/sala-virtual?app=Bienestar" className="hover:underline block py-1">
                    Sabiduría Ancestral / Bienestar — Ingresar / Agendar Cita
                  </Link>
                </li>
              </ul>
            </div>

            {/* SECCIÓN 2: NUESTRAS REDES */}
            <div className="space-y-3">
              <h3 className={`text-xs font-black uppercase tracking-wider pb-1 border-b ${modoCalma ? 'text-[#78ACE9] border-[#78ACE9]/30' : 'text-[#B2942F] border-[#B8D6B2]'}`}>
                Nuestras Redes
              </h3>
              <ul className="space-y-2 text-xs font-medium">
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline block py-0.5">LinkedIn Corporativo</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline block py-0.5">Instagram Oficial</a></li>
                <li><a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:underline block py-0.5">TikTok Salud Inclusiva</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:underline block py-0.5">Canal de YouTube</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline block py-0.5">Comunidad en Facebook</a></li>
              </ul>
            </div>

            {/* SECCIÓN 3: CONTACTO DIRECTO */}
            <div className="space-y-3">
              <h3 className={`text-xs font-black uppercase tracking-wider pb-1 border-b ${modoCalma ? 'text-[#78ACE9] border-[#78ACE9]/30' : 'text-[#B2942F] border-[#B8D6B2]'}`}>
                Contacto Directo
              </h3>
              <p className="text-xs leading-relaxed">
                Atención Telefónica y WhatsApp: <strong>+56 9 8330 2145</strong>
              </p>
              <div className="pt-2">
                <a
                  href="#contacto"
                  onClick={() => setMenuAbierto(false)}
                  className={`inline-block w-full text-center py-2 px-3 text-xs font-bold rounded-xl transition shadow-md ${
                    modoCalma ? 'bg-[#78ACE9] text-[#101D2B]' : 'bg-[#B2942F] text-white hover:bg-[#967b26]'
                  }`}
                >
                  Ver Ficha de Contacto Completa
                </a>
              </div>
            </div>

          </div>
        )}
      </header>

      {/* BANNER PRINCIPAL */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-center space-y-4">
        <span className={`inline-block text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider border ${
          modoCalma ? 'bg-[#78ACE9]/20 text-[#78ACE9] border-[#78ACE9]/40' : 'bg-[#FAA2AA]/30 text-[#1B4D3E] border-[#FAA2AA]'
        }`}>
          Soluciones Digitales Accesibles B2B
        </span>
        <h2 className={`text-2xl sm:text-4xl font-black max-w-4xl mx-auto leading-tight ${
          modoCalma ? 'text-[#90B2D9]' : 'text-[#1B4D3E]'
        }`}>
          Desarrollo y soluciones accesibles para PYME y comercio asociado
        </h2>
        <p className={`text-sm sm:text-base max-w-3xl mx-auto leading-relaxed ${
          modoCalma ? 'text-[#98A4BA]' : 'text-slate-700'
        }`}>
          Diseñado por y para personas con neurodivergencias (TEA/TDAH) y condiciones crónicas de salud. Ofrecemos infraestructura amable, software adaptado y vitrinas comerciales que respetan la baja sobrecarga sensorial.
        </p>
      </section>

      {/* LAS 4 OFICINAS VIRTUALES (MISIÓN Y VISIÓN TRABAJADAS AYER) */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* OFICINA 01: ASL IDEAS SPA */}
        <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl flex flex-col justify-between space-y-6 ${
          modoCalma ? 'bg-[#16273B] border-[#78ACE9]/40 text-[#98A4BA]' : 'bg-white border-[#B8D6B2] text-[#1B4D3E]'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-black px-3 py-1 rounded-full uppercase ${
                modoCalma ? 'bg-[#78ACE9] text-[#101D2B]' : 'bg-[#B8D6B2] text-[#1B4D3E]'
              }`}>
                Oficina 01
              </span>
              <span className={`text-xs font-bold ${modoCalma ? 'text-[#78ACE9]' : 'text-[#B2942F]'}`}>
                Casa Matriz & Alianzas B2B
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 border border-[#B8D6B2] shadow-sm flex items-center justify-center shrink-0">
                <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-extrabold leading-snug">
                ASL Ideas SpA — Quiénes Somos & Red Cuerpo y Alma
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed">
              <strong>Quiénes Somos:</strong> Fundados por una Diseñadora Gráfica con neurodivergencia (TEA 1 / TDAH) y condiciones crónicas, transformamos el desarrollo de tecnología en una vivencia amable, libre de sobrecarga sensorial y culpa.
            </p>

            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
              modoCalma ? 'bg-[#101D2B] border-[#78ACE9]/30' : 'bg-[#FAF9F6] border-[#B8D6B2]'
            }`}>
              <h4 className={`font-bold ${modoCalma ? 'text-[#78ACE9]' : 'text-[#1B4D3E]'}`}>
                Misión & Visión Institucional:
              </h4>
              <ul className="space-y-1.5 list-disc list-inside">
                <li><strong>Misión:</strong> Crear soluciones digitales inclusivas que permitan la integración laboral de personas con condiciones de salud y neurodivergencias.</li>
                <li><strong>Cumplimiento Normativo:</strong> Consultoría y software adaptado bajo Ley TEA N° 21.545 y Ley de Ciberseguridad N° 21.663.</li>
                <li><strong>Beneficio de Red:</strong> Formarás parte de la red Cuerpo y Alma para potenciar el alcance de tu empresa o PYME.</li>
              </ul>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA"
            className={`w-full py-3.5 rounded-xl font-bold text-xs text-center transition shadow-md block ${
              modoCalma ? 'bg-[#78ACE9] text-[#101D2B] hover:bg-[#90B2D9]' : 'bg-[#1B4D3E] text-white hover:bg-[#2A6653]'
            }`}
          >
            Ingresar a Casa Matriz & Red B2B
          </Link>
        </div>

        {/* OFICINA 02: LAWENMOLL */}
        <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl flex flex-col justify-between space-y-6 ${
          modoCalma ? 'bg-[#16273B] border-[#78ACE9]/40 text-[#98A4BA]' : 'bg-white border-[#B8D6B2] text-[#1B4D3E]'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-black px-3 py-1 rounded-full uppercase ${
                modoCalma ? 'bg-[#78ACE9] text-[#101D2B]' : 'bg-[#B8D6B2] text-[#1B4D3E]'
              }`}>
                Oficina 02
              </span>
              <span className={`text-xs font-bold ${modoCalma ? 'text-[#78ACE9]' : 'text-[#B2942F]'}`}>
                Diagnóstico & Telemedicina Integrativa
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 border border-[#B8D6B2] shadow-sm flex items-center justify-center shrink-0">
                <img src="/logo-lawenmoll.jpg.png" alt="Logo LAWENMOLL" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-extrabold leading-snug">
                LAWENMOLL — Vitrina Virtual Integrativa
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed">
              Plataforma inteligente de seguimiento clínico integrativo y evaluación metabólica, diseñada para conectar pacientes con terapeutas y profesionales médicos.
            </p>

            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
              modoCalma ? 'bg-[#101D2B] border-[#78ACE9]/30' : 'bg-[#FAF9F6] border-[#B8D6B2]'
            }`}>
              <h4 className={`font-bold ${modoCalma ? 'text-[#78ACE9]' : 'text-[#1B4D3E]'}`}>
                Misión & Visión Clínico-Integrativa:
              </h4>
              <ul className="space-y-1.5 list-disc list-inside">
                <li><strong>Misión:</strong> Dar a conocer de forma totalmente visual e interactiva herramientas de salud alternativa e integrativa.</li>
                <li><strong>Visión:</strong> Conectar de manera transparente y accesible a profesionales de la salud, bienestar y gastronomía con sus pacientes.</li>
                <li><strong>Fichas SOAP Cifradas:</strong> Registros clínicos protegidos bajo Ley N° 21.663.</li>
              </ul>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=LAWENMOLL"
            className={`w-full py-3.5 rounded-xl font-bold text-xs text-center transition shadow-md block ${
              modoCalma ? 'bg-[#78ACE9] text-[#101D2B] hover:bg-[#90B2D9]' : 'bg-[#1B4D3E] text-white hover:bg-[#2A6653]'
            }`}
          >
            Ingresar a LAWENMOLL
          </Link>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP */}
        <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl flex flex-col justify-between space-y-6 ${
          modoCalma ? 'bg-[#16273B] border-[#78ACE9]/40 text-[#98A4BA]' : 'bg-white border-[#B8D6B2] text-[#1B4D3E]'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-black px-3 py-1 rounded-full uppercase ${
                modoCalma ? 'bg-[#78ACE9] text-[#101D2B]' : 'bg-[#B8D6B2] text-[#1B4D3E]'
              }`}>
                Oficina 03
              </span>
              <span className={`text-xs font-bold ${modoCalma ? 'text-[#78ACE9]' : 'text-[#B2942F]'}`}>
                Movimiento Adaptado & Gastronomía
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 border border-[#B8D6B2] shadow-sm flex items-center justify-center shrink-0">
                <img src="/logo-wellness.jpg.jpg" alt="Logo Wellness" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-extrabold leading-snug">
                Wellness Web App — Conexión Mente & Cuerpo
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed">
              Rutinas de ejercicio adaptado sin impacto para proteger articulaciones y reducir el cortisol, junto a recetas de cocina nutritiva sin dietas punitivas.
            </p>

            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
              modoCalma ? 'bg-[#101D2B] border-[#78ACE9]/30' : 'bg-[#FAF9F6] border-[#B8D6B2]'
            }`}>
              <h4 className={`font-bold ${modoCalma ? 'text-[#78ACE9]' : 'text-[#1B4D3E]'}`}>
                Misión & Visión de Bienestar Físico:
              </h4>
              <ul className="space-y-1.5 list-disc list-inside">
                <li><strong>Misión:</strong> Visibilizar el trabajo de instructores y profesionales del movimiento adaptado y la nutrición consciente.</li>
                <li><strong>Visión:</strong> Permitir que las personas asistan e interactúen en clases virtuales desde salas temáticas seguras.</li>
                <li><strong>Pausas Activas:</strong> Módulos diseñados para aliviar la fatiga laboral y sensorial.</li>
              </ul>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=Wellness%20Web%20App"
            className={`w-full py-3.5 rounded-xl font-bold text-xs text-center transition shadow-md block ${
              modoCalma ? 'bg-[#78ACE9] text-[#101D2B] hover:bg-[#90B2D9]' : 'bg-[#1B4D3E] text-white hover:bg-[#2A6653]'
            }`}
          >
            Ingresar a Wellness Web App
          </Link>
        </div>

        {/* OFICINA 04: SABIDURÍA ANCESTRAL / BIENESTAR */}
        <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl flex flex-col justify-between space-y-6 ${
          modoCalma ? 'bg-[#16273B] border-[#78ACE9]/40 text-[#98A4BA]' : 'bg-white border-[#B8D6B2] text-[#1B4D3E]'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-black px-3 py-1 rounded-full uppercase ${
                modoCalma ? 'bg-[#78ACE9] text-[#101D2B]' : 'bg-[#B8D6B2] text-[#1B4D3E]'
              }`}>
                Oficina 04
              </span>
              <span className={`text-xs font-bold ${modoCalma ? 'text-[#78ACE9]' : 'text-[#B2942F]'}`}>
                Mensajería & Marketplace PYME
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white p-1 border border-[#B8D6B2] shadow-sm flex items-center justify-center shrink-0">
                <img src="/logo-bienestar.png.png" alt="Logo Bienestar" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-extrabold leading-snug">
                Sabiduría Ancestral / Bienestar App
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed">
              App interactiva de comunicación y retroalimentación en salud. Permite gestionar tu vida diaria, cuidar tu salud emocional y conectar con emprendimientos recomendados.
            </p>

            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
              modoCalma ? 'bg-[#101D2B] border-[#78ACE9]/30' : 'bg-[#FAF9F6] border-[#B8D6B2]'
            }`}>
              <h4 className={`font-bold ${modoCalma ? 'text-[#78ACE9]' : 'text-[#1B4D3E]'}`}>
                Misión & Visión de Conexión Comercial:
              </h4>
              <ul className="space-y-1.5 list-disc list-inside">
                <li><strong>Misión:</strong> Brindar una comunicación fluida y amena para el seguimiento de la salud diaria y emocional.</li>
                <li><strong>Visión:</strong> Acompañar en recordatorios de horas médicas, hidratación, caminatas y Módulo Morfeo para descanso reparador.</li>
                <li><strong>Shopping PYME:</strong> Conectar a usuarios con emprendimientos recomendados para generar visibilidad e ingresos extras.</li>
              </ul>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=Bienestar"
            className={`w-full py-3.5 rounded-xl font-bold text-xs text-center transition shadow-md block ${
              modoCalma ? 'bg-[#78ACE9] text-[#101D2B] hover:bg-[#90B2D9]' : 'bg-[#1B4D3E] text-white hover:bg-[#2A6653]'
            }`}
          >
            Ingresar a Bienestar
          </Link>
        </div>

      </section>

      {/* PIE DE PÁGINA (CANALES OFICIALES DE CONTACTO Y ATENCIÓN DIRECTA) */}
      <footer id="contacto" className={`py-12 px-4 border-t transition-colors ${
        modoCalma ? 'bg-[#0B1521] border-[#78ACE9]/30 text-[#98A4BA]' : 'bg-[#1B4D3E] border-[#1B4D3E] text-white'
      }`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-black">
              ASL Ideas SpA — Casa Matriz y Desarrollo B2B
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              Estrategia de Salud Digital Inclusiva. Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencia y condiciones crónicas de salud.
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <h4 className="font-bold text-base border-b border-white/20 pb-2">
              CANALES OFICIALES DE CONTACTO Y ATENCIÓN DIRECTA:
            </h4>
            <p><strong>Atención Directa & WhatsApp:</strong> +56 9 8330 2145</p>
            <p><strong>Contacto por Correo Electrónico:</strong> contacto@aslideas.cl | contacto@lawenmoll.cl</p>
            <div className="pt-2">
              <a
                href="https://chat.whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className={`inline-block px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition ${
                  modoCalma ? 'bg-[#78ACE9] text-[#101D2B]' : 'bg-[#B8D6B2] text-[#1B4D3E] hover:bg-white'
                }`}
              >
                Unirse al Grupo Oficial de WhatsApp ASL Ideas SpA
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/10 text-center text-xs opacity-75">
          <Link href="/admin" className="hover:underline">Administración ASL (/admin)</Link> • <Link href="/sala-virtual" className="hover:underline">Sala Virtual (/sala-virtual)</Link>
        </div>
      </footer>

    </main>
  );
}
