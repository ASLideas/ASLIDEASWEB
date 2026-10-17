'use client';

import React, { useState } from "react";
import Link from "next/link";

export default function BienestarPage() {
  const [activeTab, setActiveTab] = useState("comunidad");
  const [waterGlasses, setWaterGlasses] = useState(4);
  const [steps, setSteps] = useState(5420);
  const [scannedFood, setScannedFood] = useState(null);

  const [postsList, setPostsList] = useState([
    { author: "Elena R.", text: "¡Comparto mi receta de infusión de cedrón y toronjil para una tarde serena!", time: "Hace 15 min" },
    { author: "Marcos T.", text: "Caminata matutina adaptada completada. ¡5,000 pasos a ritmo suave!", time: "Hace 1 hora" }
  ]);
  const [newPostText, setNewPostText] = useState("");
  const [morfeoPlaying, setMorfeoPlaying] = useState(null);
  const [medicalSuccess, setMedicalSuccess] = useState(false);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    setPostsList([{ author: "Usuario Activo", text: newPostText, time: "Ahora mismo" }, ...postsList]);
    setNewPostText("");
  };

  const handleSimulateScan = () => {
    setScannedFood("Ensalada de Quinoa con Palta y Semillas - 320 kcal (Aporte óptimo en Magnesio)");
  };

  const handleMedicalBooking = (e) => {
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
              <p className="text-xs text-amber-800 font-semibold">Comunidad, Hábitos Saludables & Descanso Morfeo</p>
            </div>
          </div>

          <Link href="/" className="text-xs text-[#1B4D3E] hover:underline font-semibold">
            &larr; Volver a Portada
          </Link>
        </div>
      </header>

      <section className="bg-white border-b border-[#C8D8CE] px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 text-xs font-bold justify-center">
          <button
            onClick={() => setActiveTab("comunidad")}
            className={activeTab === "comunidad" ? "px-4 py-2 rounded-xl transition bg-[#1B4D3E] text-white" : "px-4 py-2 rounded-xl transition bg-[#FAF8F5] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Comunidad & Muro
          </button>
          <button
            onClick={() => setActiveTab("habitos")}
            className={activeTab === "habitos" ? "px-4 py-2 rounded-xl transition bg-[#1B4D3E] text-white" : "px-4 py-2 rounded-xl transition bg-[#FAF8F5] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Pasos, Agua & Escáner
          </button>
          <button
            onClick={() => setActiveTab("citas")}
            className={activeTab === "citas" ? "px-4 py-2 rounded-xl transition bg-[#1B4D3E] text-white" : "px-4 py-2 rounded-xl transition bg-[#FAF8F5] text-gray-700 hover:bg-[#E8F0EC]"}
          >
            Agendar Horas Médicas
          </button>
          <button
            onClick={() => setActiveTab("shopping")}
            className={activeTab === "shopping" ? "px-4 py-2 rounded-xl transition bg-[#1B4D3E] text-white" : "px-4 py-2 rounded-xl transition bg-[#FAF8F5] text-gray-700 hover:bg-[#E8F0EC]"}
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
          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#1B4D3E]">Muro de Comunicación & Compartir Experiencias</h3>
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

          <div className="bg-[#E8F0EC] p-6 rounded-3xl border border-[#C8D8CE] flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Canales Directos de Comunicación</h4>
              <p className="text-xs text-gray-600">Conéctate vía llamada, videollamada o teléfono directo con coordinadores comunitarios.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-[#2D6A4F] text-white text-xs px-4 py-2 rounded-xl font-bold">Iniciar Videollamada</button>
              <button className="bg-white border border-[#C8D8CE] text-[#1B4D3E] text-xs px-4 py-2 rounded-xl font-bold">Llamada Telefónica</button>
            </div>
          </div>

          <div className="space-y-4">
            {postsList.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xs text-[#1B4D3E]">{item.author}</span>
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
            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3 text-center">
              <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider block">Podómetro Diario</span>
              <h3 className="text-3xl font-extrabold text-[#1B4D3E]">{steps} Pasos</h3>
              <p className="text-xs text-gray-500">Meta recomendada: 8,000 pasos suaves al día.</p>
              <button
                onClick={() => setSteps(steps + 500)}
                className="bg-[#E8F0EC] border border-[#C8D8CE] text-[#1B4D3E] text-xs px-4 py-2 rounded-xl font-bold hover:bg-[#D8E6DF]"
              >
                + Registrar 500 Pasos de Caminata
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-3 text-center">
              <span className="text-xs font-bold text-[#B08D4B] uppercase tracking-wider block">Control de Hidratación</span>
              <h3 className="text-3xl font-extrabold text-[#1B4D3E]">{waterGlasses} Vasos de Agua</h3>
              <p className="text-xs text-gray-500">Equivalente a {(waterGlasses * 0.25).toFixed(2)} Litros consumidos.</p>
              <button
                onClick={() => setWaterGlasses(waterGlasses + 1)}
                className="bg-[#FAF8F5] border border-[#C8D8CE] text-[#1B4D3E] text-xs px-4 py-2 rounded-xl font-bold hover:bg-amber-50"
              >
                + Tomar 1 Vaso de Agua (250 ml)
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[#1B4D3E]">Escáner Inteligente de Alimentos & Calorías</h3>
            <p className="text-xs text-gray-600">Simula el escaneo visual de tu plato o alimento para conocer el balance calórico e ingredientes.</p>
            <button
              onClick={handleSimulateScan}
              className="bg-[#1B4D3E] text-white text-xs px-6 py-2.5 rounded-xl font-bold hover:bg-[#2D6A4F]"
            >
              Simular Escaneo de Plato de Comida
            </button>

            {scannedFood && (
              <div className="p-4 bg-[#E8F0EC] border border-[#C8D8CE] rounded-2xl text-xs text-[#1B4D3E] font-medium">
                <strong>Resultado del Escaneo:</strong> {scannedFood}
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === "citas" && (
        <section className="max-w-3xl mx-auto px-6 py-8 w-full">
          <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-5">
            <div className="border-b border-gray-100 pb-3">
              <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Red de Atención Médica</span>
              <h3 className="text-lg font-bold text-[#1B4D3E]">Agendar Hora Médica en Consultorio, Hospital o Centro Privado</h3>
            </div>

            {!medicalSuccess ? (
              <form onSubmit={handleMedicalBooking} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Centro de Salud Requerido</label>
                  <select required className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]">
                    <option value="">Selecciona una opción</option>
                    <option value="consultorio">Consultorio / CESFAM de Atención Primaria</option>
                    <option value="hospital">Hospital Público Regional</option>
                    <option value="privado">Centro Médico / Clínica Privada</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Nombre Paciente</label>
                    <input required type="text" placeholder="Ej: Juan Pérez" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1B4D3E] mb-1">RUT / Identificación</label>
                    <input required type="text" placeholder="Ej: 12.345.678-9" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Fecha Preferente</label>
                    <input required type="date" className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Horario</label>
                    <select required className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none">
                      <option value="09:00">09:00 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="16:00">04:00 PM</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full bg-[#1B4D3E] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#2D6A4F]">
                  Confirmar Reserva de Hora Médica
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto text-xs font-bold">OK</div>
                <h4 className="font-bold text-sm text-[#1B4D3E]">Hora Médica Agendada Exitosamente</h4>
                <p className="text-xs text-gray-600">Se ha registrado el cupo en el centro seleccionado y enviado comprobante al usuario.</p>
                <button onClick={() => setMedicalSuccess(false)} className="bg-[#1B4D3E] text-white text-xs px-6 py-2 rounded-xl font-bold">Agendar Otra Hora</button>
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === "shopping" && (
        <section className="max-w-6xl mx-auto px-6 py-8 w-full space-y-6">
          <div className="border-b border-gray-200 pb-3">
            <h3 className="text-lg font-bold text-[#1B4D3E]">Shopping PYMES & Emprendimientos de Salud Natural</h3>
            <p className="text-xs text-gray-600">Vitrina de comercios asociados, herbolaria nativa, cosmética limpia y productos orgánicos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Herbolaria Nativa</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Matico y Menta Piperita Orgánica</h4>
              <p className="text-xs text-gray-600">Hojas seleccionadas para infusiones digestivas y cicatrización natural.</p>
              <button className="w-full bg-amber-800 text-white text-xs py-2 rounded-xl font-bold hover:bg-amber-900">
                Contactar Emprendimiento PYME
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Cosmética Limpia</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Ungüento de Caléndula y Aceite de Rosa Mosqueta</h4>
              <p className="text-xs text-gray-600">Bálsamo regenerador artesanal libre de parabenos y químicos agresivos.</p>
              <button className="w-full bg-amber-800 text-white text-xs py-2 rounded-xl font-bold hover:bg-amber-900">
                Contactar Emprendimiento PYME
              </button>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-3">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">Alimentación Consciente</span>
              <h4 className="font-bold text-sm text-[#1B4D3E]">Miel Multifloral Pura y Propóleo Nivel Farmacéutico</h4>
              <p className="text-xs text-gray-600">Fortalecimiento del sistema inmune producido por apicultores locales.</p>
              <button className="w-full bg-amber-800 text-white text-xs py-2 rounded-xl font-bold hover:bg-amber-900">
                Contactar Emprendimiento PYME
              </button>
            </div>
          </div>
        </section>
      )}

      {activeTab === "morfeo" && (
        <section className="max-w-4xl mx-auto px-6 py-8 w-full space-y-6">
          <div className="bg-[#1C2541] text-white p-8 rounded-3xl space-y-4 shadow-lg">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest block">Módulo Morfeo</span>
            <h3 className="text-2xl font-bold">Música de Relajación, Historias & Meditación para Sueño REM</h3>
            <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
              Diseñado especialmente para personas con mal dormir o insomnio. Activa frecuencias sonoras calmantes y tips de descanso para inducir un sueño profundo y reparador.
            </p>

            {morfeoPlaying && (
              <div className="p-4 bg-amber-900/40 border border-amber-400/30 rounded-2xl text-xs font-bold text-amber-200">
                Reproduciendo ahora: {morfeoPlaying}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <button
                onClick={() => setMorfeoPlaying("Sonido de Lluvia Suave en el Bosque Nativo (60 min)")}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-left border border-white/10 transition space-y-2"
              >
                <h4 className="font-bold text-xs">Música Relajante</h4>
                <p className="text-[11px] text-gray-300">Lluvia suave & ondas delta</p>
              </button>

              <button
                onClick={() => setMorfeoPlaying("Historia Narrada: Susurro entre los Bosques del Sur (30 min)")}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-left border border-white/10 transition space-y-2"
              >
                <h4 className="font-bold text-xs">Historias para Dormir</h4>
                <p className="text-[11px] text-gray-300">Narración serena de baja cadencia</p>
              </button>

              <button
                onClick={() => setMorfeoPlaying("Meditación Guiada: Despresurización Sensorial y Respiración 4-7-8")}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-left border border-white/10 transition space-y-2"
              >
                <h4 className="font-bold text-xs">Meditación Sueño REM</h4>
                <p className="text-[11px] text-gray-300">Inducción al descanso profundo</p>
              </button>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-white border-t border-[#C8D8CE] py-6 px-6 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Bienestar App - ASL Ideas SpA | Red de Autocuidado, Comunidad y Descanso Morfeo.</p>
      </footer>
    </main>
  );
}
