'use client';

import { useState } from 'react';

export default function ContactoPage() {
  const [rut, setRut] = useState('');
  const [invitados, setInvitados] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
    oficina: 'ASL Ideas SpA',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '', oficina: 'ASL Ideas SpA' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#2F3E46] py-12 px-4 sm:px-6 lg:px-8">
      
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">RUT o RUT Tributario *</label>
              <input type="text" required placeholder="Ej: 76.543.210-K / 12.345.678-9" value={rut} onChange={(e) => setRut(e.target.value)} className="w-full p-2 text-xs border rounded-md focus:ring-2 focus:ring-teal-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Correos de Invitados Adicionales (Opcional)</label>
              <input type="text" placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl" value={invitados} onChange={(e) => setInvitados(e.target.value)} className="w-full p-2 text-xs border rounded-md focus:ring-2 focus:ring-teal-500 outline-none" />
              <span className="text-[10px] text-gray-500">Separa varios correos por coma. Recibirán la clave de acceso.</span>
            </div>
<div className="max-w-4xl mx-auto space-y-8">
        
        {/* Cabecera */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-[#52796F]">Contacto e Información</h1>
          <p className="text-lg text-gray-600">
            Ponte en contacto con nuestro equipo a través de los canales oficiales o envíanos un mensaje directo.
          </p>
        </div>

        {/* Tarjetas de acceso directo a correos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="mailto:contacto@aslideas.cl"
            className="p-4 bg-white rounded-xl shadow-sm border border-[#84A59D]/30 text-center hover:border-[#52796F] transition"
          >
            <h3 className="font-semibold text-[#52796F]">Casa Matriz & B2B</h3>
            <p className="text-sm text-gray-500">contacto@aslideas.cl</p>
          </a>

          <a
            href="mailto:soporte@aslideas.cl"
            className="p-4 bg-white rounded-xl shadow-sm border border-[#84A59D]/30 text-center hover:border-[#52796F] transition"
          >
            <h3 className="font-semibold text-[#52796F]">Servicio Técnico & Soporte</h3>
            <p className="text-sm text-gray-500">soporte@aslideas.cl</p>
          </a>

          <a
            href="mailto:contacto@lawenmoll.cl"
            className="p-4 bg-white rounded-xl shadow-sm border border-[#84A59D]/30 text-center hover:border-[#52796F] transition"
          >
            <h3 className="font-semibold text-[#52796F]">Salud LAWENMOLL</h3>
            <p className="text-sm text-gray-500">contacto@lawenmoll.cl</p>
          </a>
        </div>

        {/* Formulario de contacto */}
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-md space-y-6">
          <h2 className="text-xl font-semibold text-[#52796F]">Envíanos un mensaje</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre Completo</label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#52796F] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#52796F] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Área u Oficina</label>
              <select
                value={formData.oficina}
                onChange={(e) => setFormData({ ...formData, oficina: e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#52796F] outline-none bg-white"
              >
                <option value="ASL Ideas SpA">ASL Ideas SpA (Casa Matriz)</option>
                <option value="Servicio Técnico">Servicio Técnico & Soporte</option>
                <option value="LAWENMOLL">LAWENMOLL (Salud Integrativa)</option>
                <option value="Wellness Web App">Wellness Web App (Movimiento Adaptado)</option>
                <option value="Sabiduría Ancestral">Sabiduría Ancestral (Comunidad)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Asunto</label>
              <input
                type="text"
                value={formData.asunto}
                onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#52796F] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mensaje</label>
            <textarea
              rows={4}
              required
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#52796F] outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#52796F] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#354F52] transition disabled:opacity-50"
          >
            {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
          </button>

          {status === 'success' && (
            <p className="text-green-600 text-center font-medium">¡Mensaje enviado con éxito! Te responderemos pronto.</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-center font-medium">Hubo un error al enviar el mensaje. Intenta nuevamente.</p>
          )}
        </form>

      </div>
    </main>
  );
}
