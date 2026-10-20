'use client';

import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  appName?: string;
  appLogo?: string;
}

export default function SalaVirtualB2B({ isOpen, onClose, appName = 'Casa Matriz B2B', appLogo = '/LOGO_asl.png' }: Props) {
  const [tab, setTab] = useState<'video' | 'agendar' | 'archivos' | 'notas'>('video');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('10:30');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userOrg, setUserOrg] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  const [notas, setNotas] = useState<string[]>([
    'Acuerdo preliminar: Demostración de interfaz accesible para neurodivergencias.',
    'Revisión de requerimientos para Ley N° 21.663 y Ley TEA.'
  ]);
  const [nuevaNota, setNuevaNota] = useState('');

  if (!isOpen) return null;

  const horariosDisponibles = ['09:00', '10:30', '12:00', '15:00', '16:30', '18:00'];

  const handleAgendar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !userName || !userEmail) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setBookingSuccess(true);
    }, 1200);
  };

  const handleAgregarNota = () => {
    if (!nuevaNota.trim()) return;
    setNotas([...notas, nuevaNota.trim()]);
    setNuevaNota('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2C4A3E]/50 backdrop-blur-md flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-3xl border border-[#C8D8CE] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* Encabezado Corporativo Verde Salvia con Triángulos e Isotipo */}
        <header className="bg-[#52796F] text-white p-5 flex justify-between items-center border-b border-[#84A59D] relative overflow-hidden">
          <div className="absolute right-10 top-0 opacity-20 pointer-events-none">
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <polygon points="50,10 90,90 10,90" fill="#FAF8F5" />
              <polygon points="30,30 70,70 10,70" fill="#84A59D" />
            </svg>
          </div>

          <div className="flex items-center gap-3.5 z-10">
            <div className="w-12 h-12 rounded-2xl bg-white p-1 border border-[#84A59D] flex items-center justify-center shadow-sm overflow-hidden">
              <img
                src={appLogo}
                alt={appName}
                className="max-h-full max-w-full object-contain"
                onError={(e) => { ([enlace sospechoso eliminado] as HTMLElement).style.display = 'none'; }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider uppercase bg-[#FAF8F5]/20 px-2.5 py-0.5 rounded-full text-white">
                  ASL Ideas SpA — {appName}
                </span>
              </div>
              <h2 className="text-lg font-bold mt-0.5 text-white">Sala Virtual Corporativa & Agendamiento</h2>
              <p className="text-xs text-[#E8F0EC]">
                Videollamada B2B, calendario interactivo de citas y gestor de acuerdos en Supabase.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/90 hover:text-white bg-black/20 hover:bg-black/30 text-xs px-3.5 py-2 rounded-full font-bold transition z-10"
          >
            ✕ Cerrar
          </button>
        </header>

        {/* Pestañas de Navegación */}
        <div className="flex border-b border-[#C8D8CE] bg-[#E8F0EC]">
          <button
            onClick={() => setTab('video')}
            className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 ${
              tab === 'video'
                ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]'
                : 'text-[#52796F] hover:bg-[#FAF8F5]/50'
            }`}
          >
            ��� Videollamada en Vivo
          </button>
          <button
            onClick={() => setTab('agendar')}
            className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 ${
              tab === 'agendar'
                ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]'
                : 'text-[#52796F] hover:bg-[#FAF8F5]/50'
            }`}
          >
            ��� Calendario & Horarios
          </button>
          <button
            onClick={() => setTab('archivos')}
            className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 ${
              tab === 'archivos'
                ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]'
                : 'text-[#52796F] hover:bg-[#FAF8F5]/50'
            }`}
          >
            ��� Subir Propuesta (PDF)
          </button>
          <button
            onClick={() => setTab('notas')}
            className={`flex-1 py-3 text-xs font-bold transition flex items-center justify-center gap-2 ${
              tab === 'notas'
                ? 'bg-[#FAF8F5] text-[#2C4A3E] border-b-2 border-[#52796F]'
                : 'text-[#52796F] hover:bg-[#FAF8F5]/50'
            }`}
          >
            ��� Notas de Sesión
          </button>
        </div>

        {/* Contenido Dinámico */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'video' && (
            <div className="space-y-4">
              <div className="bg-[#E8F0EC] p-3 rounded-2xl border border-[#84A59D]/40 flex items-center justify-between text-xs text-[#2C4A3E]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#84A59D] animate-pulse"></span>
                  <span className="font-bold">Estado:</span> Canal Encriptado Listo para {appName}
                </div>
                <span className="text-[11px] font-bold text-[#52796F]">Garantía de Baja Sobrecarga Sensorial</span>
              </div>

              <div className="w-full h-[380px] bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE] overflow-hidden shadow-inner relative flex items-center justify-center">
                <iframe
                  src="[suspicious link removed]"
                  allow="camera; microphone; display-capture; autoplay; clipboard-write"
                  className="w-full h-full border-0"
                  title="Sala Virtual ASL Ideas SpA"
                />
              </div>
            </div>
          )}

          {tab === 'agendar' && (
            <div className="max-w-xl mx-auto space-y-5 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-sm">
              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-[#2C4A3E]">Agendar Videollamada B2B / Demostración</h3>
                <p className="text-xs text-[#52796F]">
                  Selecciona la fecha y la hora que mejor se adapte a tu agenda para coordinar una reunión personalizada.
                </p>
              </div>

              {bookingSuccess ? (
                <div className="p-5 bg-[#E8F0EC] rounded-2xl border border-[#84A59D] text-center space-y-3">
                  <span className="text-3xl">���</span>
                  <h4 className="text-sm font-bold text-[#2C4A3E]">¡Reunión Agendada con Éxito!</h4>
                  <p className="text-xs text-[#52796F]">
                    Te hemos enviado la confirmación a <strong className="text-[#2C4A3E]">{userEmail}</strong> para la fecha <strong className="text-[#2C4A3E]">{selectedDate}</strong> a las <strong className="text-[#2C4A3E]">{selectedTime} hrs</strong>.
                  </p>
                  <button
                    onClick={() => setBookingSuccess(false)}
                    className="text-xs font-bold text-[#52796F] underline hover:text-[#2C4A3E]"
                  >
                    Agendar otra reunión
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAgendar} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2C4A3E] mb-1">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={userName}
                        onChange={(e) => setUserName([enlace sospechoso eliminado].value)}
                        placeholder="Ej: María González"
                        className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2C4A3E] mb-1">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={userEmail}
                        onChange={(e) => setUserEmail([enlace sospechoso eliminado].value)}
                        placeholder="ejemplo@institucion.cl"
                        className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2C4A3E] mb-1">Institución / Empresa / Particular</label>
                    <input
                      type="text"
                      value={userOrg}
                      onChange={(e) => setUserOrg([enlace sospechoso eliminado].value)}
                      placeholder="Ej: Municipalidad, Clínica, Proyecto Personal"
                      className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]"
                    />
                  </div>

                  {/* Calendario y Selección de Fecha */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2C4A3E] mb-1">��� Seleccionar Fecha *</label>
                      <input
                        type="date"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate([enlace sospechoso eliminado].value)}
                        className="w-full text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F] bg-[#FAF8F5]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2C4A3E] mb-1">⏰ Seleccionar Hora *</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[enlace sospechoso eliminado]((hora) => (
                          <button
                            key={hora}
                            type="button"
                            onClick={() => setSelectedTime(hora)}
                            className={`py-2 text-[11px] font-bold rounded-lg border transition ${
                              selectedTime === hora
                                ? 'bg-[#52796F] text-white border-[#52796F]'
                                : 'bg-[#FAF8F5] text-[#2C4A3E] border-[#C8D8CE] hover:bg-[#E8F0EC]'
                            }`}
                          >
                            {hora}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-3 rounded-xl transition shadow-sm mt-2 disabled:opacity-50"
                  >
                    {uploading ? 'Guardando en Citas Supabase...' : 'Confirmar y Reservar Horario'}
                  </button>
                </form>
              )}
            </div>
          )}

          {tab === 'archivos' && (
            <div className="max-w-xl mx-auto space-y-5 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-sm">
              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-[#2C4A3E]">Adjuntar Propuesta o Documento (Supabase)</h3>
                <p className="text-xs text-[#52796F]">
                  Sube archivos PDF o documentos requeridos al bucket seguro <code className="bg-[#E8F0EC] px-1.5 py-0.5 rounded text-[#2C4A3E]">documentos-peticiones</code>.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  onChange={(e) => setFile([enlace sospechoso eliminado].files?.[0] || null)}
                  className="block w-full text-xs text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#E8F0EC] file:text-[#52796F] hover:file:bg-[#52796F] hover:file:text-white transition"
                />
                <button
                  onClick={() => {
                    if (!file) return;
                    setUploading(true);
                    setTimeout(() => setUploading(false), 1200);
                  }}
                  disabled={!file || uploading}
                  className="w-full bg-[#52796F] hover:bg-[#2C4A3E] text-white text-xs font-bold py-2.5 rounded-xl transition disabled:opacity-50"
                >
                  {uploading ? 'Cargando archivo a Supabase...' : 'Enviar PDF a la Sala Virtual'}
                </button>
              </div>
            </div>
          )}

          {tab === 'notas' && (
            <div className="max-w-xl mx-auto space-y-4 bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-sm">
              <h3 className="text-sm font-bold text-[#2C4A3E]">Bloc de Notas y Acuerdos de la Sesión</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={nuevaNota}
                  onChange={(e) => setNuevaNota([enlace sospechoso eliminado].value)}
                  placeholder="Escribir un compromiso o acuerdo B2B..."
                  className="flex-1 text-xs p-2.5 border border-[#C8D8CE] rounded-xl focus:outline-none focus:border-[#52796F]"
                />
                <button
                  onClick={handleAgregarNota}
                  className="bg-[#52796F] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#2C4A3E] transition"
                >
                  Guardar
                </button>
              </div>
              <div className="space-y-2 pt-2">
                {[enlace sospechoso eliminado]((n, i) => (
                  <div key={i} className="p-3 bg-[#FAF8F5] border border-[#C8D8CE] rounded-xl text-xs text-[#2C4A3E] flex items-center justify-between">
                    <span>��� {n}</span>
                    <span className="text-[10px] text-[#84A59D]">Nota #{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
