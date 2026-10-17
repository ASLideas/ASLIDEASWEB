'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function WellnessApp() {
  const [selectedCondition, setSelectedCondition] = useState("Todas");
  const [showLiveModal, setShowLiveModal] = useState(false);
  const [showClassSuccess, setShowClassSuccess] = useState(false);
  const [newClassTitle, setNewClassTitle] = useState("");

  const recipes = [
    {
      title: "Bowl Antiinflamatorio de Cúrcuma y Quinua",
      afeccion: "Antiinflamatoria",
      time: "20 min",
      dificultad: "Fácil",
      descripcion: "Visualmente rico en antioxidantes, ideal para molestias articulares y digestivas.",
      ingredientes: ["Quinua cocida", "Cúrcuma fresca", "Vegetales de hoja verde", "Aceite de oliva extra virgen"]
    },
    {
      title: "Batido Verde Bajo en Índice Glucémico",
      afeccion: "Diabetes",
      time: "10 min",
      dificultad: "Muy Fácil",
      descripcion: "Combinación equilibrada de espinaca, pepino, chía y manzana verde sin sobrecarga de glucosa.",
      ingredientes: ["Espinaca orgánica", "Pepino", "Semillas de chía", "Manzana verde", "Agua purificada"]
    },
    {
      title: "Infusión Calmante Digestiva de Manzanilla y Menta",
      afeccion: "Salud Digestiva",
      time: "8 min",
      dificultad: "Fácil",
      descripcion: "Acompañamiento visual para reducir la hinchazón abdominal y relajar el colon.",
      ingredientes: ["Flores de manzanilla nativa", "Hojas de menta piperita", "Gotas de limón"]
    },
    {
      title: "Crema de Zapallo y Jengibre Cardioprotectora",
      afeccion: "Hipertensión",
      time: "25 min",
      dificultad: "Intermedia",
      descripcion: "Sopa baja en sodio, rica en potasio y vasodilatadores naturales para la salud arterial.",
      ingredientes: ["Zapallo camote", "Jengibre rallado", "Ajo", "Cebolla", "Caldo vegetal casero"]
    },
    {
      title: "Snack de Frutos Secos e Infusión de Pasiflora",
      afeccion: "Salud Mental & Estrés",
      time: "5 min",
      dificultad: "Fácil",
      descripcion: "Aporte de magnesio y triptófano para favorecer la neuroprotección y serenidad.",
      ingredientes: ["Nueces", "Almendras activadas", "Infusión de pasiflora y toronjil"]
    }
  ];

  const filteredRecipes = selectedCondition === "Todas"
    ? recipes
    : recipes.filter(r => r.afeccion === selectedCondition);

  const handlePublishClass = (e: React.FormEvent) => {
    e.preventDefault();
    setShowClassSuccess(true);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      <header className="bg-white border-b border-[#C8D8CE] py-4 px-6 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#B08D4B] bg-white p-0.5">
              <img src="/logo wellness.jpg" alt="Logo Wellness" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1B4D3E]">Wellness Web App</h1>
              <p className="text-xs text-[#B08D4B] font-semibold">Apoyo Visual para Cuerpo, Mente & Equilibrio</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLiveModal(true)}
              className="bg-[#B08D4B] text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-[#8C6D34] transition shadow-xs"
            >
              Publicar Clase en Vivo
            </button>
            <Link href="/" className="text-xs text-[#1B4D3E] hover:underline font-semibold">
              &larr; Volver a Portada
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-10 text-center space-y-4">
        <span className="bg-[#E8F0EC] border border-[#C8D8CE] text-[#1B4D3E] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Herramienta Virtual de Salud Visual
        </span>
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#1B4D3E] leading-snug">
          Recetas Saludables Visuales & Rutinas de Ejercicio para Toda Afección
        </h2>
        <p className="text-xs md:text-sm text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Plataforma orientada a usuarios y profesionales de la comunidad fitness natural y bienestar, diseñada para mostrar de forma amigable recetas a la mano y transmitir clases en vivo que mejoren la calidad de vida.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-6 w-full space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#1B4D3E]">Recetario Visual por Afección o Requerimiento</h3>
              <p className="text-xs text-gray-500">Selecciona tu afección para filtrar las guías de alimentación saludable a la mano.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Todas", "Antiinflamatoria", "Diabetes", "Salud Digestiva", "Hipertensión", "Salud Mental & Estrés"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCondition(cat)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                    selectedCondition === cat
                      ? "bg-[#1B4D3E] text-white"
                      : "bg-[#FAF8F5] text-gray-700 border border-[#C8D8CE] hover:bg-[#E8F0EC]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((rec, idx) => (
              <div key={idx} className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE] flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider block">
                    Afección: {rec.afeccion}
                  </span>
                  <h4 className="font-bold text-sm text-[#1B4D3E]">{rec.title}</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">{rec.descripcion}</p>

                  <div className="pt-2">
                    <span className="text-[11px] font-bold text-[#1B4D3E] block mb-1">Ingredientes Principales:</span>
                    <ul className="text-[11px] text-gray-600 space-y-1">
                      {rec.ingredientes.map((ing, i) => (
                        <li key={i}>• {ing}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200 text-[11px] font-semibold text-gray-500">
                  <span>Tiempo: {rec.time}</span>
                  <span>Dificultad: {rec.dificultad}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-6 w-full">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-bold text-[#1B4D3E]">Videoteca de Rutinas de Ejercicio & Movimiento Adaptado</h3>
            <p className="text-xs text-gray-500">Apoyo visual paso a paso para ejercitar cuerpo y mente sin sobrecarga articular.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE] space-y-3">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider">Mapeo Corporal</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Rutina Movilidad Articular Sin Impacto</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ejercicios guiados de 12 minutos para activar rodillas, caderas y columna con respiración rítmica.
              </p>
              <button className="w-full bg-[#1B4D3E] text-white text-xs py-2 rounded-xl font-bold hover:bg-[#2D6A4F] transition">
                Reproducir Guía Visual
              </button>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE] space-y-3">
              <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider">Equilibrio Mental</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Pausa Activa & Despresurización Sensorial</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Secuencia de 8 minutos diseñada para reducir el cortisol, relajar cervicales y disminuir la fatiga laboral.
              </p>
              <button className="w-full bg-[#1B4D3E] text-white text-xs py-2 rounded-xl font-bold hover:bg-[#2D6A4F] transition">
                Reproducir Guía Visual
              </button>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE] space-y-3">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Fuerza Suave</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Fortalecimiento Isométrico Postural</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Ejercicios estáticos asistidos con silla o muro para mejorar tono muscular en adultos mayores y movilidad reducida.
              </p>
              <button className="w-full bg-[#1B4D3E] text-white text-xs py-2 rounded-xl font-bold hover:bg-[#2D6A4F] transition">
                Reproducir Guía Visual
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-6 w-full">
        <div className="bg-[#E8F0EC] border border-[#C8D8CE] p-8 rounded-3xl space-y-4 text-center">
          <h3 className="text-xl font-bold text-[#1B4D3E]">¿Eres Profesional de la Salud o Fitness Natural?</h3>
          <p className="text-xs text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Publica tus clases en vivo, transmite tus rutinas en tiempo real e imparte talleres de bienestar para nuestra comunidad.
          </p>
          <button
            onClick={() => setShowLiveModal(true)}
            className="bg-[#1B4D3E] text-white text-xs px-8 py-3 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-xs"
          >
            Publicar Clase o Taller en Vivo
          </button>
        </div>
      </section>

      {showLiveModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full border border-[#C8D8CE] shadow-xl space-y-5">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider">Comunidad Fitness Natural</span>
                <h3 className="text-base font-bold text-[#1B4D3E]">Programar Clase o Taller en Vivo</h3>
              </div>
              <button onClick={() => { setShowLiveModal(false); setShowClassSuccess(false); }} className="text-gray-400 hover:text-gray-600 font-bold text-xs">
                Cerrar
              </button>
            </div>

            {!showClassSuccess ? (
              <form onSubmit={handlePublishClass} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Nombre del Profesional / Instructor</label>
                  <input required type="text" placeholder="Ej: Prof. Gonzalo Herrera" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Título de la Clase o Taller</label>
                  <input
                    required
                    type="text"
                    value={newClassTitle}
                    onChange={(e) => setNewClassTitle(e.target.value)}
                    placeholder="Ej: Yoga Suave & Nutrición Antiinflamatoria"
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Fecha de Transmisión</label>
                    <input required type="date" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Horario</label>
                    <input required type="time" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Enlace de Transmisión (Zoom / YouTube Live / Meet)</label>
                  <input required type="url" placeholder="[suspicious link removed]..." className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]" />
                </div>
                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={() => setShowLiveModal(false)} className="w-1/2 bg-gray-100 text-gray-700 py-2.5 rounded-xl text-xs font-semibold">Cancelar</button>
                  <button type="submit" className="w-1/2 bg-[#1B4D3E] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#2D6A4F]">Publicar Clase</button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-xs font-bold">OK</div>
                <h4 className="font-bold text-sm text-[#1B4D3E]">Clase Publicada Exitosamente</h4>
                <p className="text-xs text-gray-600">La sesión quedó registrada en la cartelera de Wellness Web App para los usuarios.</p>
                <button onClick={() => { setShowLiveModal(false); setShowClassSuccess(false); }} className="bg-[#1B4D3E] text-white text-xs px-6 py-2 rounded-xl font-bold">Entendido</button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Wellness Web App - ASL Ideas SpA | Cuidado Integral del Cuerpo y Mente.</p>
      </footer>
    </main>
  );
}
