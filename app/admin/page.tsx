'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Transaccion {
  id: string;
  fecha: string;
  app: 'casamatriz' | 'lawenmoll' | 'wellness' | 'bienestar';
  tipo: 'ingreso' | 'egreso';
  categoria: 'Licencia B2B' | 'Consulta / Ficha' | 'Suscripción' | 'Servidores / TI' | 'Caja Chica / Viajes' | 'Impuestos';
  concepto: string;
  monto: number;
  comprobante: string;
  estado: 'Pagado' | 'Facturado' | 'Pendiente' | 'Anulado';
}

interface GastoCajaChica {
  id: string;
  fecha: string;
  responsable: string;
  motivo: string;
  monto: number;
  comprobante: string;
  archivoUrl?: string;
  archivoNombre?: string;
  observaciones?: string;
}

export default function AdminPage() {
  const [seccion, setSeccion] = useState<'estadisticas' | 'contabilidad' | 'cajachica' | 'notas' | 'reporte'>('estadisticas');

  // Estado Libro Contable
  const [transacciones, setTransacciones] = useState<Transaccion[]>([
    {
      id: '1',
      fecha: '2026-10-15',
      app: 'casamatriz',
      tipo: 'ingreso',
      categoria: 'Licencia B2B',
      concepto: 'Convenio Licencia Software Accesibilidad Municipalidad',
      monto: 3500000,
      comprobante: 'Factura Electrónica N° 104',
      estado: 'Pagado',
    },
    {
      id: '2',
      fecha: '2026-10-18',
      app: 'lawenmoll',
      tipo: 'ingreso',
      categoria: 'Consulta / Ficha',
      concepto: 'Fichas Clínicas SOAP y Consultas Salud Integrativa',
      monto: 850000,
      comprobante: 'Boleta N° 4501',
      estado: 'Pagado',
    },
    {
      id: '3',
      fecha: '2026-10-22',
      app: 'wellness',
      tipo: 'ingreso',
      categoria: 'Suscripción',
      concepto: 'Membresías Programa Movimiento Adaptado',
      monto: 420000,
      comprobante: 'Transbank Voucher #882',
      estado: 'Pagado',
    },
    {
      id: '4',
      fecha: '2026-10-25',
      app: 'casamatriz',
      tipo: 'egreso',
      categoria: 'Servidores / TI',
      concepto: 'Infraestructura Cloud Vercel y Supabase',
      monto: 145000,
      comprobante: 'Factura Vercel Inc. #992',
      estado: 'Pagado',
    },
  ]);

  // Formulario Libro Diario
  const [fecha, setFecha] = useState<string>(new Date().toISOString().split('T')[0]);
  const [app, setApp] = useState<Transaccion['app']>('casamatriz');
  const [tipo, setTipo] = useState<Transaccion['tipo']>('ingreso');
  const [categoria, setCategoria] = useState<Transaccion['categoria']>('Licencia B2B');
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [comprobante, setComprobante] = useState('');

  // Estado Caja Chica
  const [fondoCajaChica] = useState(300000);
  const [cajaChicaList, setCajaChicaList] = useState<GastoCajaChica[]>([
    {
      id: '101',
      fecha: '2026-10-26',
      responsable: 'Equipo Directivo ASL',
      motivo: 'Pasajes y Viático Reunión B2B Convenio Municipal',
      monto: 45000,
      comprobante: 'Boleta Copec N° 8812',
      archivoNombre: 'Boleta_Bencina_8812.pdf',
      observaciones: 'Viaje de prospección comercial licitación municipal.'
    },
  ]);

  const [respCaja, setRespCaja] = useState('');
  const [motivoCaja, setMotivoCaja] = useState('');
  const [montoCaja, setMontoCaja] = useState('');
  const [compCaja, setCompCaja] = useState('');
  const [obsCaja, setObsCaja] = useState('');
  const [archivoAdjunto, setArchivoAdjunto] = useState<File | null>(null);

  // Estado Notas y Fuentes de Respaldo
  const [notasList, setNotasList] = useState<string[]>([
    'Nota Contable 01: Revisión de facturación electrónica mensual realizada con S.I.I.',
    'Nota de Respaldo 02: Rendición de caja chica correspondiente a traslados autorizados.'
  ]);
  const [nuevaNota, setNuevaNota] = useState('');

  // Previsualizador de Documentos
  const [archivoPrevisualizar, setArchivoPrevisualizar] = useState<{ url: string; nombre: string } | null>(null);

  // Funciones para Anular / Eliminar
  const eliminarTransaccion = (id: string) => {
    if (confirm('¿Estás seguro de anular/eliminar este registro contable?')) {
      setTransacciones(prev => prev.filter(t => t.id !== id));
    }
  };

  const eliminarGastoCajaChica = (id: string) => {
    if (confirm('¿Estás seguro de anular/eliminar este gasto de Caja Chica?')) {
      setCajaChicaList(prev => prev.filter(c => c.id !== id));
    }
  };

  // Cálculos Financieros Generales
  const transaccionesValidas = transacciones.filter(t => t.estado !== 'Anulado');
  const totalIngresos = transaccionesValidas.filter(t => t.tipo === 'ingreso').reduce((a, c) => a + c.monto, 0);
  const totalEgresos = transaccionesValidas.filter(t => t.tipo === 'egreso').reduce((a, c) => a + c.monto, 0);
  const totalCajaChicaUsado = cajaChicaList.reduce((a, c) => a + c.monto, 0);
  const saldoCajaChicaDisponible = fondoCajaChica - totalCajaChicaUsado;
  const balanceNetoGlobal = totalIngresos - (totalEgresos + totalCajaChicaUsado);

  const ingresosPorApp = {
    casamatriz: transaccionesValidas.filter(t => t.app === 'casamatriz' && t.tipo === 'ingreso').reduce((a, c) => a + c.monto, 0),
    lawenmoll: transaccionesValidas.filter(t => t.app === 'lawenmoll' && t.tipo === 'ingreso').reduce((a, c) => a + c.monto, 0),
    wellness: transaccionesValidas.filter(t => t.app === 'wellness' && t.tipo === 'ingreso').reduce((a, c) => a + c.monto, 0),
    bienestar: transaccionesValidas.filter(t => t.app === 'bienestar' && t.tipo === 'ingreso').reduce((a, c) => a + c.monto, 0),
  };

  const handleAgregarTransaccion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concepto || !monto) return;
    const nueva: Transaccion = {
      id: Date.now().toString(),
      fecha,
      app,
      tipo,
      categoria,
      concepto,
      monto: Number(monto),
      comprobante: comprobante || 'Sin Comprobante',
      estado: 'Pagado',
    };
    setTransacciones([nueva, ...transacciones]);
    setConcepto('');
    setMonto('');
    setComprobante('');
  };

  const handleAgregarCajaChica = (e: React.FormEvent) => {
    e.preventDefault();
    if (!motivoCaja || !montoCaja) return;

    let urlObj = '';
    if (archivoAdjunto) {
      urlObj = URL.createObjectURL(archivoAdjunto);
    }

    const nuevoGasto: GastoCajaChica = {
      id: Date.now().toString(),
      fecha: new Date().toISOString().split('T')[0],
      responsable: respCaja || 'Dirección General',
      motivo: motivoCaja,
      monto: Number(montoCaja),
      comprobante: compCaja || 'Boleta / Factura Adjunta',
      archivoUrl: urlObj,
      archivoNombre: archivoAdjunto ? archivoAdjunto.name : undefined,
      observaciones: obsCaja || undefined,
    };

    setCajaChicaList([nuevoGasto, ...cajaChicaList]);
    setMotivoCaja('');
    setMontoCaja('');
    setCompCaja('');
    setObsCaja('');
    setArchivoAdjunto(null);
  };

  const handleAgregarNota = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevaNota.trim()) {
      setNotasList([...notasList, `[${new Date().toLocaleDateString('es-CL')}] ${nuevaNota.trim()}`]);
      setNuevaNota('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#676E5E] p-3 sm:p-8">
      <div className="max-w-6xl mx-auto bg-[#E6E7D5] rounded-3xl border-2 border-[#97A884] shadow-xl overflow-hidden flex flex-col">
        
        {/* Cabecera Corporativa */}
        <div className="p-5 bg-[#E6E7D5] border-b border-[#97A884]/40 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-2xl border-2 border-[#E6C693] p-1 flex items-center justify-center shadow-xs">
              <img src="/logo-asl.png.png" alt="ASL Ideas SpA" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-full border border-[#97A884]">
                ASL Core Center — Consola Financiera
              </span>
              <h1 className="text-lg sm:text-2xl font-black text-[#676E5E] mt-0.5">Control Contable & Flujo de Caja</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="bg-white hover:bg-[#CDD6A9] text-[#676E5E] text-xs font-bold px-3.5 py-2 rounded-xl border border-[#97A884] transition"
            >
              ← Ir al Sitio
            </Link>
            <Link
              href="/sala-virtual"
              className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition"
            >
              Sala Virtual
            </Link>
          </div>
        </div>

        {/* Menú de Navegación Contable */}
        <div className="p-4 bg-[#CDD6A9]/40 border-b border-[#97A884]/30">
          <div className="flex flex-wrap bg-white/70 p-1.5 rounded-2xl border border-[#97A884] text-xs font-bold gap-1">
            <button
              type="button"
              onClick={() => setSeccion('estadisticas')}
              className={`flex-1 py-2.5 rounded-xl transition font-black cursor-pointer ${
                seccion === 'estadisticas' ? 'bg-[#676E5E] text-white' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              📊 Estadísticas
            </button>
            <button
              type="button"
              onClick={() => setSeccion('contabilidad')}
              className={`flex-1 py-2.5 rounded-xl transition font-black cursor-pointer ${
                seccion === 'contabilidad' ? 'bg-[#676E5E] text-white' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              📖 Libro Diario
            </button>
            <button
              type="button"
              onClick={() => setSeccion('cajachica')}
              className={`flex-1 py-2.5 rounded-xl transition font-black cursor-pointer ${
                seccion === 'cajachica' ? 'bg-[#676E5E] text-white' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              ✈️ Caja Chica & Boletas
            </button>
            <button
              type="button"
              onClick={() => setSeccion('notas')}
              className={`flex-1 py-2.5 rounded-xl transition font-black cursor-pointer ${
                seccion === 'notas' ? 'bg-[#676E5E] text-white' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              📝 Notas de Respaldo
            </button>
            <button
              type="button"
              onClick={() => setSeccion('reporte')}
              className={`flex-1 py-2.5 rounded-xl transition font-black cursor-pointer ${
                seccion === 'reporte' ? 'bg-[#676E5E] text-white' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              📄 Reporte PDF
            </button>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="p-5 sm:p-8 space-y-6">

          {/* MÓDULO 1: ESTADÍSTICAS */}
          {seccion === 'estadisticas' && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-white rounded-2xl border-2 border-[#97A884] text-center shadow-xs">
                  <span className="text-[10px] font-bold uppercase text-[#97A884]">1. Casa Matriz B2B</span>
                  <p className="text-lg font-black text-green-800 mt-1">$ {ingresosPorApp.casamatriz.toLocaleString('es-CL')} CLP</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border-2 border-[#97A884] text-center shadow-xs">
                  <span className="text-[10px] font-bold uppercase text-[#97A884]">2. LAWENMOLL Salud</span>
                  <p className="text-lg font-black text-green-800 mt-1">$ {ingresosPorApp.lawenmoll.toLocaleString('es-CL')} CLP</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border-2 border-[#97A884] text-center shadow-xs">
                  <span className="text-[10px] font-bold uppercase text-[#97A884]">3. Wellness Web App</span>
                  <p className="text-lg font-black text-green-800 mt-1">$ {ingresosPorApp.wellness.toLocaleString('es-CL')} CLP</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border-2 border-[#97A884] text-center shadow-xs">
                  <span className="text-[10px] font-bold uppercase text-[#97A884]">4. Bienestar Ancestral</span>
                  <p className="text-lg font-black text-green-800 mt-1">$ {ingresosPorApp.bienestar.toLocaleString('es-CL')} CLP</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-3 shadow-xs">
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#676E5E]">Distribución de Ingresos por Unidad de Negocio</h3>
                <div className="w-full bg-gray-200 h-6 rounded-xl overflow-hidden flex font-bold text-[10px] text-white">
                  <div style={{ width: `${totalIngresos > 0 ? (ingresosPorApp.casamatriz / totalIngresos) * 100 : 25}%` }} className="bg-emerald-700 flex items-center justify-center">
                    B2B ({Math.round(totalIngresos > 0 ? (ingresosPorApp.casamatriz / totalIngresos) * 100 : 0)}%)
                  </div>
                  <div style={{ width: `${totalIngresos > 0 ? (ingresosPorApp.lawenmoll / totalIngresos) * 100 : 25}%` }} className="bg-teal-600 flex items-center justify-center">
                    LAWENMOLL ({Math.round(totalIngresos > 0 ? (ingresosPorApp.lawenmoll / totalIngresos) * 100 : 0)}%)
                  </div>
                  <div style={{ width: `${totalIngresos > 0 ? (ingresosPorApp.wellness / totalIngresos) * 100 : 25}%` }} className="bg-amber-600 flex items-center justify-center">
                    Wellness ({Math.round(totalIngresos > 0 ? (ingresosPorApp.wellness / totalIngresos) * 100 : 0)}%)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MÓDULO 2: LIBRO DIARIO CON BOTÓN DE ANULAR / BORRAR */}
          {seccion === 'contabilidad' && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-2xl border-2 border-[#97A884] text-center">
                  <span className="text-[10px] font-bold uppercase text-green-700">Ingresos Totales (+)</span>
                  <p className="text-xl font-black text-green-800 mt-1">$ {totalIngresos.toLocaleString('es-CL')} CLP</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border-2 border-[#97A884] text-center">
                  <span className="text-[10px] font-bold uppercase text-red-600">Gastos Totales & Caja Chica (-)</span>
                  <p className="text-xl font-black text-red-600 mt-1">$ {(totalEgresos + totalCajaChicaUsado).toLocaleString('es-CL')} CLP</p>
                </div>
                <div className="p-4 bg-[#676E5E] text-white rounded-2xl text-center">
                  <span className="text-[10px] font-bold uppercase text-[#CDD6A9]">Balance Neto Líquido</span>
                  <p className="text-xl font-black mt-1">$ {balanceNetoGlobal.toLocaleString('es-CL')} CLP</p>
                </div>
              </div>

              {/* Formulario Transacciones */}
              <form onSubmit={handleAgregarTransaccion} className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-4">
                <h3 className="font-extrabold uppercase text-xs">Registrar Movimiento en Libro Diario</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Fecha</label>
                    <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl" required />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Unidad / App</label>
                    <select value={app} onChange={e => setApp(e.target.value as any)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl font-bold">
                      <option value="casamatriz">1. Casa Matriz B2B</option>
                      <option value="lawenmoll">2. LAWENMOLL Salud</option>
                      <option value="wellness">3. Wellness Web App</option>
                      <option value="bienestar">4. Bienestar Ancestral</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Tipo</label>
                    <select value={tipo} onChange={e => setTipo(e.target.value as any)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl font-bold">
                      <option value="ingreso">Ingreso (+)</option>
                      <option value="egreso">Egreso (-)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Concepto</label>
                    <input type="text" placeholder="Ej: Pago Licencia Municipal" value={concepto} onChange={e => setConcepto(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl" required />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Monto (CLP)</label>
                    <input type="number" placeholder="1500000" value={monto} onChange={e => setMonto(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl font-mono" required />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Comprobante / N° Factura</label>
                    <input type="text" placeholder="Factura Electrónica N° 105" value={comprobante} onChange={e => setComprobante(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl" />
                  </div>
                </div>

                <button type="submit" className="bg-[#676E5E] text-white font-extrabold px-6 py-2.5 rounded-xl cursor-pointer">
                  + Agregar al Libro Diario
                </button>
              </form>

              {/* Tabla de Transacciones con Opción de Borrar */}
              <div className="bg-white p-5 rounded-3xl border-2 border-[#97A884] overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#CDD6A9]/40 border-b border-[#97A884] text-[10px] uppercase font-black">
                      <th className="p-3">Fecha</th>
                      <th className="p-3">Unidad</th>
                      <th className="p-3">Concepto</th>
                      <th className="p-3">Comprobante</th>
                      <th className="p-3 text-right">Monto (CLP)</th>
                      <th className="p-3 text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#97A884]/20 font-medium">
                    {transacciones.map(t => (
                      <tr key={t.id} className="hover:bg-[#FAF8F5]">
                        <td className="p-3 font-mono">{t.fecha}</td>
                        <td className="p-3 uppercase font-bold text-[10px]">{t.app}</td>
                        <td className="p-3 font-semibold">{t.concepto}</td>
                        <td className="p-3 font-mono text-[10px] text-gray-500">{t.comprobante}</td>
                        <td className={`p-3 text-right font-bold font-mono ${t.tipo === 'ingreso' ? 'text-green-700' : 'text-red-600'}`}>
                          {t.tipo === 'ingreso' ? '+' : '-'} $ {t.monto.toLocaleString('es-CL')}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => eliminarTransaccion(t.id)}
                            className="bg-red-100 hover:bg-red-600 text-red-700 hover:text-white font-extrabold px-2.5 py-1 rounded-lg text-[10px] transition cursor-pointer"
                          >
                            Anular / Borrar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MÓDULO 3: CAJA CHICA CON ADJUNTO Y BOTÓN BORRAR */}
          {seccion === 'cajachica' && (
            <div className="space-y-6 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-2xl border-2 border-[#97A884] text-center">
                  <span className="text-[10px] font-bold uppercase">Fondo Asignado Caja Chica</span>
                  <p className="text-xl font-black text-[#676E5E] mt-1">$ {fondoCajaChica.toLocaleString('es-CL')} CLP</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border-2 border-[#97A884] text-center">
                  <span className="text-[10px] font-bold uppercase text-red-600">Gastado en Viajes / Viáticos</span>
                  <p className="text-xl font-black text-red-600 mt-1">$ {totalCajaChicaUsado.toLocaleString('es-CL')} CLP</p>
                </div>
                <div className="p-4 bg-green-800 text-white rounded-2xl text-center">
                  <span className="text-[10px] font-bold uppercase text-[#CDD6A9]">Saldo Disponible Caja Chica</span>
                  <p className="text-xl font-black mt-1">$ {saldoCajaChicaDisponible.toLocaleString('es-CL')} CLP</p>
                </div>
              </div>

              {/* Formulario Rendición de Caja Chica */}
              <form onSubmit={handleAgregarCajaChica} className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-4">
                <h3 className="font-extrabold uppercase text-xs">Rendir Gasto de Caja Chica (Boleta / Factura / Foto)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Responsable del Gasto</label>
                    <input type="text" placeholder="Ej: Equipo Comercial ASL" value={respCaja} onChange={e => setRespCaja(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl" />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Motivo o Destino del Viaje</label>
                    <input type="text" placeholder="Ej: Bencina Reunión Municipal" value={motivoCaja} onChange={e => setMotivoCaja(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Monto Gastado (CLP)</label>
                    <input type="number" placeholder="25000" value={montoCaja} onChange={e => setMontoCaja(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl font-mono" required />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">N° Boleta / Factura</label>
                    <input type="text" placeholder="Boleta N° 1022" value={compCaja} onChange={e => setCompCaja(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl" />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Subir Archivo de Respaldo</label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={e => e.target.files && setArchivoAdjunto(e.target.files[0])}
                      className="w-full p-2 bg-[#FAF8F5] border border-[#97A884] rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold block mb-1">Observación o Nota Aclaratoria</label>
                  <input type="text" placeholder="Ej: Pasajes autorizados por gerencia para firma de convenio" value={obsCaja} onChange={e => setObsCaja(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl" />
                </div>

                <button type="submit" className="bg-[#676E5E] text-white font-extrabold px-6 py-2.5 rounded-xl cursor-pointer">
                  + Registrar Gasto y Adjuntar Respaldo
                </button>
              </form>

              {/* Lista de Caja Chica con Botón de Borrar y Previsualizar */}
              <div className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-3">
                <h3 className="font-extrabold uppercase text-xs">Planilla de Rendición con Respaldos Digitales</h3>
                {cajaChicaList.map(item => (
                  <div key={item.id} className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#97A884]/40 flex flex-wrap justify-between items-center text-xs gap-2">
                    <div>
                      <p className="font-bold text-[#676E5E]">{item.motivo}</p>
                      <span className="text-[10px] text-gray-500 font-mono">{item.fecha} • {item.responsable} • {item.comprobante}</span>
                      {item.archivoNombre && (
                        <p className="text-[10px] font-semibold text-green-700 mt-0.5">
                          📎 Respaldo: {item.archivoNombre}
                        </p>
                      )}
                      {item.observaciones && (
                        <p className="text-[10px] text-gray-600 italic mt-0.5">💬 Nota: {item.observaciones}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-black text-red-600 font-mono text-sm mr-2">
                        - $ {item.monto.toLocaleString('es-CL')} CLP
                      </span>

                      {item.archivoUrl && (
                        <button
                          type="button"
                          onClick={() => setArchivoPrevisualizar({ url: item.archivoUrl!, nombre: item.archivoNombre || 'Respaldo' })}
                          className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white font-extrabold px-3 py-1 rounded-xl text-[10px] transition cursor-pointer"
                        >
                          Ver Respaldo
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => eliminarGastoCajaChica(item.id)}
                        className="bg-red-100 hover:bg-red-600 text-red-700 hover:text-white font-extrabold px-2.5 py-1 rounded-lg text-[10px] transition cursor-pointer"
                      >
                        Anular
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MÓDULO 4: NOTAS DE RESPALDO Y FUENTES AÑADIDAS */}
          {seccion === 'notas' && (
            <div className="bg-white p-6 rounded-3xl border-2 border-[#97A884] space-y-5 text-xs">
              <h3 className="font-extrabold uppercase text-xs tracking-wider">Bitácora & Notas de Respaldo Administrativo</h3>
              
              <form onSubmit={handleAgregarNota} className="space-y-3">
                <textarea
                  value={nuevaNota}
                  onChange={e => setNuevaNota(e.target.value)}
                  placeholder="Escribe una observación, aclaración contable o fuente de referencia para los contadores..."
                  className="w-full h-24 p-3 bg-[#FAF8F5] border border-[#97A884] rounded-2xl outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#676E5E] text-white font-bold px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  + Añadir Nota de Respaldo
                </button>
              </form>

              <div className="space-y-2 pt-2 border-t border-[#97A884]/30">
                <h4 className="font-bold text-xs">Notas Registradas:</h4>
                {notasList.map((nota, idx) => (
                  <div key={idx} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#97A884]/40 font-medium text-xs flex justify-between items-center">
                    <p>{nota}</p>
                    <button
                      type="button"
                      onClick={() => setNotasList(notasList.filter((_, i) => i !== idx))}
                      className="text-red-700 font-bold text-[10px] bg-red-100 px-2 py-0.5 rounded-md"
                    >
                      Quitar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MÓDULO 5: REPORTE IMPRIMIBLE PARA CONTADORES */}
          {seccion === 'reporte' && (
            <div className="bg-white p-6 sm:p-10 rounded-3xl border-2 border-[#97A884] space-y-6 text-xs">
              <div className="flex justify-between items-center border-b-2 border-[#97A884] pb-5">
                <div className="flex items-center space-x-4">
                  <img src="/logo-asl.png.png" alt="ASL Ideas SpA" className="w-14 h-14 object-contain" />
                  <div>
                    <h2 className="text-xl font-black text-[#676E5E]">ASL IDEAS SpA</h2>
                    <p className="text-[10px] font-bold text-[#97A884] uppercase">RUT: 77.XXX.XXX-K • Salud Digital Inclusiva</p>
                    <p className="text-[10px] text-gray-500">Ley N° 21.663 Ciberseguridad & Ley TEA N° 21.545</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="bg-[#CDD6A9] text-[#676E5E] font-extrabold px-3 py-1 rounded-full text-[10px]">
                    INFORME CONTABLE OFICIAL
                  </span>
                  <p className="text-[10px] font-mono mt-1">Fecha Emisión: {new Date().toLocaleDateString('es-CL')}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold uppercase text-xs tracking-wider text-[#676E5E]">1. BALANCE GENERAL DE OPERACIONES</h3>
                <div className="grid grid-cols-3 gap-4 p-4 bg-[#FAF8F5] rounded-2xl border border-[#97A884]/40 text-center font-mono">
                  <div>
                    <span className="text-[10px] text-gray-500 block">TOTAL INGRESOS</span>
                    <strong className="text-green-700 text-sm">$ {totalIngresos.toLocaleString('es-CL')}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">GASTOS & CAJA CHICA</span>
                    <strong className="text-red-600 text-sm">$ {(totalEgresos + totalCajaChicaUsado).toLocaleString('es-CL')}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">MARGEN NETO OPERATIVO</span>
                    <strong className="text-[#676E5E] text-sm">$ {balanceNetoGlobal.toLocaleString('es-CL')}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#97A884]/30">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-[#676E5E] hover:bg-[#52584b] text-white font-extrabold px-6 py-3 rounded-2xl transition cursor-pointer shadow-md"
                >
                  🖨️ Imprimir o Guardar como PDF
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* VISUALIZADOR MODAL DE BOLETAS / FACTURAS */}
      {archivoPrevisualizar && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-[#E6E7D5] max-w-2xl w-full rounded-3xl border-2 border-[#97A884] p-5 space-y-4 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center border-b border-[#97A884]/40 pb-3">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2 py-0.5 rounded-md border border-[#97A884]">
                  Respaldo de Caja Chica
                </span>
                <h4 className="font-black text-[#676E5E] text-sm mt-0.5 truncate max-w-md">
                  {archivoPrevisualizar.nombre}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setArchivoPrevisualizar(null)}
                className="bg-[#DC8D6C] text-white font-bold text-xs px-3.5 py-1.5 rounded-xl cursor-pointer"
              >
                Cerrar
              </button>
            </div>

            <div className="flex-1 bg-white rounded-2xl border border-[#97A884] overflow-hidden min-h-[300px] flex items-center justify-center p-2">
              <iframe 
                src={archivoPrevisualizar.url} 
                title={archivoPrevisualizar.nombre}
                className="w-full h-full min-h-[320px] border-0 rounded-xl"
              />
            </div>

            <div className="flex justify-end">
              <a
                href={archivoPrevisualizar.url}
                download={archivoPrevisualizar.nombre}
                className="bg-[#676E5E] text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Descargar Documento
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}