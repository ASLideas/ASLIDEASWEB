'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [seccion, setSeccion] = useState<'apps' | 'contabilidad' | 'contratos' | 'minutas'>('apps');
  const [appSeleccionada, setAppSeleccionada] = useState<'casamatriz' | 'lawenmoll' | 'wellness' | 'bienestar' | 'comunidad'>('casamatriz');

  // Estado para creación de botones dinámicos por aplicación
  const [nombreBoton, setNombreBoton] = useState('');
  const [enlaceBoton, setEnlaceBoton] = useState('');
  const [listaBotones, setListaBotones] = useState([
    { id: '1', app: 'casamatriz', nombre: 'Ver Ficha Técnica', enlace: 'Modal Ficha' },
    { id: '2', app: 'lawenmoll', nombre: 'Ingresar Ficha SOAP', enlace: '/lawenmoll' },
    { id: '3', app: 'bienestar', nombre: 'Catálogo Herbolario', enlace: '/bienestar' },
  ]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#676E5E] p-3 sm:p-8">
      <div className="max-w-6xl mx-auto bg-[#E6E7D5] rounded-3xl border-2 border-[#97A884] shadow-xl overflow-hidden flex flex-col">
        
        {/* Cabecera Principal */}
        <div className="p-5 bg-[#E6E7D5] border-b border-[#97A884]/40 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl border-2 border-[#E6C693] p-1 flex items-center justify-center shadow-xs">
              <img src="/logo-asl.png.png" alt="ASL Ideas SpA" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-full border border-[#97A884]">
                ASL Core Center — Panel Directivo
              </span>
              <h1 className="text-lg sm:text-2xl font-black text-[#676E5E] mt-0.5">Torre de Control & Administración B2B</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="bg-white hover:bg-[#CDD6A9] text-[#676E5E] text-xs font-bold px-3.5 py-2 rounded-xl border border-[#97A884] transition shadow-xs"
            >
              ← Ir al Sitio Principal
            </Link>
            <Link
              href="/sala-virtual"
              className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs"
            >
              Ir a Sala Virtual
            </Link>
          </div>
        </div>

        {/* Menú Navegador Interno de Administración */}
        <div className="p-4 bg-[#CDD6A9]/40 border-b border-[#97A884]/30">
          <div className="flex flex-wrap bg-white/60 p-1.5 rounded-2xl border border-[#97A884] text-xs font-bold gap-1">
            <button
              type="button"
              onClick={() => setSeccion('apps')}
              className={`flex-1 py-2.5 rounded-xl transition cursor-pointer font-black ${
                seccion === 'apps' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              Gestión de Apps & Botones
            </button>
            <button
              type="button"
              onClick={() => setSeccion('contabilidad')}
              className={`flex-1 py-2.5 rounded-xl transition cursor-pointer font-black ${
                seccion === 'contabilidad' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              Contabilidad & Finanzas B2B
            </button>
            <button
              type="button"
              onClick={() => setSeccion('contratos')}
              className={`flex-1 py-2.5 rounded-xl transition cursor-pointer font-black ${
                seccion === 'contratos' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              Contratos & Convenios
            </button>
            <button
              type="button"
              onClick={() => setSeccion('minutas')}
              className={`flex-1 py-2.5 rounded-xl transition cursor-pointer font-black ${
                seccion === 'minutas' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              Histórico de Minutas
            </button>
          </div>
        </div>

        {/* CUERPO PRINCIPAL */}
        <div className="p-5 sm:p-8 space-y-6">

          {/* 1. SECCIÓN DE GESTIÓN DE APPS Y BOTONES DINÁMICOS */}
          {seccion === 'apps' && (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2 border-b border-[#97A884]/30 pb-3">
                <button
                  type="button"
                  onClick={() => setAppSeleccionada('casamatriz')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer border ${
                    appSeleccionada === 'casamatriz' ? 'bg-[#676E5E] text-white border-[#676E5E]' : 'bg-white text-[#676E5E] border-[#97A884]'
                  }`}
                >
                  1. ASL Ideas (Casa Matriz)
                </button>
                <button
                  type="button"
                  onClick={() => setAppSeleccionada('lawenmoll')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer border ${
                    appSeleccionada === 'lawenmoll' ? 'bg-[#676E5E] text-white border-[#676E5E]' : 'bg-white text-[#676E5E] border-[#97A884]'
                  }`}
                >
                  2. LAWENMOLL Salud
                </button>
                <button
                  type="button"
                  onClick={() => setAppSeleccionada('wellness')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer border ${
                    appSeleccionada === 'wellness' ? 'bg-[#676E5E] text-white border-[#676E5E]' : 'bg-white text-[#676E5E] border-[#97A884]'
                  }`}
                >
                  3. Wellness Web App
                </button>
                <button
                  type="button"
                  onClick={() => setAppSeleccionada('bienestar')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer border ${
                    appSeleccionada === 'bienestar' ? 'bg-[#676E5E] text-white border-[#676E5E]' : 'bg-white text-[#676E5E] border-[#97A884]'
                  }`}
                >
                  4. Bienestar Ancestral
                </button>
              </div>

              {/* Formulario de Creación de Botones */}
              <div className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-4 shadow-sm">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#676E5E]">
                  Publicar Nuevo Botón o Actualización para: <span className="text-green-800 uppercase">{appSeleccionada}</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold mb-1">Nombre / Etiqueta del Botón</label>
                    <input
                      type="text"
                      placeholder="Ej: Nueva Promoción / Ficha Técnica PDF"
                      value={nombreBoton}
                      onChange={(e) => setNombreBoton(e.target.value)}
                      className="w-full p-3 bg-[#FAF8F5] border border-[#97A884] rounded-xl outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">Enlace o Acción</label>
                    <input
                      type="text"
                      placeholder="Ej: /lawenmoll o [suspicious link removed]..."
                      value={enlaceBoton}
                      onChange={(e) => setEnlaceBoton(e.target.value)}
                      className="w-full p-3 bg-[#FAF8F5] border border-[#97A884] rounded-xl outline-none"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (nombreBoton) {
                      setListaBotones([...listaBotones, { id: Date.now().toString(), app: appSeleccionada, nombre: nombreBoton, enlace: enlaceBoton }]);
                      setNombreBoton('');
                      setEnlaceBoton('');
                    }
                  }}
                  className="bg-[#676E5E] hover:bg-[#52584b] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer"
                >
                  + Agregar Botón a la Aplicación
                </button>
              </div>

              {/* Botones Activos */}
              <div className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-3 shadow-sm">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#676E5E]">Botones Configurados en esta Unidad</h3>
                <div className="space-y-2">
                  {listaBotones.filter(b => b.app === appSeleccionada).length === 0 ? (
                    <p className="text-xs text-[#97A884] italic">No hay botones personalizados agregados aún.</p>
                  ) : (
                    listaBotones.filter(b => b.app === appSeleccionada).map(b => (
                      <div key={b.id} className="flex justify-between items-center p-3 bg-[#FAF8F5] rounded-2xl border border-[#97A884]/40 text-xs">
                        <div>
                          <p className="font-bold text-[#676E5E]">{b.nombre}</p>
                          <span className="text-[10px] text-[#97A884] font-mono">{b.enlace || 'Acción Interna'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setListaBotones(listaBotones.filter(x => x.id !== b.id))}
                          className="text-red-700 bg-red-100 hover:bg-red-600 hover:text-white font-bold text-[10px] px-3 py-1 rounded-lg transition cursor-pointer"
                        >
                          Eliminar
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. SECCIÓN DE CONTABILIDAD Y FINANZAS */}
          {seccion === 'contabilidad' && (
            <div className="bg-white p-6 rounded-3xl border-2 border-[#97A884] space-y-5 text-xs shadow-sm">
              <h3 className="font-extrabold uppercase text-xs tracking-wider">Estado Financiero y Balance ASL Ideas SpA</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#CDD6A9]/40 border border-[#97A884] rounded-2xl text-center">
                  <span className="text-[10px] font-bold block uppercase text-[#676E5E]">Ingresos por Licencias B2B</span>
                  <p className="text-xl font-black text-green-800 mt-1">$ 4.500.000 CLP</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-center">
                  <span className="text-[10px] font-bold block uppercase text-red-700">Costos Servidores / Vercel</span>
                  <p className="text-xl font-black text-red-700 mt-1">$ 120.000 CLP</p>
                </div>
                <div className="p-4 bg-[#FAF8F5] border border-[#97A884] rounded-2xl text-center">
                  <span className="text-[10px] font-bold block uppercase text-[#676E5E]">Balance Disponible</span>
                  <p className="text-xl font-black text-[#676E5E] mt-1">$ 4.380.000 CLP</p>
                </div>
              </div>
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => alert('Generando informe de rendimiento contable en PDF...')}
                  className="bg-[#676E5E] text-white font-bold px-5 py-3 rounded-2xl hover:bg-[#52584b] transition cursor-pointer"
                >
                  Exportar Reporte Contable (PDF)
                </button>
              </div>
            </div>
          )}

          {/* 3. SECCIÓN DE CONTRATOS Y LICENCIAS */}
          {seccion === 'contratos' && (
            <div className="bg-white p-6 rounded-3xl border-2 border-[#97A884] space-y-4 text-xs shadow-sm">
              <h3 className="font-extrabold uppercase text-xs tracking-wider">Registro de Convenios y Licencias B2B</h3>
              <p className="text-[#676E5E]">Expediente digital de acuerdos firmados con municipalidades e instituciones de salud bajo la Ley N° 21.663.</p>
              <div className="p-4 bg-[#FAF8F5] border border-[#97A884]/40 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="font-bold text-xs">Convenio B2B — Ilustre Municipalidad / Departamento de Salud</p>
                  <span className="text-[10px] text-[#97A884] font-mono">Licencia Anual • Vigencia: 2026-2027</span>
                </div>
                <span className="bg-green-100 text-green-800 font-bold px-3 py-1 rounded-xl text-[10px]">Activo</span>
              </div>
            </div>
          )}

          {/* 4. SECCIÓN DE MINUTAS */}
          {seccion === 'minutas' && (
            <div className="bg-white p-6 rounded-3xl border-2 border-[#97A884] space-y-4 text-xs shadow-sm">
              <h3 className="font-extrabold uppercase text-xs tracking-wider">Repositorio de Minutas y Transcripciones de Sala Virtual</h3>
              <p className="text-[#676E5E]">Resguardo de acuerdos y transcripciones en vivo generadas en las videollamadas.</p>
              <div className="p-4 bg-[#FAF8F5] border border-[#97A884]/40 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="font-bold text-xs">Minuta_Reunion_B2B_Vitrina.txt</p>
                  <span className="text-[10px] text-[#97A884] font-mono">Cifrado de Seguridad Ley N° 21.663</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Descargando copia respaldada de la minuta...')}
                  className="bg-[#676E5E] text-white px-3.5 py-1.5 rounded-xl font-bold text-[10px] cursor-pointer"
                >
                  Descargar TXT
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}