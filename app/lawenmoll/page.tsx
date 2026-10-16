'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LawenmollApp() {
  const [showMeetingRoom, setShowMeetingRoom] = useState(false);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentConfirmed(true);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#2D5A4C] font-sans flex flex-col justify-between">
      {/* Encabezado LAWENMOLL */}
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#E07A5F] bg-white p-0.5">
              <img src="/lawenmoll_logo.jpg" alt="Logo LAWENMOLL" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#2D5A4C]">LAWENMOLL</h1>
              <p className="text-xs text-[#E07A5F] font-semibold">Salud Integrativa & Fichas Clínicas (Ley N° 21.663)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMeetingRoom(true)}
              className="bg-[#52796F] text-white text-xs px-4 py-2 rounded-xl font-semibold hover:bg-[#41675B] transition shadow-xs"
            >
              Probar Sala de Reunión
            </button>
            <Link href="/" className="text-xs text-[#52796F] hover:underline font-semibold">
              &larr; Volver a la Portada
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Presentación App */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center space-y-4">
        <span className="bg-[#E8F0EC] border border-[#C8D8CE] text-[#52796F] text-xs font-bold px-3.5 py-1.5 rounded-full">
          Portal de Diagnóstico Preventivo & Atención Clínica
        </span>
        <h2 className="text-3xl font-extrabold text-[#2D5A4C]">
          Un espacio amable diseñado para tu salud integrativa y bienestar continuo
        </h2>
        <p className="text-sm text-[#52796F] max-w-2xl mx-auto leading-relaxed">
          LAWENMOLL conecta la evaluación metabólica inteligente con la atención médica personalizada, garantizando baja sobrecarga sensorial y la máxima protección de tus datos de salud.
        </p>
      </section>

      {/* Bloque 1: Por qué se creó y Qué función cumple */}
      <section className="max-w-5xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8F0EC] flex items-center justify-center text-[#E07A5F] font-bold text-lg">
            ���
          </div>
          <h3 className="text-lg font-bold text-[#2D5A4C]">¿Por qué se creó esta aplicación?</h3>
          <p className="text-xs text-[#52796F] leading-relaxed">
            Surgió para eliminar la frustración y el estrés provocado por los sistemas de salud tradicionales. Ofrece una alternativa accesible con baja carga sensorial, diseñada especialmente para acompañar a personas con condiciones crónicas y neurodivergencias sin juicios punitivos.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8F0EC] flex items-center justify-center text-[#52796F] font-bold text-lg">
            ���
          </div>
          <h3 className="text-lg font-bold text-[#2D5A4C]">¿Qué función cumple?</h3>
          <ul className="text-xs text-[#52796F] space-y-2 list-disc list-inside">
            <td><strong>Test de Bienestar Inteligente:</strong> Evaluación metabólica y hábitos saludables.</td>
            <td><strong>Fichas Clínicas Encriptadas:</strong> Registro confidencial protegido bajo la Ley N° 21.663.</td>
            <td><strong>Conexión con Especialistas:</strong> Agendamiento directo con profesionales validados.</td>
          </ul>
        </div>
      </section>

      {/* Bloque 2: Probar la Sala de Reuniones */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="bg-[#E8F0EC]/60 border border-[#C8D8CE] p-8 rounded-2xl text-center space-y-4">
          <h3 className="text-xl font-bold text-[#2D5A4C]">Sala de Reuniones Virtual & Citas Médicas</h3>
          <p className="text-xs text-[#52796F] max-w-xl mx-auto">
            Coordina tus consultas integrativas en un entorno digital privado, seguro y acondicionado para baja fatiga cognitiva.
          </p>
          <button
            onClick={() => setShowMeetingRoom(true)}
            className="bg-[#52796F] text-white text-xs px-6 py-3 rounded-xl font-bold hover:bg-[#41675B] transition shadow-xs"
          >
            Probar Agendamiento en la Sala Virtual
          </button>
        </div>
      </section>

      {/* Modal Interactivo de Prueba de Sala de Reunión */}
      {showMeetingRoom && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full border border-[#C8D8CE] shadow-xl space-y-5">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#E07A5F] uppercase tracking-wider">Sala de Reunión Virtual</span>
                <h3 className="text-base font-bold text-[#2D5A4C]">Prueba de Agendamiento LAWENMOLL</h3>
              </div>
              <button onClick={() => { setShowMeetingRoom(false); setAppointmentConfirmed(false); }} className="text-gray-400 hover:text-gray-600 font-bold">
                ✕
              </button>
            </div>

            {!appointmentConfirmed ? (
              <form onSubmit={handleBooking} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2D5A4C] mb-1">Especialista Requerido</label>
                  <select required className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#52796F]">
                    <option value="">Selecciona Especialista</option>
                    <option value="medicina">Medicina Integrativa & Salud Metabólica</option>
                    <option value="terapia">Terapia Floral & Fitoterapia Nativa</option>
                    <option value="nutricion">Nutrición Amable sin Carga Sensorial</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#2D5A4C] mb-1">Fecha</label>
                    <input required type="date" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#52796F]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2D5A4C] mb-1">Horario</label>
                    <select required className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#52796F]">
                      <option value="10:00">10:00 AM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="17:30">05:30 PM</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowMeetingRoom(false)}
                    className="w-1/2 bg-gray-100 text-gray-700 py-2.5 rounded-xl text-xs font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-[#52796F] text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-[#41675B]"
                  >
                    Confirmar Cita
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-sm text-[#2D5A4C]">¡Cita de Prueba Agendada con Éxito!</h4>
                <p className="text-xs text-[#52796F]">
                  Se ha enviado la confirmación al correo <span className="font-mono font-bold">contacto@lawenmoll.cl</span> y el enlace para ingresar a la Sala de Reunión Virtual.
                </p>
                <button
                  onClick={() => { setShowMeetingRoom(false); setAppointmentConfirmed(false); }}
                  className="bg-[#52796F] text-white text-xs px-5 py-2 rounded-xl font-bold"
                >
                  Entendido
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pie de Página LAWENMOLL */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-[#52796F]">
        <p>&copy; {new Date().getFullYear()} LAWENMOLL - ASL Ideas SpA | Correo Oficial: contacto@lawenmoll.cl</p>
      </footer>
    </main>
  );
}
