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
  esImagen?: boolean;
  observaciones?: string;
}

export default function AdminPage() {
  const [seccion, setSeccion] = useState<'estadisticas' | 'contabilidad' | 'cajachica' | 'notas' | 'pyme' | 'reporte'>('cajachica');

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
      esImagen: false,
      observaciones: 'Viaje de prospección comercial licitación municipal.'
    },
  ]);

  // Formulario y Estados de Edición de Caja Chica
  const [editandoCajaId, setEditandoCajaId] = useState<string | null>(null);
  const [respCaja, setRespCaja] = useState('');
  const [motivoCaja, setMotivoCaja] = useState('');
  const [montoCaja, setMontoCaja] = useState('');
  const [compCaja, setCompCaja] = useState('');
  const [obsCaja, setObsCaja] = useState('');
  const [archivoAdjunto, setArchivoAdjunto] = useState<File | null>(null);
  const [previewUrlForm, setPreviewUrlForm] = useState<string | null>(null);

  // Estado Notas y Fuentes de Respaldo
  const [notasList, setNotasList] = useState<string[]>([
    'Nota Contable 01: Revisión de facturación electrónica mensual realizada con S.I.I.',
  ]);
  const [nuevaNota, setNuevaNota] = useState('');

  // Modal para Ver Archivo a Pantalla Completa
  const [archivoPrevisualizar, setArchivoPrevisualizar] = useState<{ url: string; nombre: string; esImagen: boolean } | null>(null);

  // Captura de archivo con previsualización inmediata en el formulario
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setArchivoAdjunto(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrlForm(url);
    }
  };

  const eliminarGastoCajaChica = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este registro de Caja Chica?')) {
      setCajaChicaList(prev => prev.filter(c => c.id !== id));
      if (editandoCajaId === id) cancelarEdicionCaja();
    }
  };

  const iniciarEdicionCaja = (item: GastoCajaChica) => {
    setEditandoCajaId(item.id);
    setRespCaja(item.responsable);
    setMotivoCaja(item.motivo);
    setMontoCaja(item.monto.toString());
    setCompCaja(item.comprobante);
    setObsCaja(item.observaciones || '');
    if (item.archivoUrl) {
      setPreviewUrlForm(item.archivoUrl);
    } else {
      setPreviewUrlForm(null);
    }
  };

  const cancelarEdicionCaja = () => {
    setEditandoCajaId(null);
    setRespCaja('');
    setMotivoCaja('');
    setMontoCaja('');
    setCompCaja('');
    setObsCaja('');
    setArchivoAdjunto(null);
    setPreviewUrlForm(null);
  };

  const handleAgregarOEditarCajaChica = (e: React.FormEvent) => {
    e.preventDefault();
    if (!motivoCaja || !montoCaja) return;

    let urlObj = previewUrlForm || '';
    let nombreArchivo = archivoAdjunto ? archivoAdjunto.name : '';
    let esImg = archivoAdjunto ? archivoAdjunto.type.startsWith('image/') : false;

    if (editandoCajaId) {
      setCajaChicaList(prev =>
        prev.map(item => {
          if (item.id === editandoCajaId) {
            return {
              ...item,
              responsable: respCaja || 'Dirección General',
              motivo: motivoCaja,
              monto: Number(montoCaja),
              comprobante: compCaja || item.comprobante,
              observaciones: obsCaja || item.observaciones,
              ...(urlObj && {
                archivoUrl: urlObj,
                archivoNombre: nombreArchivo || item.archivoNombre,
                esImagen: archivoAdjunto ? esImg : item.esImagen,
              }),
            };
          }
          return item;
        })
      );
      cancelarEdicionCaja();
    } else {
      const nuevoGasto: GastoCajaChica = {
        id: Date.now().toString(),
        fecha: new Date().toISOString().split('T')[0],
        responsable: respCaja || 'Dirección General',
        motivo: motivoCaja,
        monto: Number(montoCaja),
        comprobante: compCaja || 'Boleta / Factura Adjunta',
        archivoUrl: urlObj || undefined,
        archivoNombre: nombreArchivo || undefined,
        esImagen: esImg,
        observaciones: obsCaja || undefined,
      };

      setCajaChicaList([nuevoGasto, ...cajaChicaList]);
      cancelarEdicionCaja();
    }
  };

  const eliminarTransaccion = (id: string) => {
    if (confirm('¿Estás seguro de anular/eliminar este registro contable?')) {
      setTransacciones(prev => prev.filter(t => t.id !== id));
    }
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

  const handleAgregarNota = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevaNota.trim()) {
      setNotasList([...notasList, `[${new Date().toLocaleDateString('es-CL')}] ${nuevaNota.trim()}`]);
      setNuevaNota('');
    }
  };

  // Cálculos Financieros
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

  const maxIngresoApp = Math.max(ingresosPorApp.casamatriz, ingresosPorApp.lawenmoll, ingresosPorApp.wellness, ingresosPorApp.bienestar, 1);

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

        {/* Menú de Navegación Contable y PYME */}
        <div className="p-4 bg-[#CDD6A9]/40 border-b border-[#97A884]/30">
          <div className="flex flex-wrap bg-white/70 p-1.5 rounded-2xl border border-[#97A884] text-xs font-bold gap-1">
            <button
              type="button"
              onClick={() => setSeccion('estadisticas')}
              className={`flex-1 py-2.5 rounded-xl transition font-black cursor-pointer ${
                seccion === 'estadisticas' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              📊 Gráficos & Estadísticas
            </button>
            <button
              type="button"
              onClick={() => setSeccion('contabilidad')}
              className={`flex-1 py-2.5 rounded-xl transition font-black cursor-pointer ${
                seccion === 'contabilidad' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              📖 Libro Diario
            </button>
            <button
              type="button"
              onClick={() => setSeccion('cajachica')}
              className={`flex-1 py-2.5 rounded-xl transition font-black cursor-pointer ${
                seccion === 'cajachica' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              ✈️ Caja Chica & Respaldo
            </button>
            <button
              type="button"
              onClick={() => setSeccion('notas')}
              className={`flex-1 py-2.5 rounded-xl transition font-black cursor-pointer ${
                seccion === 'notas' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              📝 Bitácora & Respaldos
            </button>
            <button
              type="button"
              onClick={() => setSeccion('pyme')}
              className={`flex-1 py-2.5 rounded-xl transition font-black cursor-pointer ${
                seccion === 'pyme' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              🏛️ Trámites & Herramientas PYME
            </button>
            <button
              type="button"
              onClick={() => setSeccion('reporte')}
              className={`flex-1 py-2.5 rounded-xl transition font-black cursor-pointer ${
                seccion === 'reporte' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:bg-white/80'
              }`}
            >
              📄 Reporte PDF
            </button>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="p-5 sm:p-8 space-y-6">

          {/* MÓDULO 1: ESTADÍSTICAS Y GRÁFICOS VISUALES */}
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

              <div className="bg-white p-6 rounded-3xl border-2 border-[#97A884] space-y-4 shadow-sm">
                <div className="flex justify-between items-center border-b border-[#97A884]/30 pb-3">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#676E5E]">
                    📊 Gráfico de Ingresos por Unidad de Negocio (CLP)
                  </h3>
                  <span className="text-[10px] bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-full font-bold">
                    Actualizado
                  </span>
                </div>

                <div className="h-56 w-full flex items-end justify-around pt-6 pb-2 px-4 bg-[#FAF8F5] rounded-2xl border border-[#97A884]/40">
                  <div className="flex flex-col items-center h-full justify-end w-1/5 group">
                    <span className="text-[10px] font-bold text-emerald-800 mb-1 font-mono">
                      $ {ingresosPorApp.casamatriz.toLocaleString('es-CL')}
                    </span>
                    <div 
                      className="w-full bg-emerald-700 rounded-t-xl transition-all duration-500 shadow-md group-hover:bg-emerald-800"
                      style={{ height: `${Math.max((ingresosPorApp.casamatriz / maxIngresoApp) * 100, 10)}%` }}
                    />
                    <span className="text-[10px] font-extrabold text-[#676E5E] mt-2 text-center truncate w-full">
                      Casa Matriz B2B
                    </span>
                  </div>

                  <div className="flex flex-col items-center h-full justify-end w-1/5 group">
                    <span className="text-[10px] font-bold text-teal-800 mb-1 font-mono">
                      $ {ingresosPorApp.lawenmoll.toLocaleString('es-CL')}
                    </span>
                    <div 
                      className="w-full bg-teal-600 rounded-t-xl transition-all duration-500 shadow-md group-hover:bg-teal-700"
                      style={{ height: `${Math.max((ingresosPorApp.lawenmoll / maxIngresoApp) * 100, 10)}%` }}
                    />
                    <span className="text-[10px] font-extrabold text-[#676E5E] mt-2 text-center truncate w-full">
                      LAWENMOLL
                    </span>
                  </div>

                  <div className="flex flex-col items-center h-full justify-end w-1/5 group">
                    <span className="text-[10px] font-bold text-amber-800 mb-1 font-mono">
                      $ {ingresosPorApp.wellness.toLocaleString('es-CL')}
                    </span>
                    <div 
                      className="w-full bg-amber-600 rounded-t-xl transition-all duration-500 shadow-md group-hover:bg-amber-700"
                      style={{ height: `${Math.max((ingresosPorApp.wellness / maxIngresoApp) * 100, 10)}%` }}
                    />
                    <span className="text-[10px] font-extrabold text-[#676E5E] mt-2 text-center truncate w-full">
                      Wellness App
                    </span>
                  </div>

                  <div className="flex flex-col items-center h-full justify-end w-1/5 group">
                    <span className="text-[10px] font-bold text-gray-800 mb-1 font-mono">
                      $ {ingresosPorApp.bienestar.toLocaleString('es-CL')}
                    </span>
                    <div 
                      className="w-full bg-[#676E5E] rounded-t-xl transition-all duration-500 shadow-md group-hover:bg-[#52584b]"
                      style={{ height: `${Math.max((ingresosPorApp.bienestar / maxIngresoApp) * 100, 10)}%` }}
                    />
                    <span className="text-[10px] font-extrabold text-[#676E5E] mt-2 text-center truncate w-full">
                      Bienestar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MÓDULO 2: LIBRO DIARIO */}
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

              {/* Formulario Libro Diario */}
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

              {/* Tabla Libro Diario */}
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
                            className="bg-red-100 hover:bg-red-600 text-red-700 hover:text-white font-bold px-2 py-0.5 rounded text-[10px] transition cursor-pointer"
                          >
                            Anular
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MÓDULO 3: CAJA CHICA CON VISUALIZACIÓN EN VIVO DE ARCHIVOS */}
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

              {/* Formulario Caja Chica con Vista Previa en Vivo */}
              <form onSubmit={handleAgregarOEditarCajaChica} className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-4 shadow-sm">
                <div className="flex justify-between items-center border-b border-[#97A884]/30 pb-2">
                  <h3 className="font-extrabold uppercase text-xs text-[#676E5E]">
                    {editandoCajaId ? '✏️ Editando Rendición de Gasto' : '➕ Rendir Gasto de Caja Chica (Boleta / Factura)'}
                  </h3>
                  {editandoCajaId && (
                    <button
                      type="button"
                      onClick={cancelarEdicionCaja}
                      className="bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded-lg text-[10px]"
                    >
                      Cancelar Edición
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold block mb-1">Responsable del Gasto</label>
                    <input type="text" placeholder="Ej: Equipo Comercial ASL" value={respCaja} onChange={e => setRespCaja(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl" />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Motivo / Viático</label>
                    <input type="text" placeholder="Ej: Pasajes / Bencina Reunión Municipal" value={motivoCaja} onChange={e => setMotivoCaja(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl" required />
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
                    <label className="font-bold block mb-1">Subir Foto o PDF (Respaldo)</label>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleFileChange}
                      className="w-full p-2 bg-[#FAF8F5] border border-[#97A884] rounded-xl text-xs"
                    />
                  </div>
                </div>

                {/* ZONA DE PREVISUALIZACIÓN INSTANTÁNEA ANTES DE GUARDAR */}
                {previewUrlForm && (
                  <div className="p-3 bg-[#FAF8F5] rounded-2xl border-2 border-dashed border-[#97A884] space-y-2">
                    <span className="text-[10px] font-bold text-green-800 uppercase block">
                      👁️ Vista Previa del Archivo Seleccionado:
                    </span>
                    <div className="max-h-48 overflow-hidden rounded-xl border border-gray-300 flex items-center justify-center bg-white p-2">
                      {archivoAdjunto?.type.startsWith('image/') ? (
                        <img src={previewUrlForm} alt="Previsualización" className="max-h-44 object-contain rounded-lg" />
                      ) : (
                        <div className="p-4 text-center">
                          <span className="text-2xl block">📄</span>
                          <p className="font-bold text-xs text-[#676E5E]">{archivoAdjunto?.name || 'Documento PDF Adjunto'}</p>
                          <span className="text-[10px] text-gray-500">Documento listo para guardar</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <label className="font-bold block mb-1">Observaciones o Notas de Referencia</label>
                  <input type="text" placeholder="Ej: Traslado autorizado por gerencia para firma de convenio" value={obsCaja} onChange={e => setObsCaja(e.target.value)} className="w-full p-2.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl" />
                </div>

                <button type="submit" className="bg-[#676E5E] text-white font-extrabold px-6 py-2.5 rounded-xl cursor-pointer">
                  {editandoCajaId ? '💾 Guardar Cambios' : '+ Registrar Gasto y Adjuntar Documento'}
                </button>
              </form>

              {/* LISTA DE RENDICIONES CON VISUALIZACIÓN DIRECTA */}
              <div className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-3">
                <h3 className="font-extrabold uppercase text-xs text-[#676E5E]">Planilla de Rendición con Respaldos Digitales</h3>
                {cajaChicaList.map(item => (
                  <div key={item.id} className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#97A884]/40 flex flex-wrap justify-between items-center text-xs gap-3">
                    <div className="flex items-start space-x-3">
                      
                      {/* MINIATURA VISUAL SI ES IMAGEN */}
                      {item.archivoUrl && item.esImagen && (
                        <div className="w-14 h-14 bg-white rounded-xl border border-[#97A884] overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
                          <img src={item.archivoUrl} alt={item.archivoNombre || 'Respaldo'} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <div className="space-y-0.5">
                        <p className="font-bold text-[#676E5E] text-sm">{item.motivo}</p>
                        <span className="text-[10px] text-gray-500 font-mono block">
                          Fecha: {item.fecha} • Resp: {item.responsable} • Doc: {item.comprobante}
                        </span>
                        {item.archivoNombre && (
                          <span className="text-[10px] font-bold text-green-800 bg-green-50 px-2 py-0.5 rounded-md border border-green-200 inline-block mt-1">
                            📎 Respaldo Digital: {item.archivoNombre}
                          </span>
                        )}
                        {item.observaciones && (
                          <p className="text-[10px] text-gray-600 italic">💬 Nota: {item.observaciones}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-black text-red-600 font-mono text-base mr-2">
                        - $ {item.monto.toLocaleString('es-CL')} CLP
                      </span>

                      {/* BOTÓN VER ARCHIVO PANTALLA COMPLETA */}
                      {item.archivoUrl && (
                        <button
                          type="button"
                          onClick={() => setArchivoPrevisualizar({ 
                            url: item.archivoUrl!, 
                            nombre: item.archivoNombre || 'Respaldo Digital',
                            esImagen: !!item.esImagen
                          })}
                          className="bg-[#CDD6A9] hover:bg-[#97A884] hover:text-white text-[#676E5E] font-bold px-3 py-1.5 rounded-xl text-[10px] transition cursor-pointer"
                        >
                          👁️ Ver Respaldo
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => iniciarEdicionCaja(item)}
                        className="bg-amber-100 hover:bg-amber-600 text-amber-800 hover:text-white font-extrabold px-3 py-1.5 rounded-xl text-[10px] transition cursor-pointer"
                      >
                        ✏️ Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => eliminarGastoCajaChica(item.id)}
                        className="bg-red-100 hover:bg-red-600 text-red-700 hover:text-white font-extrabold px-3 py-1.5 rounded-xl text-[10px] transition cursor-pointer"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MÓDULO 4: BITÁCORA Y NOTAS DE RESPALDO */}
          {seccion === 'notas' && (
            <div className="bg-white p-6 rounded-3xl border-2 border-[#97A884] space-y-5 text-xs">
              <h3 className="font-extrabold uppercase text-xs tracking-wider">Bitácora & Notas de Respaldo Administrativo</h3>
              
              <form onSubmit={handleAgregarNota} className="space-y-3">
                <textarea
                  value={nuevaNota}
                  onChange={e => setNuevaNota(e.target.value)}
                  placeholder="Escribe una observación contable, referencia de boleta o nota para el equipo directivo/contadores..."
                  className="w-full h-24 p-3 bg-[#FAF8F5] border border-[#97A884] rounded-2xl outline-none text-xs"
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
                      className="text-red-700 font-bold text-[10px] bg-red-100 px-2 py-0.5 rounded-md cursor-pointer"
                    >
                      Quitar
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MÓDULO 5: HERRAMIENTAS Y TRÁMITES INSTITUCIONALES CON ENLACES FUNCIONALES */}
          {seccion === 'pyme' && (
            <div className="space-y-5 text-xs">
              <div className="bg-white p-6 rounded-3xl border-2 border-[#97A884] space-y-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-full border border-[#97A884]">
                  Ecosistema de Trámites Oficiales
                </span>
                <h3 className="text-base font-black text-[#676E5E]">
                  Plataformas Requeridas para Registro & Operación de ASL Ideas SpA
                </h3>
                <p className="text-gray-600">
                  Accesos directos a las instituciones del Estado y servicios requeridos para la formalización contable, tributaria y operativa de la PYME.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* 1. Tu Empresa en un Día */}
                <div className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-3 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl">🏢</span>
                      <span className="bg-blue-100 text-blue-800 font-bold text-[9px] px-2 py-0.5 rounded-full">Constitución</span>
                    </div>
                    <h4 className="font-black text-sm text-[#676E5E] mt-2">Tu Empresa en un Día (RES)</h4>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Gestión de estatutos, RUT provisorio y registro de firma electrónica de la SpA.
                    </p>
                  </div>
                  <a
                    href="[suspicious link removed]"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-[#FAF8F5] hover:bg-[#CDD6A9] text-[#676E5E] font-bold p-2 rounded-xl border border-[#97A884] transition text-[11px]"
                  >
                    Ir al Portal Oficial →
                  </a>
                </div>

                {/* 2. S.I.I. */}
                <div className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-3 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl">📄</span>
                      <span className="bg-green-100 text-green-800 font-bold text-[9px] px-2 py-0.5 rounded-full">Tributaria</span>
                    </div>
                    <h4 className="font-black text-sm text-[#676E5E] mt-2">Servicio de Impuestos Internos (S.I.I.)</h4>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Inicio de Actividades, emisión de Facturación Electrónica y declaración mensual F29.
                    </p>
                  </div>
                  <a
                    href="[suspicious link removed]"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-[#FAF8F5] hover:bg-[#CDD6A9] text-[#676E5E] font-bold p-2 rounded-xl border border-[#97A884] transition text-[11px]"
                  >
                    Ir al SII →
                  </a>
                </div>

                {/* 3. TGR */}
                <div className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-3 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl">🏛️</span>
                      <span className="bg-amber-100 text-amber-800 font-bold text-[9px] px-2 py-0.5 rounded-full">Finanzas Públicas</span>
                    </div>
                    <h4 className="font-black text-sm text-[#676E5E] mt-2">Tesorería General (TGR)</h4>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Pago de impuestos diferidos, patente municipal y certificados de deuda fiscal.
                    </p>
                  </div>
                  <a
                    href="[suspicious link removed]"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-[#FAF8F5] hover:bg-[#CDD6A9] text-[#676E5E] font-bold p-2 rounded-xl border border-[#97A884] transition text-[11px]"
                  >
                    Ir a TGR →
                  </a>
                </div>

                {/* 4. Previred */}
                <div className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-3 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl">💼</span>
                      <span className="bg-purple-100 text-purple-800 font-bold text-[9px] px-2 py-0.5 rounded-full">Previsional</span>
                    </div>
                    <h4 className="font-black text-sm text-[#676E5E] mt-2">Previred</h4>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Declaración y pago de cotizaciones previsionales del equipo y fundadores.
                    </p>
                  </div>
                  <a
                    href="[suspicious link removed]"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-[#FAF8F5] hover:bg-[#CDD6A9] text-[#676E5E] font-bold p-2 rounded-xl border border-[#97A884] transition text-[11px]"
                  >
                    Ir a Previred →
                  </a>
                </div>

                {/* 5. CORFO / SERCOTEC */}
                <div className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-3 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl">🚀</span>
                      <span className="bg-emerald-100 text-emerald-800 font-bold text-[9px] px-2 py-0.5 rounded-full">Financiamiento</span>
                    </div>
                    <h4 className="font-black text-sm text-[#676E5E] mt-2">CORFO & SERCOTEC</h4>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Postulación a fondos públicos para innovación en salud digital e inclusión.
                    </p>
                  </div>
                  <a
                    href="[suspicious link removed]"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-[#FAF8F5] hover:bg-[#CDD6A9] text-[#676E5E] font-bold p-2 rounded-xl border border-[#97A884] transition text-[11px]"
                  >
                    Ir a CORFO →
                  </a>
                </div>

                {/* 6. Infraestructura Vercel & Supabase */}
                <div className="bg-white p-5 rounded-3xl border-2 border-[#97A884] space-y-3 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl">☁️</span>
                      <span className="bg-gray-100 text-gray-800 font-bold text-[9px] px-2 py-0.5 rounded-full">TI & Cloud</span>
                    </div>
                    <h4 className="font-black text-sm text-[#676E5E] mt-2">Vercel & Supabase Cloud</h4>
                    <p className="text-[11px] text-gray-500 mt-1">
                      Servidores y base de datos con encriptación bajo la Ley N° 21.663.
                    </p>
                  </div>
                  <a
                    href="[suspicious link removed]"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-[#FAF8F5] hover:bg-[#CDD6A9] text-[#676E5E] font-bold p-2 rounded-xl border border-[#97A884] transition text-[11px]"
                  >
                    Ir a Vercel →
                  </a>
                </div>

              </div>
            </div>
          )}

          {/* MÓDULO 6: REPORTE IMPRIMIBLE PARA CONTADORES */}
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

      {/* MODAL PARA VER ARCHIVOS A PANTALLA COMPLETA */}
      {archivoPrevisualizar && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-[#E6E7D5] max-w-3xl w-full rounded-3xl border-2 border-[#97A884] p-5 space-y-4 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center border-b border-[#97A884]/40 pb-3">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2 py-0.5 rounded-md border border-[#97A884]">
                  Respaldo Digital Adjunto
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

            <div className="flex-1 bg-white rounded-2xl border border-[#97A884] overflow-hidden min-h-[320px] flex items-center justify-center p-2">
              {archivoPrevisualizar.esImagen ? (
                <img 
                  src={archivoPrevisualizar.url} 
                  alt={archivoPrevisualizar.nombre} 
                  className="max-h-[60vh] object-contain rounded-xl shadow-xs"
                />
              ) : (
                <iframe 
                  src={archivoPrevisualizar.url} 
                  title={archivoPrevisualizar.nombre}
                  className="w-full h-full min-h-[350px] border-0 rounded-xl"
                />
              )}
            </div>

            <div className="flex justify-end gap-2">
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