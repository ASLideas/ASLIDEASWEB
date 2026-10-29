const fs = require('fs');
const path = require('path');

if (!fs.existsSync('components')) fs.mkdirSync('components', { recursive: true });
if (!fs.existsSync('app')) fs.mkdirSync('app', { recursive: true });

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

interface SalaVirtualB2BProps {
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
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-3 py-1 rounded-full border border-[#97A884]">
              Sala de Video Reunion B2B
            </span>
            <h3 className="text-xl font-extrabold text-[#676E5E] mt-1">
              {modo === 'agendar' ? 'Reserva de Cita y Video Reunion' : 'Solicitud de Cancelacion'}
            </h3>
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

const pageCode = `'use client';

import React, { useState } from 'react';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export interface PortalItem {
  id: string;
  nombre: string;
  subtitulo: string;
  logo: string;
  oficinaNum: string;
  leyes: string[];
  descripcionCorta: string;
  descripcionLarga: string;
  serviciosClave: string[];
  beneficios: string[];
  enConstruccion?: boolean;
}

export default function HomePage() {
  const [selectedPortalId, setSelectedPortalId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalInitialMode, setModalInitialMode] = useState<'agendar' | 'cancelar'>('agendar');

  const portales: PortalItem[] = [
    {
      id: 'asl-ideas-b2b',
      nombre: 'ASL Ideas SpA',
      subtitulo: 'Casa Matriz - Desarrollo B2B y Licencias Inclusivas',
      logo: '/logo-asl.png.png',
      oficinaNum: 'Oficina Virtual 01',
      leyes: ['Ley TEA N 21.545', 'Accesibilidad Cognitiva UI/UX'],
      descripcionCorta: 'Centro de innovacion y gestion corporativa B2B en salud digital accesible.',
      descripcionLarga: 'Especialistas en desarrollo de software accesible a medida para municipalidades, empresas e instituciones de salud. Creamos vitrinas virtuales y entornos digitales amables con baja carga sensorial.',
      serviciosClave: ['Licencias B2B de Software', 'Vitrinas Virtuales PYME', 'Consultoria UI/UX en Ley TEA'],
      beneficios: ['Entornos de baja carga sensorial', 'Integracion agil con Supabase', 'Cumplimiento normativo estricto'],
      enConstruccion: false,
    },
    {
      id: 'lawenmoll-salud',
      nombre: 'LAWENMOLL',
      subtitulo: 'Salud Integrativa y Fichas Clinicas Protegidas',
      logo: '/logo-lawenmoll.jpg.png',
      oficinaNum: 'Oficina Virtual 02',
      leyes: ['Ley N 21.663 - Ciberseguridad', 'Ficha Clinica SOAP'],
      descripcionCorta: 'Evaluacion metabolica inteligente y gestion clinica encriptada de nivel medico.',
      descripcionLarga: 'Plataforma para el diagnostico preventivo y acompanamiento en enfermedades cronicas no transmisibles. Permite realizar tests de composicion metabolica, emision de reportes y consultas con terapeutas.',
      serviciosClave: ['Test de Bienestar Inteligente', 'Fichas SOAP Encriptadas', 'Telemedicina Integrativa'],
      beneficios: ['Datos de salud protegidos (Ley N 21.663)', 'Seguimiento metabolico personalizado', 'Atencion personalizada sin estres'],
      enConstruccion: false,
    },
    {
      id: 'wellness-web-app',
      nombre: 'Wellness Web App',
      subtitulo: 'Movimiento Adaptado y Pausas Activas',
      logo: '/logo-wellness.jpg.jpg',
      oficinaNum: 'Oficina Virtual 03',
      leyes: ['Movimiento Sin Impacto', 'Salas Interactivas Tematicas'],
      descripcionCorta: 'Salas virtuales en vivo y videoteca de entrenamiento adaptado sin impacto articular.',
      descripcionLarga: 'Espacio enfocado en la reduccion del cortisol urbano y la activacion fisica amable. Disenado para personas con sobrepeso, dolor articular o movilidad reducida mediante salas interactivas.',
      serviciosClave: ['Salas Virtuales Tematicas', 'Ejercicios Adaptados Sin Salto', 'Cocina Demostrativa'],
      beneficios: ['Reduccion efectiva del cortisol', 'Entrenamiento amable sin lesiones', 'Videoteca 24/7 disponible'],
      enConstruccion: false,
    },
    {
      id: 'sabiduria-ancestral',
      nombre: 'Sabiduria Ancestral',
      subtitulo: 'Comunidad Inclusiva y Fitoterapia Nativa',
      logo: '/logo-bienestar.png.png',
      oficinaNum: 'Oficina Virtual 04',
      leyes: ['Diario Mural Popular', 'Recetario Nativo PDF'],
      descripcionCorta: 'Comunidad para la divulgacion de medicina herbolaria nativa y secretos familiares.',
      descripcionLarga: 'Portal interactivo dedicado a preservar y difundir los conocimientos tradicionales de fitoterapia chilena. Incluye diario mural colaborativo de la comunidad y descarga directa de recetarios en PDF.',
      serviciosClave: ['Diario Mural Secretos de la Abuela', 'Recetario Herbolario en PDF', 'Asistente Empatico Virtual'],
      beneficios: ['Rescate de tradiciones nativas', 'Material descargable ilustrado', 'Comunidad de apoyo sin juicios'],
      enConstruccion: true,
    },
  ];

  const handleOpenPortal = (id?: string, mode: 'agendar' | 'cancelar' = 'agendar') => {
    setSelectedPortalId(id ?? 'asl-ideas-b2b');
    setModalInitialMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPortalId(null);
  };

  const currentPortalData = portales.find((p) => p.id === selectedPortalId);

  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans">
      <div className="bg-[#CDD6A9] border-b border-[#97A884] py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#676E5E] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC8D6C] animate-pulse"></span>
            <span>ASL Ideas SpA: Espacios y Vitrinas Virtuales Inclusivas (Ley TEA N 21.545)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'agendar')}
              className="bg-[#676E5E] text-white text-[11px] px-3.5 py-1 rounded-lg font-bold hover:bg-[#52584b] transition shadow-xs cursor-pointer"
            >
              Sala de Video Reunion
            </button>
            <a
              href="/admin"
              className="bg-[#DC8D6C] text-white text-[11px] px-3.5 py-1 rounded-lg font-bold hover:bg-[#c37858] transition shadow-xs"
            >
              Panel Admin
            </a>
          </div>
        </div>
      </div>

      <header className="bg-white/95 backdrop-blur-md border-b-2 border-[#E6C693] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#E6C693] p-0.5 overflow-hidden shadow-xs flex items-center justify-center">
              <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-[#676E5E]">ASL Ideas SpA</h1>
              <p className="text-[9px] text-[#97A884] font-bold uppercase tracking-wider">
                Estrategia de Salud Digital Inclusiva
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'agendar')}
              className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition shadow-xs cursor-pointer"
            >
              Agendar Cita
            </button>
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'cancelar')}
              className="bg-[#E6E7D5] text-[#DC8D6C] border border-[#DC8D6C] hover:bg-[#DC8D6C] hover:text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs cursor-pointer"
            >
              Cancelar
            </button>
            <a
              href="/admin"
              className="bg-white text-[#676E5E] border border-[#E6C693] hover:bg-[#E6E7D5] text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs"
            >
              Admin
            </a>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-[#97A884]/30 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#CDD6A9] text-[#676E5E] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider border border-[#97A884]">
              Casa Matriz & Licencias B2B
            </span>
            <span className="bg-[#E6C693]/40 text-[#676E5E] border border-[#E6C693] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Baja Carga Sensorial (Ley TEA N 21.545)
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#676E5E] leading-tight">
            Ecosistema de Soluciones Tecnologicas Accesibles
          </h2>
          <p className="text-sm text-[#676E5E]/80 max-w-2xl mx-auto leading-relaxed">
            Plataformas institucionales en salud integrativa, movimiento adaptado, vitrinas virtuales para PYMEs y preservacion del bienestar popular.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#DC8D6C] uppercase tracking-wider bg-white px-3.5 py-1 rounded-full border border-[#DC8D6C]">
            Plataformas Oficiales
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#676E5E]">
            Nuestras 4 Oficinas Virtuales y Aplicaciones
          </h3>
          <p className="text-xs text-[#676E5E]/80 max-w-xl mx-auto">
            Explora la funcionalidad y servicios de cada una de nuestras unidades tecnologicas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portales.map((portal) => (
            <div
              key={portal.id}
              className="bg-white rounded-3xl border-2 border-[#97A884] hover:border-[#E6C693] p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl border-2 border-[#E6C693] p-1 overflow-hidden bg-white shrink-0 shadow-sm flex items-center justify-center">
                      <img
                        src={portal.logo}
                        alt={\`Logo \${portal.nombre}\`}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-md border border-[#97A884]">
                        {portal.oficinaNum}
                      </span>
                      <h4 className="text-xl font-black text-[#676E5E] leading-snug mt-1">{portal.nombre}</h4>
                      <p className="text-xs font-bold text-[#97A884] uppercase tracking-wider">{portal.subtitulo}</p>
                    </div>
                  </div>

                  {portal.enConstruccion && (
                    <span className="text-[10px] font-bold bg-[#E6C693]/30 text-[#676E5E] px-2.5 py-1 rounded-lg border border-[#E6C693] shrink-0">
                      En Avance
                    </span>
                  )}
                </div>

                <div className="space-y-2 border-t border-[#E6E7D5] pt-3">
                  <p className="text-xs font-semibold text-[#676E5E] leading-relaxed">
                    {portal.descripcionCorta}
                  </p>
                  <p className="text-xs text-[#676E5E]/80 leading-relaxed">
                    {portal.descripcionLarga}
                  </p>
                </div>

                <div className="bg-[#E6E7D5] p-4 rounded-2xl border border-[#97A884]/40 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#676E5E] block">
                    Servicios y Modulos Clave:
                  </span>
                  <ul className="text-xs text-[#676E5E] space-y-1 list-disc list-inside">
                    {portal.serviciosClave.map((serv, idx) => (
                      <li key={idx} className="font-medium">{serv}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {portal.leyes.map((ley, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold bg-[#CDD6A9] text-[#676E5E] border border-[#97A884] px-2.5 py-1 rounded-lg"
                    >
                      {ley}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#97A884]/30 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenPortal(portal.id ?? '', 'agendar')}
                  className="flex-1 bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold py-3 rounded-2xl transition shadow-sm text-center cursor-pointer"
                >
                  {portal.enConstruccion ? 'Ver Avance y Demo' : \`Ingresar a \${portal.nombre}\`}
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenPortal(portal.id ?? '', 'agendar')}
                  className="bg-[#DC8D6C] text-white hover:bg-[#c37858] text-xs font-bold px-4 py-3 rounded-2xl transition shadow-xs cursor-pointer shrink-0"
                  title="Agendar Video Reunion"
                >
                  Video Reunion
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-[#97A884]/30 py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#DC8D6C] uppercase tracking-wider bg-[#E6E7D5] px-3.5 py-1 rounded-full border border-[#DC8D6C]">
              Vitrinas Virtuales B2B
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#676E5E]">
              Espacio y Difusion para PYMEs e Instituciones
            </h3>
            <p className="text-xs text-[#676E5E]/80 max-w-2xl mx-auto">
              Brindamos vitrinas digitales optimizadas para que emprendedores de la salud e instituciones exhiban sus productos y servicios en entornos amables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-[#E6E7D5] p-6 rounded-3xl border border-[#97A884] space-y-2">
              <h4 className="font-bold text-[#676E5E]">Vitrinas Digitales PYME</h4>
              <p className="text-[#676E5E]/80 leading-relaxed">
                Catalogos web interactivos y limpios para dar visibilidad comercial directa en entornos municipales e institucionales.
              </p>
            </div>

            <div className="bg-[#E6E7D5] p-6 rounded-3xl border border-[#97A884] space-y-2">
              <h4 className="font-bold text-[#676E5E]">Diseno Inclusivo Ley TEA</h4>
              <p className="text-[#676E5E]/80 leading-relaxed">
                Navegacion predecible y paleta relajante que garantizan la inclusion de personas con TEA Grado 1 y TDAH.
              </p>
            </div>

            <div className="bg-[#E6E7D5] p-6 rounded-3xl border border-[#97A884] space-y-2">
              <h4 className="font-bold text-[#676E5E]">Ciberseguridad Ley N 21.663</h4>
              <p className="text-[#676E5E]/80 leading-relaxed">
                Infraestructura encriptada para el resguardo de informacion confidencial, usuarios y atencion institucional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-[#97A884]/30 py-6 text-center text-xs text-[#97A884] space-y-2">
        <p className="text-[#676E5E]">Copyright ASL Ideas SpA | Estrategia de Salud Digital y Vitrinas Inclusivas para PYMEs.</p>
        <div className="flex justify-center gap-4 text-[11px] px-4">
          <a href="/admin" className="hover:underline font-bold text-[#676E5E]">Administracion (/admin)</a>
          <span>-</span>
          <span>Ley N 21.545 y Ley N 21.663</span>
        </div>
      </footer>

      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        portalData={currentPortalData}
        initialMode={modalInitialMode}
      />
    </main>
  );
}
`;

fs.writeFileSync(path.join('components', 'SalaVirtualB2B.tsx'), salaVirtualCode, 'utf8');
fs.writeFileSync(path.join('app', 'page.tsx'), pageCode, 'utf8');

console.log('✅ Componente SalaVirtualB2BProps actualizado con initialApp y appLogo.');
