'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SalaContent() {
  const searchParams = useSearchParams();
  const appParam = searchParams.get('app') || 'Casa Matriz ASL Ideas SpA';
  const logoParam = searchParams.get('logo') || '/LOGO_asl.png';

  const [tab, setTab] = useState<'vivo' | 'cita' | 'oficina' | 'reprogramar'>('vivo');
  const [pantalla, setPantalla] = useState<1 | 2>(1);
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(false);
  const [sub, setSub] = useState(true);
  const [calma, setCalma] = useState(false);
  const [audioLevel, setAudioLevel] = useState(52);

  // Modal invitados
  const [showModal, setShowModal] = useState(false);
  const [emailInv, setEmailInv] = useState('');
  const [listaInv, setListaInv] = useState<string[]>([]);
  const [copiado, setCopiado] = useState(false);

  // Archivos
  const [archivos, setArchivos] = useState([
    { id: 1, nombre: 'Presentacion_Vitrina_B2B_ASL.pdf', tamano: '1.2 MB', fecha: 'Hoy 10:00 AM' }
  ]);

  // Mensajes
  const [mensajes, setMensajes] = useState([
    { id: 1, emisor: 'ASL Bot', texto: 'Sala activa para: ' + appParam + ' (Ley N° 21.663).', hora: '10:00 AM' },
    { id: 2, emisor: 'Anfitrión ASL', texto: '"Bienvenidos a la reunión interactiva de ' + appParam + '."', hora: '10:01 AM' }
  ]);
  const [nuevoMsg, setNuevoMsg] = useState('');

  // Agenda vinculada
  const [formCita, setFormCita] = useState({ nombre: '', email: '', fecha: '', hora: '10:00' });
  const [citaActiva, setCitaActiva] = useState<any>(null);

  const intercambiar = () => setPantalla(p => (p === 1 ? 2 : 1));

  const handleSubirArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setArchivos([...archivos, { id: Date.now(), nombre: f.name, tamano: (f.size / 1024 / 1024).toFixed(1) + ' MB', fecha: 'Ahora' }]);
    }
  };

  const handleEnviarMsg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoMsg.trim()) return;
    setMensajes([...mensajes, { id: Date.now(), emisor: 'Usuario', texto: nuevoMsg, hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setNuevoMsg('');
  };

  const handleInvitar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInv.trim()) return;
    setListaInv([...listaInv, emailInv]);
    setEmailInv('');
    alert('Invitación cifrada enviada a ' + emailInv);
  };

  const handleCopiarEnlace = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 3000);
  };

  const handleAgendarCita = (e: React.FormEvent) => {
    e.preventDefault();
    const c = { ...formCita, id: Date.now() };
    setCitaActiva(c);
    setMensajes(prev => [...prev, {
      id: Date.now(),
      emisor: 'Sistema Agenda',
      texto: 'Cita vinculada para ' + c.nombre + ' (' + c.fecha + ' a las ' + c.hora + ' hrs).',
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setTab('vivo');
  };

  const handleDescargarMinuta = () => {
    const txt = 'ASL IDEAS SpA - MINUTA B2B
App: ' + appParam + '
Fecha: ' + new Date().toLocaleDateString() + '

' +
      'TRANSCRIPCIÓN:
' + mensajes.map(m => '[' + m.hora + '] ' + m.emisor + ': ' + m.texto).join('
') +
      '

ARCHIVOS:
' + archivos.map(a => '- ' + a.nombre).join('
');
    const blob = new Blob([txt], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'Minuta_' + appParam.replace(/s+/g, '_') + '.txt';
    a.click();
  };

  return (
    <main className={calma ? 'min-h-screen font-sans flex flex-col bg-[#EAECE6]' : 'min-h-screen font-sans flex flex-col bg-[#E6E7D5]'}>
      <header className="bg-[#FAF8F5] border-b border-[#97A884]/30 py-3 px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <img src={logoParam} alt="Logo" className="h-9 w-auto object-contain rounded-full border bg-white p-0.5" />
          <div className="flex flex-col">
            <span className="font-black text-base text-[#676E5E]">{appParam}</span>
            <span className="text-[10px] font-bold text-[#52796F] uppercase">Sala Virtual en Vivo</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={() => setShowModal(true)} className="bg-[#52796F] hover:bg-[#676E5E] text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow">
            ��� + Agregar Invitados B2B
          </button>
          <button onClick={() => setCalma(!calma)} className="bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] px-3 py-1.5 rounded-xl text-xs font-bold">
            {calma ? '��� Modo Calma' : '��� Modo Calma (TEA)'}
          </button>
          <Link href="/" className="bg-rose-100 text-rose-800 px-3 py-1.5 rounded-xl text-xs font-bold">
            Volver a la Web
          </Link>
        </div>
      </header>

      {citaActiva && (
        <div className="bg-emerald-600 text-white py-2 px-4 text-center text-xs font-bold flex items-center justify-center gap-3">
          <span>��� Cita Vinculada: <strong>{citaActiva.nombre}</strong> ({citaActiva.fecha} {citaActiva.hora} hrs)</span>
          <button onClick={() => setTab('vivo')} className="bg-white text-emerald-900 text-[11px] font-extrabold px-3 py-0.5 rounded-lg">
            Ir a la Videollamada
          </button>
        </div>
      )}

      <div className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] p-3 rounded-2xl border border-[#97A884]/30">
          <div className="flex space-x-2">
            <button onClick={() => setTab('vivo')} className={tab === 'vivo' ? 'px-4 py-2 rounded-xl text-xs font-extrabold bg-[#676E5E] text-white' : 'px-4 py-2 rounded-xl text-xs font-extrabold bg-transparent text-[#676E5E]'}>
              ��� Sala en Vivo
            </button>
            <button onClick={() => setTab('cita')} className={tab === 'cita' ? 'px-4 py-2 rounded-xl text-xs font-extrabold bg-[#676E5E] text-white' : 'px-4 py-2 rounded-xl text-xs font-extrabold bg-transparent text-[#676E5E]'}>
              ��� Agendar Cita en esta Sala
            </button>
            <button onClick={() => setTab('oficina')} className={tab === 'oficina' ? 'px-4 py-2 rounded-xl text-xs font-extrabold bg-[#676E5E] text-white' : 'px-4 py-2 rounded-xl text-xs font-extrabold bg-transparent text-[#676E5E]'}>
              ���️ Ficha de Oficina
            </button>
          </div>
          <button onClick={() => setShowModal(true)} className="text-xs font-bold text-[#52796F] underline">
            + Invitar a {appParam}
          </button>
        </div>

        {tab === 'vivo' && (
          <div className="space-y-5">
            <div className="bg-[#1C221D] rounded-3xl p-5 border-2 border-[#52796F] shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-[#262D28] rounded-2xl p-5 border-2 border-[#97A884] min-h-[360px] flex flex-col justify-between text-white">
                <div className="flex justify-between items-center">
                  <span className="bg-[#52796F] text-[11px] font-black px-3 py-1 rounded-lg">
                    PANTALLA 0{pantalla} ({pantalla === 1 ? 'PRINCIPAL' : 'SECUNDARIA'})
                  </span>
                  <span className="text-xs text-emerald-300 font-bold">Enfoque Principal</span>
                </div>
                <div className="text-center py-6 space-y-3">
                  <img src={logoParam} alt="App Logo" className="w-20 h-20 mx-auto rounded-full border p-2 bg-white object-contain" />
                  <h2 className="text-xl font-bold">{pantalla === 1 ? appParam : 'Intérprete LSCh / Cámara Secundaria'}</h2>
                  <button onClick={() => setCam(!cam)} className="bg-[#FAF8F5] text-[#676E5E] text-xs font-extrabold px-4 py-2 rounded-xl">
                    {cam ? '��� Cámara Web Activa' : '��� Encender Cámara Real'}
                  </button>
                </div>
                {sub && <p className="text-xs text-emerald-300 text-center animate-pulse">[Subtítulos LSCh en Vivo]: "Transmisión en vivo de {appParam}"</p>}
              </div>

              <div onClick={intercambiar} className="cursor-pointer bg-[#222824] hover:bg-[#2C342F] rounded-2xl p-5 border-2 border-[#52796F] flex flex-col justify-between text-gray-100 min-h-[360px]">
                <div className="flex justify-between">
                  <span className="bg-[#52796F]/80 text-[10px] font-bold px-2 py-1 rounded">
                    PANTALLA 0{pantalla === 1 ? 2 : 1}
                  </span>
                  <span className="text-[11px] text-[#97A884] font-bold">Clic para Agrandar ↗</span>
                </div>
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#52796F]/30 flex items-center justify-center text-2xl font-bold text-emerald-300 mb-2">
                    {pantalla === 1 ? '���' : '���'}
                  </div>
                  <h3 className="text-xs font-extrabold">{pantalla === 1 ? 'Intérprete LSCh' : appParam}</h3>
                </div>
                <div className="bg-[#52796F]/40 text-center py-2 rounded-xl text-xs font-bold text-white">
                  ��� Intercambiar Pantalla
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#97A884]/40 flex items-center justify-between gap-4">
              <span className="text-xs font-extrabold text-[#676E5E]">Nivel Audio dB:</span>
              <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: mic ? audioLevel + '%' : '0%' }} />
              </div>
              <span className="text-xs font-bold text-[#52796F]">{mic ? audioLevel + '% dB' : '0% dB'}</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button onClick={() => setMic(!mic)} className={mic ? 'px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-emerald-600' : 'px-4 py-2 rounded-xl text-xs font-extrabold text-white bg-rose-600'}>
                  {mic ? '���️ Mic On' : '���️ Mic Mute'}
                </button>
                <button onClick={() => setSub(!sub)} className="bg-[#52796F] text-white px-4 py-2 rounded-xl text-xs font-extrabold">
                  ��� Subtítulos LSCh
                </button>
                <button onClick={intercambiar} className="bg-[#97A884] text-white px-4 py-2 rounded-xl text-xs font-extrabold">
                  ��� Intercambiar Pantallas
                </button>
              </div>
              <button onClick={() => setShowModal(true)} className="bg-[#52796F] text-white px-5 py-2 rounded-xl text-xs font-extrabold shadow">
                ��� + Agregar Invitados B2B
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#97A884]/40 shadow space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <h3 className="font-bold text-sm text-[#676E5E]">��� Archivos de {appParam}</h3>
                  <label className="bg-[#52796F] text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer">
                    + Subir Archivo
                    <input type="file" onChange={handleSubirArchivo} className="hidden" />
                  </label>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {archivos.map(a => (
                    <div key={a.id} className="bg-white p-3 rounded-xl border flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-[#676E5E]">{a.nombre}</p>
                        <p className="text-[10px] text-[#52796F]">{a.tamano} • {a.fecha}</p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Previsualizar</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-extrabold text-[#52796F] text-center pt-2">��� Cifrado según Ley N° 21.663</p>
              </div>

              <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#97A884]/40 shadow space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <h3 className="font-bold text-sm text-[#676E5E]">��� Transcripción en Vivo & Minuta</h3>
                  <button onClick={handleDescargarMinuta} className="bg-[#52796F] text-white text-xs font-bold px-3 py-1.5 rounded-xl">
                    ��� Descargar Minuta (.TXT)
                  </button>
                </div>
                <div className="bg-white p-3 rounded-xl border h-36 overflow-y-auto space-y-1.5 text-xs">
                  {mensajes.map(m => (
                    <p key={m.id}><strong className="text-[#52796F]">{m.emisor}:</strong> {m.texto}</p>
                  ))}
                </div>
                <form onSubmit={handleEnviarMsg} className="flex gap-2">
                  <input type="text" value={nuevoMsg} onChange={e => setNuevoMsg(e.target.value)} placeholder="Dicta o escribe un comentario..." className="flex-1 px-3 py-2 border rounded-xl text-xs bg-white" />
                  <button type="submit" className="bg-[#52796F] text-white text-xs font-bold px-4 py-2 rounded-xl">Enviar</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {tab === 'cita' && (
          <div className="bg-[#FAF8F5] p-8 rounded-3xl border border-[#97A884]/40 shadow max-w-xl mx-auto space-y-4">
            <h2 className="text-lg font-black text-[#676E5E] text-center">��� Agendar Cita en la Sala de {appParam}</h2>
            <form onSubmit={handleAgendarCita} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Nombre Completo / Empresa:</label>
                <input type="text" required value={formCita.nombre} onChange={e => setFormCita({ ...formCita, nombre: e.target.value })} placeholder="Ej: Centro ASL / Juan Pérez" className="w-full px-3 py-2 border rounded-xl bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Correo Electrónico:</label>
                  <input type="email" required value={formCita.email} onChange={e => setFormCita({ ...formCita, email: e.target.value })} placeholder="correo@ejemplo.com" className="w-full px-3 py-2 border rounded-xl bg-white" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Fecha:</label>
                  <input type="date" required value={formCita.fecha} onChange={e => setFormCita({ ...formCita, fecha: e.target.value })} className="w-full px-3 py-2 border rounded-xl bg-white" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#52796F] text-white font-extrabold py-2.5 rounded-xl shadow mt-2">
                ��� Agendar y Vincular con Videollamada
              </button>
            </form>
          </div>
        )}

        {tab === 'oficina' && (
          <div className="bg-[#FAF8F5] p-8 rounded-3xl border border-[#97A884]/40 shadow space-y-3">
            <h2 className="text-lg font-black text-[#676E5E]">���️ Ficha de Oficina: {appParam}</h2>
            <p className="text-xs text-[#52796F] leading-relaxed">
              Plataforma integrativa de telemedicina accesible y salud digital diseñada bajo cumplimiento de la <strong>Ley TEA N° 21.545</strong> y la <strong>Ley N° 21.663 de Ciberseguridad</strong>.
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border-2 border-[#52796F] shadow-2xl max-w-md w-full space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm text-[#676E5E]">��� Agregar Invitados B2B</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 font-bold">✕</button>
            </div>
            <form onSubmit={handleInvitar} className="space-y-3">
              <input type="email" required value={emailInv} onChange={e => setEmailInv(e.target.value)} placeholder="invitado@empresa.com" className="w-full px-3 py-2 border rounded-xl text-xs bg-white" />
              <button type="submit" className="w-full bg-[#52796F] text-white font-bold text-xs py-2 rounded-xl">✉️ Enviar Invitación Cifrada</button>
            </form>
            <button onClick={handleCopiarEnlace} className="w-full bg-white border border-[#97A884] text-[#676E5E] font-bold text-xs py-2 rounded-xl">
              {copiado ? '✅ ¡Enlace Copiado!' : '��� Copiar Enlace Directo a esta Sala'}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function SalaVirtualPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-bold text-[#676E5E]">Cargando Sala...</div>}>
      <SalaContent />
    </Suspense>
  );
}
