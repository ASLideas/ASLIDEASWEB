export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1B4D3E] font-sans flex flex-col justify-between">
      
      {/* 1. Encabezado Corporativo */}
      <header className="bg-white sticky top-0 z-50 border-b border-[#B08D4B]/20 py-4 px-6 md:px-12 shadow-xs">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img 
              src="/LOGO asl.png" 
              alt="ASL Ideas SpA Logo" 
              className="h-12 w-12 rounded-full object-cover border border-[#B08D4B]/30 shadow-xs"
            />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#1B4D3E]">
                ASL Ideas SpA
              </h1>
              <p className="text-xs text-[#E07A5F] font-semibold">
                Casa Matriz B2B & Software Inclusivo
              </p>
            </div>
          </div>
          <a
            href="#contacto"
            className="bg-[#E07A5F] text-white text-xs md:text-sm px-5 py-2.5 rounded-xl font-bold hover:bg-[#c9654a] transition-all shadow-xs"
          >
            Contacto B2B
          </a>
        </div>
      </header>

      {/* 2. Hero B2B */}
      <section className="max-w-5xl mx-auto text-center px-6 pt-16 pb-12 space-y-6">
        <div className="inline-flex items-center bg-[#E07A5F]/10 border border-[#E07A5F]/30 text-[#E07A5F] text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
          Tecnología Amable & Accesibilidad Cognitiva para Neurodivergencias
        </div>
        
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#1B4D3E] leading-tight">
          Desarrollamos Soluciones Digitales Accesibles para PYMES e Instituciones
        </h2>
        
        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          En ASL Ideas SpA creamos aplicaciones web y herramientas virtuales de alta visibilidad, diseñadas con baja carga sensorial para conectar la ciencia, la salud integrativa y la innovación B2B.
        </p>
      </section>

      {/* 3. Misión y Visión */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-8 bg-white p-8 md:p-10 rounded-3xl border border-[#B08D4B]/20 shadow-xs">
          <div className="space-y-3">
            <div className="inline-block bg-[#1B4D3E]/10 text-[#1B4D3E] text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
              Misión Corporativa
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E]">
              Diseño y Escalabilidad de Software Amable
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Diseñar, desarrollar y comercializar licencias tecnológicas y aplicaciones web accesibles que potencien la presencia virtual de PYMES, profesionales e instituciones, eliminando la sobrecarga sensorial y la frustración tecnológica.
            </p>
          </div>

          <div className="space-y-3">
            <div className="inline-block bg-[#E07A5F]/10 text-[#E07A5F] text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
              Visión Corporativa
            </div>
            <h3 className="text-xl font-bold text-[#1B4D3E]">
              Liderazgo en Accesibilidad UI/UX
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Ser la Casa Matriz de desarrollo tecnológico de referencia en Latinoamérica para entornos de baja fricción cognitiva y neurodivergencias, transformando la salud digital en una experiencia humana, amigable y competitiva.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Tríada Mongen: 3 Pilares con Logos Circulares */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-[#1B4D3E] via-[#2D6A4F] to-[#1B4D3E] text-white p-8 rounded-3xl mb-12 shadow-md border border-[#E07A5F]/30">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E07A5F] bg-white px-4 py-1.5 rounded-full inline-block">
              Ecosistema Integrativo Destacado
            </span>
            <h3 className="text-2xl md:text-4xl font-extrabold pt-2">
              Tríada Mongen
            </h3>
            <p className="text-sm md:text-base text-emerald-100 leading-relaxed">
              El término <strong>"Mongen"</strong> proviene del Mapudungun y significa <strong>"Vida", "Existencia" o "Salud Sanadora"</strong>. Unido con el concepto de <strong>"Tríada"</strong>, representa la unión de nuestros 3 pilares clave de salud integrativa, movimiento adaptado y acompañamiento continuo.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Pilar 1: LAWENMOLL */}
          <div className="bg-white rounded-3xl p-8 border border-[#B08D4B]/20 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-24 h-24 rounded-full bg-[#FAF8F5] border-2 border-[#B08D4B]/30 p-1 flex items-center justify-center overflow-hidden mx-auto md:mx-0 group-hover:scale-105 transition-transform shadow-xs">
                <img src="/lawenmoll_logo.jpg" alt="LAWENMOLL Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <h4 className="text-2xl font-bold text-[#1B4D3E]">
                1. LAWENMOLL
              </h4>
              <p className="text-xs font-semibold text-[#E07A5F]">
                Salud Integrativa & Fichas Clínicas
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Visión & Objetivo:</strong> Proporcionar diagnósticos preventivos inteligentes mediante el Test Metabólico y fichas clínicas encriptadas (Ley N° 21.663), conectando a usuarios con terapeutas y profesionales.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <a
                href="/lawenmoll"
                className="inline-flex items-center justify-center w-full bg-[#1B4D3E] text-white text-xs font-bold py-3 rounded-xl hover:bg-[#2D6A4F] transition-all"
              >
                Ingresar a LAWENMOLL →
              </a>
            </div>
          </div>

          {/* Pilar 2: WELLNESS */}
          <div className="bg-white rounded-3xl p-8 border border-[#B08D4B]/20 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-24 h-24 rounded-full bg-[#FAF8F5] border-2 border-[#B08D4B]/30 p-1 flex items-center justify-center overflow-hidden mx-auto md:mx-0 group-hover:scale-105 transition-transform shadow-xs">
                <img src="/logo wellness.jpg" alt="Wellness Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <h4 className="text-2xl font-bold text-[#1B4D3E]">
                2. WELLNESS
              </h4>
              <p className="text-xs font-semibold text-[#E07A5F]">
                Movimiento Adaptado & Salas Virtuales
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Visión & Objetivo:</strong> Promover el movimiento consciente sin impacto físico. Incluye salas temáticas (Lotus, Cielo, Bosque, Raíz) para regular el sistema nervioso y reducir el cortisol.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <a
                href="/wellness"
                className="inline-flex items-center justify-center w-full bg-[#E07A5F] text-white text-xs font-bold py-3 rounded-xl hover:bg-[#c9654a] transition-all"
              >
                Ingresar a Salas Temáticas →
              </a>
            </div>
          </div>

          {/* Pilar 3: BIENESTAR */}
          <div className="bg-white rounded-3xl p-8 border border-[#B08D4B]/20 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-24 h-24 rounded-full bg-[#FAF8F5] border-2 border-[#B08D4B]/30 p-1 flex items-center justify-center overflow-hidden mx-auto md:mx-0 group-hover:scale-105 transition-transform shadow-xs">
                <img src="/LOGO BIENESTAR.png" alt="Bienestar Logo" className="w-full h-full object-cover rounded-full" />
              </div>
              <h4 className="text-2xl font-bold text-[#1B4D3E]">
                3. BIENESTAR
              </h4>
              <p className="text-xs font-semibold text-[#E07A5F]">
                Acompañamiento Empático & Mensajería Unificada
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong>Visión & Objetivo:</strong> Interfaz de comunicación unificada en WhatsApp y Telegram de baja fricción, diseñada para el acompañamiento cercano, resolución de dudas y contención en salud.
              </p>
            </div>
            <div className="pt-6 border-t border-gray-100 mt-6">
              <a
                href="/bienestar"
                className="inline-flex items-center justify-center w-full bg-[#B08D4B] text-white text-xs font-bold py-3 rounded-xl hover:bg-[#96763D] transition-all"
              >
                Ingresar a Mensajería →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Próximas Soluciones B2B */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#B08D4B]/20 shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#E07A5F] uppercase tracking-wider">
              Innovación Continua
            </span>
            <h3 className="text-2xl font-bold text-[#1B4D3E]">
              Otras Soluciones B2B (En Desarrollo)
            </h3>
            <p className="text-xs text-gray-600 max-w-2xl mx-auto">
              Diseñamos herramientas modulares para PYMES, consultorías UI/UX e integración de IA empática.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div className="border border-dashed border-[#B08D4B]/40 rounded-2xl p-6 bg-[#FAF8F5]">
              <h5 className="text-sm font-bold text-[#1B4D3E]">Biblioteca & Recetarios Digitales</h5>
              <p className="text-xs text-gray-500 mt-1">Módulo descargable de guías de autocuidado y fitoterapia en PDF.</p>
            </div>

            <div className="border border-dashed border-[#B08D4B]/40 rounded-2xl p-6 bg-[#FAF8F5]">
              <h5 className="text-sm font-bold text-[#1B4D3E]">Licencias UI/UX para Neurodivergencias</h5>
              <p className="text-xs text-gray-500 mt-1">Kits de componentes web adaptados bajo normas de accesibilidad cognitiva para neurodivergencias.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Formulario de Contacto B2B */}
      <section id="contacto" className="max-w-4xl mx-auto px-6 pb-20 w-full">
        <div className="bg-white rounded-3xl p-8 border border-[#B08D4B]/30 shadow-xs space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#1B4D3E]">Contacto B2B & Convenios Institucionales</h3>
            <p className="text-xs text-gray-600">¿Eres una PYME o institución? Contáctanos para solicitar licencias o desarrollo a medida.</p>
          </div>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Nombre o Razón Social" className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-[#1B4D3E]" />
              <input type="email" placeholder="Correo corporativo" className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-[#1B4D3E]" />
            </div>
            <textarea placeholder="Cuéntanos sobre tu proyecto o necesidad de software B2B..." rows={4} className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-hidden focus:border-[#1B4D3E]"></textarea>
            <button type="button" className="w-full bg-[#E07A5F] text-white py-3 rounded-xl text-xs font-bold hover:bg-[#c9654a] transition-all shadow-xs">
              Enviar Consulta B2B
            </button>
          </form>
        </div>
      </section>

      {/* Pie de Página */}
      <footer className="bg-white border-t border-gray-100 text-center text-xs text-gray-500 py-6 px-6">
        <p>© ASL Ideas SpA. Todos los derechos reservados. | Casa Matriz de Desarrollo B2B & Salud Digital Inclusiva.</p>
      </footer>
    </main>
  );
}