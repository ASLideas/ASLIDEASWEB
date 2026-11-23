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
    app: nombreMostrar
  }).toString();

  return (
    <div className="w-full bg-white p-6 rounded-3xl border-2 border-[#B8D6B2] shadow-xl text-center space-y-4">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-10 h-10 rounded-xl bg-white border border-[#B8D6B2] p-0.5 flex items-center justify-center">
          <img 
            src={logoMostrar} 
            alt="Logo App" 
            className="w-full h-full object-contain" 
          />
        </div>
        <span className="bg-[#B8D6B2] text-[#1B4D3E] text-xs font-black px-3 py-1 rounded-full uppercase">
          SALA VIRTUAL B2B
        </span>
      </div>

      <h3 className="text-xl font-black text-[#1B4D3E]">{nombreMostrar}</h3>
      <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
        Entorno interactivo con videollamada, agendamiento de citas y Ficha Oficial de la aplicacion.
      </p>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link 
          href={`/sala-virtual?${queryParams}`}
          className="bg-[#1B4D3E] hover:bg-[#2A6653] text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition"
        >
          Ingresar a la Sala Virtual
        </Link>
        {handleClose && (
          <button 
            type="button"
            onClick={handleClose} 
            className="bg-[#FAF9F6] border border-[#B8D6B2] text-[#1B4D3E] font-bold text-xs px-4 py-3 rounded-xl hover:bg-[#E6E7D5] transition"
          >
            Cerrar Vista Previa
          </button>
        )}
      </div>
    </div>
  );
}
