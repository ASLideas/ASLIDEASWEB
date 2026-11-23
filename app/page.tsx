'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(true);
  const [openSalas, setOpenSalas] = useState(false);
  const [openRedes, setOpenRedes] = useState(false);

  const scrollToContacto = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById('contacto');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className={`min-h-screen transition-colors duration-300 font-sans ${modoCalma ? 'bg-[#F5F7F4] text-[#1F2D27]' : 'bg-[#FAF9F6] text-[#1F2D27]'}`}>
      
      {/* HEADER RESPONSIVO CON MENÚS DESPLEGABLES */}
      <header className="sticky top-0 z-50 bg-[#F5F7F4]/95 backdrop-blur-md border-b border-[#2D6A4F]/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo Principal e Identidad */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo-asl.png.png" 
              alt="Logo ASL Ideas SpA" 
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl bg-white p-1 shadow-sm border border-[#2D6A4F]/30" 
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#1B4D3E]">
                ASL Ideas SpA
              </h1>
              <p className="text-xs text-[#2D6A4F] font-semibold">
                Tecnología Amable y Accesible | Baja Carga Sensorial (Ley N° 21.545)
              </p>
            </div>
          </div>

          {/* Menús Desplegables & Acciones */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            
            {/* Desplegable: Salas & Agenda */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setOpenSalas(!openSalas); setOpenRedes(false); }}
                className="px-3.5 py-2 text-xs font-bold rounded-xl bg-white text-[#1B4D3E] border border-[#2D6A4F]/40 hover:bg-[#EEF4F1] transition shadow-sm flex items-center gap-1.5"
              >
                <span>Salas & Agenda</span>
                <span className="text-[10px]">▼</span>
              </button>

              {openSalas && (
                <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#2D6A4F]/30 p-3 space-y-2.5 z-50">
                  <div className="text-[11px] font-extrabold text-[#B08D4B] uppercase tracking-wider pb-1 border-b border-slate-100">
                    Seleccionar Oficina Virtual
                  </div>
                  
                  {/* Item 1 */}
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-[#1B4D3E]">ASL Ideas SpA</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Link href="/sala-virtual?app=ASL%20Ideas%20SpA" className="text-[#2D6A4F] font-medium hover:underline">Ingresar a Sala</Link>
                      <span className="text-slate-300">|</span>
                      <Link href="/sala-virtual?app=ASL%20Ideas%20SpA&tab=cita" className="text-[#B08D4B] font-medium hover:underline">Agendar Cita</Link>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="space-y-1 pt-1 border-t border-slate-100">
                    <p className="text-xs font-bold text-[#1B4D3E]">LAWENMOLL</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Link href="/sala-virtual?app=LAWENMOLL" className="text-[#2D6A4F] font-medium hover:underline">Ingresar a Sala</Link>
                      <span className="text-slate-300">|</span>
                      <Link href="/sala-virtual?app=LAWENMOLL&tab=cita" className="text-[#B08D4B] font-medium hover:underline">Agendar Cita</Link>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="space-y-1 pt-1 border-t border-slate-100">
                    <p className="text-xs font-bold text-[#1B4D3E]">Wellness Web App</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Link href="/sala-virtual?app=Wellness%20Web%20App" className="text-[#2D6A4F] font-medium hover:underline">Ingresar a Sala</Link>
                      <span className="text-slate-300">|</span>
                      <Link href="/sala-virtual?app=Wellness%20Web%20App&tab=cita" className="text-[#B08D4B] font-medium hover:underline">Agendar Cita</Link>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="space-y-1 pt-1 border-t border-slate-100">
                    <p className="text-xs font-bold text-[#1B4D3E]">Sabiduría Ancestral / Bienestar</p>
                    <div className="flex items-center gap-2 text-xs">
                      <Link href="/sala-virtual?app=Bienestar" className="text-[#2D6A4F] font-medium hover:underline">Ingresar a Sala</Link>
                      <span className="text-slate-300">|</span>
                      <Link href="/sala-virtual?app=Bienestar&tab=cita" className="text-[#B08D4B] font-medium hover:underline">Agendar Cita</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Desplegable: Nuestras Redes */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setOpenRedes(!openRedes); setOpenSalas(false); }}
                className="px-3.5 py-2 text-xs font-bold rounded-xl bg-white text-[#1B4D3E] border border-[#2D6A4F]/40 hover:bg-[#EEF4F1] transition shadow-sm flex items-center gap-1.5"
              >
                <span>Nuestras Redes</span>
                <span className="text-[10px]">▼</span>
              </button>

              {openRedes && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-[#2D6A4F]/30 p-3 space-y-2 z-50">
                  <div className="text-[11px] font-extrabold text-[#B08D4B] uppercase tracking-wider pb-1 border-b border-slate-100">
                    Canales Oficiales
                  </div>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="block text-xs font-semibold text-[#1B4D3E] hover:text-[#2D6A4F] hover:bg-[#F5F7F4] p-1.5 rounded-lg transition">LinkedIn Corporativo</a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="block text-xs font-semibold text-[#1B4D3E] hover:text-[#2D6A4F] hover:bg-[#F5F7F4] p-1.5 rounded-lg transition">Instagram Oficial</a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="block text-xs font-semibold text-[#1B4D3E] hover:text-[#2D6A4F] hover:bg-[#F5F7F4] p-1.5 rounded-lg transition">TikTok Salud Inclusiva</a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="block text-xs font-semibold text-[#1B4D3E] hover:text-[#2D6A4F] hover:bg-[#F5F7F4] p-1.5 rounded-lg transition">Canal de YouTube</a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="block text-xs font-semibold text-[#1B4D3E] hover:text-[#2D6A4F] hover:bg-[#F5F7F4] p-1.5 rounded-lg transition">Comunidad en Facebook</a>
                </div>
              )}
            </div>

            {/* Botón: Contacto Directo (Scroll al Pie de Página) */}
            <a
              href="#contacto"
              onClick={scrollToContacto}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#2D6A4F] text-white hover:bg-[#1B4D3E] transition shadow-sm"
            >
              Contacto Directo
            </a>

            {/* Conmutador Modo Calma */}
            <button
              type="button"
              onClick={() => setModoCalma(!modoCalma)}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#B08D4B] text-white hover:bg-[#96763D] transition shadow-sm"
            >
              {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma'}
            </button>

          </div>
        </div>
      </header>

      {/* BANNER PRINCIPAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center space-y-4">
        <span className="inline-block bg-[#2D6A4F]/15 text-[#1B4D3E] border border-[#2D6A4F]/30 text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider">
          ASL IDEAS SPA — CASA MATRIZ
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1B4D3E] max-w-4xl mx-auto leading-tight">
          Diseño Gráfico de Alta Sensibilidad Visual e Ingeniería de Software Accesible
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-[#2C3E35] max-w-4xl mx-auto leading-relaxed">
          Diseñamos y desarrollamos soluciones tecnológicas amables y herramientas digitales a medida para emprendedores, PYMEs y comercios. ASL Ideas SpA Casa Matriz combina diseño gráfico de alta sensibilidad visual con ingeniería de software accesible. Aunque nacimos impulsando el ecosistema de la salud y el bienestar integrativo, creamos plataformas e interfaces visuales adaptadas para potenciar negocios en cualquier área del mercado.
        </p>

        {/* Misión y Visión Casa Matriz */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-left max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-3xl border border-[#2D6A4F]/25 shadow-sm space-y-2">
            <h3 className="text-base font-extrabold text-[#1B4D3E]">Nuestra Misión</h3>
            <p className="text-xs sm:text-sm text-[#2C3E35] leading-relaxed">
              Diseñar aplicaciones web y móviles amables con baja carga sensorial, adaptadas a personas con neurodivergencias y neurotípicas, otorgando a distintas áreas mayor visibilidad con las herramientas digitales e integrar a personas con discapacidad al mundo laboral.
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#2D6A4F]/25 shadow-sm space-y-2">
            <h3 className="text-base font-extrabold text-[#1B4D3E]">Nuestra Visión</h3>
            <p className="text-xs sm:text-sm text-[#2C3E35] leading-relaxed">
              Ser la empresa líder en soluciones tecnológicas accesibles para personas neurodivergentes y con discapacidad, dando trabajo y visibilidad a distintas empresas y dando soluciones a distintas problemáticas que enfrentamos como sociedad a través del diseño, tecnología, conectando personas y emprendedores, bajo estándares de ciberseguridad de la Ley N° 21.663.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 4 OFICINAS VIRTUALES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#2D6A4F]/30 shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#1B4D3E] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Oficina 01
              </span>
              <span className="text-xs text-[#2D6A4F] font-bold">Casa Matriz & Alianzas B2B</span>
            </div>
            
            <div className="flex items-center gap-4">
              <img 
                src="/logo-asl.png.png" 
                alt="Logo ASL Ideas" 
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl bg-white p-1 border border-[#2D6A4F]/25 shadow-sm" 
              />
              <h3 className="text-xl font-extrabold text-[#1B4D3E]">ASL Ideas SpA</h3>
            </div>

            <p className="text-xs sm:text-sm text-[#2C3E35] leading-relaxed">
              Diseñamos y desarrollamos soluciones tecnológicas amables e interfaces visuales a medida para potenciar emprendedores, PYMEs y comercios asociados en cualquier área del mercado.
            </p>

            <div className="bg-[#F5F7F4] p-4 rounded-2xl border border-[#2D6A4F]/20 text-xs space-y-2">
              <h4 className="font-bold text-[#1B4D3E]">Misión & Visión:</h4>
              <p className="text-[#2C3E35]"><strong>Misión:</strong> Apps amables con baja carga sensorial e integración laboral de personas con discapacidad.</p>
              <p className="text-[#2C3E35]"><strong>Visión:</strong> Liderar en accesibilidad tecnológica bajo estándares de ciberseguridad de la Ley N° 21.663 y Ley TEA N° 21.545.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/sala-virtual?app=ASL%20Ideas%20SpA"
              className="flex-1 py-3 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Ingresar a Sala Virtual
            </Link>
            <Link
              href="/sala-virtual?app=ASL%20Ideas%20SpA&tab=cita"
              className="flex-1 py-3 bg-[#B08D4B] hover:bg-[#96763D] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Agendar Cita B2B
            </Link>
          </div>
        </div>

        {/* OFICINA 02: LAWENMOLL */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#2D6A4F]/30 shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#2D6A4F] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Oficina 02
              </span>
              <span className="text-xs text-[#2D6A4F] font-bold">Vitrina Virtual Integrativa</span>
            </div>

            <div className="flex items-center gap-4">
              <img 
                src="/logo-lawenmoll.jpg.png" 
                alt="Logo LAWENMOLL" 
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl bg-white p-1 border border-[#2D6A4F]/25 shadow-sm" 
              />
              <h3 className="text-xl font-extrabold text-[#1B4D3E]">LAWENMOLL</h3>
            </div>

            <p className="text-xs sm:text-sm text-[#2C3E35] leading-relaxed">
              LAWENMOLL es la plataforma pionera de una vitrina virtual integrativa para el diagnóstico preventivo y acompañamiento continuo en enfermedades. Permite realizar tests de composición metabólica, emitir reportes inteligentes y conectar de forma segura a pacientes y distintos tipos de servicios que ofrece nuestra plataforma.
            </p>

            <div className="bg-[#F5F7F4] p-4 rounded-2xl border border-[#2D6A4F]/20 text-xs space-y-2">
              <h4 className="font-bold text-[#1B4D3E]">Misión & Visión:</h4>
              <p className="text-[#2C3E35]"><strong>Misión:</strong> Dar a conocer de forma visual e interactiva que existen múltiples posibilidades de acompañamiento y herramientas tecnológicas a través de la vitrina integrativa.</p>
              <p className="text-[#2C3E35]"><strong>Visión:</strong> Conectar de manera visual, transparente y accesible a las personas con distintos tipos de servicios, profesionales y emprendimientos del área de la salud integrativa, bienestar y gastronomía.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/sala-virtual?app=LAWENMOLL"
              className="flex-1 py-3 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Ingresar a Sala Virtual
            </Link>
            <Link
              href="/sala-virtual?app=LAWENMOLL&tab=cita"
              className="flex-1 py-3 bg-[#B08D4B] hover:bg-[#96763D] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Agendar Cita B2B
            </Link>
          </div>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#2D6A4F]/30 shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#1B4D3E] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Oficina 03
              </span>
              <span className="text-xs text-[#2D6A4F] font-bold">Movimiento & Gastronomía</span>
            </div>

            <div className="flex items-center gap-4">
              <img 
                src="/logo-wellness.jpg.jpg" 
                alt="Logo Wellness Web App" 
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl bg-white p-1 border border-[#2D6A4F]/25 shadow-sm" 
              />
              <h3 className="text-xl font-extrabold text-[#1B4D3E]">Wellness Web App</h3>
            </div>

            <p className="text-xs sm:text-sm text-[#2C3E35] leading-relaxed">
              Wellness Web App es un espacio visual en el cual puedes ver distintos tipos de videos donde hay rutinas de ejercicios específicos para cardio, metabolismo, etc., guías de meditación para calmar la mente y el cuerpo con distintas disciplinas y tips gastronómicos para acompañar a nuestros usuarios, dando visibilidad a profesionales que dan clases en nuestras salas virtuales conectando a personas que les cueste asistir de forma presencial a ciertas actividades.
            </p>

            <div className="bg-[#F5F7F4] p-4 rounded-2xl border border-[#2D6A4F]/20 text-xs space-y-2">
              <h4 className="font-bold text-[#1B4D3E]">Misión & Visión:</h4>
              <p className="text-[#2C3E35]"><strong>Misión:</strong> Dar mayor visualización a profesionales que dan clases y acercar a personas que no puedan tomar rutinas en vivo y en directo, logrando que hay más de una forma de tener una mejor calidad de vida.</p>
              <p className="text-[#2C3E35]"><strong>Visión:</strong> Mejorar la calidad de vida, asistir a clases virtuales con una o más personas y poder interactuar si es que tiene problemas sensoriales o físicos.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/sala-virtual?app=Wellness%20Web%20App"
              className="flex-1 py-3 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Ingresar a Sala Virtual
            </Link>
            <Link
              href="/sala-virtual?app=Wellness%20Web%20App&tab=cita"
              className="flex-1 py-3 bg-[#B08D4B] hover:bg-[#96763D] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Agendar Cita B2B
            </Link>
          </div>
        </div>

        {/* OFICINA 04: BIENESTAR */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#2D6A4F]/30 shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#2D6A4F] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Oficina 04
              </span>
              <span className="text-xs text-[#2D6A4F] font-bold">Sabiduría Ancestral & Mensajería</span>
            </div>

            <div className="flex items-center gap-4">
              <img 
                src="/logo-bienestar.png.png" 
                alt="Logo Bienestar" 
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl bg-white p-1 border border-[#2D6A4F]/25 shadow-sm" 
              />
              <h3 className="text-xl font-extrabold text-[#1B4D3E]">Sabiduría Ancestral / Bienestar</h3>
            </div>

            <p className="text-xs sm:text-sm text-[#2C3E35] leading-relaxed">
              Bienestar es un portal enfocado en la mensajería y en la rutina del día a día para anotar horas médicas, consultas, recordatorios de tomar agua, caminar, rutina de ejercicios; también tendrá la parte de conectarse con PYMEs y ofrecer sus productos, y por último, para personas que tengan problemas de insomnio, poder solucionar con música, relatos o tips para conciliar el sueño y alcanzar el sueño REM reparador.
            </p>

            <div className="bg-[#F5F7F4] p-4 rounded-2xl border border-[#2D6A4F]/20 text-xs space-y-2">
              <h4 className="font-bold text-[#1B4D3E]">Misión & Visión:</h4>
              <p className="text-[#2C3E35]"><strong>Misión:</strong> Que haya comunicación, retroalimentación y conexión de forma fluida y amena.</p>
              <p className="text-[#2C3E35]"><strong>Visión:</strong> Que nuestro usuario recuerde que también se puede cuidar con la agenda de bienestar con su hora médica, recordar tomar agua, cuántos pasos debe caminar, poder tener un ingreso extra y una mejor calidad del sueño.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/sala-virtual?app=Bienestar"
              className="flex-1 py-3 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Ingresar a Sala Virtual
            </Link>
            <Link
              href="/sala-virtual?app=Bienestar&tab=cita"
              className="flex-1 py-3 bg-[#B08D4B] hover:bg-[#96763D] text-white font-bold text-xs rounded-xl transition text-center shadow-sm"
            >
              Agendar Cita B2B
            </Link>
          </div>
        </div>

      </section>

      {/* FOOTER & CANALES OFICIALES DE CONTACTO Y ATENCIÓN DIRECTA (#contacto) */}
      <footer id="contacto" className="bg-[#1B4D3E] text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-[#2D6A4F]/40 scroll-mt-20">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ASL Ideas SpA — Casa Matriz y Desarrollo B2B
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-4xl leading-relaxed">
              Estrategia de Salud Digital Inclusiva. Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencia y condiciones crónicas de salud.
            </p>
          </div>

          <div className="border-t border-[#2D6A4F]/60 pt-6">
            <h3 className="text-xs font-black text-[#B08D4B] uppercase tracking-wider mb-4">
              CANALES OFICIALES DE CONTACTO Y ATENCIÓN DIRECTA:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
              
              {/* Teléfono */}
              <div className="bg-[#2D6A4F]/30 p-4 rounded-2xl border border-[#2D6A4F]/50 space-y-1">
                <p className="font-bold text-slate-200">Contacto Telefónico y WhatsApp Directo:</p>
                <p className="text-white font-extrabold text-base">Atención Directa: +56 9 8330 2145</p>
              </div>

              {/* Correos */}
              <div className="bg-[#2D6A4F]/30 p-4 rounded-2xl border border-[#2D6A4F]/50 space-y-1">
                <p className="font-bold text-slate-200">Contacto por Correo Electrónico:</p>
                <p className="text-white font-bold">contacto@aslideas.cl</p>
                <p className="text-white font-bold">contacto@lawenmoll.cl</p>
              </div>

              {/* WhatsApp Grupo */}
              <div className="bg-[#2D6A4F]/30 p-4 rounded-2xl border border-[#2D6A4F]/50 space-y-2 flex flex-col justify-between">
                <p className="font-bold text-slate-200">Comunidad Oficial de WhatsApp (Grupo):</p>
                <a
                  href="https://chat.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center py-2 bg-[#B08D4B] hover:bg-[#96763D] text-white font-bold text-xs rounded-xl transition shadow-sm"
                >
                  Unirse al Grupo ASL Ideas SpA
                </a>
              </div>

            </div>
          </div>

          {/* Enlaces Administrativos / Salas */}
          <div className="border-t border-[#2D6A4F]/60 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
            <p>© {new Date().getFullYear()} ASL Ideas SpA. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <Link href="/admin" className="hover:text-white transition">Administración ASL (/admin)</Link>
              <span>•</span>
              <Link href="/sala-virtual" className="hover:text-white transition">Sala Virtual (/sala-virtual)</Link>
            </div>
          </div>

        </div>
      </footer>

    </main>
  );
}
