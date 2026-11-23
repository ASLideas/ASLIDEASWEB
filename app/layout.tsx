import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASL Ideas SpA — Estrategia de Salud Digital Inclusiva',
  description: 'Desarrollo y soluciones accesibles para PYME y comercio asociado.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased selection:bg-[#B8D6B2] selection:text-[#1B4D3E]">
        {children}
      </body>
    </html>
  );
}
