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
  initialMode?: 'agendar' | 'cancelar';
}

export default function SalaVirtualB2B({ isOpen, onClose, portalData, initialMode = 'agendar' }: SalaVirtualB2BProps) {
  const [modo, setModo] = useState<'agendar' | 'cancelar'>(initialMode);
  
  // Datos Agendamiento
  const [plataforma, setPlataforma] = useState<string>('1. Casa Matriz ASL Ideas SpA (Desarrollo B2B & Vitrinas PYME)');
  const [motivo, setMotivo] = useState<string>('Cotización de Vitrina Virtual PYME / Convenio Corporativo');
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState<string>('10:30 AM (Bloque Mañana)');
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [reservaConfirmada, setReservaConfirmada] = useState<boolean>(false);

  // Datos Cancelación
  const [codigoReserva, setCodigoReserva] = useState<string>('');
  const [emailCancelar, setEmailCancelar] = useState<string>('');
  const [motivoCancelacion, setMotivoCancelacion] = useState<string>('');
  const [cancelacionConfirmada, setCancelacionConfirmada] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirmarReserva = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !fecha) {
      alert('Por favor completa todos los campos requeridos (*).');
      return;
    }
    setReservaConfirmada(true);
  };

  const handleConfirmarCancelacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigoReserva.trim() || !emailCancelar.trim()) {
      alert('Por favor ingresa el código de reserva y tu correo registrado.');
      return;
    }
    setCancelacionConfirmada(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D6A4F]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] max-w-2xl w-full rounded-3xl border-2 border-[#D4AF37] shadow-2xl p-6 md:p-8 space-y-6 my-8">
        
        {/* ENCABEZADO */}
        <div className="flex justify-between items-center border-b border-[#C8D8CE] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
              Gestión de Agenda B2B & Vitrinas
            </span>
            <h3 className="text-xl font-extrabold text-[#2D6A4F] mt-1">
              {modo === 'agendar' ? 'Reserva de Cita o Vitrina Virtual' : 'Solicitud de Cancelación / Reprogramación'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-[#D85260] bg-[#FFF0F2] hover:bg-[#FF8894] hover:text-white px-3 py-1.5 rounded-xl border border-[#FF8894] transition cursor-pointer"
          >
            ✕ Cerrar
          </button>
        </div>

        {/* SELECTOR MODO: AGENDAR VS CANCELAR */}
        <div className="flex bg-[#E8F0EC] p-1 rounded-2xl border border-[#C8D8CE] text-xs font-bold">
          <button
            type="button"
            onClick={() => { setModo('agendar'); setReservaConfirmada(false); }}
            className={`flex-1 py-2.5 rounded-xl transition text-center cursor-pointer ${
              modo === 'agendar' ? 'bg-[#2D6A4F] text-white shadow-xs' : 'text-[#52796F] hover:text-[#2D6A4F]'
            }`}
          >
            ���️ Nueva Reserva / Cita
          </button>
          <button
            type="button"
            onClick={() => { setModo('cancelar'); setCancelacionConfirmada(false); }}
            className={`flex-1 py-2.5 rounded-xl transition text-center cursor-pointer ${
              modo === 'cancelar' ? 'bg-[#D85260] text-white shadow-xs' : 'text-[#52796F] hover:text-[#D85260]'
            }`}
          >
            ❌ Cancelar / Reprogramar Cita
          </button>
        </div>

        {/* MODO AGENDAR */}
        {modo === 'agendar' && (
          reservaConfirmada ? (
            <div className="bg-white p-6 rounded-2xl border border-[#2D6A4F] text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 mx-auto bg-[#E8F0EC] rounded-full flex items-center justify-center text-[#2D6A4F] font-bold text-xl">
                ✓
              </div>
              <h4 className="text-lg font-bold text-[#2D6A4F]">¡Cita Registrada Exitosamente!</h4>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Hemos recibido tu solicitud para <strong>{nombre}</strong> ({email}). Te enviaremos el acceso para la reunión del día <strong>{fecha}</strong> a las <strong>{hora}</strong>.
              </p>
              <button
                type="button"
                onClick={() => { setReservaConfirmada(false); onClose(); }}
                className="bg-[#2D6A4F] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#1E3A2F] transition cursor-pointer"
              >
                Entendido / Volver al Sitio
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirmarReserva} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#2D6A4F] uppercase tracking-wider">
                  1. Plataforma o Servicio *
                </label>
                <select
                  value={plataforma}
                  onChange={(e) => setPlataforma(e.target.value)}
                  className="w-full p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] font-medium outline-none focus:border-[#2D6A4F]"
                >
                  <option value="1. Casa Matriz ASL Ideas SpA (Desarrollo B2B & Vitrinas PYME)">1. Casa Matriz ASL Ideas SpA (Desarrollo B2B & Vitrinas PYME)</option>
                  <option value="2. LAWENMOLL Salud Integrativa (Evaluación Metabólica)">2. LAWENMOLL Salud Integrativa (Evaluación Metabólica)</option>
                  <option value="3. Wellness Web App (Movimiento Adaptado & Pausas Activas)">3. Wellness Web App (Movimiento Adaptado & Pausas Activas)</option>
                  <option value="4. Sabiduría Ancestral & Fitoterapia Nativa">4. Sabiduría Ancestral & Fitoterapia Nativa</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#2D6A4F] uppercase tracking-wider">
                  2. Motivo de la Cita *
                </label>
                <select
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="w-full p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] font-medium outline-none focus:border-[#2D6A4F]"
                >
                  <option value="Cotización de Vitrina Virtual PYME / Convenio Corporativo">Cotización de Vitrina Virtual PYME / Convenio Corporativo</option>
                  <option value="Demostración Virtual de Software Accesible UI/UX">Demostración Virtual de Software Accesible UI/UX</option>
                  <option value="Atención Remota con Especialista o Terapeuta">Atención Remota con Especialista o Terapeuta</option>
                  <option value="Consultoría en Accesibilidad Cognitiva Ley TEA (Ley 21.545)">Consultoría en Accesibilidad Cognitiva Ley TEA (Ley 21.545)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#2D6A4F] uppercase tracking-wider">Fecha *</label>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] font-medium outline-none focus:border-[#2D6A4F]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#2D6A4F] uppercase tracking-wider">Hora Disponible *</label>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#2D6A4F] uppercase tracking-wider">Nombre Completo / Empresa *</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre o PYME..."
                    className="w-full p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] outline-none focus:border-[#2D6A4F]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#2D6A4F] uppercase tracking-wider">Correo Electrónico *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@pyme.cl"
                    className="w-full p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] outline-none focus:border-[#2D6A4F]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold py-3.5 rounded-2xl transition shadow-md mt-4 cursor-pointer"
              >
                Confirmar Reserva de Cita
              </button>
            </form>
          )
        )}

        {/* MODO CANCELAR */}
        {modo === 'cancelar' && (
          cancelacionConfirmada ? (
            <div className="bg-white p-6 rounded-2xl border border-[#D85260] text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 mx-auto bg-[#FFF0F2] rounded-full flex items-center justify-center text-[#D85260] font-bold text-xl">
                ✕
              </div>
              <h4 className="text-lg font-bold text-[#D85260]">Solicitud de Cancelación Procesada</h4>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Hemos procesado la cancelación del código <strong>{codigoReserva}</strong> para el correo <strong>{emailCancelar}</strong>. Te enviamos la confirmación a tu e-mail.
              </p>
              <button
                type="button"
                onClick={() => { setCancelacionConfirmada(false); onClose(); }}
                className="bg-[#2D6A4F] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#1E3A2F] transition cursor-pointer"
              >
                Volver al Sitio Principal
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirmarCancelacion} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#D85260] uppercase tracking-wider">
                  Código de Reserva o RUT *
                </label>
                <input
                  type="text"
                  value={codigoReserva}
                  onChange={(e) => setCodigoReserva(e.target.value)}
                  placeholder="Ej: ASL-8921 o 12.345.678-K"
                  className="w-full p-3 bg-white border border-[#FF8894] rounded-xl text-[#2D6A4F] outline-none focus:border-[#D85260]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#D85260] uppercase tracking-wider">
                  Correo Electrónico Registrado *
                </label>
                <input
                  type="email"
                  value={emailCancelar}
                  onChange={(e) => setEmailCancelar(e.target.value)}
                  placeholder="correo@ejemplo.cl"
                  className="w-full p-3 bg-white border border-[#FF8894] rounded-xl text-[#2D6A4F] outline-none focus:border-[#D85260]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#52796F] uppercase tracking-wider">
                  Motivo de Cancelación o Reprogramación (Opcional)
                </label>
                <textarea
                  value={motivoCancelacion}
                  onChange={(e) => setMotivoCancelacion(e.target.value)}
                  placeholder="Indica la razón o si prefieres cambiar de fecha..."
                  rows={3}
                  className="w-full p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D85260] hover:bg-[#A8323E] text-white text-xs font-bold py-3.5 rounded-2xl transition shadow-md mt-4 cursor-pointer"
              >
                Confirmar Cancelación de Cita
              </button>
            </form>
          )
        )}

      </div>
    </div>
  );
}
