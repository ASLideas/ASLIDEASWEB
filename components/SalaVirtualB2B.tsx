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
    <div className="w-full bg-[#FFF7E6] p-5 sm:p-6 rounded-2xl border-2 border-[#A8B58A]/50 shadow-xl text-center space-y-4 text-[#2D3A47]">
      <div className="flex items-center justify-center space-x-2">
        <img 
          src={logoMostrar} 
          alt="Logo App" 
          className="w-8 h-8 object-contain rounded-full border border-[#F7C8D3] bg-white p-0.5" 
        />
        <span className="bg-[#B46A72] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          SALA VIRTUAL B2B EN VIVO
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-black text-[#2D3A47]">{nombreMostrar}</h3>
      <p className="text-xs sm:text-sm text-[#2D3A47]/80 max-w-lg mx-auto">
        Entorno interactivo con videollamada, agenda vinculada, Misión y Visión, e invitaciones B2B.
      </p>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link 
          href={`/sala-virtual?${queryParams}`}
          className="bg-[#B46A72] hover:bg-[#9E575F] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2"
        >
          <span>Ingresar a la Sala de {nombreMostrar}</span>
        </Link>
        {handleClose && (
          <button 
            type="button"
            onClick={handleClose} 
            className="bg-white border border-[#A8B58A] text-[#2D3A47] font-bold text-xs px-4 py-3 rounded-xl hover:bg-[#F7C8D3]/20 transition"
          >
            Cerrar Vista Previa
          </button>
        )}
      </div>
    </div>
  );
}
