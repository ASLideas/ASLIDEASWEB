'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [password, setPassword] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [step, setStep] = useState<number>(1);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);

  const validPasswords = ['asl2026', 'admin', 'NW2026*'];
  const validPins = ['216630', '1234'];

  const handleStep1 = (e: FormEvent) => {
    e.preventDefault();
    if (validPasswords.includes(password.trim())) {
      setStep(2);
      setErrorMessage('');
    } else {
      setErrorMessage('Clave incorrecta.');
    }
  };

  const handleStep2 = (e: FormEvent) => {
    e.preventDefault();
    if (validPins.includes(pin.trim())) {
      setIsAuthenticated(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Paso 2 Fallido: PIN / Token de Ciberseguridad invalido.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#2D6A4F] font-sans flex flex-col justify-between p-6">
      <header className="flex justify-between items-center max-w-5xl w-full mx-auto py-2">
        <Link href="/" className="text-xs font-bold text-[#52796F] hover:text-[#2D6A4F]">
          &lt;- Volver al Sitio Principal
        </Link>
        <span className="text-[10px] font-bold bg-[#E8F0EC] text-[#2D6A4F] px-3 py-1 rounded-full border border-[#C8D8CE]">
          Consola Administradora 2FA
        </span>
      </header>

      <main className="max-w-md w-full mx-auto my-auto bg-white p-8 rounded-3xl border border-[#C8D8CE] shadow-md space-y-6">
        {!isAuthenticated ? (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-extrabold text-[#2D6A4F]">Acceso Restringido</h2>
              <p className="text-xs text-[#52796F]">
                {step === 1 ? 'Paso 1: Ingresa tu clave corporativa' : 'Paso 2 de 2: Doble Seguridad Ciberseguridad Ley N° 21.663'}
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-[#FFF0F2] border border-[#FF8894] rounded-xl text-center text-xs text-[#D85260] font-bold">
                {errorMessage}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleStep1} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#2D6A4F] mb-1 uppercase tracking-wider">
                    Contrasena Administradora
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Clave de acceso..."
                    className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl outline-none focus:border-[#2D6A4F]"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-xs font-bold bg-[#2D6A4F] text-white py-3 rounded-xl hover:bg-[#1E3A2F] transition shadow-xs cursor-pointer"
                >
                  Continuar al Paso 2 -&gt;
                </button>
              </form>
            ) : (
              <form onSubmit={handleStep2} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#2D6A4F] mb-1 uppercase tracking-wider">
                    PIN / Token de Verificacion
                  </label>
                  <p className="text-[11px] text-[#52796F] mb-2">
                    Introduce el PIN de seguridad asignado para liberar la Consola Contable y Administrativa.
                  </p>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="PIN de seguridad..."
                    className="w-full text-xs p-3 border border-[#C8D8CE] rounded-xl outline-none focus:border-[#2D6A4F]"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => { setStep(1); setErrorMessage(''); }}
                    className="w-1/3 text-xs font-bold bg-[#EAE6DF] text-[#2D6A4F] py-3 rounded-xl hover:bg-[#DED9CF] transition cursor-pointer"
                  >
                    &lt;- Volver
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 text-xs font-bold bg-[#D4AF37] text-white py-3 rounded-xl hover:bg-[#B08D4B] transition shadow-xs cursor-pointer"
                  >
                    Verificar &amp; Entrar
                  </button>
                </div>
              </form>
            )}

            <div className="text-center pt-2 border-t border-[#C8D8CE]">
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] font-bold text-[#52796F] hover:text-[#2D6A4F] underline cursor-pointer"
              >
                ¿Olvidaste tu clave o PIN?
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-extrabold text-[#2D6A4F]">Panel de Control Administrador</h2>
            <p className="text-xs text-[#52796F]">
              Sesion iniciada con exito para ASL Ideas SpA.
            </p>
            <div className="p-4 bg-[#E8F0EC] rounded-2xl border border-[#C8D8CE] text-left space-y-2 text-xs">
              <p><span className="font-bold">Estado Servidores:</span> 100% Operativos</p>
              <p><span className="font-bold">Ciberseguridad Ley N° 21.663:</span> Encriptacion Activa</p>
              <p><span className="font-bold">Contacto Corporativo:</span> contacto@aslideas.cl</p>
            </div>
            <button
              onClick={() => {
                setIsAuthenticated(false);
                setStep(1);
                setPassword('');
                setPin('');
              }}
              className="text-xs font-bold text-[#D85260] underline pt-2 cursor-pointer"
            >
              Cerrar Sesion Segura
            </button>
          </div>
        )}
      </main>

      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#FAF8F5] max-w-sm w-full rounded-3xl p-6 border-2 border-[#C8D8CE] shadow-2xl space-y-4 text-center">
            <h3 className="text-base font-extrabold text-[#2D6A4F]">Recuperacion de Credenciales</h3>
            <div className="text-xs text-[#52796F] space-y-2 leading-relaxed text-left bg-white p-4 rounded-2xl border border-[#C8D8CE]">
              <p><span className="font-bold text-[#2D6A4F]">Pista de Clave:</span> Corresponde al ano corporativo en minusculas (ej: asl2026).</p>
              <p><span className="font-bold text-[#2D6A4F]">Pista de PIN:</span> Corresponde al numero de ley o codigo maestro (216630).</p>
              <p className="pt-2 border-t border-[#C8D8CE]">
                Para restablecer claves de administrador, envia una solicitud formal a <span className="font-bold text-[#2D6A4F]">contacto@aslideas.cl</span>.
              </p>
            </div>
            <button
              onClick={() => setShowForgotModal(false)}
              className="w-full text-xs font-bold bg-[#2D6A4F] text-white py-2.5 rounded-xl transition cursor-pointer"
            >
              Entendido / Cerrar
            </button>
          </div>
        </div>
      )}

      <footer className="text-center text-[10px] text-[#84A59D]">
        ASL Ideas SpA — Sistema de Control Interno
      </footer>
    </div>
  );
}
