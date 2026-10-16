'use client';

import React, { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'fichas' | 'videollamadas' | 'mensajeria' | 'recetas' | 'metricas'>('fichas');

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col md:flex-row">
      <aside className="w-full md:w-72 bg-[#1B4D3E] text-[#FAF8F5] p-6 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <h1 className="text-xl font-bold tracking-wide">ASL Ideas SpA</h1>
            <p className="text-xs text-[#84A59D] mt-1">Panel Privado de Administración</p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('fichas')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center space-x-3 ${
                activeTab === 'fichas' ? 'bg-[#52796F] text-white' : 'hover:bg-[#2D6A4F]/50 text-[#FAF8F5]'
              }`}
            >
              <svg className="w-4 h-4 text-[#84A59D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Fichas Clínicas (Ley 21.663)</span>
            </button>

            <button
              onClick={() => setActiveTab('videollamadas')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center space-x-3 ${
                activeTab === 'videollamadas' ? 'bg-[#52796F] text-white' : 'hover:bg-[#2D6A4F]/50 text-[#FAF8F5]'
              }`}
            >
              <svg className="w-4 h-4 text-[#84A59D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Control de Videollamadas</span>
            </button>

            <button
              onClick={() => setActiveTab('mensajeria')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center space-x-3 ${
                activeTab === 'mensajeria' ? 'bg-[#52796F] text-white' : 'hover:bg-[#2D6A4F]/50 text-[#FAF8F5]'
              }`}
            >
              <svg className="w-4 h-4 text-[#84A59D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Mensajería Unificada</span>
            </button>

            <button
              onClick={() => setActiveTab('recetas')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center space-x-3 ${
                activeTab === 'recetas' ? 'bg-[#52796F] text-white' : 'hover:bg-[#2D6A4F]/50 text-[#FAF8F5]'
              }`}
            >
              <svg className="w-4 h-4 text-[#84A59D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Recetarios & Generador PDF</span>
            </button>

            <button
              onClick={() => setActiveTab('metricas')}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition flex items-center space-x-3 ${
                activeTab === 'metricas' ? 'bg-[#52796F] text-white' : 'hover:bg-[#2D6A4F]/50 text-[#FAF8F5]'
              }`}
            >
              <svg className="w-4 h-4 text-[#84A59D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Métricas & Convenios B2B</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#52796F]/40 text-xs text-[#84A59D]">
          <p>Conexión segura cifrada TLS 1.3</p>
          <p className="mt-1 flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
            Estado Supabase: Activo
          </p>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 max-w-6xl">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-[#52796F]/20">
          <div>
            <h2 className="text-2xl font-bold text-[#1B4D3E]">
              {activeTab === 'fichas' && 'Gestión de Fichas Clínicas LAWENMOLL'}
              {activeTab === 'videollamadas' && 'Consola de Videollamadas & Salas Virtuales'}
              {activeTab === 'mensajeria' && 'Bandeja Unificada de Mensajería'}
              {activeTab === 'recetas' && 'Gestor de Herbolaria & Documentos PDF'}
              {activeTab === 'metricas' && 'Métricas de Impacto & Licencias B2B'}
            </h2>
            <p className="text-sm text-[#52796F]">Herramientas de administración privada para ASL Ideas SpA</p>
          </div>
          <div className="mt-4 md:mt-0 bg-white px-4 py-2 rounded-full border border-[#84A59D]/30 shadow-sm text-xs font-semibold text-[#B08D4B] flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#B08D4B]"></span>
            <span>Sesión Administradora</span>
          </div>
        </header>

        {activeTab === 'fichas' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-[#84A59D]/30 shadow-sm">
                <p className="text-xs text-[#52796F] font-medium">Evaluaciones Registradas</p>
                <p className="text-2xl font-bold text-[#1B4D3E] mt-1">128</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#84A59D]/30 shadow-sm">
                <p className="text-xs text-[#52796F] font-medium">Test Pendientes de Revisión</p>
                <p className="text-2xl font-bold text-[#B08D4B] mt-1">14</p>
              </div>
              <div className="bg-white p-5 rounded-xl border border-[#84A59D]/30 shadow-sm">
                <p className="text-xs text-[#52796F] font-medium">Cifrado Ley N° 21.663</p>
                <p className="text-sm font-semibold text-emerald-700 mt-2 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                  Protección Habilitada
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-[#84A59D]/30 p-6 shadow-sm">
              <h3 className="font-semibold text-[#1B4D3E] mb-4">Últimas Pre-Fichas Registradas</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#FAF8F5] text-[#52796F] text-xs">
                      <th className="pb-3">Código</th>
                      <th className="pb-3">Tipo de Evaluación</th>
                      <th className="pb-3">Estado</th>
                      <th className="pb-3">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FAF8F5]">
                    <tr>
                      <td className="py-3 font-mono text-xs">LAW-2026-089</td>
                      <td className="py-3">Test de Bienestar & Metabolismo</td>
                      <td className="py-3"><span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-medium">Pendiente</span></td>
                      <td className="py-3"><button className="text-xs text-[#1B4D3E] underline font-semibold hover:text-[#2D6A4F]">Ver Ficha Encriptada</button></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-xs">LAW-2026-088</td>
                      <td className="py-3">Seguimiento Salud Integrativa</td>
                      <td className="py-3"><span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-medium">Completado</span></td>
                      <td className="py-3"><button className="text-xs text-[#1B4D3E] underline font-semibold hover:text-[#2D6A4F]">Ver Ficha Encriptada</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'videollamadas' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[#84A59D]/30 shadow-sm">
              <h3 className="font-semibold text-[#1B4D3E] mb-2">Programación de Salas Virtuales</h3>
              <p className="text-xs text-[#52796F] mb-6">Gestiona los accesos directos para las sesiones de movimiento adaptado y talleres en vivo.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 border border-[#84A59D]/20 rounded-lg bg-[#FAF8F5]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-[#1B4D3E]">Sala Lotus (Pausa Activa)</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-medium">En Vivo</span>
                  </div>
                  <p className="text-xs text-[#52796F] mb-4">Movimiento suave sin impacto para articulaciones.</p>
                  <button className="w-full bg-[#1B4D3E] text-white text-xs py-2.5 rounded-lg font-medium hover:bg-[#2D6A4F] transition">
                    Unirme como Moderadora
                  </button>
                </div>

                <div className="p-5 border border-[#84A59D]/20 rounded-lg bg-[#FAF8F5]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-[#1B4D3E]">Sala Bosque (Herbolaria)</span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">Programada 18:00</span>
                  </div>
                  <p className="text-xs text-[#52796F] mb-4">Taller de preparación de infusiones relajantes.</p>
                  <button className="w-full bg-[#52796F] text-white text-xs py-2.5 rounded-lg font-medium hover:bg-[#1B4D3E] transition">
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mensajeria' && (
          <div className="bg-white p-6 rounded-xl border border-[#84A59D]/30 shadow-sm">
            <h3 className="font-semibold text-[#1B4D3E] mb-2">Bandeja Unificada de Consultas</h3>
            <p className="text-xs text-[#52796F] mb-6">Centro de respuesta centralizado para solicitudes de WhatsApp y Telegram.</p>
            <div className="p-8 text-center text-[#52796F] border border-dashed border-[#84A59D]/40 rounded-lg bg-[#FAF8F5]">
              <p className="text-sm font-medium">No hay mensajes pendientes por responder.</p>
            </div>
          </div>
        )}

        {activeTab === 'recetas' && (
          <div className="bg-white p-6 rounded-xl border border-[#84A59D]/30 shadow-sm">
            <h3 className="font-semibold text-[#1B4D3E] mb-2">Publicar Nuevos Recetarios en PDF</h3>
            <p className="text-xs text-[#52796F] mb-6">Carga y administración de fichas herbolarias para la sección Sabiduría Ancestral.</p>
            <button className="bg-[#B08D4B] text-white text-sm px-5 py-2.5 rounded-lg font-medium hover:bg-[#8A6C35] transition">
              Subir Nueva Ficha Herbolaria (PDF)
            </button>
          </div>
        )}

        {activeTab === 'metricas' && (
          <div className="bg-white p-6 rounded-xl border border-[#84A59D]/30 shadow-sm">
            <h3 className="font-semibold text-[#1B4D3E] mb-2">Reporte para Convenios e Instituciones</h3>
            <p className="text-xs text-[#52796F] mb-6">Indicadores de impacto en accesibilidad e integración B2B.</p>
            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#84A59D]/20">
              <p className="text-sm text-[#1B4D3E]">
                Retención de Usuarios a 30 Días: <span className="font-bold text-[#2D6A4F]">62%</span>
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
