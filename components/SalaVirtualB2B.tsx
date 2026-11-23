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
    <div className="w-full bg-white p-5 sm:p-6 rounded-2xl border-2 border-[#4DB6AC]/40 shadow-lg text-center space-y-4">
      <div className="flex items-center justify-center space-x-2">
        <img 
          src={logoMostrar} 
          alt="Logo App" 
          className="w-8 h-8 object-contain rounded-full border border-[#B2DFDB] bg-white p-0.5" 
        />
        <span className="bg-[#00796B] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          SALA VIRTUAL B2B EN VIVO
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-black text-[#004D40]">{nombreMostrar}</h3>
      <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto font-medium">
        Entorno interactivo con videollamada, agenda vinculada, Ficha Oficial, archivos cifrados e invitaciones B2B.
      </p>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link 
          href={`/sala-virtual?${queryParams}`}
          className="bg-[#00796B] hover:bg-[#004D40] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition transform hover:scale-105 flex items-center gap-2"
        >
          <span>Ingresar a la Sala de {nombreMostrar}</span>
        </Link>
        {handleClose && (
          <button 
            type="button"
            onClick={handleClose} 
            className="bg-[#F4FAF9] border border-[#B2DFDB] text-[#004D40] font-bold text-xs px-4 py-3 rounded-xl hover:bg-[#E0F2F1] transition"
          >
            Cerrar Vista Previa
          </button>
        )}
      </div>
    </div>
  );
}
