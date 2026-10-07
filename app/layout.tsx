import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ASL Ideas SpA | Salud Digital Inclusiva',
  description: 'Plataforma de salud digital integrativa y bienestar consciente.',
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
