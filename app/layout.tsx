import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASL Ideas SpA — Estrategia de Salud Digital Inclusiva & PYMEs',
  description: 'Desarrollo y soluciones accesibles para PYME y comercio asociado',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
