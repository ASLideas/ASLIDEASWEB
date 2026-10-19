'use client';

import React, { useState, useRef } from "react";
import Link from "next/link";
import { subirPeticionPdf } from "@/lib/uploadService";

export default function LawenmollExplorarPage() {
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
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus("Subiendo peticion a Supabase...");

    const result = await subirPeticionPdf({
      file,
      clienteNombre: "Paciente / Cliente Regional LAWENMOLL",
      clienteEmail: "paciente@salud.cl",
      appOrigen: "LAWENMOLL"
    });

    setUploading(false);
    if (result.success) {
      setUploadStatus("Peticion en PDF enviada con exito a Supabase.");
    } else {
      setUploadStatus("Error al subir archivo. Revisa variables en Vercel.");
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#2C4A3E] font-sans flex flex-col justify-between">
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/lawenmoll_logo.jpg" alt="Logo LAWENMOLL" className="w-10 h-10 object-contain rounded-full border border-[#C8D8CE]" />
            <div>
              <h1 className="text-base font-bold text-[#2C4A3E]">Oficina 2: LAWENMOLL (Salud Integrativa)</h1>
              <p className="text-xs text-[#52796F]">Test de Bienestar y Fichas Protegidas (Ley N° 21.663)</p>
            </div>
          </div>
          <Link href="/" className="text-xs text-[#2C4A3E] hover:underline font-semibold">Volver a Portada</Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-8 w-full space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider block">Sala Virtual de Telemedicina</span>
              <h3 className="text-sm font-bold text-[#2C4A3E]">Atencion Clinica Integrativa (Participantes de Lado a Lado)</h3>
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
                  <span className="text-[10px] font-bold text-center">Coordinador Clinico</span>
                </div>

                <div className="bg-[#3A5A40] p-3 rounded-xl border border-[#84A59D] text-white flex flex-col justify-between min-h-[160px]">
                  <span className="text-[9px] text-emerald-200">Participante 2 (Lado a Lado)</span>
                  <div className="w-full h-28 bg-[#2C4A3E] rounded-lg flex items-center justify-center border border-dashed border-[#84A59D]">
                    <span className="text-[10px] text-emerald-200">Paciente Regional</span>
                  </div>
                  <span className="text-[10px] font-bold text-center">Usuario Conectado</span>
                </div>

                <div className="bg-[#3A5A40] p-3 rounded-xl border border-[#84A59D] text-white flex flex-col justify-between min-h-[160px]">
                  <span className="text-[9px] text-emerald-200">Participante 3 (Lado a Lado)</span>
                  <div className="w-full h-28 bg-[#2C4A3E] rounded-lg flex items-center justify-center border border-dashed border-[#84A59D]">
                    <span className="text-[10px] text-emerald-200">Terapeuta / Nutricionista</span>
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
                  <label htmlFor="pdf-lawenmoll" className="bg-[#FF8894] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer">
                    {uploading ? "Subiendo..." : "Adjuntar Ficha / Peticion PDF"}
                  </label>
                  <input id="pdf-lawenmoll" type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
                </div>
              </div>
              {uploadStatus && <p className="text-[10px] font-bold text-[#2C4A3E] text-center">{uploadStatus}</p>}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-white border-t border-[#C8D8CE] py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} LAWENMOLL — Oficina Salud Integrativa.
      </footer>
    </main>
  );
}
