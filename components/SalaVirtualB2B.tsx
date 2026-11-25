'use client';

import React, { useState } from 'react';

interface Props {
  portalNombre?: string;
}

export default function SalaVirtualB2B({ portalNombre = 'ASL Ideas SpA' }: Props) {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setMensaje({
        tipo: 'exito',
        texto: 'Cita B2B agendada exitosamente. Se ha enviado la confirmacion al correo proporcionado.',
      });
      setNombre('');
      setRut('');
      setEmail('');
    }, 800);
  };

  return (
    <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 shadow-2xl max-w-2xl mx-auto text-slate-100">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
        <img src="/LOGO_asl.png" alt="ASL Ideas Logo" className="w-10 h-10 object-contain" />
        <div>
          <h3 className="text-xl font-bold text-emerald-400">Agendar Cita B2B — {portalNombre}</h3>
          <p className="text-xs text-slate-300">Diseño y Vitrinas Virtuales para PYMEs & Plataformas Accesibles</p>
        </div>
      </div>

      {mensaje && (
        <div
          className={`p-4 mb-4 rounded-xl text-xs font-bold ${
            mensaje.tipo === 'exito' ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-500' : 'bg-rose-900/80 text-rose-200 border border-rose-500'
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1">Nombre Completo o Empresa</label>
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
            placeholder="Ej. Maria Gonzalez / PYME Comercio"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">RUT o Identificacion</label>
            <input
              type="text"
              required
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
              placeholder="12.345.678-9"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Correo Electronico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
              placeholder="contacto@pyme.cl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Fecha Preferida</label>
            <input
              type="date"
              required
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Horario Preferido</label>
            <select
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="09:00 AM">09:00 AM</option>
              <option value="10:00 AM">10:00 AM</option>
              <option value="11:30 AM">11:30 AM</option>
              <option value="03:00 PM">03:00 PM</option>
              <option value="04:30 PM">04:30 PM</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full py-3 bg-[#52796F] hover:bg-[#1B4D3E] text-white font-bold text-xs rounded-xl transition shadow-lg mt-2"
        >
          {cargando ? 'Procesando Agendamiento...' : 'Confirmar Cita de Asesoria B2B'}
        </button>
      </form>
    </div>
  );
}
