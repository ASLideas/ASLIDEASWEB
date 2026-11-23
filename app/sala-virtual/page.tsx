'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const appParam = searchParams.get('app') || 'Casa Matriz ASL Ideas SpA';
  const logoParam = searchParams.get('logo') || '/logo-asl.png.png';

  const [tabActiva, setTabActiva] = useState<'mision' | 'vivo' | 'cita' | 'cancelar'>('mision');
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [transcripcionActiva, setTranscripcionActiva] = useState(false);
  const [pantallaActiva, setPantallaActiva] = useState<'cam' | 'presentacion' | 'mision' | 'pizarra'>('cam');
  const [modoCalma, setModoCalma] = useState(true);

  // Formulario B2B
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
  const [portal, setPortal] = useState(appParam);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  // Formulario Cancelación
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
          { nombre, rut, email, invitados, portal, fecha, hora, estado: 'CONFIRMADA' }
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
        texto: 'La cita ha sido cancelada exitosamente y el cupo fue liberado.'
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
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#2D6A4F]/20">
        <div className="flex items-center gap-3">
          <img src={logoParam} alt="Logo App" className="w-10 h-10 object-contain rounded-xl bg-white p-1 shadow-md border border-[#E8829C]/30" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#2C3E35]">{appParam}</h1>
            <p className="text-xs text-[#E8829C] font-semibold">Sala Virtual & Red B2B Inclusiva</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white text-[#2C3E35] border border-slate-300 shadow-sm hover:bg-[#F4F1EA] transition"
          >
            {modoCalma ? '🌿 Modo Calma Activo' : 'Modo Oscuro'}
          </button>
          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#2D6A4F] text-white hover:bg-[#1B4D3E] transition shadow-sm"
          >
            Volver a la Web
          </Link>
        </div>
      </header>

      {/* Navegación por Pestañas */}
      <nav className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-[#2D6A4F]/20 pb-2">
        <button
          type="button"
          onClick={() => setTabActiva('mision')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'mision' ? 'bg-[#E8829C] text-white shadow-md' : 'bg-white text-[#2C3E35] border border-slate-200 hover:bg-[#F4F1EA]'
          }`}
        >
          Misión y Visión
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'vivo' ? 'bg-[#2D6A4F] text-white shadow-md' : 'bg-white text-[#2C3E35] border border-slate-200 hover:bg-[#F4F1EA]'
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'cita' ? 'bg-[#E8829C] text-white shadow-md' : 'bg-white text-[#2C3E35] border border-slate-200 hover:bg-[#F4F1EA]'
          }`}
        >
          Agendar Cita B2B
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cancelar')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'cancelar' ? 'bg-red-600 text-white shadow-md' : 'bg-white text-[#2C3E35] border border-slate-200 hover:bg-[#F4F1EA]'
          }`}
        >
          Cancelar Cita
        </button>
      </nav>

      {/* Pestaña 1: Misión y Visión */}
      {tabActiva === 'mision' && (
        <section className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl border border-[#2D6A4F]/20 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="bg-[#E8829C]/15 text-[#E8829C] border border-[#E8829C]/30 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                Propósito & Identidad
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-[#2C3E35] mt-1">{appParam}: Misión y Visión</h2>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-[#FAF8F5] border border-slate-300 hover:bg-[#EAE7DF] text-xs font-semibold text-[#2C3E35] rounded-lg transition"
            >
              Imprimir / PDF
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#2D6A4F]/20 space-y-2">
              <h3 className="text-base font-bold text-[#E8829C]">Nuestra Misión</h3>
              <p className="text-xs md:text-sm text-[#2C3E35] leading-relaxed">
                Diseñar aplicaciones web y móviles amables con baja carga sensorial, adaptadas a personas con neurodivergencias y neurotípicas, otorgando a distintas áreas mayor visibilidad con las herramientas digitales e integrar a personas con discapacidad al mundo laboral.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#2D6A4F]/20 space-y-2">
              <h3 className="text-base font-bold text-[#2D6A4F]">Nuestra Visión</h3>
              <p className="text-xs md:text-sm text-[#2C3E35] leading-relaxed">
                Ser la empresa líder en soluciones tecnológicas accesibles para personas neurodivergentes y con discapacidad, dando trabajo y visibilidad a distintas empresas y dando soluciones a distintas problemáticas que enfrentamos como sociedad a través del diseño, tecnología, conectando personas y emprendedores, bajo estándares de ciberseguridad de la Ley N° 21.663.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Pestaña 2: Sala Virtual en Vivo */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video bg-[#121E19] rounded-2xl overflow-hidden border border-slate-700 shadow-xl flex flex-col items-center justify-center p-4 text-white">
              <div className="text-center">
                <p className="text-[#E8829C] text-xs font-semibold uppercase tracking-wider mb-1">Transmisión Principal en Vivo</p>
                <h3 className="text-lg font-bold text-white mb-2">{appParam}</h3>
                <p className="text-xs text-slate-300">
                  {camActiva ? 'Cámara transmitiendo en alta definición' : 'Cámara desactivada por privacidad / ahorro de ancho de banda'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
              <button
                type="button"
                onClick={() => setMicActivo(!micActivo)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  micActivo ? 'bg-[#2D6A4F] text-white' : 'bg-red-600 text-white'
                }`}
              >
                {micActivo ? 'Micrófono Encendido' : 'Micrófono Silenciado'}
              </button>

              <button
                type="button"
                onClick={() => setCamActiva(!camActiva)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  camActiva ? 'bg-[#2D6A4F] text-white' : 'bg-red-600 text-white'
                }`}
              >
                {camActiva ? 'Cámara Encendida' : 'Encender Cámara'}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-md font-bold mb-2 text-[#2D6A4F]">Información de la Sala</h3>
              <p className="text-xs text-[#52796F] leading-relaxed mb-4">
                Espacio accesible diseñado con baja sobrecarga sensorial para reuniones institucionales y alianzas B2B.
              </p>
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <p><strong className="text-[#2C3E35]">Portal:</strong> {appParam}</p>
                <p><strong className="text-[#2C3E35]">Estado:</strong> <span className="text-[#2D6A4F] font-bold">En Vivo</span></p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setTabActiva('mision')}
                className="w-full py-2.5 bg-[#FAF8F5] border border-slate-300 hover:bg-[#EAE7DF] text-[#2C3E35] text-xs font-bold rounded-xl transition"
              >
                Ver Misión y Visión
              </button>
              <button
                type="button"
                onClick={() => setTabActiva('cita')}
                className="w-full py-2.5 bg-[#E8829C] hover:bg-[#D8708C] text-white text-xs font-bold rounded-xl transition shadow-md"
              >
                + Agendar Cita B2B
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Pestaña 3: Agendar Cita B2B */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xl">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#2C3E35] mb-2">
              Agendar Cita B2B en {appParam}
            </h2>
            <p className="text-xs md:text-sm text-[#52796F]">
              Selecciona fecha y hora. La cita quedará vinculada a la Sala Virtual.
            </p>
          </div>

          {mensaje && (
            <div className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-medium ${
              mensaje.tipo === 'exito' ? 'bg-emerald-100 border border-emerald-400 text-emerald-800' : 'bg-red-100 border border-red-400 text-red-800'
            }`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#2C3E35] mb-1">
                Nombre Completo o Empresa / PYME <span className="text-[#E8829C]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: PYME ASL / Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-slate-300 rounded-xl text-sm text-[#2C3E35] focus:outline-none focus:border-[#E8829C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2C3E35] mb-1">
                RUT o RUT Tributario <span className="text-[#E8829C]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-slate-300 rounded-xl text-sm text-[#2C3E35] focus:outline-none focus:border-[#E8829C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2C3E35] mb-1">
                Correo Electrónico <span className="text-[#E8829C]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-slate-300 rounded-xl text-sm text-[#2C3E35] focus:outline-none focus:border-[#E8829C]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#2C3E35] mb-1">
                  Fecha Preferente <span className="text-[#E8829C]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-slate-300 rounded-xl text-sm text-[#2C3E35] focus:outline-none focus:border-[#E8829C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2C3E35] mb-1">
                  Bloque Horario <span className="text-[#E8829C]">*</span>
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-slate-300 rounded-xl text-sm text-[#2C3E35] focus:outline-none focus:border-[#E8829C]"
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
                className="w-full py-3 bg-[#E8829C] hover:bg-[#D8708C] text-white text-sm font-bold rounded-xl transition shadow-md disabled:opacity-50"
              >
                {cargando ? 'Guardando agendamiento...' : 'Confirmar Cita B2B'}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Pestaña 4: Cancelar Cita */}
      {tabActiva === 'cancelar' && (
        <section className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#2C3E35] mb-2">Cancelar Cita Agendada</h2>
            <p className="text-xs text-[#52796F]">
              Ingresa los datos del titular para liberar el cupo en la Sala Virtual.
            </p>
          </div>

          {cancelMensaje && (
            <div className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-medium ${
              cancelMensaje.tipo === 'exito' ? 'bg-emerald-100 border border-emerald-400 text-emerald-800' : 'bg-red-100 border border-red-400 text-red-800'
            }`}>
              {cancelMensaje.texto}
            </div>
          )}

          <form onSubmit={handleCancelCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#2C3E35] mb-1">
                RUT del Titular <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 12.345.678-9"
                value={cancelRut}
                onChange={(e) => setCancelRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-slate-300 rounded-xl text-sm text-[#2C3E35] focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={cancelCargando}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl transition shadow-md disabled:opacity-50"
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
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Cargando Sala Virtual...</div>}>
      <SalaVirtualContent />
    </Suspense>
  );
}
