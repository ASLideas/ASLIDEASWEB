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
    <div className="w-full bg-[#1A2822] p-5 sm:p-6 rounded-2xl border-2 border-[#2D6A4F]/60 shadow-xl text-center space-y-4 text-white">
      <div className="flex items-center justify-center space-x-2">
        <img 
          src={logoMostrar} 
          alt="Logo App" 
          className="w-8 h-8 object-contain rounded-full border border-[#E8829C]/40 bg-white p-0.5" 
        />
        <span className="bg-[#E8829C] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          SALA VIRTUAL B2B EN VIVO
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-black text-white">{nombreMostrar}</h3>
      <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
        Entorno interactivo con videollamada, agenda vinculada, Misión y Visión, e invitaciones B2B.
      </p>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link 
          href={`/sala-virtual?${queryParams}`}
          className="bg-[#E8829C] hover:bg-[#D8708C] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2"
        >
          <span>Ingresar a la Sala de {nombreMostrar}</span>
        </Link>
        {handleClose && (
          <button 
            type="button"
            onClick={handleClose} 
            className="bg-[#121E19] border border-slate-700 text-slate-300 font-bold text-xs px-4 py-3 rounded-xl hover:bg-slate-800 transition"
          >
            Cerrar Vista Previa
          </button>
        )}
      </div>
    </div>
  );
}
