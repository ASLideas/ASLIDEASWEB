'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface MovimientoFinanciero {
  id: string;
  fecha: string;
  app: 'casamatriz' | 'lawenmoll' | 'wellness' | 'bienestar';
  tipo: 'ingreso' | 'egreso';
  categoria: 'Licencia B2B' | 'Consulta / Ficha' | 'Suscripción' | 'Servidores / TI' | 'Impuestos / Operación';
  concepto: string;
  monto: number;
  estado: 'Pagado' | 'Facturado' | 'Pendiente';
}

export default function AdminPage() {
  const [seccion, setSeccion] = useState<'contabilidad' | 'apps' | 'contratos' | 'minutas'>('contabilidad');
  const [filtroApp, setFiltroApp] = useState<string>('todas');

  // Formulario de Transacciones
  const [fecha, setFecha] = useState<string>(new Date().toISOString().split('T')[0]);
  const [app, setApp] = useState<'casamatriz' | 'lawenmoll' | 'wellness' | 'bienestar'>('casamatriz');
  const [tipo, setTipo] = useState<'ingreso' | 'egreso'>('ingreso');
  const [categoria, setCategoria] = useState<MovimientoFinanciero['categoria']>('Licencia B2B');
  const [concepto, setConcepto] = useState<string>('');
  const [monto, setMonto] = useState<string>('');
  const [estado, setEstado] = useState<'Pagado' | 'Facturado' | 'Pendiente'>('Pagado');

  // Libro Contable Inicial
  const [movimientos, setMovimientos] = useState<MovimientoFinanciero[]>([
    {
      id: '1',
      fecha: '2026-10-15',
      app: 'casamatriz',
      tipo: 'ingreso',
      categoria: 'Licencia B2B',
      concepto: 'Convenio Licencia Software Accesibilidad Municipalidad',
      monto: 3500000,
      estado: 'Pagado',
    },
    {
      id: '2',
      fecha: '2026-10-20',
      app: 'lawenmoll',
      tipo: 'ingreso',
      categoria: 'Consulta / Ficha',
      concepto: 'Fichas Clínicas SOAP e Integración Salud',
      monto: 850000,
      estado: 'Pagado',
    },
    {
      id: '3',
      fecha: '2026-10-25',
      app: 'casamatriz',
      tipo: 'egreso',
      categoria: 'Servidores / TI',
      concepto: 'Infraestructura Cloud (Vercel & Supabase PostgreSQL)',
      monto: 145000,
      estado: 'Pagado',
    },
  ]);

  // Agregar Transacción
  const handleAgregarMovimiento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concepto || !monto || Number(monto) <= 0) return;

    const nuevo: MovimientoFinanciero = {
      id: Date.now().toString(),
      fecha,
      app,
      tipo,
      categoria,
      concepto,
      monto: Number(monto),
      estado,
    };

    setMovimientos([nuevo, ...movimientos]);
    setConcepto('');
    setMonto('');
  };

  // Filtrado de Datos
  const movimientosFiltrados = movimientos.filter(
    (m) => filtroApp === 'todas' || m.app === filtroApp
  );

  // Totales
  const totalIngresos = movimientosFiltrados
    .filter((m) => m.tipo === 'ingreso')
    .reduce((acc, curr) => acc + curr.monto, 0);

  const totalEgresos = movimientosFiltrados
    .filter((m) => m.tipo === 'egreso')
    .reduce((acc, curr) => acc + curr.monto, 0);

  const balanceNeto = totalIngresos - totalEgresos;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#676E5E] p-3 sm:p-8">
      <div className="max-w-6xl mx-auto bg-[#E6E7D5] rounded-3xl border-2 border-[#97A884] shadow-xl overflow-hidden flex flex-col">
        
        {/* Cabecera ASL Core Center */}
        <div className="p-5 bg-[#E6E7D5] border-b border-[#97A884]/40 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl border-2 border-[#E6C693] p-1 flex items-center justify-center shadow-xs">
              <img src="/logo-asl.png.png" alt="ASL Ideas SpA" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-full border border-[#97A884]">
                ASL Core Center — Control Administrativo
              </span>
              <h1 className="text-lg sm:text-2xl font-black text-[#676E5E] mt-0.5">Gestión Financiera & Operaciones SpA</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="bg-white hover:bg-[#CDD6A9] text-[#676E5E] text-xs font-bold px-3.5 py-2 rounded-xl border border-[#97A884] transition shadow-xs"
            >
              ← Ir al Inicio
            </Link>
            <Link
              href="/sala-virtual"
              className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs"
            >
              Ir a Sala Virtual
            </Link>
          </div>
        </div>

        {/* Menú Superior */}
        <div className="p-4 bg-[#CDD6A9]/40 border-b border-[#97A884]/30">
          <div className="flex flex-wrap bg-white/60 p-1.5 rounded-2xl border border-[#97A884] text-xs font-bold gap-1">
            <button
              type="button"
              onClick={() => setSeccion('contabilidad')}
              className={`flex-1 py-2.5 rounded-xl transition cursor-pointer font-black ${
                seccion === 'contabilidad' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              Contabilidad & Libro Diario
            </button>
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
              Minutas & Respaldos
            </button>
          </div>
        </div>

        {/* CONTENIDO CONTABLE (PASO 1) */}
        {seccion === 'contabilidad' && (
          <div className="p-5 sm:p-8 space-y-6">
            
            {/* Tarjetas de Resumen Financiero */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-2xl border-2 border-[#97A884] shadow-xs text-center">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#97A884]">Ingresos Totales</span>
                <p className="text-xl sm:text-2xl font-black text-green-700 mt-1">
                  $ {totalIngresos.toLocaleString('es-CL')} CLP
                </p>
              </div>

              <div className="p-4 bg-white rounded-2xl border-2 border-[#97A884] shadow-xs text-center">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-500">Gastos / Operación</span>
                <p className="text-xl sm:text-2xl font-black text-red-600 mt-1">
                  $ {totalEgresos.toLocaleString('es-CL')} CLP
                </p>
              </div>

              <div className="p-4 bg-[#676E5E] text-white rounded-2xl border-2 border-[#676E5E] shadow-xs text-center">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#CDD6A9]">Balance Neto Disponible</span>
                <p className="text-xl sm:text-2xl font-black mt-1">
                  $ {balanceNeto.toLocaleString('es-CL')} CLP
                </p>
              </div>
            </div>

            {/* Formulario de Registro Riguroso */}
            <form onSubmit={handleAgregarMovimiento} className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-4 shadow-xs text-xs">
              <div className="flex justify-between items-center border-b border-[#97A884]/30 pb-2">
                <h3 className="font-extrabold uppercase tracking-wider text-[#676E5E]">
                  Registrar Nuevo Movimiento Contable
                </h3>
                <span className="text-[10px] text-[#97A884] font-semibold">Trazabilidad Ley N° 21.663</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">Fecha</label>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Unidad de Negocio / App</label>
                  <select
                    value={app}
                    onChange={(e) => setApp(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl outline-none font-bold"
                  >
                    <option value="casamatriz">1. Casa Matriz (Licencias B2B)</option>
                    <option value="lawenmoll">2. LAWENMOLL (Salud Integrativa)</option>
                    <option value="wellness">3. Wellness Web App</option>
                    <option value="bienestar">4. Bienestar Ancestral</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Tipo de Transacción</label>
                  <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl outline-none font-bold"
                  >
                    <option value="ingreso">Ingreso (+)</option>
                    <option value="egreso">Gasto / Egreso (-)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1">Categoría</label>
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value as any)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl outline-none"
                  >
                    <option value="Licencia B2B">Licencia B2B</option>
                    <option value="Consulta / Ficha">Consulta / Ficha</option>
                    <option value="Suscripción">Suscripción</option>
                    <option value="Servidores / TI">Servidores / TI</option>
                    <option value="Impuestos / Operación">Impuestos / Operación</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Concepto / Detalle</label>
                  <input
                    type="text"
                    placeholder="Ej. Pago Convenio Anual Ilustre Municipalidad"
                    value={concepto}
                    onChange={(e) => setConcepto(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Monto (CLP)</label>
                  <input
                    type="number"
                    placeholder="Ej. 1500000"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[#97A884]/20">
                <div className="flex items-center gap-2">
                  <label className="font-bold">Estado:</label>
                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value as any)}
                    className="p-2 bg-[#FAF8F5] border border-[#97A884] rounded-xl outline-none font-semibold"
                  >
                    <option value="Pagado">Pagado</option>
                    <option value="Facturado">Facturado (Pendiente Pago)</option>
                    <option value="Pendiente">Por Facturar</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-[#676E5E] hover:bg-[#52584b] text-white font-extrabold px-6 py-2.5 rounded-xl transition cursor-pointer shadow-md"
                >
                  + Registrar en Libro Contable
                </button>
              </div>
            </form>

            {/* Tabla de Movimientos Filtrable */}
            <div className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-4 shadow-xs text-xs">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#97A884]/30 pb-3">
                <h3 className="font-extrabold uppercase tracking-wider text-[#676E5E]">
                  Libro Diario de Transacciones ASL Ideas SpA
                </h3>

                {/* Filtro por App */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[11px]">Filtrar App:</span>
                  <select
                    value={filtroApp}
                    onChange={(e) => setFiltroApp(e.target.value)}
                    className="p-2 bg-[#FAF8F5] border border-[#97A884] rounded-xl font-bold outline-none"
                  >
                    <option value="todas">Todas las Aplicaciones</option>
                    <option value="casamatriz">Casa Matriz B2B</option>
                    <option value="lawenmoll">LAWENMOLL Salud</option>
                    <option value="wellness">Wellness App</option>
                    <option value="bienestar">Bienestar Ancestral</option>
                  </select>
                </div>
              </div>

              {/* Contenedor Responsivo de Tabla */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#CDD6A9]/40 border-b border-[#97A884] text-[10px] uppercase font-black text-[#676E5E]">
                      <th className="p-3">Fecha</th>
                      <th className="p-3">Unidad / App</th>
                      <th className="p-3">Categoría</th>
                      <th className="p-3">Concepto</th>
                      <th className="p-3">Estado</th>
                      <th className="p-3 text-right">Monto (CLP)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#97A884]/20 font-medium">
                    {movimientosFiltrados.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-4 text-center text-[#97A884] italic">
                          No hay movimientos registrados para este filtro.
                        </td>
                      </tr>
                    ) : (
                      movimientosFiltrados.map((m) => (
                        <tr key={m.id} className="hover:bg-[#FAF8F5] transition">
                          <td className="p-3 font-mono text-[11px]">{m.fecha}</td>
                          <td className="p-3 uppercase font-bold text-[10px]">
                            {m.app === 'casamatriz' ? 'Casa Matriz' : m.app === 'lawenmoll' ? 'LAWENMOLL' : m.app === 'wellness' ? 'Wellness App' : 'Bienestar'}
                          </td>
                          <td className="p-3">{m.categoria}</td>
                          <td className="p-3 font-semibold">{m.concepto}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-md font-bold text-[9px] ${
                              m.estado === 'Pagado' ? 'bg-green-100 text-green-800' : m.estado === 'Facturado' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {m.estado}
                            </span>
                          </td>
                          <td className={`p-3 text-right font-bold font-mono ${m.tipo === 'ingreso' ? 'text-green-700' : 'text-red-600'}`}>
                            {m.tipo === 'ingreso' ? '+' : '-'} $ {m.monto.toLocaleString('es-CL')}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}