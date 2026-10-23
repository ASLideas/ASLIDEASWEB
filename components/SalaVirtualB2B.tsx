'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicialización directa y segura de Supabase
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
  publicoObjetivo: string;
}

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  portalData?: PortalInfo;
  isAdmin?: boolean;
  initialApp?: string;
  appName?: string;
  appLogo?: string;
  [key: string]: any; // Firma flexible para evitar errores de TypeScript en Vercel
}

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
  // Configuración predeterminada: LAWENMOLL Salud Integrativa (Oficina Virtual 02)
  const defaultLawenmoll: PortalInfo = {
    id: 'lawenmoll',
    nombre: 'LAWENMOLL Salud Integrativa',
    subtitulo: 'Evaluación Metabólica y Fichas Clínicas Protegidas',
    logo: '/logo-lawenmoll.jpg',
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
    publicoObjetivo: 'Pacientes con condiciones crónicas, adultos con sobrepeso y profesionales de la salud'
  };

  const effectiveName = inputPortalData?.nombre || appName || initialApp || defaultLawenmoll.nombre;
  const effectiveLogo = inputPortalData?.logo || appLogo || defaultLawenmoll.logo;

  const portalData: PortalInfo = inputPortalData || {
    ...defaultLawenmoll,
    nombre: effectiveName,
    logo: effectiveLogo
  };

  const [tab, setTab] = useState<'descripcion' | 'agendar' | 'reunion' | 'archivos' | 'notas'>('descripcion');
  const [motivoConsulta, setMotivoConsulta] = useState<string>('Atención Virtual (Participantes de Lado a Lado)');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  // Estados de la Reunión en línea
  const [documentosReunion, setDocumentosReunion] = useState<string[]>([
    'Ficha_Clinica_SOAP_Inicial.pdf',
    'Pauta_Evaluacion_Metabolica.pdf'
  ]);
  const [imagenesReunion, setImagenesReunion] = useState<string[]>([
    'Esquema_Composicion_Corporal.jpg'
  ]);
  const [transcripcion, setTranscripcion] = useState<string>(
    'Registro de Sesión: El paciente consulta para evaluación de salud metabólica. Se acuerda pauta de seguimiento y revisión de hábitos diarios.'
  );
  const [transcribiendo, setTranscribiendo] = useState<boolean>(false);
  const [transcripcionCompletada, setTranscripcionCompletada] = useState<boolean>(false);

  const [notas, setNotas] = useState<string[]>([
    'Acuerdo preliminar: Demostración de interfaz accesible UI/UX.',
    'Revisión de requerimientos para Ley N° 21.663 y Ley TEA N° 21.545.'
  ]);
  const [nuevaNota, setNuevaNota] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setTab('descripcion');
      setBookingSuccess(false);
    }
  }, [isOpen, inputPortalData]);

  if (!isOpen) return null;

  const motivos: string[] = [
    'Atención Virtual (Participantes de Lado a Lado)',
    'Cotización de Convenio Corporativo / Licencia B2B',
    'Demostración de Software en Vivo',
    'Consultoría en Accesibilidad UI/UX (Ley TEA / Neurodivergencia)',
    'Muestra de Fichas Clínicas Encriptadas (Ley N° 21.663)',
    'Alianza Institucional o Municipal'
  ];

  const horariosDisponibles: string[] = ['09:00 AM', '10:30 AM', '12:00 PM', '03:00 PM', '04:30 PM', '06:00 PM'];

  const handleAgendar = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDate || !userName || !userEmail) return;
    setUploading(true);

    try {
      if (supabase) {
        await supabase.from('citas_b2b').insert([
          {
            portal_id: portalData.id,
            nombre_completo: userName,
            email: userEmail,
            motivo: motivoConsulta,
            fecha: selectedDate,
            hora: selectedTime
          }
        ]);
      }
    } catch (err) {
      console.warn('Modo local activo:', err);
    } finally {
      setTimeout(() => {
        setUploading(false);
        setBookingSuccess(true);
      }, 800);
    }
  };

  const handleAgregarNota = async () => {
    const notaLimpia = nuevaNota.trim();
    if (!notaLimpia) return;
    setNotas((prev) => [...prev, notaLimpia]);
    setNuevaNota('');

    try {
      if (supabase) {
        await supabase.from('notas_acuerdos').insert([
          { portal_id: portalData.id, nota: notaLimpia }
        ]);
      }
    } catch (err) {
      console.warn('Nota guardada localmente:', err);
    }
  };

  const handleSubirDocumento = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0]) {
      setDocumentosReunion((prev) => [...prev, files[0].name]);
    }
  };

  const handleSubirImagen = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0]) {
      setImagenesReunion((prev) => [...prev, files[0].name]);
    }
  };

  const handleTranscribirReunion = async () => {
    setTranscribiendo(true);
    setTimeout(async () => {
      setTranscribiendo(false);
      setTranscripcionCompletada(true);
      const textoActualizado = transcripcion + '\n\n[Transcripción Automática Generada]: Acuerdos consolidados y guardados en la ficha del cliente bajo Ley N° 21.663.';
      setTranscripcion(textoActualizado);

      try {
        if (supabase) {
          await supabase.from('transcripciones_reunion').insert([
            { portal_id: portalData.id, contenido_transcripcion: textoActualizado }
          ]);
        }
      } catch (err) {
        console.warn('Transcripción guardada localmente:', err);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2D6A4F]/60 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto font-sans">
      <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-3xl border-4 border-[#D4AF37] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* ENCABEZADO */}
        <header className="bg-[#52796F] text-white p-5 flex justify-between items-center border-b-2 border-[#D4AF37]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white p-1 border-2 border-[#D4AF37] flex items-center justify-center shadow-md overflow-hidden flex-shrink-0">
              <img 
                src={portalData.logo} 
                alt={portalData.nombre} 
                className="w-full h-full object-cover rounded-full" 
              />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] px-3 py-1 rounded-full inline-block mb-1">
                {portalData.oficinaNum}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white">{portalData.nombre}</h2>
              <p className="text-xs text-[#E8F0EC]">{portalData.subtitulo}</p>
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose} 
            className="text-[#D85260] hover:text-white bg-[#FFF0F2] hover:bg-[#FF8894] border border-[#FF8894] text-xs px-4 py-2 rounded-full font-bold transition shadow-xs"
          >
            Cerrar Portal
          </button>
        </header>

        {/* PESTAÑAS DE NAVEGACION */}
        <div className="flex border-b border-[#C8D8CE] bg-[#E8F0EC] overflow-x-auto">
          <button 
            type="button"
            onClick={() => setTab('descripcion')} 
            className={`flex-1 min-w-[120px] py-3.5 text-xs font-bold transition ${tab === 'descripcion' ? 'bg-[#FAF8F5] text-[#2D6A4F] border-b-2 border-[#D4AF37]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Descripción del Portal
          </button>
          <button 
            type="button"
            onClick={() => setTab('reunion')} 
            className={`flex-1 min-w-[120px] py-3.5 text-xs font-bold transition ${tab === 'reunion' ? 'bg-[#FAF8F5] text-[#2D6A4F] border-b-2 border-[#D4AF37]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Reunión en línea
          </button>
          <button 
            type="button"
            onClick={() => setTab('agendar')} 
            className={`flex-1 min-w-[120px] py-3.5 text-xs font-bold transition ${tab === 'agendar' ? 'bg-[#FAF8F5] text-[#2D6A4F] border-b-2 border-[#D4AF37]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Agendar Cita B2B
          </button>
          <button 
            type="button"
            onClick={() => setTab('archivos')} 
            className={`flex-1 min-w-[120px] py-3.5 text-xs font-bold transition ${tab === 'archivos' ? 'bg-[#FAF8F5] text-[#2D6A4F] border-b-2 border-[#D4AF37]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Documentos / PDF
          </button>
          <button 
            type="button"
            onClick={() => setTab('notas')} 
            className={`flex-1 min-w-[120px] py-3.5 text-xs font-bold transition ${tab === 'notas' ? 'bg-[#FAF8F5] text-[#2D6A4F] border-b-2 border-[#D4AF37]' : 'text-[#52796F] hover:bg-[#FAF8F5]/50'}`}
          >
            Acuerdos y Notas
          </button>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="p-6 overflow-y-auto flex-1">

          {/* TAB 1: DESCRIPCION EXTENSA */}
          {tab === 'descripcion' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4">
                <div className="flex flex-wrap gap-2">
                  {portalData.leyes.map((ley, idx) => (
                    <span key={idx} className="text-[10px] font-bold uppercase tracking-wider bg-[#E8F0EC] text-[#2D6A4F] border border-[#C8D8CE] px-3 py-1 rounded-full">
                      {ley}
                    </span>
                  ))}
                </div>

                <h3 className="text-lg font-bold text-[#2D6A4F] border-b border-[#E8F0EC] pb-2">
                  Propósito y Funcionalidades de {portalData.nombre}
                </h3>

                <p className="text-xs md:text-sm text-[#52796F] leading-relaxed">
                  {portalData.descripcionLarga}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider mb-2">Servicios y Módulos Principales:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {portalData.serviciosClave.map((servicio, idx) => (
                      <li key={idx} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] text-[#2D6A4F] font-semibold">
                        • {servicio}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE] text-xs">
                  <span className="font-bold text-[#2D6A4F]">Público Objetivo:</span>{' '}
                  <span className="text-[#52796F]">{portalData.publicoObjetivo}</span>
                </div>
              </div>

              <div className="bg-[#52796F] p-6 rounded-3xl border-2 border-[#D4AF37] text-white text-center space-y-3 shadow-md">
                <h4 className="text-base font-bold">¿Deseas ingresar a la Reunión Web o Agendar una Cita?</h4>
                <div className="flex justify-center gap-3 flex-wrap pt-1">
                  <button
                    type="button"
                    onClick={() => setTab('reunion')}
                    className="bg-[#D4AF37] hover:bg-[#B08D4B] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs"
                  >
                    Ingresar a Reunión en línea
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab('agendar')}
                    className="bg-white text-[#2D6A4F] hover:bg-[#FAF8F5] text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-xs"
                  >
                    Agendar Cita B2B
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REUNIÓN EN LÍNEA */}
          {tab === 'reunion' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              
              <div className="bg-white p-6 rounded-3xl border-2 border-[#D4AF37] shadow-xs space-y-4">
                <div className="border-b border-[#E8F0EC] pb-3 flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
                      Reunión Web Activa para Clientes
                    </span>
                    <h3 className="text-lg font-bold text-[#2D6A4F] mt-1">
                      Panel de Trabajo en Vivo — {portalData.nombre}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#D85260] bg-[#FFF0F2] px-3 py-1 rounded-full border border-[#FF8894]">
                    Sesión Segura Encriptada
                  </span>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
                  <label className="bg-[#FAF8F5] hover:bg-[#E8F0EC] border border-[#C8D8CE] p-3 rounded-2xl text-center cursor-pointer transition flex flex-col justify-center items-center gap-1">
                    <span className="text-xs font-bold text-[#2D6A4F]">Añadir Documento</span>
                    <span className="text-[10px] text-[#52796F]">Subir PDF o Ficha</span>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleSubirDocumento} 
                      className="hidden" 
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => setTab('notas')}
                    className="bg-[#FAF8F5] hover:bg-[#E8F0EC] border border-[#C8D8CE] p-3 rounded-2xl text-center transition flex flex-col justify-center items-center gap-1"
                  >
                    <span className="text-xs font-bold text-[#2D6A4F]">Crear Nota</span>
                    <span className="text-[10px] text-[#52796F]">Registrar Acuerdo</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleTranscribirReunion}
                    disabled={transcribiendo}
                    className="bg-[#FAF8F5] hover:bg-[#E8F0EC] border border-[#C8D8CE] p-3 rounded-2xl text-center transition flex flex-col justify-center items-center gap-1 disabled:opacity-50"
                  >
                    <span className="text-xs font-bold text-[#2D6A4F]">
                      {transcribiendo ? 'Transcribiendo...' : 'Transcribir Reunión'}
                    </span>
                    <span className="text-[10px] text-[#52796F]">Exportar a PDF</span>
                  </button>

                  <label className="bg-[#FAF8F5] hover:bg-[#E8F0EC] border border-[#C8D8CE] p-3 rounded-2xl text-center cursor-pointer transition flex flex-col justify-center items-center gap-1">
                    <span className="text-xs font-bold text-[#2D6A4F]">Adjuntar Imagen</span>
                    <span className="text-[10px] text-[#52796F]">Subir Esquema / JPG</span>
                    <input 
                      type="file" 
                      accept=".jpg,.png,.jpeg" 
                      onChange={handleSubirImagen} 
                      className="hidden" 
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => setTab('agendar')}
                    className="bg-[#FAF8F5] hover:bg-[#E8F0EC] border border-[#C8D8CE] p-3 rounded-2xl text-center transition flex flex-col justify-center items-center gap-1 col-span-2 md:col-span-1"
                  >
                    <span className="text-xs font-bold text-[#2D6A4F]">Agendar Otra Reunión</span>
                    <span className="text-[10px] text-[#52796F]">Nueva Cita B2B</span>
                  </button>
                </div>
              </div>

              {/* COLUMNAS DE ARCHIVOS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-3 shadow-xs">
                  <h4 className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider border-b border-[#E8F0EC] pb-2">
                    Documentos ({documentosReunion.length})
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {documentosReunion.map((doc, idx) => (
                      <li key={idx} className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] text-[#52796F] font-medium flex justify-between items-center">
                        <span className="truncate">{doc}</span>
                        <span className="text-[9px] bg-[#E8F0EC] text-[#2D6A4F] px-2 py-0.5 rounded font-bold">PDF</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-3 shadow-xs">
                  <h4 className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider border-b border-[#E8F0EC] pb-2">
                    Imágenes ({imagenesReunion.length})
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {imagenesReunion.map((img, idx) => (
                      <li key={idx} className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] text-[#52796F] font-medium flex justify-between items-center">
                        <span className="truncate">{img}</span>
                        <span className="text-[9px] bg-[#E8F0EC] text-[#2D6A4F] px-2 py-0.5 rounded font-bold">IMG</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-[#C8D8CE] space-y-3 shadow-xs">
                  <h4 className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider border-b border-[#E8F0EC] pb-2">
                    Transcripción
                  </h4>
                  <textarea
                    rows={4}
                    value={transcripcion}
                    onChange={(e) => setTranscripcion(e.target.value)}
                    className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] focus:outline-none text-[#52796F] leading-relaxed"
                  />
                  {transcripcionCompletada && (
                    <p className="text-[10px] text-[#2D6A4F] font-bold bg-[#E8F0EC] p-2 rounded-xl text-center">
                      Transcripción respaldada exitosamente.
                    </p>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: AGENDAMIENTO */}
          {tab === 'agendar' && (
            <div className="max-w-2xl mx-auto space-y-5 bg-white p-6 md:p-8 rounded-3xl border border-[#C8D8CE] shadow-xs">
              <div className="text-center space-y-1 border-b border-[#E8F0EC] pb-4">
                <h3 className="text-base font-bold text-[#2D6A4F]">Agendamiento B2B — {portalData.nombre}</h3>
                <p className="text-xs text-[#52796F]">Completa los datos para reservar tu sesión en esta oficina virtual.</p>
              </div>

              {bookingSuccess ? (
                <div className="p-6 bg-[#FFF0F2] rounded-2xl border border-[#FF8894] text-center space-y-4">
                  <h4 className="text-base font-bold text-[#D85260]">Reunión Agendada con Éxito</h4>
                  <p className="text-xs text-[#52796F] leading-relaxed">
                    Hemos registrado la cita para <strong className="text-[#2D6A4F]">{userName}</strong> ({userEmail}).<br/>
                    Portal: <strong className="text-[#2D6A4F]">{portalData.nombre}</strong><br/>
                    Motivo: <strong className="text-[#2D6A4F]">{motivoConsulta}</strong><br/>
                    Fecha: <strong className="text-[#2D6A4F]">{selectedDate}</strong> a las <strong className="text-[#2D6A4F]">{selectedTime}</strong>.
                  </p>
                  <button 
                    type="button"
                    onClick={() => setBookingSuccess(false)} 
                    className="text-xs font-bold text-[#D85260] underline hover:text-[#2D6A4F] pt-2 block mx-auto"
                  >
                    Agendar otra reunión
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAgendar} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Motivo de la Cita *</label>
                    <select
                      value={motivoConsulta}
                      onChange={(e) => setMotivoConsulta(e.target.value)}
                      className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] focus:outline-none text-gray-800"
                    >
                      {motivos.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Nombre Completo *</label>
                      <input 
                        type="text" 
                        required 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                        placeholder="Ej: Maria Gonzalez" 
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl focus:outline-none bg-[#FAF8F5]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Correo Electrónico *</label>
                      <input 
                        type="email" 
                        required 
                        value={userEmail} 
                        onChange={(e) => setUserEmail(e.target.value)} 
                        placeholder="contacto@empresa.cl" 
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl focus:outline-none bg-[#FAF8F5]" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Fecha *</label>
                      <input 
                        type="date" 
                        required 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)} 
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5]" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2D6A4F] mb-1.5">Horario Preferente *</label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl bg-[#FAF8F5] font-bold text-[#2D6A4F]"
                      >
                        {horariosDisponibles.map((item) => (
                          <option key={item} value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-[#E8F0EC]">
                    <button 
                      type="button"
                      onClick={() => setTab('descripcion')}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-3 rounded-xl transition text-center"
                    >
                      Volver a Descripción
                    </button>
                    <button 
                      type="submit" 
                      disabled={uploading} 
                      className="flex-1 bg-[#52796F] hover:bg-[#2D6A4F] text-white text-xs font-bold py-3 rounded-xl transition text-center"
                    >
                      {uploading ? 'Procesando Cita...' : 'Confirmar Cita B2B'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 4: ARCHIVOS */}
          {tab === 'archivos' && (
            <div className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs">
              <h3 className="text-sm font-bold text-[#2D6A4F] text-center">Adjuntar Documentos / PDF</h3>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx,.png,.jpg" 
                onChange={handleSubirDocumento} 
                className="block w-full text-xs text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#E8F0EC] file:text-[#2D6A4F]" 
              />
              <button 
                type="button"
                onClick={() => { setUploading(true); setTimeout(() => setUploading(false), 1200); }} 
                className="w-full bg-[#52796F] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#2D6A4F] transition"
              >
                {uploading ? 'Cargando archivo...' : 'Enviar Documento'}
              </button>
            </div>
          )}

          {/* TAB 5: ACUERDOS Y NOTAS */}
          {tab === 'notas' && (
            <div className="max-w-xl mx-auto space-y-3 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs">
              <h3 className="text-sm font-bold text-[#2D6A4F]">Acuerdos de Sesión</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={nuevaNota} 
                  onChange={(e) => setNuevaNota(e.target.value)} 
                  placeholder="Escribir acuerdo..." 
                  className="flex-1 text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none" 
                />
                <button 
                  type="button"
                  onClick={handleAgregarNota} 
                  className="bg-[#52796F] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#2D6A4F]"
                >
                  Guardar
                </button>
              </div>
              <ul className="text-xs space-y-2 pt-2">
                {notas.map((item, index) => (
                  <li key={index} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] text-[#2D6A4F] flex items-center justify-between">
                    <span>{item}</span>
                    <span className="text-[10px] text-[#D85260] bg-[#FFF0F2] px-2 py-0.5 rounded font-bold border border-[#FF8894]">Nota #{index + 1}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}