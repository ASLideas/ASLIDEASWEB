'use client';

import React, { useState, useRef } from "react";
import Link from "next/link";
import { subirPeticionPdf } from "@/lib/uploadService";

export default function LawenmollExplorarPage() {
  const [isRoomOpen, setIsRoomOpen] = useState(false);
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
        if (typeof window !== 'undefined' && navigator.mediaDevices) {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micActive });
          streamRef.current = stream;
          if (videoRef.current) videoRef.current.srcObject = stream;
          setCameraActive(true);
        }
      } catch (err: any) {
        alert("No se pudo acceder a la cámara web: " + (err.message || err));
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
      setUploadStatus("Error: " + (result.error || "Revisa credenciales en Vercel/Supabase."));
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#2C4A3E] font-sans flex flex-col justify-between">
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/lawenmoll_logo.jpg" alt="Logo LAWENMOLL" className="w-10 h-10 object-contain rounded-full border border-[#C8D8CE]" />
            <div>
              <h1 className="text-base font-bold text-[#2C4A3E]">LAWENMOLL — Salud Integrativa</h1>
              <p className="text-xs text-[#52796F]">Plataforma de Evaluación Metabólica y Fichas Protegidas (Ley N° 21.663)</p>
            </div>
          </div>
          <Link href="/" className="text-xs text-[#2C4A3E] hover:underline font-semibold">Volver a Portada</Link>
        </div>
      </header>

      <section className="bg-white border-b border-[#C8D8CE] py-8 px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#52796F] uppercase tracking-wider block">Propósito &amp; Atención Clínica</span>
          <h2 className="text-xl font-bold text-[#2C4A3E]">¿Por qué se creó LAWENMOLL y qué función cumple?</h2>
          <p className="text-xs text-gray-700 leading-relaxed">
            LAWENMOLL es una vitrina virtual creada para dar a conocer a los usuarios y pacientes que existe otra forma para tratar enfermedades crónicas, autoinmunes y de salud mental, en la cual diversas disciplinas se complementan armónicamente con la medicina tradicional.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2C4A3E] block mb-1">Acompañamiento Metabólico</span>
              <p className="text-gray-600">Evaluación cualitativa y nutrición consciente para condiciones crónicas.</p>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2C4A3E] block mb-1">Salud Mental &amp; Estrés</span>
              <p className="text-gray-600">Espacios adaptados para reducir ansiedad y brindar contención emocional.</p>
            </div>
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2C4A3E] block mb-1">Ciberseguridad Ley N° 21.663</span>
              <p className="text-gray-600">Fichas clínicas encriptadas y protegidas para consultas virtuales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sala Virtual Multiusuario */}
      <section className="max-w-6xl mx-auto px-6 py-8 w-full space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider block">Sala Virtual Telemedicina</span>
              <h3 className="text-sm font-bold text-[#2C4A3E]">Atención Virtual (Participantes de Lado a Lado)</h3>
            </div>
            <button
              onClick={() => setIsRoomOpen(!isRoomOpen)}
              className="bg-[#52796F] text-white text-xs px-5 py-2.5 rounded-xl font-bold hover:bg-[#3A5A40] transition"
            >
              {isRoomOpen ? "Ocultar Sala Virtual" : "Abrir Sala Virtual Desplegable"}
            </button>
          </div>

          {isRoomOpen && (
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#84A59D] space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#3A5A40] p-3 rounded-xl border border-[#84A59D] text-white flex flex-col justify-between min-h-[160px]">
                  <span className="text-[9px] text-emerald-200">Cámara Local (Tu Vista)</span>
                  <div className="relative w-full h-28 bg-[#2C4A3E] rounded-lg overflow-hidden flex items-center justify-center">
                    <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`} />
                    {!cameraActive && <span className="text-[10px] text-emerald-100">Cámara Apagada</span>}
                  </div>
                  <span className="text-[10px] font-bold text-center">Coordinador Clínico</span>
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
                    <span className="text-[10px] text-emerald-200">Especialista / Terapeuta</span>
                  </div>
                  <span className="text-[10px] font-bold text-center">Especialista Invitado</span>
                </div>
              </div>

              <div className="flex flex-wrap justify-between items-center gap-3 pt-3 border-t border-[#84A59D]">
                <div className="flex gap-2">
                  <button onClick={toggleMic} className={`text-[10px] px-3 py-1.5 rounded-lg font-bold ${micActive ? 'bg-[#52796F] text-white' : 'bg-[#3A5A40] text-white'}`}>
                    {micActive ? "Micrófono Activo" : "Activar Micrófono"}
                  </button>
                  <button onClick={toggleCamera} className={`text-[10px] px-3 py-1.5 rounded-lg font-bold ${cameraActive ? 'bg-[#3A5A40] text-white' : 'bg-[#52796F] text-white'}`}>
                    {cameraActive ? "Apagar Cámara" : "Encender Cámara"}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="pdf-lawenmoll" className="bg-[#52796F] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-[#3A5A40]">
                    {uploading ? "Subiendo..." : "Adjuntar Petición PDF"}
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
        &copy; {new Date().getFullYear()} LAWENMOLL — ASL Ideas SpA.
      </footer>
    </main>
  );
}
