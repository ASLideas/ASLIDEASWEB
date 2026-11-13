'use client';
import { useState } from 'react';

export default function ScheduleModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [email, setEmail] = useState('');
  const [invitados, setInvitados] = useState('');
  const [servicio, setServicio] = useState('Casa Matriz ASL Ideas SpA');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('10:00 AM');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<{ success?: boolean; codigoReserva?: string; error?: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResultado(null);

    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accion: 'agendar',
          nombre,
          rut,
          email,
          invitados,
          servicio,
          fecha,
          hora
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResultado({ success: true, codigoReserva: data.codigoReserva });
      } else {
        setResultado({ error: data.error || 'Ocurrió un error al agendar la cita.' });
      }
    } catch (err) {
      setResultado({ error: 'Error de conexión con el servidor.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-teal-700 mb-1">
          Agendar Cita en la Sala de Casa Matriz ASL Ideas SpA
        </h2>
        <p className="text-xs text-gray-600 mb-4">
          Selecciona la fecha y bloque de atención B2B. Al agendar, la cita quedará vinculada con la Video Reunión en vivo.
        </p>

        {resultado?.success ? (
          <div className="bg-teal-50 border border-teal-200 text-teal-800 p-4 rounded-lg text-center my-4">
            <h3 className="font-bold text-lg mb-1">¡Cita Agendada con Éxito! ���</h3>
            <p className="text-sm mb-3">
              Se ha enviado la confirmación y la clave de acceso privada a tu correo y al de tus invitados.
            </p>
            <div className="inline-block bg-amber-100 text-amber-900 font-mono font-bold px-4 py-2 rounded-md text-base mb-3 border border-amber-300">
              Clave de Acceso: {resultado.codigoReserva}
            </div>
            <div>
              <button
                onClick={onClose}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors mt-2"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {resultado?.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-md">
                {resultado.error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nombre Completo o Empresa *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Centro Médico ASL / Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full p-2 text-xs border rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                RUT o RUT Tributario *
              </label>
              <input
                type="text"
                required
                placeholder="Ej: 76.543.210-K / 12.345.678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full p-2 text-xs border rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Correo Electrónico Principal *
              </label>
              <input
                type="email"
                required
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 text-xs border rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Correos de Invitados Adicionales (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: gerencia@empresa.cl, ti@empresa.cl"
                value={invitados}
                onChange={(e) => setInvitados(e.target.value)}
                className="w-full p-2 text-xs border rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
              />
              <span className="text-[10px] text-gray-500">Separa varios correos por coma. Recibirán la clave de acceso.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Tipo / Portal B2B
              </label>
              <select
                value={servicio}
                onChange={(e) => setServicio(e.target.value)}
                className="w-full p-2 text-xs border rounded-md focus:ring-2 focus:ring-teal-500 outline-none bg-white"
              >
                <option value="Casa Matriz ASL Ideas SpA">Casa Matriz ASL Ideas SpA</option>
                <option value="Oficina Virtual Salud Digital">Oficina Virtual Salud Digital</option>
                <option value="Oficina Virtual Inclusión">Oficina Virtual Inclusión</option>
                <option value="Atención Comercial B2B">Atención Comercial B2B</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Fecha Preferente *
                </label>
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full p-2 text-xs border rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Bloque Horario *
                </label>
                <select
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  className="w-full p-2 text-xs border rounded-md focus:ring-2 focus:ring-teal-500 outline-none bg-white"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? 'Procesando Agendamiento...' : 'Confirmar Cita y Vincular a la Video Reunión'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
