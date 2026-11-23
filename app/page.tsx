'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#FAF8F5] text-[#2C3E35]' : 'bg-[#121E19] text-white'}`}>
      {/* Header Principal */}
      <header className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <img src="/logo-asl.png.png" alt="Logo ASL Ideas SpA" className="w-12 h-12 object-contain rounded-2xl bg-white p-1 shadow-lg border border-[#E8829C]/40" />
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
              ASL Ideas SpA
            </h1>
            <p className="text-xs text-[#E8829C] font-semibold">
              TECNOLOGÍA CON ALMA & EMPATÍA | BAJA CARGA SENSORIAL (LEY TEA N° 21.545)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#1A2822] text-slate-200 border border-slate-700 hover:bg-slate-800 transition"
          >
            {modoCalma ? '🌿 Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>
          <Link
            href="/sala-virtual"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-[#E8829C] text-white hover:bg-[#D8708C] transition shadow-md flex items-center gap-2"
          >
            📹 Sala Virtual B2B
          </Link>
        </div>
      </header>

      {/* Banner Propuesta de Valor Oficial */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-center space-y-4">
        <span className="bg-[#E8829C]/20 text-[#E8829C] border border-[#E8829C]/40 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider">
          ASL IDEAS SPA — CASA MATRIZ
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white max-w-4xl mx-auto leading-tight">
          Visualización, Diseño y Desarrollo de Apps para PYMEs y Comercio Asociado
        </h2>
        <p className="text-xs md:text-sm text-slate-300 max-w-4xl mx-auto leading-relaxed">
          Diseñamos y desarrollamos soluciones tecnológicas amables y herramientas digitales a medida para emprendedores, PYMEs y comercios. ASL Ideas SpA Casa Matriz combina diseño gráfico de alta sensibilidad visual con ingeniería de software accesible. Aunque nacimos impulsando el ecosistema de la salud y el bienestar integrativo, creamos plataformas e interfaces visuales adaptadas para potenciar negocios en cualquier área del mercado.
        </p>

        {/* Misión y Visión Casa Matriz */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-left max-w-5xl mx-auto">
          <div className="bg-[#1A2822] p-5 rounded-2xl border border-[#2D6A4F]/60 space-y-2">
            <h3 className="text-base font-bold text-[#E8829C]">Nuestra Misión</h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Diseñar aplicaciones web y móviles amables con baja carga sensorial, adaptadas a personas con neurodivergencias y neurotípicas, otorgando a distintas áreas mayor visibilidad con las herramientas digitales e integrar a personas con discapacidad al mundo laboral.
            </p>
          </div>
          <div className="bg-[#1A2822] p-5 rounded-2xl border border-[#2D6A4F]/60 space-y-2">
            <h3 className="text-base font-bold text-[#E8829C]">Nuestra Visión</h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Ser la empresa líder en soluciones tecnológicas accesibles para personas neurodivergentes y con discapacidad, dando trabajo y visibilidad a distintas empresas y dando soluciones a distintas problemáticas que enfrentamos como sociedad a través del diseño, tecnología, conectando personas y emprendedores, bajo estándares de ciberseguridad de la Ley N° 21.663.
            </p>
          </div>
        </div>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA (Casa Matriz & Alianzas B2B) */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-[#E8829C]/50 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#E8829C] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 01
              </span>
              <span className="text-xs text-[#E8829C] font-bold">Casa Matriz & Alianzas B2B</span>
            </div>
            
            <div className="flex items-center gap-3">
              <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-10 h-10 object-contain rounded-xl bg-white p-1" />
              <h3 className="text-xl font-extrabold text-white">ASL Ideas SpA</h3>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Diseñamos y desarrollamos soluciones tecnológicas amables e interfaces visuales a medida para potenciar emprendedores, PYMEs y comercios asociados en cualquier rubro del mercado.
            </p>

            <div className="bg-[#121E19] p-4 rounded-2xl border border-slate-700/80 text-xs space-y-2">
              <h4 className="font-bold text-[#E8829C]">🌱 Misión & Visión:</h4>
              <p className="text-slate-300"><strong>Misión:</strong> Apps amables con baja carga sensorial e integración laboral de personas con discapacidad.</p>
              <p className="text-slate-300"><strong>Visión:</strong> Liderar en accesibilidad tecnológica (Ley N° 21.663 y Ley TEA N° 21.545).</p>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA"
            className="w-full py-3 bg-[#E8829C] hover:bg-[#D8708C] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Casa Matriz ASL Ideas SpA
          </Link>
        </div>

        {/* OFICINA 02: LAWENMOLL (Vitrina Virtual Integrativa) */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-[#2D6A4F]/60 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#2D6A4F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 02
              </span>
              <span className="text-xs text-emerald-400 font-bold">Vitrina Virtual Integrativa</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-lawenmoll.jpg.png" alt="Logo LAWENMOLL" className="w-10 h-10 object-contain rounded-xl bg-white p-1" />
              <h3 className="text-xl font-extrabold text-white">LAWENMOLL</h3>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              LAWENMOLL es la plataforma pionera de una vitrina virtual integrativa para el diagnóstico preventivo y acompañamiento continuo en enfermedades. Permite realizar tests de composición metabólica, emitir reportes inteligentes y conectar de forma segura a pacientes y distintos tipos de servicios que ofrece nuestra plataforma.
            </p>

            <div className="bg-[#121E19] p-4 rounded-2xl border border-slate-700/80 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400">🧪 Misión & Visión:</h4>
              <p className="text-slate-300"><strong>Misión:</strong> Dar a conocer de forma visual e interactiva que existen múltiples posibilidades de acompañamiento y herramientas tecnológicas a través de la vitrina integrativa.</p>
              <p className="text-slate-300"><strong>Visión:</strong> Conectar de manera visual, transparente y accesible a las personas con distintos tipos de servicios, profesionales y emprendimientos del área de la salud integrativa, bienestar y gastronomía.</p>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=LAWENMOLL"
            className="w-full py-3 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a LAWENMOLL
          </Link>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP (Espacio Visual & Salas Virtuales) */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-[#E8829C]/50 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#E8829C] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 03
              </span>
              <span className="text-xs text-[#E8829C] font-bold">Movimiento & Gastronomía</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-wellness.jpg.jpg" alt="Logo Wellness Web App" className="w-10 h-10 object-contain rounded-xl bg-white p-1" />
              <h3 className="text-xl font-extrabold text-white">Wellness Web App</h3>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Wellness Web App es un espacio visual en el cual puedes ver distintos tipos de videos donde hay rutinas de ejercicios específicos para cardio, metabolismo, etc., guías de meditación para calmar la mente y el cuerpo con distintas disciplinas y tips gastronómicos para acompañar a nuestros usuarios, dando visibilidad a profesionales que dan clases en nuestras salas virtuales conectando a personas que les cueste asistir de forma presencial a ciertas actividades.
            </p>

            <div className="bg-[#121E19] p-4 rounded-2xl border border-slate-700/80 text-xs space-y-2">
              <h4 className="font-bold text-[#E8829C]">🧘‍♀️ Misión & Visión:</h4>
              <p className="text-slate-300"><strong>Misión:</strong> Dar mayor visualización a profesionales que dan clases y acercar a personas que no puedan tomar rutinas en vivo y en directo, logrando que hay más de una forma de tener una mejor calidad de vida.</p>
              <p className="text-slate-300"><strong>Visión:</strong> Mejorar la calidad de vida, asistir a clases virtuales con una o más personas y poder interactuar si es que tiene problemas sensoriales o físicos.</p>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=Wellness%20Web%20App"
            className="w-full py-3 bg-[#E8829C] hover:bg-[#D8708C] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Wellness Web App
          </Link>
        </div>

        {/* OFICINA 04: BIENESTAR (Mensajería, Hábitos & Shopping PYME) */}
        <div className="bg-[#1A2822] p-6 rounded-3xl border-2 border-[#2D6A4F]/60 shadow-xl flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#2D6A4F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 04
              </span>
              <span className="text-xs text-emerald-400 font-bold">Mensajería, Salud & PYME</span>
            </div>

            <div className="flex items-center gap-3">
              <img src="/logo-bienestar.png.png" alt="Logo Bienestar" className="w-10 h-10 object-contain rounded-xl bg-white p-1" />
              <h3 className="text-xl font-extrabold text-white">Bienestar</h3>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Bienestar es un portal enfocado en la mensajería y en la rutina del día a día para anotar horas médicas, consultas, recordatorios de tomar agua, caminar, rutina de ejercicios; también tendrá la parte de conectarse con PYMEs y ofrecer sus productos, y por último, para personas que tengan problemas de insomnio, poder solucionar con música, relatos o tips para conciliar el sueño y alcanzar el sueño REM reparador.
            </p>

            <div className="bg-[#121E19] p-4 rounded-2xl border border-slate-700/80 text-xs space-y-2">
              <h4 className="font-bold text-emerald-400">📱 Misión & Visión:</h4>
              <p className="text-slate-300"><strong>Misión:</strong> Que haya comunicación, retroalimentación y conexión de forma fluida y amena.</p>
              <p className="text-slate-300"><strong>Visión:</strong> Que nuestro usuario recuerde que también se puede cuidar con la agenda de bienestar con su hora médica, recordar tomar agua, cuántos pasos debe caminar, poder tener un ingreso extra y una mejor calidad del sueño.</p>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=Bienestar"
            className="w-full py-3 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-lg block"
          >
            Ingresar a Bienestar
          </Link>
        </div>

      </section>
    </main>
  );
}
