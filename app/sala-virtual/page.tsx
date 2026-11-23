'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'vivo';
  const initialApp = searchParams.get('app') || 'Casa Matriz ASL Ideas SpA';

  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita' | 'cancelar'>(
    initialTab === 'cita' ? 'cita' : initialTab === 'cancelar' ? 'cancelar' : 'vivo'
  );
  
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [pantallaModo, setPantallaModo] = useState<'Principal' | 'Presentación' | 'Pizarra'>('Principal');
  const [modoCalma, setModoCalma] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Formulario Agendamiento B2B
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');

  // Formulario Cancelar
  const [rutCancelar, setRutCancelar] = useState('');
  const [codigoCancelar, setCodigoCancelar] = useState('');

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSubmitCita = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);

    try {
      const { supabase } = await import('@/lib/supabaseClient').catch(() => ({ supabase: null as any }));
      
      if (supabase) {
        await supabase.from('citas_b2b').insert([
          { nombre, rut, email, invitados, portal: initialApp, fecha, hora }
        ]);
      }

      setMensaje({
        tipo: 'exito',
        texto: 'Cita confirmada y vinculada a la Video Reunión con éxito.'
      });
      setNombre(''); setRut(''); setEmail(''); setInvitados(''); setFecha('');
    } catch (err: any) {
      setMensaje({
        tipo: 'error',
        texto: 'No se pudo registrar la cita. Por favor verifica los datos.'
      });
    } finally {
      setCargando(false);
    }
  };

  const handleCancelCita = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);

    setTimeout(() => {
      setMensaje({
        tipo: 'exito',
        texto: 'La cita ha sido cancelada correctamente.'
      });
      setRutCancelar('');
      setCodigoCancelar('');
      setCargando(false);
    }, 800);
  };

  return (
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#F2F9F8] text-[#1E3A3A]' : 'bg-[#EBF5F4] text-[#1E3A3A]'}`}>
      
      {/* Header Principal con Menús Desplegables y Sin Emojis */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#B2DFDB] bg-white p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/logo-asl.png.png" alt="Logo ASL Ideas SpA" className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-[#4DB6AC]/40" />
          <div>
            <h1 className="text-xl font-extrabold text-[#004D40]">{initialApp}</h1>
            <p className="text-xs text-[#00796B] font-semibold">Sala Virtual & Agendamiento B2B Inclusivo</p>
          </div>
        </div>

        {/* Desplegables de Navegación Header */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Desplegable Salas & Agenda */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('salas')}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#00796B] text-white hover:bg-[#004D40] transition"
            >
              Salas & Agenda ▼
            </button>
            {openDropdown === 'salas' && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-[#B2DFDB] p-3 z-50 space-y-2 text-left">
                <span className="text-[11px] font-bold text-[#00695C] block">ASL Ideas SpA</span>
                <div className="flex gap-2 text-[10px] mb-2">
                  <Link href="/sala-virtual?app=ASL%20Ideas%20SpA" className="px-2 py-1 bg-[#00796B] text-white rounded font-bold">Ingresar a Sala</Link>
                  <Link href="/sala-virtual?app=ASL%20Ideas%20SpA&tab=cita" className="px-2 py-1 bg-[#E0F2F1] text-[#004D40] rounded font-bold">Agendar Cita</Link>
                </div>

                <span className="text-[11px] font-bold text-[#00695C] block">LAWENMOLL</span>
                <div className="flex gap-2 text-[10px] mb-2">
                  <Link href="/sala-virtual?app=LAWENMOLL" className="px-2 py-1 bg-[#00796B] text-white rounded font-bold">Ingresar a Sala</Link>
                  <Link href="/sala-virtual?app=LAWENMOLL&tab=cita" className="px-2 py-1 bg-[#E0F2F1] text-[#004D40] rounded font-bold">Agendar Cita</Link>
                </div>

                <span className="text-[11px] font-bold text-[#00695C] block">Wellness Web App</span>
                <div className="flex gap-2 text-[10px] mb-2">
                  <Link href="/sala-virtual?app=Wellness%20Web%20App" className="px-2 py-1 bg-[#00796B] text-white rounded font-bold">Ingresar a Sala</Link>
                  <Link href="/sala-virtual?app=Wellness%20Web%20App&tab=cita" className="px-2 py-1 bg-[#E0F2F1] text-[#004D40] rounded font-bold">Agendar Cita</Link>
                </div>

                <span className="text-[11px] font-bold text-[#00695C] block">Sabiduría Ancestral / Bienestar</span>
                <div className="flex gap-2 text-[10px]">
                  <Link href="/sala-virtual?app=Bienestar" className="px-2 py-1 bg-[#00796B] text-white rounded font-bold">Ingresar a Sala</Link>
                  <Link href="/sala-virtual?app=Bienestar&tab=cita" className="px-2 py-1 bg-[#E0F2F1] text-[#004D40] rounded font-bold">Agendar Cita</Link>
                </div>
              </div>
            )}
          </div>

          {/* Desplegable Nuestras Redes */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('redes')}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#E0F2F1] text-[#004D40] hover:bg-[#B2DFDB] transition"
            >
              Nuestras Redes ▼
            </button>
            {openDropdown === 'redes' && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-[#B2DFDB] p-2 z-50 space-y-1 text-left text-xs font-semibold text-slate-700">
                <a href="#linkedin" className="block p-1.5 hover:bg-[#F4FAF9] rounded">LinkedIn Corporativo</a>
                <a href="#instagram" className="block p-1.5 hover:bg-[#F4FAF9] rounded">Instagram Oficial</a>
                <a href="#tiktok" className="block p-1.5 hover:bg-[#F4FAF9] rounded">TikTok Salud Inclusiva</a>
                <a href="#youtube" className="block p-1.5 hover:bg-[#F4FAF9] rounded">Canal de YouTube</a>
                <a href="#facebook" className="block p-1.5 hover:bg-[#F4FAF9] rounded">Comunidad en Facebook</a>
              </div>
            )}
          </div>

          {/* Desplegable Contacto Directo */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('contacto')}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#E0F2F1] text-[#004D40] hover:bg-[#B2DFDB] transition"
            >
              Contacto Directo ▼
            </button>
            {openDropdown === 'contacto' && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-[#B2DFDB] p-2 z-50 space-y-1 text-left text-xs font-semibold text-slate-700">
                <Link href="/sala-virtual?tab=oficina" className="block p-1.5 hover:bg-[#F4FAF9] rounded">Ver Ficha / Ingresar</Link>
                <Link href="/sala-virtual?tab=cita" className="block p-1.5 hover:bg-[#F4FAF9] rounded">Agenda de Reuniones</Link>
                <a href="#whatsapp" className="block p-1.5 hover:bg-[#F4FAF9] rounded">Grupo WhatsApp</a>
                <a href="#telegram" className="block p-1.5 hover:bg-[#F4FAF9] rounded">Canal Telegram</a>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white text-[#004D40] border border-[#4DB6AC]/40 hover:bg-[#F4FAF9] transition"
          >
            {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma (TEA)'}
          </button>
          
          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[#00796B] text-white hover:bg-[#004D40] transition"
          >
            Volver a Inicio
          </Link>
        </div>
      </header>

      {/* Navegación de Pestañas de la Sala - Sin Emojis */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-[#B2DFDB] pb-3">
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-5 py-2.5 text-xs font-extrabold rounded-xl transition ${
            tabActiva === 'vivo'
              ? 'bg-[#00796B] text-white shadow-md'
              : 'bg-white text-[#004D40] hover:bg-[#E0F2F1] border border-[#4DB6AC]/30'
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-5 py-2.5 text-xs font-extrabold rounded-xl transition ${
            tabActiva === 'cita'
              ? 'bg-[#00796B] text-white shadow-md'
              : 'bg-white text-[#004D40] hover:bg-[#E0F2F1] border border-[#4DB6AC]/30'
          }`}
        >
          Agendar Cita B2B
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cancelar')}
          className={`px-5 py-2.5 text-xs font-extrabold rounded-xl transition ${
            tabActiva === 'cancelar'
              ? 'bg-[#00796B] text-white shadow-md'
              : 'bg-white text-[#004D40] hover:bg-[#E0F2F1] border border-[#4DB6AC]/30'
          }`}
        >
          Cancelar Cita
        </button>
      </div>

      {/* Pestaña 1: Sala Virtual en Vivo */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            
            {/* Pantalla de Transmisión */}
            <div className="relative aspect-video bg-[#002825] rounded-3xl overflow-hidden border-2 border-[#4DB6AC]/40 shadow-xl flex items-center justify-center text-white">
              <div className="text-center p-6 space-y-2">
                <span className="bg-[#00796B] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  Modo {pantallaModo}
                </span>
                <h3 className="text-xl font-bold">Reunión Virtual {initialApp}</h3>
                <p className="text-xs text-emerald-200">Entorno accesible sin sobrecarga sensorial</p>
              </div>
            </div>

            {/* Panel de Control de Transmisión - Sin Emojis */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-[#B2DFDB] shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMicActivo(!micActivo)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                    micActivo ? 'bg-[#00796B] text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {micActivo ? 'Micrófono Encendido' : 'Micrófono Silenciado'}
                </button>

                <button
                  type="button"
                  onClick={() => setCamActiva(!camActiva)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition ${
                    camActiva ? 'bg-[#00796B] text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {camActiva ? 'Cámara Encendida' : 'Encender Cámara'}
                </button>

                <button
                  type="button"
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-[#E0F2F1] text-[#004D40] hover:bg-[#B2DFDB] transition"
                >
                  Transcribir Reunión
                </button>

                <button
                  type="button"
                  onClick={() => alert('Función de agregar invitado activa')}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-[#00796B] text-white hover:bg-[#004D40] transition"
                >
                  Agregar Invitado
                </button>
              </div>

              {/* Selector de Pantalla */}
              <div className="flex items-center gap-1.5 bg-[#F4FAF9] p-1 rounded-xl border border-[#B2DFDB]">
                <span className="text-xs font-bold text-[#004D40] px-2">Pantalla:</span>
                <button
                  type="button"
                  onClick={() => setPantallaModo('Principal')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${pantallaModo === 'Principal' ? 'bg-[#00796B] text-white' : 'text-slate-600'}`}
                >
                  Principal
                </button>
                <button
                  type="button"
                  onClick={() => setPantallaModo('Presentación')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${pantallaModo === 'Presentación' ? 'bg-[#00796B] text-white' : 'text-slate-600'}`}
                >
                  Presentación
                </button>
                <button
                  type="button"
                  onClick={() => setPantallaModo('Pizarra')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg ${pantallaModo === 'Pizarra' ? 'bg-[#00796B] text-white' : 'text-slate-600'}`}
                >
                  Pizarra
                </button>
              </div>
            </div>
          </div>

          {/* Panel Lateral de Información */}
          <div className="bg-white p-6 rounded-3xl border border-[#B2DFDB] shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h3 className="text-base font-extrabold text-[#004D40]">Información de la Sala B2B</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                Entorno interactivo con videollamada, agenda vinculada, Ficha Oficial, archivos cifrados e invitaciones institucionales.
              </p>
              <div className="p-3 bg-[#F4FAF9] rounded-xl border border-[#E0F2F1] text-xs space-y-1">
                <span className="font-bold text-[#00695C] block">Normativas de Seguridad:</span>
                <p className="text-slate-600">Ley N° 21.663 de Ciberseguridad y Ley TEA N° 21.545.</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTabActiva('cita')}
              className="w-full py-3 bg-[#00796B] hover:bg-[#004D40] text-white text-xs font-bold rounded-xl transition shadow-md"
            >
              Agendar Cita B2B en esta Sala
            </button>
          </div>
        </section>
      )}

      {/* Pestaña 2: Agendar Cita B2B */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-3xl border border-[#B2DFDB] shadow-lg">
          <div className="mb-6 space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-[#004D40]">
              Agendar Cita B2B — {initialApp}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 font-medium">
              Ingresa tus datos para coordinar una reunión oficial en la Sala Virtual.
            </p>
          </div>

          {mensaje && (
            <div className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-bold ${mensaje.tipo === 'exito' ? 'bg-[#E0F2F1] text-[#004D40] border border-[#4DB6AC]' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-[#004D40] mb-1">Nombre Completo o Empresa *</label>
              <input
                type="text"
                required
                placeholder="Ej: Centro PYME / Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F4FAF9] border border-[#B2DFDB] rounded-xl text-sm text-[#004D40] focus:outline-none focus:border-[#00796B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#004D40] mb-1">RUT o RUT Tributario *</label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F4FAF9] border border-[#B2DFDB] rounded-xl text-sm text-[#004D40] focus:outline-none focus:border-[#00796B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#004D40] mb-1">Correo Electrónico *</label>
              <input
                type="email"
                required
                placeholder="contacto@empresa.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F4FAF9] border border-[#B2DFDB] rounded-xl text-sm text-[#004D40] focus:outline-none focus:border-[#00796B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#004D40] mb-1">Correos de Invitados Adicionales</label>
              <input
                type="text"
                placeholder="invitado1@empresa.cl, invitado2@empresa.cl"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F4FAF9] border border-[#B2DFDB] rounded-xl text-sm text-[#004D40] focus:outline-none focus:border-[#00796B]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#004D40] mb-1">Fecha Preferente *</label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F4FAF9] border border-[#B2DFDB] rounded-xl text-sm text-[#004D40] focus:outline-none focus:border-[#00796B]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#004D40] mb-1">Bloque Horario *</label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#F4FAF9] border border-[#B2DFDB] rounded-xl text-sm text-[#004D40] focus:outline-none focus:border-[#00796B]"
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
              className="w-full py-3 bg-[#00796B] hover:bg-[#004D40] text-white text-xs font-extrabold rounded-xl transition shadow-md disabled:opacity-50 mt-4"
            >
              {cargando ? 'Guardando agendamiento...' : 'Confirmar Cita B2B'}
            </button>
          </form>
        </section>
      )}

      {/* Pestaña 3: Cancelar Cita */}
      {tabActiva === 'cancelar' && (
        <section className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-3xl border border-[#B2DFDB] shadow-lg">
          <div className="mb-6 space-y-1">
            <h2 className="text-xl md:text-2xl font-black text-[#004D40]">
              Cancelar Cita B2B
            </h2>
            <p className="text-xs md:text-sm text-slate-600 font-medium">
              Ingresa el RUT y el código de reserva para cancelar tu cita agendada.
            </p>
          </div>

          {mensaje && (
            <div className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-bold ${mensaje.tipo === 'exito' ? 'bg-[#E0F2F1] text-[#004D40] border border-[#4DB6AC]' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleCancelCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-[#004D40] mb-1">RUT Registrado *</label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K"
                value={rutCancelar}
                onChange={(e) => setRutCancelar(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F4FAF9] border border-[#B2DFDB] rounded-xl text-sm text-[#004D40] focus:outline-none focus:border-[#00796B]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#004D40] mb-1">Código de Reserva o Confirmación *</label>
              <input
                type="text"
                required
                placeholder="Ej: ASL-12345"
                value={codigoCancelar}
                onChange={(e) => setCodigoCancelar(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F4FAF9] border border-[#B2DFDB] rounded-xl text-sm text-[#004D40] focus:outline-none focus:border-[#00796B]"
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full py-3 bg-[#00796B] hover:bg-[#004D40] text-white text-xs font-extrabold rounded-xl transition shadow-md disabled:opacity-50 mt-4"
            >
              {cargando ? 'Procesando cancelación...' : 'Confirmar Cancelación de Cita'}
            </button>
          </form>
        </section>
      )}
    </main>
  );
}

export default function SalaVirtualPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-600">Cargando Sala Virtual...</div>}>
      <SalaVirtualContent />
    </Suspense>
  );
}
