'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';

export interface PortalInfo {
  id?: string;
  key?: string;
  nombre?: string;
  title?: string;
  subtitulo?: string;
  subtitle?: string;
  logo?: string;
  description?: string;
  [key: string]: any;
}

export interface SalaVirtualB2BProps {
  activePortalKey?: string;
  initialApp?: string;
  appLogo?: string;
  isOpen: boolean;
  onClose: () => void;
  portalData?: PortalInfo;
  isAdmin?: boolean;
}

export default function SalaVirtualB2B({
  activePortalKey = 'asl',
  initialApp,
  appLogo,
  isOpen,
  onClose,
}: SalaVirtualB2BProps) {
  const [selectedApp, setSelectedApp] = useState<string>(initialApp || activePortalKey);
  const [motivo, setMotivo] = useState<string>('cotizacion');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isBooked, setIsBooked] = useState<boolean>(false);


  const handleBookingSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-[#FAF8F5] max-w-2xl w-full rounded-3xl border-2 border-[#C8D8CE] overflow-hidden shadow-2xl my-8 text-left font-sans">
        {/* Cabecera del Desplegable */}
        <div className="bg-[#2D6A4F] text-white p-5 flex justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            {appLogo && (
              <img src={appLogo} alt="Logo" className="w-8 h-8 object-contain rounded-lg bg-white/10 p-1" />
            )}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8D8CE] block">
                ASL IDEAS SPA — SALUD DIGITAL INCLUSIVA
              </span>
              <h3 className="text-base md:text-lg font-extrabold">
                Agendar Cita para Reunión Virtual
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>

        {/* Formulario de Agendamiento Directo */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-[#C8D8CE] pb-4">
            <div>
              <h4 className="text-base font-extrabold text-[#2D6A4F]">
                Formulario de Agendamiento Directo
              </h4>
              <p className="text-xs text-[#52796F]">
                Selecciona la plataforma, el motivo, la fecha en el calendario y la hora.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsBooked(false);
                setSelectedDate('');
                setUserName('');
                setUserEmail('');
              }}
              className="text-xs font-bold text-[#C55A5A] bg-[#FDF2F2] border border-[#F5C6C6] hover:bg-[#FADBDB] px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              Cancelar o Reagendar Cita
            </button>
          </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4 bg-white p-6 rounded-2xl border border-[#C8D8CE] shadow-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#2D6A4F] mb-1 uppercase tracking-wider">
                  1. ¿Para cuál plataforma deseas agendar? *
                </label>
                <select
                  value={selectedApp}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedApp(e.target.value)}
                  className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#C8D8CE] rounded-xl font-sans text-[#2D6A4F] outline-none focus:border-[#2D6A4F]"
                >
                  <option value="asl">1. Casa Matriz ASL Ideas SpA (Desarrollo B2B & Licencias)</option>
                  <option value="lawenmoll">2. LAWENMOLL Salud Integrativa (Evaluación Metabólica)</option>
                  <option value="wellness">3. Wellness Web App (Movimiento Adaptado & Pausas Activas)</option>
                  <option value="bienestar">4. Sabiduría Ancestral & Fitoterapia Nativa</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#2D6A4F] mb-1 uppercase tracking-wider">
                  2. ¿Para qué requiere la reunión o cita? *
                </label>
                <select
                  value={motivo}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setMotivo(e.target.value)}
                  className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#C8D8CE] rounded-xl font-sans text-[#2D6A4F] outline-none focus:border-[#2D6A4F]"
                >
                  <option value="cotizacion">Cotización de Convenio Corporativo / Licencia B2B</option>
                  <option value="demo">Demostración Virtual de Software Accesible UI/UX</option>
                  <option value="atencion">Atención Remota con Especialista o Terapeuta</option>
                  <option value="soporte">Consultoría en Accesibilidad Cognitiva Ley TEA (Ley 21.545)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#E8F0EC] p-4 rounded-2xl border border-[#C8D8CE]">
                <div>
                  <label className="block text-[11px] font-bold text-[#2D6A4F] mb-1 uppercase tracking-wider">
                    3. Fecha (Calendario) *
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedDate(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] font-bold outline-none focus:border-[#2D6A4F]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#2D6A4F] mb-1 uppercase tracking-wider">
                    4. Hora Disponible *
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedTime(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] font-bold outline-none focus:border-[#2D6A4F]"
                  >
                    <option value="09:00 AM">09:00 AM (Bloque Mañana)</option>
                    <option value="10:30 AM">10:30 AM (Bloque Mañana)</option>
                    <option value="12:00 PM">12:00 PM (Bloque Mediodía)</option>
                    <option value="15:00 PM">15:00 PM (Bloque Tarde)</option>
                    <option value="16:30 PM">16:30 PM (Bloque Tarde)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#2D6A4F] mb-1 uppercase tracking-wider">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                    placeholder="Tu nombre y apellido..."
                    className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#C8D8CE] rounded-xl text-[#2D6A4F] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#2D6A4F] mb-1 uppercase tracking-wider">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}
                    placeholder="ejemplo@empresa.cl"
                    className="w-full text-xs p-3 bg-[#FAF8F5] border border-[#C8D8CE] rounded-xl text-[#2D6A4F] outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold py-3.5 rounded-xl transition shadow-md cursor-pointer"
              >
                Confirmar Reserva de Cita
              </button>
            </form>
          ) : (
            <div className="bg-[#E8F0EC] p-6 rounded-3xl border-2 border-[#2D6A4F] space-y-4 text-center">
              <h4 className="text-base font-extrabold text-[#2D6A4F]">
                Cita Agendada Exitosamente
              </h4>
              <div className="bg-white p-4 rounded-2xl border border-[#C8D8CE] text-xs text-[#52796F] space-y-1 text-left">
                <p><span className="font-bold text-[#2D6A4F]">Solicitante:</span> {userName}</p>
                <p><span className="font-bold text-[#2D6A4F]">Correo:</span> {userEmail}</p>
                <p><span className="font-bold text-[#2D6A4F]">Fecha:</span> {selectedDate}</p>
                <p><span className="font-bold text-[#2D6A4F]">Horario:</span> {selectedTime}</p>
                <p><span className="font-bold text-[#2D6A4F]">Plataforma:</span> {selectedApp.toUpperCase()}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsBooked(false)}
                className="bg-[#2D6A4F] text-white text-xs font-bold px-6 py-2.5 rounded-xl cursor-pointer"
              >
                Agendar Otra Cita
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
