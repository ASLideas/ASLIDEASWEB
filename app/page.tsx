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
                Salud Digital Inclusiva & Bienestar Integrativo
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
          <span>✨</span>
          <span>Accesibilidad Cognitiva & Baja Carga Sensorial (TEA & TDAH)</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4D3E] leading-tight">
          Plataforma de Salud Digital Inclusiva
        </h2>
        
        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Ecosistema de tecnología amable, diseñado para acompañar el autocuidado, eliminar la frustración urbana y conectar la ciencia metabólica con la sabiduría integrativa.
        </p>
      </section>

      {/* Ecosistema de las 4 Oficinas Virtuales */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Oficina 1: Casa Matriz */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1B4D3E]/10 flex items-center justify-center text-[#1B4D3E] font-bold text-lg">
                ���️
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E]">
                Casa Matriz B2B
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Gestión corporativa, convenios institucionales, licencias tecnológicas y consultoría UI/UX adaptada para neurodivergencias.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <span className="text-xs font-semibold text-[#B08D4B]">
                Ver Soluciones B2B →
              </span>
            </div>
          </div>

          {/* Oficina 2: LAWENMOLL */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F] font-bold text-lg">
                ���
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E]">
                LAWENMOLL
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Salud Integrativa & Fichas Clínicas encriptadas (Ley N° 21.663). Test de Bienestar Inteligente, evaluación metabólica y agenda médica.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <span className="text-xs font-semibold text-[#B08D4B]">
                Ingresar a Portal →
              </span>
            </div>
          </div>

          {/* Oficina 3: Wellness Web App */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#B08D4B]/10 flex items-center justify-center text-[#B08D4B] font-bold text-lg">
                ���‍♀️
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E]">
                Wellness Web App
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Movimiento adaptado sin impacto, videoteca interactiva y Salas Virtuales temáticas (Lotus, Cielo, Bosque, Raíz) para reducción de cortisol.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <span className="text-xs font-semibold text-[#B08D4B]">
                Explorar Rutinas →
              </span>
            </div>
          </div>

          {/* Oficina 4: Sabiduría Ancestral */}
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-bold text-lg">
                ���
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E]">
                Sabiduría Ancestral
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Fitoterapia nativa, comunidad activa, Diario Mural "Secretos de la Abuela" y recetarios herbolarios descargables en PDF.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <span className="text-xs font-semibold text-[#B08D4B]">
                Ver Recetarios →
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Pie de Página */}
      <footer className="bg-white border-t border-gray-100 text-center text-xs text-gray-500 py-6 px-6">
        <p>© ASL Ideas SpA. Todos los derechos reservados. | Plataforma diseñada con Accesibilidad Sensorial.</p>
      </footer>
    </main>
  );
}
