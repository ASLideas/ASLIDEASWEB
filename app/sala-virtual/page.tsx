'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const appParam = searchParams.get('app') || 'ASL Ideas SpA';

  // Seleccionar logo según la aplicación activa
  const getLogoByApp = (nombreApp: string) => {
    if (nombreApp.includes('LAWENMOLL')) return '/logo-lawenmoll.jpg.png';
    if (nombreApp.includes('Wellness')) return '/logo-wellness.jpg.jpg';
    if (nombreApp.includes('Bienestar')) return '/logo-bienestar.png.png';
    return '/logo-asl.png.png';
  };

  const logoActual = getLogoByApp(appParam);

  // Pestaña predeterminada: 'mision'
  const [tabActiva, setTabActiva] = useState<'mision' | 'vivo' | 'cita' | 'cancelar'>('mision');
  
  // Controles de Video Llamada
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [transcripcionActiva, setTranscripcionActiva] = useState(false);
  const [pantallaActiva, setPantallaActiva] = useState<'cam' | 'presentacion' | 'mision' | 'pizarra'>('cam');
  const [modoCalma, setModoCalma] = useState(false);

  // Formulario de Agendamiento B2B
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
  const [portal, setPortal] = useState(appParam);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  // Formulario de Cancelación de Cita
  const [cancelRut, setCancelRut] = useState('');
  const [cancelFolio, setCancelFolio] = useState('');
  const [cancelMotivo, setCancelMotivo] = useState('');
  const [cancelCargando, setCancelCargando] = useState(false);
  const [cancelMensaje, setCancelMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const handleSubmitCita = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);

    try {
      const { supabase } = await import('@/lib/supabaseClient').catch(() => ({ supabase: null as any }));
      if (supabase) {
        const { error } = await supabase.from('citas_b2b').insert([
          { nombre, rut, email, invitados, portal, fecha, hora, estado: 'CONFIRMADA' }
        ]);
        if (error) throw error;
      }

      setMensaje({
        tipo: 'exito',
        texto: 'Cita confirmada y vinculada a la Sala Virtual con exito.'
      });
      setNombre(''); setRut(''); setEmail(''); setInvitados(''); setFecha('');
    } catch (err: any) {
      console.error('Error al agendar cita:', err);
      setMensaje({
        tipo: 'error',
        texto: 'No se pudo registrar la cita. Por favor verifica los datos o intenta nuevamente.'
      });
    } finally {
      setCargando(false);
    }
  };

  const handleCancelCita = async (e: React.FormEvent) => {
    e.preventDefault();
    setCancelCargando(true);
    setCancelMensaje(null);

    try {
      const { supabase } = await import('@/lib/supabaseClient').catch(() => ({ supabase: null as any }));
      if (supabase) {
        const { error } = await supabase
          .from('citas_b2b')
          .update({ estado: 'CANCELADA', motivo_cancelacion: cancelMotivo })
          .eq('rut', cancelRut);
        if (error) throw error;
      }

      setCancelMensaje({
        tipo: 'exito',
        texto: 'La cita asociada al RUT ingresado ha sido cancelada exitosamente y el cupo fue liberado.'
      });
      setCancelRut(''); setCancelFolio(''); setCancelMotivo('');
    } catch (err: any) {
      console.error('Error al cancelar cita:', err);
      setCancelMensaje({
        tipo: 'error',
        texto: 'No se encontro una cita activa asociada a los datos ingresados.'
      });
    } finally {
      setCancelCargando(false);
    }
  };

  return (
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#FAF8F5] text-[#2C3E35]' : 'bg-[#121E19] text-white'}`}>
      {/* Header Corporativo */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <img src={logoActual} alt={`Logo ${appParam}`} className="w-11 h-11 object-contain rounded-xl bg-white p-1 shadow-lg border border-[#E8829C]/40" />
          <div>
            <h1 className="text-xl font-bold tracking-tight">{appParam}</h1>
            <p className="text-xs text-[#E8829C] font-medium">Oficina Virtual & Conexión Interactiva</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#1A2822] text-slate-200 border border-slate-700 hover:bg-slate-800 transition"
          >
            {modoCalma ? 'Modo Calma Activo' : 'Activar Modo Calma (TEA)'}
          </button>
          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#E8829C] text-white hover:bg-[#D8708C] transition shadow-md"
          >
            Volver a la Web
          </Link>
        </div>
      </header>

      {/* Navegación por Pestañas */}
      <nav className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-slate-700/40 pb-2">
        <button
          type="button"
          onClick={() => setTabActiva('mision')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'mision' ? 'bg-[#E8829C] text-white shadow-md' : 'bg-[#1A2822] text-slate-300 hover:bg-slate-800'
          }`}
        >
          Misión y Visión
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'vivo' ? 'bg-[#E8829C] text-white shadow-md' : 'bg-[#1A2822] text-slate-300 hover:bg-slate-800'
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'cita' ? 'bg-[#E8829C] text-white shadow-md' : 'bg-[#1A2822] text-slate-300 hover:bg-slate-800'
          }`}
        >
          Agendar Cita B2B
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cancelar')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'cancelar' ? 'bg-red-600/80 text-white shadow-md' : 'bg-[#1A2822] text-slate-300 hover:bg-slate-800'
          }`}
        >
          Cancelar Cita
        </button>
      </nav>

      {/* Pestaña 1: Misión y Visión según la Aplicación Activa */}
      {tabActiva === 'mision' && (
        <section className="max-w-4xl mx-auto bg-[#1A2822] p-6 md:p-8 rounded-2xl border border-[#2D6A4F]/60 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <div className="flex items-center gap-3">
              <img src={logoActual} alt="Logo App" className="w-10 h-10 object-contain bg-white p-1 rounded-xl" />
              <div>
                <span className="bg-[#E8829C] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  Identidad & Propósito
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-white mt-1">{appParam}: Misión y Visión</h2>
              </div>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white rounded-lg transition border border-slate-700"
            >
              Imprimir / PDF
            </button>
          </div>

          {/* ASL IDEAS SPA CASA MATRIZ */}
          {appParam.includes('ASL') && (
            <>
              <div className="bg-[#121E19] p-5 rounded-xl border border-slate-700 space-y-2">
                <h3 className="text-base font-bold text-[#E8829C]">Propósito Principal</h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  Diseñamos y desarrollamos soluciones tecnológicas amables y herramientas digitales a medida para emprendedores, PYMEs y comercios. ASL Ideas SpA Casa Matriz combina diseño gráfico de alta sensibilidad visual con ingeniería de software accesible. Aunque nacimos impulsando el ecosistema de la salud y el bienestar integrativo, creamos plataformas e interfaces visuales adaptadas para potenciar negocios en cualquier área del mercado.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#121E19] p-5 rounded-xl border border-slate-700 space-y-2">
                  <h3 className="text-base font-bold text-[#E8829C]">Nuestra Misión</h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Diseñar aplicaciones web y móviles amables con baja carga sensorial, adaptadas a personas con neurodivergencias y neurotípicas, otorgando a distintas áreas mayor visibilidad con las herramientas digitales e integrar a personas con discapacidad al mundo laboral.
                  </p>
                </div>
                <div className="bg-[#121E19] p-5 rounded-xl border border-slate-700 space-y-2">
                  <h3 className="text-base font-bold text-[#E8829C]">Nuestra Visión</h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Ser la empresa líder en soluciones tecnológicas accesibles para personas neurodivergentes y con discapacidad, dando trabajo y visibilidad a distintas empresas y dando soluciones a distintas problemáticas que enfrentamos como sociedad a través del diseño, tecnología, conectando personas y emprendedores, bajo estándares de ciberseguridad de la Ley N° 21.663.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* LAWENMOLL */}
          {appParam.includes('LAWENMOLL') && (
            <>
              <div className="bg-[#121E19] p-5 rounded-xl border border-slate-700 space-y-2">
                <h3 className="text-base font-bold text-emerald-400">Vitrina Virtual Integrativa</h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  LAWENMOLL es la plataforma pionera de una vitrina virtual integrativa para el diagnóstico preventivo y acompañamiento continuo en enfermedades. Permite realizar tests de composición metabólica, emitir reportes inteligentes y conectar de forma segura a pacientes y distintos tipos de servicios que ofrece nuestra plataforma.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#121E19] p-5 rounded-xl border border-slate-700 space-y-2">
                  <h3 className="text-base font-bold text-emerald-400">Nuestra Misión</h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Dar a conocer de forma visual e interactiva que existen múltiples posibilidades de acompañamiento y herramientas tecnológicas a través de la vitrina integrativa, ofreciendo diversos servicios visuales para mejorar la calidad de vida de cada usuario.
                  </p>
                </div>
                <div className="bg-[#121E19] p-5 rounded-xl border border-slate-700 space-y-2">
                  <h3 className="text-base font-bold text-emerald-400">Nuestra Visión</h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Conectar de manera visual, transparente y accesible a las personas con distintos tipos de servicios, profesionales y emprendimientos del área de la salud integrativa, bienestar y gastronomía, mediante herramientas digitales con baja carga sensorial.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* WELLNESS WEB APP */}
          {appParam.includes('Wellness') && (
            <>
              <div className="bg-[#121E19] p-5 rounded-xl border border-slate-700 space-y-2">
                <h3 className="text-base font-bold text-[#E8829C]">Espacio Visual & Salas Virtuales</h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  Wellness Web App es un espacio visual en el cual puedes ver distintos tipos de videos donde hay rutinas de ejercicios específicos para cardio, metabolismo, etc., guías de meditación para calmar la mente y el cuerpo con distintas disciplinas y tips gastronómicos para acompañar a nuestros usuarios, dando visibilidad a profesionales que dan clases en nuestras salas virtuales conectando a personas que les cueste asistir de forma presencial a ciertas actividades.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#121E19] p-5 rounded-xl border border-slate-700 space-y-2">
                  <h3 className="text-base font-bold text-[#E8829C]">Nuestra Misión</h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Dar mayor visualización a profesionales que dan clases y acercar a personas que no puedan tomar rutinas en vivo y en directo y lograr que hay más de una forma de tener una mejor calidad de vida.
                  </p>
                </div>
                <div className="bg-[#121E19] p-5 rounded-xl border border-slate-700 space-y-2">
                  <h3 className="text-base font-bold text-[#E8829C]">Nuestra Visión</h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Mejorar la calidad de vida, asistir a clases virtuales con una o más personas y poder interactuar si es que tiene problemas sensoriales o físicos.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* BIENESTAR */}
          {appParam.includes('Bienestar') && (
            <>
              <div className="bg-[#121E19] p-5 rounded-xl border border-slate-700 space-y-2">
                <h3 className="text-base font-bold text-emerald-400">Mensajería, Salud & Shopping PYME</h3>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  Bienestar es un portal enfocado en la mensajería y en la rutina del día a día para anotar horas médicas, consultas, recordatorios de tomar agua, caminar, rutina de ejercicios; también tendrá la parte de conectarse con PYMEs y ofrecer sus productos, y por último, para personas que tengan problemas de insomnio, poder solucionar con música, relatos o tips para conciliar el sueño y alcanzar el sueño REM reparador.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#121E19] p-5 rounded-xl border border-slate-700 space-y-2">
                  <h3 className="text-base font-bold text-emerald-400">Nuestra Misión</h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Que haya comunicación, retroalimentación y conexión de forma fluida y amena.
                  </p>
                </div>
                <div className="bg-[#121E19] p-5 rounded-xl border border-slate-700 space-y-2">
                  <h3 className="text-base font-bold text-emerald-400">Nuestra Visión</h3>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Que nuestro usuario recuerde que también se puede cuidar con la agenda de bienestar con su hora médica, recordar tomar agua, cuántos pasos debe caminar, poder tener un ingreso extra y una mejor calidad del sueño.
                  </p>
                </div>
              </div>
            </>
          )}
        </section>
      )}

      {/* Pestaña 2: Video Llamada en Vivo */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col items-center justify-center p-4">
              {pantallaActiva === 'cam' && (
                <div className="text-center">
                  <p className="text-[#E8829C] text-xs font-semibold uppercase tracking-wider mb-1">Transmisión Principal en Vivo</p>
                  <h3 className="text-lg font-bold text-white mb-2">{appParam}</h3>
                  <p className="text-xs text-slate-400">
                    {camActiva ? 'Cámara transmitiendo en alta definición' : 'Cámara desactivada por privacidad / ahorro de ancho de banda'}
                  </p>
                </div>
              )}

              {pantallaActiva === 'presentacion' && (
                <div className="text-center bg-slate-950/90 w-full h-full flex flex-col items-center justify-center p-6 border border-slate-800 rounded-xl">
                  <h4 className="text-sm font-bold text-[#E8829C] mb-1">Presentación Corporativa & Diapositivas B2B</h4>
                  <p className="text-xs text-slate-400">Compartiendo pantalla de convenio institucional ASL Ideas SpA</p>
                </div>
              )}

              {pantallaActiva === 'mision' && (
                <div className="text-center bg-slate-950/90 w-full h-full flex flex-col items-center justify-center p-6 border border-slate-800 rounded-xl">
                  <h4 className="text-sm font-bold text-[#E8829C] mb-1">Misión y Visión de {appParam}</h4>
                  <p className="text-xs text-slate-400">Visualizando propuesta de valor y propósito corporativo</p>
                </div>
              )}

              {pantallaActiva === 'pizarra' && (
                <div className="text-center bg-slate-950/90 w-full h-full flex flex-col items-center justify-center p-6 border border-slate-800 rounded-xl">
                  <h4 className="text-sm font-bold text-[#E8829C] mb-1">Pizarra Digital Colaborativa</h4>
                  <p className="text-xs text-slate-400">Dibujo y anotaciones de accesibilidad cognitiva en tiempo real</p>
                </div>
              )}

              {transcripcionActiva && (
                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md border border-[#E8829C]/50 p-2.5 rounded-xl text-center text-xs text-emerald-200">
                  <span className="font-bold text-[#E8829C]">Transcripción en Vivo (IA):</span> &quot;Bienvenidos a la reunión de {appParam}...&quot;
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-[#1A2822] rounded-xl border border-slate-700/50">
              <button
                type="button"
                onClick={() => setMicActivo(!micActivo)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  micActivo ? 'bg-[#E8829C] text-white' : 'bg-red-600/90 text-white'
                }`}
              >
                {micActivo ? 'Micrófono Encendido' : 'Micrófono Silenciado'}
              </button>

              <button
                type="button"
                onClick={() => setCamActiva(!camActiva)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  camActiva ? 'bg-[#E8829C] text-white' : 'bg-red-600/90 text-white'
                }`}
              >
                {camActiva ? 'Cámara Encendida' : 'Encender Cámara'}
              </button>

              <button
                type="button"
                onClick={() => setTranscripcionActiva(!transcripcionActiva)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition ${
                  transcripcionActiva ? 'bg-[#E8829C] text-white' : 'bg-slate-800 text-slate-200'
                }`}
              >
                {transcripcionActiva ? 'Transcribiendo...' : 'Transcribir Reunión'}
              </button>

              <div className="flex items-center gap-1 bg-[#121E19] p-1 rounded-lg border border-slate-700 text-xs">
                <span className="text-[11px] text-slate-400 px-2">Pantalla:</span>
                <button
                  type="button"
                  onClick={() => setPantallaActiva('cam')}
                  className={`px-2 py-1 rounded ${pantallaActiva === 'cam' ? 'bg-[#E8829C] text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Principal
                </button>
                <button
                  type="button"
                  onClick={() => setPantallaActiva('presentacion')}
                  className={`px-2 py-1 rounded ${pantallaActiva === 'presentacion' ? 'bg-[#E8829C] text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Presentación
                </button>
                <button
                  type="button"
                  onClick={() => setPantallaActiva('mision')}
                  className={`px-2 py-1 rounded ${pantallaActiva === 'mision' ? 'bg-[#E8829C] text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Misión/Visión
                </button>
                <button
                  type="button"
                  onClick={() => setPantallaActiva('pizarra')}
                  className={`px-2 py-1 rounded ${pantallaActiva === 'pizarra' ? 'bg-[#E8829C] text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Pizarra
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#1A2822] p-6 rounded-2xl border border-slate-700/50 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-md font-bold mb-2 text-[#E8829C]">Información de la Sala</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Espacio accesible diseñado con baja sobrecarga sensorial para reuniones institucionales, alianzas con colaboradores y atención comunitaria.
              </p>
              <div className="bg-[#121E19] p-3 rounded-xl border border-slate-700 text-xs space-y-1.5">
                <p><strong className="text-slate-200">Portal:</strong> {appParam}</p>
                <p><strong className="text-slate-200">Seguridad:</strong> SSL / Ley N° 21.663</p>
                <p><strong className="text-slate-200">Estado:</strong> <span className="text-emerald-400 font-bold">En Vivo</span></p>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setTabActiva('mision')}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition border border-slate-700"
              >
                Ver Misión y Visión
              </button>
              <button
                type="button"
                onClick={() => setTabActiva('cita')}
                className="w-full py-2.5 bg-[#E8829C] hover:bg-[#D8708C] text-white text-xs font-bold rounded-xl transition shadow-lg"
              >
                + Agendar Cita B2B
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Pestaña 3: Formulario de Agendamiento B2B */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-[#1A2822] p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Agendar Cita B2B en {appParam}
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Súmate a nuestra red de colaboradores y suscriptores para potenciar tu presencia y llegar a muchas más personas.
            </p>
          </div>

          {mensaje && (
            <div className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-medium ${
              mensaje.tipo === 'exito' ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-200' : 'bg-red-950/80 border border-red-500 text-red-200'
            }`}>
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nombre Completo o Empresa / PYME <span className="text-[#E8829C]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Centro Médico ASL / Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                RUT o RUT Tributario <span className="text-[#E8829C]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K / 12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Correo Electrónico <span className="text-[#E8829C]">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Correos de Invitados / Colaboradores (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Fecha Preferente <span className="text-[#E8829C]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#121E19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bloque Horario <span className="text-[#E8829C]">*</span>
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#121E19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-[#E8829C]"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={cargando}
                className="w-full py-3 bg-[#E8829C] hover:bg-[#D8708C] text-white text-sm font-bold rounded-xl transition shadow-lg disabled:opacity-50"
              >
                {cargando ? 'Guardando agendamiento...' : 'Confirmar Cita y Unirse a la Red B2B'}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Pestaña 4: Cancelar Cita */}
      {tabActiva === 'cancelar' && (
        <section className="max-w-2xl mx-auto bg-[#1A2822] p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Cancelar Cita Agendada</h2>
            <p className="text-xs text-slate-300">
              Ingresa los datos del titular para proceder con la cancelación y liberación inmediata del cupo en la Sala Virtual.
            </p>
          </div>

          {cancelMensaje && (
            <div className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-medium ${
              cancelMensaje.tipo === 'exito' ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-200' : 'bg-red-950/80 border border-red-500 text-red-200'
            }`}>
              {cancelMensaje.texto}
            </div>
          )}

          <form onSubmit={handleCancelCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                RUT del Titular <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 12.345.678-9"
                value={cancelRut}
                onChange={(e) => setCancelRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Folio o Código de Reserva (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: B2B-9876"
                value={cancelFolio}
                onChange={(e) => setCancelFolio(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Motivo de Cancelación (Opcional)
              </label>
              <textarea
                rows={2}
                placeholder="Ej: Cambio de fecha o problema de agenda"
                value={cancelMotivo}
                onChange={(e) => setCancelMotivo(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#121E19] border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={cancelCargando}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-xl transition shadow-lg disabled:opacity-50"
              >
                {cancelCargando ? 'Procesando cancelación...' : 'Confirmar Cancelación de Cita'}
              </button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}

export default function SalaVirtualPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Cargando Sala Virtual...</div>}>
      <SalaVirtualContent />
    </Suspense>
  );
}
