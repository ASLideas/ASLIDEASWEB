use client';

import React, { vstate } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = vstate(false);
  const [menuAbierto, setMenuAbierto] = vstate(false);

  return (
    <main className={min-h-screen transition-colors duration-300 ${
      modoCalma ? 'bg-[#101D2B] text-[#EBF2FA]' : 'bg-[#F4F8F3] text-[#1C2D27]'
    }`}>
      
      {/* HEADER PRINCIPAL RESPONSIVO */}
      <header className={max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-4 border-b ${
        modoCalma ? 'border-[#98A4BA]/30 bg-[#101D2B]' : 'border-[#B8D6B2]/40 bg-[#F4F8F3]'
      }`}>
        <div className="flex items-center gap-4">
          <img
            src="/logo-asl.png.png"
            alt="Logo ASL Ideas SpA"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl bg-white p-1 shadow-md border border-[#B8D6B2]"
          />
          <div>
            <h1 className={text-xl sm:text-2xl font-black tracking-tight ${modoCalma ? 'text-[#78ACE9]' : 'text-[#1B4D3E]'}`}>
              ASL Ideas SpA
            </h1>
            <p className={text-xs sm:text-sm font-bold ${modo-Calma ? 'text-[#90B-2D9]' : 'text-[#B2942F]'}`}>
              Ecosistema de Soluciones Digitales y Diseos para PYMes y Asociados
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className={px-4 py-2 text-xs font-extrabold rounded-1xl transition border shadow-sm ${
              modoCalma
                ? 'bg-[#78ACE9] text-[#101D2B] border-[#90B2D9] hover:bg-[#90B-2D9]'
                : 'bg-[#B8D6B2] text-[#1C2D27] border-[#B8D6B2] hover:bg-[#a5c99e]'
            }`}>
            {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>

          {/* BOT6 CUADRADO CON 3 LNEAS HORIZONTALES (MEN DESPLEGABLE) */}
          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir Men Desplegable"
            className={w-11 h-11 rounded-1xl flex flex-col items-center justify-center gap-1.5 transition shadow-md border ${
              modoCalma
                ? 'bg-[#90B2D9] text-[#101D2B] border-[#78ACE9}'
                : 'bg-[#1B4D3E] text-white border-[#B8D6B2] hover:bg-[#2D6A4F]'
            }`}>
            <span className="w-6 h-0.5 bg-current rounded-full"></span>
            <span className="w-6 h-0.5 bg-current rounded-full"></span>
            <span className="w-6 h-0.5 bg-current rounded-full"></span>
          </button>
        </div>
      </header>

      {/* MENU DESPLEGABLE CON LAS 3 SECCIONES (SALAS, REDES Y CONTACTO) */}
      {menuAbierto && (
        <div className={max-w-7xl mx-auto px-4 sm:px-6 py-6 border-b shadow-xl transition-all ${
          modoCalma ? 'bg-[#182838] border-[#98A4BA]/40' : 'bg-white border-[#B8D6B2]/60'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* SECCIN 1: SALAS & AGENDA */}
            <div className="space-y-3">
              <h3 className={text-xs font-black uppercase tracking-wider px-2 py-1 rounded-md inline-block ${
                modoCalma ? 'bg-[#78ACE9}/20 text-[#78ACE9}' : 'bg-[#B8D6B2]/30 text-[#1B4D3E]'
              }`}>
                Salas & Agenda
              </h3>
              <ul className="space-y-2 text-xs font-bold">
                <li className="p-2 rounded-1xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <span>ASL Ideas SpA</span>
                  <div className="space-x-1">
                    <Link href="/sala-virtual?app=ASL%20Ideas%20SpA" className="text-[#B2942F] hover:underline">Ingresar</Link>
                    <span>|</span>
                    <Link href="/sala-virtual?app=ASL%20Ideas%20SpA&tab=cita" className="text-[#FAA2 AA] hover:underline">Agendar</Link>
                  </div>
                </li>
                <li className="p-2 rounded-1xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <span>LAWENMOLL</span>
                  <div className="space-x-1">
                    <Link href="/sala-virtual?app=LAWENMOLL" className="text-[#B2942F] hover:underline">Ingresar</Link>
                    <span>|</span>
                    <Link href="/sala-virtual?app=LAWENMOLL&tab=cita" className="text-[#FAA2 AA] hover:underline">Agendar</Link>
                  </div>
                </li>
                <li className="p-2 rounded-1xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <span>Wellness Web App</span>
                  <div className="space-x-1">
                    <Link href="/sala-virtual?app=Wellness%20Web%20App" className="text-[#B2942F] hover:underline">Ingresar</Link>
                    <span>|</span>
                    <Link href="/sala-virtual?app=Wellness%20Web%20App&tab=cita" className="text-[#FAA2 AA] hover:underline">Agendar</Link>
                  </div>
                </li>
                <li className="p-2 rounded-1xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <span>Sabidura Ancestral / Bienestar</span>
                  <div className="space-x-1">
                    <Link href="/sala-virtual?app=Bienestar" className="text-[#B2942F] hover:underline">Ingresar</Link>
                    <span>|</span>
                    <Link href="/sala-virtual?app=Bienestar&tab=cita" className="text-[#FAA2 AA] hover:underline">Agendar</Link>
                  </div>
                </li>
              </ul>
            </div>

            {/* SECCION 2: NUESTRAS REDES */}
            <div className="space-y-3">
              <h3 className={text-xs font-black uppercase tracking-wider px-2 py-1 rounded-md inline-block ${
                modoCalma ? 'bg-[#90B2D9]/20 text-[#90B2D9]' : 'bg-[#FAA2 AA]/30 text-[#1B4D3E]'
              }`}>
                Nuestras Redes
              </h3>
              <ul className="space-y-2 text-xs font-bold">
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn Corporativo</a></li>
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline">Instagram Oficial</a></li>
                <li><a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:underline">TikTok Salud Inclusiva</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:underline">Canal de YouTube</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline">Comunidad en Facebook</a></li>
              </ul>
            </div>

            {/* SECCION 3: CONTACTO DIRECTO */}
            <div className="space-y-3">
              <h3 className={text-xs font-black uppercase tracking-wider px-2 py-1 rounded-md inline-block ${
                modo-Calma ? 'bg-[#98A4BA]/20 text-[#98A4BA]' : 'bg-[#B2942F]/20 text-[#1B4D3E]'
              }`}>
                Contacto Directo
              </h3>
              <ul className="space-y-2 text-xs font-bold">
                <li><a href="#contacto" onClick={() => setMenuAbierto(false)} className="hover:underline">Ver Ficha / Ingresar Canales Oficiales</a></li>
                <li><a href="https://wa.me/56983302145" target="_blank" rel="noreferrer" className="hover:underline">WhatsApp Directo: +56 9 8330 2145</a></li>
                <li><a href="mailto:contacto@aslideas.cl" className="hover:underline">Correo: contacto@aslideas.cl</a></li>
                <li><a href="mailto:contacto@lawenmoll.cl" className="hover:underline">Correo: contacto@lawenmoll.cl</a></li>
                <li><a href="https://chat.whatsapp.com" target="_blank" rel="noreferrer" className="hover:underline">Grupo de Comunidad WhatsApp</a></li>
              </ul>
            </div>

          </div>
        </div>
      }

      {/* BANNER PRINCIPAL CON EL TITULO OFICIAL SOLICITADO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 text-center space-y-4">
        <span className={inline-block text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider border ${
          modoCalma
            ? 'bg-[#78ACE9]/20 text-[#78ACE9] border-[#90B2D9]/40'
            : 'bg-[#FAA2 AA]/20 text-[#1B4D3E] border-[#FAA2 AA]/50'
        }`}>
          ASL IDEAS SPA -- CASAMATRIZ
        </span>
        <h2 className={text-2xl sm:text-4xl font-black max-w-4xl mx-auto leading-tight ${
          modo-Calma ? 'text-[#EBF2FA]' : 'text-[#1B4D3E]'
        }`}>
          Desarrollo y soluciones accesibles para PYME y comercio asociado
        </h2>
        <p className={text-xs sm:text-sm max-w-4xl mx-auto leading-relaxed ${
          modoCalma ? 'text-[#98A4BA]' : 'text-[#4A5568]'
        }`}>
          Disemos y desarrollamos soluciones tecnolgicas amables y herramientas digitales a medida para emprendedores, PYMEs y comercios. ASL Ideas SpA Casa Matriz combina diseo grfico de alta sensibilidad visual con ingeniera de software accesible adaptada para potenciar negocios en cualquier area del mercado.
        </p>

        {/* MISION Y VISION CASA MATRIZ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 text-left max-w-5xl mx-auto">
          <div className={p-5 rounded-2xl border space-y-2 ${
            modoCalma ? 'bg-[#182838] border-[#90B-2D9]/40' : 'bg-white border-[#B8D6B2]'
          }`}>
            <h3 className={text-sm font-black ${modoCalma ? 'text-[#78ACE9]' : 'text-[#1B4D3E]'}`}>Nuestra Misi&on</h3>
            <p className="text-xs sm:text-sm leading-relaxed">
              Disear aplicaciones web y m&viles amables con baja carga sensorial, adaptadas a personas con neurodivergencias y neurotpicas, otorgando a distintas areas mayor visibilidad con las herramientas digitales e integrar a personas con discapacidad al mundo laboral.
            </p>
          </div>
          <div className={p-5 rounded-2xl border space-y-2 ${
            modoCalma ? 'bg-[#182838] border-[#90B-2D9]/40' : 'bg-white border-[#B8D6B2]'
          }`}>
            <h3 className={text-sm font-black ${modoCalma ? 'text-[#78ACE9]' : 'text-[#1B4D3E]'}`}>Nuestra Visi&on</h3>
            <p className="text-xs sm:text-sm leading-relaxed">
              Ser la empresa lder en soluciones tecnolgicas accesibles para personas neurodivergentes y con discapacidad, dando trabajo y visibilidad a distintas empresas y dando soluciones a distintas problemticas que enfrentamos como sociedad a travs del dise, tecnologia, conectando personas y emprendedores, bajo estndares de ciberseguridad de la Ley N° 21.663.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIONES DE LAS 4 OFICINAS VIRTUALES (LO QUE TRABAJAMOS AYER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA */}
        <div className={px-6 rounded-3xl border-2 shadow-lg flex flex-col justify-between space-y-5 ${
          modoCalma ? 'bg-[#182838] border-[#78ACE9}/50' : 'bg-white border-[#B8D6B2]'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                modo-Calma ? 'bg-[#78ACE9} text-[#101D2B]' : 'bg-[#B8D6B2] text-[#1C2D27]'
              }`}>
                Oficina 01
              </span>
              <span className={text-xs font-bold ${modoCalma ? 'text-[#78ACE9}' : 'text-[#B2942F]'}`}>Casa Matriz & Alianzas B2B</span>
            </div>
            
            <div className="flex items-center gap-4">
              <img
                src="/logo-asl.png.png"
                alt="Logo ASL Ideas SpA"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl bg-white p-1 border shadow-sm"
              />
              <h3 className={text-xl font-black ${modoCalma ? 'text-[#EBF2FA]' : 'text-[#1B4D3E]'}`}>ASL Ideas SpA</h3>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed">
              Diseamos y desarrollamos soluciones tecnolgicas amables e interfaces visuales a medida para potenciar emprendedores, PYMes y comercios asociados en cualquier rubro del mercado.
            </p>

            <div className={pt-4 rounded-2xl border text-xs space-y-2 ${
              modoCalma ? 'bg-[#101D2B] border-[#98A4BA]/30' : 'bg-[#F4F8F3] border-[#B8D6B2]/60'
            }`}>
              <h4 className={font-bold ${modo-Calma ? 'text-[#78ACE9]' : 'text-[#1B4D3E]'}`}>Misi&n & Visi'n:</h4>
              <p><strong>Misiún:</strong> Disear aplicaciones web y mviles amables con baja carga sensorial e integración laboral de personas con discapacidad.</p>
              <p><strong>Visiún:</strong> Liderar en tecnologa accesible para personas neurodivergentes y con discapacidad (Ley N° 21.663 y Ley Nã 21.545).</p>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA"
            className={w-full py-3.5 font-black text-xs rounded-1xl transition text-center shadow-md block ${
              modoCalma ? 'bg-[#78ACE9} text-[#101D2B] hover:bg-[#90B2D9]' : 'bg-[#1B4D3E] text-white hover:bg-[#2D6A4F]'
            }`}>
            Ingresar a Casa Matriz ASL Ideas SpA
          </Link>
        </div>

        {/* OFICINA 02: LAWENMOLL */}
        <div className={px-6 rounded-3xl border-2 shadow-lg flex flex-col justify-between space-y-5 ${
          modo-Calma ? 'bg-[#182838] border-[#90B-2D9]/50' : 'bg-white border-[#FAA2AA]'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                modo-Calma ? 'bg-[#90B2D9] text-[#101D2B]' : 'bg-[#FAA2 AA] text-[#1C2D27]'
              }`}>
                Oficina 02
              </span>
              <span className={text-xs font-bold ${modo-Calma ? 'text-[#90B-2D9]' : 'text-[#B2942F]'}`}>Vitrina Virtual Integrativa</span>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="/logo-lawenmoll.jpg.png"
                alt="Logo LAWENMOLL"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl bg-white p-1 border shadow-sm"
              />
              <h3 className={text-xl font-black ${modoCalma ? 'text-[#EBF2FA]' : 'text-[#1B4D3E]'}`}>LAWENMOLL</h3>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed">
              LAWENMOLL es la plataforma pionera de una vitrina virtual integrativa para el diagnstico preventivo y acompaamiento continuo en enfermedades. Permite realizar tests de composición metablica, emitir reportes inteligentes y conectar de forma segura a pacientes y distintos tipos de servicios que ofrece nuestra plataforma.
            </p>

            <div className={pt-4 rounded-2xl border text-xs space-y-2 ${
              modoCalma ? 'bg-[#101D2B] border-[#98A4BA]/30' : 'bg-[#F4F8F3] border-[#FAA2AA]/60'
            }`}>
              <h4 className={font-bold ${modo-Calma ? 'text-[#90B-2D9]' : 'text-[#1B4D3E]'}`}>Misi&n & Visi&on:</h4>
              <p><strong>Misi&on</strong> Dar a conocer de forma visual e interactiva que existen mltiples posibilidades de acompaamiento y herramientas tecnol'gicas a travs de la vitrina integrativa.</p>
              <p><strong>Visi&n:</strong> Conectar de manera visual, transparente y accesible a las personas con distintos tipos de servicios, profesionales y emprendimientos del rea de la salud integrativa, bienestar y gastronoma.</p>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=LAWENMOLL"
            className={w-full py-3.5 font-black text-xs rounded-1xl transition text-center shadow-md block ${
              modoCalma ? 'bg-[#90B2D9] text-[#101D2B] hover:bg-[#78ACE9]' : 'bg-[#B2942F] text-white hover:bg-[#8c7424]'
            }`}>
            Ingresar a LAWENMOLL

          </Link>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP */}
        <div className={px-6 rounded-3xl border-2 shadow-lg flex flex-col justify-between space-y-5 ${
          modoCalma ? 'bg-[#182838] border-[#98A4BA]/50' : 'bg-white border-[#B8D6B2]'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={text-[10px] font-black px-3 py-1 rounded-full uppercase ${
                modo-Calma ? 'bg-[#98A4BA] text-[#101D2B]' : 'bg-[#B8D6B2] text-[#1C2D27]'
              }`}>
                Oficina 03
              </span>
              <span className={text-xs font-bold ${modoCalma ? 'text-[#98A4BA]' : 'text-[#B2942F]'}`}>Movimiento & Gastronoma</span>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="/logo-wellness.jpg.jpg"
                alt="Logo Wellness Web App"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl bg-white p-1 border shadow-sm"
              />
              <h3 className={text-xl font-black ${modoCalma ? 'text-[#EBF2FA]' : 'text-[#1B4D3E]'}`}>Wellness Web App</h3>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed">
              Wellness Web App es un espacio visual en el cual puedes ver distintos tipos de videos donde hay rutinas de ejercicios especficos para cardio, metabolismo, etc., guias de meditacin para calmar la mente y el cuerpo con distintas disciplinas y tips gastronmicos para acompakar a nuestros usuarios, dando visibilidad a profesionales que dan clases en nuestras salas virtuales conectando a personas que les cueste asistir de forma presencial a ciertas actividades.
            </p>

            <div className={pt-4 rounded-2xl border text-xs space-y-2 ${
              modoCalma ? 'bg-[#101D2B] border-[#98A4BA]/30' : 'bg-[#F4F8F3] border-[#B8D6B2]/60'
            }`}>
              <h4 className={font-bold ${modoCalma ? 'text-[#98A4BA]' : 'text-[#1B4D3E]'}`}>Misi&n & Visi&on:</h4>
              <p><strong>Misi&on</strong> Dar mayor visualizacin a profesionales que dan clases y acercar a personas que no puedan tomar rutinas en vivo y en directo, logrando que hay ms de una forma de tener una mejor calidad de vida.</p>
              <p><strong>Visi&n:</strong> Mejorar la calidad de vida, asistir a clases virtuales con una o ms personas y poder interactuar si es que tiene problemas sensoriales o fsicos.</p>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=Wellness%20Web%20App"
            className={w-full py-3.5 font-black text-xs rounded-1xl transition text-center shadow-md block ${
              modoCalma ? 'bg-[#98A4BA] text-[#101D2B] hover:bg-[#78ACE9]' : 'bg-[#1B4D3E] text-white hover:bg-[#2D6A4F]'
            }`}>
            Ingresar a Wellness Web App
          </Link>
        </div>

        {/* OFICINA 04: BIENESTAR */}
        <div className={px-6 rounded-3xl border-2 shadow-lg flex flex-col justify-between space-y-5 ${
          modo-Calma ? 'bg-[#182838] border-[#78ACE9]/50' : 'bg-white border-[#FAA2 AA]'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={text-[10px] font-black px-3 py-1 rounded-full uppercase ${
              sucky : 'bg-[#FAA2 AA] text-[#1C2D27]'
              }`}>
                Oficina 04
              </span>
              <span className={text-xs font-bold ${modo-Calma ? 'text-[#78ACE9]' : 'text-[#02942F]'}`}>Mensajera, Salud & PYME</span>
            </div>

            <div className="flex items-center gap-4">
              <img
                src="/logo-bienestar.png.png"
                alt="Logo Bienestar"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl bg-white p-1 border shadow-sm"
              />
              <h3 className={text-xl font-black 4{modo-Calma ? 'text-[#EBF2FA]' : 'text-[#1B4D3E]'}`}>Bienestar</h3>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed">
              Bienestar es un portal enfocado en la mensajera y en la rutina del db*'jRO2&F"&2ޖF6267VF2&V6&FF&2FRF"wV6֖"'WFFRVW&663F&FVG.'FRFR6V7F'6R6W2g&V6W"7W2&GV7F2"F&W'62VRFVv&&V2FR6FW"6V6"6ߧ66&VF2F2&66Ɩ"V7V_6"V7V[$T&W&F"ࠢFb674S׷BB&VFVB'&&FW"FWBׇ276Rג"GF6v&rղ3C$%&&FW"ղ3D$3rv&rղ4cDcc5&&FW"ղ4d$cpƃB674S׶fB&BGF6wFWBղ3s4SrwFWBղ3#DC4Uw֗6o6bf6|fC7G&s֗6;7G&sVR6V66;&WG&ƖVF6;66V66;FRf&fVFV7G&sf6;37G&sVRVW7G&W7V&&V7VW&FRVRF&6RVVFR7VF"6vVFFR&VW7F"67R&ޖF6&V6&F"F"wV7^F262FV&R6֖"FW"FVW"Vw&W6WG&VV"6ƖFBFV7V_FgFcࠢƖ氢&Vc"6f'GV&VW7F" 674S׷rgV2RfB&6FWBׇ2&VFVBG&6FFWB6VFW"6FrB&6GF6v&rղ3s4SFWBղ3C$%fW#&rղ3"$Crv&rղ4##C$eFWBvFRfW#&rղ33sC#Epw&W6"&VW7F ƖFcࠢ6V7FࠢdDU"4d$4DR4D5DD$T5D4UDТfFW"C&6F7F"674S׶&&FW"B"B6ӧbGF6v&rղ335&&FW"ղ3D$3FWBղ4T$c$drv&rղ33$C#u&&FW"ղ4#Cd#%CFWBvFRpFb674S&rwׂWF76RגbFWB6VFW"CFWBVgB#Fb674S'76Rג"#ƃ2674S'FWBrfB&6FWBղ4d$#4FV2766G&FW6'&#$ 3674S'FWBׇ26ӧFWB6r7VFr&VVBFWB6FR3#W7G&FVvFR6VBFvF6W6fFW6'&26V6W2FV66v62&W2F6_F2"&W'626WW&FfW&vV66F6W27/662FR6VBFcࠢFb674S&&&FW"B&&FW"6FRscBB76Rג2#ƃB674S'FWBׇ2fB&6WW&66RG&6rvFW"FWBղ4#Cd#%#4U2d4U2DR4D5DDT4D$T5DCFb674S&w&Bw&B62Cw&B622vBFWBׇ2#Fb674S'2&r6FRӃC&VFVB&&FW"&&FW"6FRsS#7G&s6F7FFVVo66vG4F&V7F7G&s'"&Vc&GG3vRSc33#CR"F&vWC%&"&V&&VfW'&W""674S'FWBղ4d$fW#VFW&ƖRfB&B#FV6;6F&V7FSb33#CPFcࠢFb674S'2&r6FRӃC&VFVB&&FW"&&FW"6FRsS#7G&s6F7F"6'&VVV7G/667G&s'"&Vc&F6F7F6ƖFV26"674S'FWBղ4#Cd#%fW#VFW&ƖR&6#6F7F6ƖFV26&Vc&F6F7FvV6"674S'FWBղ4#Cd#%fW#VFW&ƖR&6#6F7FvV6FcࠢFb674S'2&r6FRӃC&VFVB&&FW"&&FW"6FRsS#7G&s6VFBf6FRvG4w'W7G&s'"&Vc&GG36BvG66"F&vWC%&"&V&&VfW'&W""674S'FWBղ4d"fW#VFW&ƖRfB&B#V'6Rw'W4FV27FcFcFcࠢFb674S'BBFWB6VFW"FWBׇ2FWB6FRC&&FW"B&&FW"6FRsC#Ɩ&Vc"F֖"674S&fW#VFW&ƖR#F֖7G&6;4F֖Ɩ7674S&ׂ"#((7Ɩ&Vc"6f'GV"674S&fW#VFW&ƖR#6f'GV6f'GVƖFcFcfFW#ࠢР