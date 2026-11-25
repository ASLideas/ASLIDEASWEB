import './globals.css';
import React from 'react';

export const metadata = {
  title: 'ASL Ideas SpA | Ecosistema de Salud Digital Inclusiva',
  description: 'Desarrollo y soluciones accesibles para PYME y comercio asociado. Adaptado para neurodivergencias (TEA/TDAH) y condiciones cronicas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#FAF8F5] text-[#1B4D3E] antialiased">
        {children}
      </body>
    </html>
  );
}
