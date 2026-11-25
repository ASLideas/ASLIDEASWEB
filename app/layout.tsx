import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASL Ideas SpA — Ecosistema de Salud Digital Inclusiva',
  description: 'Desarrollo y soluciones accesibles para PYME y comercio asociado',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-900 text-slate-100 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
