'use client';

import React, { useState } from 'react';

export default function AdminConsole() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'contabilidad' | 'especialistas' | 'metricas' | 'actualizaciones' | 'redes'>('contabilidad');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'ASL2026Admin' || password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Clave de acceso incorrecta. Esta ruta es de uso exclusivo para la Administradora.');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#F4F7F5] flex items-center justify-center p-6 font-sans">
        <div className="bg-white p-8 rounded-2xl border border-[#C8D8CE] shadow-md max-w-md w-full space-y-6 text-[#2D5A4C]">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 rounded-full border-2 border-[#E07A5F] overflow-hidden bg-white mx-auto shadow-xs flex items-center justify-center p-1">
              <img src="/LOGO_asl.png" alt="Logo Oficial ASL Ideas SpA" className="w-full h-full object-cover rounded-full" />
            </div>
            <h1 className="text-xl font-bold text-[#2D5A4C]">Consola Privada de Administración</h1>
            <p className="text-xs text-[#52796F]">Acceso exclusivo para la Administradora Fundadora</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#2D5A4C] mb-1">Clave de Acceso Privada</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu clave privada"
                className="w-full px-4 py-2.5 border border-[#C8D8CE] rounded-xl text-xs focus:outline-hidden focus:border-[#52796F] bg-[#FAF8F5]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#52796F] text-white py-3 rounded-xl font-semibold text-xs hover:bg-[#41675B] transition shadow-xs"
            >
              Ingresar a la Consola
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-[10px] text-[#84A59D]">Protegido bajo encriptación SSL TLS 1.3 &amp; Supabase Auth</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-[#2D5A4C] font-sans flex flex-col md:flex-row">
      {/* Sidebar Verde Clarito Suave (#E8F0EC) en lugar de Verde Oscuro (#1B4D3E) */}
      <aside className="w-full md:w-80 bg-[#E8F0EC] border-r border-[#C8D8CE] p-6 flex flex-col justify-between">
        <div>
          <div className="mb-8 border-b border-[#C8D8CE] pb-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 rounded-full border-2 border-[#E07A5F] overflow-hidden bg-white p-0.5 shadow-xs">
                <img src="/LOGO_asl.png" alt="Logo ASL Ideas" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h1 className="text-base font-bold text-[#2D5A4C] tracking-wide">ASL Ideas SpA</h1>
                <span className="text-[11px] text-[#E07A5F] font-bold">Consola Administradora</span>
              </div>
            </div>
            <p className="text-[11px] text-[#52796F]">Sesión Privada Activa</p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('contabilidad')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center space-x-3 ${
                activeTab === 'contabilidad' ? 'bg-[#52796F] text-white shadow-xs' : 'hover:bg-[#D5E3DB] text-[#2D5A4C]'
              }`}
            >
              <svg className="w-4 h-4 text-[#E07A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span>Casa Matriz &amp; Contabilidad B2B</span>
            </button>

            <button
              onClick={() => setActiveTab('especialistas')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center space-x-3 ${
                activeTab === 'especialistas' ? 'bg-[#52796F] text-white shadow-xs' : 'hover:bg-[#D5E3DB] text-[#2D5A4C]'
              }`}
            >
              <svg className="w-4 h-4 text-[#E07A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Especialistas LAWENMOLL</span>
            </button>

            <button
              onClick={() => setActiveTab('metricas')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center space-x-3 ${
                activeTab === 'metricas' ? 'bg-[#52796F] text-white shadow-xs' : 'hover:bg-[#D5E3DB] text-[#2D5A4C]'
              }`}
            >
              <svg className="w-4 h-4 text-[#E07A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Estadísticas de Aplicaciones</span>
            </button>

            <button
              onClick={() => setActiveTab('actualizaciones')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center space-x-3 ${
                activeTab === 'actualizaciones' ? 'bg-[#52796F] text-white shadow-xs' : 'hover:bg-[#D5E3DB] text-[#2D5A4C]'
              }`}
            >
              <svg className="w-4 h-4 text-[#E07A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Gestor de Actualizaciones Apps</span>
            </button>

            <button
              onClick={() => setActiveTab('redes')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center space-x-3 ${
                activeTab === 'redes' ? 'bg-[#52796F] text-white shadow-xs' : 'hover:bg-[#D5E3DB] text-[#2D5A4C]'
              }`}
            >
              <svg className="w-4 h-4 text-[#E07A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Agente IA Redes &amp; Monetización</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-[#C8D8CE] text-[11px] text-[#52796F] space-y-2">
          <p>Correo B2B: <span className="text-[#2D5A4C] font-mono font-semibold">contacto@aslideas.cl</span></p>
          <p>Correo LAWENMOLL: <span className="text-[#2D5A4C] font-mono font-semibold">contacto@lawenmoll.cl</span></p>
          <button onClick={() => setIsAuthenticated(false)} className="text-[#E07A5F] hover:underline text-xs font-semibold pt-2 block">
            Cerrar Sesión Segura
          </button>
        </div>
      </aside>

      {/* Área Principal con Tonos Suaves y Claros */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl bg-[#FAF8F5]">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b border-[#C8D8CE]">
          <div className="flex items-center gap-4">
            <img src="/LOGO_asl.png" alt="Logo ASL" className="w-10 h-10 rounded-full object-cover border border-[#E07A5F]" />
            <div>
              <h2 className="text-xl font-bold text-[#2D5A4C]">
                {activeTab === 'contabilidad' && 'Casa Matriz: Área Contable & Archivos Excel'}
                {activeTab === 'especialistas' && 'Auditoría de Documentos de Especialistas (LAWENMOLL)'}
                {activeTab === 'metricas' && 'Estadísticas Mercado & Desempeño de Apps'}
                {activeTab === 'actualizaciones' && 'Administración & Actualizaciones de Módulos'}
                {activeTab === 'redes' && 'Agente Automatizado para Redes Sociales & Monetización'}
              </h2>
              <p className="text-xs text-[#52796F] mt-0.5">Consola privada con baja carga sensorial para la gestión unificada</p>
            </div>
          </div>
        </header>

        {activeTab === 'contabilidad' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] shadow-xs">
                <p className="text-xs text-[#52796F] font-semibold">Convenios B2B Activos</p>
                <p className="text-2xl font-bold text-[#2D5A4C] mt-1">8 Municipalidades / PYMES</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] shadow-xs">
                <p className="text-xs text-[#52796F] font-semibold">Facturación Licencias Software</p>
                <p className="text-2xl font-bold text-[#E07A5F] mt-1">\$4.250.000 CLP</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#C8D8CE] shadow-xs">
                <p className="text-xs text-[#52796F] font-semibold">Descarga Contable</p>
                <button onClick={() => alert('Generando archivo Excel (.xlsx) con el balance contable unificado...')} className="mt-2 text-xs bg-[#52796F] text-white px-3.5 py-2 rounded-xl font-medium hover:bg-[#41675B] transition shadow-xs">
                  ��� Descargar Excel (.xlsx)
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#C8D8CE] p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-[#2D5A4C] text-base">Registro de Ingresos &amp; Contratos B2B</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8F0EC] text-[#52796F]">
                      <th className="pb-3">Cliente / Entidad</th>
                      <th className="pb-3">Tipo de Licencia</th>
                      <th className="pb-3">Estado Contable</th>
                      <th className="pb-3">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8F0EC]">
                    <tr>
                      <td className="py-3 font-semibold">Comercio Asociado Santiago Centro</td>
                      <td className="py-3">Software Accesible UI/UX</td>
                      <td className="py-3"><span className="bg-emerald-100 text-emerald-800 text-[10px] px-2.5 py-0.5 rounded-full font-bold">Al Día</span></td>
                      <td className="py-3"><button className="text-[#52796F] underline font-semibold hover:text-[#2D5A4C]">Ver Contrato</button></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold">Municipalidad Programa Inclusión</td>
                      <td className="py-3">Módulo Wellness + Salud Integrativa</td>
                      <td className="py-3"><span className="bg-emerald-100 text-emerald-800 text-[10px] px-2.5 py-0.5 rounded-full font-bold">Al Día</span></td>
                      <td className="py-3"><button className="text-[#52796F] underline font-semibold hover:text-[#2D5A4C]">Ver Contrato</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'especialistas' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-4">
              <h3 className="font-bold text-[#2D5A4C] text-base">Recepción &amp; Validación de Certificados Médicos</h3>
              <p className="text-xs text-[#52796F]">
                Documentación cargada por profesionales del área de la salud y terapias integrativas. Almacenamiento encriptado bajo la Ley N° 21.663.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 border border-[#C8D8CE] rounded-xl bg-[#E8F0EC]/40 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-xs text-[#2D5A4C]">Dra. Carolina Morales - Medicina Integrativa</span>
                    <p className="text-[11px] text-[#52796F] mt-0.5">Certificado de Título + Registro SIS cargado (PDF)</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => alert('Aprobado y derivado a base de datos LAWENMOLL.')} className="bg-[#52796F] text-white text-[11px] px-3.5 py-1.5 rounded-xl font-semibold hover:bg-[#41675B]">
                      Aprobar
                    </button>
                    <button className="bg-gray-100 text-gray-700 text-[11px] px-3.5 py-1.5 rounded-xl font-semibold hover:bg-gray-200">
                      Revisar PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metricas' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-[#C8D8CE] shadow-xs">
                <h3 className="font-bold text-[#2D5A4C] text-sm mb-4">Uso de Aplicaciones en el Mercado</h3>
                <ul className="space-y-3 text-xs text-[#52796F]">
                  <li className="flex justify-between"><span>1. LAWENMOLL (Test Metabólico)</span><span className="font-bold text-[#2D5A4C]">42% del tráfico</span></li>
                  <li className="flex justify-between"><span>2. Wellness Web App (Salas Virtuales)</span><span className="font-bold text-[#2D5A4C]">31% del tráfico</span></li>
                  <li className="flex justify-between"><span>3. Sabiduría Ancestral (PDFs Herbolaria)</span><span className="font-bold text-[#2D5A4C]">18% del tráfico</span></li>
                  <li className="flex justify-between"><span>4. Casa Matriz B2B (Licencias)</span><span className="font-bold text-[#2D5A4C]">9% del tráfico</span></li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#C8D8CE] shadow-xs">
                <h3 className="font-bold text-[#2D5A4C] text-sm mb-4">Adherencia sin Sobrecarga Sensorial</h3>
                <p className="text-xs text-[#52796F] leading-relaxed mb-4">
                  El diseño amable ha reducido la tasa de abandono temprano al 14% (frente al 55% promedio del mercado tradicional).
                </p>
                <div className="w-full bg-[#E8F0EC] h-3 rounded-full overflow-hidden">
                  <div className="bg-[#52796F] h-full w-[86%]"></div>
                </div>
                <span className="text-[10px] text-[#E07A5F] font-bold mt-2 block">86% Retención de Usuarios Activos</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'actualizaciones' && (
          <div className="bg-white p-6 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-4">
            <h3 className="font-bold text-[#2D5A4C] text-base">Control de Módulos &amp; Publicaciones</h3>
            <p className="text-xs text-[#52796F]">
              Ingresa a cada aplicación para realizar modificaciones de texto, añadir recetarios PDF o actualizar horarios de salas virtuales sin requerir código adicional.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <button onClick={() => alert('Abriendo editor de LAWENMOLL...')} className="p-4 border border-[#C8D8CE] rounded-xl bg-[#E8F0EC]/30 text-xs font-bold text-[#2D5A4C] hover:border-[#E07A5F]">
                Editar LAWENMOLL
              </button>
              <button onClick={() => alert('Abriendo editor de Wellness Web App...')} className="p-4 border border-[#C8D8CE] rounded-xl bg-[#E8F0EC]/30 text-xs font-bold text-[#2D5A4C] hover:border-[#E07A5F]">
                Editar Wellness App
              </button>
              <button onClick={() => alert('Abriendo editor de Sabiduría Ancestral...')} className="p-4 border border-[#C8D8CE] rounded-xl bg-[#E8F0EC]/30 text-xs font-bold text-[#2D5A4C] hover:border-[#E07A5F]">
                Editar Sabiduría Ancestral
              </button>
              <button onClick={() => alert('Abriendo editor de Casa Matriz...')} className="p-4 border border-[#C8D8CE] rounded-xl bg-[#E8F0EC]/30 text-xs font-bold text-[#2D5A4C] hover:border-[#E07A5F]">
                Editar Casa Matriz B2B
              </button>
            </div>
          </div>
        )}

        {activeTab === 'redes' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#C8D8CE] shadow-xs space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-[#2D5A4C] text-base">Agente Virtual de IA para Redes &amp; Monetización</h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">● Automatización Activa</span>
              </div>
              <p className="text-xs text-[#52796F]">
                El agente redacta contenido con accesibilidad cognitiva y calcula el rendimiento económico proyectado en tus canales.
              </p>

              <div className="p-4 bg-[#E8F0EC]/40 rounded-xl border border-[#C8D8CE] space-y-3">
                <span className="text-xs font-bold text-[#E07A5F]">Próxima Publicación Sugerida por la IA:</span>
                <p className="text-xs text-[#2D5A4C] italic">
                  &quot;En ASL Ideas SpA desarrollamos tecnología con baja carga sensorial para promover la salud integrativa y la inclusión laboral. ¿Buscas adaptar tu pyme a la Ley TEA?&quot;
                </p>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => alert('Publicación programada para LinkedIn B2B e Instagram.')} className="bg-[#52796F] text-white text-xs px-4 py-2 rounded-xl font-semibold hover:bg-[#41675B]">
                    Aprobar &amp; Programar Publicación
                  </button>
                  <button className="bg-gray-100 text-gray-700 text-xs px-4 py-2 rounded-xl font-semibold hover:bg-gray-200">
                    Reescribir
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
