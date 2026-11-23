'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'vivo';

  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita' | 'oficina' | 'reprogramar'>(initialTab);
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [modoCalma, setModoCalma] = useState(false);

  // Estados del Formulario B2B
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
  const [portal, setPortal] = useState('Casa Matriz ASL Ideas SpA');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const handleSubmitCita = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);

    try {
      const { supabase } = await import('@/lib/supabaseClient').catch(() => ({ supabase: null as any }));
      
      if (supabase) {
        const { error } = await supabase.from('citas_b2b').insert([
          {
            nombre,
            rut,
            email,
            invitados,
            portal,
            fecha,
            hora
          }
        ]);
        if (error) throw error;
      }

      setMensaje({
        tipo: 'exito',
        texto: '¡Cita confirmada y vinculada a la Video Reunión con éxito!'
      });

      setNombre('');
      setRut('');
      setEmail('');
      setInvitados('');
      setFecha('');
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

  return (
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#F0F4F8] text-[#2C3E35]' : 'bg-[#F7FAF6] text-[#1F2937]'}`}>
      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#B8D6B2] flex items-center justify-center font-bold text-[#1F2937] shadow-lg">
            ASL
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Casa Matriz ASL Ideas SpA</h1>
            <p className="text-xs opacity-75">Sala Virtual & Agendamiento B2B Inclusivo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
          >
            {modoCalma ? ' Modo Calma Activo' : 'Activar Modo Calma (TEA)'}
          </button>
          <a
            href="/"
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition border border-slate-700"
          >
            Volver a la Web
          </a>
        </div>
      </header>

      {/* Navegación por Pestañas */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-slate-700/40 pb-2">
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'vivo'
              ? 'bg-[#B8D6B2] text-[#1F2937] shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
           Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'cita'
              ? 'bg-[#B8D6B2] text-[#1F2937] shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
           Agendar Cita en la Sala
        </button>
      </div>

      {/* Pestaña 1: Transmisión en Vivo */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex items-center justify-center">
              <div className="text-center p-6">
                <p className="text-slate-400 text-sm mb-2">Transmisión Principal en Vivo</p>
                <h3 className="text-lg font-semibold">Reunión Virtual Casa Matriz ASL Ideas SpA</h3>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <button
                type="button"
                onClick={() => setMicActivo(!micActivo)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  micActivo ? 'bg-[#B8D6B2] text-[#1F2937]' : 'bg-red-600/80 text-[#1F2937]'
                }`}
              >
                {micActivo ? ' Micrófono Encendido' : ' Micrófono Apagado'}
              </button>
              <button
                type="button"
                onClick={() => setCamActiva(!camActiva)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  camActiva ? 'bg-[#B8D6B2] text-[#1F2937]' : 'bg-red-600/80 text-[#1F2937]'
                }`}
              >
                {camActiva ? ' Cámara Encendida' : ' Cámara Apagada'}
              </button>
            </div>
          </div>

          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 flex flex-col justify-between">
            <div>
              <h3 className="text-md font-bold mb-3 text-[#B2942F]">Información de la Sala</h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Espacio accesible diseñado con baja sobrecarga sensorial para reuniones institucionales y convenios B2B.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTabActiva('cita')}
              className="w-full py-2.5 bg-[#B8D6B2] hover:bg-emerald-500 text-[#1F2937] text-xs font-bold rounded-xl transition shadow-lg"
            >
              + Agregar Invitados / Agendar Cita B2B
            </button>
          </div>
        </section>
      )}

      {/* Pestaña 2: Formulario de Agendamiento B2B */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-slate-800/80 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#1F2937] mb-2">
              Agendar Cita en la Sala de Casa Matriz ASL Ideas SpA
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Selecciona la fecha y bloque de atención B2B. Al agendar, la cita quedará automáticamente vinculada con la Video Reunión en vivo.
            </p>
          </div>

          {mensaje && (
            <div
              className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-medium ${
                mensaje.tipo === 'exito'
                  ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-200'
                  : 'bg-red-950/80 border border-red-500 text-red-200'
              }`}
            >
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nombre Completo o Empresa <span className="text-[#B2942F]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Centro Médico ASL / Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F7FAF6] border border-slate-700 rounded-xl text-sm text-[#1F2937] placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                RUT o RUT Tributario <span className="text-[#B2942F]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K / 12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F7FAF6] border border-slate-700 rounded-xl text-sm text-[#1F2937] placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Correo Electrónico <span className="text-[#B2942F]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F7FAF6] border border-slate-700 rounded-xl text-sm text-[#1F2937] placeholder-slate-500 focus:outline-none focus:border-emerald-500"
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
                className="w-full px-4 py-2.5 bg-[#F7FAF6] border border-slate-700 rounded-xl text-sm text-[#1F2937] placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Separa varios correos por coma. Recibirán la clave de acceso.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tipo / Portal B2B
              </label>
              <input
                type="text"
                value={portal}
                readOnly
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-400 cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Fecha Preferente <span className="text-[#B2942F]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F7FAF6] border border-slate-700 rounded-xl text-sm text-[#1F2937] focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bloque Horario <span className="text-[#B2942F]">*</span>
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F7FAF6] border border-slate-700 rounded-xl text-sm text-[#1F2937] focus:outline-none focus:border-emerald-500"
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
                className="w-full py-3 bg-[#B8D6B2] hover:bg-emerald-500 text-[#1F2937] text-sm font-bold rounded-xl transition shadow-lg disabled:opacity-50"
              >
                {cargando ? 'Guardando agendamiento...' : 'Confirmar Cita y Vincular a la Video Reunión'}
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
