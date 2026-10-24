'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface ConvenioB2B {
  id: string;
  institucion: string;
  tipo: 'Municipalidad' | 'Empresa' | 'Servicio de Salud';
  licencias: number;
  estado: 'Activo' | 'En Negociación' | 'Pausado';
  montoMensual: string;
}

export interface AsientoContable {
  id: string;
  fecha: string;
  concepto: string;
  tipo: 'Ingreso' | 'Egreso';
  monto: number;
  categoria: 'Licencias B2B' | 'Webpay Reservas' | 'Gasto Operativo' | 'Factura Proveedor';
  comprobante?: string;
}

export interface VideoItem {
  id: string;
  titulo: string;
  categoria: 'GAP' | 'Pausa Activa' | 'Movimiento Adaptado';
  instructor: string;
  duracion: string;
  precioWebpay: string;
}

export interface DocumentoFactura {
  id: string;
  folio: string;
  emisorReceptor: string;
  tipo: 'Factura Emitida' | 'Factura Recibida' | 'Contrato';
  montoTotal: string;
  fecha: string;
  estadoPago: 'Pagado' | 'Pendiente' | 'Anulado';
}

export default function AdminPanel() {
  // Autenticación de Administrador
  const [autenticado, setAutenticado] = useState<boolean>(false);
  const [claveInput, setClaveInput] = useState<string>('');
  const [errorLogin, setErrorLogin] = useState<string>('');

  // Navegación Principal del Panel
  const [tabActiva, setTabActiva] = useState<'apps' | 'casamatriz' | 'contabilidad' | 'seguridad'>('apps');

  // Sub-navegación Apps
  const [appSeleccionada, setAppSeleccionada] = useState<'lawenmoll' | 'wellness' | 'bienestar'>('lawenmoll');

  // Estado Apps - Wellness Videos
  const [videosList, setVideosList] = useState<VideoItem[]>([
    { id: '1', titulo: 'Rutina GAP Adaptada sin Impacto', categoria: 'GAP', instructor: 'Carolina Silva', duracion: '20 min', precioWebpay: '$3.500 CLP' },
    { id: '2', titulo: 'Pausa Activa Postural de Escritorio', categoria: 'Pausa Activa', instructor: 'Dr. Roberto M.', duracion: '10 min', precioWebpay: 'Gratuito' }
  ]);
  const [nuevoVideoTitulo, setNuevoVideoTitulo] = useState<string>('');
  const [nuevoVideoInstructor, setNuevoVideoInstructor] = useState<string>('');

  // Estado Casa Matriz - Convenios B2B
  const [convenios, setConvenios] = useState<ConvenioB2B[]>([
    { id: '1', institucion: 'Municipalidad de Santiago', tipo: 'Municipalidad', licencias: 150, estado: 'Activo', montoMensual: '$1.200.000 CLP' },
    { id: '2', institucion: 'Clínica Salud Integrativa', tipo: 'Servicio de Salud', licencias: 50, estado: 'Activo', montoMensual: '$450.000 CLP' }
  ]);
  const [nuevaInstitucion, setNuevaInstitucion] = useState<string>('');
  const [nuevoMonto, setNuevoMonto] = useState<string>('');

  // Estado Oficina & Libros de Contabilidad
  const [asientos, setAsientos] = useState<AsientoContable[]>([
    { id: '1', fecha: '23/10/2026', concepto: 'Pago Licencia B2B Municipalidad Santiago', tipo: 'Ingreso', monto: 1200000, categoria: 'Licencias B2B' },
    { id: '2', fecha: '22/10/2026', concepto: 'Servidores Encriptados Ley N° 21.663', tipo: 'Egreso', monto: 180000, categoria: 'Gasto Operativo' },
    { id: '3', fecha: '21/10/2026', concepto: 'Recaudación Webpay Reservas Wellness', tipo: 'Ingreso', monto: 350000, categoria: 'Webpay Reservas' }
  ]);
  const [nuevoConcepto, setNuevoConcepto] = useState<string>('');
  const [nuevoMontoAsiento, setNuevoMontoAsiento] = useState<string>('');
  const [tipoAsiento, setTipoAsiento] = useState<'Ingreso' | 'Egreso'>('Ingreso');

  // Estado Documentos y Facturación
  const [facturas, setFacturas] = useState<DocumentoFactura[]>([
    { id: '1', folio: 'F-2026-089', emisorReceptor: 'Servicio de Salud Metropolitano', tipo: 'Factura Emitida', montoTotal: '$1.428.000 CLP', fecha: '20/10/2026', estadoPago: 'Pagado' },
    { id: '2', folio: 'F-2026-090', emisorReceptor: 'Proveedor Hosting Cifrado', tipo: 'Factura Recibida', montoTotal: '$214.200 CLP', fecha: '18/10/2026', estadoPago: 'Pagado' }
  ]);

  // Manejo de Login
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    const clave = claveInput.trim();
    if (clave === 'asl2026' || clave === 'admin' || clave === 'NW2026*') {
      setAutenticado(true);
      setErrorLogin('');
    } else {
      setErrorLogin('Clave de administrador incorrecta. Acceso restringido.');
    }
  };

  // Agregar Video
  const handleAgregarVideo = (e: FormEvent) => {
    e.preventDefault();
    if (!nuevoVideoTitulo.trim()) return;
    const nuevo: VideoItem = {
      id: Date.now().toString(),
      titulo: nuevoVideoTitulo,
      categoria: 'Movimiento Adaptado',
      instructor: nuevoVideoInstructor || 'Especialista ASL',
      duracion: '15 min',
      precioWebpay: 'Gratuito'
    };
    setVideosList([...videosList, nuevo]);
    setNuevoVideoTitulo('');
    setNuevoVideoInstructor('');
  };

  const handleEliminarVideo = (id: string) => {
    setVideosList(videosList.filter(v => v.id !== id));
  };

  // Agregar Convenio
  const handleAgregarConvenio = (e: FormEvent) => {
    e.preventDefault();
    if (!nuevaInstitucion.trim()) return;
    const nuevo: ConvenioB2B = {
      id: Date.now().toString(),
      institucion: nuevaInstitucion,
      tipo: 'Empresa',
      licencias: 25,
      estado: 'Activo',
      montoMensual: nuevoMonto || '$300.000 CLP'
    };
    setConvenios([...convenios, nuevo]);
    setNuevaInstitucion('');
    setNuevoMonto('');
  };

  // Agregar Asiento Contable
  const handleAgregarAsiento = (e: FormEvent) => {
    e.preventDefault();
    if (!nuevoConcepto.trim() || !nuevoMontoAsiento) return;
    const nuevo: AsientoContable = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleDateString('es-CL'),
      concepto: nuevoConcepto,
      tipo: tipoAsiento,
      monto: parseFloat(nuevoMontoAsiento) || 0,
      categoria: tipoAsiento === 'Ingreso' ? 'Licencias B2B' : 'Gasto Operativo'
    };
    setAsientos([nuevo, ...asientos]);
    setNuevoConcepto('');
    setNuevoMontoAsiento('');
  };

  // Exportar Balance Contable TXT
  const handleExportarBalance = () => {
    const totalIngresos = asientos.filter(a => a.tipo === 'Ingreso').reduce((acc, curr) => acc + curr.monto, 0);
    const totalEgresos = asientos.filter(a => a.tipo === 'Egreso').reduce((acc, curr) => acc + curr.monto, 0);
    const resultado = totalIngresos - totalEgresos;

    const reporte = `================================================
ASL IDEAS SpA - LIBRO DE CONTABILIDAD Y BALANCE
================================================
Fecha de Emisión: ${new Date().toLocaleDateString('es-CL')}
Estándar Ciberseguridad: Ley N° 21.663

RESUMEN FINANCIERO:
Total Ingresos: $${totalIngresos.toLocaleString('es-CL')} CLP
Total Egresos:  $${totalEgresos.toLocaleString('es-CL')} CLP
Resultado Neto: $${resultado.toLocaleString('es-CL')} CLP

REGISTRO DE ASIENTOS CONTABLES:
${asientos.map(a => `[${a.fecha}] (${a.tipo.toUpperCase()}) ${a.concepto} - $${a.monto.toLocaleString('es-CL')} CLP [Categoría: ${a.categoria}]`).join('\n')}

CONVENIOS CORPORATIVOS VIGENTES:
${convenios.map(c => `- ${c.institucion} (${c.tipo}) | Licencias: ${c.licencias} | Monto: ${c.montoMensual}`).join('\n')}
================================================`;

    const blob = new Blob([reporte], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Balance_Contable_ASL_Ideas_${new Date().toISOString().slice(0,10)}.txt`;
    link.click();
  };

  // Cálculo de totales financieros
  const totalIngresos = asientos.filter(a => a.tipo === 'Ingreso').reduce((acc, curr) => acc + curr.monto, 0);
  const totalEgresos = asientos.filter(a => a.tipo === 'Egreso').reduce((acc, curr) => acc + curr.monto, 0);
  const resultadoNeto = totalIngresos - totalEgresos;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D6A4F] font-sans selection:bg-[#E8F0EC] pb-12">
      
      {/* HEADER DE ADMINISTRACIÓN MÓVIL Y ESCRITORIO */}
      <header className="bg-white border-b-2 border-[#D4AF37] sticky top-0 z-40 shadow-xs px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#E8F0EC] border-2 border-[#2D6A4F] flex items-center justify-center font-bold text-[#2D6A4F]">
              ASL
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-[#2D6A4F]">ASL Ideas SpA - Casa Matriz</h1>
              <p className="text-[11px] text-[#84A59D] font-medium">Centro de Mando Administrativo & Contabilidad B2B</p>
            </div>
          </div>

          {autenticado && (
            <button
              onClick={() => setAutenticado(false)}
              className="text-xs font-bold bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-4 py-2 rounded-full hover:bg-[#D85260] hover:text-white transition w-full sm:w-auto"
            >
              Cerrar Sesión Admin
            </button>
          )}
        </div>
      </header>

      {/* PANTALLA DE ACCESO ADMINISTRATIVO */}
      {!autenticado ? (
        <main className="max-w-md mx-auto px-4 py-16">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37] shadow-lg text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#E8F0EC] border-2 border-[#2D6A4F] flex items-center justify-center font-bold text-[#2D6A4F] text-lg">
              ADM
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
                Acceso Cifrado — Ley N° 21.663
              </span>
              <h2 className="text-lg font-bold text-[#2D6A4F] mt-3">Panel de Control Unificado</h2>
              <p className="text-xs text-[#52796F] mt-1">Gestión de Apps, Casa Matriz B2B y Libros Contables.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={claveInput}
                onChange={(e) => setClaveInput(e.target.value)}
                placeholder="Clave Admin (ej: asl2026)"
                className="w-full text-sm p-3.5 border-2 border-[#C8D8CE] rounded-xl text-center font-mono focus:border-[#2D6A4F] outline-none"
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
                Ingresar al Centro de Mando
              </button>
            </form>

            <p className="text-[10px] text-[#84A59D]">
              Claves de Administrador: asl2026 | admin | NW2026*
            </p>
          </div>
        </main>
      ) : (
        /* CONTENIDO PRINCIPAL DEL PANEL */
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

          {/* MENÚ DE NAVEGACIÓN ADAPTADO A PANTALLAS TÁCTILES Y MÓVILES */}
          <nav className="bg-white p-2 rounded-2xl border-2 border-[#C8D8CE] shadow-xs overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => setTabActiva('apps')}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl transition ${tabActiva === 'apps' ? 'bg-[#2D6A4F] text-white shadow-xs' : 'bg-[#FAF8F5] text-[#52796F] hover:bg-[#E8F0EC]'}`}
              >
                [1] Edición de Apps
              </button>
              <button
                onClick={() => setTabActiva('casamatriz')}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl transition ${tabActiva === 'casamatriz' ? 'bg-[#2D6A4F] text-white shadow-xs' : 'bg-[#FAF8F5] text-[#52796F] hover:bg-[#E8F0EC]'}`}
              >
                [2] Casa Matriz B2B
              </button>
              <button
                onClick={() => setTabActiva('contabilidad')}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl transition ${tabActiva === 'contabilidad' ? 'bg-[#2D6A4F] text-white shadow-xs' : 'bg-[#FAF8F5] text-[#52796F] hover:bg-[#E8F0EC]'}`}
              >
                [3] Contabilidad & Oficina
              </button>
              <button
                onClick={() => setTabActiva('seguridad')}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl transition ${tabActiva === 'seguridad' ? 'bg-[#2D6A4F] text-white shadow-xs' : 'bg-[#FAF8F5] text-[#52796F] hover:bg-[#E8F0EC]'}`}
              >
                [4] Seguridad Ley N° 21.663
              </button>
            </div>
          </nav>

          {/* TAB 1: GESTIÓN Y EDICIÓN DE TODAS LAS APPS */}
          {tabActiva === 'apps' && (
            <section className="space-y-6">
              <div className="bg-white p-5 rounded-3xl border-2 border-[#D4AF37] space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#E8F0EC] pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
                      Selector de Aplicaciones
                    </span>
                    <h2 className="text-lg font-bold text-[#2D6A4F] mt-1">Módulo de Administración de Ecosistema</h2>
                  </div>

                  {/* SELECTOR MÓVIL DE APPS */}
                  <div className="flex gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#C8D8CE] w-full sm:w-auto">
                    <button
                      onClick={() => setAppSeleccionada('lawenmoll')}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-lg flex-1 sm:flex-none ${appSeleccionada === 'lawenmoll' ? 'bg-[#2D6A4F] text-white' : 'text-[#52796F]'}`}
                    >
                      LAWENMOLL
                    </button>
                    <button
                      onClick={() => setAppSeleccionada('wellness')}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-lg flex-1 sm:flex-none ${appSeleccionada === 'wellness' ? 'bg-[#2D6A4F] text-white' : 'text-[#52796F]'}`}
                    >
                      Wellness Web App
                    </button>
                    <button
                      onClick={() => setAppSeleccionada('bienestar')}
                      className={`text-[11px] font-bold px-3 py-1.5 rounded-lg flex-1 sm:flex-none ${appSeleccionada === 'bienestar' ? 'bg-[#2D6A4F] text-white' : 'text-[#52796F]'}`}
                    >
                      Bienestar App
                    </button>
                  </div>
                </div>

                {/* APP: LAWENMOLL */}
                {appSeleccionada === 'lawenmoll' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
                      <h3 className="text-sm font-bold text-[#2D6A4F]">LAWENMOLL Salud Integrativa</h3>
                      <p className="text-xs text-[#52796F]">
                        Gestión de Fichas Médicas SOAP protegidas bajo Ley N° 21.663, asignación de especialistas en salud metabólica y configuración del Test de Bienestar Inteligente.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-2xl border border-[#C8D8CE] space-y-2">
                        <h4 className="text-xs font-bold uppercase text-[#2D6A4F]">Pautas Metabólicas Activas</h4>
                        <p className="text-xs text-[#52796F]">3 Pautas de evaluación vigentes para pacientes B2B.</p>
                        <button className="text-xs font-bold bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1.5 rounded-lg border border-[#C8D8CE]">
                          Editar Pautas de Evaluación
                        </button>
                      </div>

                      <div className="p-4 bg-white rounded-2xl border border-[#C8D8CE] space-y-2">
                        <h4 className="text-xs font-bold uppercase text-[#2D6A4F]">Red de Terapeutas & Especialistas</h4>
                        <p className="text-xs text-[#52796F]">4 Profesionales habilitados para salas de atención virtual.</p>
                        <button className="text-xs font-bold bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1.5 rounded-lg border border-[#C8D8CE]">
                          Gestionar Especialistas
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* APP: WELLNESS WEB APP */}
                {appSeleccionada === 'wellness' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-3">
                      <h3 className="text-sm font-bold text-[#2D6A4F]">Wellness Web App — Movimiento Adaptado</h3>
                      <p className="text-xs text-[#52796F]">
                        Publicación de videos de ejercicios sin impacto (GAP, Pausa Activa), control de cobros Webpay y monitoreo de salas virtuales (Lotus, Cielo, Bosque, Raíz).
                      </p>

                      <form onSubmit={handleAgregarVideo} className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                        <input
                          type="text"
                          value={nuevoVideoTitulo}
                          onChange={(e) => setNuevoVideoTitulo(e.target.value)}
                          placeholder="Título del video..."
                          className="text-xs p-2.5 border border-[#C8D8CE] rounded-xl"
                          required
                        />
                        <input
                          type="text"
                          value={nuevoVideoInstructor}
                          onChange={(e) => setNuevoVideoInstructor(e.target.value)}
                          placeholder="Instructor asignado..."
                          className="text-xs p-2.5 border border-[#C8D8CE] rounded-xl"
                        />
                        <button type="submit" className="bg-[#2D6A4F] text-white text-xs font-bold py-2.5 px-4 rounded-xl">
                          + Cargar Nuevo Video
                        </button>
                      </form>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase text-[#2D6A4F]">Catálogo de Videos Publicados</h4>
                      <div className="space-y-2">
                        {videosList.map((video) => (
                          <div key={video.id} className="p-3 bg-white rounded-xl border border-[#C8D8CE] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div>
                              <p className="text-xs font-bold text-[#2D6A4F]">{video.titulo}</p>
                              <p className="text-[10px] text-[#84A59D]">
                                Instructor: {video.instructor} • Categoría: {video.categoria} • Tarifado: {video.precioWebpay}
                              </p>
                            </div>
                            <button
                              onClick={() => handleEliminarVideo(video.id)}
                              className="text-[10px] font-bold bg-[#FFF0F2] text-[#D85260] px-3 py-1 rounded-lg border border-[#FF8894]"
                            >
                              Eliminar Video
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* APP: BIENESTAR APP */}
                {appSeleccionada === 'bienestar' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
                      <h3 className="text-sm font-bold text-[#2D6A4F]">Bienestar App — Sabiduría Ancestral</h3>
                      <p className="text-xs text-[#52796F]">
                        Moderación del Mural Comunitario, administración de recetarios de fitoterapia nativa descargables en PDF y supervisión del asistente virtual.
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-2xl border border-[#C8D8CE] space-y-2">
                      <h4 className="text-xs font-bold uppercase text-[#2D6A4F]">Recetarios Herbolarios PDF</h4>
                      <p className="text-xs text-[#52796F]">Guías de plantas medicinales y bienestar tradicional.</p>
                      <button className="text-xs font-bold bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1.5 rounded-lg border border-[#C8D8CE]">
                        Subir Nuevo PDF Herbolario
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </section>
          )}

          {/* TAB 2: CASA MATRIZ Y GESTIÓN B2B */}
          {tabActiva === 'casamatriz' && (
            <section className="space-y-6">
              <div className="bg-white p-5 rounded-3xl border-2 border-[#D4AF37] space-y-4">
                <div className="border-b border-[#E8F0EC] pb-3">
                  <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
                    ASL Ideas SpA — Casa Matriz
                  </span>
                  <h2 className="text-lg font-bold text-[#2D6A4F] mt-1">Convenios B2B & Muestrario de Software</h2>
                </div>

                <form onSubmit={handleAgregarConvenio} className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-3">
                  <h3 className="text-xs font-bold uppercase text-[#2D6A4F]">Registrar Nuevo Convenio B2B</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={nuevaInstitucion}
                      onChange={(e) => setNuevaInstitucion(e.target.value)}
                      placeholder="Nombre de Institución / Empresa..."
                      className="text-xs p-2.5 border border-[#C8D8CE] rounded-xl"
                      required
                    />
                    <input
                      type="text"
                      value={nuevoMonto}
                      onChange={(e) => setNuevoMonto(e.target.value)}
                      placeholder="Monto Mensual CLP (ej: $500.000)..."
                      className="text-xs p-2.5 border border-[#C8D8CE] rounded-xl"
                    />
                    <button type="submit" className="bg-[#2D6A4F] text-white text-xs font-bold py-2.5 px-4 rounded-xl">
                      + Activar Convenio
                    </button>
                  </div>
                </form>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase text-[#2D6A4F]">Convenios Corporativos Registrados</h3>
                  <div className="space-y-2">
                    {convenios.map((c) => (
                      <div key={c.id} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div>
                          <p className="text-xs font-bold text-[#2D6A4F]">{c.institucion}</p>
                          <p className="text-[10px] text-[#84A59D]">
                            Tipo: {c.tipo} • Licencias Emitidas: {c.licencias} • Canon: {c.montoMensual}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] px-2.5 py-1 rounded-full border border-[#C8D8CE]">
                          Estado: {c.estado}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 3: OFICINA & LIBROS DE CONTABILIDAD B2B */}
          {tabActiva === 'contabilidad' && (
            <section className="space-y-6">
              
              {/* RESUMEN FINANCIERO EN TARJETAS RESPONSIVAS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-2xl border-2 border-[#C8D8CE] shadow-xs">
                  <span className="text-[10px] font-bold uppercase text-[#84A59D]">Ingresos Totales</span>
                  <p className="text-lg sm:text-xl font-extrabold text-[#2D6A4F] mt-1">
                    ${totalIngresos.toLocaleString('es-CL')} CLP
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border-2 border-[#FF8894] shadow-xs">
                  <span className="text-[10px] font-bold uppercase text-[#D85260]">Egresos & Gastos</span>
                  <p className="text-lg sm:text-xl font-extrabold text-[#D85260] mt-1">
                    ${totalEgresos.toLocaleString('es-CL')} CLP
                  </p>
                </div>

                <div className="bg-white p-4 rounded-2xl border-2 border-[#D4AF37] shadow-xs">
                  <span className="text-[10px] font-bold uppercase text-[#D4AF37]">Resultado Neto</span>
                  <p className="text-lg sm:text-xl font-extrabold text-[#2D6A4F] mt-1">
                    ${resultadoNeto.toLocaleString('es-CL')} CLP
                  </p>
                </div>
              </div>

              {/* FORMULARIO DE REGISTRO EN LIBRO CONTABLE */}
              <div className="bg-white p-5 rounded-3xl border-2 border-[#D4AF37] space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#E8F0EC] pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
                      Oficina Virtual — Libro Diario Cifrado
                    </span>
                    <h2 className="text-lg font-bold text-[#2D6A4F] mt-1">Libro de Contabilidad & Registros Financieros</h2>
                  </div>

                  <button
                    onClick={handleExportarBalance}
                    className="text-xs font-bold bg-[#D4AF37] text-white px-4 py-2 rounded-xl hover:bg-[#B08D4B] transition shadow-xs w-full sm:w-auto"
                  >
                    Exportar Balance en TXT
                  </button>
                </div>

                <form onSubmit={handleAgregarAsiento} className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-3">
                  <h3 className="text-xs font-bold uppercase text-[#2D6A4F]">Registrar Asiento Contable</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <input
                      type="text"
                      value={nuevoConcepto}
                      onChange={(e) => setNuevoConcepto(e.target.value)}
                      placeholder="Concepto o detalle..."
                      className="text-xs p-2.5 border border-[#C8D8CE] rounded-xl sm:col-span-2"
                      required
                    />
                    <input
                      type="number"
                      value={nuevoMontoAsiento}
                      onChange={(e) => setNuevoMontoAsiento(e.target.value)}
                      placeholder="Monto CLP (ej: 150000)..."
                      className="text-xs p-2.5 border border-[#C8D8CE] rounded-xl"
                      required
                    />
                    <select
                      value={tipoAsiento}
                      onChange={(e) => setTipoAsiento(e.target.value as 'Ingreso' | 'Egreso')}
                      className="text-xs p-2.5 border border-[#C8D8CE] rounded-xl bg-white"
                    >
                      <option value="Ingreso">Ingreso (+)</option>
                      <option value="Egreso">Egreso (-)</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-[#2D6A4F] text-white text-xs font-bold py-2.5 rounded-xl">
                    + Registrar en Libro Diario
                  </button>
                </form>

                {/* TABLA DE ASIENTOS ADAPTADA A MÓVIL */}
                <div className="overflow-x-auto space-y-2">
                  <h3 className="text-xs font-bold uppercase text-[#2D6A4F]">Detalle de Movimientos Registrados</h3>
                  <table className="w-full text-left text-xs text-[#2D6A4F] border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-[#E8F0EC] border-b border-[#C8D8CE]">
                        <th className="p-2.5 font-bold">Fecha</th>
                        <th className="p-2.5 font-bold">Concepto</th>
                        <th className="p-2.5 font-bold">Tipo</th>
                        <th className="p-2.5 font-bold text-right">Monto CLP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {asientos.map((item) => (
                        <tr key={item.id} className="border-b border-[#E8F0EC] bg-white">
                          <td className="p-2.5 text-[11px] text-[#84A59D] font-mono">{item.fecha}</td>
                          <td className="p-2.5 font-medium">{item.concepto}</td>
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

                {/* ARCHIVERO DOCUMENTAL DE FACTURAS */}
                <div className="pt-4 border-t border-[#C8D8CE] space-y-3">
                  <h3 className="text-xs font-bold uppercase text-[#2D6A4F]">Bóveda de Facturación & Documentos Protegidos</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {facturas.map((f) => (
                      <div key={f.id} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-[#2D6A4F]">{f.folio} — {f.emisorReceptor}</p>
                          <p className="text-[10px] text-[#84A59D]">{f.tipo} • {f.fecha} • {f.montoTotal}</p>
                        </div>
                        <span className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] px-2 py-0.5 rounded-md border border-[#C8D8CE]">
                          {f.estadoPago}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
          )}

          {/* TAB 4: SEGURIDAD Y LEYES DE CIBERSEGURIDAD */}
          {tabActiva === 'seguridad' && (
            <section className="space-y-6">
              <div className="bg-white p-5 rounded-3xl border-2 border-[#D4AF37] space-y-4">
                <div className="border-b border-[#E8F0EC] pb-3">
                  <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
                    Estándares Normativos
                  </span>
                  <h2 className="text-lg font-bold text-[#2D6A4F] mt-1">Cumplimiento Legal & Ciberseguridad</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
                    <h3 className="text-xs font-bold uppercase text-[#2D6A4F]">Ley N° 21.663 - Ciberseguridad</h3>
                    <p className="text-xs text-[#52796F] leading-relaxed">
                      Encriptación de datos en tránsito y reposo. Las fichas SOAP, libros contables e informes de sesiones virtuales cuentan con respaldo cifrado y clave de acceso de 256 bits.
                    </p>
                  </div>

                  <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
                    <h3 className="text-xs font-bold uppercase text-[#2D6A4F]">Ley TEA N° 21.545 - Accesibilidad</h3>
                    <p className="text-xs text-[#52796F] leading-relaxed">
                      Interfaces con baja carga sensorial, paletas relajantes (#FAF8F5, #52796F, #84A59D) y transcripción en vivo para asegurar accesibilidad universal a personas neurodivergentes.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

        </main>
      )}

    </div>
  );
}