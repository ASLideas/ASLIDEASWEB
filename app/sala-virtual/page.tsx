'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const appParam = searchParams.get('app') || 'Casa Matriz ASL Ideas SpA';
  const logoParam = searchParams.get('logo') || '/LOGO_asl.png';

  const [tabActiva, setTabActiva] = useState<'vivo' | 'cita' | 'oficina' | 'reprogramar'>('vivo');
  const [pantallaEnfocada, setPantallaEnfocada] = useState<1 | 2>(1);
  const [micActivo, setMicActivo] = useState(true);
  const [camActiva, setCamActiva] = useState(false);
  const [transcriptorActivo, setTranscriptorActivo] = useState(true);
  const [modoCalma, setModoCalma] = useState(false);
  const [nivelAudio, setNivelAudio] = useState(52);

  // Modal para agregar invitados B2B
  const [showModalInvitados, setShowModalInvitados] = useState(false);
  const [emailInvitado, setEmailInvitado] = useState('');
  const [invitadosList, setInvitadosList] = useState<string[]>([]);
  const [copiado, setCopiado] = useState(false);

  // Archivos adjuntos
  const [archivos, setArchivos] = useState([
    { id: 1, nombre: 'Presentacion_Vitrina_B2B_ASL.pdf', tamano: '1.2 MB', fecha: 'Hoy 10:00 AM', estado: 'Listo' }
  ]);

  // Transcripción y chat
  const [mensajes, setMensajes] = useState([
    { id: 1, emisor: 'ASL Bot', texto: `Sala iniciada para: ${appParam} bajo cifrado Ley N° 21.663.`, hora: '10:00 AM' },
    { id: 2, emisor: 'Sistemas', texto: 'Entorno configurado con baja carga sensorial para Ley TEA N° 21.545.', hora: '10:01 AM' },
    { id: 3, emisor: 'Anfitrión ASL', texto: `"Bienvenidos a la reunión interactiva de ${appParam}."`, hora: '10:02 AM' }
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  // Agenda vinculada
  const [formCita, setFormCita] = useState({ nombre: '', email: '', rut: '', tipo: appParam, fecha: '', hora: '10:00' });
  const [citaActiva, setCitaActiva] = useState<any>(null);

  const intercambiar = () => setPantallaEnfocada(prev => (prev === 1 ? 2 : 1));

  const p1 = { id: 1, titulo: appParam, subtitulo: 'Transmisión Principal de Telemedicina & Salud Digital', badge: 'PANTALLA 01 (PRINCIPAL)' };
  const p2 = { id: 2, titulo: 'Cámara Secundaria / Intérprete LSCh', subtitulo: 'Vista de Participante o Lengua de Señas Chilena', badge: 'PANTALLA 02 (SECUNDARIA)' };

  const principal = pantallaEnfocada === 1 ? p1 : p2;
  const secundaria = pantallaEnfocada === 1 ? p2 : p1;

  const handleSubirArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files) {
      const file = e.target.files;
      const nuevo = {
        id: Date.now(),
        nombre: file.name,
        tamano: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        fecha: 'Ahora',
        estado: 'Listo'
      };
      setArchivos([...archivos, nuevo]);
    }
  };

  const handleEliminarArchivo = (id: number) => {
    setArchivos(archivos.filter(a => a.id !== id));
  };

  const handleEnviarMensaje = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;
    const msg = {
      id: Date.now(),
      emisor: 'Usuario',
      texto: nuevoMensaje,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMensajes([...mensajes, msg]);
    setNuevoMensaje('');
  };

  const handleAgregarInvitado = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInvitado.trim()) return;
    setInvitadosList([...invitadosList, emailInvitado]);
    setEmailInvitado('');
    alert(`Invitación B2B enviada a ${emailInvitado} con cifrado Ley N° 21.663`);
  };

  const handleCopiarEnlace = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  const handleConfirmarCita = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevaCita = { ...formCita, id: Date.now() };
    setCitaActiva(nuevaCita);
    setMensajes(prev => [
      ...prev,
      {
        id: Date.now(),
        emisor: 'Sistema de Agenda',
        texto: `Cita vinculada para ${nuevaCita.nombre} (${nuevaCita.tipo}) el ${nuevaCita.fecha} a las ${nuevaCita.hora} hrs.`,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setTabActiva('vivo');
  };

  const handleCopiarSubtitulos = () => {
    const textoCompleto = mensajes.map(m => `[${m.hora}] ${m.emisor}: ${m.texto}`).join('\n');
    navigator.clipboard.writeText(textoCompleto);
    alert('Subtítulos copiados al portapapeles (Ley TEA N° 21.545)');
  };

  const handleDescargarMinuta = () => {
    const contenido = `==========================================\nASL IDEAS SpA - MINUTA Y COMPROMISOS B2B\nApp / Portal: ${appParam}\nFecha: ${new Date().toLocaleDateString()}\n==========================================\n\nTRANSCRIPCIÓN DE REUNIÓN:\n` +
      mensajes.map(m => `[${m.hora}] ${m.emisor}: ${m.texto}`).join('\n') +
      `\n\nARCHIVOS ADJUNTOS EN SALA:\n` +
      archivos.map(a => `- ${a.nombre} (${a.tamano})`).join('\n') +
      `\n\nINVITADOS REGISTRADOS:\n` +
      (invitadosList.length > 0 ? invitadosList.map(i => `- ${i}`).join('\n') : '- Sin invitados adicionales');

    const element = document.createElement("a");
    const file = new Blob([contenido], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Minuta_${appParam.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <main className={`min-h-screen font-sans flex flex-col transition-colors duration-500 ${
      modoCalma ? 'bg-[#EAECE6] text-[#4E5447]' : 'bg-[#E6E7D5] text-[#676E5E]'
    }`}>
      {/* HEADER PRINCIPAL */}
      <header className="bg-[#FAF8F5] border-b border-[#97A884]/30 py-3.5 px-6 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2.5">
            <img
              src={logoParam}
              onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
              alt="ASL Logo"
              className="h-10 w-auto object-contain rounded-full border border-[#97A884]/40 p-0.5 bg-white shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-black text-base text-[#676E5E] leading-tight">{appParam}</span>
              <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider">Sala Virtual en Vivo</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowModalInvitados(true)}
            className="bg-[#52796F] hover:bg-[#676E5E] text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow flex items-center gap-1.5 transition transform hover:scale-105"
          >
            👥 + Agregar Invitados B2B
          </button>

          <button
            onClick={() => setModoCalma(!modoCalma)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition border flex items-center gap-1.5 ${
              modoCalma ? 'bg-[#52796F] text-white border-[#52796F]' : 'bg-[#FAF8F5] text-[#676E5E] border-[#97A884]'
            }`}
          >
            {modoCalma ? '🌿 Modo Calma Activado' : '🍃 Activar Modo Calma (TEA)'}
          </button>

          <Link
            href="/"
            className="bg-rose-100 border border-rose-300 text-rose-800 px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-200 transition"
          >
            Volver a la Web
          </Link>
        </div>
      </header>

      {/* BANNER DE CITA VINCULADA */}
      {citaActiva && (
        <div className="bg-emerald-600 text-white py-2 px-4 text-center text-xs font-extrabold flex items-center justify-center gap-3 shadow-md">
          <span>📅 Cita Vinculada Activa: <strong>{citaActiva.nombre}</strong> ({citaActiva.fecha} a las {citaActiva.hora} hrs)</span>
          <button onClick={() => setTabActiva('vivo')} className="bg-white text-emerald-900 text-[11px] font-black px-3 py-0.5 rounded-lg shadow-xs hover:bg-emerald-50">
            Ir a la Video Reunión
          </button>
        </div>
      )}

      {/* BANNER NORMATIVO */}
      <div className="bg-[#97A884]/20 py-2 px-4 text-center border-b border-[#97A884]/30">
        <p className="text-[11px] font-extrabold text-[#52796F] tracking-wide uppercase">
          SALA VIRTUAL B2B INTEGRADA | LEY TEA N° 21.545 & CIBERSEGURIDAD LEY N° 21.663
        </p>
      </div>

      <div className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-6">
        
        {/* NAVEGACIÓN POR PESTAÑAS */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] p-3 rounded-2xl border border-[#97A884]/30 shadow-sm">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setTabActiva('vivo')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition shadow-sm flex items-center gap-1.5 ${
                tabActiva === 'vivo'
                  ? 'bg-[#676E5E] text-white'
                  : 'bg-[#FAF8F5] text-[#676E5E] hover:bg-[#E6E7D5]'
              }`}
            >
              <span>📹 Video Reunión en Vivo</span>
            </button>

            <button
              onClick={() => setTabActiva('cita')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition shadow-sm flex items-center gap-1.5 ${
                tabActiva === 'cita'
                  ? 'bg-[#676E5E] text-white'
                  : 'bg-[#FAF8F5] text-[#676E5E] hover:bg-[#E6E7D5]'
              }`}
            >
              <span>📅 Agenda y Citas</span>
            </button>

            <button
              onClick={() => setTabActiva('oficina')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition shadow-sm flex items-center gap-1.5 ${
                tabActiva === 'oficina'
                  ? 'bg-[#676E5E] text-white'
                  : 'bg-[#FAF8F5] text-[#676E5E] hover:bg-[#E6E7D5]'
              }`}
            >
              <span>🏛️ Ficha Oficial</span>
            </button>

            <button
              onClick={() => setTabActiva('reprogramar')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
                tabActiva === 'reprogramar'
                  ? 'bg-[#676E5E] text-white'
                  : 'bg-[#FAF8F5] text-[#676E5E] hover:bg-[#E6E7D5]'
              }`}
            >
              <span>🔄 Cancelar / Reprogramar</span>
            </button>
          </div>

          <button
            onClick={() => setShowModalInvitados(true)}
            className="text-xs font-bold text-[#52796F] hover:underline flex items-center gap-1"
          >
            <span>👥 Invitar más participantes a {appParam}</span>
          </button>
        </div>

        {/* PESTAÑA 1: VIDEO REUNIÓN EN VIVO */}
        {tabActiva === 'vivo' && (
          <div className="space-y-6">
            
            <div className="bg-[#1C221D] rounded-3xl border-2 border-[#52796F]/60 p-4 sm:p-6 shadow-2xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* PANTALLA PRINCIPAL */}
                <div className={`md:col-span-2 rounded-2xl p-5 border-2 transition-all flex flex-col justify-between min-h-[340px] sm:min-h-[420px] relative overflow-hidden shadow-xl ${
                  pantallaEnfocada === 1 ? 'bg-[#262D28] border-[#97A884]' : 'bg-[#222824] border-[#52796F]'
                }`}>
                  <div className="flex justify-between items-center z-10">
                    <span className="bg-[#52796F] text-white text-[11px] font-black px-3.5 py-1 rounded-lg uppercase tracking-wider flex items-center gap-2 shadow">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      {principal.badge}
                    </span>
                    <span className="text-xs text-emerald-300 font-bold bg-[#1C221D]/80 px-3 py-1 rounded-lg border border-emerald-500/30">
                      Enfoque Principal (Agrandado)
                    </span>
                  </div>

                  <div className="text-center py-8 space-y-4 z-10">
                    <div className="w-24 h-24 mx-auto rounded-full bg-[#97A884]/20 border-4 border-[#97A884]/40 flex items-center justify-center p-3 shadow-inner bg-white">
                      <img
                        src={logoParam}
                        onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
                        alt="App Logo"
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <div className="space-y-1 max-w-md mx-auto">
                      <h2 className="text-lg sm:text-2xl font-black text-white leading-tight">
                        {principal.titulo}
                      </h2>
                      <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                        {principal.subtitulo}
                      </p>
                    </div>

                    <button
                      onClick={() => setCamActiva(!camActiva)}
                      className="bg-[#FAF8F5] hover:bg-white text-[#676E5E] text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-md transition border border-[#97A884] transform hover:scale-105"
                    >
                      {camActiva ? '📷 Cámara Web y Micrófono Activos' : 'Encender Cámara Web y Micrófono Real'}
                    </button>
                  </div>

                  {transcriptorActivo && (
                    <div className="bg-[#1C221D]/90 border border-emerald-500/40 p-3 rounded-xl text-center z-10 mb-2">
                      <p className="text-xs font-bold text-emerald-300 animate-pulse">
                        💬 [Subtítulos LSCh en Vivo]: "Bienvenidos a la reunión interactiva de {appParam}."
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-[11px] text-gray-400 z-10 pt-2 border-t border-gray-700/50">
                    <span>Transmisión HD Segura • TLS 1.3</span>
                    <span>Habilitado para Intérprete LSCh</span>
                  </div>
                </div>

                {/* PANTALLA SECUNDARIA MINIATURA */}
                <div
                  onClick={intercambiar}
                  className="group cursor-pointer bg-[#222824] hover:bg-[#2C342F] rounded-2xl p-5 border-2 border-[#52796F] flex flex-col justify-between min-h-[340px] sm:min-h-[420px] relative overflow-hidden shadow-xl transition-all"
                >
                  <div className="flex justify-between items-center z-10">
                    <span className="bg-[#52796F]/80 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {secundaria.badge}
                    </span>
                    <span className="text-[11px] text-[#97A884] group-hover:underline font-bold">
                      Clic para Agrandar ↗
                    </span>
                  </div>

                  <div className="text-center py-6 space-y-3 z-10">
                    <div className="w-20 h-20 mx-auto rounded-full bg-[#52796F]/30 border-2 border-[#52796F] flex items-center justify-center text-3xl font-bold text-emerald-300 shadow-inner group-hover:scale-110 transition-transform">
                      {secundaria.id === 1 ? '📹' : '👤'}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-extrabold text-gray-100">
                        {secundaria.titulo}
                      </h3>
                      <p className="text-[11px] text-emerald-300 font-semibold">
                        Cámara Lateral en Vivo
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 z-10">
                    <div className="bg-[#52796F]/40 text-center py-2.5 rounded-xl border border-[#52796F] group-hover:bg-[#52796F] group-hover:text-white transition shadow-sm">
                      <span className="text-xs font-extrabold text-white flex items-center justify-center gap-1.5">
                        🔄 <span>Agrandar esta Pantalla</span>
                      </span>
                    </div>
                    <p className="text-[10px] text-center text-gray-400">
                      Presiona para intercambiar de lugar con la pantalla principal
                    </p>
                  </div>
                </div>

              </div>

              {/* MEDIDOR DE AUDIO */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#97A884]/40 flex flex-wrap items-center justify-between gap-4 shadow-sm">
                <span className="text-xs font-extrabold text-[#676E5E] min-w-[130px]">
                  Nivel de Audio Entrante:
                </span>
                <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-yellow-400 to-rose-500 transition-all duration-300 rounded-full"
                    style={{ width: micActivo ? `${nivelAudio}%` : '0%' }}
                  />
                </div>
                <span className="text-xs font-bold text-[#52796F] min-w-[60px] text-right">
                  {micActivo ? `${nivelAudio}% dB` : '0% dB'}
                </span>
              </div>

              {/* BOTONES DE CONTROL */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setMicActivo(!micActivo)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold shadow transition flex items-center gap-2 ${
                      micActivo
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-rose-100 border border-rose-300 text-rose-800 hover:bg-rose-200'
                    }`}
                  >
                    <span>{micActivo ? '🎙️ Micrófono Activado' : '🎙️ Micrófono Silenciado'}</span>
                  </button>

                  <button
                    onClick={() => setCamActiva(!camActiva)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold shadow transition flex items-center gap-2 ${
                      camActiva
                        ? 'bg-[#676E5E] hover:bg-[#52796F] text-white'
                        : 'bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] hover:bg-[#E6E7D5]'
                    }`}
                  >
                    <span>{camActiva ? '📷 Cámara Activada' : '📷 Encender Cámara'}</span>
                  </button>

                  <button
                    onClick={() => setTranscriptorActivo(!transcriptorActivo)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold shadow transition flex items-center gap-2 ${
                      transcriptorActivo
                        ? 'bg-[#52796F] text-white'
                        : 'bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] hover:bg-[#E6E7D5]'
                    }`}
                  >
                    <span>{transcriptorActivo ? '💬 Subtítulos LSCh Activos' : 'Activar Subtítulos LSCh'}</span>
                  </button>

                  <button
                    onClick={intercambiar}
                    className="bg-[#97A884] hover:bg-[#676E5E] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold shadow transition flex items-center gap-2"
                  >
                    <span>🔄 Intercambiar Pantallas</span>
                  </button>
                </div>

                <button
                  onClick={() => setShowModalInvitados(true)}
                  className="bg-[#52796F] hover:bg-[#676E5E] text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-extrabold shadow transition flex items-center gap-2"
                >
                  <span>👥 + Agregar Invitados B2B</span>
                </button>
              </div>
            </div>

            {/* ARCHIVOS Y TRANSCRIPCIÓN */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#97A884]/40 shadow-lg space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#97A884]/30 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">📁</span>
                      <h3 className="font-extrabold text-base text-[#676E5E]">Archivos Adjuntos de {appParam}</h3>
                    </div>

                    <label className="bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow cursor-pointer transition flex items-center gap-1.5">
                      <span>+ Subir Archivo</span>
                      <input type="file" onChange={handleSubirArchivo} className="hidden" />
                    </label>
                  </div>

                  <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                    {archivos.map(arc => (
                      <div key={arc.id} className="bg-white p-3.5 rounded-2xl border border-[#97A884]/30 flex items-center justify-between gap-3 shadow-xs">
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <span className="text-xl text-[#52796F]">📄</span>
                          <div className="truncate">
                            <p className="text-xs font-extrabold text-[#676E5E] truncate">{arc.nombre}</p>
                            <p className="text-[10px] font-bold text-[#52796F]">{arc.tamano} • {arc.fecha}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1.5 shrink-0">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                            {arc.estado}
                          </span>
                          <button
                            onClick={() => alert(`Previsualizando ${arc.nombre} en entorno seguro Ley N° 21.663`)}
                            className="bg-[#FAF8F5] hover:bg-[#E6E7D5] text-[#676E5E] text-[11px] font-bold px-2.5 py-1 rounded-lg border border-[#97A884]"
                          >
                            Previsualizar
                          </button>
                          <button
                            onClick={() => handleEliminarArchivo(arc.id)}
                            className="text-rose-600 hover:text-rose-800 text-[11px] font-bold px-1.5 py-1"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#97A884]/30 text-center">
                  <p className="text-[10px] font-extrabold text-[#52796F] uppercase tracking-wider flex items-center justify-center gap-1">
                    <span>🔒 Cifrado de documentos según Ley N° 21.663</span>
                  </p>
                </div>
              </div>

              <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#97A884]/40 shadow-lg space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#97A884]/30 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">💬</span>
                      <h3 className="font-extrabold text-base text-[#676E5E]">Transcripción en Vivo & Chat</h3>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-1 rounded-md">
                        {transcriptorActivo ? 'Transcriptor Activo' : 'Transcriptor en Pausa'}
                      </span>
                      <button
                        onClick={() => setMensajes([])}
                        className="text-xs text-[#676E5E] hover:underline font-bold"
                      >
                        Limpiar
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-2xl border border-[#97A884]/30 h-[170px] overflow-y-auto space-y-2.5 text-xs">
                    {mensajes.map(m => (
                      <div key={m.id} className="space-y-0.5">
                        <span className="font-extrabold text-[#52796F] text-[11px]">{m.emisor}: </span>
                        <span className="text-[#676E5E]">{m.texto}</span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleEnviarMensaje} className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={nuevoMensaje}
                      onChange={(e) => setNuevoMensaje(e.target.value)}
                      placeholder="Dicta o escribe un comentario..."
                      className="flex-1 px-3.5 py-2 border border-[#97A884] rounded-xl text-xs bg-white shadow-xs focus:outline-none focus:border-[#52796F]"
                    />
                    <button
                      type="submit"
                      className="bg-[#52796F] hover:bg-[#676E5E] text-white font-extrabold text-xs px-4 py-2 rounded-xl shadow transition"
                    >
                      Enviar
                    </button>
                  </form>
                </div>

                <div className="pt-3 border-t border-[#97A884]/30 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={handleCopiarSubtitulos}
                    className="bg-[#FAF8F5] hover:bg-[#E6E7D5] text-[#52796F] border border-[#97A884] text-xs font-extrabold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
                  >
                    <span>📋 Copiar Subtítulos (Ley TEA N° 21.545)</span>
                  </button>

                  <button
                    onClick={handleDescargarMinuta}
                    className="bg-[#52796F] hover:bg-[#676E5E] text-white text-xs font-extrabold px-4 py-2 rounded-xl shadow transition flex items-center gap-1.5"
                  >
                    <span>📥 Minuta y Compromisos (Descargar .TXT)</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* PESTAÑA 2: AGENDA Y CITAS */}
        {tabActiva === 'cita' && (
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#97A884]/40 shadow-lg space-y-6 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-black text-[#676E5E]">📅 Agendar Cita en la Sala de {appParam}</h2>
              <p className="text-xs text-[#52796F]">
                Selecciona la fecha y bloque de atención B2B. Al agendar, la cita quedará automáticamente vinculada con la Video Reunión en vivo.
              </p>
            </div>

            <form onSubmit={handleConfirmarCita} className="space-y-4 text-xs">
              <div>
                <label className="font-extrabold text-[#676E5E] block mb-1">Nombre Completo o Empresa:</label>
                <input
                  type="text"
                  required
                  value={formCita.nombre}
                  onChange={e => setFormCita({...formCita, nombre: e.target.value})}
                  placeholder="Ej: Centro Médico ASL / Juan Pérez"
                  className="w-full px-3.5 py-2.5 border border-[#97A884] rounded-xl bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-extrabold text-[#676E5E] block mb-1">Correo Electrónico:</label>
                  <input
                    type="email"
                    required
                    value={formCita.email}
                    onChange={e => setFormCita({...formCita, email: e.target.value})}
                    placeholder="correo@ejemplo.com"
                    className="w-full px-3.5 py-2.5 border border-[#97A884] rounded-xl bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-extrabold text-[#676E5E] block mb-1">Tipo / Portal B2B:</label>
                  <input
                    type="text"
                    readOnly
                    value={appParam}
                    className="w-full px-3.5 py-2.5 border border-[#97A884] rounded-xl bg-gray-100 font-bold text-[#52796F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-extrabold text-[#676E5E] block mb-1">Fecha Preferente:</label>
                  <input
                    type="date"
                    required
                    value={formCita.fecha}
                    onChange={e => setFormCita({...formCita, fecha: e.target.value})}
                    className="w-full px-3.5 py-2.5 border border-[#97A884] rounded-xl bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-extrabold text-[#676E5E] block mb-1">Bloque Horario:</label>
                  <select
                    value={formCita.hora}
                    onChange={e => setFormCita({...formCita, hora: e.target.value})}
                    className="w-full px-3.5 py-2.5 border border-[#97A884] rounded-xl bg-white focus:outline-none font-bold text-[#676E5E]"
                  >
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:30">04:30 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#52796F] hover:bg-[#676E5E] text-white font-extrabold text-sm py-3 rounded-xl shadow transition mt-2"
              >
                📅 Confirmar Cita y Vincular a la Video Reunión
              </button>
            </form>
          </div>
        )}

        {/* PESTAÑA 3: FICHA OFICIAL */}
        {tabActiva === 'oficina' && (
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#97A884]/40 shadow-lg space-y-6">
            <div className="border-b border-[#97A884]/30 pb-4 flex items-center justify-between">
              <div>
                <span className="bg-[#52796F] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                  FICHA OFICIAL B2B
                </span>
                <h2 className="text-xl font-black text-[#676E5E] mt-2">
                  Oficina Virtual: {appParam}
                </h2>
              </div>
              <img src={logoParam} alt="Logo" className="w-12 h-12 object-contain rounded-full border bg-white p-1" />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#676E5E]">
              <h3 className="font-extrabold text-[#52796F] text-base">Propósito Tecnológico & Inclusión</h3>
              <p className="leading-relaxed">
                ASL Ideas SpA desarrolla plataformas integrativas de telemedicina accesible, salud digital y programas de actividad física adaptada. Diseñadas bajo cumplimiento estricto de la <strong>Ley TEA N° 21.545</strong> (accesibilidad cognitiva y baja carga sensorial) y la <strong>Ley N° 21.663 de Ciberseguridad</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-white p-4 rounded-2xl border border-[#97A884]/30 space-y-2">
                  <h4 className="font-extrabold text-[#52796F]">📹 Video Reunión & Accesibilidad</h4>
                  <ul className="list-disc list-inside text-xs space-y-1 text-[#676E5E]">
                    <li>Doble pantalla interactiva con Intérprete LSCh.</li>
                    <li>Subtitulación automática y minutas descargables (.TXT).</li>
                    <li>Modo Calma para autorregulación sensorial TEA.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-[#97A884]/30 space-y-2">
                  <h4 className="font-extrabold text-[#52796F]">🔒 Ciberseguridad & Agenda</h4>
                  <ul className="list-disc list-inside text-xs space-y-1 text-[#676E5E]">
                    <li>Cifrado de documentos TLS 1.3 según Ley N° 21.663.</li>
                    <li>Agendamiento de horas vinculado directamente a la reunión.</li>
                    <li>Envío de invitaciones cifradas a múltiples usuarios B2B.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA 4: CANCELAR / REPROGRAMAR */}
        {tabActiva === 'reprogramar' && (
          <div className="bg-[#FAF8F5] p-6 sm:p-8 rounded-3xl border border-[#97A884]/40 shadow-lg space-y-6 max-w-xl mx-auto text-center">
            <h2 className="text-xl font-black text-[#676E5E]">🔄 Gestión de Citas Existentes</h2>
            <p className="text-xs text-[#52796F]">
              Ingresa tu código de reserva o correo para modificar o cancelar tu atención en {appParam}.
            </p>

            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Código de reserva o RUT"
                className="flex-1 px-3.5 py-2.5 border border-[#97A884] rounded-xl text-xs bg-white focus:outline-none shadow-xs"
              />
              <button
                onClick={() => alert('Búsqueda completada. Puedes seleccionar una nueva fecha.')}
                className="bg-[#676E5E] hover:bg-[#52796F] text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow"
              >
                Buscar
              </button>
            </div>
          </div>
        )}

      </div>

      {/* MODAL INVITADOS B2B */}
      {showModalInvitados && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border-2 border-[#52796F] shadow-2xl max-w-md w-full space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-[#97A884]/30 pb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xl">👥</span>
                <h3 className="font-black text-base text-[#676E5E]">Agregar Invitados B2B</h3>
              </div>
              <button
                onClick={() => setShowModalInvitados(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg px-2"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#52796F]">
              Envía invitaciones por correo para sumarse a la reunión de <strong>{appParam}</strong> o copia el enlace directo cifrado.
            </p>

            <form onSubmit={handleAgregarInvitado} className="space-y-3">
              <div>
                <label className="font-extrabold text-xs text-[#676E5E] block mb-1">Correo del Invitado:</label>
                <input
                  type="email"
                  required
                  value={emailInvitado}
                  onChange={(e) => setEmailInvitado(e.target.value)}
                  placeholder="invitado@empresa.com"
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-white border border-[#97A884] focus:outline-none focus:border-[#52796F]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#52796F] hover:bg-[#676E5E] text-white font-extrabold text-xs py-2.5 rounded-xl shadow transition"
              >
                ✉️ Enviar Invitación Cifrada (Ley N° 21.663)
              </button>
            </form>

            <div className="border-t border-[#97A884]/30 pt-3 space-y-2">
              <button
                onClick={handleCopiarEnlace}
                className="w-full bg-white hover:bg-[#E6E7D5] border border-[#97A884] text-[#676E5E] font-extrabold text-xs py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>{copiado ? '✅ ¡Enlace Copiado al Portapapeles!' : '🔗 Copiar Enlace Directo a esta Sala'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-[#FAF8F5] border-t border-[#97A884]/30 py-4 px-6 text-center text-xs text-[#676E5E]/80 mt-auto">
        <p>© 2026 ASL Ideas SpA — Sala Virtual B2B ({appParam}) | Cumplimiento Ley TEA N° 21.545 & Ley N° 21.663</p>
      </footer>
    </main>
  );
}

export default function SalaVirtualPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-bold text-[#676E5E]">Cargando Sala Virtual...</div>}>
      <SalaVirtualContent />
    </Suspense>
  );
}