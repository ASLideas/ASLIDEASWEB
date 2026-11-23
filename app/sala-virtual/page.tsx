'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const appParam = searchParams.get('app') || 'ASL Ideas SpA';

  // Determinación de Logo según App seleccionada
  let logoActual = '/logo-asl.png.png';
  if (appParam.includes('LAWENMOLL')) logoActual = '/logo-lawenmoll.jpg.png';
  if (appParam.includes('Wellness')) logoActual = '/logo-wellness.jpg.jpg';
  if (appParam.includes('Bienestar')) logoActual = '/logo-bienestar.png.png';

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
        texto: 'Cita confirmada y vinculada a la Video Reunión con éxito.'
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
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#FAF8F5] text-[#2C3E35]' : 'bg-[#121E19] text-[#FAF8F5]'}`}>
      {/* Header Corporativo con Logo Dinámico y Rosado */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#2D6A4F]/40">
        <div className="flex items-center gap-3">
          <img src={logoActual} alt={`Logo ${appParam}`} className="w-12 h-12 object-contain rounded-xl bg-white p-1 border-2 border-[#E8829C] shadow-lg" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#E8829C]">{appParam}</h1>
            <p className="text-xs text-[#84A59D]">Sala Virtual B2B & Red Cuerpo y Alma</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1A2822] text-[#FAF8F5] border border-[#E8829C]/50 hover:bg-[#2C3E35] transition"
          >
            {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma (TEA)'}
          </button>
          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1A2822] text-[#FAF8F5] hover:bg-[#2C3E35] transition border border-[#2D6A4F]"
          >
            Volver a la Web
          </Link>
        </div>
      </header>

      {/* Navegación por Pestañas */}
      <nav className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-[#2D6A4F]/40 pb-2">
        <button
          type="button"
          onClick={() => setTabActiva('mision')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'mision' ? 'bg-[#E8829C] text-white shadow-md' : 'bg-[#1A2822] text-slate-300 hover:bg-[#2C3E35]'
          }`}
        >
          Misión y Visión
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'vivo' ? 'bg-[#E8829C] text-white shadow-md' : 'bg-[#1A2822] text-slate-300 hover:bg-[#2C3E35]'
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'cita' ? 'bg-[#E8829C] text-white shadow-md' : 'bg-[#1A2822] text-slate-300 hover:bg-[#2C3E35]'
          }`}
        >
          Agendar Cita B2B
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cancelar')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'cancelar' ? 'bg-red-600/80 text-white shadow-md' : 'bg-[#1A2822] text-slate-300 hover:bg-[#2C3E35]'
          }`}
        >
          Cancelar Cita
        </button>
      </nav>

      {/* Pestaña 1: Misión, Visión & Texto Corporativo Oficial */}
      {tabActiva === 'mision' && (
        <section className="max-w-4xl mx-auto bg-[#1A2822] p-6 md:p-8 rounded-2xl border border-[#E8829C]/50 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#2D6A4F] pb-4">
            <div className="flex items-center gap-3">
              <img src={logoActual} alt="Logo" className="w-9 h-9 object-contain bg-white p-1 rounded-lg border border-[#E8829C]" />
              <div>
                <span className="bg-[#E8829C]/20 text-[#E8829C] border border-[#E8829C]/40 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  TECNOLOGÍA CON ALMA & EMPATÍA | BAJA CARGA SENSORIAL (LEY TEA N° 21.545)
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white mt-1">ASL Ideas SpA — {appParam}</h2>
              </div>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-xs font-semibold text-white rounded-lg transition"
            >
              Imprimir / PDF
            </button>
          </div>

          {/* Declaración Oficial de Empresa Desarrolladora */}
          <div className="bg-[#121E19] p-5 rounded-xl border border-[#E8829C]/40 space-y-3">
            <h3 className="text-base font-bold text-[#E8829C]">
              Desarrollo y soluciones accesibles para PYME y comercio asociado
            </h3>
            <p className="text-xs md:text-sm text-[#D4E0D9] leading-relaxed">
              Desarrollamos soluciones tecnológicas amables diseñadas por y para personas con neurodivergencia y condiciones crónicas de salud, unificando el sistema metabólico, el movimiento adaptado y la sabiduría preventiva. <strong>ASL Ideas SpA Casa Matriz</strong> es la creadora de las tres aplicaciones del ecosistema, desarrolladora de soluciones a medida para el emprendedor.
            </p>
          </div>

          {/* Misión y Visión */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#121E19] p-5 rounded-xl border border-[#2D6A4F] space-y-2">
              <h3 className="text-base font-bold text-[#84A59D]">Nuestra Misión</h3>
              <p className="text-xs text-[#D4E0D9] leading-relaxed">
                Diseñar aplicaciones web y móviles amables con baja carga sensorial, adaptadas a personas con neurodivergencias (TEA 1, TDAH) y condiciones crónicas de salud, impulsando la digitalización de PYMEs y comercios asociados.
              </p>
            </div>

            <div className="bg-[#121E19] p-5 rounded-xl border border-[#2D6A4F] space-y-2">
              <h3 className="text-base font-bold text-[#84A59D]">Nuestra Visión</h3>
              <p className="text-xs text-[#D4E0D9] leading-relaxed">
                Ser la empresa líder en soluciones tecnológicas accesibles y de salud integrativa en Latinoamérica, conectando personas y emprendedores bajo estándares de ciberseguridad Ley N° 21.663.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Pestaña 2: Video Llamada en Vivo */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-[#2D6A4F] shadow-2xl flex flex-col items-center justify-center p-4">
              <div className="text-center">
                <p className="text-[#E8829C] text-xs font-semibold uppercase tracking-wider mb-1">Transmisión Principal en Vivo</p>
                <h3 className="text-lg font-bold text-white mb-2">{appParam}</h3>
                <p className="text-xs text-slate-400">
                  {camActiva ? 'Cámara transmitiendo en alta definición' : 'Cámara desactivada por privacidad / ahorro de ancho de banda'}
                </p>
              </div>

              {transcripcionActiva && (
                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md border border-[#E8829C]/50 p-2.5 rounded-xl text-center text-xs text-[#E8829C]">
                  <span className="font-bold">Transcripción en Vivo (IA):</span> &quot;Bienvenidos a la reunión de {appParam}...&quot;
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-[#1A2822] rounded-xl border border-[#2D6A4F]/50">
              <button
                type="button"
                onClick={() => setMicActivo(!micActivo)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  micActivo ? 'bg-[#2D6A4F] text-white' : 'bg-red-600/90 text-white'
                }`}
              >
                {micActivo ? 'Micrófono Encendido' : 'Micrófono Silenciado'}
              </button>

              <button
                type="button"
                onClick={() => setCamActiva(!camActiva)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  camActiva ? 'bg-[#2D6A4F] text-white' : 'bg-red-600/90 text-white'
                }`}
              >
                {camActiva ? 'Cámara Encendida' : 'Encender Cámara'}
              </button>

              <button
                type="button"
                onClick={() => setTranscripcionActiva(!transcripcionActiva)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  transcripcionActiva ? 'bg-[#E8829C] text-white' : 'bg-[#121E19] text-slate-200 border border-[#2D6A4F]'
                }`}
              >
                {transcripcionActiva ? 'Transcribiendo...' : 'Transcribir Reunión'}
              </button>
            </div>
          </div>

          <div className="bg-[#1A2822] p-6 rounded-2xl border border-[#2D6A4F]/50 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-md font-bold mb-2 text-[#E8829C]">Información de la Sala</h3>
              <p className="text-xs text-[#D4E0D9] leading-relaxed mb-4">
                Espacio de atención y reunión para emprendedores, PYMEs y usuarios de la Red Cuerpo y Alma.
              </p>
              <div className="bg-[#121E19] p-3 rounded-xl border border-[#2D6A4F] text-xs space-y-1.5">
                <p><strong className="text-slate-200">Portal:</strong> {appParam}</p>
                <p><strong className="text-slate-200">Seguridad:</strong> Cifrado Ley N° 21.663</p>
                <p><strong className="text-slate-200">Estado:</strong> <span className="text-[#E8829C] font-bold">En Vivo</span></p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTabActiva('cita')}
              className="w-full py-2.5 bg-[#E8829C] hover:bg-[#D8708C] text-white text-xs font-bold rounded-xl transition shadow-lg"
            >
              + Agendar Cita B2B / PYME
            </button>
          </div>
        </section>
      )}

      {/* Pestaña 3: Agendar Cita */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-[#1A2822] p-6 md:p-8 rounded-2xl border border-[#E8829C]/50 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Agendar Cita B2B en {appParam}
            </h2>
            <p className="text-xs md:text-sm text-[#D4E0D9]">
              Súmate como PYME o comercio asociado para desarrollar soluciones tecnológicas a medida.
            </p>
          </div>

          {mensaje && (
            <div className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-medium ${
              mensaje.tipo === 'exito' ? 'bg-[#121E19] border border-[#E8829C] text-[#E8829C]' : 'bg-red-950/80 border border-red-500 text-red-200'
            }`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#D4E0D9] mb-1">
                Nombre Completo o Empresa / PYME <span className="text-[#E8829C]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: PYME ASL / Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-[#2D6A4F] rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4E0D9] mb-1">
                RUT o RUT Tributario <span className="text-[#E8829C]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K / 12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-[#2D6A4F] rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4E0D9] mb-1">
                Correo Electrónico <span className="text-[#E8829C]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-[#2D6A4F] rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#D4E0D9] mb-1">
                  Fecha Preferente <span className="text-[#E8829C]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#121E19] border border-[#2D6A4F] rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4E0D9] mb-1">
                  Bloque Horario <span className="text-[#E8829C]">*</span>
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#121E19] border border-[#2D6A4F] rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={cargando}
                className="w-full py-3 bg-[#E8829C] hover:bg-[#D8708C] text-white text-sm font-bold rounded-xl transition shadow-lg disabled:opacity-50 uppercase tracking-wider"
              >
                {cargando ? 'Guardando agendamiento...' : 'Confirmar Cita B2B y Solicitar Solución a Medida'}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Pestaña 4: Cancelar Cita */}
      {tabActiva === 'cancelar' && (
        <section className="max-w-2xl mx-auto bg-[#1A2822] p-6 md:p-8 rounded-2xl border border-[#2D6A4F] shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Cancelar Cita Agendada</h2>
            <p className="text-xs text-[#D4E0D9]">
              Ingresa los datos del titular para liberar el cupo en la Sala Virtual.
            </p>
          </div>

          {cancelMensaje && (
            <div className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-medium ${
              cancelMensaje.tipo === 'exito' ? 'bg-[#121E19] border border-[#E8829C] text-[#E8829C]' : 'bg-red-950/80 border border-red-500 text-red-200'
            }`}>
              {cancelMensaje.texto}
            </div>
          )}

          <form onSubmit={handleCancelCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#D4E0D9] mb-1">
                RUT del Titular <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 12.345.678-9"
                value={cancelRut}
                onChange={(e) => setCancelRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-[#2D6A4F] rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={cancelCargando}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl transition shadow-lg disabled:opacity-50 uppercase tracking-wider"
              >
                {cancelCargando ? 'Procesando...' : 'Confirmar Cancelación'}
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
