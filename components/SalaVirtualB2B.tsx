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
  [key: string]: any;
}

export default function SalaVirtualB2B(props: SalaVirtualB2BProps) {
  const { 
    isOpen, 
    onClose, 
    onCerrar, 
    portalNombre = 'Casa Matriz ASL Ideas SpA', 
    initialApp, 
    appLogo,
    portalData 
  } = props || {};

  if (isOpen === false) return null;

  const handleClose = onClose || onCerrar;
  const nombreMostrar = initialApp || portalData?.nombre || portalNombre;
  const logoMostrar = appLogo || portalData?.logo || '/logo-asl.png.png';

  const queryParams = new URLSearchParams({
    app: nombreMostrar,
    logo: logoMostrar
  }).toString();

  return (
    <div className="w-full bg-white p-5 sm:p-6 rounded-3xl border-2 border-[#2D6A4F]/30 shadow-md text-center space-y-4 font-sans">
      <div className="flex items-center justify-center gap-3">
        <img 
          src={logoMostrar} 
          alt="Logo App" 
          className="w-10 h-10 object-contain rounded-xl border border-[#2D6A4F]/25 bg-white p-0.5" 
        />
        <span className="bg-[#1B4D3E] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
          Sala Virtual B2B en Vivo
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-black text-[#1B4D3E]">{nombreMostrar}</h3>
      <p className="text-xs sm:text-sm text-[#2C3E35] max-w-lg mx-auto">
        Entorno interactivo con videollamada, agendamiento vinculado, Misión y Visión, e invitaciones B2B sin sobrecarga sensorial.
      </p>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link 
          href={`/sala-virtual?${queryParams}`}
          className="bg-[#2D6A4F] hover:bg-[#1B4D3E] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-sm transition"
        >
          Ingresar a la Sala de {nombreMostrar}
        </Link>
        {handleClose && (
          <button 
            type="button"
            onClick={handleClose} 
            className="bg-[#F5F7F4] border border-[#2D6A4F]/30 text-[#1B4D3E] font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-[#EEF4F1] transition"
          >
            Cerrar Vista Previa
          </button>
        )}
      </div>
    </div>
  );
}
