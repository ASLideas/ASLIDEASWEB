'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function HomePage() {
  const [activePortalKey, setActivePortalKey] = useState<string>('asl');

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#2D6A4F] font-sans flex flex-col">
      {/* ENCABEZADO / HEADER */}
      <header className="bg-white border-b border-[#C8D8CE] px-6 py-4 sticky top-0 z-50 shadow-xs flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            ASL
          </div>
          <div>
            <h1 className="text-base font-extrabold text-[#2D6A4F] tracking-tight">ASL Ideas SpA</h1>
            <p className="text-[10px] font-bold text-[#84A59D] uppercase tracking-wider">Salud Digital Inclusiva & Accesible</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="mailto:contacto@aslideas.cl"
            className="hidden sm:inline-block text-xs font-bold text-[#52796F] hover:text-[#2D6A4F] transition"
          >
            contacto@aslideas.cl
          </a>
          <Link
            href="/admin"
            className="bg-[#D4AF37] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#B08D4B] transition shadow-xs flex items-center gap-1"
          >
            ��� Acceso Admin
          </Link>
        </div>
      </header>

      {/* CUERPO PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        
        {/* HERO INTRODUCTORIO */}
        <section className="bg-white p-8 rounded-3xl border border-[#C8D8CE] shadow-sm text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
            Ecosistema de Salud Inclusiva Ley N° 21.663
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#2D6A4F] leading-tight">
            Tecnología amable para la salud integrativa y la accesibilidad cognitiva
          </h2>
          <p className="text-xs md:text-sm text-[#52796F] leading-relaxed">
            Plataforma diseñada por y para neurodivergencias, enfermedades crónicas y bienestar integral.
          </p>
        </section>

        {/* NAVEGACIÓN ENTRE OFICINAS VIRTUALES */}
        <section className="space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { key: 'asl', label: '1. Casa Matriz B2B' },
              { key: 'lawenmoll', label: '2. LAWENMOLL (Salud Integrativa)' },
              { key: 'wellness', label: '3. Wellness Web App' },
              { key: 'bienestar', label: '4. Sabiduría Ancestral' }
            ].map((portal) => (
              <button
                key={portal.key}
                onClick={() => setActivePortalKey(portal.key)}
                className={`text-xs font-bold px-5 py-2.5 rounded-xl transition ${
                  activePortalKey === portal.key
                    ? 'bg-[#2D6A4F] text-white shadow-md'
                    : 'bg-white text-[#52796F] hover:bg-[#E8F0EC] border border-[#C8D8CE]'
                }`}
              >
                {portal.label}
              </button>
            ))}
          </div>

          {/* VISTA INTERACTIVA DEL PORTAL SELECCIONADO */}
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs">
            <SalaVirtualB2B activePortalKey={activePortalKey} />
          </div>
        </section>

        {/* SECCIÓN OFICIAL DE CONTACTO & COMUNIDADES */}
        <section className="bg-white p-8 rounded-3xl border-2 border-[#D4AF37] shadow-md space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
              Canales Oficiales de Atención & Comunidades
            </span>
            <h3 className="text-xl font-bold text-[#2D6A4F]">Contacto ASL Ideas SpA</h3>
            <p className="text-xs text-[#52796F]">
              Escríbenos directamente o únete a nuestras comunidades oficiales en WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            {/* CORREO CORPORATIVO */}
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="text-2xl block">✉️</span>
              <h4 className="text-xs font-bold text-[#2D6A4F]">Correo Corporativo B2B</h4>
              <p className="text-xs text-[#52796F] font-mono">contacto@aslideas.cl</p>
              <a
                href="mailto:contacto@aslideas.cl"
                className="inline-block text-[11px] font-bold text-[#2D6A4F] underline hover:text-[#1E3A2F]"
              >
                Enviar Correo Directo -&gt;
              </a>
            </div>

            {/* COMUNIDAD LAWENMOLL */}
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="text-2xl block">���</span>
              <h4 className="text-xs font-bold text-[#2D6A4F]">Comunidad LAWENMOLL</h4>
              <p className="text-[11px] text-[#52796F]">Test de Bienestar, Salud Integrativa y Consultas</p>
              <button
                onClick={() => alert('Redirigiendo a la Comunidad LAWENMOLL en WhatsApp...')}
                className="w-full text-xs font-bold bg-[#2D6A4F] text-white py-2 rounded-xl hover:bg-[#1E3A2F] transition"
              >
                Únete en WhatsApp
              </button>
            </div>

            {/* COMUNIDAD B2B MUNICIPALIDADES */}
            <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="text-2xl block">���️</span>
              <h4 className="text-xs font-bold text-[#2D6A4F]">Comunidad ASL Ideas B2B</h4>
              <p className="text-[11px] text-[#52796F]">Convenios Municipalidades e Instituciones</p>
              <button
                onClick={() => alert('Redirigiendo al Grupo Oficial B2B en WhatsApp...')}
                className="w-full text-xs font-bold bg-[#E8F0EC] text-[#2D6A4F] py-2 rounded-xl border border-[#C8D8CE] hover:bg-[#DED9CF] transition"
              >
                Unirse a Canal B2B
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* PIE DE PÁGINA */}
      <footer className="bg-[#EAE6DF] border-t border-[#C8D8CE] px-6 py-6 text-center text-xs text-[#84A59D] space-y-1">
        <p className="font-bold text-[#2D6A4F]">ASL Ideas SpA — Chile</p>
        <p>Ciberseguridad & Protección de Datos Médicos Ley N° 21.663 | Accesibilidad Cognitiva Ley N° 21.545</p>
      </footer>
    </div>
  );
}
