'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [triada, setTriada] = useState({
    metabolismo: {
      titulo: "01. Metabolismo Sano",
      descripcion: "Evaluación metabólica inteligente y acompañamiento nutricional amable para condiciones crónicas y autoinmunes.",
      categoria: "Dimensión Metabólica & Nutricional"
    },
    saludMental: {
      titulo: "02. Salud Mental & Emocional",
      descripcion: "Entornos de baja carga sensorial orientados a reducir la ansiedad urbana y acoger la neurodivergencia (TEA & TDAH).",
      categoria: "Dimensión Emocional & Neurodivergencia"
    },
    espiritual: {
      titulo: "03. Dimensión Espiritual & Bienestar",
      descripcion: "Conexión holística con terapeutas certificados, fitoterapia nativa y locales de alimentación consciente.",
      categoria: "Dimensión Holística & Sabiduría"
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempTriada, setTempTriada] = useState(triada);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("asl_triada_data");
    if (saved) {
      try {
        setTriada(JSON.parse(saved));
      } catch (e) {
        console.error("Error al cargar la tríada guardada", e);
      }
    }
  }, []);

  const handleOpenEdit = () => {
    setTempTriada(triada);
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setTriada(tempTriada);
    localStorage.setItem("asl_triada_data", JSON.stringify(tempTriada));
    setSaveSuccess(true);
    setTimeout(() => {
      setIsEditing(false);
      setSaveSuccess(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      <header className="bg-white sticky top-0 z-50 border-b border-[#C8D8CE] py-4 px-6 md:px-12 shadow-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B4D3E] flex items-center justify-center text-white font-bold text-xs tracking-wider">
              ASL
            </div>
            <div>
              <h1 className="text-base font-bold text-[#1B4D3E] tracking-tight">ASL Ideas SpA</h1>
              <p className="text-[11px] text-[#B08D4B] font-semibold uppercase tracking-wider">Salud Digital Inclusiva & Bienestar Integrativo</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenEdit}
              className="bg-[#E8F0EC] border border-[#C8D8CE] text-[#1B4D3E] text-xs px-4 py-2 rounded-xl font-bold hover:bg-[#D8E6DF] transition"
            >
              Editar Tríada
            </button>
            <Link
              href="/lawenmoll"
              className="bg-[#1B4D3E] text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-xs"
            >
              Portal LAWENMOLL
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto text-center px-6 pt-14 pb-8 space-y-4">
        <div className="inline-flex items-center bg-[#E8F0EC] border border-[#C8D8CE] text-[#1B4D3E] text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
          Tecnología Amable con Accesibilidad Sensorial & Cognitiva
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4D3E] leading-tight tracking-tight">
          Plataforma de Salud Digital Inclusiva
        </h2>

        <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed font-normal">
          Ecosistema institucional diseñado para acompañar el autocuidado, eliminar la sobrecarga sensorial y conectar la ciencia médica con la salud integrativa.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-6 w-full">
        <div className="bg-white rounded-3xl p-8 border border-[#C8D8CE] shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-5">
            <div>
              <span className="text-[11px] font-bold text-[#B08D4B] uppercase tracking-wider">Eje Fundamental</span>
              <h3 className="text-2xl font-bold text-[#1B4D3E]">Tríada de Salud Integrativa</h3>
              <p className="text-xs text-gray-600">Las tres dimensiones esenciales para abordar la salud corporal, emocional y holística.</p>
            </div>
            <button
              onClick={handleOpenEdit}
              className="bg-[#1B4D3E] text-white text-xs px-5 py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-xs"
            >
              Editar Contenido
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#C8D8CE] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#1B4D3E] bg-[#E8F0EC] border border-[#C8D8CE] px-2.5 py-1 rounded-md inline-block">01</span>
                <h4 className="font-bold text-base text-[#1B4D3E]">{triada.metabolismo.titulo}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{triada.metabolismo.descripcion}</p>
              </div>
              <div className="pt-3 border-t border-gray-200/60 text-[11px] font-bold text-[#52796F]">
                {triada.metabolismo.categoria}
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#C8D8CE] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#1B4D3E] bg-[#E8F0EC] border border-[#C8D8CE] px-2.5 py-1 rounded-md inline-block">02</span>
                <h4 className="font-bold text-base text-[#1B4D3E]">{triada.saludMental.titulo}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{triada.saludMental.descripcion}</p>
              </div>
              <div className="pt-3 border-t border-gray-200/60 text-[11px] font-bold text-[#52796F]">
                {triada.saludMental.categoria}
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#C8D8CE] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#1B4D3E] bg-[#E8F0EC] border border-[#C8D8CE] px-2.5 py-1 rounded-md inline-block">03</span>
                <h4 className="font-bold text-base text-[#1B4D3E]">{triada.espiritual.titulo}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{triada.espiritual.descripcion}</p>
              </div>
              <div className="pt-3 border-t border-gray-200/60 text-[11px] font-bold text-[#B08D4B]">
                {triada.espiritual.categoria}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6 w-full">
        <div className="text-center mb-8 space-y-1">
          <h3 className="text-2xl font-bold text-[#1B4D3E]">Las 4 Oficinas Virtuales del Ecosistema</h3>
          <p className="text-xs text-gray-600">Acceso a los portales institucionales de ASL Ideas SpA.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#C8D8CE] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider">Unidad B2B</span>
              <h4 className="text-lg font-bold text-[#1B4D3E]">Casa Matriz B2B</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Gestión corporativa, convenios B2B y licencias tecnológicas para instituciones.</p>
            </div>
            <div className="pt-4 border-t border-gray-100 mt-4">
              <Link href="/admin" className="text-xs font-bold text-[#B08D4B] hover:underline">Panel B2B / Admin &rarr;</Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#C8D8CE] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider">Salud Integrativa</span>
              <h4 className="text-lg font-bold text-[#1B4D3E]">LAWENMOLL</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Vitrina virtual, Fichas Clínicas protegidas y Sala Virtual de Agendamiento.</p>
            </div>
            <div className="pt-4 border-t border-gray-100 mt-4">
              <Link href="/lawenmoll" className="text-xs font-bold text-[#2D6A4F] hover:underline">Ingresar a LAWENMOLL &rarr;</Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#C8D8CE] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider">Pausa Activa</span>
              <h4 className="text-lg font-bold text-[#1B4D3E]">Wellness Web App</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Movimiento adaptado sin impacto y Salas Virtuales temáticas de bienestar.</p>
            </div>
            <div className="pt-4 border-t border-gray-100 mt-4">
              <Link href="/wellness" className="text-xs font-bold text-[#B08D4B] hover:underline">Explorar Rutinas &rarr;</Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#C8D8CE] shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Comunidad</span>
              <h4 className="text-lg font-bold text-[#1B4D3E]">Sabiduría Ancestral</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Fitoterapia nativa, Diario Mural comunitario y recetarios en PDF.</p>
            </div>
            <div className="pt-4 border-t border-gray-100 mt-4">
              <Link href="/comunidad" className="text-xs font-bold text-amber-800 hover:underline">Ver Comunidad &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {isEditing && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full border border-[#C8D8CE] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider">Editor Interactivo</span>
                <h3 className="text-lg font-bold text-[#1B4D3E]">Editar Tríada de Salud Integrativa</h3>
              </div>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600 font-bold text-sm">Cerrar</button>
            </div>

            {!saveSuccess ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] space-y-2">
                  <label className="block text-xs font-bold text-[#1B4D3E]">Pilar 1: Metabolismo Sano</label>
                  <input
                    type="text"
                    value={tempTriada.metabolismo.titulo}
                    onChange={(e) => setTempTriada({ ...tempTriada, metabolismo: { ...tempTriada.metabolismo, titulo: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#1B4D3E]"
                  />
                  <textarea
                    rows={2}
                    value={tempTriada.metabolismo.descripcion}
                    onChange={(e) => setTempTriada({ ...tempTriada, metabolismo: { ...tempTriada.metabolismo, descripcion: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] space-y-2">
                  <label className="block text-xs font-bold text-[#1B4D3E]">Pilar 2: Salud Mental & Emocional</label>
                  <input
                    type="text"
                    value={tempTriada.saludMental.titulo}
                    onChange={(e) => setTempTriada({ ...tempTriada, saludMental: { ...tempTriada.saludMental, titulo: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#1B4D3E]"
                  />
                  <textarea
                    rows={2}
                    value={tempTriada.saludMental.descripcion}
                    onChange={(e) => setTempTriada({ ...tempTriada, saludMental: { ...tempTriada.saludMental, descripcion: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#C8D8CE] space-y-2">
                  <label className="block text-xs font-bold text-[#1B4D3E]">Pilar 3: Dimensión Espiritual & Bienestar</label>
                  <input
                    type="text"
                    value={tempTriada.espiritual.titulo}
                    onChange={(e) => setTempTriada({ ...tempTriada, espiritual: { ...tempTriada.espiritual, titulo: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#1B4D3E]"
                  />
                  <textarea
                    rows={2}
                    value={tempTriada.espiritual.descripcion}
                    onChange={(e) => setTempTriada({ ...tempTriada, espiritual: { ...tempTriada.espiritual, descripcion: e.target.value } })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsEditing(false)} className="w-1/2 bg-gray-100 text-gray-700 py-2.5 rounded-xl text-xs font-semibold">Cancelar</button>
                  <button type="submit" className="w-1/2 bg-[#1B4D3E] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#2D6A4F] transition">Guardar Cambios</button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-sm font-bold">OK</div>
                <h4 className="font-bold text-base text-[#1B4D3E]">Tríada Actualizada con Éxito</h4>
                <p className="text-xs text-gray-600">Los cambios se han registrado y se muestran de inmediato en el portal.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-[#C8D8CE] text-center text-xs text-gray-500 py-6 px-6 mt-8">
        <p>&copy; {new Date().getFullYear()} ASL Ideas SpA. Todos los derechos reservados. | Plataforma diseñada con Accesibilidad Sensorial.</p>
      </footer>
    </main>
  );
}
