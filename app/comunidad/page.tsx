'use client';

import React, { useState, useRef } from "react";
import Link from "next/link";
import { subirPeticionPdf } from "@/lib/uploadService";

export default function ComunidadBienestarPage() {
  const [isRoomOpen, setIsRoomOpen] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const toggleCamera = async () => {
    if (cameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) videoRef.current.srcObject = null;
      setCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micActive });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCameraActive(true);
      } catch (err) {
        alert("No se pudo acceder a la camara web.");
      }
    }
  };

  const toggleMic = () => {
    const nextMic = !micActive;
    setMicActive(nextMic);
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => { track.enabled = nextMic; });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.;
    if (!file) return;

    setUploading(true);
    setUploadStatus("Subiendo catalogo a Supabase...");

    const result = await subirPeticionPdf({
      file,
      clienteNombre: "PYME Herbolaria Regional",
      clienteEmail: "pyme@herbolaria.cl",
      appOrigen: "Bienestar"
    });

    setUploading(false);
    if (result.success) {
      setUploadStatus("Catalogo PDF subido con exito a Supabase.");
    } else {
      setUploadStatus("Error al subir archivo. Revisa tus credenciales en Vercel.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#2C4A3E] font-sans flex flex-col justify-between">
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/LOGO_BIENESTAR.png" alt="Logo Bienestar" className="w-10 h-10 object-contain rounded-full border border-[#C8D8CE]" />
            <div>
              <h1 className="text-base font-bold text-[#2C4A3E]">Bienestar App — Sabiduria Ancestral</h1>
              <p className="text-xs text-[#52796F]">Herbolaria Nativa, Comunidad Activa y Descanso Morfeo</p>
            </div>
          </div>
          <Link href="/" className="text-xs text-[#2C4A3E] hover:underline font-semibold">Volver a Portada</Link>
        </div>
      </header>

      <section className="bg-white border-b border-[#C8D8CE] py-8 px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#52796F] uppercase tracking-wider block">Proposito &amp; Fitoterapia Nativa</span>
          <h2 className="text-xl font-bold text-[#2C4A3E]">¿Por que se creo Sabiduria Ancestral y que funcion cumple?</h2>
          <p className="text-xs text-gray-700 leading-relaxed">
            Portal creado para rescatar y divulgar el conocimiento de la herbolaria nativa y la medicina natural tradicional. Su funcion es conectar a las comunidades y PYMES regionales a traves de un canal autonomo de comunicacion, intercambio de saberes y difusion de productos naturales.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2C4A3E] block mb-1">Recetario Herbolario PDF</span>
              <p className="text-gray-600">Guias descargables para el uso seguro de plantas medicinales y remedios populares.</p>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2C4A3E] block mb-1">Diario Mural Comunitario</span>
              <p className="text-gray-600">Espacio donde los usuarios comparten experiencias, habitos y consejos de autocuidado.</p>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2C4A3E] block mb-1">Comercio PYME Regional</span>
              <p className="text-gray-600">Vitrina para productores locales de herbolaria sin comisiones intermediarias.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sala Virtual Multiusuario */}
      <section className="max-w-6xl mx-auto px-6 py-8 w-full space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider block">Sala Virtual Comunitaria</span>
              <h3 className="text-sm font-bold text-[#2C4A3E]">Encuentro de Herbolaria &amp; PYMES (Participantes de Lado a Lado)</h3>
            </div>
            <button onClick={() => setIsRoomOpen(!isRoomOpen)} className="bg-[#52796F] text-white text-xs px-4 py-2 rounded-xl font-bold">
              {isRoomOpen ? "Ocultar Sala" : "Abrir Sala Virtual"}
            </button>
          </div>

          {isRoomOpen && (
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#84A59D] space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#3A5A40] p-3 rounded-xl border border-[#84A59D] text-white flex flex-col justify-between min-h-[160px]">
                  <span className="text-[9px] text-emerald-200">Camara Local (Tu Vista)</span>
                  <div className="relative w-full h-28 bg-[#2C4A3E] rounded-lg overflow-hidden flex items-center justify-center">
                    <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`} />
                    {!cameraActive && <span className="text-[10px] text-emerald-100">Camara Apagada</span>}
                  </div>
                  <span className="text-[10px] font-bold text-center">Coordinador Herbolario</span>
                </div>

                <div className="bg-[#3A5A40] p-3 rounded-xl border border-[#84A59D] text-white flex flex-col justify-between min-h-[160px]">
                  <span className="text-[9px] text-emerald-200">Participante 2 (Lado a Lado)</span>
                  <div className="w-full h-28 bg-[#2C4A3E] rounded-lg flex items-center justify-center border border-dashed border-[#84A59D]">
                    <span className="text-[10px] text-emerald-200">Productor Local PYME</span>
                  </div>
                  <span className="text-[10px] font-bold text-center">PYME Regional</span>
                </div>

                <div className="bg-[#3A5A40] p-3 rounded-xl border border-[#84A59D] text-white flex flex-col justify-between min-h-[160px]">
                  <span className="text-[9px] text-emerald-200">Participante 3 (Lado a Lado)</span>
                  <div className="w-full h-28 bg-[#2C4A3E] rounded-lg flex items-center justify-center border border-dashed border-[#84A59D]">
                    <span className="text-[10px] text-emerald-200">Asesor de Fitoterapia</span>
                  </div>
                  <span className="text-[10px] font-bold text-center">Especialista Invitado</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-between items-center gap-3 pt-3 border-t border-[#84A59D]">
                <div className="flex gap-2">
                  <button onClick={toggleMic} className={`text-[10px] px-3 py-1.5 rounded-lg font-bold ${micActive ? 'bg-[#FF8894] text-white' : 'bg-[#3A5A40] text-white'}`}>
                    {micActive ? "Microfono Activo" : "Activar Microfono"}
                  </button>
                  <button onClick={toggleCamera} className={`text-[10px] px-3 py-1.5 rounded-lg font-bold ${cameraActive ? 'bg-[#D85260] text-white' : 'bg-[#FF8894] text-white'}`}>
                    {cameraActive ? "Apagar Camara" : "Encender Camara"}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="pdf-comunidad" className="bg-[#FF8894] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer">
                    {uploading ? "Subiendo..." : "Adjuntar Catalogo PDF"}
                  </label>
                  <input id="pdf-comunidad" type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                </div>
              </div>
              {uploadStatus && <p className="text-[10px] font-bold text-[#2C4A3E] text-center">{uploadStatus}</p>}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-white border-t border-[#C8D8CE] py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Bienestar App — ASL Ideas SpA.
      </footer>
    </main>
  );
}
