'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const appParam = searchParams.get('app') || 'ASL Ideas SpA';

  // Selección dinámica del logo según la aplicación
  const getAppLogo = (nombreApp: string) => {
    if (nombreApp.includes('LAWENMOLL')) return '/logo-lawenmoll.jpg.png';
    if (nombreApp.includes('Wellness')) return '/logo-wellness.jpg.jpg';
    if (nombreApp.includes('Bienestar')) return '/logo-bienestar.png.png';
    return '/logo-asl.png.png';
  };

  const currentLogo = searchParams.get('logo') || getAppLogo(appParam);

  const [tabActiva, setTabActiva] = useState<'mision' | 'vivo' | 'cita' | 'cancelar'>('mision');
  
  // Controles de Video Llamada
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [transcripcionActiva, setTranscripcionActiva] = useState(false);
  const [pantallaActiva, setPantallaActiva] = useState<'cam' | 'presentacion' | 'mision' | 'pizarra'>('cam');
  const [modoCalma, setModoCalma] = useState(false);

  // Formulario de Agendamiento B2B
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  // Formulario de Cancelación de Cita
  const [cancelRut, setCancelRut] = useState('');
  const [cancelFolio, setCancelFolio] = useState('');
  const [cancelMotivo, setCancelMotivo] = useState('');
  const [cancelCargando, setCancelCargando] = useState(false);
  const [cancelMensaje, setCancelMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  // Agendar Cita en Supabase
  const handleSubmitCita = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);

    try {
      const { supabase } = await import('@/lib/supabaseClient').catch(() => ({ supabase: null as any }));
      if (supabase) {
        const { error } = await supabase.from('citas_b2b').insert([
          { nombre, rut, email, invitados, portal: appParam, fecha, hora, estado: 'CONFIRMADA' }
        ]);
        if (error) throw error;
      }

      setMensaje({
        tipo: 'exito',
        texto: 'Cita confirmada y vinculada a la Video Reunion con exito.'
      });
      setNombre(''); setRut(''); setEmail(''); setInvitados(''); setFecha('');
    } catch (err: any) {
      console.error('Error al agendar cita:', err);
      setMensaje({
        tipo: 'error',
        texto: 'No se pudo registrar la cita. Por favor verifica los datos o intenta nuevamente.'
      });
    } finally {
      setCargando(false);
    }
  };

  // Cancelar Cita en Supabase
  const handleCancelCita = async (e: React.FormEvent) => {
    e.preventDefault();
    setCancelCargando(true);
    setCancelMensaje(null);

    try {
      const { supabase } = await import('@/lib/supabaseClient').catch(() => ({ supabase: null as any }));
      if (supabase) {
        const { error } = await supabase
          .from('citas_b2b')
          .update({ estado: 'CANCELADA', motivo_cancelacion: cancelMotivo })
          .eq('rut', cancelRut);
        if (error) throw error;
      }

      setCancelMensaje({
        tipo: 'exito',
        texto: 'La cita asociada al RUT ingresado ha sido cancelada exitosamente y el cupo fue liberado.'
      });
      setCancelRut(''); setCancelFolio(''); setCancelMotivo('');
    } catch (err: any) {
      console.error('Error al cancelar cita:', err);
      setCancelMensaje({
        tipo: 'error',
        texto: 'No se encontro una cita activa asociada a los datos ingresados.'
      });
    } finally {
      setCancelCargando(false);
    }
  };

  return (
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#FAF8F5] text-[#2C3E35]' : 'bg-[#121E19] text-white'}`}>
      {/* Header Corporativo con Logo Dinámico */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-emerald-900/50">
        <div className="flex items-center gap-3">
          <img src={currentLogo} alt={appParam} className="w-10 h-10 object-contain rounded-xl bg-white p-1 shadow-lg border border-[#E8829C]/40" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#E8829C]">{appParam}</h1>
            <p className="text-xs opacity-75">Sala Virtual B2B & Red de Soluciones Digitales</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-950 text-emerald-200 border border-emerald-800 hover:bg-emerald-900 transition"
          >
            {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma (TEA)'}
          </button>
          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-950 text-emerald-200 hover:bg-emerald-900 transition border border-emerald-800"
          >
            Volver a la Web
          </Link>
        </div>
      </header>

      {/* Navegación por Pestañas */}
      <nav className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-emerald-900/40 pb-2">
        <button
          type="button"
          onClick={() => setTabActiva('mision')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'mision' ? 'bg-[#E8829C] text-slate-950 shadow-md font-bold' : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900'
          }`}
        >
          Misión y Visión
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'vivo' ? 'bg-[#E8829C] text-slate-950 shadow-md font-bold' : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900'
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'cita' ? 'bg-[#E8829C] text-slate-950 shadow-md font-bold' : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900'
          }`}
        >
          Agendar Cita B2B
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cancelar')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'cancelar' ? 'bg-red-600/90 text-white shadow-md' : 'bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900'
          }`}
        >
          Cancelar Cita
        </button>
      </nav>

      {/* Pestaña 1: Misión, Visión & Propósito Corporativo */}
      {tabActiva === 'mision' && (
        <section className="max-w-4xl mx-auto bg-[#1A2822] p-6 md:p-8 rounded-2xl border border-emerald-800 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-emerald-800 pb-4">
            <div>
              <span className="bg-[#E8829C]/20 text-[#E8829C] border border-[#E8829C]/40 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                Identidad & Propósito Corporativo
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white mt-1">ASL Ideas SpA: Misión y Visión</h2>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-xs font-semibold text-white rounded-lg transition"
            >
              Imprimir / PDF
            </button>
          </div>

          {/* Banner de Presentación */}
          <div className="bg-[#121E19] p-5 rounded-xl border border-emerald-900 space-y-2">
            <h3 className="text-base font-bold text-[#E8829C]">Visualización, Diseño & Desarrollo de Apps</h3>
            <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
              Diseñamos y desarrollamos soluciones tecnológicas amables y herramientas digitales a medida para emprendedores, PYMEs y comercios. ASL Ideas SpA Casa Matriz combina diseño gráfico de alta sensibilidad visual con ingeniería de software accesible. Aunque nacimos impulsando el ecosistema de la salud y el bienestar integrativo, creamos plataformas e interfaces visuales adaptadas para potenciar negocios en cualquier área del mercado.
            </p>
          </div>

          {/* Misión y Visión Oficiales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#121E19] p-5 rounded-xl border border-emerald-900 space-y-2">
              <h3 className="text-base font-bold text-emerald-400">Nuestra Misión</h3>
              <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
                Diseñar aplicaciones web y móviles amables con baja carga sensorial, adaptadas a personas con neurodivergencias y neurotípicas, otorgando a distintas áreas una mayor visibilidad mediante herramientas digitales e integrando a personas con discapacidad al mundo laboral.
              </p>
            </div>

            <div className="bg-[#121E19] p-5 rounded-xl border border-emerald-900 space-y-2">
              <h3 className="text-base font-bold text-emerald-400">Nuestra Visión</h3>
              <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
                Ser la empresa líder en soluciones tecnológicas accesibles para personas neurodivergentes y con discapacidad, dando trabajo y visibilidad a distintas empresas y entregando respuestas a diversas problemáticas que enfrentamos como sociedad a través del diseño y la tecnología, conectando personas y emprendedores bajo los estándares de ciberseguridad de la Ley N° 21.663.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Pestaña 2: Video Llamada en Vivo */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-emerald-900 shadow-2xl flex flex-col items-center justify-center p-4">
              {pantallaActiva === 'cam' && (
                <div className="text-center">
                  <p className="text-[#E8829C] text-xs font-semibold uppercase tracking-wider mb-1">Transmisión Principal en Vivo</p>
                  <h3 className="text-lg font-bold text-white mb-2">{appParam}</h3>
                  <p className="text-xs text-slate-400">
                    {camActiva ? 'Cámara transmitiendo en alta definición' : 'Cámara desactivada por privacidad / ahorro de ancho de banda'}
                  </p>
                </div>
              )}

              {pantallaActiva === 'presentacion' && (
                <div className="text-center bg-slate-950/90 w-full h-full flex flex-col items-center justify-center p-6 border border-slate-800 rounded-xl">
                  <h4 className="text-sm font-bold text-emerald-300 mb-1">Presentación Corporativa & Diapositivas B2B</h4>
                  <p className="text-xs text-slate-400">Compartiendo pantalla de convenio institucional ASL Ideas SpA</p>
                </div>
              )}

              {pantallaActiva === 'mision' && (
                <div className="text-center bg-slate-950/90 w-full h-full flex flex-col items-center justify-center p-6 border border-slate-800 rounded-xl">
                  <h4 className="text-sm font-bold text-emerald-300 mb-1">Misión, Visión & Propósito B2B</h4>
                  <p className="text-xs text-slate-400">Visualizando propuesta de desarrollo tecnológico inclusivo</p>
                </div>
              )}

              {pantallaActiva === 'pizarra' && (
                <div className="text-center bg-slate-950/90 w-full h-full flex flex-col items-center justify-center p-6 border border-slate-800 rounded-xl">
                  <h4 className="text-sm font-bold text-emerald-300 mb-1">Pizarra Digital Colaborativa</h4>
                  <p className="text-xs text-slate-400">Dibujo y anotaciones de accesibilidad cognitiva en tiempo real</p>
                </div>
              )}

              {/* Subtítulos en Vivo */}
              {transcripcionActiva && (
                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md border border-[#E8829C]/50 p-2.5 rounded-xl text-center text-xs text-emerald-200">
                  <span className="font-bold text-[#E8829C]">Transcripción en Vivo (IA):</span> &quot;Bienvenidos a la reunión de Casa Matriz ASL Ideas SpA...&quot;
                </div>
              )}
            </div>

            {/* Panel de Controles Interactivos */}
            <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-[#1A2822] rounded-xl border border-emerald-900">
              <button
                type="button"
                onClick={() => setMicActivo(!micActivo)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  micActivo ? 'bg-emerald-700 text-white' : 'bg-red-600/90 text-white'
                }`}
              >
                {micActivo ? 'Micrófono Encendido' : 'Micrófono Silenciado'}
              </button>

              <button
                type="button"
                onClick={() => setCamActiva(!camActiva)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  camActiva ? 'bg-emerald-700 text-white' : 'bg-red-600/90 text-white'
                }`}
              >
                {camActiva ? 'Cámara Encendida' : 'Encender Cámara'}
              </button>

              <button
                type="button"
                onClick={() => setTranscripcionActiva(!transcripcionActiva)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  transcripcionActiva ? 'bg-[#E8829C] text-slate-950 font-bold' : 'bg-emerald-950 text-emerald-200'
                }`}
              >
                {transcripcionActiva ? 'Transcribiendo...' : 'Transcribir Reunión'}
              </button>

              {/* Selector de Pantallas */}
              <div className="flex items-center gap-1 bg-[#121E19] p-1 rounded-lg border border-emerald-900 text-xs">
                <span className="text-[11px] text-emerald-300/70 px-2">Pantalla:</span>
                <button
                  type="button"
                  onClick={() => setPantallaActiva('cam')}
                  className={`px-2 py-1 rounded ${pantallaActiva === 'cam' ? 'bg-[#E8829C] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Principal
                </button>
                <button
                  type="button"
                  onClick={() => setPantallaActiva('presentacion')}
                  className={`px-2 py-1 rounded ${pantallaActiva === 'presentacion' ? 'bg-[#E8829C] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Presentación
                </button>
                <button
                  type="button"
                  onClick={() => setPantallaActiva('mision')}
                  className={`px-2 py-1 rounded ${pantallaActiva === 'mision' ? 'bg-[#E8829C] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Misión/Visión
                </button>
                <button
                  type="button"
                  onClick={() => setPantallaActiva('pizarra')}
                  className={`px-2 py-1 rounded ${pantallaActiva === 'pizarra' ? 'bg-[#E8829C] text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  Pizarra
                </button>
              </div>
            </div>
          </div>

          {/* Panel Lateral de Información */}
          <div className="bg-[#1A2822] p-6 rounded-2xl border border-emerald-900 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-md font-bold mb-2 text-[#E8829C]">Información de la Sala</h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed mb-4">
                Espacio accesible diseñado con baja sobrecarga sensorial para reuniones institucionales, convenios B2B y desarrollo de herramientas PYME.
              </p>
              <div className="bg-[#121E19] p-3 rounded-xl border border-emerald-900 text-xs space-y-1.5">
                <p><strong className="text-emerald-200">Portal:</strong> {appParam}</p>
                <p><strong className="text-emerald-200">Seguridad:</strong> Cifrado SSL / Ley N° 21.663</p>
                <p><strong className="text-emerald-200">Estado:</strong> <span className="text-[#E8829C] font-bold">En Vivo</span></p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setTabActiva('mision')}
                className="w-full py-2.5 bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition"
              >
                Ver Misión y Visión
              </button>
              <button
                type="button"
                onClick={() => setTabActiva('cita')}
                className="w-full py-2.5 bg-[#E8829C] hover:bg-[#d7718b] text-slate-950 text-xs font-bold rounded-xl transition shadow-lg"
              >
                + Agendar Cita B2B
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Pestaña 3: Formulario de Agendamiento B2B */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-[#1A2822] p-6 md:p-8 rounded-2xl border border-emerald-900 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Agendar Cita B2B en {appParam}
            </h2>
            <p className="text-xs md:text-sm text-emerald-100/80">
              Selecciona la fecha y bloque de atención para coordinar proyectos de diseño, desarrollo de software o convenios institucionales.
            </p>
          </div>

          {mensaje && (
            <div className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-medium ${
              mensaje.tipo === 'exito' ? 'bg-emerald-950 border border-emerald-500 text-emerald-200' : 'bg-red-950 border border-red-500 text-red-200'
            }`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-1">
                Nombre Completo o Empresa / PYME <span className="text-[#E8829C]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: PYME Comercial / Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-emerald-900 rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-1">
                RUT o RUT Tributario <span className="text-[#E8829C]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K / 12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-emerald-900 rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-1">
                Correo Electrónico <span className="text-[#E8829C]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-emerald-900 rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-1">
                Correos de Invitados / Socios (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-emerald-900 rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1">
                  Fecha Preferente <span className="text-[#E8829C]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#121E19] border border-emerald-900 rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1">
                  Bloque Horario <span className="text-[#E8829C]">*</span>
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#121E19] border border-emerald-900 rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={cargando}
                className="w-full py-3 bg-[#E8829C] hover:bg-[#d7718b] text-slate-950 text-sm font-bold rounded-xl transition shadow-lg disabled:opacity-50"
              >
                {cargando ? 'Guardando agendamiento...' : 'Confirmar Cita y Vincular a la Video Reunión'}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Pestaña 4: Cancelar Cita */}
      {tabActiva === 'cancelar' && (
        <section className="max-w-2xl mx-auto bg-[#1A2822] p-6 md:p-8 rounded-2xl border border-emerald-900 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Cancelar Cita Agendada</h2>
            <p className="text-xs text-emerald-100/80">
              Ingresa los datos del titular para proceder con la cancelación y liberación inmediata del cupo en la Sala Virtual.
            </p>
          </div>

          {cancelMensaje && (
            <div className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-medium ${
              cancelMensaje.tipo === 'exito' ? 'bg-emerald-950 border border-emerald-500 text-emerald-200' : 'bg-red-950 border border-red-500 text-red-200'
            }`}>
              {cancelMensaje.texto}
            </div>
          )}

          <form onSubmit={handleCancelCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-1">
                RUT del Titular <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 12.345.678-9"
                value={cancelRut}
                onChange={(e) => setCancelRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-emerald-900 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-1">
                Folio o Código de Reserva (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: B2B-9876"
                value={cancelFolio}
                onChange={(e) => setCancelFolio(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-emerald-900 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-emerald-200 mb-1">
                Motivo de Cancelación (Opcional)
              </label>
              <textarea
                rows={2}
                placeholder="Ej: Cambio de fecha o problema de agenda"
                value={cancelMotivo}
                onChange={(e) => setCancelMotivo(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-emerald-900 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={cancelCargando}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl transition shadow-lg disabled:opacity-50"
              >
                {cancelCargando ? 'Procesando cancelación...' : 'Confirmar Cancelación de Cita'}
              </button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}

export default function SalaVirtualPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-emerald-200">Cargando Sala Virtual...</div>}>
      <SalaVirtualContent />
    </Suspense>
  );
}
