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
    <div className="w-full bg-[#1C2A3A] p-5 sm:p-6 rounded-2xl border-2 border-[#52796F] shadow-xl text-center space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <img 
          src={logoMostrar} 
          alt="Logo App" 
          className="w-10 h-10 object-contain rounded-xl border border-white/20 bg-white p-1 shadow" 
        />
        <span className="bg-[#52796F] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          SALA VIRTUAL B2B EN VIVO
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-black text-emerald-400">{nombreMostrar}</h3>
      <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto">
        Entorno interactivo con videollamada dual, agenda vinculada, Ficha Oficial, archivos cifrados e invitaciones B2B.
      </p>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link 
          href={`/sala-virtual?${queryParams}`}
          className="bg-[#52796F] hover:bg-[#676E5E] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105 block"
        >
          Ingresar a la Sala de {nombreMostrar}
        </Link>
        {handleClose && (
          <button 
            type="button"
            onClick={handleClose} 
            className="bg-[#0B132B] border border-slate-600 text-slate-300 font-bold text-xs px-4 py-3 rounded-xl hover:bg-slate-800 transition"
          >
            Cerrar Vista Previa
          </button>
        )}
      </div>
    </div>
  );
}
