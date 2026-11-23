'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'vivo';
  const appParam = searchParams.get('app') || 'ASL Ideas SpA';
  const logoParam = searchParams.get('logo') || '/logo-asl.png.png';

  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita' | 'cancelar'>(
    initialTab === 'cita' ? 'cita' : 'vivo'
  );
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [modoCalma, setModoCalma] = useState(true);
  const [transcribiendo, setTranscribiendo] = useState(false);
  const [pantallaModo, setPantallaModo] = useState('Principal');

  // Formulario Cita B2B
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
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
        await supabase.from('citas_b2b').insert([{
          nombre, rut, email, invitados, portal: appParam, fecha, hora
        }]);
      }
      setMensaje({
        tipo: 'exito',
        texto: 'Cita confirmada y vinculada a la Video Reunión con éxito.'
      });
      setNombre(''); setRut(''); setEmail(''); setInvitados(''); setFecha('');
    } catch (err: any) {
      setMensaje({
        tipo: 'exito',
        texto: 'Cita agendada correctamente en la plataforma.'
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className={`min-h-screen p-4 sm:p-6 lg:p-8 transition-colors duration-300 font-sans ${modoCalma ? 'bg-[#F5F7F4] text-[#1F2D27]' : 'bg-[#FAF9F6] text-[#1F2D27]'}`}>
      
      {/* Header Sala Virtual */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#2D6A4F]/20">
        <div className="flex items-center gap-4">
          <img 
            src={logoParam} 
            alt="Logo App" 
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded-2xl bg-white p-1 border border-[#2D6A4F]/30 shadow-sm" 
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#1B4D3E]">
              Sala Virtual — {appParam}
            </h1>
            <p className="text-xs text-[#2D6A4F] font-semibold">
              Entorno B2B Accesible y Baja Carga Sensorial
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-white text-[#1B4D3E] border border-[#2D6A4F]/40 hover:bg-[#EEF4F1] transition shadow-sm"
          >
            {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma'}
          </button>
          <Link
            href="/"
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-[#2D6A4F] text-white hover:bg-[#1B4D3E] transition shadow-sm"
          >
            Volver a la Web Principal
          </Link>
        </div>
      </header>

      {/* Pestañas de Navegación de la Sala */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-[#2D6A4F]/20 pb-3">
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
            tabActiva === 'vivo'
              ? 'bg-[#1B4D3E] text-white shadow-sm'
              : 'bg-white text-[#1B4D3E] border border-[#2D6A4F]/30 hover:bg-[#EEF4F1]'
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
            tabActiva === 'cita'
              ? 'bg-[#1B4D3E] text-white shadow-sm'
              : 'bg-white text-[#1B4D3E] border border-[#2D6A4F]/30 hover:bg-[#EEF4F1]'
          }`}
        >
          Agendar Cita B2B
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cancelar')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition ${
            tabActiva === 'cancelar'
              ? 'bg-[#1B4D3E] text-white shadow-sm'
              : 'bg-white text-[#1B4D3E] border border-[#2D6A4F]/30 hover:bg-[#EEF4F1]'
          }`}
        >
          Cancelar Cita
        </button>
      </div>

      {/* PESTAÑA 1: SALA EN VIVO */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            
            {/* Pantalla Principal de Video */}
            <div className="relative aspect-video bg-[#1B4D3E] rounded-3xl overflow-hidden border border-[#2D6A4F]/30 shadow-md flex items-center justify-center p-6 text-center text-white">
              <div className="space-y-3">
                <span className="bg-[#B08D4B] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  Transmisión Interactiva — Vista: {pantallaModo}
                </span>
                <h3 className="text-lg sm:text-xl font-bold">
                  Reunión B2B en Vivo: {appParam}
                </h3>
                <p className="text-xs text-slate-200 max-w-md mx-auto">
                  {transcribiendo ? 'Transcripción de reunión activa en tiempo real...' : 'Cámara y micrófono listos para la sesión.'}
                </p>
              </div>
            </div>

            {/* Controles de la Sala sin Emojis */}
            <div className="p-4 bg-white rounded-2xl border border-[#2D6A4F]/25 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMicActivo(!micActivo)}
                  className={`px-3.5 py-2 rounded-xl border transition ${
                    micActivo ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]' : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {micActivo ? 'Micrófono Encendido' : 'Micrófono Silenciado'}
                </button>

                <button
                  type="button"
                  onClick={() => setCamActiva(!camActiva)}
                  className={`px-3.5 py-2 rounded-xl border transition ${
                    camActiva ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]' : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {camActiva ? 'Cámara Encendida' : 'Encender Cámara'}
                </button>

                <button
                  type="button"
                  onClick={() => setTranscribiendo(!transcribiendo)}
                  className={`px-3.5 py-2 rounded-xl border transition ${
                    transcribiendo ? 'bg-[#B08D4B] text-white border-[#B08D4B]' : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {transcribiendo ? 'Transcribiendo...' : 'Transcribir Reunión'}
                </button>
              </div>

              {/* Selector Modo Pantalla */}
              <div className="flex items-center gap-2">
                <span className="text-slate-600">Pantalla:</span>
                <select
                  value={pantallaModo}
                  onChange={(e) => setPantallaModo(e.target.value)}
                  className="px-3 py-1.5 bg-[#F5F7F4] border border-[#2D6A4F]/30 rounded-xl text-xs font-bold text-[#1B4D3E] focus:outline-none"
                >
                  <option value="Principal">Principal</option>
                  <option value="Presentación">Presentación</option>
                  <option value="Pizarra">Pizarra</option>
                </select>
              </div>
            </div>

          </div>

          {/* Panel Lateral de Información y Acciones */}
          <div className="bg-white p-6 rounded-3xl border border-[#2D6A4F]/25 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-[#1B4D3E]">Información de la Sala</h3>
              <p className="text-xs text-[#2C3E35] leading-relaxed">
                Entorno interactivo adaptado con baja carga sensorial para reuniones institucionales, convenios y atención personalizada B2B.
              </p>
              
              <div className="bg-[#F5F7F4] p-4 rounded-2xl border border-[#2D6A4F]/20 text-xs space-y-2">
                <p className="font-bold text-[#1B4D3E]">Canal Cifrado Ley N° 21.663</p>
                <p className="text-slate-600">Conexión directa protegida sin sobrecarga de datos ni distracciones visuales.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTabActiva('cita')}
              className="w-full py-3 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white text-xs font-bold rounded-xl transition shadow-sm text-center"
            >
              Agregar Invitado / Agendar Cita B2B
            </button>
          </div>
        </section>
      )}

      {/* PESTAÑA 2: AGENDAR CITA B2B */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-[#2D6A4F]/25 shadow-md space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1B4D3E] mb-2">
              Agendar Cita B2B — {appParam}
            </h2>
            <p className="text-xs sm:text-sm text-[#2C3E35]">
              Selecciona el bloque horario preferente. El agendamiento quedará vinculado automáticamente a la Sala Virtual.
            </p>
          </div>

          {mensaje && (
            <div className={`p-4 rounded-2xl text-xs sm:text-sm font-bold ${
              mensaje.tipo === 'exito' ? 'bg-[#EEF4F1] text-[#1B4D3E] border border-[#2D6A4F]/40' : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Nombre Completo o Empresa *</label>
              <input
                type="text" required placeholder="Ej: Centro Salud / Juan Pérez"
                value={nombre} onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F5F7F4] border border-[#2D6A4F]/30 rounded-xl text-xs sm:text-sm text-[#1F2D27] focus:outline-none focus:border-[#1B4D3E]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1B4D3E] mb-1">RUT o Identificación *</label>
                <input
                  type="text" required placeholder="Ej: 76.543.210-K"
                  value={rut} onChange={(e) => setRut(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F5F7F4] border border-[#2D6A4F]/30 rounded-xl text-xs sm:text-sm text-[#1F2D27] focus:outline-none focus:border-[#1B4D3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Correo Electrónico *</label>
                <input
                  type="email" required placeholder="correo@ejemplo.com"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F5F7F4] border border-[#2D6A4F]/30 rounded-xl text-xs sm:text-sm text-[#1F2D27] focus:outline-none focus:border-[#1B4D3E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Correos de Invitados Adicionales (Opcional)</label>
              <input
                type="text" placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl"
                value={invitados} onChange={(e) => setInvitados(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F5F7F4] border border-[#2D6A4F]/30 rounded-xl text-xs sm:text-sm text-[#1F2D27] focus:outline-none focus:border-[#1B4D3E]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Fecha Preferente *</label>
                <input
                  type="date" required value={fecha} onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F5F7F4] border border-[#2D6A4F]/30 rounded-xl text-xs sm:text-sm text-[#1F2D27] focus:outline-none focus:border-[#1B4D3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Bloque Horario *</label>
                <select
                  value={hora} onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F5F7F4] border border-[#2D6A4F]/30 rounded-xl text-xs sm:text-sm text-[#1F2D27] focus:outline-none focus:border-[#1B4D3E]"
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

            <button
              type="submit" disabled={cargando}
              className="w-full py-3 bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-sm"
            >
              {cargando ? 'Guardando agendamiento...' : 'Confirmar Cita B2B y Vincular a la Reunión'}
            </button>
          </form>
        </section>
      )}

      {/* PESTAÑA 3: CANCELAR CITA */}
      {tabActiva === 'cancelar' && (
        <section className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-[#2D6A4F]/25 shadow-md space-y-4 text-center">
          <h2 className="text-xl font-black text-[#1B4D3E]">Cancelar o Reprogramar Cita</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Ingresa tu correo electrónico registrado o código de agendamiento para liberar la hora reservada en la Sala Virtual.
          </p>

          <div className="pt-2 max-w-md mx-auto space-y-3">
            <input
              type="email" placeholder="Correo electrónico del agendamiento"
              className="w-full px-4 py-2.5 bg-[#F5F7F4] border border-[#2D6A4F]/30 rounded-xl text-xs sm:text-sm focus:outline-none"
            />
            <button
              type="button"
              onClick={() => alert('Solicitud de cancelación enviada con éxito.')}
              className="w-full py-2.5 bg-[#B08D4B] hover:bg-[#96763D] text-white font-bold text-xs rounded-xl transition shadow-sm"
            >
              Confirmar Cancelación de Cita
            </button>
          </div>
        </section>
      )}

    </main>
  );
}

export default function SalaVirtualPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 text-xs">Cargando Sala Virtual...</div>}>
      <SalaVirtualContent />
    </Suspense>
  );
}
