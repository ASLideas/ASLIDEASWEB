'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#F2F7F6] text-[#1B3B36]' : 'bg-[#E5F0EE] text-[#142E2A]'}`}>
      
      {/* HEADER RESPONSIVO CON BOTÓN CUADRADO DE 3 LÍNEAS */}
      <header className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between border-b border-[#2D6A4F]/20 relative">
        <div className="flex items-center gap-3">
          <img 
            src="/logo-asl.png.png" 
            alt="Logo ASL Ideas SpA" 
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl bg-white p-1 border border-[#2D6A4F]/30 shadow-sm" 
          />
          <div>
            <h1 className="text-lg sm:text-2xl font-black text-[#1B4D3E]">
              ASL Ideas SpA
            </h1>
            <p className="text-xs text-[#2D6A4F] font-bold">
              Desarrollo B2B & Salud Digital Inclusiva (Ley N° 21.663 & Ley TEA N° 21.545)
            </p>
          </div>
        </div>

        {/* BOTÓN CUADRADO DE 3 LÍNEAS (MENÚ HAMBURGUESA) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="hidden md:inline-block px-3 py-2 text-xs font-bold rounded-xl bg-[#2D6A4F] text-white hover:bg-[#1B4D3E] transition"
          >
            {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma'}
          </button>

          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir Menú"
            className="w-11 h-11 bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white rounded-xl flex flex-col items-center justify-center gap-1.5 transition shadow-md border border-[#2D6A4F]"
          >
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
            <span className="w-6 h-0.5 bg-white rounded-full"></span>
          </button>
        </div>

        {/* MENÚ DESPLEGABLE VERTICAL ESTRUCTURADO */}
        {menuAbierto && (
          <div className="absolute top-full right-4 mt-2 w-80 sm:w-96 bg-[#F8FCFB] text-[#1B3B36] rounded-2xl border-2 border-[#2D6A4F]/40 shadow-2xl p-5 z-50 space-y-5">
            
            {/* SECCIÓN 1: SALAS & AGENDA */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase text-[#1B4D3E] tracking-wider border-b border-[#2D6A4F]/20 pb-1">
                Salas & Agenda Virtual
              </h3>
              
              {/* APP 1 */}
              <div className="bg-[#EAF3F2] p-2.5 rounded-xl text-xs space-y-1 border border-[#2D6A4F]/20">
                <p className="font-extrabold text-[#1B4D3E]">ASL Ideas SpA (Casa Matriz)</p>
                <div className="flex gap-2 pt-1">
                  <Link href="/sala-virtual?app=ASL%20Ideas%20SpA" className="bg-[#1B4D3E] text-white font-bold px-2.5 py-1 rounded-lg text-[11px] hover:bg-[#2D6A4F]">Ingresar a Sala</Link>
                  <Link href="/sala-virtual?app=ASL%20Ideas%20SpA&tab=cita" className="bg-[#B08D4B] text-white font-bold px-2.5 py-1 rounded-lg text-[11px] hover:bg-[#96773D]">Agendar Cita</Link>
                </div>
              </div>

              {/* APP 2 */}
              <div className="bg-[#EAF3F2] p-2.5 rounded-xl text-xs space-y-1 border border-[#2D6A4F]/20">
                <p className="font-extrabold text-[#1B4D3E]">LAWENMOLL (Vitrina Integrativa)</p>
                <div className="flex gap-2 pt-1">
                  <Link href="/sala-virtual?app=LAWENMOLL" className="bg-[#1B4D3E] text-white font-bold px-2.5 py-1 rounded-lg text-[11px] hover:bg-[#2D6A4F]">Ingresar a Sala</Link>
                  <Link href="/sala-virtual?app=LAWENMOLL&tab=cita" className="bg-[#B08D4B] text-white font-bold px-2.5 py-1 rounded-lg text-[11px] hover:bg-[#96773D]">Agendar Cita</Link>
                </div>
              </div>

              {/* APP 3 */}
              <div className="bg-[#EAF3F2] p-2.5 rounded-xl text-xs space-y-1 border border-[#2D6A4F]/20">
                <p className="font-extrabold text-[#1B4D3E]">Wellness Web App</p>
                <div className="flex gap-2 pt-1">
                  <Link href="/sala-virtual?app=Wellness%20Web%20App" className="bg-[#1B4D3E] text-white font-bold px-2.5 py-1 rounded-lg text-[11px] hover:bg-[#2D6A4F]">Ingresar a Sala</Link>
                  <Link href="/sala-virtual?app=Wellness%20Web%20App&tab=cita" className="bg-[#B08D4B] text-white font-bold px-2.5 py-1 rounded-lg text-[11px] hover:bg-[#96773D]">Agendar Cita</Link>
                </div>
              </div>

              {/* APP 4 */}
              <div className="bg-[#EAF3F2] p-2.5 rounded-xl text-xs space-y-1 border border-[#2D6A4F]/20">
                <p className="font-extrabold text-[#1B4D3E]">Sabiduría Ancestral / Bienestar</p>
                <div className="flex gap-2 pt-1">
                  <Link href="/sala-virtual?app=Bienestar" className="bg-[#1B4D3E] text-white font-bold px-2.5 py-1 rounded-lg text-[11px] hover:bg-[#2D6A4F]">Ingresar a Sala</Link>
                  <Link href="/sala-virtual?app=Bienestar&tab=cita" className="bg-[#B08D4B] text-white font-bold px-2.5 py-1 rounded-lg text-[11px] hover:bg-[#96773D]">Agendar Cita</Link>
                </div>
              </div>
            </div>

            {/* SECCIÓN 2: NUESTRAS REDES */}
            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase text-[#1B4D3E] tracking-wider border-b border-[#2D6A4F]/20 pb-1">
                Nuestras Redes
              </h3>
              <div className="grid grid-cols-1 gap-1 text-xs">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-[#2D6A4F] hover:underline font-bold">LinkedIn Corporativo</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-[#2D6A4F] hover:underline font-bold">Instagram Oficial</a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-[#2D6A4F] hover:underline font-bold">TikTok Salud Inclusiva</a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-[#2D6A4F] hover:underline font-bold">Canal de YouTube</a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-[#2D6A4F] hover:underline font-bold">Comunidad en Facebook</a>
              </div>
            </div>

            {/* SECCIÓN 3: CONTACTO DIRECTO & ACCESOS */}
            <div className="space-y-2 pt-1">
              <h3 className="text-xs font-black uppercase text-[#1B4D3E] tracking-wider border-b border-[#2D6A4F]/20 pb-1">
                Contacto Directo
              </h3>
              <a 
                href="#contacto" 
                onClick={() => setMenuAbierto(false)}
                className="block w-full py-2 bg-[#2D6A4F] text-white text-center rounded-xl text-xs font-extrabold hover:bg-[#1B4D3E]"
              >
                Ver Canales de Contacto Directo
              </a>
              <button
                type="button"
                onClick={() => setModoCalma(!modoCalma)}
                className="w-full py-2 bg-[#EAF3F2] text-[#1B4D3E] border border-[#2D6A4F]/30 text-center rounded-xl text-xs font-bold md:hidden"
              >
                {modoCalma ? 'Desactivar Modo Calma' : 'Activar Modo Calma (TEA)'}
              </button>
            </div>

          </div>
        )}
      </header>

      {/* BANNER PRINCIPAL OFICIAL */}
      <section className="max-w-7xl mx-auto px-4 py-8 text-center space-y-4">
        <span className="bg-[#2D6A4F]/10 text-[#1B4D3E] border border-[#2D6A4F]/30 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
          ASL IDEAS SPA — CASA MATRIZ
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-[#1B4D3E] max-w-4xl mx-auto leading-tight">
          Desarrollo y soluciones accesibles para PYME y comercio asociado
        </h2>
        <p className="text-xs md:text-sm text-[#2C4A43] max-w-4xl mx-auto leading-relaxed font-medium">
          Diseñamos y desarrollamos soluciones tecnológicas amables e interfaces visuales a medida para potenciar emprendedores, PYMEs y comercios en cualquier área del mercado. ASL Ideas SpA Casa Matriz combina diseño gráfico de alta sensibilidad visual con ingeniería de software accesible, adaptada para personas neurodivergentes y neurotípicas.
        </p>

        {/* QUIÉNES SOMOS, MISIÓN Y VISIÓN CASA MATRIZ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left max-w-6xl mx-auto">
          <div className="bg-[#FAFDFD] p-5 rounded-2xl border border-[#2D6A4F]/30 space-y-2 shadow-sm">
            <h3 className="text-sm font-black text-[#1B4D3E] uppercase tracking-wide">Quiénes Somos</h3>
            <p className="text-xs text-[#2C4A43] leading-relaxed">
              Fundados por una Diseñadora Gráfica con neurodivergencia (TEA 1 / TDAH) y condiciones crónicas, transformamos la vivencia del autocuidado eliminando la sobrecarga sensorial y la culpa.
            </p>
          </div>
          <div className="bg-[#FAFDFD] p-5 rounded-2xl border border-[#2D6A4F]/30 space-y-2 shadow-sm">
            <h3 className="text-sm font-black text-[#1B4D3E] uppercase tracking-wide">Nuestra Misión</h3>
            <p className="text-xs text-[#2C4A43] leading-relaxed">
              Diseñar aplicaciones web y móviles amables con baja carga sensorial, adaptadas a personas con neurodivergencias y neurotípicas, otorgando a distintas áreas mayor visibilidad con las herramientas digitales e integrar a personas con discapacidad al mundo laboral.
            </p>
          </div>
          <div className="bg-[#FAFDFD] p-5 rounded-2xl border border-[#2D6A4F]/30 space-y-2 shadow-sm">
            <h3 className="text-sm font-black text-[#1B4D3E] uppercase tracking-wide">Nuestra Visión</h3>
            <p className="text-xs text-[#2C4A43] leading-relaxed">
              Ser la empresa líder en soluciones tecnológicas accesibles para personas neurodivergentes y con discapacidad, dando trabajo y visibilidad a distintas empresas y dando soluciones a distintas problemáticas que enfrentamos como sociedad a través del diseño, tecnología, conectando personas y emprendedores, bajo estándares de ciberseguridad de la Ley N° 21.663.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE LAS 4 OFICINAS VIRTUALES (CON TODOS SUS TEXTOS OFICIALES) */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA */}
        <div className="bg-[#FAFDFD] p-6 rounded-3xl border-2 border-[#2D6A4F]/30 shadow-md flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D6A4F]/20 pb-3">
              <span className="bg-[#1B4D3E] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 01
              </span>
              <span className="text-xs text-[#2D6A4F] font-bold">Casa Matriz & Alianzas B2B</span>
            </div>
            
            <div className="flex items-center gap-3">
              <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-[#2D6A4F]/20" />
              <h3 className="text-lg font-extrabold text-[#1B4D3E]">ASL Ideas SpA</h3>
            </div>

            <p className="text-xs text-[#2C4A43] leading-relaxed">
              Diseñamos y desarrollamos soluciones tecnológicas amables e interfaces visuales a medida para potenciar emprendedores, PYMEs y comercios asociados en cualquier rubro del mercado.
            </p>

            <div className="bg-[#EFF7F6] p-4 rounded-2xl border border-[#2D6A4F]/20 text-xs space-y-2">
              <h4 className="font-extrabold text-[#1B4D3E]">Misión & Visión Oficial:</h4>
              <p className="text-[#2C4A43]"><strong>Misión:</strong> Apps amables con baja carga sensorial, adaptadas a personas neurodivergentes y neurotípicas, integrando personas con discapacidad al mundo laboral.</p>
              <p className="text-[#2C4A43]"><strong>Visión:</strong> Liderar en soluciones tecnológicas accesibles para personas neurodivergentes y con discapacidad, dando trabajo y visibilidad a empresas (Ley N° 21.663).</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/sala-virtual?app=ASL%20Ideas%20SpA"
              className="flex-1 py-3 bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Ingresar a Sala
            </Link>
            <Link
              href="/sala-virtual?app=ASL%20Ideas%20SpA&tab=cita"
              className="flex-1 py-3 bg-[#B08D4B] hover:bg-[#96773D] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Agendar Cita
            </Link>
          </div>
        </div>

        {/* OFICINA 02: LAWENMOLL */}
        <div className="bg-[#FAFDFD] p-6 rounded-3xl border-2 border-[#2D6A4F]/30 shadow-md flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D6A4F]/20 pb-3">
              <span className="bg-[#2D6A4F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 02
              </span>
              <span className="text-xs text-[#2D6A4F] font-bold">Vitrina Virtual Integrativa</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-lawenmoll.jpg.png" alt="Logo LAWENMOLL" className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-[#2D6A4F]/20" />
              <h3 className="text-lg font-extrabold text-[#1B4D3E]">LAWENMOLL</h3>
            </div>

            <p className="text-xs text-[#2C4A43] leading-relaxed">
              LAWENMOLL es la plataforma pionera de una vitrina virtual integrativa para el diagnóstico preventivo y acompañamiento continuo en enfermedades. Permite realizar tests de composición metabólica, emitir reportes inteligentes y conectar de forma segura a pacientes y distintos tipos de servicios que ofrece nuestra plataforma.
            </p>

            <div className="bg-[#EFF7F6] p-4 rounded-2xl border border-[#2D6A4F]/20 text-xs space-y-2">
              <h4 className="font-extrabold text-[#1B4D3E]">Misión & Visión Oficial:</h4>
              <p className="text-[#2C4A43]"><strong>Misión:</strong> Dar a conocer de forma visual e interactiva que existen múltiples posibilidades de acompañamiento y herramientas tecnológicas a través de la vitrina integrativa, ofreciendo diversos servicios visuales para mejorar la calidad de vida de cada usuario.</p>
              <p className="text-[#2C4A43]"><strong>Visión:</strong> Conectar de manera visual, transparente y accesible a las personas con distintos tipos de servicios, profesionales y emprendimientos del área de la salud integrativa, bienestar y gastronomía, mediante herramientas digitales con baja carga sensorial.</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/sala-virtual?app=LAWENMOLL"
              className="flex-1 py-3 bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Ingresar a Sala
            </Link>
            <Link
              href="/sala-virtual?app=LAWENMOLL&tab=cita"
              className="flex-1 py-3 bg-[#B08D4B] hover:bg-[#96773D] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Agendar Cita
            </Link>
          </div>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP */}
        <div className="bg-[#FAFDFD] p-6 rounded-3xl border-2 border-[#2D6A4F]/30 shadow-md flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D6A4F]/20 pb-3">
              <span className="bg-[#1B4D3E] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 03
              </span>
              <span className="text-xs text-[#2D6A4F] font-bold">Movimiento & Gastronomía</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-wellness.jpg.jpg" alt="Logo Wellness Web App" className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-[#2D6A4F]/20" />
              <h3 className="text-lg font-extrabold text-[#1B4D3E]">Wellness Web App</h3>
            </div>

            <p className="text-xs text-[#2C4A43] leading-relaxed">
              Wellness Web App es un espacio visual en el cual puedes ver distintos tipos de videos donde hay rutina de ejercicios específico para cardio, metabolismo etc, también abran guías de meditación para calmar la mente y el cuerpo con distintas disciplinas y tip gastronómico para distintos tipos de enfermedades que agobian a nuestros usuarios y dar visibilidad a profesionales que den clases en nuestras salas virtuales conectando a personas que les cueste asistir de forma presencial a ciertas actividades.
            </p>

            <div className="bg-[#EFF7F6] p-4 rounded-2xl border border-[#2D6A4F]/20 text-xs space-y-2">
              <h4 className="font-extrabold text-[#1B4D3E]">Misión & Visión Oficial:</h4>
              <p className="text-[#2C4A43]"><strong>Misión:</strong> Dar mayor visualización a profesionales que den clases y acercar a personas que no puedan tomar rutinas en vivo y en directo y lograr que hay más de una forma de tener una mejor calidad de vida.</p>
              <p className="text-[#2C4A43]"><strong>Visión:</strong> Mejorar la calidad de vida asistir a clases virtuales con una o más personas y poder interactuar si es que tiene problemas sensoriales o físicos.</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/sala-virtual?app=Wellness%20Web%20App"
              className="flex-1 py-3 bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Ingresar a Sala
            </Link>
            <Link
              href="/sala-virtual?app=Wellness%20Web%20App&tab=cita"
              className="flex-1 py-3 bg-[#B08D4B] hover:bg-[#96773D] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Agendar Cita
            </Link>
          </div>
        </div>

        {/* OFICINA 04: SABIDURÍA ANCESTRAL / BIENESTAR */}
        <div className="bg-[#FAFDFD] p-6 rounded-3xl border-2 border-[#2D6A4F]/30 shadow-md flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#2D6A4F]/20 pb-3">
              <span className="bg-[#2D6A4F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 04
              </span>
              <span className="text-xs text-[#2D6A4F] font-bold">Mensajería, Salud & Shopping PYME</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-bienestar.png.png" alt="Logo Bienestar" className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-[#2D6A4F]/20" />
              <h3 className="text-lg font-extrabold text-[#1B4D3E]">Sabiduría Ancestral / Bienestar</h3>
            </div>

            <p className="text-xs text-[#2C4A43] leading-relaxed">
              Bienestar está enfocado en la mensajería y en la rutina del día a día para anotar horas médicas, consultas, recordatorios de tomar agua, caminar, la rutina de ejercicios; también tendrá la parte de conectarse con pymes y ofrecer sus productos, y, por último, para personas que tengan problemas de insomnio, poder solucionar con música, relato o tip para conciliar el sueño y alcanzar el sueño rem reparador.
            </p>

            <div className="bg-[#EFF7F6] p-4 rounded-2xl border border-[#2D6A4F]/20 text-xs space-y-2">
              <h4 className="font-extrabold text-[#1B4D3E]">Misión & Visión Oficial:</h4>
              <p className="text-[#2C4A43]"><strong>Misión:</strong> Que haya comunicación, retroalimentación y comunicación de forma fluida y amena.</p>
              <p className="text-[#2C4A43]"><strong>Visión:</strong> Que nuestro usuario recuerde que también se puede cuidar con la agenda de bienestar con su hora médica recordar tomar agua, cuántos pasos debe caminar también poder tener un ingreso extra y una mejor calidad del sueño.</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Link
              href="/sala-virtual?app=Bienestar"
              className="flex-1 py-3 bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Ingresar a Sala
            </Link>
            <Link
              href="/sala-virtual?app=Bienestar&tab=cita"
              className="flex-1 py-3 bg-[#B08D4B] hover:bg-[#96773D] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Agendar Cita
            </Link>
          </div>
        </div>

      </section>

      {/* PIE DE PÁGINA (FOOTER) Y CANALES OFICIALES DE CONTACTO */}
      <footer id="contacto" className="bg-[#1B4D3E] text-white py-12 px-4 border-t-4 border-[#2D6A4F]">
        <div className="max-w-5xl mx-auto space-y-6 text-center md:text-left">
          
          <div className="space-y-2 border-b border-emerald-800/60 pb-6">
            <h3 className="text-xl font-black text-emerald-200">
              ASL Ideas SpA — Casa Matriz y Desarrollo B2B
            </h3>
            <p className="text-xs md:text-sm text-emerald-100 max-w-3xl leading-relaxed">
              Estrategia de Salud Digital Inclusiva. Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencia y condiciones crónicas de salud.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase text-emerald-300 tracking-wider">
              CANALES OFICIALES DE CONTACTO Y ATENCIÓN DIRECTA:
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#12362B] p-4 rounded-xl border border-emerald-700/50 space-y-1">
                <p className="font-bold text-emerald-300">Contacto Telefónico y WhatsApp Directo:</p>
                <p className="text-white text-sm font-black">Atención Directa: +56 9 8330 2145</p>
              </div>

              <div className="bg-[#12362B] p-4 rounded-xl border border-emerald-700/50 space-y-1">
                <p className="font-bold text-emerald-300">Contacto por Correo Electrónico:</p>
                <p className="text-white font-medium">contacto@aslideas.cl</p>
                <p className="text-white font-medium">contacto@lawenmoll.cl</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs">
              <a 
                href="https://chat.whatsapp.com" 
                target="_blank" 
                rel="noreferrer"
                className="px-5 py-2.5 bg-[#B08D4B] hover:bg-[#96773D] text-white font-black rounded-xl shadow-md transition"
              >
                Unirse al Grupo ASL Ideas SpA
              </a>
              <span className="text-emerald-300 text-xs">
                Administración ASL (/admin) • Sala Virtual (/sala-virtual)
              </span>
            </div>
          </div>

        </div>
      </footer>

    </main>
  );
}
