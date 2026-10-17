'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [ideasData, setIdeasData] = useState({
    titulo: "ASL Ideas SpA - Ecosistema de Salud Digital Inclusiva",
    descripcion: "Plataforma diseñada para visibilizar alternativas integrativas, conectar la medicina tradicional con disciplinas de bienestar y ofrecer herramientas amables con accesibilidad cognitiva y sensorial.",
    metabolismo: "Acompañamiento amable para el cuidado metabólico y enfermedades crónicas.",
    saludMental: "Atención en entornos de baja carga sensorial para reducir la ansiedad y acoger la neurodivergencia.",
    espiritual: "Conexión holística con terapeutas, fitoterapia nativa y locales de alimentación consciente."
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(ideasData);

  useEffect(() => {
    const saved = localStorage.getItem("asl_ideas_content");
    if (saved) {
      try {
        setIdeasData(JSON.parse(saved));
      } catch (e) {
        console.error("Error al cargar datos", e);
      }
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIdeasData(tempData);
    localStorage.setItem("asl_ideas_content", JSON.stringify(tempData));
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      {/* Encabezado Principal */}
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 md:px-12 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B4D3E] flex items-center justify-center text-white font-bold text-xs">
              ASL
            </div>
            <div>
              <h1 className="text-base font-bold text-[#1B4D3E]">ASL Ideas SpA</h1>
              <p className="text-[11px] text-[#B08D4B] font-semibold">Salud Digital Inclusiva & Bienestar Integrativo</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => { setTempData(ideasData); setIsEditing(!isEditing); }}
              className="bg-[#E8F0EC] border border-[#C8D8CE] text-[#1B4D3E] text-xs px-4 py-2 rounded-xl font-bold hover:bg-[#D8E6DF] transition"
            >
              {isEditing ? "Ver Vista Previa" : "Editar Contenido de Ideas"}
            </button>
            <Link
              href="/lawenmoll"
              className="bg-[#2D6A4F] text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-[#1B4D3E] transition shadow-xs"
            >
              Ir a Portal LAWENMOLL &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* Editor / Visualizador de Contenido */}
      <section className="max-w-6xl mx-auto px-6 py-8 w-full space-y-8">
        {isEditing ? (
          <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-[#C8D8CE] shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-lg font-bold text-[#1B4D3E]">Panel de Edición de Contenido - ASL Ideas</h3>
              <p className="text-xs text-gray-500">Modifica los textos principales para la presentación de la plataforma.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Título Principal</label>
                <input
                  type="text"
                  value={tempData.titulo}
                  onChange={(e) => setTempData({ ...tempData, titulo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Descripción General</label>
                <textarea
                  rows={3}
                  value={tempData.descripcion}
                  onChange={(e) => setTempData({ ...tempData, descripcion: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Enfoque Metabolismo</label>
                  <textarea
                    rows={3}
                    value={tempData.metabolismo}
                    onChange={(e) => setTempData({ ...tempData, metabolismo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Enfoque Salud Mental</label>
                  <textarea
                    rows={3}
                    value={tempData.saludMental}
                    onChange={(e) => setTempData({ ...tempData, saludMental: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Enfoque Espiritual</label>
                  <textarea
                    rows={3}
                    value={tempData.espiritual}
                    onChange={(e) => setTempData({ ...tempData, espiritual: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-100 text-gray-700 text-xs px-5 py-2.5 rounded-xl font-semibold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#1B4D3E] text-white text-xs px-6 py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F]"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <span className="bg-[#E8F0EC] border border-[#C8D8CE] text-[#1B4D3E] text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                Ecosistema de Salud Digital
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1B4D3E]">{ideasData.titulo}</h2>
              <p className="text-sm text-gray-700 max-w-3xl mx-auto leading-relaxed">{ideasData.descripcion}</p>
            </div>

            {/* Tríada de Bienestar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-2">
                <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">Metabolismo</span>
                <p className="text-xs text-gray-600 leading-relaxed">{ideasData.metabolismo}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-2">
                <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">Salud Mental</span>
                <p className="text-xs text-gray-600 leading-relaxed">{ideasData.saludMental}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-2">
                <span className="text-xs font-bold text-[#B08D4B] uppercase tracking-wider">Espiritualidad</span>
                <p className="text-xs text-gray-600 leading-relaxed">{ideasData.espiritual}</p>
              </div>
            </div>

            {/* Acceso directo a LAWENMOLL */}
            <div className="bg-[#E8F0EC] border border-[#C8D8CE] p-8 rounded-3xl text-center space-y-4">
              <h3 className="text-xl font-bold text-[#1B4D3E]">Visita la Vitrina Virtual de LAWENMOLL</h3>
              <p className="text-xs text-gray-600 max-w-2xl mx-auto">
                Conoce a los especialistas, terapeutas, instituciones y locales de alimentación consciente registrados en nuestra plataforma virtual.
              </p>
              <Link
                href="/lawenmoll"
                className="inline-block bg-[#2D6A4F] text-white text-xs px-8 py-3 rounded-xl font-bold hover:bg-[#1B4D3E] transition shadow-xs"
              >
                Ingresar a LAWENMOLL &rarr;
              </Link>
            </div>
          </div>
        )}
      </section>

      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} ASL Ideas SpA. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
