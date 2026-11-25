'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [modoCalma, setModoCalma] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <main className={`min-h-screen transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-[#E2E8F0]' : 'bg-[#FAF8F5] text-[#1B4D3E]'}`}>
      {/* Header Principal de Alto Contraste */}
      <header className={`max-w-7xl mx-auto px-4 py-5 shadow-md ${modoCalma ? 'bg-[#1E293B] border-b border-slate-700' : 'bg-[#1B4D3E] text-white rounded-b-2xl'}`}>
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo Marca & Subtitulo */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo-asl.png.png" 
              alt="Logo ASL Ideas SpA" 
              className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-[#A8B58A]/50 shadow-sm"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">
                ASL Ideas SpA
              </h1>
              <p className="text-xs text-[#E8A5A5] font-semibold">
                Ecosistema de Soluciones Digitales y Diseños para PYMEs y Asociados
              </p>
            </div>
          </div>

          {/* Botones de Control & Menù Desplegable */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setModoCalma(!modoCalma)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition border shadow-sm ${
                modoCalma 
                  ? 'bg-[#78ACE9] text-[#101D2B] border-[#90B2D9] hover:bg-[#90B2D9]' 
                  : 'bg-[#A8B58A] text-[#1B4D3E] border-[#52796F] hover:bg-[#52796F] hover:text-white'
              }`}
            >
              {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
            </button>

            {/* Cuadrado de 3 lineas (Menu Desplegable) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuAbierto(!menuAbierto)}
                aria-label="Abrir Menú Principal"
                className="w-10 h-10 rounded-xl bg-[#52796F] text-white flex flex-col items-center justify-center gap-1 hover:bg-[#1B4D3E] transition border border-[#A8B58A]/50 shadow-md"
              >
                <span className="w-5 h-0.5 bg-white rounded-full"></span>
                <span className="w-5 h-0.5 bg-white rounded-full"></span>
                <span className="w-5 h-0.5 bg-white rounded-full"></span>
              </button>

              {/* Menu Desplegable Vertical */}
              {menuAbierto && (
                <div className="absolute right-0 mt-3 w-72 bg-white text-[#1B4D3E] rounded-2xl shadow-2xl border-2 border-[#52796F]/30 p-4 z-50 space-y-4">
                  <div>
                    <h4 className="text-xs font-black uppercase text-[#52796F] tracking-wider mb-2 border-b border-slate-200 pb-1">
                      Salas Virtuales & Agenda
                    </h4>
                    <div className="space-y-1.5 text-xs font-bold">
                      <Link 
                        href="/sala-virtual?app=ASL%20Ideas%20SpA"
                        className="block px-3 py-1.5 rounded-lg hover:bg-[#FAF8F5] text-[#1B4D3E] transition"
                        onClick={() => setMenuAbierto(false)}
                      >
                        Oficina 01: Casa Matriz ASL Ideas SpA
                      </Link>
                      <Link 
                        href="/sala-virtual?app=LAWENMOLL"
                        className="block px-3 py-1.5 rounded-lg hover:bg-[#FAF8F5] text-[#1B4D3E] transition"
                        onClick={() => setMenuAbierto(false)}
                      >
                        Oficina 02: LAWENMOLL Salud Integrativa
                      </Link>
                      <Link 
                        href="/sala-virtual?app=Wellness%20Web%20App"
                        className="block px-3 py-1.5 rounded-lg hover:bg-[#FAF8F5] text-[#1B4D3E] transition"
                        onClick={() => setMenuAbierto(false)}
                      >
                        Oficina 03: Wellness Web App
                      </Link>
                      <Link 
                        href="/sala-virtual?app=Bienestar"
                        className="block px-3 py-1.5 rounded-lg hover:bg-[#FAF8F5] text-[#1B4D3E] transition"
                        onClick={() => setMenuAbierto(false)}
                      >
                        Oficina 04: Bienestar & Shopping PYME
                      </Link>
                      <Link 
                        href="/sala-virtual?tab=cita"
                        className="block px-3 py-2 rounded-xl bg-[#52796F] text-white text-center font-bold hover:bg-[#1B4D3E] transition mt-2 shadow-sm"
                        onClick={() => setMenuAbierto(false)}
                      >
                        Agendar Cita B2B
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase text-[#52796F] tracking-wider mb-2 border-b border-slate-200 pb-1">
                      Nuestras Redes Sociales
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold text-[#52796F]">
                      <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
                      <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
                      <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:underline">TikTok</a>
                      <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:underline">YouTube</a>
                      <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase text-[#52796F] tracking-wider mb-2 border-b border-slate-200 pb-1">
                      Contacto Directo
                    </h4>
                    <div className="text-xs space-y-1 text-slate-700">
                      <p><strong>Fono:</strong> +56 9 8330 2145</p>
                      <p><strong>Email:</strong> contacto@aslideas.cl</p>
                      <a href="#contacto" className="text-[#52796F] font-bold underline block pt-1" onClick={() => setMenuAbierto(false)}>
                        Ir a Formulario de Contacto
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Banner Principal de Propuesta de Valor */}
      <section className="max-w-7xl mx-auto px-4 py-10 text-center space-y-4">
        <span className={`inline-block border text-xs font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider ${
          modoCalma ? 'bg-[#78ACE9]/20 text-[#78ACE9] border-[#90B2D9]/40' : 'bg-[#E8A5A5]/30 text-[#1B4D3E] border-[#E8A5A5]'
        }`}>
          Red Cuerpo y Alma B2B — Alianzas e Inclusión
        </span>
        <h2 className={`text-2xl md:text-4xl font-black max-w-4xl mx-auto leading-tight ${modoCalma ? 'text-[#90B2D9]' : 'text-[#1B4D3E]'}`}>
          Desarrollo y soluciones accesibles para PYME y comercio asociado
        </h2>
        <p className={`text-sm md:text-base max-w-3xl mx-auto leading-relaxed ${modoCalma ? 'text-slate-300' : 'text-[#52796F]'}`}>
          Diseñado por y para neurodivergencias (TEA/TDAH) y condiciones crónicas. Al sumarte a nuestra red como empresa, profesional o colaborador B2B, te favoreces al multiplicar tu alcance y cambiar la calidad de vida de miles de personas.
        </p>
      </section>

      {/* Secciones de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* OFICINA 01: ASL IDEAS SPA (Quienes Somos & Red B2B) */}
        <div className={`p-6 rounded-3xl border-2 shadow-xl flex flex-col justify-between space-y-5 ${
          modoCalma ? 'bg-[#1E293B] border-[#78ACE9]/30 text-white' : 'bg-white border-[#52796F]/30 text-[#1B4D3E]'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#1B4D3E] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 01
              </span>
              <span className="text-xs text-[#52796F] font-extrabold">Casa Matriz & Alianzas B2B</span>
            </div>

            <div className="flex items-center gap-3">
              <img 
                src="/logo-asl.png.png" 
                alt="Logo ASL Ideas SpA" 
                className="w-12 h-12 object-contain rounded-xl border border-slate-200 p-1" 
              />
              <h3 className="text-xl font-extrabold">
                ASL Ideas SpA — Quienes Somos & Red Cuerpo y Alma
              </h3>
            </div>

            <p className="text-xs md:text-sm leading-relaxed text-slate-700">
              <strong>Quienes Somos:</strong> Fundados por una Diseñadora Gráfica con neurodivergencia (TEA 1 / TDAH) y condiciones crónicas, transformamos la vivencia del autocuidado eliminando la sobrecarga sensorial y la culpa.
            </p>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#A8B58A]/50 text-xs space-y-2">
              <h4 className="font-bold text-[#1B4D3E]">Beneficios de Suscribirse y Ser Colaborador B2B:</h4>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li><strong>Beneficio de Red:</strong> Formarás parte de la red Cuerpo y Alma, siendo favorecido para llegar a muchas más personas y potenciar tu impacto.</li>
                <li><strong>Cumplimiento Normativo:</strong> Consultoría en Ley TEA N° 21.545 y Ley de Ciberseguridad N° 21.663.</li>
                <li><strong>Vitrinas Accesibles:</strong> Software e infraestructura amable adaptada para PYMEs.</li>
              </ul>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=ASL%20Ideas%20SpA"
            className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-md block"
          >
            Ingresar a Casa Matriz & Red B2B
          </Link>
        </div>

        {/* OFICINA 02: LAWENMOLL (Salud Integrativa) */}
        <div className={`p-6 rounded-3xl border-2 shadow-xl flex flex-col justify-between space-y-5 ${
          modoCalma ? 'bg-[#1E293B] border-[#78ACE9]/30 text-white' : 'bg-white border-[#52796F]/30 text-[#1B4D3E]'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 02
              </span>
              <span className="text-xs text-[#52796F] font-extrabold">Diagnostico & Telemedicina</span>
            </div>

            <div className="flex items-center gap-3">
              <img 
                src="/logo-lawenmoll.jpg.png" 
                alt="Logo LAWENMOLL" 
                className="w-12 h-12 object-contain rounded-xl border border-slate-200 p-1" 
              />
              <h3 className="text-xl font-extrabold">
                LAWENMOLL — Salud Integrativa & Fichas Cifradas
              </h3>
            </div>

            <p className="text-xs md:text-sm leading-relaxed text-slate-700">
              Plataforma inteligente de evaluación metabólica y seguimiento clínico integrativo, diseñada para conectar pacientes con terapeutas y médicos de forma segura.
            </p>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#A8B58A]/50 text-xs space-y-2">
              <h4 className="font-bold text-[#1B4D3E]">Caracteristicas Principales:</h4>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li>Test Metabólico y Composición Corporal Inteligente.</li>
                <li>Fichas Clínicas SOAP encriptadas bajo estándar Ley N° 21.663.</li>
                <li>Telemedicina integrativa con seguimiento continuo.</li>
              </ul>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=LAWENMOLL"
            className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-md block"
          >
            Ingresar a LAWENMOLL
          </Link>
        </div>

        {/* OFICINA 03: WELLNESS WEB APP */}
        <div className={`p-6 rounded-3xl border-2 shadow-xl flex flex-col justify-between space-y-5 ${
          modoCalma ? 'bg-[#1E293B] border-[#78ACE9]/30 text-white' : 'bg-white border-[#52796F]/30 text-[#1B4D3E]'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#676E5E] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 03
              </span>
              <span className="text-xs text-[#52796F] font-extrabold">Mente, Cuerpo & Gastronomia</span>
            </div>

            <div className="flex items-center gap-3">
              <img 
                src="/logo-wellness.jpg.jpg" 
                alt="Logo Wellness Web App" 
                className="w-12 h-12 object-contain rounded-xl border border-slate-200 p-1" 
              />
              <h3 className="text-xl font-extrabold">
                Wellness Web App — Movimiento Adaptado & Gastronomia Consciente
              </h3>
            </div>

            <p className="text-xs md:text-sm leading-relaxed text-slate-700">
              Espacio visual e interactivo para conectar mente y cuerpo. Rutinas de ejercicio sin salto para proteger tus articulaciones y reducir el cortisol urbano, junto a recetas saludables sin dietas punitivas.
            </p>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#A8B58A]/50 text-xs space-y-2">
              <h4 className="font-bold text-[#1B4D3E]">Experiencia Interactiva & Conexión:</h4>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li><strong>Conexión con Profesores:</strong> Asiste a clases en vivo en salas virtuales temáticas o visita el perfil del instructor.</li>
                <li><strong>Gastronomía Saludable:</strong> Cocina demostrativa e ideas de alimentación nutritiva e integrativa.</li>
                <li><strong>Pausas Activas:</strong> Módulos anti-estrés diseñados para el entorno laboral y personal.</li>
              </ul>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=Wellness%20Web%20App"
            className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-md block"
          >
            Ingresar a Wellness Web App
          </Link>
        </div>

        {/* OFICINA 04: BIENESTAR */}
        <div className={`p-6 rounded-3xl border-2 shadow-xl flex flex-col justify-between space-y-5 ${
          modoCalma ? 'bg-[#1E293B] border-[#78ACE9]/30 text-white' : 'bg-white border-[#52796F]/30 text-[#1B4D3E]'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#2D3A47] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Oficina 04
              </span>
              <span className="text-xs text-[#52796F] font-extrabold">Mensajeria, Salud & Shopping PYME</span>
            </div>

            <div className="flex items-center gap-3">
              <img 
                src="/logo-bienestar.png.png" 
                alt="Logo Bienestar" 
                className="w-12 h-12 object-contain rounded-xl border border-slate-200 p-1" 
              />
              <h3 className="text-xl font-extrabold">
                Bienestar — App de Mensajeria, Salud Holistica & Conexión Comercial
              </h3>
            </div>

            <p className="text-xs md:text-sm leading-relaxed text-slate-700">
              App interactiva de comunicación y retroalimentación en salud. Permite gestionar tu vida diaria, cuidar tu salud emocional y conectar con las mejores PYMEs y emprendimientos.
            </p>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#A8B58A]/50 text-xs space-y-2">
              <h4 className="font-bold text-[#1B4D3E]">Módulos de Bienestar & Marketplace:</h4>
              <ul className="space-y-1 text-slate-700 list-disc list-inside">
                <li><strong>Salud & Hábitos:</strong> Recordatorio de horas médicas, hidratación, registro de ánimo y actividad física.</li>
                <li><strong>Módulo Morfeo:</strong> Seguimiento y recomendación para un descanso reparador.</li>
                <li><strong>Chat, Agenda & Shopping:</strong> Conecta a personas con PYMEs recomendadas y visibiliza tus emprendimientos.</li>
              </ul>
            </div>
          </div>

          <Link
            href="/sala-virtual?app=Bienestar"
            className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition text-center shadow-md block"
          >
            Ingresar a Bienestar
          </Link>
        </div>

      </section>

      {/* Pie de Pagina & Contacto */}
      <footer id="contacto" className="bg-[#1B4D3E] text-white py-12 px-4 border-t-4 border-[#A8B58A]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-black mb-2">ASL Ideas SpA</h3>
            <p className="text-xs text-[#E8A5A5] leading-relaxed">
              Ecosistema de Soluciones Digitales y Diseños para PYMEs y Asociados.
              Inclusión y tecnología amable adaptada para Ley TEA N° 21.545.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-2">Contacto Directo</h4>
            <p className="text-xs text-slate-200">Fono WhatsApp: +56 9 8330 2145</p>
            <p className="text-xs text-slate-200">Email: contacto@aslideas.cl</p>
            <p className="text-xs text-slate-200">Santiago de Chile</p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-2">Redes Oficiales</h4>
            <div className="flex flex-wrap gap-3 text-xs text-slate-200">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:underline">Instagram</a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:underline">TikTok</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:underline">YouTube</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:underline">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
