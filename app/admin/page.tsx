'use client';

import React from "react";
import Link from "next/link";

export default function AdminConsole() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col md:flex-row">
      {/* Sidebar Lateral */}
      <aside className="w-full md:w-64 bg-white border-r border-[#C8D8CE] p-6 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          {/* Encabezado Logo */}
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-[#C8D8CE] p-1 flex items-center justify-center">
              <img src="/LOGO asl.png" alt="Logo ASL Ideas" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-[#1B4D3E]">ASL Ideas SpA</h1>
              <p className="text-[10px] text-[#B08D4B] font-semibold uppercase tracking-wider">Consola Administradora</p>
              <span className="inline-block mt-1 text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Sesión Privada Activa
              </span>
            </div>
          </div>

          {/* Opciones Menú Lateral */}
          <nav className="space-y-2 text-xs font-semibold text-[#1B4D3E]">
            <a href="#casa-matriz" className="block px-3 py-2.5 rounded-xl bg-[#E8F0EC] text-[#1B4D3E] font-bold border border-[#C8D8CE]">
              Casa Matriz & Contabilidad B2B
            </a>
            <a href="#especialistas" className="block px-3 py-2.5 rounded-xl hover:bg-gray-100 transition text-gray-700">
              Especialistas LAWENMOLL
            </a>
            <a href="#estadisticas" className="block px-3 py-2.5 rounded-xl hover:bg-gray-100 transition text-gray-700">
              Estadísticas de Aplicaciones
            </a>
            <a href="#gestor" className="block px-3 py-2.5 rounded-xl hover:bg-gray-100 transition text-gray-700">
              Gestor de Actualizaciones Apps
            </a>
            <a href="#agente-ia" className="block px-3 py-2.5 rounded-xl hover:bg-gray-100 transition text-gray-700">
              Agente IA Redes & Monetización
            </a>
          </nav>
        </div>

        {/* Informacion de Contacto B2B & Cierre de Sesion */}
        <div className="space-y-3 pt-4 border-t border-gray-100 text-[11px] text-gray-600">
          <div>
            <p className="font-bold text-[#1B4D3E]">Correo B2B:</p>
            <p className="font-mono text-[10px] text-gray-700">contacto@aslideas.cl</p>
          </div>
          <div>
            <p className="font-bold text-[#1B4D3E]">Correo LAWENMOLL:</p>
            <p className="font-mono text-[10px] text-gray-700">contacto@lawenmoll.cl</p>
          </div>
          <Link
            href="/"
            className="block text-center w-full bg-gray-100 text-gray-700 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition mt-2 text-xs"
          >
            Cerrar Sesión Segura
          </Link>
        </div>
      </aside>

      {/* Contenido Principal Admin */}
      <main className="flex-1 p-6 md:p-10 space-y-8">
        <header className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-[#C8D8CE] p-0.5">
              <img src="/LOGO asl.png" alt="Logo ASL" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1B4D3E]">Administración & Actualizaciones de Módulos</h2>
              <p className="text-xs text-gray-500">Consola privada con baja carga sensorial para la gestión unificada</p>
            </div>
          </div>
        </header>

        {/* Seccion Control de Modulos */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#1B4D3E]">Control de Módulos & Publicaciones</h3>
            <p className="text-xs text-gray-600 leading-relaxed max-w-3xl">
              Ingresa a cada aplicación para realizar modificaciones de texto, añadir recetarios PDF o actualizar horarios de salas virtuales sin requerir código adicional.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <button className="bg-[#FAF8F5] border border-[#C8D8CE] p-5 rounded-2xl text-left hover:border-[#1B4D3E] transition space-y-2">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Módulo LAWENMOLL</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Editar LAWENMOLL</h4>
              <p className="text-[11px] text-gray-500">Fichas clínicas, vitrina y agendamiento.</p>
            </button>

            <button className="bg-[#FAF8F5] border border-[#C8D8CE] p-5 rounded-2xl text-left hover:border-[#1B4D3E] transition space-y-2">
              <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider block">Módulo Wellness</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Editar Wellness App</h4>
              <p className="text-[11px] text-gray-500">Salas virtuales y videoteca.</p>
            </button>

            <button className="bg-[#FAF8F5] border border-[#C8D8CE] p-5 rounded-2xl text-left hover:border-[#1B4D3E] transition space-y-2">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Módulo Bienestar</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Editar Bienestar</h4>
              <p className="text-[11px] text-gray-500">Recetarios PDF y Diario Mural.</p>
            </button>

            <button className="bg-[#FAF8F5] border border-[#C8D8CE] p-5 rounded-2xl text-left hover:border-[#1B4D3E] transition space-y-2">
              <span className="text-[10px] font-bold text-[#1B4D3E] uppercase tracking-wider block">Módulo B2B</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Editar Casa Matriz B2B</h4>
              <p className="text-[11px] text-gray-500">Convenios y licencias PYMES.</p>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
