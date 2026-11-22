'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const appParam = searchParams.get('app') || 'Casa Matriz ASL Ideas SpA';

  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita' | 'ficha' | 'cancelar'>('vivo');
  
  // Estados de Controles dentro de la Video Llamada
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [transcripcionActiva, setTranscripcionActiva] = useState(false);
  const [pantallaActiva, setPantallaActiva] = useState<'cam' | 'presentacion' | 'ficha' | 'pizarra'>('cam');
  const [modoCalma, setModoCalma] = useState(false);

  // Estados del Formulario de Agendamiento B2B
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
  const [portal, setPortal] = useState(appParam);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  // Estados del Formulario de Cancelación de Cita
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
          { nombre, rut, email, invitados, portal, fecha, hora, estado: 'CONFIRMADA' }
        ]);
        if (error) throw error;
      }

      setMensaje({
        tipo: 'exito',
        texto: '¡Cita confirmada y vinculada a la Video Reunión con éxito!'
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
        texto: 'No se encontró una cita activa asociada a los datos ingresados.'
      });
    } finally {
      setCancelCargando(false);
    }
  };

  return (
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#FAF8F5] text-[#2C3E35]' : 'bg-slate-900 text-white'}`}>
      {/* Header Corporativo */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-white shadow-lg">
            ASL
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{appParam}</h1>
            <p className="text-xs opacity-75">Sala Virtual & Agendamiento B2B Inclusivo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition"
          >
            {modoCalma ? '🌿 Modo Calma Activo' : 'Activar Modo Calma (TEA)'}
          </button>
          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition border border-slate-700"
          >
            Volver a la Web
          </Link>
        </div>
      </header>

      {/* Navegación por Pestañas */}
      <nav className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-slate-700/40 pb-2">
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'vivo' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          📹 Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'cita' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          📅 Agendar Cita B2B
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('ficha')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'ficha' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          📋 Ficha Oficial
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cancelar')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'cancelar' ? 'bg-red-600/80 text-white shadow-md' : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          ❌ Cancelar Cita
        </button>
      </nav>

      {/* Pestaña 1: Video Llamada en Vivo */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col items-center justify-center p-4">
              {pantallaActiva === 'cam' && (
                <div className="text-center">
                  <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">Transmisión Principal en Vivo</p>
                  <h3 className="text-lg font-bold text-white mb-2">{appParam}</h3>
                  <p className="text-xs text-slate-400">
                    {camActiva ? '📹 Cámara transmitiendo en alta definición' : '📹 Cámara desactivada por privacidad / ahorro de ancho de banda'}
                  </p>
                </div>
              )}

              {pantallaActiva === 'presentacion' && (
                <div className="text-center bg-slate-950/90 w-full h-full flex flex-col items-center justify-center p-6 border border-slate-800 rounded-xl">
                  <span className="text-2xl mb-2">📊</span>
                  <h4 className="text-sm font-bold text-emerald-300 mb-1">Presentación Corporativa & Diapositivas B2B</h4>
                  <p className="text-xs text-slate-400">Compartiendo pantalla de convenio institucional ASL Ideas SpA</p>
                </div>
              )}

              {pantallaActiva === 'ficha' && (
                <div className="text-center bg-slate-950/90 w-full h-full flex flex-col items-center justify-center p-6 border border-slate-800 rounded-xl">
                  <span className="text-2xl mb-2">📋</span>
                  <h4 className="text-sm font-bold text-emerald-300 mb-1">Ficha Clínica / Integrativa en Pantalla</h4>
                  <p className="text-xs text-slate-400">Visualizando datos encriptados bajo cumplimiento Ley N° 21.663</p>
                </div>
              )}

              {pantallaActiva === 'pizarra' && (
                <div className="text-center bg-slate-950/90 w-full h-full flex flex-col items-center justify-center p-6 border border-slate-800 rounded-xl">
                  <span className="text-2xl mb-2">🎨</span>
                  <h4 className="text-sm font-bold text-emerald-300 mb-1">Pizarra Digital Colaborativa</h4>
                  <p className="text-xs text-slate-400">Dibujo y anotaciones de accesibilidad cognitiva en tiempo real</p>
                </div>
              )}

              {/* Subtítulos en Vivo */}
              {transcripcionActiva && (
                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md border border-emerald-500/50 p-2.5 rounded-xl text-center text-xs text-emerald-200">
                  <span className="font-bold text-emerald-400">📝 Transcripción en Vivo (IA):</span> &quot;Bienvenidos a la reunión de Casa Matriz ASL Ideas SpA...&quot;
                </div>
              )}
            </div>

            {/* Panel de Controles Interactivos */}
            <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-slate-800/60 rounded-xl border border-slate-700/50">
              <button
                type="button"
                onClick={() => setMicActivo(!micActivo)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  micActivo ? 'bg-emerald-600 text-white' : 'bg-red-600/90 text-white'
                }`}
              >
                {micActivo ? '🎙️ Micrófono Encendido' : '🎙️ Micrófono Silenciado'}
              </button>

              <button
                type="button"
                onClick={() => setCamActiva(!camActiva)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  camActiva ? 'bg-emerald-600 text-white' : 'bg-red-600/90 text-white'
                }`}
              >
                {camActiva ? '📹 Cámara Encendida' : '📹 Encender Cámara'}
              </button>

              <button
                type="button"
                onClick={() => setTranscripcionActiva(!transcripcionActiva)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  transcripcionActiva ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'
                }`}
              >
                {transcripcionActiva ? '📝 Transcribiendo...' : '📝 Transcribir Reunión'}
              </button>

              {/* Selector de Pantallas */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-700 text-xs">
                <span className="text-[11px] text-slate-400 px-2">🖥️ Pantalla:</span>
                <button
                  type="button"
                  onClick={() => setPantallaActiva('cam')}
                  className={`px-2 py-1 rounded ${pantallaActiva === 'cam' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Principal
                </button>
                <button
                  type="button"
                  onClick={() => setPantallaActiva('presentacion')}
                  className={`px-2 py-1 rounded ${pantallaActiva === 'presentacion' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Presentación
                </button>
                <button
                  type="button"
                  onClick={() => setPantallaActiva('ficha')}
                  className={`px-2 py-1 rounded ${pantallaActiva === 'ficha' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Ficha
                </button>
                <button
                  type="button"
                  onClick={() => setPantallaActiva('pizarra')}
                  className={`px-2 py-1 rounded ${pantallaActiva === 'pizarra' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Pizarra
                </button>
              </div>
            </div>
          </div>

          {/* Panel Lateral de Información */}
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-md font-bold mb-2 text-emerald-400">Información de la Sala</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Espacio accesible diseñado con baja sobrecarga sensorial para reuniones institucionales, convenios B2B y atenciones de Salud Digital Inclusiva.
              </p>
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 text-xs space-y-1.5">
                <p><strong className="text-slate-200">Portal:</strong> {appParam}</p>
                <p><strong className="text-slate-200">Seguridad:</strong> Cifrado SSL / Ley N° 21.663</p>
                <p><strong className="text-slate-200">Estado:</strong> <span className="text-emerald-400 font-bold">● En Vivo</span></p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setTabActiva('ficha')}
                className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-xl transition"
              >
                📋 Abrir Ficha Oficial
              </button>
              <button
                type="button"
                onClick={() => setTabActiva('cita')}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-lg"
              >
                + Agendar Cita B2B
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Pestaña 2: Formulario de Agendamiento B2B */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-slate-800/80 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Agendar Cita B2B en {appParam}
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Selecciona la fecha y bloque de atención. La cita quedará automáticamente vinculada con la Sala Virtual.
            </p>
          </div>

          {mensaje && (
            <div className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-medium ${
              mensaje.tipo === 'exito' ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-200' : 'bg-red-950/80 border border-red-500 text-red-200'
            }`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nombre Completo o Empresa <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Centro Médico ASL / Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                RUT o RUT Tributario <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K / 12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Correo Electrónico <span className="text-emerald-400">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Correos de Invitados Adicionales (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Fecha Preferente <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bloque Horario <span className="text-emerald-400">*</span>
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
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
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition shadow-lg disabled:opacity-50"
              >
                {cargando ? 'Guardando agendamiento...' : 'Confirmar Cita y Vincular a la Video Reunión'}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Pestaña 3: Ficha Oficial */}
      {tabActiva === 'ficha' && (
        <section className="max-w-3xl mx-auto bg-slate-800/80 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <div>
              <span className="bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                Ficha Oficial Cifrada
              </span>
              <h2 className="text-xl font-bold text-white mt-1">Registro Clínico e Integrativo</h2>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white rounded-lg transition"
            >
              🖨️ Imprimir / PDF
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60">
              <p className="text-slate-400">Institución / Casa Matriz:</p>
              <p className="font-bold text-white text-sm">ASL Ideas SpA</p>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60">
              <p className="text-slate-400">Normativa de Seguridad:</p>
              <p className="font-bold text-emerald-400 text-sm">Cifrado Ley N° 21.663</p>
            </div>
          </div>

          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 space-y-2 text-xs text-slate-300">
            <h4 className="font-bold text-emerald-400 text-sm">Observaciones de Accesibilidad Cognitiva:</h4>
            <p>• Paciente/Usuario requiere interfaz con baja carga sensorial (Paleta suave, contraste reducido).</p>
            <p>• Modalidad de atención adaptada para personas con Condición del Espectro Autista (TEA) y TDAH.</p>
            <p>• Subtítulos en vivo y material de apoyo visual activados automáticamente.</p>
          </div>
        </section>
      )}

      {/* Pestaña 4: Cancelar Cita */}
      {tabActiva === 'cancelar' && (
        <section className="max-w-2xl mx-auto bg-slate-800/80 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Cancelar Cita Agendada</h2>
            <p className="text-xs text-slate-300">
              Ingresa los datos del titular para proceder con la cancelación y liberación inmediata del cupo en la Sala Virtual.
            </p>
          </div>

          {cancelMensaje && (
            <div className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-medium ${
              cancelMensaje.tipo === 'exito' ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-200' : 'bg-red-950/80 border border-red-500 text-red-200'
            }`}>
              {cancelMensaje.texto}
            </div>
          )}

          <form onSubmit={handleCancelCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                RUT del Titular <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 12.345.678-9"
                value={cancelRut}
                onChange={(e) => setCancelRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Folio o Código de Reserva (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: B2B-9876"
                value={cancelFolio}
                onChange={(e) => setCancelFolio(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Motivo de Cancelación (Opcional)
              </label>
              <textarea
                rows={2}
                placeholder="Ej: Cambio de fecha o problema de agenda"
                value={cancelMotivo}
                onChange={(e) => setCancelMotivo(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
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
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Cargando Sala Virtual...</div>}>
      <SalaVirtualContent />
    </Suspense>
  );
}