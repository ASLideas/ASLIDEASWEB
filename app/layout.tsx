'use client';

import React from 'react';

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
