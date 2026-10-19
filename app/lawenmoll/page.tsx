'use client';

import React, { useState, useRef } from "react";
import Link from "next/link";
import { subirPeticionPdf } from "@/lib/uploadService";

export default function LawenmollExplorarPage() {
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Estados y referencias para Camara Web y Microfono reales
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Función para Activar/Desactivar la Cámara Web
  const toggleCamera = async () => {
    if (cameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: micActive,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraActive(true);
      } catch (err) {
        console.error("Error al acceder a la camara:", err);
        alert("No se pudo acceder a la camara. Verifica los permisos de tu navegador.");
      }
    }
  };

  // Función para Activar/Desactivar Micrófono
  const toggleMic = () => {
    const nextMicState = !micActive;
    setMicActive(nextMicState);
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = nextMicState;
      });
    }
  };

  // Carga de Archivos a Supabase
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus("Subiendo archivo a Supabase...");

    const result = await subirPeticionPdf({
      file,
      clienteNombre: "Cliente Regional LAWENMOLL",
      clienteEmail: "contacto@cliente.cl",
      appOrigen: "LAWENMOLL",
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
              <img src="/lawenmoll_logo.jpg" alt="Logo LAWENMOLL" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#2C4A3E]">LAWENMOLL</h1>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#FFF0F2] text-[#D85260] border border-[#FF8894]">
                  Muestra Tecnologica B2B
                </span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-[#E8F0EC] text-[#52796F] border border-[#84A59D]">
                  App en Construccion
                </span>
              </div>
              <p className="text-xs text-[#52796F] font-medium">Salud Integrativa y Fichas Clinicas Protegidas (Ley N° 21.663)</p>
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
        Atencion a Regiones: Ingresa a nuestra Sala Virtual LAWENMOLL, prueba tu camara en vivo y adjunta tus requerimientos en PDF.
      </div>

      {/* Reseña de Creación y Beneficios Principales */}
      <section className="bg-white border-b border-[#C8D8CE] py-10 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="bg-[#E8F0EC] text-[#52796F] border border-[#84A59D] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Triada de Salud Integrativa
            </span>
            <span className="bg-[#FFF0F2] text-[#D85260] border border-[#FF8894] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              Vitrina Virtual &amp; Recepcion PDF
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#2C4A3E] leading-tight">
            ¿Por que se creo LAWENMOLL y cuales son sus beneficios?
          </h2>
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border border-[#C8D8CE] text-left max-w-3xl mx-auto space-y-4 shadow-xs">
            <div className="border-l-4 border-[#FF8894] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#2C4A3E] uppercase tracking-wider">Reseña de Creacion</h3>
              <p className="text-xs text-gray-700 leading-relaxed mt-1">
                LAWENMOLL fue concebida como una respuesta accesible para dar a conocer alternativas integrativas ante enfermedades cronicas y estres, con un diseño respetuoso y libre de sobrecarga sensorial.
              </p>
            </div>
            <div className="border-l-4 border-[#52796F] pl-4 py-1">
              <h3 className="text-xs font-bold text-[#2C4A3E] uppercase tracking-wider">Beneficios Principales</h3>
              <ul className="text-xs text-gray-700 space-y-1.5 mt-1 list-disc list-inside">
                <li><strong>Ahorro en Traslados Regionales:</strong> Los clientes cargan sus solicitudes en PDF desde su region sin viajes presenciales.</li>
                <li><strong>Test de Bienestar Inteligente:</strong> Evaluacion cualitativa sin juicios corporales.</li>
                <li><strong>Ciberseguridad:</strong> Fichas protegidas bajo la Ley N° 21.663.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Sala Virtual Desplegable con Cámara Interactiva Real */}
      <section className="max-w-6xl mx-auto px-6 py-8 w-full space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-left">
              <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider block">Modulo Desplegable</span>
              <h3 className="text-base font-bold text-[#2C4A3E]">Sala Virtual de Videollamada y Carga de Archivos LAWENMOLL</h3>
              <p className="text-xs text-gray-600">Prueba la camara en vivo y realiza la recepcion directa de peticiones PDF para la Vitrina Virtual.</p>
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
              <div className="md:col-span-2 bg-[#52796F] p-5 rounded-2xl text-white flex flex-col justify-between min-h-[320px]">
                <div className="flex justify-between items-center border-b border-[#84A59D] pb-2">
                  <h4 className="font-bold text-xs text-white">Sala Virtual LAWENMOLL — Conexion Encriptada</h4>
                  <span className="text-[9px] bg-[#FF8894] text-white px-2 py-0.5 rounded-full font-bold">En Linea</span>
                </div>

                {/* Visor de Video de la Cámara Web */}
                <div className="relative my-3 bg-[#3A5A40] rounded-xl overflow-hidden min-h-[200px] flex items-center justify-center border border-[#84A59D]">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-48 object-cover rounded-xl ${cameraActive ? "block" : "hidden"}`}
                  />
                  {!cameraActive && (
                    <div className="text-center p-4">
                      <p className="text-xs font-bold text-emerald-100">Camara Desactivada</p>
                      <p className="text-[10px] text-emerald-200 mt-1">Presiona "Encender Camara" para iniciar la vista previa.</p>
                    </div>
                  )}
                </div>

                {/* Controles de Cámara y Micrófono */}
                <div className="flex justify-center gap-3 pt-2 border-t border-[#84A59D]">
                  <button
                    onClick={toggleMic}
                    className={`text-[10px] px-4 py-1.5 rounded-lg font-bold transition ${
                      micActive ? "bg-[#FF8894] text-white" : "bg-[#3A5A40] text-white"
                    }`}
                  >
                    {micActive ? "Microfono Activo" : "Activar Microfono"}
                  </button>
                  <button
                    onClick={toggleCamera}
                    className={`text-[10px] px-4 py-1.5 rounded-lg font-bold transition ${
                      cameraActive ? "bg-[#D85260] text-white" : "bg-[#FF8894] text-white"
                    }`}
                  >
                    {cameraActive ? "Apagar Camara" : "Encender Camara"}
                  </button>
                </div>
              </div>

              {/* Módulo de Carga Real de PDF */}
              <div className="bg-white p-4 rounded-2xl border border-[#C8D8CE] flex flex-col justify-between space-y-3">
                <div>
                  <h5 className="font-bold text-xs text-[#2C4A3E] border-b border-[#C8D8CE] pb-1.5">Adjuntar Peticion (PDF)</h5>
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

        {/* Tarjetas Informativas Restauradas */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
            <span className="text-[10px] font-bold text-[#D85260] uppercase tracking-wider block">Ciberseguridad</span>
            <h3 className="font-bold text-sm text-[#2C4A3E]">Fichas Encriptadas</h3>
            <p className="text-xs text-gray-600">Registro protegido bajo estandares de la Ley N° 21.663. App en construccion.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
            <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider block">Atencion Profesional</span>
            <h3 className="font-bold text-sm text-[#2C4A3E]">Red de Terapeutas</h3>
            <p className="text-xs text-gray-600">Modelo de vinculacion con profesionales de medicina integrativa.</p>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] space-y-2 shadow-xs">
            <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider block">Seguimiento</span>
            <h3 className="font-bold text-sm text-[#2C4A3E]">Historial de Habitos</h3>
            <p className="text-xs text-gray-600">Evolucion de marcadores de calidad de vida sin sobrecarga cognitiva.</p>
          </div>
        </div>

        {/* Canales Directos B2B */}
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] space-y-4 text-center shadow-xs">
          <h3 className="text-sm font-bold text-[#2C4A3E]">Canales Directos para Agendar Reuniones B2B — LAWENMOLL</h3>
          <div className="grid md:grid-cols-3 gap-4 text-xs pt-2">
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE]">
              <span className="font-bold text-[#2C4A3E] block mb-1">Coordinacion Virtual</span>
              <p className="text-gray-600">+56 9 6543 2109</p>
            </div>
            <div className="p-4 bg-[#FFF0F2] rounded-2xl border border-[#FF8894]">
              <span className="font-bold text-[#D85260] block mb-1">Correo Institucional</span>
              <p className="text-gray-600">contacto@lawenmoll.cl</p>
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
        <p>&copy; {new Date().getFullYear()} LAWENMOLL - ASL Ideas SpA | Muestra Tecnologica B2B en Construccion.</p>
      </footer>
    </main>
  );
}
