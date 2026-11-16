import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accion, nombre, rut, email, invitados, servicio, fecha, hora, codigoReserva } = body;

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Clave API de Brevo no configurada' }, { status: 500 });
    }

    if (accion === 'agendar') {
      const linkSala = 'https://aslideasweb.vercel.app/sala-virtual';
      const codigoUnico = codigoReserva || ('ASL-' + Math.floor(100000 + Math.random() * 900000));

      const destinatarios: Array<{ email: string; name: string }> = [
        { email, name: nombre }
      ];

      if (invitados && typeof invitados === 'string') {
        const listaInvitados = invitados.split(',').map((e: string) => e.trim()).filter((e: string) => e.length > 0);
        listaInvitados.forEach((invEmail: string) => {
          destinatarios.push({ email: invEmail, name: 'Invitado B2B' });
        });
      }

      const brevoRes = await fetch('[suspicious link removed]', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: 'ASL Ideas SpA - Casa Matriz', email: 'contacto@aslideas.cl' },
          to: destinatarios,
          subject: `Confirmación de Cita B2B - Clave de Acceso: ${codigoUnico}`,
          htmlContent: `<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; background-color: #ffffff;"><h2 style="color: #0d9488; text-align: center; margin-top: 0;">Confirmación de Cita B2B</h2><p style="font-size: 15px;">Estimado(a) <strong>${nombre}</strong>,</p><p style="font-size: 14px; line-height: 1.5;">Tu reunión virtual para <strong>${servicio || 'Casa Matriz ASL Ideas SpA'}</strong> ha sido agendada con éxito.</p><div style="background-color: #f8fafc; border-left: 4px solid #0d9488; padding: 16px; margin: 20px 0; border-radius: 4px;"><p style="margin: 6px 0; font-size: 14px;"><strong>RUT / Identificación:</strong> ${rut || 'No especificado'}</p><p style="margin: 6px 0; font-size: 14px;"><strong>Fecha:</strong> ${fecha}</p><p style="margin: 6px 0; font-size: 14px;"><strong>Bloque Horario:</strong> ${hora}</p><p style="margin: 10px 0 0 0; font-size: 15px;"><strong>Clave de Acceso Privada:</strong> <span style="font-size: 18px; font-weight: bold; color: #d97706; background-color: #fef3c7; padding: 2px 8px; border-radius: 4px;">${codigoUnico}</span></p></div><p style="font-size: 14px;">Para ingresar a la reunión en el horario agendado, haz clic en el siguiente enlace:</p><div style="text-align: center; margin: 28px 0;"><a href="${linkSala}" style="background-color: #0d9488; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 15px;">Ingresar a la Sala Virtual</a></div><hr style="border: none; border-top: 1px solid #eeeeee; margin: 24px 0;" /><p style="font-size: 12px; color: #6b7280; text-align: center; margin: 0;">ASL Ideas SpA — Plataforma de Salud Digital Inclusiva</p></div>`
        })
      });

      if (!brevoRes.ok) {
        const errData = await brevoRes.json().catch(() => ({}));
        return NextResponse.json({ error: 'Error al enviar correo vía Brevo', details: errData }, { status: 500 });
      }

      return NextResponse.json({ success: true, codigoReserva: codigoUnico });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
