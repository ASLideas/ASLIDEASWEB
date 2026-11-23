'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#F2F9F8] text-[#1E3A3A]' : 'bg-[#EBF5F4] text-[#1E3A3A]'}`}>
      {/* Header Principal con Menús Desplegables y Sin Emojis */}
      <header className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-[#B2DFDB]/60 bg-white/90 backdrop-blur-md sticky top-0 z-50 rounded-b-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/logo-asl.png.png" alt="Logo ASL Ideas SpA" className="w-11 h-11 object-contain rounded-xl bg-white p-1 border border-[#4DB6AC]/40 shadow-sm" />
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-[#00695C]">
              ASL Ideas SpA
            </h1>
            <p className="text-xs text-[#00796B] font-bold">
              TECNOLOGÍA CON ALMA & EMPATÍA | BAJA CARGA SENSORIAL (LEY TEA N° 21.545)
            </p>
          </div>
        </div>

        {/* Navegación y Menús Desplegables */}
        <nav className="flex flex-wrap items-center gap-3 relative">
          
          {/* Desplegable 1: Salas & Agenda */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('salas')}
              className="px-4 py-2 text-xs font-extrabold rounded-xl bg-[#00796B] text-white hover:bg-[#004D40] transition shadow-sm flex items-center gap-1.5"
            >
              <span>Salas & Agenda</span>
              <span className="text-[10px]">▼</span>
            </button>

            {openDropdown === 'salas' && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-[#B2DFDB] p-4 z-50 space-y-3">
                <h4 className="text-xs font-black text-[#004D40] uppercase tracking-wider border-b border-[#E0F2F1] pb-1.5">
                  Salas Virtuales & Agendamiento
                </h4>
                
                {/* Item ASL */}
                <div className="p-2.5 rounded-xl bg-[#F4FAF9] border border-[#E0F2F1] space-y-1.5">
                  <span className="text-xs font-bold text-[#00695C] block">ASL Ideas SpA</span>
                  <div className="flex gap-2 text-[11px]">
                    <Link href="/sala-virtual?app=ASL%20Ideas%20SpA" className="px-2.5 py-1 bg-[#00796B] text-white rounded-lg font-bold hover:bg-[#004D40] transition">Ingresar a Sala</Link>
                    <Link href="/sala-virtual?app=ASL%20Ideas%20SpA&tab=cita" className="px-2.5 py-1 bg-[#E0F2F1] text-[#004D40] rounded-lg font-bold hover:bg-[#B2DFDB] transition">Agendar Cita</Link>
                  </div>
                </div>

                {/* Item LAWENMOLL */}
                <div className="p-2.5 rounded-xl bg-[#F4FAF9] border border-[#E0F2F1] space-y-1.5">
                  <span className="text-xs font-bold text-[#00695C] block">LAWENMOLL</span>
                  <div className="flex gap-2 text-[11px]">
                    <Link href="/sala-virtual?app=LAWENMOLL" className="px-2.5 py-1 bg-[#00796B] text-white rounded-lg font-bold hover:bg-[#004D40] transition">Ingresar a Sala</Link>
                    <Link href="/sala-virtual?app=LAWENMOLL&tab=cita" className="px-2.5 py-1 bg-[#E0F2F1] text-[#004D40] rounded-lg font-bold hover:bg-[#B2DFDB] transition">Agendar Cita</Link>
                  </div>
                </div>

                {/* Item Wellness */}
                <div className="p-2.5 rounded-xl bg-[#F4FAF9] border border-[#E0F2F1] space-y-1.5">
                  <span className="text-xs font-bold text-[#00695C] block">Wellness Web App</span>
                  <div className="flex gap-2 text-[11px]">
                    <Link href="/sala-virtual?app=Wellness%20Web%20App" className="px-2.5 py-1 bg-[#00796B] text-white rounded-lg font-bold hover:bg-[#004D40] transition">Ingresar a Sala</Link>
                    <Link href="/sala-virtual?app=Wellness%20Web%20App&tab=cita" className="px-2.5 py-1 bg-[#E0F2F1] text-[#004D40] rounded-lg font-bold hover:bg-[#B2DFDB] transition">Agendar Cita</Link>
                  </div>
                </div>

                {/* Item Sabiduría Ancestral / Bienestar */}
                <div className="p-2.5 rounded-xl bg-[#F4FAF9] border border-[#E0F2F1] space-y-1.5">
                  <span className="text-xs font-bold text-[#00695C] block">Sabiduría Ancestral / Bienestar</span>
                  <div className="flex gap-2 text-[11px]">
                    <Link href="/sala-virtual?app=Bienestar" className="px-2.5 py-1 bg-[#00796B] text-white rounded-lg font-bold hover:bg-[#004D40] transition">Ingresar a Sala</Link>
                    <Link href="/sala-virtual?app=Bienestar&tab=cita" className="px-2.5 py-1 bg-[#E0F2F1] text-[#004D40] rounded-lg font-bold hover:bg-[#B2DFDB] transition">Agendar Cita</Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desplegable 2: Nuestras Redes */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('redes')}
              className="px-4 py-2 text-xs font-extrabold rounded-xl bg-[#E0F2F1] text-[#004D40] hover:bg-[#B2DFDB] transition flex items-center gap-1.5 border border-[#4DB6AC]/40"
            >
              <span>Nuestras Redes</span>
              <span className="text-[10px]">▼</span>
            </button>

            {openDropdown === 'redes' && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#B2DFDB] p-3 z-50 space-y-2">
                <h4 className="text-xs font-black text-[#004D40] uppercase tracking-wider border-b border-[#E0F2F1] pb-1.5">
                  Redes Oficiales
                </h4>
                <a href="#linkedin" className="block text-xs font-semibold text-slate-700 hover:text-[#00796B] p-2 hover:bg-[#F4FAF9] rounded-lg transition">LinkedIn Corporativo</a>
                <a href="#instagram" className="block text-xs font-semibold text-slate-700 hover:text-[#00796B] p-2 hover:bg-[#F4FAF9] rounded-lg transition">Instagram Oficial</a>
                <a href="#tiktok" className="block text-xs font-semibold text-slate-700 hover:text-[#00796B] p-2 hover:bg-[#F4FAF9] rounded-lg transition">TikTok Salud Inclusiva</a>
                <a href="#youtube" className="block text-xs font-semibold text-slate-700 hover:text-[#00796B] p-2 hover:bg-[#F4FAF9] rounded-lg transition">Canal de YouTube</a>
                <a href="#facebook" className="block text-xs font-semibold text-slate-700 hover:text-[#00796B] p-2 hover:bg-[#F4FAF9] rounded-lg transition">Comunidad en Facebook</a>
              </div>
            )}
          </div>

          {/* Desplegable 3: Contacto Directo */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('contacto')}
              className="px-4 py-2 text-xs font-extrabold rounded-xl bg-[#E0F2F1] text-[#004D40] hover:bg-[#B2DFDB] transition flex items-center gap-1.5 border border-[#4DB6AC]/40"
            >
              <span>Contacto Directo</span>
              <span className="text-[10px]">▼</span>
            </button>

            {openDropdown === 'contacto' && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#B2DFDB] p-3 z-50 space-y-2">
                <h4 className="text-xs font-black text-[#004D40] uppercase tracking-wider border-b border-[#E0F2F1] pb-1.5">
                  Canales Directos
                </h4>
                <Link href="/sala-virtual?tab=oficina" className="block text-xs font-semibold text-slate-700 hover:text-[#00796B] p-2 hover:bg-[#F4FAF9] rounded-lg transition">Ver Ficha / Ingresar</Link>
                <Link href="/sala-virtual?tab=cita" className="block text-xs font-semibold text-slate-700 hover:text-[#00796B] p-2 hover:bg-[#F4FAF9] rounded-lg transition">Agenda de Reuniones</Link>
                <a href="#whatsapp" className="block text-xs font-semibold text-slate-700 hover:text-[#00796B] p-2 hover:bg-[#F4FAF9] rounded-lg transition">Grupo WhatsApp</a>
                <a href="#telegram" className="block text-xs font-semibold text-slate-700 hover:text-[#00796B] p-2 hover:bg-[#F4FAF9] rounded-lg transition">Canal Telegram</a>
              </div>
            )}
          </div>

          {/* Botón Modo Calma */}
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-3 py-2 text-xs font-bold rounded-xl bg-white text-[#004D40] border border-[#4DB6AC]/40 hover:bg-[#F4FAF9] transition shadow-sm"
          >
            {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>
        </nav>
      </header>

      {/* Banner Propuesta de Valor Oficial */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-center space-y-4">
        <span className="bg-[#00796B]/15 text-[#004D40] border border-[#00796B]/30 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
          ASL IDEAS SPA — CASA MATRIZ
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-[#004D40] max-w-4xl mx-auto leading-tight">
          Visualización, Diseño y Desarrollo de Apps para PYMEs y Comercio Asociado
        </h2>
        <p className="text-xs md:text-sm text-[#2C524F] max-w-4xl mx-auto leading-relaxed font-medium">
          Diseñamos y desarrollamos soluciones tecnológicas amables y herramientas digitales a medida para emprendedores, PYMEs y comercios. ASL Ideas SpA Casa Matriz combina diseño gráfico de alta sensibilidad visual con ingeniería de software accesible. Aunque nacimos impulsando el ecosistema de la salud y el bienestar integrativo, creamos plataformas e interfaces visuales adaptadas para potenciar negocios en cualquier área del mercado.
        </p>

        {/* Misión y Visión Casa Matriz */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-left max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-2xl border border-[#B2DFDB] shadow-md space-y-2">
            <h3 className="text-sm font-black text-[#00695C] uppercase tracking-wide">Nuestra Misión</h3>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              Diseñar aplicaciones web y móviles amables con baja carga sensorial, adaptadas a personas con neurodivergencias y neurotípicas, otorgando a distintas áreas mayor visibilidad con las herramientas digitales e integrar a personas con discapacidad al mundo laboral.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#B2DFDB] shadow-md space-y-2">
            <h3 className="text-sm font-black text-[#00695C] uppercase tracking-wide">Nuestra Visión</h3>
            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              Ser la empresa líder en soluciones tecnológicas accesibles para personas neurodivergentes y con discapacidad, dando trabajo y visibilidad a distintas empresas y dando soluciones a distintas problemáticas que enfrentamos como sociedad a través del diseño, tecnología, conectando personas y emprendedores, bajo estándares de ciberseguridad de la Ley N° 21.663.
            </p>
          </div>
        </div>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA (Casa Matriz & Alianzas B2B) */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#4DB6AC]/60 shadow-lg flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#00796B] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 01
              </span>
              <span className="text-xs text-[#004D40] font-bold">Casa Matriz & Alianzas B2B</span>
            </div>
            
            <div className="flex items-center gap-3">
              <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-[#B2DFDB]" />
              <h3 className="text-xl font-extrabold text-[#004D40]">ASL Ideas SpA</h3>
            </div>

            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              Diseñamos y desarrollamos soluciones tecnológicas amables e interfaces visuales a medida para potenciar emprendedores, PYMEs y comercios asociados en cualquier rubro del mercado.
            </p>

            <div className="bg-[#F4FAF9] p-4 rounded-2xl border border-[#B2DFDB] text-xs space-y-2">
              <h4 className="font-bold text-[#00695C]">Misión & Visión:</h4>
              <p className="text-slate-700"><strong>Misión:</strong> Apps amables con baja carga sensorial e integración laboral de personas con discapacidad.</p>
              <p className="text-slate-700"><strong>Visión:</strong> Liderar en accesibilidad tecnológica (Ley N° 21.663 y Ley TEA N° 21.545).</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Link
              href="/sala-virtual?app=ASL%20Ideas%20SpA"
              className="flex-1 py-3 bg-[#00796B] hover:bg-[#004D40] text-white font-bold text-xs rounded-xl transition text-center shadow-md block"
            >
              Ingresar a Sala
            </Link>
            <Link
              href="/sala-virtual?app=ASL%20Ideas%20SpA&tab=cita"
              className="flex-1 py-3 bg-[#E0F2F1] hover:bg-[#B2DFDB] text-[#004D40] font-bold text-xs rounded-xl transition text-center shadow-sm block border border-[#4DB6AC]/40"
            >
              Agendar Cita
            </Link>
          </div>
        </div>

        {/* OFICINA 02: LAWENMOLL (Vitrina Virtual Integrativa) */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#4DB6AC]/60 shadow-lg flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#00796B] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 02
              </span>
              <span className="text-xs text-[#004D40] font-bold">Vitrina Virtual Integrativa</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-lawenmoll.jpg.png" alt="Logo LAWENMOLL" className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-[#B2DFDB]" />
              <h3 className="text-xl font-extrabold text-[#004D40]">LAWENMOLL</h3>
            </div>

            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              LAWENMOLL es la plataforma pionera de una vitrina virtual integrativa para el diagnóstico preventivo y acompañamiento continuo en enfermedades. Permite realizar tests de composición metabólica, emitir reportes inteligentes y conectar de forma segura a pacientes y distintos tipos de servicios que ofrece nuestra plataforma.
            </p>

            <div className="bg-[#F4FAF9] p-4 rounded-2xl border border-[#B2DFDB] text-xs space-y-2">
              <h4 className="font-bold text-[#00695C]">Misión & Visión:</h4>
              <p className="text-slate-700"><strong>Misión:</strong> Dar a conocer de forma visual e interactiva que existen múltiples posibilidades de acompañamiento y herramientas tecnológicas a través de la vitrina integrativa.</p>
              <p className="text-slate-700"><strong>Visión:</strong> Conectar de manera visual, transparente y accesible a las personas con distintos tipos de servicios, profesionales y emprendimientos del área de la salud integrativa, bienestar y gastronomía.</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Link
              href="/sala-virtual?app=LAWENMOLL"
              className="flex-1 py-3 bg-[#00796B] hover:bg-[#004D40] text-white font-bold text-xs rounded-xl transition text-center shadow-md block"
            >
              Ingresar a Sala
            </Link>
            <Link
              href="/sala-virtual?app=LAWENMOLL&tab=cita"
              className="flex-1 py-3 bg-[#E0F2F1] hover:bg-[#B2DFDB] text-[#004D40] font-bold text-xs rounded-xl transition text-center shadow-sm block border border-[#4DB6AC]/40"
            >
              Agendar Cita
            </Link>
          </div>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP (Espacio Visual & Salas Virtuales) */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#4DB6AC]/60 shadow-lg flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#00796B] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 03
              </span>
              <span className="text-xs text-[#004D40] font-bold">Movimiento & Gastronomía</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-wellness.jpg.jpg" alt="Logo Wellness Web App" className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-[#B2DFDB]" />
              <h3 className="text-xl font-extrabold text-[#004D40]">Wellness Web App</h3>
            </div>

            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              Wellness Web App es un espacio visual en el cual puedes ver distintos tipos de videos donde hay rutinas de ejercicios específicos para cardio, metabolismo, etc., guías de meditación para calmar la mente y el cuerpo con distintas disciplinas y tips gastronómicos para acompañar a nuestros usuarios, dando visibilidad a profesionales que dan clases en nuestras salas virtuales conectando a personas que les cueste asistir de forma presencial a ciertas actividades.
            </p>

            <div className="bg-[#F4FAF9] p-4 rounded-2xl border border-[#B2DFDB] text-xs space-y-2">
              <h4 className="font-bold text-[#00695C]">Misión & Visión:</h4>
              <p className="text-slate-700"><strong>Misión:</strong> Dar mayor visualización a profesionales que dan clases y acercar a personas que no puedan tomar rutinas en vivo y en directo, logrando que hay más de una forma de tener una mejor calidad de vida.</p>
              <p className="text-slate-700"><strong>Visión:</strong> Mejorar la calidad de vida, asistir a clases virtuales con una o más personas y poder interactuar si es que tiene problemas sensoriales o físicos.</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Link
              href="/sala-virtual?app=Wellness%20Web%20App"
              className="flex-1 py-3 bg-[#00796B] hover:bg-[#004D40] text-white font-bold text-xs rounded-xl transition text-center shadow-md block"
            >
              Ingresar a Sala
            </Link>
            <Link
              href="/sala-virtual?app=Wellness%20Web%20App&tab=cita"
              className="flex-1 py-3 bg-[#E0F2F1] hover:bg-[#B2DFDB] text-[#004D40] font-bold text-xs rounded-xl transition text-center shadow-sm block border border-[#4DB6AC]/40"
            >
              Agendar Cita
            </Link>
          </div>
        </div>

        {/* OFICINA 04: SABIDURÍA ANCESTRAL / BIENESTAR */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#4DB6AC]/60 shadow-lg flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#00796B] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 04
              </span>
              <span className="text-xs text-[#004D40] font-bold">Mensajería, Salud & PYME</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-bienestar.png.png" alt="Logo Bienestar" className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-[#B2DFDB]" />
              <h3 className="text-xl font-extrabold text-[#004D40]">Sabiduría Ancestral / Bienestar</h3>
            </div>

            <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
              Bienestar es un portal enfocado en la mensajería y en la rutina del día a día para anotar horas médicas, consultas, recordatorios de tomar agua, caminar, rutina de ejercicios; también tendrá la parte de conectarse con PYMEs y ofrecer sus productos, y por último, para personas que tengan problemas de insomnio, poder solucionar con música, relatos o tips para conciliar el sueño y alcanzar el sueño REM reparador.
            </p>

            <div className="bg-[#F4FAF9] p-4 rounded-2xl border border-[#B2DFDB] text-xs space-y-2">
              <h4 className="font-bold text-[#00695C]">Misión & Visión:</h4>
              <p className="text-slate-700"><strong>Misión:</strong> Que haya comunicación, retroalimentación y conexión de forma fluida y amena.</p>
              <p className="text-slate-700"><strong>Visión:</strong> Que nuestro usuario recuerde que también se puede cuidar con la agenda de bienestar con su hora médica, recordar tomar agua, cuántos pasos debe caminar, poder tener un ingreso extra y una mejor calidad del sueño.</p>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Link
              href="/sala-virtual?app=Bienestar"
              className="flex-1 py-3 bg-[#00796B] hover:bg-[#004D40] text-white font-bold text-xs rounded-xl transition text-center shadow-md block"
            >
              Ingresar a Sala
            </Link>
            <Link
              href="/sala-virtual?app=Bienestar&tab=cita"
              className="flex-1 py-3 bg-[#E0F2F1] hover:bg-[#B2DFDB] text-[#004D40] font-bold text-xs rounded-xl transition text-center shadow-sm block border border-[#4DB6AC]/40"
            >
              Agendar Cita
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}
