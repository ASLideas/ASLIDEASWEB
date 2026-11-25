import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASL Ideas SpA | Estrategia de Salud Digital Inclusiva',
  description: 'Ecosistema de Salud Digital Inclusiva, Telemedicina integrativa y Red Cuerpo y Alma B2B.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased font-sans selection:bg-[#52796F] selection:text-white">
        {children}
      </body>
    </html>
  );
}
