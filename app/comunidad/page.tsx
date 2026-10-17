'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function BienestarPage() {
  const [activeTab, setActiveTab] = useState("comunidad");
  const [waterGlasses, setWaterGlasses] = useState(4);
  const [steps, setSteps] = useState(5420);
  const [scannedFood, setScannedFood] = useState("");

  const [postsList, setPostsList] = useState([
    { author: "Elena R.", text: "Comparto mi receta de infusión de cedrón y toronjil para una tarde serena.", time: "Hace 15 min" },
    { author: "Marcos T.", text: "Caminata matutina adaptada completada. 5,000 pasos a ritmo suave.", time: "Hace 1 hora" }
  ]);
  const [newPostText, setNewPostText] = useState("");
  const [morfeoPlaying, setMorfeoPlaying] = useState("");
  const [medicalSuccess, setMedicalSuccess] = useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    setPostsList([{ author: "Usuario Activo", text: newPostText, time: "Ahora mismo" }, ...postsList]);
    setNewPostText("");
  };

  const handleSimulateScan = () => {
    setScannedFood("Ensalada de Quinoa con Palta y Semillas - 320 kcal");
  };

  const handleMedicalBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setMedicalSuccess(true);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-700 bg-white p-0.5">
              <img src="/LOGO BIENESTAR.png" alt="Logo Bienestar" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1B4D3E]">Bienestar App</h1>
              <p className="text-xs text-amber-800 font-semibold">Comunidad, Hábitos Saludables y Descanso Morfeo</p>
            </div>
          </div>

          <Link href="/" className="text-xs text-[#1B4D3E] hover:underline font-semibold">
            Volver a Portada
          </Link>
        </div>
      </header>

      <section className="bg-white border-b border-[#C8D8CE] px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 text-xs font-bold justify-center">
          <button
            onClick={() => setActiveTab("comunidad")}
            className={activeTab === "comunidad" ? "px-4 py-2 rounded-xl transition bg-[#1B4D3E] text-white" : "px-4 py-2 rounded-xl transition bg-[#FAF8F5] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Comunidad y Muro
          </button>
          <button
            onClick={() => setActiveTab("habitos")}
            className={activeTab === "habitos" ? "px-4 py-2 rounded-xl transition bg-[#1B4D3E] text-white" : "px-4 py-2 rounded-xl transition bg-[#FAF8F5] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Pasos, Agua y Escáner
          </button>
          <button
            onClick={() => setActiveTab("citas")}
            className={activeTab === "citas" ? "px-4 py-2 rounded-xl transition bg-[#1B4D3E] text-white" : "px-4 py-2 rounded-xl transition bg-[#FAF8F5] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Agendar Horas Médicas
          </button>
          <button
            onClick={() => setActiveTab("shopping")}
            className={activeTab === "shopping" ? "px-4 py-2 rounded-xl transition bg-['1B4D3E] text-white" : "px-4 py-2 rounded-xl transition bg-['FAF8F5] text-gray-700 hover:bg-['E8F0EC]"}
          >
            Shopping PYMES Herbolarias
          </button>
          <button
            onClick={() => setActiveTab("morfeo")}
            className={activeTab === "morfeo" ? "px-4 py-2 rounded-xl transition bg-amber-900 text-white" : "px-4 py-2 rounded-xl transition bg-[#FAF8F5] text-amber-900 border border-amber-200 hover:bg-amber-50"}
          >
            Módulo Morfeo (Sueño REM)
          </button>
        </div>
      </section>

      {activeTab === "comunidad" && (
        <section className="max-w-4xl mx-auto px-6 py-8 w-full space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-['C8D8CE] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-['1B4D3E]">Muro de Comunicación y Compartir Experiencias</h3>
            <form onSubmit={handleCreatePost} className="space-y-3">
              <textarea
                rows={3}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Escribe un mensaje, recomendación de herbolaria o logro de bienestar..."
                className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2 text-xs text-gray-500 font-semibold">
                  <span className="bg-gray-100 px-3 py-1 rounded-lg">Adjuntar Imagen</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-lg">Compartir Video</span>
                </div>
                <button type="submit" className="bg-[#1B4D3E] text-white text-xs px-5 py-2 rounded-xl font-bold hover:bg-[#2D6A4F]">
                  Publicar Mensaje
                </button>
              </div>
            </form>
          </div>

          <div className="bg-['E8F0EC] p-6 rounded-3xl border border-['C8D8CE] flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="font-bold text-sm text-['1B4D3E]">Canales Directos de Comunicación</h4>
              <p className="text-xs text-gray-600">Conéctate véa llamada, videollamada o teléfono directo con coordinadores comunitarios.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-['2D6A4F] text-white text-xs px-4 py-2 rounded-xl font-bold">Iniciar Videollamada</button>
              <button className="bg-white border border-['C8D8CE] text-['1B4D3E] text-xs px-4 py-2 rounded-xl font-bold">Llamada Telefónica</button>
            </div>
          </div>

          <div className="space-y-4">
            {postsList.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-['C8D8CE] shadow-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-['1B4D3E]">{item.author}</span>
                  <span className="text-[10px] text-gray-400">{item.time}</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">{item.text}</p>
              </div>
          ))}
          </div>
        </section>
      )}

      {activeTab === "habitos" && (
        <section className="max-w-4xl mx-auto px-6 py-8 w-full space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-['C8D8CE] shadow-xs space-y-3 text-center">
              <span className="text-xs font-bold text-['2D6A4F] uppercase tracking-wider block">Podómetro Diario</span>
              <h3 className="text-3xl font-extrabold text-['1B4D3E]">{steps} Pasos</h3>
              <p className="text-xs text-gray-500">Meta recomendada: 8,000 pasos suaves al déa.</p>
              <button
                onClick={() => setSteps(steps + 500)}
                className="bg-['E8F0EC] border border-['C8D8CE] text-['1B4D3E] text-xs px-4 py-2 rounded-xl font-bold hover:bg-[#D8E6DF