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
                Casa Matriz & Salud Digital Inclusiva
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
          <span>Desarrollo de Software B2B & Visibilidad Virtual Accesible</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4D3E] leading-tight">
          Impulsamos la Visibilidad Digital de PYMES y Salud Integrativa
        </h2>
        
        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Como Casa Matriz tecnol√≥gica, desarrollamos aplicaciones amables y herramientas de alto impacto para destacar en las competencias de hoy, conectando la innovaci√≥n B2B con la accesibilidad cognitiva.
        </p>
      </section>

      {/* Secci√≥n Misi√≥n, Visi√≥n y Casa Matriz */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl border border-[#B08D4B]/20 shadow-xs">
          <div className="space-y-3">
            <div className="inline-block bg-[#1B4D3E]/10 text-[#1B4D3E] text-xs font-bold px-3 py-1 rounded-lg">
              ÌæØ Nuestra Misi√≥n
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E]">
              Herramientas de Visibilidad Virtual B2B
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Dise√±ar y escalar soluciones tecnol√≥gicas amables que entreguen a PYMES, terapeutas e instituciones las mejores herramientas virtuales de presencia, eliminando la sobrecarga sensorial y diferenci√°ndose en el mercado actual.
            </p>
          </div>

          <div className="space-y-3">
            <div className="inline-block bg-[#B08D4B]/10 text-[#B08D4B] text-xs font-bold px-3 py-1 rounded-lg">
              Ì∫Ä Nuestra Visi√≥n
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E]">
              Liderazgo en Tecnolog√≠a Inclusiva
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Posicionar a ASL Ideas SpA en Latinoam√©rica como la empresa matriz de desarrollo de software accesible por excelencia, transformando la tecnolog√≠a en una experiencia placentera, humana y altamente competitiva.
            </p>
          </div>
        </div>
      </section>

      {/* Ecosistema de las 3 Primeras Herramientas + Casa Matriz */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h3 className="text-2xl font-bold text-center text-[#1B4D3E] mb-8">
          Nuestras Soluciones de Software y Soluciones Activas
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Casa Matriz B2B */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1B4D3E]/10 flex items-center justify-center text-[#1B4D3E] font-bold text-lg">
                ÌøõÔ∏è
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E]">
                Casa Matriz B2B
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Desarrollo de apps para PYMES, licencias tecnol√≥gicas, convenios institucionales y consultor√≠a en posicionamiento virtual adaptado.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <span className="text-xs font-semibold text-[#B08D4B]">
                Servicios B2B ‚Üí
              </span>
            </div>
          </div>

          {/* Herramienta 1: LAWENMOLL */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F] font-bold text-lg">
                Ìºø
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E]">
                LAWENMOLL
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Salud Integrativa & Fichas Cl√≠nicas encriptadas (Ley N¬∞ 21.663). Test de Bienestar Inteligente y vitrina para profesionales de salud alternativa.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <span className="text-xs font-semibold text-[#B08D4B]">
                Ver Portal ‚Üí
              </span>
            </div>
          </div>

          {/* Herramienta 2: Wellness Web App */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#B08D4B]/10 flex items-center justify-center text-[#B08D4B] font-bold text-lg">
                Ì∑ò‚Äç‚ôÄÔ∏è
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E]">
                Wellness Web App
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Movimiento adaptado sin impacto, videoteca interactiva y Salas Virtuales tem√°ticas para la gesti√≥n del estr√©s y autocuidado.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <span className="text-xs font-semibold text-[#B08D4B]">
                Explorar Rutinas ‚Üí
              </span>
            </div>
          </div>

          {/* Herramienta 3: Sabidur√≠a Ancestral */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-bold text-lg">
                Ì≥ñ
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E]">
                Sabidur√≠a Ancestral
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Fitoterapia nativa, comunidad activa, Diario Mural interactivo y divulgaci√≥n herbolaria descargable en PDF.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <span className="text-xs font-semibold text-[#B08D4B]">
                Ver Recetarios ‚Üí
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Pie de P√°gina */}
      <footer className="bg-white border-t border-gray-100 text-center text-xs text-gray-500 py-6 px-6">
        <p>¬© ASL Ideas SpA. Todos los derechos reservados. | Casa Matriz de Desarrollo B2B & Salud Digital Inclusiva.</p>
      </footer>
    </main>
  );
}
