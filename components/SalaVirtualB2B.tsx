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
    <div className="w-full bg-white p-5 sm:p-6 rounded-3xl border-2 border-[#00796B]/30 shadow-xl text-center space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <img 
          src={logoMostrar} 
          alt="Logo App" 
          className="w-12 h-12 object-contain rounded-2xl border border-[#00796B]/30 bg-[#EBF5F4] p-1 flex-shrink-0" 
        />
        <span className="bg-[#00796B] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          SALA VIRTUAL B2B EN VIVO
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-black text-[#004D40]">{nombreMostrar}</h3>
      <p className="text-xs sm:text-sm text-[#00796B] max-w-lg mx-auto font-medium">
        Entorno interactivo accesible con videollamada, agendamiento B2B, transcripción de accesibilidad e invitaciones directas.
      </p>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link 
          href={`/sala-virtual?${queryParams}`}
          className="bg-[#00796B] hover:bg-[#004D40] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition flex items-center gap-2"
        >
          <span>Ingresar a la Sala de {nombreMostrar}</span>
        </Link>
        {handleClose && (
          <button 
            type="button"
            onClick={handleClose} 
            className="bg-white border-2 border-[#00796B]/30 text-[#004D40] font-bold text-xs px-4 py-3 rounded-xl hover:bg-[#EBF5F4] transition"
          >
            Cerrar Vista Previa
          </button>
        )}
      </div>
    </div>
  );
}
