'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans pb-16">
      <header className="bg-white border-b-2 border-[#E6C693] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#E6C693] p-0.5 overflow-hidden flex items-center justify-center">
              <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-black text-[#676E5E]">Consola de Administracion ASL Ideas SpA</h1>
              <p className="text-[9px] text-[#97A884] font-bold uppercase tracking-wider">
                Panel Muestra Abierta (Sin Clave)
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-[#CDD6A9] text-[#676E5E] text-[10px] font-bold px-3 py-1 rounded-full border border-[#97A884]">
              Acceso Directo
            </span>
            <Link
              href="/"
              className="bg-[#676E5E] text-white hover:bg-[#52584b] text-xs font-bold px-3.5 py-1.5 rounded-xl transition"
            >
              Volver al Sitio
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        <div className="bg-white p-6 rounded-3xl border-2 border-[#97A884] shadow-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-3 py-0.5 rounded-full border border-[#97A884]">
              Modo Muestra e Inspeccion
            </span>
            <h2 className="text-xl font-extrabold text-[#676E5E] mt-1">
              Consola Abierta para Demostracion
            </h2>
            <p className="text-xs text-[#676E5E]/80 mt-1">
              Acceso liberado temporalmente para inspeccion de las funcionalidades de gestion B2B, citas agendadas y fichas SOAP.
            </p>
          </div>
          <Link
            href="/sala-virtual"
            className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-5 py-3 rounded-2xl transition shrink-0"
          >
            Abrir Sala Virtual
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#97A884] space-y-1 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#97A884]">Citas Agendadas B2B</span>
            <p className="text-2xl font-black text-[#676E5E]">14 Reuniones</p>
            <p className="text-[10px] text-[#676E5E]/70">Salas de Video Reunion activas</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#97A884] space-y-1 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#97A884]">Vitrinas PYME</span>
            <p className="text-2xl font-black text-[#676E5E]">8 PYMEs</p>
            <p className="text-[10px] text-[#676E5E]/70">Catalogos virtuales de salud integrativa</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#97A884] space-y-1 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#97A884]">Fichas Encriptadas</span>
            <p className="text-2xl font-black text-[#676E5E]">128 SOAP</p>
            <p className="text-[10px] text-[#676E5E]/70">Cumplimiento Ley N 21.663</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#97A884] space-y-1 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#97A884]">Licencias Corporativas</span>
            <p className="text-2xl font-black text-[#676E5E]">3 Convenios</p>
            <p className="text-[10px] text-[#676E5E]/70">Municipalidades e instituciones</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border-2 border-[#97A884] p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#97A884]/30 pb-4">
            <div>
              <h3 className="text-lg font-black text-[#676E5E]">Gestion de Solicitudes B2B y Citas Virtuales</h3>
              <p className="text-xs text-[#676E5E]/80">Listado de agendamientos recientes recibidos en el sitio web.</p>
            </div>
            <Link
              href="/sala-virtual"
              className="bg-[#676E5E] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#52584b] transition"
            >
              + Nueva Reunion
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#CDD6A9]/50 text-[#676E5E] border-b border-[#97A884]">
                  <th className="p-3 font-extrabold">Fecha / Horario</th>
                  <th className="p-3 font-extrabold">Solicitante / Empresa</th>
                  <th className="p-3 font-extrabold">Unidad / Servicio</th>
                  <th className="p-3 font-extrabold">Motivo</th>
                  <th className="p-3 font-extrabold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E7D5]">
                <tr>
                  <td className="p-3 font-semibold">2026-10-30 | 10:30 AM</td>
                  <td className="p-3">Municipalidad de Santiago</td>
                  <td className="p-3 font-medium">1. Casa Matriz ASL Ideas SpA</td>
                  <td className="p-3">Demo Software Accesibilidad Ley TEA</td>
                  <td className="p-3"><span className="bg-[#CDD6A9] text-[#676E5E] px-2 py-0.5 rounded-md font-bold">Confirmada</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">2026-10-31 | 15:30 PM</td>
                  <td className="p-3">PYME Herbolaria Nativa</td>
                  <td className="p-3 font-medium">4. Sabiduria Ancestral</td>
                  <td className="p-3">Cotizacion Vitrina Virtual B2B</td>
                  <td className="p-3"><span className="bg-[#E6C693]/40 text-[#676E5E] px-2 py-0.5 rounded-md font-bold">En Revision</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">2026-11-02 | 09:30 AM</td>
                  <td className="p-3">Centro Medico Integrativo</td>
                  <td className="p-3 font-medium">2. LAWENMOLL Salud Integrativa</td>
                  <td className="p-3">Consultoria Fichas SOAP (Ley 21.663)</td>
                  <td className="p-3"><span className="bg-[#CDD6A9] text-[#676E5E] px-2 py-0.5 rounded-md font-bold">Confirmada</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
