export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      {/* Encabezado */}
      <header className="bg-white sticky top-0 z-50 border-b border-[#B08D4B]/20 py-4 px-6 md:px-12 shadow-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="ASL Ideas SpA Logo" 
              className="h-10 w-auto object-contain"
            />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#1B4D3E]">
                ASL Ideas SpA
              </h1>
              <p className="text-xs text-[#B08D4B] font-semibold">
                Casa Matriz B2B & Salud Digital Inclusiva
              </p>
            </div>
          </div>
          <a
            href="#contacto"
            className="bg-[#1B4D3E] text-white text-xs md:text-sm px-5 py-2.5 rounded-xl font-medium hover:bg-[#2D6A4F] transition-all shadow-xs"
          >
            Contacto B2B
          </a>
        </div>
      </header>

      {/* Hero Principal */}
      <section className="max-w-5xl mx-auto text-center px-6 pt-16 pb-12 space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#B08D4B]/10 border border-[#B08D4B]/30 text-[#B08D4B] text-xs font-semibold px-4 py-1.5 rounded-full">
          <span>‚ú®</span>
          <span>Tecnolog√≠a Amable & Accesibilidad Cognitiva (TEA & TDAH)</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4D3E] leading-tight">
          Desarrollo de Software B2B & Visibilidad Virtual Accesible
        </h2>
        
        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Casa Matriz tecnol√≥gica dedicada a crear herramientas de visibilidad virtual y salud digital, transformando el autocuidado y conectando la ciencia metab√≥lica con la medicina integrativa.
        </p>
      </section>

      {/* Misi√≥n y Visi√≥n */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl border border-[#B08D4B]/20 shadow-xs">
          <div className="space-y-3">
            <div className="inline-block bg-[#1B4D3E]/10 text-[#1B4D3E] text-xs font-bold px-3 py-1 rounded-lg">
              ÌæØ Nuestra Misi√≥n
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E]">
              Soluciones Tecnol√≥gicas Amables
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Dise√±ar, desarrollar y escalar aplicaciones amigables que unifiquen la evaluaci√≥n metab√≥lica, la medicina integrativa y la visibilidad virtual, eliminando la sobrecarga sensorial para PYMES y usuarios.
            </p>
          </div>

          <div className="space-y-3">
            <div className="inline-block bg-[#B08D4B]/10 text-[#B08D4B] text-xs font-bold px-3 py-1 rounded-lg">
              Ì∫Ä Nuestra Visi√≥n
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E]">
              Liderazgo en Accesibilidad Cognitiva
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Ser el referente en Latinoam√©rica en ecosistemas digitales B2B dise√±ados por y para personas con neurodivergencias y condiciones cr√≥nicas de salud.
            </p>
          </div>
        </div>
      </section>

      {/* Ecosistema de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h3 className="text-2xl font-bold text-center text-[#1B4D3E] mb-8">
          Ecosistema de las 4 Oficinas Virtuales
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs">
            <h4 className="text-lg font-bold text-[#1B4D3E]">ÌøõÔ∏è Casa Matriz B2B</h4>
            <p className="text-xs text-gray-600 mt-2">Licencias tecnol√≥gicas, convenios corporativos y consultor√≠a UI/UX para neurodivergencias.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs">
            <h4 className="text-lg font-bold text-[#1B4D3E]">Ìºø LAWENMOLL</h4>
            <p className="text-xs text-gray-600 mt-2">Test metab√≥lico, medicina integrativa y fichas cl√≠nicas encriptadas (Ley N¬∞ 21.663).</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs">
            <h4 className="text-lg font-bold text-[#1B4D3E]">Ì∑ò‚Äç‚ôÄÔ∏è Wellness Web App</h4>
            <p className="text-xs text-gray-600 mt-2">Movimiento adaptado sin impacto, salas virtuales interactivas y gesti√≥n del estr√©s.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs">
            <h4 className="text-lg font-bold text-[#1B4D3E]">Ì≥ñ Sabidur√≠a Ancestral</h4>
            <p className="text-xs text-gray-600 mt-2">Fitoterapia nativa, comunidad activa, diario mural y recetarios herbolarios en PDF.</p>
          </div>
        </div>
      </section>

      {/* Secci√≥n Contacto B2B */}
      <section id="contacto" className="max-w-4xl mx-auto px-6 pb-20 w-full">
        <div className="bg-white rounded-3xl p-8 border border-[#B08D4B]/30 shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#1B4D3E]">Contacto B2B & Convenios Institucionales</h3>
            <p className="text-xs text-gray-600">Conecta con nuestro equipo para licencias, desarrollo a medida o alianzas estrat√©gicas.</p>
          </div>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nombre completo" className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-[#1B4D3E]" />
              <input type="email" placeholder="Correo corporativo" className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-[#1B4D3E]" />
            </div>
            <textarea placeholder="Cu√©ntanos sobre la necesidad de tu empresa o pyme..." rows={4} className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-[#1B4D3E]"></textarea>
            <button type="button" className="w-full bg-[#1B4D3E] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#2D6A4F] transition-all">
              Enviar Mensaje Corporativo
            </button>
          </form>
        </div>
      </section>

      {/* Pie de P√°gina */}
      <footer className="bg-white border-t border-gray-100 text-center text-xs text-gray-500 py-6 px-6">
        <p>¬© ASL Ideas SpA. Todos los derechos reservados. | Casa Matriz B2B & Salud Digital Inclusiva.</p>
      </footer>
    </main>
  );
}
