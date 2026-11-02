'use client';

import React, { useState } from 'react';
import IntroLoading from '@/components/IntroLoading';

export default function HomePage() {
  const [cargando, setCargando] = useState(true);

  return (
    <>
      {cargando && <IntroLoading onComplete={() => setCargando(false)} duracionMs={3000} />}
      
      <main className="min-h-screen bg-[#E6E7D5] p-8">
        <div className="max-w-4xl mx-auto text-center space-y-4 pt-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#676E5E]">
            ASL Ideas SpA
          </h1>
          <p className="text-lg text-[#676E5E]/80">
            Estrategia de Salud Digital Inclusiva
          </p>
        </div>
      </main>
    </>
  );
}
