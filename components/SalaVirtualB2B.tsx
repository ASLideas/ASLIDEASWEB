'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export interface PortalInfo {
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
  publicoObjetivo: string;
}

export interface ArchivoItem {
  id: string;
  nombre: string;
  tipo: 'pdf' | 'imagen';
  urlPreview?: string;
  fecha: string;
}

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  portalData?: PortalInfo;
  isAdmin?: boolean;
  initialApp?: string;
  appName?: string;
  appLogo?: string;
  [key: string]: any;
}

const horariosDisponibles: string[] = ['09:00 AM', '10:30 AM', '12:00 PM', '03:00 PM', '04:30 PM', '06:00 PM'];

const motivos: string[] = [
  'Atención Virtual (Participantes de Lado a Lado)',
  'Cotización de Convenio Corporativo / Licencia B2B',
  'Demostración de Software en Vivo',
  'Consultoría en Accesibilidad UI/UX (Ley TEA / Neurodivergencia)',
  'Muestra de Fichas Clínicas Encriptadas (Ley N° 21.663)',
  'Alianza Institucional o Municipal'
];

export default function SalaVirtualB2B({ 
  isOpen, 
  onClose, 
  portalData: inputPortalData,
  isAdmin = false,
  initialApp,
  appName,
  appLogo,
  ...restProps
}: Props) {
  const defaultLawenmoll: PortalInfo = {
    id: 'lawenmoll',
    nombre: 'LAWENMOLL Salud Integrativa',
    subtitulo: 'Evaluación Metabólica y Fichas Clínicas Protegidas',
    logo: '/lawenmoll_logo.jpg',
    oficinaNum: 'Oficina Virtual 02',
    leyes: ['Ley N° 21.663 - Datos Protegidos', 'Ley TEA N° 21.545', 'Estándar SOAP'],
    descripcionCorta: 'Test de Bienestar Inteligente, composición metabólica, Fichas Clínicas encriptadas bajo Ley N° 21.663 y consulta con especialistas.',
    descripcionLarga: 'Plataforma clínica integrativa enfocada en la evaluación personalizada de la salud metabólica. Unifica la medicina preventiva con herramientas digitales que encriptan el historial clínico y conectan al paciente con especialistas de la salud.',
    serviciosClave: [
      'Test de Bienestar Inteligente',
      'Cálculo de Composición Corporal y Metabólica',
      'Fichas Clínicas Encriptadas (Ley N° 21.663)',
      'Atención con Especialistas y Terapeutas'
    ],
    beneficios: [
      'Diagnóstico preventivo sin juicios sobre el peso.',
      'Privacidad total de fichas médicas.',
      'Seguimiento personalizado.'
    ],
    publicoObjetivo: 'Pacientes con condiciones crónicas, adultos con sobrepeso y profesionales de la salud'
  };

  const effectiveName = inputPortalData?.nombre || appName || initialApp || defaultLawenmoll.nombre;
  const effectiveLogo = inputPortalData?.logo || appLogo || defaultLawenmoll.logo;

  const portalData: PortalInfo = inputPortalData || {
    ...defaultLawenmoll,
    nombre: effectiveName,
    logo: effectiveLogo
  };

  // Estado del Código de Reunión y Videollamada
  const [codigoSala, setCodigoSala] = useState<string>('');
  const [copiado, setCopiado] = useState<boolean>(false);
  const [micActivo, setMicActivo] = useState<boolean>(true);
  const [camaraActiva, setCamaraActiva] = useState<boolean>(true);
  const [enLlamada, setEnLlamada] = useState<boolean>(true);
  const [modalCancelar, setModalCancelar] = useState<boolean>(false);
  const [motivoCancelacion, setMotivoCancelacion] = useState<string>('Fallo técnico / Problema de conexión a internet');

  // Panel Lateral en Videollamada (Añadir Doc, Nota, Transcribir, Imagen, Agendar)
  const [activeSideTab, setActiveSideTab] = useState<'menu' | 'nota' | 'transcripcion'>('menu');

  // Estado de Archivos Subidos
  const [archivosList, setArchivosList] = useState<ArchivoItem[]>([
    { id: '1', nombre: 'Ficha_Clinica_SOAP_Inicial.pdf', tipo: 'pdf', fecha: '23/10/2026' },
    { id: '2', nombre: 'Pauta_Evaluacion_Metabolica.pdf', tipo: 'pdf', fecha: '23/10/2026' },
    { id: '3', nombre: 'Esquema_Composicion_Corporal.jpg', tipo: 'imagen', fecha: '23/10/2026' }
  ]);
  const [archivoPreview, setArchivoPreview] = useState<ArchivoItem | null>(null);

  // Formulario Agendamiento
  const [motivoConsulta, setMotivoConsulta] = useState<string>('Atención Virtual (Participantes de Lado a Lado)');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  // Transcripción y Notas
  const [transcripcion, setTranscripcion] = useState<string>(
    'Registro de Sesión: Paciente consulta para evaluación de salud metabólica. Se acuerda pauta de seguimiento integrativo.'
  );
  const [transcribiendo, setTranscribiendo] = useState<boolean>(false);
  const [notas, setNotas] = useState<string[]>([
    'Acuerdo preliminar: Demostración de interfaz accesible UI/UX.',
    'Revisión de requerimientos para Ley N° 21.663 y Ley TEA N° 21.545.'
  ]);
  const [nuevaNota, setNuevaNota] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const codeGenerated = `ASL-${portalData.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setCodigoSala(codeGenerated);
      setEnLlamada(true);
      setBookingSuccess(false);
    }
  }, [isOpen, inputPortalData]);

  if (!isOpen) return null;

  const copiarCodigoSala = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(codigoSala);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  };

  const handleSubirArchivo = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const isImg = file.type.includes('image');
      const nuevoArchivo: ArchivoItem = {
        id: Date.now().toString(),
        nombre: file.name,
        tipo: isImg ? 'imagen' : 'pdf',
        urlPreview: isImg ? URL.createObjectURL(file) : undefined,
        fecha: new Date().toLocaleDateString('es-CL')
      };
      setArchivosList((prev) => [nuevoArchivo, ...prev]);
    }
  };

  const handleEliminarArchivo = (id: string) => {
    setArchivosList((prev) => prev.filter((item) => item.id !== id));
    if (archivoPreview?.id === id) setArchivoPreview(null);
  };

  const handleCancelarReunion = () => {
    setEnLlamada(false);
    setModalCancelar(false);
  };

  const handleAgregarNota = () => {
    if (!nuevaNota.trim()) return;
    setNotas((prev) => [...prev, nuevaNota.trim()]);
    setNuevaNota('');
  };

  const handleTranscribirReunion = () => {
    setTranscribiendo(true);
    setTimeout(() => {
      setTranscribiendo(false);
      setTranscripcion((prev) => prev + '\n\n[Transcripción Automática - Ley N° 21.663]: Acuerdos resguardados.');
      setActiveSideTab('transcripcion');
    }, 1000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF8F5] overflow-y-auto font-sans text-[#2D6A4F] selection:bg-[#E8F0EC]">
      
      {/* HEADER DE MARCA (VERDE, DORADO, ROSADO PASTEL) */}
      <header className="bg-white sticky top-0 z-50 border-b-2 border-[#D4AF37] shadow-xs px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#FFF0F2] p-1.5 border-2 border-[#F4ACB7] shadow-xs flex items-center justify-center overflow-hidden flex-shrink-0">
              <img 
                src={portalData.logo} 
                alt={portalData.nombre} 
                className="w-full h-full object-contain" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/LOGO_asl.png';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-3 py-0.5 rounded-full">
                  {portalData.oficinaNum}
                </span>
                <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-3 py-0.5 rounded-full">
                  Ley N° 21.663
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-[#2D6A4F]">{portalData.nombre}</h2>
              <p className="text-xs text-[#84A59D] font-medium">{portalData.subtitulo}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button 
              type="button"
              onClick={() => scrollToSection('sec-videollamada')}
              className="text-xs font-bold bg-[#52796F] text-white hover:bg-[#2D6A4F] px-4 py-2 rounded-xl transition shadow-xs"
            >
              Videollamada en Vivo
            </button>
            <button 
              type="button"
              onClick={() => scrollToSection('sec-agendar')}
              className="text-xs font-bold bg-[#E8F0EC] hover:bg-[#52796F] hover:text-white text-[#2D6A4F] px-4 py-2 rounded-xl transition border border-[#C8D8CE]"
            >
              Agendar Cita
            </button>
            <button 
              type="button"
              onClick={onClose} 
              className="text-xs font-bold bg-[#FFF0F2] hover:bg-[#FF8894] text-[#D85260] hover:text-white px-5 py-2 rounded-full border border-[#FF8894] transition shadow-xs ml-2"
            >
              Cerrar Portal
            </button>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-12">

        {/* CÓDIGO DE REUNIÓN Y RECONEXIÓN */}
        <section className="bg-[#FFF0F2] p-6 rounded-3xl border-2 border-[#F4ACB7] flex flex-col md:flex-row justify-between items-center gap-4 shadow-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-[#D85260] border border-[#FF8894] px-3 py-0.5 rounded-full">
              Código de Acceso Seguro a la Sala
            </span>
            <h3 className="text-xl font-extrabold text-[#2D6A4F]">
              Código de Videollamada: <span className="text-[#D85260] font-mono">{codigoSala}</span>
            </h3>
            <p className="text-xs text-[#52796F]">
              Comparte este código para reconectar a los participantes en caso de inestabilidad de red.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={copiarCodigoSala}
              className="bg-[#D4AF37] hover:bg-[#B08D4B] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs"
            >
              {copiado ? '¡Código Copiado!' : 'Copiar Código de Sala'}
            </button>
            <button
              type="button"
              onClick={() => setModalCancelar(true)}
              className="bg-white hover:bg-[#FFF0F2] text-[#D85260] text-xs font-bold px-5 py-2.5 rounded-xl border border-[#FF8894] transition shadow-xs"
            >
              Cancelar / Reagendar
            </button>
          </div>
        </section>

        {/* SECCIÓN 1: VIDEOLLAMADA + MENÚ LATERAL DERECHO */}
        <section id="sec-videollamada" className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#D4AF37] shadow-md space-y-6">
          <div className="flex justify-between items-center border-b border-[#E8F0EC] pb-4 flex-wrap gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
                Módulo Interactivo • Participantes Lado a Lado
              </span>
              <h3 className="text-xl font-bold text-[#2D6A4F] mt-1">Sala de Videollamada en Vivo</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-[#2D6A4F]">Conexión Encriptada Activa</span>
            </div>
          </div>

          {enLlamada ? (
            /* GRILLA: VIDEOLLAMADA (IZQUIERDA) + MENÚ LATERAL (DERECHA) */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* ÁREA DE VIDEOLLAMADA (COLUMNAS 1 Y 2) */}
              <div className="lg:col-span-2 bg-[#2D6A4F] rounded-3xl p-6 text-white space-y-6 shadow-inner flex flex-col justify-between">
                
                {/* CAMARAS EN PARALELO */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[280px]">
                  {/* CÁMARA ESPECIALISTA */}
                  <div className="bg-[#52796F] rounded-2xl p-5 flex flex-col justify-between border-2 border-[#D4AF37] relative overflow-hidden">
                    <div className="flex justify-between items-center z-10">
                      <span className="bg-black/40 text-white text-[10px] px-3 py-1 rounded-full font-bold">
                        Especialista ASL Ideas
                      </span>
                      <span className="text-[10px] text-[#D4AF37] font-bold">HD 1080p</span>
                    </div>
                    <div className="text-center my-6 z-10">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-white p-1.5 border-2 border-[#D4AF37] mb-2 overflow-hidden shadow-md flex items-center justify-center">
                        <img src={portalData.logo} alt="Logo Portal" className="w-full h-full object-contain" />
                      </div>
                      <p className="text-xs font-bold">Atención Virtual Adaptada</p>
                    </div>
                    <div className="text-[9px] bg-black/30 p-2 rounded-xl text-center z-10">
                      Entorno de Baja Sobrecarga Sensorial (TEA/TDAH)
                    </div>
                  </div>

                  {/* CÁMARA USUARIO */}
                  <div className="bg-[#3A5A40] rounded-2xl p-5 flex flex-col justify-between border-2 border-[#F4ACB7] relative overflow-hidden">
                    <div className="flex justify-between items-center z-10">
                      <span className="bg-black/40 text-white text-[10px] px-3 py-1 rounded-full font-bold">
                        Usuario / Cliente
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">Conectado</span>
                    </div>
                    <div className="text-center my-6 z-10">
                      <div className="w-16 h-16 mx-auto rounded-full bg-[#FFF0F2] flex items-center justify-center border-2 border-[#FF8894] mb-2 text-[#D85260] font-bold text-lg shadow-md">
                        {userName ? userName.substring(0, 2).toUpperCase() : 'USU'}
                      </div>
                      <p className="text-xs font-bold">{userName || 'Participante Invitado'}</p>
                    </div>
                    <div className="text-[9px] bg-black/30 p-2 rounded-xl text-center z-10">
                      Audio y Ficha Protegida Ley N° 21.663
                    </div>
                  </div>
                </div>

                {/* CONTROLES DE LA VIDEOLLAMADA */}
                <div className="flex flex-wrap justify-center items-center gap-2 pt-2 bg-black/20 p-3 rounded-2xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setMicActivo(!micActivo)}
                    className={`text-xs font-bold px-3.5 py-2 rounded-xl transition ${micActivo ? 'bg-white text-[#2D6A4F]' : 'bg-[#D85260] text-white'}`}
                  >
                    {micActivo ? 'Micrófono Activado' : 'Micrófono Mute'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCamaraActiva(!camaraActiva)}
                    className={`text-xs font-bold px-3.5 py-2 rounded-xl transition ${camaraActiva ? 'bg-white text-[#2D6A4F]' : 'bg-[#D85260] text-white'}`}
                  >
                    {camaraActiva ? 'Cámara Encendida' : 'Cámara Apagada'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalCancelar(true)}
                    className="bg-[#D85260] hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                  >
                    Finalizar Llamada
                  </button>
                </div>
              </div>

              {/* MENÚ LATERAL DERECHO (COLUMNA 3) */}
              <div className="lg:col-span-1 bg-[#FAF8F5] p-5 rounded-3xl border-2 border-[#C8D8CE] flex flex-col justify-between space-y-4 shadow-xs">
                <div>
                  <div className="border-b border-[#C8D8CE] pb-3 mb-4">
                    <h4 className="text-xs font-extrabold uppercase text-[#2D6A4F] tracking-wider">
                      Panel Lateral de Control
                    </h4>
                    <p className="text-[11px] text-[#52796F]">Herramientas de consulta en vivo</p>
                  </div>

                  {/* MENÚ DE BOTONES FUNCIONALES */}
                  <div className="space-y-2.5">
                    {/* BOTÓN 1: AÑADIR DOCUMENTO */}
                    <label className="w-full bg-white hover:bg-[#E8F0EC] border border-[#C8D8CE] p-3 rounded-2xl cursor-pointer transition flex items-center justify-between shadow-xs group">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-[#E8F0EC] text-[#2D6A4F] flex items-center justify-center font-bold text-sm">📄</span>
                        <div className="text-left">
                          <p className="text-xs font-bold text-[#2D6A4F]">Añadir Documento</p>
                          <p className="text-[10px] text-[#84A59D]">Subir PDF o Ficha SOAP</p>
                        </div>
                      </div>
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleSubirArchivo} className="hidden" />
                      <span className="text-xs font-bold text-[#52796F] group-hover:translate-x-1 transition">+</span>
                    </label>

                    {/* BOTÓN 2: CREAR NOTA */}
                    <button
                      type="button"
                      onClick={() => setActiveSideTab(activeSideTab === 'nota' ? 'menu' : 'nota')}
                      className="w-full bg-white hover:bg-[#E8F0EC] border border-[#C8D8CE] p-3 rounded-2xl transition flex items-center justify-between shadow-xs group text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-[#FFF0F2] text-[#D85260] flex items-center justify-center font-bold text-sm">📝</span>
                        <div>
                          <p className="text-xs font-bold text-[#2D6A4F]">Crear Nota</p>
                          <p className="text-[10px] text-[#84A59D]">Registrar acuerdo rápido</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#52796F] group-hover:translate-x-1 transition">✏️</span>
                    </button>

                    {/* BOTÓN 3: TRANSCRIBIR SESIÓN */}
                    <button
                      type="button"
                      onClick={handleTranscribirReunion}
                      disabled={transcribiendo}
                      className="w-full bg-white hover:bg-[#E8F0EC] border border-[#C8D8CE] p-3 rounded-2xl transition flex items-center justify-between shadow-xs group text-left disabled:opacity-50"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-[#E8F0EC] text-[#2D6A4F] flex items-center justify-center font-bold text-sm">🎙️</span>
                        <div>
                          <p className="text-xs font-bold text-[#2D6A4F]">
                            {transcribiendo ? 'Transcribiendo...' : 'Transcribir Sesión'}
                          </p>
                          <p className="text-[10px] text-[#84A59D]">Registro asistido de voz</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#52796F] group-hover:translate-x-1 transition">▶</span>
                    </button>

                    {/* BOTÓN 4: ADJUNTAR IMAGEN */}
                    <label className="w-full bg-white hover:bg-[#E8F0EC] border border-[#C8D8CE] p-3 rounded-2xl cursor-pointer transition flex items-center justify-between shadow-xs group">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-[#FFF0F2] text-[#D85260] flex items-center justify-center font-bold text-sm">🖼️</span>
                        <div className="text-left">
                          <p className="text-xs font-bold text-[#2D6A4F]">Adjuntar Imagen</p>
                          <p className="text-[10px] text-[#84A59D]">Subir esquema / JPG</p>
                        </div>
                      </div>
                      <input type="file" accept=".jpg,.png,.jpeg" onChange={handleSubirArchivo} className="hidden" />
                      <span className="text-xs font-bold text-[#52796F] group-hover:translate-x-1 transition">+</span>
                    </label>

                    {/* BOTÓN 5: AGENDAR CITA */}
                    <button
                      type="button"
                      onClick={() => scrollToSection('sec-agendar')}
                      className="w-full bg-[#52796F] hover:bg-[#2D6A4F] text-white p-3 rounded-2xl transition flex items-center justify-between shadow-xs text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold text-sm">📅</span>
                        <div>
                          <p className="text-xs font-bold">Agendar Cita</p>
                          <p className="text-[10px] text-[#E8F0EC]">Nueva sesión B2B</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold">➔</span>
                    </button>
                  </div>
                </div>

                {/* SUBPANEL DESPLEGABLE EN LÍNEA (NOTAS / TRANSCRIPCIÓN) */}
                {activeSideTab === 'nota' && (
                  <div className="bg-white p-3.5 rounded-2xl border border-[#C8D8CE] space-y-2">
                    <p className="text-[11px] font-bold text-[#2D6A4F]">Nueva Nota Rápida:</p>
                    <textarea
                      rows={2}
                      value={nuevaNota}
                      onChange={(e) => setNuevaNota(e.target.value)}
                      placeholder="Escribir nota..."
                      className="w-full text-xs p-2 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5]"
                    />
                    <button
                      type="button"
                      onClick={handleAgregarNota}
                      className="w-full bg-[#52796F] text-white text-xs font-bold py-1.5 rounded-xl hover:bg-[#2D6A4F]"
                    >
                      Guardar Nota
                    </button>
                  </div>
                )}

                {activeSideTab === 'transcripcion' && (
                  <div className="bg-white p-3.5 rounded-2xl border border-[#C8D8CE] space-y-2">
                    <p className="text-[11px] font-bold text-[#2D6A4F]">Transcripción Activa:</p>
                    <div className="max-h-28 overflow-y-auto text-[10px] text-[#52796F] p-2 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE]">
                      {transcripcion}
                    </div>
                  </div>
                )}

              </div>

            </div>
          ) : (
            <div className="bg-[#FFF0F2] p-8 rounded-3xl border-2 border-[#FF8894] text-center space-y-4">
              <h4 className="text-lg font-bold text-[#D85260]">Videollamada Finalizada</h4>
              <button
                type="button"
                onClick={() => setEnLlamada(true)}
                className="bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-xs"
              >
                Reconectar Videollamada
              </button>
            </div>
          )}
        </section>

        {/* SECCIÓN 2: GESTOR DE ARCHIVOS SUBIDOS Y PREVISUALIZACIÓN */}
        <section className="bg-white p-8 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-6">
          <div className="flex justify-between items-center border-b border-[#E8F0EC] pb-4 flex-wrap gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
                Fichas y Documentación Encriptada
              </span>
              <h3 className="text-xl font-bold text-[#2D6A4F] mt-1">Archivos de la Consulta ({archivosList.length})</h3>
            </div>

            <label className="bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer transition shadow-xs">
              + Subir Nuevo Archivo
              <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" onChange={handleSubirArchivo} className="hidden" />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {archivosList.map((item) => (
              <div key={item.id} className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3 overflow-hidden">
                  <span className="text-xs font-bold bg-[#E8F0EC] text-[#2D6A4F] px-2.5 py-1 rounded-lg uppercase">
                    {item.tipo}
                  </span>
                  <div className="truncate">
                    <p className="text-xs font-bold text-[#2D6A4F] truncate">{item.nombre}</p>
                    <p className="text-[10px] text-[#84A59D]">Fecha: {item.fecha}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setArchivoPreview(item)}
                    className="text-xs font-bold bg-[#E8F0EC] hover:bg-[#52796F] hover:text-white text-[#2D6A4F] px-3 py-1.5 rounded-xl transition border border-[#C8D8CE]"
                  >
                    Ver
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEliminarArchivo(item.id)}
                    className="text-xs font-bold bg-[#FFF0F2] hover:bg-[#FF8894] text-[#D85260] hover:text-white px-3 py-1.5 rounded-xl transition border border-[#FF8894]"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {archivoPreview && (
            <div className="p-6 bg-[#FFF0F2] rounded-3xl border-2 border-[#F4ACB7] space-y-4">
              <div className="flex justify-between items-center border-b border-[#FF8894] pb-2">
                <h4 className="text-sm font-bold text-[#D85260]">Previsualización: {archivoPreview.nombre}</h4>
                <button
                  type="button"
                  onClick={() => setArchivoPreview(null)}
                  className="text-xs font-bold text-[#D85260] hover:underline"
                >
                  Cerrar Vista
                </button>
              </div>

              {archivoPreview.urlPreview ? (
                <div className="max-h-64 overflow-hidden rounded-2xl border border-[#FF8894] bg-white p-2 flex justify-center">
                  <img src={archivoPreview.urlPreview} alt="Preview" className="max-h-60 object-contain" />
                </div>
              ) : (
                <div className="p-8 bg-white rounded-2xl text-center space-y-2 border border-[#FF8894]">
                  <p className="text-xs font-bold text-[#2D6A4F]">Documento PDF Protegido bajo Ley N° 21.663</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* SECCIÓN 3: FORMULARIO DE AGENDAMIENTO B2B */}
        <section id="sec-agendar" className="bg-white p-8 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-6">
          <div className="border-b border-[#E8F0EC] pb-4">
            <h3 className="text-xl font-bold text-[#2D6A4F]">Agendamiento de Cita Virtual</h3>
            <p className="text-xs text-[#52796F]">Completa los datos para reservar tu atención en el portal.</p>
          </div>

          {bookingSuccess ? (
            <div className="p-8 bg-[#FFF0F2] rounded-3xl border border-[#FF8894] text-center space-y-4 max-w-2xl mx-auto">
              <h4 className="text-lg font-bold text-[#D85260]">Cita Agendada Exitosamente</h4>
              <p className="text-xs text-[#52796F]">
                Registrada para <strong className="text-[#2D6A4F]">{userName}</strong> ({userEmail}).<br/>
                Fecha: <strong className="text-[#2D6A4F]">{selectedDate}</strong> a las <strong className="text-[#2D6A4F]">{selectedTime}</strong>.
              </p>
              <button
                type="button"
                onClick={() => setBookingSuccess(false)}
                className="text-xs font-bold text-[#D85260] underline block mx-auto"
              >
                Agendar otra cita
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setBookingSuccess(true); }} className="space-y-6 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#2D6A4F] mb-2">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Ej: Maria Gonzalez"
                    className="w-full text-xs p-3.5 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D6A4F] mb-2">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="contacto@empresa.cl"
                    className="w-full text-xs p-3.5 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#2D6A4F] mb-2">Fecha Preferente *</label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full text-xs p-3.5 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D6A4F] mb-2">Horario *</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full text-xs p-3.5 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] font-bold text-[#2D6A4F]"
                  >
                    {horariosDisponibles.map((h: string) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold px-8 py-3.5 rounded-xl transition shadow-xs"
              >
                Confirmar Reserva de Cita
              </button>
            </form>
          )}
        </section>

      </main>

      {/* MODAL DE CANCELACIÓN */}
      {modalCancelar && (
        <div className="fixed inset-0 z-50 bg-[#2D6A4F]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl border-2 border-[#D85260] max-w-md w-full space-y-5 shadow-2xl">
            <h3 className="text-base font-bold text-[#D85260] text-center border-b border-[#FF8894] pb-2">
              Cancelar o Reagendar Reunión
            </h3>
            <p className="text-xs text-[#52796F] leading-relaxed">
              Ingresa el motivo de cancelación:
            </p>
            <textarea
              rows={3}
              value={motivoCancelacion}
              onChange={(e) => setMotivoCancelacion(e.target.value)}
              className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5]"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setModalCancelar(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3 rounded-xl"
              >
                Volver
              </button>
              <button
                type="button"
                onClick={handleCancelarReunion}
                className="flex-1 bg-[#D85260] hover:bg-red-700 text-white text-xs font-bold py-3 rounded-xl"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#52796F] text-white py-8 px-6 border-t-2 border-[#D4AF37] text-center text-xs space-y-2 mt-12">
        <p className="font-bold">ASL Ideas SpA — {portalData.nombre}</p>
        <p className="text-[11px] text-[#E8F0EC]">
          Protección de Datos Sensibles bajo Ley N° 21.663 e Inclusión TEA bajo Ley N° 21.545.
        </p>
      </footer>

    </div>
  );
}
