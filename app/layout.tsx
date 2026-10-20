import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASL Ideas SpA | Salud Digital Inclusiva',
  description: 'Plataforma de Salud Digital Inclusiva & Bienestar Integrativo.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-[#FAF8F5] text-[#52796F] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
