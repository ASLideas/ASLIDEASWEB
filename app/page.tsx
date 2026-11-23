'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);
  const [openSalas, setOpenSalas] = useState(false);
  const [openRedes, setOpenRedes] = useState(false);
  const [openContacto, setOpenContacto] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#FAF8F5] text-[#2C3E35]' : 'bg-[#EBF5F4] text-white'}`}>
      {/* Header Principal */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#00796B]/20">
        <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <img 
              src="/logo-asl.png.png" 
              alt="Logo ASL Ideas SpA" 
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl bg-white p-1 shadow-md border-2 border-[#00796B]/30 flex-shrink-0" 
            />
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[#004D40]">
                ASL Ideas SpA
              </h1>
              <p className="text-xs sm:text-sm text-[#00796B] font-bold">
                TECNOLOGÍA CON ALMA & EMPATÍA | BAJA CARGA SENSORIAL (LEY TEA N° 21.545)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="md:hidden px-3 py-1.5 text-xs font-bold rounded-xl bg-white text-[#004D40] border border-[#00796B]/30 shadow-sm"
          >
            {modoCalma ? 'Modo Calma' : 'TEA'}
          </button>
        </div>

        <nav className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-3 w-full md:w-auto">
          <div className="relative">
            <button
              type="button"
              onClick={() => { setOpenSalas(!openSalas); setOpenRedes(false); setOpenContacto(false); }}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-[#00796B] text-white hover:bg-[#004D40] transition shadow-md flex items-center gap-1.5"
            >
              <span>Salas & Agenda</span>
              <span className="text-[10px]">▼</span>
            </button>
            {openSalas && (
              <div className="absolute right-0 md:right-auto md:left-0 mt-2 w-72 bg-white rounded-2xl border-2 border-[#00796B]/30 shadow-2xl p-3 z-50 text-left space-y-2">
                <p className="text-[11px] font-black text-[#00796B] uppercase border-b pb-1">Seleccionar Sala Virtual</p>
                <div className="p-2 hover:bg-[#F2F9F8] rounded-xl transition">
                  <p className="text-xs font-extrabold text-[#004D40]">ASL Ideas SpA</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Link href="/sala-virtual?app=ASL%20Ideas%20SpA" className="text-[11px] font-bold text-[#00796B] hover:underline">Ingresar a Sala</Link>
                    <span className="text-slate-300">|</span>
                    <Link href="/sala-virtual?app=ASL%20Ideas%20SpA&tab=cita" className="text-[11px] font-bold text-[#00796B] hover:underline">Agendar Cita</Link>
                  </div>
                </div>
                <div className="p-2 hover:bg-[#F2F9F8] rounded-xl transition">
                  <p className="text-xs font-extrabold text-[#004D40]">LAWENMOLL</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Link href="/sala-virtual?app=LAWENMOLL" className="text-[11px] font-bold text-[#00796B] hover:underline">Ingresar a Sala</Link>
                    <span className="text-slate-300">|</span>
                    <Link href="/sala-virtual?app=LAWENMOLL&tab=cita" className="text-[11px] font-bold text-[#00796B] hover:underline">Agendar Cita</Link>
                  </div>
                </div>
                <div className="p-2 hover:bg-[#F2F9F8] rounded-xl transition">
                  <p className="text-xs font-extrabold text-[#004D40]">Wellness Web App</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Link href="/sala-virtual?app=Wellness%20Web%20App" className="text-[11px] font-bold text-[#00796B] hover:underline">Ingresar a Sala</Link>
                    <span className="text-slate-300">|</span>
                    <Link href="/sala-virtual?app=Wellness%20Web%20App&tab=cita" className="text-[11px] font-bold text-[#00796B] hover:underline">Agendar Cita</Link>
                  </div>
                </div>
                <div className="p-2 hover:bg-[#F2F9F8] rounded-xl transition">
                  <p className="text-xs font-extrabold text-[#004D40]">Sabiduría Ancestral / Bienestar</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Link href="/sala-virtual?app=Bienestar" className="text-[11px] font-bold text-[#00796B] hover:underline">Ingresar a Sala</Link>
                    <span className="text-slate-300">|</span>
                    <Link href="/sala-virtual?app=Bienestar&tab=cita" className="text-[11px] font-bold text-[#00796B] hover:underline">Agendar Cita</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => { setOpenRedes(!openRedes); setOpenSalas(false); setOpenContacto(false); }}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-white text-[#004D40] border border-[#00796B]/30 hover:bg-[#F2F9F8] transition shadow-sm flex items-center gap-1.5"
            >
              <span>Nuestras Redes</span>
              <span className="text-[10px]">▼</span>
            </button>
            {openRedes && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border-2 border-[#00796B]/30 shadow-2xl p-3 z-50 text-left space-y-2">
                <p className="text-[11px] font-black text-[#00796B] uppercase border-b pb-1">Canales Oficiales</p>
                <a href="#" className="block text-xs font-bold text-[#004D40] hover:text-[#00796B] p-1.5 rounded-lg hover:bg-[#F2F9F8]">LinkedIn Corporativo</a>
                <a href="#" className="block text-xs font-bold text-[#004D40] hover:text-[#00796B] p-1.5 rounded-lg hover:bg-[#F2F9F8]">Instagram Oficial</a>
                <a href="#" className="block text-xs font-bold text-[#004D40] hover:text-[#00796B] p-1.5 rounded-lg hover:bg-[#F2F9F8]">TikTok Salud Inclusiva</a>
                <a href="#" className="block text-xs font-bold text-[#004D40] hover:text-[#00796B] p-1.5 rounded-lg hover:bg-[#F2F9F8]">Canal de YouTube</a>
                <a href="#" className="block text-xs font-bold text-[#004D40] hover:text-[#00796B] p-1.5 rounded-lg hover:bg-[#F2F9F8]">Comunidad en Facebook</a>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => { setOpenContacto(!openContacto); setOpenSalas(false); setOpenRedes(false); }}
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-xl bg-white text-[#004D40] border border-[#00796B]/30 hover:bg-[#F2F9F8] transition shadow-sm flex items-center gap-1.5"
            >
              <span>Contacto Directo</span>
              <span className="text-[10px]">▼</span>
            </button>
            {openContacto && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border-2 border-[#00796B]/30 shadow-2xl p-3 z-50 text-left space-y-2">
                <p className="text-[11px] font-black text-[#00796B] uppercase border-b pb-1">Atención & Soporte</p>
                <Link href="/sala-virtual" className="block text-xs font-bold text-[#004D40] hover:text-[#00796B] p-1.5 rounded-lg hover:bg-[#F2F9F8]">Ver Ficha / Ingresar</Link>
                <Link href="/sala-virtual?tab=cita" className="block text-xs font-bold text-[#004D40] hover:text-[#00796B] p-1.5 rounded-lg hover:bg-[#F2F9F8]">Agenda de Reuniones</Link>
                <a href="#" className="block text-xs font-bold text-[#004D40] hover:text-[#00796B] p-1.5 rounded-lg hover:bg-[#F2F9F8]">Grupo WhatsApp</a>
                <a href="#" className="block text-xs font-bold text-[#004D40] hover:text-[#00796B] p-1.5 rounded-lg hover:bg-[#F2F9F8]">Canal Telegram</a>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="hidden md:block px-3 py-2 text-xs font-bold rounded-xl bg-white text-[#004D40] border border-[#00796B]/30 hover:bg-[#F2F9F8] transition shadow-sm"
          >
            {modoCalma ? 'Modo Calma Activo' : 'Modo Calma (TEA)'}
          </button>
        </nav>
      </header>

      {/* Banner Propuesta de Valor & Red Cuerpo y Alma */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-center space-y-4">
        <span className="bg-[#00796B]/20 text-[#00796B] border border-emerald-500/30 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
          Únete a la Red &quot;Cuerpo y Alma&quot; B2B
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white max-w-4xl mx-auto leading-tight">
          Transformamos la Salud Digital con Tecnología Amable, Accesible e Inclusiva
        </h2>
        <p className="text-sm md:text-base text-[#004D40] max-w-3xl mx-auto leading-relaxed">
          Diseñado por y para neurodivergencias (TEA/TDAH) y condiciones crónicas. Al sumarte a nuestra red como empresa, profesional o colaborador B2B, te favoreces al multiplicar tu alcance y cambiar la calidad de vida de miles de personas.
        </p>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA (Quiénes Somos & Red B2B) */}
        <div className="bg-white border-2 border-[#00796B]/30 p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#00796B] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 01
              </span>
              <span className="text-xs text-[#00796B] font-bold">Casa Matriz & Alianzas B2B</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              ASL Ideas SpA — Quiénes Somos & Red &quot;Cuerpo y Alma&quot;
            </h3>
            <p className="text-xs md:text-sm text-[#004D40] leading-relaxed">
              <strong>Quiénes Somos:</strong> Fundados por una Diseñadora Gráfica con neurodivergencia (TEA 1 / TDAH) y condiciones crónicas, transformamos la vivencia del autocuidado eliminando la sobrecarga sensorial y la culpa.
            </p>
            <div className="bg-[#EBF5F4]/90 p-4 rounded-2xl border border-[#00796B]/20 text-xs space-y-2">
              <h4 className="font-bold text-[#00796B]">🚀 Beneficios de Suscribirse y Ser Colaborador B2B:</h4>
              <ul className="space-y-1 text-[#004D40] list-disc list-inside">
                <li><strong>Beneficio de Red:</strong> Formarás parte de la red &quot;Cuerpo y Alma&quot;, siendo favorecido para llegar a muchas más personas y potenciar tu impacto.</li>
                <li><strong>Cumplimiento Normativo:</strong> Consultoría en Ley TEA N° 21.545 y Ley de Ciberseguridad N° 21.663.</li>
                <li><strong>Vitrinas Accesibles:</strong> Software e infraestructura amable adaptada para PYMEs.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA"
            className="w-full py-3 bg-[#00796B] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Casa Matriz & Red B2B
          </Link>
        </div>

        {/* OFICINA 02: LAWENMOLL (Salud Integrativa) */}
        <div className="bg-white border-2 border-[#00796B]/30 p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#00796B] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 02
              </span>
              <span className="text-xs text-[#00796B] font-bold">Diagnóstico & Telemedicina</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              LAWENMOLL — Salud Integrativa & Fichas Cifradas
            </h3>
            <p className="text-xs md:text-sm text-[#004D40] leading-relaxed">
              Plataforma inteligente de evaluación metabólica y seguimiento clínico integrativo, diseñada para conectar pacientes con terapeutas y médicos de forma segura.
            </p>
            <div className="bg-[#EBF5F4]/90 p-4 rounded-2xl border border-[#00796B]/20 text-xs space-y-2">
              <h4 className="font-bold text-[#00796B]">🧪 Características Principales:</h4>
              <ul className="space-y-1 text-[#004D40] list-disc list-inside">
                <li>Test Metabólico y Composición Corporal Inteligente.</li>
                <li>Fichas Clínicas SOAP encriptadas bajo estándar Ley N° 21.663.</li>
                <li>Telemedicina integrativa con seguimiento continuo.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=LAWENMOLL"
            className="w-full py-3 bg-[#00796B] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a LAWENMOLL
          </Link>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP (Movimiento Adaptado & Gastronomía) */}
        <div className="bg-white border-2 border-[#00796B]/30 p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#00796B] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 03
              </span>
              <span className="text-xs text-[#00796B] font-bold">Mente, Cuerpo & Gastronomía</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Wellness Web App — Movimiento Adaptado & Gastronomía Consciente
            </h3>
            <p className="text-xs md:text-sm text-[#004D40] leading-relaxed">
              Espacio visual e interactivo para conectar mente y cuerpo. Rutinas de ejercicio sin salto para proteger tus articulaciones y reducir el cortisol urbano, junto a recetas saludables sin dietas punitivas.
            </p>
            <div className="bg-[#EBF5F4]/90 p-4 rounded-2xl border border-[#00796B]/20 text-xs space-y-2">
              <h4 className="font-bold text-[#00796B]">🧘‍♀️ Experiencia Interactiva & Conexión:</h4>
              <ul className="space-y-1 text-[#004D40] list-disc list-inside">
                <li><strong>Conexión con Profesores:</strong> Asiste a clases en vivo en salas virtuales temáticas o visita la cuenta/perfil del instructor en cualquier momento.</li>
                <li><strong>Gastronomía Saludable:</strong> Cocina demostrativa e ideas de alimentación nutritiva e integrativa.</li>
                <li><strong>Pausas Activas:</strong> Módulos anti-estrés diseñados para el entorno laboral y personal.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=Wellness%20Web%20App"
            className="w-full py-3 bg-[#00796B] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Wellness Web App
          </Link>
        </div>

        {/* OFICINA 04: BIENESTAR (Mensajería, Salud Holística & Shopping PYME) */}
        <div className="bg-white border-2 border-[#00796B]/30 p-6 rounded-3xl border-2 border-[#52796F]/40 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="bg-[#00796B] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 04
              </span>
              <span className="text-xs text-[#00796B] font-bold">Mensajería, Salud & Shopping PYME</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Bienestar — App de Mensajería, Salud Holística & Conexión Comercial
            </h3>
            <p className="text-xs md:text-sm text-[#004D40] leading-relaxed">
              App interactiva de comunicación y retroalimentación en salud. Permite gestionar tu vida diaria, cuidar tu salud emocional y conectar con las mejores PYMEs y emprendimientos.
            </p>
            <div className="bg-[#EBF5F4]/90 p-4 rounded-2xl border border-[#00796B]/20 text-xs space-y-2">
              <h4 className="font-bold text-[#00796B]">📲 Módulos de Bienestar & Marketplace:</h4>
              <ul className="space-y-1 text-[#004D40] list-disc list-inside">
                <li><strong>Salud & Hábitos:</strong> Recordatorio de horas médicas, hidratación, registro de estado de ánimo y sugerencia de actividad física.</li>
                <li><strong>Módulo Morfeo:</strong> Seguimiento y recomendación para un descanso reparador.</li>
                <li><strong>Chat, Agenda & Shopping:</strong> Conecta a personas naturales con PYMEs recomendadas y visibiliza tus propios emprendimientos.</li>
              </ul>
            </div>
          </div>
          <Link
            href="/sala-virtual?app=Bienestar"
            className="w-full py-3 bg-[#00796B] hover:bg-[#676E5E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Bienestar
          </Link>
        </div>

      </section>
    <footer className="w-full bg-white border-t-2 border-[#00796B]/20 py-10 px-4 sm:px-6 lg:px-8 text-left space-y-8 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-14 h-14 object-contain rounded-xl bg-[#EBF5F4] p-1 border border-[#00796B]/30 flex-shrink-0" />
              <h4 className="text-base font-black text-[#004D40]">ASL Ideas SpA — Casa Matriz y Desarrollo B2B</h4>
            </div>
            <p className="text-xs text-[#00796B] leading-relaxed font-medium">
              Estrategia de Salud Digital Inclusiva. Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencia y condiciones crónicas de salud.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-[#00796B] uppercase tracking-wider border-b border-[#00796B]/20 pb-2">
              CANALES OFICIALES DE CONTACTO Y ATENCIÓN DIRECTA
            </h4>
            
            <div className="space-y-2 text-xs text-[#004D40]">
              <p className="font-extrabold text-[#00796B]">Contacto Telefónico y WhatsApp Directo:</p>
              <p className="font-bold">Atención Directa: +56 9 8330 2145</p>
            </div>

            <div className="space-y-1 text-xs text-[#004D40]">
              <p className="font-extrabold text-[#00796B]">Contacto por Correo Electrónico:</p>
              <p>contacto@aslideas.cl</p>
              <p>contacto@lawenmoll.cl</p>
            </div>

            <div className="space-y-1 text-xs text-[#004D40]">
              <p className="font-extrabold text-[#00796B]">Comunidad Oficial de WhatsApp (Grupo):</p>
              <a 
                href="#" 
                className="inline-block mt-1 text-xs font-extrabold px-3 py-1.5 rounded-lg bg-[#00796B] text-white hover:bg-[#004D40] transition shadow-sm"
              >
                Unirse al Grupo ASL Ideas SpA
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-[#00796B] uppercase tracking-wider border-b border-[#00796B]/20 pb-2">
              ACCESO A SALAS & ADMINISTRACIÓN
            </h4>
            <ul className="space-y-2 text-xs text-[#004D40] font-bold">
              <li><Link href="/sala-virtual?app=ASL%20Ideas%20SpA" className="hover:text-[#00796B]">Sala Virtual ASL Ideas SpA</Link></li>
              <li><Link href="/sala-virtual?app=LAWENMOLL" className="hover:text-[#00796B]">Sala Virtual LAWENMOLL</Link></li>
              <li><Link href="/sala-virtual?app=Wellness%20Web%20App" className="hover:text-[#00796B]">Sala Virtual Wellness Web App</Link></li>
              <li><Link href="/sala-virtual?app=Bienestar" className="hover:text-[#00796B]">Sala Virtual Sabiduría Ancestral / Bienestar</Link></li>
            </ul>

            <div className="pt-4 border-t border-[#00796B]/20 text-xs font-extrabold text-[#00796B] flex items-center gap-2">
              <Link href="/admin" className="hover:underline">Administración ASL (/admin)</Link>
              <span>•</span>
              <Link href="/sala-virtual" className="hover:underline font-bold">Sala Virtual (/sala-virtual)</Link>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[#00796B]/10 text-center text-[11px] text-[#00796B] font-bold">
          © 2026 ASL Ideas SpA. Todos los derechos reservados. Cumplimiento Ley TEA N° 21.545 y Ley N° 21.663.
        </div>
      </footer>
    </main>
  );
}
