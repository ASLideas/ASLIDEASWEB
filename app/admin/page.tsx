'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminConsole() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState("gestor");

  // Estado editable para módulos
  const [modulesData, setModulesData] = useState({
    lawenmoll: "Vitrina Virtual de Medicina Integrativa & Fichas Clínicas encriptadas bajo Ley N° 21.663.",
    wellness: "Salas Virtuales interactivas (Lotus, Cielo, Bosque, Raíz) y movimiento adaptado sin impacto.",
    bienestar: "Fitoterapia nativa, Diario Mural comunitarios y recetarios herbolarios descargables en PDF.",
    b2b: "Licencias tecnológicas, convenios municipales y consultoría UI/UX con accesibilidad Ley TEA."
  });

  const [saveAlert, setSaveAlert] = useState(false);

  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("asl_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
    const saved = localStorage.getItem("asl_modules_content");
    if (saved) {
      try { setModulesData(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "1234" || passwordInput === "asl2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("asl_admin_auth", "true");
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("asl_admin_auth");
  };

  const handleSaveModules = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("asl_modules_content", JSON.stringify(modulesData));
    setSaveAlert(true);
    setTimeout(() => setSaveAlert(false), 2000);
  };

  // PANTALLA DE BLOQUEO POR CLAVE
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-[#C8D8CE] shadow-xl max-w-md w-full space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#1B4D3E] text-white flex items-center justify-center mx-auto text-xs font-bold tracking-wider">
              ASL
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider">Acceso Restringido</span>
              <h2 className="text-xl font-bold text-[#1B4D3E]">Consola Administradora B2B</h2>
              <p className="text-xs text-gray-500">Ingresa la clave de seguridad para acceder a la gestión privada.</p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#1B4D3E] mb-1">Clave de Seguridad</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Ingresa la clave (ej: 1234)"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
              />
              {passwordError && (
                <p className="text-[11px] text-red-600 font-bold mt-1">Clave incorrecta. Intenta con 1234 o asl2026.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1B4D3E] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#2D6A4F] transition shadow-xs"
            >
              Ingresar a la Consola
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-gray-500 hover:underline font-semibold">
              &larr; Volver a la Portada Pública
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // PANTALLA PRINCIPAL CONSOLA ADMINISTRADORA
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col md:flex-row">
      {/* Sidebar Lateral */}
      <aside className="w-full md:w-64 bg-white border-r border-[#C8D8CE] p-6 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-[#C8D8CE] p-1 flex items-center justify-center">
              <img src="/LOGO asl.png" alt="Logo ASL Ideas" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-[#1B4D3E]">ASL Ideas SpA</h1>
              <p className="text-[10px] text-[#B08D4B] font-semibold uppercase tracking-wider">Consola Administradora</p>
              <span className="inline-block mt-1 text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Sesión Privada Activa
              </span>
            </div>
          </div>

          {/* Menú de Pestañas Funcionales */}
          <nav className="space-y-1.5 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("casa-matriz")}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition ${activeTab === "casa-matriz" ? "bg-[#1B4D3E] text-white font-bold" : "text-gray-700 hover:bg-gray-100"}`}
            >
              Casa Matriz & Contabilidad B2B
            </button>

            <button
              onClick={() => setActiveTab("especialistas")}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition ${activeTab === "especialistas" ? "bg-[#1B4D3E] text-white font-bold" : "text-gray-700 hover:bg-gray-100"}`}
            >
              Especialistas LAWENMOLL
            </button>

            <button
              onClick={() => setActiveTab("estadisticas")}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition ${activeTab === "estadisticas" ? "bg-[#1B4D3E] text-white font-bold" : "text-gray-700 hover:bg-gray-100"}`}
            >
              Estadísticas de Aplicaciones
            </button>

            <button
              onClick={() => setActiveTab("gestor")}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition ${activeTab === "gestor" ? "bg-[#1B4D3E] text-white font-bold" : "text-gray-700 hover:bg-gray-100"}`}
            >
              Gestor de Actualizaciones Apps
            </button>

            <button
              onClick={() => setActiveTab("agente-ia")}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition ${activeTab === "agente-ia" ? "bg-[#1B4D3E] text-white font-bold" : "text-gray-700 hover:bg-gray-100"}`}
            >
              Agente IA Redes & Monetización
            </button>
          </nav>
        </div>

        {/* Correos Oficiales & Cierre de Sesión */}
        <div className="space-y-3 pt-4 border-t border-gray-100 text-[11px] text-gray-600">
          <div>
            <p className="font-bold text-[#1B4D3E]">Correo B2B:</p>
            <p className="font-mono text-[10px] text-gray-700">contacto@aslideas.cl</p>
          </div>
          <div>
            <p className="font-bold text-[#1B4D3E]">Correo LAWENMOLL:</p>
            <p className="font-mono text-[10px] text-gray-700">contacto@lawenmoll.cl</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-gray-100 text-gray-700 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition mt-2 text-xs"
          >
            Cerrar Sesión Segura
          </button>
        </div>
      </aside>

      {/* Área Principal de Contenido Dinámico */}
      <main className="flex-1 p-6 md:p-10 space-y-8">
        <header className="bg-white p-6 rounded-3xl border border-[#C8D8CE] shadow-xs flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-[#C8D8CE] p-0.5">
              <img src="/LOGO asl.png" alt="Logo ASL" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1B4D3E]">Administración & Actualizaciones de Módulos</h2>
              <p className="text-xs text-gray-500">Consola privada con baja carga sensorial para la gestión unificada</p>
            </div>
          </div>
          <Link href="/" className="text-xs text-[#2D6A4F] hover:underline font-bold">
            Ver Portada Pública &rarr;
          </Link>
        </header>

        {/* PESTAÑA 1: GESTOR DE ACTUALIZACIONES APPS */}
        {activeTab === "gestor" && (
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#1B4D3E]">Control de Módulos & Publicaciones</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Ingresa a cada aplicación para realizar modificaciones de texto, añadir recetarios PDF o actualizar horarios de salas virtuales sin requerir código adicional.
                </p>
              </div>
              {saveAlert && (
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-lg">
                  Cambios Guardados
                </span>
              )}
            </div>

            <form onSubmit={handleSaveModules} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#C8D8CE] space-y-2">
                  <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block">Módulo LAWENMOLL</span>
                  <h4 className="font-bold text-sm text-[#1B4D3E]">Editar LAWENMOLL</h4>
                  <textarea
                    rows={3}
                    value={modulesData.lawenmoll}
                    onChange={(e) => setModulesData({ ...modulesData, lawenmoll: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#C8D8CE] space-y-2">
                  <span className="text-[10px] font-bold text-[#B08D4B] uppercase tracking-wider block">Módulo Wellness</span>
                  <h4 className="font-bold text-sm text-[#1B4D3E]">Editar Wellness App</h4>
                  <textarea
                    rows={3}
                    value={modulesData.wellness}
                    onChange={(e) => setModulesData({ ...modulesData, wellness: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#C8D8CE] space-y-2">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Módulo Bienestar</span>
                  <h4 className="font-bold text-sm text-[#1B4D3E]">Editar Bienestar</h4>
                  <textarea
                    rows={3}
                    value={modulesData.bienestar}
                    onChange={(e) => setModulesData({ ...modulesData, bienestar: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#C8D8CE] space-y-2">
                  <span className="text-[10px] font-bold text-[#1B4D3E] uppercase tracking-wider block">Módulo B2B</span>
                  <h4 className="font-bold text-sm text-[#1B4D3E]">Editar Casa Matriz B2B</h4>
                  <textarea
                    rows={3}
                    value={modulesData.b2b}
                    onChange={(e) => setModulesData({ ...modulesData, b2b: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#1B4D3E]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-[#1B4D3E] text-white text-xs px-8 py-3 rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-xs"
                >
                  Guardar Todos los Cambios en Vivo
                </button>
              </div>
            </form>
          </section>
        )}

        {/* PESTAÑA 2: CASA MATRIZ & CONTABILIDAD B2B */}
        {activeTab === "casa-matriz" && (
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-[#1B4D3E]">Casa Matriz & Contabilidad B2B</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE]">
                <span className="text-xs text-gray-500 font-semibold block">Licencias B2B Activas</span>
                <p className="text-2xl font-extrabold text-[#1B4D3E] mt-1">12 Instituciones</p>
              </div>
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE]">
                <span className="text-xs text-gray-500 font-semibold block">Convenios Municipales</span>
                <p className="text-2xl font-extrabold text-[#2D6A4F] mt-1">4 Municipalidades</p>
              </div>
              <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#C8D8CE]">
                <span className="text-xs text-gray-500 font-semibold block">Estado de Auditoría UI/UX</span>
                <p className="text-2xl font-extrabold text-[#B08D4B] mt-1">Ley TEA / WCAG Ok</p>
              </div>
            </div>
          </section>
        )}

        {/* PESTAÑA 3: ESPECIALISTAS LAWENMOLL */}
        {activeTab === "especialistas" && (
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-[#1B4D3E]">Directorio de Especialistas LAWENMOLL</h3>
            <div className="space-y-3">
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-xs text-[#1B4D3E]">Dra. Claudia Morales - Medicina Integrativa</h4>
                  <p className="text-[11px] text-gray-500">Especialista en condiciones crónicas y metabolismo.</p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-lg">Validado</span>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-xs text-[#1B4D3E]">Lic. Andrés Silva - Nutrición Consciente</h4>
                  <p className="text-[11px] text-gray-500">Acompañamiento amable sin pautas restrictivas.</p>
                </div>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-lg">Validado</span>
              </div>
            </div>
          </section>
        )}

        {/* PESTAÑA 4: ESTADÍSTICAS DE APLICACIONES */}
        {activeTab === "estadisticas" && (
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-[#1B4D3E]">Métricas de Impacto de Aplicaciones</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
                <span className="text-xs font-bold text-[#2D6A4F]">Fichas Clínicas Protegidas (Ley N° 21.663)</span>
                <p className="text-3xl font-extrabold text-[#1B4D3E]">1,248 Registros</p>
                <p className="text-[11px] text-gray-500">Cifradas y encriptadas bajo estándares normativos.</p>
              </div>
              <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
                <span className="text-xs font-bold text-[#B08D4B]">Usuarios Activos en Plataforma</span>
                <p className="text-3xl font-extrabold text-[#1B4D3E]">3,850 Pacientes</p>
                <p className="text-[11px] text-gray-500">Navegación con baja carga sensorial.</p>
              </div>
            </div>
          </section>
        )}

        {/* PESTAÑA 5: AGENTE IA REDES & MONETIZACIÓN */}
        {activeTab === "agente-ia" && (
          <section className="bg-white p-6 md:p-8 rounded-3xl border border-[#C8D8CE] shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-[#1B4D3E]">Agente Virtual IA & Automatizaciones</h3>
            <p className="text-xs text-gray-600">
              Generación automatizada de recetarios PDF, respuestas de orientación empática e integración con redes B2B.
            </p>
            <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#C8D8CE] space-y-2">
              <span className="text-xs font-bold text-[#1B4D3E]">Estado del Prompt Maestro</span>
              <p className="text-xs text-gray-600">Configurado con la historia fundacional, leyes Ley TEA y Ley N° 21.663.</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
