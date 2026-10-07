export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between selection:bg-[#B08D4B]/20">
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#B08D4B]/20 shadow-xs py-4 px-6 md:px-12">
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
              <p className="text-xs text-[#B08D4B] font-semibold tracking-wide">
                Salud Digital Inclusiva & Bienestar Integrativo
              </p>
            </div>
          </div>
          <a
            href="#contacto"
            className="bg-[#1B4D3E] text-white text-xs md:text-sm px-5 py-2.5 rounded-xl font-medium shadow-sm hover:bg-[#2D6A4F] transition-all duration-200"
          >
            Contacto B2B
          </a>
        </div>
      </header>

      <section className="max-w-5xl mx-auto text-center px-6 pt-16 pb-12 space-y-6">
        <div className="inline-flex items-center gap-2 bg-[#B08D4B]/10 border border-[#B08D4B]/30 text-[#B08D4B] text-xs font-semibold px-4 py-1.5 rounded-full">
          <span>‚ú®</span>
          <span>Accesibilidad Cognitiva & Baja Carga Sensorial (TEA & TDAH)</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4D3E] leading-tight tracking-tight">
          Plataforma de Salud Digital Inclusiva
        </h2>
        
        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Ecosistema de tecnologia amable, disenado para acompanar el autocuidado, eliminar la frustracion urbana y conectar la ciencia metabolica con la sabiduria integrativa.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1B4D3E]/10 flex items-center justify-center text-[#1B4D3E] font-bold text-lg">
                ÌøõÔ∏è
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E] group-hover:text-[#2D6A4F] transition-colors">
                Casa Matriz B2B
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Gestion corporativa, convenios institucionales, desarrollo de licencias tecnologicas y consultoria UI/UX adaptada para neurodivergencias.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <span className="text-xs font-semibold text-[#B08D4B] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ver Soluciones B2B ‚Üí
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F] font-bold text-lg">
                Ìºø
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E] group-hover:text-[#2D6A4F] transition-colors">
                LAWENMOLL
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Salud Integrativa & Fichas Clinicas encriptadas (Ley N¬∞ 21.663). Test de Bienestar Inteligente, evaluacion metabolica y agenda medica.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <span className="text-xs font-semibold text-[#B08D4B] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ingresar a Portal ‚Üí
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#B08D4B]/10 flex items-center justify-center text-[#B08D4B] font-bold text-lg">
                Ì∑ò‚Äç‚ôÄÔ∏è
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E] group-hover:text-[#2D6A4F] transition-colors">
                Wellness App
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Movimiento adaptado sin impacto, videoteca interactiva y Salas Virtuales tematicas (Lotus, Cielo, Bosque, Raiz) para reduccion de cortisol.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <span className="text-xs font-semibold text-[#B08D4B] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explorar Rutinas ‚Üí
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#B08D4B]/20 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-bold text-lg">
                Ì≥ñ
              </div>
              <h3 className="text-xl font-bold text-[#1B4D3E] group-hover:text-[#2D6A4F] transition-colors">
                Sabiduria Ancestral
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Fitoterapia nativa, comunidad activa, Diario Mural "Secretos de la Abuela" y recetarios herbolarios descargables en PDF.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <span className="text-xs font-semibold text-[#B08D4B] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Ver Recetarios ‚Üí
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-100 text-center text-xs text-gray-500 py-6 px-6">
        <p>¬© ASL Ideas SpA. Todos los derechos reservados. | Plataforma disenada con Accesibilidad Sensorial.</p>
      </footer>
    </main>
  );
}
