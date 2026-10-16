'use client';

import React from 'react';
import Link from 'next/link';

export default function ASLIdeasPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-xs font-bold text-[#52796F] hover:underline mb-6 inline-block">&larr; Volver al Inicio</Link>
        <h1 className="text-3xl font-bold mb-2">ASL Ideas SpA - Casa Matriz & Soluciones B2B</h1>
        <p className="text-sm text-[#52796F] mb-6">Desarrollo de software inclusivo, accesibilidad UI/UX para neurodivergencias y licencias tecnológicas.</p>
      </div>
    </main>
  );
}
