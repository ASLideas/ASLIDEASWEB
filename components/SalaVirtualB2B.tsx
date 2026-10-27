'use client';
import React, { useState } from 'react';

export interface PortalInfo {
  id: string;
  nombre: string;
  subtitulo: string;
  logo: string;
  oficinaNum: string;
  leyes: string[];
  descripcionCorta: string;
  descripcionLarga?: string;
  serviciosClave?: string[];
  beneficios?: string[];
  publicoObjetivo?: string;
  enConstruccion?: boolean;
}

interface SalaVirtualB2BProps {
  isOpen: boolean;
  onClose: () => void;
  portalData?: PortalInfo;
  isAdmin?: boolean;
}

export default function SalaVirtualB2B({ isOpen, onClose }: SalaVirtualB2BProps) {
  const [plataforma, setPlataforma] = useState<string>('1. Casa Matriz ASL Ideas SpA (Desarrollo B2B & Licencias)');
  const [motivo, setMotivo] = useState<string>('Cotización de Convenio Corporativo / Licencia B2B');
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState<string>('10:30 AM (Bloque Mañana)');
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [reservaConfirmada, setReservaConfirmada] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirmarReserva = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !fecha) {
      alert('Por favor completa todos los campos requeridos (*).');
      return;
    }
    setReservaConfirmada(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D6A4F]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] max-w-2xl w-full rounded-3xl border-2 border-[#D4AF37] shadow-2xl p-6 md:p-8 space-y-6 my-8">
        
        {/* ENCABEZADO */}
        <div className="flex justify-between items-center border-b border-[#C8D8CE] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
              Agendamiento Directo B2B
            </span>
            <h3 className="text-xl font-extrabold text-[#2D6A4F] mt-1">
              Reserva de Cita o Demostración Virtual
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-[#D85260] bg-[#FFF0F2] hover:bg-[#FF8894] hover:text-white px-3 py-1.5 rounded-xl border border-[#FF8894] transition"
          >
            ✕ Cerrar
          </button>
        </div>

        {/* CONTENIDO DEL FORMULARIO / CONFIRMACIÓN */}
        {reservaConfirmada ? (
          <div className="bg-white p-6 rounded-2xl border border-[#2D6A4F] text-center space-y-4 shadow-xs">
            <div className="w-12 h-12 mx-auto bg-[#E8F0EC] rounded-full flex items-center justify-center text-[#2D6A4F] font-bold text-xl">
              ✓
            </div>
            <h4 className="text-lg font-bold text-[#2D6A4F]">¡Cita Agendada Exitosamente!</h4>
            <p className="text-xs text-[#52796F] leading-relaxed">
              Hemos registrado tu solicitud para <strong>{nombre}</strong> ({email}). Te enviaremos los detalles de la reunión para el día <strong>{fecha}</strong> a las <strong>{hora}</strong>.
            </p>
            <button
              type="button"
              onClick={() => {
                setReservaConfirmada(false);
                onClose();
              }}
              className="bg-[#2D6A4F] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#1E3A2F] transition"
            >
              Entendido / Volver al Sitio
            </button>
          </div>
        ) : (
          <form onSubmit={handleConfirmarReserva} className="space-y-4 text-xs">
            {/* 1. PLATAFORMA */}
            <div className="space-y-1">
              <label className="font-bold text-[#2D6A4F] uppercase tracking-wider">
                1. ¿Para cuál plataforma deseas agendar? *
              </label>
              <select
                value={plataforma}
                onChange={(e) => setPlataforma(e.target.value)}
                className="w-full p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] font-medium outline-none focus:border-[#2D6A4F]"
              >
                <option value="1. Casa Matriz ASL Ideas SpA (Desarrollo B2B & Licencias)">1. Casa Matriz ASL Ideas SpA (Desarrollo B2B & Licencias)</option>
                <option value="2. LAWENMOLL Salud Integrativa (Evaluación Metabólica)">2. LAWENMOLL Salud Integrativa (Evaluación Metabólica)</option>
                <option value="3. Wellness Web App (Movimiento Adaptado & Pausas Activas)">3. Wellness Web App (Movimiento Adaptado & Pausas Activas)</option>
                <option value="4. Sabiduría Ancestral & Fitoterapia Nativa">4. Sabiduría Ancestral & Fitoterapia Nativa</option>
              </select>
            </div>

            {/* 2. MOTIVO */}
            <div className="space-y-1">
              <label className="font-bold text-[#2D6A4F] uppercase tracking-wider">
                2. ¿Para qué requiere la reunión o cita? *
              </label>
              <select
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="w-full p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] font-medium outline-none focus:border-[#2D6A4F]"
              >
                <option value="Cotización de Convenio Corporativo / Licencia B2B">Cotización de Convenio Corporativo / Licencia B2B</option>
                <option value="Demostración Virtual de Software Accesible UI/UX">Demostración Virtual de Software Accesible UI/UX</option>
                <option value="Atención Remota con Especialista o Terapeuta">Atención Remota con Especialista o Terapeuta</option>
                <option value="Consultoría en Accesibilidad Cognitiva Ley TEA (Ley 21.545)">Consultoría en Accesibilidad Cognitiva Ley TEA (Ley 21.545)</option>
              </select>
            </div>

            {/* 3 & 4. FECHA Y HORA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-[#2D6A4F] uppercase tracking-wider">
                  3. Fecha (Calendario) *
                </label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] font-medium outline-none focus:border-[#2D6A4F]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#2D6A4F] uppercase tracking-wider">
                  4. Hora Disponible *
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] font-medium outline-none focus:border-[#2D6A4F]"
                >
                  <option value="09:30 AM (Bloque Mañana)">09:30 AM (Bloque Mañana)</option>
                  <option value="10:30 AM (Bloque Mañana)">10:30 AM (Bloque Mañana)</option>
                  <option value="12:00 PM (Bloque Mediodía)">12:00 PM (Bloque Mediodía)</option>
                  <option value="15:30 PM (Bloque Tarde)">15:30 PM (Bloque Tarde)</option>
                  <option value="17:00 PM (Bloque Tarde)">17:00 PM (Bloque Tarde)</option>
                </select>
              </div>
            </div>

            {/* DATOS DE CONTACTO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-[#2D6A4F] uppercase tracking-wider">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre y apellido..."
                  className="w-full p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] outline-none focus:border-[#2D6A4F]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#2D6A4F] uppercase tracking-wider">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@empresa.cl"
                  className="w-full p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] outline-none focus:border-[#2D6A4F]"
                  required
                />
              </div>
            </div>

            {/* BOTÓN SUBMIT */}
            <button
              type="submit"
              className="w-full bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold py-3.5 rounded-2xl transition shadow-md mt-4"
            >
              Confirmar Reserva de Cita
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
