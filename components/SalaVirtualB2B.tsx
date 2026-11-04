'use client';

import React from 'react';
import Link from 'next/link';

export interface SalaVirtualB2BProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCerrar?: () => void;
  portalNombre?: string;
  initialApp?: string;
  appLogo?: string;
  portalData?: any;
  initialMode?: string;
  [key: string]: any;
}

export default function SalaVirtualB2B(props: any) {
  const { isOpen, onClose, onCerrar, portalNombre = '1. Casa Matriz ASL Ideas SpA', initialApp, portalData } = props || {};
  if (isOpen === false) return null;

  const handleClose = onClose || onCerrar;
  const nombreMostrar = initialApp || portalData?.nombre || portalNombre;

  return (
    <div className="w-full bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border-2 border-[#52796F]/40 shadow-xl space-y-4 text-center">
      <div className="space-y-2">
        <span className="bg-[#52796F] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-block">
          ACCESO DIRECTO A SALA VIRTUAL EN VIVO
        </span>
        <h3 className="text-lg sm:text-xl font-black text-[#676E5E]">
          {nombreMostrar}
        </h3>
        <p className="text-xs sm:text-sm text-[#52796F] max-w-lg mx-auto">
          La sala de transmisiones en vivo con doble pantalla (principal + secundaria intercambiable), controles de audio dB y transcripción LSCh se encuentra lista en su propia ventana.
        </p>
      </div>

      <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/sala-virtual"
          className="bg-[#52796F] hover:bg-[#676E5E] text-white font-extrabold text-sm px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2"
        >
          <span>��� Ingresar a la Sala Virtual (/sala-virtual)</span>
        </Link>
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Cerrar vista previa de la sala virtual"
            className="bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] font-bold text-xs px-4 py-3 rounded-xl hover:bg-[#E6E7D5] transition"
          >
            Cerrar Vista Previa
          </button>
        )}
      </div>
    </div>
  );
}
