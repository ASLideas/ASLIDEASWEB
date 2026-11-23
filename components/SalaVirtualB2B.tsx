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
  const logoMostrar = appLogo || portalData?.logo || '/LOGO_asl.png';

  const queryParams = new URLSearchParams({
    app: nombreMostrar,
    logo: logoMostrar
  }).toString();

  return (
    <div className="w-full bg-[#F7FAF6] p-5 sm:p-6 rounded-2xl border-2 border-[#B8D6B2]/40 shadow-xl text-center space-y-4">
      <div className="flex items-center justify-center space-x-2">
        <img 
          src={logoMostrar} 
          alt="Logo App" 
          className="w-12 h-12 object-contain rounded-full border border-[#97A884]/40 bg-white p-0.5" 
        />
        <span className="bg-[#B8D6B2] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          SALA VIRTUAL B2B EN VIVO
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-black text-[#1F2937]">{nombreMostrar}</h3>
      <p className="text-xs sm:text-sm text-[#B8D6B2] max-w-lg mx-auto">
        Entorno interactivo con videollamada dual, agenda vinculada, Ficha Oficial, archivos cifrados e invitaciones B2B.
      </p>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link 
          href={`/sala-virtual?${queryParams}`}
          className="bg-[#B8D6B2] hover:bg-[#1F2937] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2"
        >
          <span>Ingresar a la Sala de {nombreMostrar}</span>
        </Link>
        {handleClose && (
          <button 
            type="button"
            onClick={handleClose} 
            className="bg-[#F7FAF6] border border-[#97A884] text-[#1F2937] font-bold text-xs px-4 py-3 rounded-xl hover:bg-[#E6E7D5] transition"
          >
            Cerrar Vista Previa
          </button>
        )}
      </div>
    </div>
  );
}
