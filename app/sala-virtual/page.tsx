'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const initialApp = searchParams.get('app') || 'Casa Matriz ASL Ideas SpA';

  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [modoCalma, setModoCalma] = useState(false);

  // Estados Formulario Cita
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const handleSubmitCita = (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);

    setTimeout(() => {
      setMensaje({
        tipo: 'exito',
        texto: 'Cita registrada con exito en la Sala Virtual de ' + initialApp + '.'
      });
      setCargando(false);
      setNombre('');
      setRut('');
      setEmail('');
      setInvitados('');
      setFecha('');
    }, 800);
  };

  return (
    <main className={`min-h-screen p-4 sm:p-8 transition-colors duration-300 ${
      modoCalma ? 'bg-[#101D2B] text-[#98A4BA]' : 'bg-[#FAF9F6] text-[#1B4D3E]'
    }`}>
      
      {/* HEADER SALA VIRTUAL */}
      <header className={`max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b ${
        modoCalma ? 'border-[#78ACE9]/30' : 'border-[#B8D6B2]'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#B8D6B2] p-1 flex items-center justify-center shadow-md">
            <span className="font-black text-sm text-[#1B4D3E]">ASL</span>
          </div>
          <div>
            <h1 className="text-xl font-black">{initialApp}</h1>
            <p className="text-xs font-semibold opacity-80">Sala Virtual & Videollamada B2B Inclusiva</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className={`px-3 py-2 text-xs font-bold rounded-xl border transition ${
              modoCalma ? 'bg-[#78ACE9] text-[#101D2B]' : 'bg-[#B8D6B2] text-[#1B4D3E]'
            }`}
          >
            {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma'}
          </button>
          <a
            href="/"
            className={`px-3 py-2 text-xs font-bold rounded-xl border transition ${
              modoCalma ? 'bg-[#16273B] text-white border-[#78ACE9]/40' : 'bg-[#1B4D3E] text-white border-[#1B4D3E]'
            }`}
          >
            Volver a la Web
          </a>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL: VIDEOLLAMADA + FORMULARIO */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* PANEL DE VIDEOLLAMADA */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`aspect-video rounded-3xl border-2 overflow-hidden shadow-2xl relative flex items-center justify-center ${
            modoCalma ? 'bg-[#0B1521] border-[#78ACE9]/40' : 'bg-[#C7E3E0] border-[#B8D6B2]'
          }`}>
            <div className="text-center p-6 space-y-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase ${
                modoCalma ? 'bg-[#78ACE9] text-[#101D2B]' : 'bg-[#1B4D3E] text-white'
              }`}>
                Sala Virtual en Vivo
              </span>
              <h3 className="text-lg font-bold">{initialApp}</h3>
              <p className="text-xs opacity-80">Transmision activa de baja sobrecarga sensorial</p>
            </div>
          </div>

          {/* CONTROLES LIMPIOS DE VIDEOLLAMADA */}
          <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-center gap-4 ${
            modoCalma ? 'bg-[#16273B] border-[#78ACE9]/40' : 'bg-white border-[#B8D6B2]'
          }`}>
            <button
              type="button"
              onClick={() => setMicActivo(!micActivo)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-sm ${
                micActivo 
                  ? 'bg-[#1B4D3E] text-white' 
                  : 'bg-[#FAA2AA] text-[#1B4D3E]'
              }`}
            >
              {micActivo ? 'Microfono Encendido' : 'Microfono Silenciado'}
            </button>

            <button
              type="button"
              onClick={() => setCamActiva(!camActiva)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs transition shadow-sm ${
                camActiva 
                  ? 'bg-[#1B4D3E] text-white' 
                  : 'bg-[#FAA2AA] text-[#1B4D3E]'
              }`}
            >
              {camActiva ? 'Camara Encendida' : 'Encender Camara'}
            </button>
          </div>
        </div>

        {/* PANEL DE AGENDAMIENTO DE CITA B2B */}
        <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-xl space-y-4 ${
          modoCalma ? 'bg-[#16273B] border-[#78ACE9]/40' : 'bg-white border-[#B8D6B2]'
        }`}>
          <div>
            <h3 className="text-lg font-black mb-1">Agendar Cita B2B</h3>
            <p className="text-xs opacity-80 leading-relaxed">
              Reserva tu bloque de atencion con {initialApp}. La cita quedara vinculada a la videollamada.
            </p>
          </div>

          {mensaje && (
            <div className={`p-3 rounded-xl text-xs font-bold border ${
              mensaje.tipo === 'exito' ? 'bg-[#B8D6B2]/40 border-[#B8D6B2] text-[#1B4D3E]' : 'bg-[#FAA2AA]/40 border-[#FAA2AA] text-red-800'
            }`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold mb-1">Nombre o Empresa *</label>
              <input
                type="text"
                required
                placeholder="Ej: PYME Asociada / Maria Perez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border bg-transparent text-current"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">RUT *</label>
              <input
                type="text"
                required
                placeholder="Ej: 77.123.456-K"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border bg-transparent text-current"
              />
            </div>

            <div>
              <label className="block font-bold mb-1">Correo Electronico *</label>
              <input
                type="email"
                required
                placeholder="contacto@empresa.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border bg-transparent text-current"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold mb-1">Fecha *</label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-2 py-2 rounded-xl border bg-transparent text-current"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Horario *</label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-2 py-2 rounded-xl border bg-transparent text-current"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={cargando}
              className={`w-full py-3 rounded-xl font-bold text-xs transition shadow-md mt-2 ${
                modoCalma ? 'bg-[#78ACE9] text-[#101D2B]' : 'bg-[#1B4D3E] text-white hover:bg-[#2A6653]'
              }`}
            >
              {cargando ? 'Registrando...' : 'Confirmar Cita B2B'}
            </button>
          </form>
        </div>

      </div>

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
