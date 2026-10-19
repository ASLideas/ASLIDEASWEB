'use client';

import React, { useState } from "react";
import Link from "next/link";
import { subirPeticionPdf } from "@/lib/uploadService";

export default function WellnessExplorarPage() {
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
      clienteNombre: "Cliente Regional Wellness",
      clienteEmail: "contacto@wellness.cl",
      appOrigen: "Wellness"
    });

    setUploading(false);
    if (result.success) {
      setUploadStatus("Peticion enviada con exito a la Vitrina Virtual.");
    } else {
      setUploadStatus("Error al subir archivo. Verifica tus credenciales.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#2C4A3E] font-sans flex flex-col justify-between">
      {/* Header Institucional */}
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#FF8894] bg-white p-0.5 shadow-xs">
              <img src="/logo_wellness.jpg" alt="Logo Wellness" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#2C4A3E]">Wellness Web App</h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#FFF0F2] text-[#D85260] border border-[#FF8894]">
                  Muestra Tecnologica B2B
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#E8F0EC] text-[#52796F] border border-[#84A59D]">
                  App en Construccion
                </span>
              </div>
              <p className="text-xs text-[#52796F] font-medium">Apoyo Visual Mente-Cuerpo y Pausas Activas Adaptadas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:contacto@aslideas.cl"
              className="bg-[#FF8894] text-white text-xs px-4 py-2.5 rounded-xl font-bold hover:bg-[#D85260] transition shadow-xs"
            >
              Agendar Reunion B2B
            </a>
            <Link href="/" className="text-xs text-[#2C4A3E] hover:underline font-semibold">
              Volver a Portada
            </Link>
          </div>
        </div>
      </header>

      {/* Banner Informativo */}
      <div className="bg-[#FFF0F2] border-b border-[#FF8894] py-2 px-6 text-center text-xs font-semibold text-[#2C4A3E]">
        Ingresa a la Sala Virtual Wellness para coordinar talleres y enviar especificaciones PDF para la Vitrina Virtual.
      </div>

      {/* Reseña de Creación y Beneficios Principales */}
      <section className="bg-white border-b border-[#C8D8CE] py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#52796F] border border-[#84A59D] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Triada de Salud Integrativa
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Salas Virtuales &amp; Clases en Vivo
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#2C4A3E] leading-tight">
            ¿Por que se creo Wellness Web App y cuales son sus beneficios?
          </h2>
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-4 shadow-xs">
            <div className="border-l-4 border-[#FF8894] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#2C4A3E] uppercase tracking-wider">Reseña de Creacion</h3>
              <p className="text-xs text-gray-700 leading-relaxed mt-1">
                Surgio como una alternativa visual y amigable para fomentar el equilibrio cuerpo-mente, pensada para personas y empresas que buscan pausas activas adaptadas sin sobreexigencia fisica.
              </p>
            </div>
            <div className="border-l-4 border-[#52796F] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#2C4A3E] uppercase tracking-wider">Beneficios Principales</h3>
              <ul className="text-xs text-gray-700 space-y-1.5 mt-1 list-disc list-inside">
                <li><strong>Ahorro en Traslados a Regiones:</strong> Coordinacion de salas virtuales y envio de especificaciones PDF sin viajar.</li>
                <li><strong>Movimiento Adaptado Sin Impacto:</strong> Pautas de ejercicio consciente para pausas laborales.</li>
                <li><strong>Salas Interactivas:</strong> Espacios tematicos para clases en tiempo real.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Sala Virtual Desplegable con Subida a Supabase */}
      <section className="max-w-6xl mx-auto px-6 py-8 w-full space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-left">
              <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider block">Modulo Desplegable</span>
              <h3 className="text-base font-bold text-[#2C4A3E]">Sala Virtual de Videollamada y Talleres Wellness</h3>
              <p className="text-xs text-gray-600">Despliega la sala para reuniones en vivo y recepcion de especificaciones en PDF.</p>
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
                  <h4 className="font-bold text-xs text-white">Sala Virtual Wellness — Taller en Vivo</h4>
                  <span className="text-[9px] bg-[#FF8894] text-white px-2 py-0.5 rounded-full font-bold">En Linea</span>
                </div>
                <div className="grid grid-cols-2 gap-3 my-3">
                  <div className="bg-[#3A5A40] p-3 rounded-xl text-center border border-[#84A59D]">
                    <span className="text-[9px] text-emerald-200 block">Instructor Wellness</span>
                    <p className="text-xs font-bold text-white mt-1">Demostracion Pausa Activa</p>
                  </div>
                  <div className="bg-[#3A5A40] p-3 rounded-xl text-center border border-[#84A59D]">
                    <span className="text-[9px] text-emerald-200 block">Cliente Regional</span>
                    <p className="text-xs font-bold text-white mt-1">Comercio / Empresa</p>
                  </div>
                </div>
                <div className="flex justify-center gap-2 pt-2 border-t border-[#84A59D]">
                  <button className="bg-[#3A5A40] text-[10px] px-3 py-1 rounded-lg text-white font-semibold">Microfono</button>
                  <button className="bg-[#3A5A40] text-[10px] px-3 py-1 rounded-lg text-white font-semibold">Camara</button>
                  <button className="bg-[#FF8894] text-[10px] px-3 py-1 rounded-lg text-white font-bold">Compartir Taller</button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#C8D8CE] flex flex-col justify-between space-y-3">
                <div>
                  <h5 className="font-bold text-xs text-[#2C4A3E] border-b border-[#C8D8CE] pb-1.5">Adjuntar Especificaciones (PDF)</h5>
                  <p className="text-[10px] text-gray-500 mt-1">Selecciona tu archivo en PDF para enviarlo directamente a Supabase.</p>
                </div>
                <div className="p-3 bg-[#FFF0F2] rounded-xl border border-dashed border-[#FF8894] text-center space-y-2">
                  <label htmlFor="pdf-upload-wellness" className="bg-[#FF8894] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-[#D85260] transition cursor-pointer inline-block">
                    {uploading ? "Subiendo..." : "Seleccionar Archivo PDF"}
                  </label>
                  <input
                    id="pdf-upload-wellness"
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

        {/* Módulos Informativos de Ejercicios */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-3 shadow-xs">
            <span className="text-[10px] font-bold text-[#D85260] uppercase tracking-wider block">Pausa Activa</span>
            <h3 className="font-bold text-sm text-[#2C4A3E]">Movilidad Suave en Silla</h3>
            <p className="text-xs text-gray-600">Ejercicios visuales sin impacto ni sobreexigencia articular.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-3 shadow-xs">
            <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider block">Fuerza Adaptada</span>
            <h3 className="font-bold text-sm text-[#2C4A3E]">Rutina Consciente</h3>
            <p className="text-xs text-gray-600">Fortalecimiento progresivo para postura y bienestar laboral.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-3 shadow-xs">
            <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider block">Mente-Cuerpo</span>
            <h3 className="font-bold text-sm text-[#2C4A3E]">Respiracion y Calma</h3>
            <p className="text-xs text-gray-600">Soporte visual para reducir el estres durante la jornada.</p>
          </div>
        </div>

        {/* Canales Directos B2B */}
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4 text-center shadow-xs">
          <h3 className="text-sm font-bold text-[#2C4A3E]">Canales Directos para Agendar Reuniones B2B — Wellness Web App</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2C4A3E] block mb-1">Coordinacion Virtual</span>
              <p className="text-gray-600">+56 9 8765 4321</p>
            </div>
            <div className="p-4 bg-[#FFF0F2] rounded-2xl border border-[#FF8894]">
              <span className="font-bold text-[#D85260] block mb-1">Correo Institucional</span>
              <p className="text-gray-600">wellness@aslideas.cl</p>
            </div>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2C4A3E] block mb-1">Reuniones B2B</span>
              <p className="text-gray-600">ASL Ideas SpA &amp; Clientes B2B</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Wellness Web App - ASL Ideas SpA | Muestra Tecnologica B2B en Construccion.</p>
      </footer>
    </main>
  );
}
