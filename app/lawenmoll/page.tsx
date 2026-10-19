'use client';

import React, { useState } from "react";
import Link from "next/link";
import { subirPeticionPdf } from "@/lib/uploadService";

export default function LawenmollExplorarPage() {
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus("Subiendo archivo a Supabase...");

    const result = await subirPeticionPdf({
      file,
      clienteNombre: "Cliente Regional LAWENMOLL",
      clienteEmail: "contacto@cliente.cl",
      appOrigen: "LAWENMOLL"
    });

    setUploading(false);
    if (result.success) {
      setUploadStatus("Petición enviada con éxito a la Vitrina Virtual.");
    } else {
      setUploadStatus("Error al subir archivo. Verifica tus credenciales.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#2C4A3E] font-sans flex flex-col justify-between">
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF8894] bg-white p-0.5 shadow-xs">
              <img src="/lawenmoll_logo.jpg" alt="Logo LAWENMOLL" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#2C4A3E]">LAWENMOLL</h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#FFF0F2] text-[#D85260] border border-[#FF8894]">
                  Muestra Tecnológica B2B
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#E8F0EC] text-[#52796F] border border-[#84A59D]">
                  App en Construcción
                </span>
              </div>
              <p className="text-xs text-[#52796F] font-medium">Salud Integrativa y Fichas Clínicas Protegidas (Ley N° 21.663)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:contacto@aslideas.cl"
              className="bg-[#FF8894] text-white text-xs px-4 py-2.5 rounded-xl font-bold hover:bg-[#D85260] transition shadow-xs"
            >
              Agendar Reunión B2B
            </a>
            <Link href="/" className="text-xs text-[#2C4A3E] hover:underline font-semibold">
              Volver a Portada
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8 w-full space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-left">
              <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider block">Módulo Desplegable</span>
              <h3 className="text-base font-bold text-[#2C4A3E]">Sala Virtual de Videollamada y Carga de Archivos LAWENMOLL</h3>
              <p className="text-xs text-gray-600">Reunión en vivo y recepción directa de peticiones PDF para la Vitrina Virtual.</p>
            </div>
            <button
              onClick={() => setIsRoomOpen(!isRoomOpen)}
              className="bg-[#52796F] text-white text-xs px-5 py-2.5 rounded-xl font-bold hover:bg-[#3A5A40] transition shadow-xs flex items-center gap-2"
            >
              <span>{isRoomOpen ? "Ocultar Sala Virtual" : "Abrir Sala Virtual Desplegable"}</span>
              <span className="text-sm">{isRoomOpen ? "▲" : "▼"}</span>
            </button>
          </div>

          {isRoomOpen && (
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#84A59D] mt-4 grid md:grid-cols-3 gap-6 text-left">
              <div className="md:col-span-2 bg-[#52796F] p-5 rounded-2xl text-white flex flex-col justify-between min-h-[280px]">
                <div className="flex justify-between items-center border-b border-[#84A59D] pb-2">
                  <h4 className="font-bold text-xs text-white">Sala Virtual LAWENMOLL — Conexión Encriptada</h4>
                  <span className="text-[9px] bg-[#FF8894] text-white px-2 py-0.5 rounded-full font-bold">En Línea</span>
                </div>
                <div className="grid grid-cols-2 gap-3 my-3">
                  <div className="bg-[#3A5A40] p-3 rounded-xl text-center border border-[#84A59D]">
                    <span className="text-[9px] text-emerald-200 block">Coordinador LAWENMOLL</span>
                    <p className="text-xs font-bold text-white mt-1">Recepción Activa</p>
                  </div>
                  <div className="bg-[#3A5A40] p-3 rounded-xl text-center border border-[#84A59D]">
                    <span className="text-[9px] text-emerald-200 block">Cliente Regional</span>
                    <p className="text-xs font-bold text-white mt-1">Comercio Salud</p>
                  </div>
                </div>
                <div className="flex justify-center gap-2 pt-2 border-t border-[#84A59D]">
                  <button className="bg-[#3A5A40] text-[10px] px-3 py-1 rounded-lg text-white font-semibold">Micrófono</button>
                  <button className="bg-[#3A5A40] text-[10px] px-3 py-1 rounded-lg text-white font-semibold">Cámara</button>
                  <button className="bg-[#FF8894] text-[10px] px-3 py-1 rounded-lg text-white font-bold">Compartir Petición</button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#C8D8CE] flex flex-col justify-between space-y-3">
                <div>
                  <h5 className="font-bold text-xs text-[#2C4A3E] border-b border-[#C8D8CE] pb-1.5">Adjuntar Petición (PDF)</h5>
                  <p className="text-[10px] text-gray-500 mt-1">Selecciona tu archivo en PDF para enviarlo directamente a Supabase.</p>
                </div>
                <div className="p-3 bg-[#FFF0F2] rounded-xl border border-dashed border-[#FF8894] text-center space-y-2">
                  <label htmlFor="pdf-upload" className="bg-[#FF8894] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-[#D85260] transition cursor-pointer inline-block">
                    {uploading ? "Subiendo..." : "Seleccionar Archivo PDF"}
                  </label>
                  <input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {uploadStatus && (
                    <p className="text-[9px] font-bold text-[#2C4A3E] mt-1">{uploadStatus}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} LAWENMOLL - ASL Ideas SpA | Muestra Tecnológica B2B en Construcción.</p>
      </footer>
    </main>
  );
}
