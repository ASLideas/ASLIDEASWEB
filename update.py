import base64

b64_sala = """
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
  
  const [plataforma, setPlataforma] = useState<string>('1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Vitrinas PYME)');
  const [motivo, setMotivo] = useState<string>('Cotizacion de Vitrina Virtual PYME / Convenio Corporativo');
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState<string>('10:30 AM (Bloque Manana)');
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [reservaConfirmada, setReservaConfirmada] = useState<boolean>(false);

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
      alert('Por favor ingresa el codigo de reserva y tu correo registrado.');
      return;
    }
    setCancelacionConfirmada(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D6A4F]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] max-w-2xl w-full rounded-3xl border-2 border-[#D4AF37] shadow-2xl p-6 md:p-8 space-y-6 my-8">
        
        <div className="flex justify-between items-center border-b border-[#C8D8CE] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
              Gestion de Agenda B2B y Vitrinas
            </span>
            <h3 className="text-xl font-extrabold text-[#2D6A4F] mt-1">
              {modo === 'agendar' ? 'Reserva de Cita o Vitrina Virtual' : 'Solicitud de Cancelacion o Reprogramacion'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-[#D85260] bg-[#FFF0F2] hover:bg-[#FF8894] hover:text-white px-3 py-1.5 rounded-xl border border-[#FF8894] transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>

        <div className="flex bg-[#E8F0EC] p-1 rounded-2xl border border-[#C8D8CE] text-xs font-bold">
          <button
            type="button"
            onClick={() => { setModo('agendar'); setReservaConfirmada(false); }}
            className={`flex-1 py-2.5 rounded-xl transition text-center cursor-pointer ${
              modo === 'agendar' ? 'bg-[#2D6A4F] text-white shadow-xs' : 'text-[#52796F] hover:text-[#2D6A4F]'
            }`}
          >
            Nueva Reserva / Cita
          </button>
          <button
            type="button"
            onClick={() => { setModo('cancelar'); setCancelacionConfirmada(false); }}
            className={`flex-1 py-2.5 rounded-xl transition text-center cursor-pointer ${
              modo === 'cancelar' ? 'bg-[#D85260] text-white shadow-xs' : 'text-[#52796F] hover:text-[#D85260]'
            }`}
          >
            Cancelar / Reprogramar Cita
          </button>
        </div>

        {modo === 'agendar' && (
          reservaConfirmada ? (
            <div className="bg-white p-6 rounded-2xl border border-[#2D6A4F] text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 mx-auto bg-[#E8F0EC] rounded-full flex items-center justify-center text-[#2D6A4F] font-bold text-xl">
                OK
              </div>
              <h4 className="text-lg font-bold text-[#2D6A4F]">Cita Registrada Exitosamente</h4>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Hemos recibido tu solicitud para <strong>{nombre}</strong> ({email}). Te enviaremos el acceso para la reunion del dia <strong>{fecha}</strong> a las <strong>{hora}</strong>.
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
                  <option value="1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Vitrinas PYME)">1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Vitrinas PYME)</option>
                  <option value="2. LAWENMOLL Salud Integrativa (Evaluacion Metabolica)">2. LAWENMOLL Salud Integrativa (Evaluacion Metabolica)</option>
                  <option value="3. Wellness Web App (Movimiento Adaptado y Pausas Activas)">3. Wellness Web App (Movimiento Adaptado y Pausas Activas)</option>
                  <option value="4. Sabiduria Ancestral y Fitoterapia Nativa">4. Sabiduria Ancestral y Fitoterapia Nativa</option>
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
                  <option value="Cotizacion de Vitrina Virtual PYME / Convenio Corporativo">Cotizacion de Vitrina Virtual PYME / Convenio Corporativo</option>
                  <option value="Demostracion Virtual de Software Accesible UI/UX">Demostracion Virtual de Software Accesible UI/UX</option>
                  <option value="Atencion Remota con Especialista o Terapeuta">Atencion Remota con Especialista o Terapeuta</option>
                  <option value="Consultoria en Accesibilidad Cognitiva Ley TEA (Ley 21.545)">Consultoria en Accesibilidad Cognitiva Ley TEA (Ley 21.545)</option>
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
                  <label className="font-bold text-[#2D6A4F] uppercase tracking-wider">Correo Electronico *</label>
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

        {modo === 'cancelar' && (
          cancelacionConfirmada ? (
            <div className="bg-white p-6 rounded-2xl border border-[#D85260] text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 mx-auto bg-[#FFF0F2] rounded-full flex items-center justify-center text-[#D85260] font-bold text-xl">
                X
              </div>
              <h4 className="text-lg font-bold text-[#D85260]">Solicitud de Cancelacion Procesada</h4>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Hemos procesado la cancelacion del codigo <strong>{codigoReserva}</strong> para el correo <strong>{emailCancelar}</strong>. Te enviamos la confirmacion a tu e-mail.
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
                  Codigo de Reserva o RUT *
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
                  Correo Electronico Registrado *
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
                  Motivo de Cancelacion o Reprogramacion (Opcional)
                </label>
                <textarea
                  value={motivoCancelacion}
                  onChange={(e) => setMotivoCancelacion(e.target.value)}
                  placeholder="Indica la razon o si prefieres cambiar de fecha..."
                  rows={3}
                  className="w-full p-3 bg-white border border-[#C8D8CE] rounded-xl text-[#2D6A4F] outline-none focus:border-[#2D6A4F]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#D85260] hover:bg-[#A8323E] text-white text-xs font-bold py-3.5 rounded-2xl transition shadow-md mt-4 cursor-pointer"
              >
                Confirmar Cancelacion de Cita
              </button>
            </form>
          )
        )}

      </div>
    </div>
  );
}
"""

b64_page = """
'use client';

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
      beneficios: ['Datos de salud protegidos (Ley 21.663)', 'Seguimiento metabolico personalizado', 'Sin estres en la atencion'],
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
      descripcionLarga: 'Espacio enfocado en la reduccion del cortisol urbano y la activacion fisica amable. Disenado para personas con sobrepeso, dolor articular o movilidad reducida mediante salas interactivas (Lotus, Cielo, Bosque, Raiz).',
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
      descripcionLarga: 'Portal interactivo dedicado a preservar y difundir los conocimientos tradicionales de fitoterapia chilena. Incluye un diario mural colaborativo de la comunidad y descarga directa de recetarios en PDF.',
      serviciosClave: ['Diario Mural "Secretos de la Abuela"', 'Recetario Herbolario en PDF', 'Asistente Empatico Virtual'],
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
    <main className="min-h-screen bg-[#FAF8F5] text-[#2D6A4F] font-sans selection:bg-[#E8F0EC]">
      <div className="bg-[#FFF0F2] border-b border-[#FF8894] py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#D85260] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF8894] animate-pulse"></span>
            <span>Espacios y Vitrinas Virtuales Inclusivas para PYMEs y Municipios (Ley TEA N 21.545)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'agendar')}
              className="bg-[#2D6A4F] text-white text-[11px] px-3 py-1 rounded-lg font-bold hover:bg-[#1E3A2F] transition shadow-xs cursor-pointer"
            >
              Citas / Demo
            </button>
            <a
              href="/admin"
              className="bg-[#D85260] text-white text-[11px] px-3 py-1 rounded-lg font-bold hover:bg-[#A8323E] transition shadow-xs"
            >
              Admin
            </a>
          </div>
        </div>
      </div>

      <header className="bg-white/95 backdrop-blur-md border-b-2 border-[#D4AF37] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#D4AF37] p-0.5 overflow-hidden shadow-xs flex items-center justify-center">
              <img src="/logo-asl.png.png" alt="Logo ASL Ideas" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-[#2D6A4F]">ASL Ideas SpA</h1>
              <p className="text-[9px] text-[#52796F] font-bold uppercase tracking-wider">
                Estrategia de Salud Digital Inclusiva
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'agendar')}
              className="bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs cursor-pointer"
            >
              Agendar
            </button>
            <button
              type="button"
              onClick={() => handleOpenPortal('asl-ideas-b2b', 'cancelar')}
              className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] hover:bg-[#FF8894] hover:text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs cursor-pointer"
            >
              Cancelar
            </button>
            <a
              href="/admin"
              className="bg-white text-[#2D6A4F] border border-[#D4AF37] hover:bg-[#FAF8F5] text-xs font-bold px-3 py-1.5 rounded-xl transition shadow-xs"
            >
              Admin
            </a>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-[#C8D8CE] py-10 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#2D6A4F] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider border border-[#C8D8CE]">
              Salud Digital Integrativa
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Baja Carga Sensorial (TEA / TDAH)
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D6A4F] leading-tight">
            Ecosistema de Soluciones Tecnologicas Amables
          </h2>
          <p className="text-sm text-[#52796F] max-w-2xl mx-auto leading-relaxed">
            Plataformas especializadas en salud integrativa, movimiento adaptado, vitrinas virtuales para PYMEs y preservacion del bienestar popular.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#D85260] uppercase tracking-wider bg-[#FFF0F2] px-3.5 py-1 rounded-full border border-[#FF8894]">
            Plataformas Oficiales
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#2D6A4F]">
            Nuestras 4 Oficinas Virtuales y Aplicaciones
          </h3>
          <p className="text-xs text-[#52796F] max-w-xl mx-auto">
            Explora las funcionalidades, servicios clave y beneficios de cada una de nuestras herramientas digitales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portales.map((portal) => (
            <div
              key={portal.id}
              className="bg-white rounded-3xl border-2 border-[#C8D8CE] hover:border-[#D4AF37] p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl border-2 border-[#D4AF37] p-1 overflow-hidden bg-white shrink-0 shadow-sm flex items-center justify-center">
                      <img
                        src={portal.logo}
                        alt={`Logo ${portal.nombre}`}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-[#E8F0EC] text-[#2D6A4F] px-2.5 py-0.5 rounded-md border border-[#C8D8CE]">
                        {portal.oficinaNum}
                      </span>
                      <h4 className="text-xl font-black text-[#2D6A4F] leading-snug mt-1">{portal.nombre}</h4>
                      <p className="text-xs font-bold text-[#84A59D] uppercase tracking-wider">{portal.subtitulo}</p>
                    </div>
                  </div>

                  {portal.enConstruccion && (
                    <span className="text-[10px] font-bold bg-[#FFF3D6] text-[#B8860B] px-2.5 py-1 rounded-lg border border-[#FFE08A] shrink-0">
                      En Avance
                    </span>
                  )}
                </div>

                <div className="space-y-2 border-t border-[#FAF8F5] pt-3">
                  <p className="text-xs font-semibold text-[#2D6A4F] leading-relaxed">
                    {portal.descripcionCorta}
                  </p>
                  <p className="text-xs text-[#52796F] leading-relaxed">
                    {portal.descripcionLarga}
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F] block">
                    Servicios y Modulos Clave:
                  </span>
                  <ul className="text-xs text-[#52796F] space-y-1 list-disc list-inside">
                    {portal.serviciosClave.map((serv, idx) => (
                      <li key={idx} className="font-medium">{serv}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {portal.leyes.map((ley, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-2.5 py-1 rounded-lg"
                    >
                      {ley}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#C8D8CE] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleOpenPortal(portal.id ?? '', 'agendar')}
                  className="flex-1 bg-[#2D6A4F] hover:bg-[#1E3A2F] text-white text-xs font-bold py-3 rounded-2xl transition shadow-sm text-center cursor-pointer"
                >
                  {portal.enConstruccion ? 'Ver Avance / Demo' : `Ingresar a ${portal.nombre}`}
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenPortal(portal.id ?? '', 'agendar')}
                  className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] hover:bg-[#FF8894] hover:text-white text-xs font-bold px-3 py-3 rounded-2xl transition shadow-xs cursor-pointer shrink-0"
                  title="Agendar Cita B2B"
                >
                  Cita
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-[#C8D8CE] py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#D85260] uppercase tracking-wider bg-[#FFF0F2] px-3.5 py-1 rounded-full border border-[#FF8894]">
              Vitrinas Virtuales B2B
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#2D6A4F]">
              Espacio y Difusion para PYMEs e Instituciones
            </h3>
            <p className="text-xs text-[#52796F] max-w-2xl mx-auto">
              Brindamos vitrinas digitales optimizadas para que emprendedores de la salud y el bienestar exhiban sus productos y servicios sin barreras tecnologicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <h4 className="font-bold text-[#2D6A4F]">Vitrinas Digitales PYME</h4>
              <p className="text-[#52796F] leading-relaxed">
                Catalogos web interactivos y limpios para dar visibilidad comercial directa en entornos municipales e institucionales.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <h4 className="font-bold text-[#2D6A4F]">Diseno Inclusivo Ley TEA</h4>
              <p className="text-[#52796F] leading-relaxed">
                Navegacion predecible y paletas relajantes que garantizan la inclusion de personas con TEA Grado 1 y TDAH.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] space-y-2">
              <h4 className="font-bold text-[#2D6A4F]">Ciberseguridad Ley 21.663</h4>
              <p className="text-[#52796F] leading-relaxed">
                Infraestructura encriptada para el resguardo de informacion confidencial, usuarios y atenciones clinicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-[#C8D8CE] py-6 text-center text-xs text-[#84A59D] space-y-2">
        <p>Copyright ASL Ideas SpA | Estrategia de Salud Digital y Vitrinas Inclusivas para PYMEs.</p>
        <div className="flex justify-center gap-4 text-[11px]">
          <a href="/admin" className="hover:underline font-bold text-[#2D6A4F]">Administracion (/admin)</a>
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
"""

with open('components/SalaVirtualB2B.tsx', 'w', encoding='utf-8') as f:
    f.write(b64_sala.strip())

with open('app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(b64_page.strip())

print("Archivos actualizados correctamente en UTF-8.")
