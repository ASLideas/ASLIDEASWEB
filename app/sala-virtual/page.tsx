'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const initialApp = searchParams.get('app') || 'Casa Matriz ASL Ideas SpA';

  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita'>('vivo');
  const [micActivo, setMicActivo] = useState(false);
  const [camActiva, setCamActiva] = useState(false);
  const [transcripcionActiva, setTranscripcionActiva] = useState(false);
  const [modoCalma, setModoCalma] = useState(false);

  // Selector de Pantallas (1 pantalla o 2+ participantes PYME)
  const [modoPantallas, setModoPantallas] = useState<'1' | '2' | '4'>('2');

  // Desplegable Lateral / Principal
  const [panelDesplegable, setPanelDesplegable] = useState<'archivos' | 'notas' | 'acuerdos' | null>('notas');

  // Estados de Transcripción, Notas, Archivos y Acuerdos
  const [transcripcionTexto, setTranscripcionTexto] = useState<string[]>([]);
  const [nuevaNota, setNuevaNota] = useState('');
  const [listaNotas, setListaNotas] = useState<string[]>([
    'Minuta inicial de reunión B2B iniciada.',
    'Revisión de Ficha de Registro y Convenio Ley N° 21.663.'
  ]);

  const [archivosAdjuntos, setArchivosAdjuntos] = useState<string[]>([
    'Ficha_Oficial_ASL_Ideas_SpA.pdf',
    'Propuesta_Convenio_PYME_2026.pdf'
  ]);

  const [listaAcuerdos, setListaAcuerdos] = useState<string[]>([
    'Acuerdo 01: Vincular agenda virtual con atención personalizada.',
    'Acuerdo 02: Habilitar Ficha SOAP cifrada para la PYME asociada.'
  ]);
  const [nuevoAcuerdo, setNuevoAcuerdo] = useState('');

  // Estados del Formulario B2B
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
  const [portal, setPortal] = useState(initialApp);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');

  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Determinar logo de la sala según la app seleccionada
  let logoSala = '/logo-asl.png.png';
  if (initialApp.includes('LAWENMOLL')) logoSala = '/logo-lawenmoll.jpg.png';
  else if (initialApp.includes('Wellness')) logoSala = '/logo-wellness.jpg.jpg';
  else if (initialApp.includes('Bienestar')) logoSala = '/logo-bienestar.png.png';

  // Manejo de Cámara
  useEffect(() => {
    let stream: MediaStream | null = null;
    if (camActiva) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: false })
        .then((mediaStream) => {
          stream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch((err) => {
          console.log('Cámara en modo simulación:', err);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [camActiva]);

  // Manejo de Transcripción Simulada / Real
  useEffect(() => {
    let interval: any = null;
    if (transcripcionActiva) {
      const frases = [
        'Bienvenidos a la sesión de convenios ASL Ideas SpA.',
        'Se está revisando el modelo de atención inclusiva.',
        'Reunión en vivo grabada y transcrita con cifrado de seguridad.'
      ];
      let index = 0;
      interval = setInterval(() => {
        if (index < frases.length) {
          setTranscripcionTexto(prev => [...prev, frases[index]]);
          index++;
        }
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [transcripcionActiva]);

  const handleDescargarTranscripcion = () => {
    const textoCompleto = transcripcionTexto.join('\n');
    const blob = new Blob([textoCompleto], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Transcripcion_${initialApp.replace(/\s+/g, '_')}.txt`;
    link.click();
  };

  const handleGuardarTranscripcionEnAcuerdo = () => {
    if (transcripcionTexto.length > 0) {
      const ultimoTexto = transcripcionTexto[transcripcionTexto.length - 1];
      setListaAcuerdos(prev => [...prev, `Acuerdo Transcrito: ${ultimoTexto}`]);
    }
  };

  const handleAgregarAcuerdo = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevoAcuerdo.trim()) {
      setListaAcuerdos(prev => [...prev, nuevoAcuerdo.trim()]);
      setNuevoAcuerdo('');
    }
  };

  const handleAgregarNota = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevaNota.trim()) {
      setListaNotas(prev => [...prev, nuevaNota.trim()]);
      setNuevaNota('');
    }
  };

  const handleSubirArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivosAdjuntos(prev => [...prev, e.target.files![0].name]);
    }
  };

  const handleSubmitCita = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje(null);

    try {
      const { supabase } = await import('@/lib/supabaseClient').catch(() => ({ supabase: null as any }));
      
      if (supabase) {
        const { error } = await supabase.from('citas_b2b').insert([
          {
            nombre,
            rut,
            email,
            invitados,
            portal: initialApp,
            fecha,
            hora
          }
        ]);
        if (error) throw error;
      }

      setMensaje({
        tipo: 'exito',
        texto: '¡Cita confirmada y vinculada a la Video Reunión con éxito!'
      });

      setNombre('');
      setRut('');
      setEmail('');
      setInvitados('');
      setFecha('');
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

  return (
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${modoCalma ? 'bg-[#101D2B] text-[#90B2D9]' : 'bg-slate-900 text-white'}`}>
      {/* Header */}
      <header className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <img 
            src={logoSala} 
            alt={`Logo ${initialApp}`} 
            className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-slate-700 shadow" 
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#B8D6B2]">{initialApp}</h1>
            <p className="text-xs text-[#98A4BA]">Sala Virtual B2B & Agendamiento Inclusivo</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModoCalma(!modoCalma)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition ${modoCalma ? 'bg-[#78ACE9] text-slate-900 border-[#90B2D9]' : 'bg-slate-800 text-slate-200 border-slate-700'}`}
          >
            {modoCalma ? 'Modo Calma Activo (TEA)' : 'Activar Modo Calma (TEA)'}
          </button>
          <a
            href="/"
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition border border-slate-700"
          >
            Volver a la Web
          </a>
        </div>
      </header>

      {/* Navegación por Pestañas */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-slate-700/40 pb-2">
        <button
          type="button"
          onClick={() => setTabActiva('vivo')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'vivo'
              ? 'bg-[#52796F] text-white shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          Sala Virtual en Vivo
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('cita')}
          className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${
            tabActiva === 'cita'
              ? 'bg-[#52796F] text-white shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          Agendar Cita en la Sala
        </button>
      </div>

      {/* Pestaña 1: Transmisión en Vivo */}
      {tabActiva === 'vivo' && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Columna Principal: Transmisión de Video */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Grid de Pantallas (1, 2 o 4 pantallas si hay más invitados de la misma PYME) */}
            <div className="relative bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl p-2 min-h-[340px] flex flex-col justify-between">
              
              <div className={`grid gap-2 h-full ${modoPantallas === '1' ? 'grid-cols-1' : modoPantallas === '2' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2'}`}>
                
                {/* Pantalla 1: Anfitrión / Tu Cámara */}
                <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 min-h-[200px] flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${camActiva ? 'block' : 'hidden'}`}
                  />
                  {!camActiva && (
                    <div className="text-center p-4">
                      <div className="w-16 h-16 rounded-full bg-[#52796F]/30 border border-[#52796F] mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg">
                        ASL
                      </div>
                      <p className="text-xs text-slate-400">Anfitrión Principal ({initialApp})</p>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-slate-900/80 text-[11px] px-2 py-0.5 rounded text-emerald-400 border border-emerald-500/30 font-semibold">
                    Pantalla 1: Anfitrión
                  </div>
                </div>

                {/* Pantalla 2+: Invitados PYME (si hay 2 o más) */}
                {(modoPantallas === '2' || modoPantallas === '4') && (
                  <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 min-h-[200px] flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-16 h-16 rounded-full bg-[#B2942F]/30 border border-[#B2942F] mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg">
                        PYME
                      </div>
                      <p className="text-xs text-slate-400">Invitado de la misma PYME</p>
                      <span className="text-[10px] text-emerald-400">Conectado / Audio HD</span>
                    </div>
                    <div className="absolute top-2 left-2 bg-slate-900/80 text-[11px] px-2 py-0.5 rounded text-[#B2942F] border border-[#B2942F]/30 font-semibold">
                      Pantalla 2: Invitado PYME
                    </div>
                  </div>
                )}

                {modoPantallas === '4' && (
                  <>
                    <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 min-h-[160px] flex items-center justify-center">
                      <p className="text-xs text-slate-400">Pantalla 3: Colaborador B2B</p>
                    </div>
                    <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 min-h-[160px] flex items-center justify-center">
                      <p className="text-xs text-slate-400">Pantalla 4: Presentación de Ficha</p>
                    </div>
                  </>
                )}
              </div>

              {/* Subtítulos / Transcripción Flotante en Vivo */}
              {transcripcionActiva && transcripcionTexto.length > 0 && (
                <div className="mt-2 bg-slate-900/95 border border-emerald-500/40 p-3 rounded-xl text-xs text-emerald-300 font-medium space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-800 pb-1">
                    <span>Transcripción en Vivo</span>
                    <button type="button" onClick={handleGuardarTranscripcionEnAcuerdo} className="text-emerald-400 hover:underline">
                      + Guardar en Acuerdos
                    </button>
                  </div>
                  <p className="italic">&quot;{transcripcionTexto[transcripcionTexto.length - 1]}&quot;</p>
                </div>
              )}
            </div>

            {/* Barra de Controles de la Videollamada */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-800/80 rounded-2xl border border-slate-700">
              
              <div className="flex items-center gap-2">
                {/* Botón Micrófono */}
                <button
                  type="button"
                  onClick={() => setMicActivo(!micActivo)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition ${
                    micActivo ? 'bg-[#52796F] text-white' : 'bg-red-600/80 text-white'
                  }`}
                >
                  {micActivo ? 'Micrófono Encendido' : 'Micrófono Silenciado'}
                </button>

                {/* Botón Encender Cámara */}
                <button
                  type="button"
                  onClick={() => setCamActiva(!camActiva)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition ${
                    camActiva ? 'bg-[#52796F] text-white' : 'bg-red-600/80 text-white'
                  }`}
                >
                  {camActiva ? 'Cámara Encendida' : 'Encender Cámara'}
                </button>

                {/* Botón Transcribir Reunión */}
                <button
                  type="button"
                  onClick={() => setTranscripcionActiva(!transcripcionActiva)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition ${
                    transcripcionActiva ? 'bg-[#B2942F] text-slate-900' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  }`}
                >
                  {transcripcionActiva ? 'Transcripción Activa' : 'Transcribir Reunión'}
                </button>
              </div>

              {/* Selector de Pantalla: 2 o más si hay más invitados */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300 font-semibold">Pantalla:</span>
                <select
                  value={modoPantallas}
                  onChange={(e) => setModoPantallas(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 text-xs text-white px-2.5 py-1.5 rounded-xl focus:outline-none focus:border-emerald-500"
                >
                  <option value="1">1 Pantalla Principal</option>
                  <option value="2">2 Participantes (Dual PYME)</option>
                  <option value="4">4 Participantes (Grid Completo)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Columna Lateral: Desplegable Principal (Adjuntar Archivo, Notas, Descargar Transcripción, Acuerdo) */}
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-4">
            
            <div>
              {/* Tabs del Desplegable Principal */}
              <div className="flex border-b border-slate-700 pb-2 mb-4 gap-1">
                <button
                  type="button"
                  onClick={() => setPanelDesplegable('notas')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                    panelDesplegable === 'notas' ? 'bg-[#52796F] text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Notas
                </button>
                <button
                  type="button"
                  onClick={() => setPanelDesplegable('archivos')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                    panelDesplegable === 'archivos' ? 'bg-[#52796F] text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Adjuntar Archivo
                </button>
                <button
                  type="button"
                  onClick={() => setPanelDesplegable('acuerdos')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                    panelDesplegable === 'acuerdos' ? 'bg-[#52796F] text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Acuerdos
                </button>
              </div>

              {/* Contenido Panel 1: Notas */}
              {panelDesplegable === 'notas' && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#B8D6B2] uppercase">Notas de la Reunión B2B</h4>
                  <div className="max-h-48 overflow-y-auto space-y-2 text-xs">
                    {listaNotas.map((nota, i) => (
                      <div key={i} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-slate-300">
                        {nota}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleAgregarNota} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Escribir nota..."
                      value={nuevaNota}
                      onChange={(e) => setNuevaNota(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                    <button type="submit" className="w-full py-1.5 bg-[#52796F] text-white text-xs font-bold rounded-xl hover:bg-[#676E5E]">
                      + Guardar Nota
                    </button>
                  </form>
                </div>
              )}

              {/* Contenido Panel 2: Adjuntar Archivos */}
              {panelDesplegable === 'archivos' && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#B8D6B2] uppercase">Adjuntar Archivos B2B</h4>
                  <div className="space-y-2 text-xs">
                    {archivosAdjuntos.map((file, i) => (
                      <div key={i} className="bg-slate-900 p-2.5 rounded-xl border border-slate-700 flex justify-between items-center text-slate-300">
                        <span className="truncate max-w-[180px]">{file}</span>
                        <span className="text-[10px] text-emerald-400 font-bold">Cifrado</span>
                      </div>
                    ))}
                  </div>
                  <label className="block w-full py-2 bg-slate-700 text-center text-xs font-bold text-slate-200 rounded-xl cursor-pointer hover:bg-slate-600">
                    + Seleccionar Archivo
                    <input type="file" onChange={handleSubirArchivo} className="hidden" />
                  </label>
                </div>
              )}

              {/* Contenido Panel 3: Acuerdos */}
              {panelDesplegable === 'acuerdos' && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#B2942F] uppercase">Registro de Acuerdos</h4>
                  <div className="max-h-48 overflow-y-auto space-y-2 text-xs">
                    {listaAcuerdos.map((acuerdo, i) => (
                      <div key={i} className="bg-slate-900 p-2.5 rounded-xl border border-[#B2942F]/40 text-slate-200">
                        {acuerdo}
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleAgregarAcuerdo} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Añadir compromiso o acuerdo..."
                      value={nuevoAcuerdo}
                      onChange={(e) => setNuevoAcuerdo(e.target.value)}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                    <button type="submit" className="w-full py-1.5 bg-[#B2942F] text-slate-900 font-bold text-xs rounded-xl hover:bg-[#cfa534]">
                      + Firmar / Añadir Acuerdo
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Acción Especial: Descargar Transcripción */}
            <div className="pt-3 border-t border-slate-700">
              <button
                type="button"
                onClick={handleDescargarTranscripcion}
                className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded-xl transition shadow"
              >
                📥 Descargar Transcripción (.txt)
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Pestaña 2: Formulario de Agendamiento B2B */}
      {tabActiva === 'cita' && (
        <section className="max-w-3xl mx-auto bg-slate-800/80 p-6 md:p-8 rounded-2xl border border-slate-700 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
              Agendar Cita en {initialApp}
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              Selecciona la fecha y bloque de atención B2B. Al agendar, la cita quedará automáticamente vinculada con la Video Reunión en vivo.
            </p>
          </div>

          {mensaje && (
            <div
              className={`p-4 mb-6 rounded-xl text-xs md:text-sm font-medium ${
                mensaje.tipo === 'exito'
                  ? 'bg-emerald-950/80 border border-emerald-500 text-emerald-200'
                  : 'bg-red-950/80 border border-red-500 text-red-200'
              }`}
            >
              {mensaje.texto}
            </div>
          )}

          <form onSubmit={handleSubmitCita} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Nombre Completo o Empresa <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Centro Médico ASL / Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                RUT o RUT Tributario <span className="text-emerald-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K / 12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Correo Electrónico <span className="text-emerald-400">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Correos de Invitados Adicionales (2 o más de la misma PYME)
              </label>
              <input
                type="text"
                placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Separa varios correos por coma. Recibirán la clave de acceso a la sala compartida.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tipo / Portal B2B
              </label>
              <input
                type="text"
                value={initialApp}
                readOnly
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-400 cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Fecha Preferente <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bloque Horario <span className="text-emerald-400">*</span>
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
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
                className="w-full py-3 bg-[#52796F] hover:bg-[#676E5E] text-white text-sm font-bold rounded-xl transition shadow-lg disabled:opacity-50"
              >
                {cargando ? 'Guardando agendamiento...' : 'Confirmar Cita y Vincular a la Video Reunión'}
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
