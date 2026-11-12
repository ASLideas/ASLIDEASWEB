'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const Icons = {
  ChevronDown: () => (
    <svg className="w-4 h-4 ml-1.5 inline-block transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  ),
  LinkedIn: () => (
    <svg className="w-4 h-4 mr-2.5 text-current fill-current" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  ),
  Instagram: () => (
    <svg className="w-4 h-4 mr-2.5 text-current fill-none stroke-currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  TikTok: () => (
    <svg className="w-4 h-4 mr-2.5 text-current fill-current" viewBox="0 0 24 24">
      <path d="M12.525 9.007a4.657 4.657 0 0 1-1.332-.191v5.992a4.922 4.922 0 1 1-4.922-4.921c.214 0 .426.016.634.047V12.6a2.38 2.38 0 1 0 1.748 2.31V2.6h2.54a4.935 4.935 0 0 0 4.19 4.19v2.549a7.487 7.487 0 0 1-2.858-.332z" />
    </svg>
  ),
  YouTube: () => (
    <svg className="w-4 h-4 mr-2.5 text-current fill-current" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  Facebook: () => (
    <svg className="w-4 h-4 mr-2.5 text-current fill-current" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  Phone: () => (
    <svg className="w-4 h-4 mr-2.5 text-current fill-none stroke-currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  WhatsApp: () => (
    <svg className="w-4 h-4 mr-2.5 text-current fill-current" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  ),
  Telegram: () => (
    <svg className="w-4 h-4 mr-2.5 text-current fill-current" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.411-.169.563-.497.751-.817.771-.696.044-1.225-.421-1.901-.864-1.057-.692-1.654-1.123-2.679-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.141.119.098.152.228.166.331.016.115.034.368.019.57z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-4 h-4 mr-2.5 text-current fill-none stroke-currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
};

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (menuName: string) => {
    setOpenDropdown(prev => (prev === menuName ? null : menuName));
  };

  return (
    <header ref={headerRef} className="w-full bg-[#FAF8F5] border-b border-[#E5E0D8] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex flex-col group">
            <span className="text-xl font-bold text-[#2D3748] tracking-tight group-hover:text-[#52796F] transition-colors">
              ASL Ideas SpA
            </span>
            <span className="text-xs text-[#52796F] font-medium leading-tight max-w-sm">
              Desarrollo y soluciones para pymes y asociados, diseño de vitrinas virtuales
            </span>
          </Link>
        </div>

        <nav className="flex items-center space-x-2 sm:space-x-4">
          
          <div className="relative">
            <button
              onClick={() => toggleDropdown('salas')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center ${
                openDropdown === 'salas'
                  ? 'bg-[#52796F] text-white shadow-sm'
                  : 'text-[#2D3748] hover:bg-[#EBE6DD] bg-[#F2EDE4]'
              }`}
            >
              Salas & Agenda
              <Icons.ChevronDown />
            </button>

            {openDropdown === 'salas' && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#E5E0D8] py-2 z-50">
                
                <div className="px-4 py-2.5 border-b border-gray-100 hover:bg-[#FAF8F5] transition-colors">
                  <span className="block text-xs font-bold text-[#52796F] uppercase tracking-wider mb-1">
                    ASL Ideas SpA
                  </span>
                  <div className="flex items-center space-x-2 text-xs">
                    <Link href="/sala-virtual?oficina=asl" className="font-semibold text-[#2D3748] hover:text-[#52796F] underline">
                      Ingresar a Sala
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link href="/agendar?oficina=asl" className="text-gray-600 hover:text-[#52796F]">
                      Agendar Cita
                    </Link>
                  </div>
                </div>

                <div className="px-4 py-2.5 border-b border-gray-100 hover:bg-[#FAF8F5] transition-colors">
                  <span className="block text-xs font-bold text-[#52796F] uppercase tracking-wider mb-1">
                    LAWENMOLL
                  </span>
                  <div className="flex items-center space-x-2 text-xs">
                    <Link href="/sala-virtual?oficina=lawenmoll" className="font-semibold text-[#2D3748] hover:text-[#52796F] underline">
                      Ingresar a Sala
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link href="/agendar?oficina=lawenmoll" className="text-gray-600 hover:text-[#52796F]">
                      Agendar Cita
                    </Link>
                  </div>
                </div>

                <div className="px-4 py-2.5 border-b border-gray-100 hover:bg-[#FAF8F5] transition-colors">
                  <span className="block text-xs font-bold text-[#52796F] uppercase tracking-wider mb-1">
                    Wellness Web App
                  </span>
                  <div className="flex items-center space-x-2 text-xs">
                    <Link href="/sala-virtual?oficina=wellness" className="font-semibold text-[#2D3748] hover:text-[#52796F] underline">
                      Ingresar a Sala
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link href="/agendar?oficina=wellness" className="text-gray-600 hover:text-[#52796F]">
                      Agendar Cita
                    </Link>
                  </div>
                </div>

                <div className="px-4 py-2.5 hover:bg-[#FAF8F5] transition-colors">
                  <span className="block text-xs font-bold text-[#52796F] uppercase tracking-wider mb-1">
                    Sabiduría Ancestral / Bienestar
                  </span>
                  <div className="flex items-center space-x-2 text-xs">
                    <Link href="/sala-virtual?oficina=sabiduria" className="font-semibold text-[#2D3748] hover:text-[#52796F] underline">
                      Ingresar a Sala
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link href="/agendar?oficina=sabiduria" className="text-gray-600 hover:text-[#52796F]">
                      Agendar Cita
                    </Link>
                  </div>
                </div>

              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown('redes')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center ${
                openDropdown === 'redes'
                  ? 'bg-[#52796F] text-white shadow-sm'
                  : 'text-[#2D3748] hover:bg-[#EBE6DD] bg-[#F2EDE4]'
              }`}
            >
              Nuestras Redes
              <Icons.ChevronDown />
            </button>

            {openDropdown === 'redes' && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E5E0D8] py-2 z-50">
                <a
                  href="[suspicious link removed]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2.5 text-xs font-semibold text-[#2D3748] hover:bg-[#FAF8F5] hover:text-[#52796F] transition-colors"
                >
                  <Icons.LinkedIn />
                  LinkedIn Corporativo
                </a>
                <a
                  href="[suspicious link removed]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2.5 text-xs font-semibold text-[#2D3748] hover:bg-[#FAF8F5] hover:text-[#52796F] transition-colors"
                >
                  <Icons.Instagram />
                  Instagram Oficial
                </a>
                <a
                  href="[suspicious link removed]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2.5 text-xs font-semibold text-[#2D3748] hover:bg-[#FAF8F5] hover:text-[#52796F] transition-colors"
                >
                  <Icons.TikTok />
                  TikTok Salud Inclusiva
                </a>
                <a
                  href="[suspicious link removed]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2.5 text-xs font-semibold text-[#2D3748] hover:bg-[#FAF8F5] hover:text-[#52796F] transition-colors"
                >
                  <Icons.YouTube />
                  Canal de YouTube
                </a>
                <a
                  href="[suspicious link removed]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2.5 text-xs font-semibold text-[#2D3748] hover:bg-[#FAF8F5] hover:text-[#52796F] transition-colors"
                >
                  <Icons.Facebook />
                  Comunidad en Facebook
                </a>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown('contacto')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center ${
                openDropdown === 'contacto'
                  ? 'bg-[#52796F] text-white shadow-sm'
                  : 'text-[#2D3748] hover:bg-[#EBE6DD] bg-[#F2EDE4]'
              }`}
            >
              Contacto Directo
              <Icons.ChevronDown />
            </button>

            {openDropdown === 'contacto' && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E5E0D8] py-2 z-50">
                <a
                  href="tel:+56983302145"
                  className="flex items-center px-4 py-2.5 text-xs font-semibold text-[#2D3748] hover:bg-[#FAF8F5] hover:text-[#52796F] transition-colors border-b border-gray-100"
                >
                  <Icons.Phone />
                  Teléfono: +56 9 8330 2145
                </a>
                <a
                  href="[suspicious link removed]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2.5 text-xs font-semibold text-[#2D3748] hover:bg-[#FAF8F5] hover:text-[#52796F] transition-colors"
                >
                  <Icons.WhatsApp />
                  WhatsApp Directo
                </a>
                <a
                  href="[suspicious link removed]"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2.5 text-xs font-semibold text-[#2D3748] hover:bg-[#FAF8F5] hover:text-[#52796F] transition-colors"
                >
                  <Icons.Telegram />
                  Telegram
                </a>
                <a
                  href="mailto:contacto@aslideas.cl"
                  className="flex items-center px-4 py-2.5 text-xs font-semibold text-[#2D3748] hover:bg-[#FAF8F5] hover:text-[#52796F] transition-colors border-t border-gray-100"
                >
                  <Icons.Mail />
                  contacto@aslideas.cl
                </a>
              </div>
            )}
          </div>

        </nav>
      </div>
    </header>
  );
}
