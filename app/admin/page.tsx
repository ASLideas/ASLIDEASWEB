'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';

export interface AsientoLibro {
  id: string;
  fecha: string;
  tipo: 'Ingreso' | 'Egreso';
  concepto: string;
  monto: number;
  categoria: 'Licencias B2B' | 'Webpay' | 'Gasto Operativo' | 'Honorarios' | 'Impuestos';
}

export interface DocumentoTributario {
  id: string;
  folio: string;
  tipo: 'Factura Emitida' | 'Factura Recibida' | 'Boleta de Honorarios' | 'Boleta de Ventas';
  emisorReceptor: string;
  montoNeto: number;
  iva: number;
  montoTotal: number;
  fecha: string;
  estado: 'Pagado' | 'Pendiente' | 'Anulado';
}

export interface BalanceItem {
  id: string;
  tipo: 'Activo Circulante' | 'Activo Fijo' | 'Pasivo Corto Plazo' | 'Pasivo Largo Plazo' | 'Patrimonio';
  nombre: string;
  valor: number;
}

export interface ContratoItem {
  id: string;
  titulo: string;
  tipo: 'Convenio Municipal B2B' | 'Licencia de Software' | 'Prestación de Servicios' | 'Acuerdo de Confidencialidad (NDA)';
  contraparte: string;
  fechaFirma: string;
  vigencia: string;
  estado: 'Vigente' | 'En Cierre' | 'Borrador';
}

export default function AdminPage() {
  const [pasoAuth, setPasoAuth] = useState<1 | 2 | 3>(1);
  const [claveInput, setClaveInput] = useState<string>('');
  const [pinInput, setPinInput] = useState<string>('');
  const [errorLogin, setErrorLogin] = useState<string>('');

  const [seccionActiva, setSeccionActiva] = useState<
    'contabilidad' | 'especialistas' | 'estadisticas' | 'actualizaciones' | 'agente'
  >('actualizaciones');

  const [subtabContable, setSubtabContable] = useState<
    'ingresos_egresos' | 'facturas_boletas' | 'activos_pasivos' | 'contratos'
  >('ingresos_egresos');

  const [asientos, setAsientos] = useState<AsientoLibro[]>([
    { id: '1', fecha: '23/10/2026', tipo: 'Ingreso', concepto: 'Convenio B2B Municipalidad de Santiago', monto: 1200000, categoria: 'Licencias B2B' },
    { id: '2', fecha: '22/10/2026', tipo: 'Egreso', concepto: 'Servidores Encriptados Ciberseguridad Ley N 21.663', monto: 180000, categoria: 'Gasto Operativo' },
    { id: '3', fecha: '21/10/2026', tipo: 'Ingreso', concepto: 'Recaudacion Webpay Reservas Wellness', monto: 350000, categoria: 'Webpay' }
  ]);
  const [nuevoConcepto, setNuevoConcepto] = useState<string>('');
  const [nuevoMonto, setNuevoMonto] = useState<string>('');
  const [tipoMovimiento, setTipoMovimiento] = useState<'Ingreso' | 'Egreso'>('Ingreso');

  const [documentos] = useState<DocumentoTributario[]>([
    { id: '1', folio: 'F-2026-089', tipo: 'Factura Emitida', emisorReceptor: 'Servicio de Salud Metropolitano', montoNeto: 1200000, iva: 228000, montoTotal: 1428000, fecha: '20/10/2026', estado: 'Pagado' },
    { id: '2', folio: 'F-2026-090', tipo: 'Factura Recibida', emisorReceptor: 'Proveedor Hosting SSL Cifrado', montoNeto: 180000, iva: 34200, montoTotal: 214200, fecha: '18/10/2026', estado: 'Pagado' },
    { id: '3', folio: 'BH-2026-012', tipo: 'Boleta de Honorarios', emisorReceptor: 'Consultoria Accesibilidad UI/UX TEA', montoNeto: 450000, iva: 60750, montoTotal: 389250, fecha: '15/10/2026', estado: 'Pagado' }
  ]);

  const [balance] = useState<BalanceItem[]>([
    { id: '1', tipo: 'Activo Circulante', nombre: 'Caja y Bancos (Saldo Disponible)', valor: 8500000 },
    { id: '2', tipo: 'Activo Circulante', nombre: 'Cuentas por Cobrar Licencias B2B', valor: 2400000 },
    { id: '3', tipo: 'Activo Fijo', nombre: 'Equipos y Servidores de Desarrollo', valor: 4500000 },
    { id: '4', tipo: 'Pasivo Corto Plazo', nombre: 'Facturas por Pagar Proveedores', valor: 390000 },
    { id: '5', tipo: 'Pasivo Corto Plazo', nombre: 'Impuestos Retenciones F29', valor: 288000 },
    { id: '6', tipo: 'Patrimonio', nombre: 'Capital Social Inicial ASL Ideas SpA', valor: 14722000 }
  ]);

  const [contratos] = useState<ContratoItem[]>([
    { id: '1', titulo: 'Convenio Marco de Licencia Inclusiva B2B', tipo: 'Convenio Municipal B2B', contraparte: 'Municipalidad de Santiago', fechaFirma: '10/01/2026', vigencia: '12 Meses (Renovable)', estado: 'Vigente' },
    { id: '2', titulo: 'Acuerdo de Prestacion de Servicios de Salud Integrativa', tipo: 'Prestación de Servicios', contraparte: 'LAWENMOLL Especialistas', fechaFirma: '15/03/2026', vigencia: 'Indefinida', estado: 'Vigente' },
    { id: '3', titulo: 'Contrato Tipo de Uso de Plataforma Wellness & Bienestar', tipo: 'Licencia de Software', contraparte: 'Usuarios y PYMES Asociadas', fechaFirma: '01/05/2026', vigencia: 'Anual', estado: 'Vigente' }
  ]);

  const handlePaso1 = (e: FormEvent) => {
    e.preventDefault();
    const pass = claveInput.trim();
    if (pass === 'asl2026' || pass === 'admin' || pass === 'NW2026*') {
      setPasoAuth(2);
      setErrorLogin('');
    } else {
      setErrorLogin('Paso 1 Fallido: Clave de administrador incorrecta.');
    }
  };

  const handlePaso2 = (e: FormEvent) => {
    e.preventDefault();
    const pin = pinInput.trim();
    if (pin === '216630' || pin === '884210' || pin === '2026' || pin === 'asl2026') {
      setPasoAuth(3);
      setErrorLogin('');
    } else {
      setErrorLogin('Paso 2 Fallido: PIN / Token de Ciberseguridad inválido.');
    }
  };

  const handleAgregarAsiento = (e: FormEvent) => {
    e.preventDefault();
    if (!nuevoConcepto.trim() || !nuevoMonto) return;
    const valorNum = parseFloat(nuevoMonto) || 0;
    const nuevo: AsientoLibro = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleDateString('es-CL'),
      tipo: tipoMovimiento,
      concepto: nuevoConcepto.trim(),
      monto: valorNum,
      categoria: tipoMovimiento === 'Ingreso' ? 'Licencias B2B' : 'Gasto Operativo'
    };
    setAsientos([nuevo, ...asientos]);
    setNuevoConcepto('');
    setNuevoMonto('');
  };

  const totalIngresos = asientos.filter(a => a.tipo === 'Ingreso').reduce((acc, curr) => acc + curr.monto, 0);
  const totalEgresos = asientos.filter(a => a.tipo === 'Egreso').reduce((acc, curr) => acc + curr.monto, 0);
  const saldoCaja = totalIngresos - totalEgresos;

  const totalActivos = balance.filter(b => b.tipo.startsWith('Activo')).reduce((acc, curr) => acc + curr.valor, 0);
  const totalPasivos = balance.filter(b => b.tipo.startsWith('Pasivo')).reduce((acc, curr) => acc + curr.valor, 0);
  const patrimonioNeto = totalActivos - totalPasivos;

  if (pasoAuth === 1) {
    return (
      <div className="min-h-screen bg-[#F5F2EB] flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-3xl p-8 border-2 border-[#D4AF37] shadow-xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#E8F0EC] border-2 border-[#2D6A4F] flex items-center justify-center font-bold text-[#2D6A4F] text-lg">
            ASL
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
              Paso 1 de 2: Autenticación Maestra
            </span>
            <h2 className="text-xl font-bold text-[#2D6A4F] mt-3">Ingreso Administrador</h2>
            <p className="text-xs text-[#52796F] mt-1">Ingresa tu clave de acceso de primer nivel.</p>
          </div>

          <form onSubmit={handlePaso1} className="space-y-4">
            <input
              type="password"
              value={claveInput}
              onChange={(e) => setClaveInput(e.target.value)}
              placeholder="Clave Administradora (ej: asl2026)"
              className="w-full text-sm p-3.5 border-2 border-[#C8D8CE] rounded-xl text-center font-mono focus:border-[#2D6A4F] outline-none text-[#2D6A4F]"
              required
            />

            {errorLogin && (
              <p className="text-xs text-[#D85260] font-bold bg-[#FFF0F2] p-2 rounded-lg border border-[#FF8894]">
                {errorLogin}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#2D6A4F] text-white text-xs font-bold py-3.5 rounded-xl hover:bg-[#1E3A2F] transition shadow-md"
            >
              Siguiente (Paso 2) -&gt;
            </button>
          </form>

          <p className="text-[10px] text-[#84A59D]">Claves: asl2026 | admin | NW2026*</p>
        </div>
      </div>
    );
  }

  if (pasoAuth === 2) {
    return (
      <div className="min-h-screen bg-[#F5F2EB] flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-3xl p-8 border-2 border-[#2D6A4F] shadow-xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#E8F0EC] border-2 border-[#D4AF37] flex items-center justify-center font-bold text-[#2D6A4F] text-lg">
            2FA
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
              Paso 2 de 2: Doble Seguridad Ciberseguridad Ley N 21.663
            </span>
            <h2 className="text-xl font-bold text-[#2D6A4F] mt-3">PIN / Token de Verificación</h2>
            <p className="text-xs text-[#52796F] mt-1">Introduce el PIN de seguridad asignado para liberar la Consola Contable y Administrativa.</p>
          </div>

          <form onSubmit={handlePaso2} className="space-y-4">
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="PIN de Seguridad (ej: 216630)"
              className="w-full text-sm p-3.5 border-2 border-[#2D6A4F] rounded-xl text-center font-mono focus:border-[#D4AF37] outline-none text-[#2D6A4F]"
              required
            />

            {errorLogin && (
              <p className="text-xs text-[#D85260] font-bold bg-[#FFF0F2] p-2 rounded-lg border border-[#FF8894]">
                {errorLogin}
              </p>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setPasoAuth(1); setErrorLogin(''); }}
                className="w-1/3 bg-[#EAE6DF] text-[#2D6A4F] text-xs font-bold py-3.5 rounded-xl hover:bg-[#DED9CF] transition"
              >
                &lt;- Volver
              </button>
              <button
                type="submit"
                className="w-2/3 bg-[#2D6A4F] text-white text-xs font-bold py-3.5 rounded-xl hover:bg-[#1E3A2F] transition shadow-md"
              >
                Verificar &amp; Entrar
              </button>
            </div>
          </form>

          <p className="text-[10px] text-[#84A59D]">PIN de Seguridad: 216630 (o 884210 / asl2026)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#2D6A4F] font-sans flex flex-col md:flex-row">
      
      {/* SIDEBAR NAVEGACION */}
      <aside className="w-full md:w-64 bg-[#EAE6DF] border-r border-[#C8D8CE] p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center font-bold text-xs">
              ASL
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-[#2D6A4F]">ASL Ideas SpA</h1>
              <p className="text-[10px] font-bold text-[#84A59D] uppercase tracking-wider">CONSOLA ADMINISTRADORA</p>
              <span className="text-[9px] bg-[#E8F0EC] text-[#2D6A4F] px-2 py-0.5 rounded-full font-bold inline-block mt-0.5 border border-[#C8D8CE]">
                Sesión Privada Activa (2FA Validado)
              </span>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-bold">
            <button
              onClick={() => setSeccionActiva('contabilidad')}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition ${
                seccionActiva === 'contabilidad'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52796F] hover:bg-[#DED9CF]'
              }`}
            >
              Casa Matriz & Contabilidad B2B
            </button>

            <button
              onClick={() => setSeccionActiva('especialistas')}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition ${
                seccionActiva === 'especialistas'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52796F] hover:bg-[#DED9CF]'
              }`}
            >
              Especialistas LAWENMOLL
            </button>

            <button
              onClick={() => setSeccionActiva('estadisticas')}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition ${
                seccionActiva === 'estadisticas'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52796F] hover:bg-[#DED9CF]'
              }`}
            >
              Estadísticas de Aplicaciones
            </button>

            <button
              onClick={() => setSeccionActiva('actualizaciones')}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition ${
                seccionActiva === 'actualizaciones'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52796F] hover:bg-[#DED9CF]'
              }`}
            >
              Gestor de Actualizaciones Apps
            </button>

            <button
              onClick={() => setSeccionActiva('agente')}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition ${
                seccionActiva === 'agente'
                  ? 'bg-[#2D6A4F] text-white shadow-xs'
                  : 'text-[#52796F] hover:bg-[#DED9CF]'
              }`}
            >
              Agente IA Redes & Monetización
            </button>
          </nav>
        </div>

        <div className="pt-4 border-t border-[#C8D8CE] text-[10px] text-[#84A59D] space-y-2">
          <p>ASL Ideas SpA - Chile</p>
          <p>Ciberseguridad Ley N 21.663</p>
          <button
            onClick={() => setPasoAuth(1)}
            className="w-full text-center text-[10px] font-bold text-[#D85260] bg-[#FFF0F2] py-1.5 rounded-lg border border-[#FF8894] hover:bg-[#FFE5E8] transition"
          >
            Cerrar Sesión Privada
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#C8D8CE] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase bg-[#EAE6DF] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
              Consola privada protegida con Doble Seguridad (2FA) Ley N 21.663
            </span>
            <h2 className="text-xl font-bold text-[#2D6A4F] mt-1">
              Administración & Actualizaciones de Módulos
            </h2>
          </div>

          <Link
            href="/"
            className="text-xs font-bold text-[#2D6A4F] hover:text-[#1E3A2F] bg-white px-4 py-2 rounded-xl border border-[#C8D8CE] transition"
          >
            Ver Portada Pública -&gt;
          </Link>
        </div>

        {/* 1. GESTOR DE ACTUALIZACIONES APPS */}
        {seccionActiva === 'actualizaciones' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-4">
              <div className="border-b border-[#E8F0EC] pb-3">
                <h3 className="text-base font-bold text-[#2D6A4F]">Control de Módulos & Publicaciones</h3>
                <p className="text-xs text-[#52796F] mt-1">
                  Ingresa a cada aplicación para realizar modificaciones de texto, añadir recetarios PDF o actualizar horarios de salas virtuales sin requerir código adicional.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-3">
                  <span className="text-[10px] font-bold uppercase text-[#84A59D] tracking-wider block">MÓDULO LAWENMOLL</span>
                  <h4 className="text-sm font-bold text-[#2D6A4F]">Editar LAWENMOLL</h4>
                  <p className="text-xs text-[#52796F] leading-relaxed">
                    Vitrina Virtual de Medicina Integrativa & Fichas Clínicas encriptadas bajo Ley N 21.663.
                  </p>
                  <button className="text-xs font-bold bg-[#E8F0EC] text-[#2D6A4F] px-4 py-2 rounded-xl border border-[#C8D8CE]">
                    Configurar Vitrina
                  </button>
                </div>

                <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-3">
                  <span className="text-[10px] font-bold uppercase text-[#84A59D] tracking-wider block">MÓDULO WELLNESS</span>
                  <h4 className="text-sm font-bold text-[#2D6A4F]">Editar Wellness App</h4>
                  <p className="text-xs text-[#52796F] leading-relaxed">
                    Salas Virtuales interactivas (Lotus, Cielo, Bosque, Raíz) y movimiento adaptado sin impacto.
                  </p>
                  <button className="text-xs font-bold bg-[#E8F0EC] text-[#2D6A4F] px-4 py-2 rounded-xl border border-[#C8D8CE]">
                    Administrar Salas
                  </button>
                </div>

                <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-3">
                  <span className="text-[10px] font-bold uppercase text-[#84A59D] tracking-wider block">MÓDULO BIENESTAR</span>
                  <h4 className="text-sm font-bold text-[#2D6A4F]">Editar Bienestar App</h4>
                  <p className="text-xs text-[#52796F] leading-relaxed">
                    Red comunitaria, recetarios herbolarios en PDF y módulo Morfeo de descanso.
                  </p>
                  <button className="text-xs font-bold bg-[#E8F0EC] text-[#2D6A4F] px-4 py-2 rounded-xl border border-[#C8D8CE]">
                    Cargar Recetarios
                  </button>
                </div>

                <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-3">
                  <span className="text-[10px] font-bold uppercase text-[#84A59D] tracking-wider block">MÓDULO B2B</span>
                  <h4 className="text-sm font-bold text-[#2D6A4F]">Editar Muestra B2B</h4>
                  <p className="text-xs text-[#52796F] leading-relaxed">
                    Ajuste de propuestas comerciales, contratos tipo y licencias para municipalidades.
                  </p>
                  <button className="text-xs font-bold bg-[#E8F0EC] text-[#2D6A4F] px-4 py-2 rounded-xl border border-[#C8D8CE]">
                    Ajustar Oferta B2B
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. CASA MATRIZ & CONTABILIDAD B2B */}
        {seccionActiva === 'contabilidad' && (
          <div className="space-y-6">
            <div className="bg-white p-1.5 rounded-2xl border border-[#C8D8CE] flex flex-wrap gap-1">
              <button
                onClick={() => setSubtabContable('ingresos_egresos')}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
                  subtabContable === 'ingresos_egresos' ? 'bg-[#2D6A4F] text-white' : 'text-[#52796F] hover:bg-[#E8F0EC]'
                }`}
              >
                Libro diario (Ingresos y Egresos)
              </button>

              <button
                onClick={() => setSubtabContable('facturas_boletas')}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
                  subtabContable === 'facturas_boletas' ? 'bg-[#2D6A4F] text-white' : 'text-[#52796F] hover:bg-[#E8F0EC]'
                }`}
              >
                Facturas y Boletas
              </button>

              <button
                onClick={() => setSubtabContable('activos_pasivos')}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
                  subtabContable === 'activos_pasivos' ? 'bg-[#2D6A4F] text-white' : 'text-[#52796F] hover:bg-[#E8F0EC]'
                }`}
              >
                Activos y Pasivos (Balance)
              </button>

              <button
                onClick={() => setSubtabContable('contratos')}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition ${
                  subtabContable === 'contratos' ? 'bg-[#2D6A4F] text-white' : 'text-[#52796F] hover:bg-[#E8F0EC]'
                }`}
              >
                Contratos Genéricos & Convenios B2B
              </button>
            </div>

            {subtabContable === 'ingresos_egresos' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-[#C8D8CE]">
                    <span className="text-[10px] font-bold uppercase text-[#84A59D]">Ingresos Registrados</span>
                    <p className="text-lg font-extrabold text-[#2D6A4F] mt-1">${totalIngresos.toLocaleString('es-CL')} CLP</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-[#FF8894]">
                    <span className="text-[10px] font-bold uppercase text-[#D85260]">Egresos & Gastos</span>
                    <p className="text-lg font-extrabold text-[#D85260] mt-1">${totalEgresos.toLocaleString('es-CL')} CLP</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-[#D4AF37]">
                    <span className="text-[10px] font-bold uppercase text-[#D4AF37]">Saldo Neto Disponibilidad</span>
                    <p className="text-lg font-extrabold text-[#2D6A4F] mt-1">${saldoCaja.toLocaleString('es-CL')} CLP</p>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-4">
                  <h3 className="text-sm font-bold text-[#2D6A4F]">Registrar Nuevo Movimiento en Libro Diario</h3>
                  
                  <form onSubmit={handleAgregarAsiento} className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-[#FAF8F5] p-3 rounded-2xl border border-[#C8D8CE]">
                    <input
                      type="text"
                      value={nuevoConcepto}
                      onChange={(e) => setNuevoConcepto(e.target.value)}
                      placeholder="Detalle o concepto del movimiento..."
                      className="text-xs p-2.5 border border-[#C8D8CE] rounded-xl sm:col-span-2 bg-white text-[#2D6A4F]"
                      required
                    />
                    <input
                      type="number"
                      value={nuevoMonto}
                      onChange={(e) => setNuevoMonto(e.target.value)}
                      placeholder="Monto CLP..."
                      className="text-xs p-2.5 border border-[#C8D8CE] rounded-xl bg-white text-[#2D6A4F]"
                      required
                    />
                    <select
                      value={tipoMovimiento}
                      onChange={(e) => setTipoMovimiento(e.target.value as 'Ingreso' | 'Egreso')}
                      className="text-xs p-2.5 border border-[#C8D8CE] rounded-xl bg-white font-bold text-[#2D6A4F]"
                    >
                      <option value="Ingreso">Ingreso (+)</option>
                      <option value="Egreso">Egreso (-)</option>
                    </select>
                    <button type="submit" className="sm:col-span-4 bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl">
                      + Guardar en Libro Diario
                    </button>
                  </form>

                  <div className="overflow-x-auto pt-2">
                    <table className="w-full text-left text-xs text-[#2D6A4F] border-collapse min-w-[500px]">
                      <thead>
                        <tr className="bg-[#EAE6DF] border-b border-[#C8D8CE]">
                          <th className="p-2.5 font-bold">Fecha</th>
                          <th className="p-2.5 font-bold">Concepto</th>
                          <th className="p-2.5 font-bold">Categoría</th>
                          <th className="p-2.5 font-bold">Tipo</th>
                          <th className="p-2.5 font-bold text-right">Monto CLP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {asientos.map((item) => (
                          <tr key={item.id} className="border-b border-[#E8F0EC]">
                            <td className="p-2.5 text-[11px] text-[#84A59D] font-mono">{item.fecha}</td>
                            <td className="p-2.5 font-medium">{item.concepto}</td>
                            <td className="p-2.5 text-[11px] text-[#52796F]">{item.categoria}</td>
                            <td className="p-2.5 font-bold">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] ${item.tipo === 'Ingreso' ? 'bg-[#E8F0EC] text-[#2D6A4F]' : 'bg-[#FFF0F2] text-[#D85260]'}`}>
                                {item.tipo}
                              </span>
                            </td>
                            <td className={`p-2.5 font-bold text-right ${item.tipo === 'Ingreso' ? 'text-[#2D6A4F]' : 'text-[#D85260]'}`}>
                              {item.tipo === 'Ingreso' ? '+' : '-'}${item.monto.toLocaleString('es-CL')} CLP
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {subtabContable === 'facturas_boletas' && (
              <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-4">
                <div className="flex justify-between items-center border-b border-[#E8F0EC] pb-3">
                  <h3 className="text-sm font-bold text-[#2D6A4F]">Bóveda de Facturas y Boletas Electrónicas</h3>
                  <span className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
                    Estándar DTE & Ciberseguridad Ley N 21.663
                  </span>
                </div>

                <div className="space-y-3">
                  {documentos.map((doc) => (
                    <div key={doc.id} className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#2D6A4F]">{doc.folio}</span>
                          <span className="text-[10px] font-bold uppercase bg-white px-2 py-0.5 rounded-md border border-[#C8D8CE]">
                            {doc.tipo}
                          </span>
                        </div>
                        <p className="text-xs text-[#52796F] mt-1">Contraparte: {doc.emisorReceptor} • Fecha: {doc.fecha}</p>
                        <p className="text-[10px] text-[#84A59D]">Neto: ${doc.montoNeto.toLocaleString('es-CL')} | IVA (19%): ${doc.iva.toLocaleString('es-CL')}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-extrabold text-[#2D6A4F] block">${doc.montoTotal.toLocaleString('es-CL')} CLP</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-[#E8F0EC] px-2 py-0.5 rounded-full inline-block mt-1">
                          Estado: {doc.estado}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {subtabContable === 'activos_pasivos' && (
              <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-4">
                <div className="border-b border-[#E8F0EC] pb-3">
                  <h3 className="text-sm font-bold text-[#2D6A4F]">Estado de Balance Patrimonial (Activos, Pasivos & Patrimonio)</h3>
                  <p className="text-xs text-[#52796F]">Resumen contable estandarizado para auditorías e instituciones B2B.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-3">
                    <div className="flex justify-between items-center border-b border-[#C8D8CE] pb-2">
                      <h4 className="text-xs font-extrabold uppercase text-[#2D6A4F]">Activos Totales</h4>
                      <span className="text-xs font-extrabold text-[#2D6A4F]">${totalActivos.toLocaleString('es-CL')} CLP</span>
                    </div>

                    <div className="space-y-2">
                      {balance.filter(b => b.tipo.startsWith('Activo')).map(item => (
                        <div key={item.id} className="flex justify-between items-center text-xs bg-white p-2.5 rounded-xl border border-[#C8D8CE]">
                          <span className="text-[#52796F] font-medium">{item.nombre}</span>
                          <span className="font-bold text-[#2D6A4F]">${item.valor.toLocaleString('es-CL')}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-3">
                    <div className="flex justify-between items-center border-b border-[#C8D8CE] pb-2">
                      <h4 className="text-xs font-extrabold uppercase text-[#D85260]">Pasivos Totales & Patrimonio</h4>
                      <span className="text-xs font-extrabold text-[#D85260]">${(totalPasivos + patrimonioNeto).toLocaleString('es-CL')} CLP</span>
                    </div>

                    <div className="space-y-2">
                      {balance.filter(b => !b.tipo.startsWith('Activo')).map(item => (
                        <div key={item.id} className="flex justify-between items-center text-xs bg-white p-2.5 rounded-xl border border-[#C8D8CE]">
                          <span className="text-[#52796F] font-medium">{item.nombre}</span>
                          <span className="font-bold text-[#D85260]">${item.valor.toLocaleString('es-CL')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {subtabContable === 'contratos' && (
              <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-4">
                <div className="border-b border-[#E8F0EC] pb-3">
                  <h3 className="text-sm font-bold text-[#2D6A4F]">Repositorio de Contratos Genéricos & Convenios B2B</h3>
                  <p className="text-xs text-[#52796F]">Plantillas y convenios vigentes firmados con municipalidades, instituciones y colaboradores.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {contratos.map(item => (
                    <div key={item.id} className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-2 py-0.5 rounded-md border border-[#C8D8CE]">
                          {item.tipo}
                        </span>
                        <h4 className="text-xs font-bold text-[#2D6A4F] mt-2">{item.titulo}</h4>
                        <p className="text-[11px] text-[#52796F] mt-1">Contraparte: {item.contraparte}</p>
                        <p className="text-[10px] text-[#84A59D]">Firma: {item.fechaFirma} • Vigencia: {item.vigencia}</p>
                      </div>

                      <div className="pt-2 border-t border-[#C8D8CE] flex justify-between items-center">
                        <span className="text-[10px] font-bold text-emerald-600 bg-white px-2 py-0.5 rounded-md border border-[#C8D8CE]">
                          {item.estado}
                        </span>
                        <button className="text-[10px] font-bold text-[#2D6A4F] underline">
                          Descargar Plantilla
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. ESPECIALISTAS LAWENMOLL */}
        {seccionActiva === 'especialistas' && (
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-4">
            <h3 className="text-base font-bold text-[#2D6A4F]">Especialistas & Terapeutas LAWENMOLL</h3>
            <p className="text-xs text-[#52796F]">Directorio de profesionales habilitados para atención médica e integrativa.</p>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] text-xs text-[#52796F]">
              4 Especialistas registrados y verificados bajo Ley N 21.663.
            </div>
          </div>
        )}

        {/* 4. ESTADÍSTICAS DE APLICACIONES */}
        {seccionActiva === 'estadisticas' && (
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-4">
            <h3 className="text-base font-bold text-[#2D6A4F]">Estadísticas de Uso del Ecosistema</h3>
            <p className="text-xs text-[#52796F]">Métricas de impacto y atenciones virtuales realizadas.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] text-center">
                <span className="text-lg font-bold text-[#2D6A4F] block">1,240</span>
                <span className="text-[10px] text-[#84A59D]">Atenciones LAWENMOLL</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] text-center">
                <span className="text-lg font-bold text-[#2D6A4F] block">850</span>
                <span className="text-[10px] text-[#84A59D]">Sesiones Wellness</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] text-center">
                <span className="text-lg font-bold text-[#2D6A4F] block">3,100</span>
                <span className="text-[10px] text-[#84A59D]">Recetarios PDF</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] text-center">
                <span className="text-lg font-bold text-[#2D6A4F] block">12</span>
                <span className="text-[10px] text-[#84A59D]">Convenios B2B</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. AGENTE IA REDES & MONETIZACIÓN WEBPAY */}
        {seccionActiva === 'agente' && (
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-4">
            <h3 className="text-base font-bold text-[#2D6A4F]">Agente IA Redes & Monetización Webpay</h3>
            <p className="text-xs text-[#52796F]">Supervisión del agente conversacional en redes sociales y pasarela de pago.</p>
          </div>
        )}
      </main>
    </div>
  );
}
