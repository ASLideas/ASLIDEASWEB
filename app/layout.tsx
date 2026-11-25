import './globals.css';
import React from 'react';

export const metadata = {
  title: 'ASL Ideas SpA - Ecosistema de Soluciones Digitales y Diseños para PYMEs y Asociados',
  description: 'Desarrollo y soluciones accesibles para PYME y comercio asociado. Red Cuerpo y Alma B2B.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
