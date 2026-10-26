'use client';

import React, { useState, FormEvent } from 'react';

export default function BotonCancelarReunion() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedApp, setSelectedApp] = useState<string>('lawenmoll');
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEmail('');
    setCode('');
    setReason('');
    setIsSuccess(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-xs font-bold text-[#D85260] bg-[#FFF0F2] border border-[#FF8894] px-3.5 py-2 rounded-xl hover:bg-[#FFE5E8] transition shadow-sm cursor-pointer"
      >
        Cancelar o Reagendar Cita
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#FAF8F5] max-w-md w-full rounded-3xl p-6 border-2 border-[#C8D8CE] shadow-2xl space-y-4 text-left">
            <div className="flex justify-between items-center border-b border-[#C8D8CE] pb-3">
              <h3 className="text-base font-extrabold text-[#2D6A4F]">
                Cancelar o Reagendar Cita
              </h3>
              <button
                type="button"
                onClick={handleClose}
                className="text-xs font-bold text-[#52796F] hover:text-[#2D6A4F] px-2 py-1 rounded-lg cursor-pointer"
              >
                Cerrar [X]
              </button>
            </div>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#2D6A4F] mb-1 uppercase tracking-wider">
                    Selecciona la Aplicacion o Servicio
                  </label>
                  <select
                    value={selectedApp}
                    onChange={(e) => setSelectedApp(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-[#C8D8CE] rounded-xl font-sans text-[#2D6A4F] focus:border-[#2D6A4F] outline-none"
                  >
                    <option value="asl">1. Casa Matriz B2B (ASL Ideas SpA)</option>
                    <option value="lawenmoll">2. LAWENMOLL (Salud Integrativa)</option>
                    <option value="wellness">3. Wellness Web App (Movimiento Adaptado)</option>
                    <option value="bienestar">4. Sabiduria Ancestral (Bienestar &amp; Fitoterapia)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#2D6A4F] mb-1 uppercase tracking-wider">
                    Correo Electronico Registrado
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.cl"
                    className="w-full text-xs p-3 bg-white border border-[#C8D8CE] rounded-xl font-sans text-[#2D6A4F] focus:border-[#2D6A4F] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#2D6A4F] mb-1 uppercase tracking-wider">
                    Codigo de Reserva o RUT (Opcional)
                  </label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Ej: 12.345.678-9 o COD-2026"
                    className="w-full text-xs p-3 bg-white border border-[#C8D8CE] rounded-xl font-sans text-[#2D6A4F] focus:border-[#2D6A4F] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#2D6A4F] mb-1 uppercase tracking-wider">
                    Motivo o Comentario (Opcional)
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Indicanos la razon o tu disponibilidad de horario..."
                    rows={2}
                    className="w-full text-xs p-3 bg-white border border-[#C8D8CE] rounded-xl font-sans text-[#2D6A4F] focus:border-[#2D6A4F] outline-none resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-1/3 text-xs font-bold bg-[#EAE6DF] text-[#2D6A4F] py-3 rounded-xl hover:bg-[#DED9CF] transition cursor-pointer"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 text-xs font-bold bg-[#D85260] text-white py-3 rounded-xl hover:bg-[#B83E4B] transition shadow-md cursor-pointer"
                  >
                    Confirmar Solicitud
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 bg-[#E8F0EC] p-4 rounded-2xl border border-[#C8D8CE]">
                <p className="text-xs font-bold text-[#2D6A4F]">
                  Solicitud procesada exitosamente.
                </p>
                <p className="text-[11px] text-[#52796F] leading-relaxed">
                  Se ha registrado la anulacion para la aplicacion seleccionada. Si deseas coordinar una nueva atencion, escribe a <span className="font-bold">contacto@aslideas.cl</span>.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full text-xs font-bold bg-[#2D6A4F] text-white py-2.5 rounded-xl transition cursor-pointer"
                >
                  Cerrar Ventana
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
