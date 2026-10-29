'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SalaVirtualPage() {
  const [plataforma, setPlataforma] = useState('1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)');
  const [motivo, setMotivo] = useState('Videoreunión de Trabajo / Cotización de Vitrina B2B');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:30 AM (Bloque Mañana)');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [reservaConfirmada, setReservaConfirmada] = useState(false);

  const handleConfirmarReserva = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !fecha) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }
    setReservaConfirmada(true);
  };

  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans pb-16">
      <header className="bg-white/95 backdrop-blur-md border-b-2 border-[#E6C693] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#E6C693] p-0.5 overflow-hidden shadow-xs flex items-center justify-center">
              <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-[#676E5E]">ASL Ideas SpA</h1>
              <p className="text-[9px] text-[#97A884] font-bold uppercase tracking-wider">
                Sala de Video Reunión B2B
              </p>
            </div>
          </Link>
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition"
            >
              Volver al Inicio
            </Link>
            <Link
              href="/admin"
              className="bg-[#DC8D6C] text-white hover:bg-[#c37858] text-xs font-bold px-3.5 py-1.5 rounded-xl transition"
            >
              Panel Admin
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pt-10 space-y-8">
        <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#97A884] shadow-lg space-y-6">
          <div className="border-b border-[#97A884]/30 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-3.5 py-1 rounded-full border border-[#97A884]">
                Atención Corporativa e Institucional
              </span>
              <h2 className="text-2xl font-extrabold text-[#676E5E] mt-2">
                Sala Virtual de Reuniones & Agendamiento B2B
              </h2>
              <p className="text-xs text-[#676E5E]/80 mt-1">
                Coordina una videoreunión privada con el equipo de ASL Ideas SpA para cotizaciones de Vitrinas PYME, demos de software con accesibilidad Ley TEA N° 21.545 o licencias corporativas.
              </p>
            </div>
          </div>

          {reservaConfirmada ? (
            <div className="bg-[#E6E7D5] p-8 rounded-2xl border border-[#97A884] text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#CDD6A9] rounded-full flex items-center justify-center text-[#676E5E] font-black text-lg border-2 border-[#97A884]">
                OK
              </div>
              <h3 className="text-xl font-bold text-[#676E5E]">Video Reunión Agendada con Éxito</h3>
              <p className="text-sm text-[#676E5E] leading-relaxed max-w-lg mx-auto">
                Registramos la reunión para <strong>{nombre}</strong> ({email}) correspondiente a <strong>{plataforma}</strong>.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setReservaConfirmada(false)}
                  className="bg-[#676E5E] text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-[#52584b] transition cursor-pointer"
                >
                  Agendar Otra Reunión
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmarReserva} className="space-y-5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#676E5E] uppercase tracking-wider block">
                  1. Selecciona la Unidad o Servicio *
                </label>
                <select
                  value={plataforma}
                  onChange={(e) => setPlataforma(e.target.value)}
                  className="w-full p-3.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
                >
                  <option value="1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)">1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)</option>
                  <option value="2. LAWENMOLL Salud Integrativa">2. LAWENMOLL Salud Integrativa</option>
                  <option value="3. Wellness Web App (Movimiento Adaptado)">3. Wellness Web App (Movimiento Adaptado)</option>
                  <option value="4. Sabiduría Ancestral / Bienestar">4. Sabiduría Ancestral / Bienestar</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#676E5E] uppercase tracking-wider block">
                  2. Motivo de la Cita *
                </label>
                <select
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="w-full p-3.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
                >
                  <option value="Videoreunión de Trabajo / Cotización de Vitrina B2B">Videoreunión de Trabajo / Cotización de Vitrina B2B</option>
                  <option value="Demostración de Software Accesibilidad Cognitiva Ley TEA">Demostración de Software Accesibilidad Cognitiva Ley TEA</option>
                  <option value="Consultoría Institucional B2B">Consultoría Institucional B2B</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider block">Fecha *</label>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full p-3.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider block">Bloque Horario *</label>
                  <select
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    className="w-full p-3.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
                  >
                    <option value="09:30 AM (Bloque Mañana)">09:30 AM (Bloque Mañana)</option>
                    <option value="10:30 AM (Bloque Mañana)">10:30 AM (Bloque Mañana)</option>
                    <option value="12:00 PM (Bloque Mediodía)">12:00 PM (Bloque Mediodía)</option>
                    <option value="15:30 PM (Bloque Tarde)">15:30 PM (Bloque Tarde)</option>
                    <option value="17:00 PM (Bloque Tarde)">17:00 PM (Bloque Tarde)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider block">Nombre / Empresa *</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre o institución..."
                    className="w-full p-3.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl text-[#676E5E] outline-none focus:border-[#676E5E]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider block">Correo Electrónico *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@aslideas.cl"
                    className="w-full p-3.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl text-[#676E5E] outline-none focus:border-[#676E5E]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#676E5E] hover:bg-[#52584b] text-white text-sm font-bold py-4 rounded-2xl transition shadow-md cursor-pointer"
              >
                Confirmar Cita y Generar Enlace Virtual
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
