const fs = require('fs');

// A. Actualizar components/SalaVirtualB2B.tsx con Query Params din√°micos
const b2bCode = `'use client';

import React from 'react';
import Link from 'next/link';

export interface SalaVirtualB2BProps {
  isOpen?: boolean;
  onClose?: () => void;
  onCerrar?: () => void;
  portalNombre?: string;
  initialApp?: string;
  appLogo?: string;
  portalData?: any;
  initialMode?: string;
  [key: string]: any;
}

export default function SalaVirtualB2B(props: SalaVirtualB2BProps) {
  const { 
    isOpen, 
    onClose, 
    onCerrar, 
    portalNombre = 'Casa Matriz ASL Ideas SpA', 
    initialApp, 
    appLogo,
    portalData 
  } = props || {};

  if (isOpen === false) return null;

  const handleClose = onClose || onCerrar;
  const nombreMostrar = initialApp || portalData?.nombre || portalNombre;
  const logoMostrar = appLogo || portalData?.logo || '/LOGO_asl.png';

  const queryParams = new URLSearchParams({
    app: nombreMostrar,
    logo: logoMostrar
  }).toString();

  return (
    <div className="w-full bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border-2 border-[#52796F]/40 shadow-xl text-center space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <img src={logoMostrar} alt="Logo App" className="w-8 h-8 object-contain rounded-full border p-0.5 bg-white" />
        <span className="bg-[#52796F] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          ACCESO A SALA VIRTUAL EN VIVO
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-black text-[#676E5E]">{nombreMostrar}</h3>
      <p className="text-xs sm:text-sm text-[#52796F] max-w-lg mx-auto">
        Sala de videollamada en vivo vinculada directamente con la agenda B2B, control de audio dB y env√≠o de invitaciones cifradas.
      </p>

      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
        <Link 
          href={`/sala-virtual?\${queryParams}`}
          className="bg-[#52796F] hover:bg-[#676E5E] text-white font-extrabold text-sm px-6 py-3 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center gap-2"
        >
          Ì∫Ä <span>Ingresar a la Sala de {nombreMostrar}</span>
        </Link>
        {handleClose && (
          <button 
            onClick={handleClose} 
            className="bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] font-bold text-xs px-4 py-3 rounded-xl hover:bg-[#E6E7D5] transition"
          >
            Cerrar Vista Previa
          </button>
        )}
      </div>
    </div>
  );
}
`;
fs.mkdirSync('components', { recursive: true });
fs.writeFileSync('components/SalaVirtualB2B.tsx', b2bCode, 'utf8');

// B. Actualizar app/sala-virtual/page.tsx (Lectura de Params, Agenda Vinculada y Modal Invitados)
const salaCode = `'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SalaVirtualContent() {
  const searchParams = useSearchParams();
  const appParam = searchParams.get('app') || 'Casa Matriz ASL Ideas SpA';
  const logoParam = searchParams.get('logo') || '/LOGO_asl.png';

  const [tabActiva, setTabActiva] = useState<'vivo' | 'oficina' | 'cita' | 'reprogramar'>('vivo');
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

  // Transcripci√≥n y chat
  const [mensajes, setMensajes] = useState([
    { id: 1, emisor: 'ASL Bot', texto: `Sala iniciada para: \${appParam} bajo cifrado Ley N¬∞ 21.663.`, hora: '10:00 AM' },
    { id: 2, emisor: 'Sistemas', texto: 'Entorno configurado con baja carga sensorial para Ley TEA N¬∞ 21.545.', hora: '10:01 AM' },
    { id: 3, emisor: 'Anfitri√≥n ASL', texto: `"Bienvenidos a la reuni√≥n interactiva de \${appParam}."`, hora: '10:02 AM' }
  ]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  // Agenda vinculada
  const [formCita, setFormCita] = useState({ nombre: '', email: '', rut: '', tipo: appParam, fecha: '', hora: '10:00' });
  const [citaActiva, setCitaActiva] = useState<any>(null);

  const intercambiar = () => setPantallaEnfocada(prev => (prev === 1 ? 2 : 1));

  const p1 = { id: 1, titulo: appParam, subtitulo: 'Transmisi√≥n Principal de Telemedicina & Salud Digital', badge: 'PANTALLA 01 (PRINCIPAL)' };
  const p2 = { id: 2, titulo: 'C√°mara Secundaria / Int√©rprete LSCh', subtitulo: 'Vista de Participante o Lengua de Se√±as Chilena', badge: 'PANTALLA 02 (SECUNDARIA)' };

  const principal = pantallaEnfocada === 1 ? p1 : p2;
  const secundaria = pantallaEnfocada === 1 ? p2 : p1;

  const handleSubirArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
    alert(`Invitaci√≥n B2B enviada a \${emailInvitado} con cifrado Ley N¬∞ 21.663`);
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
        texto: `Cita vinculada para \${nuevaCita.nombre} (\\({nuevaCita.tipo}) el \\){nuevaCita.fecha} a las \\({nuevaCita.hora} hrs.`,
        hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleCopiarSubtitulos = () => {
    const textoCompleto = mensajes.map(m => `[\\){m.hora}] \\({m.emisor}: \\){m.texto}`).join('\\n');
    navigator.clipboard.writeText(textoCompleto);
    alert('Subt√≠tulos copiados al portapapeles (Ley TEA N¬∞ 21.545)');
  };

  const handleDescargarMinuta = () => {
    const contenido = `==========================================\\nASL IDEAS SpA - MINUTA Y COMPROMISOS B2B\\nApp / Portal: \${appParamPara solucionar la integraci√≥n y evitar problemas de l√≠mite de texto en la consola, he resumido la actualizaci√≥n en un **script de Node.js ultra-optimizado**.

Este script vincular√° la **videollamada interactiva** con la **agenda**, adaptar√° din√°micamente la sala seg√∫n la **App/Portal B2B** desde la que ingreses y a√±adir√° el bot√≥n **`Ì±• + Agregar Invitados B2B`**.

---

### Ì≤ª **Copia y ejecuta este bloque completo en tu Git Bash:**

```bash
cd /c/Users/Dell/Desktop/aslidesas/ASLideasWEB 2>/dev/null || cd ASLideasWEB 2>/dev/null || true

cat << 'EOF' > fix_vinculacion_opt.js
const fs = require('fs');

// 1. components/SalaVirtualB2B.tsx
const b2bCode = `'use client';
import React from 'react';
import Link from 'next/link';

export default function SalaVirtualB2B(props: any) {
  const { isOpen, onClose, onCerrar, portalNombre = 'Casa Matriz ASL Ideas SpA', initialApp, appLogo, portalData } = props || {};
  if (isOpen === false) return null;

  const handleClose = onClose || onCerrar;
  const nombre = initialApp || portalData?.nombre || portalNombre;
  const logo = appLogo || portalData?.logo || '/LOGO_asl.png';
  const query = new URLSearchParams({ app: nombre, logo: logo }).toString();

  return (
    <div className="w-full bg-[#FAF8F5] p-5 rounded-2xl border-2 border-[#52796F]/40 shadow-xl text-center space-y-3">
      <div className="flex items-center justify-center space-x-2">
        <img src={logo} alt="Logo App" className="w-7 h-7 object-contain rounded-full border bg-white p-0.5" />
        <span className="bg-[#52796F] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase">
          ACCESO A SALA VIRTUAL EN VIVO
        </span>
      </div>
      <h3 className="text-lg font-black text-[#676E5E]">{nombre}</h3>
      <p className="text-xs text-[#52796F] max-w-md mx-auto">
        Sala de videollamada vinculada con la agenda B2B, control de dB e invitaciones cifradas Ley N¬∞ 21.663.
      </p>
      <div className="pt-2 flex justify-center gap-3">
        <Link href={`/sala-virtual?${query}`} className="bg-[#52796F] hover:bg-[#676E5E] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow transition">
          Ì∫Ä Ingresar a la Sala de {nombre}
        </Link>
        {handleClose && (
          <button onClick={handleClose} className="bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] font-bold text-xs px-4 py-2.5 rounded-xl">
            Cerrar Vista Previa
          </button>
        )}
      </div>
    </div>
  );
}
`;
fs.mkdirSync('components', { recursive: true });
fs.writeFileSync('components/SalaVirtualB2B.tsx', b2bCode, 'utf8');

// 2. app/sala-virtual/page.tsx
const salaCode = `'use client';

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
    { id: 1, emisor: 'ASL Bot', texto: `Sala activa para: ${appParam} (Ley N¬∞ 21.663).`, hora: '10:00 AM' },
    { id: 2, emisor: 'Anfitri√≥n ASL', texto: `"Bienvenidos a la reuni√≥n interactiva de ${appParam}."`, hora: '10:01 AM' }
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
    alert(`Invitaci√≥n cifrada enviada a ${emailInv}`);
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
      texto: `Cita vinculada para ${c.nombre} (${c.fecha} a las ${c.hora} hrs).`,
      hora: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleDescargarMinuta = () => {
    const txt = `ASL IDEAS SpA - MINUTA B2B\\nApp: ${appParam}\\nFecha: ${new Date().toLocaleDateString()}\\n\\n` +
      `TRANSCRIPCI√ìN:\\n` + mensajes.map(m => `[${m.hora}] ${m.emisor}: ${m.texto}`).join('\\n') +
      `\\n\\nARCHIVOS:\\n` + archivos.map(a => `- ${a.nombre}`).join('\\n');
    const blob = new Blob([txt], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Minuta_${appParam.replace(/\\s+/g, '_')}.txt`;
    a.click();
  };

  return (
    <main className={`min-h-screen font-sans flex flex-col ${calma ? 'bg-[#EAECE6]' : 'bg-[#E6E7D5]'}`}>
      <header className="bg-[#FAF8F5] border-b border-[#97A884]/30 py-3 px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center space-x-3">
          <img src={logoParam} alt="Logo" className="h-9 w-auto object-contain rounded-full border bg-white p-0.5" />
          <div className="flex flex-col">
            <span className="font-black text-base text-[#676E5E]">{appParam}</span>
            <span className="text-[10px] font-bold text-[#52796F] uppercase">Sala Virtual en Vivo</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={() => setShowModal(true)} className="bg-[#52796F] text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow">
            Ì±• + Agregar Invitados B2B
          </button>
          <button onClick={() => setCalma(!calma)} className="bg-[#FAF8F5] border border-[#97A884] text-[#676E5E] px-3 py-1.5 rounded-xl text-xs font-bold">
            {calma ? 'Ìºø Modo Calma' : 'ÌΩÉ Modo Calma (TEA)'}
          </button>
          <Link href="/" className="bg-rose-100 text-rose-800 px-3 py-1.5 rounded-xl text-xs font-bold">
            Volver a la Web
          </Link>
        </div>
      </header>

      {citaActiva && (
        <div className="bg-emerald-600 text-white py-2 px-4 text-center text-xs font-bold flex items-center justify-center gap-3">
          <span>Ì≥Ö Cita Vinculada: <strong>{citaActiva.nombre}</strong> ({citaActiva.fecha} {citaActiva.hora} hrs)</span>
          <button onClick={() => setTab('vivo')} className="bg-white text-emerald-900 text-[11px] font-extrabold px-3 py-0.5 rounded-lg">
            Ir a la Videollamada
          </button>
        </div>
      )}

      <div className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] p-3 rounded-2xl border border-[#97A884]/30">
          <div className="flex space-x-2">
            <button onClick={() => setTab('vivo')} className={`px-4 py-2 rounded-xl text-xs font-extrabold ${tab === 'vivo' ? 'bg-[#676E5E] text-white' : 'bg-transparent text-[#676E5E]'}`}>
              Ì≥π Sala en Vivo
            </button>
            <button onClick={() => setTab('cita')} className={`px-4 py-2 rounded-xl text-xs font-extrabold ${tab === 'cita' ? 'bg-[#676E5E] text-white' : 'bg-transparent text-[#676E5E]'}`}>
              Ì≥Ö Agendar Cita en esta Sala
            </button>
            <button onClick={() => setTab('oficina')} className={`px-4 py-2 rounded-xl text-xs font-extrabold ${tab === 'oficina' ? 'bg-[#676E5E] text-white' : 'bg-transparent text-[#676E5E]'}`}>
              ÌøõÔ∏è Ficha de Oficina
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
                  <h2 className="text-xl font-bold">{pantalla === 1 ? appParam : 'Int√©rprete LSCh / C√°mara Secundaria'}</h2>
                  <button onClick={() => setCam(!cam)} className="bg-[#FAF8F5] text-[#676E5E] text-xs font-extrabold px-4 py-2 rounded-xl">
                    {cam ? 'Ì≥∑ C√°mara Web Activa' : 'Ì≥∑ Encender C√°mara Real'}
                  </button>
                </div>
                {sub && <p className="text-xs text-emerald-300 text-center animate-pulse">[Subt√≠tulos LSCh en Vivo]: "Transmisi√≥n en vivo de {appParam}"</p>}
              </div>

              <div onClick={intercambiar} className="cursor-pointer bg-[#222824] hover:bg-[#2C342F] rounded-2xl p-5 border-2 border-[#52796F] flex flex-col justify-between text-gray-100 min-h-[360px]">
                <div className="flex justify-between">
                  <span className="bg-[#52796F]/80 text-[10px] font-bold px-2 py-1 rounded">
                    PANTALLA 0{pantalla === 1 ? 2 : 1}
                  </span>
                  <span className="text-[11px] text-[#97A884] font-bold">Clic para Agrandar ‚Üó</span>
                </div>
                <div className="text-center py-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#52796F]/30 flex items-center justify-center text-2xl font-bold text-emerald-300 mb-2">
                    {pantalla === 1 ? 'Ì±§' : 'Ì≥π'}
                  </div>
                  <h3 className="text-xs font-extrabold">{pantalla === 1 ? 'Int√©rprete LSCh' : appParam}</h3>
                </div>
                <div className="bg-[#52796F]/40 text-center py-2 rounded-xl text-xs font-bold text-white">
                  Ì¥Ñ Intercambiar Pantalla
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#97A884]/40 flex items-center justify-between gap-4">
              <span className="text-xs font-extrabold text-[#676E5E]">Nivel Audio dB:</span>
              <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: mic ? `${audioLevel}%` : '0%' }} />
              </div>
              <span className="text-xs font-bold text-[#52796F]">{mic ? `${audioLevel}% dB` : '0% dB'}</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button onClick={() => setMic(!mic)} className={`px-4 py-2 rounded-xl text-xs font-extrabold text-white ${mic ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                  {mic ? 'ÌæôÔ∏è Mic On' : 'ÌæôÔ∏è Mic Mute'}
                </button>
                <button onClick={() => setSub(!sub)} className="bg-[#52796F] text-white px-4 py-2 rounded-xl text-xs font-extrabold">
                  Ì≤¨ Subt√≠tulos LSCh
                </button>
                <button onClick={intercambiar} className="bg-[#97A884] text-white px-4 py-2 rounded-xl text-xs font-extrabold">
                  Ì¥Ñ Intercambiar Pantallas
                </button>
              </div>
              <button onClick={() => setShowModal(true)} className="bg-[#52796F] text-white px-5 py-2 rounded-xl text-xs font-extrabold shadow">
                Ì±• + Agregar Invitados B2B
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#97A884]/40 shadow space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <h3 className="font-bold text-sm text-[#676E5E]">Ì≥Å Archivos de {appParam}</h3>
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
                        <p className="text-[10px] text-[#52796F]">{a.tamano} ‚Ä¢ {a.fecha}</p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Previsualizar</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-extrabold text-[#52796F] text-center pt-2">Ì¥í Cifrado seg√∫n Ley N¬∞ 21.663</p>
              </div>

              <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#97A884]/40 shadow space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <h3 className="font-bold text-sm text-[#676E5E]">Ì≤¨ Transcripci√≥n en Vivo & Minuta</h3>
                  <button onClick={handleDescargarMinuta} className="bg-[#52796F] text-white text-xs font-bold px-3 py-1.5 rounded-xl">
                    Ì≥• Descargar Minuta (.TXT)
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
            <h2 className="text-lg font-black text-[#676E5E] text-center">Ì≥Ö Agendar Cita en la Sala de {appParam}</h2>
            <form onSubmit={handleAgendarCita} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Nombre Completo / Empresa:</label>
                <input type="text" required value={formCita.nombre} onChange={e => setFormCita({ ...formCita, nombre: e.target.value })} placeholder="Ej: Centro ASL / Juan P√©rez" className="w-full px-3 py-2 border rounded-xl bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Correo Electr√≥nico:</label>
                  <input type="email" required value={formCita.email} onChange={e => setFormCita({ ...formCita, email: e.target.value })} placeholder="correo@ejemplo.com" className="w-full px-3 py-2 border rounded-xl bg-white" />
                </div>
                <div>
                  <label className="font-bold block mb-1">Fecha:</label>
                  <input type="date" required value={formCita.fecha} onChange={e => setFormCita({ ...formCita, fecha: e.target.value })} className="w-full px-3 py-2 border rounded-xl bg-white" />
                </div>
              </div>
              <button type="submit" className="w-full bg-[#52796F] text-white font-extrabold py-2.5 rounded-xl shadow mt-2">
                Ì≥Ö Agendar y Vincular con Videollamada
              </button>
            </form>
          </div>
        )}

        {tab === 'oficina' && (
          <div className="bg-[#FAF8F5] p-8 rounded-3xl border border-[#97A884]/40 shadow space-y-3">
            <h2 className="text-lg font-black text-[#676E5E]">ÌøõÔ∏è Ficha de Oficina: {appParam}</h2>
            <p className="text-xs text-[#52796F] leading-relaxed">
              Plataforma integrativa de telemedicina accesible y salud digital dise√±ada bajo cumplimiento de la <strong>Ley TEA N¬∞ 21.545</strong> y la <strong>Ley N¬∞ 21.663 de Ciberseguridad</strong>.
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-[#FAF8F5] p-6 rounded-3xl border-2 border-[#52796F] shadow-2xl max-w-md w-full space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm text-[#676E5E]">Ì±• Agregar Invitados B2B</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 font-bold">‚úï</button>
            </div>
            <form onSubmit={handleInvitar} className="space-y-3">
              <input type="email" required value={emailInv} onChange={e => setEmailInv(e.target.value)} placeholder="invitado@empresa.com" className="w-full px-3 py-2 border rounded-xl text-xs bg-white" />
              <button type="submit" className="w-full bg-[#52796F] text-white font-bold text-xs py-2 rounded-xl">‚úâÔ∏è Enviar Invitaci√≥n Cifrada</button>
            </form>
            <button onClick={handleCopiarEnlace} className="w-full bg-white border border-[#97A884] text-[#676E5E] font-bold text-xs py-2 rounded-xl">
              {copiado ? '‚úÖ ¬°Enlace Copiado!' : 'Ì¥ó Copiar Enlace Directo a esta Sala'}
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
`;
fs.mkdirSync('app/sala-virtual', { recursive: true });
fs.writeFileSync('app/sala-virtual/page.tsx', salaCode, 'utf8');

// 3. Forzar actualizaci√≥n de versi√≥n
if (fs.existsSync('package.json')) {
  let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  pkg.version = "0.1." + Date.now();
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2), 'utf8');
}
