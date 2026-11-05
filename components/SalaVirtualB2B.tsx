'use client';
import React from 'react';
import Link from 'next/link';

export default function SalaVirtualB2B(props: any) {
  const { isOpen, onClose, onCerrar, portalNombre = 'Casa Matriz ASL Ideas SpA', initialApp, appLogo, portalData } = props || {};
  if (isOpen === false) return null;

  const handleClose = onClose || onCerrar;
  const nombre = initialApp || portalData?.nombre || portalNombre;
  const logo = appLogo || portalData?.logo || '/LOGO_asl.png';
  const query = 'app=' + encodeURIComponent(nombre) + '&logo=' + encodeURIComponent(logo);

  return (
    <div className="w-full bg-[#FAF8F5] p-5 rounded-2xl border-2 border-[#52796F]/40 shadow-xl text-center space-y-3">
      <div className="flex items-center justify-center space-x-2">
        <img src={logo} alt="Logo App" className="w-7 h-7 object-contain rounded-full border bg-white p-0.5" />
        <span className="bg-[#52796F] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase">
          ACCESO A SALA VIRTUAL EN VIVO
        </span>
      </div>
      <h3 className="text-lg font-black text-[#676E5E]">{nombre}</h3>
      <p className="text-xs text-[#52796F] max-w-md mx-auto">
        Sala de videollamada vinculada con la agenda B2B, control de dB e invitaciones cifradas Ley N° 21.663.
      </p>
      <div className="pt-2 flex justify-center gap-3">
        <Link href={'/sala-virtual?' + query} className="bg-[#52796F] hover:bg-[#676E5E] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow transition">
          ��� Ingresar a la Sala de {nombre}
        </Link>
        {handleClose && (
          <button onClick={handleClose} className="bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] font-bold text-xs px-4 py-2.5 rounded-xl">
            Cerrar Vista Previa
          </button>
        )}
      </div>
    </div>
  );
}
