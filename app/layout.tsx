import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASL Ideas SpA - Ecosistema de Soluciones Digitales y Diseños para PYMEs y Asociados',
  description: 'Desarrollo y soluciones accesibles para PYME y comercio asociado.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#0B132B] text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
