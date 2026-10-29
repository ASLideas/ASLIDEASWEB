const fs = require('fs');
const path = require('path');

if (!fs.existsSync('components')) fs.mkdirSync('components', { recursive: true });
if (!fs.existsSync('app')) fs.mkdirSync('app', { recursive: true });
if (!fs.existsSync(path.join('app', 'sala-virtual'))) fs.mkdirSync(path.join('app', 'sala-virtual'), { recursive: true });
if (!fs.existsSync(path.join('app', 'admin'))) fs.mkdirSync(path.join('app', 'admin'), { recursive: true });
if (!fs.existsSync(path.join('app', 'comunidad'))) fs.mkdirSync(path.join('app', 'comunidad'), { recursive: true });

const salaVirtualCode = `'use client';

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
  enConstruccion?: boolean;
}

export interface SalaVirtualB2BProps {
  isOpen: boolean;
  onClose: () => void;
  portalData?: PortalInfo;
  initialMode?: 'agendar' | 'cancelar';
  initialApp?: string;
  appLogo?: string;
}

export default function SalaVirtualB2B({
  isOpen,
  onClose,
  portalData,
  initialMode = 'agendar',
  initialApp,
  appLogo,
}: SalaVirtualB2BProps) {
  const [modo, setModo] = useState<'agendar' | 'cancelar'>(initialMode);
  const [plataforma, setPlataforma] = useState<string>(
    portalData?.nombre || initialApp || '1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)'
  );
  const [motivo, setMotivo] = useState<string>(
    'Videoreunion de Trabajo / Cotizacion de Vitrina B2B'
  );
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState<string>('10:30 AM (Bloque Manana)');
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [reservaConfirmada, setReservaConfirmada] = useState<boolean>(false);

  const [codigoReserva, setCodigoReserva] = useState<string>('');
  const [emailCancelar, setEmailCancelar] = useState<string>('');
  const [cancelacionConfirmada, setCancelacionConfirmada] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirmarReserva = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !fecha) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }
    setReservaConfirmada(true);
  };

  const handleConfirmarCancelacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigoReserva.trim() || !emailCancelar.trim()) {
      alert('Por favor ingresa el codigo de reserva y tu correo registrado.');
      return;
    }
    setCancelacionConfirmada(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#676E5E]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#E6E7D5] max-w-2xl w-full rounded-3xl border-2 border-[#97A884] shadow-2xl p-6 md:p-8 space-y-6 my-8 text-[#676E5E]">
        
        <div className="flex justify-between items-center border-b border-[#97A884]/40 pb-4">
          <div className="flex items-center space-x-3">
            {(portalData?.logo || appLogo) && (
              <img src={portalData?.logo || appLogo} alt="Logo" className="w-8 h-8 object-contain rounded-lg border border-[#97A884]" />
            )}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-3 py-0.5 rounded-full border border-[#97A884]">
                Sala de Video Reunion B2B
              </span>
              <h3 className="text-xl font-extrabold text-[#676E5E] mt-0.5">
                {modo === 'agendar' ? 'Reserva de Cita y Video Reunion' : 'Solicitud de Cancelacion'}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-white bg-[#DC8D6C] hover:bg-[#c37858] px-3.5 py-1.5 rounded-xl transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>

        <div className="flex bg-[#CDD6A9]/50 p-1 rounded-2xl border border-[#97A884] text-xs font-bold">
          <button
            type="button"
            onClick={() => { setModo('agendar'); setReservaConfirmada(false); }}
            className={\`flex-1 py-2.5 rounded-xl transition text-center cursor-pointer \${
              modo === 'agendar' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:text-[#676E5E]'
            }\`}
          >
            Agendar Video Reunion
          </button>
          <button
            type="button"
            onClick={() => { setModo('cancelar'); setCancelacionConfirmada(false); }}
            className={\`flex-1 py-2.5 rounded-xl transition text-center cursor-pointer \${
              modo === 'cancelar' ? 'bg-[#DC8D6C] text-white shadow-xs' : 'text-[#676E5E] hover:text-[#DC8D6C]'
            }\`}
          >
            Cancelar / Reprogramar
          </button>
        </div>

        {modo === 'agendar' && (
          reservaConfirmada ? (
            <div className="bg-white p-6 rounded-2xl border border-[#97A884] text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 mx-auto bg-[#CDD6A9] rounded-full flex items-center justify-center text-[#676E5E] font-extrabold text-xs">
                OK
              </div>
              <h4 className="text-lg font-bold text-[#676E5E]">Video Reunion Agendada</h4>
              <p className="text-xs text-[#676E5E] leading-relaxed">
                Hemos registrado la cita para <strong>{nombre}</strong> ({email}). El acceso a la sala de video reunion para el dia <strong>{fecha}</strong> a las <strong>{hora}</strong> ha sido enviado a tu correo.
              </p>
              <div className="p-3 bg-[#E6E7D5] rounded-xl border border-[#97A884] text-[11px] font-mono text-[#676E5E]">
                Enlace de Sala Virtual: [suspicious link removed]
              </div>
              <button
                type="button"
                onClick={() => { setReservaConfirmada(false); onClose(); }}
                className="bg-[#676E5E] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#52584b] transition cursor-pointer"
              >
                Volver a ASL Ideas
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirmarReserva} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#676E5E] uppercase tracking-wider">
                  1. Plataforma o Servicio *
                </label>
                <select
                  value={plataforma}
                  onChange={(e) => setPlataforma(e.target.value)}
                  className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
                >
                  <option value="1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)">1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)</option>
                  <option value="2. LAWENMOLL Salud Integrativa">2. LAWENMOLL Salud Integrativa</option>
                  <option value="3. Wellness Web App (Movimiento Adaptado)">3. Wellness Web App (Movimiento Adaptado)</option>
                  <option value="4. Sabiduria Ancestral">4. Sabiduria Ancestral</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#676E5E] uppercase tracking-wider">
                  2. Motivo de la Cita *
                </label>
                <select
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
                >
                  <option value="Videoreunion de Trabajo / Cotizacion de Vitrina B2B">Videoreunion de Trabajo / Cotizacion de Vitrina B2B</option>
                  <option value="Demostracion de Software Accesibilidad Cognitiva Ley TEA">Demostracion de Software Accesibilidad Cognitiva Ley TEA</option>
                  <option value="Consultoria Institucional B2B">Consultoria Institucional B2B</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider">Fecha *</label>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider">Bloque Horario *</label>
                  <select
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] font-medium outline-none focus:border-[#676E5E]"
                  >
                    <option value="09:30 AM (Bloque Manana)">09:30 AM (Bloque Manana)</option>
                    <option value="10:30 AM (Bloque Manana)">10:30 AM (Bloque Manana)</option>
                    <option value="12:00 PM (Bloque Mediodia)">12:00 PM (Bloque Mediodia)</option>
                    <option value="15:30 PM (Bloque Tarde)">15:30 PM (Bloque Tarde)</option>
                    <option value="17:00 PM (Bloque Tarde)">17:00 PM (Bloque Tarde)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider">Nombre Completo / Empresa *</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre o Institucion..."
                    className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] outline-none focus:border-[#676E5E]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider">Correo Electronico *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@empresa.cl"
                    className="w-full p-3 bg-white border border-[#97A884] rounded-xl text-[#676E5E] outline-none focus:border-[#676E5E]"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold py-3.5 rounded-2xl transition shadow-md mt-4 cursor-pointer"
              >
                Confirmar y Generar Sala Virtual
              </button>
            </form>
          )
        )}

        {modo === 'cancelar' && (
          cancelacionConfirmada ? (
            <div className="bg-white p-6 rounded-2xl border border-[#DC8D6C] text-center space-y-4 shadow-xs">
              <h4 className="text-lg font-bold text-[#DC8D6C]">Reserva Cancelada</h4>
              <p className="text-xs text-[#676E5E] leading-relaxed">
                La reunion con codigo <strong>{codigoReserva}</strong> ha sido cancelada para el correo <strong>{emailCancelar}</strong>.
              </p>
              <button
                type="button"
                onClick={() => { setCancelacionConfirmada(false); onClose(); }}
                className="bg-[#676E5E] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#52584b] transition cursor-pointer"
              >
                Volver al Sitio
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirmarCancelacion} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#DC8D6C] uppercase tracking-wider">
                  Codigo de Reserva o RUT *
                </label>
                <input
                  type="text"
                  value={codigoReserva}
                  onChange={(e) => setCodigoReserva(e.target.value)}
                  placeholder="Ej: ASL-8921"
                  className="w-full p-3 bg-white border border-[#DC8D6C] rounded-xl text-[#676E5E] outline-none focus:border-[#DC8D6C]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#DC8D6C] uppercase tracking-wider">
                  Correo Registrado *
                </label>
                <input
                  type="email"
                  value={emailCancelar}
                  onChange={(e) => setEmailCancelar(e.target.value)}
                  placeholder="correo@ejemplo.cl"
                  className="w-full p-3 bg-white border border-[#DC8D6C] rounded-xl text-[#676E5E] outline-none focus:border-[#DC8D6C]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#DC8D6C] hover:bg-[#c37858] text-white text-xs font-bold py-3.5 rounded-2xl transition shadow-md mt-4 cursor-pointer"
              >
                Confirmar Cancelacion
              </button>
            </form>
          )
        )}

      </div>
    </div>
  );
}
`;

const comunidadPageCode = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function ComunidadPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppName, setCurrentAppName] = useState('Sabiduria Ancestral');
  const [currentAppLogo, setCurrentAppLogo] = useState('/logo-bienestar.png.png');

  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans pb-16">
      <header className="bg-white border-b border-[#97A884] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#E6C693] p-0.5 overflow-hidden flex items-center justify-center">
              <img src="/logo-bienestar.png.png" alt="Logo Bienestar" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-black text-[#676E5E]">Comunidad & Sabiduria Ancestral</h1>
              <p className="text-[9px] text-[#97A884] font-bold uppercase tracking-wider">
                Diario Mural Popular y Recetarios Nativo PDF
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition"
            >
              Volver al Inicio
            </Link>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-[#676E5E] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl hover:bg-[#52584b] transition cursor-pointer"
            >
              Agendar Cita
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pt-10 space-y-8">
        <div className="bg-white p-8 rounded-3xl border-2 border-[#97A884] shadow-md space-y-6 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-3.5 py-1 rounded-full border border-[#97A884]">
            Oficina Virtual 04 - Herbolaria Nativa
          </span>
          <h2 className="text-3xl font-extrabold text-[#676E5E]">
            Diario Mural de Secretos de la Abuela
          </h2>
          <p className="text-xs text-[#676E5E]/80 max-w-xl mx-auto leading-relaxed">
            Espacio colaborativo para la preservación de la fitoterapia nativa chilena y la medicina natural comunitaria.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-[#DC8D6C] text-white text-xs font-bold px-6 py-3 rounded-2xl hover:bg-[#c37858] transition shadow-xs cursor-pointer"
            >
              Solicitar Informacion o Video Reunion
            </button>
          </div>
        </div>
      </div>

      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialApp={currentAppName}
        appLogo={currentAppLogo}
      />
    </main>
  );
}
`;

fs.writeFileSync(path.join('components', 'SalaVirtualB2B.tsx'), salaVirtualCode, 'utf8');
fs.writeFileSync(path.join('app', 'comunidad', 'page.tsx'), comunidadPageCode, 'utf8');

console.log('✅ Archivos actualizados exitosamente en UTF-8.');