'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const initialApp = searchParams.get('app') || 'ASL Ideas SpA';
  const initialLogo = searchParams.get('logo') || '/logo-asl.png.png';
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
  const [portal, setPortal] = useState(initialApp);
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
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#FFF7E6] text-[#2D3A47]' : 'bg-[#FFF7E6] text-[#2D3A47]'}`}>
      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#A8B58A]/30">
        <div className="flex items-center gap-3">
          <img src={initialLogo} alt="Logo App" className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-[#F7C8D3]" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#2D3A47]">{initialApp}</h1>
            <p className="text-xs text-[#B46A72] font-semibold">Sala Virtual B2B & Agendamiento Inclusivo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white text-[#2D3A47] border border-[#A8B58A]"
          >
            {modoCalma ? '🌿 Modo Calma Activo' : 'Activar Modo Calma (TEA)'}
          </button>
          <a
            href="/"
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#B46A72] text-white hover:bg-[#9E575F] transition"
          >
            Volver al Inicio
          </a>
        </div>
      </header>

      {/* Navegación por Pestañas */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-[#A8B58A]/30 pb-2">
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'vivo'
              ? 'bg-[#B46A72] text-white shadow-md'
              : 'bg-white text-[#2D3A47] hover:bg-[#F7C8D3]/30 border border-[#A8B58A]/40'
          }`}
        >
          📹 Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'cita'
              ? 'bg-[#B46A72] text-white shadow-md'
              : 'bg-white text-[#2D3A47] hover:bg-[#F7C8D3]/30 border border-[#A8B58A]/40'
          }`}
        >
          📅 Agendar Cita en la Sala
        </button>
      </div>

      {/* Pestaña 1: Transmisión en Vivo */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video bg-[#2D3A47] rounded-2xl overflow-hidden border border-[#A8B58A]/50 shadow-2xl flex items-center justify-center">
              <div className="text-center p-6 text-white">
                <p className="text-[#F7C8D3] text-sm mb-2 font-bold">Transmisión Principal en Vivo</p>
                <h3 className="text-lg font-semibold">Reunión Virtual de {initialApp}</h3>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 p-4 bg-white rounded-xl border border-[#A8B58A]/30">
              <button
                type="button"
                onClick={() => setMicActivo(!micActivo)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  micActivo ? 'bg-[#A8B58A] text-[#2D3A47]' : 'bg-[#B46A72] text-white'
                }`}
              >
                {micActivo ? '🎙️ Micrófono Encendido' : '🎙️ Micrófono Apagado'}
              </button>
              <button
                type="button"
                onClick={() => setCamActiva(!camActiva)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  camActiva ? 'bg-[#A8B58A] text-[#2D3A47]' : 'bg-[#B46A72] text-white'
                }`}
              >
                {camActiva ? '📹 Cámara Encendida' : '📹 Cámara Apagada'}
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#A8B58A]/40 shadow-md flex flex-col justify-between">
            <div>
              <h3 className="text-md font-bold mb-3 text-[#B46A72]">Información de la Sala</h3>
              <p className="text-xs text-[#2D3A47]/90 mb-4 leading-relaxed">
                Espacio accesible diseñado con baja sobrecarga sensorial para reuniones institucionales y convenios B2B.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTabActiva('cita')}
              className="w-full py-2.5 bg-[#B46A72] hover:bg-[#9E575F] text-white text-xs font-bold rounded-xl transition shadow-md"
            >
              + Agregar Invitados / Agendar Cita B2B
            </button>
          </div>
        </section>
      )}

      {/* Pestaña 2: Formulario de Agendamiento B2B */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-2xl border border-[#A8B58A]/40 shadow-xl">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#2D3A47] mb-2">
              Agendar Cita en la Sala de {initialApp}
            </h2>
            <p className="text-xs md:text-sm text-[#2D3A47]/80">
              Selecciona la fecha y bloque de atención B2B. Al agendar, la cita quedará automáticamente vinculada con la Video Reunión en vivo.
            </p>
          </div>

          {mensaje && (
            <div
              className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-medium ${
                mensaje.tipo === 'exito'
                  ? 'bg-[#A8B58A]/20 border border-[#A8B58A] text-[#2D3A47]'
                  : 'bg-[#F7C8D3]/30 border border-[#B46A72] text-[#B46A72]'
              }`}
            >
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#2D3A47] mb-1">
                Nombre Completo o Empresa <span className="text-[#B46A72]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Centro Médico ASL / Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FFF7E6] border border-[#A8B58A]/50 rounded-xl text-sm text-[#2D3A47] focus:outline-none focus:border-[#B46A72]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D3A47] mb-1">
                RUT o RUT Tributario <span className="text-[#B46A72]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K / 12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FFF7E6] border border-[#A8B58A]/50 rounded-xl text-sm text-[#2D3A47] focus:outline-none focus:border-[#B46A72]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D3A47] mb-1">
                Correo Electrónico <span className="text-[#B46A72]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FFF7E6] border border-[#A8B58A]/50 rounded-xl text-sm text-[#2D3A47] focus:outline-none focus:border-[#B46A72]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D3A47] mb-1">
                Correos de Invitados Adicionales (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FFF7E6] border border-[#A8B58A]/50 rounded-xl text-sm text-[#2D3A47] focus:outline-none focus:border-[#B46A72]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#2D3A47] mb-1">
                  Fecha Preferente <span className="text-[#B46A72]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FFF7E6] border border-[#A8B58A]/50 rounded-xl text-sm text-[#2D3A47] focus:outline-none focus:border-[#B46A72]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D3A47] mb-1">
                  Bloque Horario <span className="text-[#B46A72]">*</span>
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#FFF7E6] border border-[#A8B58A]/50 rounded-xl text-sm text-[#2D3A47] focus:outline-none focus:border-[#B46A72]"
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
                className="w-full py-3 bg-[#B46A72] hover:bg-[#9E575F] text-white text-sm font-bold rounded-xl transition shadow-md disabled:opacity-50"
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
    <Suspense fallback={<div className="p-8 text-center text-[#2D3A47]">Cargando Sala Virtual...</div>}>
      <SalaVirtualContent />
    </Suspense>
  );
}
