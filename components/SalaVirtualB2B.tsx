'use client';

import React from 'react';

// Declaración completa de propiedades para TypeScript
export interface SalaVirtualB2BProps {
  isOpen: boolean;
  onClose: () => void;
  initialApp?: string;
  appLogo?: string;
}

export function SalaVirtualB2B({
  isOpen,
  onClose,
  initialApp = 'ASL Ideas SpA',
  appLogo = '/logo-asl.png.png',
}: SalaVirtualB2BProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#2D362D] text-white w-full max-w-4xl rounded-3xl border-2 border-[#97A884] p-6 shadow-2xl relative space-y-4">
        
        {/* Cabecera del Modal */}
        <div className="flex justify-between items-center border-b border-white/20 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl border border-[#97A884] p-1 flex items-center justify-center">
              <img src={appLogo} alt={initialApp} className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-2.5 py-0.5 rounded-full border border-[#97A884]">
                Demostración B2B • {initialApp}
              </span>
              <h2 className="text-lg font-black text-white mt-0.5">
                Sala Virtual de Presentación Comercial
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-3 py-1.5 rounded-xl border border-white/20 text-xs transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>

        {/* Área Principal de Video / Demostración */}
        <div className="bg-slate-900 rounded-2xl p-6 border border-[#97A884] min-h-[300px] flex flex-col justify-center items-center text-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-[#52584B] border-2 border-[#CDD6A9] flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-[#CDD6A9]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <h3 className="font-bold text-sm text-white">
            Sesión de Demostración Activa — {initialApp}
          </h3>
          <p className="text-xs text-slate-300 max-w-md">
            Espacio de video reunión interactiva B2B con cifrado de conexión Ley N° 21.663 y estándares de accesibilidad cognitiva.
          </p>
        </div>

        {/* Pie de Página del Modal */}
        <div className="flex justify-between items-center text-xs text-slate-300 pt-2 border-t border-white/10">
          <span>Estado: Listo para conectar</span>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#CDD6A9] text-[#676E5E] font-extrabold px-4 py-2 rounded-xl border border-[#97A884] cursor-pointer"
          >
            Aceptar
          </button>
        </div>

      </div>
    </div>
  );
}

export default SalaVirtualB2B;