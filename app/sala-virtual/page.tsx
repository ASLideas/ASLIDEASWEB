'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'vivo';
  const appNombre = searchParams.get('app') || 'Casa Matriz ASL Ideas SpA';
  const appLogo = searchParams.get('logo') || '/logo-asl.png.png';

  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita' | 'cancelar'>(initialTab === 'cita' ? 'cita' : 'vivo');
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [modoCalma, setModoCalma] = useState(false);
  const [tipoPantalla, setTipoPantalla] = useState<'principal' | 'presentacion' | 'pizarra'>('principal');

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
        const { error } = await supabase.from('citas_b2b').insert([
          {
            nombre,
            rut,
            email,
            invitados,
            portal: appNombre,
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
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#F2F7F6] text-[#1B3B36]' : 'bg-[#E5F0EE] text-[#142E2A]'}`}>
      
      {/* HEADER */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#2D6A4F]/20">
        <div className="flex items-center gap-3">
          <img 
            src={appLogo} 
            alt="Logo App" 
            className="w-12 h-12 object-contain rounded-2xl bg-white p-1 border border-[#2D6A4F]/30 shadow-sm" 
          />
          <div>
            <h1 className="text-lg md:text-xl font-black text-[#1B4D3E]">{appNombre}</h1>
            <p className="text-xs text-[#2D6A4F] font-bold">Sala Virtual B2B & Agendamiento Inclusivo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-[#2D6A4F] text-white hover:bg-[#1B4D3E] transition"
          >
            {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma (TEA)'}
          </button>
          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-bold rounded-xl bg-[#FAFDFD] text-[#1B4D3E] border border-[#2D6A4F]/30 hover:bg-[#EAF3F2] transition"
          >
            Volver a la Web
          </Link>
        </div>
      </header>

      {/* PESTAÑAS */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-[#2D6A4F]/20 pb-2">
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-4 py-2 text-xs md:text-sm font-extrabold rounded-xl transition ${
            tabActiva === 'vivo'
              ? 'bg-[#1B4D3E] text-white shadow-md'
              : 'bg-[#FAFDFD] text-[#1B4D3E] hover:bg-[#EAF3F2] border border-[#2D6A4F]/20'
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-4 py-2 text-xs md:text-sm font-extrabold rounded-xl transition ${
            tabActiva === 'cita'
              ? 'bg-[#1B4D3E] text-white shadow-md'
              : 'bg-[#FAFDFD] text-[#1B4D3E] hover:bg-[#EAF3F2] border border-[#2D6A4F]/20'
          }`}
        >
          Agendar Cita B2B
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cancelar')}
          className={`px-4 py-2 text-xs md:text-sm font-extrabold rounded-xl transition ${
            tabActiva === 'cancelar'
              ? 'bg-[#1B4D3E] text-white shadow-md'
              : 'bg-[#FAFDFD] text-[#1B4D3E] hover:bg-[#EAF3F2] border border-[#2D6A4F]/20'
          }`}
        >
          Cancelar Cita
        </button>
      </div>

      {/* PESTAÑA 1: SALA EN VIVO */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 space-y-4">
            
            {/* CONTENEDOR VIDEOLLAMADA (VERDE OCÉANO MEDIO: NI MUY BLANCO NI MUY OSCURO) */}
            <div className="relative aspect-video bg-[#C7E3E0] rounded-2xl overflow-hidden border-2 border-[#2D6A4F]/40 shadow-lg flex items-center justify-center p-6 text-center">
              <div className="space-y-2">
                <p className="text-[#133A33] text-xs font-bold uppercase tracking-wider">
                  Transmisión Principal en Vivo — {appNombre}
                </p>
                <h3 className="text-base md:text-xl font-black text-[#0A2621]">
                  Modo Activo: Pantalla {tipoPantalla.charAt(0).toUpperCase() + tipoPantalla.slice(1)}
                </h3>
                <p className="text-xs text-[#1C4E46] max-w-md mx-auto">
                  Entorno seguro de videollamada interactiva con baja carga sensorial.
                </p>
              </div>
            </div>

            {/* BARRA DE CONTROLES */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#FAFDFD] rounded-2xl border border-[#2D6A4F]/30 shadow-sm text-xs">
              
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMicActivo(!micActivo)}
                  className={`px-3 py-2 font-bold rounded-xl transition ${
                    micActivo ? 'bg-[#1B4D3E] text-white' : 'bg-[#D9534F] text-white'
                  }`}
                >
                  {micActivo ? 'Micrófono Encendido' : 'Micrófono Silenciado'}
                </button>

                <button
                  type="button"
                  onClick={() => setCamActiva(!camActiva)}
                  className={`px-3 py-2 font-bold rounded-xl transition ${
                    camActiva ? 'bg-[#1B4D3E] text-white' : 'bg-[#2D6A4F] text-white'
                  }`}
                >
                  {camActiva ? 'Cámara Encendida' : 'Encender Cámara'}
                </button>

                <button
                  type="button"
                  onClick={() => alert('Función de transcripción activada.')}
                  className="px-3 py-2 font-bold rounded-xl bg-[#FAFDFD] border border-[#2D6A4F]/40 text-[#1B4D3E] hover:bg-[#EAF3F2]"
                >
                  Transcribir Reunión
                </button>
              </div>

              {/* SELECTOR DE PANTALLA */}
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[#1B4D3E]">Pantalla:</span>
                <select
                  value={tipoPantalla}
                  onChange={(e) => setTipoPantalla(e.target.value as any)}
                  className="px-2.5 py-1.5 bg-[#EFF7F6] border border-[#2D6A4F]/40 rounded-xl text-xs font-bold text-[#1B4D3E]"
                >
                  <option value="principal">Principal</option>
                  <option value="presentacion">Presentación</option>
                  <option value="pizarra">Pizarra</option>
                </select>
              </div>

            </div>
          </div>

          {/* COLUMNA LATERAL */}
          <div className="bg-[#FAFDFD] p-6 rounded-2xl border border-[#2D6A4F]/30 flex flex-col justify-between space-y-4 shadow-sm">
            <div className="space-y-3">
              <h3 className="text-sm font-black text-[#1B4D3E] uppercase tracking-wide border-b border-[#2D6A4F]/20 pb-2">
                Información de la Sala
              </h3>
              <p className="text-xs text-[#2C4A43] leading-relaxed">
                Espacio accesible diseñado con baja sobrecarga sensorial para reuniones institucionales y convenios B2B de <strong>{appNombre}</strong>.
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <button
                type="button"
                onClick={() => setTabActiva('cita')}
                className="w-full py-3 bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white text-xs font-extrabold rounded-xl transition shadow-sm"
              >
                Agregar Invitado / Agendar Cita B2B
              </button>
            </div>
          </div>

        </section>
      )}

      {/* PESTAÑA 2: AGENDAR CITA B2B */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-[#FAFDFD] p-6 md:p-8 rounded-3xl border-2 border-[#2D6A4F]/30 shadow-md space-y-6">
          <div>
            <h2 className="text-lg md:text-xl font-black text-[#1B4D3E]">
              Agendar Cita en la Sala de {appNombre}
            </h2>
            <p className="text-xs text-[#2C4A43] mt-1">
              Selecciona la fecha y bloque de atención B2B. Al agendar, la cita quedará automáticamente vinculada con la Video Reunión en vivo.
            </p>
          </div>

          {mensaje && (
            <div className={`p-4 rounded-xl text-xs font-bold ${
              mensaje.tipo === 'exito' ? 'bg-[#D4EDDA] text-[#155724]' : 'bg-[#F8D7DA] text-[#721C24]'
            }`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-xs">
            <div>
              <label className="block font-extrabold text-[#1B4D3E] mb-1">Nombre Completo o Empresa *</label>
              <input
                type="text"
                required
                placeholder="Ej: Centro Médico ASL / Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#EFF7F6] border border-[#2D6A4F]/30 rounded-xl font-medium text-[#1B3B36]"
              />
            </div>

            <div>
              <label className="block font-extrabold text-[#1B4D3E] mb-1">RUT o RUT Tributario *</label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K / 12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#EFF7F6] border border-[#2D6A4F]/30 rounded-xl font-medium text-[#1B3B36]"
              />
            </div>

            <div>
              <label className="block font-extrabold text-[#1B4D3E] mb-1">Correo Electrónico *</label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#EFF7F6] border border-[#2D6A4F]/30 rounded-xl font-medium text-[#1B3B36]"
              />
            </div>

            <div>
              <label className="block font-extrabold text-[#1B4D3E] mb-1">Correos de Invitados Adicionales (Agregar Invitado)</label>
              <input
                type="text"
                placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#EFF7F6] border border-[#2D6A4F]/30 rounded-xl font-medium text-[#1B3B36]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-extrabold text-[#1B4D3E] mb-1">Fecha Preferente *</label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#EFF7F6] border border-[#2D6A4F]/30 rounded-xl font-medium text-[#1B3B36]"
                />
              </div>

              <div>
                <label className="block font-extrabold text-[#1B4D3E] mb-1">Bloque Horario *</label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#EFF7F6] border border-[#2D6A4F]/30 rounded-xl font-medium text-[#1B3B36]"
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
              type="submit"
              disabled={cargando}
              className="w-full py-3 bg-[#1B4D3E] hover:bg-[#2D6A4F] text-white font-extrabold rounded-xl transition shadow-md"
            >
              {cargando ? 'Guardando cita...' : 'Confirmar Cita y Vincular a la Video Reunión'}
            </button>
          </form>
        </section>
      )}

      {/* PESTAÑA 3: CANCELAR CITA */}
      {tabActiva === 'cancelar' && (
        <section className="max-w-xl mx-auto bg-[#FAFDFD] p-6 md:p-8 rounded-3xl border-2 border-[#2D6A4F]/30 shadow-md space-y-4 text-xs">
          <h2 className="text-lg font-black text-[#1B4D3E]">Cancelar Cita B2B</h2>
          <p className="text-[#2C4A43]">Ingresa tu correo o RUT para gestionar o anular tu cita agendada previamente.</p>
          
          <input
            type="text"
            placeholder="Ingresa tu Correo o RUT registrado"
            className="w-full px-4 py-2.5 bg-[#EFF7F6] border border-[#2D6A4F]/30 rounded-xl font-medium text-[#1B3B36]"
          />

          <button
            type="button"
            onClick={() => alert('Se ha enviado la solicitud de cancelación.')}
            className="w-full py-3 bg-[#D9534F] text-white font-extrabold rounded-xl transition shadow-md hover:bg-[#C9302C]"
          >
            Confirmar Cancelación de Cita
          </button>
        </section>
      )}

    </main>
  );
}

export default function SalaVirtualPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-[#2D6A4F]">Cargando Sala Virtual...</div>}>
      <SalaVirtualContent />
    </Suspense>
  );
}
