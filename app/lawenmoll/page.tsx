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
              <p className="text-xs text-[#E07A5F] font-semibold">{"Salud Integrativa & Fichas Cl\u00EDnicas (Ley N\u00B0 21.663)"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowMeetingRoom(true)}
              className="bg-[#52796F] text-white text-xs px-4 py-2 rounded-xl font-semibold hover:bg-[#41675B] transition shadow-xs"
            >
              {"Probar Sala de Reuni\u00F3n"}
            </button>
            <Link href="/" className="text-xs text-[#52796F] hover:underline font-semibold">
              {"\u2190 Volver a la Portada"}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Presentacion App */}
      <section className="max-w-4xl mx-auto px-6 py-12 text-center space-y-4">
        <span className="bg-[#E8F0EC] border border-[#C8D8CE] text-[#52796F] text-xs font-bold px-3.5 py-1.5 rounded-full">
          {"Portal de Diagn\u00F3stico Preventivo & Atenci\u00F3n Cl\u00EDnica"}
        </span>
        <h2 className="text-3xl font-extrabold text-[#2D5A4C]">
          {"Un espacio amable dise\u00F1ado para tu salud integrativa y bienestar continuo"}
        </h2>
        <p className="text-sm text-[#52796F] max-w-2xl mx-auto leading-relaxed">
          {"LAWENMOLL conecta la evaluaci\u00F3n metab\u00F3lica inteligente con la atenci\u00F3n m\u00E9dica personalizada, garantizando baja sobrecarga sensorial y la m\u00E1xima protecci\u00F3n de tus datos de salud."}
        </p>
      </section>

      {/* Bloque 1: Por que se creo y Que funcion cumple */}
      <section className="max-w-5xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8F0EC] flex items-center justify-center text-[#E07A5F] font-bold text-lg">
            í¼±
          </div>
          <h3 className="text-lg font-bold text-[#2D5A4C]">{"\u00BFPor qu\u00E9 se cre\u00F3 esta aplicaci\u00F3n?"}</h3>
          <p className="text-xs text-[#52796F] leading-relaxed">
            {"Surgi\u00F3 para eliminar la frustraci\u00F3n y el estr\u00E9s provocado por los sistemas de salud tradicionales. Ofrece una alternativa accesible con baja carga sensorial, dise\u00F1ada especialmente para acompa\u00F1ar a personas con condiciones cr\u00F3nicas y neurodivergencias sin juicios punitivos."}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#E8F0EC] flex items-center justify-center text-[#52796F] font-bold text-lg">
            í¹º
          </div>
          <h3 className="text-lg font-bold text-[#2D5A4C]">{"\u00BFQu\u00E9 funci\u00F3n cumple?"}</h3>
          <div className="text-xs text-[#52796F] space-y-2">
            <p><strong>{"\u25CF Test de Bienestar Inteligente: "}</strong>{"Evaluaci\u00F3n metab\u00F3lica y h\u00E1bitos saludables."}</p>
            <p><strong>{"\u25CF Fichas Cl\u00EDnicas Encriptadas: "}</strong>{"Registro confidencial protegido bajo la Ley N\u00B0 21.663."}</p>
            <p><strong>{"\u25CF Conexi\u00F3n con Especialistas: "}</strong>{"Agendamiento directo con profesionales validados."}</p>
          </div>
        </div>
      </section>

      {/* Bloque 2: Probar la Sala de Reuniones */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="bg-[#E8F0EC]/60 border border-[#C8D8CE] p-8 rounded-2xl text-center space-y-4">
          <h3 className="text-xl font-bold text-[#2D5A4C]">{"Sala de Reuniones Virtual & Citas M\u00E9dicas"}</h3>
          <p className="text-xs text-[#52796F] max-w-xl mx-auto">
            {"Coordina tus consultas integrativas en un entorno digital privado, seguro y acondicionado para baja fatiga cognitiva."}
          </p>
          <button
            onClick={() => setShowMeetingRoom(true)}
            className="bg-[#52796F] text-white text-xs px-6 py-3 rounded-xl font-bold hover:bg-[#41675B] transition shadow-xs"
          >
            {"Probar Agendamiento en la Sala Virtual"}
          </button>
        </div>
      </section>

      {/* Modal Interactivo */}
      {showMeetingRoom && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-lg w-full border border-[#C8D8CE] shadow-xl space-y-5">
            <div className="flex justify-between items-start border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#E07A5F] uppercase tracking-wider">{"Sala de Reuni\u00F3n Virtual"}</span>
                <h3 className="text-base font-bold text-[#2D5A4C]">{"Prueba de Agendamiento LAWENMOLL"}</h3>
              </div>
              <button onClick={() => { setShowMeetingRoom(false); setAppointmentConfirmed(false); }} className="text-gray-400 hover:text-gray-600 font-bold">
                {"\u2715"}
              </button>
            </div>

            {!appointmentConfirmed ? (
              <form onSubmit={handleBooking} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#2D5A4C] mb-1">{"Especialista Requerido"}</label>
                  <select required className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#52796F]">
                    <option value="">{"Selecciona Especialista"}</option>
                    <option value="medicina">{"Medicina Integrativa & Salud Metab\u00F3lica"}</option>
                    <option value="terapia">{"Terapia Floral & Fitoterapia Nativa"}</option>
                    <option value="nutricion">{"Nutrici\u00F3n Amable sin Carga Sensorial"}</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#2D5A4C] mb-1">{"Fecha"}</label>
                    <input required type="date" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#52796F]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2D5A4C] mb-1">{"Horario"}</label>
                    <select required className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#52796F]">
                      <option value="10:00">{"10:00 AM"}</option>
                      <option value="15:00">{"03:00 PM"}</option>
                      <option value="17:30">{"05:30 PM"}</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowMeetingRoom(false)}
                    className="w-1/2 bg-gray-100 text-gray-700 py-2.5 rounded-xl text-xs font-semibold"
                  >
                    {"Cancelar"}
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 bg-[#52796F] text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-[#41675B]"
                  >
                    {"Confirmar Cita"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  {"\u2713"}
                </div>
                <h4 className="font-bold text-sm text-[#2D5A4C]">{"\u00A1Cita de Prueba Agendada con \u00C9xito!"}</h4>
                <p className="text-xs text-[#52796F]">
                  {"Se ha enviado la confirmaci\u00F3n al correo "}
                  <span className="font-mono font-bold">{"contacto@lawenmoll.cl"}</span>
                  {" y el enlace para ingresar a la Sala de Reuni\u00F3n Virtual."}
                </p>
                <button
                  onClick={() => { setShowMeetingRoom(false); setAppointmentConfirmed(false); }}
                  className="bg-[#52796F] text-white text-xs px-5 py-2 rounded-xl font-bold"
                >
                  {"Entendido"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pie de Pagina LAWENMOLL */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-[#52796F]">
        <p>{"\u00A9 "}{new Date().getFullYear()}{" LAWENMOLL - ASL Ideas SpA | Correo Oficial: contacto@lawenmoll.cl"}</p>
      </footer>
    </main>
  );
}
