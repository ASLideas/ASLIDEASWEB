'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SalaVirtualB2B from '@/components/SalaVirtualB2B';

export default function ComunidadPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAppName, setCurrentAppName] = useState('Portal Comunidad ASL');
  const [currentAppLogo, setCurrentAppLogo] = useState('/logo-bienestar.png');

  return (
    <main className="min-h-screen bg-[#E6E7D5] text-[#676E5E] font-sans pb-16">
      <header className="bg-white border-b border-[#97A884] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="font-bold text-lg text-[#676E5E]">
              Comunidad ASL Ideas
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <h1 className="text-2xl font-black text-[#676E5E]">Comunidad y Servicios</h1>
        <p className="text-sm text-[#52796F]">Acceso a la Sala Virtual y Portales B2B Integrativos.</p>

        <SalaVirtualB2B
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialApp={currentAppName}
          appLogo={currentAppLogo}
        />
      </div>
    </main>
  );
}
