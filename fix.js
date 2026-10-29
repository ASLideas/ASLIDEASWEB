const fs = require('fs');
const path = require('path');

// Asegurar directorios
if (!fs.existsSync('components')) fs.mkdirSync('components', { recursive: true });
if (!fs.existsSync('app')) fs.mkdirSync('app', { recursive: true });
if (!fs.existsSync(path.join('app', 'sala-virtual'))) fs.mkdirSync(path.join('app', 'sala-virtual'), { recursive: true });
if (!fs.existsSync(path.join('app', 'admin'))) fs.mkdirSync(path.join('app', 'admin'), { recursive: true });
if (!fs.existsSync(path.join('app', 'comunidad'))) fs.mkdirSync(path.join('app', 'comunidad'), { recursive: true });

// 1. Componente: components/SalaVirtualB2B.tsx
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
  initialMode?: 'agendar' | 'cancelar' | 'videollamada';
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
  const [modo, setModo] = useState<'agendar' | 'cancelar' | 'videollamada'>(initialMode);
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

  const [micActivo, setMicActivo] = useState(true);
  const [camActiva, setCamActiva] = useState(true);
  const [transcribiendo, setTranscribiendo] = useState(false);
  const [archivosSubidos, setArchivosSubidos] = useState<string[]>(['Presentacion_Vitrina_B2B_ASL.pdf']);
  const [transcripcion, setTranscripcion] = useState<string[]>([
    'ASL Bot: Sala de Video Reunion iniciada bajo cifrado de ciberseguridad Ley N° 21.663.',
    'Sistemas: Entorno configurado con baja carga sensorial (Ley TEA N° 21.545).'
  ]);
  const [minuta, setMinuta] = useState<string>('Compromisos de la reunion:\\n1. Revision de Vitrina Virtual PYME.\\n2. Cotizacion de licencias de software inclusivo.');

  if (!isOpen) return null;

  const handleConfirmarReserva = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !fecha) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }
    setReservaConfirmada(true);
  };

  const handleSubirArchivo = () => {
    const nuevo = prompt('Nombre del documento o archivo a adjuntar:');
    if (nuevo && nuevo.trim()) {
      setArchivosSubidos([...archivosSubidos, nuevo.trim()]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#676E5E]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#E6E7D5] max-w-4xl w-full rounded-3xl border-2 border-[#97A884] shadow-2xl p-6 md:p-8 space-y-6 my-8 text-[#676E5E]">
        
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
                {modo === 'videollamada' ? 'Video Reunion Interactiva en Vivo' : modo === 'agendar' ? 'Reserva de Cita y Video Reunion' : 'Solicitud de Cancelacion'}
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

        <div className="flex bg-[#CDD6A9]/50 p-1 rounded-2xl border border-[#97A884] text-xs font-bold gap-1">
          <button
            type="button"
            onClick={() => setModo('videollamada')}
            className={\`flex-1 py-2 rounded-xl transition text-center cursor-pointer \${
              modo === 'videollamada' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:text-[#676E5E]'
            }\`}
          >
            Ingresar a Sala en Vivo
          </button>
          <button
            type="button"
            onClick={() => { setModo('agendar'); setReservaConfirmada(false); }}
            className={\`flex-1 py-2 rounded-xl transition text-center cursor-pointer \${
              modo === 'agendar' ? 'bg-[#676E5E] text-white shadow-xs' : 'text-[#676E5E] hover:text-[#676E5E]'
            }\`}
          >
            Agendar Reunion
          </button>
          <button
            type="button"
            onClick={() => setModo('cancelar')}
            className={\`flex-1 py-2 rounded-xl transition text-center cursor-pointer \${
              modo === 'cancelar' ? 'bg-[#DC8D6C] text-white shadow-xs' : 'text-[#676E5E] hover:text-[#DC8D6C]'
            }\`}
          >
            Cancelar / Reprogramar
          </button>
        </div>

        {modo === 'videollamada' && (
          <div className="space-y-6 text-xs">
            <div className="bg-[#3D4336] rounded-2xl p-6 text-white text-center relative min-h-[220px] flex flex-col justify-between shadow-inner border border-[#97A884]">
              <div className="flex justify-between items-center text-[10px]">
                <span className="bg-[#CDD6A9] text-[#676E5E] font-bold px-2.5 py-0.5 rounded-md">
                  EN VIVO - Encriptacion TLS 1.3
                </span>
                <span>ASL Ideas SpA - Sala B2B</span>
              </div>

              <div className="my-6">
                <div className="w-16 h-16 mx-auto bg-[#676E5E] rounded-full flex items-center justify-center font-bold text-xl border-2 border-[#E6C693] mb-2">
                  ASL
                </div>
                <p className="text-sm font-bold">{plataforma}</p>
                <p className="text-[11px] text-[#CDD6A9]">Camara: {camActiva ? 'Activa (HD)' : 'Desactivada'} | Mic: {micActivo ? 'Encendido' : 'Silenciado'}</p>
              </div>

              <div className="flex justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setMicActivo(!micActivo)}
                  className={\`px-3 py-1.5 rounded-lg font-bold text-[11px] transition \${
                    micActivo ? 'bg-[#676E5E] hover:bg-[#52584b]' : 'bg-[#DC8D6C]'
                  }\`}
                >
                  {micActivo ? 'Microfono ON' : 'Microfono OFF'}
                </button>
                <button
                  type="button"
                  onClick={() => setCamActiva(!camActiva)}
                  className={\`px-3 py-1.5 rounded-lg font-bold text-[11px] transition \${
                    camActiva ? 'bg-[#676E5E] hover:bg-[#52584b]' : 'bg-[#DC8D6C]'
                  }\`}
                >
                  {camActiva ? 'Camara ON' : 'Camara OFF'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTranscribiendo(!transcribiendo);
                    if (!transcribiendo) {
                      setTranscripcion([...transcripcion, 'Usuario: Transcripcion automatica activada.']);
                    }
                  }}
                  className={\`px-3 py-1.5 rounded-lg font-bold text-[11px] transition \${
                    transcribiendo ? 'bg-[#E6C693] text-[#676E5E]' : 'bg-[#676E5E] text-white'
                  }\`}
                >
                  {transcribiendo ? 'Transcribiendo...' : 'Transcribir Reunion'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-[#97A884] space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-[#676E5E]">Adjuntar Archivo</h4>
                  <button
                    type="button"
                    onClick={handleSubirArchivo}
                    className="bg-[#CDD6A9] hover:bg-[#97A884] text-[#676E5E] hover:text-white font-bold px-2 py-0.5 rounded-md text-[10px]"
                  >
                    + Subir
                  </button>
                </div>
                <ul className="space-y-1 text-[11px]">
                  {archivosSubidos.map((f, i) => (
                    <li key={i} className="p-1.5 bg-[#E6E7D5] rounded-lg border border-[#97A884]/40 font-mono truncate">
                      📄 {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#97A884] space-y-2">
                <h4 className="font-bold text-[#676E5E]">Transcribir Reunion</h4>
                <div className="h-24 overflow-y-auto bg-[#E6E7D5]/50 p-2 rounded-xl text-[10px] space-y-1 font-mono">
                  {transcripcion.map((t, idx) => (
                    <p key={idx}>{t}</p>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#97A884] space-y-2">
                <h4 className="font-bold text-[#676E5E]">Archivos y Notas / Minuta</h4>
                <textarea
                  value={minuta}
                  onChange={(e) => setMinuta(e.target.value)}
                  className="w-full h-24 p-2 bg-[#FAF8F5] border border-[#97A884] rounded-xl text-[11px] text-[#676E5E] outline-none"
                />
              </div>
            </div>
          </div>
        )}

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
                onClick={() => { setReservaConfirmada(false); setModo('videollamada'); }}
                className="bg-[#676E5E] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#52584b] transition cursor-pointer"
              >
                Ingresar a la Sala Virtual Ahora
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
          <form className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-[#DC8D6C] uppercase tracking-wider">Codigo de Reserva *</label>
              <input type="text" placeholder="Ej: ASL-8921" className="w-full p-3 bg-white border border-[#DC8D6C] rounded-xl text-[#676E5E]" />
            </div>
            <button type="button" onClick={() => alert('Reserva cancelada.')} className="w-full bg-[#DC8D6C] text-white font-bold py-3 rounded-xl">
              Confirmar Cancelacion
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
`;

// 2. Portada Principal: app/page.tsx
const pageCode = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  const [modalInitialMode, setModalInitialMode] = useState<'agendar' | 'cancelar' | 'videollamada'>('agendar');
  const [mostrarGuiaInstalacion, setMostrarGuiaInstalacion] = useState(false);

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

  const handleOpenPortal = (id?: string, mode: 'agendar' | 'cancelar' | 'videollamada' = 'videollamada') => {
    setSelectedPortalId(id ?? 'asl-ideas-b2b');
    setModalInitialMode(mode);
    setIsModalOpen(true);
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
            <Link
              href="/sala-virtual"
              className="bg-[#676E5E] text-white text-[11px] px-3.5 py-1 rounded-lg font-bold hover:bg-[#52584b] transition"
            >
              Sala de Video Reunion
            </Link>
            <Link
              href="/admin"
              className="bg-[#DC8D6C] text-white text-[11px] px-3.5 py-1 rounded-lg font-bold hover:bg-[#c37858] transition"
            >
              Admin ASL
            </Link>
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
            <Link
              href="/sala-virtual"
              className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition"
            >
              Ingresar a Sala
            </Link>
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'agendar')}
              className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
            >
              Agenda Citas
            </button>
            <Link
              href="/admin"
              className="bg-[#DC8D6C] text-white border border-[#DC8D6C] hover:bg-[#c37858] text-xs font-bold px-3 py-1.5 rounded-xl transition"
            >
              Admin ASL
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section Humano y Empatico */}
      <section className="bg-white border-b-2 border-[#E6C693] py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto space-y-6">
          <span className="inline-block bg-[#CDD6A9] text-[#676E5E] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-[#97A884]">
            Tecnologia con Alma & Empatia | Baja Carga Sensorial (Ley TEA N 21.545)
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#676E5E] leading-tight">
            Desarrollo y soluciones accesibles para PYME y comercio asociado
          </h2>

          <p className="text-sm sm:text-base text-[#676E5E]/90 max-w-3xl mx-auto leading-relaxed font-medium bg-[#E6E7D5]/40 p-6 rounded-3xl border border-[#97A884]/40 shadow-xs">
            Desarrollamos soluciones tecnologicas amables disenadas por y para personas con neurodivergencia y condiciones cronicas de salud, unificando el sistema metabolico, el movimiento adaptado y la sabiduria preventiva. ASL Ideas SpA Casa Matriz es la creadora de las tres aplicaciones del ecosistema, desarrolladora de soluciones a medida para el emprendedor.
          </p>
        </div>
      </section>

      {/* Introduccion y Descarga de la Web App (PWA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl border-2 border-[#97A884] p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[#97A884]/30 pb-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="bg-[#E6C693]/40 text-[#676E5E] text-xs font-bold px-3 py-1 rounded-full border border-[#E6C693] uppercase tracking-wider">
                Web App Accesible (PWA)
              </span>
              <h3 className="text-2xl font-black text-[#676E5E]">
                Lleva el Ecosistema ASL Ideas en tu Celular o Computador
              </h3>
              <p className="text-xs text-[#676E5E]/80 max-w-2xl leading-relaxed">
                Nuestra Web App esta optimizada para funcionar directamente desde cualquier navegador web (Chrome, Safari, Edge) sin ocupar espacio pesado en tu memoria y garantizando una experiencia fluida sin estres visual.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0 justify-center">
              <Link
                href="/sala-virtual"
                className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-5 py-3 rounded-2xl transition shadow-xs"
              >
                Abrir Web App Inclusiva
              </Link>
              <button
                type="button"
                onClick={() => setMostrarGuiaInstalacion(!mostrarGuiaInstalacion)}
                className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white text-xs font-bold px-4 py-3 rounded-2xl transition cursor-pointer"
              >
                {mostrarGuiaInstalacion ? 'Ocultar Guia' : 'Como instalar en tu Celular'}
              </button>
            </div>
          </div>

          {mostrarGuiaInstalacion && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#E6E7D5]/60 p-6 rounded-2xl border border-[#97A884] text-xs">
              <div className="space-y-2">
                <h4 className="font-extrabold text-[#676E5E] flex items-center gap-2">
                  <span>📱 Android (Google Chrome)</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-[#676E5E]/90">
                  <li>Abre esta pagina en Google Chrome.</li>
                  <li>Toca el menu de los 3 puntos (arriba a la derecha).</li>
                  <li>Selecciona <strong>Agregar a la pantalla principal</strong> o <strong>Instalar Aplicacion</strong>.</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h4 className="font-extrabold text-[#676E5E] flex items-center gap-2">
                  <span>🍎 iPhone / iPad (Safari)</span>
                </h4>
                <ol className="list-decimal list-inside space-y-1 text-[#676E5E]/90">
                  <li>Abre este enlace en Safari.</li>
                  <li>Toca el boton <strong>Compartir</strong> (cuadrado con flecha hacia arriba).</li>
                  <li>Desliza hacia abajo y elige <strong>Agregar a inicio</strong>.</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
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
                  onClick={() => handleOpenPortal(portal.id, 'videollamada')}
                  className="flex-1 bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold py-3 rounded-2xl transition shadow-sm text-center cursor-pointer"
                >
                  Ingresar a Sala
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenPortal(portal.id, 'agendar')}
                  className="bg-[#CDD6A9] text-[#676E5E] hover:bg-[#97A884] hover:text-white text-xs font-bold px-4 py-3 rounded-2xl transition shadow-xs cursor-pointer shrink-0 font-extrabold"
                >
                  Agenda de Reuniones
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-white border-t border-[#97A884]/30 py-6 text-center text-xs text-[#97A884] space-y-2">
        <p className="text-[#676E5E]">Copyright ASL Ideas SpA | Estrategia de Salud Digital y Vitrinas Inclusivas para PYMEs.</p>
        <div className="flex justify-center gap-4 text-[11px] px-4">
          <Link href="/admin" className="hover:underline font-bold text-[#676E5E]">Administracion (/admin)</Link>
          <span>-</span>
          <Link href="/sala-virtual" className="hover:underline font-bold text-[#676E5E]">Sala Virtual (/sala-virtual)</Link>
        </div>
      </footer>

      <SalaVirtualB2B
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        portalData={currentPortalData}
        initialMode={modalInitialMode}
      />
    </main>
  );
}
`;

// 3. Admin Libre / Sin Clave: app/admin/page.tsx
const adminPageCode = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans pb-16">
      <header className="bg-white border-b-2 border-[#E6C693] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#E6C693] p-0.5 overflow-hidden flex items-center justify-center">
              <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-black text-[#676E5E]">Consola de Administracion ASL Ideas SpA</h1>
              <p className="text-[9px] text-[#97A884] font-bold uppercase tracking-wider">
                Panel Muestra Abierta (Sin Clave)
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="bg-[#CDD6A9] text-[#676E5E] text-[10px] font-bold px-3 py-1 rounded-full border border-[#97A884]">
              Acceso Directo
            </span>
            <Link
              href="/"
              className="bg-[#676E5E] text-white hover:bg-[#52584b] text-xs font-bold px-3.5 py-1.5 rounded-xl transition"
            >
              Volver al Sitio
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        <div className="bg-white p-6 rounded-3xl border-2 border-[#97A884] shadow-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-3 py-0.5 rounded-full border border-[#97A884]">
              Modo Muestra e Inspeccion
            </span>
            <h2 className="text-xl font-extrabold text-[#676E5E] mt-1">
              Consola Abierta para Demostracion
            </h2>
            <p className="text-xs text-[#676E5E]/80 mt-1">
              Acceso liberado temporalmente para inspeccion de las funcionalidades de gestion B2B, citas agendadas y fichas SOAP.
            </p>
          </div>
          <Link
            href="/sala-virtual"
            className="bg-[#676E5E] hover:bg-[#52584b] text-white text-xs font-bold px-5 py-3 rounded-2xl transition shrink-0"
          >
            Abrir Sala Virtual
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#97A884] space-y-1 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#97A884]">Citas Agendadas B2B</span>
            <p className="text-2xl font-black text-[#676E5E]">14 Reuniones</p>
            <p className="text-[10px] text-[#676E5E]/70">Salas de Video Reunion activas</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#97A884] space-y-1 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#97A884]">Vitrinas PYME</span>
            <p className="text-2xl font-black text-[#676E5E]">8 PYMEs</p>
            <p className="text-[10px] text-[#676E5E]/70">Catalogos virtuales de salud integrativa</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#97A884] space-y-1 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#97A884]">Fichas Encriptadas</span>
            <p className="text-2xl font-black text-[#676E5E]">128 SOAP</p>
            <p className="text-[10px] text-[#676E5E]/70">Cumplimiento Ley N 21.663</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#97A884] space-y-1 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#97A884]">Licencias Corporativas</span>
            <p className="text-2xl font-black text-[#676E5E]">3 Convenios</p>
            <p className="text-[10px] text-[#676E5E]/70">Municipalidades e instituciones</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border-2 border-[#97A884] p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#97A884]/30 pb-4">
            <div>
              <h3 className="text-lg font-black text-[#676E5E]">Gestion de Solicitudes B2B y Citas Virtuales</h3>
              <p className="text-xs text-[#676E5E]/80">Listado de agendamientos recientes recibidos en el sitio web.</p>
            </div>
            <Link
              href="/sala-virtual"
              className="bg-[#676E5E] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#52584b] transition"
            >
              + Nueva Reunion
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#CDD6A9]/50 text-[#676E5E] border-b border-[#97A884]">
                  <th className="p-3 font-extrabold">Fecha / Horario</th>
                  <th className="p-3 font-extrabold">Solicitante / Empresa</th>
                  <th className="p-3 font-extrabold">Unidad / Servicio</th>
                  <th className="p-3 font-extrabold">Motivo</th>
                  <th className="p-3 font-extrabold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E7D5]">
                <tr>
                  <td className="p-3 font-semibold">2026-10-30 | 10:30 AM</td>
                  <td className="p-3">Municipalidad de Santiago</td>
                  <td className="p-3 font-medium">1. Casa Matriz ASL Ideas SpA</td>
                  <td className="p-3">Demo Software Accesibilidad Ley TEA</td>
                  <td className="p-3"><span className="bg-[#CDD6A9] text-[#676E5E] px-2 py-0.5 rounded-md font-bold">Confirmada</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">2026-10-31 | 15:30 PM</td>
                  <td className="p-3">PYME Herbolaria Nativa</td>
                  <td className="p-3 font-medium">4. Sabiduria Ancestral</td>
                  <td className="p-3">Cotizacion Vitrina Virtual B2B</td>
                  <td className="p-3"><span className="bg-[#E6C693]/40 text-[#676E5E] px-2 py-0.5 rounded-md font-bold">En Revision</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">2026-11-02 | 09:30 AM</td>
                  <td className="p-3">Centro Medico Integrativo</td>
                  <td className="p-3 font-medium">2. LAWENMOLL Salud Integrativa</td>
                  <td className="p-3">Consultoria Fichas SOAP (Ley 21.663)</td>
                  <td className="p-3"><span className="bg-[#CDD6A9] text-[#676E5E] px-2 py-0.5 rounded-md font-bold">Confirmada</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}
`;

// 4. Pagina Dedicada: app/sala-virtual/page.tsx
const salaVirtualPageCode = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SalaVirtualPage() {
  const [plataforma, setPlataforma] = useState('1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)');
  const [motivo, setMotivo] = useState('Videoreunion de Trabajo / Cotizacion de Vitrina B2B');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:30 AM (Bloque Manana)');
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
                Sala de Video Reunion B2B
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
                Atencion Corporativa e Institucional
              </span>
              <h2 className="text-2xl font-extrabold text-[#676E5E] mt-2">
                Sala Virtual de Reuniones & Agendamiento B2B
              </h2>
              <p className="text-xs text-[#676E5E]/80 mt-1">
                Coordina una videoreunion privada con el equipo de ASL Ideas SpA para cotizaciones de Vitrinas PYME, demos de software con accesibilidad Ley TEA N 21.545 o licencias corporativas.
              </p>
            </div>
          </div>

          {reservaConfirmada ? (
            <div className="bg-[#E6E7D5] p-8 rounded-2xl border border-[#97A884] text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-[#CDD6A9] rounded-full flex items-center justify-center text-[#676E5E] font-black text-lg border-2 border-[#97A884]">
                OK
              </div>
              <h3 className="text-xl font-bold text-[#676E5E]">Video Reunion Agendada con Exito</h3>
              <p className="text-sm text-[#676E5E] leading-relaxed max-w-lg mx-auto">
                Registramos la reunion para <strong>{nombre}</strong> ({email}) correspondiente a <strong>{plataforma}</strong>.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setReservaConfirmada(false)}
                  className="bg-[#676E5E] text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-[#52584b] transition cursor-pointer"
                >
                  Agendar Otra Reunion
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
                  <option value="4. Sabiduria Ancestral">4. Sabiduria Ancestral</option>
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
                  <option value="Videoreunion de Trabajo / Cotizacion de Vitrina B2B">Videoreunion de Trabajo / Cotizacion de Vitrina B2B</option>
                  <option value="Demostracion de Software Accesibilidad Cognitiva Ley TEA">Demostracion de Software Accesibilidad Cognitiva Ley TEA</option>
                  <option value="Consultoria Institucional B2B">Consultoria Institucional B2B</option>
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
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider block">Nombre / Empresa *</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre o institucion..."
                    className="w-full p-3.5 bg-[#FAF8F5] border border-[#97A884] rounded-xl text-[#676E5E] outline-none focus:border-[#676E5E]"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#676E5E] uppercase tracking-wider block">Correo Electronico *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@empresa.cl"
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
`;

// 5. Comunidad Page: app/comunidad/page.tsx
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
fs.writeFileSync(path.join('app', 'page.tsx'), pageCode, 'utf8');
fs.writeFileSync(path.join('app', 'admin', 'page.tsx'), adminPageCode, 'utf8');
fs.writeFileSync(path.join('app', 'sala-virtual', 'page.tsx'), salaVirtualPageCode, 'utf8');
fs.writeFileSync(path.join('app', 'comunidad', 'page.tsx'), comunidadPageCode, 'utf8');

console.log('✅ Todos los archivos actualizados exitosamente en fix.js.');