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
    portalData 
  } = props || {};

  if (isOpen === false) return null;

  const handleClose = onClose || onCerrar;
  const nombreMostrar = initialApp || portalData?.nombre || portalNombre;

  return (
    <div className="w-full bg-[#FAF8F5] p-5 rounded-2xl border-2 border-[#52796F]/40 shadow-xl text-center space-y-3">
      <span className="bg-[#52796F] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase">
        ACCESO DIRECTO A SALA VIRTUAL EN VIVO
      </span>
      <h3 className="text-lg font-black text-[#676E5E]">{nombreMostrar}</h3>
      <p className="text-xs text-[#52796F] max-w-lg mx-auto">
        Transmisión en vivo con doble pantalla, archivos adjuntos cifrados y transcripción LSCh.
      </p>
      <div className="pt-2 flex justify-center gap-3">
        <Link 
          href="/sala-virtual" 
          className="bg-[#52796F] hover:bg-[#676E5E] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow transition"
        >
          Ingresar a la Sala Virtual (/sala-virtual)
        </Link>
        {handleClose && (
          <button 
            onClick={handleClose} 
            className="bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] font-bold text-xs px-4 py-2.5 rounded-xl"
          >
            Cerrar Vista Previa
          </button>
        )}
      </div>
    </div>
  );
}
