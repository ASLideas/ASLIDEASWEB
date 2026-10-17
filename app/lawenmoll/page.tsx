'use client';

import React, { useState } from "react";
import Link from "next/link";

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
              <p className="text-xs text-[#E07A5F] font-semibold">Salud Integrativa & Fichas Clínicas Protegidas (Ley N° 21.663)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMeetingRoom(true)}
              className="bg-[#52796F] text-white text-xs px-4 py-2 rounded-xl font-semibold hover:bg-[#41675B] transition shadow-xs"
            >
              Sala Virtual
            </button>
            <Link href="/" className="text-xs text-[#52796F] hover:underline font-semibold">
              &larr; Volver a Portada ASL Ideas
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Principal con el texto dictado */}
      <section className="max-w-5xl mx-auto px-6 py-10 text-center space-y-5">
        <span className="bg-[#E8F0EC] border border-[#C8D8CE] text-[#52796F] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Vitrina Virtual de Salud Integrativa
        </span>

        <h2 className="text-2xl md:text-4xl font-extrabold text-[#2D5A4C] leading-snug">
          Existe más de una forma para el cuidado y la mejora de la calidad de vida
        </h2>

        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] shadow-xs text-left space-y-4 max-w-4xl mx-auto">
          <p className="text-sm md:text-base text-[#2D5A4C] leading-relaxed font-medium">
            LAWENMOLL es una <strong>vitrina virtual</strong> creada para dar a conocer a los usuarios y pacientes que existe otra forma para tratar enfermedades crónicas, autoinmunes y de salud mental, en la cual diversas disciplinas se complementan armónicamente con la medicina actual.
          </p>
          <p className="text-xs md:text-sm text-[#52796F] leading-relaxed">
            A su vez, busca otorgar mayor visibilidad a los profesionales que cumplen con esta labor, respondiendo al alto porcentaje de desafíos actuales en el área de la salud. La función de LAWENMOLL es dar a conocer a los <strong>especialistas, terapeutas, instituciones y locales alimenticios de bienestar y nutrición</strong> para brindar una mejor atención a través de los profesionales presentes en nuestra plataforma virtual.
          </p>
        </div>
      </section>

      {/* Las 3 Dimensiones del Cuidado */}
      <section className="max-w-5xl mx-auto px-6 py-4 w-full">
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-6">
          <h3 className="text-xl font-bold text-[#2D5A4C] text-center">Dimensiones Integrativas de LAWENMOLL</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#E8F0EC]/60 border border-[#C8D8CE] space-y-2">
              <span className="text-xs font-bold text-[#E07A5F] uppercase tracking-wider">Metabolismo</span>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Acompañamiento amable y nutrición consciente para abordar condiciones metabólicas y crónicas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#E8F0EC]/60 border border-[#C8D8CE] space-y-2">
              <span className="text-xs font-bold text-[#52796F] uppercase tracking-wider">Salud Mental</span>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Espacios adaptados para reducir el estrés, acoger la neurodivergencia y brindar contención emocional.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#E8F0EC]/60 border border-[#C8D8CE] space-y-2">
              <span className="text-xs font-bold text-[#2D5A4C] uppercase tracking-wider">Espiritual</span>
              <p className="text-xs text-[#52796F] leading-relaxed">
                Conexión holística con terapeutas, herbolaria nativa y tiendas de alimentos saludables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Boton de Sala Virtual */}
      <section className="max-w-5xl mx-auto px-6 py-8 w-full">
        <div className="bg-[#E8F0EC] border border-[#C8D8CE] p-8 rounded-3xl text-center space-y-4 shadow-xs">
          <h3 className="text-2xl font-bold text-[#2D5A4C]">Conecta con la Red de Profesionales en la Sala Virtual</h3>
          <p className="text-xs text-[#52796F] max-w-2xl mx-auto">
            Accede a nuestra vitrina y agenda tu atención directa con especialistas e instituciones validadas.
          </p>
          <button
            onClick={() => setShowMeetingRoom(true)}
            className="bg-[#52796F] text-white text-xs px-8 py-3.5 rounded-xl font-bold hover:bg-[#41675B] transition shadow-xs"
          >
            Ingresar a la Sala Virtual
          </button>
        </div>
      </section>

      {/* Modal de Agendamiento */}
      {showMeetingRoom && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full border border-[#C8D8CE] shadow-xl space-y-5">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#E07A5F] uppercase tracking-wider">LAWENMOLL Salud Integrativa</span>
                <h3 className="text-base font-bold text-[#2D5A4C]">Agendamiento en Vitrina Virtual</h3>
              </div>
              <button onClick={() => { setShowMeetingRoom(false); setAppointmentConfirmed(false); }} className="text-gray-400 hover:text-gray-600 font-bold text-sm">
                Cerrar
              </button>
            </div>

            {!appointmentConfirmed ? (
              <form onSubmit={handleBooking} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2D5A4C] mb-1">Especialidad o Comercio Requerido</label>
                  <select required className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#52796F]">
                    <option value="">Selecciona una opción</option>
                    <option value="medicina">Medicina Integrativa & Enfermedades Crónicas</option>
                    <option value="salud_mental">Salud Mental & Manejo del Estrés</option>
                    <option value="terapia">Terapeutas Holísticos & Fitoterapia Nativa</option>
                    <option value="nutricion">Locales de Nutrición & Alimentación Consciente</option>
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
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-sm font-bold">
                  OK
                </div>
                <h4 className="font-bold text-sm text-[#2D5A4C]">Cita Registrada Exitosamente</h4>
                <p className="text-xs text-[#52796F]">
                  Se ha enviado la notificación a <span className="font-mono font-bold">contacto@lawenmoll.cl</span> y el enlace para la Sala Virtual.
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

      {/* Pie de Pagina */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-[#52796F]">
        <p>&copy; {new Date().getFullYear()} LAWENMOLL - ASL Ideas SpA | Correo Oficial: contacto@lawenmoll.cl</p>
      </footer>
    </main>
  );
}
